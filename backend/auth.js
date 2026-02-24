const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AccountModel = require('./models/Account.model.js');
const { validationRegister, validationLogin } = require('./authValidation.js');
const redisService = require('./services/redis.service.js');
const saltRounds = 10; // Độ phức tạp của mã hóa (10 là tiêu chuẩn)
router.post('/register', validationRegister, async (req, res) => {
  try {
    const { username, password, email, displayName } = req.body;
    const accountIsExists = await AccountModel.findOne({ username: username });
    if (accountIsExists) {
      return res.status(400).json({
        message: "Tài khoản đã tồn tại không thể lưu",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newAccount = await AccountModel.create({
      username: username.trim(),
      password: hashedPassword,
      email: email.trim(),
      displayName: displayName.trim()
    })
    res.status(200).json({
      message: "Đăng kí tài khoản thành công",
      result: newAccount
    });
  }
  catch (err) {
    if (err.code === 11000) {
      const value = Object.values(err.keyValue)[0];
      err.message = `Giá trị "${value}" đã tồn tại. Vui lòng thử lại!`;
      return res.status(400).json({
        message: err.message
      });
    }
    res.status(500).json({
      error: "Lưu tài khoản thất bại",
      message: err.message
    });
  }
})
router.post('/login', validationLogin, async (req, res) => {
  try {   
    const { username, password, displayName } = req.body;
    const user = await AccountModel.findOne({ username: username.trim() });
    if (!user) {
      return res.status(401).json({ message: "Tài khoản không tồn tại!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không chính xác!" });
    }

    const payload = {
      id: user._id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      jti: crypto.randomUUID()
    }
    const refreshPayload = {
      id: user._id,
      jti: crypto.randomUUID()
    }
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
    const refreshToken = jwt.sign(
      refreshPayload,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '30d' }
    )
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000
    })
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      path: '/api/auth',
      maxAge: 30 * 24 * 60 * 60 * 1000
    })

    const userData = user.toObject();

    delete userData.password;
    res.status(200).json({
      message: "Đăng nhập thành công",
      user: userData
    });
  }
  catch (err) {
    res.status(500).json({
      message: "Đăng nhập thất bại",
    });
  }
})

router.post('/logout', async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.cookies;
    console.log('rf token', refreshToken);

    // 1. Xử lý Access Token
    if (accessToken) {
      const decoded = jwt.decode(accessToken);
      console.log(decoded)
      if (decoded && decoded.jti) { // Đảm bảo token có chứa jti
        const now = Math.floor(Date.now() / 1000);
        const timeLeft = decoded.exp - now;
        if (timeLeft > 0) {
          // Lưu JTI vào Redis Blacklist với thời gian hết hạn đúng bằng thời gian còn lại của token
          await redisService.setBlackList(decoded.jti, timeLeft);
          console.log(`🚫 Access Token (JTI: ${decoded.jti}) đã bị chặn trong ${timeLeft} giây`);
        }
      }
    }
    // 2. Xử lý Refresh Token
    if (refreshToken) {
      console.log('Dang xu li accessToken')
      const decoded = jwt.decode(refreshToken);
      if (decoded && decoded.jti) {
        const now = Math.floor(Date.now() / 1000);
        const timeLeft = decoded.exp - now;

        if (timeLeft > 0) {
          await redisService.setBlackList(decoded.jti, timeLeft);
          console.log(`🚫 Refresh Token (JTI: ${decoded.jti}) đã bị chặn trong ${timeLeft} giây`);
        }
      }
    }

    // 3. Xóa Cookie ở trình duyệt
    const cookieOptions = {
      httpOnly: true,
      secure: false, // Để true nếu dùng HTTPS
      sameSite: 'Lax',
      expires: new Date(0) // Đặt ngày hết hạn về quá khứ để xóa ngay lập tức
    };

    res.cookie('accessToken', '', cookieOptions);
    res.cookie('refreshToken', '', {
      ...cookieOptions,
      path: '/api/auth/'
    });
    return res.status(200).json({
      message: "Đăng xuất thành công"
    });

  } catch (err) {
    console.error("Lỗi đăng xuất:", err);
    return res.status(500).json({
      message: "Đăng xuất thất bại",
    });
  }
});
router.post('/refresh-token', async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("Không tìm thấy Refresh Token!!!");
    // 1. Giải mã Token (Dùng try-catch để bắt lỗi verify trực tiếp)

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const isBlocked = await redisService.isBlackListed(refreshToken.jti);
      if (isBlocked) return res.status(403).json("Phiên đăng nhập đã bị hủy hoàn toàn");

    } catch (error) {
      return res.status(403).json("Refresh Token không hợp lệ hoặc hết hạn");
    }

    // 2. Tìm User từ Database (Vì đã có decoded nên ko cần callback nữa)
    const user = await AccountModel.findById(decoded.id);
    if (!user) return res.status(404).json("User đã bị xóa khỏi hệ thống!");

    // 3. Tạo Payload và ký Access Token mới
    const payload = {
      id: user._id,
      username: user.username,
      displayName: user.displayName,
      email: user.email
    };

    const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    // 4. Gắn vào Cookie
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    // 5. Trả về kết quả
    return res.status(200).json({
      message: "Gia hạn thành công!",
      user: payload
    });

  } catch (err) {
    console.error("Lỗi Refresh Token:", err);
    res.status(500).json("Lỗi khi cấp phát accessToken mới!!");
  }
});
module.exports = router;

const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AccountModel = require('./models/Account.model.js');
const { validationRegister, validationLogin } = require('./authValidation.js')
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
      email: user.email
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
      path: '/api/auth/refresh-token',
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

router.post('/logout', (req, res) => {
  try {
    res.cookie('accessToken', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      expires: new Date(0)
    });
    res.cookie('refreshToken', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      path: '/v1/auth/refresh-token',
      expires: new Date(0)
    });
    res.status(200).json({
      message: "Đăng xuất thành công"
    });
  } catch (err) {
    res.status(500).json({
      message: "Đăng xuất thất bại",
    });
  }
})
router.post('/refresh-token', async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("Không tìm thấy Refresh Token!!!");
    // 1. Giải mã Token (Dùng try-catch để bắt lỗi verify trực tiếp)
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
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

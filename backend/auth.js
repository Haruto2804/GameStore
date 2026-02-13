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
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        displayName: user.displayName,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000
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
    res.status(200).json({
      message: "Đăng xuất thành công"
    });
  } catch (err) {
    res.status(500).json({
      message: "Đăng xuất thất bại",
    });
  }
})
module.exports = router;

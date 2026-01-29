const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const AccountModel = require('./models/Account.model.js');
const { validationRegister,validationLogin } = require('./authValidation.js')
const saltRounds = 10; // Độ phức tạp của mã hóa (10 là tiêu chuẩn)
router.post('/register', validationRegister, async (req, res) => {
  try {
    const { username, password, email } = req.body;
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
      email: email.trim()
    })
    res.status(200).json({
      message: "Đăng kí tài khoản thành công",
      result: newAccount
    });
  }
  catch (err) {
    res.status(500).json({
      error: "Lưu tài khoản thất bại",
      detail: err.message
    });
  }
})
router.post('/login',validationLogin, async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await AccountModel.findOne({ username: username.trim() });
    if (!user) {
      return res.status(401).json({ message: "Tài khoản không tồn tại!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không chính xác!" });
    }
    console.log(process.env.JWT_SECRET)
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
    console.log(token)
    res.cookie('accessToken',token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 24*60*60*1000
    })
    res.status(200).json({
      message: "Đăng nhập thành công",
      user: { id: user._id, username: user.username }
    });
  }
  catch (err) {
    res.status(500).json({
      message: "Đăng nhập thất bại",
    });
  }
})
module.exports = router;

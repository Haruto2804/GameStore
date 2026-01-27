const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const AccountModel = require('./models/Account.model');
const saltRounds = 10; // Độ phức tạp của mã hóa (10 là tiêu chuẩn)
router.post('/register', async (req, res) => {
  try {
    const { username, password,email } = req.body;
    const accountIsExists = await AccountModel.findOne({ username: username });
    if (accountIsExists) {
      return res.status(400).json({
        message: "Tài khoản đã tồn tại không thể lưa",
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
router.post('/login', async (req, res) => {
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

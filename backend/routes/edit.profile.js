const express = require('express');
const router = express.Router();
const { protect } = require('../authMiddleware.js');
const AccountModel = require('../models/Account.model.js');
router.post('/edit-profile', protect, async (req, res) => {
  const { displayName, email, bio } = req.body;
  const userId = req.user.id;
  try {
    const updatedProfile = await AccountModel.findByIdAndUpdate(userId,
      {
        $set: { displayName, email, bio }
      },
      {
        new: true,
        runValidators: true
      }
    )
    res.status(200).json({ message: "Cập nhật hồ sơ người dùng thành công!" });
  }
  catch (err) {
    if (err.code === 11000) {
      
      return res.status(400).json({ message: "Email này đã được sử dụng bởi người khác!" });
    }
    res.status(500).json({ message: "Cập nhật hồ sơ người dùng thất bại!" });
  }


})
module.exports = router;
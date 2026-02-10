const express = require('express');
const router = express.Router();
const uploadCloud = require('../cloudinaryConfig.js');
const AccountModel = require('../models/Account.model.js')
const { protect } = require('../authMiddleware.js');
router.post('/upload-avatar', protect, uploadCloud.single('avatar'), async (req, res) => {
  try {
    // 1. Kiểm tra xem có file gửi lên không
    if (!req.file) {
      return res.status(400).json({ message: "Không có file nào được chọn!" });
    }
    // 2. Lấy link ảnh từ Cloudinary trả về
    // Trong Cloudinary, link nằm ở req.file.path
    const imageUrl = req.file.path;
    // 3. Cập nhật vào Database cho User hiện tại
    const updatedUser = await AccountModel.findByIdAndUpdate(
      req.user.id,
      { $set: { avatar: imageUrl } },
      { new: true }
    ).select("-password");

    // 4. Trả kết quả về cho Frontend
    res.status(200).json({
      url: imageUrl,
    });
  } catch (err) {
    console.error("Lỗi upload:", err);
    res.status(500).json({ message: "Lỗi server khi upload ảnh" });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const uploadCloud = require('../cloudinaryConfig.js');
router.post('/update-avatar', uploadCloud.single('avatar'),  async (req, res) => {
  console.log(req.file);
  res.send('Đã tải ảnh thành công!');
})
module.exports = router;
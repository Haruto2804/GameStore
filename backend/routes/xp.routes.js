const express = require('express');
const router = express.Router();
const { protect } = require('../authMiddleware.js')
const { handleGainXp } = require('../services/level.service.js');
router.post('/claim-reward', protect, async (req, res) => {
  try {
    const { action } = req.body;
    const user = await handleGainXp(req.user.id, action);
    res.status(200).json(user);
  }
  catch (err) {
    res.status(500).json({ message: "Xảy ra lỗi khi cộng xp!" });
  }
})
module.exports = router;
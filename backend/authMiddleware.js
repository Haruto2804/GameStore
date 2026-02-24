  const jwt = require('jsonwebtoken');
  const redisService= require('./services/redis.service.js');
  const protect = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(400).json({ message: "Không tìm thấy token, vui lòng đăng nhập lại!" });
    }
    try {
      const isBlocked = await redisService.isBlackListed(token.jti);
      if (isBlocked) {
        return res.status(401).json({
          message: "Token này đã đăng xuất, không thể dùng lại!"
        });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next(); 
    }
    catch (error) {
      return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
    }
  }
  module.exports = { protect };
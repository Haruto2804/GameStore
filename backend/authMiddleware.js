const jwt = require('jsonwebtoken');
const protect = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(400).json({ message: "Không tìm thấy token, vui lòng đăng nhập lại!" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }
  catch (error) {
    return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
  }
}
module.exports = { protect };
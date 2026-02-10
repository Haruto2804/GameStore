require('dotenv').config({ path: '../.env' });
const cloudinary = require('cloudinary').v2;
console.log(process.env.CLOUDINARY_CLOUD_NAME)
// 1. Cấu hình (Đảm bảo các biến môi trường này đã có trong file .env)\
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true
// });

cloudinary.config();
// 2. Hàm kiểm tra kết nối
const checkCloudinaryConfig = async () => {
  console.log("--- Bắt đầu kiểm tra cấu hình Cloudinary ---");

  // In thử để kiểm tra xem dotenv có đọc được file không
  console.log("Cloud Name hiện tại:", cloudinary.config().cloud_name || "Trống (LỖI)");

  try {
    // Gọi API ping của Cloudinary
    const result = await cloudinary.api.ping();
    console.log("✅ Kết nối thành công!");
    console.log("Phản hồi từ Cloudinary:", result);
    return true;
  } catch (error) {
    console.error("❌ Kết nối thất bại!");
    console.error("Chi tiết lỗi:", {
      message: error.message,
      http_code: error.http_code, // Thường là 401 nếu sai API Key/Secret
    });

    if (error.http_code === 401) {
      console.log("👉 Gợi ý: Hãy kiểm tra lại API_KEY và API_SECRET trong file .env");
    } else if (!cloudinary.config().cloud_name) {
      console.log("👉 Gợi ý: CLOUDINARY_CLOUD_NAME đang bị trống. Kiểm tra file .env");
    }

    return false;
  }
};

// Chạy hàm kiểm tra
checkCloudinaryConfig();
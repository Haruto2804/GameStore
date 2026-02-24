import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true
});

axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config;
    // Kiểm tra nếu lỗi 401 và request này chưa từng được thử lại
    if (error.response?.status === 401 && !originalRequest._retry) {
      // console.log("🚀 Đã đánh chặn được lỗi 401!");
      originalRequest._retry = true;
      try {
        // 1. Gọi API refresh token
        // Nên dùng chính axiosClient để hưởng các config như baseURL
        // console.log("✅ Refresh thành công! Đang thử lại request cũ...");
        await axios.post('http://localhost:3000/api/auth/refresh-token', {}, { withCredentials: true });
        // 2. Thực hiện lại request ban đầu
        return axiosClient(originalRequest);
      } catch (refreshError) {
      
        // 3. Nếu refresh cũng fail (thường là do refresh token hết hạn)
        // Xóa sạch dấu vết và đẩy về trang login
        window.location.href = '/login';

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Đưa cửa sổ trình duyệt về tọa độ (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]); // Chạy lại mỗi khi pathname thay đổi
  return null; // Component này không cần hiển thị gì cả
}
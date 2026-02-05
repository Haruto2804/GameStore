import { useNavigate } from "react-router"; // Dùng useNavigate thay vì Link cho Logout
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext.js";

export function SignInButton() {
  const { logout, isLogged, setIsLogged } = useContext(AuthContext)
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập khi component load lần đầu
  useEffect(() => {
    const status = localStorage.getItem('is_logged') === 'true';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLogged(status);
  }, []); //

  const handleAuth = async () => {
    if (!isLogged) {

      navigate('/login');
    } else {
      try {
        // Chờ logout xong (vì bạn có gọi API xóa HttpOnly Cookie)
        await logout();
        
        // Về trang chủ sau khi đăng xuất
        navigate('/');
      } catch (error) {
        console.error("Lỗi khi đăng xuất:", error);
      }
    }
  };
  return (
    <button
      onClick={() => handleAuth()}
      className={`bg-green-500 px-4 py-2 rounded-lg cursor-pointer focus:ring-2
      hover:bg-green-700 transition-transform hover:-translate-y-1 duration-300`}
    >
      <span className="font-bold">{isLogged ? "Đăng xuất" : "Đăng nhập"}</span>
    </button>
  );
}
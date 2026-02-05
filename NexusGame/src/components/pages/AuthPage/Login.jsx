
import { TbDeviceGamepad } from "react-icons/tb";
import { FaUser } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { validators } from "../../../utils";
import { AuthContext } from "../../../Context/AuthContext";
export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const loginAccount = async (e) => {
    e.preventDefault(); // QUAN TRỌNG: Chặn load lại trang

    if (!validators.username(username)) {
      alert("Vui lòng nhập username!");
      return;
    }
    if (!validators.password(password)) {
      alert("Mật khẩu phải từ 6 đến 50 kí tự");
      return; // Dừng hàm tại đây, không gọi API nữa
    }
    const account = {
      username: username,
      password: password
    }
    try {
      const data = await login(account);
      navigate("/user")
      alert(data.message);
    }
    catch (err) {
      alert(err?.response?.data?.message || "Sai tài khoản hoặc mật khẩu");
    }

  }

  return (
    <div className="bg-bg-base">
      <div className="max-w-xl mt-25 text-white mx-auto p-4">
        <div className="bg-[#0a192f]/85 backdrop-blur-md 
        border border-[#316843]/30
        p-4 rounded-lg flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col gap-3 items-center">
            <div className="w-fit flex items-center justify-center p-2 bg-blue-600 rounded-lg 
        shadow-[0_0_20px_rgba(59,130,246,0.6)]">
              <TbDeviceGamepad className="size-12 text-black" />
            </div>
            <h1 className="text-2xl text-center font-bold">Đăng nhập</h1>
            <p className="text-blue-500 shadow-blue-700 text-md">Chào mừng, chỉ huy!</p>
          </div>
          <form
            onSubmit={loginAccount}
            className="w-full flex flex-col gap-3">
            <div>
              <p className="font-bold mb-2 text-blue-100">Username</p>
              <div className="relative w-full group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/60 group-focus-within:text-blue-400 transition-colors duration-300 z-10" />

                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Haruto2804"
                  className="
      w-full p-4 pl-12 rounded-lg outline-none transition-all duration-300
      /* Hiệu ứng kính */
      bg-blue-950/30 backdrop-blur-md 
      /* Viền mặc định */
      border border-blue-500/30 text-blue-100 placeholder:text-blue-300/50
      /* Hiệu ứng khi focus */
      focus:border-blue-400 focus:bg-blue-900/40 
      focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]
    "
                />
              </div>
            </div>


            <div>
              <p className="font-bold mb-2 text-blue-100">Password</p>
              <div className="relative w-full group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/60 group-focus-within:text-blue-400 transition-colors duration-300 z-10" />

                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="12345@@@..."
                  className="
      w-full p-4 pl-12 rounded-lg outline-none transition-all duration-300
      /* Hiệu ứng kính */
      bg-blue-950/30 backdrop-blur-md 
      /* Viền mặc định */
      border border-blue-500/30 text-blue-100 placeholder:text-blue-300/50
      /* Hiệu ứng khi focus */
      focus:border-blue-400 focus:bg-blue-900/40 
      focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]
    "
                />
              </div>
            </div>


            <div className="flex gap-3 mt-3">

            </div>
            <button
              className="active:scale-98 transition-all duration-100 text-white text-lg shadow-blue-500 bg-blue-800 rounded-lg flex items-center justify-center w-full p-4 cursor-pointer">
              <div
                className="flex items-center gap-2 ">
                <span>Sign In</span>
                <FaArrowRight className="" />
              </div>
            </button>
          </form>


          <p className="text-gray-500 text-sm">Chưa có tài khoản?
            <Link to="/register" className="text-blue-500 cursor-pointer transition-all duration-300 hover:underline"> Đăng kí tài khoản ngay</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
import { TbDeviceGamepad } from "react-icons/tb";
import { FaUser } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import { Link, Navigate } from "react-router";
import { validators } from "../../../utils";
import axiosClient from "../../../AxiosClient";
import { useNavigate } from "react-router";
export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkedPolicy, setCheckedPolicy] = useState(false);
  const submitAccount = async (e) => {
    e.preventDefault(); // QUAN TRỌNG: Chặn load lại trang
    if (!checkedPolicy) {
      alert("Vui lòng đồng ý với điều khoản dịch vụ!");
      return;
    }
    if (!validators.displayName(displayName)) {
      alert("Tên hiển thị phải có ít nhất 6-50 kí tự!");
      return;
    }
    if (!validators.username(username)) {
      alert("Username phải có ít nhất từ 2-20 kí tự");
      return;
    }
    if (!validators.email(email)) {
      alert("Email không đúng định dạng, vui lòng kiểm tra lại!");
      return; // Dừng hàm tại đây, không gọi API nữa
    }
    if (!validators.password(password)) {
      alert("Mật khẩu phải từ 6 đến 50 kí tự");
      return; // Dừng hàm tại đây, không gọi API nữa
    }
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    const newAccount = {
      username: username.trim(),
      password: password,
      email: email.trim(),
      displayName: displayName.trim()
    }

    let response;
    try {
      response = await axiosClient.post('/auth/register', newAccount);
      alert(response.data.message);
      Navigate("/login")
    }
    catch (err) {
      alert(err?.response?.data.message);
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
            <h1 className="text-2xl text-center font-bold">Đăng kí tài khoản</h1>
            <p className="text-blue-500 shadow-blue-700 text-md">Gia nhập kỉ nguyên kĩ thuật số và tìm game yêu thích của bạn!</p>
          </div>
          <form onSubmit={submitAccount} className="w-full flex flex-col gap-3">
            <div>
              <p className="font-bold mb-2 text-blue-100">Tên hiển thị</p>
              <div className="relative w-full group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/60 group-focus-within:text-blue-400 transition-colors duration-300 z-10" />

                <input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  type="text"
                  placeholder="Haruto..."
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
              <p className="font-bold mb-2 text-blue-100">Email</p>
              <div className="relative w-full group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/60 group-focus-within:text-blue-400 transition-colors duration-300 z-10" />


                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="ngobaosoftware@gmail.com"
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
            <div className="flex gap-3">
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
              <div>
                <p className="font-bold mb-2 text-blue-100">Confirm</p>
                <div className="relative w-full group">
                  <FaShieldAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/60 group-focus-within:text-blue-400 transition-colors duration-300 z-10" />

                  {/* 2. Input với padding-left lớn hơn (pl-12) để chừa chỗ cho icon */}
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
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
            </div>
            <div className="flex gap-3 mt-3">
              <input
                checked={checkedPolicy}
                onChange={() => setCheckedPolicy(!checkedPolicy)}
                type="checkbox"
                className="
                  size-5 cursor-pointer appearance-none 
                  bg-blue-950 border border-blue-900 rounded-sm 
                  ring-blue-500
                  transition-all duration-200 relative
                
                  /* 1. Khi được tích: Đổi màu nền */
                  checked:bg-blue-700 checked:border-blue-400
                  
                  /* 2. Tạo dấu tích bằng after: */
                  after:content-[''] after:absolute after:hidden checked:after:block
                  
                  /* 3. Hình dáng dấu tích (Vẽ hình chữ L rồi xoay 45 độ) */
                  after:left-1.5 after:top-0.5 
                  after:w-1.5 after:h-2.75 
                  after:border-white after:border-r-[2.5px] after:border-b-[2.5px] 
                  after:rotate-45
                "
              />
              <div className="">
                <p className="text-gray-400 text-sm leading-relaxed">
                  Tôi đồng ý với
                  <a href="#" className="text-blue-500 hover:text-blue-400 hover:underline mx-1 transition-colors">
                    Điều khoản Dịch vụ
                  </a>
                  và xác nhận đã đọc
                  <br />
                  <a href="#" className="text-blue-500 hover:text-blue-400 hover:underline transition-colors">
                    Chính sách về các quyền riêng tư
                  </a>.
                </p>
              </div>
            </div>
            <button className="active:scale-98 transition-all duration-100 text-white text-lg shadow-blue-500 bg-blue-800 rounded-lg flex items-center justify-center w-full p-4 cursor-pointer">
              <div className="flex items-center gap-2 ">
                <span>Sign Up</span>
                <FaArrowRight className="" />
              </div>
            </button>
          </form>


          <p className="text-gray-500 text-sm">Đã có tài khoản?
            <Link to="/login" className="text-blue-500 cursor-pointer transition-all duration-300 hover:underline">  Quay trở lại đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
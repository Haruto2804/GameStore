import { useContext, useEffect, useState } from "react";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";
const navItems = [
  { title: "profile", path: "/profile", icon: FaUser },
  { title: "friends", path: "/friends", icon: FaUserFriends },
  { title: "messages", path: "/messages", icon: RiMessage2Fill },
  { title: "settings", path: "/settings", icon: IoMdSettings },
  { title: "logout", path: "/login", icon: IoLogOut, isLogout: true }
];

export function AccountNav() {
  // 1. Quản lý item đang được chọn
  const [isSelect, setIsSelect] = useState("profile");
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext)
  const handleLogout = async () => {
    try {
      logout();
    } catch (err) {
      console.error("Lỗi đăng xuất", err);
    }
  };

  return (
    <div className="bg-[#0a192f]/80 backdrop-blur-md border border-white/10 p-2 rounded-xl shadow-2xl flex flex-col gap-1">

      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = isSelect === item.title;

        return (
          <div
            key={item.title}
            onClick={() => setIsSelect(item.title)}
            className={`
              group relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300
              /* Nếu active: nền sáng hơn và có viền trái */
              ${isActive
                ? "bg-green-500/20 text-white translate-x-1"
                : "text-gray-400 hover:bg-white/5 hover:text-gray-100"}
              /* Nếu là nút logout: đổi sang tông đỏ */
              ${item.isLogout && !isActive ? "hover:text-red-500 hover:bg-red-500/10" : ""}
            `}
          >
            {/* Vạch kẻ bên trái khi active */}
            {isActive && (
              <div className="absolute left-0 w-1 h-6 bg-green-500 rounded-r-full shadow-[0_0_10px_#22c55e]" />
            )}

            <Icon className={`size-5 transition-transform duration-300 group-hover:scale-110 
              ${isActive ? "text-green-500" : ""} 
              ${item.isLogout ? "group-hover:text-red-500" : ""}`}
            />

            <p className="capitalize font-semibold tracking-wide">
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
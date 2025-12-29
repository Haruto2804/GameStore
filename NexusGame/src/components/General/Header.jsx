import LogoGame from '../../../public/logo.svg'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchBar } from './SearchBar'
import { IconButton } from "./IconButton";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { SignInButton } from './SignInButton';
import { TfiMenu } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";
import { Menu } from './Menu';
import { CartContext } from '../../Context/CartContext';
const headerLink = [
  {
    title: "Trang chủ",
    path: "/"
  },
  {
    title: "Trò chơi",
    path: "/games"
  },
  {
    title: "Thư viện",
    path: "/library"
  },
  {
    title: "Cộng đồng",
    path: "/community"
  },
  {
    title: "Hỗ trợ",
    path: "/support"
  }
]
export function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { cart, totalQuantity } = useContext(CartContext);
  console.log(totalQuantity)
  return (
    <div className="fixed top-0 left-0 right-0 bg-bg-app p-2 flex items-center justify-between select-none z-100">
      <div
        className="relative size-10 flex items-center justify-center cursor-pointer select-none lg:hidden"
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        {/* ICON ĐÓNG (X) */}
        <IoMdClose
          className={`absolute size-7 text-white transition-all duration-500 ease-in-out transform
      ${isOpenMenu
              ? "rotate-0 opacity-100 scale-100"
              : "-rotate-90 opacity-0 scale-50"}
    `}
        />
        {/* ICON MENU (3 GẠCH) */}
        <TfiMenu
          className={`absolute size-6 text-white transition-all duration-500 ease-in-out transform
      ${isOpenMenu
              ? "rotate-90 opacity-0 scale-50"
              : "rotate-0 opacity-100 scale-100"}
    `}
        />
      </div>
      <div className={`
        fixed top-19 left-0 bottom-0 transition-all duration-500 ease-in-out z-50
        ${isOpenMenu ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"}
        `}>
        <Menu
          headerLink={headerLink} />
      </div>




      <Link to="/">
        <img src={LogoGame} className="size-15" alt="" />
      </Link>



      <div className=" hidden gap-3 items-center ml-5 lg:flex ">
        {headerLink.map((item) => {
          return (
            <Link to={item.path} className="w-fit text-nowrap group">
              <p key={item.title} className="text-white cursor-pointer font-bold group-hover:text-green-500 transition-all duration-300">{item.title}</p>
              <div className="h-0.5 rounded-full w-0 mx-auto group-hover:w-full bg-linear-to-r from-blue-500 to-green-500 transition-all duration-300"></div>
            </Link>

          )
        })}
      </div>
      <div className="flex-1 ml-7 mr-4">
        <SearchBar title="Tìm kiếm trò chơi..." />
      </div>
      <div className="flex gap-2">
        <Link to="/checkout" className="relative">
          <IconButton Icon={FaShoppingCart} ></IconButton>
          <span className="size-5 bg-red-500 rounded-full absolute right-0 -top-0.5 p-2 flex items-center justify-center">
            <p className="text-white font-bold text-xs">{totalQuantity}</p>
          </span>
        </Link>
        <IconButton Icon={IoIosNotifications} ></IconButton>
        <SignInButton />
      </div>

    </div>
  )
}
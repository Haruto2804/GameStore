import LogoGame from '../../../public/logo.svg'
import Link, { useState } from 'react'
import { SearchBar } from './SearchBar'
import { IconButton } from "./IconButton";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { SignInButton } from './SignInButton';
import { TfiMenu } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";
import { Menu } from './Menu';
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
    title: "Thể loại",
    path: "/genres"
  },
  {
    title: "Nền tảng",
    path: "/platforms"
  },
  {
    title: "Khuyến mãi",
    path: "/discount"
  }
]
export function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
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



      <img src={LogoGame} className="size-15" alt="" />
      <div className=" hidden gap-3 items-center ml-5 lg:flex ">
        {headerLink.map((item) => {
          return (
            <div className="w-fit text-nowrap group">
              <p key={item.title} className="text-white cursor-pointer font-bold group-hover:text-green-500 transition-all duration-300">{item.title}</p>
              <div className="h-0.5 rounded-full w-0 mx-auto group-hover:w-full bg-linear-to-r from-blue-500 to-green-500 transition-all duration-300"></div>
            </div>

          )
        })}
      </div>
      <div className="flex-1 ml-7 mr-4">
        <SearchBar title="Tìm kiếm trò chơi..." />
      </div>
      <div className="flex gap-2">
        <IconButton Icon={FaShoppingCart} ></IconButton>
        <IconButton Icon={IoIosNotifications} ></IconButton>
        <SignInButton />
      </div>

    </div>
  )
}
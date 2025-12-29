import { useState } from "react";
import LikeButton from "../../General/LikeButton";
import {
  SiPlaystation,
  SiNintendoswitch,
  SiApple,
  SiAndroid
} from "react-icons/si";
import { BsXbox } from "react-icons/bs";
import { HiDesktopComputer } from "react-icons/hi";
import { CartContext } from "../../../Context/CartContext";
import { useContext } from "react";
export function Payment({ item }) {
  const [liked, setLiked] = useState(false);
  const { addToCart } = useContext(CartContext);
  const totalAfterDiscount = (item?.pricing.base_price -
    (item?.pricing.base_price * item?.pricing.discount_percent) / 100)
    .toLocaleString('vi', 'VN');
  return (
    <div className=" rounded-lg bg-slate-900 p-4 flex flex-col gap-5 max-w-full">
      <div className="w-[80%] bg-slate-800 rounded-md mx-auto p-1 flex flex-col">
        <p className="font-bold text-lg text-center uppercase text-white">{item?.game_title}</p>
        <p className=" text-md text-center uppercase text-gray-400">{item?.full_name}</p>
      </div>
      {item?.pricing.free_to_play == false && <div className="flex gap-2 items-center">
        <div className="bg-green-500/30 p-1 font-bold text-xs text-green-500 rounded-md w-fit">-10%</div>
        <div className="line-through text-gray-500 ">{item?.pricing.base_price.toLocaleString('vi-VN')} {item?.pricing.currency}</div>
      </div>}
      {item?.pricing.free_to_play ? <p className=" font-bold text-3xl text-green-500 mt-6">Free to play </p>
        : <p className="font-bold text-3xl text-white">{totalAfterDiscount} {item?.pricing.currency}</p>}

      <button
        disabled={item?.pricing.free_to_play}
        className={`
    text-center text-white p-5 rounded-lg font-bold transition-all duration-300 text-xl
    ${item?.pricing.free_to_play
            ? "bg-gray-600 opacity-50 cursor-not-allowed"
            : "bg-green-500 cursor-pointer hover:bg-green-600 hover:-translate-y-1"
          }
  `}
      >
        {item?.pricing.free_to_play ? "Already Free" : "Buy now"}
      </button>
      <div className="flex gap-3 w-full ">
        <button
          disabled={item?.pricing.free_to_play}
          className={`
              ${item?.pricing.free_to_play
              ? "bg-gray-600 opacity-50 cursor-not-allowed"
              : "bg-green-500 cursor-pointer hover:bg-slate-900 hover:ring-green-500 hover:ring-2"
            }
          font-bold rounded-lg bg-slate-800 border border-gray-700 text-center text-white p-3 w-5/6
        cursor-pointer  transition-all duration-300 
        `}
          onClick={() => addToCart(item)}
        >Add to cart</button>
        <div
          onClick={() => setLiked(!liked)}
          className="p-2 bg-slate-800 rounded-lg flex items-center">
          <LikeButton size={25} liked={liked} color="green" />
        </div>
      </div>
      <div className="w-full border-t border-gray-700 ">
        <div className="flex justify-between mt-5">
          <p className="text-slate-500">Developer </p>
          <p className="font-bold cursor-pointer hover:text-green-500 transition-all duration-300 text-white" >{item?.developer}</p>
        </div>
        <div className="flex justify-between mt-5">
          <p className="text-slate-500">Publisher </p>
          <p className="font-bold cursor-pointer hover:text-green-500 transition-all duration-300 text-white" >{item?.publisher}</p>
        </div>
        <div className="flex justify-between mt-5">
          <p className="text-slate-500">Release Date </p>
          <p className="font-bold cursor-pointer hover:text-green-500 transition-all duration-300 text-white" >{item?.release_date}</p>
        </div>
        <div className="flex justify-between mt-5">
          <p className="text-slate-500">Platform </p>
          <div className="flex gap-2">
            {item?.platforms?.map((platform) => (
              <div key={platform}>
                {/* Trường hợp PC */}
                {platform === "PC" && <HiDesktopComputer className="size-5 text-white" />}

                {/* Gom nhóm các dòng PlayStation */}
                {["PS4", "PS5", "PlayStation"].includes(platform) && (
                  <SiPlaystation className="size-5 text-blue-500" />
                )}

                {/* Gom nhóm các dòng Xbox */}
                {["Xbox", "Xbox One", "Xbox Series X/S"].includes(platform) && (
                  <BsXbox className="size-5 text-green-500" />
                )}
                {/* Gom nhóm các dòng Nintendo */}
                {["Switch", "Nintendo Switch"].includes(platform) && (
                  <SiNintendoswitch className="size-5 text-white" />
                )}
                {/* Bổ sung thêm Mobile/Android từ dữ liệu của bạn */}
                {["Mobile", "Android"].includes(platform) && (
                  <SiAndroid className="size-5 text-green-500" />
                )}
              </div>
            ))}

          </div>

        </div>
        <div className="mt-5 rounded-md p-2 border border-slate-800 bg-slate-900 flex justify-between items-center">
          <p className="uppercase text-slate-400 font-bold text-xs">metascore</p>
          <div className="border-2 border-green-500 rounded-lg p-2 text-green-500 size-10 flex items-center justify-center font-bold">
            {item?.metascore}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs mt-5 ">
          {item?.genres.map((item) => {
            return (
              <div className="
          cursor-pointer hover:border-green-500 transition-all duration-500 select-none
          rounded-full border border-gray-800 text-gray-300 font-bold text-center p-2 bg-slate-950">
                {item}
              </div>
            )
          })}


        </div>
      </div>

    </div>
  )
}
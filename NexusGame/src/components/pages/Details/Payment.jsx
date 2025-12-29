import { useState } from "react";
import LikeButton from "../../General/LikeButton";
import { SiPlaystation } from "react-icons/si";
import { HiDesktopComputer } from "react-icons/hi";
export function Payment() {
  const [liked, setLiked] = useState(false);
  return (
    <div className=" rounded-lg bg-slate-900 p-4 flex flex-col gap-5 max-w-full">
      <div className="w-[80%] bg-slate-800 rounded-md mx-auto p-1 flex flex-col">
        <p className="font-bold text-lg text-center uppercase text-white">Minecraft</p>
        <p className=" text-md text-center uppercase text-gray-400">PlayStation 4 Edition Game</p>
      </div>
      <div className="flex gap-2 items-center">
        <div className="bg-green-500/30 p-1 font-bold text-xs text-green-500 rounded-md w-fit">-10%</div>
        <div className="line-through text-gray-500 ">1.944.000 ₫</div>
      </div>
      <p className="font-bold text-3xl text-white">1.749.750 ₫</p>
      <button className="bg-green-500 text-center text-white p-5 rounded-lg font-bold cursor-pointer
        hover:bg-green-600 hover:-translate-y-1 transition-all duration-300">Buy Now</button>
      <div className="flex gap-3 w-full ">
        <button className="font-bold rounded-lg bg-slate-800 border border-gray-700 text-center text-white p-3 w-5/6
        cursor-pointer hover:bg-slate-700 transition-all duration-300 hover:ring-2 hover:ring-green-500
        ">Add to cart</button>
        <div
          onClick={() => setLiked(!liked)}
          className="p-2 bg-slate-800 rounded-lg flex items-center">
          <LikeButton size={25} liked={liked} color="green" />
        </div>
      </div>
      <div className="w-full border-t border-gray-700 ">
        <div className="flex justify-between mt-5">
          <p className="text-slate-500">Developer </p>
          <p className="font-bold cursor-pointer hover:text-green-500 transition-all duration-300 text-white" >Nintendo EPD</p>
        </div>
        <div className="flex justify-between mt-5">
          <p className="text-slate-500">Publisher </p>
          <p className="font-bold cursor-pointer hover:text-green-500 transition-all duration-300 text-white" >Nintendo</p>
        </div>
        <div className="flex justify-between mt-5">
          <p className="text-slate-500">Release Date </p>
          <p className="font-bold cursor-pointer hover:text-green-500 transition-all duration-300 text-white" >May 12, 2023</p>
        </div>
        <div className="flex justify-between mt-5">
          <p className="text-slate-500">Platform </p>
          <div className="flex gap-2">
            <SiPlaystation className="size-5 text-white" />
            <HiDesktopComputer className="size-5 text-white" />
          </div>

        </div>
        <div className="mt-5 rounded-md p-2 border border-slate-800 bg-slate-900 flex justify-between items-center">
          <p className="uppercase text-slate-400 font-bold text-xs">metascore</p>
          <div className="border-2 border-green-500 rounded-lg p-2 text-green-500 size-10 flex items-center justify-center font-bold">
            96
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs mt-5 ">
          <div className="
          cursor-pointer hover:border-green-500 transition-all duration-500 select-none
          rounded-full border border-gray-800 text-gray-300 font-bold text-center p-2 bg-slate-950">
            Action-Adventure
          </div>
          

        </div>
      </div>

    </div>
  )
}
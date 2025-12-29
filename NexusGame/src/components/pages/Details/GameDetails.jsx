import { RiStarSLine } from "react-icons/ri";
import { IoHardwareChipSharp } from "react-icons/io5";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import HarutoPicture from '../../../../public/haruto.png'
import { AiOutlineLike } from "react-icons/ai";
import { Payment } from "./Payment";
export function GameDetails() {
  return (
    <div className="bg-bg-base">
      <div className=" mt-22 max-w-7xl mx-auto p-2 text-sm flex flex-col gap-3" >
        <div className="flex gap-2 text-slate-400 ">
          <p className="">Store</p>
          <p className="">/</p>
          <p className="text-white">Minecraft</p>
        </div>
        <div>
          <p className="text-2xl md:text-4xl lg:text-5xl text-white font-bold mb-2">Minecraft: PlayStation 4 Edition Game.</p>
          <div className="flex gap-2">
            <div className="flex">
              <RiStarSLine className="size-5 text-yellow-400" />
              <RiStarSLine className="size-5 text-yellow-400" />
              <RiStarSLine className="size-5 text-yellow-400" />
              <RiStarSLine className="size-5 text-yellow-400" />
              <RiStarSLine className="size-5 text-yellow-400" />
            </div>
            <p className="font-bold text-white">4.9</p>
            <p className=" text-slate-400">(12.5k reviews)</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 flex-1">
          <div className="basis-2/3 p-4">
            <img className="mx-auto mb-5" src="https://i.ibb.co/32fh1vN/minecraft.webp" alt="minecraft" border="0" />
            <div className="flex gap-4 justify-center">
              <img tabIndex="0" className=" w-30 h-20 cursor-pointer focus:ring-2 focus:ring-white hover:ring-white border transition-all duration-300 rounded-md" src="https://i.ibb.co/32fh1vN/minecraft.webp" alt="minecraft" border="0" />
              <img tabIndex="0" className=" w-30 h-20 cursor-pointer focus:ring-2 focus:ring-white hover:ring-white border transition-all duration-300 rounded-md" src="https://i.ibb.co/32fh1vN/minecraft.webp" alt="minecraft" border="0" />
              <img tabIndex="0" className=" w-30 h-20 cursor-pointer focus:ring-2 focus:ring-white hover:ring-white border transition-all duration-300 rounded-md" src="https://i.ibb.co/32fh1vN/minecraft.webp" alt="minecraft" border="0" />
            </div>
            <div className="w-full border-slate-700 rounded-lg bg-slate-900 p-6 mt-5">
              <p className="font-bold text-xl text-white mb-5 lg:text-2xl">About the game</p>
              <p className=" text-slate-400 text-justify text-md lg:text-lg">An epic adventure across the land and skies of Hyrule awaits in The Legend of Zelda™: Tears of the Kingdom for the Nintendo Switch™ system. The adventure is yours to create in a world fueled by your imagination.
                In this sequel to The Legend of Zelda: Breath of the Wild, you'll decide your own path through the sprawling landscapes of Hyrule and the mysterious islands floating in the vast skies above. Can you harness the power of Link's new abilities to fight back against the malevolent forces that threaten the kingdom?</p>
              <p className="text-cyan-500 mt-5 cursor-pointer hover:text-cyan-100 transition-all duration-300">Read more</p>
            </div>
            <div className="w-full">
              <div className="flex flex-col gap-2 p-4 bg-slate-900 mt-5 rounded-lg">
                <div className="flex gap-2 items-center">
                  <IoHardwareChipSharp className="size-5 text-gray-400 " />
                  <p className="font-bold text-white text-lg">Minimum Requirements</p>
                </div>
                <div className="div flex justify-between">
                  <p className="text-slate-500">OS:</p>
                  <p className="text-gray-400">Windows 10 (64-bit)</p>
                </div>
                <div className="div flex justify-between">
                  <p className="text-slate-500">Processor:</p>
                  <p className="text-gray-400">Intel Core i5-4460</p>
                </div>
                <div className="div flex justify-between">
                  <p className="text-slate-500">Memory:</p>
                  <p className="text-gray-400">8 GB RAM</p>
                </div>
                <div className="div flex justify-between">
                  <p className="text-slate-500">OS:</p>
                  <p className="text-gray-400">NVIDIA GTX 960</p>
                </div>
              </div>

            </div>
            <div className="w-full">
              <div className="flex flex-col gap-2 p-4 bg-slate-900 mt-5 rounded-lg">
                <div className="flex gap-2 items-center">
                  <BsFillRocketTakeoffFill className="size-5 text-green-500 " />
                  <p className="font-bold text-white text-lg">Recommended</p>
                </div>

                <div className="div flex justify-between">
                  <p className="text-slate-500">OS:</p>
                  <p className="text-gray-400">Windows 11 64-bit</p>
                </div>
                <div className="div flex justify-between">
                  <p className="text-slate-500">Processor:</p>
                  <p className="text-gray-400">Intel Core i7-8700K</p>
                </div>
                <div className="div flex justify-between">
                  <p className="text-slate-500">Memory:</p>
                  <p className="text-gray-400">16 GB RAM</p>
                </div>
                <div className="div flex justify-between">
                  <p className="text-slate-500">OS:</p>
                  <p className="text-gray-400">NVIDIA RTX  2070</p>
                </div>
              </div>

            </div>
            <div className="w-full mt-5 ">
              <p className="font-bold text-xl text-white mb-5 ">Community Reviews</p>
              <div className="flex flex-col gap-5 md:flex-row">
                <div className="bg-slate-900 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <img src={HarutoPicture} className="size-10 rounded-full" alt="" />
                      <div className="">
                        <p className="text-white font-bold">Haruto</p>
                        <p className="text-slate-400 text-md">Posted 2 days ago</p>
                      </div>

                    </div>
                    <div className="bg-green-500/20 text-green-500 h-fit py-1 px-3 rounded-sm font-bold text-xs flex items-center gap-2">
                      <AiOutlineLike className="size-5" />
                      <p>Recommended</p>
                    </div>
                  </div>
                  <p className="text-slate-300 w-5/6 mt-5">"Absolutely breathtaking. The verticality adds a
                    whole new dimension to the exploration.
                    Best game of the year, hands down."</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <img src={HarutoPicture} className="size-10 rounded-full" alt="" />
                      <div className="">
                        <p className="text-white font-bold">Haruto</p>
                        <p className="text-slate-400 text-md">Posted 2 days ago</p>
                      </div>

                    </div>
                    <div className="bg-green-500/20 text-green-500 h-fit py-1 px-3 rounded-sm font-bold text-xs flex items-center gap-2">
                      <AiOutlineLike className="size-5" />
                      <p>Recommended</p>
                    </div>
                  </div>
                  <p className="text-slate-300 w-5/6 mt-5">"Absolutely breathtaking. The verticality adds a
                    whole new dimension to the exploration.
                    Best game of the year, hands down."</p>
                </div>
              </div>

            </div>
          </div>
          <div className=" basis-2/6 p-4">
            <Payment />
            
          </div>
        </div>

      </div>
    </div>
  )
}
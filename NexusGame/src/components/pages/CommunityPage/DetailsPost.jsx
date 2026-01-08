
import { FaBookBookmark } from "react-icons/fa6";
import { MdOutlineShare } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import HarutoPicture from '../../../../public/haruto.png'
import { FaEye } from "react-icons/fa";
import { CommentSection } from "./CommentSection";
import { CommentList } from "./CommentList";
import { useState } from "react";
import { Link } from "react-router";
const tags = [
  {
    tag: 'EldenRing',
  },
  {
    tag: 'BossGuide'
  }
  ,
  {
    tag: 'NoDamage'
  },
  {
    tag: 'GamingTips'
  }
]
export function DetailsPost() {
  const [comment,setComment] = useState("");
  return (
    <div className="bg-bg-base mt-22">
      <div className=" text-white max-w-5xl mx-auto p-4">
        <div className="flex gap-3 w-full">
          <Link to = "/" className="cursor-pointer transition-all duration-300 hover:text-blue-500 font-medium">Home </Link>
          <p>/</p>
          <Link to = "/community" className="cursor-pointer transition-all duration-300 hover:text-blue-500 font-medium">Community </Link>
          <p>/</p>
          <p className="cursor-pointer transition-all duration-300 hover:text-blue-500 font-medium">Post name </p>
        </div>
        <p className="font-bold text-3xl md:text-4xl lg:text-5xl mt-5 ">How to defeat Malenia without taking damage?</p>
        <div className="user-section flex flex-col md:flex-row justify-between mt-5 gap-5 md:items-center">
          <div className="flex gap-5 cursor-pointer group items-center">
            <img src={HarutoPicture} className=" group-hover:ring-3 group-hover:ring-blue-500 rounded-full size-12 object-cover transition-all duration-300" alt="" />
            <div className="flex flex-col">
              <p className="font-bold hover group-hover:text-blue-500">Haruto</p>
              <div className="flex gap-2 text-blue-500/70">
                <p>Posted 2 hours ago</p>
                <p> | </p>
                <p>Level 58</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 h-fit">
            <div className="text-[14px] group flex items-center gap-3 
            bg-blue-500/50 py-2 px-8 cursor-pointer 
            transition-all duration-300 rounded-full">
              <FaBookBookmark className="size-5 group-hover:text-blue-500 transition-all duration-300" />
              <p>Save</p>
            </div>
            <div className="text-[14px] group flex items-center gap-3 
            bg-blue-500/50 py-2 px-8 cursor-pointer 
            transition-all duration-300 rounded-full">
              <MdOutlineShare className="size-5 group-hover:text-blue-500 transition-all duration-300" />
              <p>Share</p>
            </div>
          </div>
        </div>
        <div className="w-full h-0.5 bg-gray-800 mt-5"></div>
        <div className="content mt-5 flex flex-col ">
          <p>This boss fight is all about patience and spacing.
            Malenia, Blade of Miquella, is arguably the hardest boss in the game,
            but her moveset is predictable if you pay close attention.
          </p>
          <p>
            Here is a breakdown of the moveset and how to counter the Waterfowl Dance effectively.
            When she rises into the air, run away immediately. For the second flurry, dodge INTO her.
            For the third, walk backwards slightly then dodge right.
          </p>
          <p>
            I recommend using a weapon with good reach or Bloodhound Step Ash of War if you are struggling with the timing. It makes the dodging window much more forgiving.
          </p>
        </div>
        <div className="tag flex gap-3 mt-10">
          {
            tags.map((item) => (
              <p className="cursor-pointer   text-blue-500 hover:underline text-[14px]">#{item.tag}</p>
            ))
          }
        </div>
        <div className="flex justify-between mt-5 rounded-lg border border-blue-900/50 bg-blue-800/30 p-4 text-blue-700 items-center">
          <div className="flex gap-7">
            <div class="flex items-center gap-1 bg-blue-900 rounded-lg p-1 w-fit">
              <button class="p-2 hover:bg-[#3e5246] rounded-md text-[#9eb7a8] hover:text-blue-500">
                <AiOutlineLike className="size-6 cursor-pointer" />
              </button>
              <span class="text-white font-bold px-2">1.2k</span>
              <button class="p-2 hover:bg-[#3e5246] rounded-md text-[#9eb7a8] hover:text-red-400 transition-colors flex items-center justify-center">
                <AiOutlineDislike className="size-6 cursor-pointer" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <FaEye className="size-6" />
              <p>15.4k Views</p>
            </div>
          </div>
          <p>98% Upvoted</p>
        </div>
        <div className="w-full h-0.5 bg-gray-800 mt-5 mb-5"></div>
        <CommentSection comment = {comment} setComment = {setComment} />
        <div className="mt-5">
          <CommentList />
        </div>

      </div>
    </div>
  )
}
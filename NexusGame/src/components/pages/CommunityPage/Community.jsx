import { CategoryForumList } from "./Forum/CategoryForumList";
import { Forum } from "./Forum/Forum";
import { RiCommunityFill } from "react-icons/ri";
import { ForumLeaderBoard } from "./Forum/ForumLeaderBoard";
import { useState } from "react";
export function Community() {
  const [category, setCategory] = useState("");
  return (
    <div className="bg-bg-base mt-22 p-4">
      <div className=" bg-bg-base max-w-6xl mx-auto px-6 flex flex-col">
        <p className="text-3xl flex items-center gap-3 text-white font-bold">
          <RiCommunityFill className="text-green-500" />
          Cộng Đồng Game: Hỏi & Đáp</p>
        <div className="flex flex-col gap-5 md:flex-row md:justify-between mb-5">
          <p className="text-gray-400 mt-2 ">Nơi chia sẻ kiến thức, mẹo chơi game và giải đáp thắc mắc cho game thủ.</p>
          <button className="hover:-translate-y-1 w-fit font-bold hover:bg-green-600 text-white transition-all duration-300 bg-green-500 rounded-lg flex items-center justify-center py-3 px-6 cursor-pointer">
            Đặt câu hỏi mới
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-7">
          <div className="flex-4/6 flex flex-col gap-4">
            <CategoryForumList category={category} setCategory={setCategory} />
            <ForumLeaderBoard />
          </div>
          <Forum />
        </div>

      </div>

    </div>
  )
}
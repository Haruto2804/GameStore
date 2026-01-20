import { FaEye } from "react-icons/fa"
import { FaRegCommentAlt } from "react-icons/fa";
import { Link } from "react-router";
export function ForumPost({ postItem }) {
  const displayDate = postItem.formatted_date || "Vừa xong";
  return (
    <div className="bg-slate-900 rounded-md border border-green-700/51 p-4 flex flex-col gap-2">
      <div className="text-sm">
        <p className="text-gray-500">
          Đăng bởi |
          <span className="text-white"> Haruto </span>
          <span> | {displayDate}</span>
        </p>

      </div>
      <Link to={`/community/posts/${postItem._id}`} className="text-white font-bold text-xl hover:text-green-500 select-none cursor-pointer transition-all duration-300">
        {postItem?.title}
      </Link>
      <p className="text-gray-400 line-clamp-3">
        {postItem?.content.text}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          {postItem?.tags.map((item) => {
            return (
              <div 
              key = {item}
              className="bg-slate-800 rounded-lg py-1 px-3 
              text-gray-500 text-sm cursor-pointer hover:bg-slate-700 
              transition-all duration-200">{item}</div>
            )
          })}
        </div>
        <div className="flex gap-2 text-gray-500 text-md">
          <div className="flex  items-center gap-1">
            <FaEye className="size-4" />
            <p>{postItem?.stats.views}</p>
          </div>
          <div className="flex  items-center gap-1">
            <FaRegCommentAlt className="size-4" />
            <p>{postItem?.stats.upvotes}</p>
          </div>
        </div>
      </div>

    </div>
  )
}
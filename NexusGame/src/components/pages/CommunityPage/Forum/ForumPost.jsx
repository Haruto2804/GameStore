import { FaEye } from "react-icons/fa"
import { FaRegCommentAlt } from "react-icons/fa";

export function ForumPost() {
  return (
    <div className="bg-slate-900 rounded-md border border-green-700/51 p-4 flex flex-col gap-2">
      <div className="text-sm">
        <p className="text-gray-500">
          Đăng bởi |
          <span className="text-white"> Admin </span>
          <span> | 2 giờ trước</span>
        </p>

      </div>
      <h1 className="text-white font-bold text-xl hover:text-green-500 select-none cursor-pointer transition-all duration-300">
        Thông báo bảo trì hệ thống máy chủ ngày 5/1/2026
      </h1>
      <p className="text-gray-400">
        Chào các bạn, chúng tôi sẽ tiến hành bảo trì định kỳ hệ thống máy
        chủ vào lúc 02:00 sáng ngày 5/1 . Thời gian dự kiến
        kéo dài 4 tiếng. Trong thời gian này, một số dịch vụ...
      </p>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="bg-slate-800 rounded-lg py-1 px-3 text-gray-500 text-sm cursor-pointer hover:bg-slate-700 transition-all duration-200">#thongbao</div>
        </div>
        <div className="flex gap-2 text-gray-500 text-md">
          <div className="flex  items-center gap-1">
            <FaEye className="size-4" />
            <p>1.2K</p>
          </div>
          <div className="flex  items-center gap-1">
            <FaRegCommentAlt className="size-4" />
            <p>18 trả lời</p>
          </div>
        </div>
      </div>

    </div>
  )
}
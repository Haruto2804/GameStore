import { useState } from "react"

const categoriesList = [
  {
    id: "news",
    action: "Mới nhất"
  },
  {
    id: "outstanding",
    action: "Nổi bật"
  },
  {
    id: "unanswered",
    action: "Chưa trả lời"
  },
  {
    id: "answered",
    action: "Đã trả lời"
  }
]

export function ForumHeader() {
  const [categories, setCategories] = useState("");

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between gap-3">
        <div className="flex gap-3 max-md:flex-wrap">
          {
            categoriesList.map((item) => (
              <button
                onClick={(e) => setCategories(e.target.value)}
                value={item.id}
                key={item.id} className={` 
              ${categories === item.id ? "text-green-500 bg-green-500/25"
                    : ""
                  }
              whitespace-nowrap
              hover:bg-slate-700/50 
              transition-all duration-300 
              cursor-pointer text-gray-400 
              flex items-center justify-center 
              font-bold rounded-full py-2 px-7`}>
                {item.action}
              </button>
            ))
          }

        </div>
        <div className="flex gap-3 items-center">
          <p className="text-gray-400 font-medium ">Sắp xếp: </p>
          <select className=" px-5 py-2 bg-slate-800 font-bold text-white rounded-lg white">
            <option value="">Thời gian</option>
            <option value="">Lượt xem</option>
            <option value="">Bình chọn</option>
          </select>
        </div>
      </div>
    </>
  )
}
import React from 'react';
import {
  LayoutGrid,
  MessagesSquare,
  BookOpen,
  Cpu,
  ChevronRight
} from 'lucide-react';

const categoriesList = [
  {
    id: "all",
    label: "Tất cả",
    icon: <LayoutGrid size={18} />,
    count: "12k",
    color: "text-blue-400"
  },
  {
    id: "AnQH",
    label: "Hỏi & đáp",
    icon: <MessagesSquare size={18} />,
    count: "5.2k",
    color: "text-green-400"
  },
  {
    id: "guide",
    label: "Hướng dẫn",
    icon: <BookOpen size={18} />,
    count: "3.8k",
    color: "text-yellow-400"
  },
  {
    id: "Hardware",
    label: "Phần cứng & Gear",
    icon: <Cpu size={18} />,
    count: "8.1k",
    color: "text-purple-400"
  }
];

export function CategoryForumList({ category, setCategory }) {
  return (
    <div className="w-full h-fit bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 bg-slate-800/50">
        <h3 className="font-bold text-white flex items-center gap-2">
          <div className="p-1.5 bg-blue-500/20 rounded-lg">
            <LayoutGrid size={16} className="text-blue-400" />
          </div>
          Chủ đề thảo luận
        </h3>
      </div>

      {/* List Categories */}
      <div className="p-3 space-y-1">
        {categoriesList.map((item) => {
          const isActive = category === item.id;
          
          return (
            <div
              key={item.id}
              onClick={() => setCategory(item.id)}
              className={`
                cursor-pointer group flex items-center justify-between p-3 rounded-xl transition-all duration-200 border
                ${isActive 
                  ? "bg-blue-500/10 border-blue-500/40 shadow-[0_0_15px_rgba(34,197,94,0.1)]" 
                  : "bg-transparent border-transparent hover:bg-slate-700/40 hover:border-slate-600"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <span className={`
                  transition-all duration-200
                  ${isActive ? "text-green-400 scale-110" : `${item.color} group-hover:scale-110`}
                `}>
                  {item.icon}
                </span>
                <span className={`
                  text-sm font-medium transition-colors
                  ${isActive ? "text-white" : "text-slate-300 group-hover:text-white"}
                `}>
                  {item.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`
                  text-[11px] font-semibold px-2.5 py-0.5 rounded-full transition-all
                  ${isActive 
                    ? "bg-green-500 text-white" 
                    : "bg-slate-800 text-slate-400 group-hover:bg-blue-500/20 group-hover:text-blue-400"
                  }
                `}>
                  {item.count}
                </span>
                <ChevronRight 
                  size={14} 
                  className={`${isActive ? "text-green-400 translate-x-0.5" : "text-slate-600 group-hover:text-slate-400"} transition-all`} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
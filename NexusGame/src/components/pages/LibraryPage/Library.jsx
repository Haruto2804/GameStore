import { IoApps } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { IoMdDownload } from "react-icons/io";
import { SiRiotgames } from "react-icons/si";
import { PiGameControllerBold } from "react-icons/pi";
import { useState } from "react";
import { CgMenu } from "react-icons/cg";
import { FaPlay } from "react-icons/fa";
const LibraryCategories = [
  { icon: IoApps, title: "Tất cả trò chơi", id: "all" },
  { icon: FaCheck, title: "Đã cài đặt", id: "installed" },
  { icon: FiHeart, title: "Yêu thích", id: "favorite" },
  { icon: IoMdDownload, title: "Đang tải", id: "downloading" },
];

const Collections = [
  { icon: SiRiotgames, title: "Game Hành Động" },
  { icon: PiGameControllerBold, title: "Nhập vai (RPG)" },
];

const GameList = [
  { title: "Cyberpunk 2077", installed: 1, time: "Đã chơi 142 giờ", img: "https://picsum.photos/seed/cp/300/400" },
  { title: "Elden Ring", installed: 0, time: "Chưa chơi", img: "https://picsum.photos/seed/er/300/400" },
  { title: "Hades II", installed: 1, time: "Đã chơi 12 giờ", img: "https://picsum.photos/seed/hd/300/400" },
  // ... thêm các game khác
];
export function Library() {
  const [activeTab, setActiveTab] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0b0e14] text-gray-300 font-sans overflow-hidden">

      {/* NÚT TOGGLE MENU CHO MOBILE */}
      <button
        className="md:hidden fixed top-6 left-4 z-50 p-2 bg-green-500 rounded-lg text-black shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <HiX size={24} /> : <CgMenu size={24} />}
      </button>

      {/* OVERLAY KHI MỞ MENU TRÊN MOBILE */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={
        `
          fixed md:static inset-y-0 left-0 z-40
          w-64 border-r border-gray-800 flex flex-col p-4 bg-[#0f121a]
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}>
        {/* LOGO */}
        <div className="flex items-center gap-2 mb-10 px-2 mt-12 md:mt-0">
          <div className="bg-green-500 p-1.5 rounded-lg text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]">
            <IoApps size={20} />
          </div>
          <span className="text-white font-bold tracking-wider text-xl italic">GAMESTORE</span>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto no-scrollbar">
          {/* Section Thư viện */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-bold text-gray-500 uppercase px-3 mb-2 tracking-widest">Thư viện</p>
            {LibraryCategories.map((item) => (
              <div
                key={item.d}
                onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                className={`flex items-center gap-3 py-5 px-4 rounded-lg cursor-pointer transition-all duration-200 ${activeTab === item.id
                  ? 'bg-green-500 text-black font-bold shadow-lg shadow-green-500/20'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
              >
                <item.icon size={20} />
                <span className="text-sm">{item.title}</span>
              </div>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        <div className="mt-auto bg-[#161b25] p-3 rounded-xl flex items-center justify-between border border-gray-800 group cursor-pointer hover:border-gray-600 transition-colors">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 min-w-[40px] bg-orange-200 rounded-lg overflow-hidden border-2 border-gray-700">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Haruto" alt="avatar" />
            </div>
            <div className="truncate">
              <p className="text-sm font-bold text-white truncate">Haruto</p>
              <p className="text-[10px] text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-[#0b0e14] relative">

        {/* Header Search */}
        <header className="p-4 md:p-6 flex flex-col md:flex-row items-center justify-between sticky top-0 bg-[#0b0e14]/90 backdrop-blur-xl z-20 gap-4">
          <div className="flex items-center gap-4 w-full md:w-2/3 pl-12 md:pl-0">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Tìm kiếm trong thư viện..."
                className="w-full bg-[#161b22] border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
              />
              <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <button className="hidden sm:block bg-[#161b22] px-4 py-2 rounded-lg text-xs font-medium border border-gray-700 hover:bg-gray-800">Mọi thể loại</button>
            <button className="hidden sm:block bg-[#161b22] px-4 py-2 rounded-lg text-xs font-medium border border-gray-700 hover:bg-gray-800">Gần đây nhất</button>
          </div>
          <div className="hidden md:flex gap-5 items-center">
            <div className="relative cursor-pointer text-xl hover:text-white transition-colors">
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0b0e14]"></span>🔔
            </div>
            <div className="text-xl cursor-pointer hover:text-white transition-colors">🔳</div>
          </div>
        </header>

        {/* Game Grid Content */}
        <div className="p-4 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl md:text-3xl font-bold text-white tracking-tight">Thư viện của tôi <span className="text-gray-600 font-medium ml-2 text-lg md:text-xl">(24)</span></h1>
            <div className="flex gap-1 bg-[#161b22] p-1 rounded-lg border border-gray-800">
              <button className="px-4 py-1.5 bg-gray-700 rounded-md text-[11px] font-bold text-white shadow-sm">Windows</button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
            {GameList.map((game, idx) => (
              <div key={idx} className="game-card group relative">
                {/* Container ảnh: đã có flex items-center justify-center */}
                <div className="aspect-[3/4] rounded-2xl overflow-hidden relative shadow-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center">

                  <img
                    src={game.img}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* LỚP PHỦ & NÚT CÀI ĐẶT: Căn giữa tuyệt đối nhờ Flexbox của cha hoặc inset-0 flex */}
                  {
                    game.installed === 0 ? (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                        <div className="p-3 flex items-center bg-white rounded-xl gap-2 hover:bg-green-500 transition-all duration-300 group/btn cursor-pointer shadow-2xl transform scale-90 group-hover:scale-100">
                          <IoMdDownload className="size-6 text-black group-hover/btn:text-white transition-colors" />
                          <p className="text-sm md:text-base text-black uppercase font-bold group-hover/btn:text-white transition-colors">
                            Cài đặt
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                        <div className="flex flex-col absolute  items-center gap-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          <button className="cursor-pointer w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-black shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:scale-110 transition-transform active:scale-95">
                            <FaPlay className="size-6 text-white" />
                          </button>
                          <span className="text-white font-black text-lg tracking-widest uppercase shadow-sm">
                            Chơi ngay
                          </span>

                        </div>
                      </div>


                    )
                  }
                  {/* BADGE TRẠNG THÁI */}
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-green-500 text-white text-[13px] font-bold z-20 shadow-md">
                    {game.installed ? "Đã cài đặt" : "Chưa cài đặt"}
                  </div>
                  <div className="absolute inset-0 group-hover:opacity-100 opacity-0 duration-300 transition-all"></div>

                </div>

                {/* THÔNG TIN GAME */}
                <div className="mt-4">
                  <h3 className="font-bold text-slate-900 dark:text-white truncate group-hover:text-green-500 transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-sm text-slate-500">{game.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Status Bar */}
        <footer className="mt-auto bg-[#0f121a] border-t border-gray-800 p-3 px-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 gap-3">
          <div className="flex flex-wrap justify-center gap-4 md:gap-10">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
              TRẠNG THÁI KẾT NỐI: <span className="text-green-500 font-bold uppercase tracking-widest">Đã kết nối</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <p className="tracking-widest">PHIÊN BẢN <span className="text-gray-300 font-bold">v2.4.12 HarutoSoftWare</span></p>
            <div className="bg-green-500 text-black p-1 px-2 rounded-md font-bold cursor-pointer hover:bg-green-400 transition-colors shadow-lg shadow-green-500/10">?</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
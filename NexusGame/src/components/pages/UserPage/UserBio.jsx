import { IoMdInformationCircleOutline } from "react-icons/io";

export function UserBio({ bio = "Chuyên trị các dòng game Souls-like" }) {
  return (
    <div className="bg-[#0a192f]/40 backdrop-blur-md border border-white/5 p-6 rounded-xl h-full flex flex-col gap-4 shadow-xl">
      {/* Header của phần Bio */}
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-green-500/20 rounded-md">
          <IoMdInformationCircleOutline className="text-green-500 size-5" />
        </div>
        <h3 className="text-green-500 font-bold text-xs uppercase tracking-[2px]">
          About
        </h3>
      </div>

      {/* Nội dung Bio */}
      <div className="relative">
        {/* Dấu ngoặc kép trang trí phía trên (tùy chọn) */}
        <span className="absolute -top-2 -left-2 text-4xl text-white/5 font-serif select-none">
          “
        </span>
        
        <p className="text-gray-300 italic text-lg leading-relaxed relative z-10 pl-2">
          "{bio}"
        </p>
      </div>

      {/* Trang trí thêm: vạch kẻ nhỏ phía dưới */}
      <div className="w-12 h-1 bg-gradient-to-r from-green-500/50 to-transparent rounded-full mt-auto" />
    </div>
  );
}
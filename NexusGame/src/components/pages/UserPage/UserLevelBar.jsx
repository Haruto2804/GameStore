export function UserLevelBar({user}) {
  // 1. Khai báo các giá trị cần thiết
  const currentXp = user?.xp || 0;
  const maxXp = user?.nextLevelXp; // Hoặc lấy từ user?.nextLevelXp nếu backend có trả về
  const level = user?.level || 1;

  // 2. Tính toán tỷ lệ phần trăm thanh kinh nghiệm
  const progressPercent = Math.min((currentXp / maxXp) * 100, 100); 

  return (
    <div className="bg-[#0a192f]/80 border border-white/5 p-5 rounded-xl w-full">
      {/* Header: Level & XP Points */}
      <div className="flex justify-between items-end mb-2">
        <div className="flex flex-col">
          <span className="text-green-500 text-[10px] font-bold uppercase tracking-[2px]">
            Current Standing
          </span>
          <h2 className="text-2xl font-bold text-white leading-tight">
            Level {level}
          </h2>
        </div>
        
        <div className="text-right">
          <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider block mb-1">
            Experience Points
          </span>
          <p className="text-gray-300 font-bold text-sm">
            <span className="text-white">{currentXp.toLocaleString()}</span>
            <span className="text-gray-500 mx-1">/</span>
            {maxXp?.toLocaleString('vi-VN')} XP
          </p>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="h-2.5 w-full bg-slate-800/50 rounded-full overflow-hidden relative">
        <div 
          className="h-full bg-green-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(34,197,94,0.6)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Footer Note */}
      <p className="mt-3 text-[11px] text-gray-500 italic">
        Next level in <span className="text-green-500/80 font-medium">{(maxXp - currentXp).toLocaleString()} XP</span> — Keep grinding!
      </p>
    </div>
  );
}
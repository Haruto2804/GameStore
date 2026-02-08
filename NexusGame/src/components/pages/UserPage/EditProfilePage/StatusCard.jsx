import { ShieldCheckIcon } from "lucide-react"
import { FaLock } from "react-icons/fa";
export function StatusCard({ xp, role,levelProgress }) {
  const MAX_LEVEL = 100;
  return (
    <div className="w-full border border-white/10 p-6 rounded-3xl relative overflow-hidden backdrop-blur-md">
      {/* Shield Icon */}
      <div className="absolute top-4 right-4 text-zinc-700">
        <ShieldCheckIcon className="w-8 h-8" />
      </div>

      {/* Admin Badge */}
      <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-1.5 rounded-full mb-6">
        <FaLock className="w-4 h-4 text-green-500" />
        <span className="text-xs font-bold text-green-500 tracking-wider">{role} ROLE</span>
      </div>

      {/* XP Info */}
      <div className="space-y-1">
        <p className="text-zinc-400 text-sm font-medium">Tổng kinh nghiệm</p>
        <p className="text-4xl font-black text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]">
          {xp?.toLocaleString('vi-VN') || 0} XP
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mt-8 space-y-3">
        <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,1)]"
          style ={{width: `${levelProgress}%`}}
          ></div>
        </div>
        <p className="text-[14px] font-bold text-zinc-500 uppercase">
          Tiến trình cấp độ: {levelProgress}%
        </p>
      </div>
    </div>
  )
}
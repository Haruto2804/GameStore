import { FaLevelUpAlt } from "react-icons/fa";
import { Link } from "react-router";
export function UserHero({ user }) {
  return (
    <div className="bg-[#0a192f]/80 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl flex flex-col gap-3 ">
      <div className="flex items-center gap-4">
        <div className="size-25 bg-slate-500 border-2 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)] rounded-lg">
          HarutoPicture
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-3xl">{user?.displayName}</p>
          <p className="text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)] font-bold">@{user?.username}</p>
          <div className="flex gap-2">
            <FaLevelUpAlt className="text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <p className="text-gray-400 text-sm font-medium">Level {user?.level}</p>
          </div>

        </div>

      </div>
      <Link to="/user/editProfile" >
        <button
          className="w-full py-2.5 rounded-lg font-bold text-white
    bg-green-600/10 border border-green-500/30 
    hover:bg-green-500 hover:text-black hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]
      transition-all duration-300 active:scale-[0.98] cursor-pointer">
          Edit Profile
        </button>
      </Link>

    </div>
  )
}
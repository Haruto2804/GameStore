import { useState } from "react";
import { FaUserPen, FaCircleInfo } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { AuthContext } from "../../../../Context/AuthContext";

export function EditProfileForm({user}) {

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const maxLength = 500;

  return (
    <div className="lg:col-span-8 space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-xl p-8">
        <div className="grid grid-cols-1 gap-8">
          
          {/* Tên hiển thị */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">Tên hiển thị</label>
            <div className="relative">
              <FaUserPen className="absolute top-4.5 left-4.5 size-5 text-green-500" />
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-background-dark border border-white/10 rounded-lg py-4 pl-12 pr-4 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all text-white font-medium"
                type="text"
                placeholder="Bạn tên là gì?"
              />
            </div>
          </div>

          {/* Email - Đã sửa lỗi đưa value vào input */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">System Email</label>
            <div className="relative">
              <MdOutlineMail className="absolute top-4.5 left-4.5 size-5 text-green-500" />
              <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background-dark border border-white/10 rounded-lg py-4 pl-12 pr-4 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all text-white font-medium" 
                type="email"
                placeholder="Email của bạn?"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">Tiểu sử</label>
              <span className={`text-[10px] font-medium ${bio.length >= maxLength ? 'text-red-500' : 'text-slate-500'}`}>
                {bio.length}/{maxLength}
              </span>
            </div>
            <textarea
              maxLength={maxLength}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-background-dark border border-white/10 rounded-lg p-4 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all text-white font-medium resize-none custom-scrollbar" 
              placeholder="Nói với cộng đồng về bản thân bạn..." 
              rows="5"
            />
          </div>

          {/* Account Role Info */}
          <div className="pt-4 border-t border-white/5">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10 opacity-70">
              <FaCircleInfo className="size-6 text-green-500" />
              <div>
                <p className="text-sm font-bold text-slate-300">Account Role: <span className="text-green-500">Admin</span></p>
                <p className="text-xs text-slate-500 mt-1">
                  Việc phân công vai trò được quản lý bởi hệ thống. Nếu bạn cho rằng đây là lỗi, vui lòng liên hệ Admin.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
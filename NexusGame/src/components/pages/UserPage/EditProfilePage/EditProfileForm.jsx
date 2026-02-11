import { useState } from "react";
import { FaUserPen, FaCircleInfo } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { AuthContext } from "../../../../Context/AuthContext";
import { validators } from "../../../../utils";
import axiosClient from '../../../../AxiosClient.js'
import { useContext } from "react";
export function EditProfileForm({ user }) {
  const { setUser} = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const maxLength = 500;

  const handleChangeProfile = async (e) => {
    e.preventDefault()
    if (!validators.displayName(displayName)) {
      alert('Tên hiển thị không hợp lệ!');
      return;
    }
    if (!validators.email(email)) {
      alert('Tên hiển thị không hợp lệ!');
      return;
    }
    if (bio.length > 500) {
      alert('Tiểu sử không được dài quá 500 kí tự!');
    }
    const updatedProfile = {
      displayName: displayName.trim(),
      email: email,
      bio: bio
    }

    try {
      const response = await axiosClient.post('/edit-profile', updatedProfile);
      setUser({
        ...user,
        ...updatedProfile
      })
      alert(response.data.message || "Cập nhật thành công!");
    }
    catch (err) {
      
      const serverMessage = err.response?.data?.message || "Cập nhật thất bại!";
      alert(serverMessage);
      console.log("Error details:", err.response?.data);
    }
  }
  return (
    <div className="lg:col-span-8 space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-xl p-8">
        <form
          onSubmit={handleChangeProfile}
          id="edit-profile-form" className="grid grid-cols-1 gap-8">
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
                <p className="text-sm font-bold text-slate-300">Account Role: <span className="text-green-500">{user?.role}</span></p>
                <p className="text-xs text-slate-500 mt-1">
                  Việc phân công vai trò được quản lý bởi hệ thống. Nếu bạn cho rằng đây là lỗi, vui lòng liên hệ Admin.
                </p>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
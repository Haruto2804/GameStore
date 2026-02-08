
import { StatusCard } from "./StatusCard"
import { UploadAvatar } from "./UploadAvatar"
import { EditProfileForm } from "./EditProfileForm"
import { useContext } from "react"
import { AuthContext } from "../../../../Context/AuthContext"
import { User } from "../User"
export function EditProfile() {
  const { user, isLoading } = useContext(AuthContext);
  console.log(user)
  if (isLoading) {
    return <div className="text-white">Đang tải dữ liệu người dùng...</div>;
  }

  return (
    <div className="bg-bg-base">
      <div className="bg-bg-base max-w-6xl text-white mx-auto p-4">
        <p className="font-bold text-4xl mt-20 mb-3">Profile Setting</p>
        <div className="flex flex-col md:flex-row self-start items-center justify-between gap-4">
          <p className="text-gray-400 flex self-start">Thiết lập danh tính quản trị và trạng thái hồ sơ của bạn.</p>
          <div className="flex gap-4 self-start">
            <button className="px-6 py-2.5 bg-red-500 rounded-lg border border-white/10 hover:bg-red-700 cursor-pointer transition-all text-sm font-medium">Hủy bỏ</button>
            <button className="px-6 py-2.5 rounded-lg bg-primary cursor-pointer bg-green-500 hover:brightness-110 transition-all text-sm  shadow-[0_0_20px_rgba(13,242,89,0.3)]">Lưu thay đổi</button>
          </div>
        </div>
        <div className=" flex gap-3 mt-20 flex-col md:flex-row ">
          <div className="flex flex-col gap-5 items-center">
            <StatusCard 
            xp = {user?.xp}
            role = {user?.role}
            levelProgress = {user?.levelProgress}
            />
            <UploadAvatar />
          </div>
          < EditProfileForm user={user} />
        </div>
      </div>
    </div>

  )
}
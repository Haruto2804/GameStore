import { useState, useRef, useContext } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import axiosClient from "../../../../AxiosClient";
import { AuthContext } from "../../../../Context/AuthContext";

export function UploadAvatar() {
  const [, setSelectedFile] = useState(null);
  const {user, setUser} = useContext(AuthContext);
  const fileInputRef = useRef(null);
  // Hàm kích hoạt chọn file khi click vào khung div
  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      console.log('Kich thuoc file:',sizeInMB)
      // Kiểm tra kích thước (2MB = 2 * 1024 * 1024 bytes)
      if (file.size > 2 * 1024 * 1024) {
        alert("File không được quá 2MB");
        return;
      }
      setSelectedFile(file);
      // Tạo link preview tạm thời để hiển thị lên màn hình
      const formData = new FormData();
      formData.append("avatar", file);
      try {
        const response = await axiosClient.post('/upload-avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        setUser({
          ...user,
          avatar: response.data.url
        })
        alert("Upload thành công!");
      }
      catch (err) {
        console.error("Lỗi upload:", err);
        alert("Upload thất bại!");
      }

    }

  };

  return (
    <div className="w-full border border-white/10 rounded-xl p-6">
      <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Avatar</h3>
      <div className="flex flex-col items-center gap-4">
        {/* Input file ẩn đi */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
          className="hidden"
        />

        <div
          onClick={handleDivClick}
          className="size-32 rounded-xl bg-background-dark border-2 border-dashed flex flex-col items-center justify-center group cursor-pointer hover:border-green-500 transition-colors relative overflow-hidden"
        >
          <img
            alt="Avatar"
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-20 transition-opacity"
            src={user?.avatar}
          />
          <IoCloudUploadOutline className="text-3xl text-green-500 opacity-40 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300 z-10" />
          <span className="text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 text-white mt-1">
            Upload Avatar
          </span>
        </div>

        <div className="text-center">
          <p className="text-xs text-slate-500 leading-relaxed">Kéo và thả hoặc nhấp chuột để tải lên.</p>
          <p className="text-xs text-slate-400 leading-relaxed mt-2">Kích thước tối đa 2MB (PNG, JPG).</p>
        </div>
      </div>
    </div>
  );
}
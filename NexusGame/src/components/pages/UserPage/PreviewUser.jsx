import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosClient from "../../../AxiosClient.js";
import { UserHero } from "./UserHero";
import { UserLevelBar } from "./UserLevelBar";
import { UserBio } from "./UserBio";
import { AccountInfo } from "./AccountInfo";

export function PreviewUser() {
  const { userId } = useParams(); // Lấy ID từ thanh địa chỉ
  const [targetUser, setTargetUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTargetUser = async () => {
      try {
        setLoading(true);
        // Gọi API lấy info user theo ID
        const response = await axiosClient.get(`/user/${userId}`);
        setTargetUser(response.data.user);
      } catch (err) {
        console.error("Lỗi khi tải hồ sơ:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTargetUser();
  }, [userId]);

  if (loading) return <div className="text-center mt-20 text-white">Đang soi hồ sơ chỉ huy...</div>;
  if (!targetUser) return <div className="text-center mt-20 text-red-500">Không tìm thấy người dùng!</div>;

  return (
    <div className="bg-bg-base min-h-screen">
      <div className="max-w-7xl mx-auto mt-20 text-white p-4 flex flex-col gap-3 md:flex-row">
        {/* Cột trái: Thông tin cơ bản */}
        <div className="basis-1/5 flex flex-col gap-3">
          {/* Ở đây KHÔNG dùng AccountNav vì đây là profile người khác, không phải menu quản lý */}
          <AccountInfo user={targetUser} />
          
          {/* Nút kết bạn sẽ nằm ở đây */}
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold transition-all">
            Thêm bạn bè
          </button>
        </div>

        {/* Cột phải: Nội dung chi tiết */}
        <div className="basis-2/3 p-4 flex flex-col gap-3">
          <UserHero user={targetUser} />
          <UserLevelBar user={targetUser} />
          <UserBio bio={targetUser?.bio} />
        </div>
      </div>
    </div>
  );
}
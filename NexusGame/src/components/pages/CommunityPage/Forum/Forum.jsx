import { ForumHeader } from "./ForumHeader";
import { ForumPost } from "./ForumPost";
import { ForumPagination } from './ForumPagination';

export function Forum({ communityPosts }) { 
  
  // Kiểm tra nếu communityPosts không tồn tại hoặc rỗng
  if (!communityPosts || communityPosts.length === 0) {
    return (
      <div className="flex-1 text-gray-400 text-center py-10">
        Không có bài viết nào trong mục này.
      </div>
    );
  }

  // Giả sử lấy tổng số bài từ độ dài mảng thực tế
  const totalPosts = communityPosts.length;

  return (
    <div className="flex-1"> {/* Thêm flex-1 để chiếm không gian bên phải */}
      <div className="flex flex-col gap-5">
        <ForumHeader />
        <div className="w-full h-0.5 bg-gray-800"></div>
        
        <div className="flex flex-col gap-5">
          {/* 2. Sửa lỗi map: dùng dấu () để return nhanh hoặc thêm từ khóa return */}
          {communityPosts.map((postItem) => (
            <ForumPost key={postItem.id || postItem._id} postItem={postItem} />
          ))}
          
          <ForumPagination totalPosts={totalPosts} />
        </div>
      </div>
    </div>
  );
}
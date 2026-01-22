import { ForumHeader } from "./ForumHeader";
import { ForumPost } from "./ForumPost";
import { ForumPagination } from './ForumPagination';

export function Forum({ communityPosts }) {

  // 1. Kiểm tra nếu không có dữ liệu bài viết
  // Lưu ý: communityPosts bây giờ là mảng posts trực tiếp từ Context truyền xuống
  if (!communityPosts || communityPosts.length === 0) {
    return (
      <div className="flex-1 text-gray-400 text-center py-10">
        Không có bài viết nào trong mục này.
      </div>
    );
  }
  console.log(communityPosts)
  return (
    <div className="flex-1">
      <div className="flex flex-col gap-5">
        <ForumHeader />
        <div className="w-full h-0.5 bg-gray-800"></div>
        <div className="flex flex-col gap-5">
          <ForumPagination />
          {/* Map danh sách bài viết hiện tại (5 bài) */}
          {communityPosts.map((postItem) => (
            <ForumPost key={postItem._id} postItem={postItem} />
          ))}

          {/* 2. Gọi Component phân trang mà KHÔNG cần truyền props rườm rà */}
          {/* Nó sẽ tự lấy totalPages và currentPage từ Context */}

        </div>
      </div>
    </div>
  );
}
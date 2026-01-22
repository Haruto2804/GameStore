import React, { useContext } from 'react';
import { CommunityContext } from '../../../../Context/CommunityContext';
export function ForumPagination() {
  const { totalPages, currentPage, setCurrentPage, posts } = useContext(CommunityContext)
  // Tạo mảng số trang từ totalPages giả lập
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  console.log(posts, totalPages, currentPage);
  return (
    <div className="p-6 bg-gray-950 text-white">
      {/* 1. Test hiển thị bài viết */}
      <div className="space-y-4 mb-10">
        {posts?.map((post) => (
          <div key={post._id} className="p-4 bg-gray-900 border border-gray-800 rounded">
            {post.title} (Trang {currentPage})
          </div>
        ))}
      </div>

      {/* 2. Test thanh phân trang */}
      <div className="flex justify-center gap-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)} // Bấm vào đây để xem hiệu ứng đổi màu nút
            className={`w-10 h-10 rounded-md border transition-all ${currentPage === number
              ? "bg-blue-600 border-blue-600 text-white"
              : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-600"
              }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}
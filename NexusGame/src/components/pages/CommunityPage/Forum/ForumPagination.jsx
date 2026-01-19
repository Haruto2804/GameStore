import React, { useState } from 'react';

export function ForumPagination() {
  // Giả sử bạn có 35 bài viết, mỗi trang hiện 5 bài => Tổng là 7 trang
  const totalPosts = 35; 
  const postsPerPage = 5;
  const totalPages = Math.ceil(totalPosts / postsPerPage); // Tự động tính ra 7

  const [currentPage, setCurrentPage] = useState(1);

  // Tạo danh sách số [1, 2, 3, 4, 5, 6, 7]
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center gap-2 mt-6">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`w-10 h-10 rounded-md border transition-all ${
            currentPage === number
              ? "bg-blue-600 border-blue-600 text-white" // Đang chọn: Xanh rực rỡ
              : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-600" // Bình thường: Màu tối phông bạt
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
}
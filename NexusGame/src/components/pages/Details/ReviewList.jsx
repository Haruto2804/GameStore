export function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-slate-500 mt-6 italic text-center">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>;
  }

  // Hàm định dạng ngày tháng
  const formatDate = (dateString) => {
    if (!dateString) return "Không rõ ngày";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="mt-10 space-y-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-2 h-6 bg-green-500 rounded-full"></span>
        Cộng đồng đánh giá ({reviews.length})
      </h3>

      {reviews.map((rev) => (
        <div key={rev._id} className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-black uppercase">
                {rev.userName ? rev.userName[0] : "?"}
              </div>
              <div>
                <h4 className="text-white font-medium">{rev.userName}</h4>
                <div className="flex text-yellow-500 text-xs">
                  {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Hiển thị ngày gửi ở đây */}
            <div className="text-right">
              <span className="text-slate-500 text-[11px] block">Đã đăng lúc:</span>
              <span className="text-slate-400 text-xs font-mono italic">
                {formatDate(rev.createdAt)}
              </span>
            </div>
          </div>
          
          <p className="text-slate-300 leading-relaxed text-sm md:text-base bg-slate-800/30 p-3 rounded-lg border-l-2 border-green-500">
            {rev.comment}
          </p>
        </div>
      ))}
    </div>
  );
}
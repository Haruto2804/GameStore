import axios from "axios";
import { useState } from "react";

export function ReviewForm({ id, onReviewAdded }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5); // Mặc định là 5 sao
  const [hover, setHover] = useState(0);   // Hiệu ứng khi di chuột qua sao
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return alert("Vui lòng nhập nội dung nhận xét!");

    try {
      const response = await axios.post('http://localhost:3000/games/reviews', {
        gameId: id,
        userName: "Guest",
        rating: rating, // Gửi số sao đã chọn thay vì số 5 cố định
        comment: comment,
      });

      alert("Gửi nhận xét thành công!");
      setComment("");
      setRating(5); // Reset về 5 sao sau khi gửi

      // Nếu có hàm callback từ cha, gọi nó để cập nhật list ngay lập tức
      if (onReviewAdded) onReviewAdded(response.data);
    } catch (error) {
      console.error("Lỗi khi gửi:", error);
      alert("Không thể gửi nhận xét!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 text-white max-w-2xl">
      {/* KHU VỰC CHỌN SAO */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-slate-400">Đánh giá của bạn:</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`text-2xl transition-all duration-200 transform 
                ${star <= (hover || rating) ? "text-yellow-400 scale-110" : "text-slate-600"
                }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </button>
          ))}
          <span className="ml-2 text-sm text-slate-500 self-center">
            ({rating}/5 sao)
          </span>
        </div>
      </div>

      {/* Ô NHẬP NỘI DUNG */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg blur opacity-20 group-focus-within:opacity-50 transition duration-1000"></div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="relative bg-slate-900 border border-slate-700 p-4 rounded-lg w-full h-32 
               focus:outline-none focus:border-green-500 transition-all duration-300
               placeholder:text-slate-500 text-sm md:text-base leading-relaxed"
          placeholder="Chia sẻ trải nghiệm của bạn về siêu phẩm này..."
        />
      </div>

      <div className="flex justify-between items-center">
        <p className="text-xs text-slate-500 italic">Hãy lịch sự và tôn trọng cộng đồng nhé!</p>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-400 text-black font-semibold cursor-pointer uppercase tracking-widest 
               px-8 py-2.5 rounded-md transition-all duration-300 transform hover:-translate-y-1 
               active:scale-95 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
        >
          GỬI
        </button>
      </div>
    </form>
  );
}
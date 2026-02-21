import { CategoryForumList } from "./Forum/CategoryForumList";
import { Forum } from "./Forum/Forum";
import { RiCommunityFill } from "react-icons/ri";
import { ForumLeaderBoard } from "./Forum/ForumLeaderBoard";
import { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CommunityContext } from "../../../Context/CommunityContext";
import axiosClient from "../../../AxiosClient";
import { AuthContext } from "../../../Context/AuthContext";

export function Community() {
  // 1. States cho dữ liệu bài viết
  const [postCategory, setPostCategory] = useState("");
  const {user} = useContext(AuthContext)
  // 2. States cho Modal và Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tagInput, setTagInput] = useState(""); // Lưu chữ đang gõ ở ô tag
  const [tags, setTags] = useState([]); // Lưu danh sách các tag đã tạo (#SADD, #DASD)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const { category, communityPosts, setCategory, setCommunityPosts } = useContext(CommunityContext);
  // 3. Logic xử lý Tag (Biến chữ thành #TAG)
  const handleTagKeyDown = (e) => {

    // Khi nhấn Space (Dấu cách) hoặc Enter
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const value = tagInput.trim().replace(/#/g, "").toUpperCase();
      if (value && !tags.includes(value)) {
        setTags([...tags, value]); // Thêm vào mảng tag
        setTagInput(""); // Xóa ô nhập để gõ tiếp
      }
    }
    // Khi nhấn Backspace để xóa tag cuối cùng
    else if (e.key === "Backspace" && !tagInput && tags.length > 0) {
      const newTags = [...tags];
      newTags.pop();
      setTags(newTags);
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };
  // 4. Logic gửi bài viết
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = {
      author: user.id,
      title: formData.title,
      content: {
        text: formData.content
      },
      tags: tags, // Mảng các tag đã nhập
      type: postCategory
    };

    try {
      console.log("Dữ liệu gửi lên server:", finalData);
      const res = await axiosClient.post('/community/post', finalData);

      // Sau khi gửi thành công:
      setIsModalOpen(false);
      setTags([]);
      setFormData({ title: "", content: "" });
      setCommunityPosts([res.data, ...communityPosts]);
      alert("Đăng bài thành công!");

    } catch (err) {
      console.error("Lỗi khi đăng bài:", err);
    }
  };
  return (
    <div className="bg-bg-base">
      <div className="bg-bg-base mt-22 p-4 min-h-screen relative">
        <div className="bg-bg-base max-w-6xl mx-auto px-6 fleax flex-col">
          {/* Header Section */}
          <p className="text-3xl flex items-center gap-3 text-white font-bold">
            <RiCommunityFill className="text-green-500" />
            Cộng Đồng Game: Hỏi & Đáp
          </p>

          <div className="flex flex-col gap-5 md:flex-row md:justify-between mb-5">
            <p className="text-gray-400 mt-2">
              Nơi chia sẻ kiến thức, mẹo chơi game và giải đáp thắc mắc cho game thủ.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="hover:-translate-y-1 w-fit font-bold hover:bg-green-600 text-white transition-all duration-300 bg-green-500 rounded-lg flex items-center justify-center py-3 px-6 cursor-pointer"
            >
              Đặt câu hỏi mới
            </button>
          </div>

          {/* Content Section */}
          <div className="flex flex-col md:flex-row gap-7">
            <div className="flex-4/6 flex flex-col gap-4">
              <CategoryForumList category={category} setCategory={setCategory} />
              <ForumLeaderBoard />
            </div>
            <Forum communityPosts={communityPosts} />
          </div>
        </div>

        {/* ----------------------------- */}
        {/* OVERLAY MODAL ĐẶT CÂU HỎI */}
        {/* ----------------------------- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
            {/* Lớp nền mờ cao cấp hơn */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsModalOpen(false)}
            ></div>

            {/* Nội dung Modal - Thêm hiệu ứng scale nhẹ */}
            <div className="bg-[#1a1d24] border border-gray-800/50 w-full max-w-lg rounded-3xl p-8 z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-all duration-300 animate-in fade-in zoom-in-95">

              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl text-white tracking-tight">Tạo câu hỏi mới</h2>
                  <p className="text-gray-500 text-sm mt-1">Chia sẻ thắc mắc của bạn với cộng đồng</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 bg-gray-800/50 text-gray-400 hover:text-white hover:bg-red-500/20 rounded-xl transition-all duration-300"
                >
                  <IoMdClose size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* Tiêu đề */}
                <div className="space-y-2">
                  <label className="text-gray-400 text-[11px]  uppercase tracking-[0.15em] ml-1">
                    Tiêu đề bài viết
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Ví dụ: Cách vượt ải Boss cuối..."
                    className="w-full bg-[#0f1115] border border-gray-700/50 rounded-2xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500/50 focus:ring-4 focus:ring-green-500/10 transition-all duration-300"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                {/* Ô Nhập Tag & Loại bài viết (Chia đôi hàng) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Category Select */}
                  <div className="space-y-2">
                    <label className="text-gray-400 text-[11px]  uppercase tracking-[0.15em] ml-1">
                      Danh mục
                    </label>
                    <div className="relative">
                      <select
                        required
                        className="w-full bg-[#0f1115] border border-gray-700/50 rounded-2xl p-4 text-white appearance-none focus:outline-none focus:border-green-500/50 focus:ring-4 focus:ring-green-500/10 transition-all duration-300 cursor-pointer"
                        onChange={(e) => setPostCategory(e.target.value)}
                      >
                        <option value="" disabled selected>Chọn loại...</option>
                        <option value="qna">Hỏi & đáp</option>
                        <option value="guide">Hướng dẫn</option>
                        <option value="hardware">Phần cứng</option>
                      </select>
                      {/* Icon mũi tên cho Select */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Tags Section */}
                  <div className="space-y-2">
                    <label className="text-gray-400 text-[11px]  uppercase tracking-[0.15em] ml-1">
                      Tags
                    </label>
                    <div className=" max-h-30 flex overflow-y-auto flex-wrap gap-2 p-3 bg-[#0f1115] border border-gray-700/50 rounded-2xl min-h-[56px] items-center focus-within:border-green-500/50 focus-within:ring-4 focus-within:ring-green-500/10 transition-all duration-300" >
                      {tags.map((tag, index) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1.5 bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1.5 rounded-xl text-[11px] font-bold animate-in fade-in slide-in-from-left-2"
                        >
                          #{tag}
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="hover:text-red-500 transition-colors"
                          >
                            <IoMdClose size={12} />
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        placeholder={tags.length === 0 ? "Tag..." : ""}
                        className="flex-1 bg-transparent border-none outline-none text-white text-sm p-1 min-w-[60px] placeholder:text-gray-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Nội dung */}
                <div className="space-y-2">
                  <label className="text-gray-400 text-[11px]  uppercase tracking-[0.15em] ml-1">
                    Nội dung chi tiết
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Mô tả cụ thể vấn đề của bạn..."
                    className="w-full bg-[#0f1115] border border-gray-700/50 rounded-2xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500/50 focus:ring-4 focus:ring-green-500/10 transition-all duration-300 resize-none"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  ></textarea>
                </div>

                {/* Nút gửi bài */}
                <button
                  type="submit"
                  className="mt-4 bg-green-500 hover:bg-green-400 text-[#0f1115]  py-5 rounded-2xl transition-all duration-300 active:scale-[0.96] uppercase tracking-[0.2em] text-sm shadow-[0_10px_30px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2"
                >
                  Đăng bài cộng đồng
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.493-7.493Z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>

  );
}
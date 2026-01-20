import { CategoryForumList } from "./Forum/CategoryForumList";
import { Forum } from "./Forum/Forum";
import { RiCommunityFill } from "react-icons/ri";
import { ForumLeaderBoard } from "./Forum/ForumLeaderBoard";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

export function Community() {
  // 1. States cho dữ liệu bài viết
  const [category, setCategory] = useState("");
  const [communityPosts, setCommunityPosts] = useState([]);

  // 2. States cho Modal và Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tagInput, setTagInput] = useState(""); // Lưu chữ đang gõ ở ô tag
  const [tags, setTags] = useState([]); // Lưu danh sách các tag đã tạo (#SADD, #DASD)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchCommunityPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/community/posts');
        setCommunityPosts(res.data);
      } catch (err) {
        console.error('Lỗi khi fetch community Posts: ', err);
      }
    };
    fetchCommunityPosts();
  }, []);

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
      title: formData.title,
      content: {
        text: formData.content
      },
      author: "Haruto",
      tags: tags // Mảng các tag đã nhập
    };

    try {
      console.log("Dữ liệu gửi lên server:", finalData);
      await axios.post('http://localhost:3000/api/community/posts', finalData);

      // Sau khi gửi thành công:
      setIsModalOpen(false);
      setTags([]);
      setFormData({ title: "", content: "" });
      alert("Đăng bài thành công!");
    } catch (err) {
      console.error("Lỗi khi đăng bài:", err);
    }
  };

  return (
    <div className="bg-bg-base">
      <div className="bg-bg-base mt-22 p-4 min-h-screen relative">
        <div className="bg-bg-base max-w-6xl mx-auto px-6 flex flex-col">
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
          <div className="fixed inset-0 z-3000 flex items-center justify-center p-4">
            {/* Lớp nền mờ */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
              onClick={() => setIsModalOpen(false)}
            ></div>

            {/* Nội dung Modal */}
            <div className="bg-[#1a1d24] border border-gray-700 w-full max-w-lg rounded-2xl p-7 z-10 shadow-2xl scale-in-center transition-transform">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight">Tạo câu hỏi mới</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <IoMdClose size={28} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Tiêu đề */}
                <div>
                  <label className="text-gray-400 text-xs font-bold uppercase mb-2 block tracking-wider">
                    Tiêu đề bài viết
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Tiêu đề ngắn gọn, rõ ràng..."
                    className="w-full bg-[#0f1115] border border-gray-700 rounded-xl p-3.5 text-white focus:outline-none focus:border-green-500 transition-all"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                {/* Ô Nhập Tag Kiểu Viên Thuốc */}
                <div>
                  <label className="text-gray-400 text-xs font-bold uppercase mb-2 block tracking-wider">
                    Tags (Gõ chữ rồi nhấn Space hoặc Enter)
                  </label>
                  <div className="flex flex-wrap gap-2 p-2.5 bg-[#0f1115] border border-gray-700 rounded-xl min-h-[56px] items-center focus-within:border-green-500 transition-all">
                    {/* Hiển thị danh sách các tag đã gõ */}
                    {tags.map((tag, index) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1.5 bg-green-500/10 text-green-500 border border-green-500/30 px-2.5 py-1 rounded-lg text-xs font-black"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <IoMdClose size={14} />
                        </button>
                      </span>
                    ))}

                    {/* Input nhập text cho tag */}
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      placeholder={tags.length === 0 ? "VD: Thảo luận, Góc PC..." : ""}
                      className="flex-1 bg-transparent border-none outline-none text-white text-sm p-1 min-w-30"
                    />
                  </div>
                </div>

                {/* Nội dung */}
                <div>
                  <label className="text-gray-400 text-xs font-bold uppercase mb-2 block tracking-wider">
                    Nội dung chi tiết
                  </label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Mô tả chi tiết câu hỏi của bạn tại đây..."
                    className="w-full bg-[#0f1115] border border-gray-700 rounded-xl p-3.5 text-white focus:outline-none focus:border-green-500 transition-all resize-none"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  ></textarea>
                </div>

                {/* Nút gửi bài */}
                <button
                  type="submit"
                  className="mt-2 bg-green-500 hover:bg-green-600 text-[#0f1115] font-black py-4 rounded-xl transition-all active:scale-[0.98] uppercase tracking-widest shadow-lg shadow-green-500/20"
                >
                  Đăng bài cộng đồng
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>

  );
}
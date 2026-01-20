
import { FaBookBookmark } from "react-icons/fa6";
import { MdOutlineShare } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import HarutoPicture from '../../../../public/haruto.png'
import { FaEye } from "react-icons/fa";
import { CommentSection } from "./CommentSection";
import { CommentList } from "./CommentList";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import axios from "axios";
import { useCallback } from "react";
// ... (giữ nguyên phần import)

export function DetailsPost() {
  const [comment, setComment] = useState("");
  const [post, setPost] = useState({});
  const { id } = useParams();


  const handleLikePost = async () => {
    try {
      const resLike = await axios.patch(`http://localhost:3000/api/community/posts/${id}/likes`);
      setPost(resLike.data);
    }
    catch (err) {
      console.error("Không thể like bài viết:", err);
    }
  }
  const handleDisLikePost = async () => {
    try {
      const resLike = await axios.patch(`http://localhost:3000/api/community/posts/${id}/dislikes`);
      setPost(resLike.data);
    }
    catch (err) {
      console.error("Không thể like bài viết:", err);
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const incrementView = useCallback(async () => {
    try {
      await axios.patch(`http://localhost:3000/api/community/posts/${id}/views`);
      console.log("Đã cộng 1 view sau 60 giây xem!");
    }
    catch (err) {
      console.error("Không thể cập nhật view bài viết:", err);
    }
  },[id])
  useEffect(() => {
    const fecthDetailsPost = async () => {
      try {
        const postRes = await axios.get(`http://localhost:3000/api/community/posts/${id}`);
        setPost(postRes.data);
      } catch (err) {
        console.error("Lỗi fetch details:", err);
      }
    };
    fecthDetailsPost();
    const timer = setTimeout(() => {
      incrementView();
    }, 60000)
    return () => clearTimeout(timer);
  }, [id, incrementView]);
  return (
    <div className="bg-bg-base mt-22">
      <div className="text-white max-w-5xl mx-auto p-4">
        {/* Breadcrumbs */}
        <div className="flex gap-3 w-full">
          <Link to="/" className="hover:text-blue-500 transition-all">Home</Link>
          <p>/</p>
          <Link to="/community" className="hover:text-blue-500 transition-all">Community</Link>
          <p>/</p>
          {/* Dùng Optional Chaining cho tiêu đề trên breadcrumb */}
          <p className="text-gray-400 truncate">{post?.title || "Loading..."}</p>
        </div>

        {/* Title */}
        <p className="font-bold text-3xl md:text-4xl lg:text-5xl mt-5">
          {post?.title}
        </p>

        {/* User Section */}
        <div className="user-section flex flex-col md:flex-row justify-between mt-5 gap-5 md:items-center">
          <div className="flex gap-5 cursor-pointer group items-center">
            <img src={HarutoPicture} className="group-hover:ring-3 group-hover:ring-blue-500 rounded-full size-12 object-cover transition-all" alt="avatar" />
            <div className="flex flex-col">
              <p className="font-bold group-hover:text-blue-500">Haruto</p>
              <div className="flex gap-2 text-blue-500/70">
                {/* Optional Chaining cho ngày tháng */}
                <p>{post?.formatted_date}</p>
                <p> | </p>
                <p>Level 58</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 h-fit">
            <button className="text-[14px] group flex items-center gap-3 bg-blue-500/50 py-2 px-8 cursor-pointer transition-all rounded-full">
              <FaBookBookmark className="size-5 group-hover:text-blue-500 transition-all" />
              <p>Save</p>
            </button>
            <button className="text-[14px] group flex items-center gap-3 bg-blue-500/50 py-2 px-8 cursor-pointer transition-all rounded-full">
              <MdOutlineShare className="size-5 group-hover:text-blue-500 transition-all" />
              <p>Share</p>
            </button>
          </div>
        </div>

        <div className="w-full h-0.5 bg-gray-800 mt-5"></div>

        {/* Content Section - Quan trọng nhất */}
        <div className="content mt-5 flex flex-col whitespace-pre-line">
          {post?.content?.text}
        </div>

        {/* Tags Section */}
        <div className="tag flex gap-3 mt-10">
          {post?.tags?.map((item, index) => (
            <p key={index} className="cursor-pointer text-blue-500 hover:underline text-[14px]">
              #{item}
            </p>
          ))}
        </div>

        {/* Interaction Section */}
        <div className="flex justify-between mt-5 rounded-lg border border-blue-900/50 bg-blue-800/30 p-4 text-blue-700 items-center">
          <div className="flex gap-7">
            <div className="flex items-center gap-1 bg-blue-900 rounded-lg p-1 w-fit">
              <button
                onClick={() => handleLikePost()}
                className="p-2 hover:bg-[#3e5246] rounded-md text-[#9eb7a8] hover:text-blue-500">
                <AiOutlineLike className="size-6 cursor-pointer" />
              </button>
              {/* Optional Chaining cho upvotes */}
              <span className="text-white font-bold px-2">{post?.stats?.upvotes || 0}</span>
              <button
                onClick={() => handleDisLikePost()}
                className="p-2 hover:bg-[#3e5246] rounded-md text-[#9eb7a8] hover:text-red-400 transition-colors">
                <AiOutlineDislike className="size-6 cursor-pointer" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <FaEye className="size-6" />
              {/* Hiển thị views */}
              <p>{post?.stats?.views?.toLocaleString() || 0} Views</p>
            </div>
          </div>
          {/* Lặp lại upvotes phía bên phải nếu cần */}
          <p className="font-bold text-white">{post?.stats?.upvotes} Upvotes</p>
        </div>

        <div className="w-full h-0.5 bg-gray-800 mt-5 mb-5"></div>

        <CommentSection comment={comment} setComment={setComment} />
        <div className="mt-5">
          <CommentList />
        </div>
      </div>
    </div>
  );
}
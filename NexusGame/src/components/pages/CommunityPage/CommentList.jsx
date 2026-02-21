
import { FaBookBookmark, FaReply, FaRegHeart, FaEye } from "react-icons/fa6";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdOutlineShare, MdSend } from "react-icons/md";
import { HiDotsHorizontal, HiOutlineEmojiHappy } from "react-icons/hi";
import { LiaCommentsSolid } from "react-icons/lia";
import { formatDateString } from '../../../utils.js'
import Heart from "react-heart"
import { useState } from "react";
import LikeButton from "../../General/LikeButton.jsx";
export function CommentList({ comments, handleLikeComment }) {
  const [isLiked, setIsLiked] = useState(false);
  if (!comments) return <p>Loading comments...</p>;
  return (
    <div className=" min-h-screen font-sans selection:bg-blue-500/30">
      <div className="max-w-5xl mx-auto p-4 text-white">
        <section className="mt-24 border-t border-slate-800 pt-12">
          {/* Danh Sách Bình Luận Phân Cấp (blue Accents) */}
          <div className="flex flex-col gap-10">
            {comments?.map((comment) => {
              const postDate = comment.createdAt
                ? formatDateString(comment.createdAt)
                : "Vừa xong";
              return (
                <div key={comment?.author?.postId} className="relative">
                  {/* Bình luận cấp 1 */}
                  <div className="flex gap-5">
                    <div className="shrink-0">
                      <img src={comment?.author?.avatar} className="size-12 rounded-full border-2 border-slate-800 group-hover:border-blue-500 object-cover" alt="avatar" />
                    </div>
                    <div className="flex-1 bg-slate-900/30 border border-slate-800 p-5 rounded-3xl hover:border-blue-900/50 transition-colors">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-white hover:text-blue-500 cursor-pointer transition-colors">{comment?.author?.displayName}</span>
                          <span className="text-[10px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-md border border-blue-500/20 font-black uppercase tracking-wider">Lv.{comment?.author.level}</span>
                          <span className="text-xs text-slate-500">{postDate}</span>
                        </div>
                        <HiDotsHorizontal className="text-slate-600 cursor-pointer hover:text-white transition-colors" />
                      </div>
                      <p className="text-slate-300 leading-relaxed">{comment.content}</p>
                      <div className="flex gap-8 mt-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <div
                          onClick={() => handleLikeComment()}
                          className="flex items-center gap-2 hover:text-red-500 transition-colors">
                          <LikeButton color ="red" liked = {isLiked} />
                          {comment?.likeCounts}
                        </div>
                        <button className="flex items-center gap-2 hover:text-blue-500 transition-colors"><FaReply className="size-3.5" /> Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
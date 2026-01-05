import { RiStarSLine } from "react-icons/ri";
import { IoHardwareChipSharp } from "react-icons/io5";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import HarutoPicture from '../../../../public/haruto.png'
import { AiOutlineLike } from "react-icons/ai";
import { Payment } from "./Payment";
import { useParams } from "react-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { DataGameContext } from "../../../Context/GameContext";
import { CartContext } from "../../../Context/CartContext";
import { Link } from "react-router";
import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "./ReviewList";
import axios from "axios";
import { RiStarFill } from "react-icons/ri";
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN"); // Trả về định dạng DD/MM/YYYY
};
export function GameDetails() {
  const [reviews, setReviews] = useState([]);
  const [, setError] = useState("");
  const { id } = useParams();
  const { gameData } = useContext(DataGameContext);
  const [topReviews, setTopReviews] = useState([]);
  const fetchReviews = useCallback(async () => {
    try {
      const [allRes, resTop] = await Promise.all([
        axios.get(`http://localhost:3000/games/reviews/${id}`),
        axios.get(`http://localhost:3000/games/reviews/top/${id}`)
      ])
      setReviews(allRes.data);
      setTopReviews(resTop.data);
      setError("");
    }
    catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
      setError("  Không thể tải đánh giá");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);
  console.log(topReviews);
  const item = gameData.find((item) => item._id == id);

  return (
    <div className="bg-bg-base">
      <div className=" mt-22 max-w-7xl mx-auto p-2 text-sm flex flex-col gap-3" >
        <div className="flex gap-2 text-slate-400 ">
          <Link to="/" className="select-none cursor-pointer">Store</Link>
          <p className="">/</p>
          <p className="text-white">{item?.game_title}</p>
        </div>
        <div>
          <p className="text-2xl md:text-4xl lg:text-5xl text-white font-bold mb-2">{item?.game_title}</p>
          <div className="flex gap-2">
            <div className="flex">
              <RiStarSLine className="size-5 text-yellow-400" />
              <RiStarSLine className="size-5 text-yellow-400" />
              <RiStarSLine className="size-5 text-yellow-400" />
              <RiStarSLine className="size-5 text-yellow-400" />
              <RiStarSLine className="size-5 text-yellow-400" />
            </div>
            <p className="font-bold text-white">{item?.rating}</p>
            <p className=" text-slate-400">({item?.reviews_count})</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 flex-1">
          <div className="basis-2/3 p-4">
            <img className="mx-auto mb-5" src={item?.media.thumbnail} alt="minecraft" border="0" />
            <div className="flex gap-4 justify-center">
              <img tabIndex="0" className=" w-30 h-20 cursor-pointer focus:ring-2 focus:ring-white hover:ring-white border transition-all duration-300 rounded-md" src="https://i.ibb.co/32fh1vN/minecraft.webp" alt="minecraft" border="0" />
              <img tabIndex="0" className=" w-30 h-20 cursor-pointer focus:ring-2 focus:ring-white hover:ring-white border transition-all duration-300 rounded-md" src="https://i.ibb.co/32fh1vN/minecraft.webp" alt="minecraft" border="0" />
              <img tabIndex="0" className=" w-30 h-20 cursor-pointer focus:ring-2 focus:ring-white hover:ring-white border transition-all duration-300 rounded-md" src="https://i.ibb.co/32fh1vN/minecraft.webp" alt="minecraft" border="0" />
            </div>
            <div className="w-full border-slate-700 rounded-lg bg-slate-900 p-6 mt-5">
              <p className="font-bold text-xl text-white mb-5 lg:text-2xl">About the game</p>
              <p className=" text-slate-400 text-justify text-md lg:text-lg">{item?.description.long_description}</p>
              <p className="text-cyan-500 mt-5 cursor-pointer hover:text-cyan-100 transition-all duration-300">Read more</p>
            </div>
            <div className="w-full">
              <div className="flex flex-col gap-2 p-4 bg-slate-900 mt-5 rounded-lg">
                <div className="flex gap-2 items-center">
                  <IoHardwareChipSharp className="size-5 text-gray-400 " />
                  <p className="font-bold text-white text-lg">Minimum Requirements</p>
                </div>
                <div className="div flex justify-between">
                  <p className="text-slate-500">OS:</p>
                  <p className="text-gray-400">{item?.requirements.minimum.os}</p>
                </div>
                <div className="div flex justify-between">
                  <p className="text-slate-500">Processor:</p>
                  <p className="text-gray-400">{item?.requirements.minimum.processor}</p>
                </div>
                <div className="div flex justify-between">
                  <p className="text-slate-500">Memory:</p>
                  <p className="text-gray-400">{item?.requirements.minimum.memory}</p>
                </div>
                <div className="div flex justify-between">
                  <p className="text-slate-500">OS:</p>
                  <p className="text-gray-400">{item?.requirements.minimum.graphics}</p>
                </div>
              </div>

            </div>
            <div className="w-full">
              <div className="flex flex-col gap-2 p-4 bg-slate-900 mt-5 rounded-lg">
                <div className="flex gap-2 items-center">
                  <BsFillRocketTakeoffFill className="size-5 text-green-500 " />
                  <p className="font-bold text-white text-lg">Recommended</p>
                </div>

                <div className="div flex justify-between">
                  <p className="text-slate-500">OS:</p>
                  <p className="text-gray-400">{item?.requirements.recommended.os}</p>
                </div>
                <div className="div flex justify-between">
                  <p className="text-slate-500">Processor:</p>
                  <p className="text-gray-400">{item?.requirements.recommended.processor}</p>
                </div>
                <div className="div flex justify-between">
                  <p className="text-slate-500">Memory:</p>
                  <p className="text-gray-400">{item?.requirements.recommended.memory}</p>
                </div>
                <div className="div flex justify-between">
                  <p className="text-slate-500">OS:</p>
                  <p className="text-gray-400">{item?.requirements.recommended.graphics}</p>
                </div>
              </div>

            </div>
            <div className="w-full mt-5 ">
              <p className="font-bold text-xl text-white mb-5 ">Community Reviews</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {topReviews?.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className=" line-clamp-2 group relative bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all duration-500 ease-out shadow-xl hover:shadow-blue-500/10"
                    >
                      {/* Trang trí góc thẻ (Option) */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 blur-[50px] group-hover:bg-blue-500/10 transition-colors" />

                      <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                          <div className="relative">
                            <img
                              src={HarutoPicture}
                              className="size-12 rounded-xl object-cover ring-2 ring-slate-800 group-hover:ring-blue-500/30 transition-all"
                              alt={item?.userName}
                            />
                            <div className="absolute -bottom-1 -right-1 size-4 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                          </div>
                          <div>
                            <p className="text-slate-100 font-semibold tracking-tight leading-none mb-1.5">
                              {item?.userName}
                            </p>
                            <p className="text-slate-500 text-xs font-medium">
                              {formatDate(item?.createdAt)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 py-1.5 px-3 rounded-full border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider">
                          <AiOutlineLike className="size-3.5" />
                          <span>Recommended</span>
                        </div>
                      </div>

                      {/* PHẦN HIỂN THỊ SỐ SAO */}
                      <div className="flex items-center mt-5 mb-3 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <RiStarFill
                            key={i}
                            className={`size-4 ${i < item?.rating ? "text-yellow-400" : "text-slate-700"
                              } transition-colors duration-300`}
                          />
                        ))}
                        <span className="text-slate-400 text-xs ml-3 font-mono">
                          {item?.rating?.toFixed(1)}
                        </span>
                      </div>

                      <div className="relative">
                        {/* Dấu nháy kép trang trí */}
                        <span className="absolute -top-2 -left-2 text-4xl text-slate-800 font-serif opacity-50">“</span>
                        <p className="text-slate-300 text-sm leading-relaxed relative z-10 pl-2">
                          {item?.comment}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="font-bold text-xl text-white mb-5 ">Hãy để lại nhận xét của bạn về game.</p>
              <ReviewForm id={id} fetchReviews = {fetchReviews}/>
            </div>
            <ReviewList reviews={reviews} />
          </div>
          <div className=" basis-2/6 p-4">
            <Payment item={item} />
          </div>
        </div>

      </div>
    </div>
  )
}
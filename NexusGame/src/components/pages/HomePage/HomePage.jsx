
import LikeButton from '../../General/LikeButton'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CardGame } from './CardGame';
import { DataGameContext } from '../../../Context/GameContext.js';
import { ActionFeedBack } from '../../General/ActionFeedback';
import { TbShoppingCartFilled } from "react-icons/tb";
import { CartContext } from '../../../Context/CartContext.js';
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
const categories = [
  {
    id: "all",
    genre: "Tất cả"
  },
  {
    id: "action",
    genre: "Hành động"
  },
  {
    id: "rpg",
    genre: "Nhập vai (RPG)"
  },
  {
    id: "tactics",
    genre: "Chiến thuật"
  },
  {
    id: "sports",
    genre: "Thể thao"
  },
  {
    id: "survival",
    genre: "Sinh tồn"
  },
  {
    id: "horror",
    genre: "Kinh dị"
  },

]
export function HomePage() {
  const { addToCart } = useContext(CartContext);
  const [liked, setLiked] = useState(false);
  const [top1Game, setTop1Game] = useState({});
  const [featuredGames, setFeaturedGames] = useState([]);
  const [bestDiscountGames, setBestDiscountGames] = useState([]);
  const [, setError] = useState("");
  const finalPriceTop1Game = useMemo(() => {
    const base_price = Number(top1Game?.pricing?.base_price);
    const discount_percent = Number(top1Game?.pricing?.discount_percent);
    if (discount_percent === 0) {
      return base_price;
    }
    else {
      return base_price * (1 - discount_percent / 100);
    }
  }, [top1Game])


  const [chooseGenre, setChooseGenre] = useState("");
  const [isOpenAddToCart, setIsOpenAddToCart] = useState(false);
  const [isOpenWishes, setIsOpenWishes] = useState(false);
  const handleIsOpenAddToCart = useCallback(() => {
    setIsOpenAddToCart(!isOpenAddToCart);
    setTimeout(() => {
      setIsOpenAddToCart(false);
    }, 2000)
  }, [isOpenAddToCart]);
  const handleWishList = useCallback(() => {
    setIsOpenWishes(!isOpenWishes);
    setTimeout(() => {
      setIsOpenWishes(false);
    }, 2000)
  }, [isOpenWishes])
  const fetchDataGame = useCallback(async () => {
    try {
      const [top1Res, featuredRes, bestDiscountRes] = await Promise.all([
        axios.get('http://localhost:3000/games/top-rated'),
        axios.get('http://localhost:3000/games/featured'),
        axios.get('http://localhost:3000/games/best_discount'),

      ])
      setTop1Game(top1Res.data);
      setFeaturedGames(featuredRes.data);
      setBestDiscountGames(bestDiscountRes.data);
      setError("");
    }
    catch (err) {
      console.error("Fetch games error:", err);
      setError("Không thể tải dữ liệu game. Vui lòng thử lại sau.");
    }
  }, [])
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDataGame();
  }, [fetchDataGame]);
  return (
    <div className="bg-bg-base pb-20">
      <ActionFeedBack
        Icon={FaHeart}
        title="Đã thêm vào ước muốn"
        isOpen={isOpenWishes}
      />
      <ActionFeedBack
        title="Đã thêm vào giỏ hàng."
        Icon={TbShoppingCartFilled}
        isOpen={isOpenAddToCart} ></ActionFeedBack>
      <div className="relative mt-20 w-full h-175 max-h-screen overflow-hidden group">
        {/* 2. Ảnh sẽ phóng to bên trong khung này */}
        <img
          src={top1Game?.media?.thumbnail}
          className="absolute inset-0 object-cover h-full w-full transition-transform duration-1000 ease-in-out group-hover:scale-110"
          alt="Cyberpunk 2077"
        />

        {/* 3. Lớp phủ đen (Overlay) - Thêm pointer-events-none để không chặn chuột */}
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>

        {/* 4. Nội dung text và nút bấm */}
        <div className="absolute inset-0 z-20 p-4 flex flex-col justify-center left-7 w-5/6 md:gap-5 gap-8">
          <div className="bg-green-500 p-2 rounded-full w-40">
            <p className="uppercase text font-bold text-xs">Game có điểm MetaScore cao nhất</p>
          </div>

          <p className="text-4xl text-white font-bold mt-5 md:w-2/3 lg:text-5xl drop-shadow-lg">
            {top1Game?.game_title}
          </p>

          <p className="md:text-xl text-gray-300 w-2/3 line-clamp-3 font-semibold drop-shadow-md">
            {top1Game?.description?.long_description}
          </p>

          <div className="flex flex-col gap-4 mt-8 md:flex-row">
            <button
              onClick={() => {
                addToCart(top1Game);
                handleIsOpenAddToCart()
              }}
              className="bg-green-500 p-3 px-8 rounded-lg font-bold text-black cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:bg-green-400">
              Thêm vào giỏ hàng ngay - {finalPriceTop1Game.toLocaleString('vi-VN')} {top1Game?.pricing?.currency}
            </button>

            <div
              onClick={() => setLiked(!liked)}
              className="relative"
            >
              <button
                onClick={() => {
                  if (!liked) {
                    handleWishList();
                  }
                }}
                className={`
                ${liked ? "ring-2 ring-red-500 shadow-lg shadow-red-500/20" : "ring-1 ring-white/30"}
                bg-white/10 backdrop-blur-md w-full text-white p-3 pl-12 rounded-lg 
                font-semibold transition-all duration-300 hover:bg-white/20
              `}>
                Thêm vào ước muốn
              </button>
              <div className="  absolute top-2 left-2 pointer-events-none">
                <LikeButton color="red" size={32} liked={liked} />
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="px-5 mt-10 grid grid-cols-3 gap-2 md:flex md:w-full">
        {
          categories.map((item) => {
            const isActive = chooseGenre === item.id;
            return (
              <button
                value={item.name}
                onClick={() => {
                  setChooseGenre(item.id)
                }}
                key={item.id} className={`
              ${isActive ? "bg-green-500" : ""}
              whitespace-nowrap flex items-center cursor-pointer px-4 py-2 hover:bg-[#1F2937] 
              text-white border border-[#1f2937] 
              hover:border-gray-600 font-medium rounded-lg text-sm transition-all duration-300`}>{item.genre}</button>
            )
          })
        }
      </div>

      <div className="container mx-auto px-4 mt-10">
        <p className="text-white text-2xl font-bold mb-3">Trò chơi nổi bật</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {featuredGames?.map((item) => {
            return (
              <CardGame key={item._id} item={item} />
            )
          })}


        </div>
      </div>
      <div className="container mx-auto px-4 mt-10">
        <p className="text-white text-2xl font-bold mb-3">Khuyến mãi đặc biệt</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {bestDiscountGames.length > 0 ? (
            bestDiscountGames.map((item) => (
              <CardGame key={item._id} item={item} />
            ))
          ) : (
            <p className="text-slate-500 italic">Hiện chưa có chương trình giảm giá...</p>
          )}
        </div>

      </div>

    </div>
  );
}
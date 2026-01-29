import { useState, useEffect } from 'react';
import axios from 'axios';
import { CardGame } from '../HomePage/CardGame';
// Đảm bảo file GameFilters.jsx tồn tại hoặc đặt component ở dưới nhưng xóa dòng import này
import { GameFilters } from './GameFilters';
import { IoSearchOutline } from "react-icons/io5";
import axiosClient from '../../../AxiosClient';

const categories = [
  { id: "all", genre: "Tất cả" },
  { id: "action", genre: "Hành động" },      // Black Myth: Wukong, AC Shadows
  { id: "rpg", genre: "Nhập vai (RPG)" },    // Baldur's Gate 3, Black Myth: Wukong
  { id: "adventure", genre: "Phiêu lưu" },   // AC Shadows
  { id: "strategy", genre: "Chiến thuật" },  // Baldur's Gate 3
  { id: "indie", genre: "Indie" },           // Among Us
  { id: "social", genre: "Xã hội/Phản bội" } // Among Us
];

export function GameLibraryPage() {
  const [allGames, setAllGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [priceRange, setPriceRange] = useState(2000000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllGames = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get('/games');
        // Đảm bảo res.data là một mảng
        const data = Array.isArray(res.data) ? res.data : [];
        setAllGames(data);
        setFilteredGames(data);
      } catch (err) {
        console.error("Lỗi tải kho game:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllGames();
  }, []);

  useEffect(() => {
    // Lọc dữ liệu
    const result = allGames.filter(game => {
      const matchGenre = selectedGenre === "all" || 
      (game.genres && game.genres.some(g=> g.toLowerCase()=== selectedGenre.toLowerCase() ));
      const matchSearch = game.game_title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchPrice = Number(game.pricing?.base_price || 0) <= priceRange;
      return matchGenre && matchSearch && matchPrice;
    });

    setFilteredGames(result);
  }, [searchTerm, selectedGenre, priceRange, allGames]);

  return (
    <div className="bg-bg-base">
      <div className="bg-bg-base min-h-screen pt-28 pb-20 px-4 md:px-10 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-5">
            <h1 className="text-3xl font-extrabold">Kho Trò Chơi</h1>

            <div className="relative w-full md:w-96">
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Tìm tên game..."
                className="w-full bg-[#1a202c] border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-green-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <GameFilters
                categories={categories}
                selectedGenre={selectedGenre}
                onGenreChange={setSelectedGenre}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
              />
            </div>

            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-500"></div>
                </div>
              ) : filteredGames.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredGames.map((game) => (
                    <CardGame key={game._id} item={game} />
                  ))}
                </div>
              ) : (
                <div className="bg-[#1a202c] rounded-xl p-20 text-center border border-dashed border-gray-700">
                  <p className="text-gray-400 text-lg">Không tìm thấy game nào phù hợp.</p>
                  <button
                    onClick={() => { setSearchTerm(""); setSelectedGenre("all"); setPriceRange(2000000) }}
                    className="mt-4 text-green-500 hover:text-green-400 font-medium cursor-pointer"
                  >
                    Xóa tất cả bộ lọc
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
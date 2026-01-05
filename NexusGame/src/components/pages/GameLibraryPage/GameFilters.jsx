export const GameFilters = ({ categories, selectedGenre, onGenreChange, priceRange, onPriceChange }) => {
  return (
    <div className="flex flex-col gap-8 p-4 bg-[#1a202c] rounded-xl h-fit border border-gray-800">
      {/* Lọc theo thể loại */}
      <div>
        <h3 className="text-white font-bold mb-4 text-lg">Thể loại</h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="genre"
                checked={selectedGenre === cat.id}
                onChange={() => onGenreChange(cat.id)}
                className="w-4 h-4 accent-green-500"
              />
              <span className={`text-sm transition-colors ${selectedGenre === cat.id ? "text-green-500" : "text-gray-400 group-hover:text-white"}`}>
                {cat.genre}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Lọc theo giá */}
      <div>
        <h3 className="text-white font-bold mb-4 text-lg">Khoảng giá (VNĐ)</h3>
        <input
          type="range"
          min="0"
          max="2000000"
          step="50000"
          value={priceRange}
          onChange={(e) => onPriceChange(e.target.value)}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>0đ</span>
          <span className="text-green-400 font-bold">{Number(priceRange).toLocaleString('vi-VN')}đ</span>
        </div>
      </div>
    </div>
  );
};
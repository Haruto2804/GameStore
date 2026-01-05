import { Link } from 'react-router'
import TestImage from './image.png'
export function CardGame({ item }) {
  const totalAfterDiscount = (item?.pricing.base_price -
    (item?.pricing.base_price * item?.pricing.discount_percent) / 100)
    .toLocaleString('vi', 'VN');
  return (
    <Link to={`/games/${item?._id}`} className="cursor-pointer rounded-lg bg-gray-900 w-fit group overflow-hidden">
      <img src={item?.media.thumbnail} className="w-65 h-68 object-cover mb-3 group-hover:scale-110  transition-all duration-500" alt="" />
      <div className="p-2 ">
        <p className="text-green-500 text-xs font-bold mb-2">{item?.genres[0]}</p>
        <p className="text-white text-lg font-bold mb-2">{item?.full_name}</p>

        {item?.pricing.free_to_play == false ?
          <div className="w-full flex flex-row justify-between items-center">
            <div className="bg-[#1F2937] px-2 py-1 rounded text-xs text-gray-400 font-bold">-{item.pricing.discount_percent}%</div>
            <div>
              {item.pricing.discount_percent !== 0 && <p className="font-bold text-xs line-through text-gray-500">{item?.pricing.base_price.toLocaleString('vi-VN')} {item?.pricing.currency}</p>}

              <p className=" font-bold text-xl text-green-500">{totalAfterDiscount} {item?.pricing.currency}</p>
            </div>

          </div> : <p className=" font-bold text-xl text-green-500 mt-6">Free to play </p>}

      </div>
    </Link>
  )
}
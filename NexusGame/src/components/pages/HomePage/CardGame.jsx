import TestImage from './image.png'
export function CardGame({ item }) {
  return (
    <div className="rounded-lg bg-gray-900 w-fit">
      <img src={item?.media.thumbnail} className="w-65 h-68 object-cover mb-3" alt="" />
      <div className="p-2 ">
        <p className="text-green-500 text-xs font-bold mb-2">{item?.genres[0]}</p>
        <p className="text-white text-lg font-bold mb-2">{item?.game_title}</p>
        <div className="w-full flex flex-row justify-between items-center">
          <div className="bg-[#1F2937] px-2 py-1 rounded text-xs text-gray-400 font-bold">-30%</div>
          <div>
            <p className=" font-bold text-xs line-through text-gray-500">{item?.pricing.base_price} {item?.pricing.currency}</p>
            <p className=" font-bold text-xl text-green-500">{item?.pricing.base_price} {item?.pricing.currency}</p>
          </div>

        </div>
      </div>

    </div>
  )
}
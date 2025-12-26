import { IoMdSearch } from "react-icons/io";
export function SearchBar({ title }) {
  return (
    <div className="relative w-full">
      <input
        className="text-white font-semibold p-3 pl-12 rounded-lg bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full"
        type="text" placeholder={title} />
      <IoMdSearch className="size-6 absolute text-gray-400 top-3 left-3" />
    </div>
  )
}
export function IconButton({ Icon }) {
  return (
    <>
      <div className = "bg-slate-800 p-2 rounded-md cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all group">
        <Icon className = "size-6 text-gray-400 group-hover:text-white transition-all"/>
      </div>

    </>
  )
}
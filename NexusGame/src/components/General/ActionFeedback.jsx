

export function ActionFeedBack({ isOpen, Icon, title }) {
  return (
    <div
      className={`
          ${isOpen ? "opacity-100 scale-100 transition-all duration-500" : "opacity-0 pointer-events-none scale-85 transition-all duration-500"}
          fixed top-21 left-1/2 -translate-x-1/2 bg-slate-900 z-100 p-4 text-white flex gap-3 rounded-lg`}>
      <Icon className="size-6 text-green-500" />
      <p>{title}</p>
    </div>
  )
}
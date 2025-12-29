export function Menu({ headerLink }) {
  return (
    <div className="bg-bg-app p-4 z-50">
      <div className="flex flex-col gap-3">
        {headerLink.map((item) => {
          return (
            <div className="w-fit text-nowrap group ">
              <p key={item.title}
                className={`text-white cursor-pointer 
              font-bold group-hover:text-green-500 transition-all duration-300
              `}>{item.title}</p>
              <div className="h-0.5 rounded-full w-0 mx-auto group-hover:w-full bg-linear-to-r from-blue-500 to-green-500 transition-all duration-300"></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
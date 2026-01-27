import { Link } from "react-router"
export function SignInButton() {
  return (
    <Link to = "/api/auth/register" className=
      {`bg-green-500 px-4 py-2 rounded-lg cursor-pointer focus:ring-2
      hover:bg-green-700 transition-transform hover:-translate-y-1 duration-300
    `}>
      <p className="font-bold">Đăng nhập</p>
    </Link>
  )
}
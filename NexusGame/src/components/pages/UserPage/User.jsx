import { AccountNav } from "./AccountNav"
import { AccountInfo } from './AccountInfo'
import { UserHero } from "./UserHero"
import { UserLevelBar } from "./UserLevelBar"
import { UserBio } from "./UserBio"
import { useContext } from "react"
import { AuthContext } from "../../../Context/AuthContext"
import { Navigate } from "react-router-dom"
export function User() {
  // eslint-disable-next-line no-unused-vars
  const { user, isLogged, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <div className="text-white text-center mt-20">Đang tải dữ liệu chỉ huy...</div>;
  }
  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div key={user?.id} className="bg-bg-base">
      <div className="max-w-7xl mx-auto mt-20 text-white p-4 flex flex-col gap-3 md:flex-row ">
        <div className="basis-1/5 flex flex-col gap-3">
          <AccountNav />
          <AccountInfo user={user} />
        </div>
        <div className="basis-2/3 p-4 flex flex-col gap-3">
          <UserHero user={user} />
          <UserLevelBar user={user} />
          <UserBio bio={user?.bio} />
        </div>
      </div>
    </div>
  )
}
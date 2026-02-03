import { AccountNav } from "./AccountNav"
import { AccountInfo } from './AccountInfo'
import { UserHero } from "./UserHero"
import { UserLevelBar } from "./UserLevelBar"
import { UserBio } from "./UserBio"
export function User() {
  return (
    <div className="bg-bg-base">
      <div className="max-w-7xl mx-auto mt-20 text-white p-4 flex flex-col gap-3 md:flex-row ">
        <div className="basis-1/5 flex flex-col gap-3">
          <AccountNav />
          <AccountInfo />
        </div>
        <div className="basis-2/3 p-4 flex flex-col gap-3">
          <UserHero />
          <UserLevelBar />
          <UserBio />
        </div>
      </div>
    </div>
  )
}
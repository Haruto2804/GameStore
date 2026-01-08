import { ForumHeader } from "./ForumHeader";
import { ForumPost } from "./ForumPost";

export function Forum() {
  
  return (
    <div>
      <div className="flex flex-col gap-5">
        <ForumHeader />
        <div className="w-full h-0.5 bg-gray-800"></div>
        <div className="flex flex-col gap-5">
          <ForumPost />
          <ForumPost />
          <ForumPost />
        </div>
      </div>
    </div>
  )
}
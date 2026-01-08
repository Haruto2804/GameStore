import { LiaCommentsSolid } from "react-icons/lia";
export function CommentSection({ comment, setComment }) {
  return (
    <>
      <header className="flex gap-3 items-center mb-4">
        <LiaCommentsSolid className="size-6 text-blue-500" />
        <p className="font-bold text-xl">42 Comments</p>
      </header>
      <main className="mt-4 flex flex-col items-end relative">
        {/* Thêm items-end để nút nằm bên phải */}

        <textarea
          value = {comment}
          onChange={(e)=> setComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full h-35 p-4 bg-transparent border border-blue-800 rounded-md 
               focus:ring-2 focus:ring-green-600 focus:outline-none 
               resize-none text-gray-200 placeholder:text-gray-500 
               transition-all duration-300"
        />

        <div className="absolute top-19 right-5 flex gap-4">
          <button
            onClick={() => setComment("")}
            className="mt-3 hover:bg-slate-800 active:scale-95 cursor-pointer 
               text-white font-bold py-2 px-3 rounded-full 
               transition-all duration-200 shadow-lg shadow-green-900/20"
          >
            Cancel
          </button>
          <button
          onClick = {() => alert(comment)}
            className="mt-3 bg-blue-600 hover:bg-blue-500 active:scale-95 cursor-pointer 
               text-white font-bold py-2 px-3 rounded-full 
               transition-all duration-200 shadow-lg shadow-green-900/20"
          >
            Post
          </button>
        </div>

      </main>
    </>
  )
}
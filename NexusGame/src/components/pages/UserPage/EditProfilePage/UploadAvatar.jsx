import { IoCloudUploadOutline } from "react-icons/io5";
export function UploadAvatar() {
  return (
    <div className="  w-full border border-white/10 rounded-xl p-6 ">
      <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Avatar</h3>
      <div className="flex flex-col items-center gap-4">
        <div className="size-32 rounded-xl bg-background-dark border-2 border-dashed flex flex-col items-center justify-center group cursor-pointer hover:border-green-500 transition-colors relative overflow-hidden">
          <img alt="Avatar" className="absolute inset-0 w-full h-full object-cover opacity-40 
          group-hover:opacity-20 transition-opacity" data-alt="Placeholder image for user avatar upload"
            src="../../../../public/haruto.png"
          />
          < IoCloudUploadOutline className="text-3xl text-green-500 opacity-40 group-hover:scale-120
          group-hover:opacity-100
          transition-all duration-300" />
          <span className="font-bold opacity-0 group-hover:opacity-100 transition-all duration-300">Upload Avatar</span>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 leading-relaxed">Kéo và thả hoặc nhấp chuột để tải lên.</p>
          <br />
          <p className="text-xs text-slate-400 leading-relaxed">Kích thước tối đa 2MB (PNG, JPG).</p>
        </div>
      </div>
    </div>
  )
}
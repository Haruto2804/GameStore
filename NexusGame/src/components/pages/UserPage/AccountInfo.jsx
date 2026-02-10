import { formatDateString } from "../../../utils";

export function AccountInfo({ user }) {
  const infoItems = [
    { label: "Email", value: user?.email },
    { label: "Role", value: user?.role },
    { label: "Joined", value: formatDateString(user?.joined) }, // Ví dụ: "Jan 2024"
  ];

  return (
    <div className="bg-[#0a192f]/60 border border-white/10 p-5 rounded-xl flex flex-col gap-4">
      <h3 className="text-green-500 font-bold uppercase text-xs tracking-[2px] mb-1">
        Account Info
      </h3>

      <div className="flex flex-col gap-3">
        {infoItems.map((item) => (
          <div key={item.label} className="flex justify-between items-start text-sm py-1">
            {/* Nhãn bên trái: Thêm shrink-0 để không bao giờ bị co lại */}
            <span className="text-gray-500 font-medium shrink-0 mr-4">
              {item.label}
            </span>

            {/* Giá trị bên phải: Xử lý email dài */}
            <span className="text-gray-200 font-bold text-right break-all ml-auto max-w-[200px]">
              {item.value}
            </span>
          </div>
        ))}
      </div>


    </div>
  );
}
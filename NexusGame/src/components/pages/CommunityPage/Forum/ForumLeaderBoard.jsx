import React from 'react';
// Dữ liệu mẫu
const members = [
  { id: 1, name: 'Huy Gamer', points: '1,240', rank: 1, color: 'bg-green-200' },
  { id: 2, name: 'Tuấn PC Master', points: '980', rank: 2, color: 'bg-teal-100' },
  { id: 3, name: 'Linh Support', points: '850', rank: 3, color: 'bg-orange-200' },
];
const getRankStyle = (rank) => {
  switch (rank) {
    case 1: return 'bg-yellow-500';
    case 2: return 'bg-gray-400';
    case 3: return 'bg-orange-600';
    default: return 'bg-gray-600';
  }
};
export function ForumLeaderBoard() {
  return (
    <div className="flex justify-center items-center">
      {/* Container chính */}
      <div className="w-full border bg-slate-900/80 border-gray-700 rounded-2xl p-6 shadow-xl">
        <h2 className="text-white text-xl font-bold mb-6">Thành viên tích cực</h2>

        <div className="space-y-6">
          {members.map((member) => (
            <div key={member.id} className="flex items-center space-x-4">
              {/* Avatar với Badge Rank */}
              <div className="relative">
                <div className={`w-14 h-14 rounded-full ${member.color} shadow-inner`}></div>
                <div className={`absolute -bottom-1 -right-1 w-7 h-5 flex items-center justify-center rounded-lg border-2 border-[#161b22] text-[10px] font-bold text-black ${getRankStyle(member.rank)}`}>
                  #{member.rank}
                </div>
              </div>

              {/* Thông tin thành viên */}
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg leading-tight">
                  {member.name}
                </span>
                <span className="text-green-500 font-medium text-sm">
                  {member.points} điểm uy tín
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

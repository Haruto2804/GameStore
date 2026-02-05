const AccountModel = require('../models/Account.model');

const XP_AWARDS = {
  'BUY GAME': 100,
  'DAILY_LOGIN': 10,
  'POST_STORY': 50,
  'UPDATE_PROFILE': 30,
  'COMMENT_POST': 5
};
const handleGainXp = async (userId, action) => {
  const amount = XP_AWARDS[action]  || 0;
  console.log("Action nhận được là:", action); // Xem chữ nghĩa có khớp không
  console.log("Số điểm tương ứng là:", amount); // Nếu dòng này ra undefined thì là do sai Key
  if (!amount) {
    return { error: "Hành động không hợp lệ" }
  }
  const user = await AccountModel.findByIdAndUpdate(
    userId,
    { $inc: { xp: amount } },
    { new: true }
  )
  return { success: true, user, amount };
} 
module.exports = { handleGainXp };
const mongoose = require('mongoose');
const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, 'Tên đăng nhập phải ít nhất 3 ký tự'],
    maxlength: [30, 'Tên đăng nhập không được quá 30 ký tự']
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/ddvotq2cg/image/upload/v1770347712/unknown_rnyxbt.jpg'
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Mật khẩu phải từ 6 ký tự trở lên']
  },
  email: {
    type: String,
    required: true, // Thêm chữ 'd' vào đây
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/, 'Vui lòng nhập đúng định dạng email'],
    maxlength: [50, 'Email quá dài, vui lòng kiểm tra lại']
  },
  displayName: {
    type: String,
    required: true,
    maxlength: [50, 'Tên hiển thị quá dài, vui lòng đặt sao cho ngắn lại!']
  },
  role: {
    type: String,
    required: true,
    maxlength: [10],
    default: 'User'
  },
  bio: {
    type: String,
    maxlength: [500, 'Giới thiệu bản thân không được quá 500 ký tự'],
    default: 'Người này quá lười để nhập bio.... '
  },
  xp: {
    type: Number,
    default: 0
  }
},
  {
    timestamps: true,
    collection: 'accounts'
  }

)
AccountSchema.set('toJSON', { virtuals: true });
AccountSchema.set('toObject', { virtuals: true });

// 1. Tính Level hiện tại
AccountSchema.virtual('level').get(function () {
  // Level = căn bậc hai của (XP / 100) + 1
  return Math.floor(Math.sqrt(this.xp / 100)) + 1;
});

AccountSchema.virtual('levelProgress').get(function () {
  const currentLevel = Math.floor(Math.sqrt(this.xp / 100)) + 1;
  const xpStartOfLevel = 100 * Math.pow(currentLevel - 1, 2);
  const xpNextLevel = 100 * Math.pow(currentLevel, 2);

  const progress = ((this.xp - xpStartOfLevel) / (xpNextLevel - xpStartOfLevel)) * 100;
  return Math.round(progress); // Trả về số nguyên như 45, 60...
});

AccountSchema.virtual('nextLevelXp').get(function () {
  const currentLevel = Math.floor(Math.sqrt(this.xp / 100)) + 1;
  return 100 * Math.pow(currentLevel, 2);
});

AccountSchema.virtual('joined').get(function () {
  if (!this.createdAt) return "Chưa cập nhật";
  return this.createdAt.toLocaleDateString('vi-VN');
})
module.exports = mongoose.model("Accounts", AccountSchema, "accounts");
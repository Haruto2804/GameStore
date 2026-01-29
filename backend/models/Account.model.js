const mongoose = require('mongoose');
const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, 'Tên đăng nhập phải ít nhất 3 ký tự'],
    maxlength: [30, 'Tên đăng nhập không được quá 30 ký tự']
  },
  password: {
    type: String,
    required: true,
    minlength: [6,'Mật khẩu phải từ 6 ký tự trở lên']
  },
  email: {
    type: String,
    required: true, // Thêm chữ 'd' vào đây
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/, 'Vui lòng nhập đúng định dạng email'],
    maxlength: [50, 'Email quá dài, vui lòng kiểm tra lại']
  }
},
  {
    timestamps: true,
    collection: 'accounts'
  }

)
module.exports = mongoose.model("Account", AccountSchema, "accounts");
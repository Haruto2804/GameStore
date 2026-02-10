const mongoose = require('mongoose');
const CommunityPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Accounts',
      required: true
    },
    content: {
      text: {
        type: String,
        required: true
      },
      format: {
        type: String,
        default: 'markdown'
      }
    },
    tags: [{ type: String }],
    stats: {
      upvotes: { type: Number, default: 0 },
      downvotes: { type: Number, default: 0 },
      views: { type: Number, default: 0 }
    },
    actions: {
      is_saved: { type: Boolean, default: false },
      can_share: { type: Boolean, default: true }
    },
    type: {
      type: String,
      default: 'qna',
      enum: ['qna', 'guide', 'hardware'],
      required: true
    }
  },
  {
    timestamps: { createdAt: 'posted_at' },
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
CommunityPostSchema.virtual('formatted_date').get(function () {
  if (!this.posted_at) {
    return '';
  }
  return this.posted_at.toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh', // Quan trọng: Đưa về múi giờ GMT+7 của Việt Nam
    day: '2-digit',               // Hiển thị ngày 2 chữ số (vd: 09)
    month: '2-digit',             // Hiển thị tháng 2 chữ số (vd: 01)
    year: 'numeric',              // Hiển thị năm đầy đủ (vd: 2026)
    hour: '2-digit',              // Hiển thị giờ
    minute: '2-digit',            // Hiển thị phút
    hour12: false                 // Sử dụng định dạng 24h thay vì AM/PM
  })
})
const CommunityPost = mongoose.model("communityPosts", CommunityPostSchema);
module.exports = CommunityPost;
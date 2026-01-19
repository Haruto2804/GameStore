const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    gameId: { type: String, required: true },
    userName: { type: String, default: "Người dùng ẩn danh" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true }
}, { timestamps: true }); // Tự động tạo createdAt và updatedAt

module.exports = mongoose.model('Review', reviewSchema);
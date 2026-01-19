const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    game_title: { type: String, required: true },
    categoryId: String,
    metascore: { type: Number, default: 0 },
    genres: [String],
    pricing: {
        original_price: Number,
        discount_percent: { type: Number, default: 0 }
    },
    media: {
        thumbnail: String,
        images: [String]
    }
});

module.exports = mongoose.model('Game', gameSchema);
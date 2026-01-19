const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import Models
const Game = require('./models/game.model.js');
const Review = require('./models/review.model.js');
const CommunityPost = require('./models/communityPost.model.js');

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối Database
mongoose.connect('mongodb://localhost:27017/game')
  .then(() => {
    console.log('Đã kết nối MongoDB qua Mongoose');
    app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
  })
  .catch(err => console.error("Lỗi kết nối DB:", err));

// ==========================================
// --- ROUTES CHO GAMES ---
// ==========================================

// Lấy danh sách tất cả game
app.get('/games', async (req, res) => {
  try {
    const games = await Game.find().sort({ game_title: 1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy danh sách game" });
  }
});

// Lọc game theo thể loại
app.get('/games/genre/:id', async (req, res) => {
  try {
    const query = req.params.id === 'all' ? {} : { categoryId: req.params.id };
    const games = await Game.find(query);
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lọc game" });
  }
});

// Lấy game có metascore cao nhất
app.get('/games/top-rated', async (req, res) => {
  try {
    const topGame = await Game.findOne().sort({ metascore: -1 });
    res.json(topGame);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy game rating cao" });
  }
});

// Lấy 5 game nổi bật
app.get('/games/featured', async (req, res) => {
  try {
    const featured = await Game.find()
      .select('game_title pricing media metascore genres')
      .sort({ metascore: -1 })
      .limit(5);
    res.json(featured);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy game nổi bật" });
  }
});

// Lấy 5 game giảm giá sâu nhất
app.get('/games/best_discount', async (req, res) => {
  try {
    const bestDiscounts = await Game.find({ "pricing.discount_percent": { $gt: 0 } })
      .sort({ "pricing.discount_percent": -1 })
      .limit(5);
    res.json(bestDiscounts);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy game giảm giá" });
  }
});

// ==========================================
// --- ROUTES CHO REVIEWS ---
// ==========================================

// 1. Gửi nhận xét mới
app.post('/games/reviews', async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({ message: "Gửi nhận xét thành công!", reviewId: review._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. Lấy toàn bộ reviews trong database (không lọc)
app.get('/games/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy toàn bộ đánh giá" });
  }
});

// 3. Lấy TOP reviews của một game (Rating cao nhất, mới nhất)
// QUAN TRỌNG: Route này phải nằm TRÊN route có tham số :gameId chung
app.get('/games/reviews/top/:gameId', async (req, res) => {
  try {
    const { gameId } = req.params;
    const reviews = await Review.find({ gameId: gameId })
      .sort({ rating: -1, createdAt: -1 })
      .limit(2);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy dữ liệu top reviews" });
  }
});

// 4. Lấy tất cả reviews của một game (Sắp xếp mới nhất lên đầu)
app.get('/games/reviews/:gameId', async (req, res) => {
  try {
    const { gameId } = req.params;
    const reviews = await Review.find({ gameId: gameId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy đánh giá của game" });
  }
});

// ==========================================
// --- ROUTES CHO COMMUNITY POSTS ---
// ==========================================


app.get('/api/community/posts', async (req, res) => {
  try {
    const post = await CommunityPost.find()
 
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.get('/api/community/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
  const post = await CommunityPost.findById(postId);
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.post('/api/community/posts', async (req, res) => {
  try {
    const post = await CommunityPost.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
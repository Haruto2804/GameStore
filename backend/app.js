const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
// Import Models
const Game = require('./models/game.model.js');
const CommunityPost = require('./models/communityPost.model.js');
const AccountModel = require('./models/Account.model.js');
const Review = require('./models/review.model.js')
const authRoute = require('./auth.js')
const levelRoute = require('./routes/xp.routes.js');
const uploadCloudRoute = require('./routes/update.image.js');
const { protect } = require('./authMiddleware.js');
const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json());
app.use(cookieParser());
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
app.get('/api/games', async (req, res) => {
  try {
    const games = await Game.find().sort({ game_title: 1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy danh sách game" });
  }
});

// Lọc game theo thể loại
app.get('/api/games/genre/:id', async (req, res) => {
  try {
    const query = req.params.id === 'all' ? {} : { categoryId: req.params.id };
    const games = await Game.find(query);
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lọc game" });
  }
});

// Lấy game có metascore cao nhất
app.get('/api/games/top-rated', async (req, res) => {
  try {
    const topGame = await Game.findOne().sort({ metascore: -1 });
    res.json(topGame);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy game rating cao" });
  }
});

// Lấy 5 game nổi bật
app.get('/api/games/featured', async (req, res) => {
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
app.get('/api/games/best_discount', async (req, res) => {
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
app.post('/api/games/reviews', protect, async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({ message: "Gửi nhận xét thành công!", reviewId: review._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. Lấy toàn bộ reviews trong database (không lọc)
app.get('/api/games/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy toàn bộ đánh giá" });
  }
});

// 3. Lấy TOP reviews của một game (Rating cao nhất, mới nhất)
// QUAN TRỌNG: Route này phải nằm TRÊN route có tham số :gameId chung
app.get('/api/games/reviews/top/:gameId', async (req, res) => {
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
app.get('/api/games/reviews/:gameId', async (req, res) => {
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
    const { category, page = 1 } = req.query;
    let filtered = {};
    const limit = 5;
    const skip = (Number(page) - 1) * limit;
    if (category && category !== 'all') {
      filtered.type = category;
    }
    const posts = await CommunityPost.find(filtered)
      .sort({ posted_at: -1 })
      .skip(skip)
      .limit(limit);
    const totalPosts = await CommunityPost.countDocuments(filtered);
    res.json({
      posts,
      totalPages: Math.ceil(totalPosts / limit),
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.patch('/api/community/posts/:id/likes', protect, async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await CommunityPost.findByIdAndUpdate(
      postId,
      { $inc: { 'stats.upvotes': 1 } },
      { new: true }
    );
    res.status(200).json(updatedPost);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
})
app.patch('/api/community/posts/:id/dislikes', protect, async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await CommunityPost.findByIdAndUpdate(
      postId,
      { $inc: { 'stats.upvotes': -1 } },
      { new: true }
    );
    res.status(200).json(updatedPost);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
})
app.patch('/api/community/posts/:id/views', protect, async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPostViews = await CommunityPost.findByIdAndUpdate(
      postId,
      { $inc: { 'stats.views': 1 } },
      { new: true }
    )
    res.status(200).json(updatedPostViews);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
})
app.get('/api/community/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await CommunityPost.findById(postId);
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.post('/api/community/posts', protect, async (req, res) => {
  try {
    console.log(req.body)
    const post = await CommunityPost.create({
      ...req.body,
      author: req.user.id
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


app.use('/api/auth', authRoute);

app.get('/api/auth/me', async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Chưa đăng nhập" });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const foundUser = await AccountModel.findOne({ _id: verified.id });
    const userData = foundUser.toObject()
    delete userData.password;
    res.status(200).json(userData);
  }
  catch (err) {
    res.status(400).json({ message: "Token không hợp lệ" });
  }
})

app.use('/api', levelRoute);
app.use('/api',uploadCloudRoute);
const express = require('express');
const cors = require('cors'); // Thêm dòng này
const { connectToDb, getDb } = require('./db.js');
const app = express();
app.use(cors())
app.use(express.json()); // BẮT BUỘC: Thêm dòng này để đọc được req.body
let db;

// Kết nối DB trước, sau đó mới chạy Server
connectToDb((error) => {
  if (!error) {
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
    db = getDb();
  } else {
    console.log("Lỗi kết nối DB:", error);
  }
});
console.log(db)
// Route lấy toàn bộ danh sách game
app.get('/games', async (req, res) => {
  try {
    let games = [];
    // Sử dụng toArray() để lấy toàn bộ dữ liệu dưới dạng mảng
    games = await db.collection('games')
      .find()
      .sort({ game_title: 1 }) // Sắp xếp theo tên từ A-Z
      .toArray();

    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ error: "Không thể lấy dữ liệu game" });
  }
});

// Route lọc game theo thể loại (Kết nối với frontend của bạn)
app.get('/games/genre/:id', async (req, res) => {
  try {
    const genreId = req.params.id;
    let query = {};

    if (genreId !== 'all') {
      // Tìm các game có categoryId tương ứng
      query = { categoryId: genreId };
    }

    const games = await db.collection('games').find(query).toArray();
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lọc game" });
  }
});
app.get('/games/top-rated', async (req, res) => {
  try {
    const topGame = await db.collection('games')
      .find()
      .sort({ metascore: -1 })
      .limit(1)
      .next();
    res.status(200).json(topGame);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy game rating cao" });
  }
})

app.post('/games/reviews', async (req, res) => {
  try {
    const { gameId, userName, rating, comment } = req.body;
    if (!gameId || !comment || !rating) {
      return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin và điểm đánh giá!" });
    }
    const newReview = {
      gameId: gameId,
      userName: userName || "Người dùng ẩn danh",
      rating: Number(rating),
      comment: comment,
      createdAt: new Date()
    }
    const result = await db.collection('reviews').insertOne(newReview);

    res.status(201).json({
      message: "Gửi nhận xét thành công!",
      reviewId: result.insertedId
    });
  }
  catch (err) {
    console.error("Lỗi Post Review:", err);
    res.status(500).json({ error: "Không thể lưu nhận xét vào hệ thống" });
  }
})
app.get('/games/reviews/:gameId', async (req, res) => {
  try {
    const { gameId } = req.params;

    // Nếu có gameId thì lọc, không thì lấy hết (hoặc báo lỗi)
    const filter = gameId ? { gameId: gameId } : {};

    const reviews = await db.collection('reviews')
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Lỗi server" });
  }
});
app.get('/games/reviews/top/:gameId', async (req, res) => {
  try {
    const { gameId } = req.params;
    const topReviews = await db.collection('reviews')
      .find({ gameId: gameId })
      .sort({ rating: -1, createdAt: -1 })
      .limit(2)
      .toArray();
    res.status(200).json(topReviews);
  }
  catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy đánh giá nổi bật" })
  }
})
app.get('/games/featured', async (req, res) => {
  try {
    const featuredGames = await db.collection('games')
      .find({})
      .project({
        game_title: 1,
        pricing: 1,
        media: 1,
        metascore: 1,
        genres: 1
      }) // Chỉ lấy những trường cần cho CardGame
      .sort({ metascore: -1 })
      .limit(5) //
      .toArray();
    res.status(200).json(featuredGames);
  } catch (err) {
    console.error("Error at /games/featured:", err);
    res.status(500).json({ error: "Lỗi khi lấy danh sách trò chơi nổi bật" });
  }
});
app.get('/games/best_discount', async (req, res) => {
  try {
    const bestDiscountGames = await db.collection('games')
      .find({ "pricing.discount_percent": { $gt: 0 } })
      .sort({ "pricing.discount_percent": -1 })
      .limit(5)
      .toArray();
    res.status(200).json(bestDiscountGames);
  }
  catch (err) {
    console.error("Error at /games/featured:", err);
    res.status(500).json({ error: "Lỗi khi lấy danh sách trò chơi nổi bật" });
  }
})
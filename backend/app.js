const express = require('express');
const cors = require('cors'); // Thêm dòng này
const { connectToDb, getDb } = require('./db.js');
const app = express();
app.use(cors())

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
// test-redis.js
const { createClient } = require("redis");

  console.log("--- Bắt đầu kiểm tra (CommonJS) ---");

const redis = createClient({ 
  url: "rediss://default:AUohAAIncDJhOTQxYjdkMGQ4ZmE0MTg3OGQyNzEzMzA4YTgwZWZhOHAyMTg5Nzc@enabling-wahoo-18977.upstash.io:6379"
});

redis.on("error", (err) => console.log("Lỗi Redis:", err));
async function initRedis() {
  try {
    await redis.connect();
    console.log("✅ 1. Kết nối Redis thành công!");
  } catch (error) {
    console.error("❌ Kết nối Redis thất bại!", error);
  }
}

 initRedis();

const redisService = {
  async setBlackList(token, ttl) {
    const key = `blacklist:${token}`;
    try {
      await redis.set(key, "true", { EX: ttl });
      console.log(`Lưu ${key} vào Redis thành công!!!`);
    } catch (err) {
      console.log(`Lưu ${key} vào Redis thất bại!!!`);
    }
  },
  async isBlackListed(token) {
    const result = await redis.get(`blacklist:${token}`);
    return result !== null;
  }
};

// Xuất module kiểu CommonJS
module.exports = redisService;
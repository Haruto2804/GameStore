const express = require('express');
const router = express.Router();
const { protect } = require('../authMiddleware.js');
const commentPostModel = require('../models/commentPost.model.js');
const CommunityPost = require('../models/communityPost.model.js');
router.get('/post', async (req, res) => {
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
      .limit(limit)
      .populate('author', 'displayName xp avatar');
    const totalPosts = await CommunityPost.countDocuments(filtered);
    res.json({
      posts,
      totalPages: Math.ceil(totalPosts / limit),
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.patch('/post/:id/likes', protect, async (req, res) => {
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
router.patch('/post/:id/dislikes', protect, async (req, res) => {
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
router.patch('/post/:id/views', protect, async (req, res) => {
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

router.get('/post/:id/comments', protect, async (req, res) => {
  try {
    const postId = req.params.id;
    const commentsData = await commentPostModel.find({ postId: postId })
      .sort({ createdAt: -1 })
    res.status(200).json({
      comments: commentsData
    });
  }
  catch (err) {
    res.status(500).json({
      message: "Có lỗi xảy ra khi lấy dữ liệu comments!"
    })
  }
})
router.post('/post/:id/comments', protect, async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;
  const postId = req.params.id;
  try {
    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Nội dung bình luận không được để trống" });
    }
    const newComment = await commentPostModel.create({
      postId: postId,
      author: userId,
      content: content
    })
    res.status(201).json(newComment);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
})
router.get('/post/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await CommunityPost.findById(postId)
      .populate('author', 'avatar xp displayName')
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post('/post', protect, async (req, res) => {
  try {

    const post = await CommunityPost.create({
      ...req.body,
      author: req.user.id
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//LIKES
router.post('/post/:id/comment/liked', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.id;

      const foundPost = await commentPostModel.findOne({postId: postId});
      if (!foundPost) {
        return res.status(404).json({ message: "Post not found!" })
      }
    const currentIsLiked = foundPost.likes.some(id => id.toString() === userId.toString());
    const updatedPost = await commentPostModel.findOneAndUpdate(
      {postId: postId},
      currentIsLiked ? { $pull: { likes: userId } } : { $addToSet: { likes: userId } },
      { new: true }
    )
    res.status(200).json({
      updatedPost: updatedPost,
      isLiked: !currentIsLiked,
      likedCount: updatedPost.likes.length
    });
  }
  catch (err) {
    res.status(500).json({ message: "Lỗi khi lưu bài viết!!" })
  }
})
module.exports = router;


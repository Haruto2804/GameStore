const express = require('express');
const router = express.Router();
const {protect} = require('../authMiddleware.js');
const commentPost = require('../models/commentPost.model.js');
const CommunityPost = require('../models/communityPost.model.js');
router.get('/community/posts', async (req, res) => {
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
router.patch('/community/posts/:id/likes', protect, async (req, res) => {
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
router.patch('/community/posts/:id/dislikes', protect, async (req, res) => {
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
router.patch('/community/posts/:id/views', protect, async (req, res) => {
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
router.get('/community/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await CommunityPost.findById(postId)
      .populate('author', 'avatar xp displayName')
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post('/community/posts', protect, async (req, res) => {
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
module.exports = router;


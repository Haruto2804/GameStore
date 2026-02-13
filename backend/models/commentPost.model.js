const mongoose = require('mongoose');
const CommentPostSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.ObjectId,
      ref: 'CommunityPosts',
      required: true
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Accounts',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, 'Bình luận không được vượt quá 500 kí tự']
    },
    parentId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
      default: null 
    }
  },
  {
    timestamps: true,
    collection: 'commentposts'
  }
)
const CommentPost = mongoose.model("Comment",CommentPostSchema,"commentposts");
module.exports = CommentPost;
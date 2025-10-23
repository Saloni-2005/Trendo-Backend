const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  text: { type: String, required: true },
  media: [{ url: { type: String }, type: { type: String }, width: { type: Number }, height: { type: Number }, duration: { type: Number } }],
  hashtags: [{ type: String }],
  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  visibility: { type: String, enum: ["public", "private", "followers"], default: "public" }
});

module.exports = mongoose.model('Post', postSchema);

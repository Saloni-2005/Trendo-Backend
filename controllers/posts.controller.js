const Post = require("../Models/posts.schema");

const createPost = async (req, res) => {
  try {
    const { text, hashtags, visibility, media } = req.body;
    const authorId = req.user.id || req.user._id;

    const newPost = new Post({
      authorId,
      text,
      hashtags,
      visibility,
      media,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post" });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
};

const getHomeFeed = async (req, res) => {
  try {
    const pageSize = 10;
    const pageToken = req.query.pageToken ? parseInt(req.query.pageToken) : 0;
    const posts = await Post.find({ visibility: "public" })
      .sort({ createdAt: -1 })
      .skip(pageToken * pageSize)
      .limit(pageSize);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching home feed" });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.likesCount += 1;
    await post.save();
    res.status(200).json({ message: "Post liked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error liking post" });
  }
};

const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.likesCount = Math.max(0, post.likesCount - 1); 
    await post.save();
    res.status(200).json({ message: "Post unliked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error unliking post" });
  }
};

const commentOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.comments) post.comments = [];
    post.comments.push(req.body.comment);
    post.commentsCount = post.comments.length;
    await post.save();

    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error commenting on post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = req.post; 
    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Error deleting post" });
  }
};

module.exports = {
  createPost,
  getPostById,
  getHomeFeed,
  deletePost,
  likePost,
  unlikePost,
  commentOnPost,
};
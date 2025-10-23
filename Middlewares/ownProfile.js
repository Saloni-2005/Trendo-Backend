const Post = require("../Models/posts.schema");

// Middleware to check if logged-in user is the owner of the post
const ownProfile = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id || req.user._id; // from token (set by verifyToken)

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check ownership
    if (post.authorId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this post" });
    }

    // Attach post to req for reuse
    req.post = post;
    next();
  } catch (error) {
    console.error("Ownership check failed:", error);
    res.status(500).json({ message: "Error verifying post ownership" });
  }
};

module.exports = ownProfile;
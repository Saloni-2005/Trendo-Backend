const express = require("express");
const PostRouter = express.Router();
const tokenPresence = require('../Middlewares/tokenPresence.js')
const {
  createPost,
  getPostById,
  getHomeFeed,
  deletePost,
  likePost,
  unlikePost,
  commentOnPost,
} = require("../controllers/posts.controller");
const ownPost = require("../Middlewares/ownPost.js");

PostRouter.post("/create", tokenPresence, createPost);
PostRouter.get("/:id", getPostById);
PostRouter.get("/feed/home", getHomeFeed);
PostRouter.delete("/:id", tokenPresence, ownPost, deletePost);
PostRouter.post("/:id/like", tokenPresence, likePost);
PostRouter.post("/:id/unlike", tokenPresence, unlikePost);
PostRouter.post("/:id/comment", tokenPresence, commentOnPost);

module.exports = PostRouter;
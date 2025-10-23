const express = require("express");
const PostRouter = express.Router();
const verifyToken = require('../Middlewares/tokenPresence.js')
const {
  createPost,
  getPostById,
  getHomeFeed,
  deletePost,
  likePost,
  unlikePost,
  commentOnPost,
} = require("../controllers/posts.controller");
const ownProfile = require("../Middlewares/ownProfile.js");

PostRouter.post("/create", verifyToken, createPost);
PostRouter.get("/:id", getPostById);
PostRouter.get("/feed/home", getHomeFeed);
PostRouter.delete("/:id", verifyToken, ownProfile, deletePost);
PostRouter.post("/:id/like", verifyToken, likePost);
PostRouter.post("/:id/unlike", verifyToken, unlikePost);
PostRouter.post("/:id/comment", verifyToken, commentOnPost);

module.exports = PostRouter;
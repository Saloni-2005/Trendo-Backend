const express = require('express');
const CommentRouter = express.Router();
const verifyToken = require('../Middlewares/tokenPresence.js');
const { addComment, getCommentsByPost } = require('../controllers/comments.controller');

CommentRouter.post('/', verifyToken, addComment); 
CommentRouter.get('/:postId', getCommentsByPost); 

module.exports = CommentRouter;
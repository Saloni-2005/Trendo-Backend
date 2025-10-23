const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./connection/connect');
const UserRouter = require('./Routers/users.route');
const AuthRouter = require('./Routers/auth.route');
const PostRouter = require('./Routers/post.route');
const CommentRouter = require('./Routers/comment.route');
const NotificationRouter = require('./Routers/notification.route');
const SearchRouter = require('./SearchQuery/searchRoute');
const cookieParser = require('cookie-parser');

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use('/users', UserRouter);
app.use('/auth', AuthRouter);
app.use('/posts', PostRouter);
app.use('/comments', CommentRouter);
app.use('/notifications', NotificationRouter);
app.use('/search', SearchRouter);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
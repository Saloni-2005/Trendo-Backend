const express = require('express');
const NotificationRouter = express.Router();
const verifyToken = require('../Middlewares/tokenPresence');
const { listNotifications, markNotificationsRead } = require('../controllers/notifications.controller');

NotificationRouter.get('/', verifyToken, listNotifications);
NotificationRouter.post('/mark-read', verifyToken, markNotificationsRead);

module.exports = NotificationRouter;
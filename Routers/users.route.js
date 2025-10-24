const express = require('express');
const {getAllUsers, getUserById, updateUser, deleteUser, followUser, unfollowUser, updateUserSettings} = require('../controllers/users.controller');
const tokenPresence = require('../Middlewares/tokenPresence');
const ownUserProfile = require('../Middlewares/ownUserProfile');

const UserRouter = express.Router();

UserRouter.get('/', tokenPresence, getAllUsers);
UserRouter.get('/:id', getUserById);
UserRouter.put('/:id', tokenPresence, ownUserProfile, updateUser);
UserRouter.delete('/:id', tokenPresence, ownUserProfile, deleteUser);
UserRouter.post('/:id/follow', tokenPresence, followUser);
UserRouter.post('/:id/unfollow', tokenPresence, unfollowUser);
UserRouter.put('/:id/settings', tokenPresence, ownUserProfile, updateUserSettings);

module.exports = UserRouter;
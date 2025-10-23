const express = require('express');
const {getAllUsers, getUserById, updateUser, deleteUser, followUser, unfollowUser, updateUserSettings} = require('../controllers/users.controller');

const UserRouter = express.Router();

UserRouter.get('/', getAllUsers);
UserRouter.get('/:id', getUserById);
UserRouter.put('/:id', updateUser);
UserRouter.delete('/:id', deleteUser);
UserRouter.post('/:id/follow', followUser);
UserRouter.post('/:id/unfollow', unfollowUser);
UserRouter.put('/:id/settings', updateUserSettings);

module.exports = UserRouter;
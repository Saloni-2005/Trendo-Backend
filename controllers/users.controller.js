const User = require("../Models/users.schema");

getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};


updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUserId = req.user.id;

    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userToFollow._id.toString() === currentUserId) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res.status(404).json({ message: "Current user not found" });
    }

    userToFollow.followersCount += 1;
    currentUser.followingCount += 1;
    await userToFollow.save();
    await currentUser.save();
    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error following user" });
  }
};

unfollowUser = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUserId = req.user.id;

    if (!userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userToUnfollow._id.toString() === currentUserId) {
      return res.status(400).json({ message: "Cannot unfollow yourself" });
    }

    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res.status(404).json({ message: "Current user not found" });
    }

    userToUnfollow.followersCount = Math.max(0, userToUnfollow.followersCount - 1);
    currentUser.followingCount = Math.max(0, currentUser.followingCount - 1);
    await userToUnfollow.save();
    await currentUser.save();
    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error unfollowing user" });
  }
};

updateUserSettings = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.settings = { ...user.settings, ...req.body.settings };
    await user.save();
    res.status(200).json({ message: "User settings updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user settings" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  updateUserSettings,
};

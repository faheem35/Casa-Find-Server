const users = require('../models/userModel');

// Add bookmark
exports.addBookmark = async (req, res) => {
  const userId = req.userId;
  const propertyId = req.params.propertyId;

  try {
    const user = await users.findById(userId);

    if (!user.bookmarks.includes(propertyId)) {
      user.bookmarks.push(propertyId);
      await user.save();
    }
    res.status(200).json({ message: "Property bookmarked" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove bookmark
exports.removeBookmark = async (req, res) => {
  const userId = req.userId;
  const propertyId = req.params.propertyId;

  try {
    const user = await users.findById(userId);
    user.bookmarks = user.bookmarks.filter(id => id.toString() !== propertyId);
    await user.save();
    res.status(200).json({ message: "Bookmark removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all bookmarked properties for user
exports.getBookmarks = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await users.findById(userId).populate('bookmarks');
    res.status(200).json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

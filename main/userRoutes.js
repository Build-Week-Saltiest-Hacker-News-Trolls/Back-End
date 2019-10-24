const express = require("express");
let router = express.Router();

/************************************************/
/*                 User Routes                  */
/************************************************/

// @desc    Get all users
// @route   GET /users
// @access  Public - DEVELOPMENT
router.get("/users", async (req, res, next) => {
  const getAllUsers = await db.select("*").from("umb_user");
  return res.status(200).json({ success: true, data: getAllUsers });
});

// @desc    Get one user
// @route   GET /users/:id
// @access  Public - Necessary for authentication
router.get("/users/:id", async (req, res, next) => {
  const getOneUser = await db
    .select("*")
    .from("umb_user")
    .where("id", "=", req.params.id);
  return res.status(200).json({ success: true, data: getOneUser });
});

// @desc    Get all user-favorites of one user
// @route   GET /users/:id/favorites
// @access  Public
router.get("/users/:id/favorites", async (req, res, next) => {
  const getAllFavoriteComments = await db
    .select("*")
    .from("user_favorite")
    .where("umb_user_id", "=", req.params.id);
  return res.status(200).json({ success: true, data: getAllFavoriteComments });
});

// @desc    Get one user-favorite of one user
// @route   GET /users/:userId/favorites/:favoriteId
// @access  Public
router.get("/users/:userId/comments/:commentId", async (req, res, next) => {
  const getOneFavoriteComment = await db
    .select("*")
    .from("user_favorite")
    .where("umb_user_id", "=", req.params.userId)
    .andWhere("comment_id", "=", req.params.commentId);
  return res.status(200).json({ success: true, data: getOneFavoriteComment });
});

// @desc    Delete one user-favorite of one user
// @route   DELETE /users/:userId/favorites/:favoriteId
// @access  Public
router.delete("/users/:userId/comments/:commentId", async (req, res, next) => {
  const deleteOneUserFavorite = await db
    .select("*")
    .from("user_favorite")
    .where("umb_user_id", "=", req.params.userId)
    .andWhere("comment_id", "=", req.params.commentId)
    .del();
  return res.status(200).json({ success: true, data: [] });
});

// @desc    Delete all user-favorites of one user
// @route   Delete /users/:id/favorites
// @access  Public
router.delete("/users/:id/favorites", async (req, res, next) => {
  const deleteUserFavorites = await db
    .select("*")
    .from("user_favorite")
    .where("umb_user_id", "=", req.params.id)
    .del();
  return res.status(200).json({ success: true, data: [] });
});

// @desc    Post one user-favorite of one user
// @route   POST /users/:userId/comment/:commentId
// @access  Public
router.post("/users/:userId/comment/:commentId", async (req, res, next) => {
  const addUserFavorite = await db
    .insert([
      { umb_user_id: req.params.userId },
      { comment_id: req.params.commentId }
    ])
    .into("user-favorite");
  return res.status(201).json({ success: true, data: addUserFavorite });
});

module.exports = router;

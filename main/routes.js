var express = require("express");
const knex = require("knex");
const config = require("../knexfile.js");
const db = knex(config.production);

var router = express.Router();

// @desc    Hello
// @route   GET /hello
// @access  Public - DEVELOPMENT
router.get("/hello", function(req, res) {
  res.json("hello from the server");
});

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

// @desc    Create new user
// @route   POST /users
// @access  Private
router.post("/users", async (req, res, next) => {
  const createNewUser = await db.insert(req.body).into("umb_user");
  return res.status(201).json({ success: true });
});

// @desc    Update existing user
// @route   PUT /users/:id
// @access  Private
router.put("/users/:id", async (req, res, next) => {
  const updateUser = await db
    .update(req.body)
    .into("umb_user")
    .where("id", "=", req.params.id);
  return res.status(200).json({ success: true });
});

// @desc    Delete existing user
// @route   DELETE /users/:id
// @access  Private
router.delete("/users/:id", async (req, res, next) => {
  const updateUser = await db
    .select("*")
    .from("umb_user")
    .where("id", "=", req.params.id)
    .del();
  return res.status(200).json({ success: true });
});

// @desc    Create one favorite for one user
// @route   POST /users/:userId/comments/:commentId
// @access  Private
router.post("/users/:userId/comments/:commentId", async (req, res, next) => {
  const payload = {
    umb_user_id: req.params.userId,
    comment_id: req.params.commentId
  };
  console.log(payload);
  const addUserFavorite = await db.insert(payload).into("user_favorite");
  return res.status(201).json({ success: true });
});

// @desc    Get all favorited comments of a user
// @route   GET /users/:id/comments
// @access  Public?
router.get("/users/:id/comments", async (req, res, next) => {
  const getAllUserFavoriteComments = await db
    .select("*")
    .from("comment")
    .join("user_favorite", "user_favorite.comment_id", "comment.id")
    .where("user_favorite.umb_user_id", "=", req.params.id);
  return res
    .status(200)
    .json({ success: true, data: getAllUserFavoriteComments });
});

// @desc    Get one favorite comment of a user
// @route   GET /users/:userId/comments/:commentId
// @access  Public?
router.get("/users/:userId/comments/:commentId", async (req, res, next) => {
  const getOneUserFavoriteComment = await db
    .select("*")
    .from("comment")
    .join("user_favorite", "user_favorite.comment_id", "comment.id")
    .where("user_favorite.umb_user_id", "=", req.params.userId)
    .andWhere("user_favorite.comment_id", "=", req.params.commentId);
  return res
    .status(200)
    .json({ success: true, data: getOneUserFavoriteComment });
});

// @desc    Delete favorite comment of one user
// @route   DELETE /users/:userId/comments/:commentId
// @access  Private
router.delete("/users/:userId/comments/:commentId", async (req, res, next) => {
  const deleteOneUserFavoriteComment = await db
    .select("*")
    .from("user_favorite")
    .where("umb_user_id", "=", req.params.userId)
    .andWhere("comment_id", "=", req.params.commentId)
    .del();
  return res.status(200).json({ success: true });
});

// @desc    Delete all favorite comments of one user
// @route   Delete /users/:id/comments
// @access  Private
router.delete("/users/:id/comments", async (req, res, next) => {
  const deleteUserFavorites = await db
    .select("*")
    .from("user_favorite")
    .where("umb_user_id", "=", req.params.id)
    .del();
  return res.status(200).json({ success: true });
});

/************************************************/
/*              Comment Routes                  */
/************************************************/

// @desc    Get all comments
// @route   GET /comments
// @access  Public
router.get("/comments", async (req, res, next) => {
  const comments = await db.select("*").from("comment");
  return res.status(200).json({ success: true, data: comments });
});

// @desc    Get one comment
// @route   GET /comments/:id
// @access  Public
router.get("/comments/:id", async (req, res, next) => {
  const comment = await db
    .select("*")
    .from("comment")
    .where("id", "=", req.params.id);

  return res.status(200).json({ success: true, data: comment });
});

// @desc    Get everyone who's favorited one comment
// @route   GET /comments/:id/favorites
// @access  Public
router.get("/comments/:id/favorites", async (req, res, next) => {
  const userFavorites = await db
    .select("*")
    .from("umb_user")
    .join("user_favorite", "user_favorite.umb_user_id", "umb_user.id")
    .where("user_favorite.comment_id", "=", req.params.id);
  return res.status(200).json({ success: true, data: userFavorites });
});

/************************************************/
/*           User-Favorite Routes               */
/************************************************/
// Not positive these would be used directly

// @desc    Get all user-favorites
// @route   GET /user-favorites
// @access  Public - DEVELOPMENT
router.get("/user-favorites", async (req, res, next) => {
  const userFavorites = await db
    .select("*")
    .from("user_favorite")
    .orderBy("umb_user_id");
  return res.status(200).json({ success: true, data: userFavorites });
});

// @desc    Get one user-favorite
// @route   GET /user-favorites/:id
// @access  Public - DEVELOPMENT
router.get("/user-favorites/:id", async (req, res, next) => {
  const userFavorite = await db
    .select("*")
    .from("user_favorite")
    .where("id", "=", req.params.id);
  return res.status(200).json({ success: true, data: userFavorite });
});

module.exports = router;

var express = require("express");
const knex = require("knex");
const config = require("../knexfile.js");
const db = knex(config.development);

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

// @desc    Get all favorites of one user
// @route   GET /users/:id/favorites
// @access  Public
router.get("/users/:id/favorites", async (req, res, next) => {
  const getAllUserFavorites = await db
    .select("*")
    .from("user_favorite")
    .where("umb_user_id", "=", req.params.id);
  return res.status(200).json({ success: true, data: getAllUserFavorites });
});

// @desc    Get one favorite of one user
// @route   GET /users/:userId/favorites/:favoriteId
// @access  Public
router.get("/users/:userId/favorites/:favoriteId", async (req, res, next) => {
  const getOneUserFavorite = await db
    .select("*")
    .from("user_favorite")
    .where("umb_user_id", "=", req.params.userId)
    .andWhere("comment_id", "=", req.params.favoriteId);
  return res.status(200).json({ success: true, data: getOneUserFavorite });
});

// @desc    Delete one favorite of one user
// @route   DELETE /users/:userId/favorites/:favoriteId
// @access  Public
router.delete(
  "/users/:userId/favorites/:favoriteId",
  async (req, res, next) => {
    const deleteOneUserFavorite = await db
      .select("*")
      .from("user_favorite")
      .where("umb_user_id", "=", req.params.userId)
      .andWhere("comment_id", "=", req.params.favoriteId)
      .del();
    return res.status(200).json({ success: true, data: [] });
  }
);

// @desc    Delete all favorites of one user
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

// @desc    Get one favorite of one user
// @route   GET /users/:userId/favorites/:favoriteId
// @access  Public
router.post("/users/:userId/favorites/:favoriteId", async (req, res, next) => {
  const addUserFavorite = await db
    .insert([
      { umb_user_id: req.params.userId },
      { comment_id: req.params.favoriteId }
    ])
    .into("user-favorite");
  return res.status(201).json({ success: true, data: addUserFavorite });
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
    .from("user_favorite")
    .where("comment_id", "=", req.params.id);
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

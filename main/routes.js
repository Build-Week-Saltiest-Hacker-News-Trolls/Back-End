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

// @desc    Get all users
// @route   GET /users
// @access  Public - DEVELOPMENT
router.get("/users", async (req, res, next) => {
  const users = await db.select("*").from("umb_user");
  return res.status(200).json({ success: true, data: users });
});

// @desc    Get one user
// @route   GET /users/:id
// @access  Public
router.get("/users/:id", async (req, res, next) => {
  const user = await db
    .select("*")
    .from("umb_user")
    .where("id", "=", req.params.id);
  return res.status(200).json({ success: true, data: user });
});

// @desc    Get all user-favorites
// @route   GET /user-favorites
// @access  Public - DEVELOPMENT
router.get("/user-favorites", async (req, res, next) => {
  const userFavorites = await db.select("*").from("user_favorite");
  return res.status(200).json({ success: true, data: userFavorites });
});

// @desc    Get one user-favorite
// @route   GET /user-favorites/:id
// @access  Public
router.get("/user-favorites/:id", async (req, res, next) => {
  const userFavorite = await db
    .select("*")
    .from("user_favorite")
    .where("id", "=", req.params.id);
  return res.status(200).json({ success: true, data: userFavorite });
});

// @desc    Get all favorites of one user
// @route   GET /users/:id/favorites
// @access  Public
router.get("/users/:id/favorites", async (req, res, next) => {
  const userFavorites = await db
    .select("*")
    .from("user_favorite")
    .where("umb_user_id", "=", req.params.id);
  return res.status(200).json({ success: true, data: userFavorites });
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

module.exports = router;

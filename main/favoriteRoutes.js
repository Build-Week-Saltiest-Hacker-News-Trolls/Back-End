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

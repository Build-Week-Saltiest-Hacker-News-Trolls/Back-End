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

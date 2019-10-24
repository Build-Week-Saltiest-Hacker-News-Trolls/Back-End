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
    .from("user_favorite")
    .where("umb_user_id", "=", req.params.id);
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
    .from("user_favorite")
    .where("umb_user_id", "=", req.params.userId)
    .andWhere("comment_id", "=", req.params.commentId);
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

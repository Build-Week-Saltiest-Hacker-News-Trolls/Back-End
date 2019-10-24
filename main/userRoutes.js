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

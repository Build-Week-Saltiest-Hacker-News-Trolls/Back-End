const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("You have reached GET /users");
});

router.get("/:id", (req, res) => {
  res.status(200).send("You have reached GET /users/:id");
});

// @desc    Create new user
// @route   POST /users
// @body    includes username and password
// @access  Private
router.post("/username", async (req, res, next) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  console.log(user);
  const createNewUser = await db.insert(user).into("umb_user");
  return res.status(201).json({ success: true });
});

router.put("/:id", (req, res) => {
  res.status(200).send("You have reached PUT /users/:id");
});

router.delete("/:id", (req, res) => {
  res.status(200).send("You have reached DELETE /users/:id");
});

module.exports = router;
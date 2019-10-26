const express = require("express");

const router = express.Router();

// @desc    Hello
// @route   GET /hello
// @access  Public - DEVELOPMENT
router.get("/hello", function(req, res) {
  res.status(200).json("hello from the server");
});

// @desc    Get one user by username and verify password
// @route   POST /login
// @body    must include username and password
// @access  Public - Necessary for authentication
router.post("/login", async (req, res, next) => {
  let { username, password } = req.body;

  const user = await db
    .select("*")
    .from("umb_user")
    .where("display_name", "=", `${username}`)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.display_name}!` });
      } else {
        res.status(401).json({ message: "Invalid credentials." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Something went wrong", error: err });
    });
});

module.exports = router;

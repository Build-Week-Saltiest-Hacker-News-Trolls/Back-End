const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("You have reached GET /users");
});

router.get("/:id", (req, res) => {
  res.status(200).send("You have reached GET /users/:id");
});

router.post("/", (req, res) => {
  res.status(200).send("You have reached POST /users");
});

router.put("/:id", (req, res) => {
  res.status(200).send("You have reached PUT /users/:id");
});

router.delete("/:id", (req, res) => {
  res.status(200).send("You have reached DELETE /users/:id");
});

module.exports = router;

const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("You have reached GET /comments");
});

router.get("/:id", (req, res) => {
  res.status(200).send("You have reached GET /comments/:id");
});

router.post("/", (req, res) => {
  res.status(200).send("You have reached POST /comments");
});

router.put("/:id", (req, res) => {
  res.status(200).send("You have reached PUT /comments/:id");
});

router.delete("/:id", (req, res) => {
  res.status(200).send("You have reached DELETE /comments/:id");
});

module.exports = router;

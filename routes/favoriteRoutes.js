const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("You have reached GET /favorites");
});

router.get("/:id", (req, res) => {
  res.status(200).send("You have reached GET /favorites/:id");
});

router.post("/", (req, res) => {
  res.status(200).send("You have reached POST /favorites");
});

router.put("/:id", (req, res) => {
  res.status(200).send("You have reached PUT /favorites/:id");
});

router.delete("/:id", (req, res) => {
  res.status(200).send("You have reached DELETE /favorites/:id");
});

module.exports = router;

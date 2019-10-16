var express = require("express");

var router = express.Router();

router.get("/hello", function(req, res) {
  res.json("hello from the server");
});

module.exports = router;

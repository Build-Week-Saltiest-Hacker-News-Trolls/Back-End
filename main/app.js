var createError = require("http-errors");
var express = require("express");
const helmet = require("helmet");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

var indexRouter = require("./routes");

var app = express();

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use(function(req, res) {
  res.status(404).json({ success: false, message: "404 - route not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(500)
    .json({ message: "There was an error performing the request", error: err });
});

module.exports = app;

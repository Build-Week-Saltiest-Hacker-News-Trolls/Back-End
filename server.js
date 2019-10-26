const express = require("express");

const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const baseRoutes = require("./routes/baseRoutes");

const server = express();

server.use("/users", userRoutes);
server.use("/comments", commentRoutes);
server.use("/favorites", favoriteRoutes);
server.use("/", baseRoutes);

server.use(function(req, res) {
  res.status(404).send(`Not found.`);
});

port = process.env.PORT || 9000;

server.listen(port, () => console.log(`API running on port ${port}`));

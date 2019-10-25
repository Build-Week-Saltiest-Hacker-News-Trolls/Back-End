const express = require("express");

const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const baseRoutes = require("./routes/baseRoutes");

const server = express();

server.use("/users", userRoutes);
server.use("/comments", commentRoutes);
server.use("/", baseRoutes);

port = process.env.PORT || 9000;

server.listen(port, () => console.log(`API running on port ${port}`));

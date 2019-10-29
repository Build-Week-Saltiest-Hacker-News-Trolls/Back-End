const db = require("../db/db-config");

module.exports = {
  getUsers,
  getUserByID
};

function getUsers() {
  return db("umb_user");
}

function getUserByID(id) {
  return db("umb_user")
    .where("id", "like", `${id}`)
    .first();
}

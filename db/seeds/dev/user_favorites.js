const faker = require("faker");

const createFakeFavorites = () => ({
  umb_user_id: Math.ceil(Math.random() * 100),
  comment_id: Math.ceil(Math.random() * 100)
});

exports.seed = function(knex) {
  let fakeFavorites = [];
  for (let i = 1; i <= 90; i++) {
    fakeFavorites.push(createFakeFavorites());
  }
  // Deletes ALL existing entries
  return knex("user_favorite")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("user_favorite").insert(fakeFavorites);
    });
};

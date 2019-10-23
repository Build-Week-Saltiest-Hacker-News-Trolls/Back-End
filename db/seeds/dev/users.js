const faker = require("faker");

const createFakeUser = () => ({
  display_name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
});

exports.seed = function(knex) {
  let fakeUsers = [];
  for (let i = 1; i <= 90; i++) {
    fakeUsers.push(createFakeUser());
  }
  // Deletes ALL existing entries
  return knex("umb_user")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("umb_user").insert(fakeUsers);
    });
};

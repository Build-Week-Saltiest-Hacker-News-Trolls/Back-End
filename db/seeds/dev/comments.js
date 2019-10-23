const faker = require("faker");

const createFakeComment = () => ({
  author: faker.name.findName(),
  comment_text: faker.lorem.sentence(),
  original_comment_time: faker.date.past(),
  pos: Math.random().toPrecision(2),
  neg: Math.random().toPrecision(2),
  neu: Math.random().toPrecision(2)
});

exports.seed = function(knex) {
  let fakeComments = [];
  for (let i = 1; i <= 90; i++) {
    fakeComments.push(createFakeComment());
  }
  // Deletes ALL existing entries
  return knex("comment")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("comment").insert(fakeComments);
    });
};

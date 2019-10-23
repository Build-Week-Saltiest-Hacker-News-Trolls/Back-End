exports.up = function(knex) {
  return knex.schema.createTable("user_favorite", tbl => {
    tbl.increments("id");
    tbl
      .integer("umb_user_id")
      .unsigned()
      .notNullable();
    tbl
      .integer("comment_id")
      .unsigned()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user_favorite");
};

exports.up = function(knex) {
  return knex.schema.createTable("user_favorite", tbl => {
    tbl.increments("id");
    tbl
      .integer("umb_user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("umb_user")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .integer("comment_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("comment")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user_favorite");
};

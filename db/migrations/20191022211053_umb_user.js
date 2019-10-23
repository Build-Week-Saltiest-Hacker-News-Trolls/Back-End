exports.up = function(knex) {
  return knex.schema.createTable("umb_user", tbl => {
    tbl.increments("id");
    tbl
      .string("display_name", 128)
      .unique()
      .notNullable();
    tbl
      .string("email", 128)
      .unique()
      .notNullable();
    tbl.string("password", 128).notNullable();
    tbl.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("umb_user");
};

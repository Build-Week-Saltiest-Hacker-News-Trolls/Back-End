exports.up = function(knex) {
  return knex.schema.createTable("comment", tbl => {
    tbl.increments("id");
    tbl.string("author", 128).notNullable();
    tbl.string("comment_text", 255).notNullable();
    tbl.timestamp("original_comment_time", { useTz: false }).notNullable();
    tbl.float("pos", 2, 1);
    tbl.float("neg", 2, 1);
    tbl.float("neu", 2, 1);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("comment");
};

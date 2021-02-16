
exports.up = knex => knex.schema.createTable("projects", table => {
    table.increments();
    table.text("title");
    //Relacionamento 1-n
    table.integer("user_id")
        .references("users.id")
        .notNullable()
        .onDelete("CASCADE")
        .unsigned()
    table.timestamps(true, true);
    table.timestamp("deleted_at");


})

exports.down = knex => knex.schema.dropTable("projects")

exports.up = knex => knex.schema.createTable("users", table => {
    table.increments()
    table.string("username", 80).notNullable().unique()
    table.timestamps(true, true)
    table.timestamp("deleted_at");


})

exports.down = knex => knex.schema.dropTable("users")


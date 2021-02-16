exports.up = knex => knex.schema.createTable("users", table => {
    table.increments()//id
    table.string("name", 60).notNullable()//nome
    table.string("email", 150).notNullable().unique()//email
    table.string("password_hash", 150).notNullable()//hash de password
    table.boolean("provider", "0").notNullable()//para alterar nivel de usuarios
    table.timestamps(true, true)//datas de created e uptaded
    table.timestamp("deleted_at");//data de deleted

})

exports.down = knex => knex.schema.dropTable("users")

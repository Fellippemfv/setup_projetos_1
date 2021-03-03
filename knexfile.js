// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST, //IP
      user: process.env.DB_USER,//Usuario mysql
      password: process.env.DB_PASS, //Senha do mysql
      database: process.env.DB_NAME // Nome do banco de dados
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds:{
      directory: `${__dirname}/src/database/seeds`
    }
  }

/*
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
*/
};

const knexfile = require("../../knexfile");
const knex = require("knex")(knexfile.development)//nesse caso dev mas no site fica production

module.exports = knex;
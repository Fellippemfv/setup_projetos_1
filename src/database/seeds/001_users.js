exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'Fellippe Matheus', email: "felippe_matheus@hotmail.com", password_hash: "112314ggsfsfsf.42421424225.afsfsfaf", provider: "0"},
        {name: 'Mayke Brito', email: "mayke_brito@hotmail.com", password_hash: "112314ggsfsfsf.42421424225.afsfsfaf", provider: "1"},
        {name: 'Diego Alves', email: "diego_alves@hotmail.com", password_hash: "112314ggsfsfsf.42421424225.afsfsfaf", provider: "2"}        
      ]);
    });
};
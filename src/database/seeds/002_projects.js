
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {user_id: 1, title: "Projeto do usuario 1"},
        {user_id: 2, title: "Projeto do usuario 2"},
        {user_id: 3, title: "Projeto do usuario 3"}

        //{user_id: 2,title: "meu outro projeto"}
      ]);
    });
};


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 'abcde9876jild23223', name: 'Food', slug: 'food', description: 'Foodies'},
      ])
    })
}

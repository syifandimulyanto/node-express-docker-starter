const uuidv1 = require('uuid/v1')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: uuidv1(), fullname: 'Syifandi Mulyanto', email: 'fanfandi17@gmail.com', password: ''},
      ])
    })
}

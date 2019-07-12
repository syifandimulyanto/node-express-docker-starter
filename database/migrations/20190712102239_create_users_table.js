
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.uuid('id').unique().primary()
        table.string('fullname', 250).notNullable()
        table.string('email', 250).notNullable().unique()
        table.string('password', 250).notNullable()
        table.string('picture').nullable()
        table.timestamps()
        table.datetime('deleted_at')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};
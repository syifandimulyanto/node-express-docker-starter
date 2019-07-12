
exports.up = function(knex) {
    return knex.schema.createTable('categories', table => {
        table.uuid('id').unique().primary()
        table.string('name', 250).notNullable()
        table.string('slug', 250).notNullable().unique()
        table.text('description').nullable()
        table.timestamps()
        table.datetime('deleted_at')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('categories')
}

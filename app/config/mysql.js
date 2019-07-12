const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: (process.env.MYSQL_HOST || '172.22.0.2'),
        port: (process.env.MYSQL_PORT || '3306'),
        user: (process.env.MYSQL_USER || 'root'),
        password: (process.env.MYSQL_PASSWORD || 'node-password'),
        database: (process.env.MYSQL_DATABASE || 'node-starter'),
        charset: 'utf8',
      },
    debug: true
});

module.exports = knex
require('dotenv').config()
module.exports = {

  development: {
    migrations: {
      directory: './database/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './database/seeds',
      tableName: 'seeds'
    },
    debug: true,
    client: 'mysql',
    connection: {
      host: (process.env.MYSQL_HOST || '172.22.0.2'),
      port: (process.env.MYSQL_PORT || '3306'),
      user: (process.env.MYSQL_USER || 'root'),
      password: (process.env.MYSQL_PASSWORD || 'node-password'),
      database: (process.env.MYSQL_DATABASE || 'node-starter'),
      charset: 'utf8',
    }
  },

  staging: {
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
  },

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

};

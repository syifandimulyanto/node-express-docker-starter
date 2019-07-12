## Node Express Docker Starter

Node Express Docker Starter is project to facilitate create new project, 
we don't need to work hard, to do the initial configuration

##### Step to use this project :
- docker-compose up -d

### Migrations

#### Create Table

```bash
$ knex migrate:make create-<example>-table
```

#### Run Migrations

```bash
$ knex migrate:latest
```
Add `--env=test` to migrate your test database.

### Seeds

#### Create Seeds

```bash
$ knex seed:make <examples>
```
Replace the function in `seeds/dev/<examples>.js` with your own seeds.d

#### Seed DB

```bash
$ knex seed:run
```
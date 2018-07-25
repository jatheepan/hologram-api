import db from '../db';
const {mysql, knex} = db;

const query = knex.schema.createTable('users', (table) => {
  table.increments();
  table.string('username');
  table.string('first_name');
  table.string('last_name');
  table.string('email');
  table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  table.timestamp('modified_at').notNullable().defaultTo(knex.raw('now()'));
});

const dropQuery = knex.schema.dropTable('users');
mysql.connect()
.then(connection => {
  connection.query(dropQuery.toString(), (err, data) => {
    connection.query(query.toString(), (err, data) => {
      if (err) console.error(err);
      console.log(data);
      process.exit();
    });
  });
});

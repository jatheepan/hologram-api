import mysql from 'mysql';
import knex from 'knex';

const HOST = 'localhost';
const USER = 'root';
const PASS = 'root';
const DB_NAME = 'book_keeper'

const mysqlConnection = mysql.createPool({
  connectionLimit: 10,
  host: HOST,
  user: USER,
  password: PASS,
  database: DB_NAME
});

export default {
  mysql: {
    connect: () => new Promise((resolve, reject) => {
      mysqlConnection.getConnection((err, connection) => (err) ? reject(err) :
        resolve(connection));
    })
  },
  knex: knex({
    client: 'mysql',
    connection: {
      host: HOST,
      user: USER,
      password: PASS,
      database: DB_NAME
    }
  })
};

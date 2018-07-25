import db from '../db';
const {mysql, knex} = db;

const getUsers = (page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const query = knex.select('id', 'username', 'first_name', 'last_name').offset(offset).limit(limit).from('users');

  return new Promise((resolve, reject) => {
    mysql.connect()
         .then(connection => {
           connection.query(query.toString(), (err, data) => {
             if (err) return reject(err);
             resolve(data);
           });
         });
  } );
};

const getUser = (id) => {
  const query = knex.select('id', 'username', 'first_name', 'last_name').where('id', id).from('users');
  return new Promise((resolve, reject) => {
    mysql.connect()
      .then(connection => {
        connection.query(query.toString(), (err, data) => {
          if (err) return reject(err);
          resolve(data);
        });
      })
  })
}

export {
  getUsers,
  getUser
};
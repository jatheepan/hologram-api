import db from '../db';
const {mysql, knex} = db;

const fields = ['id', 'username', 'first_name', 'last_name', 'created_at', 'modified_at'];

const saveUser = (values) => {
  const {first_name, last_name, username} = values;
  const data = {first_name, last_name, username};
  const query = knex('users').insert(data);
  //TODO: need to check for duplicate username/email
  return new Promise((resolve, reject) => {
    mysql.connect()
         .then(connection => {
           connection.query(query.toString(), (err, data) => {
             connection.end();
             if (err) return reject(err);
             resolve(data);
           });
         });
  });
};

const getUsers = (page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const query = knex.select(...fields).offset(offset).limit(limit).from('users');

  return new Promise((resolve, reject) => {
    mysql.connect()
         .then(connection => {
           connection.query(query.toString(), (err, data) => {
             connection.end();
             if (err) return reject(err);
             resolve(data);
           });
         });
  });
};

const getUser = (id) => {
  const query = knex.select(...fields).where('id', id).from('users');
  return new Promise((resolve, reject) => {
    mysql.connect()
      .then(connection => {
        connection.query(query.toString(), (err, data) => {
          connection.end();
          if (err) return reject(err);
          resolve(data);
        });
      })
  });
};

const deleteUser = (id) => {
  //TODO: Make sure logged in user does not delete itself
  const query = knex('users').where('id', id).del();
  return new Promise((resolve, reject) => {
    mysql.connect()
         .then(connection => {
           connection.query(query.toString(), (err, data) => {
             connection.end();
             if (err) return reject(err);
             resolve(data);
           });
         });
  });
};

export {
  getUsers,
  getUser,
  saveUser,
  deleteUser
};
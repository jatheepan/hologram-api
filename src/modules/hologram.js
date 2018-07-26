import db from '../db';
const {mysql, knex} = db;

const fields = ['id', 'title', 'description'];

const saveHologram = (values, pictures) => {
  const {title, description} = values;
  const data = {title, description, pictures};
  const query = knex('holograms').insert(data);
  return new Promise((resolve, reject) => {
    mysql.connect()
         .then(connection => {
           connection.query(query.toString(), (err, data) => {
             connection.release();
             if (err) return reject(err);
             resolve(data);
           });
         });
  });
};

const getHolograms = (page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const query = knex.select(...fields).offset(offset).limit(limit).from('holograms');

  return new Promise((resolve, reject) => {
    mysql.connect()
         .then(connection => {
           connection.query(query.toString(), (err, data) => {
             connection.release();
             if (err) return reject(err);
             resolve(data);
           });
         });
  });
};

const getHologram = (id) => {
  const query = knex.select(...fields).where('id', id).from('hologram');
  return new Promise((resolve, reject) => {
    mysql.connect()
      .then(connection => {
        connection.query(query.toString(), (err, data) => {
          connection.release();
          if (err) return reject(err);
          resolve(data);
        });
      })
  });
};

const deleteHologram = (id) => {
  const query = knex('holograms').where('id', id).del();
  return new Promise((resolve, reject) => {
    mysql.connect()
         .then(connection => {
           connection.query(query.toString(), (err, data) => {
             connection.release();
             if (err) return reject(err);
             resolve(data);
           });
         });
  });
};

const updateHologram = (id, values) => {
  const {title, description} = values;
  const data = {};
  if(title) data.title = title;
  if(description) data.description = description;

  const query = knex('holograms').where('id', id).update(data);
  return new Promise((resolve, reject) => {
    mysql.connect()
         .then(connection => {
           connection.query(query.toString(), (err, data) => {
             connection.release();
             if (err) return reject(err);
             resolve(data);
           });
         });
  });
};

const getHologramCount = () => {
  const query = knex('holograms').count({total: 'id'});
  return new Promise((resolve, reject) => {
    mysql.connect()
         .then(connection => {
           connection.query(query.toString(), (err, data) => {
             connection.release();
             if(err) return reject(err);
             resolve(data);
           })
         });

  });
}

const paginated = (page = 1, limit = 20) => {
  const promises = [getHolograms(page, limit), getHologramCount()];
  return Promise.all(promises)
    .then((result) => {
      return {
        holograms: result[0],
        total: result[1][0].total
      }
    });
};

export {
  saveHologram,
  getHologram,
  getHolograms,
  deleteHologram,
  updateHologram,
  paginated
};
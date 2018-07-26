import { Router } from 'express';
import { getUser, saveUser, getUsers, deleteUser, updateUser } from '../modules/user';

const routes = Router();

routes.get('/', (req, res, next) => {
  const {page, limit} = req.query;
  getUsers(page, limit)
  .then( data => {
    res.jsonp({users: data});
  })
  .catch(next);
});

routes.get('/:id', (req, res, next) => {
  getUser(req.params.id)
    .then( data => {
      res.jsonp({users: data});
    })
    .catch(next);
});

routes.post('/', (req, res, next) => {
  saveUser(req.body)
    .then( data => {
      res.jsonp({users: data});
    })
    .catch(next);
});

routes.put('/:id', (req, res, next) => {
  updateUser(req.params.id, req.body)
    .then( data => {
      res.jsonp({users: data});
    })
    .catch(next);
});

routes.delete('/:id', (req, res, next) => {
  deleteUser(req.params.id)
    .then( data => {
      res.jsonp({users: data});
    })
    .catch(next);
});

export default routes;

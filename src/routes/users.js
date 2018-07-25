import { Router } from 'express';
import { getUser, getUsers } from '../modules/user';

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

export default routes;

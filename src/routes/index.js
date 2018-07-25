import { Router } from 'express';
import users from './users';

const routes = Router();

routes.use('/users', users);
routes.get('/', (req, res) => {
  res.jsonp({data: null});
});


export default routes;

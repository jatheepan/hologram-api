import { Router } from 'express';
import users from './users';
import holograms from './holograms';

const routes = Router();

routes.get('/', (req, res) => {
  res.jsonp({data: null});
});
routes.use('/users', users);
routes.use('/holograms', holograms);


export default routes;

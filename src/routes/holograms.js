import { Router } from 'express';
import { getHologram, getHolograms, saveHologram, deleteHologram, updateHologram } from '../modules/hologram';

const routes = Router();

routes.get('/', (req, res, next) => {
  const {page, limit} = req.query;
  getHolograms(page, limit)
  .then( data => {
    res.jsonp({users: data});
  })
  .catch(next);
});

routes.get('/:id', (req, res, next) => {
  getHologram(req.params.id)
    .then( data => {
      res.jsonp({users: data});
    })
    .catch(next);
});

routes.post('/', (req, res, next) => {
  saveHologram(req.body)
    .then( data => {
      res.jsonp({users: data});
    })
    .catch(next);
});

routes.put('/:id', (req, res, next) => {
  updateHologram(req.params.id, req.body)
    .then( data => {
      res.jsonp({users: data});
    })
    .catch(next);
});

routes.delete('/:id', (req, res, next) => {
  deleteHologram(req.params.id)
    .then( data => {
      res.jsonp({users: data});
    })
    .catch(next);
});

export default routes;

import { Router } from 'express';
import multer from 'multer';

import { getHologram, paginated, saveHologram, deleteHologram, updateHologram } from '../modules/hologram';

const routes = Router();
const upload = multer({dest: 'uploads/'});

routes.get('/', (req, res, next) => {
  const {page, limit} = req.query;
  paginated(page, limit)
    .then( result => res.jsonp(result))
    .catch(next);
});

routes.get('/:id', (req, res, next) => {
  getHologram(req.params.id)
    .then( data => {
      res.jsonp({holograms: data});
    })
    .catch(next);
});

routes.post('/', upload.array('pictures'), (req, res, next) => {
  let pictures = req.files || [];
  pictures = pictures.map(file => file.path).join(',');
  saveHologram(req.body, pictures)
    .then( data => {
      res.jsonp({holograms: data});
    })
    .catch(next);
});

routes.put('/:id', (req, res, next) => {
  updateHologram(req.params.id, req.body)
    .then( data => {
      res.jsonp({holograms: data});
    })
    .catch(next);
});

routes.delete('/:id', (req, res, next) => {
  deleteHologram(req.params.id)
    .then( data => {
      res.jsonp({holograms: data});
    })
    .catch(next);
});

export default routes;

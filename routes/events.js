
const { Router } = require('express');
const { check } = require('express-validator');
const { validJWT } = require('../middlewares/valid-jwt');
const { getEvents, createEvents, updateEvents, removeEvents } = require('../controllers/event');
const { validFields } = require('../middlewares/valid-fields');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use( validJWT )

router.get('/', getEvents);

router.post('/',
  [
    check('title', 'Field required').not().isEmpty(),
    check('start', 'Field required').custom(isDate),
    validFields
  ],
  createEvents
);

router.put('/:id', 
  [
    check('title', 'Field required').not().isEmpty(),
    check('start', 'Field required').custom(isDate),
    validFields
  ],
  updateEvents
);

router.delete('/:id', removeEvents );

module.exports = router;
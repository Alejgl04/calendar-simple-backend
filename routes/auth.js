
const { Router } = require('express');
const { check } = require('express-validator');

const { registerUser, signInUser, reTokenUser } = require('../controllers/auth');
const { validFields } = require('../middlewares/valid-fields');
const { validJWT } = require('../middlewares/valid-jwt');
const router = Router();

router.post('/register', [
  check('name', 'Field required').not().isEmpty(),
  check('email', 'Field required').isEmail(),
  check('password', 'Password must be 6 characteres').isLength(6),
  validFields
], registerUser);

router.post('/login', [
  check('email', 'Field required').not().isEmpty(),
  check('email', 'Must be a valid email').isEmail(),
  check('password', 'Password must be 6 characteres').isLength(6),
  validFields
], signInUser);

router.get('/retoken', validJWT, reTokenUser);


module.exports = router;
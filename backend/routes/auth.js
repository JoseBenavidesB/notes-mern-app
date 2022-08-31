const { Router } = require('express');
const { check } = require('express-validator');

const { login, renewJWT } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/fielValidator');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/',[
    check('email', 'Check the input email').isEmail(),
    check('password', 'Password is necessary').not().isEmpty(),
    fieldValidator
], login);

// renew JWT
router.get('/renew', [
    validateJWT,
],renewJWT);


module.exports = router;
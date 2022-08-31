
const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPut, userPost, userDelete } = require('../controllers/user');
const { userExist, emailExist } = require('../helpers/db-validator');
const { fieldValidator } = require('../middlewares/fielValidator');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

/* ---------Get all users--------- */
router.get('/', userGet);

/* ---------create user--------- */
router.post('/',[
    check('name', 'Name require').not().isEmpty(),
    check('password', 'Password require, must have at least 6 digits').isLength( { min: 6 }),
    check('email', 'Invalid email').isEmail(),
    check('email').custom( (email) => emailExist(email) ),
    fieldValidator
] , userPost);

/* ---------update user--------- */
router.put('/:id',[
    check('id', 'Doesnt a valid ID').isMongoId(),
    check('id').custom( userExist ),
    fieldValidator
],userPut);

/* ---------delete user--------- */
router.delete('/:id',[
    validateJWT,
    check('id', 'Doesnt a valid ID').isMongoId(),
    check('id').custom( userExist ),
    fieldValidator
] ,userDelete);


module.exports = router
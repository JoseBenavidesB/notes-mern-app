const { Router } = require('express');
const { check } = require('express-validator');

const {getNotes, getNoteById, createNote, updateNote, deleteNote } = require('../controllers/notes');
const { fieldValidator } = require('../middlewares/fielValidator');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

/* ---------Get all notes--------- */
router.get('/', [
    validateJWT,
    fieldValidator
],getNotes);

/* ---------get note by id--------- */
router.get('/:id', [
    check( 'id', 'Is not mongo ID Valid').isMongoId(), //check valid mongo db
    fieldValidator
], getNoteById);

/* ---------create note--------- */
router.post('/', [
    validateJWT,
    check( 'title', 'The title is neccesary').not().isEmpty(), //check empty values
    fieldValidator
],createNote);

/* ---------update note--------- */
router.put('/:id', [
    check( 'id', 'Is not mongo ID Valid').isMongoId(), //check valid mongo db
    check( 'title', 'The title is neccesary').not().isEmpty(), //check empty values
    fieldValidator
],updateNote);


/* ---------delete note--------- */
router.delete('/:id', [
    check( 'id', 'Is not mongo ID Valid').isMongoId(), //check valid mongo db
    fieldValidator
], deleteNote);

module.exports = router;
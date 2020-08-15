const { Router } = require('express');
const { check } = require('express-validator');
const usersCtrl = require('../controllers/users');
const fileUpload = require('../middleware/file-upload');
const router = Router();

router.get('/', usersCtrl.getUsers);

router.post('/signup', fileUpload.single('image'), [
  check('name').not().isEmpty(),
  check('email').normalizeEmail().isEmail(),
  check('password').isLength({ min: 6 }),
], usersCtrl.signup);

router.post('/login', usersCtrl.login);

module.exports = router;

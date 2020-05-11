const { Router } = require('express');
const { check } = require('express-validator');
const placesCtrl = require('../controllers/places');
const fileUpload = require('../middleware/file-upload');

const router = Router();

router.get('/:placeId', placesCtrl.getPlaceById);

router.get('/user/:userId', placesCtrl.getPlacesByUserId);

router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty()
  ],
  placesCtrl.createPlace
);

router.patch(
  '/:placeId',
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  placesCtrl.updatePlace
);

router.delete('/:placeId', placesCtrl.deletePlace);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getCars, getCarById, createCar, updateCar } = require('../controllers/carController');

router.get('/', getCars);
router.get('/:id', getCarById);
router.post('/', createCar);
router.patch('/:id', updateCar);

module.exports = router;

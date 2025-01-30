const express = require('express');
const { getHotels, createHotel } = require('../controllers/hotelController');
const router = express.Router();

router.route('/').get(getHotels).post(createHotel);

module.exports = router;

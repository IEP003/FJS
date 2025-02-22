const express = require('express');
const { getHotels, createHotel } = require('../controllers/hotelController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
    .get(protect, getHotels)
    .post(protect, createHotel);

module.exports = router;

const express = require('express');
const { getBookings, createBooking } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
    .get(protect, getBookings)
    .post(protect, createBooking);

module.exports = router;

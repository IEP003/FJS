const Booking = require('../models/Booking');

const getBookings = async (req, res) => {
    const bookings = await Booking.find({}).populate('user').populate('hotel');
    res.json(bookings);
};

const createBooking = async (req, res) => {
    const { user, hotel, startDate, endDate, totalPrice } = req.body;
    const booking = new Booking({
        user,
        hotel,
        startDate,
        endDate,
        totalPrice,
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
};

module.exports = { getBookings, createBooking };

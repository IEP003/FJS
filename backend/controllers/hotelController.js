const Hotel = require('../models/Hotel');

const getHotels = async (req, res) => {
    const hotels = await Hotel.find({});
    res.json(hotels);
};

const createHotel = async (req, res) => {
    const { name, location, description, amenities } = req.body;
    const hotel = new Hotel({
        name,
        location,
        description,
        amenities,
    });

    const createdHotel = await hotel.save();
    res.status(201).json(createdHotel);
};

module.exports = { getHotels, createHotel };

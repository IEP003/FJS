const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
    description: { type: String },
    amenities: [String],
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;

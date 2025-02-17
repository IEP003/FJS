import React from 'react';
import './BookingCard.css';

const BookingCard = ({ booking }) => {
    return (
        <div className="booking-card">
            <div className="booking-card-image">
                <img src="hotel-image-url" alt="Hotel" />
            </div>
            <div className="booking-card-info">
                <h3>{booking.hotel.name}</h3>
                <p>{booking.hotel.location}</p>
                <p>{booking.startDate} - {booking.endDate}</p>
                <p>Общая стоимость: {booking.totalPrice} руб.</p>
                <button>Подробнее</button>
            </div>
        </div>
    );
};

export default BookingCard;

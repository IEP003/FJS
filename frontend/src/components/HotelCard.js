import React from 'react';
import './HotelCard.css';

const HotelCard = ({ hotel }) => {
    return (
        <div className="hotel-card">
            <img src={hotel.imageUrl} alt={hotel.name} className="hotel-image" />
            <div className="hotel-info">
                <h3>{hotel.name}</h3>
                <p>{hotel.description}</p>
                <button>Подробнее</button>
            </div>
        </div>
    );
};

export default HotelCard;

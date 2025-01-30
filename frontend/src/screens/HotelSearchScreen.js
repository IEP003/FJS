import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import HotelCard from '../components/HotelCard';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './HotelSearchScreen.css';

const HotelSearchScreen = () => {
    const [name, setName] = useState('');
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [hotels, setHotels] = useState([]);

    const handleSearch = () => {
        setHotels([
            {
                id: 1,
                name: 'Hotel 1',
                description: 'Description of hotel 1',
                imageUrl: 'https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/fd1c3f.jpg.webp?itok=KQVu0gUC',
            },
            {
                id: 2,
                name: 'Hotel 2',
                description: 'Description of hotel 2',
                imageUrl: 'https://www.menslife.com/upload/iblock/4f1/marina_bay_sands_hotel_casino_skypark_singapore_from_waterfront_esplanade.jpg',
            },
        ]);
    };

    return (
        <>
            <Header />
            <div className="container">
                <Sidebar />
                <div className="main-content">
                    <h1>Поиск гостиницы</h1>
                    <div className="search-form">
                        <label>
                            Введите название гостиницы (необязательно):
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label>
                            Заезд:
                            <Calendar
                                onChange={setCheckInDate}
                                value={checkInDate}
                                minDate={new Date()}
                            />
                        </label>
                        <label>
                            Выезд:
                            <Calendar
                                onChange={setCheckOutDate}
                                value={checkOutDate}
                                minDate={new Date(checkInDate).setDate(checkInDate.getDate() + 1)}
                            />
                        </label>
                        <button onClick={handleSearch}>Искать</button>
                    </div>
                    <div className="hotel-results">
                        {hotels.map((hotel) => (
                            <HotelCard key={hotel.id} hotel={hotel} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HotelSearchScreen;

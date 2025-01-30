import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listHotels } from '../actions/hotelActions';

const HotelList = () => {
    const dispatch = useDispatch();
    const hotelList = useSelector(state => state.hotelList);
    const { loading, error, hotels } = hotelList;

    useEffect(() => {
        dispatch(listHotels());
    }, [dispatch]);

    return (
        <div>
            <h1>Гостиницы</h1>
            {loading ? (
                <p>Загрузка...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {hotels.map((hotel) => (
                        <li key={hotel._id}>{hotel.name} - {hotel.location}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HotelList;

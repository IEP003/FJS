import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listBookings } from '../actions/bookingActions';
import BookingCard from '../components/BookingCard';
import './BookingScreen.css';

const BookingScreen = () => {
    const dispatch = useDispatch();

    const bookingList = useSelector((state) => state.bookingList);
    const { loading, error, bookings } = bookingList;

    useEffect(() => {
        dispatch(listBookings());
    }, [dispatch]);

    return (
        <div className="booking-screen">
            <h1>Мои бронирования</h1>
            {loading ? (
                <p>Загрузка...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {bookings.map((booking) => (
                        <BookingCard key={booking._id} booking={booking} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookingScreen;

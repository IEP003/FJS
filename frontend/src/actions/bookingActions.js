import axios from 'axios';
import {
    BOOKING_CREATE_REQUEST,
    BOOKING_CREATE_SUCCESS,
    BOOKING_CREATE_FAIL,
    BOOKING_LIST_REQUEST,
    BOOKING_LIST_SUCCESS,
    BOOKING_LIST_FAIL,
} from '../constants/bookingConstants';

export const createBooking = (bookingData) => async (dispatch, getState) => {
    try {
        dispatch({ type: BOOKING_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post('/api/bookings', bookingData, config);

        dispatch({ type: BOOKING_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: BOOKING_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const listBookings = () => async (dispatch, getState) => {
    try {
        dispatch({ type: BOOKING_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get('/api/bookings', config);

        dispatch({ type: BOOKING_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: BOOKING_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

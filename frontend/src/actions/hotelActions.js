import axios from 'axios';
import {
    HOTEL_LIST_REQUEST,
    HOTEL_LIST_SUCCESS,
    HOTEL_LIST_FAIL,
    HOTEL_CREATE_REQUEST,
    HOTEL_CREATE_SUCCESS,
    HOTEL_CREATE_FAIL,
} from '../constants/hotelConstants';

export const listHotels = () => async (dispatch) => {
    try {
        dispatch({ type: HOTEL_LIST_REQUEST });
        const { data } = await axios.get('/api/hotels');
        dispatch({ type: HOTEL_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: HOTEL_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const createHotel = (hotel) => async (dispatch, getState) => {
    try {
        dispatch({ type: HOTEL_CREATE_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.post('/api/hotels', hotel, config);
        dispatch({ type: HOTEL_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: HOTEL_CREATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

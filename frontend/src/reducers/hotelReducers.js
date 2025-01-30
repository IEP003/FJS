import {
    HOTEL_LIST_REQUEST,
    HOTEL_LIST_SUCCESS,
    HOTEL_LIST_FAIL,
    HOTEL_CREATE_REQUEST,
    HOTEL_CREATE_SUCCESS,
    HOTEL_CREATE_FAIL,
} from '../constants/hotelConstants';

export const hotelListReducer = (state = { hotels: [] }, action) => {
    switch (action.type) {
        case HOTEL_LIST_REQUEST:
            return { loading: true, hotels: [] };
        case HOTEL_LIST_SUCCESS:
            return { loading: false, hotels: action.payload };
        case HOTEL_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const hotelCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case HOTEL_CREATE_REQUEST:
            return { loading: true };
        case HOTEL_CREATE_SUCCESS:
            return { loading: false, success: true, hotel: action.payload };
        case HOTEL_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

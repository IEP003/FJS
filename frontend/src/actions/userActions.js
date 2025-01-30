import axios from 'axios';
import {
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
} from '../constants/userConstants';

export const register = (name, email, password) => async (dispatch) => {
    try {
        const { data } = await axios.post('/api/users/register', { name, email, password });

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data.message });
    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        const { data } = await axios.post('/api/users/login', { email, password });

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.message });
    }
};

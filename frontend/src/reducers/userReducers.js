import {
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
} from '../constants/userConstants';

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_SUCCESS:
            return { success: true, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { success: false, error: action.payload };
        default:
            return state;
    }
};

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return { success: true, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { success: false, error: action.payload };
        default:
            return state;
    }
};

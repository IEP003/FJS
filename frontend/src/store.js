import { configureStore } from '@reduxjs/toolkit';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import { bookingCreateReducer, bookingListReducer } from './reducers/bookingReducers';

const reducer = {
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    bookingCreate: bookingCreateReducer,
    bookingList: bookingListReducer,
};

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const preloadedState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;

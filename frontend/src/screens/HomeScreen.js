import React from 'react';
import { Link } from 'react-router-dom';
import './HomeScreen.css';

const HomeScreen = () => {
    return (
        <div className="home-container">
            <h1>Добро пожаловать в нашу гостиницу</h1>
            <div className="button-container">
                <Link to="/login" className="nav-button">Войти</Link>
                <Link to="/register" className="nav-button">Зарегистрироваться</Link>
            </div>
        </div>
    );
};

export default HomeScreen;

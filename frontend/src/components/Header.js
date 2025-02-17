import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header>
            <nav>
                <Link to="/">Главная</Link>
                <Link to="/hotels">Поиск гостиницы</Link>
                <Link to="/login">Войти</Link>
                <Link to="/register">Регистрация</Link>
            </nav>
        </header>
    );
};

export default Header;

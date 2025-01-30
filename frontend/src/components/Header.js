import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">Поиск гостиницы</Link>
                <div className="auth-buttons">
                    <Link to="/login" className="auth-button">Войти</Link>
                    <Link to="/register" className="auth-button">Регистрация</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;

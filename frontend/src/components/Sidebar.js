import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/hotels">Все гостиницы</Link></li>
                <li><Link to="/search-room">Поиск номера</Link></li>
                <li><Link to="/add-hotel">Добавить гостиницу</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;

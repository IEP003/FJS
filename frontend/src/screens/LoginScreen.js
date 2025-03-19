import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import './LoginScreen.css';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(userInfo)); // Сохраняем пользователя
            navigate(userInfo.role === 'admin' ? '/admin' : '/profile'); // Перенаправление по роли
        }
    }, [navigate, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }
        dispatch(login(email, password));
    };

    return (
        <div className="login-container">
            <h1>Войти</h1>
            {error && <div className="error-message">{error}</div>}
            {loading && <div>Загрузка...</div>}
            <form onSubmit={submitHandler}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Войти</button>
            </form>
            <div>
                Новый пользователь? <Link to="/register">Зарегистрироваться</Link>
            </div>
        </div>
    );
};

export default LoginScreen;

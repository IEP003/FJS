import React from 'react';

const ProfileScreen = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Личный кабинет</h1>
            {user ? (
                <div>
                    <p><strong>Имя:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Роль:</strong> {user.role}</p>
                </div>
            ) : (
                <p>Ошибка загрузки профиля</p>
            )}
        </div>
    );
};

export default ProfileScreen;
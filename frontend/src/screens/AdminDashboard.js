import React from 'react';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Админ-панель</h1>
            {user && user.role === 'admin' ? (
                <div>
                    <p>Добро пожаловать, <strong>{user.name}</strong>!</p>
                    <p>Вы находитесь в панели администратора.</p>
                </div>
            ) : (
                <p>Доступ запрещен</p>
            )}
        </div>
    );
};

export default AdminDashboard;

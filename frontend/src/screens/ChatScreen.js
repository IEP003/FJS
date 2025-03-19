import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5001');

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const user = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        axios.get('/api/chat').then(({ data }) => setMessages(data));

        socket.on('message', (newMessage) => {
            setMessages((prev) => [...prev, newMessage]);
        });

        return () => socket.off('message');
    }, []);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const newMessage = { userId: user._id, message, isSupport: user.role === 'admin' };
        socket.emit('sendMessage', newMessage);
        setMessage('');
    };

    return (
        <div>
            <h1>Чат с поддержкой</h1>
            <div>
                {messages.map((msg) => (
                    <p key={msg._id}><strong>{msg.isSupport ? 'Поддержка' : 'Вы'}:</strong> {msg.message}</p>
                ))}
            </div>
            <input value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Отправить</button>
        </div>
    );
};

export default ChatScreen;

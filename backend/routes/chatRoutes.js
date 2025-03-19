const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const Message = require('../models/Message');

const router = express.Router();

// Получить историю чата
router.get('/', protect, async (req, res) => {
    try {
        const messages = await Message.find().populate('sender', 'name email');
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Отправить сообщение
router.post('/', protect, async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ message: 'Сообщение не может быть пустым' });
    }

    try {
        const newMessage = new Message({
            sender: req.user._id,
            message,
            isSupport: req.user.role === 'admin'
        });

        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при отправке' });
    }
});

module.exports = router;

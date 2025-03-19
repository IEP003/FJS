const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ID пользователя
    message: { type: String, required: true }, // Текст сообщения
    isSupport: { type: Boolean, default: false }, // true, если сообщение от поддержки
    createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;

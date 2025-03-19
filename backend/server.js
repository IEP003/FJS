const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const chatRoutes = require('./routes/chatRoutes');
const Message = require('./models/Message');
const { Server } = require('socket.io');
const http = require('http');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

console.log(process.env.MONGO_URI);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

io.on('connection', (socket) => {
    console.log('Новый пользователь подключился');

    socket.on('sendMessage', async (data) => {
        const { userId, message, isSupport } = data;
        const newMessage = new Message({ sender: userId, message, isSupport });

        await newMessage.save();
        io.emit('message', newMessage); // Отправляем всем подключенным
    });

    socket.on('disconnect', () => {
        console.log('Пользователь отключился');
    });
});

server.listen(5001, () => console.log(`Server running on port ${5001}`));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(`Error connecting to MongoDB: ${error.message}`));

app.use('/api/users', userRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/chat', chatRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
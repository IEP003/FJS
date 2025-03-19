const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Регистрация пользователя
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Проверяем, существует ли уже пользователь с таким email
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'Пользователь уже существует' });
        }

        // Хешируем пароль перед сохранением
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Создаем нового пользователя
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user',
        });

        if (user) {
            // Успешно создали пользователя, возвращаем его данные вместе с токеном
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id), // Генерация токена
            });
        } else {
            res.status(400).json({ message: 'Неверные данные пользователя' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера при регистрации' });
    }
};

// Логин пользователя
const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Находим пользователя по email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Неправильный адрес электронной почты или пароль' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        console.log(isMatch)

        if (!isMatch) {
            return res.status(400).json({ message: 'Неправильный адрес электронной почты или пароль' });
        }

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id), // Генерация токена
        });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера при авторизации' });
    }
};

const getUserProfile = async (req, res) => {
    try {
        // req.user был установлен в middleware protect
        const user = await User.findById(req.user.id).select('-password'); // Убираем поле password для безопасности

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера при получении профиля' });
    }
};

const updateUserProfile = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;

        if (password) {
            user.password = password;  // Здесь желательно использовать bcrypt для хэширования пароля
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404).json({ message: 'Пользователь не найден' });
    }
};

// Генерация токена для авторизации
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' }); // Токен истекает через 30 дней
};

module.exports = { registerUser, authUser, updateUserProfile, getUserProfile };

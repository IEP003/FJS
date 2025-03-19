const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Пользователь не найден' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Неверный токен' });
        }
    } else {
        return res.status(401).json({ message: 'Нет доступа, токен отсутствует' });
    }
};

const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Недостаточно прав' });
    }
    next();
};

module.exports = { protect, adminMiddleware };

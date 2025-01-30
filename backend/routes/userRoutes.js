const express = require('express');
const { check, validationResult } = require('express-validator');
const { registerUser, authUser } = require('../controllers/userController');
const router = express.Router();

router.post(
    '/register',
    [
        check('name', 'Введите имя').not().isEmpty(),
        check('email', 'Пожалуйста, укажите действительный адрес электронной почты').isEmail(),
        check('password', 'Пароль должен быть не менее 6 символов').isLength({ min: 6 }),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    registerUser
);

router.post(
    '/login',
    [
        check('email', 'Пожалуйста, укажите действительный адрес электронной почты').isEmail(),
        check('password', 'Необходим пароль').exists(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    authUser
);

module.exports = router;

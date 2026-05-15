//điều phối request --> servives 

//-->views
const authService = require('../services/authService');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerSchema, loginSchema } = require('../helpers/validation');

const renderRegisterPage = (req, res) => {
    res.render('register', { title: 'Đăng ký', error: null });
};

const handleRegister = async (req, res) => {
    //
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.render('register', { title: 'Đăng ký', error: error.details[0].message });
    }

    try {
        const { username, password } = req.body;
        const lowUsername = username.toLowerCase().trim();

        const userExists = await User.findOne({ username: lowUsername });
        if (userExists) {
            return res.render('register', { title: 'Đăng ký', error: 'Tên đăng nhập này đã tồn tại!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username: lowUsername, password: hashedPassword, role: 'user' });

        res.redirect('/login');
    } catch (err) {
        res.render('register', { title: 'Đăng ký', error: 'Lỗi: ' + err.message });
    }
};

const renderLoginPage = (req, res) => {
    res.render('login', { title: 'Đăng nhập', error: null });
};

const handleLogin = async (req, res) => {
    //
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.render('login', { title: 'Đăng nhập', error: error.details[0].message });
    }

    try {
        const { username, password } = req.body;
        const lowUsername = username.toLowerCase().trim();

        const token = await authService.login(lowUsername, password);
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        res.redirect('/');
    } catch (err) {
        res.render('login', { title: 'Đăng nhập', error: err.message });
    }
};

const handleLogout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};

module.exports = { renderRegisterPage, handleRegister, renderLoginPage, handleLogin, handleLogout };
//kiểm tra token, trạng thái đăng nhập của user --> Controller

const jwt = require('jsonwebtoken');

// 1. Middleware kiểm tra user để hiện tên lên Header
const checkUser = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY', (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                res.locals.user = decodedToken;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

// 2. Middleware CHẶN người lạ (Bắt buộc đăng nhập mới được thêm mã)
const requireLogin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    }
    jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY', (err, decodedToken) => {
        if (err) {
            return res.redirect('/login');
        }
        next();
    });
};

// Xuất khẩu đúng tên hàm
module.exports = { checkUser, requireLogin };
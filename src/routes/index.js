const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const authController = require('../controllers/authController'); 
const { checkUser, requireLogin } = require('../middlewares/auth');

// Áp dụng checkUser cho tất cả routes để header biết user đang login hay chưa
router.use(checkUser);


router.get('/register', authController.renderRegisterPage);
router.post('/register', authController.handleRegister);

router.get('/login', authController.renderLoginPage);   
router.post('/login', authController.handleLogin);      

router.get('/logout', authController.handleLogout);      


router.get('/', couponController.renderHomePage);


router.post('/add-coupon', requireLogin, couponController.handleAddCoupon);

module.exports = router;
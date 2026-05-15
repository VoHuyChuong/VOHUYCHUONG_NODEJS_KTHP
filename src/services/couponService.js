//điều phối (nhận, validate, trả response) -->model 

const Coupon = require('../models/Coupon');

const getAllCoupons = async () => {
    try {
        return await Coupon.find().sort({ createdAt: -1 });
    } catch (error) {
        throw new Error('Lỗi khi lấy danh sách mã: ' + error.message);
    }
};

// Thêm hàm tạo coupon mới để couponController gọi được
const createCoupon = async (data) => {
    try {
        const { code, category, value, discountType, description, expiryDate } = data;
        return await Coupon.create({
            code: code.toUpperCase().trim(),
            category,
            value: Number(value),
            discountType: discountType || 'amount',
            description,
            expiryDate: new Date(expiryDate),
            isActive: true
        });
    } catch (error) {
        throw new Error('Lỗi khi tạo mã: ' + error.message);
    }
};

module.exports = { getAllCoupons, createCoupon };
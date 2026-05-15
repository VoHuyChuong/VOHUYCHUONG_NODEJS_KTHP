const Joi = require('joi');

// Validate form đăng ký
const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.alphanum': 'Tên đăng nhập chỉ được chứa chữ và số',
        'string.min': 'Tên đăng nhập tối thiểu 3 ký tự',
        'string.max': 'Tên đăng nhập tối đa 30 ký tự',
        'any.required': 'Vui lòng nhập tên đăng nhập'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Mật khẩu tối thiểu 6 ký tự',
        'any.required': 'Vui lòng nhập mật khẩu'
    })
});

// Validate form đăng nhập
const loginSchema = Joi.object({
    username: Joi.string().required().messages({
        'any.required': 'Vui lòng nhập tên đăng nhập'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Vui lòng nhập mật khẩu'
    })
});

// Validate form thêm mã giảm giá
const couponSchema = Joi.object({
    code: Joi.string().min(2).max(50).required().messages({
        'string.min': 'Mã voucher tối thiểu 2 ký tự',
        'any.required': 'Vui lòng nhập mã voucher'
    }),
    category: Joi.string().valid('shopee', 'lazada', 'tiki', 'other').required().messages({
        'any.only': 'Danh mục không hợp lệ',
        'any.required': 'Vui lòng chọn sàn áp dụng'
    }),
    value: Joi.number().min(1).required().messages({
        'number.min': 'Giá trị giảm phải lớn hơn 0',
        'any.required': 'Vui lòng nhập giá trị giảm'
    }),
    discountType: Joi.string().valid('amount', 'percentage').default('amount'),
    description: Joi.string().allow('').max(200),
    expiryDate: Joi.date().greater('now').required().messages({
        'date.greater': 'Ngày hết hạn phải lớn hơn ngày hôm nay',
        'any.required': 'Vui lòng chọn ngày hết hạn'
    })
});

module.exports = { registerSchema, loginSchema, couponSchema }; 
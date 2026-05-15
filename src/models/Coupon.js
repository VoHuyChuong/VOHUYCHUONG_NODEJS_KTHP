//truy vấn MongoDB --> Contronllers 

const mongoose = require('mongoose'); 

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, uppercase: true },
    category: { type: String, required: true },
    value: { type: Number, required: true },
    discountType: { type: String, enum: ['amount', 'percentage'], default: 'amount' }, 
    description: String,
    expiryDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);
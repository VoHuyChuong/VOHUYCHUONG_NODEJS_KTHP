//truy vấn MongoDB --> Contronllers 

const mongoose = require('mongoose');
const validator = require('validator'); 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Tên đăng nhập là bắt buộc'],
        trim: true,
        unique: true, 
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Mật khẩu là bắt buộc'],
        trim: true,
        minlength: 6 
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'staff'], 
        default: 'user'
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true 
});

const User = mongoose.model('User', userSchema);
module.exports = User;
//điều phối (nhận, validate, trả response) -->model 

const path = require('path');
const User = require(path.join(__dirname, '../models/User'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (username, password) => {
    // 1. Tìm người dùng
    const user = await User.findOne({ username });
    if (!user) throw new Error('Người dùng không tồn tại');

    // 2. Kiểm tra mật khẩu (So sánh mã hóa)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Sai mật khẩu');

    // 3. Tạo JWT Token
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return token;
};

module.exports = { login };
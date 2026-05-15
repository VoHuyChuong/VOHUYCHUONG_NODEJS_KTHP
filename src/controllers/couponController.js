//điều phối request --> servives 

//-->views
const couponService = require('../services/couponService');
const { couponSchema } = require('../helpers/validation');

const renderHomePage = async (req, res) => {
    try {
        const category = req.query.cat || null;
        let coupons = [];
        if (category) {
            const all = await couponService.getAllCoupons();
            coupons = all.filter(c => c.category === category && c.isActive);
        }
        res.render('index', {
            title: category ? category.toUpperCase() : 'Trang chủ',
            coupons,
            category
        });
    } catch (error) {
        res.status(500).send("Lỗi Server: " + error.message);
    }
};

const handleAddCoupon = async (req, res) => {
    // validate dữ liệu đầu vào
    const { error, value } = couponSchema.validate(req.body);
    if (error) {
        return res.status(400).send("Dữ liệu không hợp lệ: " + error.details[0].message);
    }

    try {
        await couponService.createCoupon(value);
        res.redirect(`/?cat=${value.category}`);
    } catch (err) {
        res.status(500).send("Lỗi khi thêm mã: " + err.message);
    }
};

module.exports = { renderHomePage, handleAddCoupon };
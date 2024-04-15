const coupons = require("../models/coupons");

module.exports.addCopon = async (req, res, next) => {
    console.log(req.body,'dataaa');
	let CoupanData = await new coupons(
		req.body
	).save();
	res
		.status(201)
		.json({ data: CoupanData, message: 'Coupon added Successfully' });
};

module.exports.getCoupons = async (req, res, next) => {
	let CoupanData = await  coupons.find();
	res
		.status(201)
		.json({ data: CoupanData, message: 'Coupons get Successfully' });
};

module.exports.verifyCoupon = async (req, res, next) => {
    console.log(req.params.id,'dataaa');
	let CoupanData = await coupons.find(
		{"coupon":req.params.id}
	)
	res
		.status(201)
		.json({ data: CoupanData, message: 'Token is Valid!' });
};


module.exports.updateCoupon = async (req, res, next) => {
const CouponData = req.body; // {email, password, role}
console.log(CouponData,'----------');
let CoupanData = await coupons.findOneAndUpdate(
    { id: CouponData.coupon },
    {...CouponData},
    { new: true }
);
res.status(200).json({ data: CoupanData, message: 'Token is used' });
}
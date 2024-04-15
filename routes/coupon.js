const express = require("express");
const router = express.Router();
const couponController = require("../controllers/couponsController");


router.post("/add-coupon", couponController.addCopon);
router.get("/verify-coupon/:id", couponController.verifyCoupon);
router.get("/get-coupons", couponController.getCoupons);
router.put("/update-coupons", couponController.updateCoupon);

module.exports = router;


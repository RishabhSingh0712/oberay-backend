const express = require("express");
const router = express.Router();
const commonController = require("../controllers/commonController");
const { verifyAuthToken } = require("../midlewares/jwtHelper");


router.post("/add-review-and-rating", commonController.addReviewAndRating);
router.get("/get-review-and-rating/:id",verifyAuthToken, commonController.getReviewAndRating);
router.get("/get-home-page-data", commonController.getBannarData);


module.exports = router;
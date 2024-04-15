const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");
// const { verifyAuthToken } = require("../midlewares/jwtHelper");

router.post("/add-address", addressController.addAddress);
router.get("/get-address", addressController.getAddressData);
// router.put("/update-address",verifyAuthToken, categoriesController.getAddressData);
// router.delete("/delete-address",verifyAuthToken, categoriesController.getAddressData);
module.exports = router;
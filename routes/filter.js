const express = require("express");
const router = express.Router();
const filterController= require("../controllers/filterController")

router.post("/filter-product",filterController)

module.exports = router;
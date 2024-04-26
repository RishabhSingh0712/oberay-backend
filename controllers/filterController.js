const productModel = require("../models/productModel");

const filterController = async (req, res) => {
    try {
        
        const { imgColor, discount, rating, price, productName } = req.body || {};

        // filter parameters
        const filter = {};
        if (imgColor) filter.imgColor = imgColor;
        if (discount) filter.discount = discount;
        if (rating) filter.rating = rating;
        if (price) filter.price = price; 
        if (productName) filter.productName = productName;

        const products = await ProductTable.find(filter);

        res.json({
            data: products,
            message: "Filtered products",
            error: false,
            success: true
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = filterController;

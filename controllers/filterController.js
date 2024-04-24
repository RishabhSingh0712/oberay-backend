const productModel = require("../models/productModel");

const filterController = async (req, res) => {
    try {
        
        const { color, discount, rating, price, brand } = req.body || {};

        // add filter parameters
        const filter = {};
        if (color) filter.color = color;
        if (discount) filter.discount = discount;
        if (rating) filter.rating = rating;
        if (price) filter.price = price; 
        if (brand) filter.brand = brand;

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

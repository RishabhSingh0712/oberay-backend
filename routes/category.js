const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");
const { verifyAuthToken } = require("../midlewares/jwtHelper");
const productControler = require("../controllers/productControler");

// const { upload } = require("../controllers/productControler");
// router.post(
//   "/add-category",
//   productControler.upload.single("img"),
//   productControler.addProduct
// );
router.post("/add-category",productControler.upload.single('image'), categoriesController.addCategory);
router.post("/add-sub-category",productControler.upload.single('image'), categoriesController.addSubCategory);
router.get("/get-product-by-category/:id",verifyAuthToken, categoriesController.getproductByCategoryID);
router.get("/get-product-by-subcategory/:id",verifyAuthToken, categoriesController.getproductBySubCategoryID);
router.get("/get-category",verifyAuthToken, categoriesController.getCategory);
router.get("/get-sub-category",verifyAuthToken, categoriesController.getSubCategory);
router.delete("/delete-category/:id",verifyAuthToken, categoriesController.deleteCategory);
router.delete("/delete-sub-category/:id",verifyAuthToken, categoriesController.deleteSubCategory);
// router.post("/add-post", productControler.addPost);
// router.post("/get-cart", productControler.getCartData);
// router.get("/get-product", productControler.getProduct);
// router.get("/get-all-product", productControler.getAllProduct);
// router.get("/get-post", productControler.getPost);

router.get("/get-category-by-id/:id",verifyAuthToken, categoriesController.getproductByCategoryID);
router.get("/get-subcategory-by-id/:id",verifyAuthToken, categoriesController.getproductBySubCategoryID);
router.put(
    "/edit-category/:id",
    categoriesController.updateCategory
  );
  router.put(
    "/edit-sub-category/:id",
    categoriesController.updateSubCategory
  );
module.exports = router;
const CategorySchema = require("../models/categories");
const SubCategorySchema = require("../models/subCategory");
const multer = require("multer");
const productModel = require("../models/productModel");
const url=process.env.PROD

module.exports.addCategory = async (req, res, next) => {
//   console.log(req);
  var AddCategory={}
  let full_data = {
		image: `${url}/public/my-uploads-single/` + req.file,
		...req.body,
	};
//   console.log(full_data,'fullll');
  if(full_data){
     AddCategory = await CategorySchema.create(full_data);
  }
  res
    .status(200)
    .json({ data: AddCategory, message: "CategorySchema Data added Successfully" });
};

module.exports.addSubCategory = async (req, res, next) => {
	var AddSubCategorySchema ={}
  let full_data = {
	image: `${url}/public/my-uploads-single/` + req.file,
		...req.body, 
    
	};
	if(full_data){
		AddSubCategorySchema = await SubCategorySchema.create(full_data);
	 }
 
  res
    .status(200)
    .json({ data: AddSubCategorySchema, message: "SubCategorySchema Data added Successfully" });
};

module.exports.getproductByCategoryID = async (req, res, next) => {
  const AddCategorySchema = await  productModel.find({"category":req.params.id});
  res
    .status(200)
    .json({ data: AddCategorySchema, message: "SubCategorySchema Data added Successfully" });
};

module.exports.getproductBySubCategoryID = async (req, res, next) => {

  const AddCategorySchema = await  productModel.find({"sub-category":req.params.id}).populate(["Category","SubCategory"]);
  res
    .status(200)
    .json({ data: AddCategorySchema, message: "SubCategorySchema Data added Successfully" });

    try {
        const AddCategorySchema = await productModel.ProductTable.find({ "subcategory": req.params.id })
        res.status(200).json({ data: AddCategorySchema, message: "SubCategorySchema Data added Successfully" });
    } catch (error) {
		console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

};

module.exports.getCategory = async (req, res, next) => {
  const AddCategorySchema = await  CategorySchema.find();
  res
    .status(200)
    .json({ data: AddCategorySchema, message: "SubCategorySchema Data added Successfully" });
};

module.exports.getSubCategory = async (req, res, next) => {
  const AddCategorySchema = await  SubCategorySchema.find();
  res
    .status(200)
    .json({ data: AddCategorySchema, message: "SubCategorySchema Data added Successfully" });
};

module.exports.getCategoryByID = async (req, res, next) => {
	const getCategoryList = await CategorySchema.findOne({
		_id: req.params.id,
	});
	if (getCategoryList) {
		res.status(200).json({
			data: { data: getCategoryList },
			message: 'Category Get Successfully',
		});
	} else {
		res.status(400).json({
			message: 'Category ID not Found',
		});
	}
};


module.exports.getSubCategoryByID = async (req, res, next) => {
	const getSubCategoryList = await SubCategorySchema.findOne({
		_id: req.params.id,
	});
	if (getSubCategoryList) {
		res.status(200).json({
			data: { data: getSubCategoryList },
			message: 'Sub Category get Successfully',
		});
	} else {
		res.status(400).json({
			message: 'Sub Category ID not Found',
		});
	}
};

module.exports.deleteCategory = async (req, res, next) => {
	const getCategoryList = await CategorySchema.findOneAndDelete({
		_id: req.params.id,
	});
	if (getCategoryList) {
		res.status(200).json({
			data: { data: getCategoryList },
			message: 'Category Delete Successfully',
		});
	} else {
		res.status(400).json({
			message: 'Category ID not Found',
		});
	}
};

module.exports.deleteSubCategory = async (req, res, next) => {
	const getCategoryList = await SubCategorySchema.findOneAndDelete({
		_id: req.params.id,
	});
	if (getCategoryList) {
		res.status(200).json({
			data: { data: getCategoryList },
			message: 'Sub Category Delete Successfully',
		});
	} else {
		res.status(400).json({
			message: 'Sub Category ID not Found',
		});
	}
};

module.exports.updateCategory = async (req, res, next) => {
	console.log(req.body);
	// const full_data = {
	// 	img: 'http://localhost:2000' + req.file.path.split('public')[1],
	// 	...req.body,
	// };
	const UpdatedProduct = await CategorySchema.findOneAndUpdate(
		{ _id: req.params.id },
		req.body,
		{ new: true }
	);

	res
		.status(200)
		.json({ data: UpdatedProduct, message: 'Category Update Successfully' });
};

module.exports.updateSubCategory = async (req, res, next) => {
	console.log(req.body);
	// const full_data = {
	// 	img: 'http://localhost:2000' + req.file.path.split('public')[1],
	// 	...req.body,
	// };
	const UpdatedProduct = await SubCategorySchema.findOneAndUpdate(
		{ _id: req.params.id },
		req.body,
		{ new: true }
	);

	res
		.status(200)
		.json({ data: UpdatedProduct, message: 'Sub Category Update Successfully' });
};
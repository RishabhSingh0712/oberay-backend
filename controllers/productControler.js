/** @format */
const ProductModel = require('../models/productModel');
const PostModel = require('../models/postModel');
const CartModel = require('../models/cartModel');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

//for single file
let url="http://localhost:2000"
const storage2 = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, "./public/my-uploads-single");
	},
	filename: function (req, file, cb) {
	  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
	  cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
	},
  });
  
  module.exports.upload = multer({ storage: storage2 });

//for multiple file uploads
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/my-uploads');
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
	},
});

const uploadd = multer({
	storage: storage,
	// limits: { fileSize: 20  1024  1024 }, // 10MB
	fileFilter: (req, file, cb) => {
		cb(null, true);
	},
});

module.exports.fileUploadMultiple = uploadd.fields([
	{ name: 'image', maxCount: 20 },
	// { name: 'penCardImage', maxCount: 1 },
]);

// PRODUCTS   //
// for add product
module.exports.addProduct = async (req, res, next) => {
	console.log(req.body);
	// const full_data = {
	// 	img: 'http://localhost:2000' + req.file.path.split('public')[1],
	// 	...req.body,
	// };
	const AddProduct = await new ProductModel.ProductTable(req.body).save();

	res.status(200).json({ data: AddProduct, message: 'Register Successfully' });
};

//product varient
module.exports.addProductVarients = async (req, res, next) => {
	const data = await ProductModel.ProductVarientTable.findOne({
		UUID: req.body.UUID,
	});
	console.log(req.body.UUID,'data');
	let variants = [];
	let obj={...req.body}
	

	if (data?.variants?.length) {
	 let checkSizeIndex=data?.variants?.findIndex((variant)=>variant.size===req.body.size)
	 console.log(checkSizeIndex,'req.body.UUID');
	 if(checkSizeIndex>-1){
		delete obj.UUID
		data?.variants.splice(checkSizeIndex,1,obj)
		
		variants=[...data.variants]
		AddVariants = await ProductModel.ProductVarientTable.findOneAndUpdate(
			{ UUID: req.body.UUID },
			{variants:variants},
			{ new: true }
		);
		res
			.status(200)
			.json({ data: AddVariants, message: 'Varient Add Successfully' });
		return;
	 }
	 else{
		delete obj.UUID
		variants=[...data?.variants,obj]
		AddVariants = await ProductModel.ProductVarientTable.findOneAndUpdate(
			{ UUID: req.body.UUID },
			{variants:variants},
			{ new: true }
		);
		res
			.status(200)
			.json({ data: AddVariants, message: 'Image Add Successfully' });
		return;

	 }

	} else {
		delete obj.UUID
		const AddProductVarients = await new ProductModel.ProductVarientTable(
			{UUID:req.body.UUID,variants:[obj]}
		).save();
		res
		.status(200)
		.json({ data: AddProductVarients, message: 'Varient added Successfully' });
	}

};

module.exports.updateProduct = async (req, res, next) => {
	console.log(req.body);
	// const full_data = {
	// 	img: 'http://localhost:2000' + req.file.path.split('public')[1],
	// 	...req.body,
	// };
	const UpdatedProduct = await ProductModel.ProductTable.findOneAndUpdate(
		{ _id: req.params.id },
		req.body,
		{ new: true }
	);

	res
		.status(200)
		.json({ data: UpdatedProduct, message: 'Product Update Successfully' });
};

// for get all product
module.exports.getAllProduct = async (req, res, next) => {
	console.log(req.query, 'req');
	const getProductList = await ProductModel.ProductTable.find({
		// productName: { $regex: '^' + req.query.search, $options: 'i' },
	}).populate(['productVarientsId','productImagesId'])
		.skip(3 * req?.query?.size)
		.limit(req?.query?.limit)
		.populate(['productVarientsId','productImagesId']);
	res
		.status(200)
		.json({ data: getProductList, message: 'Product list get Successfully' });
};
//for get product by id
module.exports.getProduct = async (req, res, next) => {
	console.log(req.params.id,'UUID: req.params.id,');
	const getProductList = await ProductModel.ProductTable.findOne({
		UUID: req.params.id,
	}).populate(['productVarientsId','productImagesId']);
	// const productImages = await ProductModel.ProductImageTable.findOne({
	// 	productId: req.params.id,
	// });
	// const varients = await ProductModel.ProductVarientTable.findOne({
	// 	productId: req.params.id,
	// });
	// console.log(varients, 'productImages', req.params.id);
	res.status(200).json({data:getProductList,
		// data: { data: getProductList, images: productImages,productVarients:varients },
		message: 'Product get Successfully',
	});
};

module.exports.deleteProduct = async (req, res, next) => {
	const getProductList = await ProductModel.ProductTable.findOneAndDelete({
		_id: req.params.id,
	});
	if (getProductList) {
		res.status(200).json({
			data: { data: getProductList },
			message: 'Product Delete Successfully',
		});
	} else {
		res.status(400).json({
			message: 'Product ID not Found',
		});
	}
};

// PRODUCT IMAGES//

module.exports.addProductImages = async (req, res, next) => {
	const data = await ProductModel.ProductImageTable.findOne({
		UUID: req.body.UUID,
	});
	console.log(req.body, 'file');
	let images = [];
	let AddProductImage;
	let full_data = {};
	if (data?.img?.length) {
		console.log('if', data['img']);
		let newarr = [...data['img']];
		for (let i = 0; i < req.files.image.length; i++) {
			images.push(
				url+'/public/my-uploads/' + req.files.image[i].filename
			);
		}
		let obj = { [req.body.productColor]: images };
		newarr.push(obj);
		full_data = {
			img: newarr,
			...req.body,
		};

		AddProductImage = await ProductModel.ProductImageTable.findOneAndUpdate(
			{ UUID: req.body.UUID },
			full_data,
			{ new: true }
		);
		res
			.status(200)
			.json({ data: AddProductImage, message: 'Image Add Successfully' });
		return;
	} else {
		console.log('else');
		for (let i = 0; i < req.files.image.length; i++) {
			images.push(
				'http://localhost:2000/public/my-uploads/' + req.files.image[i].filename
			);
		}
		let obj = { [req.body.productColor]: images };
		full_data = {
			img: obj,
			...req.body,
		};

		AddProductImage = await new ProductModel.ProductImageTable(
			full_data
		).save();
		res
			.status(200)
			.json({ data: AddProductImage, message: 'Image Add Successfully' });
	}
};

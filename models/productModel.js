/** @format */

const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	productName: String,
	desc: String,
	imgColor: Array,
	rating: Number,
	price : Number,
	discount: Number,
	UUID:String,
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
	subCategory: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'SubCategory',
		required: false,
	},
  productVarientsId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'productVarients',
		required: true,
	},
  productImagesId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'productImages',
		required: true,
	},
});

const ProductImageSchema = new Schema({
	// _id:String,
	UUID: String,
	// productSizes: Array,
  productColor:String,
  img: Array,
});

const ProductVarientSchema = new Schema({
  UUID: String,
  variants:Array,

});

ProductTable = mongoose.model('product', ProductSchema);
ProductImageTable = mongoose.model('productImages', ProductImageSchema);
ProductVarientTable = mongoose.model('productVarients', ProductVarientSchema);


module.exports = {
  ProductTable,
  ProductImageTable,
  ProductVarientTable
};

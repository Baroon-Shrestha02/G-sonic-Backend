import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import SubCategory from "../models/subCategoryMode.js";

import AppError from "../utils/appError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { uploadImages } from "../utils/imageUploader.js";

export const createProduct = asyncErrorHandler(async (req, res, next) => {
  const {
    name,
    description,
    price,
    discountPrice,
    stock,
    category,
    subCategory,
  } = req.body;

  // check category
  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    return next(new AppError("Category not found", 404));
  }

  // check subcategory
  if (subCategory) {
    const subCategoryExists = await SubCategory.findById(subCategory);
    if (!subCategoryExists) {
      return next(new AppError("SubCategory not found", 404));
    }
  }

  // upload image
  let imageData = null;

  if (req.files?.image) {
    imageData = await uploadImages(req.files.image);
  }

  const product = await Product.create({
    name,
    description,
    price,
    discountPrice,
    stock,
    category,
    subCategory,
    image: imageData ? imageData.url : null,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

export const getProducts = asyncErrorHandler(async (req, res) => {
  const products = await Product.find()
    .populate("category", "name")
    .populate("subCategory", "name");

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

export const getProductById = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate("category", "name")
    .populate("subCategory", "name");

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

export const updateProduct = asyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  // upload new image
  if (req.files?.image) {
    const imageData = await uploadImages(req.files.image);
    req.body.image = imageData.url;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
});

export const deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

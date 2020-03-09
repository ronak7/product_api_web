const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/Product.Controller');

// GET
router.get('/', ProductController.getAllProducts);

// GET fetch product by ID
router.get('/:id', ProductController.getProductByID);

// Create product
router.post('/', ProductController.createProduct);

// Update product
router.patch('/:id', ProductController.updateProductByID);

// delete product
router.delete('/:id', ProductController.deleteProductByID);

module.exports = router;
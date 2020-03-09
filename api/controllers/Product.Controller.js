const mongoose = require('mongoose');
const createError = require('http-errors');

const Product = require('../models/product.model');

module.exports = {

    getAllProducts: async (req, res, next) => {
        try {
            // let products = await Product.find();

            // to remove "__v" from data we are fetching
            let products = await Product.find({}, { __v: 0 });

            res.send(products);
        } catch (error) {
            res.send(error);
        }
    },

    getProductByID: async (req, res, next) => {
        try {
            let result = await Product.findById(req.params.id, {__v: 0});
            // let product = await Product.findOne({ _id: req.params.id });

            if (!result) {
                throw createError(404, 'product not exist.')
            }
            res.send({
                status: true,
                msg: "Product data",
                data: result
            })
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalide product ID.'));
                return;
            }
            next(error);
        }
    },

    createProduct: async (req, res, next) => {
        // acync await Ex.
        try {
            let product = new Product(req.body);
            let result = await product.save();
            res.send(result);
        } catch (error) {
            res.send(error);
        }

        // Promiss Ex.
        // const product = new Product({
        //     "name": req.body.name,
        //     "price": req.body.price
        // });

        // product.save()
        // .then(result =>{
        //     res.send(result);
        // }).catch(next);
    },

    updateProductByID: async (req, res, next) => {
        let id = req.params.id;
        let updates = req.body;
        let options = { new: true };
        try {
            let result = await Product.findByIdAndUpdate(id, updates, options);
            if (!result) {
                throw createError(404, 'Invalide product ID');
            }
            res.send({
                status: true,
                msg: "Product updated.",
                data: result
            })
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'invalide product ID'));
            }
            next(error);
        }
    },

    deleteProductByID: async (req, res, next) => {
        try {
            let result = await Product.findByIdAndDelete(req.params.id);
            if (!result) {
                throw createError(404, 'Invalide product ID.')
            }
            res.send({
                status: true,
                msg: "data deleted.",
                data: result
            })
        } catch (error) {
            next(error);
        }
    }
}
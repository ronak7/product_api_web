const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productShema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Product = mongoose.model('product', productShema);

module.exports = Product;
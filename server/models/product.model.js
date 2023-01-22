const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const schema = mongoose.Schema


const productSchema = new schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Cookies', 'Candies', 'Cakes', 'Desserts', 'Drinks']
    },
    unitPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Inactive']
    },
    idproduct: {
        type: String,
        required: true
    }
});

const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel;

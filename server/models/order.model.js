const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Product = require('./product.model');
const schema = mongoose.Schema

//OrderItemSchema
const orderItemSchema = new schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
});

//Order Schema
const orderSchema = new schema({
    orderNumber: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Rejected'],
        default: 'Pending'
    },
    date: {
        type: Date,
        default: Date.now
    },
    customer: {
        type: String,
        required: true
    },
    cityTax: {
        type: Number
    },
    countyTax: {
        type: Number
    },
    stateTax: {
        type: Number
    },
    federalTax: {
        type: Number
    },
    totalTaxes: { type: Number },
    totalAmount: { type: Number },
    orderItems: [orderItemSchema],
    test: String
});

//prehook to calculate taxes
orderSchema.pre('save', async function (next) {
    let subtotal = 0;
    let cityTax = 0;
    let countyTax = 0;
    let stateTax = 0;
    let federalTax = 0;
    let totalTaxes = 0;

    for (let i = 0; i < this.orderItems.length; i++) {
        const item = this.orderItems[i];
        const product = await Product.findById(item.product);
        subtotal = subtotal + product.unitPrice * item.quantity;
    }

    cityTax = subtotal * 0.10;
    countyTax = (subtotal + cityTax) * 0.05;
    stateTax = (subtotal + cityTax + countyTax) * 0.08;
    federalTax = (subtotal + cityTax + countyTax + stateTax) * 0.02;

    totalTaxes = cityTax + countyTax + stateTax + federalTax;
    this.cityTax = cityTax;
    this.countyTax = countyTax;
    this.stateTax = stateTax;
    this.federalTax = federalTax;
    this.totalTaxes = totalTaxes;
    this.totalAmount = subtotal + totalTaxes;
    next();
});

const OrderModel = mongoose.model('Order', orderSchema);
module.exports = OrderModel;


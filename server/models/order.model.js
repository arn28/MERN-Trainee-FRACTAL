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

// //testing route
// // router.get('/example', (req, res) => {
// //     res.end('testing from route example')
// // })

// //create order
// router.post('/createorder', async (req, res) => {

//     try {
//         const neworder = new OrderModel(req.body);
//         await neworder.save()
//         res.send('New product added successfully!')

//     } catch (error) {
//         res.send(err)
//         res.status(500).json({ message: error.message });
//     }
// })

// //get all the orders
// router.get('/getorders', (req, res) => {
//     OrderModel.find({}, function (docs, err) {
//         if (!err) {
//             res.send(docs)
//         } else {
//             res.send(err)
//         }
//     })
// })

// //get a order data
// router.post('/getorderdata', (req, res) => {
//     OrderModel.find({ orderNumber: req.body.orderNumber }, function (docs, err) {
//         if (!err) {
//             res.send(docs)
//         } else {
//             res.send(err)
//         }
//     })
// })

// //modify and update a order
// router.post('/updateorder', (req, res) => {
//     OrderModel.findOneAndUpdate({ orderNumber: req.body.orderNumber }, {
//         status: req.body.status,
//         date: req.body.date,
//         customer: req.body.customer,
//         orderItems: req.body.orderItems
//     }, (err) => {
//         if (!err) {
//             res.send('order updated successfully!')
//         } else {
//             res.send(err)
//         }
//     })
// })

// //delete a order
// router.post('/delorder', (req, res) => {
//     OrderModel.findOneAndDelete({ orderNumber: req.body.orderNumber }, (err) => {
//         if (!err) {
//             res.send('order deleted successfully!')
//         } else {
//             res.send(err)
//         }
//     })
// })

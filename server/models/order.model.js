const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const schema = mongoose.Schema


const orderSchema = new schema({
    orderNumber: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Completed', 'Rejected']
    },
    date: {
        type: Date,
        default: Date.now
    },
    customer: {
        type: String,
        required: true
    },
    taxes: { type: Number },
    totalTaxes: { type: Number },
    totalAmount: { type: Number },
    items: { type: Number }
});

const OrderModel = mongoose.model('orders', orderSchema);
module.exports = router;

//testing route
// router.get('/example', (req, res) => {
//     res.end('testing from route example')
// })

//create order
router.post('/createorder', (req, res) => {
    const neworder = new OrderModel({
        orderNumber: req.body.orderNumber,
        status: req.body.status,
        date: req.body.date,
        customer: req.body.customer,
        items: req.body.items
    })

    neworder.save(function (err) {
        if (!err) {
            res.send('New order added successfully!')
        } else {
            res.send(err)
        }
    })
})

//get all the orders
router.get('/getorders', (req, res) => {
    OrderModel.find({}, function (docs, err) {
        if (!err) {
            res.send(docs)
        } else {
            res.send(err)
        }
    })
})

//get a order data
router.post('/getorderdata', (req, res) => {
    OrderModel.find({ orderNumber: req.body.orderNumber }, function (docs, err) {
        if (!err) {
            res.send(docs)
        } else {
            res.send(err)
        }
    })
})

//modify and update a order
router.post('/updateorder', (req, res) => {
    OrderModel.findOneAndUpdate({ orderNumber: req.body.orderNumber }, {
        status: req.body.status,
        date: req.body.date,
        customer: req.body.customer,
        items: req.body.items
    }, (err) => {
        if (!err) {
            res.send('order updated successfully!')
        } else {
            res.send(err)
        }
    })
})

//delete a order
router.post('/delorder', (req, res) => {
    OrderModel.findOneAndDelete({ orderNumber: req.body.orderNumber }, (err) => {
        if (!err) {
            res.send('order deleted successfully!')
        } else {
            res.send(err)
        }
    })
})

const express = require('express');
const router = express.Router();
const OrderModel = require('../models/order.model')



//testing route
// router.get('/example', (req, res) => {
//     res.end('testing from route example')
// })

//create order
router.post('/createorder', async (req, res) => {

    try {
        const neworder = new OrderModel(req.body);
        await neworder.save()
        res.send('New product added successfully!')

    } catch (error) {
        res.send(err)
        res.status(500).json({ message: error.message });
    }
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
        orderItems: req.body.orderItems
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


module.exports = router;
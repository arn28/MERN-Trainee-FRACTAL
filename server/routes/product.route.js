const express = require('express');
const router = express.Router();
const ProductModel = require('../models/product.model')

router.post('/createproduct', (req, res) => {
    const newproduct = new ProductModel({
        name: req.body.name,
        category: req.body.category,
        unitPrice: req.body.unitPrice,
        status: req.body.status,
        idproduct: req.body.idproduct
    })

    newproduct.save(function (err) {
        if (!err) {
            res.send('New product added successfully!')
        } else {
            res.send(err)
        }
    })
})

//get all the products
router.get('/getproducts', (req, res) => {
    ProductModel.find({}, function (docs, err) {
        if (!err) {
            res.send(docs)
        } else {
            res.send(err)
        }
    })
})

//get a product data
router.post('/getproductdata', (req, res) => {
    ProductModel.find({ idproduct: req.body.idproduct }, function (docs, err) {
        if (!err) {
            res.send(docs)
        } else {
            res.send(err)
        }
    })
})

//modify and update a product
router.post('/updateproduct', (req, res) => {
    ProductModel.findOneAndUpdate({ idproduct: req.body.idproduct }, {
        name: req.body.name,
        category: req.body.category,
        unitPrice: req.body.unitPrice,
        status: req.body.status
    }, (err) => {
        if (!err) {
            res.send('Product updated successfully!')
        } else {
            res.send(err)
        }
    })
})

//delete a product
router.post('/delproduct', (req, res) => {
    ProductModel.findOneAndDelete({ idproduct: req.body.idproduct }, (err) => {
        if (!err) {
            res.send('Product deleted successfully!')
        } else {
            res.send(err)
        }
    })
})

module.exports = router;
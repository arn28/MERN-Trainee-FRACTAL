const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const schema = mongoose.Schema


const productSchema = new schema({
    name: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false,
        enum: ['Cookies', 'Candies', 'Cakes', 'Desserts', 'Drinks']
    },
    unitePrice: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        required: false,
        enum: ['Active', 'Inactive']
    },
    idproduct: {
        type: String,
        required: false
    }
});

const ProductModel = mongoose.model('products', productSchema);
module.exports = router;

//testing route
// router.get('/example', (req, res) => {
//     res.end('testing from route example')
// })

router.post('/createproduct', (req, res) => {
    const newproduct = new ProductModel({
        name: req.body.name,
        category: req.body.category,
        unitePrice: req.body.unitePrice,
        status: req.body.status,
        idproduct: req.body.idproduct
    })
    
    newproduct.save(function(err){
        if(!err){
            res.send('New product added successfully!')
        }else{
            res.send(err)
        }
    })
    })
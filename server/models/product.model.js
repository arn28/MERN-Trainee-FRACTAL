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
    unitePrice: {
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
    ProductModel.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})
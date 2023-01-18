const express = require('express')
const app = express()

//Import mongoDB connection
const fileDB = require('./DBconnection')

//Import routes and models
const productRoute = require('./models/product.model')

//Import body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:'true'}))


app.use('/api/product.model', productRoute)

app.get('/', (req, res) => {
    res.end('Welcome to backend Node.js to MERN Trainee FRACTAL. Running...')
})


//Basic server config
const port = 9001;
app.listen(port, function(){
    console.log('NODE server is running correctly ...')
})
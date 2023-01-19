const express = require('express')
const cors = require('cors');
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

const whitelist = ['http://localhost:3000', 'https://mern-trainee-fractal-frontend.vercel.app/', 'https://mern-trainee-fractal-frontend-arn28.vercel.app/', 'https://mern-trainee-fractal-frontend-git-main-arn28.vercel.app/', 'https://arn28.vercel.app/'];

//Basic server config
const port = 9001;
app.listen(port, function(){
    console.log('NODE server is running correctly ...')
})
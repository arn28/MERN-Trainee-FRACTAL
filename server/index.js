const express = require('express')
const cors = require('cors');
require('dotenv').config();
const app = express();

//port config
const port = process.env.PORT || 9000;

//cors
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
//


//Import mongoDB connection
const fileDB = require('./DBconnection')

//Import routes and models
const productRoute = require('./routes/product.route')
const orderRoute = require('./routes/order.route')


//Import body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: 'true' }))

//routes to listen
app.use('/api/product', productRoute)
app.use('/api/order', orderRoute)

//test order route
// app.get('/api/order', (req, res) => {
//     res.end('order route api Running ...')
// })

app.get('/', (req, res) => {
    res.end('Welcome to backend Node.js to MERN Trainee FRACTAL. Running...')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
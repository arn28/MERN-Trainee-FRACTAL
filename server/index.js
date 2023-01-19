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


//Import mongoDB connection
const fileDB = require('./DBconnection')

//Import routes and models
const productRoute = require('./models/product.model')


//Import body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: 'true' }))



app.use(cors(corsOptions));
//


app.use('/api/product.model', productRoute)


app.get('/', (req, res) => {
    res.end('Welcome to backend Node.js to MERN Trainee FRACTAL. Running...')
})

// const whitelist = ['http://localhost:8080','http://localhost:3000', 'https://mern-trainee-fractal-frontend.vercel.app/', 'https://mern-trainee-fractal-frontend-arn28.vercel.app/', 'https://mern-trainee-fractal-frontend-git-main-arn28.vercel.app/', 'https://arn28.vercel.app/'];

// const options = {
//     origin: (origin, callback) => {
//         if (whitelist.includes(origin) || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('no permitido'));
//         }
//     }
// }
// app.use(cors(options));


// app.use(cors({
//     origin: '*'
// }));



//Basic server config
// const port = 9001;
// app.listen(port, function () {
//     console.log('NODE server is running correctly ...')
// })

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
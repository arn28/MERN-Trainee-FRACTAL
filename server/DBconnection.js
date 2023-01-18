const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/crudmernstack');
// mongoose.connect('mongodb://localhost:27017/merntrainee');
mongoose.connect('mongodb+srv://arn28:databasetest01@cluster0.toqjljv.mongodb.net/merntrainee');

const objetbd = mongoose.connection

objetbd.on('connected', () => { console.log('Connected to MonogDB successfully') })
objetbd.on('error', () => {console.log('Refuse to connect to MonogDB')})


module.exports = mongoose
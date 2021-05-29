const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors())
const PORT = process.env.PORT || 4000;

const Product = require('./models/Products.model');

const productRouter = require('./routes/Product.routes');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('database connected'))
    .catch(e => console.log(e));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//     res.send('welcome to deltapps!')
// })

app.get('/data', (req, res) => {
    Product.search('pa', (err, data) => {
        console.log('data: ', data);
    })
    res.send('welcome to deltapps!')
})

app.use('/store', productRouter)

if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('reactjs/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'reactjs', 'build', 'index.html'));
    });
}

app.listen(PORT, () => console.log('server is up...'))
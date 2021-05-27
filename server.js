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

app.post('/deltapps/addproduct', (req, res) => {
    const { name, store_count, price } = req.body;
    const newProduct = new Product({ name, store_count, price });

    Product.findOne({ name: name }).then(product => {
        if (product) return res.status(301).json({ exist: true })
        newProduct.save()
            .then(() => res.status(201).json({ success: true, message: 'Product added successfully!' }))
            .catch(e => console.log(e))
    })
})

app.post('/deltapps/updateproduct', (req, res) => {
    const { name, store_count, price } = req.body;

    Product.findOneAndUpdate({ name: name }, { $set: { store_count, price } }, { new: true }, (err, product) => {
        if (err) return res.status(301).json({ success: false });
        return res.status(200).json({ success: true });
    })
})

app.post('/deltapps/searchproduct', (req, res) => {
    const { string } = req.body;

    Product.search(string, (err, data) => {
        if (err) console.log(err);
        return res.status(200).json(data);
    })
})

if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('reactjs/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'reactjs', 'build', 'index.html'));
    });
}

app.listen(PORT, () => console.log('server is up...'))
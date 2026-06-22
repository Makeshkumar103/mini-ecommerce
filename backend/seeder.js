const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const productModel = require('./models/productModel');
const products = require('./data/products.json');

dotenv.config({path: path.join(__dirname, '.env')});

mongoose.connect(process.env.DB_URL).then(async () => {
    console.log('MongoDB connected for seeding');
    await productModel.deleteMany({});
    await productModel.insertMany(products);
    console.log('Products seeded successfully');
    process.exit();
}).catch((err) => {
    console.log('Seeding failed: ' + err.message);
    process.exit(1);
});

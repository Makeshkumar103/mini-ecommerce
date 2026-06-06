const productModel = require('../models/productModel');
// const ProductModel = require('../models/productModel');


exports.getProducts = async (req, res, next) => {

    const products = await productModel.find({})


    res.json({
        success: true,
        products,
        message: 'Get products working!'
    })
}

exports.getSingleProduct = (req, res, next) => {
    res.json({
        success: true,
        message: 'Get single product working!'
    })
}
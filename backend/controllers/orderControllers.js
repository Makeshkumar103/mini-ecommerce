
const orderModel = require('../models/orderModel');


exports.createOrder = (req, res, next) => {

    console.log(req.body);
    
    //orderModel.create()
    
    
    res.json({
        success: true,
        message: 'Order works!'
    })
}

const orderModel = require('../models/orderModel');

//create Order - /api/v1/order
exports.createOrder = async(req, res, next) => {

    // console.log(req.body, "DATA")
    const cartItems = req.body;
    const amount = Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2);
    const status = 'pending';
    // console.log(amount, "Amount") 

    const order = await orderModel.create({cartItems, amount, status})
    
    
    res.json({
        success: true,
        message: 'Order works!',
        order
    })

}
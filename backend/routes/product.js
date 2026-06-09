const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productControllers');
const { getSingleProduct } = require('../controllers/productControllers');



router.route('/products').get(getProducts);
router.route('/products/:id').get(getSingleProduct);


module.exports = router;
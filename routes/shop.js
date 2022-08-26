
const path = require('path')
const express = require('express')


const shopController = require('../controllers/shop')
const router = express.Router()

router.get("/", shopController.getIndex);
router.get("/products",shopController.getProducts);
router.get('/products/:productId',shopController.getProduct);//dynamic route , order of routes as very important
router.get("/cart",shopController.getCart);//get route
router.post('/cart-delete-item',postCardDeleteProduct);
router.post("/cart",shopController.postCart)//post route
router.get("/checkout",shopController.getCheckout);
router.get("/orders",shopController.getOrdres);

module.exports = router
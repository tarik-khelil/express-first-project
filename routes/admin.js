const path = require('path')
const express = require('express')

const rootDir = require('../util/path')

const products = [];

const router = express.Router()
//admin/add-product
router.get("/add-product", (req, res, next) => {

   // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))

   res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true });
});
//admin/product
router.post("/add-product", (req, res, next) => {

    products.push({ title: req.body.title });
    res.redirect('/');

});

exports.router = router;
exports.products = products;
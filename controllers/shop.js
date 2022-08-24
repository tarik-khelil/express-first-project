    
const Product = require('../models/product')


const getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All products',
            path: '/products',
          
        })
    })
}
const getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
           
        })
    })
}

const getCart=(req,res,next)=>{
    res.render('shop/cart',{
        path:'/cart',
        pageTitle:"Your Cart"
    })
}
const getCheckout=(req,res,next)=>{
    res.render('shop/checkout',{
        path:'/checkout',
        pageTitle:"checkout"
    })
}
const getOrdres=(req,res,next)=>{
    res.render('shop/orders',{
        path:'/orders',
        pageTitle:"Orders"
    })
}



exports.getProducts = getProducts
exports.getIndex = getIndex
exports.getCart = getCart
exports.getCheckout = getCheckout
exports.getOrdres = getOrdres
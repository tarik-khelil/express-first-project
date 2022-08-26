
const Product = require('../models/product')
const Cart = require('../models/cart');

const getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All products',
            path: '/products',

        })
    })
}
const getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, product => {
        res.render("shop/product-detail", {
            product: product,
            path: "/prodcuts",
            pageTitle: product.title

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
const getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id)
                if (cartProductData) {

                    cartProducts.push({ productData: product, qty: cartProductData.qty })
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: "Your Cart",
                products: cartProducts
            })
        })


    })

}
const getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: "checkout"
    })
}
const getOrdres = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: "Orders"
    })
}

const postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
        Cart.addProduct(productId, product.price)
    })

    res.redirect("/cart")
}

postCardDeleteProduct=(req,res,nex)=>{
    const prodId=req.body.productId;
    Product.findById(prodId,(product)=>{
        Cart.deleteProduct(prodId,product.price);
        res.redirect('/cart')
    })

}
exports.getProducts = getProducts
exports.getIndex = getIndex
exports.getCart = getCart
exports.getCheckout = getCheckout
exports.getOrdres = getOrdres
exports.getProduct = getProduct
exports.postCart = postCart
exports.postCardDeleteProduct=postCardDeleteProduct
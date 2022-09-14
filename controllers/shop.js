
const Product = require('../models/product')
const Cart = require('../models/cart');
const Order = require('../models/order');

const getProducts = (req, res, next) => {
    Product.find()///methode finde from mongoose
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All products',
                path: '/products',

            })
        })
}
const getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then(product => {
            res.render("shop/product-detail", {
                product: product,
                path: "/prodcuts",
                pageTitle: product.title

            })

        })

}
const getIndex = (req, res, next) => {

    Product.find()
        .then(result => {

            res.render('shop/index', {
                prods: result,
                pageTitle: 'Shop',
                path: '/',

            })
        })
        .catch(err => console.log(err))
}
const getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')//elle retournr pas une promess
        .then(user => {
            console.log(user.cart.items)
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: "Your Cart",
                products: user.cart.items
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
    Order.find({ "user.userId": req.user._id })
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: "Orders",
                orders: orders
            })
        })
}

const postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(result => {
            res.redirect('/cart')
        })



}

const postCardDeleteProduct = (req, res, nex) => {
    const prodId = req.body.productId;
    req.user.removeFromCart(prodId)
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))

}

const postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, product: { ...i.productId._doc } };
            });
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: products
            });
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
};


exports.getProducts = getProducts
exports.getIndex = getIndex
exports.getCart = getCart
exports.getCheckout = getCheckout
exports.postOrder = postOrder
exports.getOrdres = getOrdres
exports.getProduct = getProduct
exports.postCart = postCart
exports.postCardDeleteProduct = postCardDeleteProduct
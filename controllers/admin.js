const Product = require('../models/product')
const mongodb = require('mongodb');


const getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
}

const postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body
    const p = new Product(null, title, imageUrl, description, price,req.user._id);
    p.save()
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err))
}

const getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/')
    }
    const productId = req.params.productId;
    Product.findById(productId)
        .then(product => {
            if (!product) {
                return res.redirect('/');

            }
            res.render('admin/edit-product', {
                pageTitle: 'edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product
            });
        })
        .catch(err => console.log(err))
}

const postEditProduct = (req, res, next) => {
    const { prodId, title, imageUrl, price, description } = req.body
    const p = new Product(new mongodb.ObjectId(prodId), title, imageUrl, description, price);
    p.save()
        .then(result => {
            console.log("updated success")
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err))



}

const getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin products',
                path: '/admin/products',

            })
        })
}

const deleteProduct = (req, res, next) => {
    const productId = req.body.productId

    Product.deleteProduct(productId)
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));


}

exports.getAddProduct = getAddProduct;
exports.postAddProduct = postAddProduct;
exports.getProducts = getProducts;
exports.getEditProduct = getEditProduct;
exports.postEditProduct = postEditProduct;
exports.deleteProduct = deleteProduct;
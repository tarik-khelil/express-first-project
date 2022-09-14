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
    const p = new Product({ title, imageUrl, description, price,userId: req.user._id});
    p.save() //save methode from mongoose
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
    Product.findById(prodId)
        .then(p => {
             p.title = title,
                p.description = description,
                p.imageUrl = imageUrl,
                p.price = price
            return p.save()
        })
        .then(result => {
            console.log("updated success")
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err))



}

const getProducts = (req, res, next) => {
    Product.find()
    //.select('title price -_id')// reupérer que les info selectionner  (-permet d'exclure le field) 
   // .populate('userId','name email') //nous donne tt les informations du user pas que l'id, et on peuc selection les field comme 2 eme arguments 
        .then(products => {
            console.log(products)
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin products',
                path: '/admin/products',

            })
        })
}

const deleteProduct = (req, res, next) => {
    const productId = req.body.productId

    Product.findByIdAndRemove(productId)
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
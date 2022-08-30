const Product = require('../models/product')

const getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
}

const postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body

    const p = new Product(null, title, imageUrl, description, price);
    p.save().then(result=>{
        res.redirect('/');
    }).catch(err=>{

    })
    

}
const getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/')
    }
    const productId = req.params.productId;
    Product.findById(productId, (product) => {
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
}

const postEditProduct = (req, res, next) => {
    const { prodId, title, imageUrl, price, description } = req.body

    const p = new Product(prodId, title, imageUrl, description, price);
    p.save();
    res.redirect('/');


}
const getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin products',
            path: '/admin/products',

        })
    })
}

const deleteProduct=(req,res,next)=>{
    const productId=req.body.productId

    Product.deleteProduct(productId)
    res.redirect('/admin/products');

}

exports.getAddProduct = getAddProduct;
exports.postAddProduct = postAddProduct;
exports.getProducts = getProducts;
exports.getEditProduct = getEditProduct;
exports.postEditProduct = postEditProduct;
exports.deleteProduct=deleteProduct;
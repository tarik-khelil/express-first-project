const Product = require('../models/product');

const getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
}

const postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body
  console.log(req.user.id);

    Product.create({ title, imageUrl, price, description, userId: req.user.id}
    )
        .then(result => {
            console.log('product created with success'),
                res.redirect('/')
        })
        .catch(err => console.log(err))
}
const getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/')
    }
    const productId = req.params.productId;
    Product.findByPk(productId).
        then(product => {
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
        .catch(err => console.log(err));
}

const postEditProduct = (req, res, next) => {
    const { prodId, title, imageUrl, price, description } = req.body

    Product.findByPk(prodId)
        .then(product => {
            product.title = title,
                product.imageUrl = imageUrl,
                product.price = price,
                product.description = description
            return product.save();
        })
        .then(resp => {
            console.log("updated with success")
            res.redirect('/');
        })
        .catch(err => console.log(err))




}
const getProducts = (req, res, next) => {
    Product.findAll({where:{userId:req.user.id}})
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin products',
                path: '/admin/products',

            })
        })
        .catch(err => console.log(err));

}

const deleteProduct = (req, res, next) => {
    const productId = req.body.productId
    Product.destroy({ where: { id: productId } })
        .then(result => {
            console.log("deleted with success")
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        })


}

exports.getAddProduct = getAddProduct;
exports.postAddProduct = postAddProduct;
exports.getProducts = getProducts;
exports.getEditProduct = getEditProduct;
exports.postEditProduct = postEditProduct;
exports.deleteProduct = deleteProduct;
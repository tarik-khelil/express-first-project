
const Product = require('../models/product')
const Cart = require('../models/cart');

const getProducts = (req, res, next) => {
  Product.findAll()
    .then((resp) => {
      res.render('shop/product-list', {
        prods: resp,
        pageTitle: 'All products',
        path: '/products',
      })
    })
    .catch(err => console.log(err));

}
const getProduct = (req, res, next) => {
  const productId = req.params.productId;
  //Product.findAll({where:{id:productId}}) orr 
  Product.findByPk(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        path: "/prodcuts",
        pageTitle: product.title
      })
    })
    .catch(err => console.log(err));
}
const getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',

      })
    })
    .catch(err => console.log(err));

}
const getCart = (req, res, next) => {
  req.user.getCarts()
    .then(cart => {
      return cart[0].getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}
const getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: "checkout"
  })
}


const postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCarts()
    .then(cart => {
      fetchedCart = cart[0];
      console.log(cart)
      return cart[0].getProducts({ where: { id: prodId } })
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

const postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCarts()
    .then(cart => {
      return cart[0].getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

const postOrder = (req, res, next) => {
  let fetchedCart;
  req.user.getCarts()
    .then(cart => {
      fetchedCart = cart[0];
      return cart[0].getProducts();
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch(err => console.log(err));
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};



const getOrdres=(req,res,nex)=>{
  req.user.getOrders({include:['products']})
  .then(orders=>{
    res.render("shop/orders",{
      path:'/orders',
      pageTitle:"Your Orders",
      orders:orders??[]
    })
  })
}
exports.getProducts = getProducts
exports.getIndex = getIndex
exports.getCart = getCart
exports.getCheckout = getCheckout
exports.getOrdres = getOrdres
exports.getProduct = getProduct
exports.postCart = postCart
exports.postCartDeleteProduct = postCartDeleteProduct
exports.postOrder = postOrder;
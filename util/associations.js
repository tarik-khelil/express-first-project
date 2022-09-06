


module.exports = () => {
    // IMPORT MODELS...
    const Product = require('../models/product')
    const User = require('../models/user')
    const Cart = require('../models/cart')
    const CartItem = require('../models/cart-item')
    const Order = require('../models/order')
const OrderItem = require('../models/order-item')

    // ASSOCIATIONS...
    // on peux définir une association par une seule relation la 2eme est optional


    // associaton  user-product (one to many)
    User.hasMany(Product)
    Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" })

    //associaton user-cart (one to many)
    User.hasMany(Cart);
    Cart.belongsTo(User);

    //associaton cart-product (many to many)
    Cart.belongsToMany(Product, { through: CartItem })
    Product.belongsToMany(Cart, { through: CartItem })

    //association user-order
    Order.belongsTo(User);
    User.hasMany(User);

    Order.belongsToMany(Product,{through:OrderItem});

}
const { getDb } = require('../util/database');
const mongodb = require('mongodb');


class User {
    constructor(userName, email, cart) {
        this.name = userName,
            this.email = email
        this.cart = cart;//{items:[]}
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        // const cartProductIndex = this.cart.items.findIndex(cp => {
        //   return cp.productId.toString() === product._id.toString();
        // });
        let newQuantity = 1;
        // const updatedCartItems = [...this.cart.items];
    
        // if (cartProductIndex >= 0) {
        //   newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        //   updatedCartItems[cartProductIndex].quantity = newQuantity;
        // } else {
        //   updatedCartItems.push({
        //     productId: new ObjectId(product._id),
        //     quantity: newQuantity
        //   });
        // }
        const updatedCart = {
          items: [{
            productId: new mongodb.ObjectId(product._id),
            quantity: newQuantity
          }]
        };
        const db = getDb();
        return db
          .collection('users')
          .updateOne(
            { _id: new  mongodb.ObjectId(this._id) },
            { $set: { cart: updatedCart } }
          );
      }
    
    static findById(userId) {
        const db = getDb();
        return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) });
    }
}
module.exports = User;
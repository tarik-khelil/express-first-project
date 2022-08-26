const fs = require("fs");
const path = require('path');
const rootDir = require('../util/path')

const p = path.join(
    rootDir,
    'data',
    'cart.json'
);
module.exports = class Cart {

    static addProduct(id, productPrice) {
        //fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            //analyze the cart =>find existinf product
            const exisitingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const exisitingProduct = cart.products[exisitingProductIndex];
            let updatedProduct;
            if (exisitingProduct) {
                updatedProduct = { ...exisitingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products, updatedProduct]
                cart.products[exisitingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err)
            })


        });


    }

    static deleteProduct(id, productPrice) {
        //fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return
            }
            const updatedcart = { ...JSON.parse(fileContent) };
            const product = updatedCart.find(item => item.id === id);
            if(!product){
                return;
            }
            const productQty = product.qty;

            updatedcart.products = updatedCart.products.filter(item => item.id !== id);
            updatedcartcart.totalPrice = updatedcartcart.totalPrice - productPrice * productQty;

            fs.writeFile(p, JSON.stringify(updatedcart), (err) => {
                console.log(err)
            })
        });

    }


    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                cb(null)
            } else {
                cb(cart)
            }
        })

    }

}
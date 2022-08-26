const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path')
const Cart =require('./cart');

const p = path.join(
    rootDir,
    'data',
    'products.json'
);

const getProductsFromFile = (cb) => {

    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([])
        }
        cb(JSON.parse(fileContent));
    });

}


class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id
        this.title = title;
        this.imageUrl = imageUrl,
            this.description = description,
            this.price = price
    }


    save() {
        getProductsFromFile(products => {
            if (this.id) { //update
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                })

            } else { //add
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                })
            }
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }

    static findById = (id, cb) => {
        getProductsFromFile(products => {
            const product = products.find(item => item.id === id);
            cb(product)

        })
    }
    static deleteProduct = (id) => {
        getProductsFromFile(products => {
            const prod=products.find(item=>item.id===id);
            const prods = products.filter(item => item.id !== id);
            fs.writeFile(p, JSON.stringify(prods), (err) => {
                console.log(err);
                if(!err){
                    Cart.deleteProduct(id,prod.price);
                }
            })

        })

    }

}

module.exports = Product

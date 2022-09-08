
const { getDb } = require('../util/database');
const mongodb = require('mongodb');

class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id
        this.title = title;
        this.imageUrl = imageUrl,
            this.description = description,
            this.price = price,
            this._id = id;
    }
    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            //update
            console.log('this',this)
            dbOp= db.collection('products').updateOne({ _id: new mongodb.ObjectId(this._id) },
                { $set: this })

        } else {
            //add
            dbOp= db.collection('products').insertOne(this)

        }
        return dbOp.then(res=>{
            console.log(res)
            return res
        })
        .catch(err=>console.log(err));

    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray()

    }
    static findById(id) {
        const db = getDb();
        return db.collection('products').findOne({ _id: new mongodb.ObjectId(id) })
    }
    static deleteProduct = (id) => {
        const db = getDb();
        return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(id) })
    }
}

module.exports = Product

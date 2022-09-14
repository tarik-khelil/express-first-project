const mongoose = require("mongoose")

const Schema=mongoose.Schema;


const orederShcema = new Schema({
    products: [{
        product: { type: Object, required: true },
        quantity: { type: Number, required: true },
    }
    ],
    user: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type:Schema.Types.ObjectId,
            required: true,
            red: "user"
        }

    }
})


module.exports = mongoose.model('Order', orederShcema)
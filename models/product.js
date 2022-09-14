const mongoose=require('mongoose')

const Schema=mongoose.Schema;



const productShema=new Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'user',// (refer to user model )tell mongoose hey which other mongoose model is actyually realted to the data in that feild
    }

})

module.exports=mongoose.model('Product',productShema); // methode 1 to define model 


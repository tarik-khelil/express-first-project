
//with sequelize
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../util/database');

// create a model sequelize.define(modelName, attributes, options)

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    imageUrl:{
        type:DataTypes.STRING,
        allowNull:false,
        

    },
    description:DataTypes.STRING
})

module.exports=Product;
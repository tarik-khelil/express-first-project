
const {Sequelize} = require('sequelize');

// Option 3: Passing parameters separately (other dialects)

//new Sequelize(database name, username,password,{..})
const sequelize = new Sequelize('node-complete', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});



module.exports=sequelize;






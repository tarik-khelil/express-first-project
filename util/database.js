const mysql = require('mysql2');

//create pool connexion to db
const pool=mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password:'12345678',
    // waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0
})
module.exports=pool.promise();



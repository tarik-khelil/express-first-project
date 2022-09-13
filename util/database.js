const mongodb = require("mongodb");

const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (calback) => {
    mongoClient.connect('mongodb+srv://tarik:chelsea95@cluster0.ghdxnkk.mongodb.net/?retryWrites=true&w=majority')
        .then(res => {
            _db = res.db();
            calback();
        })
        .catch(err => { console.log(err); throw err })
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    return 'Parameter is not a number!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;


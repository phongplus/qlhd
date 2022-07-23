let mongoose = require('mongoose');

const mongodb_url = 'mongodb://localhost1111:27017/QLHD-HNN'

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(mongodb_url, { useNewUrlParser: true })
            .then(() => {
                console.log("Kết nối Mongodb successfully!");
            })
            .catch(err => {
                console.log("Database connection error!");
            })
    }
}

module.exports = new Database();
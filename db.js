const mongoose = require('./src/config/mongoose');
const mongodb = require('./src/config/mongodb')();

console.log(mongodb);

module.exports = mongoose.connect(mongodb.connection.url, mongodb.options, err => {
    if (err) throw err;
});
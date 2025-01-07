const mongoose = require('mongoose');

// Connect to the database
const connection = mongoose.connect('mongodb://localhost:27017/backen_shreian')
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.error('Error connecting to database', err);
    });

module.exports = connection;

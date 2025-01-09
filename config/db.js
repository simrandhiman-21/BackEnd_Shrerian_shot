const mongoose = require('mongoose');

// Connect to the database
function connecttoDB(){
     mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.error('Error connecting to database', err);
    });
}

module.exports =connecttoDB;

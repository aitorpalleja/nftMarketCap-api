const mongoose = require('mongoose');

const paramsModel = new mongoose.Schema({
    Name: {
        type: String,
        length: 100,
        required: true
    },
    Description: {
        type: String,
        length: 1000,
        required: true    
    },
    Value: {
        type: String,
        length: 50,
        required: true
    }
}, { collection: 'Parameters' });

module.exports = mongoose.model('Parameters', paramsModel);
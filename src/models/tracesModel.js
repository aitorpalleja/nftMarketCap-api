const mongoose = require('mongoose');

const tracesModel = new mongoose.Schema({
    Trace: {
        type: String,
        length: 1000,
        required: true
    },
    LogType: {
        type: String,
        length: 100,
        required: true    
    },
    Date: {
        type: String,
        length: 50,
        required: true
    }
}, { collection: 'Traces' });

module.exports = mongoose.model('Traces', tracesModel);
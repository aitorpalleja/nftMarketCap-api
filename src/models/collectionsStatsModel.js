const mongoose = require('mongoose');

const collectionsStatsModel = new mongoose.Schema({
    Symbol: {
        type: String,
        length: 100,
        required: true
    },
    Image: {
        type: String,
        length: 2000,
        required: false
    },
    FloorPrice: {
        type: mongoose.Types.Decimal128,
        required: false
    },
    ListetCount: {
        type: mongoose.Types.Decimal128,
        required: false
    },
    TotalSupply: {
        type: mongoose.Types.Decimal128,
        required: false
    },
    MarketCap: {
        type: mongoose.Types.Decimal128,
        required: false
    },
    VolumenAll: {
        type: mongoose.Types.Decimal128,
        required: false
    },
    UniqueHolders: {
        type: mongoose.Types.Decimal128,
        required: false
    }
}, { collection: 'CollectionsStats' });


const specificDataBase = mongoose.connection.useDb('test'); 
module.exports = specificDataBase.model('CollectionsStats', collectionsStatsModel);
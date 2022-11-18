const express = require("express");
const router = express.Router();
const collectionsModel = require("../models/collectionsModel");
const EncryptionService = require("../services/EncryptionService");
const collectionsController = require('../controllers/collectionsController');

this._encryptService = new EncryptionService();

router.get('/getHighlightedCollections', collectionsController.getHighlightedCollections);
router.get('/getTopCollections', collectionsController.getTopCollections);
router.get('/getAllCollectionsAllData', collectionsController.getAllCollectionsAllData);
router.get('/getCollectionAllData', collectionsController.getCollectionAllData);
router.get('/getAllCollectionsInfoData', collectionsController.getAllCollectionsInfoData);
router.get('/getCollectionInfoData/:symbol', collectionsController.getCollectionInfoData);
router.get('/getAllCollectionsStatsData', collectionsController.getAllCollectionsStatsData);
router.get('/getCollectionStatsData/:symbol', collectionsController.getCollectionStatsData);

router.get('/prueba', async (req, res) => {
    try {
        res.json("");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
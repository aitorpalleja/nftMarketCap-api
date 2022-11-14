const express = require("express");
const router = express.Router();
const collectionsModel = require("../models/collectionsModel");
const EncryptionService = require("../services/EncryptionService");
const collectionsController = require('../controllers/collectionsController');

this._encryptService = new EncryptionService();

router.get('/getAllCollections', collectionsController.getAllCollections);


router.get('/prueba', async (req, res) => {
    try {
        res.json("");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
const collectionsModel = require('../models/collectionsModel');
const collectionsModelController = require('../modelsControllers/collectionsModelController');

exports.getAllCollections = async (req, res) => {
    try {
        const collections = await collectionsModelController.getAllCollections();
        res.json(collections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
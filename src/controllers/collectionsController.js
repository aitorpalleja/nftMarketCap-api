const collectionsModelController = require('../modelsControllers/collectionsModelController');
const LogService = require("../services/LogService/LogService");
const LogType = require("../services/LogService/LogTypeEnum");

this._logService = new LogService();

exports.getHighlightedCollections = async(req, res) => {
    try {
        let highlightedCollections = [];
        res.status(200).json(highlightedCollections);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error at getHighlightedCollections", ResponseStatus: 500 });
        this._logService.log("Internal Server Error at getHighlightedCollections. ResponseStatus: 500. Error:" + error.message, LogType.Error);
    }
}

exports.getTopCollections = async(req, res) => {
    try {
        let topCollections = await collectionsModelController.getAllTopCollectionsStats();
        res.status(200).json(topCollections);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error at getTopCollections", ResponseStatus: 500 });
        this._logService.log("Internal Server Error at getTopCollections. ResponseStatus: 500. Error:" + error.message, LogType.Error);
    }
}

exports.getAllCollectionsAllData = async (req, res) => {
    try {
        let allCollectionsData = []; 
        const allCollectionsInfoData = await collectionsModelController.getAllCollections();
        const allCollectionsStatsData = await collectionsModelController.getAllCollectionsStats();

        if (allCollectionsInfoData !== null && allCollectionsStatsData !== null) {
            for (var i = 0; i < allCollectionsStatsData.length; i++) {
                homeCollections.push(allCollectionsStatsData[i]);
                const collectionInfoData = allCollectionsInfoData.find(collectionInfo => collectionInfo.Symbol === allCollectionsStatsData[i].Symbol).Image;
                if (collectionInfoData !== null && collectionInfoData !== undefined) {
                    homeCollections[homeCollections.length-1].Symbol = collectionInfoData.Symbol;
                    homeCollections[homeCollections.length-1].Name = collectionInfoData.Name;
                    homeCollections[homeCollections.length-1].Description = collectionInfoData.Description;
                    homeCollections[homeCollections.length-1].Image = collectionInfoData.Image;
                    homeCollections[homeCollections.length-1].Website = collectionInfoData.Website;
                    homeCollections[homeCollections.length-1].Twitter = collectionInfoData.Twitter;
                    homeCollections[homeCollections.length-1].Discord = collectionInfoData.Discord;
                    homeCollections[homeCollections.length-1].CreatedAt = collectionInfoData.CreatedAt;
                    homeCollections[homeCollections.length-1].UpdatedAt = collectionInfoData.UpdatedAt;
                    homeCollections[homeCollections.length-1].Expired = collectionInfoData.Expired;
                }
            }
        }

        res.status(200).json(allCollectionsData);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error at getAllCollectionsAllData", ResponseStatus: 500 });
        this._logService.log("Internal Server Error at getAllCollectionsAllData. ResponseStatus: 500. Error:" + error.message, LogType.Error);
    }
}

exports.getCollectionAllData = async (req, res) => {
    try {
        let collectionData = [];
        const symbolRequest = req?.params?.symbol !== undefined && req?.params?.symbol !== null ? req.params.symbol : '---';
        const collectionInfoData = await collectionsModelController.getCollection(symbolRequest);
        const collectionStatsData = await collectionsModelController.getCollectionStats(symbolRequest);

        if (collectionInfoData !== null && collectionStatsData !== null) {
            collectionData = collectionStatsData;
            collectionData.Symbol = collectionInfoData.Symbol;
            collectionData.Name = collectionInfoData.Name;
            collectionData.Description = collectionInfoData.Description;
            collectionData.Image = collectionInfoData.Image;
            collectionData.Website = collectionInfoData.Website;
            collectionData.Twitter = collectionInfoData.Twitter;
            collectionData.Discord = collectionInfoData.Discord;
            collectionData.CreatedAt = collectionInfoData.CreatedAt;
            collectionData.UpdatedAt = collectionInfoData.UpdatedAt;
            collectionData.Expired = collectionInfoData.Expired;
        }

        res.status(200).json(collectionData);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error at getCollectionAllData", ResponseStatus: 500 });
        this._logService.log("Internal Server Error at getCollectionAllData. ResponseStatus: 500. Error:" + error.message, LogType.Error);
    }
}

exports.getAllCollectionsInfoData = async (req, res) => {
    try {
        const allCollections = await collectionsModelController.getAllCollections();
        res.status(200).json(allCollections);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error at getAllCollectionsInfoData", ResponseStatus: 500 });
        this._logService.log("Internal Server Error at getAllCollectionsInfoData. ResponseStatus: 500. Error:" + error.message, LogType.Error);
    }
}

exports.getCollectionInfoData = async (req, res) => {
    try {
        const symbolRequest = req?.params?.symbol !== undefined && req?.params?.symbol !== null ? req.params.symbol : '---';
        const collection = await collectionsModelController.getCollection(symbolRequest);
        res.status(200).json(collection);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error at getCollectionInfoData", ResponseStatus: 500 });
        this._logService.log("Internal Server Error at getCollectionInfoData. ResponseStatus: 500. Error:" + error.message, LogType.Error);
    }
}

exports.getAllCollectionsStatsData = async (req, res) => {
    try {
        const allCollectionsStats = await collectionsModelController.getAllCollectionsStats();
        res.status(200).json(allCollectionsStats);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error at getAllCollectionsStatsData", ResponseStatus: 500 });
        this._logService.log("Internal Server Error at getAllCollectionsStatsData. ResponseStatus: 500. Error:" + error.message, LogType.Error);
    }
}

exports.getCollectionStatsData = async (req, res) => {
    try {
        const symbolRequest = req?.params?.symbol !== undefined && req?.params?.symbol !== null ? req.params.symbol : '---';
        const collectionStats = await collectionsModelController.getCollectionStats(symbolRequest);
        res.status(200).json(collectionStats);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error at getCollectionStatsData", ResponseStatus: 500 });
        this._logService.log("Internal Server Error at getCollectionStatsData. ResponseStatus: 500. Error:" + error.message, LogType.Error);
    }
}
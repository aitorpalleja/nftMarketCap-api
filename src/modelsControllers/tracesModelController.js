const LogService = require("../services/LogService/LogService");
const LogType = require("../services/LogService/LogTypeEnum");
const tracesModel = require('../models/tracesModel');

this._logService = new LogService();

exports.saveNewTrace = async (newTrace) => {
    try {
        await newTrace.save();
    } catch (error) {
        this._logService.log("Error de BBDD, en saveNewTrace. ERROR: " + error, LogType.Error);
    }
}

exports.deleteAllTraces = async () => {
    try {
        await tracesModel.deleteMany({});
    } catch (error) {
        this._logService.log("Error de BBDD, en deleteAllTraces. ERROR: " + error, LogType.Error);
    }

}

exports.getAllTraces = async () => {
    let allTraces = null;
    try {
        allTraces = await tracesModel.find();
    } catch (error) {
        this._logService.log("Error de BBDD, en getAllTraces. ERROR: " + error, LogType.Error);
    }

    return allTraces;
}
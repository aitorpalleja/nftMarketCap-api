const LogService = require("../services/LogService/LogService");
const LogType = require("../services/LogService/LogTypeEnum");
const paramsModel = require('../models/paramsModel');

this._logService = new LogService();

exports.getAllParams = async () => {
    let allParams = null;
    try {
        allParams = await paramsModel.find();
    } catch (error) {
        this._logService.log("Error de BBDD, en getAllParams. ERROR: " + error, LogType.Error);
    }

    return allParams;
}

exports.getParamByName = async (paramName) => {
    let param = null;
    try {
        param = await paramsModel.find({Name: paramName});
    } catch (error) {
        this._logService.log("Error de BBDD, en getParamByName. ERROR: " + error, LogType.Error);
    }

    return param;
}
import { LogType } from "../services/LogService/LogTypeEnum";
const paramsModel = require('../models/paramsModel');

exports.getAllParams = async () => {
    let allParams = null;
    try {
        allParams = await paramsModel.find();
    } catch (error) {
        console.warn("Error de BBDD, en getAllParams. ERROR: " + error, LogType.Error);
    }

    return allParams;
}

exports.getParamByName = async (paramName) => {
    let param = null;
    try {
        param = await paramsModel.find({Name: paramName});
    } catch (error) {
        console.warn("Error de BBDD, en getParamByName. ERROR: " + error, LogType.Error);
    }

    return param;
}
import { LogType } from "../services/LogService/LogTypeEnum";
const tracesModel = require('../models/tracesModel');

exports.saveNewTrace = async (newTrace) => {
    try {
        await newTrace.save();
    } catch (error) {
        console.warn("Error de BBDD, en saveNewTrace. ERROR: " + error, LogType.Error);
    }
}

exports.deleteAllTraces = async () => {
    try {
        await tracesModel.deleteMany({});
    } catch (error) {
        console.warn("Error de BBDD, en deleteAllTraces. ERROR: " + error, LogType.Error);
    }

}

exports.getAllTraces = async () => {
    let allTraces = null;
    try {
        allTraces = await tracesModel.find();
    } catch (error) {
        console.warn("Error de BBDD, en getAllTraces. ERROR: " + error, LogType.Error);
    }

    return allTraces;
}
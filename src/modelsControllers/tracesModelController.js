const tracesModel = require('../models/tracesModel');


exports.saveNewTrace = async (newTrace) => {
    try {
        await newTrace.save();
    } catch (error) {
        console.error("Error de BBDD, en saveNewTrace. ERROR: " + error);
    }
}

exports.deleteAllTraces = async () => {
    try {
        await tracesModel.deleteMany({});
    } catch (error) {
        console.error("Error de BBDD, en deleteAllTraces. ERROR: " + error);
    }

}

exports.getAllTraces = async () => {
    let allTraces = null;
    try {
        allTraces = await tracesModel.find();
    } catch (error) {
        console.error("Error de BBDD, en getAllTraces. ERROR: " + error);
    }

    return allTraces;
}
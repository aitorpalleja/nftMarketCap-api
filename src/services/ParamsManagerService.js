const LogService = require("./LogService/LogService");
const LogType = require("./LogService/LogTypeEnum");
const settings = require('../../settings.json');
const paramsController = require('../modelsControllers/paramsModelController');

class ParamsManagerService {
    _logService;

    constructor() {
        this._logService = new LogService();
    }

    getParameters = async() => {
        return new Promise(async (resolve, reject) => {
            await this._getAndSetParameters();
            resolve(true);
        });
    }

    _getAndSetParameters = async() => {
        let params;
        try {
            params = await paramsController.getAllParams();
            this._setSettingParameters(params);
            this._logService.log("Parametros obtenidos de BBDD", LogType.Information);
        } catch (error) {
            this._logService.log("Error parametros obtenidos de BBDD _getAndSetParameters. Error: " + error, LogType.Error);
        }

        this._startGetParamsInterval();
        return params;
    }

    _startGetParamsInterval = async() => {
        setInterval(async () => {
            try {
                const params = await paramsController.getAllParams();
                this._setSettingParameters(params);
                this._logService.log("Parametros obtenidos de BBDD", LogType.Information);
            } catch (error) {
                this._logService.log("Error parametros obtenidos de BBDD _startGetParamsInterval. Error: " + error, LogType.Error);
            }
            
        }, settings.Params.ParamsRequestTime)
    }

    _setSettingParameters = (parameters) => {
        settings.Logs.BBDDLogsEnable = parameters.find(param => param.Name === "Logs.BBDDLogsEnable") !== undefined ? 
            parameters.find(param => param.Name === "Logs.BBDDLogsEnable").Value : 
            settings.Logs.BBDDLogsEnable;

        settings.Logs.ConsoleLogsEnable = parameters.find(param => param.Name === "Logs.ConsoleLogsEnable") !== undefined ? 
            parameters.find(param => param.Name === "Logs.ConsoleLogsEnable").Value : 
            settings.Logs.ConsoleLogsEnable;
        
        settings.Collections.MinVolumenExpiredCollections = parameters.find(param => param.Name === "Collections.MinVolumenExpiredCollections") !== undefined ? 
            parameters.find(param => param.Name === "Collections.MinVolumenExpiredCollections").Value : 
            settings.Collections.MinVolumenExpiredCollections;
        
        settings.Heartbeat.Enable = parameters.find(param => param.Name === "Heartbeat.Enable") !== undefined ? 
            parameters.find(param => param.Name === "Heartbeat.Enable").Value : 
            settings.Heartbeat.Enable;
        
        settings.Heartbeat.IntervalTime = parameters.find(param => param.Name === "Heartbeat.IntervalTime") !== undefined ? 
            parameters.find(param => param.Name === "Heartbeat.IntervalTime").Value : 
            settings.Heartbeat.IntervalTime;
        
        settings.Params.ParamsRequestTime = parameters.find(param => param.Name === "Params.ParamsRequestTime") !== undefined ? 
            parameters.find(param => param.Name === "Params.ParamsRequestTime").Value : 
            settings.Params.ParamsRequestTime;
    }
}

module.exports = ParamsManagerService;
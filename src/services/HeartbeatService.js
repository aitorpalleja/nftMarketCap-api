const settings = require('../../settings.json');
const LogService = require("./LogService/LogService");
const LogType = require("./LogService/LogTypeEnum");

class HeartBeatService { 
    _logService;
    _hearBeatLog = "Hearbeat. Scrapper awake.";

    constructor() {
        this._logService = new LogService();
    }

    startHeartBeat = () => {
        setInterval(() => {
            try {
                if (settings.Heartbeat.Enable)
                {
                    this._log();
                } 
            } catch (error) {
                this._logService.log("Error Hearbeat interval log. Error: " + error, LogType.Error)
            }
        }, settings.Heartbeat.IntervalTime);
    }

    _log = () => {
        this._logService.log(this._hearBeatLog, LogType.Information);
    }
}

module.exports = HeartBeatService;
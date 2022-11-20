require('dotenv').config();
const ParamsManagerService  = require('./services/ParamsManagerService');
const HeartBeatService = require('./services/HeartbeatService');
const ApiInitializerService = require('./services/ApiInitializerService');
const LogService = require("./services/LogService/LogService");
const LogType = require("./services/LogService/LogTypeEnum");

this.paramsService = new ParamsManagerService();
this.heartBeatSrvc = new HeartBeatService();
this.apiInitializer = new ApiInitializerService();
this.logService = new LogService();

 _initializeServer = () => {
  this.apiInitializer.setApiSettings();
  this.apiInitializer.connectToDBAndControlConnection().then(async result => {
    await this.paramsService.getParameters();
    this.apiInitializer.setMiddlewares();
    this.apiInitializer.setRoutes();
    this.heartBeatSrvc.startHeartBeat();
    this.logService.log("Api initialization finished. Api Ready", LogType.Information);
  }).catch(err => {
    this.logService.log("FATAL ERROR Api initialization failed. Api NOT Ready", LogType.Error);
  });  
}

_initializeServer();

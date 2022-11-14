import dotenv from 'dotenv'
import { ParamsManagerService } from './services/ParamsManagerService';
import { HeartBeatService } from './services/HeartbeatService';
import { ApiInitializerService } from './services/ApiInitializerService';
import { LogService } from "./services/LogService/LogService";
import { LogType } from "./services/LogService/LogTypeEnum";

dotenv.config();
this.paramsService = new ParamsManagerService();
this.heartBeatSrvc = new HeartBeatService();
this.apiInitializer = new ApiInitializerService();
this.logService = new LogService();

const _initializeServer = () => {
  apiInitializer.setApiSettings();
  apiInitializer.connectToDBAndControlConnection().then(async result => {
    await paramsService.getParameters();
    apiInitializer.setMiddlewares();
    apiInitializer.setRoutes();
    heartBeatSrvc.startHeartBeat();
  }).catch(err => {
      
  });  
}

_initializeServer();

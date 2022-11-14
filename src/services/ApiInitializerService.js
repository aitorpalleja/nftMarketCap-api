const express = require('express');
const mongoose = require('mongoose');
const collectionsRoutes = require('../routes/collectionsRoute');
const LogService = require("./LogService/LogService");
const LogType = require("./LogService/LogTypeEnum");

class ApiInitializerService {
    _logService = new LogService();

    constructor() {
        this.app = express();
        this.database = undefined;
        this.port = process.env.PORT || 3001;
        this._logService = new LogService();
        // this.apiAccesSecurity = new ApiAccessSecurityService();
    }

    setApiSettings = () => {
        this._setContentType();
        this._setHeaders();
    }

    connectToDBAndControlConnection = () => {
        return new Promise((resolve, reject) => {
            this._connectToDB();
            this._controlConnection().then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            });
        })
    }

    setRoutes = () => {
        this._setRoutes();
    }

    setMiddlewares = () => {
        this._setSecurityControls();
    }

    _setContentType = () => {
        this.app.use(express.json());
    }

    _setHeaders = () => {
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type, X-Api-IP, X-Api-SecretKey, X-Api-Token, Authorization');
            res.header('Request-Date', Date.now());
            next();
        });
    }

    _connectToDB = () => {
        const connectionOptions = {
            socketTimeoutMS: 0,
            keepAlive: true,
            useNewUrlParser: true
        };
        
        mongoose.connect(process.env.MONGO_DB_URI, connectionOptions);
        this._database = mongoose.connection;
    }

    _controlConnection = () => {
        return new Promise((resolve, reject) => {
            this._database.on('error', (error) => {
                this._logService.log("ERROR conecting to DataBase: " + error, LogType.Error);
                reject(false);
            });

            this._database.once('open', () => {
                this._logService.log("Connected to Database", LogType.Information);
                this.app.listen(this.port, () => {
                    this._logService.log("Server Started at port " + this.port, LogType.Information);
                    resolve(true);
                });
            });
        });
    }

    _setSecurityControls = () => {
        // this.app.use(this.apiAccesSecurity.securityControls);
    }

    _setRoutes = () => {
        this.app.use(collectionsRoutes);
    }
}


module.exports = ApiInitializerService;
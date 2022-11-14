const CryptoJS = require("crypto-js");

class EncryptionService {
    constructor() {
        this._mySecretKey = "settings.encriptionSecretKey";
    }

    encryptStringOrNumber = (value, numberOfTimes = 1) => {
        let encryptedValue = value;
        let times = 0;
        if (value !== undefined && value !== null) {
            while (times < numberOfTimes) {
                encryptedValue = CryptoJS.AES.encrypt(encryptedValue, this._mySecretKey).toString();
                times++;
            }
        }

        return encryptedValue;
    }

    decryptStringOrNumber = (value, numberOfTimes = 1) => {
        let decryptedValue = value;
        let times = 0;
        if (value !== undefined && value !== null) {
            while (times < numberOfTimes) {
                var bytes = CryptoJS.AES.decrypt(decryptedValue, this._mySecretKey);
                decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
                times++;
            }
        }

        return decryptedValue;
    }

    encryptObject = (object, numberOfTimes = 1) => {
        let encryptedValue = object;
        let times = 0;
        if (object !== undefined && object !== null) {
            while (times < numberOfTimes) {
                encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(encryptedValue), this._mySecretKey).toString();
                times++;
            }
        }

        return encryptedValue;
    }

    decryptObject = (object, numberOfTimes = 1) => {
        let decryptedValue = object;
        let times = 0;
        if (object !== undefined && object !== null) {
            while (times < numberOfTimes) {
                var bytes = CryptoJS.AES.decrypt(decryptedValue, this._mySecretKey);
                decryptedValue = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                times++;
            }
        }

        return decryptedValue;
    }
}

module.exports = EncryptionService;
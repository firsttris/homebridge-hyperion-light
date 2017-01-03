/**
 * Created by Tristan on 31.12.2016.
 */
var net = require('net');
var hyperion = require('./hyperion')
var Service, Characteristic, UUIDGen;

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    Accessory = homebridge.hap.Accessory;
    UUIDGen = homebridge.hap.uuid;
    homebridge.registerAccessory("homebridge-hyperion", "Hyperion", HyperionAccessory);
}

function HyperionAccessory (log, config) {
    this.log = log;
    hyperion.setHost(config["host"]);
    hyperion.setPort(config["port"]);
    this.name = config["name"];
    this.effectName = config["effectName"];
    this.UUID = UUIDGen.generate(this.name);
    this.ambilightName = config["ambilightName"];
    this.lightService = new Service.Lightbulb(this.name);
    this.lightService.subtype = this.name;
    this.ambilightService = new Service.Switch(this.ambilightName);
    this.ambilightService.subtype = this.ambilightName;
    this.infoService = new Service.AccessoryInformation();
    this.effectService = new Service.Switch(this.effectName);
    this.effectService.subtype = this.effectName;
    this.log("Starting Hyperion Accessory");
}

HyperionAccessory.prototype.identify = function (callback) {
    this.log("Identify");
}

HyperionAccessory.prototype.getServices = function () {
    let services = [];

    this.lightService
        .getCharacteristic(Characteristic.On)
        .on('set', (value, callback) => {
            if (value) {
                hyperion.setOn();
                this.ambilightService.updateCharacteristic(Characteristic.On, 0);
                this.effectService.updateCharacteristic(Characteristic.On, 0);
            } else {
                hyperion.setOff();
            }
            callback();
        })
        .on('get', (callback) => {
            hyperion.getOn(callback);
        });

    this.lightService
        .addCharacteristic(Characteristic.Brightness)
        .on('set', (value, callback) => {
            hyperion.setBrightness(value);
            callback();
        })
        .on('get', (callback) => {
            hyperion.getBrightness(callback);
        });

    this.lightService
        .addCharacteristic(Characteristic.Hue)
        .on('set', (value, callback) => {
            hyperion.setHue(value);
            callback();
        })
        .on('get', (callback) => {
            hyperion.getHue(callback);
        });

    this.lightService
        .addCharacteristic(Characteristic.Saturation)
        .on('set', (value, callback) => {
            hyperion.setSaturation(value);
            callback();
        })
        .on('get', (callback) => {
            hyperion.getSaturation(callback);
        });

    if (this.ambilightName !== null && this.ambilightName.length > 0) {
        this.ambilightService
            .getCharacteristic(Characteristic.On)
            .on('set', (value, callback) => {
                if (value) {
                    hyperion.setAmbiState();
                    this.lightService.updateCharacteristic(Characteristic.On, 0);
                    this.effectService.updateCharacteristic(Characteristic.On, 0);
                } else {
                    hyperion.setOff();
                }
                callback();
            })
            .on('get', (callback) => {
                hyperion.getAmbiState(callback);
            });
        services.push(this.ambilightService);
    }

    if (this.effectName !== null && this.effectName.length > 0) {
        this.effectService
            .getCharacteristic(Characteristic.On)
            .on('set', (value, callback) => {
                if (value) {
                    hyperion.setEffectState(this.effectName);
                    this.lightService.updateCharacteristic(Characteristic.On, 0);
                    this.ambilightService.updateCharacteristic(Characteristic.On, 0);
                } else {
                    hyperion.setOff();
                }
                callback();
            })
            .on('get', (callback) => {
                hyperion.getEffectState(callback);
            });
        services.push(this.effectService);
    }

    services.push(this.lightService);
    services.push(this.infoService);

    this.infoService
        .setCharacteristic(Characteristic.Manufacturer, "Hyperion")
        .setCharacteristic(Characteristic.Model, this.host)
        .setCharacteristic(Characteristic.SerialNumber, this.lightService.UUID);

    return services;
}
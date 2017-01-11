"use strict";
const net = require('net');
const Hyperion = require('hyperion-js-api');
let Service, Characteristic, UUIDGen;

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    UUIDGen = homebridge.hap.uuid;
    homebridge.registerAccessory("homebridge-hyperion", "Hyperion", HyperionAccessory);
};

function HyperionAccessory (log, config) {
    this.log = log;
    this.hyperion = new Hyperion(config["host"], config["port"]);
    this.name = config["name"];
    this.UUID = UUIDGen.generate(this.name);
    this.ambilightName = config["ambilightName"];
    this.lightService = new Service.Lightbulb(this.name);
    this.lightService.subtype = this.name;
    this.ambilightService = new Service.Switch(this.ambilightName);
    this.ambilightService.subtype = this.ambilightName;
    this.infoService = new Service.AccessoryInformation();
    this.log("Starting Hyperion Accessory");
}

HyperionAccessory.prototype.getServices = function () {
    let services = [];

    this.lightService
        .getCharacteristic(Characteristic.On)
        .on('set', (value, callback) => {
            if (value) {
                this.ambilightService.updateCharacteristic(Characteristic.On, 0);
                this.hyperion.setOn(callback);
            } else {
                this.hyperion.setOff(callback);
            }
        })
        .on('get', (callback) => {
            this.hyperion.getOn(callback);
        });

    this.lightService
        .addCharacteristic(Characteristic.Brightness)
        .on('set', (value, callback) => {
            this.hyperion.setBrightness(value, callback);
        })
        .on('get', (callback) => {
            this.hyperion.getBrightness(callback);
        });

    this.lightService
        .addCharacteristic(Characteristic.Hue)
        .on('set', (value, callback) => {
            this.hyperion.setHue(value, callback);
        })
        .on('get', (callback) => {
            this.hyperion.getHue(callback);
        });

    this.lightService
        .addCharacteristic(Characteristic.Saturation)
        .on('set', (value, callback) => {
            this.hyperion.setSaturation(value, callback);
        })
        .on('get', (callback) => {
            this.hyperion.getSaturation(callback);
        });

    if (this.ambilightName && this.ambilightName.length > 0) {
        this.ambilightService
            .getCharacteristic(Characteristic.On)
            .on('set', (value, callback) => {
                if (value) {
                    this.lightService.updateCharacteristic(Characteristic.On, 0);
                    this.hyperion.setAmbiStateOn(callback);
                } else {
                    this.hyperion.setOff(callback);
                }
            })
            .on('get', (callback) => {
                this.hyperion.getAmbiState(callback);
            });
        services.push(this.ambilightService);
    }

    services.push(this.lightService);
    services.push(this.infoService);

    this.infoService
        .setCharacteristic(Characteristic.Manufacturer, "Hyperion")
        .setCharacteristic(Characteristic.Model, this.host)
        .setCharacteristic(Characteristic.SerialNumber, this.lightService.UUID);

    return services;
};
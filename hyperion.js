/**
 * Created by Tristan on 31.12.2016.
 */
const net = require('net');
const color = require('color');
let host = "";
let port = 19444 * 1;

const white = color.rgb(255, 255, 255);
const red = color.rgb(255, 0, 0);
const black = color.rgb(0, 0, 0);
let selectedColor = color.rgb(255, 255, 255);
let lightState = false;
let effectState = false;
let ledState = false;
let ambiState = false;

const clearall = {
    command: "clearall"
};

const colorCommand = {
    command: "color",
    priority: 100,
    color: selectedColor.rgb().round().array()
};

const offCommand = {
    command: "color",
    priority: 100,
    color: black.rgb().round().array()
};

const effectCommand = {
    command: "effect",
    effect: {
        name: "Blue mood blobs"
    },
    priority: 100
};

const serverInfo = {"command": "serverinfo"};

function send (command, callback) {
    const client = new net.Socket();
    client.connect(port, host, () => {
        const string = JSON.stringify(command) + "\n";
        client.write(string);
    });
    client.on('error', (err) => {
        console.log('Hyperion : ' + host + ' error: ' + err);
    });
    let chunk = "";
    client.on('data', (data) => {
        chunk += data.toString();
        client.end();
    });
    client.on('end', () => {
        const object = JSON.parse(chunk);
        if (callback) {
            callback(object);
        }
    });
}

function setColor (colorObject) {
    colorCommand.color = colorObject.rgb().round().array();
    send(colorCommand);
}

function setOn () {
    send(colorCommand);
}

function verifyLightState (data) {
    if(!data.info.activeLedColor || !data.info.activeEffects) {
        console.log("Could not get activeLedColor or activeEffects of Hyperion. Install latest Hyperion Version.");
        console.log("Check Response: "+JSON.stringify(data));
        return;
    }
    ledState = data.info.activeLedColor.length > 0;
    effectState = data.info.activeEffects.length > 0;
}

function verifyOn () {
    lightState = ledState && !effectState;
}

function verifyAmbiState () {
    ambiState = !ledState && !effectState;
}

function extractColorFromData (data) {
    if (lightState) {
        selectedColor = color.rgb(data.info.activeLedColor[0]["RGB Value"]);
    }
}
function getOn (callback) {
    send(serverInfo, (data) => {
        verifyLightState(data);
        verifyOn();
        extractColorFromData(data);
        callback(null, lightState);
    });
}

function setOff () {
    send(offCommand);
}

function setHost (value) {
    host = value;
}

function setPort (value) {
    port = value * 1;
}

function setEffectState (value) {
    effectCommand.effect.name = value;
    send(effectCommand);
}

function getEffectState (callback) {
    send(serverInfo, (data) => {
        effectState = data.info.activeEffects.length > 0;
        callback(null, effectState);
    });
}

function setAmbiState () {
    send(clearall);
}

function getAmbiState (callback) {
    send(serverInfo, (data) => {
        verifyLightState(data);
        verifyAmbiState();
        callback(null, ambiState);
    });
}

function setBrightness (value) {
    selectedColor = selectedColor.value(value);
    setColor(selectedColor);
}

function getBrightness (callback) {
    send(serverInfo, (data) => {
        verifyLightState(data);
        verifyOn();
        extractColorFromData(data);
        callback(null, selectedColor.value());
    });
}

function setHue (value) {
    selectedColor = selectedColor.hue(value);
    setColor(selectedColor);
}

function getHue (callback) {
    send(serverInfo, (data) => {
        verifyLightState(data);
        verifyOn();
        extractColorFromData(data);
        const hue = Math.round(selectedColor.hue())
        callback(null, hue);
    });
}

function setSaturation (value) {
    selectedColor = selectedColor.saturationv(value);
    setColor(selectedColor);
}

function getSaturation (callback) {
    send(serverInfo, (data) => {
        verifyLightState(data);
        verifyOn();
        extractColorFromData(data);
        const saturation = Math.round(selectedColor.saturationv());
        callback(null, saturation);
    });
}

module.exports = {
    setHost,
    setPort,
    setAmbiState,
    getAmbiState,
    setEffectState,
    getEffectState,
    setOn,
    getOn,
    setOff,
    setBrightness,
    getBrightness,
    setHue,
    getHue,
    setSaturation,
    getSaturation
};
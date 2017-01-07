# homebridge-hyperion-light
[Homebridge](https://github.com/nfarina/homebridge) accessory for Hyperion

Homebridge plugin to use Hyperion as HomeKit device.

Features:

- Control color and brightness of TV Blacklight.

- Switch ambilight on/off. (optional)

- Switch effect on/off. (optional, choose the effect by name)

# Installation

[Homebridge](https://github.com/nfarina/homebridge) is required to use this plugin 

[![npm version](https://badge.fury.io/js/homebridge.svg)](https://badge.fury.io/js/homebridge)
```
npm install -g homebridge
```
Install this plugin 

[![npm version](https://badge.fury.io/js/homebridge-hyperion-light.svg)](https://badge.fury.io/js/homebridge-hyperion-light)
```
npm install -g homebridge-hyperion-light
```
Add your Accessory to the config.json

Configuration sample:
 ```
        "accessories": [{
            "accessory": "Hyperion",
            "name": "TV Backlight",
            "ambilightName": "TV Ambilight",
            "effectName": "Cinema dim lights",
            "host": "20.1.0.138",
            "port": "19444"
        }]
```

Attributes:

- "accessory": Name of Accessory "Hyperion" (required)
- "name": Name of TV Backlight (required)
- "ambilightName": Name of switch for Ambilight (optional)
- "effectName": Name of switch for Effect (optional)
- "host": The hostname or ip (required)
- "port": The port (usually 19444) (required)

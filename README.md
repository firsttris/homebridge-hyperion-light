# homebridge-hyperion-light
:collision: [Homebridge](https://github.com/nfarina/homebridge) plugin to use Hyperion as HomeKit accessory

###Features

- Switch on/off
- Control color and brightness of tv backlight
- Switch ambilight on/off (optional)
- Get current state/color

###Installation

[Homebridge](https://github.com/nfarina/homebridge) is required

[![npm version](https://badge.fury.io/js/homebridge.svg)](https://badge.fury.io/js/homebridge)
```
npm install -g homebridge
```
to use this plugin

[![npm version](https://badge.fury.io/js/homebridge-hyperion-light.svg)](https://badge.fury.io/js/homebridge-hyperion-light)
```
npm install -g homebridge-hyperion-light
```
Add your Accessory to the config.json

Configuration sample:
 ```
        "accessories": [{
            "accessory": "Hyperion",
            "autoupdate": "true",
            "name": "TV Backlight",
            "ambilightName": "TV Ambilight",
            "host": "20.1.0.138",
            "port": "19444"
        }]
```

Attributes:

- "accessory": Name of Accessory "Hyperion" (required)
- "autoupdate": Autoupdate this package from NPM (optional, only for one device!)
- "name": Name of TV Backlight (required)
- "ambilightName": Name of switch for Ambilight (optional)
- "host": The hostname or ip (required)
- "port": The port (usually 19444) (required)

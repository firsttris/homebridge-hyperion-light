# homebridge-hyperion-light
[Homebridge](https://github.com/nfarina/homebridge) accessory plugin for Hyperion

Homebridge Plugin to use Hyperion as HomeKit device.
  
Control color and brightness of TV Blacklight.

Switch Ambilight on/off. (optional)

Switch Effect on/off. (optional, you can choose the effect by name)

# Installation

1. [Homebridge](https://github.com/nfarina/homebridge) is required to use this plugin 

[![npm version](https://badge.fury.io/js/homebridge.svg)](https://badge.fury.io/js/homebridge)
```
npm install -g homebridge
```
2. Install this plugin 

[![npm version](https://badge.fury.io/js/homebridge-hyperion-light.svg)](https://badge.fury.io/js/homebridge-hyperion-light)
```
npm install -g homebridge-hyperion-light
```
3. Add your Accessory to the config.json (See configuration sample below.)


# Configuration

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

Fields:

* "accessory": Name of Accessory "Hyperion" (required)
* "name": Name of TV Backlight (required)
* "ambilightName": Name of switch for Ambilight (optional)
* "effectName": Name of switch for Effect (optional)
* "host": The hostname or ip (required)
* "port": The port (usually 19444) (required)

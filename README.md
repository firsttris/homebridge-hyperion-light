# homebridge-hyperion
[Homebridge](https://github.com/nfarina/homebridge) accessory plugin for Hyperion

Homebridge Plugin to use Hyperion as HomeKit device.
  
Control TV Blacklight color and brightness..
Switch Ambilight on/off. (optional)
Switch Effect on/off. (optional, you can choose the effect by name)

# Installation

1. Install homebridge using: npm install -g homebridge
2. Install this plugin using: npm install -g homebridge-hyperion-light
3. Add Accessory (JSON) to your config.json See below for a sample.

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
        },
```

Fields:

* "accessory": Name of Accessory "Hyperion" (required)
* "name": Name of TV Backlight (required)
* "ambilightName": Name of switch for Ambilight (optional)
* "effectName": Name of switch for Effect (optional)
* "host": The hostname or ip of the machine running Hyperion (required)
* "port": The port that Hyperion is using (usually 19444) (required)

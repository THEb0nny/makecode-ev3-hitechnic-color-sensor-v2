const enum HTColorSensorV2Mode {
    All = 0,
    Color = 1,
    Rgb = 2,
    White = 3
}

const enum HTColorSensorV2Frequency {
    Sixty = 0,
    Fifty = 1
}

namespace sensors {

    /**
    * The new and totally redesigned HiTechnic Color Sensor Version 2 (V2) operates by using a single white LED (light-emitting diode) to illuminate the target and analyses the color components of the light reflected by the target's surface and calculates a Color Number that is returned to the program.
    * NOTE: The Color Sensor V2 must be configured to match the mains electricity frequency for your country details on how to configure the Color Sensor V2 can be found in the configuration tab on this page.
    */
    //% fixedInstances
    export class HiTechnicColorSensor extends sensors.internal.IICSensor {

        constructor(port: number) {
            super(port);
        }
        
        setMode(m: HTColorSensorV2Mode) {
            this._setMode(m);
        }

        _setMode(m: number) {
            let v = m | 0;
            this.mode = v;
            if (!this.isActive()) return;
            if (this.realmode != this.mode) {
                this.realmode = v;
                //setIICMode(this._port, this._deviceType(), v);
            }
        }

        getMode() {
            return <HTColorSensorV2Mode>this.mode;
        }

        _query() {
            this.transaction(1, [66], 5);
            if (this.mode == HTColorSensorV2Mode.All) {
                return [this.getBytes()[0], this.getBytes()[1], this.getBytes()[2], this.getBytes()[3], this.getBytes()[4]];
            } else if (this.mode == HTColorSensorV2Mode.Color) {
                return [this.getBytes()[0]];
            } else if (this.mode == HTColorSensorV2Mode.Rgb) {
                return [this.getBytes()[1], this.getBytes()[2], this.getBytes()[3]];
            } else if (this.mode == HTColorSensorV2Mode.White) {
                return [this.getBytes()[4]];
            }
            return [0];
        }

        _info() {
            if (HTColorSensorV2Mode.Color || HTColorSensorV2Mode.White) {
                return [this._query()[0].toString()];
            } else if (this.mode == HTColorSensorV2Mode.All || this.mode == HTColorSensorV2Mode.Rgb) {
                return this._query().map(number => number.toString());
            }
            return ["0"];
        }

        /**
         * Get array with all values from HiTechnic Color Sensor v2.
         * @param sensor the ht color sensor v2 port
         */
        //% block="**ht color sensor** $this|all"
        //% blockId=HTColorSensorV2GetAll
        //% parts="htcolorsensor"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=100 blockGap=12
        //% subcategory="HiTechnic"
        //% group="Color Sensor V2"
        getAll(): number[] {
            this.setMode(HTColorSensorV2Mode.All);
            this.poke();
            return this._query();
        }

        /**
         * Get color code from HiTechnic Color Sensor v2.
         * @param sensor the ht color sensor v2 port
         */
        //% block="**ht color sensor** $this|color"
        //% blockId=HTColorSensorV2GetColor
        //% parts="htcolorsensor"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=99 blockGap=12
        //% subcategory="HiTechnic"
        //% group="Color Sensor V2"
        getColor(): number {
            this.setMode(HTColorSensorV2Mode.Color);
            this.poke();
            return this._query()[0];
        }

        /**
         * Get array with RGB values from HiTechnic Color Sensor v2.
         * @param sensor the ht color sensor v2 port
         */
        //% block="**ht color sensor** $this|rgb"
        //% blockId=HTColorSensorV2GetRGB
        //% parts="htcolorsensor"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=98 blockGap=12
        //% subcategory="HiTechnic"
        //% group="Color Sensor V2"
        getRGB(): number[] {
            this.setMode(HTColorSensorV2Mode.Rgb);
            this.poke();
            return this._query();
        }

        /**
         * Get white from HiTechnic Color Sensor v2.
         * @param sensor the ht color sensor v2 port
         */
        //% block="**ht color sensor** $this|white"
        //% blockId=HTColorSensorV2GetWhite
        //% parts="htcolorsensor"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=97
        //% subcategory="HiTechnic"
        //% group="Color Sensor V2"
        getWhite(): number {
            this.setMode(HTColorSensorV2Mode.White);
            this.poke();
            return this._query()[0];
        }

        /**
         * Get array with HSVL values from HiTechnic Color Sensor v2.
         * @param sensor the ht color sensor v2 port
         */
        //% block="**ht color sensor** $this|hsvl"
        //% blockId=HTColorSensorV2GetHSVL
        //% parts="htcolorsensor"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=96
        //% subcategory="HiTechnic"
        //% group="Color Sensor V2"
        getHSVL(): number[] {
            // https://github.com/ofdl-robotics-tw/EV3-CLEV3R-Modules/blob/main/Mods/HTColorV2.bpm
            this.setMode(HTColorSensorV2Mode.Rgb);
            this.poke();
            const rgbArr = this._query();
            let r = rgbArr[0], g = rgbArr[1], b = rgbArr[2];

            // https://clev3r.ru/codesamples/
            // Color sensor V2 RGB Maxmium is 255
            let hue = 0, sat = 0, val = 0;
            
            let max = Math.max(r, g);
            max = Math.max(max, b);
            let min = Math.min(r, g);
            min = Math.min(min, b);
            let light = (max + min) / 5.12;
            val = max / 2.56;
            if (val == 0) {
                hue = -1;
                sat = -1;
            }

            r = r / max;
            g = g / max;
            b = b / max;
            max = Math.max(r, g);
            max = Math.max(max, b);
            min = Math.min(r, g);
            min = Math.min(min, b);
            sat = (max - min) * 100;
            if (sat == 0) hue = -1;

            r = (r - min) / (max - min);
            g = (g - min) / (max - min);
            b = (b - min) / (max - min);
            max = Math.max(r, g);
            max = Math.max(max, b);
            min = Math.min(r, g);
            min = Math.min(min, b);

            if (max == r) {
                hue = 0 + 60 + (g - b);
                if (hue < 0) hue += 360;
            } else if (max == g) {
                hue = 120 + 60 * (b - r);
            } else {
                hue = 240 + 60 * (r - g);
            }

            return [Math.round(hue), Math.round(sat), Math.round(val), Math.round(light)];
        }

        /**
         * Set the sensor to the selected frequency to HiTechnic Color Sensor v2. The Sensor is configured by default for locations with 60Hz electrical supplies so if you live in a country with a 60Hz electrical supply no configuration is necessary.
         * @param sensor the ht color sensor v2 port
         * @param sensor the ht color sensor v2 frequency
         */
        //% block="**ht color sensor** $this|set $freq|(Hz) frequency"
        //% blockId=HTColorSensorV2SetHz
        //% parts="htcolorsensor"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=89 blockGap=12
        //% subcategory="HiTechnic"
        //% blockHidden=true
        setHz(freq: HTColorSensorV2Frequency) {
            // https://github.com/ofdl-robotics-tw/EV3-CLEV3R-Modules/blob/main/Mods/HTColorV2.bpm
            //Sensor.WriteI2CRegister(port, 1, 65, 53) '50Hz
            //Sensor.WriteI2CRegister(port, 1, 65, 54) //60Hz
        }

        _IICId() {
            return 'HiTechncColorPD';
        }
    }

    //% whenUsed block="1" weight=95 fixedInstance jres=icons.port1
    export const htColor1 = new HiTechnicColorSensor(1);

    //% whenUsed block="2" weight=90 fixedInstance jres=icons.port2
    export const htColor2 = new HiTechnicColorSensor(2);

    //% whenUsed block="3" weight=90 fixedInstance jres=icons.port3
    export const htColor3 = new HiTechnicColorSensor(3);
    
    //% whenUsed block="4" weight=90 fixedInstance jres=icons.port4
    export const htColor4 = new HiTechnicColorSensor(4);
}
const enum HTColorSensorV2Mode {
    All = 0,
    Color = 1,
    Rgb = 2,
    White = 3
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
        //% weight=97 blockGap=12
        //% subcategory="HiTechnic"
        //% group="Color Sensor V2"
        getWhite(): number {
            this.setMode(HTColorSensorV2Mode.White);
            this.poke();
            return this._query()[0];
        }

        /**
         * Set the sensor to the selected frequency to HiTechnic Color Sensor v2. The Sensor is configured by default for locations with 60Hz electrical supplies so if you live in a country with a 60Hz electrical supply no configuration is necessary.
         * @param sensor the ht color sensor v2 port
         * @param sensor the ht color sensor v2 frequency
         */
        //% block="**ht color sensor** $this|set $freq|Hz frequency"
        //% blockId=HTColorSensorV2SetHz
        //% parts="htcolorsensor"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=89 blockGap=12
        //% subcategory="HiTechnic"
        //% blockHidden=true
        setHz(freq: HTColorSensorV2Frequency) {
            
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
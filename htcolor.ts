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

        _query() {
            this.transaction(1, [66], 5);
            return this.getBytes()[0];
        }

        _queryArr() {
            this.transaction(1, [66], 5);
            return [this.getBytes()[0], this.getBytes()[1], this.getBytes()[2], this.getBytes()[3], this.getBytes()[4]];
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
            this.poke();
            return this.getBytes()[0];
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
            this.poke();
            return [this.getBytes()[1], this.getBytes()[2], this.getBytes()[3]];
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
            this.poke();
            return this.getBytes()[4];
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
            this.poke();
            return [this.getBytes()[0], this.getBytes()[1], this.getBytes()[2], this.getBytes()[3], this.getBytes()[4]];
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
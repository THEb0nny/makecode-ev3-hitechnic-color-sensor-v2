namespace sensors {

    export class HiTechnicColorSensor extends sensors.internal.IICSensor {

        _query() {
            this.transaction(1, [66], 5);
            return 0;
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
        //% weight=100 blockGap=12
        //% subcategory="HiTechnic Sensors"
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
        //% subcategory="HiTechnic Sensors"
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
        //% subcategory="HiTechnic Sensors"
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
        //% weight=99 blockGap=12
        //% subcategory="HiTechnic Sensors"
        //% group="Color Sensor V2"
        getAll(): number[] {
            this.poke();
            return this.getBytes();
        }

        _IICId() {
            return 'HiTechncColorPD';
        }
    }

    export const htColor1 = new HiTechnicColorSensor(1);
    export const htColor2 = new HiTechnicColorSensor(2);
    export const htColor3 = new HiTechnicColorSensor(3);
    export const htColor4 = new HiTechnicColorSensor(4);
}
namespace sensors {

    export class HiTechnicColorSensor extends sensors.internal.IICSensor {

        _query() {
            return this.transaction(1, [66], 5);
        }

        /**
         * Get color code from HiTechnic Color Sensor v2.
         * @param sensor the ht color sensor v2 port
         */
        //% blockId=HTColorSensorV2GetColor block="**ht color sensor** $this|color"
        //% parts="colorsensor"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=100 blockGap=12
        //% subcategory="HiTechnic Sensors"
        //% group="Color Sensor V2"
        getColor() {
            this.poke();
            return this.getBytes()[0];
        }

        /**
         * Get array with RGB values from HiTechnic Color Sensor v2.
         * @param sensor the ht color sensor v2 port
         */
        //% blockId=HTColorSensorV2GetRGB block="on **ht color sensor** $this|rgb"
        //% parts="colorsensor"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=100 blockGap=12
        //% subcategory="HiTechnic Sensors"
        //% group="Color Sensor V2"
        getRGB() {
            this.poke();
            return [this.getBytes()[1], this.getBytes()[2], this.getBytes()[3]];
        }

        /**
         * Get white from HiTechnic Color Sensor v2.
         * @param sensor the ht color sensor v2 port
         */
        //% blockId=HTColorSensorV2GetWhite block="on **ht color sensor** $this|white"
        //% parts="colorsensor"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=100 blockGap=12
        //% subcategory="HiTechnic Sensors"
        //% group="Color Sensor V2"
        getWhite() {
            this.poke();
            return this.getBytes()[4];
        }

        /**
         * Get all values from HiTechnic Color Sensor v2.
         * @param sensor the ht color sensor v2 port
         */
        //% blockId=HTColorSensorV2GetAll block="on **ht color sensor** $this|all"
        //% parts="colorsensor"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=100 blockGap=12
        //% subcategory="HiTechnic Sensors"
        //% group="Color Sensor V2"
        getAll() {
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
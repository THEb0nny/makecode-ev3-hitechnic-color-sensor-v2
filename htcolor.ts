namespace sensors {

    export class HiTechnicColorSensor extends sensors.internal.IICSensor {

        _query() {
            return this.transaction(1, [66], 5);
        }

        /**
         * Get color code from HiTechnic Color Sensor v2.
         * @param sensor the ht color sensor v2 port
         */
        //% blockId=HTColorSensorV2GetColor block="on **ht color sensor** $this"
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
         * Get array with RGB values ht color sensor.
         */
        //% block
        getRGB() {
            this.poke();
            return [this.getBytes()[1], this.getBytes()[2], this.getBytes()[3]];
        }

        /**
         * Get white from ht color sensor.
         */
        //% block
        getWhite() {
            this.poke();
            return this.getBytes()[4];
        }

        /**
         * Get all values from ht color sensor.
         */
        //% block
        getAll() {
            this.poke();
            return this.getBytes();
        }

        _IICId() {
            return 'HiTechncColorPD';
        }
    }

    export const hitechnicColor1 = new HiTechnicColorSensor(1);
    export const hitechnicColor2 = new HiTechnicColorSensor(2);
    export const hitechnicColor3 = new HiTechnicColorSensor(3);
    export const hitechnicColor4 = new HiTechnicColorSensor(4);
}
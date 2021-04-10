namespace sensors {

    export class HiTechnicColorSensor extends sensors.internal.IICSensor {

        _query() {
            this.poke()
            this.transaction(1, [66], 9)
            return 0
        }

        getColor() {
            return this.getBytes()[0]
        }

        getRGB() {
            return [this.getBytes()[1], this.getBytes()[2], this.getBytes()[3]]
        }

        getWhite() {
            return this.getBytes()[4]
        }

        getAll() {
            return this.getBytes()
        }

        _IICId() {
            return 'HiTechncColorPD'
        }
    }

    export const hitechnicColor1 = new HiTechnicColorSensor(1)
    export const hitechnicColor2 = new HiTechnicColorSensor(2)
    export const hitechnicColor3 = new HiTechnicColorSensor(3)
    export const hitechnicColor4 = new HiTechnicColorSensor(4)
}

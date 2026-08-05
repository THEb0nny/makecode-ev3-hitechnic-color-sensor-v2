const enum HTColorSensor2Mode {
    Active = 0, // Standard mode with backlight on
    PassiveRaw = 1, // Disable ambient light cancellation
    ActiveRaw = 3 // Raw data from the ambient light sensor with the backlight on
}

const enum HTColorSensor2SoftMode {
    ActiveAll = 0,
    ActiveColor = 1,
    ActiveRgbw = 2,
    ActiveColorIdxNum = 3,
    ActiveNormRgb = 4,
    PassiveRawRgbw = 5,
    ActiveRawRgbw = 6
}

const enum HTColorSensor2FreqMode {
    //% block="50"
    Freq50 = 53, // Set sensor to 50Hz cancellation mode // 0x35
    //% block="60"
    Freq60 = 54 // Set sensor to 60Hz cancellation mode // 0x36
}

namespace sensors {

    // https://web.archive.org/web/20240316155720/https://modernroboticsinc.com/product/hitechnic-nxt-color-sensor-v2/
    // https://web.archive.org/web/20170413234343/http://botbench.com/driversuite/hitechnic-colour-v2_8h_source.html
    // https://github.com/ofdl-robotics-tw/EV3-CLEV3R-Modules/blob/main/Mods/HTColorV2.bpm
    // https://github.com/salavater/Clev3r-HTColor
    // https://www.youtube.com/watch?v=-QG2p6HcAT0
    // https://picaxe.com/circuit-creator/sensors/lego-nxt-rgb-color-sensor-v2/

    const SEND_REGISTER = 65; // 0x41
    const READ_REGISTER = 66; // 0x42
    const MODE_SWITCH_DELAY = 100;

    const ACTIVE_READ_LENGTH = 9;
    const RAW_READ_LENGTH = 8;

    /**
    * The new and totally redesigned HiTechnic Color Sensor V2 operates by using a single white LED to illuminate the target and analyses the color components of the light reflected by the target's surface and calculates a Color Number that is returned.
    * NOTE: The Color Sensor V2 must be configured to match the mains electricity frequency for your country details on how to configure the Color Sensor V2 can be found in the configuration tab on this page.
    */
    //% fixedInstances
    export class HiTechnicColorSensor2 extends internal.I2cSensor {

        _readBytes: number = 9; // How many bytes to read

        constructor(port: number) {
            super(port);
            this.setMode(HTColorSensor2SoftMode.ActiveAll);
        }

        _deviceType() {
            return DAL.DEVICE_TYPE_NXT_IIC;
        }
        
        setMode(m: HTColorSensor2SoftMode) {
            // Override I2cSensor mode switching because this sensor uses I2C commands instead of EV3 UART/I2C modes
            let v = m | 0;
            this.mode = v;
            if (!this.isActive()) return;
            if (this.realMode != this.mode) {
                this.realMode = v;
                if (m == HTColorSensor2SoftMode.ActiveAll ||
                    m == HTColorSensor2SoftMode.ActiveColor ||
                    m == HTColorSensor2SoftMode.ActiveRgbw ||
                    m == HTColorSensor2SoftMode.ActiveColorIdxNum ||
                    m == HTColorSensor2SoftMode.ActiveNormRgb) {
                    this.transaction(1, [SEND_REGISTER, HTColorSensor2Mode.Active], 0);
                    this._readBytes = ACTIVE_READ_LENGTH;
                } else if (m == HTColorSensor2SoftMode.PassiveRawRgbw) {
                    this.transaction(1, [SEND_REGISTER, HTColorSensor2Mode.PassiveRaw], 0);
                    this._readBytes = RAW_READ_LENGTH;
                } else if (m == HTColorSensor2SoftMode.ActiveRawRgbw) {
                    this.transaction(1, [SEND_REGISTER, HTColorSensor2Mode.ActiveRaw], 0);
                    this._readBytes = RAW_READ_LENGTH;
                }
                pause(MODE_SWITCH_DELAY);
            }
        }

        _query() {
            this.transaction(1, [READ_REGISTER], this._readBytes);
            const bytes = this.getBytes();
            if (this.mode == HTColorSensor2SoftMode.ActiveAll) {
                // return [bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8]];
                return bytes.toArray(NumberFormat.UInt8LE); // Return all 9 bytes
            } else if (this.mode == HTColorSensor2SoftMode.ActiveColor) {
                return [bytes[0]];
            } else if (this.mode == HTColorSensor2SoftMode.ActiveRgbw) {
                // return [bytes[1], bytes[2], bytes[3], bytes[4]];
                return bytes.slice(1, 4).toArray(NumberFormat.UInt8LE);
            } else if (this.mode == HTColorSensor2SoftMode.ActiveColorIdxNum) {
                return [bytes[5]];
            } else if (this.mode == HTColorSensor2SoftMode.ActiveNormRgb) {
                // return [bytes[6], bytes[7], bytes[8]];
                return bytes.slice(6, 3).toArray(NumberFormat.UInt8LE);
            } else if (this.mode == HTColorSensor2SoftMode.PassiveRawRgbw || this.mode == HTColorSensor2SoftMode.ActiveRawRgbw) {
                return [
                    bytes[0] * 256 + bytes[1],
                    bytes[2] * 256 + bytes[3],
                    bytes[4] * 256 + bytes[5],
                    bytes[6] * 256 + bytes[7]
                ];
            }
            return [0];
        }

        _info() {
            if (this.mode == HTColorSensor2SoftMode.ActiveColor ||
                this.mode == HTColorSensor2SoftMode.ActiveColorIdxNum) {
                return [this._query()[0].toString()];
            }
            return this._query().map(number => number.toString());
        }

        // Приватный метод для вычисления HSVL из RGB значений датчика
        private _rgbToHsvl(rgb: number[]): number[] {
            let r = rgb[0], g = rgb[1], b = rgb[2];

            // https://clev3r.ru/codesamples/
            // Color sensor V2 RGB Maxmium is 255
            let hue = 0, sat = 0, val = 0, light = 0;

            let rgb_max = Math.max(Math.max(r, g), b);
            let rgb_min = Math.min(Math.min(r, g), b);

            light = (rgb_max + rgb_min) / 5.12;
            val = rgb_max / 2.56;

            if (val == 0) { // It's black, there's no way to tell hue and sat // val == 0 || rgb_max == 0
                hue = -1;
                sat = -1;
            }

            if (hue != -1 && sat != -1) {
                r = r / rgb_max;
                g = g / rgb_max;
                b = b / rgb_max;

                rgb_max = Math.max(Math.max(r, g), b);
                rgb_min = Math.min(Math.min(r, g), b);

                sat = (rgb_max - rgb_min) * 100;

                if (sat == 0) {
                    hue = -1;
                }

                if (hue != -1) { // It's white, there's no way to tell hue
                    r = (r - rgb_min) / (rgb_max - rgb_min);
                    g = (g - rgb_min) / (rgb_max - rgb_min);
                    b = (b - rgb_min) / (rgb_max - rgb_min);

                    rgb_max = Math.max(Math.max(r, g), b);
                    rgb_min = Math.min(Math.min(r, g), b);

                    if (rgb_max == r) {
                        hue = 0 + 60 * (g - b);
                        if (hue < 0) hue += 360;
                    } else if (rgb_max == g) {
                        hue = 120 + 60 * (b - r);
                    } else {
                        hue = 240 + 60 * (r - g);
                    }
                }
            }
            return [Math.round(hue), Math.round(sat), Math.round(val), Math.round(light)];
        }

        /**
         * Get software mode to HiTechnic Color Sensor v2.
         * @param sensor the ht color sensor v2 port
         */
        //% help=github:makecode-ev3-hitechnic-color-sensor-v2/docs/mode
        //% block="**ht color sensor** $this|get mode"
        //% block.loc.ru="**ht датчик цвета** $this|режим"
        //% blockId=HTCS2GetMode
        //% parts="htcolorsensor2"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=99
        //% subcategory="HiTechnic"
        //% blockHidden=true
        getMode() {
            return <HTColorSensor2SoftMode>this.mode;
        }

        /**
         * Set the sensor to the selected frequency to HiTechnic Color Sensor v2. The Sensor is configured by default for locations with 60Hz electrical supplies.
         * @param sensor the ht color sensor v2 port
         * @param freq the ht color sensor v2 frequency
         */
        //% help=github:makecode-ev3-hitechnic-color-sensor-v2/docs/frequency
        //% block="**ht color sensor** $this|set $freq|(Hz) frequency"
        //% block.loc.ru="**ht датчик цвета** $this|установить частоту $freq|(Гц)"
        //% blockId=HTCS2SetHz
        //% parts="htcolorsensor2"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=98 blockGap=12
        //% subcategory="HiTechnic"
        //% group="Color Sensor V2"
        setHz(freq: HTColorSensor2FreqMode) {
            // https://github.com/ofdl-robotics-tw/EV3-CLEV3R-Modules/blob/main/Mods/HTColorV2.bpm
            this.transaction(1, [SEND_REGISTER, freq], 0);
            pause(MODE_SWITCH_DELAY);
        }

        /**
         * Get array with color, red, green, blue, white values from HiTechnic Color Sensor v2 at standart active mode.
         * @param sensor the ht color sensor v2 port
         */
        //% help=github:makecode-ev3-hitechnic-color-sensor-v2/docs/active-all
        //% block="**ht color sensor** $this|all values at active"
        //% block.loc.ru="**ht датчик цвета** $this|все значения с подсветкой"
        //% blockId=HTCS2GetActiveAll
        //% parts="htcolorsensor2"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=89 blockGap=12
        //% subcategory="HiTechnic"
        //% group="Color Sensor V2"
        getActiveAll(): number[] {
            this.setMode(HTColorSensor2SoftMode.ActiveAll);
            this.poke();
            return this._query();
        }

        /**
         * Get color code from HiTechnic Color Sensor v2 at standart active mode.
         * @param sensor the ht color sensor v2 port
         */
        //% help=github:makecode-ev3-hitechnic-color-sensor-v2/docs/active-color
        //% block="**ht color sensor** $this|color at active"
        //% block.loc.ru="**ht датчик цвета** $this|цвет с подсветкой"
        //% blockId=HTCS2GetActiveColor
        //% parts="htcolorsensor2"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=88 blockGap=12
        //% subcategory="HiTechnic"
        //% group="Color Sensor V2"
        getActiveColor(): number {
            this.setMode(HTColorSensor2SoftMode.ActiveColor);
            this.poke();
            return this._query()[0];
        }

        /**
         * Get array with RGBW values from HiTechnic Color Sensor v2 at standart active mode.
         * @param sensor the ht color sensor v2 port
         */
        //% help=github:makecode-ev3-hitechnic-color-sensor-v2/docs/active-rgbw
        //% block="**ht color sensor** $this|RGBW at active"
        //% block.loc.ru="**ht датчик цвета** $this|RGBW с подсветкой"
        //% blockId=HTCS2GetActiveRGBW
        //% parts="htcolorsensor2"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=87 blockGap=12
        //% subcategory="HiTechnic"
        //% group="Color Sensor V2"
        getActiveRGBW(): number[] {
            this.setMode(HTColorSensor2SoftMode.ActiveRgbw);
            this.poke();
            return this._query();
        }

        /**
         * Get 6-bit color index number (0-63) from HiTechnic Color Sensor v2.
         * Bits 5-4: Red, Bits 3-2: Green, Bits 1-0: Blue.
         * @param sensor the ht color sensor v2 port
         */
        //% help=github:makecode-ev3-hitechnic-color-sensor-v2/docs/color-index
        //% block="**ht color sensor** $this|color index"
        //% block.loc.ru="**ht датчик цвета** $this|индекс цвета (6 бит)"
        //% blockId=HTCS2GetColorIndex
        //% parts="htcolorsensor2"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=86 blockGap=12
        //% subcategory="HiTechnic"
        //% group="Color Sensor V2"
        getColorIndex(): number {
            // https://share.google/aimode/BgJq5fdf9TAafeNWg
            this.setMode(HTColorSensor2SoftMode.ActiveColorIdxNum);
            this.poke();
            return this._query()[0];
        }

        /**
         * Get array with RGB normalize values from HiTechnic Color Sensor v2 at standart active mode.
         * @param sensor the ht color sensor v2 port
         */
        //% help=github:makecode-ev3-hitechnic-color-sensor-v2/docs/active-norm-rgb
        //% block="**ht color sensor** $this|norm RGB at active"
        //% block.loc.ru="**ht датчик цвета** $this|нормализованные RGB с подсветкой"
        //% blockId=HTCS2GetActiveNormRGB
        //% parts="htcolorsensor2"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=85 blockGap=12
        //% subcategory="HiTechnic"
        //% group="Color Sensor V2"
        getActiveNormRGB(): number[] {
            this.setMode(HTColorSensor2SoftMode.ActiveNormRgb);
            this.poke();
            return this._query();
        }

        /**
         * Get array with HSVL values from HiTechnic Color Sensor v2 when the backlight is on.
         * @param sensor the ht color sensor v2 port
         */
        //% help=github:makecode-ev3-hitechnic-color-sensor-v2/docs/active-hsvl
        //% block="**ht color sensor** $this|HSVL at active"
        //% block.loc.ru="**ht датчик цвета** $this|HSVL с подсветкой"
        //% blockId=HTCS2GetActiveHSVL
        //% parts="htcolorsensor2"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=84
        //% subcategory="HiTechnic"
        //% group="Color Sensor V2"
        getActiveHSVL(): number[] {
            // https://github.com/botbench/robotcdriversuite/blob/master/include/common-light.h
            // https://github.com/ofdl-robotics-tw/EV3-CLEV3R-Modules/blob/main/Mods/HTColorV2.bpm
            this.setMode(HTColorSensor2SoftMode.ActiveRgbw);
            this.poke();
            const rgbw = this._query();
            return this._rgbToHsvl(rgbw);
        }

        /**
         * Get RGBW + HSVL values from HiTechnic Color Sensor v2 at active mode.
         */
        //% help=github:makecode-ev3-hitechnic-color-sensor-v2/docs/active-rgbw-hsvl
        //% block="**ht color sensor** $this|RGBW + HSVL at active"
        //% block.loc.ru="**ht датчик цвета** $this|RGBW + HSVL с подсветкой"
        //% blockId=HTCS2GetActiveRGBWHSVL
        //% parts="htcolorsensor2"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=83 blockGap=12
        //% subcategory="HiTechnic"
        //% group="Color Sensor V2"
        getActiveRGBWHSVL(): number[][] {
            this.setMode(HTColorSensor2SoftMode.ActiveRgbw);
            this.poke();
            const rgbw = this._query();
            const hsvl = this._rgbToHsvl(rgbw);
            return [rgbw, hsvl];
        }

        /**
         * Get normalize RGB + HSVL values from HiTechnic Color Sensor v2 at active mode.
         */
        //% block="**ht color sensor** $this|norm RGB + HSVL at active"
        //% block.loc.ru="**ht датчик цвета** $this|нормализованный RGB + HSVL с подсветкой"
        //% blockId=HTCS2GetActiveNormRGBHSVL
        //% parts="htcolorsensor2"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=82 blockGap=12
        //% subcategory="HiTechnic"
        //% group="Color Sensor V2"
        getActiveNormRGBHSVL(): number[][] {
            this.setMode(HTColorSensor2SoftMode.ActiveNormRgb);
            this.poke();
            const rgb = this._query();
            const hsvl = this._rgbToHsvl(rgb);
            return [rgb, hsvl];
        }

        /**
         * Get array with RGBW values from HiTechnic Color Sensor v2 when the backlight is off.
         * @param sensor the ht color sensor v2 port
         */
        //% help=github:makecode-ev3-hitechnic-color-sensor-v2/docs/passive-raw-rgbw
        //% block="**ht color sensor** $this|raw RGBW at passive"
        //% block.loc.ru="**ht датчик цвета** $this|сырые RGBW без подсветки"
        //% blockId=HTCS2GetPassiveRawRGBW
        //% parts="htcolorsensor2"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=79 blockGap=12
        //% subcategory="HiTechnic"
        //% group="Color Sensor V2"
        getPassiveRawRGBW(): number[] {
            this.setMode(HTColorSensor2SoftMode.PassiveRawRgbw);
            this.poke();
            return this._query();
        }

        /**
         * Get array with raw RGBW values from HiTechnic Color Sensor v2 when the backlight is on.
         * @param sensor the ht color sensor v2 port
         */
        //% help=github:makecode-ev3-hitechnic-color-sensor-v2/docs/active-raw-rgbw
        //% block="**ht color sensor** $this|raw RGBW at active"
        //% block.loc.ru="**ht датчик цвета** $this|сырые RGBW с подсветкой"
        //% blockId=HTCS2GetActiveRawRGBW
        //% parts="htcolorsensor2"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=69
        //% subcategory="HiTechnic"
        //% group="Color Sensor V2"
        getActiveRawRGBW(): number[] {
            this.setMode(HTColorSensor2SoftMode.ActiveRawRgbw);
            this.poke();
            return this._query();
        }

        /**
         * Get raw RGBW + HSVL values from HiTechnic Color Sensor v2 at active mode.
         */
        //% block="**ht color sensor** $this|raw RGBW + HSVL at active"
        //% block.loc.ru="**ht датчик цвета** $this|raw RGBW + HSVL с подсветкой"
        //% blockId=HTCS2GetActiveRawRGBWHSVL
        //% parts="htcolorsensor2"
        //% blockNamespace=sensors
        //% this.fieldEditor="ports"
        //% weight=68 blockGap=12
        //% subcategory="HiTechnic"
        //% group="Color Sensor V2"
        getActiveRawRGBWHSVL(): number[][] {
            this.setMode(HTColorSensor2SoftMode.ActiveRawRgbw);
            this.poke();
            const rgbw = this._query();
            const hsvl = this._rgbToHsvl(rgbw);
            return [rgbw, hsvl];
        }

        _IICId() {
            return 'HiTechncColorPD';
        }
    }

    //% whenUsed block="1" weight=95 fixedInstance jres=icons.port1
    export const htColor1 = new HiTechnicColorSensor2(1);

    //% whenUsed block="2" weight=90 fixedInstance jres=icons.port2
    export const htColor2 = new HiTechnicColorSensor2(2);

    //% whenUsed block="3" weight=90 fixedInstance jres=icons.port3
    export const htColor3 = new HiTechnicColorSensor2(3);
    
    //% whenUsed block="4" weight=90 fixedInstance jres=icons.port4
    export const htColor4 = new HiTechnicColorSensor2(4);
}
// Максимальные значения RGB (на белом цвете) для нормализации датчика определения цвета
let lColorSensorRgbMax: number[] = [0, 0, 0];
let rColorSensorRgbMax: number[] = [0, 0, 0];

// Перевод RGB в HSV
function RgbToHsv(sensorColorRGB: number[], sensorRgbMax: number[]): number[] {
    const maxRange = 255;  // Диапазон от 0 .. maxRange
    /*
    for (let i = 0; i < 3; i++) { // Нормализация значений, для hitechnic не требуется!
        sensorColorRGB[i] = Math.round((sensorColorRGB[i] / sensorRgbMax[i]) * maxRange);
        if (sensorColorRGB[i] > maxRange) sensorColorRGB[i] = maxRange;
        else if (sensorColorRGB[i] < 0) sensorColorRGB[i] = 0;
    }
    */
    let W = sensorColorRGB[0] + sensorColorRGB[1] + sensorColorRGB[2];
    brick.showValue("W", W, 4);
    if (W > 5) { // Фикс прыжков значений датчика, который направлен в пространство
        let max = Math.max(sensorColorRGB[0], Math.max(sensorColorRGB[1], sensorColorRGB[2]));
        let min = Math.min(sensorColorRGB[0], Math.min(sensorColorRGB[1], sensorColorRGB[2]));
        let V = max, H = 0;
        let S = (max == 0 ? 0 : Math.round((1 - (min / max)) * 100));
        if (max == min) H = 0;
        else if (max == sensorColorRGB[0])
            if (sensorColorRGB[1] >= sensorColorRGB[2]) H = Math.round(60 * (sensorColorRGB[1] - sensorColorRGB[2]) / (max - min));
            else H = Math.round(60 * (sensorColorRGB[1] - sensorColorRGB[2]) / (max - min) + 360);
        else if (max == sensorColorRGB[1]) H = Math.round(60 * (sensorColorRGB[2] - sensorColorRGB[0]) / (max - min) + 120);
        else H = Math.round(60 * (sensorColorRGB[0] - sensorColorRGB[1]) / (max - min) + 240);
        brick.showValue("H", H, 5);
        brick.showValue("S", S, 6);
        brick.showValue("V", V, 7);
        return [H, S, V];
    } else {
        return [0, 0, 0];
    }
}

// Получить из HSV цветовой код
function HsvToColor(hsv: number[]): number {
    let H = hsv[0], S = hsv[1], V = hsv[2];
    if (S > 50) { // Граница цветности
        if (H < 25) return 5; // Red
        else if (H < 100) return 4; // Yellow
        else if (H < 180) return 3; // Green
        else if (H < 250) return 2; // Blue
        else if (H < 360) return 5; // Red
        else return -1; // Error 
    } else if (V > 120) return 6; // White
    else if (V < 60 && V > 5 && S < 50) return 1; // Black
    else return 0;
}

// Поиск максимальных значений RGB для конвертации, чтобы записать максимальные значения RGB
function SearchSensorRgbMax(colorSensor: sensors.HiTechnicColorSensor, sensorRgbMax: number[]): number[] {
    let rgbMax: number[] = sensorRgbMax;
    let btnPressed = 0;
    while (btnPressed < 2) {
        let colorRgb = colorSensor.getRGB();
        if (brick.buttonEnter.wasPressed()) { btnPressed++; pause(500); }
        brick.clearScreen();
        if (btnPressed == 0) {
            brick.showValue("R", colorRgb[0], 1); brick.showValue("G", colorRgb[1], 2); brick.showValue("B", colorRgb[2], 3);
        } else if (btnPressed == 1) {
            rgbMax[0] = Math.max(colorRgb[0], rgbMax[0]);
            rgbMax[1] = Math.max(colorRgb[1], rgbMax[1]);
            rgbMax[2] = Math.max(colorRgb[2], rgbMax[2]);
            brick.showValue("R_max", rgbMax[0], 1); brick.showValue("G_max", rgbMax[1], 2); brick.showValue("B_max", rgbMax[2], 3);
        }
        pause(10);
    }
    return rgbMax;
}

// Тестирование перевода из RGB в HSV и получение цвета
function TestRGBToHSVToColor(colorSensor: sensors.HiTechnicColorSensor) {
    lColorSensorRgbMax = SearchSensorRgbMax(colorSensor, lColorSensorRgbMax);
    while (true) {
        let colorRgb = colorSensor.getRGB();
        brick.clearScreen();
        brick.showValue("R", colorRgb[0], 1); brick.showValue("G", colorRgb[1], 2); brick.showValue("B", colorRgb[2], 3); brick.showValue("W", colorRgb[0] + colorRgb[1] + colorRgb[2], 4);
        let hsv = RgbToHsv(colorRgb, lColorSensorRgbMax);
        let currentColor = HsvToColor(hsv);
        brick.showValue("color", currentColor, 8);
        pause(10);
    }
}

function Main() {
    TestRGBToHSVToColor(sensors.hitechnicColor1);
    while (true) {
        brick.clearScreen();
        brick.showValue("Color", sensors.hitechnicColor1.getColor(), 2);
        brick.showValue("R", sensors.hitechnicColor1.getRGB()[0], 3);
        brick.showValue("G", sensors.hitechnicColor1.getRGB()[1], 4);
        brick.showValue("B", sensors.hitechnicColor1.getRGB()[2], 5);
        brick.showValue("W", sensors.hitechnicColor1.getWhite(), 6);
        brick.showValue("Color", sensors.hitechnicColor4.getColor(), 8);
        brick.showValue("R", sensors.hitechnicColor4.getRGB()[0], 9);
        brick.showValue("G", sensors.hitechnicColor4.getRGB()[1], 10);
        brick.showValue("B", sensors.hitechnicColor4.getRGB()[2], 11);
        brick.showValue("W", sensors.hitechnicColor4.getWhite(), 12);
        brick.showValue("Raw", sensors.color2.reflectedLightRaw(), 14);
        loops.pause(50);
    }
}
Main();
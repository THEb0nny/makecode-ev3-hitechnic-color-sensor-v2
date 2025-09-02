# All values

Get all values from the sensor: color, r, g, b, white, color index number, normalized red, normalized green, normalized blue.

```sig
sensors.htColor1.getActiveAll()
```

The return value is an array with the values color, red, green, blue, white. Color is the color number from the color table, which was determined by the manufacturer. The color value can be from 0 to 17 inclusive, where 0 is black and 17 is white. The color components red, green, blue give values from 0 to 255. White gives a white reflectance value also from 0 to 255. After this comes the color index number. This is a single 00274 * 6 bit number color index. Bits 5 and 4 encode the red signal level, 00275 * bits 3 and 2 encode the green signal level and bits 1 and 0 encode 00276 * the blue signal levels. The next 3 normalized values ​​are red, green, blue.

## Returns

* a [array](/types/array) returns us the color value at index `0`, index `1` - red, index `2` - blue, index `3` - green, index `4` - white, index `5` - color index number, index `6` - normalized red value, index `7` - normalized green value, index `7` - normalized blue value.

## Example

Display the values of the ``color``, ``red``, ``green``, ``blue`` and ``white`` components.

```blocks
forever(function () {
    brick.clearScreen();
    brick.showValue("C", sensors.htColor1.getActiveAll()[0], 1);
    brick.showValue("R", sensors.htColor1.getActiveAll()[1], 2);
    brick.showValue("G", sensors.htColor1.getActiveAll()[2], 3);
    brick.showValue("B", sensors.htColor1.getActiveAll()[3], 4);
    brick.showValue("W", sensors.htColor1.getActiveAll()[4], 5);
    pause(100);
})
```

## See also

[active all](/docs/reference/sensors/ht-color-sensor-v2/active-all),
[active color](/docs/reference/sensors/ht-color-sensor-v2/active-color),
[active rgbw](/docs/reference/sensors/ht-color-sensor-v2/active-rgbw),
[passive raw rgbw](/docs/reference/sensors/ht-color-sensor-v2/passive-raw-rgbw),
[active raw rgbw](/docs/reference/sensors/ht-color-sensor-v2/active-raw-rgbw)

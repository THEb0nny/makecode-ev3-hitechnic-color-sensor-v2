# All values

Get all values from the sensor: color, r, g, b, white.

```sig
sensors.htColor1.getAll()
```

The return value is an array with the values color, red, green, blue, white. Color is the color number from the color table, which was determined by the manufacturer. The color value can be from 0 to 17 inclusive, where 0 is black and 17 is white. The color components red, green, blue give values from 0 to 255. They are already normalized. White gives a white reflectance value also from 0 to 255.

## Returns

* a [array](/types/array) returns us the color value at index `0`, index `1` - red, index `2` - blue, index `3` - green, index `4` - white.

## Example

Display the values of the ``color``, ``red``, ``green``, ``blue`` and ``white`` components.

```blocks
forever(function () {
    brick.clearScreen();
    brick.showValue("C", sensors.htColor1.getAll()[0], 1);
    brick.showValue("R", sensors.htColor1.getAll()[1], 2);
    brick.showValue("G", sensors.htColor1.getAll()[2], 3);
    brick.showValue("B", sensors.htColor1.getAll()[3], 4);
    brick.showValue("W", sensors.htColor1.getAll()[4], 5);
    pause(100);
})
```

## See also

[color](/reference/sensors/ht-color-sensor-v2/color)
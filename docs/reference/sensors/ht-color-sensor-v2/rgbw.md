# RGBW value

Get values from the sensor: r, g, b, white.

```sig
sensors.htColor1.getRGBW()
```

The return value is an array with the values red, green, blue, white. The color components red, green, blue give values from 0 to 255. They are already normalized. White gives a white reflectance value also from 0 to 255.

## Returns

* a [array](/types/array) returns us the red value at index `0`, index `1` - green, index `2` - blue, index `3` - white.

## Example

Display the values of the ``red``, ``green``, ``blue`` and ``white`` components.

```blocks
forever(function () {
    brick.clearScreen();
    brick.showValue("R", sensors.htColor1.getRGBW()[0], 1);
    brick.showValue("G", sensors.htColor1.getRGBW()[1], 2);
    brick.showValue("B", sensors.htColor1.getRGBW()[2], 3);
    brick.showValue("W", sensors.htColor1.getRGBW()[3], 4);
    pause(100);
})
```

## See slso

[all](/docs/reference/sensors/ht-color-sensor-v2/all),
[raw rgbw](/reference/sensors/ht-color-sensor-v2/raw-rgbw),
[passive rgbw](/reference/sensors/ht-color-sensor-v2/passive-rgbw),
[hsvl](/reference/sensors/ht-color-sensor-v2/hsvl)
# Passive RGBW value

Get values from the sensor: r, g, b, white when the backlight is off.

```sig
sensors.htColor1.getPassiveRGBW()
```

The return value is an array with the values red, green, blue, white when the backlight is off. The color components red, green, blue give values from 0 to 255. They are already normalized.

## Returns

* a [array](/types/array) returns us the value when the backlight is off, where by index `0` - red, index `1` - green, index `2` - blue, index `3` - white.

## Example

Display the raw values of the ``red``, ``green``, ``blue`` and ``white`` components.

```blocks
forever(function () {
    brick.clearScreen();
    brick.showValue("R", sensors.htColor1.getPassiveRGBW()[0], 1);
    brick.showValue("G", sensors.htColor1.getPassiveRGBW()[1], 2);
    brick.showValue("B", sensors.htColor1.getPassiveRGBW()[2], 3);
    brick.showValue("W", sensors.htColor1.getPassiveRGBW()[3], 4);
    pause(100);
})
```

## See also

[all](/docs/reference/sensors/ht-color-sensor-v2/all),
[rgbw](/docs/reference/sensors/ht-color-sensor-v2/color),
[raw rgbw](/docs/reference/sensors/ht-color-sensor-v2/raw-rgbw)

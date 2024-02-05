# RGBW RAW value

Get raw values from the sensor: r, g, b, white.

```sig
sensors.htColor1.getRawRGBW()
```

The return raw value is an array with the values red, green, blue, white. The color components red, green, blue give values from.

## Returns

* a [array](/types/array) returns us the red raw value at index `0`, index `1` - green, index `2` - blue, index `3` - white.

## Example

Display the raw values of the ``red``, ``green``, ``blue`` and ``white`` components.

```blocks
forever(function () {
    brick.clearScreen();
    brick.showValue("R", sensors.htColor1.getRawRGBW()[0], 1);
    brick.showValue("G", sensors.htColor1.getRawRGBW()[1], 2);
    brick.showValue("B", sensors.htColor1.getRawRGBW()[2], 3);
    brick.showValue("W", sensors.htColor1.getRawRGBW()[3], 4);
    pause(100);
})
```

## See slso

[all](/docs/reference/sensors/ht-color-sensor-v2/all),
[rgbw](/docs/reference/sensors/ht-color-sensor-v2/color),
[passive rgbw](/docs/reference/sensors/ht-color-sensor-v2/passive-rgbw)
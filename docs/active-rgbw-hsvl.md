# Active RGBW + HSVL value

Get arrays from the sensor: r, g, b, white and h, s, v, l.

```sig
sensors.htColor1.getActiveRawRGBWHSVL()
```

The return value is an first array with the values red, green, blue, white. The color components red, green, blue give values. White gives a white reflectance value. The second array returns hue, saturation, value, light.

## Returns

* a first [array](/types/array) returns us the red value at index `0`, index `1` - green, index `2` - blue, index `3` - white.
* a second [array](/types/array) returns us the hue value at index `0`, index `1` - saturation, index `2` - value, index `3` - light.

## Example

Display the values of the ``red``, ``green``, ``blue``, ``white``, ``hue``, ``saturation``, ``value`` and ``light`` components.

```blocks
forever(function () {
    brick.clearScreen();
    brick.showValue("R", sensors.htColor1.getActiveRawRGBWHSVL()[0][0], 1);
    brick.showValue("G", sensors.htColor1.getActiveRawRGBWHSVL()[0][1], 2);
    brick.showValue("B", sensors.htColor1.getActiveRawRGBWHSVL()[0][2], 3);
    brick.showValue("W", sensors.htColor1.getActiveRawRGBWHSVL()[0][3], 4);
    brick.showValue("H", sensors.htColor1.getActiveRawRGBWHSVL()[1][0], 5);
    brick.showValue("S", sensors.htColor1.getActiveRawRGBWHSVL()[2][1], 6);
    brick.showValue("V", sensors.htColor1.getActiveRawRGBWHSVL()[3][2], 7);
    brick.showValue("L", sensors.htColor1.getActiveRawRGBWHSVL()[4][3], 8);
    pause(10);
})
```

## See slso

[active all](/docs/reference/sensors/ht-color-sensor-v2/active-all),
[active raw rgbw](/docs/reference/sensors/ht-color-sensor-v2/active-raw-rgbw),
[passive raw rgbw](/docs/reference/sensors/ht-color-sensor-v2/passive-raw-rgbw),
[active hsvl](/docs/reference/sensors/ht-color-sensor-v2/active-hsvl)

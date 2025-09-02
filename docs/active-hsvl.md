# RGBW value

Get array of HSVL values from RGBW mode.
```sig
sensors.htColor1.getHSVL()
```

An additional function that allows you to get an array of HSVL values from RGBW mode.

## Returns

* a [array](/types/array) returns the value hue - index `0`, saturation - index `1`, value - index `2`, light - index `3`.

## Example

Display the values of the ``hue``, ``saturation``, ``value`` and ``light`` components.

```blocks
forever(function () {
    brick.clearScreen();
    brick.showValue("H", sensors.htColor1.getHSVL()[0], 1);
    brick.showValue("S", sensors.htColor1.getHSVL()[1], 2);
    brick.showValue("V", sensors.htColor1.getHSVL()[2], 3);
    brick.showValue("L", sensors.htColor1.getHSVL()[3], 4);
    pause(100);
})
```

## See also

[all](/docs/reference/sensors/ht-color-sensor-v2/all),
[rgbw](/docs/reference/sensors/ht-color-sensor-v2/color)

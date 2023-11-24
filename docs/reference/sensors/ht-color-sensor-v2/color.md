# Color

Get the color number value.

```sig
sensors.htColor1.getColor()
```

The return value number color. Color is the color number from the color table, which was determined by the manufacturer. The color value can be from 0 to 17 inclusive, where 0 is black and 17 is white.

## Returns

* a [number](/types/number) returns us the color value at `0` - black, `1` - violet, `2` - blue, `3` - cyan, `4` - green, `5` - green, `6` - yellow, `7` - deep yellow, `8` - orange, `9` - red, `10` - hot pink, `11` - lilac, `12` - lilac, `13` - mint, `14` - , `15` - , `16` - , `17` - white.

## Example

Display the values of the ``color``, ``red``, ``green``, ``blue`` and ``white`` components.

```blocks
forever(function () {
    brick.clearScreen();
    brick.showValue("C", sensors.htColor1.getColor(), 1);
    pause(100);
})
```

## See slso

[all](/docs/reference/sensors/ht-color-sensor-v2/all)
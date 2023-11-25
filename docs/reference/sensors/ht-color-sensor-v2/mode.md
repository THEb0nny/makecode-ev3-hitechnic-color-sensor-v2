# Mode

Get current mode.

```sig
sensors.htColor1.getMode()
```

Returns the current mode number.

## Returns

* a [number](/types/number) returns us the current operating mode of the sensor.

## Example

The display shows the `number` of the sensor operating mode.

```blocks
brick.clearScreen();
brick.showValue("Mode", sensors.htColor1.getMode(), 1);
```

## See also

[frequency](/reference/sensors/ht-color-sensor-v2/frequency),
[mode](/reference/sensors/ht-color-sensor-v2/mode)
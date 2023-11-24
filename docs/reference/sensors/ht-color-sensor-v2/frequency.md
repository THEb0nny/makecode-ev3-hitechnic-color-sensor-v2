# Frequency

Set frequency 60 Hz or 50 Hz.

```sig
sensors.htColor1.setHz(HTCS2FreqMode.Freq60)
```

The Sensor is configured by default for locations with 60Hz electrical supplies. The method does not work stably. Requires testing and observation of behavior.

## Example

In this example the frequency is set to `50 Hz`.

```blocks
sensors.htColor1.setHz(HTCS2FreqMode.Freq50)
```

## See also

[mode](/docs/reference/sensors/ht-color-sensor-v2/mode)
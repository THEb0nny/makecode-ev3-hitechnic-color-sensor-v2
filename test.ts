forever(function () {
    brick.clearScreen()
    brick.showValue("Color", sensors.htColor4.getActiveColor(), 1)
    brick.showValue("R", sensors.htColor4.getActiveRGBW()[0], 2)
    brick.showValue("G", sensors.htColor4.getActiveRGBW()[1], 3)
    brick.showValue("B", sensors.htColor4.getActiveRGBW()[2], 4)
    brick.showValue("W", sensors.htColor4.getActiveRGBW()[3], 5)
    loops.pause(50)
})
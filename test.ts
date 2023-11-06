forever(function () {
    brick.clearScreen()
    brick.showValue("Color", sensors.htColor4.getColor(), 1)
    brick.showValue("R", sensors.htColor4.getRGBW()[0], 2)
    brick.showValue("G", sensors.htColor4.getRGBW()[1], 3)
    brick.showValue("B", sensors.htColor4.getRGBW()[2], 4)
    brick.showValue("W", sensors.htColor4.getRGBW()[3], 5)
    loops.pause(50)
})
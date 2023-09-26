forever(function() {
    brick.clearScreen();
    brick.showValue("Color", sensors.htColor4.getColor(), 1);
    brick.showValue("R", sensors.htColor4.getRGB()[0], 2);
    brick.showValue("G", sensors.htColor4.getRGB()[1], 3);
    brick.showValue("B", sensors.htColor4.getRGB()[2], 4);
    brick.showValue("W", sensors.htColor4.getWhite(), 5);
    loops.pause(50);
})
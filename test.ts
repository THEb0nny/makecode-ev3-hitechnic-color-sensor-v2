function Main() {
    while (true) {
        brick.clearScreen();
        brick.showValue("Color", sensors.hitechnicColor1.getColor(), 1);
        brick.showValue("R", sensors.hitechnicColor1.getRGB()[0], 2);
        brick.showValue("G", sensors.hitechnicColor1.getRGB()[1], 3);
        brick.showValue("B", sensors.hitechnicColor1.getRGB()[2], 4);
        brick.showValue("W", sensors.hitechnicColor1.getWhite(), 5);
        brick.showValue("Raw", sensors.color2.reflectedLightRaw(), 6);
        loops.pause(50);
    }
}

Main();
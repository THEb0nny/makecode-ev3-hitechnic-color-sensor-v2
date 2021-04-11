function Main() {
    while (true) {
        brick.clearScreen();
        brick.showValue("Color", sensors.hitechnicColor1.getColor(), 2);
        brick.showValue("R", sensors.hitechnicColor1.getRGB()[0], 3);
        brick.showValue("G", sensors.hitechnicColor1.getRGB()[1], 4);
        brick.showValue("B", sensors.hitechnicColor1.getRGB()[2], 5);
        brick.showValue("W", sensors.hitechnicColor1.getWhite(), 6);
        //brick.showValue("Raw", sensors.color2.reflectedLightRaw(), 14);
        loops.pause(50);
    }
}

Main();
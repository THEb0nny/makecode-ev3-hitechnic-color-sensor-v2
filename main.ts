function Main() {
    //sensors.hitechnicColor1.reset();
    while (true) {
        brick.clearScreen();
        //let HT_ALL = sensors.hitechnicColor1.getAll();
        brick.showValue("Color", sensors.hitechnicColor1.getColor(), 2);
        brick.showValue("R", sensors.hitechnicColor1.getRGB()[0], 3);
        brick.showValue("G", sensors.hitechnicColor1.getRGB()[1], 4);
        brick.showValue("B", sensors.hitechnicColor1.getRGB()[2], 5);
        brick.showValue("W", sensors.hitechnicColor1.getWhite(), 6);
        brick.showValue("Color", sensors.hitechnicColor4.getColor(), 8);
        brick.showValue("R", sensors.hitechnicColor4.getRGB()[0], 9);
        brick.showValue("G", sensors.hitechnicColor4.getRGB()[1], 10);
        brick.showValue("B", sensors.hitechnicColor4.getRGB()[2], 11);
        brick.showValue("W", sensors.hitechnicColor4.getWhite(), 12);
        /*
        brick.showValue("COL_INDEX_REG", sensors.hitechnicColor1.getAll()[5], 7);
        brick.showValue("RED_NORM_REG", sensors.hitechnicColor1.getAll()[6], 8);
        brick.showValue("GREEN_NORM_REG", sensors.hitechnicColor1.getAll()[7], 9);
        brick.showValue("BLUE_NORM_REG", sensors.hitechnicColor1.getAll()[8], 10);
        */
        brick.showValue("Raw", sensors.color2.reflectedLightRaw(), 14);
        loops.pause(50);
    }
}
Main();
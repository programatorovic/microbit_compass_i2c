//% weight=100 color=#0fbc11 icon="\uf14e" block="compass i2c"
namespace compass_i2c {
    const HMC5883L_ADDRESS = 0x0D;
    const QMC5883L_ADDRESS = 0x0D;

    // Initialize HMC5883L
    //% block="Init HMC5883L"
    export function initHMC5883L(): number {
        let buf = pins.createBuffer(1);
        buf[0] = 0x0A; // Register to read
        pins.i2cWriteBuffer(HMC5883L_ADDRESS, buf);
        let result = pins.i2cReadNumber(HMC5883L_ADDRESS, NumberFormat.UInt8BE);
        if (result != 0x48) { // 0x48 is the ID for HMC5883L
            return -1;
        }
        return 0;
    }

    // Initialize QMC5883L
    //% block="Init QMC5883L"
    export function initQMC5883L(): number {
        let buf = pins.createBuffer(1);
        buf[0] = 0x0D; // Register to read
        pins.i2cWriteBuffer(QMC5883L_ADDRESS, buf);
        let result = pins.i2cReadNumber(QMC5883L_ADDRESS, NumberFormat.UInt8BE);
        if (result != 0xFF) { // 0xFF is the ID for QMC5883L
            return -1;
        }
        return 0;
    }

    // Get X value
    //% block="Get X"
    export function getX(): number {
        let buf = pins.createBuffer(1);
        buf[0] = 0x01; // Register to read X value
        pins.i2cWriteBuffer(HMC5883L_ADDRESS, buf);
        return pins.i2cReadNumber(HMC5883L_ADDRESS, NumberFormat.Int16BE);
    }

    // Get Y value
    //% block="Get Y"
    export function getY(): number {
        let buf = pins.createBuffer(1);
        buf[0] = 0x03; // Register to read Y value
        pins.i2cWriteBuffer(HMC5883L_ADDRESS, buf);
        return pins.i2cReadNumber(HMC5883L_ADDRESS, NumberFormat.Int16BE);
    }

    // Get Z value
    //% block="Get Z"
    export function getZ(): number {
        let buf = pins.createBuffer(1);
        buf[0] = 0x05; // Register to read Z value
        pins.i2cWriteBuffer(HMC5883L_ADDRESS, buf);
        return pins.i2cReadNumber(HMC5883L_ADDRESS, NumberFormat.Int16BE);
    }

    // Calculate Azimuth
    //% block="Azimuth"
    export function azimuth(): number {
        let x = getX();
        let y = getY();
        let azimuth = Math.atan2(y, x) * (180 / Math.PI);
        if (azimuth < 0) {
            azimuth += 360;
        }
        return Math.round(azimuth);
    }
}

//% weight=100 color=#0fbc11 icon="\uf14e" block="compass i2c"
namespace compass_i2c {
    const QMC5883L_ADDRESS = 0x0D;
    let referenceAzimuth = 0;
    let xOffset = 0;
    let yOffset = 0;
    let zOffset = 0;

    // Initialize QMC5883L
    //% block="Init QMC5883L"
    export function initQMC5883L(): number {
        let buf = pins.createBuffer(2);
        buf[0] = 0x0B; // Control register 2
        buf[1] = 0x01; // Soft reset
        pins.i2cWriteBuffer(QMC5883L_ADDRESS, buf);

        buf[0] = 0x09; // Control register 1
        buf[1] = 0x1D; // Continuous measurement mode, 200Hz output rate, 2G range, 8x oversampling
        pins.i2cWriteBuffer(QMC5883L_ADDRESS, buf);

        return 0;
    }

    // Get X value
    //% block="Get X"
    export function getX(): number {
        let buf = pins.createBuffer(1);
        buf[0] = 0x00; // Register to read X value
        pins.i2cWriteBuffer(QMC5883L_ADDRESS, buf);
        return pins.i2cReadNumber(QMC5883L_ADDRESS, NumberFormat.Int16LE) - xOffset;
    }

    // Get Y value
    //% block="Get Y"
    export function getY(): number {
        let buf = pins.createBuffer(1);
        buf[0] = 0x02; // Register to read Y value
        pins.i2cWriteBuffer(QMC5883L_ADDRESS, buf);
        return pins.i2cReadNumber(QMC5883L_ADDRESS, NumberFormat.Int16LE) - yOffset;
    }

    // Get Z value
    //% block="Get Z"
    export function getZ(): number {
        let buf = pins.createBuffer(1);
        buf[0] = 0x04; // Register to read Z value
        pins.i2cWriteBuffer(QMC5883L_ADDRESS, buf);
        return pins.i2cReadNumber(QMC5883L_ADDRESS, NumberFormat.Int16LE) - zOffset;
    }

    // Calculate Azimuth
    //% block="AzimuthXY"
    export function azimuth(): number {
        let x = getX();
        let y = getY();
        let azimuth = Math.atan2(y, x) * (180 / Math.PI);
        if (azimuth < 0) {
            azimuth += 360;
        }
        return Math.round(azimuth);
    }

    // Set Reference Azimuth
    //% block="Set Azimuth %angle"
    export function setAzimuth(angle: number): void {
        referenceAzimuth = angle;
    }

    // Calculate Relative Azimuth
    //% block="Relative Azimuth"
    export function relativeAzimuth(): number {
        let currentAzimuth = azimuth();
        let relativeAzimuth = currentAzimuth - referenceAzimuth;
        if (relativeAzimuth > 180) {
            relativeAzimuth -= 360;
        } else if (relativeAzimuth < -180) {
            relativeAzimuth += 360;
        }
        return -relativeAzimuth;  // neg sign.
    }
}

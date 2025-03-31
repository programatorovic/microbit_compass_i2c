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

    // Calibrate QMC5883L
    //% block="Calibrate QMC5883L"
    export function calibrateQMC5883L(): void {
        let xMin = 32767, xMax = -32768;
        let yMin = 32767, yMax = -32768;
        let zMin = 32767, zMax = -32768;
        let coveredDots = [false, false, false, false, false];

        for (let i = 0; i < 1000; i++) {
            let x = getX();
            let y = getY();
            let z = getZ();

            if (x < xMin) xMin = x;
            if (x > xMax) xMax = x;
            if (y < yMin) yMin = y;
            if (y > yMax) yMax = y;
            if (z < zMin) zMin = z;
            if (z > zMax) zMax = z;

            // Display dots on the micro:bit screen
            let displayPattern = i % 5;
            basic.clearScreen();
            for (let j = 0; j <= displayPattern; j++) {
                led.plot(j, displayPattern - j);
                coveredDots[displayPattern] = true;
            }

            // Check if all dots are covered
            if (coveredDots.every(dot => dot)) {
                break;
            }

            basic.pause(50); // Add a delay of 50 milliseconds
        }

        xOffset = (xMax + xMin) / 2;
        yOffset = (yMax + yMin) / 2;
        zOffset = (zMax + zMin) / 2;
        basic.clearScreen();
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
    //% block="Azimuth"
    export function azimuth(): number {
        let x = getX();
        let y = getY();
        let z = getZ();
        let pitch = Math.atan2(-x, Math.sqrt(y * y + z * z));
        let roll = Math.atan2(y, z);
        let xh = x * Math.cos(pitch) + z * Math.sin(pitch);
        let yh = y * Math.cos(roll) - z * Math.sin(roll);
        let azimuth = Math.atan2(yh, xh) * (180 / Math.PI);
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

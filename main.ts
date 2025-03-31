// main.ts - Rozšírenie Compass i2c pre Micro:bit v MakeCode

namespace CompassI2C {
    const HMC5883L_ADDR = 0x1E; // Adresa HMC5883L
    const QMC5883L_ADDR = 0x0D; // Adresa QMC5883L

    function readRegister(addr: number, reg: number): number {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE, false);
        return pins.i2cReadNumber(addr, NumberFormat.Int16BE, false);
    }

    function writeRegister(addr: number, reg: number, value: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = value;
        pins.i2cWriteBuffer(addr, buf, false);
    }

    // Inicializácia HMC5883L
    export function initHMC5883L(): number {
        let idA = readRegister(HMC5883L_ADDR, 0x0A);
        if (idA !== 0x48) return -1; // HMC5883L by mal mať v tomto registri 0x48

        writeRegister(HMC5883L_ADDR, 0x00, 0x70); // Konfigurácia registra A
        writeRegister(HMC5883L_ADDR, 0x01, 0xA0); // Konfigurácia registra B
        writeRegister(HMC5883L_ADDR, 0x02, 0x00); // Nastavenie kontinuálneho merania

        return 0;
    }

    // Inicializácia QMC5883L
    export function initQMC5883L(): number {
        let id = readRegister(QMC5883L_ADDR, 0x0D);
        if (id !== 0xFF) return -1; // QMC5883L odpovedá hodnotou 0xFF

        writeRegister(QMC5883L_ADDR, 0x09, 0x1D); // Nastavenie rozsahu a merania
        return 0;
    }

    export function getX(): number {
        return readRegister(QMC5883L_ADDR, 0x00);
    }

    export function getY(): number {
        return readRegister(QMC5883L_ADDR, 0x02);
    }

    export function getZ(): number {
        return readRegister(QMC5883L_ADDR, 0x04);
    }

    export function azimuth(): number {
        let x = getX();
        let y = getY();
        let angle = Math.atan2(y, x) * (180 / Math.PI);
        return (angle < 0) ? angle + 360 : angle;
    }
}

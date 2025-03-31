# Compass i2c

This extension allows you to use the QMC5883L compass module with the micro:bit using I2C communication.

## Blocks

- **Init QMC5883L**: Initializes the QMC5883L module and sets it to continuous measurement mode.
- **Calibrate QMC5883L**: Calibrates the QMC5883L module to correct for hard iron and soft iron distortions.
- **Get X**: Reads the X-axis value from the compass.
- **Get Y**: Reads the Y-axis value from the compass.
- **Get Z**: Reads the Z-axis value from the compass.
- **Azimuth**: Calculates the azimuth based on the X, Y, and Z values, correcting for pitch and roll.
- **Set Azimuth**: Sets the reference azimuth angle.
- **Relative Azimuth**: Calculates the relative azimuth based on the reference azimuth.

## Usage

1. Add this extension to your MakeCode project.
2. Use the **Init QMC5883L** block to initialize the compass.
3. Use the **Calibrate QMC5883L** block to calibrate the compass.
4. Use the **Set Azimuth** block to set the reference azimuth angle.
5. Use the **Get X**, **Get Y**, **Get Z**, and **Azimuth** blocks to read values and calculate the azimuth.
6. Use the **Relative Azimuth** block to calculate the relative azimuth based on the reference azimuth.

## Example

```typescript
compass_i2c.initQMC5883L();
compass_i2c.calibrateQMC5883L();
compass_i2c.setAzimuth(90);
let azimuth = compass_i2c.azimuth();
let relativeAzimuth = compass_i2c.relativeAzimuth();

# Compass i2c QMC5883L

This extension allows you to use the QMC5883L compass module with the micro:bit using I2C communication.

## Blocks

- **Init QMC5883L**: Initializes the QMC5883L module and checks if it is present on the I2C bus.
- **Get X**: Reads the X-axis value from the compass.
- **Get Y**: Reads the Y-axis value from the compass.
- **Get Z**: Reads the Z-axis value from the compass.
- **Azimuth**: Calculates the azimuth based on the X and Y values.
- **Set Azimuth**: Sets the reference azimuth angle.
- **Relative Azimuth**: Calculates the relative azimuth based on the reference azimuth.

## Usage

1. Add this extension to your MakeCode project.
2. Use the blocks to initialize the compass, set the reference azimuth, and read values.

## License

MIT

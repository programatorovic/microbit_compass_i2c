# Compass i2c

This extension allows you to use the HMC5883L and QMC5883L compass modules with the micro:bit using I2C communication.

## Blocks

- **Init HMC5883L**: Initializes the HMC5883L module and checks if it is present on the I2C bus.
- **Init QMC5883L**: Initializes the QMC5883L module and checks if it is present on the I2C bus.
- **Get X**: Reads the X-axis value from the compass.
- **Get Y**: Reads the Y-axis value from the compass.
- **Get Z**: Reads the Z-axis value from the compass.
- **Azimuth**: Calculates the azimuth based on the X and Y values.

## Usage

1. Add this extension to your MakeCode project.
2. Use the blocks to initialize the compass and read values.

## License

MIT

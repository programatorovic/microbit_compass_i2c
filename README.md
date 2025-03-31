# Compass i2c - Rozšírenie pre Micro:bit

Toto rozšírenie umožňuje komunikáciu cez I2C s kompasovými čipmi **HMC5883L** a **QMC5883L** na Micro:bit v MakeCode.

## Inštalácia
1. Otvorte [MakeCode pre Micro:bit](https://makecode.microbit.org/).
2. Prejdite do **Rozšírení** (`Extensions`).
3. Do vyhľadávacieho poľa zadajte URL repozitára na GitHub-e, kde je toto rozšírenie uložené.
4. Pridajte rozšírenie do svojho projektu.

## Použitie
Toto rozšírenie poskytuje nasledujúce bloky:

- **Init HMC5883L** – Inicializuje čip HMC5883L a kontroluje jeho dostupnosť (výstup: `0` = OK, `-1` = nenájdený)
- **Init QMC5883L** – Inicializuje čip QMC5883L a kontroluje jeho dostupnosť (výstup: `0` = OK, `-1` = nenájdený)
- **GetX** – Načíta hodnotu osi X z kompasu
- **GetY** – Načíta hodnotu osi Y z kompasu
- **GetZ** – Načíta hodnotu osi Z z kompasu
- **Azimuth** – Vypočíta azimut na základe hodnôt X a Y (výstup v rozsahu `0 - 359°`)

## Príklad použitia
```javascript
basic.forever(() => {
    let azimuth = CompassI2C.azimuth();
    basic.showNumber(azimuth);
    basic.pause(1000);
});
```

## Licencia
MIT

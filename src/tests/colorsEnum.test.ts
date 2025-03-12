import { basicTileColorsArr, tileColors } from '../consts/colorsEnum';

describe('Color Constants', () => {
    test('basicTileColorsArr should only contain keys that exist in tileColors', () => {
        basicTileColorsArr.forEach(color => {
            expect(tileColors).toHaveProperty(color);
        });
    });

    test('all colors in basicTileColorsArr should be unique', () => {
        const uniqueColors = new Set(basicTileColorsArr);
        expect(uniqueColors.size).toBe(basicTileColorsArr.length);
    });
}); 
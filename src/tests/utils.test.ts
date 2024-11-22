import { lampColorsArr } from "../consts/colorsEnum"
import findClosestColor from "../utils/image/findClosestColor"
import rgbToDecimal from "../utils/image/rgbToDecimal"

describe('Test rgbToHex', () => {
    test('Test rgbToHex', () => {
        expect(rgbToDecimal(255, 255, 255)).toBe('ffffff')
        expect(rgbToDecimal(0, 0, 0)).toBe('000000')
        expect(rgbToDecimal(255, 0, 0)).toBe('ff0000')
        expect(rgbToDecimal(0, 255, 0)).toBe('00ff00')
        expect(rgbToDecimal(0, 0, 255)).toBe('0000ff')
        expect(rgbToDecimal(255, 255, 0)).toBe('ffff00')
        expect(rgbToDecimal(0, 255, 255)).toBe('00ffff')
        expect(rgbToDecimal(255, 0, 255)).toBe('ff00ff')
        expect(rgbToDecimal(0, 0, 0)).toBe('000000')
    })
})


describe ('Test findClosestColor', () => {
    test('Exact value', () => {
        lampColorsArr.forEach(color => {
            expect(findClosestColor(lampColorsArr, color)).toBe(color)
        })
    })  
})
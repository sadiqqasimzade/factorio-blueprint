import { lampColorsArr } from "../domain/entity/stuctures/Enums"
import findClosestColor from "../presentation/utils/image/findClosestColor"
import rgbToHex from "../presentation/utils/image/rgbToHex"

describe('Test rgbToHex', () => {
    test('Test rgbToHex', () => {
        expect(rgbToHex(255, 255, 255)).toBe('ffffff')
        expect(rgbToHex(0, 0, 0)).toBe('000000')
        expect(rgbToHex(255, 0, 0)).toBe('ff0000')
        expect(rgbToHex(0, 255, 0)).toBe('00ff00')
        expect(rgbToHex(0, 0, 255)).toBe('0000ff')
        expect(rgbToHex(255, 255, 0)).toBe('ffff00')
        expect(rgbToHex(0, 255, 255)).toBe('00ffff')
        expect(rgbToHex(255, 0, 255)).toBe('ff00ff')
        expect(rgbToHex(0, 0, 0)).toBe('000000')
    })
})


describe ('Test findClosestColor', () => {
    test('Exact value', () => {
        lampColorsArr.forEach(color => {
            expect(findClosestColor(lampColorsArr, color)).toBe(color)
        })
    })  
})
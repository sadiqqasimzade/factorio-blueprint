import Blueprint from "../classes/Blueprint"
import BpArithmeticCombinator from "../classes/BpArithmeticCombinator"
import BpConstCombinator from "../classes/BpConstCombinator"
import BpLamp from "../classes/BpLamp"
import BpSubstaion from "../classes/BpSubstaion"
import { calculateEntitiesCount } from "../utils/calculateEntitiesCount"
import imgToLampBlueprintConvertor from "../utils/convertors/imgToLampBlueprintConvertor"
import { calculateColorsForLamps } from "../utils/image/calculateColors"

describe('calculateEntitiesCount', () => {
    const getRealValue = (x: number, y: number): Blueprint => {
        const res = imgToLampBlueprintConvertor(calculateColorsForLamps(Array<string[]>(x).fill(Array<string>(y).fill('ffffff'))))      
        return res
    }

    const dublicatesExist =(blueprint:Blueprint):boolean => {
        const res = blueprint.entities.filter(e => blueprint.entities.filter(e2 => e2.position.x === e.position.x && e2.position.y === e.position.y).length > 1)
        return res.length > 0
    }

    test('equal width and height', () => {
        const result = getRealValue(20, 20)
        expect(dublicatesExist(result)).toBeFalsy()
        expect(calculateEntitiesCount(20, 20)).toEqual([
            result.entities.filter(e => e instanceof BpConstCombinator).length,
            result.entities.filter(e => e instanceof BpSubstaion).length,
            result.entities.filter(e => e instanceof BpArithmeticCombinator).length,
            result.entities.filter(e => e instanceof BpLamp).length,
        ])
    })
    test('max width max height', () => {
        const result = getRealValue(300, 100)
        expect(calculateEntitiesCount(300, 100)).toEqual([
            result.entities.filter(e => e instanceof BpConstCombinator).length,
            result.entities.filter(e => e instanceof BpSubstaion).length,
            result.entities.filter(e => e instanceof BpArithmeticCombinator).length,
            result.entities.filter(e => e instanceof BpLamp).length,
        ])
    })
    test('min width min height', () => {
        const result = getRealValue(5, 5)
        expect(dublicatesExist(result)).toBeFalsy()
        expect(calculateEntitiesCount(5, 5)).toEqual([
            result.entities.filter(e => e instanceof BpConstCombinator).length,
            result.entities.filter(e => e instanceof BpSubstaion).length,
            result.entities.filter(e => e instanceof BpArithmeticCombinator).length,
            result.entities.filter(e => e instanceof BpLamp).length,
        ])
    })
    test('substation in width corner', () => {
        const result = getRealValue(14, 21)
        expect(dublicatesExist(result)).toBeFalsy()
        expect(calculateEntitiesCount(14, 21)).toEqual([
            result.entities.filter(e => e instanceof BpConstCombinator).length,
            result.entities.filter(e => e instanceof BpSubstaion).length,
            result.entities.filter(e => e instanceof BpArithmeticCombinator).length,
            result.entities.filter(e => e instanceof BpLamp).length,
        ])
    })
    test('substation in height corner', () => {
        const result = getRealValue(21, 14)
        expect(dublicatesExist(result)).toBeFalsy()
        expect(calculateEntitiesCount(21, 14)).toEqual([
            result.entities.filter(e => e instanceof BpConstCombinator).length,
            result.entities.filter(e => e instanceof BpSubstaion).length,
            result.entities.filter(e => e instanceof BpArithmeticCombinator).length,
            result.entities.filter(e => e instanceof BpLamp).length,
        ])
    })
    test('Substations both in width and height corner with lamps', () => {
        const result = getRealValue(14, 14)
        expect(dublicatesExist(result)).toBeFalsy()
        expect(calculateEntitiesCount(14, 14)).toEqual([
            result.entities.filter(e => e instanceof BpConstCombinator).length,
            result.entities.filter(e => e instanceof BpSubstaion).length,
            result.entities.filter(e => e instanceof BpArithmeticCombinator).length,
            result.entities.filter(e => e instanceof BpLamp).length,
        ])
    })

    test('Substations both in width and height corner without lamps', () => {
        const result = getRealValue(13, 13)
        expect(dublicatesExist(result)).toBeFalsy()
        expect(calculateEntitiesCount(13, 13)).toEqual([
            result.entities.filter(e => e instanceof BpConstCombinator).length,
            result.entities.filter(e => e instanceof BpSubstaion).length,
            result.entities.filter(e => e instanceof BpArithmeticCombinator).length,
            result.entities.filter(e => e instanceof BpLamp).length,
        ])
    })

    test('-', () => {
        const result = getRealValue(20, 24)
        expect(dublicatesExist(result)).toBeFalsy()
        expect(calculateEntitiesCount(20, 24)).toEqual([
            result.entities.filter(e => e instanceof BpConstCombinator).length,
            result.entities.filter(e => e instanceof BpSubstaion).length,
            result.entities.filter(e => e instanceof BpArithmeticCombinator).length,
            result.entities.filter(e => e instanceof BpLamp).length,
        ])
    })

    test('-', () => {
        const result = getRealValue(24, 20)
        expect(dublicatesExist(result)).toBeFalsy()
        expect(calculateEntitiesCount(24, 20)).toEqual([
            result.entities.filter(e => e instanceof BpConstCombinator).length,
            result.entities.filter(e => e instanceof BpSubstaion).length,
            result.entities.filter(e => e instanceof BpArithmeticCombinator).length,
            result.entities.filter(e => e instanceof BpLamp).length,
        ])
    })
})

import Blueprint from "../domain/entity/models/Blueprint"
import BpArithmeticCombinator from "../domain/entity/models/BpArithmeticCombinator"
import BpConstCombinator from "../domain/entity/models/BpConstCombinator"
import BpLamp from "../domain/entity/models/BpLamp"
import BpSubstaion from "../domain/entity/models/BpSubstaion"
import { calculateEntitiesCount } from "../presentation/utils/calculateEntitiesCount"
import imgToLampBlueprintConvertor from "../presentation/utils/convertors/imgToLampBlueprintConvertor"

describe('calculateEntitiesCount', () => {
    const getRealValue = (x: number, y: number): Blueprint => {
        let res = imgToLampBlueprintConvertor(x, y, Array<number[][]>(x).fill(Array<number[]>(Math.ceil(y / 20)).fill(Array<number>(Math.ceil(y / Math.ceil(y / 20))).fill(0))))
        return res
    }
    test('equal width and height', () => {
        let res = getRealValue(20, 20)
        expect(calculateEntitiesCount(20, 20)).toEqual([
            res.entities.filter(e => e instanceof BpConstCombinator).length,
            res.entities.filter(e => e instanceof BpSubstaion).length,
            res.entities.filter(e => e instanceof BpArithmeticCombinator).length,
            res.entities.filter(e => e instanceof BpLamp).length,
        ])
    })
    test('max width max height', () => {
        let res = getRealValue(300, 100)
        expect(calculateEntitiesCount(300, 100)).toEqual([
            res.entities.filter(e => e instanceof BpConstCombinator).length,
            res.entities.filter(e => e instanceof BpSubstaion).length,
            res.entities.filter(e => e instanceof BpArithmeticCombinator).length,
            res.entities.filter(e => e instanceof BpLamp).length,
        ])
    })
    test('min width min height', () => {
        let res = getRealValue(5, 5)
        expect(calculateEntitiesCount(5, 5)).toEqual([
            res.entities.filter(e => e instanceof BpConstCombinator).length,
            res.entities.filter(e => e instanceof BpSubstaion).length,
            res.entities.filter(e => e instanceof BpArithmeticCombinator).length,
            res.entities.filter(e => e instanceof BpLamp).length,
        ])
    })
    test('substation in width corner', () => {
        let res = getRealValue(14, 21)
        expect(calculateEntitiesCount(14, 21)).toEqual([
            res.entities.filter(e => e instanceof BpConstCombinator).length,
            res.entities.filter(e => e instanceof BpSubstaion).length,
            res.entities.filter(e => e instanceof BpArithmeticCombinator).length,
            res.entities.filter(e => e instanceof BpLamp).length,
        ])
    })
    test('substation in height corner', () => {
        let res = getRealValue(21, 14)
        expect(calculateEntitiesCount(21, 14)).toEqual([
            res.entities.filter(e => e instanceof BpConstCombinator).length,
            res.entities.filter(e => e instanceof BpSubstaion).length,
            res.entities.filter(e => e instanceof BpArithmeticCombinator).length,
            res.entities.filter(e => e instanceof BpLamp).length,
        ])
    })
    test('substation both in width and height corner', () => {
        let res = getRealValue(14, 14)
        expect(calculateEntitiesCount(14, 14)).toEqual([
            res.entities.filter(e => e instanceof BpConstCombinator).length,
            res.entities.filter(e => e instanceof BpSubstaion).length,
            res.entities.filter(e => e instanceof BpArithmeticCombinator).length,
            res.entities.filter(e => e instanceof BpLamp).length,
        ])
    })
})

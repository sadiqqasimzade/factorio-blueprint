import BpArithmeticCombinator from "../domain/entity/models/BpArithmeticCombinator"
import BpEntity from "../domain/entity/models/BpEntity"
import BpLamp from "../domain/entity/models/BpLamp"
import BpSubstaion from "../domain/entity/models/BpSubstaion"
import { cable_colors } from "../domain/entity/stuctures/Enums"


describe('test entity', () => {
    let substation1 = new BpSubstaion(0, 0)
    let substation2 = new BpSubstaion(2, 2)
    test('substation connect', () => {
        substation1.makeConnection(substation2, 1, 1, cable_colors.GREEN)
        expect(substation1.connections![1]![cable_colors.GREEN]!.length).toBe(1)
        expect(substation1.connections![1]![cable_colors.GREEN]![0].entity_id).toBe(substation2.entity_number)
        expect(substation1.connections![1]![cable_colors.RED]).toBeUndefined()
        expect(substation1.connections![2]).toBeUndefined()
    })
    test('substation neightour', () => {
        substation1.addNeighbour(substation2)
        expect(substation1.neighbours?.length).toBe(1)
        expect(substation2.neighbours?.length).toBe(1)

    })
})
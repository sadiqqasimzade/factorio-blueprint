import BpSubstaion from "../classes/BpSubstaion"
import { CableColors } from "../consts/enums"


describe('test entity', () => {
    const substation1 = new BpSubstaion(0, 0)
    const substation2 = new BpSubstaion(2, 2)
    test('substation connect', () => {
        substation1.makeConnection(substation2, 1, 1, CableColors.GREEN)
        expect(substation1.connections![1]![CableColors.GREEN]!.length).toBe(1)
        expect(substation1.connections![1]![CableColors.GREEN]![0].entity_id).toBe(substation2.entity_number)
        expect(substation1.connections![1]![CableColors.RED]).toBeUndefined()
        expect(substation1.connections![2]).toBeUndefined()
    })
    test('substation neightour', () => {
        substation1.addNeighbour(substation2)
        expect(substation1.neighbours?.length).toBe(1)
        expect(substation2.neighbours?.length).toBe(1)

    })
})
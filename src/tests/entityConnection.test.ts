import BpSubstaion from "../classes/BpSubstaion"


describe('test entity', () => {
    const substation1 = new BpSubstaion(0, 0)
    const substation2 = new BpSubstaion(2, 2)
    test('substation connect', () => {
        substation1.makeConnection(substation2, 1, 1, 'green')
        expect(substation1.connections![1]!['green']!.length).toBe(1)
        expect(substation1.connections![1]!['green']![0].entity_id).toBe(substation2.entity_number)
        expect(substation1.connections![1]!['red']).toBeUndefined()
        expect(substation1.connections![2]).toBeUndefined()
    })
    test('substation neightour', () => {
        substation1.addNeighbour(substation2)
        expect(substation1.neighbours?.length).toBe(1)
        expect(substation2.neighbours?.length).toBe(1)

    })
})
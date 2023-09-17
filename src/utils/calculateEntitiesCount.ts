/**
 * 
 * @param x width
 * @param y height
 * @returns array of numbers describing amount of 
 * @ Const combinators ,
 * @ Substations, 
 * @ Arithmetic combinators
 * @ and Lamps in this order
 */
export function calculateEntitiesCount(x: number, y: number): [number, number, number, number] {
    const result: [number, number, number, number] = [0, 0, 0, 0]
    //const combinatior
    result[0] = Math.ceil(y / 20) * x + 1
    //substation
    result[1] = Math.ceil(x / 9) * Math.ceil(y / 9)
    //arithmetic combinator
    result[2] = (x * y) - (Math.floor((x + 4) / 9) * Math.floor((y + 4) / 9))
    //lamp
    result[3] = result[2] * 2
    return result
}
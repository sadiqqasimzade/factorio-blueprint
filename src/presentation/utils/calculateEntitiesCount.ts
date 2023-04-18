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
    let result: [number, number, number, number] = [undefined, undefined, undefined, undefined]
    //const combinatior
    result[0] = Math.ceil(y / 20) * x + 1
    //substation
    result[1] = Math.ceil(x / 9) * Math.ceil(y / 9)
    //arithmetic combinator
    result[2] = (x * y) - (Math.ceil(x / 9) * Math.ceil(y / 9)) + (x % 9 == 5 ? 0 : Math.ceil(y / 9)) + (y % 9 == 5 ? 0 : Math.ceil(x / 9)) - (y % 9 == 5 || x % 9 == 5 ? 0 : 1)
    //lamp
    result[3] = result[2] * 2
    return result
}
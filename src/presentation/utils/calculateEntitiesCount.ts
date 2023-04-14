/**
 * 
 * @param x width
 * @param y height
 * @returns array of numbers describing amount of 
 * @ Const combinators ,
 * @ Steel poles,
 * @ Substations, 
 * @ Arithmetic combinators
 * @ and Lamps in this order
 */
export function calculateEntitiesCount(x: number, y: number): [number, number, number, number, number] {
    let result: [number, number, number, number, number] = [undefined, undefined, undefined, undefined, undefined]
    //const combinatior
    result[0] = Math.ceil(y / 20)  * x + 1
    //steel pole
    result[1] = x
    //substation
    result[2] = Math.ceil(x / 9) * Math.ceil(y / 9)
    //arithmetic combinator
    result[3] = (x * y) - (Math.floor(Math.floor(x / 9) * Math.floor(y / 9)))
    //lamp
    result[4] = result[3] * 2
    return result
}
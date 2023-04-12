/**
 * 
 * @param x width
 * @param y height
 * @returns array of numbers describing amout of Const combinators,Steel poles,Substations, Arithmetic combinators and Lamps in this order
 */
export function calculateEntitiesCount(x: number, y: number): number[] {
    let result: number[] = []
    //const combinatior
    result.push(Math.floor(y/20)*x+1)
    //steel pole
    result.push(x)
    //substation
    result.push(Math.floor(x / 8) * Math.floor(y / 8))
    //arithmetic combinator
    result.push(x * y - result.at(-1))
    //lamp
    result.push(result.at(-1) * 2)
    return result
}
/**
 * 
 * @param x width
 * @param y height
 * @returns array of numbers describing amout of Const combinators,Steel poles,Substations, Arithmetic combinators and Lamps in this order
 */
export function calculateEntitiesCount(x: number, y: number): number[] {
    let result: number[] = []
    //const combinatior
    result.push(Math.floor(y / 20) * x + 1)
    //steel pole
    result.push(x)
    //substation
    result.push(Math.ceil(x / 9) * Math.ceil(y / 9))
    //arithmetic combinator
    result.push((x * y) - (Math.floor(Math.floor(x / 9) * Math.floor(y / 9))) )
    //lamp
    result.push(result.at(-1) * 2)
    return result
}
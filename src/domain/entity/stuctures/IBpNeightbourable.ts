import BpEntity from "../models/BpEntity"

export interface IBpNeightbourable{
    neighbours: number[]|undefined
    addNeighbour(neighbour: IBpNeightbourable & BpEntity): void
}
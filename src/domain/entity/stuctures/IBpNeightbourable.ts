import BpEntity from "../models/BpEntity"

export interface IBpNeightbourable{
    neighbours: number[]
    addNeighbour(neighbour: IBpNeightbourable & BpEntity): void
}
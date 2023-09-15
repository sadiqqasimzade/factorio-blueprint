/* eslint-disable no-unused-vars */
import BpEntity from "../models/BpEntity"

declare global {
    interface IBpNeightbourable {
        neighbours: number[] | undefined
        addNeighbour(neighbour: IBpNeightbourable & BpEntity): void
    }
}


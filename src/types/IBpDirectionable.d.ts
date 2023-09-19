/* eslint-disable no-unused-vars */
import { Directions } from "../consts/enums";

declare global {
    interface IBpDirectionable {
        direction: Directions | undefined
    }
}
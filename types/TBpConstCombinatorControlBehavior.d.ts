/* eslint-disable no-unused-vars */
import { TBpSignal } from "./TBpSignal";


declare global {

    type TBpConstCombinatorControlBehavior = {
        filters: TBpConstCombinatorControlBehaviorFilter[]
    }
    type TBpConstCombinatorControlBehaviorFilter = {
        signal: TBpSignal;
        count: number;
        index: number;
    }

}






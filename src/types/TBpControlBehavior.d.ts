/* eslint-disable no-unused-vars */
import { ArithmeticOperations, CompareOperations } from "../consts/enums";
import { TBpSignal } from "./TBpSignal";


declare global {
    type TBpControlBehaviorArithmeticCondition = {
        first_signal: TBpSignal;
        second_signal: TBpSignal;
        operation: ArithmeticOperations;
        output_signal: TBpSignal;
    }
    type TBpControlBehaviorArithmetic = {
        arithmetic_conditions: TBpControlBehaviorArithmeticCondition
    }

    type TBpControlBehaviorCircuitCondition = {
        first_signal?: TBpSignal;
        constant?: number;
        comparator?: CompareOperations;
        output_signal?: TBpSignal

    }
    type TBpControlBehaviorCompare = {
        decider_conditions?: TBpControlBehaviorCircuitCondition
        circuit_condition?: TBpControlBehaviorCircuitCondition
        use_colors?: boolean
        copy_count_from_input?: boolean
    }



    type TBpConstCombinatorControlBehavior = {
        filters: TBpConstCombinatorControlBehaviorFilter[]
    }
    type TBpConstCombinatorControlBehaviorFilter = {
        signal: TBpSignal;
        count: number;
        index: number;
    }

}






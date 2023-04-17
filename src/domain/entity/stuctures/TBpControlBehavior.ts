import { arithmetic_operations, compare_operations } from "./Enums";
import { TBpSignal } from "./TBpSignal";


export type TBpControlBehaviorArithmeticCondition = {
    first_signal: TBpSignal;
    second_signal: TBpSignal;
    operation: arithmetic_operations;
    output_signal: TBpSignal;
}
export type TBpControlBehaviorArithmetic = {
    arithmetic_conditions: TBpControlBehaviorArithmeticCondition
}

export type TBpControlBehaviorCircuitCondition = {
    first_signal: TBpSignal;
    // output_signal: TBlueprint_Signal;
    constant?: number;
    comparator?: compare_operations;
}
export type TBpControlBehaviorCompare = {
    circuit_condition: TBpControlBehaviorCircuitCondition
    use_colors?: boolean
}

export type TBpConstCombinatorControlBehavior = {
    filters: TBpConstCombinatorControlBehaviorFilter[]
}

export type TBpConstCombinatorControlBehaviorFilter = {
    signal: TBpSignal;
    count: number;
    index: number;
} 

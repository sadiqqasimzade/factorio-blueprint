
type OutputNetwork = {
    red: boolean
    green: boolean
}

export type OutputSignal = {
    signal: TBpSignal
    networks?: OutputNetwork
}[] | TBpSignal

export default class DeciderCondition {
    first_signal: TBpSignal;
    constant: number;
    comparator: CompareOperations;
    outputs?: OutputSignal
    copy_count_from_input?: boolean

    constructor(first_signal: TBpSignal, comparator: CompareOperations, constant: number, outputs?: OutputSignal, copy_count_from_input?: boolean) {
        this.first_signal = first_signal
        this.comparator = comparator
        this.constant = constant
        this.outputs = outputs
        this.copy_count_from_input = copy_count_from_input
    }

}
export default class CircuitCondition {
    first_signal: TBpSignal
    constant: number
    comparator: CompareOperations

    constructor(first_signal: TBpSignal, constant: number, comparator: CompareOperations) {
        this.first_signal = first_signal
        this.constant = constant
        this.comparator = comparator
    }
}
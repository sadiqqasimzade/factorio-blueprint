export default class CircuitCondition {
    first_signal: TBpSignal
    constant: number
    comparator: CompareOperations
    use_colors?: boolean

    constructor(first_signal: TBpSignal, constant: number, comparator: CompareOperations, use_colors?: boolean) {
        this.first_signal = first_signal
        this.constant = constant
        this.comparator = comparator
        this.use_colors = use_colors
    }
}

export default class ArithmeticCondition {
    first_signal: TBpSignal;
    operation: ArithmeticOperations;
    output_signal: TBpSignal;
    second_signal?: TBpSignal;
    second_constant?: Number

    constructor(first_signal: TBpSignal, operation: ArithmeticOperations, second_signal: TBpSignal | number, output_signal: TBpSignal) {
        this.first_signal = first_signal;
        this.operation = operation;
        this.output_signal = output_signal;
        typeof second_signal === 'number' ? this.second_constant = second_signal : this.second_signal = second_signal
    }
}
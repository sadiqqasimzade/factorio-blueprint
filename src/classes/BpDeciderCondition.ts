
export default class DeciderCondition{
    first_signal: TBpSignal;
    constant: number;
    comparator: CompareOperations;
    output_signal?: TBpSignal
    copy_count_from_input?: boolean

    constructor(first_signal: TBpSignal, comparator: CompareOperations, constant: number, output_signal?: TBpSignal, copy_count_from_input?: boolean) {
        this.first_signal=first_signal
        this.comparator=comparator
        this.constant=constant
        this.output_signal=output_signal
        this.copy_count_from_input=copy_count_from_input
    }

}
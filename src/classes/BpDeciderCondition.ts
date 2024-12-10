type OutputNetwork = {
    red: boolean
    green: boolean
}


export type InputSignal = {
    first_signal: TBpSignal
    comparator?: CompareOperations
    constant?: number
    first_signal_networks?: OutputNetwork
}[] | TBpSignal



export type OutputSignal = {
    signal: TBpSignal
    networks?: OutputNetwork
}[] | TBpSignal

export default class DeciderCondition {

    conditions: InputSignal
    outputs: OutputSignal


    constructor(
        conditions: InputSignal,
        outputs: OutputSignal


    ) {

        this.conditions = conditions;
        this.outputs = outputs;
        
    }


}
import CircuitCondition from "./CircuitCondition"

export default class ControlBehavior {
    circuit_enabled: boolean
    circuit_condition: CircuitCondition
    use_colors: boolean | undefined
    rgb_signal: TBpSignal
    color_mode: 1 | 2


    constructor(circuit_enabled: boolean, circuit_condition: CircuitCondition, use_colors: boolean, rgb_signal: TBpSignal, color_mode: 1 | 2) {
        this.circuit_enabled = circuit_enabled
        this.circuit_condition = circuit_condition
        this.use_colors = use_colors
        this.rgb_signal = rgb_signal
        this.color_mode = color_mode


    }
}
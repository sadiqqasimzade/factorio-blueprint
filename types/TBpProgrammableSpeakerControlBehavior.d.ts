/* eslint-disable no-unused-vars */
import { TBpSignal } from "./TBpSignal";

declare global {
    type TBpProgrammableSpeakerControlBehavior = {
        circuit_condition?: {
            first_signal: TBpSignal;
            comparator: CompareOperations;
            constant: number;
        };
        circuit_enabled?: boolean;
        parameters?: {
            playback_volume: number; // 0-1
            playback_globally: boolean;
            allow_polyphony: boolean;
        };
        alert_parameters?: {
            show_alert: boolean;
            show_on_map: boolean;
            icon_signal_id?: TBpSignal;
            alert_message?: string;
        };
        circuit_parameters?: {
            signal_value_is_pitch: boolean;
            instrument_id?: number; // Factorio instrument ID
            note_id?: number; // MIDI note 0-127, mapped to Factorio note
        };
    }
}

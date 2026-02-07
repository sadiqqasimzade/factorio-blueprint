export interface StepNote {
  active: boolean;
  midiNote: number;
  velocity: number;
}

export interface Track {
  id: string;
  name: string;
  instrument: string;
  steps: StepNote[];
}

export interface MIDINote {
  midiNote: number;
  startTime: number;
  duration: number;
  velocity: number;
}

export interface MIDITrack {
  trackId: number;
  instrument: string;
  notes: MIDINote[];
}

export interface AudioAnalysisResult {
  tempo: number;
  timeSignature: [number, number];
  tracks: MIDITrack[];
}

export interface InstrumentOption {
  value: string;
  label: string;
}

import {
  MIDI_CONSTANTS,
  SEQUENCER_LIMITS,
} from "@/consts/audioSequencer";

const MIDI_NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export function getNoteName(midiNote: number): string {
  const octave = Math.floor(midiNote / 12) - 1;
  const note = midiNote % 12;
  return `${MIDI_NOTE_NAMES[note]}${octave}`;
}

export function validateBPM(value: number): number {
  return Math.max(
    SEQUENCER_LIMITS.MIN_BPM,
    Math.min(
      SEQUENCER_LIMITS.MAX_BPM,
      Math.floor(Number(value)) || SEQUENCER_LIMITS.DEFAULT_BPM
    )
  );
}

export function validateSteps(value: number): number {
  return Math.max(
    SEQUENCER_LIMITS.MIN_STEPS,
    Math.min(
      SEQUENCER_LIMITS.MAX_STEPS,
      Math.floor(Number(value)) || SEQUENCER_LIMITS.DEFAULT_STEPS
    )
  );
}

export function validateMIDINote(value: number): number {
  return Math.max(
    MIDI_CONSTANTS.MIN_NOTE,
    Math.min(MIDI_CONSTANTS.MAX_NOTE, Math.floor(value))
  );
}

export function validateVelocity(value: number): number {
  return Math.max(
    0,
    Math.min(MIDI_CONSTANTS.MAX_VELOCITY, Math.floor(value))
  );
}

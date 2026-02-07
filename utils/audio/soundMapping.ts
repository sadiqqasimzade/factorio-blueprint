import { INSTRUMENT_SOUND_RANGES } from "@/consts/audioSequencer";
import { MIDI_CONSTANTS } from "@/consts/audioSequencer";

export function getSoundFileIndex(midiNote: number, instrument: string): number {
  const range = INSTRUMENT_SOUND_RANGES[instrument];
  if (!range) return 0;

  const minMidi = MIDI_CONSTANTS.MIN_NOTE;
  const maxMidi = MIDI_CONSTANTS.MIN_NOTE + range.count - 1;
  const clampedNote = Math.max(
    minMidi,
    Math.min(maxMidi, midiNote)
  );
  return clampedNote - minMidi;
}

export function getSoundPath(instrument: string, midiNote: number): string {
  const range = INSTRUMENT_SOUND_RANGES[instrument];
  if (!range) return `/sounds/${sanitizeInstrumentName(instrument)}-01.ogg`;

  const index = getSoundFileIndex(midiNote, instrument);
  const fileNumber = (index + 1).toString().padStart(2, "0");
  return `/sounds/${range.baseName}-${fileNumber}.ogg`;
}

export function sanitizeInstrumentName(name: string): string {
  return name.replace(/[^a-z0-9-]/gi, "");
}

export function hasSoundRange(instrument: string): boolean {
  return instrument in INSTRUMENT_SOUND_RANGES;
}

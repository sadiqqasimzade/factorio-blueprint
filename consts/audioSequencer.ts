import type { InstrumentOption } from "@/types/sequencer";

export const INSTRUMENTS: InstrumentOption[] = [
  { value: "piano", label: "Piano" },
  { value: "organ", label: "Organ" },
  { value: "bass", label: "Bass" },
  { value: "guitar", label: "Guitar" },
  { value: "drums", label: "Drums" },
  { value: "brass", label: "Brass" },
  { value: "woodwind", label: "Woodwind" },
  { value: "strings", label: "Strings" },
  { value: "bell", label: "Bell" },
  { value: "saw", label: "Saw" },
  { value: "square", label: "Square" },
  { value: "lead", label: "Lead" },
  { value: "plucked", label: "Plucked" },
  { value: "celesta", label: "Celesta" },
  { value: "vibraphone", label: "Vibraphone" },
  { value: "steel-drum", label: "Steel Drum" },
  { value: "kit", label: "Kit" },
];

export const MIDI_CONSTANTS = {
  MIN_NOTE: 36,
  MAX_NOTE: 84,
  MAX_VELOCITY: 127,
  DEFAULT_NOTE: 60,
  DEFAULT_VELOCITY: 100,
  VOLUME_SCALE: 0.5,
} as const;

export const SEQUENCER_LIMITS = {
  MIN_BPM: 60,
  MAX_BPM: 200,
  MIN_STEPS: 4,
  MAX_STEPS: 128,
  DEFAULT_BPM: 120,
  DEFAULT_STEPS: 16,
} as const;

export const INSTRUMENT_SOUND_RANGES: Record<
  string,
  { baseName: string; count: number }
> = {
  bass: { baseName: "bass", count: 36 },
  celesta: { baseName: "celesta", count: 36 },
  kit: { baseName: "kit", count: 17 },
  lead: { baseName: "lead", count: 36 },
  piano: { baseName: "piano1", count: 48 },
  plucked: { baseName: "plucked", count: 36 },
  saw: { baseName: "saw", count: 36 },
  square: { baseName: "square", count: 36 },
  "steel-drum": { baseName: "steel-drum", count: 36 },
  vibraphone: { baseName: "vibraphone", count: 36 },
  organ: { baseName: "organ", count: 36 },
  guitar: { baseName: "guitar", count: 36 },
  drums: { baseName: "kit", count: 17 },
  brass: { baseName: "brass", count: 36 },
  woodwind: { baseName: "woodwind", count: 36 },
  strings: { baseName: "strings", count: 36 },
  bell: { baseName: "bell", count: 36 },
};

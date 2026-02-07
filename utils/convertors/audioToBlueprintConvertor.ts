import Blueprint from "@/classes/Blueprint";
import BpArithmeticCombinator from "@/classes/BpArithmeticCombinator";
import BpConstCombinator from "@/classes/BpConstCombinator";
import BpDeciderCombinator from "@/classes/BpDeciderCombinator";
import BpEntity from "@/classes/BpEntity";
import BpIcon from "@/classes/BpIcon";
import BpProgrammableSpeaker from "@/classes/BpProgrammableSpeaker";
import { BpStaticMethods } from "@/classes/BpStaticMethods";
import { Directions, EntityNames } from "@/consts/enums";
import { Signals } from "@/consts/signalsEnum";
import ArithmeticCondition from "@/classes/BpArithmeticCondition";
import DeciderCondition from "@/classes/BpDeciderCondition";
import { BpMediumPole } from "@/classes/BpMediumPole";

interface MIDINote {
  midiNote: number;
  startTime: number;
  duration: number;
  velocity: number;
}

interface MIDITrack {
  trackId: number;
  instrument: string;
  notes: MIDINote[];
}

interface AudioAnalysisResult {
  tempo: number;
  timeSignature: [number, number];
  tracks: MIDITrack[];
}

// Factorio instrument IDs (0-19)
const FACTORIO_INSTRUMENTS: Record<string, number> = {
  'piano': 0,
  'organ': 1,
  'bass': 2,
  'guitar': 3,
  'drums': 4,
  'brass': 5,
  'woodwind': 6,
  'strings': 7,
  'bell': 8,
  'saw': 9,
  'square': 10,
  'lead': 11,
  'plucked': 12,
  'celesta': 13,
  'vibraphone': 14,
  'steel-drum': 15,
  'kit': 16,
};

// Map MIDI note to Factorio note (0-48, where 24 = C4)
function midiToFactorioNote(midiNote: number): number {
  // Factorio uses note 0-48, MIDI uses 0-127
  // Map MIDI C4 (60) to Factorio note 24 (middle C)
  return Math.max(0, Math.min(48, midiNote - 36));
}

// Quantize time to step index
function timeToStep(time: number, stepDuration: number): number {
  return Math.floor(time / stepDuration);
}

export default function AudioToBlueprintConvertor(analysis: AudioAnalysisResult): Blueprint {
  const entities: BpEntity[] = [];
  const wires: TBpWire[] = [];
  
  // Calculate step duration based on tempo and time signature
  const beatsPerSecond = analysis.tempo / 60;
  const stepDuration = 1 / (beatsPerSecond * 4); // 16th notes
  
  // Find maximum sequence length
  let maxSteps = 16; // Default minimum
  analysis.tracks.forEach(track => {
    track.notes.forEach(note => {
      const endStep = timeToStep(note.startTime + note.duration, stepDuration);
      maxSteps = Math.max(maxSteps, endStep + 1);
    });
  });
  
  // Round up to nearest power of 2 for cleaner sequencer
  maxSteps = Math.pow(2, Math.ceil(Math.log2(maxSteps)));
  maxSteps = Math.min(maxSteps, 128); // Cap at 128 steps
  
  const numTracks = analysis.tracks.length;
  const trackSpacing = 3; // Vertical spacing between tracks
  const stepSpacing = 2; // Horizontal spacing between steps
  
  // Create master clock (arithmetic combinator counting ticks)
  // Position at top-left
  const clockX = 0;
  const clockY = -2;
  
  // Clock: increments every tick, outputs step number (mod maxSteps)
  const clock = new BpArithmeticCombinator(
    new ArithmeticCondition(
      Signals.SIGNAL_0,
      '+',
      1,
      Signals.SIGNAL_0
    ),
    clockX,
    clockY,
    Directions.EAST
  );
  entities.push(clock);
  
  // Step counter: divides clock by 1 and outputs step number
  // This will be used to cycle through steps
  const stepCounter = new BpArithmeticCombinator(
    new ArithmeticCondition(
      Signals.SIGNAL_0,
      '%',
      maxSteps,
      Signals.SIGNAL_1 // Output step number as signal-1
    ),
    clockX + 2,
    clockY,
    Directions.EAST
  );
  entities.push(stepCounter);
  wires.push(BpStaticMethods.connect(clock, stepCounter, 2, 1));
  
  // Create power poles for distribution
  const powerPoles: BpEntity[] = [];
  const poleSpacing = 10;
  
  // Create tracks
  analysis.tracks.forEach((track, trackIndex) => {
    const trackY = trackIndex * trackSpacing;
    const instrumentId = FACTORIO_INSTRUMENTS[track.instrument.toLowerCase()] || 0;
    
    // Create constant combinators for each step
    const stepCombinators: BpConstCombinator[] = [];
    const stepDeciders: BpDeciderCombinator[] = [];
    const speakers: BpProgrammableSpeaker[] = [];
    
    // Group notes by step
    const stepNotes: Map<number, MIDINote[]> = new Map();
    track.notes.forEach(note => {
      const step = timeToStep(note.startTime, stepDuration);
      if (!stepNotes.has(step)) {
        stepNotes.set(step, []);
      }
      stepNotes.get(step)!.push(note);
    });
    
    // Create entities for each step
    for (let step = 0; step < maxSteps; step++) {
      const stepX = step * stepSpacing;
      const notesAtStep = stepNotes.get(step) || [];
      
      // Constant combinator: outputs note data for this step
      const filters: TBpConstCombinatorControlBehaviorFilter[] = [];
      if (notesAtStep.length > 0) {
        // Use first note (can be extended to handle chords)
        const note = notesAtStep[0]!;
        const factorioNote = midiToFactorioNote(note.midiNote);
        const volume = Math.round((note.velocity / 127) * 100) / 100; // 0-1
        
        // Output note as signal-2, volume as signal-3
        filters.push({
          signal: Signals.SIGNAL_2,
          index: 1,
          count: factorioNote,
        });
        filters.push({
          signal: Signals.SIGNAL_3,
          index: 2,
          count: Math.round(volume * 100),
        });
      }
      
      const constCombinator = new BpConstCombinator(
        { filters },
        stepX,
        trackY,
        Directions.NORTH
      );
      stepCombinators.push(constCombinator);
      entities.push(constCombinator);
      
      // Decider combinator: checks if current step matches
      // If step number (signal-1) equals this step index, output note data
      const deciderCondition = new DeciderCondition(
        [{ 
          first_signal: Signals.SIGNAL_1, 
          comparator: '=' as CompareOperations, 
          constant: step,
          first_signal_networks: { red: true, green: false }
        }],
        [{ signal: Signals.SIGNAL_2, networks: { red: false, green: true } }] // Output note when step matches
      );
      
      const decider = new BpDeciderCombinator(
        deciderCondition,
        stepX,
        trackY + 1,
        Directions.EAST
      );
      stepDeciders.push(decider);
      entities.push(decider);
      
      // Connect constant combinator to decider
      wires.push(BpStaticMethods.connect(constCombinator, decider, 2, 1));
      
      // Connect step counter to decider
      if (step === 0) {
        wires.push(BpStaticMethods.connect(stepCounter, decider, 2, 1));
      } else {
        // Chain deciders together for step counter signal
        wires.push(BpStaticMethods.connect(stepDeciders[step - 1]!, decider, 2, 1));
      }
      
      // Programmable speaker: plays note when enabled
      const speaker = new BpProgrammableSpeaker(
        stepX,
        trackY + 2,
        {
          circuit_enabled: true,
          circuit_condition: {
            first_signal: Signals.SIGNAL_2,
            comparator: '>' as CompareOperations,
            constant: 0,
          },
          parameters: {
            playback_volume: 0.5,
            playback_globally: false,
            allow_polyphony: true,
          },
          circuit_parameters: {
            signal_value_is_pitch: true,
            instrument_id: instrumentId,
            note_id: 0, // Will be set by signal
          },
        }
      );
      speakers.push(speaker);
      entities.push(speaker);
      
      // Connect decider to speaker
      wires.push(BpStaticMethods.connect(decider, speaker, 2, 1));
      
      // Add power poles periodically
      if (step % poleSpacing === 0) {
        const pole = new BpMediumPole(stepX, trackY - 1);
        powerPoles.push(pole);
        entities.push(pole);
      }
    }
  });
  
  // Create icons
  const icons: BpIcon[] = [
    new BpIcon(Signals.PROGRAMMABLE_SPEAKER, 1),
  ];
  
  return new Blueprint(icons, entities, undefined, wires);
}

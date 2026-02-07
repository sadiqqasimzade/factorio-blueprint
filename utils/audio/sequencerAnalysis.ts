import type {
  AudioAnalysisResult,
  MIDINote,
  MIDITrack,
  Track,
} from "@/types/sequencer";

export function convertToAnalysisResult(
  tracks: Track[],
  bpm: number
): AudioAnalysisResult {
  const beatsPerSecond = bpm / 60;
  const stepDuration = 1 / (beatsPerSecond * 4);

  const tracksData: MIDITrack[] = tracks.map((track, trackIndex) => {
    const notes: MIDINote[] = [];

    track.steps.forEach((step, stepIndex) => {
      if (step.active) {
        notes.push({
          midiNote: step.midiNote,
          startTime: stepIndex * stepDuration,
          duration: stepDuration,
          velocity: step.velocity,
        });
      }
    });

    return {
      trackId: trackIndex,
      instrument: track.instrument,
      notes,
    };
  });

  return {
    tempo: bpm,
    timeSignature: [4, 4],
    tracks: tracksData,
  };
}

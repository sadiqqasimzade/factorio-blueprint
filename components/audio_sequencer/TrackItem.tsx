"use client";

import { INSTRUMENTS } from "@/consts/audioSequencer";
import { MIDI_CONSTANTS } from "@/consts/audioSequencer";
import type { StepNote, Track } from "@/types/sequencer";
import { getNoteName } from "@/utils/audio/midiUtils";

interface TrackItemProps {
  track: Track;
  currentStep: number;
  isPlaying: boolean;
  onToggleStep: (trackId: string, stepIndex: number) => void;
  onUpdateStep: (
    trackId: string,
    stepIndex: number,
    updates: Partial<StepNote>
  ) => void;
  onRemoveTrack: (trackId: string) => void;
}

export function TrackItem({
  track,
  currentStep,
  isPlaying,
  onToggleStep,
  onUpdateStep,
  onRemoveTrack,
}: TrackItemProps) {
  const instrumentLabel =
    INSTRUMENTS.find((i) => i.value === track.instrument)?.label ??
    track.instrument;

  return (
    <div className="border border-neutral-700 rounded-lg p-4 bg-neutral-800/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-neutral-200">{track.name}</span>
          <span className="text-xs text-neutral-400">({instrumentLabel})</span>
        </div>
        <button
          type="button"
          onClick={() => onRemoveTrack(track.id)}
          className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded text-white text-sm cursor-pointer"
          disabled={isPlaying}
        >
          Remove
        </button>
      </div>

      <div className="flex gap-1 flex-wrap">
        {track.steps.map((step, stepIndex) => (
          <div key={stepIndex} className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => onToggleStep(track.id, stepIndex)}
              disabled={isPlaying}
              className={`w-10 h-10 rounded transition-colors cursor-pointer ${
                step.active
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-neutral-700 hover:bg-neutral-600"
              } ${
                currentStep === stepIndex && isPlaying
                  ? "ring-2 ring-yellow-400"
                  : ""
              } disabled:opacity-50`}
              title={`Step ${stepIndex + 1}: ${getNoteName(step.midiNote)}`}
            />
            {step.active && (
              <div className="flex flex-col gap-1">
                <input
                  type="range"
                  min={MIDI_CONSTANTS.MIN_NOTE}
                  max={MIDI_CONSTANTS.MAX_NOTE}
                  value={step.midiNote}
                  onChange={(e) =>
                    onUpdateStep(track.id, stepIndex, {
                      midiNote: Number(e.target.value),
                    })
                  }
                  className="w-10 h-1"
                  disabled={isPlaying}
                  title={`Note: ${getNoteName(step.midiNote)}`}
                />
                <input
                  type="range"
                  min={0}
                  max={MIDI_CONSTANTS.MAX_VELOCITY}
                  value={step.velocity}
                  onChange={(e) =>
                    onUpdateStep(track.id, stepIndex, {
                      velocity: Number(e.target.value),
                    })
                  }
                  className="w-10 h-1"
                  disabled={isPlaying}
                  title={`Velocity: ${step.velocity}`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

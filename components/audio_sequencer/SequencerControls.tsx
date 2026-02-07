"use client";

import { SEQUENCER_LIMITS } from "@/consts/audioSequencer";
import { INSTRUMENTS } from "@/consts/audioSequencer";
import { validateBPM, validateSteps } from "@/utils/audio/midiUtils";

interface SequencerControlsProps {
  isPlaying: boolean;
  bpm: number;
  setBpm: (v: number) => void;
  numSteps: number;
  onStepsChange: (v: number) => void;
  onTogglePlayback: () => void;
  showAddTrack: boolean;
  setShowAddTrack: (v: boolean) => void;
  selectedInstrument: string;
  setSelectedInstrument: (v: string) => void;
  onAddTrack: () => void;
  onGenerateBlueprint: () => void;
  isGenerating: boolean;
}

export function SequencerControls({
  isPlaying,
  bpm,
  setBpm,
  numSteps,
  onStepsChange,
  onTogglePlayback,
  showAddTrack,
  setShowAddTrack,
  selectedInstrument,
  setSelectedInstrument,
  onAddTrack,
  onGenerateBlueprint,
  isGenerating,
}: SequencerControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        type="button"
        onClick={onTogglePlayback}
        className={`px-6 py-2 rounded-lg font-semibold cursor-pointer ${
          isPlaying
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isPlaying ? "Stop" : "Play"}
      </button>

      <div className="flex items-center gap-2">
        <label htmlFor="sequencer-bpm" className="text-sm text-neutral-300">
          BPM:
        </label>
        <input
          id="sequencer-bpm"
          type="number"
          min={SEQUENCER_LIMITS.MIN_BPM}
          max={SEQUENCER_LIMITS.MAX_BPM}
          value={bpm}
          onChange={(e) => setBpm(validateBPM(Number(e.target.value)))}
          className="w-20 rounded-md border border-neutral-700 bg-neutral-800 px-2 py-1 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isPlaying}
        />
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="sequencer-steps" className="text-sm text-neutral-300">
          Steps:
        </label>
        <input
          id="sequencer-steps"
          type="number"
          min={SEQUENCER_LIMITS.MIN_STEPS}
          max={SEQUENCER_LIMITS.MAX_STEPS}
          value={numSteps}
          onChange={(e) =>
            onStepsChange(validateSteps(Number(e.target.value)))
          }
          className="w-20 rounded-md border border-neutral-700 bg-neutral-800 px-2 py-1 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isPlaying}
        />
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setShowAddTrack(!showAddTrack)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold cursor-pointer"
          disabled={isPlaying}
        >
          Add Track +
        </button>

        {showAddTrack && (
          <div className="absolute top-full left-0 mt-2 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-10 p-4 min-w-48">
            <select
              value={selectedInstrument}
              onChange={(e) => setSelectedInstrument(e.target.value)}
              className="w-full rounded-md border border-neutral-700 bg-neutral-700 px-3 py-2 text-neutral-100 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {INSTRUMENTS.map((inst) => (
                <option key={inst.value} value={inst.value}>
                  {inst.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={onAddTrack}
              className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold cursor-pointer"
            >
              Add
            </button>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onGenerateBlueprint}
        disabled={isGenerating || isPlaying}
        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Generate Blueprint
      </button>
    </div>
  );
}

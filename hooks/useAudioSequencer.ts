"use client";

import {
  INSTRUMENTS,
  MIDI_CONSTANTS,
  SEQUENCER_LIMITS,
} from "@/consts/audioSequencer";
import type { StepNote, Track } from "@/types/sequencer";
import { convertToAnalysisResult } from "@/utils/audio/sequencerAnalysis";
import { validateBPM, validateSteps } from "@/utils/audio/midiUtils";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";

const createEmptyStep = (): StepNote => ({
  active: false,
  midiNote: MIDI_CONSTANTS.DEFAULT_NOTE,
  velocity: MIDI_CONSTANTS.DEFAULT_VELOCITY,
});

export function useAudioSequencer(playSound: (inst: string, note: number, vel: number) => Promise<void>) {
  const [bpm, setBpmState] = useState<number>(SEQUENCER_LIMITS.DEFAULT_BPM);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [numSteps, setNumSteps] = useState<number>(SEQUENCER_LIMITS.DEFAULT_STEPS);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedInstrument, setSelectedInstrument] = useState("piano");
  const stepTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tracksRef = useRef<Track[]>([]);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    tracksRef.current = tracks;
  }, [tracks]);

  const setBpm = useCallback((value: number) => {
    setBpmState(validateBPM(value));
  }, []);

  const updateStep = useCallback(
    (trackId: string, stepIndex: number, updates: Partial<StepNote>) => {
      setTracks((prev) =>
        prev.map((track) => {
          if (track.id !== trackId) return track;
          const newSteps = [...track.steps];
          if (!newSteps[stepIndex]) return track;
          newSteps[stepIndex] = { ...newSteps[stepIndex], ...updates };
          return { ...track, steps: newSteps };
        })
      );
    },
    []
  );

  const toggleStep = useCallback(
    (trackId: string, stepIndex: number) => {
      setTracks((prev) =>
        prev.map((track) => {
          if (track.id !== trackId) return track;
          const newSteps = [...track.steps];
          const step = newSteps[stepIndex];
          if (!step) return track;
          newSteps[stepIndex] = { ...step, active: !step.active };
          return { ...track, steps: newSteps };
        })
      );
    },
    []
  );

  const addTrack = useCallback(() => {
    setTracks((prev) => {
      const newTrack: Track = {
        id: `track-${Date.now()}`,
        name: `${INSTRUMENTS.find((i) => i.value === selectedInstrument)?.label ?? selectedInstrument} ${prev.length + 1}`,
        instrument: selectedInstrument,
        steps: Array(numSteps)
          .fill(null)
          .map(() => createEmptyStep()),
      };
      return [...prev, newTrack];
    });
  }, [selectedInstrument, numSteps]);

  const removeTrack = useCallback((trackId: string) => {
    setTracks((prev) => prev.filter((t) => t.id !== trackId));
  }, []);

  const updateNumSteps = useCallback((newNumSteps: number) => {
    const n = validateSteps(newNumSteps);
    setNumSteps(n);
    setTracks((prev) =>
      prev.map((track) => {
        const current = track.steps.length;
        if (n > current) {
          const newSteps = [...track.steps];
          for (let i = current; i < n; i++) {
            newSteps.push(createEmptyStep());
          }
          return { ...track, steps: newSteps };
        }
        return { ...track, steps: track.steps.slice(0, n) };
      })
    );
  }, []);

  const togglePlayback = useCallback((resumeContext: () => void) => {
    setIsPlaying((p) => {
      if (!p) resumeContext();
      return !p;
    });
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      if (stepTimeoutRef.current) {
        clearTimeout(stepTimeoutRef.current);
        stepTimeoutRef.current = null;
      }
      return;
    }

    const stepDuration = (60 / bpm / 4) * 1000;
    let stepCounter = currentStep;

    const playStep = () => {
      tracksRef.current.forEach((track) => {
        const step = track.steps[stepCounter];
        if (step?.active) {
          playSound(track.instrument, step.midiNote, step.velocity);
        }
      });
      setCurrentStep(stepCounter);
      stepCounter = (stepCounter + 1) % numSteps;
      stepTimeoutRef.current = setTimeout(playStep, stepDuration);
    };

    playStep();
    return () => {
      if (stepTimeoutRef.current) {
        clearTimeout(stepTimeoutRef.current);
      }
    };
  }, [isPlaying, bpm, currentStep, numSteps, playSound]);

  const generateBlueprint = useCallback(
    (
      onProgress: (text: string) => void,
      onResult: (text: string) => void
    ) => {
      if (tracks.length === 0) {
        toast.error("Please add at least one track");
        return;
      }
      onProgress("Generating blueprint...");
      const analysis = convertToAnalysisResult(tracks, bpm);

      const worker = new Worker(
        new URL("../workers/audioBlueprintWorker.ts", import.meta.url)
      );
      workerRef.current = worker;

      worker.onmessage = (e: MessageEvent<{ error?: string } | string>) => {
        const result = e.data;
        worker.terminate();
        workerRef.current = null;
        if (typeof result === "object" && result.error) {
          toast.error(`Error: ${result.error}`);
          onProgress("Error generating blueprint!");
        } else {
          onResult(typeof result === "string" ? result : "");
          onProgress("Done!");
        }
      };

      worker.onerror = (error) => {
        console.error("Worker error:", error);
        toast.error("Error generating blueprint");
        onProgress("Error generating blueprint!");
        worker.terminate();
        workerRef.current = null;
      };

      worker.postMessage({ analysis });
    },
    [tracks, bpm]
  );

  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  return {
    bpm,
    setBpm,
    isPlaying,
    currentStep,
    numSteps,
    tracks,
    selectedInstrument,
    setSelectedInstrument,
    togglePlayback,
    addTrack,
    removeTrack,
    toggleStep,
    updateStep,
    updateNumSteps,
    generateBlueprint,
  };
}

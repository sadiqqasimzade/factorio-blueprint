"use client";

import { INSTRUMENT_SOUND_RANGES, MIDI_CONSTANTS } from "@/consts/audioSequencer";
import { getSoundPath } from "@/utils/audio/soundMapping";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const MAX_CACHED_BUFFERS = 100;

export function useSoundLoader() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const buffersRef = useRef<Record<string, AudioBuffer>>({});
  const bufferOrderRef = useRef<string[]>([]);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const [soundsReady, setSoundsReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const evictOldestBuffer = useCallback(() => {
    if (bufferOrderRef.current.length < MAX_CACHED_BUFFERS) return;
    const key = bufferOrderRef.current.shift();
    if (key && buffersRef.current[key]) {
      delete buffersRef.current[key];
    }
  }, []);

  const getSoundFileIndex = useCallback((midiNote: number, instrument: string): number => {
    const range = INSTRUMENT_SOUND_RANGES[instrument];
    if (!range) return 0;
    const minMidi = MIDI_CONSTANTS.MIN_NOTE;
    const maxMidi = MIDI_CONSTANTS.MIN_NOTE + range.count - 1;
    const clampedNote = Math.max(minMidi, Math.min(maxMidi, midiNote));
    return clampedNote - minMidi;
  }, []);

  const playSound = useCallback(
    async (instrument: string, midiNote: number, velocity: number) => {
      if (!audioContextRef.current) return;
      if (!INSTRUMENT_SOUND_RANGES[instrument]) return;

      const soundIndex = getSoundFileIndex(midiNote, instrument) + 1;
      const soundKey = `${instrument}-${soundIndex}`;

      let buffer = buffersRef.current[soundKey];

      if (!buffer) {
        try {
          const soundPath = getSoundPath(instrument, midiNote);
          const response = await fetch(soundPath);
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const arrayBuffer = await response.arrayBuffer();
          buffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
          evictOldestBuffer();
          buffersRef.current[soundKey] = buffer;
          bufferOrderRef.current.push(soundKey);
        } catch (error) {
          console.warn(`Failed to load sound: ${getSoundPath(instrument, midiNote)}`, error);
          return;
        }
      }

      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      const gainNode = audioContextRef.current.createGain();
      gainNode.gain.value = (velocity / MIDI_CONSTANTS.MAX_VELOCITY) * MIDI_CONSTANTS.VOLUME_SCALE;
      source.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      activeSourcesRef.current.add(source);
      source.onended = () => {
        activeSourcesRef.current.delete(source);
      };
      source.start(0);
    },
    [getSoundFileIndex, evictOldestBuffer]
  );

  useEffect(() => {
    try {
      audioContextRef.current = new AudioContext();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setLoadError("Audio initialization failed. Please check browser permissions.");
      toast.error("Audio initialization failed");
      console.error("AudioContext error:", error);
      setSoundsReady(true);
      return () => {};
    }

    const preloadCount = 3;
    const loadFew = async () => {
      if (!audioContextRef.current) return;
      const promises: Promise<void>[] = [];
      for (const instrument of Object.keys(INSTRUMENT_SOUND_RANGES).slice(0, 5)) {
        const range = INSTRUMENT_SOUND_RANGES[instrument];
        if (!range) continue;
        for (let i = 1; i <= Math.min(preloadCount, range.count); i++) {
          const soundKey = `${instrument}-${i}`;
          if (buffersRef.current[soundKey]) continue;
          const fileNumber = i.toString().padStart(2, "0");
          const soundPath = `/sounds/${range.baseName}-${fileNumber}.ogg`;
          promises.push(
            fetch(soundPath)
              .then((r) => r.arrayBuffer())
              .then((ab) => audioContextRef.current!.decodeAudioData(ab))
              .then((buf) => {
                buffersRef.current[soundKey] = buf;
                bufferOrderRef.current.push(soundKey);
              })
              .catch(() => {})
          );
        }
      }
      await Promise.all(promises);
      setSoundsReady(true);
    };
    loadFew();

    return () => {
      activeSourcesRef.current.forEach((source) => {
        try {
          source.stop();
        } catch {
          // ignore
        }
      });
      activeSourcesRef.current.clear();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    playSound,
    soundsReady,
    loadError,
    resumeContext: useCallback(() => {
      if (
        audioContextRef.current?.state === "suspended"
      ) {
        audioContextRef.current.resume();
      }
    }, []),
  };
}

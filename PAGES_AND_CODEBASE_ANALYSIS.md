# Pages & Codebase Analysis

## Summary

Analysis covers **app**, **types**, **contexts**, **consts**, **components**, **classes**, **workers**, and **utils** after applying the audio-converter fixes. Findings and recommendations are aligned with senior architect and fullstack practices.

---

## 1. App Pages

### 1.1 `/audio-converter` ✅ Refactored
- **Status:** Refactored per review: consts, utils, hooks, and components extracted.
- **Structure:** Uses `useSoundLoader`, `useAudioSequencer`, `SequencerControls`, `TrackItem`, `BlueprintResult`.
- **Notes:** Worker ref and cleanup in hook; error handling and buffer eviction in `useSoundLoader`.

### 1.2 `/decode-encode`
- **Issues:**
  - Worker created once in `useEffect` and reused; good. No worker ref passed to `inputChange` dependency.
  - `dangerouslySetInnerHTML={{ __html: result }}` — XSS risk if result ever contains user/session data. Currently decode/encode output only; still worth restricting/sanitizing or rendering as text.
  - `scrollContainer` state derived from `scrollContainerRef.current` when `result` changes; could be a ref to avoid re-renders.
  - No shared `Container`/layout; page is a fragment. Consider wrapping in `Container` for consistency.
- **Recommendations:**
  - Avoid `dangerouslySetInnerHTML` where possible; render plain text or use a safe JSON/HTML viewer.
  - Wrap in `Container` for consistency with other tool pages.

### 1.3 `/video-converter`
- **Issues:**
  - Large single component (~506 lines); frame extraction, GIF handling, and UI mixed together.
  - Worker created per `generateResult` call and not stored in a ref; cleanup only on success/error, not on unmount if generation is in progress.
  - Magic numbers (50, 30, 2, 10, 60, 200, 100) for dimensions and frame settings.
  - Assertions like `as HTMLCanvasElement` and `progressRef.current!` can throw at runtime.
- **Recommendations:**
  - Extract hooks: `useVideoFrames`, `useGifFrames`, `useBlueprintWorker`; extract subcomponents for controls and result.
  - Store worker in a ref and terminate on unmount.
  - Move limits and defaults to `consts` (e.g. `videoConverter.ts`).

### 1.4 `/image-converter-lamp`, `/image-converter-tile`, `/image-converter-platform`
- **Pattern:** Thin wrappers around `ImageConverterPage` with different `convertToProp` and `skipInputProp`.
- **Status:** Clear and consistent. No changes required beyond what applies to `ImageConverterPage` and shared components.

### 1.5 `/pixel-art-lamp`, `/pixel-art-tile`
- Same pattern as image converters; delegate to shared pixel art flow.

### 1.6 `/` (Home)
- Landing with cards and links. Fits current scope.

### 1.7 `/llm/route`
- API route (GET) for LLM metadata. No page UI.

---

## 2. Types

- **Location:** `types/*.d.ts` — global declarations for blueprint entities and signals.
- **Findings:**
  - `sequencer.d.ts` added for `StepNote`, `Track`, `MIDINote`, `MIDITrack`, `AudioAnalysisResult`, `InstrumentOption`; used by audio sequencer and utils.
  - Other types (`TBpSignal`, `TBpWire`, `CompareOperations`, etc.) are consistent and used by classes and convertors.
- **Recommendations:**
  - Keep exporting shared domain types from `types/` and use them in both app and workers where relevant (e.g. `AudioAnalysisResult` if worker is typed).

---

## 3. Contexts

- **SettingsContext:** Holds quality, convertTo, skipInput, lamp options, dimension limits. Used by image/video converters and Result.
- **Modal / PixelArt / etc.:** Not re-inspected here; assume existing usage is correct.
- **Recommendations:**
  - Document which pages depend on which context values to avoid unused or duplicate state.
  - Consider splitting if SettingsContext grows (e.g. “converter settings” vs “app settings”).

---

## 4. Consts

- **Existing:** `colorsEnum`, `enums` (e.g. `TileNames`, `Directions`, `EntityNames`), `signalsEnum`.
- **Added:** `audioSequencer.ts` — `INSTRUMENTS`, `MIDI_CONSTANTS`, `SEQUENCER_LIMITS`, `INSTRUMENT_SOUND_RANGES`.
- **Recommendations:**
  - Video converter limits (min/max width/height, default dimensions, frame defaults) could move to e.g. `consts/videoConverter.ts` for consistency.

---

## 5. Components

### 5.1 `audio_sequencer` (new)
- **SequencerControls:** BPM, steps, play, add track, generate blueprint. Uses consts and validation from `utils/audio/midiUtils`.
- **TrackItem:** One track row with step grid and note/velocity sliders.
- **BlueprintResult:** Status text, result area, copy-on-click; ref forwarded to result paragraph.
- **Status:** Focused components; no major issues.

### 5.2 `result/result.tsx`
- **Issue:** `worker` is declared with `let worker: Worker` and may be used uninitialized in the `if (worker)` and cleanup when `convertTo` doesn’t match any case (TypeScript may not narrow correctly in all paths).
- **Recommendation:** Initialize `worker` to `null` or use a ref, and always assign in each branch; cleanup in `useEffect` return.

### 5.3 `shared/imageConverterPage`
- Flow: FileDropZone → ImageEditor → PixelArtPage → Result. Uses SettingsContext for convertTo/skipInput.
- **Recommendation:** Optional: add error boundary or loading state when switching convertTo during heavy work.

### 5.4 `drag_and_drop/FileDropZone`
- Uses `validateFiles` and context. Looks consistent with the rest of the app.

### 5.5 Others (card, header, footer, dropdown, image_editor, pixel_art, json_viewer, size_input)
- Not re-audited in detail; no structural issues observed from the analyzed pages.

---

## 6. Classes

- Blueprint entity classes (`BpEntity`, `BpLamp`, `BpProgrammableSpeaker`, combinators, etc.) and `BpStaticMethods` are used by convertors and workers.
- **Status:** Coherent domain model; no change suggested from this analysis.

---

## 7. Workers

- **audioBlueprintWorker:** Receives `analysis`, calls `AudioToBlueprintConvertor`, then `blueprintEncoder`; posts string or `{ error }`. Aligned with new sequencer flow.
- **decodeEncodeWorker:** Used by decode-encode page; handles decode/encode messages.
- **blueprintWorker:** Used by video-converter; receives images and options.
- **lampWorker, tileWorker, platformWorker:** Used by `Result` based on `convertTo`.
- **gridWorker:** Used by pixel art flow.
- **Recommendations:**
  - Ensure every worker is terminated on unmount or when the operation is cancelled (audio sequencer hook already does this).
  - Optionally add shared types (e.g. for worker message payloads) in `types/` to keep contracts clear.

---

## 8. Utils

### 8.1 `audio/` (new)
- **midiUtils:** `getNoteName`, `validateBPM`, `validateSteps`, `validateMIDINote`, `validateVelocity` — used by sequencer and components.
- **soundMapping:** `getSoundPath`, `getSoundFileIndex`, `sanitizeInstrumentName`, `hasSoundRange` — used by `useSoundLoader`.
- **sequencerAnalysis:** `convertToAnalysisResult` — used by `useAudioSequencer` and worker input.
- **Status:** Clear separation; no duplication with page logic.

### 8.2 `convertors/`
- `audioToBlueprintConvertor` already used by worker; other convertors (image, video, etc.) unchanged.
- **Recommendation:** Keep convertors pure (input → blueprint); no React or hooks inside.

### 8.3 `handlers/`
- `clickCopyHandler`, `validateFiles` — used across pages; keep as-is.

### 8.4 `image/`
- Color and canvas utilities; used by video and image flows. No change suggested.

---

## 9. Cross-Cutting Recommendations

1. **Worker lifecycle:** Every page or hook that creates a worker should store it in a ref and call `terminate()` in a `useEffect` cleanup (and on success/error where appropriate). Audio sequencer and decode-encode already use refs; video-converter and Result should be verified/updated.
2. **Error handling:** Prefer toast or inline message for user-visible errors; avoid silent failures. Audio flow now shows load/context errors; same pattern can be applied to video and decode-encode.
3. **Constants:** Keep magic numbers and limits in `consts/` (and optionally in `types/` for enums). Video converter is the next candidate.
4. **Large pages:** Video-converter and decode-encode would benefit from the same pattern used for audio-converter: extract hooks, small components, and consts/utils.
5. **Security:** Minimize or remove `dangerouslySetInnerHTML`; ensure any dynamic content is sanitized or rendered as text/structured data.

---

## 10. Audio-Converter Fixes Applied

- **Consts:** `consts/audioSequencer.ts` for instruments, MIDI and sequencer limits, sound ranges.
- **Types:** `types/sequencer.d.ts` for sequencer and analysis types.
- **Utils:** `utils/audio/midiUtils.ts`, `soundMapping.ts`, `sequencerAnalysis.ts`.
- **Hooks:** `hooks/useSoundLoader.ts` (context, buffers, eviction, active sources cleanup), `hooks/useAudioSequencer.ts` (state, playback, worker ref + cleanup).
- **Components:** `SequencerControls`, `TrackItem`, `BlueprintResult` under `components/audio_sequencer/`.
- **Page:** `app/audio-converter/page.tsx` reduced to composition and local UI state (e.g. progress, isGenerating).
- **Memory:** Worker ref and terminate on unmount; active audio sources tracked and stopped on cleanup; buffer cache with eviction.
- **Errors:** Audio context failure and load errors surfaced to user; worker errors reported via toast and status.

---

## 11. Suggested Next Steps (Priority)

1. **Video-converter:** Extract hooks and subcomponents; worker ref + cleanup; move constants to `consts`.
2. **Decode-encode:** Replace or narrow `dangerouslySetInnerHTML`; wrap in `Container` if desired.
3. ~~**Result component:** worker ref and cleanup~~ **Done.**
4. ~~**lampWorker** `as any`~~ **Done** (typed as `TileNames | null`).
5. **Script:** `npm run type-check` runs `tsc --noEmit`.
6. **Optional:** Add a small “converter limits” consts file and use it in video-converter and settings.

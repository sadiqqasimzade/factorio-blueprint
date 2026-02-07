// "use client";

// import {
//     BlueprintResult,
//     SequencerControls,
//     TrackItem,
// } from "@/components/audio_sequencer";
// import Container from "@/components/shared/container";
// import { useAudioSequencer } from "@/hooks/useAudioSequencer";
// import { useSoundLoader } from "@/hooks/useSoundLoader";
// import { useCallback, useRef, useState } from "react";

// export default function AudioConverter() {
//   const [showAddTrack, setShowAddTrack] = useState(false);
//   const [progressStatus, setProgressStatus] = useState("Ready");
//   const [isGenerating, setIsGenerating] = useState(false);
//   const resultRef = useRef<HTMLParagraphElement>(null);

//   const { playSound, loadError, resumeContext } = useSoundLoader();

//   const sequencer = useAudioSequencer(playSound);

//   const handleTogglePlayback = useCallback(() => {
//     sequencer.togglePlayback(resumeContext);
//   }, [sequencer.togglePlayback, resumeContext]);

//   const handleGenerateBlueprint = useCallback(() => {
//     setIsGenerating(true);
//     sequencer.generateBlueprint(
//       (status) => {
//         setProgressStatus(status);
//         if (status !== "Generating blueprint...") {
//           setIsGenerating(false);
//         }
//       },
//       (text) => {
//         if (resultRef.current) {
//           resultRef.current.textContent = text;
//         }
//       }
//     );
//   }, [sequencer.generateBlueprint]);

//   return (
//     <Container>
//       <div className="flex flex-col gap-8">
//         <div className="text-center space-y-2">
//           <h1 className="text-3xl md:text-4xl font-bold">Audio Sequencer</h1>
//           <p className="text-neutral-300">
//             Create music patterns and convert them to Factorio blueprints
//           </p>
//         </div>

//         {loadError && (
//           <div className="rounded-md border border-amber-700 bg-amber-900/30 p-3 text-sm text-amber-200">
//             {loadError}
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <section className="lg:col-span-2 rounded-xl border border-neutral-700 bg-neutral-900/60 p-6 space-y-6">
//             <SequencerControls
//               isPlaying={sequencer.isPlaying}
//               bpm={sequencer.bpm}
//               setBpm={sequencer.setBpm}
//               numSteps={sequencer.numSteps}
//               onStepsChange={sequencer.updateNumSteps}
//               onTogglePlayback={handleTogglePlayback}
//               showAddTrack={showAddTrack}
//               setShowAddTrack={setShowAddTrack}
//               selectedInstrument={sequencer.selectedInstrument}
//               setSelectedInstrument={sequencer.setSelectedInstrument}
//               onAddTrack={sequencer.addTrack}
//               onGenerateBlueprint={handleGenerateBlueprint}
//               isGenerating={isGenerating}
//             />

//             <div className="space-y-4">
//               {sequencer.tracks.length === 0 ? (
//                 <div className="text-center py-8 text-neutral-400">
//                   No tracks yet. Click &quot;Add Track +&quot; to get started.
//                 </div>
//               ) : (
//                 sequencer.tracks.map((track) => (
//                   <TrackItem
//                     key={track.id}
//                     track={track}
//                     currentStep={sequencer.currentStep}
//                     isPlaying={sequencer.isPlaying}
//                     onToggleStep={sequencer.toggleStep}
//                     onUpdateStep={sequencer.updateStep}
//                     onRemoveTrack={sequencer.removeTrack}
//                   />
//                 ))
//               )}
//             </div>
//           </section>

//           <BlueprintResult
//             ref={resultRef}
//             statusText={progressStatus}
//             isGenerating={isGenerating}
//             onCopyClick={() => {}}
//           />
//         </div>
//       </div>
//     </Container>
//   );
// }


export default function AudioConverter() {
  return (
    <div>
      <h1>Audio Converter WIP</h1>
    </div>
  );
}
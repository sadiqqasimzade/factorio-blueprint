"use client"
import Container from "@/components/shared/container";
// import { useEffect, useRef, useState } from "react";

export default function AudioConverter() {
  return(
  <Container>
    Not available yet
  </Container>
)

// type OggFile={
//   id: string, 
//   name: string, 
//   bgColor:string
//   path: string
// }

// type Sequence = {
//   [key: string]: boolean[]
// }

// export default function AudioConverter() {
  

//   const generate = (basename: string,bgColor:string, from: number, to: number): OggFile[] => {

//     const result:OggFile[] = []
//     for (let i = 0; i <= to - from; i++) {
//       result.push({
//         id:basename+`${i+1}`,
//         name:basename.charAt(0).toUpperCase() + basename.slice(1)+` ${i+1}`,
//         bgColor:bgColor,
//         path:basename+`-${(i+1)<10 ? "0"+(i+1) : (i+1)}.ogg`
//       })

//     }

//     return result
//   }


//   const basses = generate("bass","bg-purple-500",1,36)


//   const celestas = generate("celesta","bg-green-500",1,36)

//   const kits = generate("kit","bg-red-500",1,17)

//   const leads = generate("lead","bg-red-500",1,36)

//   const pianos = generate("piano1","bg-yellow-500",1,48)

//   const plucks = generate("plucked","bg-yellow-500",1,36)

//   const saws = generate("saw","bg-purple-500",1,36)

  

//   const squares = generate("square","bg-yellow-500",1,36)

//   const steelDrums = generate("steel-drum","bg-purple-500",1,36)

//   const vibraphones = generate("vibraphone","bg-green-500",1,36)


//   const [bpm, setBpm] = useState(120);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [volume, setVolume] = useState(0.7);
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
//   const [showInstrumentDropdown, setShowInstrumentDropdown] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [sequence, setSequence] = useState<Sequence>(() => ({
   
//   }));

//   const audioContextRef = useRef<AudioContext | null>(null);
//   const buffersRef = useRef<{ [key: string]: AudioBuffer }>({});
//   const stepTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const instrumentCategories = {
//     "Bass":basses,
//     "Celesta":celestas,
//     "Kits":kits,
//     "Leads":leads,
//     "Pianos":pianos,
//     "Plucks":plucks,
//     "Saws":saws,
//     "Square":squares,
//     "Steel Drum":steelDrums,
//     "Vibraphone":vibraphones,
//     "Plucked":plucks,
//     "Kit":kits,
//     "Piano":pianos,
//     "Others":[
//       {"id":"ring","name":"Ring","bgColor":"bg-red-500","path":"ring.ogg"},
//       {"id":"siren","name":"Siren","bgColor":"bg-blue-500","path":"siren.ogg"},
//       {"id":"alarm","name":"Alarm","bgColor":"bg-blue-500","path":"alarm-1.ogg"},
//       {"id":"buzzer-1","name":"Buzzer1","bgColor":"bg-gray-500","path":"buzzer-1.ogg"},
//       {"id":"buzzer-2","name":"Buzzer2","bgColor":"bg-gray-500","path":"buzzer-2.ogg"},
//     ]

//   };
//   const instruments = Object.values(instrumentCategories).flat()
  
//   const addInstrumentToSequence = (instrumentId: string) => {
//     setSequence(prev => {
//       const newSequence = { ...prev };
//       if (!newSequence[instrumentId]) {
//         newSequence[instrumentId] = Array(16).fill(false);
//       }
//       return newSequence;
//     });
//     setShowCategoryDropdown(false);
//     setShowInstrumentDropdown(false);
//     setSelectedCategory(null);
//   };

  

//   const clearAllInstruments = () => {
//     setSequence({});
//   };

//   // Initialize audio context and load sounds
//   useEffect(() => {
//     const initAudio = async () => {
//       try {
//         audioContextRef.current = new AudioContext();

//         // Load all instrument sounds
//         for (const inst of instruments) {
//           const response = await fetch(`/sounds/${inst.path}`);
//           const arrayBuffer = await response.arrayBuffer();
//           const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
//           buffersRef.current[inst.id] = audioBuffer;
//         }
//       } catch (error) {
//         console.error('Error initializing audio:', error);
//       }
//     };

//     initAudio();

//     return () => {
//       if (audioContextRef.current) {
//         audioContextRef.current.close();
//       }
//       if (stepTimeoutRef.current) {
//         clearTimeout(stepTimeoutRef.current);
//       }
//     };
//   }, []);

//   // Playback logic
//   useEffect(() => {
//     if (!isPlaying) {
//       if (stepTimeoutRef.current) {
//         clearTimeout(stepTimeoutRef.current);
//       }
//       return;
//     }

//     const stepDuration = 60 / bpm / 4; // 16th note duration in seconds
//     let nextStepTime = audioContextRef.current?.currentTime || 0;
//     let stepCounter = currentStep;

//     const playStep = () => {
//       if (!isPlaying) return;

//       // Play sounds for current step
//       instruments.forEach(inst => {
//         if (sequence[inst.id] && sequence[inst.id][stepCounter]) {
//           playSound(inst.id);
//         }
//       });

//       // Update current step
//       setCurrentStep(stepCounter);
//       stepCounter = (stepCounter + 1) % 16;

//       // Schedule next step
//       nextStepTime += stepDuration;
//       const timeUntilNext = nextStepTime - (audioContextRef.current?.currentTime || 0);
//       stepTimeoutRef.current = setTimeout(playStep, timeUntilNext * 1000);
//     };

//     playStep();

//     return () => {
//       if (stepTimeoutRef.current) {
//         clearTimeout(stepTimeoutRef.current);
//       }
//     };
//   }, [isPlaying, bpm, sequence, currentStep]);

//   const playSound = (instrumentId:string) => {
//     if (!buffersRef.current[instrumentId] || !audioContextRef.current) return;

//     const source = audioContextRef.current.createBufferSource();
//     source.buffer = buffersRef.current[instrumentId];

//     const gainNode = audioContextRef.current.createGain();
//     gainNode.gain.value = volume;

//     source.connect(gainNode);
//     gainNode.connect(audioContextRef.current.destination);

//     source.start(0);
//   };

//   const toggleStep = (instrumentId: string, stepIndex: number) => {
//     setSequence(prev => {
//       const newSequence = { ...prev };
//       if (!newSequence[instrumentId]) {
//         newSequence[instrumentId] = Array(16).fill(false);
//       }
//       const newSteps = [...newSequence[instrumentId]];
//       newSteps[stepIndex] = !newSteps[stepIndex];
//       newSequence[instrumentId] = newSteps;
//       return newSequence;
//     });
//   };

//   const togglePlayback = () => {
//     setIsPlaying(!isPlaying);
//     if (!isPlaying && audioContextRef.current && audioContextRef.current.state === 'suspended') {
//       audioContextRef.current.resume();
//     }
//   };

//   return (
//     <Container>
//       <div className="min-h-screen bg-gray-900 text-white p-8">
//         <div className="max-w-6xl mx-auto">
//           <h1 className="text-3xl font-bold mb-8 text-center">React Music Sequencer</h1>
          
//           {/* Controls */}
//           <div className="mb-8 flex justify-center items-center gap-4">
//             <button
//               onClick={togglePlayback}
//               className={`px-6 py-2 rounded-lg font-semibold cursor-pointer ${
//                 isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
//               }`}
//             >
//               {isPlaying ? 'Stop' : 'Play'}
//             </button>
            
//             <div className="flex items-center gap-2">
//               <label htmlFor="bpm" className="text-sm">BPM:</label>
//               <input
//                 id="bpm"
//                 type="range"
//                 min="60"
//                 max="180"
//                 value={bpm}
//                 onChange={(e) => setBpm(Number(e.target.value))}
//                 className="w-32"
//               />
//               <span className="text-sm">{bpm}</span>
//             </div>

//             <div className="flex items-center gap-2">
//               <label htmlFor="volume" className="text-sm">Volume:</label>
//               <input
//                 id="volume"
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.1"
//                 value={volume}
//                 onChange={(e) => setVolume(Number(e.target.value))}
//                 className="w-32"
//               />
//             </div>

//             <button
//               onClick={clearAllInstruments}
//               className="px-4 py-2 bg-red-500 hover:bg-red-600 cursor-pointer rounded-lg text-white font-semibold"
//             >
//               Clear All
//             </button>
//           </div>

//           <div className="bg-gray-800 p-6 rounded-lg mb-8">
//             <div className="flex flex-col gap-4">
//               <div className="relative">
//                 <button
//                   onClick={() => setShowCategoryDropdown(true)}
//                   className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold cursor-pointer"
//                 >
//                   Add instrument +
//                 </button>
                
//                 {showCategoryDropdown && (
//                   <div 
//                     className="absolute top-full left-0 mt-1 w-48 bg-gray-700 rounded-lg shadow-lg z-10"
//                     onMouseLeave={() => {
//                       setShowCategoryDropdown(false);
//                       setShowInstrumentDropdown(false);
//                       setSelectedCategory(null);
//                     }}
//                   >
//                     {Object.entries(instrumentCategories).map(([category, instruments]) => (
//                       <div key={category} className="relative">
//                         <button
//                           onMouseEnter={() => {
//                             setSelectedCategory(category);
//                             setShowInstrumentDropdown(true);
//                           }}
//                           className="w-full text-left px-4 py-2 hover:bg-gray-600 cursor-pointer"
//                         >
//                           {category}
//                         </button>
                        
//                         {selectedCategory === category && showInstrumentDropdown && (
//                           <div 
//                             className="absolute left-full top-0 w-48 bg-gray-700 rounded-lg shadow-lg"
//                             onMouseLeave={() => {
//                               setShowInstrumentDropdown(false);
//                               setSelectedCategory(null);
//                             }}
//                           >
//                             {instruments.map((inst) => (
//                               <button
//                                 key={inst.id}
//                                 onClick={() => addInstrumentToSequence(inst.id)}
//                                 className="w-full text-left px-4 py-2 hover:bg-gray-600 cursor-pointer"
//                               >
//                                 {inst.name}
//                               </button>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {Object.entries(sequence).map(([instrumentId, steps]) => {
//                 const instrument = instruments.find(i => i.id === instrumentId);
//                 return (
//                   <div key={instrumentId} className="flex items-center gap-4">
//                     <div className="w-32">
//                       <span className={`inline-block px-3 py-1 rounded ${instrument?.bgColor || 'bg-gray-500'}`}>
//                         {instrument?.name || instrumentId}
//                       </span>
//                     </div>
//                     <div className="flex gap-2">
//                       {steps.map((isActive, stepIndex) => (
//                         <button
//                           key={stepIndex}
//                           onClick={() => toggleStep(instrumentId, stepIndex)}
//                           className={`w-8 h-8 rounded transition-colors cursor-pointer ${
//                             isActive ? (instrument?.bgColor || 'bg-gray-500') : 'bg-gray-700'
//                           } ${currentStep === stepIndex && isPlaying ? 'ring-2 ring-white' : ''}`}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 shadow-2xl">
//             <h3 className="text-xl font-bold mb-4 text-cyan-300">How to Use Your OGG Sequencer</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <div className="flex items-start mb-3">
//                   <div className="bg-cyan-500 rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">1</div>
//                   <p>Select an instrument from the top row to activate it</p>
//                 </div>
//                 <div className="flex items-start mb-3">
//                   <div className="bg-cyan-500 rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">2</div>
//                   <p>Click on the grid cells to activate/deactivate steps for each instrument</p>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex items-start mb-3">
//                   <div className="bg-cyan-500 rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">3</div>
//                   <p>Adjust BPM to control the tempo of your composition</p>
//                 </div>
//                 <div className="flex items-start">
//                   <div className="bg-cyan-500 rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">4</div>
//                   <p>Press Play to hear your composition and experiment with patterns</p>
//                 </div>
//               </div>
//             </div>
           
//           </div>

//         </div>
//       </div>

//       {/* Glow effects for buttons (pseudo-elements) */}
//       <style jsx>{`
//         .shadow-red-glow {
//           box-shadow: 0 0 15px rgba(239, 68, 68, 0.7);
//         }
//         .shadow-green-glow {
//           box-shadow: 0 0 15px rgba(16, 185, 129, 0.7);
//         }
//         .shadow-amber-glow {
//           box-shadow: 0 0 15px rgba(245, 158, 11, 0.7);
//         }
//         .shadow-cyan-glow {
//           box-shadow: 0 0 15px rgba(6, 182, 212, 0.7);
//         }
//       `}</style>
//     </Container>
//   );
}
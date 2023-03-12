import React, { useState, useEffect } from "react";
type Props = {};

function getFrequencies(audioBuffer: AudioBuffer): Promise<number[][]> {
  const ctx = new OfflineAudioContext(
    audioBuffer.numberOfChannels,
    audioBuffer.length,
    audioBuffer.sampleRate
  );

  const source = ctx.createBufferSource();
  source.buffer = audioBuffer;

  const analyser = ctx.createAnalyser();
  analyser.fftSize = 1024;

  source.connect(analyser);
  analyser.connect(ctx.destination);

  source.start(18,0,1);
  
  ctx.startRendering();
  return new Promise((resolve, reject) => {
    ctx.oncomplete = (event) => {
      const buffer = event.renderedBuffer;
      const frequencyData: number[][] = [];
      
      for (let i = 0; i < buffer.length; i+=(1/buffer.duration)) {
        const time = buffer.duration * (i / buffer.length);
        const data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        console.log(i)
        frequencyData.push([time, ...data]);
      }

      resolve(frequencyData);
    };
  });
}
function MusicConverterPage() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [frequencyData, setFrequencyData] = useState<number[][]>([]);

  useEffect(() => {
    if (audioFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const audioContext = new AudioContext();
        audioContext
          .decodeAudioData(fileReader.result as ArrayBuffer)
          .then((audioBuffer) => {
            getFrequencies(audioBuffer).then((data) => {
              setFrequencyData(data);
            });
          });
      };
      fileReader.readAsArrayBuffer(audioFile);
    }
  }, [audioFile]);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files[0]) {
      setAudioFile(files[0]);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileInputChange} />
      {frequencyData.map(([time, ...data], index) => (
        <div style={{color:'white',fontSize:'18px'}} key={index}>
          <div>{time}</div>
          <div>{data.slice(0,14).join(", ")}</div>
        </div>
      ))}
    </div>
  );
}

export default MusicConverterPage;

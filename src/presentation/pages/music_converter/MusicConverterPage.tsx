import React, { useState, useEffect } from "react";
type Props = {};




function MusicConverterPage() {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [frequencyData, setFrequencyData] = useState<Uint8Array | null>(null);

  const handleAudioFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const audioContext = new AudioContext();
      const fileBuffer = await file.arrayBuffer();
      audioContext.decodeAudioData(fileBuffer, (buffer) => {
        setAudioBuffer(buffer);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        const bufferSource = audioContext.createBufferSource();
        bufferSource.buffer = buffer;
        bufferSource.connect(analyser);
        analyser.connect(audioContext.destination);
        const frequencyData = new Uint8Array(analyser.frequencyBinCount);
        setFrequencyData(frequencyData);
        const updateFrequencyData = () => {
          analyser.getByteFrequencyData(frequencyData);
          setFrequencyData(new Uint8Array(frequencyData));
          setTimeout(updateFrequencyData, 250);
        };
        setTimeout(updateFrequencyData, 250);
      });
    }
  };

  return (
    <div>

      <input type="file" accept="audio/*" onChange={handleFileInputChange} />
      {frequencyData.map(([time, ...data], index) => (
        <div style={{ color: 'white', fontSize: '18px' }} key={index}>
          <div>{time}</div>
          <div>{data.slice(0, 14).join(", ")}</div>
        </div>
      ))}

    </div>
  );
}

export default MusicConverterPage;

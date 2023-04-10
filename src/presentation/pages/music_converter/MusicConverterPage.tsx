import React, { useState, useEffect, useRef } from "react";
import styles from './MusicConverterPage.module.scss'
type Props = {};




function MusicConverterPage() {

  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [frequencyData, setFrequencyData] = useState<Float32Array | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAudioFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const analyzeAudioFile = async (file: File) => {
    const audioContext = new AudioContext();
    const fileReader = new FileReader();

    fileReader.readAsArrayBuffer(file);
    fileReader.onload = async () => {
      const audioBuffer = await audioContext.decodeAudioData(fileReader.result as ArrayBuffer);

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      const frequencyData = new Float32Array(analyser.frequencyBinCount);
      setIsAnalyzing(true);

      const analyze = () => {
        requestAnimationFrame(analyze);
        analyser.getFloatFrequencyData(frequencyData);
        setFrequencyData(frequencyData.slice());
      };

      source.start();
      analyze();
    };
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleAudioFileChange} />
      {audioFile && (
        <button
          onClick={() => {
            analyzeAudioFile(audioFile);
          }}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze"}
        </button>
      )}
      {frequencyData && (
        <div>
          {frequencyData.map((frequency, index) => (
            <div key={index}>
              <p>
                {frequency}
              </p>
              <br></br>
              <p>aaa</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MusicConverterPage;

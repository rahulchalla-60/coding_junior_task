import React, { useEffect, useRef, useState } from 'react';

const VoiceRecorder: React.FC = () => {
  const workerRef = useRef<Worker | null>(null);
  const [transcript, setTranscript] = useState('');
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    workerRef.current = new Worker('/whisper-worker.js');
    workerRef.current.postMessage({ type: 'init' });

    workerRef.current.onmessage = (event) => {
      if (event.data.type === 'ready') {
        // Worker is ready
      }
      if (event.data.type === 'transcript') {
        setTranscript(event.data.text);
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = async (e) => {
      if (e.data.size > 0 && workerRef.current) {
        // Convert Blob to ArrayBuffer, then to Float32Array
        const arrayBuffer = await e.data.arrayBuffer();
        // For real Whisper WASM, you may need to decode PCM, but for now just send the buffer
        workerRef.current.postMessage({ type: 'audio-chunk', data: arrayBuffer }, [arrayBuffer]);
      }
    };

    mediaRecorder.start(250); // 250ms chunks
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <div>Transcript: {transcript}</div>
    </div>
  );
};

export default VoiceRecorder;
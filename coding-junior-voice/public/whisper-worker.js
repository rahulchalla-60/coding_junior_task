// public/whisper-worker.js

// Placeholder for WASM and model loading
let isReady = false;

self.onmessage = async (event) => {
  const { type, data } = event.data;

  if (type === 'init') {
    // TODO: Load WASM and model here
    isReady = true;
    self.postMessage({ type: 'ready' });
  }

  if (type === 'audio-chunk' && isReady) {
    // TODO: Process audio chunk with Whisper WASM
    // For now, just echo back a fake transcript
    self.postMessage({ type: 'transcript', text: '[fake transcript]' });
  }
};
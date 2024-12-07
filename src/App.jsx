// src/App.jsx
import React, { useState } from 'react';
import * as Tone from 'tone';
import CircleSequencer from './components/CircleSequencer';

function App() {
  const [started, setStarted] = useState(false);

  const handleStart = async () => {
    await Tone.start(); // Start the audio context after user gesture
    setStarted(true);
  }

  return (
    <div
      style={{
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100vw',
        height: '100vh',
        margin: 0
      }}
    >
      {!started && (
        <div style={{textAlign:'center', padding:'50px'}}>
          <h1>Welcome to the Circle Sequencer</h1>
          <button onClick={handleStart}>Launch</button>
        </div>
      )}
      {started && <CircleSequencer />}
    </div>
  );
}

export default App;

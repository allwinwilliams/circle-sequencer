// src/components/CircleSequencer.jsx
import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import SequencerCanvas from './SequencerCanvas';

const categories = {
  red: '/assets/sounds/kick.wav',
  blue: '/assets/sounds/clap.wav',
  green: '/assets/sounds/snare.wav',
  yellow: '/assets/sounds/beep.wav'
};

function CircleSequencer() {
  const [bpm, setBpm] = useState(120);
  const [dots, setDots] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [angle, setAngle] = useState(0);

  const playersRef = useRef({});
  const prevAngleRef = useRef(0);
  const requestRef = useRef(null);

  useEffect(() => {
    const players = {};
    for (const cat in categories) {
      players[cat] = new Tone.Player(categories[cat]).toDestination();
    }
    playersRef.current = players;

    Tone.loaded().then(() => {
      setAllLoaded(true);
    });
  }, []);

  // Animation frame for angle updates
  useEffect(() => {
    if (!allLoaded) return;

    let lastTime = performance.now();

    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      const degreesPerSecond = bpm * 6;
      const deltaSeconds = delta / 1000;
      const newAngle = (angle + degreesPerSecond * deltaSeconds) % 360;

      triggerDots(prevAngleRef.current, newAngle);
      setAngle(newAngle);
      prevAngleRef.current = newAngle;

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [bpm, allLoaded, angle, dots]);

  const triggerDots = (prevAngle, newAngle) => {
    if (!allLoaded) return;

    let eventCount = 0; 
    dots.forEach(dot => {
      const dotAngle = dot.angle;
      const crossedForward = (prevAngle < dotAngle && newAngle >= dotAngle);
      const wrappedAround = (prevAngle > newAngle) && (dotAngle <= newAngle || dotAngle >= prevAngle);

      if (crossedForward || wrappedAround) {
        // Stagger start times slightly to avoid identical start times
        const startTime = Tone.now() + (eventCount * 0.0001);
        playersRef.current[dot.category]?.start(startTime);
        eventCount++;
      }
    });
  };

  if (!allLoaded) {
    return <div style={{textAlign:'center', padding:'20px'}}>Loading sounds...</div>;
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Circle Sequencer</h1>
      <div style={{ marginBottom: '20px' }}>
        <label>
          BPM: {bpm}
          <input 
            type="range" 
            min="40" 
            max="360" 
            value={bpm} 
            onChange={e => setBpm(Number(e.target.value))}
            style={{ marginLeft: '10px', width: '200px' }}
          />
        </label>
      </div>
      <SequencerCanvas 
        angle={angle}
        dots={dots}
        onChangeDots={setDots} 
      />
    </div>
  );
}

export default CircleSequencer;

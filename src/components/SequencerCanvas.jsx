// src/components/SequencerCanvas.jsx
import React, { useState } from 'react';
import CategorySelection from './CategorySelection';
import Dot from './Dot';

const RADIUS = 200;
const CENTER = {x:200, y:200};

function SequencerCanvas({ angle, dots, onChangeDots }) {
  const [showCategorySelection, setShowCategorySelection] = useState(false);
  const [selectionPosition, setSelectionPosition] = useState({x:0,y:0});
  const [selectedDotId, setSelectedDotId] = useState(null);

  const getAngleFromPosition = (x,y) => {
    const dx = x - CENTER.x;
    const dy = y - CENTER.y;
    let deg = Math.atan2(dy, dx) * (180/Math.PI);
    return (deg + 360) % 360;
  };

  const handleBackgroundClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = x - CENTER.x;
    const dy = y - CENTER.y;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if (dist <= RADIUS) {
      setSelectionPosition({x,y});
      setSelectedDotId(null);
      setShowCategorySelection(true);
    }
  };

  const handleCategorySelect = (category) => {
    if (selectedDotId != null) {
      // Editing existing dot
      if (category === 'delete') {
        onChangeDots(dots.filter(d => d.id !== selectedDotId));
      } else {
        onChangeDots(dots.map(d => d.id === selectedDotId ? {...d, category} : d));
      }
    } else {
      // Adding new dot
      const {x,y} = selectionPosition;
      const angle = getAngleFromPosition(x,y);
      const newDot = {
        id: Date.now(),
        x,
        y,
        category,
        angle
      };
      onChangeDots([...dots, newDot]);
    }
    setShowCategorySelection(false);
  };

  const handleDotSelect = (id) => {
    const dot = dots.find(d=>d.id===id);
    if (dot) {
      setSelectionPosition({x:dot.x, y:dot.y});
      setSelectedDotId(id);
      setShowCategorySelection(true);
    }
  };

  const handleDotDrag = (id, newX, newY) => {
    const angle = getAngleFromPosition(newX,newY);
    onChangeDots(dots.map(d => d.id===id ? {...d, x:newX, y:newY, angle} : d));
  };

  return (
    <div style={{width:'400px', margin:'0 auto', border:'1px solid #ccc', borderRadius:'4px', position:'relative'}}>
      {showCategorySelection && 
        <CategorySelection 
          x={selectionPosition.x} 
          y={selectionPosition.y}
          onSelect={handleCategorySelect} 
          isEditing={selectedDotId != null}
          onClose={() => setShowCategorySelection(false)}
        />
      }
      <svg 
        width="400px" 
        height="400px" 
        viewBox="0 0 400 400" 
        style={{ background: '#f9f9f9', display: 'block', margin: '0 auto' }}
        onClick={handleBackgroundClick}
      >
        {/* Background circle */}
        <circle cx="200" cy="200" r="200" fill="#eee" stroke="#ccc" strokeWidth="2"/>
        
        <image 
          href="/assets/grid.svg" 
          x="0" 
          y="0" 
          width="400" 
          height="400"
          preserveAspectRatio="xMidYMid slice"
        />
        
        {/* Center dot */}
        <circle cx="200" cy="200" r="5" fill="red"/>
        
        {/* Radar line */}
        <line 
          x1="320" 
          y1="320" 
          x2="200" 
          y2="200" 
          stroke="red" 
          strokeWidth="2"
          transform={`rotate(${angle},200,200)`}
        />
        
        {/* Render dots */}
        {dots.map(dot => (
          <Dot 
            key={dot.id} 
            dot={dot} 
            onSelect={handleDotSelect}
            onDrag={handleDotDrag}
            radius={RADIUS} // Make sure RADIUS aligns with your new coordinate system if needed
          />
        ))}
      </svg>
    </div>
  );
  
}

export default SequencerCanvas;

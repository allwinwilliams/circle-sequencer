// src/components/Dot.jsx
import React, { useState } from 'react';

function Dot({ dot, onSelect, onDrag, radius }) {
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({x:0,y:0});

  const handleMouseDown = (e) => {
    e.stopPropagation();
    setDragging(true);
    const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setOffset({x: x - dot.x, y: y - dot.y});
  };
  
  const handleMouseMove = (e) => {
    if (dragging) {
      const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
      const x = e.clientX - rect.left - offset.x;
      const y = e.clientY - rect.top - offset.y;
      // Check boundary
      const dx = x - 150;
      const dy = y - 150;
      if (Math.sqrt(dx*dx+dy*dy) <= radius) {
        onDrag(dot.id, x, y);
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (!dragging) {
      onSelect(dot.id);
    }
  };

  return (
    <circle 
      cx={dot.x} 
      cy={dot.y} 
      r="12" 
      fill={dot.category} 
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    />
  );
}

export default Dot;

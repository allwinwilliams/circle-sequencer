// src/components/CategorySelection.jsx
import React from 'react';

function CategorySelection({ x, y, onSelect, isEditing }) {
  const style = {
    position: 'absolute',
    top: y + 'px',
    left: x + 'px',
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '5px'
  };

  return (
    <div style={style}>
      <p style={{margin:'5px 0'}}>Select Category:</p>
      <button onClick={() => onSelect('red')} style={{background:'red',margin:'2px'}}>Red</button>
      <button onClick={() => onSelect('blue')} style={{background:'blue',margin:'2px',color:'#fff'}}>Blue</button>
      <button onClick={() => onSelect('green')} style={{background:'green',margin:'2px',color:'#fff'}}>Green</button>
      <button onClick={() => onSelect('yellow')} style={{background:'yellow',margin:'2px'}}>Yellow</button>
      {isEditing && (
        <>
          <hr style={{margin:'5px 0'}}/>
          <button onClick={() => onSelect('delete')} style={{background:'#aaa',margin:'2px'}}>Delete</button>
        </>
      )}
    </div>
  );
}

export default CategorySelection;

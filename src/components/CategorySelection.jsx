import React from 'react';

function CategorySelection({ x, y, onSelect, isEditing, onClose }) {
  const containerStyle = {
    position: 'absolute',
    top: y + 'px',
    left: x + 'px',
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '5px',
    width: '150px', // give some width to position close button comfortably
    boxSizing: 'border-box',
  };

  const closeBtnStyle = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#000',
    fontWeight: 'bold'
  };

  return (
    <div style={containerStyle}>
      <button style={closeBtnStyle} onClick={onClose}>X</button>
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

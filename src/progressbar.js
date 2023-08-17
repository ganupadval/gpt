import React from 'react';

export default function ProgressBar({ progress }) {
  const bar = {
    borderRadius: '10px',
    bottom:'0',
   
    width:'99%',
    margin:'auto',
    
    borderStyle: 'groove',
    borderColor: 'white',
    overflow: 'hidden' // Hide overflow to prevent abrupt visual changes
  };

  const pro = {
    borderRadius: '8px',
    width: `${progress}%`,
    transition: 'width 0.5s ease-in-out', // Add CSS transition for smooth width change
    // borderStyle: 'groove',
    // borderColor: 'white',
    height: '8px',
    backgroundColor: '#fa1e4e'
  };

  return (
    <div style={bar} className='mt-1'>
      <div style={pro}></div>
    </div>
  );
}

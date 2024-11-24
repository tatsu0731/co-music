import React from "react";

export default function Seekbar(props) {
  const { currentInSec, handleSeekbarValue, durationInSec } = props;

  return (
    <div className="relative flex items-center w-64">
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="relative bg-red-500 text-white text-xs rounded px-2 py-1 shadow-lg">
          盛り上がり！
          <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rotate-45"></div>
        </div>
      </div>
      <input
        type="range"
        value={currentInSec}
        min="0"
        max={durationInSec}
        onChange={handleSeekbarValue}
        step="0.2"
        className="w-full h-2 appearance-none rounded-full cursor-pointer"
        style={{
          background: `
            linear-gradient(
              to right, 
              gray 0%, 
              gray 45%, 
              red 45%, 
              red 55%, 
              gray 55%, 
              gray 100%
            )
          `,
        }}
      />
    </div>
  );
}

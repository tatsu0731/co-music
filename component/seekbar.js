import React from "react";

export default function Seekbar(props) {
  const { currentInSec, handleSeekbarValue, durationInSec } = props;

  return (
    <div className="flex items-center">
      <input
        type="range"
        value={currentInSec}
        min="0"
        max={durationInSec}
        onChange={handleSeekbarValue}
        step="0.2"
      />
    </div>
  );
}

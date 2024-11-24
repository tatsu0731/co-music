"use client";

import React, { useRef, useState, useEffect } from 'react';
import Seekbar from "./seekbar";

const CustomAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentInSec, setCurrentInSec] = useState(0);
  const [durationInSec, setDurationInSec] = useState(null);

  const audioRef = useRef(null);

  function handlePlayPause() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  function handleSeekbarValue(event) {
    const newTime = parseFloat(event.target.value);
    setCurrentInSec(newTime);
    audioRef.current.currentTime = newTime;
  }

  useEffect(() => {
    const handleLoadedMetadata = () => {
      const audio = audioRef.current;
      if (!audio) return;
      console.log(`音声の長さ: ${audio.duration}秒`);
      setDurationInSec(audio.duration);
      setIsLoaded(true);

      
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentInSec(audio.currentTime);
    };

    audio.addEventListener('timeupdate', updateTime);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  return (
    <div className="m-16 flex flex-col items-center">
      <audio
        ref={audioRef}
        src="/music.mp3"
        preload="metadata"
        autoPlay
      />
      <div className="flex items-center">
        <button
          onClick={handlePlayPause}
          className="p-4"
          aria-label={isPlaying ? '一時停止' : '再生'}
        >
          {isPlaying ? '一時停止' : '再生'}
        </button>
      </div>
      <Seekbar
        currentInSec={currentInSec}
        handleSeekbarValue={handleSeekbarValue}
        durationInSec={durationInSec}
      />
    </div>
  );
};

export default CustomAudioPlayer;
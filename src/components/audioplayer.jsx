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
    <div className="m-2 flex flex-col items-center">
      <audio
        ref={audioRef}
        src="/music.mp3"
        preload="metadata"
        autoPlay
      />
      <div className="flex items-center">
        <button
          onClick={handlePlayPause}
          className="p-2 m-4 rounded-full px-3 py-3 block rounded-full shadow-md bg-[#eff0f9] p-4 cursor-pointer group [&_*]:transition-all [&_*]:duration-150 [&_*]:ease-in group-hover:bg-rose-600"
          aria-label={isPlaying ? '一時停止' : '再生'}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
          )}
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
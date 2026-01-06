
import React from 'react';

interface AudioPlayerProps {
  onPlay: () => void;
  onStop: () => void;
  isPlaying: boolean;
  title: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ onPlay, onStop, isPlaying, title }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-zinc-900 border border-zinc-800 shadow-2xl rounded-2xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-white ${isPlaying ? 'animate-pulse' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium truncate">{title}</p>
          <p className="text-zinc-500 text-xs uppercase tracking-tighter">AI Master Track</p>
        </div>

        <button
          onClick={isPlaying ? onStop : onPlay}
          className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-black hover:scale-105 transition-transform"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;

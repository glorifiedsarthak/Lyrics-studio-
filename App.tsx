
import React, { useState, useCallback, useRef } from 'react';
import { LyricPreferences, SongData } from './types';
import { generateLyrics, generateVocalTrack } from './services/geminiService';
import { decode, decodeAudioData } from './utils/audioUtils';
import LyricForm from './components/LyricForm';
import LyricEditor from './components/LyricEditor';
import AudioPlayer from './components/AudioPlayer';

const App: React.FC = () => {
  const [prefs, setPrefs] = useState<LyricPreferences | null>(null);
  const [song, setSong] = useState<SongData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMakingSong, setIsMakingSong] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Audio state
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  const handleGenerateLyrics = async (newPrefs: LyricPreferences) => {
    setIsLoading(true);
    setPrefs(newPrefs);
    try {
      const data = await generateLyrics(newPrefs);
      setSong(data);
    } catch (error) {
      console.error("Failed to generate lyrics", error);
      alert("Something went wrong while writing the lyrics. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateLyrics = (newLyrics: string) => {
    if (song) {
      setSong({ ...song, lyrics: newLyrics });
    }
  };

  const stopAudio = useCallback(() => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) {
        // Handle case where it's already stopped
      }
      sourceNodeRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const playAudio = useCallback(() => {
    if (!audioBufferRef.current) return;
    
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    stopAudio();

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.onended = () => setIsPlaying(false);
    
    source.start(0);
    sourceNodeRef.current = source;
    setIsPlaying(true);
  }, [stopAudio]);

  const handleMakeSong = async () => {
    if (!song || !prefs) return;
    setIsMakingSong(true);
    stopAudio();

    try {
      const base64 = await generateVocalTrack(song.lyrics, prefs.genre, prefs.mood);
      const audioData = decode(base64);
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }

      const buffer = await decodeAudioData(audioData, audioContextRef.current, 24000, 1);
      audioBufferRef.current = buffer;
      
      playAudio();
    } catch (error) {
      console.error("Failed to generate vocal track", error);
      alert("Failed to synthesize the vocal track. Please try again.");
    } finally {
      setIsMakingSong(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-32">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-emerald-900/10 blur-[120px] rounded-full"></div>
      </div>

      <header className="relative z-10 pt-12 pb-8 px-6 max-w-6xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full mb-6 text-sm font-medium text-indigo-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Next-Gen Songwriting Assistant
        </div>
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">LyricStudio <span className="text-zinc-600">AI</span></h1>
        <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed">
          From a spark of an idea to a full vocal track. Describe your vision, and our AI studio handles the rest.
        </p>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-8 sticky top-8">
          <LyricForm onGenerate={handleGenerateLyrics} isLoading={isLoading} />
          
          <div className="bg-zinc-900/30 p-6 rounded-2xl border border-dashed border-zinc-800">
            <h3 className="text-zinc-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">Studio Tips</h3>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li className="flex gap-3">
                <span className="text-indigo-500 mt-1">•</span>
                Use the "Keywords" field to include specific names, places, or metaphors.
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-500 mt-1">•</span>
                The "Mood" selector influences both word choice and the AI's vocal delivery style.
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-500 mt-1">•</span>
                You can manually refine the generated lyrics before synthesizing the vocals.
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7">
          {song ? (
            <LyricEditor 
              song={song} 
              onUpdate={handleUpdateLyrics} 
              onMakeSong={handleMakeSong}
              isMakingSong={isMakingSong}
            />
          ) : (
            <div className="bg-zinc-900/20 border-2 border-dashed border-zinc-800 rounded-3xl h-[600px] flex flex-col items-center justify-center text-center p-12">
              <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-zinc-500 font-medium text-lg">No session active</h3>
              <p className="text-zinc-600 max-w-xs mt-2">Fill out the form on the left to start your first track.</p>
            </div>
          )}
        </div>
      </main>

      {audioBufferRef.current && song && (
        <AudioPlayer 
          title={song.title}
          isPlaying={isPlaying}
          onPlay={playAudio}
          onStop={stopAudio}
        />
      )}
    </div>
  );
};

export default App;


import React from 'react';
import { SongData } from '../types';

interface LyricEditorProps {
  song: SongData;
  onUpdate: (lyrics: string) => void;
  onMakeSong: () => void;
  isMakingSong: boolean;
}

const LyricEditor: React.FC<LyricEditorProps> = ({ song, onUpdate, onMakeSong, isMakingSong }) => {
  return (
    <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 overflow-hidden backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 border-b border-zinc-800 bg-zinc-800/30 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white font-serif">{song.title}</h2>
        <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Draft Output</span>
      </div>
      <div className="p-6">
        <textarea
          value={song.lyrics}
          onChange={(e) => onUpdate(e.target.value)}
          className="w-full bg-transparent text-zinc-300 leading-relaxed min-h-[400px] outline-none resize-none font-mono text-sm"
          spellCheck={false}
        />
      </div>
      <div className="p-6 bg-zinc-800/30 flex justify-end">
        <button
          onClick={onMakeSong}
          disabled={isMakingSong}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-700 text-white font-semibold px-6 py-2.5 rounded-full transition-all shadow-lg shadow-emerald-500/10"
        >
          {isMakingSong ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Synthesizing Vocals...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.983 5.983 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.984 3.984 0 00-1.172-2.828a1 1 0 010-1.415z" clipRule="evenodd" />
              </svg>
              Generate Vocal Track
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LyricEditor;

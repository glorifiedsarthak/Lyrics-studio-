
import React from 'react';
import { MusicGenre, SongMood, LyricPreferences } from '../types';

interface LyricFormProps {
  onGenerate: (prefs: LyricPreferences) => void;
  isLoading: boolean;
}

const LyricForm: React.FC<LyricFormProps> = ({ onGenerate, isLoading }) => {
  const [prefs, setPrefs] = React.useState<LyricPreferences>({
    genre: MusicGenre.POP,
    mood: SongMood.HAPPY,
    topic: '',
    keywords: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(prefs);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 backdrop-blur-sm space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Genre</label>
          <select
            value={prefs.genre}
            onChange={(e) => setPrefs({ ...prefs, genre: e.target.value as MusicGenre })}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          >
            {Object.values(MusicGenre).map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Mood</label>
          <select
            value={prefs.mood}
            onChange={(e) => setPrefs({ ...prefs, mood: e.target.value as SongMood })}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          >
            {Object.values(SongMood).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">What's the song about?</label>
        <textarea
          value={prefs.topic}
          onChange={(e) => setPrefs({ ...prefs, topic: e.target.value })}
          placeholder="A story about a night in Paris, or a heartbreak in the rain..."
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all h-24 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">Keywords (optional)</label>
        <input
          type="text"
          value={prefs.keywords}
          onChange={(e) => setPrefs({ ...prefs, keywords: e.target.value })}
          placeholder="neon, dancing, forever, midnight..."
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !prefs.topic}
        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Writing Lyrics...
          </span>
        ) : 'Generate Lyrics'}
      </button>
    </form>
  );
};

export default LyricForm;

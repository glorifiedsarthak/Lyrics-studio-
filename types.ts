
export enum MusicGenre {
  POP = 'Pop',
  ROCK = 'Rock',
  HIPHOP = 'Hip-Hop',
  JAZZ = 'Jazz',
  COUNTRY = 'Country',
  SOUL = 'Soul',
  ELECTRONIC = 'Electronic',
  FOLK = 'Folk'
}

export enum SongMood {
  HAPPY = 'Happy',
  MELANCHOLIC = 'Melancholic',
  ENERGETIC = 'Energetic',
  ROMANTIC = 'Romantic',
  ANGRY = 'Angry',
  DREAMY = 'Dreamy'
}

export interface LyricPreferences {
  genre: MusicGenre;
  mood: SongMood;
  topic: string;
  keywords: string;
}

export interface SongData {
  lyrics: string;
  title: string;
}

export interface AudioState {
  isPlaying: boolean;
  progress: number;
  duration: number;
}

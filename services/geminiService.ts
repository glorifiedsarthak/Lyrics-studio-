
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { LyricPreferences, SongData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateLyrics(prefs: LyricPreferences): Promise<SongData> {
  const prompt = `Write a professional song with a catchy title, verses, a chorus, and a bridge.
    Genre: ${prefs.genre}
    Mood: ${prefs.mood}
    Topic: ${prefs.topic}
    Keywords to include: ${prefs.keywords}
    
    Format the output as a JSON object with keys 'title' and 'lyrics'.
    The 'lyrics' should be formatted with clear line breaks.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          lyrics: { type: Type.STRING }
        },
        required: ['title', 'lyrics']
      }
    }
  });

  return JSON.parse(response.text);
}

export async function generateVocalTrack(lyrics: string, genre: string, mood: string): Promise<string> {
  // We use the TTS model to generate the "vocal" track.
  // We add stylistic instructions to the prompt to influence the delivery.
  const stylisticPrompt = `Performance style: ${genre}, ${mood}. 
    Deliver these lyrics rhythmically and expressively:
    
    ${lyrics}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: stylisticPrompt }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          // 'Kore' is often good for singing-like melodic speech, 'Puck' for more punchy delivery.
          prebuiltVoiceConfig: { voiceName: genre.toLowerCase().includes('rock') ? 'Puck' : 'Kore' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) throw new Error("Failed to generate audio track");
  
  return base64Audio;
}

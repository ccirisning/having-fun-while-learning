
import { GoogleGenAI } from "@google/genai";
import { AIDiagnosis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * AI Speech Diagnosis: Evaluates phoneme length and spectral clarity.
 */
export const analyzeSpeech = async (audioBase64: string, targetText: string): Promise<AIDiagnosis | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'audio/pcm;rate=16000', data: audioBase64 } },
          { text: `System Role: Japanese Phonetics Specialist.
          Input: User audio recording of "${targetText}".
          Task: Detect spectral features of consonants (clear/voiced) and vowel duration (long/short).
          Feedback Constraint: Specific text feedback in Chinese for N5 level learners.
          
          Return JSON Schema: { 
            "score": number (0-100), 
            "phoneticAccuracy": number (0-100), 
            "rhythmScore": number (0-100), 
            "feedback": "string (concise Chinese feedback)", 
            "comparisonWaveform": "string (descriptive mouth/pitch advice)" 
          }` }
        ]
      },
      config: { 
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Speech diagnosis error:", e);
    return null;
  }
};

/**
 * Dynamic Context Generation: Based on user's confused characters.
 */
export const generateMistakeReinforcement = async (confusedKanaIds: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `System Role: Japanese Pedagogy Expert.
      Input Confusion Set: [${confusedKanaIds.join(', ')}].
      Goal: Create an N5 sentence that forces visual/auditory distinction between these characters.
      
      Return JSON Schema: { 
        "sentence": "string (Japanese)", 
        "reading": "string (Romaji/Kana)", 
        "translation": "string (English)",
        "visual_mnemonic": "string (scene description for imagery reinforcement)"
      }`,
      config: { 
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Context generation error:", e);
    return null;
  }
};

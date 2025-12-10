
import { Language, UserSettings } from '../types';

// Robust Env Var Retrieval
const getElevenLabsKey = () => {
  // 1. Try Process Env (Vite Define / Node)
  if (typeof process !== 'undefined' && process.env?.ELEVENLABS_API_KEY) {
      return process.env.ELEVENLABS_API_KEY;
  }
  
  // 2. Try Import Meta Env (Vite Native)
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      if (import.meta.env.ELEVENLABS_API_KEY) return import.meta.env.ELEVENLABS_API_KEY;
      // @ts-ignore
      if (import.meta.env.VITE_ELEVENLABS_API_KEY) return import.meta.env.VITE_ELEVENLABS_API_KEY;
  }
  
  return '';
};

const ENV_ELEVENLABS_API_KEY = getElevenLabsKey();

// Voices to exclude (Novelty/Low Quality/Characters)
const EXCLUDED_VOICES = [
  // Novelty / Sound Effects
  "Bad News", "Bahh", "Bells", "Boing", "Bubbles", "Cellos", 
  "Deranged", "Good News", "Hysterical", "Pipe Organ", "Organ", 
  "Trinoids", "Whisper", "Zarvox", "Jester", "Wobble",
  
  // Characters / Low Quality / Legacy
  "Albert", "Fred", "Junior", "Kathy", "Princess", "Ralph", 
  "Vicki", "Victoria", "Grandma", "Grandpa", "Rocko", 
  "Shelley", "Superstar", "Eddy", "Flo", "Reed", "Sandy",
  "Majestic"
];

let currentAudio: HTMLAudioElement | null = null;

// Fire and Forget (for UI buttons)
export const speakText = async (text: string, language: Language, settings?: UserSettings) => {
  await speakTextAsync(text, language, settings);
};

// Promisified Speak (For Demo/Sequencing)
// Resolves when audio finishes playing
export const speakTextAsync = (text: string, language: Language, settings?: UserSettings): Promise<void> => {
  return new Promise(async (resolve) => {
    // Stop any currently playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // 1. Try ElevenLabs
    if (settings?.elevenLabs?.voiceId) {
      try {
        await speakWithElevenLabs(text, settings.elevenLabs.voiceId, ENV_ELEVENLABS_API_KEY, resolve);
        return; 
      } catch (e) {
        console.warn("ElevenLabs failed, falling back to browser TTS", e);
      }
    }

    // 2. Browser TTS Fallback
    speakWithBrowser(text, language, resolve, settings?.voiceURI);
  });
};

export const speakNarratorAsync = (text: string): Promise<void> => {
    return new Promise(async (resolve) => {
         // Stop any currently playing audio
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }

        // 1. Try ElevenLabs Narrator
        // Requested Voice ID: TbMNBJ27fH2U0VgpSNko
        if (ENV_ELEVENLABS_API_KEY) {
            try {
                console.log("Attempting ElevenLabs Narration with ID: TbMNBJ27fH2U0VgpSNko");
                await speakWithElevenLabs(text, 'TbMNBJ27fH2U0VgpSNko', ENV_ELEVENLABS_API_KEY, resolve);
                return;
            } catch (e) {
                console.warn("ElevenLabs Narrator failed, falling back to browser", e);
            }
        } else {
            console.warn("No ElevenLabs API Key found. Using browser TTS.");
        }

        // 2. Browser Fallback
         if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 1.0; // Standard pace for clear narration
            
            const voices = window.speechSynthesis.getVoices();
            
            // Prioritize standard American Female voices
            const narratorVoice = voices.find(v => v.name === 'Google US English') || 
                                  voices.find(v => v.name === 'Samantha') ||
                                  voices.find(v => v.lang === 'en-US' && !v.name.toLowerCase().includes('male')) ||
                                  voices.find(v => v.lang === 'en-US');
            
            if (narratorVoice) utterance.voice = narratorVoice;
            
            utterance.onend = () => resolve();
            utterance.onerror = () => resolve(); // Resolve on error to keep demo moving
            
            window.speechSynthesis.speak(utterance);
         } else {
             resolve();
         }
    });
};

const speakWithElevenLabs = async (text: string, voiceId: string, apiKey: string, onComplete: () => void) => {
  if (!apiKey) throw new Error("Missing Key");

  // Log to confirm we are hitting the endpoint
  console.log(`Calling ElevenLabs: ${voiceId}`);

  // We prepend " - " to create a brief silence/breath at the start.
  // This prevents the first syllable ("I" in "I need help") from being cut off 
  // by audio hardware warmup latency or browser playback initialization.
  const safeText = ` - ${text}`;

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: safeText,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.5, similarity_boost: 0.75 }
    }),
  });

  if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API Error: ${response.status} ${errText}`);
  }

  const blob = await response.blob();
  const audioUrl = URL.createObjectURL(blob);
  const audio = new Audio(audioUrl);
  currentAudio = audio;
  
  audio.onended = () => {
    URL.revokeObjectURL(audioUrl);
    currentAudio = null;
    onComplete();
  };
  
  await audio.play();
};

const getLangPrefix = (language: Language) => {
  switch (language) {
    case Language.JAPANESE: return 'ja';
    case Language.FRENCH: return 'fr';
    case Language.SPANISH: return 'es';
    default: return 'en';
  }
};

export const getVoicesForLanguage = (language: Language): SpeechSynthesisVoice[] => {
  if (!('speechSynthesis' in window)) return [];
  const voices = window.speechSynthesis.getVoices();
  const langPrefix = getLangPrefix(language);
  
  return voices.filter(v => {
    const isLangMatch = v.lang.toLowerCase().startsWith(langPrefix);
    const isExcluded = EXCLUDED_VOICES.some(excluded => v.name.includes(excluded));
    return isLangMatch && !isExcluded;
  });
};

const speakWithBrowser = (text: string, language: Language, onComplete: () => void, voiceURI?: string) => {
  if (!('speechSynthesis' in window)) {
    onComplete();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  const langPrefix = getLangPrefix(language);
  utterance.lang = langPrefix;

  const voices = window.speechSynthesis.getVoices();
  let voice: SpeechSynthesisVoice | undefined;

  if (voiceURI) {
    const preferredVoice = voices.find(v => v.voiceURI === voiceURI);
    if (preferredVoice && preferredVoice.lang.toLowerCase().startsWith(langPrefix)) {
      voice = preferredVoice;
    }
  }

  if (!voice) {
    const langVoices = getVoicesForLanguage(language);
    voice = langVoices.find(v => v.name.includes('Amelie')) || 
            langVoices.find(v => v.name.includes('Google')) || 
            langVoices.find(v => v.name.includes('Premium')) ||
            langVoices[0];
  }

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  }

  utterance.rate = 1.0; 
  utterance.onend = () => onComplete();
  utterance.onerror = () => onComplete();

  window.speechSynthesis.speak(utterance);
};

export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  if (!('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices();
};

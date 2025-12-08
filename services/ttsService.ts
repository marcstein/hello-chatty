import { Language, UserSettings } from '../types';

// Use the environment variable injected by Vite
const ENV_ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || '';

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

export const speakText = async (text: string, language: Language, settings?: UserSettings) => {
  // Stop any currently playing audio (Browser or ElevenLabs)
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  // 1. Try ElevenLabs if Voice ID is present
  if (settings?.elevenLabs?.voiceId) {
    try {
      await speakWithElevenLabs(text, settings.elevenLabs.voiceId, ENV_ELEVENLABS_API_KEY);
      return; // Success, skip browser fallback
    } catch (e) {
      console.warn("ElevenLabs failed, falling back to browser TTS", e);
      // Fall through to browser TTS
    }
  }

  // 2. Browser TTS Fallback
  speakWithBrowser(text, language, settings?.voiceURI);
};

const speakWithElevenLabs = async (text: string, voiceId: string, apiKey: string) => {
  if (!apiKey) {
    throw new Error("ElevenLabs API Key is missing in environment variables");
  }

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      }
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(`ElevenLabs API Error: ${response.status} ${JSON.stringify(errorBody)}`);
  }

  const blob = await response.blob();
  const audioUrl = URL.createObjectURL(blob);
  const audio = new Audio(audioUrl);
  currentAudio = audio;
  
  await audio.play();
  
  audio.onended = () => {
    URL.revokeObjectURL(audioUrl);
    currentAudio = null;
  };
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

const speakWithBrowser = (text: string, language: Language, voiceURI?: string) => {
  if (!('speechSynthesis' in window)) {
    console.warn("Speech synthesis not supported");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  const langPrefix = getLangPrefix(language);
  utterance.lang = langPrefix;

  const voices = window.speechSynthesis.getVoices();
  let voice: SpeechSynthesisVoice | undefined;

  // 1. Try to find the user's specific preferred voice
  // IMPORTANT: Verify the preferred voice matches the requested language to prevent accents/gibberish
  if (voiceURI) {
    const preferredVoice = voices.find(v => v.voiceURI === voiceURI);
    // Only use if it matches the requested language
    if (preferredVoice && preferredVoice.lang.toLowerCase().startsWith(langPrefix)) {
      voice = preferredVoice;
    }
  }

  // 2. Fallback to high-quality default for the language if no valid preference found
  if (!voice) {
    const langVoices = getVoicesForLanguage(language);
    voice = langVoices.find(v => v.name.includes('Google') || v.name.includes('Premium')) || 
            langVoices.find(v => v.name.includes('Microsoft')) ||
            langVoices[0];
  }

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  }

  utterance.rate = 1.0; 
  utterance.pitch = 1.0;

  window.speechSynthesis.speak(utterance);
};

export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  if (!('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices();
};

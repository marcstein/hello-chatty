import { Language, UserSettings } from '../types';

// Robust Env Var Retrieval
const getElevenLabsKey = () => {
  // 1. Try direct replacement (Vite 'define' replaces the whole expression)
  try {
    // @ts-ignore
    const val = process.env.ELEVENLABS_API_KEY;
    if (val) return val;
  } catch (e) {
    // Ignore ReferenceError if process is not defined and not replaced
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
// FIX: Store global reference to current utterance to prevent Browser Garbage Collection from stopping speech early
let currentUtterance: SpeechSynthesisUtterance | null = null;

// Fire and Forget (for UI buttons)
export const speakText = async (text: string, language: Language, settings?: UserSettings) => {
  await speakTextAsync(text, language, settings);
};

// Promisified Speak (For Demo/Sequencing)
// Resolves when audio finishes playing
export const speakTextAsync = (text: string, language: Language, settings?: UserSettings): Promise<void> => {
  return new Promise(async (resolve) => {
    // 1. Cleanup previous audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    // 2. Cancel previous browser TTS
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Ensure we clear our reference so we don't track the cancelled one
      currentUtterance = null;
    }

    if (!text || !text.trim()) {
        resolve();
        return;
    }

    // 3. Try ElevenLabs (with Timeout Fallback)
    if (settings?.elevenLabs?.voiceId) {
      try {
        await speakWithElevenLabs(text, settings.elevenLabs.voiceId, ENV_ELEVENLABS_API_KEY, resolve);
        return; 
      } catch (e) {
        console.warn("ElevenLabs failed or timed out, falling back to browser TTS", e);
        // Fallback proceeds below
      }
    }

    // 4. Browser TTS Fallback
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
            currentUtterance = null;
        }

        // 1. Try ElevenLabs Narrator
        if (ENV_ELEVENLABS_API_KEY) {
            try {
                // Narrator ID: TbMNBJ27fH2U0VgpSNko
                await speakWithElevenLabs(text, 'TbMNBJ27fH2U0VgpSNko', ENV_ELEVENLABS_API_KEY, resolve);
                return;
            } catch (e) {
                console.warn("ElevenLabs Narrator failed, falling back to browser", e);
            }
        }

        // 2. Browser Fallback
        speakWithBrowser(text, Language.ENGLISH, resolve);
    });
};

const speakWithElevenLabs = async (text: string, voiceId: string, apiKey: string, onComplete: () => void) => {
  if (!apiKey) throw new Error("Missing Key");

  // Create AbortController to prevent hanging indefinitely
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s max wait for network

  try {
      // We prepend "... " to create a silence/breath at the start.
      const safeText = `... ${text}`;

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
        signal: controller.signal
      });

      clearTimeout(timeoutId);

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
  } catch (error) {
      clearTimeout(timeoutId);
      throw error; // Re-throw to trigger fallback
  }
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

  // Double check cancel
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // IMPORTANT: Assign to global variable to prevent Garbage Collection
  currentUtterance = utterance;

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
  
  const cleanup = () => {
      // Only nullify if we are the current one
      if (currentUtterance === utterance) {
          currentUtterance = null;
      }
      onComplete();
  };

  utterance.onend = cleanup;
  utterance.onerror = (e) => {
      console.warn("Browser TTS Error", e);
      cleanup();
  };

  // Small timeout ensures the audio context is ready after a cancel
  setTimeout(() => {
     window.speechSynthesis.speak(utterance);
  }, 10);
};

export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  if (!('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices();
};
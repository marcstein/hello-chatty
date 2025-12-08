export enum Language {
  ENGLISH = 'en',
  JAPANESE = 'ja',
  FRENCH = 'fr',
  SPANISH = 'es'
}

export enum ScreenMode {
  KEYBOARD = 'KEYBOARD',
  SERVICES = 'SERVICES',
  SETTINGS = 'SETTINGS'
}

export type InteractionMode = 'DWELL' | 'CLICK';

export interface ServiceItem {
  id: string;
  label: string;
  icon?: string;
  speechText?: string;
  children?: ServiceItem[];
  color?: string;
  isCustom?: boolean; // To identify user-added items
}

export interface PredictionState {
  predictions: string[];
  isLoading: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'system';
  timestamp: number;
}

export interface ElevenLabsSettings {
  voiceId: string;
  // apiKey removed; strictly using environment variable now
}

export interface VoiceCloneRequest {
  status: 'none' | 'pending' | 'completed';
  requestedAt?: number;
  sampleUrl?: string;
}

export interface UserSettings {
  language?: Language;
  voiceURI?: string; // specific voice ID from speech synthesis (Browser)
  elevenLabs?: ElevenLabsSettings; // External high-quality voice
  voiceClone?: VoiceCloneRequest; // Voice cloning request status
  interactionMode?: InteractionMode;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  password: string; 
  settings: UserSettings;
  // We store the full service tree per language for the user
  // This allows them to have custom buttons in specific languages
  serviceTrees: Record<Language, ServiceItem[]>; 
  createdAt: number;
}
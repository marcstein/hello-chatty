
import { createClient } from '@supabase/supabase-js';
import { UserProfile, Language, Gender } from '../types';
import { SERVICE_TREES, DEFAULT_ELEVEN_LABS_VOICES } from '../constants';

// --- ROBUST ENV VAR ACCESS ---
// Helper to read env vars from either Vite's import.meta.env or process.env
const getEnvVar = (key: string, fallbackKey?: string): string => {
  let val = '';
  
  // 1. Try import.meta.env (Vite standard)
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      val = import.meta.env[key] || (fallbackKey ? import.meta.env[fallbackKey] : '');
    }
  } catch (e) {}

  // 2. Try process.env (Shim or Node)
  if (!val && typeof process !== 'undefined' && process.env) {
    val = process.env[key] || (fallbackKey ? process.env[fallbackKey] : '') || '';
  }
  
  return val;
};

// Load Config
const SUPABASE_URL = getEnvVar('VITE_SUPABASE_URL', 'SUPABASE_URL');
const SUPABASE_KEY = getEnvVar('VITE_SUPABASE_ANON_KEY', 'SUPABASE_ANON_KEY');

const LOCAL_STORAGE_KEY = 'chatty_users_v2';
const SESSION_KEY = 'chatty_session_v1';

// --- CONFIG CHECK ---
const isSupabaseConfigured = () => {
  const hasUrl = !!SUPABASE_URL && SUPABASE_URL !== 'undefined';
  const hasKey = !!SUPABASE_KEY && SUPABASE_KEY !== 'placeholder' && SUPABASE_KEY !== 'undefined';
  
  if (!hasUrl || !hasKey) {
     // Only log this warning once on init if missing
     if (typeof window !== 'undefined' && !(window as any)._sb_warned) {
         console.warn(`[Storage] Supabase not fully configured. Using LocalStorage fallback.`);
         console.warn(`[Storage] URL: ${hasUrl ? 'OK' : 'MISSING'}, KEY: ${hasKey ? 'OK' : 'MISSING'}`);
         (window as any)._sb_warned = true;
     }
     return false;
  }
  return true;
};

// Helper for UUID generation
const generateUUID = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

// Initialize Client
export const supabase = createClient(
  SUPABASE_URL || 'https://xyyhcrfjxghjrwehbpap.supabase.co', 
  SUPABASE_KEY || 'placeholder', 
  { auth: { persistSession: false } }
);

// --- LOCAL STORAGE HELPERS ---

const getLocalUsers = (): UserProfile[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("LocalStorage Read Error", e);
    return [];
  }
};

const saveLocalUsers = (users: UserProfile[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error("LocalStorage Write Error", e);
  }
};

// --- SESSION MANAGEMENT ---

export const saveSession = (userId: string) => {
    try {
        localStorage.setItem(SESSION_KEY, userId);
    } catch (e) { console.error("Session save failed", e); }
};

export const clearSession = () => {
    try {
        localStorage.removeItem(SESSION_KEY);
    } catch (e) { console.error("Session clear failed", e); }
};

export const getSessionUserId = (): string | null => {
    try {
        return localStorage.getItem(SESSION_KEY);
    } catch (e) { return null; }
};

// --- API METHODS ---

export const getStoredUsers = async (): Promise<UserProfile[]> => {
  if (!isSupabaseConfigured()) return getLocalUsers();

  try {
    const { data, error } = await supabase.from('profiles').select('data');

    if (error) {
      console.error("Supabase SELECT Error:", error.message);
      return getLocalUsers();
    }

    if (!data) return [];
    return data.map(row => row.data as UserProfile);
  } catch (e) {
    console.error("Unexpected error loading users:", e);
    return getLocalUsers();
  }
};

export const getUserById = async (userId: string): Promise<UserProfile | null> => {
    if (userId === 'demo_user') return createDemoUser();

    if (!isSupabaseConfigured()) {
        const users = getLocalUsers();
        return users.find(u => u.id === userId) || null;
    }

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('data')
            .eq('id', userId)
            .single();
            
        if (error || !data) return null;
        return data.data as UserProfile;
    } catch (e) {
        console.error("Get user by ID error", e);
        return null;
    }
};

const createDemoUser = (): UserProfile => {
    return {
        id: 'demo_user',
        email: 'demo@chatty.ai',
        name: 'Demo User',
        password: 'demo123',
        gender: 'female',
        settings: {
            language: Language.ENGLISH,
            interactionMode: 'DWELL', // CHANGED: Default to DWELL for demo
            dwellTimeMs: 800,
            elevenLabs: {
                voiceId: DEFAULT_ELEVEN_LABS_VOICES[Language.ENGLISH].female
            }
        },
        serviceTrees: JSON.parse(JSON.stringify(SERVICE_TREES)),
        createdAt: Date.now()
    };
};

export const loginUser = async (email: string, password: string): Promise<UserProfile | null> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (cleanEmail === 'demo@chatty.ai' && cleanPass === 'demo123') {
        return createDemoUser();
    }

    if (!isSupabaseConfigured()) {
        const users = getLocalUsers();
        return users.find(u => u.email.toLowerCase() === cleanEmail && u.password === cleanPass) || null;
    }

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('data')
            .eq('data->>email', cleanEmail) 
            .single();

        if (error || !data) {
            console.warn("Login: User not found or DB error:", error?.message);
            return null;
        }

        const user = data.data as UserProfile;
        if (user.password === cleanPass) {
            return user;
        }
        return null;
    } catch (e) {
        console.error("Login exception:", e);
        return null;
    }
};

export const createNewUser = async (email: string, name: string, password: string, language: Language = Language.ENGLISH, gender?: Gender): Promise<UserProfile> => {
  let defaultVoiceId = '';
  if (gender) {
    defaultVoiceId = DEFAULT_ELEVEN_LABS_VOICES[language][gender] || '';
  }

  const newUser: UserProfile = {
    id: generateUUID(),
    email: email.trim().toLowerCase(),
    name: name.trim(),
    password: password.trim(),
    gender: gender,
    settings: {
      language: language,
      interactionMode: 'DWELL', // Set default for new users to DWELL
      elevenLabs: {
        voiceId: defaultVoiceId
      }
    },
    serviceTrees: JSON.parse(JSON.stringify(SERVICE_TREES)), 
    createdAt: Date.now()
  };

  // 1. Fallback Mode
  if (!isSupabaseConfigured()) {
    console.log("[Storage] Saving new user to LocalStorage (Env vars missing).");
    const users = getLocalUsers();
    if (users.some(u => u.email === newUser.email)) {
        throw new Error("User with this email already exists locally.");
    }
    users.push(newUser);
    saveLocalUsers(users);
    await new Promise(resolve => setTimeout(resolve, 500)); 
    return newUser;
  }

  // 2. Supabase Mode
  try {
    // Check duplicates
    const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('data->>email', newUser.email)
        .single();
    
    if (existing) {
        throw new Error("Account with this email already exists.");
    }

    // Insert
    console.log(`[Storage] Attempting to insert user ${newUser.id} into 'profiles' table...`);
    
    const { error, status, statusText } = await supabase
      .from('profiles')
      .insert({
        id: newUser.id,
        data: newUser
      });

    if (error) {
      console.error("[Storage] Supabase Insert Failed:", error);
      console.error(`[Storage] Status: ${status} ${statusText}`);
      console.error(`[Storage] Hint: Check if 'profiles' table exists and RLS policies allow INSERT for anon role.`);
      throw new Error(`Database Error: ${error.message}`);
    }

    console.log("[Storage] User successfully created in Supabase.");
    return newUser;

  } catch (e) {
    console.error("[Storage] Critical failure in createNewUser:", e);
    throw e;
  }
};

export const updateUserProfile = async (updatedUser: UserProfile): Promise<void> => {
  if (updatedUser.id === 'demo_user') return;

  if (!isSupabaseConfigured()) {
    const users = getLocalUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      saveLocalUsers(users);
    }
    return;
  }

  try {
    const { error } = await supabase
      .from('profiles')
      .update({ data: updatedUser })
      .eq('id', updatedUser.id);

    if (error) {
      console.error("Supabase Update Error:", error.message);
    }
  } catch (e) {
    console.error("Failed to update user:", e);
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  if (!isSupabaseConfigured()) {
    const users = getLocalUsers();
    const filtered = users.filter(u => u.id !== userId);
    saveLocalUsers(filtered);
    return;
  }

  try {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);

    if (error) {
      console.error("Supabase Delete Error:", error.message);
    }
  } catch (e) {
    console.error("Failed to delete user:", e);
  }
};

export const uploadVoiceSample = async (userId: string, audioBlob: Blob): Promise<string | null> => {
  if (userId === 'demo_user') return "https://mock.url/demo-sample.webm";

  if (!isSupabaseConfigured()) {
    console.warn("Storage not configured. Returning mock URL.");
    return "mock_url_local_storage";
  }

  const fileName = `${userId}_${Date.now()}.webm`;
  
  try {
    const { error } = await supabase.storage
      .from('voice_samples')
      .upload(fileName, audioBlob, { contentType: 'audio/webm' });

    if (error) {
       console.error("Storage upload failed:", error);
       return null;
    }
    
    const { data: publicUrlData } = supabase.storage
        .from('voice_samples')
        .getPublicUrl(fileName);
        
    return publicUrlData.publicUrl;
  } catch (e) {
    console.error("Upload Exception", e);
    return null;
  }
};

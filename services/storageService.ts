
import { createClient } from '@supabase/supabase-js';
import { UserProfile, Language, Gender } from '../types';
import { SERVICE_TREES, DEFAULT_ELEVEN_LABS_VOICES } from '../constants';

// --- CONFIGURATION ---
// These are now injected via Vite at build time
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || '';

const LOCAL_STORAGE_KEY = 'chatty_users_v2';
const SESSION_KEY = 'chatty_session_v1';

// Helper to check if Supabase is properly configured
const isSupabaseConfigured = () => {
  // Check if we have a key and the URL is not a placeholder
  return !!SUPABASE_KEY && 
         SUPABASE_KEY !== 'placeholder' &&
         !!SUPABASE_URL;
};

// Helper for UUID generation (Required for Supabase ID columns)
const generateUUID = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    // Fallback for older environments
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

// Initialize Supabase Client
// using the specific project URL as fallback based on your dashboard link
export const supabase = createClient(
  SUPABASE_URL || 'https://xyyhcrfjxghjrwehbpap.supabase.co', 
  SUPABASE_KEY || 'placeholder', 
  { auth: { persistSession: false } }
);

// --- LOCAL STORAGE HELPERS (Fallback) ---

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
  // Fallback if not configured
  if (!isSupabaseConfigured()) {
    return getLocalUsers();
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('data');

    if (error) {
      console.error("Supabase Error (getStoredUsers):", error.message);
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
    if (userId === 'demo_user') {
        return createDemoUser();
    }

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

// Helper to create the demo user object on the fly
const createDemoUser = (): UserProfile => {
    return {
        id: 'demo_user',
        email: 'demo@chatty.ai',
        name: 'Demo User',
        password: 'demo123',
        gender: 'female', // Changed to female to match Sabrina voice for cohesive demo
        settings: {
            language: Language.ENGLISH,
            interactionMode: 'CLICK', // Mouse mode by default for easier video recording
            dwellTimeMs: 800,
            elevenLabs: {
                // Default to Sabrina for female
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

    // --- DEMO USER BYPASS ---
    // Allows instant login for the demo video without needing DB entry
    if (cleanEmail === 'demo@chatty.ai' && cleanPass === 'demo123') {
        return createDemoUser();
    }

    if (!isSupabaseConfigured()) {
        const users = getLocalUsers();
        return users.find(u => u.email.toLowerCase() === cleanEmail && u.password === cleanPass) || null;
    }

    try {
        // Query jsonb column 'data' for the email
        // Note: This requires the 'data' column to be queryable or RLS to allow access
        const { data, error } = await supabase
            .from('profiles')
            .select('data')
            .eq('data->>email', cleanEmail) 
            .single();

        if (error || !data) {
            console.warn("Login failed or user not found:", error?.message);
            return null;
        }

        const user = data.data as UserProfile;
        // Verify password
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
  
  // Set default voice based on gender and language
  let defaultVoiceId = '';
  if (gender) {
    defaultVoiceId = DEFAULT_ELEVEN_LABS_VOICES[language][gender] || '';
  }

  const newUser: UserProfile = {
    id: generateUUID(), // Using UUID instead of timestamp for DB compatibility
    email: email.trim().toLowerCase(),
    name: name.trim(),
    password: password.trim(),
    gender: gender,
    settings: {
      language: language,
      elevenLabs: {
        voiceId: defaultVoiceId
      }
    },
    serviceTrees: JSON.parse(JSON.stringify(SERVICE_TREES)), 
    createdAt: Date.now()
  };

  if (!isSupabaseConfigured()) {
    console.warn("⚠️ SUPABASE NOT CONFIGURED or MISSING KEYS. Falling back to LocalStorage.");
    console.warn("Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.");
    
    const users = getLocalUsers();
    // Check duplicate email locally
    if (users.some(u => u.email === newUser.email)) {
        throw new Error("User with this email already exists locally.");
    }
    users.push(newUser);
    saveLocalUsers(users);
    await new Promise(resolve => setTimeout(resolve, 500)); 
    return newUser;
  }

  try {
    // Check duplicate email in Supabase (basic check)
    const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('data->>email', newUser.email)
        .single();
    
    if (existing) {
        throw new Error("Account with this email already exists.");
    }

    const { error } = await supabase
      .from('profiles')
      .insert({
        id: newUser.id,
        data: newUser
      });

    if (error) {
      console.error("Supabase Insert Error:", error.message, error.details);
      throw error;
    }

    return newUser;
  } catch (e) {
    console.error("Failed to create user in Supabase:", e);
    throw e;
  }
};

export const updateUserProfile = async (updatedUser: UserProfile): Promise<void> => {
  // If this is the demo user, allow "saving" to memory/local only to prevent errors
  if (updatedUser.id === 'demo_user') {
      return; 
  }

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
      console.error("Supabase Error (updateUserProfile):", error.message);
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
      console.error("Supabase Error (deleteUser):", error.message);
    }
  } catch (e) {
    console.error("Failed to delete user:", e);
  }
};

export const uploadVoiceSample = async (userId: string, audioBlob: Blob): Promise<string | null> => {
  if (userId === 'demo_user') {
      return "https://mock.url/demo-sample.webm";
  }

  if (!isSupabaseConfigured()) {
    console.warn("Storage not configured. Returning mock URL.");
    return "mock_url_local_storage";
  }

  const fileName = `${userId}_${Date.now()}.webm`;
  
  try {
    // Attempt upload to 'voice_samples' bucket
    const { data, error } = await supabase.storage
      .from('voice_samples')
      .upload(fileName, audioBlob, {
        contentType: 'audio/webm'
      });

    if (error) {
       console.error("Storage upload failed (bucket might be missing):", error);
       // Return null to signify upload failure but we can still soft-fail in UI
       return null;
    }
    
    // Get public URL
    const { data: publicUrlData } = supabase.storage
        .from('voice_samples')
        .getPublicUrl(fileName);
        
    return publicUrlData.publicUrl;
  } catch (e) {
    console.error("Upload Exception", e);
    return null;
  }
};

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ArrowLeft, MessageSquare, Menu, Volume2, Trash2, Settings, Plus, User, LogOut, Save, Cloud, Key, Loader2, Lock, Unlock, RefreshCw, Mail,
  Utensils, Droplets, Coffee, GlassWater, Bed, Smile, ThermometerSun, ThermometerSnowflake, AlertCircle, ShowerHead, Bath, Sparkles, CupSoda,
  Mic, Square, Play, Upload, HeartHandshake, Camera, Aperture, X,
  Heart, Users, Lightbulb, Tv, Music, Gamepad2, Stethoscope, Pill, Syringe, Siren, ThumbsUp, ThumbsDown, Clock, XOctagon, Fan, Sun, Moon,
  Phone, BookOpen, Armchair, Eye, MousePointer2
} from 'lucide-react';
import DwellButton from './components/DwellButton';
import Keyboard from './components/Keyboard';
import HistoryLog from './components/HistoryLog';
import { InteractionProvider, useInteraction } from './context/InteractionContext';
import { Language, ScreenMode, ChatMessage, ServiceItem, UserProfile, InteractionMode } from './types';
import { SERVICE_TREES, VOICE_CLONE_SCRIPTS, TRANSLATIONS } from './constants'; 
import { getPredictions, getSmartReplies, getVisualSuggestions } from './services/predictionService';
import { speakText, getAvailableVoices, getVoicesForLanguage } from './services/ttsService';
import { 
  createNewUser, loginUser, updateUserProfile, uploadVoiceSample, 
  getSessionUserId, getUserById, saveSession, clearSession 
} from './services/storageService';

// Icon mapping for dynamic rendering based on constants
const ICON_MAP: Record<string, React.ElementType> = {
  'utensils': Utensils,
  'droplets': Droplets,
  'coffee': Coffee,
  'glass-water': GlassWater,
  'bed': Bed,
  'smile': Smile,
  'thermometer-sun': ThermometerSun,
  'thermometer-snowflake': ThermometerSnowflake,
  'alert-circle': AlertCircle,
  'shower-head': ShowerHead,
  'bath': Bath,
  'sparkles': Sparkles,
  'cup-soda': CupSoda,
  'user': User,
  'heart': Heart,
  'users': Users,
  'lightbulb': Lightbulb,
  'tv': Tv,
  'music': Music,
  'gamepad': Gamepad2,
  'stethoscope': Stethoscope,
  'pill': Pill,
  'syringe': Syringe,
  'siren': Siren,
  'thumbs-up': ThumbsUp,
  'thumbs-down': ThumbsDown,
  'clock': Clock,
  'stop': XOctagon,
  'fan': Fan,
  'sun': Sun,
  'moon': Moon,
  'phone': Phone,
  'book': BookOpen,
  'armchair': Armchair,
  'message': MessageSquare
};

type AuthView = 'LANDING' | 'LOGIN' | 'SIGNUP';

// Helper to detect browser language
const getInitialLanguage = (): Language => {
  if (typeof navigator === 'undefined') return Language.ENGLISH;
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.startsWith('es')) return Language.SPANISH;
  if (browserLang.startsWith('fr')) return Language.FRENCH;
  if (browserLang.startsWith('ja')) return Language.JAPANESE;
  
  return Language.ENGLISH;
};

// --- Main App Component Content ---
const AppContent: React.FC = () => {
  // --- Global State ---
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  
  // Auth State
  const [isLoginMode, setIsLoginMode] = useState(true); 
  const [authView, setAuthView] = useState<AuthView>('LANDING');
  const [isProcessingAuth, setIsProcessingAuth] = useState(false);
  
  // Auth Form State
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');

  // --- App State (User Context) ---
  const [mode, setMode] = useState<ScreenMode>(ScreenMode.KEYBOARD);
  const [language, setLanguage] = useState<Language>(getInitialLanguage());
  const [buffer, setBuffer] = useState<string>('');
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [predictions, setPredictions] = useState<string[]>([]);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  // Interaction Context
  const { mode: interactionMode, setMode: setInteractionMode } = useInteraction();
  
  // Settings Temporary State
  const [elVoiceId, setElVoiceId] = useState('');
  
  // Voice Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Camera State
  const [showCamera, setShowCamera] = useState(false);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Navigation State for Services
  const [currentServicePath, setCurrentServicePath] = useState<ServiceItem[]>([]);

  // Refs for debouncing prediction
  const predictionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Environment Check
  const hasSystemElevenLabsKey = !!process.env.ELEVENLABS_API_KEY;

  // --- Initialization ---

  useEffect(() => {
    // Load voices
    const loadVoices = () => {
      setAvailableVoices(getAvailableVoices());
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    // Check for saved session
    const restoreSession = async () => {
        const storedId = getSessionUserId();
        if (storedId) {
            const user = await getUserById(storedId);
            if (user) {
                completeLogin(user);
            }
        }
        setIsLoadingSession(false);
    };
    restoreSession();
  }, []);

  // Sync internal state with user settings when user changes
  useEffect(() => {
    if (currentUser?.settings?.elevenLabs) {
      setElVoiceId(currentUser.settings.elevenLabs.voiceId || '');
    } else {
      setElVoiceId('');
    }
    // Set Interaction Mode if saved
    if (currentUser?.settings?.interactionMode) {
      setInteractionMode(currentUser.settings.interactionMode);
    } else {
        // Fallback: If no user preference, sync with detected environment
        // This handles cases where a user logs in on a new device type
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setInteractionMode(isTouch ? 'CLICK' : 'DWELL');
    }

    // Reset recording state when user changes
    setRecordingBlob(null);
    setRecordingUrl(null);
  }, [currentUser]);

  // Reset service navigation when language changes
  useEffect(() => {
    setCurrentServicePath([]);
  }, [language]);

  // --- Auth Handlers ---

  const completeLogin = (user: UserProfile) => {
    // Check migration for old data structure
    let migratedUser = user;
    try {
      const engTree = user.serviceTrees[Language.ENGLISH];
      const emergencyNode = engTree?.find(n => n.id === 'emergency');
      
      // If user doesn't have the new categories (e.g., Emergency), update their tree
      if (!emergencyNode) {
        migratedUser = { 
          ...user, 
          serviceTrees: JSON.parse(JSON.stringify(SERVICE_TREES)) 
        };
        updateUserProfile(migratedUser).catch(console.error);
      }
    } catch (e) {
      console.warn("Migration check failed", e);
    }

    setCurrentUser(migratedUser);
    saveSession(migratedUser.id);
    
    // Set language from user settings if available
    if (migratedUser.settings.language) {
      setLanguage(migratedUser.settings.language);
    }

    setIsLoginMode(false);
    setAuthEmail('');
    setAuthPassword('');
    setAuthName('');
    setMode(ScreenMode.SERVICES); // Set default mode to Services
    setHistory([]); 
    setCurrentServicePath([]); 
  };

  const handleLoginSubmit = async () => {
    if (!authEmail || !authPassword) {
        alert("Please enter email and password.");
        return;
    }
    setIsProcessingAuth(true);
    try {
        const user = await loginUser(authEmail, authPassword);
        if (user) completeLogin(user);
        else alert("Invalid email or password.");
    } catch (e) {
        console.error("Login error", e);
        alert("An error occurred during login.");
    } finally {
        setIsProcessingAuth(false);
    }
  };

  const handleSignupSubmit = async () => {
    if (!authEmail || !authPassword || !authName) {
        alert("Please fill in all fields.");
        return;
    }
    setIsProcessingAuth(true);
    try {
      // Pass the currently detected language to the new user creation
      const user = await createNewUser(authEmail, authName, authPassword, language); 
      completeLogin(user);
    } catch (e: any) {
      console.error("Creation failed", e);
      alert(e.message || "Failed to create account.");
    } finally {
      setIsProcessingAuth(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    clearSession();
    setIsLoginMode(true);
    setAuthView('LANDING');
    setBuffer('');
    setLanguage(getInitialLanguage()); // Reset to browser default on logout
  };

  // --- Core Handlers ---

  const handleClear = useCallback(() => {
    setBuffer('');
  }, []);

  const handleKeyPress = useCallback((char: string) => {
    if (char === 'Backspace' || char === 'Del') {
      setBuffer(prev => prev.slice(0, -1));
    } else if (char === 'Space') {
      setBuffer(prev => {
         if (prev.endsWith(' i') || prev === 'i') {
          return prev.slice(0, -1) + 'I ';
        }
        return prev + ' ';
      });
    } else if (char === 'Clear') {
      handleClear();
    } else {
      setBuffer(prev => {
        const trimmed = prev.trimEnd();
        const isStart = trimmed.length === 0;
        const lastChar = trimmed[trimmed.length - 1];
        const isAfterPunctuation = ['.', '!', '?'].includes(lastChar);
        if (isStart || isAfterPunctuation) return prev + char.toUpperCase();
        return prev + char.toLowerCase();
      });
    }
  }, [handleClear]);

  // Global Keyboard Listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      if (e.key === 'Backspace') handleKeyPress('Backspace');
      else if (e.key === 'Delete') handleKeyPress('Del');
      else if (e.key === 'Escape') handleKeyPress('Clear');
      else if (e.key === ' ') { e.preventDefault(); handleKeyPress('Space'); }
      else if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) handleKeyPress(e.key);
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleKeyPress]);

  const handleSpeak = () => {
    if (!buffer.trim()) return;
    speakText(buffer, language, currentUser?.settings);
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: buffer,
      timestamp: Date.now()
    };
    setHistory(prev => [...prev, newMsg]);
    setBuffer('');
  };

  const handlePredictionSelect = (text: string) => {
    // If selecting a prediction from an empty buffer state (Smart Reply), replace buffer
    if (buffer.trim().length === 0) {
      setBuffer(text); // Or maybe text + ' '
      return;
    }

    const words = buffer.trimEnd().split(' ');
    const lastWord = words[words.length - 1] || '';
    const isNextWordPrediction = buffer.endsWith(' ');
    let newBuffer = buffer;
    if (isNextWordPrediction) {
      newBuffer = buffer + text + ' ';
    } else {
      const bufferWithoutLastWord = buffer.slice(0, -lastWord.length);
      newBuffer = bufferWithoutLastWord + text + ' ';
    }
    setBuffer(newBuffer);
  };

  // --- Prediction & Smart Reply Effect ---
  useEffect(() => {
    let isMounted = true;
    if (predictionTimeoutRef.current) clearTimeout(predictionTimeoutRef.current);

    if (mode !== ScreenMode.KEYBOARD) return;

    if (buffer.trim().length > 0) {
      // Standard Word Prediction
      predictionTimeoutRef.current = setTimeout(async () => {
        try {
          const preds = await getPredictions(buffer, language);
          if (isMounted) setPredictions(preds);
        } catch (e) { console.error(e); }
      }, 200); 
    } else {
      // Smart Reply (Contextual)
      // Only fetch if we have history to base it on, otherwise show empty
      if (history.length > 0) {
        predictionTimeoutRef.current = setTimeout(async () => {
          try {
            const replies = await getSmartReplies(history, language);
            if (isMounted) setPredictions(replies);
          } catch (e) { console.error(e); }
        }, 500); // Slightly longer delay to avoid flickering on clear
      } else {
        if (isMounted) setPredictions([]);
      }
    }
    return () => {
      isMounted = false;
      if (predictionTimeoutRef.current) clearTimeout(predictionTimeoutRef.current);
    };
  }, [buffer, language, mode, history]);

  // --- Visual Grounding (Camera) Logic ---
  const startCamera = async () => {
    setShowCamera(true);
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    } catch (e) {
        console.error("Camera error", e);
        alert("Camera access denied or unavailable.");
        setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(t => t.stop());
    }
    setShowCamera(false);
  };

  const handleCaptureImage = async () => {
    if (!videoRef.current) return;
    setIsAnalyzingImage(true);
    
    // 1. Capture Frame
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
    
    // 2. Convert to Base64 (strip prefix for API)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    const base64 = dataUrl.split(',')[1];
    
    stopCamera();
    setMode(ScreenMode.KEYBOARD); // Ensure we are on keyboard screen to see predictions
    
    try {
        // 3. Get Predictions from Gemini Vision
        const visualPreds = await getVisualSuggestions(base64, language);
        setPredictions(visualPreds);
        // Optional: Speak feedback
        // speakText("I see...", language);
    } catch (e) {
        console.error("Vision error", e);
        alert("Could not analyze image.");
    } finally {
        setIsAnalyzingImage(false);
    }
  };


  // --- Recording Logic ---
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setRecordingBlob(blob);
        setRecordingUrl(URL.createObjectURL(blob));
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (e) {
      console.error("Mic error:", e);
      alert(TRANSLATIONS[language].micError);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleUploadRecording = async () => {
    if (!recordingBlob || !currentUser) return;
    setIsUploading(true);
    try {
        const url = await uploadVoiceSample(currentUser.id, recordingBlob);
        
        // Update user profile
        const updatedUser = {
            ...currentUser,
            settings: {
                ...currentUser.settings,
                voiceClone: {
                    status: 'pending' as const,
                    requestedAt: Date.now(),
                    sampleUrl: url || undefined
                }
            }
        };
        await updateUserProfile(updatedUser);
        setCurrentUser(updatedUser);
        
        // Mock Admin Notification
        console.log(`[MOCK EMAIL] To: marc.stein@gmail.com | Subject: New Voice Clone Request | User: ${currentUser.email}`);
        alert(TRANSLATIONS[language].uploadSuccess);
        
        setRecordingBlob(null);
        setRecordingUrl(null);
    } catch (e) {
        console.error("Upload error", e);
        alert(TRANSLATIONS[language].uploadFail);
    } finally {
        setIsUploading(false);
    }
  };

  const handlePlayRecording = () => {
    if (recordingUrl) {
        const audio = new Audio(recordingUrl);
        audio.play();
    }
  };

  // --- Service Navigation ---

  const getCurrentServiceLevel = () => {
    if (!currentUser) return [];
    let currentList = currentUser.serviceTrees[language];
    for (const pathItem of currentServicePath) {
      const found = currentList.find(item => item.id === pathItem.id);
      if (found && found.children) {
        currentList = found.children;
      } else {
        return [];
      }
    }
    return currentList;
  };

  const handleServiceSelect = (item: ServiceItem) => {
    if (item.children) {
      setCurrentServicePath([...currentServicePath, item]);
    } else {
      const textToSpeak = item.speechText || item.label;
      speakText(textToSpeak, language, currentUser?.settings);
      
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'user',
        text: textToSpeak,
        timestamp: Date.now()
      };
      setHistory(prev => [...prev, newMsg]);
    }
  };

  const handleServiceBack = () => {
    setCurrentServicePath(prev => prev.slice(0, -1));
  };

  const handleAddCustomService = async () => {
    if (!currentUser || !buffer.trim()) return;
    const newItemBase: ServiceItem = {
      id: Date.now().toString(),
      label: buffer.length > 15 ? buffer.substring(0, 12) + '...' : buffer,
      speechText: buffer,
      isCustom: true,
      color: 'bg-fuchsia-700'
    };
    const updatedUser = JSON.parse(JSON.stringify(currentUser)) as UserProfile;
    const languages = Object.keys(updatedUser.serviceTrees) as Language[];
    languages.forEach(lang => {
      let targetList = updatedUser.serviceTrees[lang];
      let pathIsValid = true;
      for (const pathItem of currentServicePath) {
        const found = targetList.find((t: ServiceItem) => t.id === pathItem.id);
        if (found && found.children) {
          targetList = found.children;
        } else {
          pathIsValid = false;
          break;
        }
      }
      if (pathIsValid) targetList.push({ ...newItemBase });
    });
    await updateUserProfile(updatedUser);
    setCurrentUser(updatedUser);
    handleSpeak(); 
    setBuffer(''); 
    alert(TRANSLATIONS[language].buttonAdded);
  };

  // --- Settings Handlers ---

  const handleModeChange = async (newMode: InteractionMode) => {
    setInteractionMode(newMode);
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      settings: { ...currentUser.settings, interactionMode: newMode }
    };
    await updateUserProfile(updatedUser);
    setCurrentUser(updatedUser);
  };
  
  const handleVoiceChange = async (voiceURI: string) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      settings: { ...currentUser.settings, voiceURI }
    };
    await updateUserProfile(updatedUser);
    setCurrentUser(updatedUser);
    speakText(TRANSLATIONS[language].voiceUpdated, language, updatedUser.settings);
  };

  const handleElevenLabsSave = async () => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      settings: {
        ...currentUser.settings,
        elevenLabs: { voiceId: elVoiceId }
      }
    };
    await updateUserProfile(updatedUser);
    setCurrentUser(updatedUser);
    speakText(TRANSLATIONS[language].elevenLabsConnected, language, updatedUser.settings);
  };


  // --- Render: Auth ---

  if (isLoadingSession) {
      return (
          <div className="flex h-screen items-center justify-center bg-slate-900 text-white">
              <Loader2 className="animate-spin w-12 h-12 text-brand-500" />
          </div>
      );
  }

  if (isLoginMode) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-4 md:p-8">
        {authView === 'LANDING' && (
          <div className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-4xl">
             <div className="flex flex-col items-center gap-4 text-center">
                <div className="bg-brand-600 p-4 md:p-6 rounded-3xl shadow-2xl">
                    <MessageSquare className="text-white w-12 h-12 md:w-16 md:h-16" />
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-200">Hello, Chatty</h1>
                <p className="text-lg md:text-xl text-slate-400">Assistive Communication Interface</p>
                <div className="flex flex-col items-center gap-2 mt-2">
                   <p className="text-sm text-slate-500">In collaboration with</p>
                   <a href="https://p-als.com/" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300 font-semibold transition-colors flex items-center gap-2">
                     <HeartHandshake className="w-4 h-4" /> Future of Humanity Foundation
                   </a>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full">
                <DwellButton onClick={() => setAuthView('LOGIN')} className="h-40 md:h-64 bg-slate-800 hover:bg-slate-700 border-2 border-slate-600">
                   <div className="flex flex-col items-center gap-4"><Lock className="text-brand-500 w-12 h-12 md:w-16 md:h-16" /><span className="text-2xl md:text-4xl font-bold">Log In</span></div>
                </DwellButton>
                <DwellButton onClick={() => setAuthView('SIGNUP')} className="h-40 md:h-64 bg-slate-800 hover:bg-slate-700 border-2 border-slate-600">
                   <div className="flex flex-col items-center gap-4"><Plus className="text-green-500 w-12 h-12 md:w-16 md:h-16" /><span className="text-2xl md:text-4xl font-bold">Create Account</span></div>
                </DwellButton>
             </div>
          </div>
        )}
        {(authView === 'LOGIN' || authView === 'SIGNUP') && (
           <div className="bg-slate-800 p-6 md:p-8 rounded-2xl border-2 border-slate-700 w-full max-w-lg flex flex-col gap-6 shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-2 md:mb-4">{authView === 'LOGIN' ? 'Welcome Back' : 'Create Account'}</h2>
              <div className="space-y-4">
                {authView === 'SIGNUP' && (
                  <div>
                    <label className="block text-slate-400 mb-1 ml-1 text-sm">Display Name</label>
                    <div className="relative"><input type="text" className="w-full bg-slate-950 border border-slate-600 rounded-lg p-3 md:p-4 pl-12 text-lg md:text-xl text-white focus:border-brand-500 outline-none" placeholder="e.g. John" value={authName} onChange={(e) => setAuthName(e.target.value)} /><User className="absolute left-4 top-4 md:top-5 text-slate-500" size={20} /></div>
                  </div>
                )}
                <div>
                    <label className="block text-slate-400 mb-1 ml-1 text-sm">Email Address</label>
                    <div className="relative"><input type="email" className="w-full bg-slate-950 border border-slate-600 rounded-lg p-3 md:p-4 pl-12 text-lg md:text-xl text-white focus:border-brand-500 outline-none" placeholder="name@example.com" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} /><Mail className="absolute left-4 top-4 md:top-5 text-slate-500" size={20} /></div>
                </div>
                <div>
                    <label className="block text-slate-400 mb-1 ml-1 text-sm">Password</label>
                    <div className="relative"><input type="password" className="w-full bg-slate-950 border border-slate-600 rounded-lg p-3 md:p-4 pl-12 text-lg md:text-xl text-white focus:border-brand-500 outline-none" placeholder="••••••••" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (authView === 'LOGIN' ? handleLoginSubmit() : handleSignupSubmit())} /><Key className="absolute left-4 top-4 md:top-5 text-slate-500" size={20} /></div>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <DwellButton onClick={() => setAuthView('LANDING')} className="flex-1 h-14 md:h-16 bg-slate-700 text-lg font-bold">Back</DwellButton>
                <DwellButton onClick={authView === 'LOGIN' ? handleLoginSubmit : handleSignupSubmit} disabled={isProcessingAuth} className={`flex-1 h-14 md:h-16 text-lg font-bold ${authView === 'LOGIN' ? 'bg-brand-600' : 'bg-green-600'}`}>
                  {isProcessingAuth ? <Loader2 className="animate-spin" /> : (authView === 'LOGIN' ? 'Log In' : 'Create Account')}
                </DwellButton>
              </div>
           </div>
        )}
      </div>
    );
  }

  // --- Render: Main App ---

  return (
    <div className="flex flex-col h-screen p-2 md:p-4 gap-2 md:gap-4 bg-slate-950 relative">
      
      {/* Top Bar: Buffer & Actions */}
      <div className="flex gap-2 md:gap-4 h-20 md:h-32 shrink-0">
        <div className="flex-1 bg-white text-slate-900 rounded-2xl p-2 md:p-4 shadow-inner border-4 border-slate-300 overflow-hidden relative">
          <textarea
            className="w-full h-full text-xl md:text-4xl font-semibold bg-transparent border-none outline-none resize-none placeholder:text-slate-300"
            value={buffer}
            onChange={(e) => setBuffer(e.target.value)}
            placeholder={TRANSLATIONS[language].typeHere}
            readOnly
          />
        </div>
        <div className="flex gap-2 w-1/4 min-w-[120px] md:min-w-[300px]">
           <DwellButton onClick={handleSpeak} className="flex-[2] bg-green-600 border-green-500 hover:bg-green-500 text-lg md:text-3xl font-bold">
             <div className="flex flex-col items-center"><Volume2 className="mb-1 w-6 h-6 md:w-8 md:h-8" /><span className="hidden md:inline">{TRANSLATIONS[language].speak}</span><span className="inline md:hidden">{TRANSLATIONS[language].go}</span></div>
           </DwellButton>
           
           {/* Visual Grounding Button (New) */}
           <DwellButton onClick={startCamera} className="flex-1 bg-indigo-700 border-indigo-600 hover:bg-indigo-600">
             <Camera className="w-6 h-6 md:w-8 md:h-8" />
           </DwellButton>

           <DwellButton onClick={handleClear} className="w-16 md:w-24 bg-red-800 border-red-700 hover:bg-red-700">
             <Trash2 className="w-6 h-6 md:w-8 md:h-8" />
           </DwellButton>
        </div>
      </div>

      <div className="flex flex-1 gap-2 md:gap-4 overflow-hidden flex-col md:flex-row">
        
        {/* Navigation Sidebar */}
        <div className="order-last md:order-first w-full md:w-1/4 md:min-w-[300px] flex md:flex-col gap-2 md:gap-4 shrink-0">
          <div className="grid grid-cols-3 md:grid-cols-1 gap-2 shrink-0 flex-1 md:flex-none">
            <DwellButton onClick={() => setMode(ScreenMode.KEYBOARD)} active={mode === ScreenMode.KEYBOARD} className="h-16 md:h-24 text-xs md:text-xl font-bold">{TRANSLATIONS[language].keyboard}</DwellButton>
            <DwellButton onClick={() => setMode(ScreenMode.SERVICES)} active={mode === ScreenMode.SERVICES} className="h-16 md:h-24 text-xs md:text-xl font-bold">{TRANSLATIONS[language].services}</DwellButton>
            <DwellButton onClick={() => setMode(ScreenMode.SETTINGS)} active={mode === ScreenMode.SETTINGS} className="h-16 md:h-14 font-bold bg-slate-800 text-xs md:text-base">
               <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2"><Settings size={20} /> <span className="hidden md:inline">{TRANSLATIONS[language].settings}</span></div>
            </DwellButton>
          </div>

          <div className="grid grid-cols-2 gap-2 shrink-0 w-40 md:w-full">
            {[Language.ENGLISH, Language.SPANISH, Language.JAPANESE, Language.FRENCH].map(l => (
              <DwellButton key={l} onClick={() => setLanguage(l)} active={language === l} className="h-14 md:h-20 font-bold text-lg md:text-xl">
                {l === Language.ENGLISH ? 'ENG' : l === Language.JAPANESE ? 'JP' : l === Language.SPANISH ? 'ES' : 'FRA'}
              </DwellButton>
            ))}
          </div>
          <div className="hidden md:flex flex-1 overflow-hidden">
             <HistoryLog history={history} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-slate-900 rounded-2xl border-2 border-slate-800 p-2 md:p-4 shadow-2xl relative overflow-hidden flex flex-col">
          
          {mode === ScreenMode.KEYBOARD && (
            <Keyboard language={language} onKeyPress={handleKeyPress} predictions={predictions} onPredictionSelect={handlePredictionSelect} />
          )}

          {mode === ScreenMode.SERVICES && (
            <div className="flex flex-col h-full">
              <div className="h-12 md:h-16 flex items-center mb-2 md:mb-4 gap-2 md:gap-4 shrink-0">
                 {currentServicePath.length > 0 && (
                   <DwellButton onClick={handleServiceBack} className="w-24 md:w-32 h-full bg-slate-700 hover:bg-slate-600 text-sm md:text-xl font-bold">
                     <div className="flex items-center justify-center gap-2"><ArrowLeft /> {TRANSLATIONS[language].back}</div>
                   </DwellButton>
                 )}
                 <h2 className="text-xl md:text-2xl font-bold text-slate-300 px-2 md:px-4 truncate">
                   {currentServicePath.length === 0 ? TRANSLATIONS[language].servicesHeader : currentServicePath[currentServicePath.length-1].label}
                 </h2>
              </div>
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 auto-rows-fr overflow-y-auto">
                {getCurrentServiceLevel().map((item) => {
                  const Icon = item.icon && ICON_MAP[item.icon] ? ICON_MAP[item.icon] : MessageSquare;
                  return (
                    <DwellButton 
                      key={item.id} 
                      onClick={() => handleServiceSelect(item)} 
                      className={`text-xl md:text-2xl font-bold shadow-xl ${item.color || 'bg-slate-700'} ${item.isCustom ? 'border-fuchsia-400 border-2' : ''} flex flex-col items-center justify-center gap-2 md:gap-4 p-2 md:p-4`}
                    >
                      <Icon className="w-8 h-8 md:w-12 md:h-12 opacity-90" />
                      <span className="text-center leading-tight text-sm md:text-base">{item.label}</span>
                    </DwellButton>
                  );
                })}
                <div className="flex items-center justify-center text-slate-600 border-2 border-dashed border-slate-800 rounded-xl"><span className="text-center text-xs md:text-sm p-2 md:p-4">{TRANSLATIONS[language].goToSettings}</span></div>
              </div>
            </div>
          )}

          {mode === ScreenMode.SETTINGS && (
             <div className="flex flex-col h-full overflow-y-auto p-2 md:p-4 space-y-4 md:space-y-8">
               <div className="bg-slate-800 p-4 md:p-6 rounded-xl border border-slate-700">
                 <div className="flex justify-between items-center mb-2 md:mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-brand-400 flex items-center gap-2"><User /> {TRANSLATIONS[language].profile}</h3>
                    <DwellButton onClick={handleLogout} className="h-10 px-4 text-xs md:text-sm bg-red-900 border-red-700 hover:bg-red-800">
                       <div className="flex items-center gap-2"><LogOut size={14} /> Log Out</div>
                    </DwellButton>
                 </div>
                 <p className="text-lg md:text-xl">{TRANSLATIONS[language].loggedInAs} <span className="font-bold text-white">{currentUser?.name}</span></p>
                 
                 {/* Interaction Mode Toggle */}
                 <div className="mt-4 pt-4 border-t border-slate-700">
                    <h4 className="text-lg font-bold text-slate-300 mb-2">Interaction Mode</h4>
                    <div className="flex gap-4">
                        <DwellButton 
                            onClick={() => handleModeChange('DWELL')} 
                            active={interactionMode === 'DWELL'}
                            className="flex-1 h-14 bg-slate-700 border-slate-600"
                        >
                            <div className="flex items-center gap-2"><Eye className="w-5 h-5" /> Eye/Dwell</div>
                        </DwellButton>
                        <DwellButton 
                            onClick={() => handleModeChange('CLICK')} 
                            active={interactionMode === 'CLICK'}
                            className="flex-1 h-14 bg-slate-700 border-slate-600"
                        >
                             <div className="flex items-center gap-2"><MousePointer2 className="w-5 h-5" /> Mouse Mode</div>
                        </DwellButton>
                    </div>
                 </div>
               </div>
               
               {/* NEW: Voice Cloning Intake */}
               <div className="bg-slate-800 p-4 md:p-6 rounded-xl border border-slate-700 border-l-4 border-l-indigo-500">
                 <h3 className="text-xl md:text-2xl font-bold text-indigo-400 mb-2 md:mb-4 flex items-center gap-2"><Mic /> {TRANSLATIONS[language].voiceCloningIntake}</h3>
                 
                 <p className="mb-4 text-slate-300 text-sm md:text-base leading-relaxed">
                   <span className="text-indigo-300 font-semibold">{TRANSLATIONS[language].freeServiceDesc}</span> <a href="https://alsvoicebank.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white font-bold text-indigo-300">alsvoicebank.com</a>.
                 </p>
                 <p className="mb-4 text-slate-400 text-xs">
                   {TRANSLATIONS[language].collaborationDesc} <a href="https://p-als.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-200">Future of Humanity Foundation</a>.
                 </p>

                 {currentUser?.settings?.voiceClone?.status === 'pending' ? (
                    <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-500/30">
                        <p className="text-indigo-200 font-bold mb-2">{TRANSLATIONS[language].statusPending}</p>
                        <p className="text-slate-300 text-sm">{TRANSLATIONS[language].pendingDesc}</p>
                    </div>
                 ) : (
                    <>
                        <p className="mb-4 text-slate-300 text-sm md:text-base leading-relaxed">
                            {TRANSLATIONS[language].createCopyDesc}
                        </p>
                        
                        {/* Script Display */}
                        <div className="bg-slate-950 p-4 rounded-lg mb-6 border border-slate-600">
                            <p className="text-lg md:text-xl font-serif text-white leading-relaxed">
                                "{VOICE_CLONE_SCRIPTS[language]}"
                            </p>
                        </div>

                        {/* Recording Controls */}
                        <div className="flex gap-4 mb-4">
                            {!isRecording && !recordingBlob && (
                                <DwellButton onClick={handleStartRecording} className="h-16 flex-1 bg-red-600 hover:bg-red-500 text-xl font-bold">
                                    <div className="flex items-center justify-center gap-2"><Mic /> {TRANSLATIONS[language].startRecording}</div>
                                </DwellButton>
                            )}
                            
                            {isRecording && (
                                <DwellButton onClick={handleStopRecording} className="h-16 flex-1 bg-slate-700 border-red-500 animate-pulse text-xl font-bold">
                                    <div className="flex items-center justify-center gap-2"><Square /> {TRANSLATIONS[language].stopRecording}</div>
                                </DwellButton>
                            )}

                            {recordingBlob && !isRecording && (
                                <>
                                    <DwellButton onClick={handlePlayRecording} className="h-16 w-32 bg-slate-700 hover:bg-slate-600">
                                        <div className="flex items-center justify-center gap-2"><Play /> {TRANSLATIONS[language].play}</div>
                                    </DwellButton>
                                    <DwellButton onClick={() => setRecordingBlob(null)} className="h-16 w-32 bg-slate-800 border-slate-600 text-sm">
                                        {TRANSLATIONS[language].retake}
                                    </DwellButton>
                                </>
                            )}
                        </div>

                        {/* Submit */}
                        {recordingBlob && !isRecording && (
                             <DwellButton onClick={handleUploadRecording} disabled={isUploading} className="h-20 w-full bg-indigo-600 hover:bg-indigo-500 text-xl font-bold">
                                {isUploading ? <Loader2 className="animate-spin" /> : 
                                <div className="flex items-center justify-center gap-2"><Upload /> {TRANSLATIONS[language].submitRequest}</div>}
                            </DwellButton>
                        )}
                    </>
                 )}
               </div>

               {/* Voice Banking / ElevenLabs */}
               <div className="bg-slate-800 p-4 md:p-6 rounded-xl border border-slate-700 border-l-4 border-l-sky-500">
                 <h3 className="text-xl md:text-2xl font-bold text-sky-400 mb-2 md:mb-4 flex items-center gap-2"><Cloud /> {TRANSLATIONS[language].existingVoiceId}</h3>
                 <p className="mb-4 text-slate-300 text-sm md:text-base leading-relaxed">
                   {TRANSLATIONS[language].existingVoiceDesc}
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                   <div className="col-span-2">
                      <label className="block text-slate-400 text-sm mb-1">{TRANSLATIONS[language].voiceIdLabel}</label>
                      <input type="text" value={elVoiceId} onChange={(e) => setElVoiceId(e.target.value)} className="w-full bg-slate-900 border border-slate-600 p-3 rounded-lg text-white font-mono" placeholder="e.g. 21m00Tcm4TlvDq8ikWAM" />
                   </div>
                   {!hasSystemElevenLabsKey && (
                     <div className="col-span-2 text-red-400 text-sm italic">
                        System configuration error: No ElevenLabs API Key found.
                     </div>
                   )}
                 </div>
                 <DwellButton onClick={handleElevenLabsSave} disabled={!hasSystemElevenLabsKey} className="h-14 md:h-16 bg-sky-900 border-sky-700 hover:bg-sky-800 font-bold">
                   <div className="flex items-center justify-center gap-2"><Save /> {TRANSLATIONS[language].saveActivate}</div>
                 </DwellButton>
               </div>

               <div className="bg-slate-800 p-4 md:p-6 rounded-xl border border-slate-700">
                 <h3 className="text-xl md:text-2xl font-bold text-brand-400 mb-2 md:mb-4 flex items-center gap-2"><Volume2 /> {TRANSLATIONS[language].standardVoices}</h3>
                 <p className="mb-4 text-slate-400 text-xs md:text-sm">{TRANSLATIONS[language].backupVoicesDesc}</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {getVoicesForLanguage(language)
                    .map(v => (
                     <DwellButton key={v.voiceURI} onClick={() => handleVoiceChange(v.voiceURI)} active={currentUser?.settings.voiceURI === v.voiceURI} className="h-14 md:h-16 text-lg">
                        {v.name}
                      </DwellButton>
                   ))}
                 </div>
               </div>

               <div className="bg-slate-800 p-4 md:p-6 rounded-xl border border-slate-700">
                 <h3 className="text-xl md:text-2xl font-bold text-fuchsia-400 mb-2 md:mb-4 flex items-center gap-2"><Plus /> {TRANSLATIONS[language].addCustomButton}</h3>
                 <div className="space-y-4">
                    <div className="bg-slate-900 p-4 rounded-lg flex flex-col gap-2">
                        <div className="flex justify-between items-center"><span className="text-slate-400 text-sm">{TRANSLATIONS[language].step1}</span><DwellButton onClick={() => setMode(ScreenMode.KEYBOARD)} className="h-10 px-4 text-sm bg-slate-700">{TRANSLATIONS[language].edit}</DwellButton></div>
                        <p className={`text-xl font-bold ${buffer ? 'text-white' : 'text-slate-600 italic'}`}>{buffer || TRANSLATIONS[language].empty}</p>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-lg flex flex-col gap-2">
                        <div className="flex justify-between items-center"><span className="text-slate-400 text-sm">{TRANSLATIONS[language].step2}</span><DwellButton onClick={() => setMode(ScreenMode.SERVICES)} className="h-10 px-4 text-sm bg-slate-700">{TRANSLATIONS[language].change}</DwellButton></div>
                        <p className="text-lg font-bold text-brand-200">{currentServicePath.length === 0 ? TRANSLATIONS[language].topLevel : currentServicePath.map(p => p.label).join(' > ')}</p>
                    </div>
                    <DwellButton onClick={handleAddCustomService} disabled={!buffer} className="h-16 md:h-20 bg-fuchsia-800 border-fuchsia-600 hover:bg-fuchsia-700 text-xl md:text-2xl font-bold w-full">
                        <div className="flex items-center justify-center gap-2"><Save /> {TRANSLATIONS[language].saveButton}</div>
                    </DwellButton>
                 </div>
               </div>
             </div>
          )}
        </div>
      </div>
      
      {/* Camera Modal Overlay */}
      {showCamera && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col">
            <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-slate-900">
                <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
                <div className="absolute inset-0 pointer-events-none border-[12px] border-slate-900/50" />
            </div>
            <div className="h-40 bg-slate-900 p-6 flex items-center justify-between gap-8">
                <DwellButton onClick={stopCamera} className="h-24 w-24 bg-slate-800 border-slate-700 rounded-full">
                    <X className="w-10 h-10" />
                </DwellButton>
                
                <DwellButton onClick={handleCaptureImage} className="h-28 w-28 bg-white rounded-full border-4 border-slate-300 hover:bg-slate-100 flex items-center justify-center">
                    {isAnalyzingImage ? <Loader2 className="w-12 h-12 animate-spin text-slate-900" /> : <div className="w-20 h-20 bg-indigo-600 rounded-full" />}
                </DwellButton>
                
                <div className="w-24" /> {/* Spacer */}
            </div>
        </div>
      )}
    </div>
  );
};

export const App: React.FC = () => {
    // Default to CLICK (Mouse Mode) for testing/start
    const [initialMode] = useState<InteractionMode>('CLICK');

    return (
        <InteractionProvider initialMode={initialMode}>
            <AppContent />
        </InteractionProvider>
    );
};
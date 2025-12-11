
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ArrowLeft, MessageSquare, Menu, Volume2, Trash2, Settings, Plus, User, LogOut, Save, Cloud, Key, Loader2, Lock, Unlock, RefreshCw, Mail,
  Utensils, Droplets, Coffee, GlassWater, Bed, Smile, ThermometerSun, ThermometerSnowflake, AlertCircle, ShowerHead, Bath, Sparkles, CupSoda,
  Mic, Square, Play, Upload, HeartHandshake, Camera, Aperture, X,
  Heart, Users, Lightbulb, Tv, Music, Gamepad2, Stethoscope, Pill, Syringe, Siren, ThumbsUp, ThumbsDown, Clock, XOctagon, Fan, Sun, Moon,
  Phone, BookOpen, Armchair, Eye, MousePointer2, Timer, ChevronDown, ChevronRight, ExternalLink
} from 'lucide-react';
import DwellButton from './components/DwellButton';
import Keyboard from './components/Keyboard';
import HistoryLog from './components/HistoryLog';
// EyeTracker components removed to fix build issues
import { InteractionProvider, useInteraction } from './context/InteractionContext';
import { Language, ScreenMode, ChatMessage, ServiceItem, UserProfile, InteractionMode, Gender, UserSettings } from './types';
import { SERVICE_TREES, TRANSLATIONS, DWELL_TIME_MS as DEFAULT_DWELL_MS, DEFAULT_ELEVEN_LABS_VOICES, ELEVEN_LABS_VOICE_NAMES, DEFAULT_INTERACTION_MODE, VOICE_CLONE_SCRIPTS } from './constants'; 
import { getPredictions, getSmartReplies, getVisualSuggestions } from './services/predictionService';
import { speakText, speakTextAsync, getAvailableVoices, getVoicesForLanguage } from './services/ttsService';
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
  const [authGender, setAuthGender] = useState<Gender | ''>('');

  // --- App State (User Context) ---
  const [mode, setMode] = useState<ScreenMode>(ScreenMode.KEYBOARD);
  const [language, setLanguage] = useState<Language>(getInitialLanguage());
  const [buffer, setBuffer] = useState<string>('');
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [predictions, setPredictions] = useState<string[]>([]);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  // Eye tracking state kept for type compatibility but feature disabled
  const [isEyeTrackerEnabled, setIsEyeTrackerEnabled] = useState(false);
  
  // Interaction Context
  const { mode: interactionMode, setMode: setInteractionMode, dwellTimeMs, setDwellTimeMs, triggerNavigationLock } = useInteraction();
  
  // Settings Temporary State
  const [elVoiceId, setElVoiceId] = useState('');
  const [showAdvancedVoice, setShowAdvancedVoice] = useState(false);
  
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
  const predictionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasSystemElevenLabsKey = !!process.env.ELEVENLABS_API_KEY;

  // --- Initialization ---

  useEffect(() => {
    const loadVoices = () => setAvailableVoices(getAvailableVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    const restoreSession = async () => {
        const storedId = getSessionUserId();
        if (storedId) {
            const user = await getUserById(storedId);
            if (user) completeLogin(user);
        }
        setIsLoadingSession(false);
    };
    restoreSession();
  }, []);

  // Watch for Screen/Mode changes to lock interaction (Prevent accidental clicks on new screens)
  useEffect(() => {
    triggerNavigationLock(1200); // Lock for 1.2s on major screen changes
  }, [mode, authView, isLoginMode, currentServicePath]);

  useEffect(() => {
    if (currentUser?.settings?.elevenLabs) {
      setElVoiceId(currentUser.settings.elevenLabs.voiceId || '');
    } else {
      setElVoiceId('');
    }
    if (currentUser?.settings?.interactionMode) {
      setInteractionMode(currentUser.settings.interactionMode);
    } else {
        // Default based on constant
        setInteractionMode(DEFAULT_INTERACTION_MODE);
    }
    if (currentUser?.settings?.dwellTimeMs) {
      setDwellTimeMs(currentUser.settings.dwellTimeMs);
    } else {
      setDwellTimeMs(DEFAULT_DWELL_MS);
    }
    if (currentUser?.settings?.isEyeTrackerEnabled !== undefined) {
      setIsEyeTrackerEnabled(currentUser.settings.isEyeTrackerEnabled);
    }
    setRecordingBlob(null);
    setRecordingUrl(null);
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && currentUser.gender) {
        const correctVoiceForLang = DEFAULT_ELEVEN_LABS_VOICES[language][currentUser.gender];
        if (correctVoiceForLang !== undefined && correctVoiceForLang !== currentUser.settings.elevenLabs?.voiceId) {
            const updatedUser = {
                ...currentUser,
                settings: {
                    ...currentUser.settings,
                    elevenLabs: {
                        ...currentUser.settings.elevenLabs,
                        voiceId: correctVoiceForLang
                    }
                }
            };
            setCurrentUser(updatedUser);
        }
    }
  }, [language, currentUser]);

  useEffect(() => {
    setCurrentServicePath([]);
  }, [language]);

  // --- Auth Handlers ---

  const completeLogin = (user: UserProfile) => {
    let migratedUser = user;
    try {
      const engTree = user.serviceTrees[Language.ENGLISH];
      const emergencyNode = engTree?.find(n => n.id === 'emergency');
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
    if (migratedUser.settings.language) setLanguage(migratedUser.settings.language);

    setIsLoginMode(false);
    setAuthEmail('');
    setAuthPassword('');
    setMode(ScreenMode.SERVICES); // Default to SERVICES per user request
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
    if (!authEmail || !authPassword || !authName || !authGender) {
        alert("Please fill in all fields including gender.");
        return;
    }
    setIsProcessingAuth(true);
    try {
      const user = await createNewUser(authEmail, authName, authPassword, language, authGender); 
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
    setLanguage(getInitialLanguage());
    setIsEyeTrackerEnabled(false); // Disable on logout
  };

  const handleClear = useCallback(() => {
    setBuffer('');
    triggerNavigationLock(500); // Lock to prevent double-clears
  }, [triggerNavigationLock]);

  const handleKeyPress = useCallback((char: string) => {
    if (char === 'Backspace' || char === 'Del') {
      setBuffer(prev => prev.slice(0, -1));
    } else if (char === 'Space') {
      setBuffer(prev => {
         if (prev.endsWith(' i') || prev === 'i') return prev.slice(0, -1) + 'I ';
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
    
    // Safety lock to prevent repeat triggers if user dwells too long
    triggerNavigationLock(1200);
    
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
    if (buffer.trim().length === 0) {
      setBuffer(text + ' '); 
      return;
    }

    // If buffer ends with space, treat as next word
    if (buffer.endsWith(' ')) {
        setBuffer(buffer + text + ' ');
        return;
    }

    // Otherwise, check if it is a completion or next word
    const words = buffer.trimEnd().split(' ');
    const lastWord = words[words.length - 1] || '';
    
    // Heuristic: If prediction starts with the last word, it's a completion. Replace it.
    // Otherwise, it's likely a next word prediction (even if user hasn't hit space yet). Append it.
    const isCompletion = text.toLowerCase().startsWith(lastWord.toLowerCase());

    if (isCompletion) {
        const bufferWithoutLastWord = buffer.slice(0, -lastWord.length);
        setBuffer(bufferWithoutLastWord + text + ' ');
    } else {
        setBuffer(buffer + ' ' + text + ' ');
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (predictionTimeoutRef.current) clearTimeout(predictionTimeoutRef.current);
    if (mode !== ScreenMode.KEYBOARD) return;

    if (buffer.trim().length > 0) {
      // INCREASED DEBOUNCE to 500ms to avoid Quota Exhaustion
      predictionTimeoutRef.current = setTimeout(async () => {
        try {
          const preds = await getPredictions(buffer, language);
          if (isMounted) setPredictions(preds);
        } catch (e) { console.error(e); }
      }, 500); 
    } else {
      if (history.length > 0) {
        predictionTimeoutRef.current = setTimeout(async () => {
          try {
            const replies = await getSmartReplies(history, language);
            if (isMounted) setPredictions(replies);
          } catch (e) { console.error(e); }
        }, 500);
      } else {
        if (isMounted) setPredictions([]);
      }
    }
    return () => { isMounted = false; if (predictionTimeoutRef.current) clearTimeout(predictionTimeoutRef.current); };
  }, [buffer, language, mode, history]);

  const startCamera = async () => {
    setShowCamera(true);
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (e) {
        console.error("Camera error", e);
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
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    const base64 = dataUrl.split(',')[1];
    stopCamera();
    setMode(ScreenMode.KEYBOARD);
    try {
        const visualPreds = await getVisualSuggestions(base64, language);
        setPredictions(visualPreds);
    } catch (e) { console.error("Vision error", e); } 
    finally { setIsAnalyzingImage(false); }
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setRecordingBlob(blob);
        setRecordingUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (e) { console.error("Mic error:", e); }
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
        setRecordingBlob(null);
        setRecordingUrl(null);
    } catch (e) { console.error("Upload error", e); } 
    finally { setIsUploading(false); }
  };

  const handlePlayRecording = () => { if (recordingUrl) new Audio(recordingUrl).play(); };

  const getCurrentServiceLevel = () => {
    if (!currentUser) return [];
    let currentList = currentUser.serviceTrees[language];
    for (const pathItem of currentServicePath) {
      const found = currentList.find(item => item.id === pathItem.id);
      if (found && found.children) currentList = found.children;
      else return [];
    }
    return currentList;
  };

  const handleServiceSelect = (item: ServiceItem) => {
    if (item.children) {
      setCurrentServicePath(prev => [...prev, item]);
      // Safety lock to prevent double-clicks during navigation transitions
      triggerNavigationLock(500); 
    } else {
      // LEAF NODE (Action)
      // Lock interaction to prevent the "Dwell Repeat" loop the user reported
      triggerNavigationLock(1200); 

      const textToSpeak = item.speechText || item.label;
      speakText(textToSpeak, language, currentUser?.settings);
      const newMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: textToSpeak, timestamp: Date.now() };
      setHistory(prev => [...prev, newMsg]);
    }
  };

  const handleServiceBack = () => {
    setCurrentServicePath(prev => prev.slice(0, -1));
    triggerNavigationLock(500);
  };

  const handleAddCustomService = async () => {
    if (!currentUser || !buffer.trim()) return;
    triggerNavigationLock(1000); // Lock to prevent multi-add
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
        if (found && found.children) targetList = found.children;
        else { pathIsValid = false; break; }
      }
      if (pathIsValid) targetList.push({ ...newItemBase });
    });
    await updateUserProfile(updatedUser);
    setCurrentUser(updatedUser);
    setBuffer(''); // Clear buffer after adding
  };

  const handleModeChange = async (newMode: InteractionMode) => {
    setInteractionMode(newMode);
    if (!currentUser) return;
    const updatedUser = { ...currentUser, settings: { ...currentUser.settings, interactionMode: newMode } };
    await updateUserProfile(updatedUser);
    setCurrentUser(updatedUser);
  };
  
  // Feature disabled - toggle logic kept for code compatibility if needed later
  const handleEyeTrackerToggle = async () => {
    const newState = !isEyeTrackerEnabled;
    setIsEyeTrackerEnabled(newState);
    // If enabling eye tracker, we should probably ensure DWELL mode is on
    if (newState && interactionMode !== 'DWELL') {
        setInteractionMode('DWELL');
    }
    
    if (currentUser) {
       const updatedUser = { ...currentUser, settings: { ...currentUser.settings, isEyeTrackerEnabled: newState, interactionMode: newState ? 'DWELL' : currentUser.settings.interactionMode } as UserSettings };
       await updateUserProfile(updatedUser);
       setCurrentUser(updatedUser);
    }
  };

  const handleDwellTimeChange = async (ms: number) => {
    setDwellTimeMs(ms);
    if (!currentUser) return;
    const updatedUser = { ...currentUser, settings: { ...currentUser.settings, dwellTimeMs: ms } };
    await updateUserProfile(updatedUser);
    setCurrentUser(updatedUser);
  };
  
  const handleVoiceChange = async (voiceURI: string) => {
    if (!currentUser) return;
    const updatedUser: UserProfile = { ...currentUser, settings: { ...currentUser.settings, voiceURI, elevenLabs: { ...currentUser.settings.elevenLabs, voiceId: '' } } };
    await updateUserProfile(updatedUser);
    setCurrentUser(updatedUser);
    setElVoiceId(''); 
    speakText(TRANSLATIONS[language].voiceUpdated, language, updatedUser.settings);
  };

  const handleElevenLabsSave = async () => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, settings: { ...currentUser.settings, elevenLabs: { voiceId: elVoiceId } } };
    await updateUserProfile(updatedUser);
    setCurrentUser(updatedUser);
    speakText(TRANSLATIONS[language].elevenLabsConnected, language, updatedUser.settings);
  };

  const handlePresetSelect = async (g: Gender) => {
    if (!currentUser) return;
    const voiceId = DEFAULT_ELEVEN_LABS_VOICES[language][g];
    const updatedUser = { ...currentUser, gender: g, settings: { ...currentUser.settings, voiceURI: '', elevenLabs: { voiceId } } };
    await updateUserProfile(updatedUser);
    setCurrentUser(updatedUser);
    setElVoiceId(voiceId);
    speakText(TRANSLATIONS[language].voiceUpdated, language, updatedUser.settings);
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
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-4 md:p-8 overflow-y-auto relative z-10">
        
        {/* Cinematic Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-900/20 rounded-full blur-[100px] animate-pulse duration-10000" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[100px] animate-pulse duration-7000" style={{animationDelay: '1s'}} />
        </div>

        {authView === 'LANDING' && (
          <div className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-4xl animate-in fade-in zoom-in duration-700">
             <div className="flex flex-col items-center gap-4 text-center">
                <div className="bg-gradient-to-br from-brand-600 to-indigo-600 p-4 md:p-6 rounded-3xl shadow-2xl animate-bounce" style={{animationDuration: '3s'}}>
                    <MessageSquare className="text-white w-12 h-12 md:w-16 md:h-16" />
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-sky-300 to-indigo-200 drop-shadow-lg">Hello, Chatty</h1>
                <p className="text-lg md:text-xl text-slate-300 tracking-wide font-light">Assistive Communication Interface</p>
                <div className="flex flex-col items-center gap-2 mt-2 opacity-80">
                   <p className="text-xs md:text-sm text-slate-500">In collaboration with</p>
                   <a href="#" className="text-brand-400 hover:text-brand-300 font-semibold transition-colors flex items-center gap-2">
                     <HeartHandshake className="w-4 h-4" /> Future of Humanity Foundation
                   </a>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full">
                <DwellButton id="auth-login" onClick={() => setAuthView('LOGIN')} className="h-40 md:h-64 bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 border-2 border-slate-600 hover:border-brand-500 transition-all">
                   <div className="flex flex-col items-center gap-4"><Lock className="text-brand-500 w-12 h-12 md:w-16 md:h-16" /><span className="text-2xl md:text-4xl font-bold">Log In</span></div>
                </DwellButton>
                <DwellButton id="auth-signup" onClick={() => setAuthView('SIGNUP')} className="h-40 md:h-64 bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 border-2 border-slate-600 hover:border-green-500 transition-all">
                   <div className="flex flex-col items-center gap-4"><Plus className="text-green-500 w-12 h-12 md:w-16 md:h-16" /><span className="text-2xl md:text-4xl font-bold">Create Account</span></div>
                </DwellButton>
             </div>
          </div>
        )}
        {(authView === 'LOGIN' || authView === 'SIGNUP') && (
           <div className="bg-slate-800/90 backdrop-blur-md p-6 md:p-8 rounded-2xl border-2 border-slate-700 w-full max-w-lg flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-bottom-8">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-2 md:mb-4">{authView === 'LOGIN' ? 'Welcome Back' : 'Create Account'}</h2>
              <div className="space-y-4">
                {authView === 'SIGNUP' && (
                  <>
                  <div>
                    <label className="block text-slate-400 mb-1 ml-1 text-sm">Display Name</label>
                    <div className="relative"><input type="text" className="w-full bg-slate-950 border border-slate-600 rounded-lg p-3 md:p-4 pl-12 text-lg md:text-xl text-white focus:border-brand-500 outline-none" placeholder="e.g. John" value={authName} onChange={(e) => setAuthName(e.target.value)} /><User className="absolute left-4 top-4 md:top-5 text-slate-500" size={20} /></div>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 ml-1 text-sm">Select Gender</label>
                    <div className="flex gap-4">
                        <DwellButton onClick={() => setAuthGender('male')} active={authGender === 'male'} className="h-16 flex-1 text-lg font-bold bg-slate-900 border-slate-600">
                           Male
                        </DwellButton>
                        <DwellButton onClick={() => setAuthGender('female')} active={authGender === 'female'} className="h-16 flex-1 text-lg font-bold bg-slate-900 border-slate-600">
                           Female
                        </DwellButton>
                    </div>
                  </div>
                  </>
                )}
                <div>
                    <div className="flex justify-between items-center mb-1 ml-1">
                        <label className="block text-slate-400 text-sm">Email Address</label>
                        {authView === 'LOGIN' && (
                            <button 
                                onClick={() => { setAuthEmail('demo@chatty.ai'); setAuthPassword('demo123'); }} 
                                className="text-brand-400 text-xs font-bold hover:text-white flex items-center gap-1 transition-colors"
                            >
                                <Sparkles size={12} /> Demo Autofill
                            </button>
                        )}
                    </div>
                    <div className="relative"><input type="email" className="w-full bg-slate-950 border border-slate-600 rounded-lg p-3 md:p-4 pl-12 text-lg md:text-xl text-white focus:border-brand-500 outline-none" placeholder="name@example.com" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} /><Mail className="absolute left-4 top-4 md:top-5 text-slate-500" size={20} /></div>
                </div>
                <div>
                    <label className="block text-slate-400 mb-1 ml-1 text-sm">Password</label>
                    <div className="relative"><input type="password" className="w-full bg-slate-950 border border-slate-600 rounded-lg p-3 md:p-4 pl-12 text-lg md:text-xl text-white focus:border-brand-500 outline-none" placeholder="••••••••" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (authView === 'LOGIN' ? handleLoginSubmit() : handleSignupSubmit())} /><Key className="absolute left-4 top-4 md:top-5 text-slate-500" size={20} /></div>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <DwellButton onClick={() => setAuthView('LANDING')} className="flex-1 h-14 md:h-16 bg-slate-700 text-lg font-bold">Back</DwellButton>
                <DwellButton id="btn-submit-auth" onClick={authView === 'LOGIN' ? handleLoginSubmit : handleSignupSubmit} disabled={isProcessingAuth} className={`flex-1 h-14 md:h-16 text-lg font-bold ${authView === 'LOGIN' ? 'bg-brand-600' : 'bg-green-600'}`}>
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
      
      {/* Eye Tracker Component Removed to fix build errors. Feature disabled. */}

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
           <DwellButton id="cmd-speak" onClick={handleSpeak} className="flex-[2] bg-green-600 border-green-500 hover:bg-green-500 text-lg md:text-3xl font-bold">
             <div className="flex flex-col items-center"><Volume2 className="mb-1 w-6 h-6 md:w-8 md:h-8" /><span className="hidden md:inline">{TRANSLATIONS[language].speak}</span><span className="inline md:hidden">{TRANSLATIONS[language].go}</span></div>
           </DwellButton>
           
           <DwellButton id="cmd-camera" onClick={startCamera} className="flex-1 bg-indigo-700 border-indigo-600 hover:bg-indigo-600">
             <Camera className="w-6 h-6 md:w-8 md:h-8" />
           </DwellButton>

           <DwellButton id="cmd-clear" onClick={handleClear} className="w-16 md:w-24 bg-red-800 border-red-700 hover:bg-red-700">
             <Trash2 className="w-6 h-6 md:w-8 md:h-8" />
           </DwellButton>
        </div>
      </div>

      <div className="flex flex-1 gap-2 md:gap-4 overflow-hidden flex-col md:flex-row">
        
        {/* Navigation Sidebar */}
        <div className="order-last md:order-first w-full md:w-1/4 md:min-w-[300px] flex md:flex-col gap-2 md:gap-4 shrink-0">
          <div className="grid grid-cols-3 md:grid-cols-1 gap-2 shrink-0 flex-1 md:flex-none">
            <DwellButton id="nav-KEYBOARD" onClick={() => setMode(ScreenMode.KEYBOARD)} active={mode === ScreenMode.KEYBOARD} className="h-16 md:h-24 text-xs md:text-xl font-bold">{TRANSLATIONS[language].keyboard}</DwellButton>
            <DwellButton id="nav-SERVICES" onClick={() => setMode(ScreenMode.SERVICES)} active={mode === ScreenMode.SERVICES} className="h-16 md:h-24 text-xs md:text-xl font-bold">{TRANSLATIONS[language].services}</DwellButton>
            <DwellButton id="nav-SETTINGS" onClick={() => setMode(ScreenMode.SETTINGS)} active={mode === ScreenMode.SETTINGS} className="h-16 md:h-14 font-bold bg-slate-800 text-xs md:text-base">
               <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2"><Settings size={20} /> <span className="hidden md:inline">{TRANSLATIONS[language].settings}</span></div>
            </DwellButton>
          </div>

          <div className="grid grid-cols-2 gap-2 shrink-0 w-40 md:w-full">
            {[Language.ENGLISH, Language.SPANISH, Language.JAPANESE, Language.FRENCH].map(l => (
              <DwellButton id={`lang-${l}`} key={l} onClick={() => setLanguage(l)} active={language === l} className="h-14 md:h-20 font-bold text-lg md:text-xl">
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
              <div className="h-12 md:h-16 flex items-center mb-2 md:mb-4 shrink-0">
                 <h2 className="text-xl md:text-2xl font-bold text-slate-300 px-2 md:px-4 truncate">
                   {currentServicePath.length === 0 ? TRANSLATIONS[language].servicesHeader : currentServicePath[currentServicePath.length-1].label}
                 </h2>
              </div>
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 auto-rows-fr overflow-y-auto">
                {currentServicePath.length > 0 && (
                    <DwellButton 
                      id="btn-service-back"
                      onClick={handleServiceBack}
                      className="text-xl md:text-2xl font-bold shadow-xl bg-slate-800 border-4 border-amber-500 hover:border-amber-400 flex flex-col items-center justify-center gap-2 md:gap-4 p-2 md:p-4"
                    >
                        <ArrowLeft className="w-8 h-8 md:w-12 md:h-12 opacity-90" />
                        <span className="text-center leading-tight text-sm md:text-base">{TRANSLATIONS[language].back}</span>
                    </DwellButton>
                )}
                {getCurrentServiceLevel().map((item) => {
                  const Icon = item.icon && ICON_MAP[item.icon] ? ICON_MAP[item.icon] : MessageSquare;
                  return (
                    <DwellButton 
                      key={item.id} 
                      id={`service-${item.id}`}
                      onClick={() => handleServiceSelect(item)} 
                      className={`text-xl md:text-2xl font-bold shadow-xl ${item.color || 'bg-slate-700'} ${item.isCustom ? 'border-fuchsia-400 border-2' : ''} flex flex-col items-center justify-center gap-2 md:gap-4 p-2 md:p-4`}
                    >
                      <Icon className="w-8 h-8 md:w-12 md:h-12 opacity-90" />
                      <span className="text-center leading-tight text-sm md:text-base">{item.label}</span>
                    </DwellButton>
                  );
                })}
                {/* Dynamic Add Button - visible if text is in buffer */}
                {buffer.trim().length > 0 ? (
                    <DwellButton 
                        id="btn-add-service"
                        onClick={handleAddCustomService} 
                        className="text-fuchsia-300 border-2 border-dashed border-fuchsia-500/50 bg-fuchsia-900/20 hover:bg-fuchsia-900/40 rounded-xl"
                    >
                        <div className="flex flex-col items-center justify-center gap-2 p-2">
                             <Plus className="w-8 h-8 md:w-10 md:h-10 animate-pulse" />
                             <span className="text-center text-xs md:text-sm font-bold">Add "{buffer.length > 10 ? buffer.substring(0,8)+'...' : buffer}"</span>
                        </div>
                    </DwellButton>
                ) : (
                    <div className="flex items-center justify-center text-slate-600 border-2 border-dashed border-slate-800 rounded-xl">
                        <span className="text-center text-xs md:text-sm p-2 md:p-4">Type in keyboard to add custom buttons here</span>
                    </div>
                )}
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
                 {currentUser?.gender && <p className="text-sm text-slate-400">Gender: {currentUser.gender}</p>}
                 
                 <div className="mt-4 pt-4 border-t border-slate-700">
                    <h4 className="text-lg font-bold text-slate-300 mb-2">Interaction Mode</h4>
                    <div className="flex gap-4 mb-4">
                        <DwellButton onClick={() => handleModeChange('DWELL')} active={interactionMode === 'DWELL'} className="flex-1 h-14 bg-slate-700 border-slate-600"><div className="flex items-center gap-2"><Eye className="w-5 h-5" /> Eye/Dwell</div></DwellButton>
                        <DwellButton onClick={() => handleModeChange('CLICK')} active={interactionMode === 'CLICK'} className="flex-1 h-14 bg-slate-700 border-slate-600"><div className="flex items-center gap-2"><MousePointer2 className="w-5 h-5" /> Mouse Mode</div></DwellButton>
                    </div>

                    {/* EYE TRACKING SECTION REMOVED FOR BUILD STABILITY */}
                 </div>
               </div>
               
               <div className="bg-slate-800 p-4 md:p-6 rounded-xl border border-slate-700 border-l-4 border-l-sky-500">
                 <h3 className="text-xl md:text-2xl font-bold text-sky-400 mb-2 md:mb-4 flex items-center gap-2"><Cloud /> {TRANSLATIONS[language].existingVoiceId}</h3>
                 <p className="mb-4 text-slate-300 text-sm md:text-base leading-relaxed">{TRANSLATIONS[language].existingVoiceDesc}</p>
                 
                 <div className="grid grid-cols-2 gap-4 mb-6">
                    <DwellButton id="settings-voice-male" onClick={() => handlePresetSelect('male')} active={currentUser?.gender === 'male' && elVoiceId === DEFAULT_ELEVEN_LABS_VOICES[language]['male']} className="h-24 md:h-28 bg-sky-900/50 border-sky-700/50">
                        <div className="flex flex-col items-center gap-2"><span className="text-sm uppercase tracking-wider text-sky-200">{TRANSLATIONS[language].presetMale}</span><span className="text-2xl font-bold text-white">{ELEVEN_LABS_VOICE_NAMES[language]['male']}</span></div>
                    </DwellButton>
                    <DwellButton id="settings-voice-female" onClick={() => handlePresetSelect('female')} active={currentUser?.gender === 'female' && elVoiceId === DEFAULT_ELEVEN_LABS_VOICES[language]['female']} className="h-24 md:h-28 bg-fuchsia-900/50 border-fuchsia-700/50">
                         <div className="flex flex-col items-center gap-2"><span className="text-sm uppercase tracking-wider text-fuchsia-200">{TRANSLATIONS[language].presetFemale}</span><span className="text-2xl font-bold text-white">{ELEVEN_LABS_VOICE_NAMES[language]['female']}</span></div>
                    </DwellButton>
                 </div>
               </div>
               
               <div className="bg-slate-800 p-4 md:p-6 rounded-xl border border-slate-700 border-l-4 border-l-indigo-500">
                 <h3 className="text-xl md:text-2xl font-bold text-indigo-400 mb-2 md:mb-4 flex items-center gap-2"><Mic /> {TRANSLATIONS[language].voiceCloningIntake}</h3>
                 <p className="mb-4 text-slate-300 text-sm md:text-base leading-relaxed"><span className="text-indigo-300 font-semibold">{TRANSLATIONS[language].freeServiceDesc}</span> <a href="https://alsvoicebank.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white font-bold text-indigo-300">alsvoicebank.com</a>.</p>
                 
                 {currentUser?.settings?.voiceClone?.status === 'pending' ? (
                     <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600 animate-in fade-in">
                         <div className="flex items-center gap-2 text-yellow-400 font-bold mb-2">
                             <Clock size={20} /> {TRANSLATIONS[language].statusPending}
                         </div>
                         <p className="text-slate-300">{TRANSLATIONS[language].pendingDesc}</p>
                     </div>
                 ) : (
                     <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                         <p className="text-slate-300 italic border-l-2 border-slate-600 pl-3">{TRANSLATIONS[language].createCopyDesc}</p>
                         
                         <div className="bg-slate-950 p-4 md:p-6 rounded-xl border border-slate-700 shadow-inner">
                             <p className="text-lg md:text-xl font-serif leading-relaxed text-slate-200">
                                "{VOICE_CLONE_SCRIPTS[language].replace('[name]', currentUser?.name || '...')}"
                             </p>
                         </div>

                         <div className="flex flex-wrap gap-4 pt-2">
                             {!isRecording && !recordingUrl && (
                                 <DwellButton onClick={handleStartRecording} className="h-16 md:h-20 px-8 bg-red-600 border-red-500 hover:bg-red-500 font-bold text-white rounded-2xl flex items-center gap-3 text-lg md:text-xl shadow-lg shadow-red-900/20">
                                     <Mic size={24} /> {TRANSLATIONS[language].startRecording}
                                 </DwellButton>
                             )}
                             
                             {isRecording && (
                                 <DwellButton onClick={handleStopRecording} className="h-16 md:h-20 px-8 bg-slate-800 border-red-500/50 hover:bg-slate-700 font-bold text-red-400 animate-pulse rounded-2xl flex items-center gap-3 text-lg md:text-xl w-full md:w-auto justify-center border-2">
                                     <div className="w-4 h-4 bg-red-500 rounded-sm animate-ping" />
                                     <Square fill="currentColor" size={20} /> {TRANSLATIONS[language].stopRecording}
                                 </DwellButton>
                             )}

                             {recordingUrl && !isRecording && (
                                 <div className="flex flex-wrap gap-3 w-full">
                                     <DwellButton onClick={handlePlayRecording} className="h-16 md:h-20 px-6 bg-indigo-600 border-indigo-500 hover:bg-indigo-500 font-bold text-white rounded-2xl flex items-center gap-2 text-lg">
                                         <Play fill="currentColor" /> {TRANSLATIONS[language].play}
                                     </DwellButton>
                                     <DwellButton onClick={() => { setRecordingUrl(null); setRecordingBlob(null); }} className="h-16 md:h-20 px-6 bg-slate-700 border-slate-600 hover:bg-slate-600 font-bold text-slate-300 rounded-2xl flex items-center gap-2 text-lg">
                                         <RefreshCw /> {TRANSLATIONS[language].retake}
                                     </DwellButton>
                                     <DwellButton onClick={handleUploadRecording} disabled={isUploading} className="h-16 md:h-20 px-8 bg-green-600 border-green-500 hover:bg-green-500 font-bold text-white rounded-2xl flex items-center gap-2 text-lg flex-1 shadow-lg shadow-green-900/20">
                                         {isUploading ? <Loader2 className="animate-spin" /> : <Upload />} 
                                         {TRANSLATIONS[language].submitRequest}
                                     </DwellButton>
                                 </div>
                             )}
                         </div>
                     </div>
                 )}
               </div>
             </div>
          )}
        </div>
      </div>
      
      {showCamera && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col">
            <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-slate-900">
                <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
                <div className="absolute inset-0 pointer-events-none border-[12px] border-slate-900/50" />
            </div>
            <div className="h-40 bg-slate-900 p-6 flex items-center justify-between gap-8">
                <DwellButton onClick={stopCamera} className="h-24 w-24 bg-slate-800 border-slate-700 rounded-full"><X className="w-10 h-10" /></DwellButton>
                <DwellButton id="cmd-capture" onClick={handleCaptureImage} className="h-28 w-28 bg-white rounded-full border-4 border-slate-300 hover:bg-slate-100 flex items-center justify-center">
                    {isAnalyzingImage ? <Loader2 className="w-12 h-12 animate-spin text-slate-900" /> : <div className="w-20 h-20 bg-indigo-600 rounded-full" />}
                </DwellButton>
                <div className="w-24" /> 
            </div>
        </div>
      )}
    </div>
  );
};

export const App: React.FC = () => {
    const [initialMode] = useState<InteractionMode>(DEFAULT_INTERACTION_MODE);
    return (
        <InteractionProvider initialMode={initialMode}>
            <AppContent />
        </InteractionProvider>
    );
};

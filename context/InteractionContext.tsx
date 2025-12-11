
import React, { createContext, useContext, useState, ReactNode, useRef, useCallback } from 'react';
import { InteractionMode } from '../types';
import { DWELL_TIME_MS as DEFAULT_DWELL_MS, DEFAULT_INTERACTION_MODE } from '../constants';

interface InteractionContextType {
  mode: InteractionMode;
  setMode: (mode: InteractionMode) => void;
  dwellTimeMs: number;
  setDwellTimeMs: (ms: number) => void;
  
  // For Director Mode demo automation
  demoHoverId: string | null;
  setDemoHoverId: (id: string | null) => void;
  
  // For WebGazer Eye Tracking
  gazeTargetId: string | null;
  setGazeTargetId: (id: string | null) => void;

  // Interaction Locking (Dead Zone logic)
  isInteractionLocked: boolean;
  triggerNavigationLock: (durationMs?: number) => void;
}

const InteractionContext = createContext<InteractionContextType>({
  mode: DEFAULT_INTERACTION_MODE,
  setMode: () => {},
  dwellTimeMs: DEFAULT_DWELL_MS,
  setDwellTimeMs: () => {},
  demoHoverId: null,
  setDemoHoverId: () => {},
  gazeTargetId: null,
  setGazeTargetId: () => {},
  isInteractionLocked: false,
  triggerNavigationLock: () => {}
});

export const useInteraction = () => useContext(InteractionContext);

interface InteractionProviderProps {
  children: ReactNode;
  initialMode?: InteractionMode;
}

export const InteractionProvider: React.FC<InteractionProviderProps> = ({ children, initialMode = DEFAULT_INTERACTION_MODE }) => {
  const [mode, setMode] = useState<InteractionMode>(initialMode);
  const [dwellTimeMs, setDwellTimeMs] = useState<number>(DEFAULT_DWELL_MS);
  const [demoHoverId, setDemoHoverId] = useState<string | null>(null);
  const [gazeTargetId, setGazeTargetId] = useState<string | null>(null);
  
  // Navigation Lock State
  const [isInteractionLocked, setIsInteractionLocked] = useState(false);
  const lockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerNavigationLock = useCallback((durationMs = 1000) => {
    setIsInteractionLocked(true);
    if (lockTimeoutRef.current) {
        clearTimeout(lockTimeoutRef.current);
    }
    lockTimeoutRef.current = setTimeout(() => {
        setIsInteractionLocked(false);
    }, durationMs);
  }, []);

  return (
    <InteractionContext.Provider value={{ 
      mode, setMode, 
      dwellTimeMs, setDwellTimeMs, 
      demoHoverId, setDemoHoverId,
      gazeTargetId, setGazeTargetId,
      isInteractionLocked, triggerNavigationLock
    }}>
      {children}
    </InteractionContext.Provider>
  );
};

export default InteractionContext;

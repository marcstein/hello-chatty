import React, { createContext, useContext, useState, ReactNode } from 'react';
import { InteractionMode } from '../types';
import { DWELL_TIME_MS as DEFAULT_DWELL_MS } from '../constants';

interface InteractionContextType {
  mode: InteractionMode;
  setMode: (mode: InteractionMode) => void;
  dwellTimeMs: number;
  setDwellTimeMs: (ms: number) => void;
}

const InteractionContext = createContext<InteractionContextType>({
  mode: 'DWELL',
  setMode: () => {},
  dwellTimeMs: DEFAULT_DWELL_MS,
  setDwellTimeMs: () => {},
});

export const useInteraction = () => useContext(InteractionContext);

interface InteractionProviderProps {
  children: ReactNode;
  initialMode?: InteractionMode;
}

export const InteractionProvider: React.FC<InteractionProviderProps> = ({ children, initialMode = 'DWELL' }) => {
  const [mode, setMode] = useState<InteractionMode>(initialMode);
  const [dwellTimeMs, setDwellTimeMs] = useState<number>(DEFAULT_DWELL_MS);

  return (
    <InteractionContext.Provider value={{ mode, setMode, dwellTimeMs, setDwellTimeMs }}>
      {children}
    </InteractionContext.Provider>
  );
};

export default InteractionContext;
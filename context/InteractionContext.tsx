import React, { createContext, useContext, useState, ReactNode } from 'react';
import { InteractionMode } from '../types';

interface InteractionContextType {
  mode: InteractionMode;
  setMode: (mode: InteractionMode) => void;
}

const InteractionContext = createContext<InteractionContextType>({
  mode: 'DWELL',
  setMode: () => {},
});

export const useInteraction = () => useContext(InteractionContext);

interface InteractionProviderProps {
  children: ReactNode;
  initialMode?: InteractionMode;
}

export const InteractionProvider: React.FC<InteractionProviderProps> = ({ children, initialMode = 'DWELL' }) => {
  const [mode, setMode] = useState<InteractionMode>(initialMode);

  return (
    <InteractionContext.Provider value={{ mode, setMode }}>
      {children}
    </InteractionContext.Provider>
  );
};

export default InteractionContext;
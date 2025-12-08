import React, { useState, useRef } from 'react';
import { useInteraction } from '../context/InteractionContext';

interface DwellButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  active?: boolean; // For toggles
}

const DwellButton: React.FC<DwellButtonProps> = ({ 
  onClick, 
  children, 
  className = "", 
  disabled = false,
  active = false
}) => {
  const [isDwelling, setIsDwelling] = useState(false);
  const clickTriggeredRef = useRef(false);
  const { mode, dwellTimeMs } = useInteraction();

  const handleEnter = () => {
    if (disabled || mode === 'CLICK') return;
    clickTriggeredRef.current = false;
    setIsDwelling(true);
  };

  const handleLeave = () => {
    if (mode === 'CLICK') return;
    setIsDwelling(false);
    clickTriggeredRef.current = false;
  };

  const handleAnimationEnd = () => {
    if (isDwelling && !disabled && !clickTriggeredRef.current && mode === 'DWELL') {
      clickTriggeredRef.current = true;
      onClick();
      setIsDwelling(false);
    }
  };

  return (
    <div 
      className={`relative group touch-manipulation select-none cursor-pointer transition-transform duration-200 ${isDwelling && !disabled ? 'scale-105 z-20' : 'scale-100 z-0'} ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => {
        // In CLICK mode, we always allow clicks. 
        // In DWELL mode, manual click is still allowed (hybrid), unless trigger just happened.
        if(!disabled && !clickTriggeredRef.current) {
            onClick();
            setIsDwelling(false);
        }
      }}
    >
      {/* Background/Container */}
      <div className={`
        relative w-full h-full flex items-center justify-center rounded-xl border-2 transition-all duration-200 overflow-hidden
        ${disabled ? 'opacity-50 cursor-not-allowed border-slate-700 bg-slate-800' : ''}
        ${active ? 'bg-brand-600 border-brand-400 text-white' : 'bg-slate-800 border-slate-600 text-slate-100 group-hover:bg-slate-700'}
        ${!disabled && !active ? 'shadow-lg' : ''}
        ${isDwelling && !disabled ? 'border-brand-400 shadow-brand-500/50' : ''}
      `}>
        <div className="z-10 relative flex flex-col items-center justify-center w-full h-full">
            {children}
        </div>
        
        {/* Dwell Animation Overlay - Background Fill */}
        {isDwelling && !disabled && mode === 'DWELL' && (
           <div 
             className="absolute bottom-0 left-0 w-full bg-brand-500/40 pointer-events-none"
             style={{
               height: '0%',
               animation: `dwellVerticalFill ${dwellTimeMs}ms linear forwards`
             }}
             onAnimationEnd={handleAnimationEnd}
           />
        )}
      </div>
      
      <style>{`
        @keyframes dwellVerticalFill {
          from { height: 0%; }
          to { height: 100%; }
        }
      `}</style>
    </div>
  );
};

export default DwellButton;
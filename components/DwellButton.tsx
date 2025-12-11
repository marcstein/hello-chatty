
import React, { useState, useRef, useEffect } from 'react';
import { useInteraction } from '../context/InteractionContext';

interface DwellButtonProps {
  id?: string; // Added for Demo Mode targeting
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  active?: boolean; // For toggles
}

const DwellButton: React.FC<DwellButtonProps> = ({ 
  id,
  onClick, 
  children, 
  className = "", 
  disabled = false,
  active = false
}) => {
  const [isDwelling, setIsDwelling] = useState(false);
  const clickTriggeredRef = useRef(false);
  const { mode, dwellTimeMs, demoHoverId, gazeTargetId, isInteractionLocked } = useInteraction();

  // Watch for External Triggers (Demo Mode OR WebGazer)
  useEffect(() => {
    // SECURITY: If interaction is locked (navigation happening), force dwell off and ignore
    if (isInteractionLocked) {
        if (isDwelling) setIsDwelling(false);
        return;
    }

    // Combined logic: Is this button the target of either the Demo Engine or the Eye Tracker?
    const isTargeted = (id && demoHoverId === id) || (id && gazeTargetId === id);

    if (isTargeted) {
        if (!isDwelling) {
           setIsDwelling(true);
           clickTriggeredRef.current = false; // Reset click trigger on new entry
        }
    } else {
        // If we were dwelling but are no longer targeted
        if (isDwelling) {
            // Only cancel if we are in Dwell mode (if we are in Click mode, dwelling is visual only or disabled)
            setIsDwelling(false);
        }
    }
  }, [demoHoverId, gazeTargetId, id, mode, isDwelling, isInteractionLocked]);

  const handleEnter = () => {
    if (disabled || mode === 'CLICK' || isInteractionLocked) return;
    // If demo/gaze is controlling this button, ignore mouse enter to avoid conflict
    if (demoHoverId || gazeTargetId) return; 
    
    clickTriggeredRef.current = false;
    setIsDwelling(true);
  };

  const handleLeave = () => {
    if (mode === 'CLICK') return;
    // If demo/gaze is controlling this, ignore mouse leave
    if ((id && demoHoverId === id) || (id && gazeTargetId === id)) return;

    setIsDwelling(false);
    clickTriggeredRef.current = false;
  };

  const handleAnimationEnd = () => {
    // If this was triggered by the Demo Engine, we do NOT trigger onClick here (Demo Engine handles it).
    if (id && demoHoverId === id) return;
    
    // Check lock again just in case
    if (isInteractionLocked) return;

    // Normal Dwell or Gaze Dwell logic
    if (isDwelling && !disabled && !clickTriggeredRef.current && mode === 'DWELL') {
      clickTriggeredRef.current = true;
      onClick();
      setIsDwelling(false);
      // Optional: Reset gaze target briefly? No, the user typically looks away after action.
    }
  };

  return (
    <div 
      id={id}
      data-dwell-target="true" // Marker for WebGazer hit-testing
      className={`relative group touch-manipulation select-none cursor-pointer transition-transform duration-200 ${isDwelling && !disabled && !isInteractionLocked ? 'scale-105 z-20' : 'scale-100 z-0'} ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => {
        if(!disabled && !clickTriggeredRef.current && !isInteractionLocked) {
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
        ${isDwelling && !disabled && !isInteractionLocked ? 'border-brand-400 shadow-brand-500/50' : ''}
      `}>
        <div className="z-10 relative flex flex-col items-center justify-center w-full h-full pointer-events-none">
            {children}
        </div>
        
        {/* Dwell Animation Overlay - Background Fill */}
        {isDwelling && !disabled && mode === 'DWELL' && !isInteractionLocked && (
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


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
  const isHoveredRef = useRef(false); // Track mouse hover state locally
  const { mode, dwellTimeMs, demoHoverId, gazeTargetId, isInteractionLocked } = useInteraction();

  // Unified State Management for Dwell Logic
  useEffect(() => {
    // 1. Security/Lock: If interaction is locked (e.g. navigation transition), force everything off.
    if (isInteractionLocked) {
        if (isDwelling) setIsDwelling(false);
        return;
    }

    // 2. Determine if we *should* be dwelling right now
    const isTargetedByExternal = (id && demoHoverId === id) || (id && gazeTargetId === id);
    const isHoveredByMouse = isHoveredRef.current;
    
    // We should dwell if:
    // a) External target (Demo/Eye Tracker) says so
    // b) Mouse is hovering AND we are in DWELL mode AND not disabled
    const shouldDwell = isTargetedByExternal || (isHoveredByMouse && mode === 'DWELL' && !disabled);

    if (shouldDwell) {
        // Only start dwelling if not already dwelling
        if (!isDwelling) {
            setIsDwelling(true);
            clickTriggeredRef.current = false;
        }
    } else {
        // If we shouldn't be dwelling, but we are, turn it off
        if (isDwelling) {
            setIsDwelling(false);
        }
    }
  }, [demoHoverId, gazeTargetId, id, mode, isDwelling, isInteractionLocked, disabled]); // Trigger on any state change

  const handleEnter = () => {
    isHoveredRef.current = true;
    
    if (disabled || mode === 'CLICK' || isInteractionLocked) return;
    
    // Immediate UI feedback for mouse users (optional, as useEffect would catch it too, but this is snappier)
    // We check !isDwelling to prevent double-setting if useEffect caught it already
    if (!demoHoverId && !gazeTargetId && !isDwelling) {
        clickTriggeredRef.current = false;
        setIsDwelling(true);
    }
  };

  const handleLeave = () => {
    isHoveredRef.current = false;
    
    // Immediate cleanup for mouse users
    if (!demoHoverId && !gazeTargetId) {
        setIsDwelling(false);
        clickTriggeredRef.current = false;
    }
  };

  const handleAnimationEnd = () => {
    // Safety checks
    if (isInteractionLocked) return;
    if (id && demoHoverId === id) return; // Demo engine handles its own clicks

    // Trigger click if dwelling finished, not disabled, and not already triggered
    if (isDwelling && !disabled && !clickTriggeredRef.current && mode === 'DWELL') {
      clickTriggeredRef.current = true;
      onClick();
      setIsDwelling(false);
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
        // Immediate click support (works in DWELL mode too if user physically clicks/taps)
        if(!disabled && !isInteractionLocked) {
            // Prevent double fire if dwell just finished at the same millisecond
            if (!clickTriggeredRef.current) {
                onClick();
                setIsDwelling(false);
            }
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

import React from 'react';
import { KEYBOARD_LAYOUTS } from '../constants';
import { Language } from '../types';
import DwellButton from './DwellButton';

interface KeyboardProps {
  language: Language;
  onKeyPress: (char: string) => void;
  predictions: string[];
  onPredictionSelect: (text: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ 
  language, 
  onKeyPress, 
  predictions,
  onPredictionSelect 
}) => {
  const layout = KEYBOARD_LAYOUTS[language];

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Prediction Row */}
      <div className="grid grid-cols-4 gap-4 h-20">
        {predictions.map((pred, idx) => (
          <DwellButton 
            key={`pred-${idx}`} 
            onClick={() => onPredictionSelect(pred)}
            className="text-2xl font-bold bg-indigo-900 border-indigo-700 hover:bg-indigo-800"
          >
            <span className="truncate px-2">{pred}</span>
          </DwellButton>
        ))}
        {predictions.length === 0 && (
          <div className="col-span-4 flex items-center justify-center text-slate-600 bg-slate-900/50 rounded-xl border border-slate-800/50 italic text-xl">
            Predictions appear here...
          </div>
        )}
      </div>

      {/* Keyboard Grid */}
      <div className="flex-1 grid gap-3 p-2 bg-slate-900/50 rounded-2xl border border-slate-800"
           style={{ 
             gridTemplateRows: `repeat(${layout.length}, minmax(0, 1fr))` 
           }}>
        {layout.map((row, rIdx) => (
          <div key={`row-${rIdx}`} className="grid gap-3 h-full"
               style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}>
            {row.map((char, cIdx) => (
              <DwellButton
                key={`${rIdx}-${cIdx}`}
                onClick={() => onKeyPress(char)}
                className={`text-3xl font-bold ${
                  char === 'Space' ? 'text-sm tracking-widest uppercase' :
                  char === 'Backspace' || char === 'Del' ? 'text-red-400' :
                  char === 'Clear' ? 'bg-red-900 border-red-700 hover:bg-red-800 text-red-100 text-sm tracking-wider uppercase' : ''
                }`}
              >
                {char === 'Space' ? 'SPACE' : 
                 char === 'Backspace' || char === 'Del' ? '⌫' : 
                 char === 'Clear' ? 'CLEAR' : char}
              </DwellButton>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
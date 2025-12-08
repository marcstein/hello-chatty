import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '../types';

interface HistoryLogProps {
  history: ChatMessage[];
}

const HistoryLog: React.FC<HistoryLogProps> = ({ history }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/50 rounded-xl border border-slate-800 mb-4 h-full scrollbar-hide">
      {history.length === 0 && (
        <div className="text-slate-500 text-center italic mt-10 opacity-50">
          Conversation history will appear here...
        </div>
      )}
      {history.map((msg) => (
        <div 
          key={msg.id} 
          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`
            max-w-[80%] rounded-2xl px-5 py-3 text-xl font-medium
            ${msg.sender === 'user' 
              ? 'bg-brand-600 text-white rounded-tr-sm' 
              : 'bg-slate-700 text-slate-200 rounded-tl-sm'}
          `}>
            {msg.text}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default HistoryLog;

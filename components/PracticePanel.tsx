
import React, { useState, useRef } from 'react';
import { KanaData } from '../types';

interface PracticePanelProps {
  kana: KanaData;
}

export const PracticePanel: React.FC<PracticePanelProps> = ({ kana }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<{ score: number; msg: string } | null>(null);
  
  const handleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate recording...
      setTimeout(() => {
        setIsRecording(false);
        setFeedback({ score: 95, msg: "Excellent! You pronounced the basic vocabulary perfectly." });
      }, 2000);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">Basic Learning</h2>
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">N5 LEVEL</span>
        </div>
        
        <div className="p-4 bg-indigo-50 rounded-2xl border-l-4 border-indigo-500">
          <p className="text-2xl mb-1 text-slate-800 font-medium">{kana.example_sentence.text}</p>
          <p className="text-xs text-slate-500 italic mb-2 tracking-wide">{kana.example_sentence.reading}</p>
          <p className="text-sm text-slate-600 font-medium border-t border-indigo-100 pt-2 mt-2">{kana.example_sentence.translation}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm text-xl">
            💡
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            {kana.mnemonic_image_description}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button 
            onClick={handleRecord}
            disabled={isRecording}
            className={`flex-1 rounded-2xl font-bold transition-all flex flex-col items-center justify-center gap-2 ${
              isRecording 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
            <span className="text-xs">{isRecording ? 'Listening...' : 'Practice'}</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-100 flex items-center gap-3 animate-in fade-in zoom-in-95">
          <div className="text-2xl font-black text-green-600">{feedback.score}</div>
          <div className="text-xs text-green-700 font-medium">{feedback.msg}</div>
        </div>
      )}
    </div>
  );
};

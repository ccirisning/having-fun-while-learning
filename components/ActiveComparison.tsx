
import React from 'react';
import { KanaData } from '../types';

interface ActiveComparisonProps {
  currentKana: KanaData;
  confusableKana: KanaData;
  isOpen: boolean;
  onClose: () => void;
}

export const ActiveComparison: React.FC<ActiveComparisonProps> = ({ currentKana, confusableKana, isOpen, onClose }) => {
  if (!currentKana || !confusableKana) return null;

  return (
    <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50 border-l border-slate-200 flex flex-col`}>
      <div className="p-6 overflow-y-auto flex-1">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-8 bg-indigo-600 rounded-full" />
            <h2 className="text-xl font-black text-slate-800 uppercase">Active Vision</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <p className="text-[10px] text-slate-400 font-black mb-4 uppercase tracking-[0.2em] italic">Visual Difference Logic</p>
        
        <div className="flex flex-col gap-6">
          {/* Current Character Focus */}
          <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 relative group shadow-sm">
            <div className="absolute top-4 left-6 flex flex-col">
              <span className="text-[9px] font-black text-indigo-400 uppercase leading-none mb-1">Target</span>
              <span className="text-xl font-black text-slate-900 leading-none">{currentKana.romaji}</span>
            </div>
            
            <svg viewBox="0 0 100 100" className="w-36 h-36 mx-auto">
              {currentKana.strokePaths.map((p, i) => (
                <path key={i} d={p} fill="none" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              ))}
              {currentKana.keyFeatures.map(f => (
                <circle key={f.id} cx={f.coord.x} cy={f.coord.y} r={f.radius} fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1.5" className="animate-pulse" />
              ))}
            </svg>
            
            {currentKana.keyFeatures.length > 0 && (
              <div className="mt-4 flex items-center justify-center gap-2 bg-white py-2 px-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <p className="text-[10px] text-slate-700 font-black uppercase tracking-tight">{currentKana.keyFeatures[0].label}</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center py-2 relative">
             <div className="h-px w-full bg-slate-100 absolute top-1/2 left-0" />
             <div className="bg-white px-4 py-1.5 rounded-full border border-slate-200 text-[10px] font-black text-slate-300 relative z-10 uppercase tracking-widest">VS</div>
          </div>

          {/* Confusable Character Contrast */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 relative group opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <div className="absolute top-4 left-6 flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">Confusable</span>
              <span className="text-xl font-black text-slate-400 leading-none">{confusableKana.romaji}</span>
            </div>
            
            <svg viewBox="0 0 100 100" className="w-32 h-32 mx-auto">
              {confusableKana.strokePaths.map((p, i) => (
                <path key={i} d={p} fill="none" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              ))}
            </svg>
            
            <div className="mt-4 flex items-center justify-center bg-slate-50 py-1.5 rounded-xl border border-dashed border-slate-200">
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-tight">Check Stroke Count & Flow</p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-indigo-600 rounded-[2.5rem] shadow-lg shadow-indigo-100">
          <div className="flex items-center gap-2 mb-3">
             <div className="p-1.5 bg-white/20 rounded-lg text-white text-[10px] font-black">TIP</div>
             <h4 className="text-xs font-black text-white uppercase tracking-wider">Expert Analysis</h4>
          </div>
          <p className="text-[11px] text-indigo-50 leading-relaxed font-medium">{currentKana.explanation}</p>
        </div>
      </div>
      
      <div className="p-6 border-t border-slate-100 bg-slate-50/50">
        <button 
          onClick={onClose} 
          className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-lg"
        >
          Return to Practice
        </button>
      </div>
    </div>
  );
};

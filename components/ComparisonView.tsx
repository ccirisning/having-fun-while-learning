
import React, { useState } from 'react';
import { KanaData } from '../types';

interface ComparisonViewProps {
  currentKana: KanaData;
  confusableKana: KanaData;
  userDrawingUrl?: string;
  onClose: () => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ 
  currentKana, 
  confusableKana, 
  userDrawingUrl,
  onClose 
}) => {
  const [viewMode, setViewMode] = useState<'standard' | 'contrast'>('standard');
  
  // Logic Fix: Ensure strict ID matching for the display character
  const activeMaster = viewMode === 'contrast' ? confusableKana : currentKana;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-6xl rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col h-[90vh] border border-white/20">
        {/* Header with Explicit Diagnosis labels */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 rounded-2xl text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Parallel Vision Module</h2>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Status: Comparing {currentKana.romaji.toUpperCase()} {viewMode === 'contrast' ? `VS ${confusableKana.romaji.toUpperCase()}` : ''}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button 
                onClick={() => setViewMode('standard')}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${viewMode === 'standard' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-400'}`}
              >
                Standard {currentKana.kana}
              </button>
              <button 
                onClick={() => setViewMode('contrast')}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${viewMode === 'contrast' ? 'bg-white shadow-md text-amber-600' : 'text-slate-400'}`}
              >
                Contrast {confusableKana.kana}
              </button>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-slate-200 rounded-full transition-colors">
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-2 divide-x divide-slate-100">
          {/* Left: User Handwriting Capture */}
          <div className="p-12 flex flex-col items-center justify-center bg-slate-50/30">
            <div className="mb-10 text-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Your Submission</span>
              <h3 className="text-xl font-black text-slate-800 tracking-tighter italic">Handwritten Flow</h3>
            </div>
            
            <div className="w-full max-w-[400px] aspect-square bg-white rounded-[3rem] shadow-2xl border-2 border-slate-100 flex items-center justify-center relative overflow-hidden group">
              {userDrawingUrl ? (
                <img src={userDrawingUrl} className="w-full h-full object-contain p-8" alt="User writing" />
              ) : (
                <p className="text-slate-300 font-bold uppercase tracking-widest animate-pulse">Waiting for Input</p>
              )}
            </div>
            
            <div className="mt-8 flex gap-3">
              <div className="px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-[10px] font-black text-slate-400 uppercase">Input ID: {currentKana.id}</div>
            </div>
          </div>

          {/* Right: Authority Reference (Font-Based + Path Overlay) */}
          <div className="p-12 flex flex-col items-center justify-center">
            <div className="mb-10 text-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Master Reference</span>
              <h3 className={`text-xl font-black tracking-tighter ${viewMode === 'contrast' ? 'text-amber-600' : 'text-indigo-600'}`}>
                Noto Sans JP Baseline
              </h3>
            </div>

            <div className={`w-full max-w-[400px] aspect-square rounded-[3rem] border-2 flex items-center justify-center relative shadow-inner transition-all duration-500 overflow-hidden ${viewMode === 'contrast' ? 'bg-amber-50/30 border-amber-100' : 'bg-indigo-50/30 border-indigo-100'}`}>
              {/* Font-Based Authority Figure */}
              <div 
                className="absolute inset-0 flex items-center justify-center text-[280px] font-normal leading-none pointer-events-none opacity-20"
                style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                {activeMaster.kana}
              </div>

              {/* Path Guide Overlay */}
              <svg viewBox="0 0 100 100" className="w-[70%] h-[70%] relative z-10">
                {activeMaster.strokePaths.map((p, i) => (
                  <path 
                    key={`${activeMaster.id}-stroke-${i}`} 
                    d={p} 
                    fill="none" 
                    stroke={viewMode === 'contrast' ? "#d97706" : "#4f46e5"} 
                    strokeWidth="5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="kana-stroke"
                  />
                ))}
                
                {/* Feature Callouts only for standard target */}
                {viewMode === 'standard' && currentKana.keyFeatures.map(f => (
                  <g key={f.id}>
                    <circle cx={f.coord.x} cy={f.coord.y} r={f.radius} fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 2" className="animate-pulse" />
                    <text x={f.coord.x} y={f.coord.y - 12} textAnchor="middle" className="text-[7px] font-black fill-red-500 uppercase tracking-tighter">{f.label}</text>
                  </g>
                ))}
              </svg>

              <div className="absolute top-6 left-8 bg-slate-900 text-white text-[9px] font-black px-3 py-1.5 rounded-xl uppercase shadow-lg">
                Type: {activeMaster.romaji}
              </div>
            </div>

            <div className="mt-10 p-8 bg-slate-900 rounded-[2.5rem] text-white w-full max-w-[400px] shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 text-4xl">📚</div>
               <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3">Pedagogical Insight</p>
               <p className="text-xs font-medium leading-relaxed opacity-90 italic">"{activeMaster.explanation}"</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-white border-t border-slate-100 flex items-center justify-center">
          <button 
            onClick={onClose}
            className="px-16 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-all hover:bg-indigo-600"
          >
            Acknowledge & Sync
          </button>
        </div>
      </div>
    </div>
  );
};

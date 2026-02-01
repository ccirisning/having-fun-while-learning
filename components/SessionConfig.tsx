
import React from 'react';

interface SessionConfigProps {
  onStart: (size: number) => void;
  availableCount: number;
}

export const SessionConfig: React.FC<SessionConfigProps> = ({ onStart, availableCount }) => {
  const [selectedSize, setSelectedSize] = React.useState(20);
  const maxPossible = Math.min(50, availableCount);

  return (
    <div className="w-full max-w-2xl bg-white rounded-[4rem] shadow-2xl p-12 border border-slate-100 animate-in zoom-in-95 duration-500">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4 italic uppercase">
          Daily <span className="text-indigo-600">Protocol</span>
        </h2>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">Configure Study Workload</p>
      </div>

      <div className="space-y-10">
        <div>
          <div className="flex justify-between items-end mb-8 px-2">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Batch Size</h3>
            <div className="flex items-center gap-3">
              <input 
                type="number" 
                value={selectedSize}
                onChange={(e) => setSelectedSize(Math.max(1, Math.min(maxPossible, parseInt(e.target.value) || 1)))}
                className="w-16 text-3xl font-black text-slate-900 leading-none bg-slate-50 rounded-xl p-2 text-center border-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-slate-300 font-bold">/ {maxPossible}</span>
            </div>
          </div>
          
          <div className="px-2">
            <input 
              type="range" 
              min="1" 
              max={maxPossible} 
              value={selectedSize}
              onChange={(e) => setSelectedSize(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
            />
            <div className="flex justify-between mt-4 text-[9px] font-black text-slate-300 uppercase tracking-widest">
              <span>Min: 1</span>
              <span>Max: {maxPossible}</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100">
          <div className="flex items-center gap-4 mb-4">
             <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">System Note</span>
          </div>
          <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
            Select any quantity between 1 and {maxPossible}. This drill session will utilize high-entropy randomization to maximize cognitive retention of the selected glyphs.
          </p>
        </div>

        <button 
          onClick={() => onStart(selectedSize)}
          className="w-full py-8 bg-slate-900 text-white rounded-[2.5rem] font-black text-sm uppercase tracking-[0.4em] shadow-2xl hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-4 group"
        >
          Initialize Drill
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <p className="mt-12 text-center text-[9px] font-black text-slate-300 uppercase tracking-widest">
        Registry Density: {availableCount} Characters Active
      </p>
    </div>
  );
};


import React from 'react';

interface SessionSummaryProps {
  totalItems: number;
  onReset: () => void;
}

export const SessionSummary: React.FC<SessionSummaryProps> = ({ totalItems, onReset }) => {
  return (
    <div className="w-full max-w-2xl bg-slate-900 rounded-[4rem] shadow-2xl p-16 text-white text-center animate-in slide-in-from-bottom-12 duration-700">
      <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="text-4xl font-black tracking-tighter mb-4 italic uppercase">Protocol <span className="text-indigo-400">Complete</span></h2>
      <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-12">Academic Batch Processed</p>

      <div className="grid grid-cols-2 gap-6 mb-12">
        <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Exposure</span>
          <span className="text-4xl font-black text-white">{totalItems}</span>
          <span className="text-[10px] font-bold text-slate-500 block uppercase mt-1">Glyphs</span>
        </div>
        <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Status</span>
          <span className="text-4xl font-black text-indigo-400 italic">Sync</span>
          <span className="text-[10px] font-bold text-slate-500 block uppercase mt-1">Completed</span>
        </div>
      </div>

      <button 
        onClick={onReset}
        className="w-full py-8 bg-white text-slate-900 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.4em] shadow-2xl hover:bg-slate-100 active:scale-95 transition-all"
      >
        Initialize Next Batch
      </button>
    </div>
  );
};

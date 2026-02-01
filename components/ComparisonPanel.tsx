
import React from 'react';
import { KanaData } from '../types';
import { KANA_REGISTRY } from '../data/kanaData';

interface ComparisonPanelProps {
  targetId: string;
  onClose: () => void;
}

export const ComparisonPanel: React.FC<ComparisonPanelProps> = ({ targetId, onClose }) => {
  const target = KANA_REGISTRY[targetId];
  if (!target) return null;

  const confusables = target.confusables
    .map(id => KANA_REGISTRY[id])
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      {/* Increased max-width to 1400px for full definition visibility */}
      <div className="bg-white w-full max-w-[1400px] rounded-[4rem] shadow-2xl overflow-hidden flex flex-col h-[90vh] border border-white/20">
        
        {/* Header - Academic Professional */}
        <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Linguistic Analysis View</h2>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">Topology & Grammar Protocol</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-5 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-full transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Structural Display - Adjusted flex ratio to 2:1 */}
          <div className="flex-[2] p-16 flex flex-col items-center border-r border-slate-50 bg-white overflow-y-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] block mb-4">Structural Target</span>
              <div 
                className="text-[280px] font-normal leading-none text-slate-900 select-none"
                style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                {target.char}
              </div>
              <div className="mt-4 inline-block px-4 py-1.5 bg-slate-900 text-white rounded-full text-[12px] font-black uppercase tracking-widest">
                {target.type}
              </div>
            </div>

            {/* Linguistic Meaning & Usage Card */}
            <div className="w-full max-w-[550px] space-y-6">
              <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10">
                <div className="mb-8">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Linguistic Meaning</h4>
                  <div className="space-y-3">
                    <p className="text-xl font-bold text-slate-900 leading-tight">
                      {target.linguistic_meaning.en}
                    </p>
                    <p className="text-lg text-slate-500 font-medium">
                      {target.linguistic_meaning.cn}
                    </p>
                  </div>
                </div>
                
                <div className="h-px w-full bg-slate-200 mb-8" />
                
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Structural Definition</h4>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                    "{target.structural_feature}"
                  </p>
                </div>
              </div>

              {/* Usage Example Box */}
              <div className="bg-slate-900 text-white rounded-[2rem] p-8 flex items-center justify-between">
                <div>
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Lexical Usage</h5>
                  <p className="text-2xl font-black">{target.usage_example.word}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase">{target.usage_example.reading}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium italic opacity-80">"{target.usage_example.meaning}"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contrast Sidebar - Widened for full text display */}
          <div className="flex-1 bg-slate-50/50 p-10 overflow-y-auto border-l border-slate-100">
            <div className="mb-10">
              <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Structural Comparison</h4>
              <p className="text-[10px] text-slate-400 font-bold italic">Comparative Morphological Analysis</p>
            </div>

            <div className="flex flex-col gap-6">
              {confusables.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 transition-all hover:border-slate-900 group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div 
                      className="text-6xl text-slate-900 leading-none"
                      style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                    >
                      {item.char}
                    </div>
                    <div className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black uppercase text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                      {item.type}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">{item.romaji}</h5>
                    {/* Removed line-clamp-2 to ensure text shows completely */}
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {item.linguistic_meaning.en}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold italic">
                      {item.linguistic_meaning.cn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Differentiation Logic</span>
              </div>
              <p className="text-xs font-medium leading-relaxed opacity-80 italic">
                Strict topological differentiation: The terminal <span className="text-indigo-400 font-black">loop (Musubi)</span> is the sole defining characteristic of ぬ in this confusion set.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-10 bg-white border-t border-slate-50 flex items-center justify-center">
          <button 
            onClick={onClose}
            className="px-20 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl hover:bg-slate-800 transition-all active:scale-95"
          >
            Synthesis Complete
          </button>
        </div>
      </div>
    </div>
  );
};

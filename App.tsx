
import React, { useState, useRef } from 'react';
import { KANA_REGISTRY } from './data/kanaData';
import { ComparisonPanel } from './components/ComparisonPanel';
import { AIDiagnosisFeedback } from './components/AIDiagnosisFeedback';
import { HandwritingCanvas, HandwritingCanvasHandle } from './components/HandwritingCanvas';
import { SessionConfig } from './components/SessionConfig';
import { SessionSummary } from './components/SessionSummary';
import { generateSession } from './services/sessionService';
import { analyzeSpeech } from './services/geminiService';
import { AIDiagnosis, AppView, SessionState } from './types';

const App: React.FC = () => {
  // Navigation State
  const [view, setView] = useState<AppView>('SETUP');
  
  // Drill State
  const [session, setSession] = useState<SessionState>({
    queue: [],
    currentIndex: 0,
    batchSize: 20,
    startTime: null
  });

  const [isCompOpen, setIsCompOpen] = useState(false);
  const [diagnosis, setDiagnosis] = useState<AIDiagnosis | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const canvasRef = useRef<HandwritingCanvasHandle>(null);

  // Drill Logic
  const activeId = session.queue[session.currentIndex] || 'nu';
  const currentKana = KANA_REGISTRY[activeId];

  const handleStartSession = (size: number) => {
    const queue = generateSession(size);
    setSession({
      queue,
      currentIndex: 0,
      batchSize: size,
      startTime: Date.now()
    });
    setView('DRILL');
  };

  const handleNextItem = () => {
    if (session.currentIndex < session.queue.length - 1) {
      setSession(prev => ({ ...prev, currentIndex: prev.currentIndex + 1 }));
      setDiagnosis(null);
      canvasRef.current?.clear();
      setIsCompOpen(false);
    } else {
      setView('SUMMARY');
    }
  };

  const simulateSpeechRecord = async () => {
    setIsProcessing(true);
    const dummyAudio = "UklGRu..."; 
    const result = await analyzeSpeech(dummyAudio, currentKana.exampleSentence.jp);
    if (result) setDiagnosis(result);
    setIsProcessing(false);
  };

  const resetToSetup = () => {
    setView('SETUP');
    setDiagnosis(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 md:p-8 overflow-x-hidden font-sans">
      
      {/* 1. SETUP VIEW */}
      {view === 'SETUP' && (
        <SessionConfig 
          onStart={handleStartSession} 
          availableCount={Object.keys(KANA_REGISTRY).length} 
        />
      )}

      {/* 2. SUMMARY VIEW */}
      {view === 'SUMMARY' && (
        <SessionSummary 
          totalItems={session.queue.length} 
          onReset={resetToSetup} 
        />
      )}

      {/* 3. DRILL VIEW */}
      {view === 'DRILL' && (
        <>
          {isCompOpen && (
            <ComparisonPanel 
              targetId={activeId}
              onClose={() => setIsCompOpen(false)}
            />
          )}

          <header className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between mb-8 gap-6 fixed top-8 z-40 bg-slate-50/80 backdrop-blur px-4 py-2 rounded-[2rem]">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-black text-slate-900 tracking-tighter italic">LEXICON<span className="text-indigo-600">JP</span></h1>
              <div className="h-6 w-px bg-slate-200 hidden md:block" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Drill Progress</span>
                <span className="text-xs font-black text-slate-900">{session.currentIndex + 1} / {session.queue.length}</span>
              </div>
            </div>

            <div className="w-full md:w-64 h-3 bg-white rounded-full overflow-hidden border border-slate-100 p-0.5">
              <div 
                className="h-full bg-slate-900 rounded-full transition-all duration-500" 
                style={{ width: `${((session.currentIndex + 1) / session.queue.length) * 100}%` }}
              />
            </div>

            <button onClick={resetToSetup} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors">
              Terminate Session
            </button>
          </header>

          <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 relative mt-32">
            {/* Structural Practice Section */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 flex flex-col items-center relative transition-all animate-in fade-in slide-in-from-left-8">
                <div className="absolute top-10 left-12 flex items-center gap-2">
                   <div className="w-2 h-2 bg-slate-900 rounded-full animate-pulse" />
                   <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Structural Pad</div>
                </div>

                {/* Romaji in Top Right of the Pad Area */}
                <div className="absolute top-10 right-12 text-right">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic block">Reading</span>
                  <span className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">{currentKana.romaji}</span>
                </div>
                
                <div className="relative w-full aspect-square max-w-[420px] bg-slate-50 rounded-[3rem] border border-slate-200/50 overflow-hidden shadow-inner mt-8">
                  {/* Background character removed for 'completely blank' writing area */}
                  <HandwritingCanvas ref={canvasRef} />
                </div>

                <div className="mt-12 w-full max-w-[420px] flex gap-4">
                  <button 
                    onClick={() => setIsCompOpen(true)}
                    className="flex-1 py-6 bg-white text-slate-900 border-2 border-slate-100 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:border-slate-900 transition-all active:scale-95"
                  >
                    Analysis
                  </button>
                  <button 
                    onClick={handleNextItem}
                    className="flex-[2] py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.25em] hover:bg-slate-800 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3"
                  >
                    Next Pattern
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </button>
                </div>
              </div>

              {/* Grammar & Definition Section */}
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col gap-8 transition-all animate-in fade-in slide-in-from-bottom-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Lexical Profile</h3>
                  <div className="px-4 py-1.5 bg-slate-100 text-slate-900 text-[10px] font-black rounded-full border border-slate-200 uppercase">
                    {currentKana.type}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grammar / Meaning</p>
                    <p className="text-sm font-bold text-slate-700 leading-relaxed">
                      {currentKana.linguistic_meaning.en}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed italic">
                      {currentKana.linguistic_meaning.cn}
                    </p>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Structure Key</p>
                    <p className="text-xs font-medium text-slate-600 leading-relaxed italic">"{currentKana.structural_feature}"</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interaction Panel */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-100 relative overflow-hidden transition-all animate-in fade-in slide-in-from-right-8">
                <div className="flex items-center justify-between mb-10 relative z-10">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Usage Context</span>
                  <span className="px-3 py-1 bg-slate-900 text-white text-[9px] font-black rounded-full uppercase">JLPT Reference</span>
                </div>
                
                <div className="mb-10 relative z-10">
                  <p className="text-5xl font-normal text-slate-900 tracking-tighter mb-4 leading-tight" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>{currentKana.exampleSentence.jp}</p>
                  <p className="text-base text-slate-400 font-bold italic mb-8">{currentKana.exampleSentence.reading}</p>
                  <div className="h-1 w-12 bg-slate-900 rounded-full mb-8" />
                  <p className="text-xl text-slate-600 font-medium leading-relaxed italic">"{currentKana.exampleSentence.en}"</p>
                </div>

                <button 
                  onClick={simulateSpeechRecord}
                  disabled={isProcessing}
                  className={`w-full py-7 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-5 shadow-2xl ${
                    isProcessing 
                    ? 'bg-slate-100 text-slate-400 cursor-wait' 
                    : 'bg-slate-900 text-white hover:bg-black active:translate-y-1'
                  }`}
                >
                  {isProcessing ? 'Analyzing Phonetics...' : 'Phonetic Diagnosis'}
                </button>
              </div>

              {diagnosis && <AIDiagnosisFeedback diagnosis={diagnosis} />}
            </div>
          </main>
        </>
      )}

      <footer className="w-full max-w-5xl mt-20 flex flex-col items-center gap-8">
         <div className="h-px w-32 bg-slate-200" />
         <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] opacity-50">Academic Integrity Framework v4.0</p>
      </footer>
    </div>
  );
};

export default App;

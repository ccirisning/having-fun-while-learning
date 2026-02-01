
import React from 'react';
import { AIDiagnosis } from '../types';

interface AIDiagnosisFeedbackProps {
  diagnosis: AIDiagnosis;
}

export const AIDiagnosisFeedback: React.FC<AIDiagnosisFeedbackProps> = ({ diagnosis }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-black text-slate-800">AI Diagnostic</h3>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`w-1.5 h-6 rounded-full ${i < (diagnosis.score / 20) ? 'bg-indigo-500' : 'bg-slate-100'}`} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-slate-50 rounded-2xl">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Accuracy</p>
          <div className="text-2xl font-black text-slate-800">{diagnosis.phoneticAccuracy}%</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Rhythm</p>
          <div className="text-2xl font-black text-slate-800">{diagnosis.rhythmScore}%</div>
        </div>
      </div>

      <div className="p-4 bg-green-50 rounded-2xl mb-4">
        <p className="text-xs text-green-700 font-medium leading-relaxed italic">"{diagnosis.feedback}"</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-black text-slate-400 uppercase">Analysis</p>
        <p className="text-[11px] text-slate-600 leading-relaxed">{diagnosis.comparisonWaveform}</p>
      </div>
    </div>
  );
};

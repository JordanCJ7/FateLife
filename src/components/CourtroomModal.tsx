import React, { useState } from 'react';
import { useGameStore } from '../gameStore';
import { formatCurrency } from '../utils';
import { Scale, ShieldAlert, Gavel, UserCheck, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function CourtroomModal() {
  const courtTrial = useGameStore((state) => state.courtTrial);
  const finances = useGameStore((state) => state.finances);
  const resolveTrial = useGameStore((state) => state.resolveTrial);

  const [trialResult, setTrialResult] = useState<{
    resolved: boolean;
    acquitted: boolean;
    payout: number;
    msg: string;
  } | null>(null);

  if (!courtTrial) return null;

  // Attorney rates defined dynamically based on charges
  let attorneyCost = 10000;
  if (courtTrial.crimeType === 'grand_theft_auto') attorneyCost = 25000;
  else if (courtTrial.crimeType === 'bank_robbery') attorneyCost = 50000;

  const canAffordAttorney = (finances?.cashBalance || 0) >= attorneyCost;

  const handleDefend = (type: 'public' | 'attorney') => {
    const result = resolveTrial(type);
    if (result) {
      setTrialResult({
        resolved: true,
        acquitted: result.acquitted,
        payout: attorneyCost,
        msg: result.msg,
      });
    }
  };

  const closeAndProceed = () => {
    setTrialResult(null);
    // State is updated automatically inside store, closing is handled by courtTrial hitting null
  };

  return (
    <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col justify-end z-50 animate-fade-in">
      <div 
        id="court_trial_panel" 
        className="w-full max-h-[75%] bg-[#121826] border-t border-slate-800 rounded-t-[32px] p-5 shadow-2xl flex flex-col gap-4 relative overflow-y-auto animate-slide-up"
        style={{ 
          boxShadow: '0 -10px 40px -10px rgba(0, 0, 0, 0.8)'
        }}
      >
        {/* Banner stripes */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 animate-pulse" />

        {/* Phase 1: Unresolved Trial Defense Selection */}
        {!trialResult?.resolved ? (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-amber-950/40 border border-amber-500/30 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold uppercase font-mono tracking-wider animate-pulse">
                <Gavel className="w-4 h-4" /> Criminal Court trial
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">State of Criminal Prosecution</h2>
              <p className="text-sm text-slate-400">
                You were caught red-handed and must now defend yourself in front of a jury of your peers.
              </p>
            </div>

            {/* Crime summary badge */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-10 h-10 text-rose-500 shrink-0" />
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">Formal Charges</p>
                  <strong className="text-sm sm:text-base text-rose-300 font-bold leading-tight block mt-0.5">{courtTrial.charges}</strong>
                </div>
              </div>
              <div className="sm:text-right bg-slate-900/80 px-3.5 py-2 border border-slate-800 rounded-xl">
                <p className="text-[9px] font-mono uppercase text-slate-500 leading-none">Potential Penalty</p>
                <div className="font-semibold text-rose-400 text-sm mt-1">
                  {courtTrial.sentenceOffer} Years Prison sentence
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest font-mono text-slate-400 font-bold mb-3">Choose Your Legal Representation</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Public Defender Path */}
                <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between gap-5 transition hover:border-slate-700">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-extrabold text-amber-400 uppercase font-mono">Public Defender</span>
                      <span className="text-[10px] bg-slate-850 text-slate-400 px-2.5 py-0.5 rounded-full font-bold">Free</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Assigned by the court treasury. Very high caseload, minimal preparation for courtroom pleading.
                    </p>
                    <div className="text-[10px] bg-slate-900/80 p-2 border border-slate-800 rounded-lg text-slate-400 font-mono">
                      🔑 Acquittal Rate: <strong className="text-amber-500 font-bold">20%</strong>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDefend('public')}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition duration-150 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Hire Public Defender ($0)
                  </button>
                </div>

                {/* 2. Retainer Lawyer Path */}
                <div className={`p-4 rounded-2xl border flex flex-col justify-between gap-5 transition ${
                  canAffordAttorney 
                    ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700' 
                    : 'bg-slate-950/30 border-slate-900 opacity-60'
                }`}>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-extrabold text-emerald-400 uppercase font-mono">Private Retainer</span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 font-mono px-2.5 py-0.5 rounded-full font-bold">
                        {formatCurrency(attorneyCost)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Specialized white-shoe attorney retainer. Thorough investigation, expert witness curation, high success.
                    </p>
                    <div className="text-[10px] bg-slate-900/80 p-2 border border-slate-800 rounded-lg text-slate-400 font-mono">
                      ✨ Acquittal Rate: <strong className="text-emerald-400 font-bold">75%</strong>
                    </div>
                  </div>

                  <div>
                    {canAffordAttorney ? (
                      <button
                        onClick={() => handleDefend('attorney')}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition duration-150 flex items-center justify-center gap-1 cursor-pointer"
                      >
                        Retain Specialized Attorney
                      </button>
                    ) : (
                      <div className="text-center text-[10px] bg-rose-950/20 border border-rose-900/30 text-rose-400 rounded-xl p-2 font-mono">
                        ⚠️ Cannot Afford Retainer (Lacks {formatCurrency(attorneyCost - (finances?.cashBalance || 0))})
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
            
            <p className="text-[10px] text-slate-500 text-center font-mono leading-relaxed">
              *If found guilty, convicts are immediate targets for cellblock routing. Assets are maintained but career contracts are immediately nullified.
            </p>
          </div>
        ) : (
          /* Phase 2: Defense Outcome Resolution Screen */
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center">
              {trialResult.acquitted ? (
                <div className="w-16 h-16 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-rose-950/40 border border-rose-500/40 text-rose-400 rounded-full flex items-center justify-center animate-shake">
                  <XCircle className="w-10 h-10 text-rose-400" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <span className={`text-xs font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-full border ${
                trialResult.acquitted 
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-900/50' 
                  : 'bg-rose-950 text-rose-300 border-rose-900/50'
              }`}>
                {trialResult.acquitted ? 'Case Dismissed • Aquitted' : 'Convicted • Guilty Verdict'}
              </span>
              <h2 className="text-2xl font-black text-white sm:text-3xl mt-1">
                {trialResult.acquitted ? 'You Walk Free!' : 'The Jury Has Decided'}
              </h2>
              <p className="text-sm text-slate-350 max-w-md mx-auto leading-relaxed">
                {trialResult.msg}
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl max-w-sm mx-auto text-left space-y-2 font-mono text-[11px] text-slate-400">
              <div className="flex justify-between">
                <span>Charge Trial:</span>
                <span className="text-white font-bold">{courtTrial.charges}</span>
              </div>
              <div className="flex justify-between">
                <span>Attorneys Hired:</span>
                <span className="text-white">
                  {trialResult.payout > 0 ? 'Private Retainer' : 'State Public Defender'}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-850/60 pt-2">
                <span>Outcome Verdict:</span>
                <strong className={trialResult.acquitted ? 'text-emerald-400' : 'text-rose-400'}>
                  {trialResult.acquitted ? 'NOT GUILTY' : 'SOCIETALLY GUILTY'}
                </strong>
              </div>
            </div>

            <button
              onClick={closeAndProceed}
              className={`py-3 px-6 sm:px-10 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition active:scale-95 shadow-md flex items-center justify-center gap-1.5 mx-auto ${
                trialResult.acquitted 
                  ? 'bg-teal-600 hover:bg-teal-500 text-white' 
                  : 'bg-rose-600 hover:bg-rose-500 text-white'
              }`}
            >
              {trialResult.acquitted ? (
                <>Return to Freedom <CheckCircle className="w-4 h-4" /></>
              ) : (
                <>Report to cellblock <Gavel className="w-4 h-4" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

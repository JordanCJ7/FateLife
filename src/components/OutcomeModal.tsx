/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useGameStore } from '../gameStore';
import { Sparkles, MessageCircleCode } from 'lucide-react';

export default function OutcomeModal() {
  const lastChoiceOutcome = useGameStore((state) => state.lastChoiceOutcome);
  const clearLastChoiceOutcome = useGameStore((state) => state.clearLastChoiceOutcome);

  if (!lastChoiceOutcome) return null;

  return (
    <div 
      id="outcome_modal_overlay" 
      className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col justify-end z-50 animate-fade-in"
    >
      <div 
        className="w-full max-h-[65%] bg-[#121826] border-t border-slate-800/80 rounded-t-[32px] p-5 shadow-2xl flex flex-col gap-4 relative overflow-y-auto animate-slide-up"
        style={{ 
          boxShadow: '0 -10px 40px -10px rgba(0, 0, 0, 0.8)'
        }}
      >
        {/* Glow decoration */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* title */}
        <p className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" /> Choice Consequence
        </p>

        <div className="flex flex-col gap-1">
          <h2 className="text-sm sm:text-base font-extrabold text-white leading-tight">
            Regarding: {lastChoiceOutcome.eventTitle}
          </h2>
          <p className="text-[11px] text-slate-400 italic">
            You chose: "{lastChoiceOutcome.choiceText}"
          </p>
        </div>

        {/* core outcome log info */}
        <div className="bg-[#090D16] p-4 border border-slate-800/80 rounded-2xl text-slate-200 text-xs sm:text-sm leading-relaxed font-sans shadow-inner">
          {lastChoiceOutcome.outcomeText}
        </div>

        {/* Stat impact badges and progress bars */}
        {lastChoiceOutcome.statDeltas && Object.values(lastChoiceOutcome.statDeltas).some((val) => val !== 0) && (
          <div className="space-y-2">
            <p className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-500">
              Personal Stat Impacts
            </p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(lastChoiceOutcome.statDeltas).map(([statName, value]) => {
                if (value === 0) return null;

                const isPositive = value > 0;
                // Stress is negative if it goes up, and positive if it goes down
                const isBeneficial = statName === 'stress' ? !isPositive : isPositive;

                const label = statName.charAt(0).toUpperCase() + statName.slice(1);
                
                let roundedStr = '';
                if (value > 0 && value < 1) {
                  roundedStr = '+1%';
                } else if (value < 0 && value > -1) {
                  roundedStr = '-1%';
                } else {
                  const roundedNum = Math.round(value);
                  const plusSign = roundedNum > 0 ? '+' : '';
                  roundedStr = `${plusSign}${roundedNum}%`;
                }
                
                let icon = '📊';
                let accentColor = 'from-teal-500 to-emerald-600';
                let textColor = 'text-emerald-400';
                let bgColor = 'bg-emerald-500/10 border-emerald-500/20';

                if (statName === 'happiness') {
                  icon = '😊';
                  accentColor = isBeneficial ? 'from-amber-400 to-amber-500' : 'from-rose-500 to-red-600';
                  textColor = isBeneficial ? 'text-amber-400' : 'text-rose-500';
                  bgColor = isBeneficial ? 'bg-[#090D16] border-amber-500/10' : 'bg-[#090D16] border-rose-500/10';
                } else if (statName === 'health') {
                  icon = '❤️';
                  accentColor = isBeneficial ? 'from-emerald-500 to-teal-600' : 'from-rose-500 to-red-600';
                  textColor = isBeneficial ? 'text-emerald-400' : 'text-rose-500';
                  bgColor = isBeneficial ? 'bg-[#090D16] border-emerald-500/10' : 'bg-[#090D16] border-rose-500/10';
                } else if (statName === 'smarts') {
                  icon = '🧠';
                  accentColor = isBeneficial ? 'from-sky-400 to-indigo-500' : 'from-rose-500 to-red-600';
                  textColor = isBeneficial ? 'text-sky-400' : 'text-rose-500';
                  bgColor = isBeneficial ? 'bg-[#090D16] border-sky-500/10' : 'bg-[#090D16] border-rose-500/10';
                } else if (statName === 'looks') {
                  icon = '✨';
                  accentColor = isBeneficial ? 'from-purple-500 to-pink-500' : 'from-rose-500 to-red-600';
                  textColor = isBeneficial ? 'text-purple-400' : 'text-rose-500';
                  bgColor = isBeneficial ? 'bg-[#090D16] border-purple-500/10' : 'bg-[#090D16] border-rose-500/10';
                } else if (statName === 'karma') {
                  icon = '🔮';
                  accentColor = isBeneficial ? 'from-violet-500 to-indigo-600' : 'from-amber-600 to-amber-700';
                  textColor = isBeneficial ? 'text-violet-400' : 'text-amber-500';
                  bgColor = isBeneficial ? 'bg-[#090D16] border-amber-500/10' : 'bg-[#090D16] border-amber-500/10';
                } else if (statName === 'stress') {
                  icon = '⚡';
                  accentColor = isBeneficial ? 'from-green-500 to-emerald-600' : 'from-orange-500 to-red-600';
                  textColor = isBeneficial ? 'text-red-400' : 'text-emerald-400';
                  bgColor = isBeneficial ? 'bg-[#090D16] border-orange-500/10' : 'bg-[#090D16] border-emerald-500/10';
                }

                return (
                  <div key={statName} className={`p-2 rounded-xl border flex flex-col gap-1 ${bgColor}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-white flex items-center gap-1">
                        <span>{icon}</span> {label}
                      </span>
                      <span className={`text-[10px] font-mono font-black ${textColor}`}>
                        {roundedStr}
                      </span>
                    </div>
                    {/* Tiny Progress bar */}
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${accentColor} transition-all duration-500`}
                        style={{ width: `${Math.min(Math.abs(value), 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* dismiss action */}
        <button
          onClick={clearLastChoiceOutcome}
          className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm tracking-wide shadow-lg active:scale-95 transition-all duration-200 cursor-pointer outline-none focus:ring-2 focus:ring-teal-500"
        >
          Acknowledge & Continue Life
        </button>
      </div>
    </div>
  );
}

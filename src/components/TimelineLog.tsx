/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { useGameStore } from '../gameStore';
import { 
  BookOpen, 
  CalendarRange, 
  Baby, 
  Skull, 
  ShieldAlert, 
  Heart, 
  Briefcase, 
  Coins, 
  GraduationCap, 
  Car, 
  Home, 
  Activity, 
  Smile 
} from 'lucide-react';

export default function TimelineLog() {
  const log = useGameStore((state) => state.log) || [];
  const logEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the bottom of the log to focus on recent actions
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  const getLogMarker = (entry: string) => {
    const norm = entry.toLowerCase();
    if (norm.includes('born a baby') || norm.includes('conceived') || norm.includes('baby') || norm.includes('infant')) {
      return {
        emoji: '👶',
        bgColor: 'bg-emerald-950/40 border-emerald-500/20',
        cardBg: 'bg-[#121826] border-slate-800/80 text-slate-100'
      };
    }
    if (norm.includes('passed away') || norm.includes('died') || norm.includes('epitaph') || norm.includes('cemetery') || norm.includes('graveyard')) {
      return {
        emoji: '🪦',
        bgColor: 'bg-rose-950/40 border-rose-500/20',
        cardBg: 'bg-[#121826] border-rose-950/30 text-rose-100'
      };
    }
    if (norm.includes('arrested') || norm.includes('prison') || norm.includes('felony') || norm.includes('misdemeanor') || norm.includes('busted') || norm.includes('criminal') || norm.includes('court') || norm.includes('judge') || norm.includes('sentenced') || norm.includes('smuggled') || norm.includes('handcuffs')) {
      return {
        emoji: '🚨',
        bgColor: 'bg-rose-950/40 border-rose-500/20',
        cardBg: 'bg-[#121826] border-red-950/20 text-rose-100'
      };
    }
    if (norm.includes('married') || norm.includes('vow') || norm.includes('proposal') || norm.includes('propose') || norm.includes('engaged') || norm.includes('crush') || norm.includes('romance') || norm.includes('date') || norm.includes('break up') || norm.includes('split') || norm.includes('divorce') || norm.includes('wedding') || norm.includes('spouse') || norm.includes('dating')) {
      return {
        emoji: '💖',
        bgColor: 'bg-pink-950/40 border-pink-500/20',
        cardBg: 'bg-[#121826] border-pink-950/20 text-pink-100'
      };
    }
    if (norm.includes('job') || norm.includes('work') || norm.includes('career') || norm.includes('promotion') || norm.includes('fired') || norm.includes('hustle') || norm.includes('dropshipping') || norm.includes('cashier') || norm.includes('mcdonuts') || norm.includes('unemployed') || norm.includes('salary') || norm.includes('co-worker') || norm.includes('office') || norm.includes('boss') || norm.includes('hired')) {
      return {
        emoji: '💼',
        bgColor: 'bg-green-950/40 border-green-500/20',
        cardBg: 'bg-[#121826] border-green-950/25 text-green-100'
      };
    }
    if (norm.includes('inherit') || norm.includes('will & testament') || norm.includes('bequeath') || norm.includes('money') || norm.includes('lotto') || norm.includes('lottery') || norm.includes('blackjack') || norm.includes('casino') || norm.includes('winning') || norm.includes('bribe') || norm.includes('wage') || norm.includes('financed') || norm.includes('mortgage') || norm.includes('loan') || norm.includes('tax') || norm.includes('interest')) {
      return {
        emoji: '💵',
        bgColor: 'bg-amber-950/40 border-amber-500/20',
        cardBg: 'bg-[#121826] border-amber-950/25 text-amber-100'
      };
    }
    if (norm.includes('university') || norm.includes('college') || norm.includes('school') || norm.includes('grades') || norm.includes('midterm') || norm.includes('cheat') || norm.includes('exam') || norm.includes('study') || norm.includes('textbook') || norm.includes('scholarship') || norm.includes('graduated')) {
      return {
        emoji: '🎓',
        bgColor: 'bg-indigo-950/40 border-indigo-500/20',
        cardBg: 'bg-[#121826] border-indigo-950/20 text-indigo-100'
      };
    }
    if (norm.includes('car') || norm.includes('vehicle') || norm.includes('roadster') || norm.includes('license') || norm.includes('driving')) {
      return {
        emoji: '🚗',
        bgColor: 'bg-cyan-950/40 border-cyan-500/20',
        cardBg: 'bg-[#121826] border-cyan-950/20 text-cyan-100'
      };
    }
    if (norm.includes('condo') || norm.includes('highrise') || norm.includes('apartment') || norm.includes('real estate') || norm.includes('asset') || norm.includes('house') || norm.includes('property') || norm.includes('estate')) {
      return {
        emoji: '🏠',
        bgColor: 'bg-emerald-950/40 border-emerald-500/20',
        cardBg: 'bg-[#121826] border-teal-950/20 text-slate-100'
      };
    }
    if (norm.includes('disease') || norm.includes('illness') || norm.includes('addiction') || norm.includes('fever') || norm.includes('cough') || norm.includes('diagnos') || norm.includes('tetanus') || norm.includes('chest') || norm.includes('health') || norm.includes('sick') || norm.includes('bronchitis') || norm.includes('pain') || norm.includes('aches') || norm.includes('clinic') || norm.includes('medical') || norm.includes('rehab')) {
      return {
        emoji: '🤒',
        bgColor: 'bg-rose-950/40 border-rose-500/20',
        cardBg: 'bg-[#121826] border-rose-950/20 text-slate-100'
      };
    }

    return {
      emoji: '✨',
      bgColor: 'bg-slate-850 border-slate-700/50',
      cardBg: 'bg-[#121826] border-slate-800/80 text-slate-200'
    };
  };

  return (
    <div id="timeline_log_container" className="flex flex-col h-full">
      <div className="flex justify-between items-center pb-3 mb-3 border-b border-slate-800/60">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
          📜 Life Journal Timeline
        </h2>
        <span className="text-[9px] font-mono bg-[#121826] border border-slate-850 text-teal-400 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
          {log.length} Chapters
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 space-y-4 scrollbar-none">
        {log.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500 text-xs gap-2">
            <CalendarRange className="w-8 h-8 text-slate-700 animate-pulse" />
            <p>Your life story has not started yet.</p>
          </div>
        ) : (
          <div className="relative pl-7 border-l border-slate-800/50 space-y-4 ml-3.5 pt-1">
            {log.map((entry, index) => {
              const marker = getLogMarker(entry);

              return (
                <div key={index} className="relative group transition-all duration-300 animate-slide-up">
                  {/* Circular Emoji Indicator Marker */}
                  <span className={`absolute -left-[41px] top-1 w-7.5 h-7.5 rounded-full border border-slate-800 flex items-center justify-center text-base shadow-sm 
                    ${marker.bgColor} transition-all duration-300 z-10`}>
                    {marker.emoji}
                  </span>

                  {/* Log Content Card */}
                  <div className={`p-3 rounded-2xl transition-all duration-300 border ${marker.cardBg}`}>
                    <p className="text-xs sm:text-[13px] leading-relaxed font-sans font-semibold">{entry}</p>
                  </div>
                </div>
              );
            })}
            <div ref={logEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}

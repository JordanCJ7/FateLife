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
        icon: <Baby className="w-4 h-4 text-emerald-400" />,
        bg: 'bg-emerald-950 border-emerald-500/40',
        glow: 'shadow-[0_0_10px_rgba(52,211,153,0.15)]',
        accentClass: 'border-emerald-500/20 text-emerald-100 bg-emerald-950/20'
      };
    }
    if (norm.includes('passed away') || norm.includes('died') || norm.includes('epitaph') || norm.includes('cemetery') || norm.includes('graveyard')) {
      return {
        icon: <Skull className="w-4 h-4 text-rose-500 animate-pulse" />,
        bg: 'bg-rose-950 border-rose-500/40',
        glow: 'shadow-[0_0_12px_rgba(244,63,94,0.25)]',
        accentClass: 'border-rose-500/30 text-rose-100 bg-rose-950/25'
      };
    }
    if (norm.includes('arrested') || norm.includes('prison') || norm.includes('felony') || norm.includes('misdemeanor') || norm.includes('busted') || norm.includes('criminal') || norm.includes('court') || norm.includes('judge') || norm.includes('sentenced')) {
      return {
        icon: <ShieldAlert className="w-4 h-4 text-red-500" />,
        bg: 'bg-red-950 border-red-500/30',
        glow: 'shadow-[0_0_10px_rgba(239,68,68,0.15)]',
        accentClass: 'border-red-500/20 text-red-100 bg-red-950/15'
      };
    }
    if (norm.includes('married') || norm.includes('vow') || norm.includes('proposal') || norm.includes('propose') || norm.includes('engaged') || norm.includes('crush') || norm.includes('romance') || norm.includes('date') || norm.includes('break up') || norm.includes('split') || norm.includes('divorce') || norm.includes('wedding')) {
      return {
        icon: <Heart className="w-4 h-4 text-fuchsia-400" />,
        bg: 'bg-fuchsia-950 border-fuchsia-500/30',
        glow: 'shadow-[0_0_10px_rgba(232,121,249,0.15)]',
        accentClass: 'border-fuchsia-500/20 text-fuchsia-100 bg-fuchsia-950/15'
      };
    }
    if (norm.includes('job') || norm.includes('work') || norm.includes('career') || norm.includes('promotion') || norm.includes('fired') || norm.includes('hustle') || norm.includes('dropshipping') || norm.includes('cashier') || norm.includes('mcdonuts') || norm.includes('unemployed') || norm.includes('salary') || norm.includes('co-worker') || norm.includes('office') || norm.includes('boss')) {
      return {
        icon: <Briefcase className="w-4 h-4 text-green-400" />,
        bg: 'bg-green-950 border-green-500/30',
        glow: 'shadow-[0_0_10px_rgba(74,222,128,0.15)]',
        accentClass: 'border-green-500/20 text-green-100 bg-green-950/15'
      };
    }
    if (norm.includes('inherit') || norm.includes('will & testament') || norm.includes('bequeath') || norm.includes('money') || norm.includes('lotto') || norm.includes('lottery') || norm.includes('blackjack') || norm.includes('casino') || norm.includes('winning') || norm.includes('bribe') || norm.includes('wage') || norm.includes('financed') || norm.includes('mortgage') || norm.includes('loan')) {
      return {
        icon: <Coins className="w-4 h-4 text-amber-400" />,
        bg: 'bg-amber-950 border-amber-500/35',
        glow: 'shadow-[0_0_10px_rgba(251,191,36,0.15)]',
        accentClass: 'border-amber-500/20 text-amber-100 bg-amber-950/15'
      };
    }
    if (norm.includes('university') || norm.includes('college') || norm.includes('school') || norm.includes('grades') || norm.includes('midterm') || norm.includes('cheat') || norm.includes('exam') || norm.includes('study') || norm.includes('textbook') || norm.includes('scholarship')) {
      return {
        icon: <GraduationCap className="w-4 h-4 text-indigo-400" />,
        bg: 'bg-indigo-950 border-indigo-500/30',
        glow: 'shadow-[0_0_10px_rgba(129,140,248,0.15)]',
        accentClass: 'border-indigo-500/20 text-indigo-100 bg-indigo-950/15'
      };
    }
    if (norm.includes('car') || norm.includes('vehicle') || norm.includes('roadster') || norm.includes('license') || norm.includes('driving')) {
      return {
        icon: <Car className="w-4 h-4 text-cyan-400" />,
        bg: 'bg-cyan-950 border-cyan-500/30',
        glow: 'shadow-[0_0_10px_rgba(34,211,238,0.15)]',
        accentClass: 'border-cyan-500/20 text-cyan-100 bg-cyan-950/15'
      };
    }
    if (norm.includes('condo') || norm.includes('highrise') || norm.includes('apartment') || norm.includes('real estate') || norm.includes('asset') || norm.includes('house') || norm.includes('property')) {
      return {
        icon: <Home className="w-4 h-4 text-emerald-400" />,
        bg: 'bg-teal-950 border-teal-500/30',
        glow: 'shadow-[0_0_10px_rgba(45,212,191,0.15)]',
        accentClass: 'border-teal-500/20 text-teal-100 bg-teal-950/15'
      };
    }
    if (norm.includes('disease') || norm.includes('illness') || norm.includes('addiction') || norm.includes('fever') || norm.includes('cough') || norm.includes('diagnos') || norm.includes('tetanus') || norm.includes('chest') || norm.includes('health') || norm.includes('sick') || norm.includes('tetanus') || norm.includes('bronchitis') || norm.includes('pain') || norm.includes('aches')) {
      return {
        icon: <Activity className="w-4 h-4 text-rose-400" />,
        bg: 'bg-rose-950 border-rose-500/30',
        glow: 'shadow-[0_0_10px_rgba(251,113,133,0.15)]',
        accentClass: 'border-rose-500/20 text-rose-100 bg-rose-950/15'
      };
    }

    return {
      icon: <Smile className="w-4 h-4 text-slate-400" />,
      bg: 'bg-slate-900 border-slate-700/60',
      glow: '',
      accentClass: 'bg-slate-950/45 border-slate-800/40 hover:border-slate-800 text-slate-300'
    };
  };

  return (
    <div id="timeline_log_container" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col h-[520px]">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
        <h2 className="text-md font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-teal-400 animate-pulse" /> Life Journal Timeline
        </h2>
        <span className="text-[10px] font-mono bg-slate-800 text-teal-300 px-3 py-1 rounded-full uppercase tracking-widest font-bold">
          {log.length} Life Chapters
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950">
        {log.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 text-sm gap-2">
            <CalendarRange className="w-8 h-8 text-slate-600 animate-pulse" />
            <p>Your life story has not started yet.</p>
          </div>
        ) : (
          <div className="relative pl-8 border-l-2 border-slate-800/60 space-y-5 ml-4">
            {log.map((entry, index) => {
              const marker = getLogMarker(entry);

              return (
                <div key={index} className="relative group transition-all duration-300">
                  {/* Circular Icon Marker */}
                  <span className={`absolute -left-[49px] top-0.5 w-8 h-8 rounded-full border-2 border-slate-950 flex items-center justify-center 
                    ${marker.bg} ${marker.glow} transition-all duration-300 group-hover:scale-110 z-10`}>
                    {marker.icon}
                  </span>

                  {/* Log Content Card */}
                  <div className={`p-3.5 rounded-xl transition-all duration-300 border ${marker.accentClass} hover:shadow-lg`}>
                    <p className="text-xs sm:text-sm leading-relaxed font-sans font-medium">{entry}</p>
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

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useGameStore } from '../gameStore';
import { Calendar, HelpCircle, ArrowRightCircle } from 'lucide-react';

export default function EventModal() {
  const currentEvent = useGameStore((state) => state.currentEvent);
  const executeChoice = useGameStore((state) => state.executeChoice);
  const characterInfo = useGameStore((state) => state.characterInfo);
  const activeEventQueue = useGameStore((state) => state.activeEventQueue || []);

  if (!currentEvent || !characterInfo) return null;

  return (
    <div id="event_modal_overlay" className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-6 relative overflow-hidden animate-scale-up">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Category badge */}
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono uppercase bg-slate-800 text-teal-400 border border-slate-700/40 px-3 py-1 rounded-full tracking-widest font-semibold flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {currentEvent.category} Stage Event
          </span>
          <span className="text-xs text-slate-500 font-mono flex items-center gap-2">
            <span>Age: <span className="font-bold text-slate-300">{characterInfo.age}</span></span>
            {activeEventQueue.length > 0 && (
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/40 px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wide uppercase">+{activeEventQueue.length} Queued</span>
            )}
          </span>
        </div>

        {/* content */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-extrabold text-white tracking-wide flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-teal-400" /> {currentEvent.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed font-sans bg-slate-950 border border-slate-850 p-4 rounded-2xl">
            {currentEvent.description}
          </p>
        </div>

        {/* Choices buttons */}
        <div className="flex flex-col gap-3.5">
          <p className="text-[11px] uppercase tracking-widest font-mono text-slate-400 font-bold">What will you do?</p>
          {currentEvent.choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => executeChoice(currentEvent.id, idx)}
              className="group w-full text-left bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 p-4 rounded-2xl transition duration-200 flex justify-between items-center gap-4 cursor-pointer outline-none focus:ring-2 focus:ring-teal-500"
            >
              <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition">
                {choice.choiceText}
              </span>
              <ArrowRightCircle className="w-5 h-5 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-1.5 transition-all duration-300 flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

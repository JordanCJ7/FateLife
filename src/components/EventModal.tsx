/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useGameStore } from '../gameStore';
import { Calendar, HelpCircle, ArrowRightCircle } from 'lucide-react';
import { formatCurrency } from '../utils';

export default function EventModal() {
  const currentEvent = useGameStore((state) => state.currentEvent);
  const executeChoice = useGameStore((state) => state.executeChoice);
  const characterInfo = useGameStore((state) => state.characterInfo);
  const activeEventQueue = useGameStore((state) => state.activeEventQueue || []);
  const finances = useGameStore((state) => state.finances);
  const isLightMode = useGameStore((state) => state.isLightMode);

  if (!currentEvent || !characterInfo) return null;

  const cleanChoiceText = (text: string): string => {
    if (text.includes(':')) {
      // Split at the first colon, grab everything after it, and trim spaces
      const rawAction = text.split(':').slice(1).join(':').trim();
      // Capitalize the first letter of the actual action string
      return rawAction.charAt(0).toUpperCase() + rawAction.slice(1);
    }
    return text;
  };

  return (
    <div 
      id="event_modal_overlay" 
      className={`absolute inset-0 ${isLightMode ? 'bg-slate-900/40' : 'bg-slate-950/85'} backdrop-blur-xs flex flex-col justify-end z-50 animate-fade-in`}
    >
      <div 
        className={`w-full max-h-[65%] ${isLightMode ? 'bg-white border-t border-slate-200 text-slate-800' : 'bg-[#111827] border-t border-slate-800/80 text-white'} rounded-t-[32px] p-5 shadow-2xl flex flex-col gap-4 relative overflow-y-auto animate-slide-up`}
        style={{ 
          boxShadow: isLightMode ? '0 -8px 30px rgba(0, 0, 0, 0.08)' : '0 -10px 40px -10px rgba(0, 0, 0, 0.8)'
        }}
      >
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Category badge */}
        <div className="flex flex-wrap justify-between items-center gap-2">
          <span 
            className={`text-[10px] uppercase border px-3 py-1 rounded-full tracking-widest font-black flex items-center gap-1.5 font-mono ${isLightMode ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-[#090D16] border-[#1E293B] text-[#2DD4BF]'}`}
          >
            <Calendar className="w-3.5 h-3.5" />
            {currentEvent.category} Stage Event
          </span>
          <div 
            className={`text-xs flex items-center gap-2 font-mono ${isLightMode ? 'text-slate-500' : 'text-[#94A3B8]'}`}
          >
            <span>Age: <span className={`font-bold ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>{characterInfo.age}</span></span>
            {finances && (
              <span 
                className={`font-bold border px-2 py-0.5 rounded ${isLightMode ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-[#090D16] border-emerald-600 text-[#10B981]'}`}
              >
                {formatCurrency(finances.cashBalance)}
              </span>
            )}
            {activeEventQueue.length > 0 && (
              <span 
                className="border px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wide uppercase bg-emerald-600/10 border-emerald-500 text-emerald-600"
              >
                +{activeEventQueue.length} Queued
              </span>
            )}
          </div>
        </div>

        {/* content */}
        <div className="flex flex-col gap-2">
          <h2 
            className={`text-sm sm:text-base font-extrabold tracking-wide flex items-center gap-2 font-sans ${isLightMode ? 'text-slate-950' : 'text-slate-100'}`}
          >
            <HelpCircle className={`w-4.5 h-4.5 ${isLightMode ? 'text-green-600' : 'text-teal-400'}`} /> {currentEvent.title}
          </h2>
          <p 
            className={`text-xs sm:text-sm leading-relaxed p-4 rounded-2xl border font-medium ${isLightMode ? 'bg-slate-50 border-slate-150 text-slate-700' : 'bg-[#090D16] border-slate-850 text-slate-300'}`}
          >
            {currentEvent.description}
          </p>
        </div>

        {/* Choices buttons */}
        <div className="flex flex-col gap-2.5">
          <p 
            className={`text-[10px] uppercase tracking-widest font-bold ${isLightMode ? 'text-slate-400' : 'text-[#64748B]'}`}
            style={{ 
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace"
            }}
          >
            What will you do?
          </p>
          {currentEvent.choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => executeChoice(currentEvent.id, idx)}
              className={`group w-full text-left py-4 px-5 rounded-2xl border transition duration-200 flex justify-between items-center gap-4 cursor-pointer outline-none focus:ring-2 focus:ring-green-500 ${isLightMode ? 'bg-slate-50 border-slate-200 hover:bg-slate-150/50 text-slate-800' : 'bg-[#090D16] border-slate-850 hover:border-slate-750 text-slate-100'}`}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif"
              }}
            >
              <span 
                className={`text-xs sm:text-sm font-black transition ${isLightMode ? 'text-slate-800 group-hover:text-slate-950' : 'text-slate-200 group-hover:text-white'}`}
              >
                {cleanChoiceText(choice.choiceText)}
              </span>
              <ArrowRightCircle className={`w-5 h-5 ${isLightMode ? 'text-green-600' : 'text-teal-500'} group-hover:translate-x-1.5 transition-all duration-300 flex-shrink-0`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

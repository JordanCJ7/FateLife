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
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      style={{ backgroundColor: 'rgba(10, 15, 30, 0.85)' }}
    >
      <div 
        className="rounded-3xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-6 relative overflow-hidden animate-scale-up"
        style={{ 
          backgroundColor: '#0B0F19', 
          border: '1px solid #1E293B',
          boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(30, 41, 59, 0.3)'
        }}
      >
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Category badge */}
        <div className="flex flex-wrap justify-between items-center gap-2">
          <span 
            className="text-[10px] uppercase border px-3 py-1 rounded-full tracking-widest font-semibold flex items-center gap-1.5"
            style={{ 
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              backgroundColor: '#0F172A',
              borderColor: '#1E293B',
              color: '#2DD4BF'
            }}
          >
            <Calendar className="w-3.5 h-3.5" />
            {currentEvent.category} Stage Event
          </span>
          <div 
            className="text-xs flex items-center gap-2 font-mono"
            style={{ 
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              color: '#94A3B8'
            }}
          >
            <span>Age: <span className="font-bold text-slate-200">{characterInfo.age}</span></span>
            {finances && (
              <span 
                className="font-bold border px-2 py-0.5 rounded"
                style={{ 
                  backgroundColor: '#020617',
                  borderColor: '#059669',
                  color: '#10B981'
                }}
              >
                {formatCurrency(finances.cashBalance)}
              </span>
            )}
            {activeEventQueue.length > 0 && (
              <span 
                className="border px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wide uppercase"
                style={{ 
                  backgroundColor: '#064E3B',
                  borderColor: '#065F46',
                  color: '#34D399'
                }}
              >
                +{activeEventQueue.length} Queued
              </span>
            )}
          </div>
        </div>

        {/* content */}
        <div className="flex flex-col gap-3">
          <h2 
            className="text-xl font-extrabold tracking-wide flex items-center gap-2"
            style={{ 
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              color: '#F8FAFC'
            }}
          >
            <HelpCircle className="w-5 h-5 text-teal-400" /> {currentEvent.title}
          </h2>
          <p 
            className="text-sm leading-relaxed p-4 rounded-2xl border"
            style={{ 
              fontFamily: "'Inter', system-ui, sans-serif",
              color: '#F8FAFC',
              backgroundColor: '#020617',
              borderColor: '#1E293B'
            }}
          >
            {currentEvent.description}
          </p>
        </div>

        {/* Choices buttons */}
        <div className="flex flex-col gap-3.5">
          <p 
            className="text-[11px] uppercase tracking-widest font-bold"
            style={{ 
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              color: '#94A3B8'
            }}
          >
            What will you do?
          </p>
          {currentEvent.choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => executeChoice(currentEvent.id, idx)}
              className="group w-full text-left p-4 rounded-2xl border transition duration-200 flex justify-between items-center gap-4 cursor-pointer outline-none focus:ring-2 focus:ring-teal-500"
              style={{
                backgroundColor: '#020617',
                borderColor: '#1E293B',
                fontFamily: "'Inter', system-ui, sans-serif"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1E293B';
                e.currentTarget.style.borderColor = '#334155';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#020617';
                e.currentTarget.style.borderColor = '#1E293B';
              }}
            >
              <span 
                className="text-xs sm:text-sm font-semibold transition"
                style={{ color: '#F8FAFC' }}
              >
                {cleanChoiceText(choice.choiceText)}
              </span>
              <ArrowRightCircle className="w-5 h-5 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1.5 transition-all duration-300 flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useGameStore } from '../gameStore';
import { Heart, GraduationCap, Flame, Moon, Star, Sparkles, Smile, Landmark, Banknote } from 'lucide-react';

export default function StatsPanel() {
  const stats = useGameStore((state) => state.stats);
  const characterInfo = useGameStore((state) => state.characterInfo);
  const finances = useGameStore((state) => state.finances);
  const assets = useGameStore((state) => state.assets);
  const diseases = useGameStore((state) => state.diseases) || [];

  if (!stats || !characterInfo || !finances) return null;

  // Compute Net Worth: cash + asset current value - outstanding loan principals
  const totalAssetValue = assets.reduce((sum, a) => sum + a.currentValue, 0);
  const outstandingLoans = assets.reduce((sum, a) => sum + (a.isFinanced && a.loanDetails ? a.loanDetails.principalRemaining : 0), 0);
  const netWorth = finances.cashBalance + totalAssetValue - outstandingLoans;

  const getStatColor = (val: number) => {
    if (val >= 80) return 'bg-emerald-500';
    if (val >= 50) return 'bg-teal-500';
    if (val >= 25) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const statItems = [
    {
      label: 'Happiness',
      value: stats.happiness,
      icon: <Smile className="w-4 h-4 text-amber-500" />,
      colorClass: getStatColor(stats.happiness),
    },
    {
      label: 'Health',
      value: stats.health,
      icon: <Heart className="w-4 h-4 text-rose-500" />,
      colorClass: getStatColor(stats.health),
    },
    {
      label: 'Smarts',
      value: stats.smarts,
      icon: <GraduationCap className="w-4 h-4 text-blue-500" />,
      colorClass: getStatColor(stats.smarts),
    },
    {
      label: 'Looks',
      value: stats.looks,
      icon: <Sparkles className="w-4 h-4 text-purple-500" />,
      colorClass: getStatColor(stats.looks),
    },
    {
      label: 'Karma',
      value: stats.karma,
      icon: <Star className="w-4 h-4 text-yellow-500 animate-pulse" />,
      colorClass: getStatColor(stats.karma),
    },
    {
      label: 'Stress',
      value: stats.stress !== undefined ? stats.stress : 0,
      icon: <Flame className="w-4 h-4 text-orange-500" />,
      colorClass: (stats.stress !== undefined && stats.stress >= 75) ? 'bg-rose-500' : (stats.stress !== undefined && stats.stress >= 50) ? 'bg-amber-500' : 'bg-emerald-500',
    },
  ];

  const formatWithSign = (num: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
    return num >= 0 ? formatter.format(num) : `-${formatter.format(Math.abs(num))}`;
  };

  return (
    <div id="stats_panel_container" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-6">
      <div className="flex justify-between items-start border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            {characterInfo.firstName} {characterInfo.lastName}
          </h2>
          <p className="text-slate-400 text-sm flex items-center gap-1.5 mt-0.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            {characterInfo.isDead ? '💀 Deceased' : '💚 Alive'} • {characterInfo.gender} from {characterInfo.country}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Age</p>
          <p className="text-3xl font-extrabold text-teal-400 select-none">{characterInfo.age}</p>
        </div>
      </div>

      {/* Grid of basic parameters */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/50">
          <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-1">Occupation</p>
          <p className="text-sm font-semibold text-white truncate">{characterInfo.currentOccupation}</p>
        </div>
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/50">
          <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-1">Bank Cash Balance</p>
          <p className={`text-sm font-extrabold truncate ${finances.cashBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {formatWithSign(finances.cashBalance)}
          </p>
        </div>
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/50">
          <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-1">Annual Salary</p>
          <p className="text-sm font-semibold text-slate-200 truncate">
            {finances.annualSalary > 0 ? formatWithSign(finances.annualSalary) : 'No Salary'}
          </p>
        </div>
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/50">
          <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-1">Net Worth</p>
          <p className="text-sm font-extrabold text-teal-300 truncate">
            {formatWithSign(netWorth)}
          </p>
        </div>
      </div>

      {/* Attributes Progress Bars */}
      <div className="flex flex-col gap-4 mt-2">
        <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" /> Primary Attributes
        </h3>
        {statItems.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                {item.icon} {item.label}
              </span>
              <span className="font-mono font-bold text-slate-200">{Math.round(item.value)}%</span>
            </div>
            <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-800/60 shadow-inner">
              <div
                className={`h-full ${item.colorClass} transition-all duration-500 ease-out`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Active Ailments / Diseases Section */}
      <div id="active_ailments_container" className="border-t border-slate-800/80 pt-4 mt-2">
        <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold mb-2 flex items-center gap-1.5 pb-1 select-none">
          <Heart className="w-3.5 h-3.5 text-rose-400 animate-pulse" /> Health Ailments & Addictions
        </h3>
        {diseases.length === 0 ? (
          <div id="perfect_health_indicator" className="flex items-center gap-2 bg-emerald-950/20 text-emerald-400 text-xs px-3 py-2.5 rounded-xl border border-emerald-900/30 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            🌟 Perfect Health — No diagnosed conditions.
          </div>
        ) : (
          <div id="ailments_badge_list" className="flex flex-wrap gap-2">
            {diseases.map((d) => {
              const isAddiction = d.type === 'Addiction';
              const badgeBg = isAddiction 
                ? 'bg-purple-950/50 text-purple-300 border-purple-800/40' 
                : 'bg-rose-950/50 text-rose-300 border-rose-800/40';
              const dotBg = isAddiction ? 'bg-purple-400' : 'bg-rose-400';
              return (
                <div
                  id={`ailment_badge_${d.id}`}
                  key={d.id}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold shadow-sm transition-all duration-300 hover:scale-105 select-none ${badgeBg}`}
                  title={`${d.type} condition. Annual penalties: health decay (-${d.healthDrainPerYear}%), sadness (-${d.happinessDrainPerYear}%). Cure difficulty: ${d.cureDifficulty}.`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${dotBg}`} />
                  {d.name} <span className="opacity-60 text-[9px] font-normal">({d.type})</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

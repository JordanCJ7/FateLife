/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useGameStore } from '../gameStore';
import { Trophy, Milestone, Sparkles, Skull, HeartHandshake } from 'lucide-react';
import { formatCurrency } from '../utils';

export default function LeaderboardPanel() {
  const highScores = useGameStore((state) => state.highScores) || [];

  const handleClearScores = () => {
    localStorage.removeItem('bitlife_replica_high_scores');
    useGameStore.setState({ highScores: [] });
  };

  return (
    <div id="leaderboard_panel_tab" className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col gap-5">
      <div className="flex justify-between items-center border-b border-slate-850 pb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <h2 className="text-sm font-bold text-white tracking-wide">Hall of Ancestors (Top Lives)</h2>
        </div>
        {highScores.length > 0 && (
          <button
            onClick={handleClearScores}
            className="text-[10px] text-slate-500 hover:text-rose-400 uppercase tracking-wider font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-rose-500/20 transition"
          >
            Reset Logs
          </button>
        )}
      </div>

      {highScores.length === 0 ? (
        <div className="text-center py-10 space-y-3">
          <Milestone className="w-10 h-10 text-slate-700 mx-auto animate-bounce" />
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            There are no deceased ancestors listed in your index. Safely survive to old age, pass away, and your life will be preserved on this board!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-850 text-slate-400 font-mono tracking-wider uppercase text-[10px]">
                <th className="pb-3 pl-2">Ancestor Name</th>
                <th className="pb-3 text-center">Final Age</th>
                <th className="pb-3">Wealth Worth</th>
                <th className="pb-3 text-center">Occupation</th>
                <th className="pb-3 pr-2 text-right">Cause of Death</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {highScores.map((score, idx) => (
                <tr key={idx} className="hover:bg-slate-900/60 transition duration-150">
                  <td className="py-3.5 pl-2 font-semibold text-slate-200 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-slate-900 flex items-center justify-center text-[10px] font-mono border border-slate-800 text-teal-400 font-bold">
                      #{idx + 1}
                    </span>
                    {score.name}
                  </td>
                  <td className="py-3.5 text-center font-bold text-teal-400 font-mono">
                    {score.age}
                  </td>
                  <td className="py-3.5 font-extrabold text-emerald-400 font-mono">
                    {formatCurrency(score.netWorth)}
                  </td>
                  <td className="py-3.5 text-slate-300 italic text-center">
                    {score.occupation}
                  </td>
                  <td className="py-3.5 pr-2 text-right text-slate-400 max-w-[150px] truncate" title={score.causeOfDeath}>
                    <span className="inline-flex items-center gap-1.5 text-rose-300 font-mono text-[11px] bg-rose-950/20 border border-rose-900/30 px-2 py-0.5 rounded-full">
                      <Skull className="w-3 h-3 text-rose-400" /> {score.causeOfDeath}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

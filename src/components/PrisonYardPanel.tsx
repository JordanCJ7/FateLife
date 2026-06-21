import React, { useState } from 'react';
import { useGameStore } from '../gameStore';
import { 
  ShieldAlert, 
  HelpCircle, 
  Flame, 
  Lock, 
  Key, 
  Skull, 
  UserPlus, 
  Smile, 
  Heart,
  ChevronRight,
  Anchor,
  FileSpreadsheet
} from 'lucide-react';

export default function PrisonYardPanel() {
  const characterInfo = useGameStore((state) => state.characterInfo);
  const prisonSentence = useGameStore((state) => state.prisonSentence);
  const criminalRecord = useGameStore((state) => state.criminalRecord) || [];
  const stats = useGameStore((state) => state.stats);

  const cryInCell = useGameStore((state) => state.cryInCell);
  const startPrisonRiot = useGameStore((state) => state.startPrisonRiot);
  const escapePrison = useGameStore((state) => state.escapePrison);

  const [feedback, setFeedback] = useState<{
    success: boolean;
    msg: string;
  } | null>(null);

  if (!prisonSentence) return null;

  const handleAction = (type: 'cry' | 'riot' | 'escape') => {
    setFeedback(null);
    if (type === 'cry') {
      cryInCell();
      setFeedback({
        success: true,
        msg: "You curled up in the corner of your cell and let the tears flow. Deep down, you feel a spiritual release (+10 Karma, -5 Happiness)."
      });
    } else if (type === 'riot') {
      const res = startPrisonRiot();
      setFeedback({
        success: res.success,
        msg: res.msg
      });
    } else if (type === 'escape') {
      const res = escapePrison();
      setFeedback({
        success: res.success,
        msg: res.msg
      });
    }
  };

  // Badge styles based on security tier
  const getSecurityStyles = (level: 'Minimum' | 'Medium' | 'Maximum') => {
    if (level === 'Maximum') {
      return 'bg-red-950/40 text-red-400 border-red-500/40';
    } else if (level === 'Medium') {
      return 'bg-amber-950/40 text-amber-400 border-amber-500/40';
    }
    return 'bg-slate-900/40 text-slate-400 border-slate-700/40';
  };

  return (
    <div id="prison_yard_panel" className="space-y-6">
      
      {/* Prison Core Stat Card */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-900/45 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 flex-grow">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-xs font-mono font-bold uppercase tracking-wider ${getSecurityStyles(prisonSentence.securityLevel)}`}>
              <Lock className="w-3.5 h-3.5" /> {prisonSentence.securityLevel} Security Penitentiary
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              STATE CORRECTIONAL CENTER
            </h1>
            <p className="text-xs text-slate-400 max-w-md">
              Incarcerated under general inmate index block. Your privileges are revoked. Use your time in cellblocks wisely to survive until release.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950 border border-slate-850 p-4 sm:p-5 rounded-2xl shrink-0 w-full md:w-auto justify-center md:justify-start">
            <Anchor className="w-10 h-10 text-rose-500 shrink-0" />
            <div>
              <p className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Remaining Sentence</p>
              <strong className="text-2xl font-mono text-rose-400 block mt-0.5 font-bold leading-none">
                {prisonSentence.remainingYears} <span className="text-xs">YEARS</span>
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Actions vs. Rap Sheet */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: Hand-authored prison actions (col-span-7) */}
        <div className="md:col-span-7 space-y-4">
          <h2 className="text-xs uppercase tracking-widest font-mono text-slate-500 font-bold border-b border-slate-850 pb-2">
            Prison Activity Deck
          </h2>

          <div className="space-y-3.5">
            
            {/* 1. Cry in Cell */}
            <button
              onClick={() => handleAction('cry')}
              className="w-full text-left bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 p-4 rounded-2xl flex items-center justify-between gap-4 transition duration-150 cursor-pointer group"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-teal-400 shrink-0">
                  <Smile className="w-5 h-5 text-slate-400 group-hover:text-teal-400" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-white group-hover:text-teal-300 transition-colors">Cry in Cell</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Shed your sorrows privately inside your concrete bunk cube.
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] text-teal-400 font-mono font-bold">+10 Karma</span>
                <span className="block text-[10px] text-rose-400 font-mono mt-0.5 leading-none">-5 Happiness</span>
              </div>
            </button>

            {/* 2. Lead Prison Riot */}
            <button
              onClick={() => handleAction('riot')}
              className="w-full text-left bg-slate-950/70 border border-slate-800/80 hover:border-red-900/60 p-4 rounded-2xl flex items-center justify-between gap-4 transition duration-150 cursor-pointer group"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 bg-rose-950/10 border border-rose-900/20 rounded-xl flex items-center justify-center text-rose-400 group-hover:text-red-400 shrink-0">
                  <Flame className="w-5 h-5 text-rose-400 group-hover:text-red-500" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-white group-hover:text-red-350 transition-colors">Start Inmate Riot</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Assemble the cells, protest the warden, and wage war with security guards. High risk of guard brutality.
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] text-emerald-400 font-mono font-bold">30% Win Chance</span>
                <span className="block text-[10px] text-red-400 font-mono mt-0.5 leading-none">Fail Penalty: +2yrs & Heavy Damage</span>
              </div>
            </button>

            {/* 3. Escape Attempt */}
            <button
              onClick={() => handleAction('escape')}
              className="w-full text-left bg-slate-950/70 border border-slate-800/80 hover:border-amber-900/60 p-4 rounded-2xl flex items-center justify-between gap-4 transition duration-150 cursor-pointer group"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 bg-amber-950/10 border border-amber-900/20 rounded-xl flex items-center justify-center text-amber-400 group-hover:text-amber-300 shrink-0">
                  <Key className="w-5 h-5 text-amber-400 group-hover:text-amber-300" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-white group-hover:text-amber-300 transition-colors">Attempt Prison Escape</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Plan an extraction through the sewer gates or laundry ducts. Success rates scale with Smarts level.
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] text-amber-400 font-mono font-bold">Smarts Modifiers</span>
                <span className="block text-[10px] text-red-400 font-mono mt-0.5 leading-none">Fail Penalty: +5yrs & Dog Bites</span>
              </div>
            </button>

          </div>

          {/* Toast feedback panel inside yard */}
          {feedback && (
            <div className={`p-4 rounded-2xl border flex items-start gap-3 text-sm mt-4 animate-fadeIn ${
              feedback.success 
                ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300' 
                : 'bg-rose-950/30 border-rose-800/50 text-rose-300'
            }`}>
              {feedback.success ? <Smile className="w-5 h-5 shrink-0" /> : <Skull className="w-5 h-5 shrink-0" />}
              <div>
                <p className="font-bold text-xs">{feedback.success ? 'Action Result' : 'Critical Failure'}</p>
                <p className="text-xs mt-0.5 leading-relaxed">{feedback.msg}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Rap sheet & past convictions (col-span-5) */}
        <div className="md:col-span-5 space-y-4">
          <h2 className="text-xs uppercase tracking-widest font-mono text-slate-500 font-bold border-b border-slate-850 pb-2">
            Inmate Criminal Record
          </h2>

          {criminalRecord.length === 0 ? (
            <div className="bg-slate-950/50 border border-slate-850 rounded-2xl p-6 text-center text-slate-500">
              <FileSpreadsheet className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs font-mono">No prior convictions recorded.</p>
            </div>
          ) : (
            <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-4 divide-y divide-slate-850 max-h-[280px] overflow-y-auto space-y-2.5">
              {criminalRecord.map((charge, idx) => (
                <div key={idx} className="pt-2.5 first:pt-0 flex items-start gap-2.5 font-mono text-[11px]">
                  <ChevronRight className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span className="text-slate-300 leading-tight">{charge}</span>
                </div>
              ))}
            </div>
          )}

          {/* Survival health alert */}
          <div className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl flex items-center gap-3">
            <Lock className="w-4 h-4 text-slate-500" />
            <p className="text-[10px] text-slate-400 font-mono leading-relaxed">
              <strong>Prison Survival Check:</strong> Remaining years index automatically decreases with every yearly <strong>Age Up</strong>. Keep stats elevated to avoid jailhouse mortality.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

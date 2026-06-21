/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useGameStore } from '../gameStore';
import { adjustStats, formatCurrency } from '../utils';
import { Ticket, Disc, Dumbbell, Compass, RefreshCw, Sparkles, Smile, Star, BrainCircuit, ShieldAlert, HeartCrack, Heart, X, Stethoscope, Skull } from 'lucide-react';

export default function ActivitiesPanel() {
  const finances = useGameStore((state) => state.finances);
  const characterInfo = useGameStore((state) => state.characterInfo);
  const stats = useGameStore((state) => state.stats);
  const playLottery = useGameStore((state) => state.playLottery);
  const visitCasino = useGameStore((state) => state.visitCasino);
  const commitCrime = useGameStore((state) => state.commitCrime);
  const diseases = useGameStore((state) => state.diseases) || [];
  const visitDoctor = useGameStore((state) => state.visitDoctor);
  const gotoRehab = useGameStore((state) => state.gotoRehab);
  const annualActionsPerformed = useGameStore((state) => state.annualActionsPerformed) || [];

  // Black Market & Underworld Trait Stores
  const weapons = useGameStore((state) => state.weapons) || [];
  const buyWeapon = useGameStore((state) => state.buyWeapon);
  const discardWeapon = useGameStore((state) => state.discardWeapon);
  const buyFromStreetChemist = useGameStore((state) => state.buyFromStreetChemist);
  const buyExoticPet = useGameStore((state) => state.buyExoticPet);
  const murderSomeone = useGameStore((state) => state.murderSomeone);
  const hireHitman = useGameStore((state) => state.hireHitman);
  const relationships = useGameStore((state) => state.relationships) || [];

  // States for Black Market Terminal & Crimes
  const [blackMarketLog, setBlackMarketLog] = useState<string | null>(null);
  const [blackMarketErr, setBlackMarketErr] = useState<string | null>(null);
  
  // Advanced felonies states
  const [selectedMurderTargetId, setSelectedMurderTargetId] = useState<string>('');
  const [selectedMurderMethod, setSelectedMurderMethod] = useState<string>('Poison');
  const [selectedMurderWeaponId, setSelectedMurderWeaponId] = useState<string>('');
  const [selectedHitmanTargetId, setSelectedHitmanTargetId] = useState<string>('');

  // States for Doctor's Office Modal
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<'Medical' | 'Psychiatrist' | 'Alternative'>('Medical');
  const [doctorResult, setDoctorResult] = useState<{ success: boolean; msg: string } | null>(null);

  const openDoctorModal = () => {
    setDoctorResult(null);
    setSelectedDiseaseId('');
    setSelectedDoctor('Medical');
    setIsDoctorModalOpen(true);
  };

  // States for dating app modal loop
  const [isDatingModalOpen, setIsDatingModalOpen] = useState(false);
  const [datingResult, setDatingResult] = useState<{ success: boolean; msg: string } | null>(null);

  const datingProspects = useGameStore((state) => state.datingProspects) || [];
  const findDatingProspects = useGameStore((state) => state.findDatingProspects);
  const askOutProspect = useGameStore((state) => state.askOutProspect);
  const maritalStatus = useGameStore((state) => state.maritalStatus);

  const hasActivePartner = relationships.some(npc => npc.relationshipType === 'Partner' && !npc.isDead);

  const openDatingModal = () => {
    setDatingResult(null);
    findDatingProspects();
    setIsDatingModalOpen(true);
  };

  const handleAskOut = (id: string) => {
    const res = askOutProspect(id);
    setDatingResult(res);
  };

  // States for interactive results
  const [betAmount, setBetAmount] = useState<number>(1000);
  const [casinoResult, setCasinoResult] = useState<{ won: boolean; text: string } | null>(null);
  const [interactiveLog, setInteractiveLog] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleCommitCrime = (type: 'shoplift' | 'grand_theft_auto' | 'bank_robbery' | 'shoplift_candy' | 'vandalize_walls' | 'pickpocket_classmates') => {
    setInteractiveLog(null);
    setCasinoResult(null);
    setErrorText(null);

    commitCrime(type);
  };

  if (!finances || !characterInfo || !stats || characterInfo.isDead) return null;

  const handleLottery = () => {
    setInteractiveLog(null);
    setCasinoResult(null);
    setErrorText(null);

    if (finances.cashBalance < 5) {
      setErrorText('You do not even have $5 to buy a lottery ticket!');
      return;
    }
    const preCash = finances.cashBalance;
    playLottery();
    const postCash = useGameStore.getState().finances?.cashBalance || 0;

    if (postCash > preCash) {
      setInteractiveLog(`🎉 JACKPOT WINNER! You matched the numbers and was credited $150,000!`);
    } else {
      setInteractiveLog(`You bought a $5 scratch ticket. It turned out to be a blank loser. (+0 USD)`);
    }
  };

  const handleCasino = () => {
    setInteractiveLog(null);
    setCasinoResult(null);
    setErrorText(null);

    if (finances.cashBalance < betAmount) {
      setErrorText(`You do not have enough cash to match your $${betAmount} casino wager.`);
      return;
    }

    const res = visitCasino(betAmount);
    setCasinoResult({
      won: res.won,
      text: res.msg,
    });
  };

  // self-improvement: Gym
  const handleGym = () => {
    setInteractiveLog(null);
    setCasinoResult(null);
    setErrorText(null);

    if (annualActionsPerformed.includes('visit_gym')) {
      setErrorText('You have already visited the gym this year.');
      return;
    }

    if (finances.cashBalance < 80) {
      setErrorText('You need $80 to afford a premium gym day-pass.');
      return;
    }

    let msg = '';
    // Mutate state directly using Zustand store's setter logic
    useGameStore.setState((state) => {
      const draftFinances = { ...state.finances! };
      const draftStats = { ...state.stats! };
      const draftLog = [...state.log];
      const draftActions = [...(state.annualActionsPerformed || [])];

      // Gym efficiency multiplier based on streak
      const streak = state.consistencyStreaks ? state.consistencyStreaks.gymStreak : 0;
      const streakMultiplier = 1.0 + (Math.min(5, streak) * 0.1);

      let healthGain = 12 * streakMultiplier;
      let looksGain = 5 * streakMultiplier;
      let happinessGain = 8 * streakMultiplier;

      // Biological Looks baseline check
      if (state.geneticBaselines && state.geneticBaselines.looksBaseline < 40) {
        looksGain = looksGain * 0.4; // suppressed by 60%
      }

      healthGain = Math.round(healthGain);
      looksGain = Math.round(looksGain);
      happinessGain = Math.round(happinessGain);

      draftFinances.cashBalance -= 80;
      draftStats.health = Math.min(100, draftStats.health + healthGain);
      draftStats.looks = Math.min(100, draftStats.looks + looksGain);
      draftStats.happiness = Math.min(100, draftStats.happiness + happinessGain);
      draftLog.push(`Age ${state.characterInfo!.age}: You hit the local iron gym to work on your physique.`);
      draftActions.push('visit_gym');

      const streakMsg = streak > 0 ? ` [Streak: ${streak} yrs, +${(Math.min(5, streak) * 10)}% efficiency]` : '';
      msg = `🏋️‍♂️ You spent $80. You pumped some heavy iron plates at Gold's Gym. Health (+${healthGain}), Looks (+${looksGain}), Happiness (+${happinessGain})${streakMsg}.`;

      return { finances: draftFinances, stats: draftStats, log: draftLog, annualActionsPerformed: draftActions };
    });

    setInteractiveLog(msg);
  };

  // self-improvement: Meditate
  const handleMeditate = () => {
    setInteractiveLog(null);
    setCasinoResult(null);
    setErrorText(null);

    if (annualActionsPerformed.includes('meditate')) {
      setErrorText('You have already meditated this year.');
      return;
    }

    useGameStore.setState((state) => {
      const draftStats = { ...state.stats! };
      const draftLog = [...state.log];
      const draftActions = [...(state.annualActionsPerformed || [])];

      draftStats.happiness = Math.min(100, draftStats.happiness + 15);
      draftStats.karma = Math.min(100, draftStats.karma + 10);
      draftStats.smarts = Math.min(100, draftStats.smarts + 2);
      draftLog.push(`Age ${state.characterInfo!.age}: You completed a deep, mindful meditation session under a quiet maple tree.`);
      draftActions.push('meditate');

      return { stats: draftStats, log: draftLog, annualActionsPerformed: draftActions };
    });

    setInteractiveLog('🧘‍♀️ You spent $0. You sat in a quiet lotus position, calming your inner mind. Happiness (+15), Karma (+10), Smarts (+2).');
  };

  // self-improvement: Plastic Surgery
  const handlePlasticSurgery = () => {
    setInteractiveLog(null);
    setCasinoResult(null);
    setErrorText(null);

    const cost = 4500;
    if (finances.cashBalance < cost) {
      setErrorText(`You need ${formatCurrency(cost)} to hire an aesthetic plastic surgeon.`);
      return;
    }

    const success = Math.random() > 0.35; // 65% success

    useGameStore.setState((state) => {
      const draftFinances = { ...state.finances! };
      const draftStats = { ...state.stats! };
      const draftLog = [...state.log];

      draftFinances.cashBalance -= cost;

      if (success) {
        let looksBonus = 30;
        if (state.geneticBaselines && state.geneticBaselines.looksBaseline < 40) {
          looksBonus = looksBonus * 0.4; // suppressed by 60%
        }
        looksBonus = Math.round(looksBonus);
        draftStats.looks = Math.min(100, draftStats.looks + looksBonus);
        draftStats.happiness = Math.min(100, draftStats.happiness + 15);
        draftLog.push(`Age ${state.characterInfo!.age}: Your rhinoplasty plastic surgery was a complete masterpiece!`);
      } else {
        draftStats.looks = Math.max(0, draftStats.looks - 40);
        draftStats.health = Math.max(0, draftStats.health - 25);
        draftStats.happiness = Math.max(0, draftStats.happiness - 35);
        draftLog.push(`Age ${state.characterInfo!.age}: BOTCHED SURGERY! The surgeon ruined your nasal alignment.`);
      }

      return { finances: draftFinances, stats: draftStats, log: draftLog };
    });

    if (success) {
      let finalLooksBonus = 30;
      const baseline = useGameStore.getState().geneticBaselines;
      if (baseline && baseline.looksBaseline < 40) {
        finalLooksBonus = Math.round(finalLooksBonus * 0.4);
      }
      setInteractiveLog(`✨ Premium surgery successful! You look stunning. Looks (+${finalLooksBonus}), Happiness (+15). Out-of-pocket: -${formatCurrency(cost)}`);
    } else {
      setInteractiveLog(`🚨 MEDICAL EMERGENCY! The doctor botched the procedures. Face distorted. Looks (-40), Health (-25), Happiness (-35). Out-of-pocket: -${formatCurrency(cost)}`);
    }
  };

  return (
    <div id="activities_panel_tab" className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Self Improvement Side */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <Sparkles className="w-4 h-4 text-emerald-400" /> Human Self Improvement
        </h3>

        <div className="flex flex-col gap-3">
          {/* Gym */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center hover:border-slate-700 transition">
            <div className="flex gap-3 items-center">
              <div className="p-2.5 rounded-lg bg-orange-950/20 border border-orange-500/20">
                <Dumbbell className="text-orange-400 w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">Attend local iron gym</h4>
                <p className="text-[10px] text-slate-500 mt-1">Improves Health and Looks</p>
              </div>
            </div>
            <button
              onClick={handleGym}
              disabled={annualActionsPerformed.includes('visit_gym')}
              className={`border text-[11px] sm:text-xs px-3.5 py-2 rounded-lg font-extrabold transition shrink-0
                ${annualActionsPerformed.includes('visit_gym')
                  ? 'bg-slate-900 border-slate-800 text-slate-500 opacity-60 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 hover:text-orange-300 text-white cursor-pointer'}`}
            >
              {annualActionsPerformed.includes('visit_gym') ? 'Gym (Done This Year)' : 'Fee: $80'}
            </button>
          </div>
 
          {/* Meditate */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center hover:border-slate-700 transition">
            <div className="flex gap-3 items-center">
              <div className="p-2.5 rounded-lg bg-sky-950/20 border border-sky-500/20">
                <Compass className="text-sky-400 w-5 h-5 animate-spin" style={{ animationDuration: '20s' }} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">Undergo Mindful Yoga Zen</h4>
                <p className="text-[10px] text-slate-500 mt-1">Improves Happiness, Karma, and minds</p>
              </div>
            </div>
            <button
              onClick={handleMeditate}
              disabled={annualActionsPerformed.includes('meditate')}
              className={`border text-[11px] sm:text-xs px-3.5 py-2 rounded-lg font-extrabold transition shrink-0
                ${annualActionsPerformed.includes('meditate')
                  ? 'bg-slate-900 border-slate-800 text-slate-500 opacity-60 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 hover:text-sky-300 text-white cursor-pointer'}`}
            >
              {annualActionsPerformed.includes('meditate') ? 'Meditated (Done This Year)' : 'Fee: FREE'}
            </button>
          </div>

          {/* Plastic Surgery */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center hover:border-slate-700 transition">
            <div className="flex gap-3 items-center">
              <div className="p-2.5 rounded-lg bg-pink-950/20 border border-pink-500/20">
                <BrainCircuit className="text-pink-400 w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">Inject Facial Rhinoplasty</h4>
                <p className="text-[10px] text-slate-500 mt-1">High risk boost to Looks (~65% pass rate)</p>
              </div>
            </div>
            <button
              onClick={handlePlasticSurgery}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:text-pink-300 text-white text-xs px-3.5 py-2 rounded-lg font-bold transition"
            >
              Fee: $4,500
            </button>
          </div>

          {/* Doctor / Medical hub */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center hover:border-slate-700 transition">
            <div className="flex gap-3 items-center">
              <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/20">
                <Stethoscope className="text-rose-400 w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">Doctor & Rehabilitation</h4>
                <p className="text-[10px] text-slate-500 mt-1">Visit clinicians or seek specialty rehab treatments</p>
              </div>
            </div>
            <button
              onClick={openDoctorModal}
              className="bg-rose-600 hover:bg-rose-500 hover:text-white text-white text-xs px-3.5 py-2 rounded-lg font-bold transition"
            >
              Consult Hub
            </button>
          </div>
        </div>
      </div>

      {/* Leisure & Gambling Side */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <Ticket className="w-4 h-4 text-yellow-400" /> Leisure, Betting & Chance
        </h3>

        <div className="flex flex-col gap-4">
          {/* Lottery Ticket launcher */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">Buy State Sweepstake Slip</h4>
                <p className="text-[10px] text-slate-500 mt-1">Small 1% probability of hitting a $150,000 jackpot!</p>
              </div>
              <button
                onClick={handleLottery}
                className="bg-yellow-600 hover:bg-yellow-500 text-white text-xs px-4 py-2 rounded-lg font-bold transition flex items-center gap-1.5"
              >
                Scratch ($5)
              </button>
            </div>
          </div>

          {/* Blackjack Casino */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">The Blackjack Deck Table</h4>
              <p className="text-[10px] text-slate-500 mt-1">Wager cash. High risk, high liquidity. House wins slightly on general odds.</p>
            </div>

            <div className="flex gap-2 items-center mt-1">
              <span className="text-xs text-slate-400">Bet Wager:</span>
              <select
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                className="bg-slate-900 text-teal-300 text-xs border border-slate-800 py-1.5 px-3 rounded-lg font-mono focus:outline-none focus:border-teal-500 flex-1"
              >
                <option value={100}>$100</option>
                <option value={500}>$500</option>
                <option value={1000}>$1,000</option>
                <option value={5000}>$5,000</option>
                <option value={10000}>$10,000</option>
              </select>
              <button
                onClick={handleCasino}
                className="bg-teal-600 hover:bg-teal-500 text-white text-xs px-4 py-2 rounded-lg font-bold transition"
              >
                Hit & Deal
              </button>
            </div>
          </div>

          {/* Dating App */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" /> LoverLink Dating Registry
                </h4>
                <p className="text-[10px] text-slate-500 mt-1">
                  {characterInfo.age >= 16 
                    ? "Broach the online dating catalog to find procedural life matches!" 
                    : "Must be age 16+ to register and search on romantic dating apps."}
                </p>
              </div>
              <button
                disabled={characterInfo.age < 16}
                onClick={openDatingModal}
                className="bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white text-xs px-4 py-2 rounded-lg font-bold transition flex items-center gap-1.5"
              >
                Launch App
              </button>
            </div>
          </div>

          {/* Illicit Crime Desk Section */}
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2 mt-4">
            <ShieldAlert className="w-4 h-4 text-rose-500" /> Illicit Criminal Actions
          </h3>

          <div className="flex flex-col gap-3">
            {characterInfo.age < 12 ? (
              <div className="text-slate-500 text-xs py-2 italic font-mono">
                You are currently too young to consider participating in illicit behaviors. Under age 12, actions are guided by parental supervision.
              </div>
            ) : characterInfo.age < 18 ? (
              <>
                {/* Shoplifting Candy */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center hover:border-slate-700 transition">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Shoplift corner store candy</h4>
                    <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                      Target premium sweets and candy bars. Payouts: Minor pocket cash. Success: High. Arrest triggers juvenile court trials.
                    </p>
                  </div>
                  <button
                    onClick={() => handleCommitCrime('shoplift_candy')}
                    className="bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 font-extrabold text-xs px-4 py-2 rounded-lg transition shrink-0"
                  >
                    Commit
                  </button>
                </div>

                {/* Vandalizing walls */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center hover:border-slate-700 transition">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Spray-paint school facade</h4>
                    <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                      Vandalize campus bricks with custom graffiti. Success: Medium. Arrest triggers vandalism charges in juvenile court.
                    </p>
                  </div>
                  <button
                    onClick={() => handleCommitCrime('vandalize_walls')}
                    className="bg-slate-800 hover:bg-slate-700 text-amber-500 hover:text-amber-400 font-extrabold text-xs px-3.5 py-2 rounded-lg transition shrink-0"
                  >
                    Commit
                  </button>
                </div>

                {/* Pickpocketing classmates */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center hover:border-slate-700 transition">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Pickpocket classmates</h4>
                    <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                      Swipe cash or mobile devices left unattended in lockers during gym. Success: Medium/Low. Arrest triggers pilfering charges in juvenile court.
                    </p>
                  </div>
                  <button
                    onClick={() => handleCommitCrime('pickpocket_classmates')}
                    className="bg-slate-800 hover:bg-slate-700 text-rose-500 hover:text-rose-400 font-extrabold text-xs px-4 py-2 rounded-lg transition shrink-0"
                  >
                    Commit
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Shoplifting */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center hover:border-slate-700 transition">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Shoplift boutique store</h4>
                    <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                      Target minor merchandise. Payouts: $20 – $100 cash. Success probability: ~80%.
                    </p>
                  </div>
                  <button
                    onClick={() => handleCommitCrime('shoplift')}
                    className="bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 font-extrabold text-xs px-4 py-2 rounded-lg transition shrink-0"
                  >
                    Commit
                  </button>
                </div>

                {/* GTA */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center hover:border-slate-700 transition">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Grand Theft Auto</h4>
                    <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                      Hotwire locked cars. Payouts: $5,000 – $15,000 cash or keep as a vehicle asset. Success: ~40%.
                    </p>
                  </div>
                  <button
                    onClick={() => handleCommitCrime('grand_theft_auto')}
                    className="bg-slate-800 hover:bg-slate-700 text-amber-500 hover:text-amber-400 font-extrabold text-xs px-3.5 py-2 rounded-lg transition shrink-0"
                  >
                    Commit
                  </button>
                </div>

                {/* Bank Robbery */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center hover:border-slate-700 transition">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Heist Bank Vault</h4>
                    <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                      Storm federal reserves with fake weapons. Success: ~15%. Massive payouts: $50,000 – $200,000 cash!
                    </p>
                  </div>
                  <button
                    onClick={() => handleCommitCrime('bank_robbery')}
                    className="bg-slate-800 hover:bg-slate-700 text-rose-500 hover:text-rose-400 font-extrabold text-xs px-4 py-2 rounded-lg transition shrink-0"
                  >
                    Commit
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Underworld Crimes & Weapons Black Market Terminal */}
          {characterInfo.age >= 18 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-rose-950/70 pb-2 mt-4">
                <Skull className="w-4 h-4 text-rose-500 animate-pulse" /> Underworld & Advanced Felonies
              </h3>

              <div id="black_market_box" className="bg-slate-950 border border-red-950/50 rounded-xl p-4 space-y-4 shadow-[0_0_15px_rgba(239,68,68,0.03)]">
                {/* Underworld Alerts */}
                {(blackMarketLog || blackMarketErr) && (
                  <div className="p-3 rounded-lg text-xs leading-relaxed border bg-slate-900 border-rose-955 animate-in fade-in duration-200">
                    {blackMarketLog && (
                      <p className="text-emerald-400 font-sans font-medium">✔️ {blackMarketLog}</p>
                    )}
                    {blackMarketErr && (
                      <p className="text-rose-400 font-sans font-medium">⚠️ {blackMarketErr}</p>
                    )}
                  </div>
                )}

                {/* Section 1: Gunrunner Terminal */}
                <div className="space-y-2">
                  <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">Unlicensed Gunrunner Terminal</p>
                  <p className="text-[10px] text-slate-500">Purchase unregistered guns with high lethality indexes.</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'Rusty .38 Revolver', price: 350, lethality: 40 },
                      { name: 'Glock 9mm Pistol', price: 850, lethality: 65 },
                      { name: 'Sawn-off Shotgun', price: 1600, lethality: 85 },
                      { name: 'Assault Rifle', price: 4500, lethality: 98 }
                    ].map((gun, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setBlackMarketLog(null);
                          setBlackMarketErr(null);
                          const res = buyWeapon({
                            id: `gun-${Date.now()}-${Math.random()}`,
                            name: gun.name,
                            lethality: gun.lethality,
                            isIllegal: true
                          }, gun.price);
                          if (res.success) setBlackMarketLog(res.msg);
                          else setBlackMarketErr(res.msg);
                        }}
                        className="bg-slate-900 border border-slate-850 hover:border-red-900/40 p-2 rounded-lg text-left transition cursor-pointer"
                      >
                        <p className="text-xs font-bold text-white">{gun.name}</p>
                        <div className="flex justify-between items-center mt-1 text-[9px] font-mono">
                          <span className="text-rose-400">Leth: {gun.lethality}%</span>
                          <span className="text-teal-400">${gun.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 2: Street Chemist & Smugglers */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-900">
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-850 flex flex-col justify-between">
                    <div>
                      <p className="text-[9px] font-mono text-pink-400 uppercase font-bold">Street Chemist</p>
                      <p className="text-[10px] text-slate-550 mt-0.5 leading-tight">Euphoriant substances. Watch out for addiction!</p>
                    </div>
                    <button
                      onClick={() => {
                        setBlackMarketLog(null);
                        setBlackMarketErr(null);
                        const res = buyFromStreetChemist('Street Chemical Euphoria', 1200);
                        if (res.success) setBlackMarketLog(res.msg);
                        else setBlackMarketErr(res.msg);
                      }}
                      className="mt-2 w-full bg-slate-800 hover:bg-slate-755 text-[10px] text-orange-300 font-bold py-1.5 rounded transition cursor-pointer"
                    >
                      Consume ($1,200)
                    </button>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-850 flex flex-col justify-between">
                    <div>
                      <p className="text-[9px] font-mono text-emerald-400 uppercase font-bold">Smuggle Exotic</p>
                      <p className="text-[10px] text-slate-550 mt-0.5 leading-tight">Bribe local customs to get a highly dangerous wild exotic pet.</p>
                    </div>
                    <button
                      onClick={() => {
                        setBlackMarketLog(null);
                        setBlackMarketErr(null);
                        const exotics = ['Bengal Tiger Cub', 'Spotted Panther', 'Silverback Gorilla', 'Exotic Chimpanzee'];
                        const breed = exotics[Math.floor(Math.random() * exotics.length)];
                        const res = buyExoticPet('Exotic Smuggled', breed, 15000);
                        if (res.success) setBlackMarketLog(res.msg);
                        else setBlackMarketErr(res.msg);
                      }}
                      className="mt-2 w-full bg-slate-800 hover:bg-slate-755 text-[10px] text-emerald-300 font-bold py-1.5 rounded transition cursor-pointer"
                    >
                      Smuggle ($15,000)
                    </button>
                  </div>
                </div>

                {/* Section 3: Weapon Arsenal & Discard */}
                {weapons.length > 0 && (
                  <div className="pt-2 border-t border-slate-900">
                    <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold mb-2">My Illegal Arsenal ({weapons.length})</p>
                    <div className="space-y-1.5 max-h-[100px] overflow-y-auto pr-1">
                      {weapons.map((w, idx) => (
                        <div key={w.id || idx} className="bg-slate-900 px-2 py-1.5 rounded-lg border border-slate-850 flex justify-between items-center text-[10px]">
                          <span className="text-white font-medium">{w.name} <span className="font-mono text-rose-500 text-[9px]">({w.lethality}% Lethal)</span></span>
                          <button
                            onClick={() => discardWeapon(w.id)}
                            className="text-[9px] text-slate-400 hover:text-rose-400 font-bold font-mono transition cursor-pointer"
                          >
                            Dump Weapon
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 4: Advanced Capital Felonies */}
                <div className="pt-2 border-t border-slate-900 space-y-3">
                  <div>
                    <p className="text-[10px] font-mono tracking-widest text-orange-400 uppercase font-bold">Assassination Contract & Murder</p>
                    <p className="text-[10px] text-slate-500">Pick a living target from your family/relationships list and choose your method.</p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[9px] uppercase font-mono text-slate-400 mb-1">Target Individual</label>
                        <select
                          value={selectedMurderTargetId}
                          onChange={(e) => setSelectedMurderTargetId(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-[11px] text-white focus:outline-none focus:border-red-500"
                        >
                          <option value="">-- Choose Target --</option>
                          {relationships.filter(npc => !npc.isDead).map(npc => (
                            <option key={npc.id} value={npc.id}>{npc.name} ({npc.relationshipType})</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase font-mono text-slate-400 mb-1">Assassination Method</label>
                        <select
                          value={selectedMurderMethod}
                          onChange={(e) => setSelectedMurderMethod(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-[11px] text-white focus:outline-none focus:border-red-500"
                        >
                          <option value="Poison">Rat Poison</option>
                          <option value="Drive-by">Drive-by Shooting</option>
                          <option value="Push off Cliff">Push off Cliff</option>
                          {weapons.length > 0 && <option value="Weapon">Equipped Firearm</option>}
                        </select>
                      </div>
                    </div>

                    {selectedMurderMethod === 'Weapon' && weapons.length > 0 && (
                      <div className="animate-in fade-in duration-200">
                        <label className="block text-[9px] uppercase font-mono text-slate-400 mb-1">Equipped Firearm</label>
                        <select
                          value={selectedMurderWeaponId}
                          onChange={(e) => setSelectedMurderWeaponId(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-[11px] text-white focus:outline-none focus:border-red-500"
                        >
                          <option value="">-- Choose Gun --</option>
                          {weapons.map(w => (
                            <option key={w.id} value={w.id}>{w.name} ({w.lethality}% Leth)</option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
                      <button
                        onClick={() => {
                          setBlackMarketLog(null);
                          setBlackMarketErr(null);
                          if (!selectedMurderTargetId) {
                            setBlackMarketErr('You must select a living target.');
                            return;
                          }
                          const gunIdToUse = selectedMurderMethod === 'Weapon' ? selectedMurderWeaponId : undefined;
                          const res = murderSomeone(selectedMurderTargetId, selectedMurderMethod, gunIdToUse);
                          if (res.success) setBlackMarketLog(res.msg);
                          else setBlackMarketErr(res.msg);
                        }}
                        className="w-full bg-red-950/40 border border-red-950 hover:bg-red-900/60 text-red-100 text-[10px] font-bold py-1.5 rounded transition cursor-pointer"
                      >
                        Commit Murder 🩸
                      </button>

                      <button
                        onClick={() => {
                          setBlackMarketLog(null);
                          setBlackMarketErr(null);
                          if (!selectedMurderTargetId) {
                            setBlackMarketErr('Select a target for the professional hit.');
                            return;
                          }
                          const res = hireHitman(selectedMurderTargetId);
                          if (res.success) setBlackMarketLog(res.msg);
                          else setBlackMarketErr(res.msg);
                        }}
                        className="w-full bg-slate-900 border border-slate-800 hover:border-slate-755 text-slate-200 text-[10px] font-bold py-1.5 rounded transition cursor-pointer"
                      >
                        Hire Mafia Hitman 🕴️
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Dynamic Display of Activities results */}
        {(interactiveLog || casinoResult || errorText) && (
          <div className="mt-4 p-4 rounded-xl border flex flex-col gap-2 bg-slate-950">
            {errorText && (
              <p className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-500" /> {errorText}
              </p>
            )}
            {interactiveLog && (
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{interactiveLog}</p>
            )}
            {casinoResult && (
              <div>
                <p className={`text-xs font-bold uppercase tracking-wider ${casinoResult.won ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {casinoResult.won ? 'Dealer Busted! Won Hand' : 'Dealer Wins Hand'}
                </p>
                <p className="text-xs text-slate-300 mt-1 font-sans">{casinoResult.text}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Dating App Matching Modal */}
      {isDatingModalOpen && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/85 pb-3">
              <div className="flex items-center gap-2 text-rose-400">
                <Heart className="w-5 h-5 fill-rose-500/20 animate-pulse text-rose-500" />
                <h3 className="text-base font-extrabold text-white">LoverLink Registry</h3>
              </div>
              <button 
                onClick={() => setIsDatingModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {hasActivePartner ? (
              <div className="text-center py-6 space-y-3">
                <HeartCrack className="w-12 h-12 text-rose-500 mx-auto" />
                <p className="text-sm font-semibold text-slate-200">Already in a Relationship!</p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  You cannot search for new prospects while committed. Visit the Relationships Panel to break up or divorce your current partner first!
                </p>
              </div>
            ) : datingResult?.success ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                  <Heart className="w-8 h-8 fill-emerald-500/30" />
                </div>
                <h4 className="text-md font-bold text-white">Success!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">{datingResult.msg}</p>
                <button 
                  onClick={() => setIsDatingModalOpen(false)}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition mt-2 cursor-pointer"
                >
                  Start Dating
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Below are three algorithmically matched singles near your age, looks, and status metrics:
                </p>

                {datingResult && !datingResult.success && (
                  <div className="p-3 bg-rose-950/20 border border-rose-500/10 rounded-xl text-[11px] text-rose-400 leading-relaxed">
                    ❌ {datingResult.msg}
                  </div>
                )}

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {datingProspects.map((prospect) => (
                    <div key={prospect.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center justify-between gap-4">
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white truncate">{prospect.name}</span>
                          <span className="text-[10px] text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full font-mono shrink-0">
                            Age {prospect.age}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-1">
                          <div className="space-y-0.5">
                            <span className="text-[9px] text-slate-500 font-mono">Looks</span>
                            <div className="flex items-center gap-1">
                              <div className="w-8 h-1 bg-slate-800 rounded overflow-hidden">
                                <div className="h-full bg-rose-500" style={{ width: `${Math.round(prospect.looks)}%` }} />
                              </div>
                              <span className="text-[9px] text-slate-400 font-mono">{Math.round(prospect.looks)}%</span>
                            </div>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[9px] text-slate-500 font-mono">Smarts</span>
                            <div className="flex items-center gap-1">
                              <div className="w-8 h-1 bg-slate-800 rounded overflow-hidden">
                                <div className="h-full bg-yellow-500" style={{ width: `${Math.round(prospect.smarts)}%` }} />
                              </div>
                              <span className="text-[9px] text-slate-400 font-mono">{Math.round(prospect.smarts)}%</span>
                            </div>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[9px] text-slate-500 font-mono">Wealth</span>
                            <span className="text-[9px] text-emerald-400 font-bold block truncate">
                              {prospect.money >= 60000 ? 'Wealthy' : prospect.money >= 20000 ? 'Comfy' : 'Poor'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleAskOut(prospect.id)}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-[11px] font-bold transition shrink-0 cursor-pointer"
                      >
                        Ask Out
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!hasActivePartner && !datingResult?.success && (
              <div className="pt-2 text-center border-t border-slate-800/80">
                <button 
                  onClick={() => setIsDatingModalOpen(false)}
                  className="text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Close Registry
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Clinician & Rehab Center Portal Modal */}
      {isDoctorModalOpen && (
        <div id="doctor_modal" className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-rose-500">
                <Stethoscope className="w-5 h-5 text-rose-500 animate-pulse" />
                <h3 className="text-base font-extrabold text-white">Metropolitan Health & Rehab</h3>
              </div>
              <button 
                onClick={() => setIsDoctorModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {diseases.length === 0 ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                  <Smile className="w-8 h-8 font-extrabold text-emerald-400" />
                </div>
                <h4 className="text-md font-bold text-white">Magnificent Physical Health!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed font-sans">
                  Congratulations! You currently do not have any active medical diseases, mental conditions, or severe addictions. Maintain your lifestyle!
                </p>
                <button 
                  onClick={() => setIsDoctorModalOpen(false)}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition mt-2 cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Result Block */}
                {doctorResult && (
                  <div className={`p-4 rounded-xl border text-xs leading-relaxed font-sans ${doctorResult.success ? 'bg-emerald-950/30 border-emerald-500/20 text-emerald-300' : 'bg-rose-950/30 border-rose-500/20 text-rose-300'}`}>
                    <p className="font-extrabold uppercase tracking-wider mb-1">
                      {doctorResult.success ? 'Treatment Successful!' : 'Treatment Unsuccessful'}
                    </p>
                    <p>{doctorResult.msg}</p>
                  </div>
                )}

                {/* Dropdown to select target disease */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                    Choose Ailment to Treat:
                  </label>
                  <select
                    value={selectedDiseaseId}
                    onChange={(e) => {
                      setSelectedDiseaseId(e.target.value);
                      setDoctorResult(null);
                    }}
                    className="w-full bg-slate-950 border border-slate-805 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                  >
                    <option value="">-- Click to select active diagnosed condition --</option>
                    {diseases.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.type} • {d.cureDifficulty} cure difficulty)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Grid of Standard Doctors */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                    Select Medical Professional:
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Medical Doctor Card */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDoctor('Medical');
                        setDoctorResult(null);
                      }}
                      className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${selectedDoctor === 'Medical' ? 'bg-blue-950/25 border-blue-500' : 'bg-slate-950/50 border-slate-850 hover:border-slate-800'}`}
                    >
                      <span className="text-xs font-bold text-white block">Dr. Sterling</span>
                      <span className="text-[10px] text-blue-400 font-mono font-bold block">Fee: $100</span>
                      <span className="text-[9px] text-slate-500 leading-normal block italic mt-1 font-sans">
                        Cures Infectious and Chronic diseases.
                      </span>
                    </button>

                    {/* Psychiatrist Card */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDoctor('Psychiatrist');
                        setDoctorResult(null);
                      }}
                      className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${selectedDoctor === 'Psychiatrist' ? 'bg-purple-950/25 border-purple-500' : 'bg-slate-950/50 border-slate-850 hover:border-slate-800'}`}
                    >
                      <span className="text-xs font-bold text-white block">Dr. Vance</span>
                      <span className="text-[10px] text-purple-400 font-mono font-bold block">Fee: $250</span>
                      <span className="text-[9px] text-slate-500 leading-normal block italic mt-1 font-sans">
                        Specializes in Mental conditions.
                      </span>
                    </button>

                    {/* Alternative Healer Card */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDoctor('Alternative');
                        setDoctorResult(null);
                      }}
                      className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${selectedDoctor === 'Alternative' ? 'bg-amber-950/25 border-amber-500' : 'bg-slate-950/50 border-slate-850 hover:border-slate-800'}`}
                    >
                      <span className="text-xs font-bold text-white block">Rainbow Sky</span>
                      <span className="text-[10px] text-amber-400 font-mono font-bold block">Fee: $500</span>
                      <span className="text-[9px] text-slate-500 leading-normal block italic mt-1 font-sans">
                        Alternative (Flat 20% success rate). No addictions.
                      </span>
                    </button>
                  </div>
                </div>

                {/* Perform standard clinical session */}
                <button
                  type="button"
                  onClick={() => {
                    if (!selectedDiseaseId) {
                      setDoctorResult({ success: false, msg: 'Select an active ailment from the dropdown listing first.' });
                      return;
                    }
                    const res = visitDoctor(selectedDoctor, selectedDiseaseId);
                    setDoctorResult(res);
                  }}
                  className="w-full bg-rose-600 hover:bg-rose-500 text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-md focus:outline-none cursor-pointer"
                >
                  Pay Clinic Fee & Treat Selected Ailment
                </button>

                {/* Subsections: Specialized Addictions Rehab Center */}
                {diseases.some(d => d.type === 'Addiction') && (
                  <div className="border-t border-slate-800/80 pt-4 mt-3 space-y-3">
                    <div className="bg-purple-950/10 border border-purple-900/30 p-4 rounded-xl space-y-3 text-left">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="text-xs font-bold text-purple-300">Hope River Luxury Rehab Facility</h4>
                          <p className="text-[10px] text-slate-400 mt-1 font-sans leading-relaxed">
                            An immersive round-the-clock clinical therapy program with a 65% sobriety success rate. The only way to cure serious substance or gamified addictions.
                          </p>
                        </div>
                        <span className="text-xs font-mono font-bold text-purple-400 shrink-0 bg-purple-950/50 border border-purple-800/40 px-2.5 py-1 rounded-full">
                          Cost: $5,000
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const res = gotoRehab();
                          setDoctorResult(res);
                        }}
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-lg text-xs font-bold transition-all shadow-md focus:outline-none cursor-pointer"
                      >
                        Check into Rehab & Get Sober
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="pt-2 text-center border-t border-slate-800/80">
              <button 
                onClick={() => setIsDoctorModalOpen(false)}
                className="text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Exit Health Medical Office
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

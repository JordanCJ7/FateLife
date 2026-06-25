/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from './gameStore';
import { COUNTRIES, MALE_FIRST_NAMES, FEMALE_FIRST_NAMES, LAST_NAMES, formatCurrency } from './utils';

/// Subcomponents
import StatsPanel from './components/StatsPanel';
import TimelineLog from './components/TimelineLog';
import AssetsPanel from './components/AssetsPanel';
import CareersPanel from './components/CareersPanel';
import ActivitiesPanel from './components/ActivitiesPanel';
import RelationshipsPanel from './components/RelationshipsPanel';
import LeaderboardPanel from './components/LeaderboardPanel';
import EducationPanel from './components/EducationPanel';
import EventModal from './components/EventModal';
import OutcomeModal from './components/OutcomeModal';
import CourtroomModal from './components/CourtroomModal';
import PrisonYardPanel from './components/PrisonYardPanel';

import { 
  Sparkles, 
  Baby, 
  ChevronRight, 
  Heart, 
  AlertCircle, 
  RefreshCw, 
  User, 
  FolderLock, 
  Calendar, 
  Skull, 
  Compass, 
  Briefcase, 
  Home, 
  Trophy, 
  VolumeX, 
  Hourglass,
  Scale,
  Users,
  GraduationCap,
  Smile,
  Flame,
  Coins
} from 'lucide-react';

export default function App() {
  const characterInfo = useGameStore((state) => state.characterInfo);
  const finances = useGameStore((state) => state.finances);
  const assets = useGameStore((state) => state.assets);
  const stats = useGameStore((state) => state.stats);
  const log = useGameStore((state) => state.log) || [];
  const initializeCharacter = useGameStore((state) => state.initializeCharacter);
  const ageUp = useGameStore((state) => state.ageUp);
  const restartGame = useGameStore((state) => state.restartGame);
  const prisonSentence = useGameStore((state) => state.prisonSentence);
  const courtTrial = useGameStore((state) => state.courtTrial);
  const currentEvent = useGameStore((state) => state.currentEvent);
  const activeEventQueue = useGameStore((state) => state.activeEventQueue || []);
  const lastChoiceOutcome = useGameStore((state) => state.lastChoiceOutcome);
  const isLightMode = useGameStore((state) => state.isLightMode);
  const toggleTheme = useGameStore((state) => state.toggleTheme);

  // Character creator fields state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [country, setCountry] = useState('United States');

  // Multi-tab section
  const [activeTab, setActiveTab] = useState<'journal' | 'education' | 'careers' | 'assets' | 'relationships' | 'activities' | 'graveyard'>('journal');

  // Notification engine state
  interface NotificationItem {
    id: string;
    text: string;
    isPositive: boolean;
    icon: React.ReactNode;
  }
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Refs to track previous values over renders
  const prevStatsRef = useRef<any>(null);
  const prevCashRef = useRef<number | null>(null);

  useEffect(() => {
    if (!characterInfo || !stats || !finances) {
      prevStatsRef.current = null;
      prevCashRef.current = null;
      return;
    }

    const cashBalance = finances.cashBalance;

    if (prevStatsRef.current !== null && prevCashRef.current !== null) {
      const newNotifications: NotificationItem[] = [];

      const addNotif = (text: string, isPositive: boolean, icon: React.ReactNode) => {
        newNotifications.push({
          id: Math.random().toString(),
          text,
          isPositive,
          icon
        });
      };

      // Happiness
      const hDiff = Math.round(stats.happiness) - Math.round(prevStatsRef.current.happiness);
      if (hDiff !== 0) {
        addNotif(
          `${hDiff > 0 ? '+' : ''}${hDiff}% Happiness`,
          hDiff > 0,
          <Smile className="w-4 h-4 text-amber-500 animate-bounce" />
        );
      }

      // Health
      const hlDiff = Math.round(stats.health) - Math.round(prevStatsRef.current.health);
      if (hlDiff !== 0) {
        addNotif(
          `${hlDiff > 0 ? '+' : ''}${hlDiff}% Health`,
          hlDiff > 0,
          <Heart className="w-4 h-4 text-rose-500 animate-bounce" />
        );
      }

      // Smarts
      const sDiff = Math.round(stats.smarts) - Math.round(prevStatsRef.current.smarts);
      if (sDiff !== 0) {
        addNotif(
          `${sDiff > 0 ? '+' : ''}${sDiff}% Smarts`,
          sDiff > 0,
          <GraduationCap className="w-4 h-4 text-sky-400 animate-bounce" />
        );
      }

      // Looks
      const lDiff = Math.round(stats.looks) - Math.round(prevStatsRef.current.looks);
      if (lDiff !== 0) {
        addNotif(
          `${lDiff > 0 ? '+' : ''}${lDiff}% Looks`,
          lDiff > 0,
          <Sparkles className="w-4 h-4 text-fuchsia-400 animate-bounce" />
        );
      }

      // Karma
      const kDiff = Math.round(stats.karma) - Math.round(prevStatsRef.current.karma);
      if (kDiff !== 0) {
        addNotif(
          `${kDiff > 0 ? '+' : ''}${kDiff}% Karma`,
          kDiff > 0,
          <Compass className="w-4 h-4 text-indigo-400" />
        );
      }

      // Stress
      const stDiff = Math.round(stats.stress) - Math.round(prevStatsRef.current.stress);
      if (stDiff !== 0) {
        addNotif(
          `${stDiff > 0 ? '+' : ''}${stDiff}% Stress`,
          stDiff < 0, // Lower stress is positive!
          <Flame className="w-4 h-4 text-orange-500" />
        );
      }

      // Cash
      const cDiff = cashBalance - prevCashRef.current;
      if (cDiff !== 0) {
        addNotif(
          `${cDiff > 0 ? '+' : ''}${formatCurrency(cDiff)} Wallet`,
          cDiff > 0,
          <Coins className="w-4 h-4 text-green-400" />
        );
      }

      if (newNotifications.length > 0) {
        setNotifications((prev) => [...prev, ...newNotifications].slice(-6));
      }
    }

    prevStatsRef.current = { ...stats };
    prevCashRef.current = cashBalance;
  }, [stats, finances, characterInfo]);

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  // Trigger default character generation of current session if first launch
  useEffect(() => {
    // We let the user manually hitconceive or trigger quickstart so they see the generator!
  }, []);

  const handleConceive = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Choose fallback names if left blank
    const selectedFirst = firstName.trim() || (gender === 'Male' 
      ? MALE_FIRST_NAMES[Math.floor(Math.random() * MALE_FIRST_NAMES.length)]
      : FEMALE_FIRST_NAMES[Math.floor(Math.random() * FEMALE_FIRST_NAMES.length)]);
    const selectedLast = lastName.trim() || LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];

    // Generates family relationships
    const numParents = Math.random() > 0.5 ? 2 : 1;
    const numSiblings = Math.floor(Math.random() * 4); // 0 to 3
    const rels = [];

    const getRandomName = (g: 'Male' | 'Female') => {
      const names = g === 'Male' ? MALE_FIRST_NAMES : FEMALE_FIRST_NAMES;
      return names[Math.floor(Math.random() * names.length)];
    };

    const motherAge = Math.floor(Math.random() * 15) + 21; // 21 to 35
    const fatherAge = Math.floor(Math.random() * 15) + 23; // 23 to 37

    if (numParents === 2) {
      rels.push({
        id: `npc-mother-${Math.random()}`,
        name: `${getRandomName('Female')} ${selectedLast}`,
        relationshipType: 'Parent' as const,
        relationshipValue: Math.floor(Math.random() * 30) + 60,
        generosity: Math.floor(Math.random() * 80) + 15,
        money: Math.floor(Math.random() * 80000) + 20000,
        isDead: false,
        age: motherAge,
      });
      rels.push({
        id: `npc-father-${Math.random()}`,
        name: `${getRandomName('Male')} ${selectedLast}`,
        relationshipType: 'Parent' as const,
        relationshipValue: Math.floor(Math.random() * 30) + 60,
        generosity: Math.floor(Math.random() * 80) + 15,
        money: Math.floor(Math.random() * 80000) + 20000,
        isDead: false,
        age: fatherAge,
      });
    } else {
      const pGender = Math.random() > 0.5 ? 'Male' : 'Female';
      const pAge = pGender === 'Male' ? fatherAge : motherAge;
      rels.push({
        id: `npc-singleparent-${Math.random()}`,
        name: `${getRandomName(pGender)} ${selectedLast}`,
        relationshipType: 'Parent' as const,
        relationshipValue: Math.floor(Math.random() * 30) + 60,
        generosity: Math.floor(Math.random() * 80) + 15,
        money: Math.floor(Math.random() * 80000) + 20000,
        isDead: false,
        age: pAge,
      });
    }

    for (let i = 0; i < numSiblings; i++) {
      const sibGender = Math.random() > 0.5 ? 'Male' : 'Female';
      const sibAge = Math.floor(Math.random() * 10) + 2; // 2 to 11 years older
      rels.push({
        id: `npc-sibling-${i}-${Math.random()}`,
        name: `${getRandomName(sibGender)} ${selectedLast}`,
        relationshipType: 'Sibling' as const,
        relationshipValue: Math.floor(Math.random() * 40) + 50,
        generosity: Math.floor(Math.random() * 60) + 20,
        money: Math.floor(Math.random() * 200) + 10,
        isDead: false,
        age: sibAge,
      });
    }

    // Directly alter store fields to boot custom character
    useGameStore.setState(() => {
      const stats = {
        happiness: Math.floor(Math.random() * 30) + 60, // 60 to 90
        health: Math.floor(Math.random() * 30) + 60,    // 60 to 90
        smarts: Math.floor(Math.random() * 40) + 40,    // 40 to 80
        looks: Math.floor(Math.random() * 40) + 40,     // 40 to 85
        karma: Math.floor(Math.random() * 25) + 60,     // 60 to 85
        stress: 0,
      };

      const finances = {
        cashBalance: 0,
        annualSalary: 0,
        annualDebt: 0,
      };

      const info = {
        firstName: selectedFirst,
        lastName: selectedLast,
        age: 0,
        gender,
        country,
        hasLicense: false,
        isDead: false,
        currentOccupation: 'Baby',
      };

      const educationInit = {
        currentStage: 'None' as const,
        currentMajor: null,
        highestDegreeEarned: 'None' as const,
        grades: 0,
      };

      return {
        characterInfo: info,
        stats,
        finances,
        assets: [],
        relationships: rels,
        education: educationInit,
        log: [
          `You were born a baby ${gender.toLowerCase()} in ${country}.`,
          `Your parents named you ${selectedFirst} ${selectedLast}.`,
          `Current Year: ${new Date().getFullYear()}. Your pure randomized health parameters are looking sturdy!`
        ],
        currentEvent: null,
        lastChoiceOutcome: null,
      };
    });
    
    // Default tab back to journal
    setActiveTab('journal');
  };

  const handleQuickStart = () => {
    initializeCharacter();
    setActiveTab('journal');
  };

  // If character is not initialized, render the Character Creator landing card in the portrait container
  if (!characterInfo) {
    return (
      <main className={`min-h-screen w-full ${isLightMode ? 'bg-[#F1F5F9]' : 'bg-[#0B0F19]'} transition-colors duration-300 flex items-center justify-center select-none font-sans p-0 sm:p-4 animate-fade-in`}>
        <div id="welcome_setup_card" className={`max-w-[440px] w-full min-h-screen sm:min-h-0 sm:h-[840px] sm:max-h-[92vh] sm:rounded-[36px] sm:border ${isLightMode ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#111827] border-slate-800/80 text-slate-100'} shadow-2xl relative overflow-y-auto flex flex-col p-6 scrollbar-none`}>
          {/* Theme Toggle Button */}
          <div className="absolute top-5 right-5 z-20">
            <button 
              type="button"
              onClick={toggleTheme} 
              className={`p-2.5 rounded-full border transition-all duration-200 cursor-pointer active:scale-95 ${isLightMode ? 'bg-slate-50 border-slate-200 text-amber-500 shadow-sm hover:bg-slate-100' : 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700'}`}
              title="Toggle Theme"
            >
              {isLightMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Decorative glows */}
          <div className="absolute top-0 left-0 w-44 h-44 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-44 h-44 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="text-center space-y-2 mt-4">
            <div className={`inline-flex items-center gap-1.5 ${isLightMode ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-[#121826] text-teal-400 border-slate-800'} font-mono text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full border shadow-sm`}>
              <Sparkles className="w-3 h-3 text-teal-500 animate-spin" style={{ animationDuration: '6s' }} />
              FateLife Engine v1.0.0
            </div>
            <h1 className={`text-3xl font-black tracking-tight ${isLightMode ? 'text-slate-950' : 'text-white'} mt-1`}>
              FATE<span className={isLightMode ? 'text-green-600' : 'text-teal-400'}>LIFE</span>
            </h1>
            <p className={`text-xs ${isLightMode ? 'text-slate-500' : 'text-slate-400'} max-w-xs mx-auto leading-relaxed font-medium`}>
              Experience a mobile-first, deterministic life simulation. Drive careers, study hard, buy real estate, gamble, adapt to events, and survive the test of time!
            </p>
          </div>

          {/* Setup Form */}
          <form onSubmit={handleConceive} className={`space-y-4 pt-4 border-t ${isLightMode ? 'border-slate-100' : 'border-slate-800/80'} mt-4 flex-1 flex flex-col justify-between`}>
            <div className="space-y-4">
              <h2 className={`text-xs sm:text-sm font-bold tracking-wide uppercase ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Conceive New Character</h2>
              
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className={`block text-xs sm:text-sm font-bold uppercase ${isLightMode ? 'text-slate-600' : 'text-slate-400'} mb-1.5`}>First Name</label>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Random Name"
                    className={`w-full ${isLightMode ? 'bg-slate-50 border-slate-200 text-slate-800 focus:border-green-500' : 'bg-[#121826] border-slate-800 text-white focus:border-teal-500'} rounded-2xl px-5 py-3 text-sm focus:outline-none font-sans shadow-inner placeholder-slate-400 transition font-bold`}
                  />
                </div>
                <div>
                  <label className={`block text-xs sm:text-sm font-bold uppercase ${isLightMode ? 'text-slate-600' : 'text-slate-400'} mb-1.5`}>Last Name</label>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Random Surname"
                    className={`w-full ${isLightMode ? 'bg-slate-50 border-slate-200 text-slate-800 focus:border-green-500' : 'bg-[#121826] border-slate-800 text-white focus:border-teal-500'} rounded-2xl px-5 py-3 text-sm focus:outline-none font-sans shadow-inner placeholder-slate-400 transition font-bold`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className={`block text-xs sm:text-sm font-bold uppercase ${isLightMode ? 'text-slate-600' : 'text-slate-400'} mb-1.5`}>Biological Gender</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGender('Male')}
                      className={`py-3 px-4 text-sm font-bold rounded-2xl border transition-all cursor-pointer ${
                        gender === 'Male'
                          ? isLightMode ? 'bg-green-100 border-green-500 text-green-700 shadow-sm' : 'bg-teal-950/40 border-teal-500 text-teal-300 shadow-sm'
                          : isLightMode ? 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100' : 'bg-[#121826] border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('Female')}
                      className={`py-3 px-4 text-sm font-bold rounded-2xl border transition-all cursor-pointer ${
                        gender === 'Female'
                          ? isLightMode ? 'bg-pink-100 border-pink-400 text-pink-700 shadow-sm' : 'bg-pink-950/20 border-pink-500 text-pink-300 shadow-sm'
                          : isLightMode ? 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100' : 'bg-[#121826] border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>

                <div>
                  <label className={`block text-xs sm:text-sm font-bold uppercase ${isLightMode ? 'text-slate-600' : 'text-slate-400'} mb-1.5`}>Country of Birth</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={`w-full ${isLightMode ? 'bg-slate-50 border-slate-200 text-slate-800 focus:border-green-500' : 'bg-[#121826] border-slate-800 text-slate-300 focus:border-teal-500'} rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none font-sans cursor-pointer`}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-4 mt-auto">
              <button
                type="submit"
                className={`w-full ${isLightMode ? 'bg-green-600 hover:bg-green-500 shadow-green-200' : 'bg-teal-600 hover:bg-teal-500 shadow-teal-950/20'} text-white font-black py-3.5 px-4 rounded-full text-sm transition-all duration-200 transform shadow-lg flex items-center justify-center gap-1.5 cursor-pointer`}
              >
                <Baby className="w-4 h-4 text-white" /> Conceive Custom Character
              </button>
              <button
                type="button"
                onClick={handleQuickStart}
                className={`w-full ${isLightMode ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700' : 'bg-[#121826] hover:bg-slate-800 border-slate-800 text-teal-400'} font-bold py-3 px-4 rounded-full text-xs transition-all flex items-center justify-center gap-1 cursor-pointer`}
              >
                Quick Start (Randomized Life)
              </button>
            </div>
          </form>

          {/* Footer warning */}
          <div className={`p-3 rounded-2xl border text-center mt-4 mb-2 ${isLightMode ? 'bg-slate-50 border-slate-100 text-slate-500' : 'bg-[#121826] border-slate-800/85 text-slate-500'}`}>
            <p className="text-[10px] flex items-center justify-center gap-1 font-bold font-mono">
              <Scale className="w-3.5 h-3.5 text-slate-500" />
              Runs 100% locally on standard probability trees.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Calculate net asset equity total subtracting outstanding loans
  const assetEquity = assets.reduce((sum, a) => sum + a.currentValue, 0);
  const outstandingLoansValue = assets.reduce((sum, a) => sum + (a.isFinanced && a.loanDetails ? a.loanDetails.principalRemaining : 0), 0);
  const netWorth = finances.cashBalance + assetEquity - outstandingLoansValue;

  // Render Graveyard modal/screen if they passed away
  if (characterInfo.isDead) {
    return (
      <main className={`min-h-screen w-full ${isLightMode ? 'bg-[#F1F5F9]' : 'bg-[#0B0F19]'} transition-colors duration-300 flex items-center justify-center p-0 sm:p-4 select-none`}>
        <div id="graveyard_setup_card" className={`max-w-[440px] w-full min-h-screen sm:min-h-0 sm:h-[840px] sm:max-h-[92vh] sm:rounded-[36px] sm:border ${isLightMode ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#111827] border-slate-800/80 text-slate-100'} shadow-2xl relative overflow-y-auto flex flex-col p-6 scrollbar-none justify-between text-center`}>
          
          {/* Theme Toggle Button */}
          <div className="absolute top-5 right-5 z-20">
            <button 
              type="button"
              onClick={toggleTheme} 
              className={`p-2.5 rounded-full border transition-all duration-200 cursor-pointer active:scale-95 ${isLightMode ? 'bg-slate-50 border-slate-200 text-amber-500 shadow-sm hover:bg-slate-100' : 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700'}`}
              title="Toggle Theme"
            >
              {isLightMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Gravestone overlay glow */}
          <div className="absolute top-0 inset-x-0 h-40 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Icon */}
          <div className={`w-16 h-16 ${isLightMode ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-rose-950/20 border-rose-500/30 text-rose-400'} border rounded-full flex items-center justify-center mx-auto animate-pulse mt-4`}>
            <Skull className="w-8 h-8 text-rose-500" />
          </div>

          {/* Epitaph */}
          <div className="space-y-1 mt-2">
            <p className={`text-xs font-bold tracking-widest uppercase ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`}>In Loving Memory Of</p>
            <h1 className={`text-3xl font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              {characterInfo.firstName} {characterInfo.lastName}
            </h1>
            <p className={`text-sm font-bold font-mono px-4 py-1.5 rounded-full inline-block mt-1 ${isLightMode ? 'bg-rose-50 border border-rose-100 text-rose-700' : 'bg-rose-950/30 border border-rose-900/40 text-rose-300'}`}>
              Aged {characterInfo.age} • Died of: {characterInfo.deathReason || 'Old Age'}
            </p>
          </div>

          {/* Stats Summary */}
          <div className={`p-4 rounded-2xl border grid grid-cols-2 gap-4 text-left max-w-md mx-auto mt-4 w-full ${isLightMode ? 'bg-slate-50 border-slate-150' : 'bg-slate-950 border-slate-850/60'}`}>
            <div>
              <p className={`text-[10px] font-bold uppercase ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`}>Birthplace</p>
              <p className={`text-xs sm:text-sm font-bold mt-0.5 ${isLightMode ? 'text-slate-800' : 'text-white'}`}>{characterInfo.country}</p>
            </div>
            <div>
              <p className={`text-[10px] font-bold uppercase ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`}>Last Occupation</p>
              <p className={`text-xs sm:text-sm font-bold mt-0.5 ${isLightMode ? 'text-slate-800' : 'text-white'}`}>{characterInfo.currentOccupation}</p>
            </div>
            <div>
              <p className={`text-[10px] font-bold uppercase ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`}>Final Net Worth</p>
              <p className="text-xs sm:text-sm font-black text-emerald-500 font-mono mt-0.5">{formatCurrency(netWorth)}</p>
            </div>
            <div>
              <p className={`text-[10px] font-bold uppercase ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`}>License Status</p>
              <p className="text-xs sm:text-sm font-bold text-sky-500 mt-0.5">{characterInfo.hasLicense ? 'Driver' : 'No License'}</p>
            </div>
          </div>

          {/* Logs scroll review */}
          <div className="text-left space-y-2 mt-4 flex-1 flex flex-col justify-end min-h-[160px]">
            <h3 className={`text-xs uppercase tracking-widest font-bold border-b pb-1.5 font-mono ${isLightMode ? 'text-slate-500 border-slate-100' : 'text-slate-400 border-slate-850'}`}>
              Life Review Timeline
            </h3>
            <div className={`p-3 rounded-2xl border h-[150px] overflow-y-auto space-y-2.5 text-xs font-medium leading-relaxed ${isLightMode ? 'bg-slate-50 border-slate-100 text-slate-600' : 'bg-slate-950/50 border-slate-850 text-slate-400'}`}>
              {log.map((l, index) => (
                <div key={index} className={`border-l pl-2.5 ${isLightMode ? 'border-slate-300' : 'border-slate-800'}`}>
                  {l}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-4 mt-4 mb-2">
            <button
              onClick={restartGame}
              className={`w-full ${isLightMode ? 'bg-green-600 hover:bg-green-500 shadow-green-200' : 'bg-teal-600 hover:bg-teal-500 shadow-teal-950/20'} text-white font-black py-3.5 px-4 rounded-full text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transform transition duration-200 active:scale-95`}
            >
              <RefreshCw className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} /> Start Another Life (New Generation)
            </button>
            <p className={`text-[10px] font-bold font-mono ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Your scores were safely preserved in the database! Check the Ancestors Leaderboard.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const getStatColor = (val: number) => {
    if (val >= 80) return 'bg-emerald-500';
    if (val >= 50) return 'bg-teal-500';
    if (val >= 25) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <main className={`min-h-screen w-full ${isLightMode ? 'bg-[#F1F5F9]' : 'bg-[#0B0F19]'} text-slate-100 flex items-center justify-center select-none font-sans p-0 sm:p-4 transition-colors duration-300`}>
      {/* Central Portrait Mobile Canvas Viewport */}
      <div className={`max-w-[440px] w-full min-h-screen sm:min-h-0 sm:h-[840px] sm:max-h-[92vh] sm:rounded-[36px] sm:border ${isLightMode ? 'bg-white border-slate-200/80 text-slate-800' : 'bg-[#111827] border-slate-800/80 text-slate-100'} shadow-2xl relative overflow-hidden flex flex-col transition-colors duration-300`}>
        
        {/* Top Header Bar */}
        <div className={`border-b px-4 py-3.5 flex flex-col gap-1 shrink-0 z-20 transition-colors duration-300 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#1e293b] border-slate-800'}`}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-xs font-black tracking-tight flex items-center gap-1.5 font-mono ${isLightMode ? 'text-slate-950' : 'text-white'}`}>
                👑 FateLife • {characterInfo.firstName} {characterInfo.lastName}
              </h1>
              <p className={`text-[10px] font-bold font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                {characterInfo.gender} from {characterInfo.country} {prisonSentence !== null && '• 🚨 In Prison'}
              </p>
            </div>
            
            <div className="flex items-center gap-3 text-right">
              {/* Theme Toggle Button */}
              <button 
                type="button"
                onClick={toggleTheme} 
                className={`p-1.5 rounded-full border transition-all duration-200 cursor-pointer active:scale-95 ${isLightMode ? 'bg-white border-slate-200 text-amber-500 shadow-sm' : 'bg-slate-800 border-slate-700 text-yellow-400'}`}
                title="Toggle Theme"
              >
                {isLightMode ? '☀️' : '🌙'}
              </button>
              <div>
                <span className={`text-[9px] uppercase font-bold tracking-widest block leading-none ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`}>Age</span>
                <span className={`text-lg font-black font-sans ${isLightMode ? 'text-amber-500' : 'text-amber-400'}`}>{characterInfo.age}</span>
              </div>
            </div>
          </div>
          
          <div className={`flex justify-between items-center mt-1.5 pt-1.5 border-t ${isLightMode ? 'border-slate-200/60' : 'border-slate-800/40'}`}>
            <span className={`text-[11px] font-extrabold ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>Wallet Balance:</span>
            <span className={`text-xs font-extrabold font-mono ${finances.cashBalance >= 0 ? 'text-green-600' : 'text-rose-500'}`}>
              {formatCurrency(finances.cashBalance)}
            </span>
          </div>
        </div>

        {/* Central Core (scrolls dynamically) */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-none pb-32 relative">
          {activeTab !== 'journal' && prisonSentence === null && (
            <button
              onClick={() => setActiveTab('journal')}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 border font-black text-xs rounded-full transition duration-150 mb-1 cursor-pointer active:scale-98 ${isLightMode ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200' : 'bg-[#121826] border-slate-800/80 text-teal-400 hover:bg-slate-800'}`}
            >
              ⬅️ Back to Life Timeline
            </button>
          )}

          {prisonSentence !== null ? (
            <div className="animate-slide-up">
              <PrisonYardPanel />
            </div>
          ) : (
            <>
              {activeTab === 'journal' && <TimelineLog />}
              {activeTab === 'education' && <EducationPanel />}
              {activeTab === 'relationships' && <RelationshipsPanel />}
              {activeTab === 'careers' && <CareersPanel />}
              {activeTab === 'assets' && <AssetsPanel />}
              {activeTab === 'activities' && (
                <div className="space-y-6">
                  {/* Category Shortcut directory for school, jobs, relationships, graveyard */}
                  <div>
                    <h3 className={`text-xs uppercase tracking-wider font-extrabold mb-2.5 font-sans ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      🧭 Quick Navigate Deck
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setActiveTab('education')}
                        className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 border transition duration-150 cursor-pointer active:scale-95 ${isLightMode ? 'bg-slate-50 border-slate-200 hover:bg-slate-100' : 'bg-[#1a2238] border-slate-800 hover:bg-slate-850'}`}
                      >
                        <span className="text-xl">🎓</span>
                        <span className={`text-[11px] font-black ${isLightMode ? 'text-slate-800' : 'text-white'}`}>School & Study</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('careers')}
                        className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 border transition duration-150 cursor-pointer active:scale-95 ${isLightMode ? 'bg-slate-50 border-slate-200 hover:bg-slate-100' : 'bg-[#1a2238] border-slate-800 hover:bg-slate-850'}`}
                      >
                        <span className="text-xl">💼</span>
                        <span className={`text-[11px] font-black ${isLightMode ? 'text-slate-800' : 'text-white'}`}>Jobs & Careers</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('relationships')}
                        className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 border transition duration-150 cursor-pointer active:scale-95 ${isLightMode ? 'bg-slate-50 border-slate-200 hover:bg-slate-100' : 'bg-[#1a2238] border-slate-800 hover:bg-slate-850'}`}
                      >
                        <span className="text-xl">👥</span>
                        <span className={`text-[11px] font-black ${isLightMode ? 'text-slate-800' : 'text-white'}`}>Relationships</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('graveyard')}
                        className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 border transition duration-150 cursor-pointer active:scale-95 ${isLightMode ? 'bg-slate-50 border-slate-200 hover:bg-slate-100' : 'bg-[#1a2238] border-slate-800 hover:bg-slate-850'}`}
                      >
                        <span className="text-xl">🪦</span>
                        <span className={`text-[11px] font-black ${isLightMode ? 'text-slate-800' : 'text-white'}`}>Graveyard Hall</span>
                      </button>
                    </div>
                  </div>
                  <div className={`border-t pt-4 ${isLightMode ? 'border-slate-100' : 'border-slate-800/40'}`}>
                    <ActivitiesPanel />
                  </div>
                </div>
              )}
              {activeTab === 'graveyard' && <LeaderboardPanel />}
            </>
          )}
        </div>

        {/* Sticky Bottom Actions Frame */}
        <div className={`absolute bottom-0 inset-x-0 backdrop-blur-md border-t p-4 flex flex-col gap-3 shrink-0 z-30 transition-colors duration-300 ${isLightMode ? 'bg-white/95 border-slate-200/80 shadow-[0_-8px_20px_rgba(0,0,0,0.03)]' : 'bg-slate-950/95 border-slate-850'}`}>
          <div className="flex items-stretch gap-2.5">
            {/* Assets & Market Button */}
            <button
              onClick={() => setActiveTab(activeTab === 'assets' ? 'journal' : 'assets')}
              className={`flex-1 py-2.5 px-1.5 rounded-full border text-xs font-black transition duration-150 flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95
                ${activeTab === 'assets'
                  ? isLightMode
                    ? 'bg-slate-100 text-slate-850 border-slate-400 shadow-md'
                    : 'bg-slate-800 text-white border-slate-600 shadow-md'
                  : isLightMode
                    ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-850'
                    : 'bg-[#121826] border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <span className="text-sm">🏠</span>
              <span className="text-[10px] font-extrabold tracking-tight text-center leading-tight">Assets</span>
            </button>

            {/* AGE UP BUTTON */}
            <button
              onClick={ageUp}
              disabled={currentEvent !== null || activeEventQueue.length > 0 || lastChoiceOutcome !== null}
              className={`flex-1 py-2.5 px-1.5 rounded-full font-black text-xs flex flex-col items-center justify-center gap-0.5 transition duration-200 shadow-lg border
                ${(currentEvent !== null || activeEventQueue.length > 0 || lastChoiceOutcome !== null)
                  ? isLightMode
                    ? 'bg-slate-150 border-slate-200 opacity-60 cursor-not-allowed text-slate-400'
                    : 'bg-slate-800 border-slate-750 opacity-50 cursor-not-allowed text-slate-500'
                  : 'bg-green-600 border-green-700 hover:bg-green-500 hover:border-green-600 text-white animate-pulse shadow-green-600/10 cursor-pointer font-black'}`}
              style={{ animationDuration: '2.5s' }}
            >
              <span className="text-sm">⌛</span>
              <span className="text-[10px] tracking-tight font-black uppercase">AGE UP</span>
            </button>

            {/* Activities Deck Button */}
            <button
              onClick={() => setActiveTab(activeTab === 'activities' ? 'journal' : 'activities')}
              className={`flex-1 py-2.5 px-1.5 rounded-full border text-xs font-black transition duration-150 flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95
                ${activeTab === 'activities'
                  ? isLightMode
                    ? 'bg-slate-100 text-slate-850 border-slate-400 shadow-md'
                    : 'bg-slate-800 text-white border-slate-600 shadow-md'
                  : isLightMode
                    ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-850'
                    : 'bg-[#121826] border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <span className="text-sm">🧭</span>
              <span className="text-[10px] font-extrabold tracking-tight text-center leading-tight">Activities</span>
            </button>
          </div>

          {/* 4 Attributes tight 2x2 grid */}
          <div className={`grid grid-cols-2 gap-x-3 gap-y-1.5 pt-2 border-t ${isLightMode ? 'border-slate-100' : 'border-slate-800/50'}`}>
            {/* Happiness */}
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className={`flex items-center gap-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>😊 Happiness</span>
                <span className={`font-mono font-bold ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>{Math.round(stats.happiness)}%</span>
              </div>
              <div className={`w-full ${isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-[#121826] border-slate-800/40'} h-1.5 rounded-full overflow-hidden border`}>
                <div className={`h-full ${getStatColor(stats.happiness)}`} style={{ width: `${stats.happiness}%` }} />
              </div>
            </div>

            {/* Health */}
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className={`flex items-center gap-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>❤️ Health</span>
                <span className={`font-mono font-bold ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>{Math.round(stats.health)}%</span>
              </div>
              <div className={`w-full ${isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-[#121826] border-slate-800/40'} h-1.5 rounded-full overflow-hidden border`}>
                <div className={`h-full ${getStatColor(stats.health)}`} style={{ width: `${stats.health}%` }} />
              </div>
            </div>

            {/* Smarts */}
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className={`flex items-center gap-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>🎓 Smarts</span>
                <span className={`font-mono font-bold ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>{Math.round(stats.smarts)}%</span>
              </div>
              <div className={`w-full ${isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-[#121826] border-slate-800/40'} h-1.5 rounded-full overflow-hidden border`}>
                <div className={`h-full ${getStatColor(stats.smarts)}`} style={{ width: `${stats.smarts}%` }} />
              </div>
            </div>

            {/* Looks */}
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className={`flex items-center gap-1 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>✨ Looks</span>
                <span className={`font-mono font-bold ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>{Math.round(stats.looks)}%</span>
              </div>
              <div className={`w-full ${isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-[#121826] border-slate-800/40'} h-1.5 rounded-full overflow-hidden border`}>
                <div className={`h-full ${getStatColor(stats.looks)}`} style={{ width: `${stats.looks}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Stat Shift Notifications */}
        <div className="absolute top-16 right-4 z-50 flex flex-col gap-1.5 pointer-events-none max-w-[280px]">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold font-mono tracking-wide shadow-lg backdrop-blur-md animate-slide-fade pointer-events-auto
                ${n.isPositive 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-emerald-200/20' 
                  : 'bg-rose-50 border-rose-200 text-rose-800 shadow-rose-200/20'}`}
            >
              <div className={`p-0.5 rounded-lg ${n.isPositive ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                {n.icon}
              </div>
              <span>{n.text}</span>
            </div>
          ))}
        </div>

        {/* Pop-up Modals (absolute-rendered overlays) */}
        <EventModal />
        <OutcomeModal />
        <CourtroomModal />
      </div>
    </main>
  );
}

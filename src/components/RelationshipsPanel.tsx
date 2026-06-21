import React, { useState } from 'react';
import { useGameStore } from '../gameStore';
import PetShoppingMarketplace from './PetShoppingMarketplace';
import { NPC } from '../types';
import { 
  Heart, 
  Smile, 
  MessageSquare, 
  Banknote, 
  ChevronRight, 
  X, 
  Sparkles, 
  Users,
  Baby,
  SmilePlus,
  ShieldAlert,
  Frown,
  HeartCrack,
  XCircle,
  PawPrint,
  Bone,
  Activity as Stethoscope
} from 'lucide-react';
import { formatCurrency } from '../utils';

export default function RelationshipsPanel() {
  const [activeSubTab, setActiveSubTab] = useState<'family' | 'pets'>('family');
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [adoptionMsg, setAdoptionMsg] = useState<{ success: boolean; text: string } | null>(null);
  const [showPetShopping, setShowPetShopping] = useState(false);

  const relationships = useGameStore((state) => state.relationships) || [];
  const pets = useGameStore((state) => state.pets) || [];
  const adoptPet = useGameStore((state) => state.adoptPet);
  const interactWithPet = useGameStore((state) => state.interactWithPet);

  const interactWithNPC = useGameStore((state) => state.interactWithNPC);
  const characterInfo = useGameStore((state) => state.characterInfo);
  const annualActionsPerformed = useGameStore((state) => state.annualActionsPerformed) || [];

  const proposeToPartner = useGameStore((state) => state.proposeToPartner);
  const handlePrenupDecisionStore = useGameStore((state) => state.handlePrenupDecision);
  const haveAChild = useGameStore((state) => state.haveAChild);
  const breakUpOrDivorce = useGameStore((state) => state.breakUpOrDivorce);
  const maritalStatus = useGameStore((state) => state.maritalStatus);
  
  const [selectedNpcId, setSelectedNpcId] = useState<string | null>(null);

  // States for proposing marriage and prenups
  const [showProposeRingSelector, setShowProposeRingSelector] = useState(false);
  const [proposalMsg, setProposalMsg] = useState<{ success: boolean; text: string } | null>(null);
  const [showPrenupModal, setShowPrenupModal] = useState(false);
  const [marriageResult, setMarriageResult] = useState<string | null>(null);
  const [childResult, setChildResult] = useState<{ success: boolean; text: string } | null>(null);

  const handleSelectNpc = (npcId: string | null) => {
    setSelectedNpcId(npcId);
    setShowProposeRingSelector(false);
    setProposalMsg(null);
    setShowPrenupModal(false);
    setMarriageResult(null);
    setChildResult(null);
  };
  
  // Filter to only living relatives as requested
  const livingRelatives = relationships.filter(npc => !npc.isDead);
  
  // Dynamic fetch of current selected NPC to always display updated Zustand-driven values
  const activeNpc = relationships.find(n => n.id === selectedNpcId && !n.isDead);
  const activePet = pets.find(p => p.id === selectedPetId);

  const handleProposeClick = (cost: number) => {
    if (!activeNpc) return;
    const res = proposeToPartner(activeNpc.id, cost);
    if (res.success) {
      setProposalMsg({ success: true, text: res.msg });
      if (res.requiresPrenupDecision) {
        setShowPrenupModal(true);
      }
    } else {
      setProposalMsg({ success: false, text: res.msg });
    }
  };

  const handlePrenupDecision = (sign: boolean) => {
    if (!activeNpc) return;
    const res = handlePrenupDecisionStore(activeNpc.id, sign);
    setMarriageResult(res.msg);
    setShowPrenupModal(false);
  };

  const handleHaveChildClick = () => {
    if (!activeNpc) return;
    const res = haveAChild(activeNpc.id);
    setChildResult({ success: res.success, text: res.msg });
  };

  // Helper to resolve specific relative role strings
  const getRoleLabel = (npc: NPC) => {
    if (npc.relationshipType === 'Parent') {
      const isMale = npc.name.includes('Father') || npc.id.includes('father') || (npc.name.toLowerCase().match(/\b(father|dad|mr)\b/) !== null);
      // Wait, let's look at how we generated: ID contains 'mother', 'father', 'singleparent'
      if (npc.id.includes('mother')) return 'Mother';
      if (npc.id.includes('father')) return 'Father';
      return 'Parent';
    }
    return npc.relationshipType; // e.g. Sibling, Partner, Child
  };

  // Helper for color rating relationshipValue
  const getRelationColorClass = (val: number) => {
    if (val >= 75) return 'bg-emerald-500';
    if (val >= 40) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const getRelationTextColorClass = (val: number) => {
    if (val >= 75) return 'text-emerald-400';
    if (val >= 40) return 'text-amber-400';
    return 'text-rose-400';
  };

  if (!characterInfo) return null;

  return (
    <div id="relationships_section" className="space-y-6">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-400" />
            Relationships Desk
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Nurture bonds, ask for allowance, adopt pets, and maintain family closeness.
          </p>
        </div>
        <span className="text-xs bg-slate-800 text-teal-400 px-3 py-1.5 rounded-full font-mono border border-slate-700">
          Family: {livingRelatives.length} • Pets: {pets.length}
        </span>
      </div>

      {/* Sub Tab selection */}
      <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-850 gap-1.5">
        <button
          onClick={() => setActiveSubTab('family')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${activeSubTab === 'family' ? 'bg-teal-600/20 border border-teal-500/20 text-teal-300 font-extrabold' : 'text-slate-500 hover:text-slate-350 bg-transparent'}`}
        >
          <Users className="w-4 h-4" />
          Family Members ({livingRelatives.length})
        </button>
        <button
          onClick={() => setActiveSubTab('pets')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${activeSubTab === 'pets' ? 'bg-teal-600/20 border border-teal-500/20 text-teal-300 font-extrabold' : 'text-slate-500 hover:text-slate-350 bg-transparent'}`}
          id="pet_desk_tab"
        >
          <PawPrint className="w-4 h-4" />
          Our Pets ({pets.length})
        </button>
      </div>

      {activeSubTab === 'family' ? (
        livingRelatives.length === 0 ? (
          <div className="bg-slate-950/40 rounded-2xl p-8 border border-slate-850 text-center space-y-3">
            <Frown className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-semibold text-slate-300">Isolated Life</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              You do not have any living family members or relationships currently. Restart a new life to generate a fresh social graph!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {livingRelatives.map((npc) => {
              const role = getRoleLabel(npc);
              return (
                <button
                  key={npc.id}
                  onClick={() => handleSelectNpc(npc.id)}
                  className="w-full text-left bg-slate-950/70 hover:bg-slate-900 border border-slate-850 hover:border-slate-755 p-4 rounded-xl flex items-center justify-between transition-all duration-150 shadow-sm cursor-pointer group outline-none focus:ring-1 focus:ring-teal-500/50"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400 group-hover:text-teal-300 transition shrink-0">
                      {npc.relationshipType === 'Parent' ? (
                        <Heart className="w-5 h-5 text-teal-400" />
                      ) : npc.relationshipType === 'Partner' ? (
                        <Heart className="w-5 h-5 text-rose-500 fill-rose-500/10" />
                      ) : (
                        <Baby className="w-5 h-5 text-sky-450" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white truncate group-hover:text-teal-300 transition">
                        {npc.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800">
                          {role}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          Age {npc.age}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right w-24 hidden sm:block">
                      <span className={`text-[10px] font-mono font-bold ${getRelationTextColorClass(npc.relationshipValue)}`}>
                        Relationship {Math.round(npc.relationshipValue)}%
                      </span>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                        <div 
                          className={`h-full ${getRelationColorClass(npc.relationshipValue)} transition-all duration-300`}
                          style={{ width: `${Math.round(npc.relationshipValue)}%` }}
                        />
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transform transition" />
                  </div>
                </button>
              );
            })}
          </div>
        )
      ) : showPetShopping ? (
        <PetShoppingMarketplace onClose={() => setShowPetShopping(false)} />
      ) : (
        <div className="space-y-6" id="pet_desk_subview">
          {/* Decoupled Pet Shopping Launchpad */}
          <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <SmilePlus className="w-4 h-4 text-teal-400" />
                Animal Markets & Adoption
              </h3>
              <p className="text-xs text-slate-400">
                Browse localized shelters, certified breeders, or black market wildlife smugglers.
              </p>
            </div>
            <button
              onClick={() => setShowPetShopping(true)}
              className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 cursor-pointer text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition whitespace-nowrap shrink-0 self-start sm:self-auto hover:scale-[1.02] active:scale-95 duration-150"
              id="open_pet_shopping_btn"
            >
              🐾 Open Pet Shopping
            </button>
          </div>

          {/* Living companions layout */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <PawPrint className="w-4 h-4 text-teal-400" />
              Living Pets List ({pets.length})
            </h3>

            {pets.length === 0 ? (
              <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-8 text-center space-y-2">
                <Frown className="w-8 h-8 text-slate-700 mx-auto" />
                <p className="text-xs text-slate-400">You do not own any pets. Purchase or adopt companion animals from standard shelters above!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pets.map((pet) => {
                  return (
                    <button
                      key={pet.id}
                      onClick={() => setSelectedPetId(pet.id)}
                      className="w-full text-left bg-slate-950/70 hover:bg-slate-900 border border-slate-850 hover:border-slate-750 p-4 rounded-xl flex items-center justify-between transition group cursor-pointer outline-none focus:ring-1 focus:ring-teal-500/50"
                    >
                      <div className="flex items-center gap-3.5 min-w-0 pr-2">
                        <div className="w-10 h-10 rounded-full bg-teal-950/20 border border-teal-905 flex items-center justify-center text-teal-400 group-hover:text-teal-300 shrink-0">
                          <PawPrint className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-white group-hover:text-teal-400 transition truncate flex items-center gap-1.5 leading-tight">
                            {pet.name}
                            <span className="text-[10px] text-slate-500 font-normal">({pet.breed})</span>
                          </h4>
                          <span className="text-[11px] text-slate-455 font-mono">Age: {pet.age} yrs • {pet.species}</span>

                          {/* Closeness progress */}
                          <div className="flex items-center gap-2 mt-1 w-28">
                            <span className="text-[8px] text-slate-500 shrink-0 uppercase tracking-widest font-semibold font-mono">Closeness</span>
                            <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden mt-0.5">
                              <div className="h-full bg-teal-500 rounded-full" style={{ width: `${pet.closeness}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-450 group-hover:translate-x-0.5 transform transition" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interactive Interaction Drawer/Modal */}
      {activeNpc && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            id="npc_interaction_modal"
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in-50 zoom-in-95 duration-150"
          >
            {/* Header info */}
            <div className="bg-slate-950 p-6 border-b border-slate-850 relative">
              <button
                onClick={() => handleSelectNpc(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800/50 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                  {activeNpc.relationshipType === 'Parent' ? (
                    <Heart className="w-6 h-6 text-teal-400" />
                  ) : activeNpc.relationshipType === 'Partner' ? (
                    <Heart className="w-6 h-6 text-rose-500 fill-rose-500/10" />
                  ) : (
                    <Baby className="w-6 h-6 text-sky-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {activeNpc.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                    <span className="font-semibold text-teal-400 uppercase tracking-wider font-mono bg-teal-950/40 px-2 py-0.5 rounded border border-teal-900/30">
                      {getRoleLabel(activeNpc)}
                    </span>
                    {activeNpc.relationshipType === 'Partner' && (
                      <span className="font-bold text-[10px] uppercase px-1.5 py-0.5 bg-rose-950/30 text-rose-400 rounded border border-rose-900/20">
                        {maritalStatus}
                      </span>
                    )}
                    <span>Age {activeNpc.age}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Profile specifications */}
            <div className="p-6 space-y-5 overflow-y-auto max-h-[420px]">
              {/* Relationship bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Closeness Level</span>
                  <span className={`font-mono font-bold ${getRelationTextColorClass(activeNpc.relationshipValue)}`}>
                    {Math.round(activeNpc.relationshipValue)}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 p-0.5 rounded-full border border-slate-850 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${getRelationColorClass(activeNpc.relationshipValue)} transition-all duration-300`}
                    style={{ width: `${Math.round(activeNpc.relationshipValue)}%` }}
                  />
                </div>
              </div>

              {/* Generosity & Money Specs */}
              <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-850 text-slate-300">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Generosity</span>
                  <p className="text-sm font-bold text-white flex items-center gap-1.5">
                    <SmilePlus className="w-4 h-4 text-emerald-400" />
                    {activeNpc.generosity >= 70 ? 'High' : activeNpc.generosity >= 40 ? 'Moderate' : 'Low'}
                    <span className="text-xs text-slate-500 font-thin">({activeNpc.generosity})</span>
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Relative Wealth</span>
                  <p className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Banknote className="w-4 h-4 text-teal-400" />
                    {activeNpc.money >= 60000 ? 'Wealthy' : activeNpc.money >= 20000 ? 'Comfortable' : activeNpc.money > 500 ? 'Middle Class' : 'Poor'}
                  </p>
                </div>
              </div>

              {/* Actions Box */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Choose Relationship Action
                </h4>

                <div className="grid grid-cols-1 gap-2">
                  {/* Common quality time */}
                  <button
                    onClick={() => interactWithNPC(activeNpc.id, 'spend_time')}
                    disabled={annualActionsPerformed.includes(`interact_npc_${activeNpc.id}_spend_time`)}
                    className={`w-full py-2.5 px-4 border rounded-xl text-xs font-bold flex items-center justify-between transition outline-none
                      ${annualActionsPerformed.includes(`interact_npc_${activeNpc.id}_spend_time`)
                        ? 'bg-slate-900 border-slate-850 text-slate-500 opacity-60 cursor-not-allowed'
                        : 'bg-slate-800 hover:bg-slate-750 border-slate-700/60 text-slate-200 hover:text-white cursor-pointer'}`}
                  >
                    <span className="flex items-center gap-2">
                      <Smile className="w-4 h-4 text-rose-450 text-teal-400" />
                      {annualActionsPerformed.includes(`interact_npc_${activeNpc.id}_spend_time`) ? 'Quality Time Shared (Done)' : 'Spend Quality Time'}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">+Relationship</span>
                  </button>

                  {/* Common conversation */}
                  <button
                    onClick={() => interactWithNPC(activeNpc.id, 'conversation')}
                    disabled={annualActionsPerformed.includes(`interact_npc_${activeNpc.id}_conversation`)}
                    className={`w-full py-2.5 px-4 border rounded-xl text-xs font-bold flex items-center justify-between transition outline-none
                      ${annualActionsPerformed.includes(`interact_npc_${activeNpc.id}_conversation`)
                        ? 'bg-slate-900 border-slate-850 text-slate-500 opacity-60 cursor-not-allowed'
                        : 'bg-slate-800 hover:bg-slate-750 border-slate-700/60 text-slate-200 hover:text-white cursor-pointer'}`}
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-teal-400" />
                      {annualActionsPerformed.includes(`interact_npc_${activeNpc.id}_conversation`) ? 'Conversed (Done This Year)' : 'Have a Conversation'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">50% Chance Success</span>
                  </button>

                  {/* Ask for money */}
                  <button
                    onClick={() => interactWithNPC(activeNpc.id, 'ask_for_money')}
                    className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-750 border border-slate-700/60 rounded-xl text-xs font-bold text-slate-200 hover:text-white flex items-center justify-between transition cursor-pointer outline-none"
                  >
                    <span className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-emerald-400" />
                      Ask for Money ($)
                    </span>
                    <span className="text-[10px] text-amber-400 font-mono font-bold">Based on Generosity</span>
                  </button>

                  {/* Partner dynamic wedding proposal trigger */}
                  {activeNpc.relationshipType === 'Partner' && maritalStatus !== 'Married' && !activeNpc.isFiancee && !marriageResult && (
                    <div className="space-y-2 pt-2 border-t border-slate-850">
                      <button
                        onClick={() => setShowProposeRingSelector(!showProposeRingSelector)}
                        className="w-full py-2.5 px-4 bg-teal-900/60 hover:bg-teal-800 text-teal-200 hover:text-white border border-teal-500/20 rounded-xl text-xs font-bold flex items-center justify-between transition"
                      >
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-teal-400" />
                          Propose Marriage
                        </span>
                        <span className="text-[10px] text-teal-300 font-mono">Requires Ring Cash</span>
                      </button>

                      {showProposeRingSelector && (
                        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-3.5 animate-in slide-in-from-top-2 duration-150">
                          <p className="text-[11px] font-bold text-slate-300">Select an Engagement Ring:</p>
                          <div className="grid grid-cols-2 gap-2">
                            <button 
                              onClick={() => handleProposeClick(0)}
                              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-left text-[11px] text-slate-300 transition"
                            >
                              <p className="font-bold text-slate-200">No Ring</p>
                              <p className="text-[9px] text-slate-500">$0 (Closeness &gt; 70%)</p>
                            </button>
                            <button 
                              onClick={() => handleProposeClick(250)}
                              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-left text-[11px] text-slate-300 transition"
                            >
                              <p className="font-bold text-slate-200">Cheap Ring</p>
                              <p className="text-[9px] text-emerald-500">$250 (Basic)</p>
                            </button>
                            <button 
                              onClick={() => handleProposeClick(1500)}
                              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-left text-[11px] text-slate-300 transition"
                            >
                              <p className="font-bold text-slate-200">Silver Band</p>
                              <p className="text-[9px] text-orange-400">$1,500</p>
                            </button>
                            <button 
                              onClick={() => handleProposeClick(8500)}
                              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-left text-[11px] text-slate-300 transition"
                            >
                              <p className="font-bold text-slate-200">Diamond Band</p>
                              <p className="text-[9px] text-amber-400">$8,500</p>
                            </button>
                          </div>

                          {proposalMsg && (
                            <div className={`p-2.5 rounded-lg text-[10px] leading-relaxed ${proposalMsg.success ? 'bg-emerald-950/20 text-emerald-400 border border-emerald-505/10' : 'bg-rose-950/20 text-rose-400 border border-rose-505/10'}`}>
                              {proposalMsg.success ? '🎉 ' : '❌ '} {proposalMsg.text}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Prenup Overlay Choice */}
                  {showPrenupModal && (
                    <div className="p-4 bg-slate-950 rounded-xl border border-teal-500/20 space-y-3.5 mt-2 animate-pulse">
                      <p className="text-xs font-bold text-white flex items-center gap-1.5 justify-center">
                        <ShieldAlert className="w-4 h-4 text-teal-400" /> Prenuptial Agreement Choice
                      </p>
                      <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                        An agreement separates your personal treasury from {activeNpc.name}&apos;s cash box. If refused, accounts are combined but any divorce splits cash dynamically!
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePrenupDecision(true)}
                          className="flex-1 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                        >
                          Sign Prenup
                        </button>
                        <button
                          onClick={() => handlePrenupDecision(false)}
                          className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg text-xs font-bold transition cursor-pointer"
                        >
                          Refuse Agreement
                        </button>
                      </div>
                    </div>
                  )}

                  {marriageResult && (
                    <div className="p-3 bg-teal-950/20 border border-teal-500/10 rounded-xl text-xs text-teal-300 mt-2 leading-relaxed">
                      💍 {marriageResult}
                    </div>
                  )}

                  {/* Make Love / Try for Baby trigger */}
                  {activeNpc.relationshipType === 'Partner' && (maritalStatus === 'Dating' || maritalStatus === 'Married') && (
                    <div className="space-y-2 pt-2 border-t border-slate-850">
                      <button
                        onClick={handleHaveChildClick}
                        className="w-full py-2.5 px-4 bg-rose-900/60 hover:bg-rose-800 text-rose-200 hover:text-white border border-rose-500/10 rounded-xl text-xs font-bold flex items-center justify-between transition cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <Baby className="w-4 h-4 text-rose-450 text-rose-450" />
                          Make Love / Try For Baby
                        </span>
                        <span className="text-[10px] text-rose-300 font-mono">Age 18-50 Fertility</span>
                      </button>

                      {childResult && (
                        <div className={`p-3 border rounded-xl text-xs text-center mt-2 leading-relaxed ${childResult.success ? 'bg-emerald-950/20 border-emerald-500/10 text-emerald-400' : 'bg-slate-950 border-slate-850 text-slate-300'}`}>
                          {childResult.success ? '👶 ' : '❤️ '} {childResult.text}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Break Up / Divorce trigger */}
                  {activeNpc.relationshipType === 'Partner' && (
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          breakUpOrDivorce(activeNpc.id);
                          handleSelectNpc(null);
                        }}
                        className="w-full py-2.5 bg-rose-950/25 hover:bg-rose-900/40 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <HeartCrack className="w-4 h-4" /> 
                        {maritalStatus === 'Married' ? 'Divorce Spouse (Split Cash)' : 'Break Up / Sever Relationship'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Micro disclaimer inside modal to make it look extremely clean */}
            <div className="bg-slate-950 p-4 text-center border-t border-slate-850">
              <button
                onClick={() => handleSelectNpc(null)}
                className="text-xs text-slate-400 hover:text-white font-medium cursor-pointer"
              >
                Close Profile Panel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Pet Profile Modal Overlay */}
      {activePet && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div id="pet_profile_panel" className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in-50 zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedPetId(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800/50 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile heading */}
            <div className="bg-slate-950 p-6 border-b border-slate-850 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-950/30 border border-teal-900 flex items-center justify-center text-teal-450 shrink-0">
                <PawPrint className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">{activePet.name}</h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <span className="font-mono bg-slate-900 px-2 py-0.5 border border-slate-850 rounded text-teal-400 uppercase tracking-wider text-[10px] font-bold">
                    {activePet.breed}
                  </span>
                  <span>Age {activePet.age} • {activePet.species}</span>
                </p>
              </div>
            </div>

            {/* Profile parameters */}
            <div className="p-6 space-y-4 overflow-y-auto max-h-[385px]">
              {/* Closeness progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Closeness & Bond</span>
                  <span className="font-bold text-teal-405 font-mono">{Math.round(activePet.closeness)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 p-0.5 border border-slate-850 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${activePet.closeness}%` }} />
                </div>
              </div>

              {/* Health progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Health Rating</span>
                  <span className="font-bold text-emerald-400 font-mono">{Math.round(activePet.health)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 p-0.5 border border-slate-850 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${activePet.health}%` }} />
                </div>
              </div>

              {/* Happiness progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Happiness Level</span>
                  <span className="font-bold text-amber-500 font-mono">{Math.round(activePet.happiness)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 p-0.5 border border-slate-850 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${activePet.happiness}%` }} />
                </div>
              </div>

              {/* Craziness progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Craziness Meter</span>
                  <span className="font-bold text-rose-450 font-mono">{Math.round(activePet.craziness)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 p-0.5 border border-slate-850 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full transition-all" style={{ width: `${activePet.craziness}%` }} />
                </div>
              </div>

              {/* Pet actions dashboard */}
              <div className="pt-4 border-t border-slate-850 space-y-2.5">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Nurturing & Care routines:</h4>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => interactWithPet(activePet.id, 'quality_time')}
                    className="p-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 rounded-xl hover:border-teal-500/20 text-center transition cursor-pointer flex flex-col items-center gap-1 group"
                  >
                    <Heart className="w-4 h-4 text-teal-400 group-hover:scale-110 transition" />
                    <span className="text-[11px] font-bold text-slate-200">Hug & Play</span>
                    <span className="text-[9px] text-slate-500 font-mono">Happiness</span>
                  </button>

                  <button
                    onClick={() => interactWithPet(activePet.id, 'treat')}
                    className="p-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 rounded-xl hover:border-teal-500/20 text-center transition cursor-pointer flex flex-col items-center gap-1 group"
                  >
                    <Bone className="w-4 h-4 text-emerald-450 group-hover:scale-110 transition" />
                    <span className="text-[11px] font-bold text-slate-200">Give Treat</span>
                    <span className="text-[9px] text-emerald-600 font-mono">-$20</span>
                  </button>

                  <button
                    onClick={() => interactWithPet(activePet.id, 'train')}
                    className="p-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 rounded-xl hover:border-teal-500/20 text-center transition cursor-pointer flex flex-col items-center gap-1 group"
                  >
                    <Smile className="w-4 h-4 text-amber-500 group-hover:scale-110 transition" />
                    <span className="text-[11px] font-bold text-slate-200">Train Behaviors</span>
                    <span className="text-[9px] text-slate-500 font-mono">-Craziness</span>
                  </button>

                  <button
                    onClick={() => interactWithPet(activePet.id, 'vet')}
                    className="p-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 rounded-xl hover:border-teal-500/20 text-center transition cursor-pointer flex flex-col items-center gap-1 group"
                  >
                    <Stethoscope className="w-4 h-4 text-rose-500 group-hover:scale-110 transition" />
                    <span className="text-[11px] font-bold text-slate-200">Take to Vet</span>
                    <span className="text-[9px] text-rose-600 font-mono">-$250</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 border-t border-slate-850 text-center">
              <button
                onClick={() => setSelectedPetId(null)}
                className="text-xs text-slate-400 hover:text-white transition font-medium cursor-pointer"
              >
                Close Companions Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

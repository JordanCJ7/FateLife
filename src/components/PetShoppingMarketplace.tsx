import React, { useState } from 'react';
import { useGameStore } from '../gameStore';
import { MarketPet } from '../types';
import { formatCurrency } from '../utils';
import { ArrowLeft, Heart, Sparkles, ShieldAlert, Zap, AlertTriangle, Check, Award, Building, Flame } from 'lucide-react';

interface PetShoppingMarketplaceProps {
  onClose: () => void;
}

export default function PetShoppingMarketplace({ onClose }: PetShoppingMarketplaceProps) {
  const characterInfo = useGameStore((state) => state.characterInfo);
  const finances = useGameStore((state) => state.finances);
  const availablePets = useGameStore((state) => state.availablePets) || [];
  const adoptPet = useGameStore((state) => state.adoptPet);

  // Active storefront: null | 'shelter' | 'breeder' | 'exotic'
  const [activeStore, setActiveStore] = useState<'shelter' | 'breeder' | 'exotic' | null>(null);
  const [outcomeMsg, setOutcomeMsg] = useState<{ success: boolean; text: string } | null>(null);

  if (!characterInfo || !finances) return null;

  const handleAdopt = (pet: MarketPet) => {
    setOutcomeMsg(null);
    const result = adoptPet(
      pet.source,
      pet.species,
      pet.breed,
      pet.cost,
      pet.craziness,
      pet.arrestProbability,
      pet.id
    );
    
    setOutcomeMsg({
      success: result.success,
      text: result.msg,
    });

    if (result.success) {
      // If successful, we can optionally switch back or stay to see other options
    }
  };

  // Filter listings based on the selected store
  const storePets = availablePets.filter((p) => p.source === activeStore);

  return (
    <div className="space-y-6" id="pet_shopping_marketplace">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-xs font-bold text-teal-400 hover:text-teal-300 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Relationships
        </button>
        <span className="text-xs bg-slate-850 px-3 py-1 text-slate-400 rounded-full font-mono">
          Wallet: <span className="text-emerald-400 font-bold">{formatCurrency(finances.cashBalance)}</span>
        </span>
      </div>

      {outcomeMsg && (
        <div
          className={`p-4 rounded-xl text-xs leading-relaxed transition text-center font-bold border ${
            outcomeMsg.success
              ? 'bg-emerald-950/30 border-emerald-500/20 text-emerald-400'
              : 'bg-rose-950/20 border-rose-500/10 text-rose-300'
          }`}
          id="adoption_result_message"
        >
          {outcomeMsg.text}
        </div>
      )}

      {activeStore === null ? (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-extrabold text-white">🐾 Pet Shopping Marketplace</h3>
            <p className="text-xs text-slate-400 mt-1">
              Connect with animal shelters, certified breeders, or black market traffickers to expand your household.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Storefront 1: Shelter */}
            <button
              onClick={() => {
                setOutcomeMsg(null);
                setActiveStore('shelter');
              }}
              className="w-full text-left bg-slate-950/60 hover:bg-slate-900 border border-slate-850 hover:border-slate-700/80 p-5 rounded-2xl transition duration-200 cursor-pointer group flex flex-col justify-between h-52 outline-none focus:ring-1 focus:ring-teal-500/50"
              id="btn_store_shelter"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-650/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-105 transition duration-200">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white group-hover:text-teal-300 transition">Animal Shelter 🏢</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Domestic mutts, stray cats, and rodents looking for a second chance. High love, low cost, mixed health condition.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-teal-400/80 font-bold group-hover:translate-x-1 transform transition">
                Open Shelter Catalog &rarr;
              </span>
            </button>

            {/* Storefront 2: Purebred Breeders */}
            <button
              onClick={() => {
                setOutcomeMsg(null);
                setActiveStore('breeder');
              }}
              className="w-full text-left bg-slate-950/60 hover:bg-slate-900 border border-slate-850 hover:border-slate-700/80 p-5 rounded-2xl transition duration-200 cursor-pointer group flex flex-col justify-between h-52 outline-none focus:ring-1 focus:ring-teal-500/50"
              id="btn_store_breeder"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-650/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition duration-200">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white group-hover:text-amber-300 transition">Certified Breeders 🏅</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Pedigree cats, purebred dogs, and steeds. Excellent genetic lines, perfect health, premium pricing. (Age 15+)
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-amber-400/80 font-bold group-hover:translate-x-1 transform transition">
                Open Breeder Registry &rarr;
              </span>
            </button>

            {/* Storefront 3: Exotic Black Market */}
            <button
              disabled={characterInfo.age < 18}
              onClick={() => {
                setOutcomeMsg(null);
                setActiveStore('exotic');
              }}
              className={`w-full text-left p-5 rounded-2xl transition duration-200 flex flex-col justify-between h-52 outline-none ${
                characterInfo.age >= 18
                  ? 'bg-slate-950/60 hover:bg-slate-900 border border-slate-850 hover:border-slate-700/80 cursor-pointer group focus:ring-1 focus:ring-teal-500/50'
                  : 'bg-slate-950/20 border border-slate-950/40 opacity-55 cursor-not-allowed'
              }`}
              id="btn_store_exotic"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-650/10 border border-rose-500/20 flex items-center justify-center text-rose-450">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Exotic Market Dealer 🐅</h4>
                  {characterInfo.age >= 18 ? (
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Illegal big cats, primates, or cobras. Massive craziness ratios, extreme smuggler tariffs, and high risk of arrest.
                    </p>
                  ) : (
                    <p className="text-xs text-rose-400 mt-1 font-semibold flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" /> Gated behind age requirement of 18+
                    </p>
                  )}
                </div>
              </div>
              {characterInfo.age >= 18 ? (
                <span className="text-[10px] font-mono text-rose-400/80 font-bold group-hover:translate-x-1 transform transition">
                  Enter Black Market &rarr;
                </span>
              ) : (
                <span className="text-[10px] font-mono text-slate-600 font-bold">
                  Locked (Underage)
                </span>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Store Front Layout */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setActiveStore(null);
                setOutcomeMsg(null);
              }}
              className="text-xs text-slate-400 hover:text-slate-350 flex items-center gap-1 cursor-pointer"
            >
              &larr; Switch Storefronts
            </button>
            <h3 className="text-base font-extrabold text-white capitalize">
              {activeStore === 'shelter' && 'Animal Shelter 🏢'}
              {activeStore === 'breeder' && 'Certified Breeders 🏅'}
              {activeStore === 'exotic' && 'Exotic Black Market 🐅'}
            </h3>
          </div>

          {storePets.length === 0 ? (
            <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-10 text-center space-y-3">
              <AlertTriangle className="w-8 h-8 text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-300">Market Sold Out!</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                All animal listings have been adopted or purchased for the year. Check back next year when your age increases for freshly generated listings!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {storePets.map((pet) => {
                const conditionVal = pet.condition ?? 50;
                const canAfford = finances.cashBalance >= pet.cost;
                const requiresAgeGating = activeStore !== 'shelter' && characterInfo.age < 15;

                return (
                  <div
                    key={pet.id}
                    className="bg-slate-950/70 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                            {pet.breed}
                          </h4>
                          <span className="text-[11px] font-mono text-slate-400 uppercase">{pet.species}</span>
                        </div>
                        <span className="text-sm font-bold text-emerald-400 font-mono">
                          {formatCurrency(pet.cost)}
                        </span>
                      </div>

                      {/* Stat Bars: Condition/Health & Craziness */}
                      <div className="space-y-2.5">
                        {/* Condition/Health Bar */}
                        <div>
                          <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                            <span>Health Condition</span>
                            <span className="text-slate-300 font-bold">{conditionVal}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                conditionVal >= 80
                                  ? 'bg-emerald-500'
                                  : conditionVal >= 50
                                  ? 'bg-amber-500'
                                  : 'bg-rose-500'
                              }`}
                              style={{ width: `${conditionVal}%` }}
                            />
                          </div>
                        </div>

                        {/* Craziness Bar */}
                        <div>
                          <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                            <span>Animal Craziness</span>
                            <span className="text-rose-450 font-bold">{pet.craziness}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-rose-600 rounded-full transition-all duration-300"
                              style={{ width: `${pet.craziness}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Black Market Warning */}
                      {activeStore === 'exotic' && pet.arrestProbability && (
                        <div className="text-[10px] bg-rose-950/20 border border-rose-550/10 p-2 rounded-lg text-rose-300 flex items-center gap-1 font-semibold leading-relaxed">
                          <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                          Risk of Customs intercept & arrest: {(pet.arrestProbability * 100).toFixed(0)}%!
                        </div>
                      )}
                    </div>

                    {requiresAgeGating ? (
                      <p className="text-[10px] text-rose-400 font-bold text-center leading-relaxed">
                        ⚠️ Must be at least 15 years old to adopt breeders or exotic pets.
                      </p>
                    ) : (
                      <button
                        onClick={() => handleAdopt(pet)}
                        disabled={!canAfford}
                        className={`w-full py-2 text-xs font-extrabold rounded-xl cursor-pointer transition flex items-center justify-center gap-1.5 ${
                          canAfford
                            ? activeStore === 'exotic'
                              ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-md shadow-rose-950/20'
                              : 'bg-teal-600 text-white hover:bg-teal-500 shadow-md shadow-teal-950/20'
                            : 'bg-slate-900 border border-slate-950 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        {activeStore === 'exotic' ? 'Smuggle & Order' : 'Adopt & Purchase'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

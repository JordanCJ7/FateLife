/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useGameStore } from '../gameStore';
import { Asset } from '../types';
import { 
  Home, 
  Car, 
  Landmark, 
  Coins, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  X, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  DollarSign,
  Calendar,
  Lock,
  HelpCircle
} from 'lucide-react';
import { formatCurrency } from '../utils';

export default function AssetsPanel() {
  const assets = useGameStore((state) => state.assets) || [];
  const finances = useGameStore((state) => state.finances);
  const characterInfo = useGameStore((state) => state.characterInfo);
  const buyAsset = useGameStore((state) => state.buyAsset);
  const sellAsset = useGameStore((state) => state.sellAsset);
  const availableRealEstate = useGameStore((state) => state.availableRealEstate) || [];
  const availableVehicles = useGameStore((state) => state.availableVehicles) || [];

  const [message, setMessage] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  
  // Custom states for Mortgage & Car Loan Expansion
  const [selectedMarketItem, setSelectedMarketItem] = useState<Omit<Asset, 'id'> | null>(null);
  const [expandedAssetId, setExpandedAssetId] = useState<string | null>(null);
  const [appraisalInfo, setAppraisalInfo] = useState<{[key: string]: string}>({});

  const combinedMarketListings: Omit<Asset, 'id'>[] = [
    ...availableRealEstate.map(p => ({
      name: p.name,
      type: 'real_estate' as const,
      purchasePrice: p.purchasePrice,
      currentValue: p.purchasePrice,
      annualUpkeep: p.annualUpkeep,
      isFinanced: false,
      loanDetails: null,
      condition: p.condition,
      subtype: p.subtype,
      address: p.address
    })),
    ...availableVehicles.map(v => ({
      name: v.name,
      type: 'vehicle' as const,
      purchasePrice: v.purchasePrice,
      currentValue: v.purchasePrice,
      annualUpkeep: v.annualUpkeep,
      isFinanced: false,
      loanDetails: null,
      condition: v.condition,
      category: v.category
    }))
  ];

  if (!finances || !characterInfo || characterInfo.isDead) return null;

  const handleAppreciateAppraisal = (asset: Asset) => {
    const cond = asset.condition ?? 80;
    const condWord = cond >= 90 ? 'Pristine' : cond >= 70 ? 'Good' : cond >= 40 ? 'Fair' : 'Poor';
    const classification = asset.type === 'real_estate' ? (asset.subtype ?? 'Suburban') : (asset.category ?? 'Sedan');
    const addressStr = asset.type === 'real_estate' ? ` located at ${asset.address ?? 'our private lockbox'}` : '';

    const detailText = `Official Valuations Board Certificate: This ${classification}${addressStr} is certified in ${condWord} condition (${cond}% rating). Current dynamic market valuation holds at ${formatCurrency(asset.currentValue)}. Annual physical upkeep stands at ${formatCurrency(asset.annualUpkeep)}.`;
    setAppraisalInfo(prev => ({
      ...prev,
      [asset.id]: detailText
    }));
  };

  const handlePurchase = (item: Omit<Asset, 'id'>, method: 'cash' | 'finance') => {
    setMessage(null);
    setErrorText(null);
    setSelectedMarketItem(null); // Close checkout modal

    // Guard: vehicle check for license
    if (item.type === 'vehicle' && !characterInfo.hasLicense) {
      setErrorText(`You do not have a driving license to purchase a vehicle! Take your driving test first.`);
      return;
    }

    const uniqueId = Math.random().toString(36).substring(2, 11);
    const result = buyAsset({
      ...item,
      id: uniqueId,
    } as Asset, method);

    if (result.success) {
      setMessage(result.msg);
    } else {
      setErrorText(result.msg);
    }
  };

  const handleSell = (id: string, name: string, value: number, isFinanced: boolean, remainingLoan: number) => {
    sellAsset(id);
    const net = value - remainingLoan;
    if (isFinanced) {
      setMessage(`Liquidated your mortgaged ${name}. Sold for ${formatCurrency(value)}, paid remaining loan balance of ${formatCurrency(remainingLoan)}. Net return: ${formatCurrency(net)}!`);
    } else {
      setMessage(`Successfully liquidated your ${name} for ${formatCurrency(value)}!`);
    }
    setErrorText(null);
    if (expandedAssetId === id) {
      setExpandedAssetId(null);
    }
  };

  const currentEquity = assets.reduce((sum, a) => sum + a.currentValue, 0);
  const totalUpkeep = assets.reduce((sum, a) => sum + a.annualUpkeep, 0);

  // Calculate active loans statistics
  const totalDebtBalance = assets.reduce((sum, a) => sum + (a.isFinanced && a.loanDetails ? a.loanDetails.principalRemaining : 0), 0);
  const annualAssetDebtServing = assets.reduce((sum, a) => sum + (a.isFinanced && a.loanDetails ? a.loanDetails.annualPayment : 0), 0);

  return (
    <div id="assets_panel_tab" className="flex flex-col gap-6">
      {/* Messages */}
      {message && (
        <div id="assets_success_message" className="bg-emerald-900/30 border border-emerald-500/30 text-emerald-300 p-3 rounded-xl text-xs flex items-center gap-2">
          <Coins className="w-4 h-4 text-emerald-400" />
          {message}
        </div>
      )}
      {errorText && (
        <div id="assets_error_message" className="bg-rose-900/30 border border-rose-500/30 text-rose-300 p-3 rounded-xl text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          {errorText}
        </div>
      )}

      {/* Summary Row */}
      <div id="assets_metrics_grid" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500">Asset Equity Valuation</p>
          <p className="text-lg sm:text-xl font-bold text-teal-400 mt-1">{formatCurrency(currentEquity)}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Estimated market value</p>
        </div>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500">Total Upkeep Expense</p>
          <p className="text-lg sm:text-xl font-bold text-rose-400 mt-1">{formatCurrency(totalUpkeep)}/yr</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Deducted on Age Up</p>
        </div>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-semibold">Active Loan Debt</p>
          <p className="text-lg sm:text-xl font-bold text-amber-400 mt-1">{formatCurrency(totalDebtBalance)}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Total unpaid bank principal</p>
        </div>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-semibold">Annual Loan Costs</p>
          <p className="text-lg sm:text-xl font-bold text-sky-400 mt-1">-{formatCurrency(annualAssetDebtServing)}/yr</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Annual loan amortization</p>
        </div>
      </div>

      <div id="assets_columns_grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Marketplace */}
        <div id="marketplace_container" className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Landmark className="w-4 h-4 text-amber-500" /> Real Estate & Motors Market
          </h3>
          
          {characterInfo.age < 18 ? (
            <div className="bg-slate-950 border border-slate-850 p-8 rounded-xl text-center space-y-2">
              <Lock className="w-8 h-8 text-slate-700 mx-auto" />
              <h4 className="text-sm font-bold text-slate-350">Market Gated</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed font-sans">
                You must be at least 18 years old to sign legally binding mortgages, auto leases, and purchase deeds.
              </p>
            </div>
          ) : combinedMarketListings.length === 0 ? (
            <div className="bg-slate-950 border border-slate-850 p-8 rounded-xl text-center space-y-2">
              <HelpCircle className="w-8 h-8 text-slate-700 mx-auto" />
              <h4 className="text-sm font-bold text-slate-350 font-sans">No Listings Available</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                No active vehicle listings or properties available for this year. Click Age Up to browse freshly generated dynamic listings!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-1">
              {combinedMarketListings.map((item, index) => {
                const isVehicle = item.type === 'vehicle';
                const icon = isVehicle ? <Car className="text-sky-400 w-4 h-4" /> : <Home className="text-amber-400 w-4 h-4" />;

                return (
                  <div key={index} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center hover:border-slate-755 transition">
                    <div className="flex gap-3 items-center">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        {icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white leading-none">{item.name}</p>
                        <p className="text-[10px] text-slate-500 mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5">
                          <span>Upkeep: {formatCurrency(item.annualUpkeep)}/yr</span>
                          <span className="text-slate-400 font-medium">| {isVehicle ? 'Depreciates' : 'Appreciates'}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setMessage(null);
                        setErrorText(null);
                        setSelectedMarketItem(item);
                      }}
                      className="bg-teal-600 hover:bg-teal-500 text-white text-xs px-3.5 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-95 duration-150"
                    >
                      View Options
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Your Assets Portfolio */}
        <div id="owned_portfolio_container" className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Coins className="w-4 h-4 text-teal-400" /> Your Active Portfolio ({assets.length})
          </h3>
          <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-1">
            {assets.length === 0 ? (
              <div className="text-xs text-slate-500 text-center py-8">
                You do not own any vehicles or physical real estate right now. Build up your cash balance to buy models.
              </div>
            ) : (
              assets.map((a) => {
                const isVehicle = a.type === 'vehicle';
                const isExpanded = expandedAssetId === a.id;

                return (
                  <div 
                    key={a.id} 
                    className={`bg-slate-950 rounded-xl border ${isExpanded ? 'border-teal-500/50 bg-slate-950/90' : 'border-slate-800 hover:border-slate-700'} transition duration-200 overflow-hidden`}
                  >
                    {/* Row Header */}
                    <div 
                      onClick={() => setExpandedAssetId(isExpanded ? null : a.id)}
                      className="p-3 flex justify-between items-center cursor-pointer select-none"
                    >
                      <div className="flex gap-3 items-center min-w-0 pr-1">
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                          {isVehicle ? <Car className="text-sky-400 w-4 h-4" /> : <Home className="text-amber-400 w-4 h-4" />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-white truncate max-w-[140px] sm:max-w-none">{a.name}</span>
                            {a.isFinanced && (
                              <span className="bg-amber-950/80 border border-amber-500/30 text-amber-400 font-mono text-[9px] px-1.5 py-0.5 rounded uppercase font-extrabold tracking-wide">
                                Financed
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                            <span className="text-teal-350 font-bold font-mono">{formatCurrency(a.currentValue)}</span>
                            {a.type === 'real_estate' && a.subtype && (
                              <span className="text-[9px] uppercase tracking-wider text-amber-400 font-mono bg-amber-950/20 px-1 py-0.2 rounded border border-amber-900/30">
                                {a.subtype}
                              </span>
                            )}
                            {a.type === 'vehicle' && a.category && (
                              <span className="text-[9px] uppercase tracking-wider text-sky-400 font-mono bg-sky-950/20 px-1 py-0.2 rounded border border-sky-900/30">
                                {a.category}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="text-slate-400 pl-2">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>

                    {/* Expandable Details Sub-panel */}
                    {isExpanded && (
                      <div className="bg-slate-900/60 border-t border-slate-800 p-4 space-y-3.5 text-xs">
                        {/* Custom fields: Subclass details & Addresses */}
                        <div className="bg-slate-950/50 border border-slate-850 p-3 rounded-lg space-y-1.5 leading-relaxed text-slate-300">
                          {a.type === 'real_estate' && (
                            <>
                              <p className="text-[11px] text-slate-400 font-sans"><strong className="text-white">Deed Address:</strong> {a.address ?? '404 Resident Way (Central)'}</p>
                              <p className="text-[11px] text-slate-400 font-sans"><strong className="text-white">Zoning Class:</strong> {a.subtype ?? 'Suburban Cottage'}</p>
                            </>
                          )}
                          {a.type === 'vehicle' && (
                            <>
                              <p className="text-[11px] text-slate-400 font-sans"><strong className="text-white">Classification:</strong> {a.category ?? 'Family Sedan'}</p>
                            </>
                          )}
                          <div className="pt-1.5 flex items-center gap-3">
                            <span className="text-[10px] font-mono text-slate-400">Physical Condition:</span>
                            <div className="grow h-1.5 bg-slate-900 p-0.5 border border-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${a.condition ?? 80}%` }} />
                            </div>
                            <span className="text-[10px] text-slate-350 font-mono font-bold shrink-0">{a.condition ?? 80}%</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-slate-500 text-[10px] uppercase font-mono">Original Purchase Price</p>
                            <p className="text-white font-semibold mt-0.5">{formatCurrency(a.purchasePrice)}</p>
                          </div>
                          <div>
                            <p className="text-slate-500 text-[10px] uppercase font-mono">Current Appraisal Value</p>
                            <p className="text-white font-semibold mt-0.5 flex items-center gap-1">
                              {formatCurrency(a.currentValue)}
                              {isVehicle ? (
                                <TrendingDown className="w-3.5 h-3.5 text-rose-500" title="Depreciating asset" />
                              ) : (
                                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" title="Appreciating asset" />
                              )}
                            </p>
                          </div>
                        </div>

                        {a.isFinanced && a.loanDetails ? (
                          <div className="bg-amber-950/20 border border-amber-900/30 rounded-lg p-3 space-y-2">
                            <p className="text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                              <Landmark className="w-3.5 h-3.5" /> Direct Loan Amortization Schedule
                            </p>
                            <div className="grid grid-cols-3 gap-2 text-slate-300 leading-normal">
                              <div>
                                <span className="block text-[9px] uppercase font-mono text-slate-400">Debt Remaining</span>
                                <span className="font-bold text-amber-300">{formatCurrency(a.loanDetails.principalRemaining)}</span>
                              </div>
                              <div>
                                <span className="block text-[9px] uppercase font-mono text-slate-400">Annual payment</span>
                                <span className="font-bold text-sky-300">{formatCurrency(a.loanDetails.annualPayment)}/yr</span>
                              </div>
                              <div>
                                <span className="block text-[9px] uppercase font-mono text-slate-400">Term Left</span>
                                <span className="font-bold text-purple-300">{a.loanDetails.yearsRemaining} year{a.loanDetails.yearsRemaining > 1 ? 's' : ''}</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-lg p-2.5 text-emerald-400 font-medium flex items-center gap-1.5 text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                            Fully Owned Cash Asset — No outstanding liens or bank debt.
                          </div>
                        )}

                        {/* Appraisal Certificate Box */}
                        {appraisalInfo[a.id] ? (
                          <div className="bg-teal-950/20 border border-teal-500/20 rounded-lg p-3 text-teal-300 leading-relaxed font-sans text-[11px] animate-in fade-in duration-200">
                            📜 {appraisalInfo[a.id]}
                          </div>
                        ) : null}

                        <div className="pt-2 flex justify-between gap-2 border-t border-slate-800">
                          <button
                            onClick={() => handleAppreciateAppraisal(a)}
                            className="bg-slate-850 hover:bg-slate-800 text-slate-300 text-[11px] font-bold px-3 py-2 rounded-lg transition hover:text-white cursor-pointer"
                          >
                            Appraise Asset
                          </button>
                          <button
                            onClick={() => handleSell(
                              a.id, 
                              a.name, 
                              a.currentValue, 
                              a.isFinanced, 
                              (a.isFinanced && a.loanDetails) ? a.loanDetails.principalRemaining : 0
                            )}
                            className="bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold px-4 py-2 rounded-lg transition shrink-0 cursor-pointer"
                          >
                            Sell Asset (Net Proceed: {formatCurrency(a.currentValue - ((a.isFinanced && a.loanDetails) ? a.loanDetails.principalRemaining : 0))})
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Checkout Selection Modal (Mortgage & Cash Paths) */}
      {selectedMarketItem && (() => {
        const item = selectedMarketItem;
        const term = item.type === 'real_estate' ? 20 : 10;
        const annualPayment = item.purchasePrice / term;
        const downPayment = item.purchasePrice * 0.10;
        
        const isApproved = annualPayment <= finances.annualSalary * 0.40;
        const hasDownPayment = finances.cashBalance >= downPayment;
        const hasFullCash = finances.cashBalance >= item.purchasePrice;

        const maxAllowedPayment = finances.annualSalary * 0.40;

        return (
          <div id="checkout_modal_container" className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 relative space-y-6">
              <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                <div className="flex items-center gap-2">
                  <Landmark className="text-teal-400 w-5 h-5" />
                  <h3 className="text-sm sm:text-base font-extrabold text-white">Purchase Agreement</h3>
                </div>
                <button 
                  onClick={() => setSelectedMarketItem(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Asset Brief */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500">Asset Selection</p>
                <div className="flex items-center gap-2 text-white font-extrabold text-sm sm:text-base">
                  {item.type === 'vehicle' ? <Car className="text-sky-400 w-4 h-4" /> : <Home className="text-amber-400 w-4 h-4" />}
                  <span>{item.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2 pt-2 border-t border-slate-850 text-xs">
                  <div>
                    <span className="block text-slate-400 text-[11px]">Retail Price:</span>
                    <span className="text-teal-300 font-bold font-mono text-xs mt-0.5 block">{formatCurrency(item.purchasePrice)}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[11px]">Upkeep cost:</span>
                    <span className="text-slate-350 font-medium font-mono text-xs mt-0.5 block">{formatCurrency(item.annualUpkeep)}/yr</span>
                  </div>
                </div>
              </div>

              {/* Checkout Options */}
              <div className="space-y-4">
                <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block">
                  Select Billing Option:
                </p>

                {/* Cash Method Box */}
                <div className={`p-4 rounded-xl border transition-all ${hasFullCash ? 'border-slate-800 bg-slate-950/30' : 'border-rose-950/40 bg-rose-950/5 opacity-70'}`}>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-xs font-extrabold text-white flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Outright Cash Purchase
                      </h4>
                      <p className="text-[10px] text-slate-400 font-sans mt-1 leading-relaxed">
                        Buy with current savings. Zero debt, no annual financial interest, and no foreclosure stress.
                      </p>
                    </div>
                  </div>
                  <button
                    disabled={!hasFullCash}
                    onClick={() => handlePurchase(item, 'cash')}
                    className={`w-full mt-3.5 py-2 px-4 text-xs font-bold rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer ${
                      hasFullCash 
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {hasFullCash ? `Buy with Cash (${formatCurrency(item.purchasePrice)})` : `Insufficient Cash (Need ${formatCurrency(item.purchasePrice)})`}
                  </button>
                </div>

                {/* Finance Method Box */}
                <div className={`p-4 rounded-xl border transition-all ${isApproved ? 'border-slate-800 bg-slate-950/30' : 'border-rose-950/40 bg-rose-950/5 opacity-75'}`}>
                  <div className="flex justify-between items-start gap-2">
                    <div className="space-y-1">
                      <h4 className="text-xs font-extrabold text-white flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-sky-400" /> Apply for Loan
                      </h4>
                      <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                        Secure a specialized bank loan. A 10% down payment is required upfront.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 bg-slate-950 p-2 text-[10px] rounded-lg mt-2 font-sans text-slate-300">
                        <div>
                          <span className="block text-slate-400 text-[9px] uppercase font-mono">10% Down Payment</span>
                          <span className="font-extrabold text-amber-300">{formatCurrency(downPayment)}</span>
                        </div>
                        <div>
                          <span className="block text-slate-400 text-[9px] uppercase font-mono">Amortization</span>
                          <span className="font-extrabold text-sky-300">{formatCurrency(annualPayment)}/yr</span>
                        </div>
                        <div className="col-span-2 pt-1.5 border-t border-slate-850 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-purple-400 shrink-0" />
                          <span>Term schedule: <span className="text-purple-300 font-bold">{term} years</span></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Loan Approval Condition Feedback */}
                  <div className="mt-3.5 text-[10px] font-sans leading-relaxed border-t border-slate-850 pt-2.5 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">My Annual Income:</span>
                      <span className="font-semibold text-white">{formatCurrency(finances.annualSalary)}/yr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Under bank 40% threshold:</span>
                      <span className={isApproved ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'} >
                        {formatCurrency(annualPayment)} / {formatCurrency(maxAllowedPayment)} (Max allowed)
                      </span>
                    </div>

                    {!isApproved ? (
                      <p className="text-rose-400 font-semibold text-[9.5px] mt-1 flex items-start gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        The bank refused your mortgage application. Your annual income is too low to qualify for this asset's payments. Get a higher salary job first.
                      </p>
                    ) : !hasDownPayment ? (
                      <p className="text-rose-400 font-semibold text-[9.5px] mt-1 flex items-start gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        The bank would approve your credit, but you have insufficient savings to pay the required {formatCurrency(downPayment)} cash down payment.
                      </p>
                    ) : (
                      <p className="text-emerald-400 font-semibold text-[10px] mt-1">
                        ● Qualified! Your income is healthy and down-payment cash is available.
                      </p>
                    )}
                  </div>

                  <button
                    disabled={!isApproved || !hasDownPayment}
                    onClick={() => handlePurchase(item, 'finance')}
                    className={`w-full mt-3.5 py-2 px-4 text-xs font-bold rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer ${
                      isApproved && hasDownPayment 
                      ? 'bg-sky-600 hover:bg-sky-500 text-white animate-pulse' 
                      : 'bg-slate-850 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {!isApproved 
                      ? 'Bank Loan Rejected' 
                      : !hasDownPayment 
                        ? `Down-Payment Missing (Need ${formatCurrency(downPayment)})`
                        : `Apply & Pay Down-Payment (${formatCurrency(downPayment)})`}
                  </button>
                </div>
              </div>

              <div className="pt-2 text-center border-t border-slate-850">
                <button 
                  onClick={() => setSelectedMarketItem(null)}
                  className="text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel & Review Listing
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

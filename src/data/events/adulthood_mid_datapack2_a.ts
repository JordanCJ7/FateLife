import { GameEvent, CharacterState } from '../../types';
import { adjustStats } from '../../utils';

export const youngDataPack2AEvents: GameEvent[] = [
  // =========================================================================
  // OCCUPATIONAL CRISES (Events 1 to 20: Career Ascension / Crisis Cases)
  // =========================================================================
  {
    id: 'mid_dp2_car_01',
    title: 'The Patent Subpoena ⚖️',
    description: 'An aggressive patent troll files a massive federal injunction against your firm’s primary client software, demanding millions in licensing damages.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && (job.includes('lawyer') || job.includes('attorney'));
    },
    choices: [
      {
        choiceText: 'Mount a meticulous counter-challenge on intellectual property priors.',
        outcomeText: 'You discover a forgotten 1998 academic paper that completely invalidates their claims. The judge throws the case out.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, happiness: 15, stress: 10 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 5000, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Successfully defended a high-stakes software patent troll lawsuit with custom prior-art filings.`);
        }
      },
      {
        choiceText: 'Advise the executive board to negotiate an immediate, cheap out-of-court settlement.',
        outcomeText: 'The board settles quickly. It avoids a public trial, but your legal partners feel you were too eager to fold.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, happiness: -5, looks: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Facilitated a modest out-of-court settlement for a complex intellectual property dispute.`);
        }
      },
      {
        choiceText: 'Decline to practice in this venue and recuse yourself completely.',
        outcomeText: 'The case passes to a rival associate, costing you potential partner standing but preserving your serene sleep.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -25, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Stepped away from a convoluted federal patent trial to safeguard personal sanity.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_02',
    title: 'The Cloud Database Breach 💻',
    description: 'A malicious cyber militia leaks over forty thousand customer social security numbers. Secure corporate server vaults are compromised.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && (job.includes('engineer') || job.includes('developer'));
    },
    choices: [
      {
        choiceText: 'Revoke compromised encryption certificates immediately to block subsequent sessions.',
        outcomeText: 'Your rapid terminal keys close the firewall window perfectly. You block further data extraction and secure praise.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 15, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Neutralized a massive live server network breach through precise credential revocation.`);
        }
      },
      {
        choiceText: 'Deploy automated cluster rollback scripts to restore system states.',
        outcomeText: 'The rollback successfully isolates data, but it accidentally drops seven hours of active transaction logs.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 10, stress: 5, happiness: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Commenced a rapid database rollback during server emergencies, causing transactional data loss.`);
        }
      },
      {
        choiceText: 'Resign immediately to avoid participating in federal disclosure proceedings.',
        outcomeText: 'You walk out the lobby doors. The engineering board is left to handle the clean-up without your systems expertise.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -30, happiness: 5 });
          s.characterInfo.currentOccupation = 'Unemployed';
          s.log.push(`Age ${s.characterInfo.age}: Handed in your immediate coding resignation during critical cyber security breaches.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_03',
    title: 'The Complex Transplant Dispute ⚕️',
    description: 'An emergency heart comes in. You must decide whether to allocate it to a prominent hospital donor or a dying local youth.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && job.includes('surgeon');
    },
    choices: [
      {
        choiceText: 'Recommend the local youth on chronological medical priority lists.',
        outcomeText: 'The youth recovers beautifully. The family sends handwritten letters, though hospital board members seem chilled.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 35, happiness: 20, stress: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Allocated a vital organ transplant based purely on medical priority standards.`);
        }
      },
      {
        choiceText: 'Recommend the wealthy donor to protect future pediatric clinic funding.',
        outcomeText: 'The donor survives and signs a massive five-million-dollar wing endowment, though social media catches wind.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -25, smarts: 15, stress: 25 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 10000, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Approved organ allocation to a wealthy donor, securing historic hospital endowments.`);
        }
      },
      {
        choiceText: 'Recuse your surgical team from deciding, assigning it to standard ethics panels.',
        outcomeText: 'An administrative board decides the allocation. You treat ward fractures while bypassing the political stress.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -20, happiness: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Deflected complex organ selection crises directly to ethics review panels.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_04',
    title: 'The Brass Sewage Backup 🔧',
    description: 'A historic Victorian manor houses fifty guests for a wedding dinner. The primary copper sewage stack bursts in the crawlspace.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && job.includes('plumber');
    },
    choices: [
      {
        choiceText: 'Solder a rapid zinc compression sleeve over the burst copper line.',
        outcomeText: 'Your heavy copper torch flames perfectly. The leak stops instantly, allowing the wedding to feast in dry comfort.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 10, happiness: 20 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 1200, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Sealed a burst Victorian manor sewage stack using high-pressure zinc sleeves (+$1,200).`);
        }
      },
      {
        choiceText: 'Refuse to work on the hazardous raw sewage pool without specialty gear.',
        outcomeText: 'The manor owner curses your name, but you keep your lungs sanitary. The basement continues to fill.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, happiness: -5, stress: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Declined emergency sewage repairs due to hazardous biological workspace pools.`);
        }
      },
      {
        choiceText: 'Subcontract the restoration labor to a junior apprentice for small fees.',
        outcomeText: 'The apprentice handles the thick sludge. They solve the leak, earning you a hands-off margin.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: -10 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 400, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Subcontracted crawler space pipe repairs to junior apprentice crews.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_05',
    title: 'The Hostile Takeover Inquest 👔',
    description: 'A rival multinational firm quietly acquires twenty-eight percent of your enterprise. The board meets to weigh your survival.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && (job.includes('ceo') || job.includes('executive') || job.includes('director'));
    },
    choices: [
      {
        choiceText: 'Activate the corporate defense poison pill to dilute outstanding stock.',
        outcomeText: 'You issue massive discounted stock structures. The acquisition price skyrockets, saving your CEO seat.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, stress: 30, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Triggered advanced poison pill equity dilutions to defeat hostile board takeovers.`);
        }
      },
      {
        choiceText: 'Surrender your executive seat in barter for a triple-salary golden parachute.',
        outcomeText: 'You sign the resignation. You lose your proud titles, but stack one hundred thousand dollars in cash reserves.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: -10, happiness: 15, stress: -20 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 100000, 20000000);
          s.characterInfo.currentOccupation = 'Unemployed';
          s.log.push(`Age ${s.characterInfo.age}: Liquidated your startup executive chair for a handsome cash golden parachute.`);
        }
      },
      {
        choiceText: 'Negotiate a direct, peaceful merger with the incoming corporate buyers.',
        outcomeText: 'You agree to run their combined regional product unit. Your team stays employed, but you report to new masters.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 10, karma: 15, happiness: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Concluded friendly merger parameters to secure corporate staff employment.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_06',
    title: 'The High-Prestige Row 🚗',
    description: 'A wealthy passenger leaves a leather designer briefcase worth nine thousand dollars inside your trunk spaces.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && (job.includes('driver') || job.includes('taxi') || job.includes('rideshare'));
    },
    choices: [
      {
        choiceText: 'Drive fifty miles to deliver the briefcase back to their luxury condo.',
        outcomeText: 'The grateful passenger leaves a shining five-hundred-dollar cash tip and glowing app reports.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 35, happiness: 15, stress: 5 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 500, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Drove across municipal counties to return luxury goods to rideshare clients.`);
        }
      },
      {
        choiceText: 'Pawn the designer leather container at an unindexed antique dealer.',
        outcomeText: 'You secure twelve hundred dollars in crisp cash notes. No complaints are registered, but your conscience twinges.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -35, smarts: 15 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 1200, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Sold a forgotten passenger designer briefcase on black salvage markets.`);
        }
      },
      {
        choiceText: 'Deposit the item at your localized police storage hub.',
        outcomeText: 'You offload the legal liability. You log zero monetary updates but keep clean records.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Dropped off unclaimed client transport bags with local police precincts.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_07',
    title: 'The Treasury Audit Conflict 📊',
    description: 'You notice a two-million-dollar accounting discrepancy in your firm’s offshore shell holdings. Your team leader asks you to ignore it.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && job.includes('analyst');
    },
    choices: [
      {
        choiceText: 'Submit an anonymous dossier directly to internal compliance boards.',
        outcomeText: 'A silent internal purge is initiated. Your name stays clean, but the workplace environment becomes highly paranoid.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 30, stress: 25, happiness: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Dispatched an anonymous internal filing regarding offshore audit irregularities.`);
        }
      },
      {
        choiceText: 'Archive the discrepancies under general corporate overhead headers.',
        outcomeText: 'Your compliance leader praises your pragmatism. You receive a standard salary bump, but you sleep poorly.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -25, stress: 15, happiness: 10 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 3000, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Ignored overseas auditing gaps on executive commands (+salary bonuses).`);
        }
      },
      {
        choiceText: 'Leverage the auditing discovery to demand immediate office promotions.',
        outcomeText: 'The director looks trapped. They yield to your salary requests, but your professional relationship is forever shattered.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -30, stress: 35, looks: -5 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 6000, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Coerced finance managers into fast-tracking your team salary level.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_08',
    title: 'The Tainted Vial Crisis 💉',
    description: 'A frantic night shift reveals that several insulin vials in the ICU refrigerator were stored at high temperatures due to a power outage.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && job.includes('nurse');
    },
    choices: [
      {
        choiceText: 'Report the storage failure and discard all suspected vials.',
        outcomeText: 'You prevent any patient issues. The ward administrator is annoyed at the budget loss, but your integrity is clear.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 35, stress: 15, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Discarded temperature-tainted medicine batches, protecting clinical ward patients.`);
        }
      },
      {
        choiceText: 'Test each vial manually under chemical testers while handling your duties.',
        outcomeText: 'You work a brutal fifteen-hour night shift. You save most of the vials and protect patients, but collapse in fatigue.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, smarts: 20, stress: 30, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Saved pharmaceutical inventory through emergency manual diagnostic testing.`);
        }
      },
      {
        choiceText: 'Administer the medicine regardless, assuming cold margins of error.',
        outcomeText: 'Two patients suffer acute spikes, forcing a quiet medical inquiry. You narrowly avoid suspension.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -45, health: -10, stress: 45, happiness: -20 });
          s.log.push(`Age ${s.characterInfo.age}: Faced clinical disciplinary hearings for ignoring ward vaccine storage codes.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_09',
    title: 'The Shoddy Retainer Draft ⚖️',
    description: 'Your legal assistant drafts a partnership contract but leaves out a vital liability limitation clause on client investments.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && (job.includes('lawyer') || job.includes('attorney'));
    },
    choices: [
      {
        choiceText: 'Rewrite the entire fifty-page contract manually before the morning meeting.',
        outcomeText: 'Your eyes burn from cheap coffee, but the corporate draft is flawless. The partners note your precision.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, stress: 25, health: -10, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Redrafted defective investment partnership compacts overnight (+$3,000 bonus).`);
        }
      },
      {
        choiceText: 'Blame the legal assistant during the round-table client review.',
        outcomeText: 'The assistant is fired, and you look like a cold manager. The client demands immediate draft edits anyway.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -25, stress: 15, looks: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Deflected serious drafting failures directly onto junior legal assistants.`);
        }
      },
      {
        choiceText: 'Postpone the transaction, citing pending global asset evaluations.',
        outcomeText: 'You delay the deal by three weeks. The client is frustrated, but you gain time to rectify the clauses.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -10, happiness: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Postponed major commercial investments to rewrite core liability terms.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_10',
    title: 'The AI Scraping Scandal 💻',
    description: 'Your development team is discovered to have trained a predictive language tool using copyrighted client database records.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && (job.includes('engineer') || job.includes('developer'));
    },
    choices: [
      {
        choiceText: 'Purge the database models and rebuild using authorized records.',
        outcomeText: 'You waste six months of work and delay the product launch, but you preserve the company’s ethical standard.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 30, stress: 20, happiness: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Rebuilt predictive code pipelines from scratch to resolve copyrighted scraping disputes.`);
        }
      },
      {
        choiceText: 'Obfuscate the pipeline architecture to slide under audit screens.',
        outcomeText: 'The product launches on schedule. Your team scores stock updates, though legal risks loom in the shadows.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -35, smarts: 20, stress: 30 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 8000, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Obfuscated corporate database architectures to protect illegal data pipelines.`);
        }
      },
      {
        choiceText: 'Publish an open-source tool code leak to force complete transparency.',
        outcomeText: 'The tool becomes free globally. The agency loses profits but is praised by the developer community.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 20, looks: 10, stress: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Leaked controversial proprietary systems to the global developer community.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_11',
    title: 'The Hollywood Face Lift ⚕️',
    description: 'A cinematic action veteran offers seventy thousand dollars for an experimental skin-contouring treatment that lacks full safety clearance.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && job.includes('surgeon');
    },
    choices: [
      {
        choiceText: 'Reject the procedure, advising them to select standard therapeutic options.',
        outcomeText: 'The actor storms out and tweets about your rigidity. You lose fame but protect your license.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 25, stress: -15, happiness: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Avoided legal risks by denying unapproved cosmetic skin-contouring requests.`);
        }
      },
      {
        choiceText: 'Administer the experimental skin-contouring under private clinic settings.',
        outcomeText: 'The treatment is an incredible success! They look twenty years younger. Your secret client bank swells.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, karma: -30, stress: 35, happiness: 25 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 70000, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Conducted unauthorized clinical treatments for famous Hollywood veterans (+$70,000).`);
        }
      },
      {
        choiceText: 'Collaborate with university researchers to host an approved clinical trial.',
        outcomeText: 'The trial is approved. The actor waits six months, but the treatment serves as a prestigious career peak.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 30, happiness: 15, stress: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Pioneered approved clinical trials for novel aesthetic dermis-contouring therapies.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_12',
    title: 'The Backflow Contamination 🔧',
    description: 'A commercial dairy warehouse reports a massive cross-connection leak that risks pumping fluid process waste into local drinking systems.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && job.includes('plumber');
    },
    choices: [
      {
        choiceText: 'Install specialized dual-check backflow preventer valves.',
        outcomeText: 'Your rapid copper soldering secures the barrier. The local drinking supply is perfectly preserved.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 35, smarts: 20, happiness: 15 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 1500, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Prevented municipal fluid contamination by setting up dual-check system valves.`);
        }
      },
      {
        choiceText: 'Notify municipal sanitarians immediately to flag the facility.',
        outcomeText: 'The factory is shut down for investigation. The warehouse director hates you, but a contagion is bypassed.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 30, stress: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Filed health warnings to municipal water bureaus concerning dairy backflows.`);
        }
      },
      {
        choiceText: 'Charge triple emergency rates to bypass standard utility warnings.',
        outcomeText: 'They pay your heavy invoice. You fix the fault quietly, leaving corporate inspection records blank.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -25, stress: 20 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 4500, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Levied triple emergency service rates to cover chemical warehouse faults.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_13',
    title: 'The Venture Capital Freeze 👔',
    description: 'A scheduled two-million-dollar funding tier is frozen due to market corrections. Your runway is reduced to twelve weeks.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && (job.includes('ceo') || job.includes('executive') || job.includes('director'));
    },
    choices: [
      {
        choiceText: 'Lay off thirty percent of your development staff to extend operational runways.',
        outcomeText: 'A gut-wrenching day. You save the firm, but the office morale collapses and you feel terrible.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -30, stress: 35, happiness: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Discharged thirty percent of staff to prolong digital tech operations.`);
        }
      },
      {
        choiceText: 'Pledge your personal real estate as collateral for urgent commercial bank files.',
        outcomeText: 'You secure a short-term loan. The team stays together, but your stress climbs to historic heights.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 45, happiness: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Leveraged personal security assets to fund pending corporate salary tiers.`);
        }
      },
      {
        choiceText: 'Pivot the product line to high-margin consulting work instantly.',
        outcomeText: 'You secure quick client billings. The long-term software builds are delayed, but cash flow stabilizes.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 15, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Pivoted tech company operations to high-margin consulting to stabilize income.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_14',
    title: 'The Wild Passenger Rampage 🚗',
    description: 'An intoxicated regional politician starts tearing your car doors and insulting your background at eighty miles per hour.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && (job.includes('driver') || job.includes('taxi') || job.includes('rideshare'));
    },
    choices: [
      {
        choiceText: 'Pull over at the nearest highway gas plaza and command them to leave.',
        outcomeText: 'They curse loudly, leaving a one-star review, but you preserve your physical safety and standard cabin sanity.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 10, stress: 20, happiness: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Terminated dangerous passenger routes at dark highway plazas to defend cabin safety.`);
        }
      },
      {
        choiceText: 'Drive directly to the local police academy gates with active locking mechanisms.',
        outcomeText: 'Duty officers restrain the passenger. The state senator is highly embarrassed and pays you off to drop claims.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, happiness: 15, stress: 10 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 2000, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Transported out-of-control passengers directly to regional police precinct gates.`);
        }
      },
      {
        choiceText: 'De-escalate the situation with quiet humor and complete the route.',
        outcomeText: 'They sober up slightly, dumping a hundred-dollar cash reconciliation tip on your dashboard.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: 10, happiness: 10 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 100, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: De-escalated intoxicated transit emergencies using patient dialogue.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_15',
    title: 'The Leaked Valuation File 📊',
    description: 'You discover that your senior financial analyst left a draft of a private merger evaluation unsecured on an enterprise copier.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && job.includes('analyst');
    },
    choices: [
      {
        choiceText: 'Secure the document pile silently and lock it within legal vaults.',
        outcomeText: 'You avoid a systemic leak. The team remains clueless, but your quiet diligence is appreciated by executives.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: -5, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Secured loose corporate valuation drafts to prevent public acquisition panic.`);
        }
      },
      {
        choiceText: 'Expose the analyst’s mistake directly to the division VP.',
        outcomeText: 'The careless analyst is suspended. Your focus on security is noted, though teammates now find you cold.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -20, looks: -5, happiness: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Reported team security infractions to senior management.`);
        }
      },
      {
        choiceText: 'Leak the target valuation details quietly to buy call options.',
        outcomeText: 'You trade using third-party accounts. The deal goes public, clearing twenty-four thousand dollars in profit.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -50, smarts: 20, stress: 40 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 24000, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Initiated illegal offshore option positions using leaked corporate blueprints.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_16',
    title: 'The Triage Overload 💉',
    description: 'A multi-car pileup floods the hospital trauma center. Management orders you to process patients without writing full intake charts.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && job.includes('nurse');
    },
    choices: [
      {
        choiceText: 'Insist on following complete administrative verification protocols.',
        outcomeText: 'You prevent medication errors, but the clinical pipeline is heavily clogged. Executives reprimand your speed.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 30, stress: 25, happiness: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Maintained complete administrative checklist protocols during heavy ward casualties.`);
        }
      },
      {
        choiceText: 'Handle the crisis pacing manually, sorting critical cases with rapid visual checks.',
        outcomeText: 'You save twelve lives during a grueling shift. You collapse on a bench at dawn, aching but deeply proud.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, smarts: 20, karma: 35, happiness: 20 });
          s.log.push(`Age ${s.characterInfo.age}: Handled emergency trauma triage filters under heavy disaster situations.`);
        }
      },
      {
        choiceText: 'Call in sick to avoid participating in an unsafe work environment.',
        outcomeText: 'You spend the day drinking green tea at home. Your colleagues are overworked, but your health is preserved.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, stress: -25, karma: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Called in sick during emergency room overflows to preserve personal sanity.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_17',
    title: 'The Fragile Witness ⚖️',
    description: 'A key witness in a major insurance liability trial is terrified of testifying against a corrupt local developer.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && (job.includes('lawyer') || job.includes('attorney'));
    },
    choices: [
      {
        choiceText: 'Prepare deposition recordings in private conference spaces to bypass public court appearances.',
        outcomeText: 'They testify calmly behind closed security gates, ensuring a major legal victory against the cartel.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, karma: 25, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Authored custom private deposition filings to shield intimidated witnesses.`);
        }
      },
      {
        choiceText: 'Subpoena the witness aggressively, threatening contempt of court charges.',
        outcomeText: 'They testify on the stand but break down in tears and provide inconsistent answers, damaging the case.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 20, karma: -15, happiness: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Enforced federal subpoenas against vulnerable courtroom civilian witnesses.`);
        }
      },
      {
        choiceText: 'Hire security contractors to guard the witness before the trial.',
        outcomeText: 'A protective detail costs you four thousand dollars. The witness testifies flawlessly, winning the litigation.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, karma: 30, stress: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 4000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Contracted personal defense teams to secure key litigation witnesses (-$4,000).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_18',
    title: 'The Cobol Pipeline Outage 💻',
    description: 'The ancient transaction core of a regional banking customer fails. It runs on 1974 mainframe assembly layers.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && (job.includes('engineer') || job.includes('developer'));
    },
    choices: [
      {
        choiceText: 'Study historic IBM reference manuals to debug the register allocations.',
        outcomeText: 'You trace a memory overflow inside vintage card decks. The treasury pipeline resolves beautifully.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 30, stress: 15, happiness: 20 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 5000, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Handled vintage corporate mainframe assembly debugging codes successfully.`);
        }
      },
      {
        choiceText: 'Recommend a total database modernization project costing three million dollars.',
        outcomeText: 'The bank accepts the modernization bid, signing your firm to a lucrative four-year integration contract.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: -5, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Drafted system-wide architecture overhauls for legacy retail financial systems.`);
        }
      },
      {
        choiceText: 'Refuse to work on technology built before your birth year.',
        outcomeText: 'The system remains offline. Management is forced to locate an expensive eighty-year-old contractor.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -20, looks: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Avoided vintage mainframe system maintenance assignments.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_19',
    title: 'The Suture Slip ⚕️',
    description: 'During a grueling pediatric hernia repair operation, your micro-needle slips, causing minor bleeding near the groin.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && job.includes('surgeon');
    },
    choices: [
      {
        choiceText: 'Apply an immediate electrocautery seal and check the surrounding tissues.',
        outcomeText: 'The bleeding stops instantly. The patient recovers perfectly with zero post-operative pain or issues.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 20, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Corrected an intraoperative micro-vessel leak with rapid electrocautery.`);
        }
      },
      {
        choiceText: 'Summon an experienced chief vascular specialist to take over the surgical field.',
        outcomeText: 'The chief seals the vessel easily, but your technical record is quietly flagged for performance review.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: -10, stress: -10, happiness: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Delegated critical intraoperative complications to specialty department chiefs.`);
        }
      },
      {
        choiceText: 'Conceal the slip in the official surgical record file.',
        outcomeText: 'The child recovers, but you feel intense shame and stress knowing you filed false medical charts.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -40, stress: 35, happiness: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Falsified post-operative surgical logs to cover micro-incision failures.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_20',
    title: 'The High-Rise Pipe Burst 🔧',
    description: 'A luxury penthouse has a main water line freeze, threating to flood a million-dollar art collection on the floor below.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && job.includes('plumber');
    },
    choices: [
      {
        choiceText: 'Freeze the pipeline upstream with a carbon dioxide sleeve and solder a new brass joint.',
        outcomeText: 'Your rapid ice-plug technique halts the flow. The art gallery stays bone-dry. The owner rewards you handsomely.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, stress: 15, happiness: 20 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 2500, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Saved a luxury penthouse art gallery from massive water floods using cryogenic pipe-freezing (+$2,500).`);
        }
      },
      {
        choiceText: 'Turn off the main building valve, disabling water for sixty luxury condos.',
        outcomeText: 'The gallery is saved, but sixty wealthy residents are without water for two days, cursing your company.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -10, happiness: -5, looks: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Terminated master high-rise valves to isolate penthouse distribution leaks.`);
        }
      },
      {
        choiceText: 'Demand a five-hundred-dollar emergency signing deposit.',
        outcomeText: 'They pay instantly. You execute a standard repair, though the gallery floor sustains minor canvas damage.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -15, stress: 10 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 500, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Levied steep upfront service deposits during high-rise water emergencies.`);
        }
      }
    ]
  },

  // =========================================================================
  // DOMESTIC & FAMILY FRICTION (Events 21 to 34: Family and Marital Friction)
  // =========================================================================
  {
    id: 'mid_dp2_fam_01',
    title: 'The Pre-Wedding Fallout 💍',
    description: 'Your fiancé’s wealthy parents refuse to attend the ceremony unless you sign an incredibly restrictive pre-nuptial agreement.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45 && s.maritalStatus === 'Dating';
    },
    choices: [
      {
        choiceText: 'Sign the pre-nuptial document to keep family relationships peaceful.',
        outcomeText: 'The wedding proceeds in grand luxury. The in-laws are happy, but your clean financial rights are heavily curtailed.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 15, stress: 15, looks: -5 });
          const partner = s.relationships.find(r => r.relationshipType === 'Partner');
          if (partner) {
            partner.relationshipValue = Math.min(partner.relationshipValue + 25, 100);
            partner.hasPrenup = true;
          }
          s.log.push(`Age ${s.characterInfo.age}: Signed highly restrictive pre-nuptial contracts to secure in-law relations.`);
        }
      },
      {
        choiceText: 'Refuse the pre-nup completely and offer a simple wedding ceremony in the garden.',
        outcomeText: 'A huge family fight! Your partner stands by you, of course, but the wealthy in-laws boycott the reception.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 25, happiness: -10, karma: 10 });
          const partner = s.relationships.find(r => r.relationshipType === 'Partner');
          if (partner) partner.relationshipValue = Math.max(partner.relationshipValue - 10, 0);
          s.log.push(`Age ${s.characterInfo.age}: Rejected restrictive in-law pre-nups to organize informal garden ceremonies.`);
        }
      },
      {
        choiceText: 'Hire an aggressive divorce lawyer to draft a balanced mutual agreement.',
        outcomeText: 'A long legal back-and-forth cost you two thousand dollars, but you lock in a completely fair compromise.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 2000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Renegotiated pre-nuptial agreements using private family legal counsel (-$2,000).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_02',
    title: 'The Tense Thanksgiving Diner 🍗',
    description: 'During Thanksgiving dinner, your relative accuses your partner of being a lazy parasite in front of twelve silent guests.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45 && s.maritalStatus === 'Married';
    },
    choices: [
      {
        choiceText: 'Confront the relative immediately and order them to exit the residence.',
        outcomeText: 'They leave in a furious huff. Your partner feels fully supported, though half the family stops calling you.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 10, stress: 20, karma: 15 });
          const partner = s.relationships.find(r => r.relationshipType === 'Partner');
          if (partner) partner.relationshipValue = Math.min(partner.relationshipValue + 20, 100);
          s.log.push(`Age ${s.characterInfo.age}: Commenced immediate dinner table expulsions to defend your spouse from insults.`);
        }
      },
      {
        choiceText: 'Stay completely silent to bypass further high-stress theater.',
        outcomeText: 'The dinner continues awkwardly. Your partner is deeply wounded by your passivity, causing a chilly bedroom week.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: -20, stress: 15, karma: -10 });
          const partner = s.relationships.find(r => r.relationshipType === 'Partner');
          if (partner) partner.relationshipValue = Math.max(partner.relationshipValue - 25, 0);
          s.log.push(`Age ${s.characterInfo.age}: Maintained passive silence during severe public verbal attacks on your partner.`);
        }
      },
      {
        choiceText: 'Deflect the entire scene with an elegant joke about local politics.',
        outcomeText: 'You successfully dissolve the crisis. Your partner remains hurt, but you avoid a complete holiday split.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Defused explosive holiday dinner clashes using rapid comedic dialogue.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_03',
    title: 'The HOA Oak Battle 🌳',
    description: 'Your neighborhood Homeowners Association files a structural notice demanding you fell a beautiful eighty-year-old oak tree on your front yard.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const ownsHome = s.assets?.some(a => a.type === 'real_estate');
      return age !== undefined && age >= 26 && age <= 45 && ownsHome;
    },
    choices: [
      {
        choiceText: 'File an environmental appeal with city arborists to secure historic registry labels.',
        outcomeText: 'A massive victory! The city grants the oak protected status. The HOA backing board is legally blocked.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, happiness: 25, stress: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Safeguarded an ancient yard oak by registering it with municipal forestry boards.`);
        }
      },
      {
        choiceText: 'Cut down the ancient tree to avoid expensive structural HOA fines.',
        outcomeText: 'You clear the tree for eight hundred dollars. Your front yard is empty and hot. You feel incredibly sad.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: -20, stress: -10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 800, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Felled a historic yard oak to bypass persistent HOA administrative fines (-$800).`);
        }
      },
      {
        choiceText: 'Organize a neighborhood blockade to intercept their arborists.',
        outcomeText: 'Highly public neighborhood drama! The story reaches municipal print. The tree stays, but you are a local pariah.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: -10, stress: 30, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Conducted local property lockouts to shield neighborhood botanical assets.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_04',
    title: 'The Cradle Upkeep Spike 🍼',
    description: 'Private toddler nursery care centers in your metropolitan district hike their tuition by seventy percent.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const hasChildren = s.relationships.some(r => r.relationshipType === 'Child' && r.age < 5);
      return age !== undefined && age >= 26 && age <= 45 && hasChildren;
    },
    choices: [
      {
        choiceText: 'Pay the premium tuition rate to secure premium early developmental courses.',
        outcomeText: 'You spend sixty-five hundred dollars. Your toddler studies basic coding blocks, but your bank is drained.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 20, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 6500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Financed high-tier early children nurseries despite tuition spikes (-$6,500).`);
        }
      },
      {
        choiceText: 'Co-op nursery care duties weekly with five neighborhood families.',
        outcomeText: 'You teach finger-painting on alternate Thursdays. It saves cash and builds real neighborhood ties.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, karma: 20, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Organized neighborhood child-sitting cooperatives to bypass premium tuition rates.`);
        }
      },
      {
        choiceText: 'Overlook early nurseries completely, teaching the toddler at home.',
        outcomeText: 'You work with wooden alphabet blocks in the evening. You preserve cash, but feel constantly exhausted.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -10, stress: 25, happiness: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Conducted home preschool curricula to maintain basic family budgets.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_05',
    title: 'The Heirloom Partition 💍',
    description: 'Following a granduncles death, family factions start screaming over who inherits an eighteen-carat gold ancestral ring.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Surrender all inheritance claims to keep relations completely quiet.',
        outcomeText: 'Your siblings divide the gold pieces. You walk away empty-handed, but cousins praise your peaceful heart.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 30, stress: -15, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Renounced inheritance claims of family gold rings to foster domestic peace.`);
        }
      },
      {
        choiceText: 'Engage estate attorneys to assert your lawful estate priority fraction.',
        outcomeText: 'You secure the ancestral ring after cold litigation. Siblings refuse to speak to you for decades.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -35, stress: 25, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1500, -500000);
          s.assets.push({
            id: 'ring_dp2_' + Date.now(),
            name: ' ancestral gold ring',
            type: 'other',
            purchasePrice: 0,
            currentValue: 3500,
            annualUpkeep: 0,
            isFinanced: false,
            loanDetails: null,
            subtype: 'Ring'
          });
          s.log.push(`Age ${s.characterInfo.age}: Asserted court legal petitions to secure ancestral solid gold rings.`);
        }
      },
      {
        choiceText: 'Propose donating the heirloom value immediately to pediatric heart clinics.',
        outcomeText: 'A beautiful compromise! Your siblings are shame-faced and agree. A civic hospital plaque honors your family.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 40, looks: 10, happiness: 20 });
          s.log.push(`Age ${s.characterInfo.age}: Redirected disputed estate assets directly to public pediatric healthcare wards.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_06',
    title: 'The Silent Dinner Retreat 🏠',
    description: 'You return from a grueling company sprint to find your partner in tears. They feel like a lonely background accessory in your life.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45 && s.maritalStatus === 'Married';
    },
    choices: [
      {
        choiceText: 'Book an immediate four-day seaside digital detox package.',
        outcomeText: 'You pack your bags, leaving your work terminal off. You lose fifteen hundred dollars, but restore your lover’s soul.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 25, health: 15, stress: -20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1500, -500000);
          const partner = s.relationships.find(r => r.relationshipType === 'Partner');
          if (partner) partner.relationshipValue = Math.min(partner.relationshipValue + 30, 100);
          s.log.push(`Age ${s.characterInfo.age}: Organized seaside digital detox breaks to restore deteriorating marital bonds.`);
        }
      },
      {
        choiceText: 'Explain that your long corporate overtimes fund their private safety nets.',
        outcomeText: 'An exhausting argument. They accept the logic but feel emotionally starved. The silence deepens.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 25, happiness: -10 });
          const partner = s.relationships.find(r => r.relationshipType === 'Partner');
          if (partner) partner.relationshipValue = Math.max(partner.relationshipValue - 15, 0);
          s.log.push(`Age ${s.characterInfo.age}: Defended workplace overtimes over domestic quality interactions during arguments.`);
        }
      },
      {
        choiceText: 'Schedule a weekly Thursday dinner date with strict calendar blocks.',
        outcomeText: 'You stick to the schedule. A simple, consistent routine that successfully returns warmth to your kitchen.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, happiness: 15, stress: -5 });
          const partner = s.relationships.find(r => r.relationshipType === 'Partner');
          if (partner) partner.relationshipValue = Math.min(partner.relationshipValue + 15, 100);
          s.log.push(`Age ${s.characterInfo.age}: Established mandatory weekly evening dates to defend family communication channels.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_07',
    title: 'The Backyard Coop Debate 🐔',
    description: 'Your partner buys eight organic egg laying hens without checking local zoning codes, generating noise and feed flies.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const ownsHome = s.assets?.some(a => a.type === 'real_estate');
      return age !== undefined && age >= 26 && age <= 45 && s.maritalStatus === 'Married' && ownsHome;
    },
    choices: [
      {
        choiceText: 'Build an elegant, fully insulated cedar coop of matching layout.',
        outcomeText: 'You spend nine hundred dollars. The chickens are quiet, and you eat wonderful yellow organic farm eggs weekly.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 15, stress: -5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 900, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Assembled premium wooden cedar backyard coops to isolate backyard noise (-$900).`);
        }
      },
      {
        choiceText: 'Command your partner to return the birds to farm dealers.',
        outcomeText: 'A massive marital crisis. They feel you stomp on their organic self-reliance dreams, though the garden stays quiet.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 15, happiness: -10 });
          const partner = s.relationships.find(r => r.relationshipType === 'Partner');
          if (partner) partner.relationshipValue = Math.max(partner.relationshipValue - 20, 0);
          s.log.push(`Age ${s.characterInfo.age}: Banished backyard laying flocks to preserve garden sanctuary profiles.`);
        }
      },
      {
        choiceText: 'Register the birds silently as local therapeutic emotional services.',
        outcomeText: 'Your compliance trick bypasses neighbors complaints. The eggs taste amazing and licensing is secure.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Logged backyard poultry items under therapeutic license clauses.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_08',
    title: 'The Sibling Venture Pitch 🏪',
    description: 'Your sibling begs you to invest seven thousand dollars into their startup artisanal vegan sausage truck business.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const hasSiblings = s.relationships.some(r => r.relationshipType === 'Sibling');
      return age !== undefined && age >= 26 && age <= 45 && hasSiblings;
    },
    choices: [
      {
        choiceText: 'Wire the seven thousand dollars cash to fund their business dream.',
        outcomeText: 'The truck opens to terrible municipal reviews. The venture collapses inside a year. You lose all capital, but family relations are sweet.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 30, happiness: 5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 7000, -500000);
          const sib = s.relationships.find(r => r.relationshipType === 'Sibling');
          if (sib) sib.relationshipValue = Math.min(sib.relationshipValue + 30, 100);
          s.log.push(`Age ${s.characterInfo.age}: Seeded seven thousand dollars of personal cash to back family street ventures (-$7,000).`);
        }
      },
      {
        choiceText: 'Decline to invest, citing strict diversification rules.',
        outcomeText: 'Your sibling is deeply hurt and skips your birthday dinner. Your bank reserves stay perfectly safe.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 5, happiness: -5 });
          const sib = s.relationships.find(r => r.relationshipType === 'Sibling');
          if (sib) sib.relationshipValue = Math.max(sib.relationshipValue - 20, 0);
          s.log.push(`Age ${s.characterInfo.age}: Denied direct family funding requests for high-risk street vending prototypes.`);
        }
      },
      {
        choiceText: 'Propose writing a formal corporate business structure as their mentor.',
        outcomeText: 'You help them draft a beautiful roadmap. They secure institutional credit, keeping you out of direct financial risk.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Drafted professional corporate business guides to help family startups get bank loans.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_09',
    title: 'The Elderly Parent Fall 🦽',
    description: 'Your aging mother suffers a severe hip fracture on kitchen tiles. She requires continuous home medical support.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const possessesParents = s.relationships.some(r => r.relationshipType === 'Parent' && !r.isDead);
      return age !== undefined && age >= 26 && age <= 45 && possessesParents;
    },
    choices: [
      {
        choiceText: 'Acquire senior healthcare suite services for eight thousand dollars.',
        outcomeText: 'Professional therapists manage her recovery beautifully. She smiles in clean comfort, and you deep breathe.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 35, happiness: 15, stress: -10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 8000, -500000);
          const parent = s.relationships.find(r => r.relationshipType === 'Parent' && !r.isDead);
          if (parent) parent.relationshipValue = Math.min(parent.relationshipValue + 20, 100);
          s.log.push(`Age ${s.characterInfo.age}: Financed high-quality professional clinical suites for your recovery mother (-$8,000).`);
        }
      },
      {
        choiceText: 'Welcome her into your guest bedroom, managing her clinical needs personally.',
        outcomeText: 'You lift and wash her daily. Your professional focus drops and you smell of antiseptic, but her gratitude is profound.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, stress: 30, karma: 40, happiness: 20 });
          const parent = s.relationships.find(r => r.relationshipType === 'Parent' && !r.isDead);
          if (parent) parent.relationshipValue = Math.min(parent.relationshipValue + 35, 100);
          s.log.push(`Age ${s.characterInfo.age}: Managed maternal clinical rehabilitation within your personal residential suite.`);
        }
      },
      {
        choiceText: 'Delegate her custody to distant regional state nursing homes.',
        outcomeText: 'She gets basic care. You feel massive waves of guilt, though your daily schedules remain completely quiet.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -30, happiness: -15, stress: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Delegated senior parent clinical custody to standard distant municipal homes.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_10',
    title: 'The Over-Scheduled Toddler 🎨',
    description: 'Your parent circle insists that a seven-year-old must take violin, fencing, coding, and Russian or risk future university failure.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const hasChild = s.relationships.some(r => r.relationshipType === 'Child' && r.age >= 6 && r.age <= 12);
      return age !== undefined && age >= 26 && age <= 45 && hasChild;
    },
    choices: [
      {
        choiceText: 'Refuse the academic arms race and prioritize long outdoor field games.',
        outcomeText: 'Your child runs wild in forests, capturing tiny frogs. They laugh constantly, though elite parents gossip.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, happiness: 25, stress: -15, karma: 15 });
          const child = s.relationships.find(r => r.relationshipType === 'Child');
          if (child) child.relationshipValue = Math.min(child.relationshipValue + 20, 100);
          s.log.push(`Age ${s.characterInfo.age}: Bypassed intense childhood educational curricula to encourage forest exploration.`);
        }
      },
      {
        choiceText: 'Enroll them in all four elite development programs for four thousand dollars.',
        outcomeText: 'Your car becomes an exhausting taxi cabin. The child looks high-stress, but they play violin beautifully.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 25, happiness: -10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 4000, -500000);
          const child = s.relationships.find(r => r.relationshipType === 'Child');
          if (child) child.relationshipValue = Math.max(child.relationshipValue - 10, 0);
          s.log.push(`Age ${s.characterInfo.age}: Funded intensive extracurricular fencing, violin, and coding tracks for children (-$4,000).`);
        }
      },
      {
        choiceText: 'Teach them chess and mechanical handiwork in your shed lanes.',
        outcomeText: 'A balanced track! You build wooden shelves and study the Sicilian Defense, saving cash and growing close.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, happiness: 20, stress: -10 });
          const child = s.relationships.find(r => r.relationshipType === 'Child');
          if (child) child.relationshipValue = Math.min(child.relationshipValue + 25, 100);
          s.log.push(`Age ${s.characterInfo.age}: Commenced carpentry and strategy games as home educational alternatives.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_11',
    title: 'The Tense In-Law Visit 🏠',
    description: 'Your spouse’s mother stays in your living room. She systematically reorganizes your cookware, calling your space dirty.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45 && s.maritalStatus === 'Married';
    },
    choices: [
      {
        choiceText: 'Inhale deeply and thank her for her residential cleaning support.',
        outcomeText: 'Your patience works like magic! She stops her critiques and buys you a premium frying pan.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -10, karma: 20, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Tolerated in-law domestic adjustments calmly to protect marriage peace.`);
        }
      },
      {
        choiceText: 'Tell her to pack her bags and book local suites immediately.',
        outcomeText: 'She exits weeping. Your spouse is intensely angry, resulting in weeks of cold basement retreats.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 30, happiness: -15 });
          const partner = s.relationships.find(r => r.relationshipType === 'Partner');
          if (partner) partner.relationshipValue = Math.max(partner.relationshipValue - 25, 0);
          s.log.push(`Age ${s.characterInfo.age}: Evicted criticizing in-laws from your domestic residence during holiday arguments.`);
        }
      },
      {
        choiceText: 'Spend all your evening hours at the local library sorting records.',
        outcomeText: 'You avoid all direct conflict. The domestic dishes stay dirty, but you remain peaceful.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Avoided household friction by spending late nights studying in city libraries.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_12',
    title: 'The Teenage Smuggle 🚬',
    description: 'You find two vape pens and a hidden bottle of stolen peach whiskey under your fourteen-year-old childs mattress.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const hasTeen = s.relationships.some(r => r.relationshipType === 'Child' && r.age >= 13 && r.age <= 17);
      return age !== undefined && age >= 26 && age <= 45 && hasTeen;
    },
    choices: [
      {
        choiceText: 'Sit them down for a serious, non-punitive dialogue on substance health risks.',
        outcomeText: 'They cry, hug you, and surrender the items. You feel deeply connected as parents.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 30, happiness: 20, stress: -5 });
          const child = s.relationships.find(r => r.relationshipType === 'Child');
          if (child) child.relationshipValue = Math.min(child.relationshipValue + 20, 100);
          s.log.push(`Age ${s.characterInfo.age}: Handled teenage substance issues using constructive physical dialogue.`);
        }
      },
      {
        choiceText: 'Confiscate their phone and lock them inside the residence for a month.',
        outcomeText: 'A wall of absolute silent hostility descends. They sneak out the basement windows regardless.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 25, happiness: -15 });
          const child = s.relationships.find(r => r.relationshipType === 'Child');
          if (child) child.relationshipValue = Math.max(child.relationshipValue - 20, 0);
          s.log.push(`Age ${s.characterInfo.age}: Imposed strict domestic lockdown punishments on rebellious adolescents.`);
        }
      },
      {
        choiceText: 'Enroll them in a high-intensity wilderness navigation adventure.',
        outcomeText: 'It costs you twelve hundred dollars. They return dirty, athletic, and fully focused on nature trails.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 10, smarts: 15, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1200, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Funded rugged outdoor survival camps to redirect teenage energy (-$1,200).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_13',
    title: 'The Great Pet Crisis 🐕',
    description: 'Your child begs you for a large Siberian Husky, but your partner claims they are highly allergic to animal hair.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const hasChild = s.relationships.some(r => r.relationshipType === 'Child');
      return age !== undefined && age >= 26 && age <= 45 && s.maritalStatus === 'Married' && hasChild;
    },
    choices: [
      {
        choiceText: 'Buy a certified hypoallergenic Labradoodle puppy instead.',
        outcomeText: 'You spend eighteen hundred dollars. Your child is thrilled, and your spouse breathes perfectly.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 25, stress: -10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1800, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Sourced breed hypo-allergenic dogs to satisfy child pet demands safely (-$1,800).`);
        }
      },
      {
        choiceText: 'Refuse the pet request completely to keep carpets clean.',
        outcomeText: 'Your child weeps at dinners, and you feel like a cold villain, though your vacuum clean-ups are zero.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -5, happiness: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Denied child pet demands to preserve household carpets.`);
        }
      },
      {
        choiceText: 'Adopt a small green turtle named Socrates.',
        outcomeText: 'Socrates eats lettuce silently. Your partner is calm, and the child is mildly amused.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 10, stress: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Adopted a quiet home turtle to circumvent marital allergy friction.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_14',
    title: 'The Secret Bank Account 💸',
    description: 'You discover your spouse has been hoarding forty thousand dollars in a secret, unindexed private bank account.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45 && s.maritalStatus === 'Married';
    },
    choices: [
      {
        choiceText: 'Request a calm, transparent dialogue concerning marital trust standards.',
        outcomeText: 'They confess they kept it as an anxiety safety net from their childhood. You agree to set up joint accounts.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 30, stress: -10, happiness: 15 });
          const partner = s.relationships.find(r => r.relationshipType === 'Partner');
          if (partner) partner.relationshipValue = Math.min(partner.relationshipValue + 15, 100);
          s.log.push(`Age ${s.characterInfo.age}: Conducted constructive marital reviews of undeclared private savings.`);
        }
      },
      {
        choiceText: 'Open your own secret offshore account and save matching reserves.',
        outcomeText: 'You hide capital. Marital trust slowly dissolves, and you feel constantly defensive.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -35, stress: 25, happiness: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Set up private personal bank accounts to counter marital secrecy.`);
        }
      },
      {
        choiceText: 'Ignore the ledger, choosing to prioritize daily quiet peace.',
        outcomeText: 'The marriage continues in surface tranquility, though you walk with a tiny thorn in your heart.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 15, happiness: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Overlooked discovered spousal cash hoards to preserve domestic tranquility.`);
        }
      }
    ]
  }
];

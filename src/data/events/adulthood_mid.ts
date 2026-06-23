import { GameEvent, CharacterState } from '../../types';
import { adjustStats } from '../../utils';

export const adulthoodMidEvents: GameEvent[] = [
  // =========================================================================
  // CAREER-GATED EVENTS (Ages 26-45)
  // =========================================================================
  {
    id: 'mid_spec_lawyer_ethics',
    title: 'The Toxic Retainer ⚖️',
    description: 'A shadow broker contacts your legal station. Your pharmaceutical client wants you to bury documentation of clinical trial side effects to protect their massive vaccine rollout.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && ['Corporate Attorney', 'Attorney'].includes(state.characterInfo.currentOccupation || '');
    },
    choices: [
      {
        choiceText: 'Shred the incriminating documents to fully shield your client from prosecution.',
        outcomeText: 'You burn the records. The client is protected and rewards you with a major secret bonus, but your soul carries an icy weight.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -35, stress: 25, happiness: 10 });
          state.finances.cashBalance += 15000;
          state.log.push(`Age ${state.characterInfo.age}: Shredded client medicine trials to protect company interests, pocketing a secret bonus.`);
        }
      },
      {
        choiceText: 'Whistleblow immediately by leaking the dossier anonymously to federal investigators.',
        outcomeText: 'Integrity wins! Federal agents raid the corporate offices. You receive no fee, but sleep with a clear conscience.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 35, stress: 15, happiness: 20 });
          state.log.push(`Age ${state.characterInfo.age}: Whistleblew anonymously to federal authorities regarding tainted trial records.`);
        }
      },
      {
        choiceText: 'Demand a double retaining salary to guarantee absolute personal confidentiality.',
        outcomeText: 'The corporate board is furious but cornered. They double your retainer, though they now watch you like a cornered hawk.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -20, stress: 35, happiness: 15 });
          state.finances.cashBalance += 35000;
          state.log.push(`Age ${state.characterInfo.age}: Extorted your pharmaceutical client to lock in double retainer fees.`);
        }
      },
      {
        choiceText: 'Recuse yourself from the litigation, citing professional ethical conflicts.',
        outcomeText: 'You step away cleanly. The firm is deeply disappointed in your rigidity, but your record stays pristine.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 15, stress: -10, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Recused yourself from a highly questionable corporate retention file.`);
        }
      }
    ]
  },
  {
    id: 'mid_spec_eng_crash',
    title: 'The Production Meltdown 💻',
    description: 'The production database of a high-growth fintech website goes down during a critical venture-capital funding meeting.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && ['Junior Software Engineer', 'Senior Developer', 'Software Engineer', 'Technical Associate'].includes(state.characterInfo.currentOccupation || '');
    },
    choices: [
      {
        choiceText: 'Hot-patch the central database directly on live production servers with unverified scripts.',
        outcomeText: 'A spectacular gamble! Production recovers within minutes. The engineering team hoists you on their shoulders as a hero.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: 25, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Risky hot-patched live production database, restoring major systems instantly.`);
        }
      },
      {
        choiceText: 'Roll back directly to last weekend\'s backup archive, wiping twelve hours of merchant logs.',
        outcomeText: 'Systems stabilize, but merchants are furious at the data vacuum. Your boss defends your cautious approach publicly.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: -5, happiness: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Forced standard database rollback to weekend backup state, dropping data.`);
        }
      },
      {
        choiceText: 'Blame the cloud server hosting provider publicly, buying hours to debug the incident slowly.',
        outcomeText: 'The press buys the excuse. You fix the pipeline in peace without immediate board intervention.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -15, smarts: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Blamed database hardware failure on external cloud providers to buy time.`);
        }
      },
      {
        choiceText: 'Quit on the spot, refusing to handle the toxic high-pressure holiday on-call rotation.',
        outcomeText: 'You pack your terminal. The database stays broken, but your evening schedule is suddenly perfectly quiet.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -30, happiness: 10 });
          state.characterInfo.currentOccupation = 'Unemployed';
          state.log.push(`Age ${state.characterInfo.age}: Rage-quit software role mid-crisis to guard personal mental sanity.`);
        }
      }
    ]
  },
  {
    id: 'mid_spec_surgeon_mistake',
    title: 'The Crooked Symmetry ⚕️',
    description: 'A high-profile social media celebrity patient experiences visible facial asymmetry after your custom reconstructive work.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && ['Plastic Surgeon', 'Surgeon', 'Brain Surgeon'].includes(state.characterInfo.currentOccupation || '');
    },
    choices: [
      {
        choiceText: 'Settle their medical complaints out of court immediately, offering a forty-thousand-dollar cash package.',
        outcomeText: 'They sign a non-disclosure agreement. Your practice reputation stays clean, though your clinical account takes a beating.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -20, happiness: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 40000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Disbursed $40,000 cash to settle an aesthetic malpractice complaint.`);
        }
      },
      {
        choiceText: 'Propose an intensive, immediate revision procedure under complete general anesthesia at no cost.',
        outcomeText: 'The revision is an exquisite success! The celebrity praises your devotion on their live channels.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, smarts: 20, looks: 15, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Corrected an aesthetic surgical error with complimentary revision surgery.`);
        }
      },
      {
        choiceText: 'Instruct your defense attorney to mount aggressive counters, citing patient non-compliance.',
        outcomeText: 'A dragged-out public battle. Legal fees mount, and the exhausting paperwork drains your daily energy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 40, health: -15, happiness: -20 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 15000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Engaged full legal defense squads to fight medical malpractice claims.`);
        }
      }
    ]
  },
  {
    id: 'mid_spec_nurse_understaffed',
    title: 'The ICU Midnight Mutiny 💉',
    description: 'The pediatric emergency ward is severely understaffed. Management offers a twenty-hour double shift that could lead to medical errors.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && ['Registered Nurse'].includes(state.characterInfo.currentOccupation || '');
    },
    choices: [
      {
        choiceText: 'Accept the long double shift, drinking infinite energy drinks to survive the exhaustion.',
        outcomeText: 'You manage without severe lapses, collecting massive overtime cash, but you feel physically closer to zombie status.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -20, stress: 30, happiness: -5 });
          state.finances.cashBalance += 1500;
          state.log.push(`Age ${state.characterInfo.age}: Worked a grueling double shift understaffed in the pediatric ICU.`);
        }
      },
      {
        choiceText: 'Decline the shift flatly, warning administrators that patient care ratios are dangerous.',
        outcomeText: 'The ward supervisor writes a compliance warning, but you leave on time to sleep a glorious ten hours.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -20, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Refused a dangerous, exhausting nurse shift, prioritizing safety.`);
        }
      },
      {
        choiceText: 'Organize an immediate union protest, rally off-duty nurses to refuse dangerous hours.',
        outcomeText: 'Your peers rally behind you! Management backs down and hires emergency contractors. You are crowned a local leader.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, stress: 15, happiness: 20 });
          state.log.push(`Age ${state.characterInfo.age}: Led a ward protest against abusive nurse-to-patient staffing structures.`);
        }
      }
    ]
  },
  {
    id: 'mid_spec_ceo_takeover',
    title: 'The Institutional Proxy War 📁',
    description: 'A hostile private investment fund amasses a 15% stake in your startup, aiming to remove you as Chief Executive Officer.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && ['CEO of Tech Startup', 'CEO', 'Corporate CEO', 'Executive', 'President'].includes(state.characterInfo.currentOccupation || '');
    },
    choices: [
      {
        choiceText: 'Execute a poison-pill strategy, diluting shares to block their hostile takeover path.',
        outcomeText: 'The hostile group is blocked! However, your company value dips temporarily and board members remain tense.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: 30, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Activated a poison-pill stock dilution to preserve chief management control.`);
        }
      },
      {
        choiceText: 'Resign immediately, cash in your stock options for forty thousand dollars.',
        outcomeText: 'You step away cleanly. You lose the startup crown, but your banking balances are completely stocked.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -30, happiness: 15 });
          state.finances.cashBalance += 40000;
          state.characterInfo.currentOccupation = 'Unemployed';
          state.log.push(`Age ${state.characterInfo.age}: Stepped down as Chief Executive Officer, collecting a major payout.`);
        }
      },
      {
        choiceText: 'Court an eccentric angel billionaire to buy back option blocks, trading technical IP.',
        outcomeText: 'The billionaire backs you, securing your position. However, their unusual lifestyle guidelines now dictate your board.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: 15, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Formed an alliance with an eccentric billionaire to preserve CEO authority.`);
        }
      }
    ]
  },
  {
    id: 'mid_spec_plumber_asbestos',
    title: 'The Hidden Seep 🔧',
    description: 'While performing commercial pipe work on an older suburban house, you detect high levels of toxic friable asbestos tiles.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && ['Apprentice Plumber'].includes(state.characterInfo.currentOccupation || '');
    },
    choices: [
      {
        choiceText: 'Shut down the job site instantly, instructing the family to hire heavy abatement scouts.',
        outcomeText: 'The family is enormously grateful. However, your contracting captain penalizes you for missing team delivery deadlines.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, happiness: 10, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Halted kitchen plumbing work due to active toxic asbestos hazards.`);
        }
      },
      {
        choiceText: 'Hold your breath and splice the pipes quickly, ignoring the dynamic warning tiles.',
        outcomeText: 'You complete the connection and earn a quick payment, but inhale powdery dry mineral residue.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -25, karma: -20, stress: 20 });
          state.finances.cashBalance += 800;
          state.log.push(`Age ${state.characterInfo.age}: Bypassed safety protocols to finish a toxic residential job.`);
        }
      },
      {
        choiceText: 'Demand a five-hundred-dollar emergency hazard fee from the client before touching the pipes.',
        outcomeText: 'The client panics and pays. You finish the work fast with basic masks. You feel highly paid but cough slightly.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, karma: -10, stress: 15 });
          state.finances.cashBalance += 500;
          state.log.push(`Age ${state.characterInfo.age}: Charged a steep hazard premium to plumb around active asbestos elements.`);
        }
      }
    ]
  },
  {
    id: 'mid_spec_uber_cargo',
    title: 'The Midnight Lockbox 🚗',
    description: 'A shadowy rider passenger offers you six hundred dollars cash to drive a strange metal lockbox off-app across state lines.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && ['Uber Driver'].includes(state.characterInfo.currentOccupation || '');
    },
    choices: [
      {
        choiceText: 'Refuse the transaction instantly, canceling the fare and leaving them on the road.',
        outcomeText: 'You cruise away. You miss the shady cash, but sleep soundly without corporate or police tracks.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 15, stress: -10, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Rejected a highly sketchy off-app contraband delivery request.`);
        }
      },
      {
        choiceText: 'Accept the delivery trip, speeding down the state highways to drop the heavy box.',
        outcomeText: 'The drop is flawless! The contact pays the six hundred, though your heart hammered during every mile.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -30, stress: 30, happiness: 10 });
          state.finances.cashBalance += 600;
          state.log.push(`Age ${state.characterInfo.age}: Smuggled an unverified cargo package across state lines for cash.`);
        }
      },
      {
        choiceText: 'Alert the transport authorities anonymously while accepting the trip.',
        outcomeText: 'State troopers pull you over. They seize the contraband and praise your information, but your vehicle is impounded briefly.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 20, stress: 25, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Collaborated with state troopers to intercept a package mule.`);
        }
      }
    ]
  },
  {
    id: 'mid_spec_analyst_trade',
    title: 'The Golden Whisper 📈',
    description: 'You notice a suspicious corporate stock purchase spike right before a massive, highly confidential pharmaceutical merger.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && ['Financial Analyst', 'Investment Banker'].includes(state.characterInfo.currentOccupation || '');
    },
    choices: [
      {
        choiceText: 'Purchase a heavy block of options under your sibling\'s private brokerage account.',
        outcomeText: 'The trade executes! The acquisition is made public. You secure forty thousand dollars, though you sweat at SEC audits.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -40, stress: 35, happiness: 20 });
          state.finances.cashBalance += 40000;
          state.log.push(`Age ${state.characterInfo.age}: Executed illicit insider trading maneuvers using family account lines.`);
        }
      },
      {
        choiceText: 'File a formal regulatory compliance report detailing the anomalous trading activities.',
        outcomeText: 'Meticulous standards! The commission sends a letter of elite performance acknowledgment, boosting your career status.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, smarts: 15, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Reported suspicious option activities to securities regulatory inspectors.`);
        }
      },
      {
        choiceText: 'Ignore the information completely, erasing the backup data from your analyst terminal.',
        outcomeText: 'You delete the log files, letting the corporate sharks feed in peace while you remain safely invisible.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -15, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Ignored obvious insider trading anomalies on corporate merger databases.`);
        }
      }
    ]
  },

  // =========================================================================
  // CORPORATE LADDERS & BURNOUT / GENERAL WORKPLACE (Ages 26-45)
  // =========================================================================
  {
    id: 'mid_work_micromanaged',
    title: 'The Screen Vigilance 🖥️',
    description: 'Your manager installs tracking software to monitor activity patterns, criticizing your offline brainstorm breaks.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 34 && state.characterInfo.currentOccupation !== 'Unemployed' && !['CEO of Tech Startup', 'CEO', 'Corporate CEO'].includes(state.characterInfo.currentOccupation || '');
    },
    choices: [
      {
        choiceText: 'Install an activity simulator mouse-jiggler device to fake continuous active duty.',
        outcomeText: 'The system logs impeccable scores. You enjoy sweet tea breaks offline while looking exceptionally busy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -15, stress: -20, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Installed a mouse-jiggler hardware device to bypass digital trackers.`);
        }
      },
      {
        choiceText: 'Work hard to hit maximum productivity numbers, letting the performance metrics silence their criticism.',
        outcomeText: 'They praise your numbers, but your eye begins to twitch from staring at the workspace monitor.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, smarts: 10, stress: 25 });
          state.log.push(`Age ${state.characterInfo.age}: Burned midnight oils to hit artificial keyboard performance indices.`);
        }
      },
      {
        choiceText: 'Confront your manager assertively during the weekly briefing, demanding autonomy.',
        outcomeText: 'They are defensive but agree to loosen the digital tracking constraints on your team.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 15, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Confronted management regarding intrusive keyboard spying practices.`);
        }
      }
    ]
  },
  {
    id: 'mid_work_stolen_credit',
    title: 'The Open Slide Deck 📂',
    description: 'You find a brilliant, unreleased corporate presentation deck left open on the office server by a quiet coworker.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && state.characterInfo.currentOccupation !== 'Unemployed';
    },
    choices: [
      {
        choiceText: 'Replace their author metadata with your own initials to secure an administrative promotion.',
        outcomeText: 'Management is highly impressed by your analytical deck. You secure a major career promotion bump.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -40, stress: 15, happiness: 20 });
          state.finances.annualSalary += 15000;
          state.log.push(`Age ${state.characterInfo.age}: Plagiarized a colleague's research assets to lock in an annual pay raise.`);
        }
      },
      {
        choiceText: 'Invite the quiet colleague to co-present the slide deck to the board.',
        outcomeText: 'An exquisite partnership! Your boss praises the outstanding collaborative synergy, and you form a loyal peer ally.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, stress: -5, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Partnered cleanly with a colleague to present shared deck models.`);
        }
      },
      {
        choiceText: 'Provide the colleague with constructive reviews, keeping your names separate.',
        outcomeText: 'They appreciate your comments. The deck gets presented successfully. You maintain clean professional margins.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 15, smarts: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Guided a coworker privately on their unreleased analysis slides.`);
        }
      }
    ]
  },
  {
    id: 'mid_work_demoted',
    title: 'The Budget Realignment Axe 📉',
    description: 'During "organizational structural adjustments," management demands you accept a substantial demotion or exit the firm immediately.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 35 && age <= 45 && state.characterInfo.currentOccupation !== 'Unemployed';
    },
    choices: [
      {
        choiceText: 'Accept the corporate demotion silently, cutting domestic spending to weather the storm.',
        outcomeText: 'You swallow your pride to keep your healthcare. Your annual income drops, causing real domestic budget stress.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 25, happiness: -20 });
          state.finances.annualSalary = Math.max(state.finances.annualSalary - 15000, 10000);
          state.log.push(`Age ${state.characterInfo.age}: Accepted an administrative career demotion to keep family healthcare.`);
        }
      },
      {
        choiceText: 'Quit on the spot to start a private consultancy, hunting contractor gigs.',
        outcomeText: 'Liberating! You are free from office bosses. Financing your first month is terrifying, but your confidence is high.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 15, happiness: 15, smarts: 15 });
          state.characterInfo.currentOccupation = 'Unemployed';
          state.log.push(`Age ${state.characterInfo.age}: Quit corporate team to establish independent consultant services.`);
        }
      },
      {
        choiceText: 'Negotiate a performance-driven sales incentive to keep your total salary balance.',
        outcomeText: 'They agree to some metrics! If you close major accounts, you will restore your historical pay levels.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: 30, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Restructured demotion terms into performance-backed incentive packages.`);
        }
      }
    ]
  },
  {
    id: 'mid_work_bootstrap',
    title: 'The Espresso-Stained Venture ☕',
    description: 'A close peer pitches an opportunity to quit your job and bootstrap a risky, high-performance artificial intelligence supply venture.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && state.characterInfo.currentOccupation !== 'Unemployed' && state.stats.smarts > 60;
    },
    choices: [
      {
        choiceText: 'Resign immediately to join as a full co-founder, surviving on tight initial savings.',
        outcomeText: 'Absolute startup lifestyle! You work eighty-hour weeks in a drafty garage, but your creative metrics soar.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, stress: 30, happiness: 20 });
          state.characterInfo.currentOccupation = 'CEO of Tech Startup';
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 10000, -500000);
          state.finances.annualSalary = 45000; // Low survival salary
          state.log.push(`Age ${state.characterInfo.age}: Abandoned career track to co-found a high-growth AI startup.`);
        }
      },
      {
        choiceText: 'Offer to act as an offline advisor during midnight hours, trading equity for advisory aid.',
        outcomeText: 'You balance both roles. You miss out on maximum equity, but keep your primary career income intact.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -15, stress: 25, smarts: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Agreed to advisory role at startup while preserving regular employment.`);
        }
      },
      {
        choiceText: 'Decline the proposal flatly, preferring corporate sanity and quiet savings.',
        outcomeText: 'You cruise home. The venture goes on without you. You sleep securely in your suburban bed.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -15, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Declined unstable startup proposal, choosing standard corporate tenure.`);
        }
      }
    ]
  },

  // =========================================================================
  // DOMESTIC & MARITAL DILEMMAS (Ages 26-45)
  // =========================================================================
  {
    id: 'mid_dom_prenup_wedding',
    title: 'The Pre-Nuptial Divide 📜',
    description: 'Your long-term partner demands a full pre-nuptial contract agreement days before your wedding invitations are mailed.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 34 && state.maritalStatus === 'Dating';
    },
    choices: [
      {
        choiceText: 'Sign the contract instantly, affirming that emotional love transcends balance sheets.',
        outcomeText: 'Your partner is deeply comforted by your compliance. The wedding goes on in perfect emotional focus.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 20, stress: -10, happiness: 20 });
          // Add Prenuptial tracking flag on the partner NPC
          const partner = state.relationships.find(r => r.relationshipType === 'Partner');
          if (partner) partner.hasPrenup = true;
          state.log.push(`Age ${state.characterInfo.age}: Signed a pre-nuptial contract agreement directly with your partner.`);
        }
      },
      {
        choiceText: 'Draft aggressive modifications requiring major real estate allocations if the union fails.',
        outcomeText: 'Tense legal arguments with your in-laws. They ultimately sign, but the wedding vibe carries a business tone.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -15, stress: 30, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Negotiated tough real estate clauses inside pre-nuptial contracts.`);
        }
      },
      {
        choiceText: 'Call off the wedding engagement, refusing to contract your core romantic bonds.',
        outcomeText: 'A devastating split. The invitations are shredded. Your happiness nose-dives, but you protect your asset legacy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -40, stress: 25 });
          state.relationships = state.relationships.filter(r => r.relationshipType !== 'Partner');
          state.maritalStatus = 'Single';
          state.log.push(`Age ${state.characterInfo.age}: Cancelled wedding plans over unresolvable pre-nuptial demands.`);
        }
      }
    ]
  },
  {
    id: 'mid_dom_preschool_cost',
    title: 'The Academy Tuition Auction 🎒',
    description: 'An elite neighborhood developmental preschool demands an aggressive non-refundable safety deposit to enroll your child.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const possessesPartner = state.relationships.some(r => r.relationshipType === 'Partner' && !r.isDead);
      return age >= 26 && age <= 45 && possessesPartner && state.finances.cashBalance > 5000;
    },
    choices: [
      {
        choiceText: 'Disburse the six-thousand-dollar deposit, securing an early Ivy League trajectory for your heir.',
        outcomeText: 'Your child plays with organic beechwood blocks alongside tech heirs. Your bank account is light, but prestige is high.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, looks: 10, stress: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 6000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Paid a $6,000 premium deposit for elite child developmental schooling.`);
        }
      },
      {
        choiceText: 'Enroll them in a standard neighborhood public nursery, dedicating evenings to home studies.',
        outcomeText: 'You read them historic literature every night. They thrive wonderfully, and you save thousands of liquid dollars.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 20, smarts: 15, health: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Chose standard public preschooling, backing it with homeschooling.`);
        }
      },
      {
        choiceText: 'Form a neighborhood child tutoring cooperative, splitting teaching blocks with local moms.',
        outcomeText: 'A brilliant community effort! You build close local bonds, and the children build beautiful social memories.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, stress: 15, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Formed a suburban neighborhood tutoring collective to cut school costs.`);
        }
      }
    ]
  },
  {
    id: 'mid_dom_neighbor_encroach',
    title: 'The Six-Inch Encroach 🏡',
    description: 'Your neighboring homeowner erects a sprawling wooden fence that blocks your sunset view, crossing six inches onto your property line.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && state.assets.some(a => a.type === 'real_estate');
    },
    choices: [
      {
        choiceText: 'Hire professional surveyors to issue a formal land-deed encroachment violation.',
        outcomeText: 'The neighbor is forced to dismantle the boards. You secure your boundary, but are greeted with icy glares at the mailbox.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: 15, happiness: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1200, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Hired property surveyors to contest an encroaching neighbor fence (-$1,200).`);
        }
      },
      {
        choiceText: 'Confront them over local beers, negotiating a compromise gate construct on the border.',
        outcomeText: 'A cheerful resolution! You design a beautiful transition trellis, keeping your border while securing a great friend.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 20, stress: -15, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: resolved neighbor border limits peacefully over friendly drinks.`);
        }
      },
      {
        choiceText: 'Tear down the encroaching boards yourself during a rainy midnight storm.',
        outcomeText: 'Chaos on Elm Lane! Your neighbor calls the police, and a highly embarrassing municipal drama erupts.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -30, stress: 30, happiness: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Destroyed neighbor\'s boundary boards manually at midnight.`);
        }
      }
    ]
  },
  {
    id: 'mid_dom_partner_burnout_crisis',
    title: 'The Domestic Sabbatical 🏠',
    description: 'Your spouse is feeling severely burned out from carrying household duties and asks you to halt career priorities to help.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && state.maritalStatus === 'Married';
    },
    choices: [
      {
        choiceText: 'Decline your corporate advancement to take over complete cooking and household logistics for a year.',
        outcomeText: 'Your relationship bond reaches titanium strength. You feel exhausted but deeply centered in your home.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, health: 10, stress: -10, happiness: 20 });
          state.log.push(`Age ${state.characterInfo.age}: Prioritized household operations to support a burned-out partner.`);
        }
      },
      {
        choiceText: 'Hire a premium full-time helper to handle cleaning, and cooking.',
        outcomeText: 'You both enjoy luxury breathing room! It strains your savings monthly, but vanishes domestic stress.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -25, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 8000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Employed full-time household staff to resolve marital fatigue (-$8,000).`);
        }
      },
      {
        choiceText: 'Tell them they must persist, highlighting that your career income funds your entire lifestyle.',
        outcomeText: 'A shivering frost settles in the master bedroom. They stop complaining, but emotional margins drop.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -25, stress: 20, happiness: -20 });
          state.log.push(`Age ${state.characterInfo.age}: Rejected partner request for domestic help, demanding career focus.`);
        }
      }
    ]
  },
  {
    id: 'mid_dom_hoa_infraction_war',
    title: 'The Sovereign Turf Penalty 🌿',
    description: 'The strict suburban HOA issues a four-hundred-dollar fine because your lawn grass grew one-quarter inch over community limits.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && state.assets.some(a => a.type === 'real_estate');
    },
    choices: [
      {
        choiceText: 'Submit the four-hundred-dollar fine, and mow the grass to flat conformity.',
        outcomeText: 'You pay. The lawn is a boring clean carpet. You feel completely defeated by suburban bureaucracy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 10, happiness: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 400, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Paid a four-hundred-dollar HOA lawn height fine under protest.`);
        }
      },
      {
        choiceText: 'Plow up your entire lawn, replacing it with an aggressive ecological rock-and-succulent garden.',
        outcomeText: 'Amazing! The HOA manual has a loophole for xeriscaping. Neighbors watch your rocky fortress in envy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -10, happiness: 20 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 2500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Replaced suburban turf with ecological stone gardens to bypass HOA policies.`);
        }
      },
      {
        choiceText: 'Launch a neighborhood petition campaign to overthrow the petty HOA board president.',
        outcomeText: 'You win! You are named the new HOA Chairman, writing rules that legalize wild dandelions.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: 25, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Led a successful neighborhood coupon to take over the local HOA presidency.`);
        }
      }
    ]
  },
  {
    id: 'mid_dom_midnight_whisper',
    title: 'The Obsidian Lounge 🍸',
    description: 'During a career conference, a charismatic old flame invites you for a cozy late-night cocktail to discuss old times.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isPartnered = state.maritalStatus === 'Married' || state.maritalStatus === 'Dating';
      return age >= 26 && age <= 45 && isPartnered;
    },
    choices: [
      {
        choiceText: 'Decline their invitation, going back to your hotel room to call your partner.',
        outcomeText: 'Your partner is comforted by your call. You sleep in cozy peace with a perfectly clean conscience.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, stress: -10, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Rejected a late-night invite from an old flame, protecting your union.`);
        }
      },
      {
        choiceText: 'Share a single, highly polite drink while keeping conversations strictly focused on business.',
        outcomeText: 'A balanced evening. You laugh over old memories and parting on warm, professional terms.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 5, stress: 5, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Shared a business-focused cocktail with an old acquaintance.`);
        }
      },
      {
        choiceText: 'Accompany them back to their room, ignoring domestic boundaries for a wild night.',
        outcomeText: 'A passionate night, but you wake with overwhelming guilt. A dark secret now sits in your history.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -45, stress: 30, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Committed marital infidelity on a corporate travel trip.`);
        }
      }
    ]
  },
  {
    id: 'mid_dom_kitchen_inquisition',
    title: 'The Kitchen Inquisitors 🍳',
    description: 'Your partner\'s critical parents plan to occupy your guest bedroom for two full months, demanding organic dinners.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const possessesPartner = state.relationships.some(r => r.relationshipType === 'Partner' && !r.isDead);
      return age >= 26 && age <= 45 && possessesPartner;
    },
    choices: [
      {
        choiceText: 'Cook pristine organic meals and play perfect host to secure their blessings.',
        outcomeText: 'They praise your exceptional discipline. You feel physically spent, but the domestic front is fully secured.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 15, looks: 10, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: Executed immaculate domestic hospitality for your visiting parent-in-laws.`);
        }
      },
      {
        choiceText: 'Rent them a beautiful nearby apartment, claiming your work requires deep absolute silence.',
        outcomeText: 'They enjoy the private luxury, and your guest bedroom stays quiet. Your wallet takes a hard blow.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -20, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 4500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Funded private executive condos for visiting relatives (-$4,500).`);
        }
      },
      {
        choiceText: 'Deliver a blunt but humorous talk detailing your home boundaries during their first breakfast.',
        outcomeText: 'They are badly stunned by your frankness! Your partner is embarrassed, but the parents help wash the pans.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -10, stress: -10, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Declared firm household boundaries with visiting parent-in-laws.`);
        }
      }
    ]
  },
  {
    id: 'mid_dom_mahogany_partition',
    title: 'The Mahogany Partition 🪵',
    description: 'During a tense family dinner, your sibling demands you forfeit your share of a historic family land parcel to settle their card debt.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const hasSibling = state.relationships.some(r => r.relationshipType === 'Sibling' && !r.isDead);
      return age >= 35 && age <= 45 && hasSibling;
    },
    choices: [
      {
        choiceText: 'Forfeit your land shares immediately, prioritizing sibling peace over estate capital.',
        outcomeText: 'Your sibling breaks down in deep relief, thanking you. You lose major equity but secure long-term family bonds.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, stress: -15, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 15000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Surrendered future family inheritance rights to relieve sibling debt.`);
        }
      },
      {
        choiceText: 'Stand firm on equal division, citing family deeds and financial standards.',
        outcomeText: 'Dignity maintained. Your sibling is furious, and family gatherings carry a sharp, frozen silence.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: 25, happiness: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Defended equal property deed allocations against emotional sibling demands.`);
        }
      },
      {
        choiceText: 'Propose to buy out their land fraction, providing cash while securing sole estate control.',
        outcomeText: 'An elegant trade! They take immediate cash to pay off collectors, while you gain full ownership of physical acres.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: 10, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 25000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Acquired relative\'s estate deeds for a $25,000 cash buyout.`);
        }
      }
    ]
  },

  // =========================================================================
  // FINANCIAL & ASSET PRESSURES (Ages 26-45)
  // =========================================================================
  {
    id: 'mid_fin_flood_disaster',
    title: 'The Copper Rupture 🚰',
    description: 'Your home\'s main copper central heating line bursts at midnight, sending five inches of standing swamp water into your carpeted basement.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && state.assets.some(a => a.type === 'real_estate');
    },
    choices: [
      {
        choiceText: 'Hire emergency forensic flood extraction services for six thousand dollars cash.',
        outcomeText: 'Flawless restoration! Odor and bacteria are fully vaporized, though your cash balance looks heavily drained.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -20, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 6000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Financed $6,000 professional water sanitization services for a basement flood.`);
        }
      },
      {
        choiceText: 'Siphon the standing filth yourself, using rented dehumidifiers to dry the walls.',
        outcomeText: 'You scrape your hands and work forty hours straight. It smells slightly moldy, but you keep your hard-earned cash.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -15, stress: 30, smarts: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 800, -500000);
          state.log.push(`Age ${state.characterInfo.age}: DIY-drained a sewage line flood, saving major contractor fees.`);
        }
      },
      {
        choiceText: 'Ignore the standing wet, hoping your home insurance covers it without immediate intervention.',
        outcomeText: 'Insurance rejects the claim because you failed to act. Toxic green mold spreads, badly hurting your lung health.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -25, stress: 35, happiness: -20 });
          state.log.push(`Age ${state.characterInfo.age}: Deferred basement flood maintenance, triggering heavy structural decay.`);
        }
      }
    ]
  },
  {
    id: 'mid_fin_shrieking_transmission',
    title: 'The Metallic Shriek 🚗',
    description: 'Your vehicle\'s dashboard flashes warning lines as the mechanical transmission begins to grind loudly on expressways.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && state.assets.some(a => a.type === 'vehicle');
    },
    choices: [
      {
        choiceText: 'Pay two thousand dollars for immediate authorized factory transmission replacement.',
        outcomeText: 'The car runs in perfect whisper safety. You travel safely, though your travel savings are spent.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -15, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 2000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: replaced dynamic engine gears at factory dealership (-$2,000).`);
        }
      },
      {
        choiceText: 'Pour cheap thick sealants into the fluid reservoir, selling the vehicle to an unsuspecting dealer.',
        outcomeText: 'The car runs smoothly for exactly forty miles. You dump the clunker and walk away with cash.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -35, smarts: 10, happiness: 10 });
          state.finances.cashBalance += 1500;
          state.log.push(`Age ${state.characterInfo.age}: Used engine sealants to dump a failing car on local dealers.`);
        }
      },
      {
        choiceText: 'Sell the car for scrap metal scrap, transitioning your daily commute to train transit.',
        outcomeText: 'A wonderful green shift! You walk more, reading philosophy books during your clean railway journeys.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -10, happiness: 10 });
          state.finances.cashBalance += 400;
          state.log.push(`Age ${state.characterInfo.age}: Scrapped passenger car to adopt healthy commuter train transit.`);
        }
      }
    ]
  },
  {
    id: 'mid_fin_arm_rate_spike',
    title: 'The Interest Spike Reset 💸',
    description: 'Your adjustable-rate home mortgage resets. Skyrocketing national inflation spikes your monthly interest payments by 40%.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const hasFinancedHome = state.assets.some(a => a.type === 'real_estate' && a.isFinanced);
      return age >= 26 && age <= 45 && hasFinancedHome;
    },
    choices: [
      {
        choiceText: 'Refinance into a clean 30-year fixed rate, depositing a five-thousand-dollar transaction fee.',
        outcomeText: 'Payments are stable again. Your budget is predictable, though your cash-on-hand is down.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -15, happiness: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 5000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Refinanced variable home mortgage into fixed rates (-$5,000).`);
        }
      },
      {
        choiceText: 'Sublease your basement bedrooms to local university scholars to offset the invoice hikes.',
        outcomeText: 'Your house is crowded and loud, but the cash completely covers your new mortgage rates.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 20, happiness: -5 });
          state.finances.cashBalance += 4800; // Annual rent income
          state.log.push(`Age ${state.characterInfo.age}: Subleased basement spaces to offset variable mortgage resets.`);
        }
      },
      {
        choiceText: 'Default on the payments, placing the home into foreclosure to rent a cheap container unit.',
        outcomeText: 'Your credit score is shattered. You move your belonging boxes into a metal box. Severe stress follows.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -30, stress: 45, looks: -10 });
          state.assets = state.assets.filter(a => a.type !== 'real_estate');
          state.log.push(`Age ${state.characterInfo.age}: Defaulted on variable mortgage loans, exiting property ownership.`);
        }
      }
    ]
  },
  {
    id: 'mid_fin_insider_scam',
    title: 'The Platinum Pipeline Pitch 💎',
    description: 'A slick high-school classmate pitches a private land-development trust, swearing it returns 30% weekly interest.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && state.finances.cashBalance > 5000;
    },
    choices: [
      {
        choiceText: 'Politely reject the proposal, investing your hard-earned funds into public government bonds.',
        outcomeText: 'A smart choice. Two months later, you read that their estate trust was shut down by federal fraud squads.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: -10, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Rejected a highly questionable peer-backed land development scam.`);
        }
      },
      {
        choiceText: 'Invest five thousand dollars, hoping high-speed returns match their glowing promises.',
        outcomeText: 'They block your number. The classmate vanishes to the Bahamas with your entire investment capital.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -10, stress: 30, happiness: -25 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 5000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Gambled $5,000 in a classmate\'s digital ponzi land scheme.`);
        }
      },
      {
        choiceText: 'Demands formal audited accounts before committing a single cent to their structure.',
        outcomeText: 'They stammer, mutter about trade secrets, and hurriedly pack their files. You laugh at the amateur grift.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Dismantled peer\'s investment scam by demanding formal CPA audits.`);
        }
      }
    ]
  },
  {
    id: 'mid_fin_irs_penalty',
    title: 'The Federal Audit Notice 🧾',
    description: 'A certified envelope arrives from the tax commission. An accounting error on your prior filing has triggered a $5,000 tax penalty.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && state.finances.cashBalance > 5000;
    },
    choices: [
      {
        choiceText: 'Pay the penalty balance instantly to secure clean federal compliance records.',
        outcomeText: 'The file is closed. Your bank balance takes a hard blow, but you sleep in complete tax-compliant safety.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 15, stress: -15, happiness: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 5000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Settled IRS back-tax audit discrepancies cleanly (-$5,000).`);
        }
      },
      {
        choiceText: 'Retain a skilled tax defense lawyer to fight the calculations in specialized court.',
        outcomeText: 'They discover a local deduction loophole! The entire penalty is dropped, although the lawyer bills take half of it.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: 15, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 2500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Contested federal tax audits with specialized legal counsel.`);
        }
      },
      {
        choiceText: 'Shred the notification paper, assuming they have bigger things to audit than you.',
        outcomeText: 'A bad move! Months later, a court orders a direct garnishment on your weekly salary bags. High stress.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -20, stress: 35, happiness: -20 });
          state.log.push(`Age ${state.characterInfo.age}: Ignored official tax warnings, triggering severe salary garnishment.`);
        }
      }
    ]
  },
  {
    id: 'mid_fin_meme_gambling',
    title: 'The Noodle Coin Mania 🚀',
    description: 'An unstable dog-themed meme cryptocurrency surges 800% in a week, tempting peers to gamble their life assets.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 34 && state.finances.cashBalance > 3000;
    },
    choices: [
      {
        choiceText: 'Speculate on the token, dumping three thousand dollars into highly leveraged futures.',
        outcomeText: 'A crash! Regulatory changes wipe out the token in minutes. You lose the entire three thousand dollars.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 25, happiness: -20 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 3000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Gambled $3,000 digital capital into volatile dog-themed meme coins.`);
        }
      },
      {
        choiceText: 'Ignore the meme forums completely, putting your funds into clean index portfolios instead.',
        outcomeText: 'Stable compounding! While colleagues cry over bad graphs, you watch your low-stress balances grow.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -10, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Chose long-term standard index portfolios over digital coin hypes.`);
        }
      },
      {
        choiceText: 'Short the speculative coin using advanced options to profit on the crash.',
        outcomeText: 'Brilliant analytic execution! The token collapses exactly as modeled, net earning you five thousand dollars.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: 15, happiness: 15 });
          state.finances.cashBalance += 5000;
          state.log.push(`Age ${state.characterInfo.age}: Profited on the collapse of meme coin markets using advanced short options.`);
        }
      }
    ]
  },
  {
    id: 'mid_fin_elderly_parent_crisis',
    title: 'The Golden Assisted Autumn 👵',
    description: 'Your aging parent is struggling with physical longevity and needs specialized assisted living support.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isParentAlive = state.relationships.some(r => r.relationshipType === 'Parent' && !r.isDead);
      return age >= 35 && age <= 45 && isParentAlive && state.finances.cashBalance > 5000;
    },
    choices: [
      {
        choiceText: 'Finance clear premium nursing home care for ten thousand dollars per year.',
        outcomeText: 'They receive state-of-the-art biological care and therapy. Your wallet takes a hit, but you know they are safe.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, stress: -15, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 10000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Covered premium assistant living tuition for your aging parent (-$10,000).`);
        }
      },
      {
        choiceText: 'Invite your parent to move into your guest bedroom, personally executing daily healthcare.',
        outcomeText: 'Close family bonding! Navigating medicine schedules is exhausting, but their physical smiles are beautiful.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 35, health: -10, stress: 25, happiness: 20 });
          state.log.push(`Age ${state.characterInfo.age}: Welcomed aging parent into your home, executing direct personal nursing.`);
        }
      },
      {
        choiceText: 'Demand other family siblings split the healthcare and housing bills equally.',
        outcomeText: 'Loud arguments across group chats. They agree to split it, but family relationships remain highly strained.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: 20, happiness: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 3500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Demanded shared sibling division for elderly parent care support.`);
        }
      }
    ]
  },
  {
    id: 'mid_fin_paris_scam',
    title: 'The Parisian Charge 💳',
    description: 'You spot a suspicious three-thousand-dollar charge on your credit statement originating from a luxury watch site in France.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && state.finances.cashBalance > 3000;
    },
    choices: [
      {
        choiceText: 'Call your banking coordinators immediately to lock down fraud protections.',
        outcomeText: 'They freeze the cards. The charges are fully reversed. You keep every single dollar safe.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -10, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Flagged automated credit card identity fraud, salvaging funds.`);
        }
      },
      {
        choiceText: 'Settle the charges quietly, fearing an active dispute delay on your current home mortgage.',
        outcomeText: 'You pay. The mortgage goes through, but you practically gifted three grand of hard work to digital thieves.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -10, stress: 20, happiness: -20 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 3000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Paid fraudulent credit card transactions to prevent home-loan file delays.`);
        }
      },
      {
        choiceText: 'Attempt to trace the hacker\'s server IP myself, digging through technical dark web forums.',
        outcomeText: 'You trace servers to an empty VPN node. You waste hours of sleep, getting no money back.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, smarts: 5, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Tried to track cyber identity thieves across online database lists.`);
        }
      }
    ]
  },

  // =========================================================================
  // HEALTH & STRESS SYNCING (Ages 26-45)
  // =========================================================================
  {
    id: 'mid_hea_cardio_threshold',
    title: 'The Chest Gripping Warning 🫀',
    description: 'A sharp, sudden tightness lock grips your chest midway through a high-intensity corporate marketing briefing.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isHighStressJob = ['Brain Surgeon', 'CEO', 'Corporate CEO', 'Executive', 'Investment Banker', 'Attorney', 'Surgeon', 'Managing Director', 'Chief Executive Officer', 'President'].includes(state.characterInfo.currentOccupation || '');
      return age >= 35 && age <= 45 && state.stats.stress > 65 && isHighStressJob;
    },
    choices: [
      {
        choiceText: 'Quit your high-stress medical or corporate executive position to focus on long-term health.',
        outcomeText: 'The relief is instant. You have no career salary, but your resting cardiovascular pressure drops to perfect baselines.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 30, stress: -45, happiness: 15 });
          state.characterInfo.currentOccupation = 'Unemployed';
          state.log.push(`Age ${state.characterInfo.age}: Resigned executive post to salvage cardiovascular biological systems.`);
        }
      },
      {
        choiceText: 'Take a long three-month unpaid leaves of absence to study quiet breathing programs.',
        outcomeText: 'A restorative period. You return to the desk with stable pulse, knowing how to handle stress.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -25, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 5000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed restorative medical sabbatical focusing on longevity.`);
        }
      },
      {
        choiceText: 'Ignore the clinical warning signs, swallowing caffeine pills to finish project drafts.',
        outcomeText: 'You finish the slides, but experience a mild stroke that requires intensive emergency hospitalization.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -35, stress: 30, happiness: -20 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 8000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Suffered a major stress-induced cardiovascular stroke event.`);
        }
      }
    ]
  },
  {
    id: 'mid_hea_three_am_panic',
    title: 'The 3 AM Suffocation 🌪️',
    description: 'You wake up gasping for air at three in the morning, convinced the bedroom ceiling is collapsing on your chest.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && state.stats.stress > 70;
    },
    choices: [
      {
        choiceText: 'Enroll in weekly clinical cognitive behavioral therapy, analyzing the core roots of your anxiety.',
        outcomeText: 'The clinical sessions are tough, but they provide you with supreme mental toolkits to process stress.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -30, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 2500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Enrolled in professional cognitive behavioral therapy pools (-$2,500).`);
        }
      },
      {
        choiceText: 'Engage in slow, quiet candlelit breathing loops on your floor until dawn.',
        outcomeText: 'You manage variables smoothly. The immediate panic dissolves, letting you greet the sun calmly.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 10, stress: -15, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Practiced rhythmic meditation to dissolve high midnight stress.`);
        }
      },
      {
        choiceText: 'Check your laptop and answer ninety emails to turn anxiety into metric deliverables.',
        outcomeText: 'The project is finished, but your nervous system is completely fired. Your health markers slide further.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -15, stress: 20, happiness: -10 });
          state.log.push(`Age ${state.characterInfo.age}: converted midnight panic attacks into corporate overtime hours.`);
        }
      }
    ]
  },
  {
    id: 'mid_hea_lower_back_lock',
    title: 'The Lumbar Gridlock 🛌',
    description: 'A sharp spasm locks your lower spine during morning stretches, leaving you completely frozen on the carpet.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 35 && age <= 45 && (state.stats.health < 45 || state.stats.stress > 50);
    },
    choices: [
      {
        choiceText: 'Retain a medical physical therapist for weekly skeletal alignment procedures.',
        outcomeText: 'They strengthen your core muscles. You stand straight and walk without a single trace of lower back pain.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 20, stress: -10, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed certified spinal rehabilitation program with therapists.`);
        }
      },
      {
        choiceText: 'Purchase a top-tier orthopaedic memory foam office chair to defend your sitting alignment.',
        outcomeText: 'Absolute ergonomics! Your workday lumbar strain is fully supported by modern science.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 10, stress: -15, looks: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1200, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Bought specialized orthopaedic office lumbar models (-$1,200).`);
        }
      },
      {
        choiceText: 'Force through the stiffness with heavy weight lifts, demanding sovereign control.',
        outcomeText: 'A painful pop! Your disc herniates instantly, requiring painful spinal operations and three weeks of bed rest.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -30, stress: 30, happiness: -20 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 4000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Herniated an active spinal disc forcing lift workouts.`);
        }
      }
    ]
  },
  {
    id: 'mid_hea_existential_elevator',
    title: 'The Mirror Inception 👁️',
    description: 'You catch your reflection in a mirrored elevator. An overwhelming existential dread hits you regarding your fleeting youth.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 38 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Dye your silver roots and buy a high-performance sports vehicle options pack.',
        outcomeText: 'You look highly striking speeding down local beach roads, though junior colleagues snicker behind your back.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 15, stress: 10, happiness: 20 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 35000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Bought a high-performance sports car to soothe aging worries (-$35,000).`);
        }
      },
      {
        choiceText: 'Embrace biology. Begin a rigorous daily program studying philosophy.',
        outcomeText: 'You read the stoics. Your mind finds stable anchor points in the eternity of nature.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: -20, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Embraced aging by engaging in rigorous philosophical studies.`);
        }
      },
      {
        choiceText: 'Visit an expensive private aesthetic rejuvenation institute in Switzerland.',
        outcomeText: 'The laser treatments peel away five years of wrinkles. You look glowing, though the invoice is massive.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 25, health: 5, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 12000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Underwent premium aesthetic cellular age rejuvenation in Geneva (-$12,000).`);
        }
      }
    ]
  },
  {
    id: 'mid_hea_weekly_therapy',
    title: 'The Mental Archive 🧠',
    description: 'Years of career competitive grinds left you feeling emotionally hollow. You consider looking into some psychological therapy.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Commit to weekly professional psychotherapy sessions to process childhood patterns.',
        outcomeText: 'You dig up deep, locked-away memories. The process is painful, but your emotional breathing is balanced again.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -25, happiness: 20 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 3000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Committed to weekly analytical psychotherapy programs (-$3,000).`);
        }
      },
      {
        choiceText: 'Journal your thoughts in a private leather notebook every single evening under soft light.',
        outcomeText: 'A quiet, self-reflective habit. Writing down your core stress turns it into clean, manageable lines.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: -15, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Established a quiet nightly self-reflection journaling habit.`);
        }
      },
      {
        choiceText: 'Dismiss emotional processing entirely, asserting that active physical gym workouts solve all problems.',
        outcomeText: 'Your muscles stay hard, but you remain reactive and easily irritated in quiet moments.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, looks: 10, stress: 5, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Rejected emotional therapy, choosing raw physical exercise instead.`);
        }
      }
    ]
  },
  {
    id: 'mid_hea_sleep_apnea_CPAP',
    title: 'The Snoring Woodchipper 💤',
    description: 'Your partner complains that your snoring sounds like a dying forest woodchipper, leaving you tired and unfocused.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isPartnered = state.maritalStatus === 'Married' || state.maritalStatus === 'Dating';
      return age >= 30 && age <= 45 && isPartnered;
    },
    choices: [
      {
        choiceText: 'Wear an electric CPAP sleeping breathing device, restoring full nighttime oxygen.',
        outcomeText: 'Astonishing difference! You wake up with clean, razor-sharp focus and boundless morning vitality.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 25, smarts: 15, stress: -15, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Adopted clinical CPAP respiratory setups to maximize sleep oxygen (-$1,500).`);
        }
      },
      {
        choiceText: 'Relocate your sleeping pillow to the guest bedroom permanently.',
        outcomeText: 'Your partner sleeps excellently, but the physical separation slowly chills your daily domestic romance.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 5, stress: 5, happiness: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Moved permanently into separate guest sleeping quarters.`);
        }
      },
      {
        choiceText: 'Ignore their dramatic snoring complaints, telling them to wear heavy wax earplugs.',
        outcomeText: 'A stubborn choice. Your constant choking sounds disrupt their rest, keeping everyone extremely snappy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -20, health: -10, stress: 15, happiness: -15 });
          state.log.push(`Age ${state.characterInfo.age}: Rejected partner sleep snoring complaints with complete indifference.`);
        }
      }
    ]
  },
  {
    id: 'mid_hea_bodybuilding_gym',
    title: 'The Core Softening 🏋️',
    description: 'You notice your physical stamina dropping and soft fat building up. You feel slow during normal stairs walks.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 34;
    },
    choices: [
      {
        choiceText: 'Enroll in an elite athletic bodybuilding facility, hiring professional personal trainers.',
        outcomeText: 'The program is intensely brutal. You lift heavy iron until your muscles scream, but your physical frame becomes rock-hard.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 25, looks: 20, stress: -10, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 3000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Committed to a premium personal-trainer strength program (-$3,000).`);
        }
      },
      {
        choiceText: 'Jog across the public park pathways for thirty minutes every single dawn under cold mists.',
        outcomeText: 'A scenic, peaceful habit. Your cardiorespiratory endurance doubles, and you save your cash for other assets.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 18, looks: 10, stress: -15, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Initiated a rigid, zero-cost morning park running schedule.`);
        }
      },
      {
        choiceText: 'Buy a cheap, adjustable iron dumbbell rack to practice simple lifts in your basement.',
        outcomeText: 'You squeeze in basic workouts between home chores. Pragmatic, steady physical improvements occur.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 10, looks: 8, smarts: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 250, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Bought basement dumbbell lifting setups to maintain core tone.`);
        }
      }
    ]
  },
  {
    id: 'mid_hea_wellness_monastery_retreat',
    title: 'The Silent Sanctuary 🎋',
    description: 'An exclusive health brochure highlights a premium ten-day tech-free silent meditation monastery in distant mountains.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 35 && age <= 45 && state.finances.cashBalance > 3000;
    },
    choices: [
      {
        choiceText: 'Register for the three-thousand-dollar silent retreat, locked down away from screens.',
        outcomeText: 'No emails, no calls, no metrics. Just pure green pines and static silence. You return feeling completely clear.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -35, happiness: 25 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 3000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed ten-day silent mountain meditation retreat (-$3,000).`);
        }
      },
      {
        choiceText: 'Organize a basic DIY weekend camping trip at a nearby high-altitude mountain lake.',
        outcomeText: 'You burn wood under stars, smelling fresh pine air. It costs almost nothing and yields high romantic peace.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 10, stress: -20, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 150, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Planned a short, low-cost mountain camping trip to escape corporate noise.`);
        }
      },
      {
        choiceText: 'Build a quiet physical stone meditation garden panel inside your house patio.',
        outcomeText: 'You rake white sand plates every single Sunday morning. A superb, calming physical focus point.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: -15, happiness: 12 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 800, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Crafted a customized stone meditation sand arena inside the back patio.`);
        }
      }
    ]
  },
  {
    id: 'mid_hea_insomnia_cycle_choke',
    title: 'The Dawn Watch 🕯️',
    description: 'Anxious thoughts regarding career progression completely choke your rest. You toss and turn for five nights straight.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && state.stats.stress > 50;
    },
    choices: [
      {
        choiceText: 'Engage in slow, deep alternate-nostril breathing under the moon to soothe cranial nerves.',
        outcomeText: 'Your heart rate slows, releasing the grip of daytime worries. You slide into thin, restorative dreams.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 10, stress: -15, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Practiced rhythmic nasal breathing to override midnight insomnia.`);
        }
      },
      {
        choiceText: 'Boot up your laptop to code and write documents, turning exhaustion into deliverables.',
        outcomeText: 'Your boss is delighted with your dawn filings, but you feel like a burning candle hollowed at the core.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -15, stress: 25, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Ignored exhaustion to execute mid-night executive work cycles.`);
        }
      },
      {
        choiceText: 'Gulp strong sleeping sedative syrups to guarantee chemical unconsciousness.',
        outcomeText: 'You sleep, but wake up groggy and clumsy, your head feeling packed with dry, heavy cotton.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, smarts: -10, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Forced heavy chemical sleep solutions during severe stress periods.`);
        }
      }
    ]
  },
  {
    id: 'mid_hea_longevity_payoff_elite',
    title: 'The Biological Marvel 🍏',
    description: 'During your physical, your physician stares in silent marvel at your resting cardiovascular metrics.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 26 && age <= 45 && state.stats.health > 80 && state.stats.happiness > 80 && state.stats.stress < 30;
    },
    choices: [
      {
        choiceText: 'Donate your biological metric data to research programs focusing on human longevity.',
        outcomeText: 'Your details enter the elite study registries. You feel helpful, knowing your clean habits aid global research.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Contributed biological longevity profiles to public medical search archives.`);
        }
      },
      {
        choiceText: 'Celebrate your peak physical conditioning by running a fifty-mile mountain trail marathon.',
        outcomeText: 'Unbelievable performance! You cross the summit lines with stellar speed, feeling completely invincible.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, looks: 10, happiness: 25 });
          state.log.push(`Age ${state.characterInfo.age}: Finished a grueling fifty-mile mountain trail ultra-marathon.`);
        }
      },
      {
        choiceText: 'Write a detailed digital handbook outlining your exact morning fasting and exercise habits.',
        outcomeText: 'Your file goes viral across social networks! Thousands of people praise your humble, disciplined methods.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, looks: 5, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Published an online developmental health guide for average citizens.`);
        }
      }
    ]
  }
];

import { GameEvent, CharacterState } from '../../types';
import { adjustStats } from '../../utils';

export const youngDataPack2BEvents: GameEvent[] = [
  // =========================================================================
  // REMAINING CAREER ACTIONS (Events 21 to 25: Career Ascension)
  // =========================================================================
  {
    id: 'mid_dp2_car_21',
    title: 'The Whistleblower Ransom 👔',
    description: 'An offshore cloud server administrator threatens to leak your startup’s non-public client contact spreadsheets unless you send thirty thousand dollars in crypto.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && (job.includes('ceo') || job.includes('executive') || job.includes('director'));
    },
    choices: [
      {
        choiceText: 'Contact federal cybersecurity agencies to deploy intercept programs.',
        outcomeText: 'Special agents arrest the hacker in a European resort. No databases are leaked, though cyber insurance premiums climb.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 15, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Cooperated with federal cyber task forces to defeat offshore database ransoms.`);
        }
      },
      {
        choiceText: 'Disburse the ransom from private corporate contingency funds.',
        outcomeText: 'They delete the leaked files silently, though your personal stress reaches historic limits as you hide the ledger.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -30, stress: 35, happiness: -5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 30000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Disbursed private cash reserves to quiet offshore server ransom calls (-$30,000).`);
        }
      },
      {
        choiceText: 'Call a public press conference and disclose the breach transparently.',
        outcomeText: 'Enterprises praise your raw courage, and customer trust actually improves after your secure architecture overhauls.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 35, looks: 15, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Disclosed cloud software database vulnerabilities transparently, earning market trust.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_22',
    title: 'The Infinite Build Loop 💻',
    description: 'Your continuous integration pipeline fails for seventy consecutive hours, melting test environments during client launch week.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && (job.includes('engineer') || job.includes('developer'));
    },
    choices: [
      {
        choiceText: 'Trace the Docker compile caches manually to isolate stale scripts.',
        outcomeText: 'You locate an infinite symlink cycle in the node modules directory. The entire build pipeline clears instantly!',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, stress: 15, happiness: 20 });
          s.log.push(`Age ${s.characterInfo.age}: Resolved continuous delivery compilation jams by pruning docker caches.`);
        }
      },
      {
        choiceText: 'Bypass the test suite checks entirely to force direct production deploys.',
        outcomeText: 'The launch happens, but twelve major functional bugs contaminate client accounts. You face heavy team reviews.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -25, smarts: 10, stress: 30, happiness: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Bypassed testing automation checkouts during release cycles, causing bugs.`);
        }
      },
      {
        choiceText: 'Demand a delay in client timelines to review server performance files.',
        outcomeText: 'The project manager is deeply annoyed, but your code remains clean, stable, and highly professional.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, happiness: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Delayed commercial product releases to isolate platform system failures.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_23',
    title: 'The Rideshare Car Jacking 🚗',
    description: 'During a midnight urban transport route, three masked youths throw bricks at your cabin windows, trying to command the vehicle.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && (job.includes('driver') || job.includes('taxi') || job.includes('rideshare'));
    },
    choices: [
      {
        choiceText: 'Depress the accelerator and navigate out of the intersection immediately.',
        outcomeText: 'Your rear tires squeal safely past the brick walls. You scrape your chassis panels, but preserve your health.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 10, smarts: 20, stress: 35, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Outmaneuvered active carjacking mobs through urban street corridors.`);
        }
      },
      {
        choiceText: 'Evacuate your seat and surrender the keys to protect your body.',
        outcomeText: 'They drive off, leaving you cold on wet asphalt. Your insurance covers the vehicle, but your confidence is wounded.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, stress: 45, happiness: -20 });
          s.log.push(`Age ${s.characterInfo.age}: Surrendered vehicle cabins to armed street gangs to protect physical safety.`);
        }
      },
      {
        choiceText: 'Sound your emergency horns and trigger bright vehicle LED panels.',
        outcomeText: 'The blinding visual flashes and loud sirens alarm the gang, causing them to scatter in dark alleys.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 25, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Activated horn and strobe systems to disrupt street carjacking attempts.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_24',
    title: 'The Foreign Exchange Shock 📊',
    description: 'An unexpected European central bank interest rate hike wipes out your client’s derivative currency trade portfolios.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && job.includes('analyst');
    },
    choices: [
      {
        choiceText: 'Liquidate currency holdings immediately to lock in existing asset values.',
        outcomeText: 'You save most of their capital before the market plunges further, earning a reputation for fast defense.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, stress: 20, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Defensively liquidated forex derivatives during sudden central bank adjustments.`);
        }
      },
      {
        choiceText: 'Double deposit currency options, betting on sudden treasury corrections.',
        outcomeText: 'A massive gamble! The currency recovers at noon. You clear ninety thousand dollars of client profit and massive praise.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 30, stress: 35, happiness: 25 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 15000, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Leveraged currency options during volatile treasury announcements, earning high bonuses.`);
        }
      },
      {
        choiceText: 'Propose a diversified metals strategy to bypass currency markets entirely.',
        outcomeText: 'You steer the fund into gold vaults. The transition is tranquil and protects client capital.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: -10, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Allocated high-risk assets directly into physical metals during rate panics.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_car_25',
    title: 'The Narcotic Discrepancy 💉',
    description: 'The post-shift inventory check registers a missing vial of medical morphine in your hospital sector cabinet.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const job = (s.characterInfo?.currentOccupation || '').toLowerCase();
      return age !== undefined && age >= 26 && age <= 45 && job.includes('nurse');
    },
    choices: [
      {
        choiceText: 'Lock down the physical sector, ordering audit checks of all nursing cards.',
        outcomeText: 'You locate a clerical typing error by a tired resident. The morphine is secure. Your diligence is widely praised.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 15, karma: 30, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Identified hospital narcotic inventory discrepancies through strict nurse card audits.`);
        }
      },
      {
        choiceText: 'Fudge the medicine count logs to match the empty tray records.',
        outcomeText: 'You bypass the evening compliance meeting, but you live in constant terror of future federal inspector audits.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -45, stress: 40, happiness: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Falsified heavy drug registry folders to circumvent post-shift hospital reviews.`);
        }
      },
      {
        choiceText: 'Confront a colleague you suspect has been struggling with stress.',
        outcomeText: 'They break down, confess to taking the vial, and agree to enter rehabilitation. You protect your friend.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 35, stress: 20, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Supported an addicted medical coworker, guiding them quietly to clinic recovery circles.`);
        }
      }
    ]
  },

  // =========================================================================
  // DOMESTIC & FAMILY ACTIONS (Events 26 to 36: Family Friction Cases)
  // =========================================================================
  {
    id: 'mid_dp2_fam_15',
    title: 'The Winter In-Law Squeeze ❄️',
    description: 'Your spouse insists on flying both sets of aging parents to a small alpine ski cabin for a tense winter holiday week.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45 && s.maritalStatus === 'Married';
    },
    choices: [
      {
        choiceText: 'Book private adjoining suites at the local ski resort for three thousand dollars.',
        outcomeText: 'A brilliant financial sacrifice! The separate suites prevent any shouting disputes. The snowy vacation is highly pleasant.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -20, happiness: 20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 3000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Financed luxury adjoining suites to isolate holiday parent friction (-$3,000).`);
        }
      },
      {
        choiceText: 'Survive in the single-room cabin, cooking twenty family meals.',
        outcomeText: 'Four arguments break out concerning politics. You suffer severe exhaustion and high stress levels.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, stress: 30, happiness: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Endured dense, cramped cabin quarters with arguing parents during winter holidays.`);
        }
      },
      {
        choiceText: 'Refuse to participate and stay home to finish your research files.',
        outcomeText: 'You enjoy quiet, cold, peaceful evenings, though your spouse maintains cold silence for two whole months.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, happiness: -10 });
          const partner = s.relationships.find(r => r.relationshipType === 'Partner');
          if (partner) partner.relationshipValue = Math.max(partner.relationshipValue - 20, 0);
          s.log.push(`Age ${s.characterInfo.age}: Opted out of high-stress family winter vacations to maintain personal quiet.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_16',
    title: 'The Pre-Nup Alteration 📝',
    description: 'Your spouse requests to delete your pre-nuptial agreement, claiming it makes them feel like a transaction partner.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const partner = s.relationships.find(r => r.relationshipType === 'Partner' && r.hasPrenup);
      return age !== undefined && age >= 26 && age <= 45 && s.maritalStatus === 'Married' && partner !== undefined;
    },
    choices: [
      {
        choiceText: 'Tear up the pre-nuptial agreement to demonstrate absolute devotion.',
        outcomeText: 'They cry in deep joy, and your marriage is highly sweet, though you possess zero defensive barriers on assets.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 30, stress: -15, looks: 5 });
          const partner = s.relationships.find(r => r.relationshipType === 'Partner');
          if (partner) {
            partner.relationshipValue = Math.min(partner.relationshipValue + 25, 100);
            partner.hasPrenup = false;
          }
          s.log.push(`Age ${s.characterInfo.age}: Voluntarily canceled your marital pre-nup to build deep spousal trust.`);
        }
      },
      {
        choiceText: 'Maintain the pre-nup barrier, explaining its protective economic functions.',
        outcomeText: 'They accept the arrangement, though a chilly, bitter shadow settles into your daily household interaction.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 20, happiness: -15 });
          const partner = s.relationships.find(r => r.relationshipType === 'Partner');
          if (partner) partner.relationshipValue = Math.max(partner.relationshipValue - 20, 0);
          s.log.push(`Age ${s.characterInfo.age}: Enforced active pre-nuptial documents despite spousal requests.`);
        }
      },
      {
        choiceText: 'Revise the agreement to place fifty percent of assets in joint trust structures.',
        outcomeText: 'A balanced compromise! You preserve your initial capital while sharing development gains. Peace returns.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 5, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Renegotiated marital asset trusts to reach fair property partnerships.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_17',
    title: 'The Boarding School Letter 🏫',
    description: 'Your brilliant child is accepted to an elite foreign boarding academy. The tuition is twelve thousand dollars a year.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const hasChild = s.relationships.some(r => r.relationshipType === 'Child' && r.age >= 10 && r.age <= 15);
      return age !== undefined && age >= 26 && age <= 45 && hasChild;
    },
    choices: [
      {
        choiceText: 'Finance the enrollment to secure prestige college avenues.',
        outcomeText: 'You spend twelve thousand dollars cash. Your banking accounts are extremely thin, but their academic grades are top-tier.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 25, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 12000, -500000);
          const child = s.relationships.find(r => r.relationshipType === 'Child');
          if (child) child.relationshipValue = Math.min(child.relationshipValue + 15, 100);
          s.log.push(`Age ${s.characterInfo.age}: Funded premium international boarding school tuitions for children (-$12,000).`);
        }
      },
      {
        choiceText: 'Enroll them in localized municipal public classrooms.',
        outcomeText: 'They stay home, keeping your budgets healthy. They miss out on prestige circles but make close local friends.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Selected local municipal schools, bypassing expensive boarding tuitions.`);
        }
      },
      {
        choiceText: 'Apply for advanced academic scholarship options.',
        outcomeText: 'Your child scores ninety-ninth percentile on tests, locking in a full-tuition scholarship! A stellar outcome.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 30, happiness: 30, stress: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Secured full-tuition academic scholarships for boarding school enrollment.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_18',
    title: 'The Stepfamily Rift 🏡',
    description: 'Your stepsister accuses you of hoarding your late stepfather’s leather library chairs and family coin albums.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Deliver the library chairs and coin albums to her front door silently.',
        outcomeText: 'The family fight is instantly dissolved. Your sister is satisfied, though your guest room is empty.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 30, stress: -15, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Surrendered contested stepfamily household items to foster harmony.`);
        }
      },
      {
        choiceText: 'Assert that the items were legally willed to you and lock your doors.',
        outcomeText: 'A bitter legal warning trace follows. You keep the chairs, but family Thanksgiving is completely canceled.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 25, happiness: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Maintained ownership of willed family goods, generating family static.`);
        }
      },
      {
        choiceText: 'Offer to buy her equivalent new leather chairs.',
        outcomeText: 'You spend fifteen hundred dollars. She accepts the deal, allowing you to hold the heritage items in peace.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: 5, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Compensated step-siblings financially to resolve furniture inheritance disputes (-$1,500).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_19',
    title: 'The Summer Split ✈️',
    description: 'You want to spend your annual vacation hiking in dusty Arizona canyon reserves, but your partner demands a luxury Parisian hotel.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45 && s.maritalStatus === 'Married';
    },
    choices: [
      {
        choiceText: 'Fly to Paris, booking a prestigious hotel on the Seine.',
        outcomeText: 'You spend sixty-five hundred dollars. You look highly stylish and your spouse is in heaven, though you miss the canyon sky.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 10, happiness: 25, stress: 5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 6500, -500000);
          const partner = s.relationships.find(r => r.relationshipType === 'Partner');
          if (partner) partner.relationshipValue = Math.min(partner.relationshipValue + 25, 100);
          s.log.push(`Age ${s.characterInfo.age}: Financed luxury European spousal vacation trips (-$6,500).`);
        }
      },
      {
        choiceText: 'Compromise by choosing a secluded ocean-front cabin in Maine.',
        outcomeText: 'You hike along rugged cliffs and eat clean fresh lobsters. You both return perfectly relaxed and happy.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, happiness: 20, stress: -20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 2500, -500000);
          const partner = s.relationships.find(r => r.relationshipType === 'Partner');
          if (partner) partner.relationshipValue = Math.min(partner.relationshipValue + 15, 100);
          s.log.push(`Age ${s.characterInfo.age}: Organized coastal nature cabin trips as a balanced family vacation (-$2,500).`);
        }
      },
      {
        choiceText: 'Take separate vacations, each prioritizing personal desires.',
        outcomeText: 'You hike canyon trails happily. Your partner flies to France. You preserve cash, but feel a tiny distance emerging.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 20, stress: -15, happiness: 10 });
          const partner = s.relationships.find(r => r.relationshipType === 'Partner');
          if (partner) partner.relationshipValue = Math.max(partner.relationshipValue - 10, 0);
          s.log.push(`Age ${s.characterInfo.age}: Opted for separate vacations, prioritizing personal travel styles.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_20',
    title: 'The Remodeling Remonstrance 🔨',
    description: 'You want to replace your kitchen count countertops with basic white laminate, but your spouse is demanding imported green granite.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const ownsHome = s.assets?.some(a => a.type === 'real_estate');
      return age !== undefined && age >= 26 && age <= 45 && s.maritalStatus === 'Married' && ownsHome;
    },
    choices: [
      {
        choiceText: 'Purchase the imported green granite slabs for eight thousand dollars.',
        outcomeText: 'The kitchen looks like a design magazine. Your spouse is glowing, though your kitchen budget takes a hit.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 15, happiness: 15, stress: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 8000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Financed high-end imported green granite kitchen renovations (-$8,000).`);
        }
      },
      {
        choiceText: 'Install clean, durable butcher-block oak countertops yourself.',
        outcomeText: 'Your circular saws cuts beautifully. It takes a weekend of hard physical labor, but looks rustic and saves cash.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, happiness: 20, stress: -5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Completed self-installed natural oak butcher-block renovations (-$1,500).`);
        }
      },
      {
        choiceText: 'Postpone the renovation, keeping the existing yellow Formica tiles.',
        outcomeText: 'The kitchen stays ugly, but you preserve capital. Minor domestic arguments surface at breakfasts.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 10, happiness: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Put off home countertop remodeling projects to maintain financial cash pools.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_21',
    title: 'The Risky Sabbatical 🎭',
    description: 'Your spouse wants to quit their secure accounting job to spend eighteen months painting abstract portraits in the garage.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45 && s.maritalStatus === 'Married';
    },
    choices: [
      {
        choiceText: 'Pledge full financial support, adjusting family budgets to cover their sabbatical.',
        outcomeText: 'They paint glorious canvases! They are incredibly happy, and your marriage is tight, though cash flow is thin.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 35, happiness: 25, stress: 20 });
          const partner = s.relationships.find(r => r.relationshipType === 'Partner');
          if (partner) partner.relationshipValue = Math.min(partner.relationshipValue + 30, 100);
          s.log.push(`Age ${s.characterInfo.age}: Supported your spousess artistic career pivot to garage portfolio painting.`);
        }
      },
      {
        choiceText: 'Decline to support, asking them to keep painting as a weekend activity.',
        outcomeText: 'They stay at their desk, looking miserable. They resent your economic pragmatism and stop making dinners.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 15, happiness: -15 });
          const partner = s.relationships.find(r => r.relationshipType === 'Partner');
          if (partner) partner.relationshipValue = Math.max(partner.relationshipValue - 20, 0);
          s.log.push(`Age ${s.characterInfo.age}: Opposed your partners risky art sidetracks during household meetings.`);
        }
      },
      {
        choiceText: 'Help them secure a corporate graphic design consulting role.',
        outcomeText: 'A perfect compromise! They work half-time, making sufficient revenue while enjoying their canvas hours.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, happiness: 15, stress: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Guided partner into part-time graphic design assignments to balance finance and art.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_22',
    title: 'The Sibling Bailout 🚨',
    description: 'Your brother is arrested for driving on suspended licenses. He begs you for four thousand dollars cash to pay bail bonds immediately.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const hasSib = s.relationships.some(r => r.relationshipType === 'Sibling');
      return age !== undefined && age >= 26 && age <= 45 && hasSib;
    },
    choices: [
      {
        choiceText: 'Disburse the four thousand dollars bail bonds silently.',
        outcomeText: 'He walks out of jail, giving you a tight hug. You preserve family peace, though he rarely repays loans.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 30, happiness: 5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 4000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Paid emergency bail bond cash packets to secure sibling release (-$4,000).`);
        }
      },
      {
        choiceText: 'Refuse to post bail, leaving him to reflect inside municipal holdings.',
        outcomeText: 'He spends four days in cells. The family is shocked at your cold stance, calling you a heartless banker.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -20, stress: 25, happiness: -15 });
          const sib = s.relationships.find(r => r.relationshipType === 'Sibling');
          if (sib) sib.relationshipValue = Math.max(sib.relationshipValue - 30, 0);
          s.log.push(`Age ${s.characterInfo.age}: Refused sibling emergency cash requests following traffic arrests.`);
        }
      },
      {
        choiceText: 'Hire a defense attorney to manage his release on clean signature bonds.',
        outcomeText: 'You spend twelve hundred dollars. The attorney secures his release without hefty cash bonds. Slick defense.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 10, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1200, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Contracted counsel to secure sibling signature bond releases (-$1,200).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_23',
    title: 'The Senior Housing Inquest 👵',
    description: 'Your father’s memory is declining rapidly. He keeps leaving gas burners lit, necessitating continuous care.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const hasParent = s.relationships.some(r => r.relationshipType === 'Parent' && !r.isDead);
      return age !== undefined && age >= 26 && age <= 45 && hasParent;
    },
    choices: [
      {
        choiceText: 'Admit him to a highly integrated memory-care suite for nine thousand dollars.',
        outcomeText: 'A stellar choice. He enjoys therapy gardens and constant medical oversight, keeping him perfectly safe.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 35, stress: -15, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 9000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Financed high-quality professional memory care suites for aging parents (-$9,000).`);
        }
      },
      {
        choiceText: 'Hire daily home health companions to check his stoves.',
        outcomeText: 'You spend three thousand dollars. The care is decent, though you still feel slight anxiety about overnight safety.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 10, happiness: 5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 3000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Retained daily home companions to monitor elderly sibling or parent safety (-$3,000).`);
        }
      },
      {
        choiceText: 'Form a round-the-clock shift schedule with your brothers.',
        outcomeText: 'You alternate nights. Your sleep is severely broken and you feel exhausted, but family unity is immense.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, stress: 30, karma: 40, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Established personal care schedules with siblings to protect father.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_24',
    title: 'The Social Media Audit 📱',
    description: 'Your twelve-year-old child starts posting dangerous roof climbing stunt videos on a trending global app under false names.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const hasChild = s.relationships.some(r => r.relationshipType === 'Child' && r.age >= 10 && r.age <= 14);
      return age !== undefined && age >= 26 && age <= 45 && hasChild;
    },
    choices: [
      {
        choiceText: 'Delete their accounts and replace their smart screen with a basic cellular handset.',
        outcomeText: 'Intense screaming matches! They hate you and claim you ruined their life, but you guarantee physical roof safety.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, stress: 20, happiness: -10 });
          const child = s.relationships.find(r => r.relationshipType === 'Child');
          if (child) child.relationshipValue = Math.max(child.relationshipValue - 25, 0);
          s.log.push(`Age ${s.characterInfo.age}: Revoked smartphone access to terminate dangerous rooftop stunt recording trends.`);
        }
      },
      {
        choiceText: 'Enroll them in a professional indoor bouldering climbing academy.',
        outcomeText: 'You spend eleven hundred dollars. They learn safe ropes and release their energy on approved paths.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, smarts: 15, happiness: 20, stress: -5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1100, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Financed professional indoor bouldering courses to redirect climbing desires (-$1,100).`);
        }
      },
      {
        choiceText: 'Overlook the uploads, assuming it is simple harmless child play.',
        outcomeText: 'They slip from a low gutter during a live stream, fracturing their wrist bones and generating hospital bills.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, stress: 30, karma: -20, happiness: -15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 2500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Suffered family medical billing after ignoring teenage rooftop stunt streams (-$2,500).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fam_25',
    title: 'The Midlife Retirement Divide 🏔️',
    description: 'You want to purchase a secluded cabin in the Wyoming wilderness, but your partner insists on a dense, urban Florida retirement block.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 40 && age <= 45 && s.maritalStatus === 'Married';
    },
    choices: [
      {
        choiceText: 'Purchase a beautiful compromise ranch on the outskirts of Salt Lake City.',
        outcomeText: 'You enjoy hiking nearby gorges while holding easy access to urban grocery malls. A highly pleasant outcome.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, happiness: 25, stress: -15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 5000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Acquired real estate compromise plots combining nature and metropolitan access (-$5,000).`);
        }
      },
      {
        choiceText: 'Acquire both properties, dividing your seasons strictly.',
        outcomeText: 'You spend eighty thousand dollars of family reserves. You are constantly packing cases, but both couples are satisfied.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: -5, happiness: 20, stress: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 80000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Financed secondary retirement tracts to resolve geographic partner splits (-$80,000).`);
        }
      },
      {
        choiceText: 'Concede to your spouses Florida retirement wishes entirely.',
        outcomeText: 'You enjoy sunny beaches but feel terribly detached and miss wilderness silence.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: -10, stress: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Surrendered to spousess retirement geography preferences to avoid splits.`);
        }
      }
    ]
  },

  // =========================================================================
  // FINANCIAL SHOCKS (Events 26 to 42: Money, Debt, & Asset Shock Cases)
  // =========================================================================
  {
    id: 'mid_dp2_fin_01',
    title: 'The Cast Iron Sewage Leak 🚰',
    description: 'A foul-smelling dark slurry rises inside your shower tiles. Your vintage basement cast iron sewer stack has rusted out.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const ownsHome = s.assets?.some(a => a.type === 'real_estate');
      return age !== undefined && age >= 26 && age <= 45 && ownsHome;
    },
    choices: [
      {
        choiceText: 'Hire professional master plumbers to replace the stack for six thousand dollars.',
        outcomeText: 'They excavate the concrete yard and install pristine ABS piping. The flow returns perfectly, though bank reserves are thin.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 10, stress: -20, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 6000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Contracted professional drainage overhauls to replace dead cast iron stacks (-$6,000).`);
        }
      },
      {
        choiceText: 'Patch the active cast iron leaks using epoxy wraps and tape yourself.',
        outcomeText: 'You spend fifty bucks and cover your face in black dust. The patch holds, but smells of organic sulfur remain.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, smarts: 20, stress: 10, happiness: -5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 50, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Wrapped damaged sewage lines yourself using industrial resin wraps.`);
        }
      },
      {
        choiceText: 'Overlook the slurry, hoping it is simple municipal line backups.',
        outcomeText: 'The line collapses completely on Tuesday. Raw sewage leaks behind wall studs, creating a fifteen-thousand-dollar home bill.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -25, stress: 40, happiness: -20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 15000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Suffered toxic domestic plumbing failures after neglecting line leaks (-$15,000).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_02',
    title: 'The Real Estate Reassessment 🧾',
    description: 'The regional municipal board reassesses your neighborhood real estate values, lifting your annual property tax bill by three thousand dollars.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const ownsHome = s.assets?.some(a => a.type === 'real_estate');
      return age !== undefined && age >= 26 && age <= 45 && ownsHome;
    },
    choices: [
      {
        choiceText: 'Pay the reassessed tax bill immediately using interest reserves.',
        outcomeText: 'You avoid any municipality interest penalties. Your capital is drained, but your title is beautifully clean.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 15, happiness: -5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 3000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Paid reassessed residential municipal property assessments (-$3,000).`);
        }
      },
      {
        choiceText: 'Appeal the assessment with custom data arrays down at city hall.',
        outcomeText: 'You present matching sales metrics and structural foundation photos. The board cuts the assessment by seventy percent!',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, stress: 10, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 900, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Successfully appealed municipal property tax spikes down at county boardrooms (-$900).`);
        }
      },
      {
        choiceText: 'Ignore the tax bills and let the arrears accumulate.',
        outcomeText: 'City halls files high-interest municipal tax liens on your property deed, damaging your credit ratings.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 30, looks: -10, happiness: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Suffered municipal real estate tax liens due to unpaid home dues.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_03',
    title: 'The Cracked Engine Cylinder block 🚗',
    description: 'Your commuter car engine flashes bright red heat alarms. Mechanics find a severe pressure crack in cylinder three.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const ownsCar = s.assets?.some(a => a.type === 'vehicle');
      return age !== undefined && age >= 26 && age <= 45 && ownsCar;
    },
    choices: [
      {
        choiceText: 'Install a remanufactured replacement block for four thousand dollars.',
        outcomeText: 'The car runs beautifully once more, quiet and smooth. Your bank balance takes a hard, cold hit.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 4000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Installed factory-grade remanufactured motor blocks to fix car cracks (-$4,000).`);
        }
      },
      {
        choiceText: 'Dump the metal chassis at salvage auctions for eight hundred dollars.',
        outcomeText: 'You get minor scrap funds but are left without transport, riding local diesel buses through winter rains.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -10, stress: 20, happiness: -15 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 800, 20000000);
          s.assets = s.assets.filter(a => a.type !== 'vehicle');
          s.log.push(`Age ${s.characterInfo.age}: Sold a compromised vehicle engine code to scrap auctions (+$800).`);
        }
      },
      {
        choiceText: 'Seal the pressure crack yourself using chemical copper blocks.',
        outcomeText: 'The chemistry trick seals the crack temporarily. It keeps the car rolling for basic suburban errands.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 10, happiness: 5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 100, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Sealed vehicle cylinder pressures using cheap chemical additives (-$100).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_04',
    title: 'The Mortgage Adjustment Shock 📈',
    description: 'Your variable interest mortgage adjustable rate matches new inflation metrics, adding seven hundred dollars to your monthly payments.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const hasMortgage = s.assets?.some(a => a.type === 'real_estate' && a.isFinanced);
      return age !== undefined && age >= 26 && age <= 45 && hasMortgage;
    },
    choices: [
      {
        choiceText: 'Refinance to standard thirty-year fixed interest rates immediately.',
        outcomeText: 'You lock in a secure, stable payment structure, spending fifteen hundred dollars in closing costs.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -20, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Refinanced variable home mortgages to fixed interest options (-$1,500).`);
        }
      },
      {
        choiceText: 'Absorb the new variable payment, cutting down all household restaurant bills.',
        outcomeText: 'You eat cabbage and rice inside your kitchen vaults. You preserve cash, but feel domestic gloom.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -5, stress: 25, happiness: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Absorbed high variable mortgage rates, cutting all entertainment.`);
        }
      },
      {
        choiceText: 'Pay off forty thousand dollars of loan principal from investment pools.',
        outcomeText: 'Your loan balance collapses cleanly, dropping your payments below previous metrics! High-tier defense.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, stress: -15, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 40000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Paid off heavy chunks of home mortgage principal to bypass rate spikes (-$40,000).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_05',
    title: 'The High-Yield Bank Freeze 🏦',
    description: 'Your digital neo-bank, where you stash fifteen thousand dollars in high-yield certificates, freezes withdrawals.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45 && s.finances.cashBalance >= 15000;
    },
    choices: [
      {
        choiceText: 'Submit formal federal insurance claim petitions immediately.',
        outcomeText: 'It takes six months of stressful administrative emails, but the government recovers your full balance.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 30, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Filed federal insurance claims, recovering frozen digital bank capital.`);
        }
      },
      {
        choiceText: 'Sell the locked account rights to recovery funds for fifty cents on the dollar.',
        outcomeText: 'You secure seventy-five hundred dollars in immediate cash. You lose massive capital but end the panic.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, happiness: -10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 7500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Liquidated distressed bank claims to private debt buyers (-$7,500).`);
        }
      },
      {
        choiceText: 'Join a class-action civic law group fighting the bank receivers.',
        outcomeText: 'You spend nine hundred dollars on legal fees. The case drags on, creating a constant mental burden.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 25, happiness: -5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 900, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Joined class-action groups fighting structural bank failures (-$900).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_06',
    title: 'The Cryptographic Token Rug 🪙',
    description: 'An online tech influencer convinces you to swap five thousand dollars for a "guaranteed-yield" decentralized liquidity token.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45 && s.finances.cashBalance >= 5000;
    },
    choices: [
      {
        choiceText: 'Purchase the guaranteed-yield liquidity token.',
        outcomeText: 'The project founders delete their social media pages at 3:00 AM, stealing all liquidity. Your investment is completely gone.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: -15, stress: 30, happiness: -15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 5000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Lost five thousand dollars in high-yield decentralized token rug-pull scams (-$5,000).`);
        }
      },
      {
        choiceText: 'Decline the investment and park your money in standard municipal treasury bills.',
        outcomeText: 'You earn a tranquil, boring five percent yield. Your money remains clean and perfectly secure.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: -10, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Opted for secure treasury bills, avoiding online token hype.`);
        }
      },
      {
        choiceText: 'Report the marketing scheme to securities and exchange boards.',
        outcomeText: 'You trigger a federal warning registry on the creator. You protect others, gaining excellent karma.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 35, smarts: 15, stress: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Filed warning reports with securities regulators against online crypto promoters.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_07',
    title: 'The Solar Warranty Default ☀️',
    description: 'Your home rooftop solar panels fail due to bad silicon inverters. The installer firm goes bankrupt, deleting your twenty-year warranty.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const ownsHome = s.assets?.some(a => a.type === 'real_estate');
      return age !== undefined && age >= 26 && age <= 45 && ownsHome;
    },
    choices: [
      {
        choiceText: 'Replace the broken silicon inverters for thirty-five hundred dollars.',
        outcomeText: 'Your power output returns perfectly, though you feel deep anger at paying for manufacturer defects.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 15, happiness: -5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 3500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Replaced broken solar rooftop inverters after vendor bankruptcy (-$3,500).`);
        }
      },
      {
        choiceText: 'Settle for standard coal grid power, bypassing green tech projects.',
        outcomeText: 'You disconnect the panels, paying conventional utilities. Your home stays powered but carbon outputs rise.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -5, karma: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Reverted green power configurations back to municipal coal networks.`);
        }
      },
      {
        choiceText: 'Engage micro-solar tools to patch the system circuits yourself.',
        outcomeText: 'You study basic terminal wiring guides, repairing the main board easily! You feel like a genius.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, stress: 10, happiness: 20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 200, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Repaired broken residential solar systems using personal hardware studies.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_08',
    title: 'The Sinking Foundation Shift 🧱',
    description: 'Your living room drywall starts fracturing heavily. Geotechnical inspectors find clay shifting under your retaining wall.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const ownsHome = s.assets?.some(a => a.type === 'real_estate');
      return age !== undefined && age >= 26 && age <= 45 && ownsHome;
    },
    choices: [
      {
        choiceText: 'Contract engineering squads to screw steel piers down to bedrock for twelve thousand dollars.',
        outcomeText: 'A massive industrial repair. Heavy drilling screws stabilize the foundation perfectly, saving your home.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 20, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 12000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Underpinned home foundation shifts with deep bedrock steel piers (-$12,000).`);
        }
      },
      {
        choiceText: 'Siphon ground water away by building a French gravel trench yourself.',
        outcomeText: 'You dig clay for five weekends, laying plastic conduits. Wet ground pressures drop, stopping the cracks.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, smarts: 20, stress: 15, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 800, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Constructed backyard drainage grids to isolate shifting foundation clay (-$800).`);
        }
      },
      {
        choiceText: 'Sell the home immediately without declaring the wall fractures.',
        outcomeText: 'You secure full pricing and buy condos, but deep waves of guilt and heavy negative karma weigh on your mind.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -45, stress: 30, happiness: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Sold residential properties without declaring structural geotechnical cracks.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_09',
    title: 'The Silent Termite Swarm 🐜',
    description: 'During a closet deep cleaning, you drop your vacuum through dry structural studs. Termites have eaten your rear walls.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const ownsHome = s.assets?.some(a => a.type === 'real_estate');
      return age !== undefined && age >= 26 && age <= 45 && ownsHome;
    },
    choices: [
      {
        choiceText: 'Tent the home for complete toxic chemical fumigation and rebuild the stud lines.',
        outcomeText: 'You spend sixty-five hundred dollars. The pests are fully terminated, and you sleep with clean wood frameworks.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 20, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 6500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Contracted whole-house chemical fumigations to clear termite colonies (-$6,500).`);
        }
      },
      {
        choiceText: 'Apply organic orange oil sprays, ignoring the structural wood shifts.',
        outcomeText: 'The pests continue to feed in silence. Within a year, your kitchen ceiling starts sagging visibly.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -10, stress: 35, happiness: -20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 4000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Faced major frame damage after applying ineffective organic spray oils on termites (-$4,000).`);
        }
      },
      {
        choiceText: 'Siphon local savings to fund a modular composite wall reconstruction.',
        outcomeText: 'You tear down the wood structure and substitute concrete blocks, ensuring everlasting pest immunity.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 15, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 9500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Reconstructed damaged home wings using insect-immune cement framing panels (-$9,500).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_10',
    title: 'The Broken HVAC Compressor ❄️',
    description: 'A sweltering heat wave hits municipal borders. Your residential air conditioning compressor burns out completely.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const ownsHome = s.assets?.some(a => a.type === 'real_estate');
      return age !== undefined && age >= 26 && age <= 45 && ownsHome;
    },
    choices: [
      {
        choiceText: 'Hire professional ventilation teams to install a new heat pump unit.',
        outcomeText: 'You spend forty-five hundred dollars. Your rooms are instantly frosty, offering peaceful sleep and clean air.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 10, stress: -15, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 4500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Financed high-efficiency heat pump ventilation arrays during municipal heat waves (-$4,500).`);
        }
      },
      {
        choiceText: 'Buy two cheap metal floor window fans, drinking iced tea in underwear.',
        outcomeText: 'You save cash. Your apartment stays humid, noisy, and hot, causing light insomnia and sweat stains.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -10, stress: 15, happiness: -10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 150, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Endured summer heat waves with basic window fan configurations.`);
        }
      },
      {
        choiceText: 'Clean the electrical capacitors yourself using copper contact cleaners.',
        outcomeText: 'An incredible drive! The motor spins back to life for forty dollars in supplies. High-tier handiwork.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, health: 5, stress: -10, happiness: 20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 40, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Serviced defective HVAC starter capacitors yourself, restoring cool ventilation.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_11',
    title: 'The Tainted Medical Bill 🩺',
    description: 'You receive an out-of-network emergency room bill for ninety-five hundred dollars following a minor kidney stone consult.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Siphon personal cash reserves and pay the bill in full immediately.',
        outcomeText: 'The hospital registers the payment, though your heart is highly bitter at medical pricing indices.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 15, happiness: -5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 9500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Settled predatory out-of-network clinical emergency invoices (-$9,500).`);
        }
      },
      {
        choiceText: 'Submit formal audit logs, demanding itemized line inventories for every single bandage.',
        outcomeText: 'An incredibly smart defense! The clinic cuts the billing balance to twelve hundred dollars, saving massive funds.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, stress: 10, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1200, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Forced hospitals to audit billing lines, reducing medical balances (-$1,200).`);
        }
      },
      {
        choiceText: 'Apply for sliding-scale municipal low-income assistance programs.',
        outcomeText: 'The program approves your case, dropping your bill to six hundred dollars. It takes hours of paperwork.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 15, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 600, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Secured sliding-scale municipal charity support for outstanding clinical bills.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_12',
    title: 'The Water Main Rupture 🚰',
    description: 'The shared municipal water main on your property borders bursts, creating a sinkhole. City halls commands neighbors to fund emergency repairs.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const ownsHome = s.assets?.some(a => a.type === 'real_estate');
      return age !== undefined && age >= 26 && age <= 45 && ownsHome;
    },
    choices: [
      {
        choiceText: 'Contribute forty-five hundred dollars to the municipal neighborhood repair fund.',
        outcomeText: 'Specialist crews lay a thick new distribution main line. Sinkholes are stabilized, and yard water runs cleanly.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 10, stress: -10, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 4500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Backed neighborhood water main repair assessments (-$4,500).`);
        }
      },
      {
        choiceText: 'Form a legal group to petition municipal code boards for complete state backing.',
        outcomeText: 'A long civil battle. You secure a city grant covering ninety percent of project costs! Neighbors praise your intellect.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, karma: 30, happiness: 20, stress: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 450, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Chaired neighborhood petitions to shift road repair fees to state municipal grids.`);
        }
      },
      {
        choiceText: 'Ignore the repair letters, consuming bottled spring water.',
        outcomeText: 'The road sits collapsed. Neighbor relations become incredibly toxic, and muddy sinkholes breed marsh flies nearby.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -10, stress: 30, karma: -20, happiness: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Ignored municipal water main sinkhole repair requests, creating neighbor friction.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_13',
    title: 'The Identity Theft Drain 🔒',
    description: 'A malicious phishing scammer duplicates your identity files, cloning debit cards to drain nine thousand dollars from checking accounts.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45 && s.finances.cashBalance >= 9000;
    },
    choices: [
      {
        choiceText: 'File urgent federal fraud reports and secure complete transaction reversals.',
        outcomeText: 'Your bank verifies the signature anomalies, returning the full nine thousand dollars cleanly. Outstanding defense.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 20, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Secured full financial fraud reversals after identity phishing events.`);
        }
      },
      {
        choiceText: 'Do nothing, assuming online tracking tools resolve automated claims.',
        outcomeText: 'The claim expires silently. Your bank refuses to verify the theft, costing you nine thousand dollars in lost capital.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: -15, stress: 35, happiness: -20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 9000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Suffered serious checking account losses due to expired identity fraud timelines.`);
        }
      },
      {
        choiceText: 'Enroll in high-security biometric vault networks for small annual fees.',
        outcomeText: 'You secure your accounts with physical keys, ensuring complete immunity from future digital attacks.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: -10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 400, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Installed physical biometric authentication keys on all financial assets (-$400).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_14',
    title: 'The Shingle Slate Flight 🏠',
    description: 'A high-speed autumn gale tears seventy ceramic slates from your roof, allowing rainwater to warp drywall ceilings.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const ownsHome = s.assets?.some(a => a.type === 'real_estate');
      return age !== undefined && age >= 26 && age <= 45 && ownsHome;
    },
    choices: [
      {
        choiceText: 'Contract certified roof framing crews to slate the roof for five thousand dollars.',
        outcomeText: 'Your attic frame is perfectly water-tight and insulated once more, though your cash reserves are depleted.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 15, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 5000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Retained professional carpentry teams to replace storm-torn roof slate units (-$5,000).`);
        }
      },
      {
        choiceText: 'Scale the high roof ladder and tack down tarpaulin sheets yourself.',
        outcomeText: 'You slip once but secure the tarp. Drywall is protected, though windy noises keep you awake.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -10, smarts: 15, stress: 20, happiness: 5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 150, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Installed temporary roof tarpaulin sheets yourself to block incoming storm leaks.`);
        }
      },
      {
        choiceText: 'Claim complete storm coverage from structural hazard insurers.',
        outcomeText: 'They approve your files, covering the entire repair except for a modest five-hundred-dollar deductible fee.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 5, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Leveraged hazard insurance files to cover storm roof reconstructions (-$500).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_15',
    title: 'The Falling Maple Branch 🌳',
    description: 'A massive old maple branch falls from your garden borders, smashing your standalone wooden garage roof in three spots.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const ownsHome = s.assets?.some(a => a.type === 'real_estate');
      return age !== undefined && age >= 26 && age <= 45 && ownsHome;
    },
    choices: [
      {
        choiceText: 'Rebuild the wood garage rafters yourself using cedar studs.',
        outcomeText: 'It requires three days of hard circular-saw work. Your hands are covered in pine resins, but the garage is robust.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, smarts: 20, stress: 10, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 600, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Rebuilt smashed garage rafters yourself using structural cedar studs (-$600).`);
        }
      },
      {
        choiceText: 'Hire professional debris removal and carpenters for thirty-five hundred dollars.',
        outcomeText: 'They clear the wood and restore the structures beautifully, though your savings take a hit.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -10, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 3500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Hired heavy arborists to clear fallen botanical debris and fix structures (-$3,500).`);
        }
      },
      {
        choiceText: 'Let the branch sit, using the garage space for composting.',
        outcomeText: 'The moist wood invites carpenter ants to breed, creating future structural decay in your garage floor.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -5, stress: 25, happiness: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Left fallen logs atop garage panels, letting carpenter ants breed.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_16',
    title: 'The Venture Partner Default 📉',
    description: 'You partner with a local friend to buy a rental townhouse. The friend defaults on his share of payments, leaving you with full mortgage liabilities.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Evict the roommate, taking complete ownership of the property.',
        outcomeText: 'You spend sixty-five hundred dollars in court files. You take full command of the asset, though the friendship is destroyed.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 25, happiness: 5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 6500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Evicted defaulting joint partners to secure absolute property deeds (-$6,500).`);
        }
      },
      {
        choiceText: 'Cover their defaulted shares silently to preserve the friendship.',
        outcomeText: 'You spend four thousand dollars. They promise to repay you eventually, though they avoid your phone calls.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 25, stress: 20, happiness: -10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 4000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Backed defaulted commercial partner mortgage shares out of pocket (-$4,000).`);
        }
      },
      {
        choiceText: 'Sell your fractional rights to distressed real estate funds.',
        outcomeText: 'You secure a quick exit without further debt liabilities. You trace slight cash losses but avoid courts.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -20, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Sold fractional investment rights to distressed equity groups.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_17',
    title: 'The Vintage Clutch Snap ⚙️',
    description: 'The manual clutch on your classic vintage convertible vehicle snaps during a weekend parade trip.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const ownsCar = s.assets?.some(a => a.type === 'vehicle');
      return age !== undefined && age >= 26 && age <= 45 && ownsCar;
    },
    choices: [
      {
        choiceText: 'Replace the classic clutch with original historic factory parts for three thousand dollars.',
        outcomeText: 'The transmission shifts like warm butter! The vintage valuation is perfectly preserved.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 15, stress: -10, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 3000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Sourced vintage historical transmission clutches to fix collector vehicles (-$3,000).`);
        }
      },
      {
        choiceText: 'Install a modern generic clutch conversion, dropping authenticity values.',
        outcomeText: 'You preserve cash, but collector purists look down on the modification, shaving looks ratings.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: -10, stress: -5, happiness: 5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1200, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Installed generic modern clutches in vintage cars to save cash (-$1,200).`);
        }
      },
      {
        choiceText: 'Sell the broken vehicle to historic scrap restoration circles.',
        outcomeText: 'You offload the collector maintenance struggle, banking four thousand dollars in clean bills.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, happiness: 10 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 4000, 20000000);
          s.assets = s.assets.filter(a => a.type !== 'vehicle');
          s.log.push(`Age ${s.characterInfo.age}: Liquidated classic collector vehicles with mechanical issues (+$4,000).`);
        }
      }
    ]
  }
];

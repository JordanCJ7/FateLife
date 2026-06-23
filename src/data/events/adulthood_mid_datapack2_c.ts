import { GameEvent, CharacterState } from '../../types';
import { adjustStats } from '../../utils';

export const youngDataPack2CEvents: GameEvent[] = [
  // =========================================================================
  // REMAINING FINANCIAL SHOCKS (Events 18 to 25: Money & Debt Shock Cases)
  // =========================================================================
  {
    id: 'mid_dp2_fin_18',
    title: 'The Studio Commercial Rent Spike 🏢',
    description: 'The commercial landlord hikes the monthly rent on your local photography studio or equipment storage workshop by sixty percent.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Incorporate the rent increase, adjusting local pricing lists.',
        outcomeText: 'You preserve your studio street address, but several old price-sensitive clients walk away.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 15, happiness: -5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 2500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Absorbed a commercial workspace lease spike, losing local clients (-$2,500).`);
        }
      },
      {
        choiceText: 'Relocate your equipment and operations to your residential garage.',
        outcomeText: 'You save massive lease costs, though your house is crammed with heavy light racks and metal cords.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: -10, stress: -10, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Relocated trade equipment to your residential garage to avoid space leases.`);
        }
      },
      {
        choiceText: 'Co-lease the commercial space with an eccentric local sculpturist.',
        outcomeText: 'You divide the lease cleanly. It is noisy and smells of clay, but your overhead drops perfectly.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Co-leased commercial warehouse spaces to share development rent.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_19',
    title: 'The Student Loan Interest index 🧾',
    description: 'Federal student loan index rates increase, expanding your total undergraduate debt balance by forty-five hundred dollars.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45 && s.finances.annualDebt > 0;
    },
    choices: [
      {
        choiceText: 'Pay off the entire student loan balance using cash reserves immediately.',
        outcomeText: 'A wonderful release! You are finally, perfectly debt-free, though your immediate bank reserves are thin.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -30, happiness: 25 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 4500, -500000);
          s.finances.annualDebt = 0;
          s.log.push(`Age ${s.characterInfo.age}: Fully liquidated remaining student loan balances, achieving financial freedom (-$4,500).`);
        }
      },
      {
        choiceText: 'Absorb the higher monthly payment index, cutting personal hobby spending.',
        outcomeText: 'You preserve cash reserves but miss out on concerts and books, feeling a constant financial drag.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 20, happiness: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Maintained variable student loan payments, cutting leisure accounts.`);
        }
      },
      {
        choiceText: 'Apply for federal public service debt forgiveness tracks.',
        outcomeText: 'You submit logs of your civic contributions. The state approves! Your loan balance is reduced by ninety percent.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, karma: 20, happiness: 20, stress: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Secured federal debt forgiveness after documenting civic contributions.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_20',
    title: 'The Painting Valuation Collapse 🎨',
    description: 'A modern painting you purchased for eleven thousand dollars is declared a clever synthetic lithograph forgery by museum curators.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45 && s.finances.cashBalance >= 11000;
    },
    choices: [
      {
        choiceText: 'Acquire the piece, keeping it as an interesting lesson in forgery art.',
        outcomeText: 'The painting hangs in your hall. You tell hilarious stories at dinner parties, turning losses into prestige.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 15, happiness: 10, stress: -5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 11000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Kept a forged modern lithograph, turning art scams into social anecdotes (-$11,000).`);
        }
      },
      {
        choiceText: 'Initiate dynamic legal claims against the dealer gallery for fraud.',
        outcomeText: 'After intense legal pressure, the dealer returns nine thousand dollars to shut down fraud reporting files.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, stress: 20, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 2000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Sued art dealers for selling lithograph forgeries, recovering key capital (-$2,000).`);
        }
      },
      {
        choiceText: 'Pawn the canvas silently to third-party offshore auction houses.',
        outcomeText: 'You recover your cash, but your personal ethical record is heavily stained. A dark transaction.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -45, stress: 30, happiness: -5 });
          s.log.push(`Age ${s.characterInfo.age}: pawned verified forged canvas assets to overseas auction blocks.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_21',
    title: 'The Sewer Line Assessment 🚰',
    description: 'The city finds roots blocking the main sewer lead under your sidewalk, mandating you replace seventy feet of roadway piping.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const ownsHome = s.assets?.some(a => a.type === 'real_estate');
      return age !== undefined && age >= 26 && age <= 45 && ownsHome;
    },
    choices: [
      {
        choiceText: 'Contract trenchless sewer pipe-lining teams for eight thousand dollars.',
        outcomeText: 'Special epoxy sleeves mold perfectly inside the host pipe, bypassing heavy driveway digging.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 10, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 8000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Installed trenchless sewer epoxy sleeve pipes under sidewalks (-$8,000).`);
        }
      },
      {
        choiceText: 'Hire backyard excavators to dig up the flowerbeds for four thousand dollars.',
        outcomeText: 'They solve the leak but destroy your valuable garden plants and lawn, creating mud holes.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: -10, stress: 25, happiness: -15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 4000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Hired heavy street diggers to replace sewer conduits, ruining flowerbeds (-$4,000).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_22',
    title: 'The Land Subsidence Hole 🕳️',
    description: 'An old municipal wood well collapses under your concrete driveway, creating a deep sinkhole.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const ownsHome = s.assets?.some(a => a.type === 'real_estate');
      return age !== undefined && age >= 26 && age <= 45 && ownsHome;
    },
    choices: [
      {
        choiceText: 'Hire concrete mixing trucks to fill the void with slurry for three thousand dollars.',
        outcomeText: 'The hole absorbs four yards of wet concrete. The driveway is restored rock-solid and secure.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -10, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 3000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Filled collapsed residential well voids with solid industrial cement slurry (-$3,000).`);
        }
      },
      {
        choiceText: 'Fill the sinkhole yourself with yard compost and logs.',
        outcomeText: 'You fill the hole. It sinks visibly whenever rains fall, making parking your car a risky act of balance.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: -10, stress: 20, happiness: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Filled sinkholes yourself using yard organic composts, causing ongoing dips.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_23',
    title: 'The Sudden Tax audit 🏛️',
    description: 'Internal revenue departments query a five-thousand-dollar business credit card expense claim from three years ago.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Hire certified tax accountants to compile itemized expense logs.',
        outcomeText: 'The accountant validates your ledger cleanly. The audit closes with zero penalties. Cost: one thousand dollars.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 10, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Retained professional CPA teams to close historical tax audits safely (-$1,000).`);
        }
      },
      {
        choiceText: 'Pay the back taxes and interest penalty silently for four thousand dollars.',
        outcomeText: 'You preserve your peaceful time, bypassing paperwork, though your bank balance takes a hard hit.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, happiness: -5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 4000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Paid disputed municipal back taxes and interest penalties silently (-$4,000).`);
        }
      },
      {
        choiceText: 'Represent yourself down at the regional revenue office.',
        outcomeText: 'An exhausting four-hour interview. You argue successfully but lose massive sweat and suffer migraines.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -10, smarts: 25, stress: 25 });
          s.log.push(`Age ${s.characterInfo.age}: Defended business expense filings personally in municipal audit offices.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_24',
    title: 'The Stolen Lawn Rig 🔋',
    description: 'A thief breaks into your backyard garden shed, stealing two high-end electric lawn mowers worth eighteen hundred dollars.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const ownsHome = s.assets?.some(a => a.type === 'real_estate');
      return age !== undefined && age >= 26 && age <= 45 && ownsHome;
    },
    choices: [
      {
        choiceText: 'Buy matching high-security steel sheds and new cordless mowers.',
        outcomeText: 'You spend twenty-two hundred dollars. Your backyard looks modern and your gear is beautifully locked.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -10, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 2200, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Upgraded home garden sheds with security locks and purchase new mowers (-$2,200).`);
        }
      },
      {
        choiceText: 'Purchase a hand-crank manual reel mower, cutting the grass slowly.',
        outcomeText: 'It requires intense physical effort weekly. Your cardio condition improves, but you look highly sweaty.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, stress: 5, happiness: 5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 150, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Adopted manual hand-crank reel mowers to maintain backyard turf plots (-$150).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_fin_25',
    title: 'The Freight Cargo Stall 🛳️',
    description: 'An international shipping container holding custom components you imported for regional contract sales gets stalled at sea.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Air-freight replacement components immediately, taking major express losses.',
        outcomeText: 'You honor contract timelines flawlessly, preserving client credit, though you lose thirty-five hundred dollars.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 15, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 3500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Paid premium air-freight express charges to meet contract milestones (-$3,500).`);
        }
      },
      {
        choiceText: 'Allow the cargo vessel to drift on schedule, apologizing to contractors.',
        outcomeText: 'They are deeply frustrated and delay subsequent invoice payments. Your company standing drops.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: -10, stress: 25, happiness: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Sustained commercial reputational hits due to delayed overseas shipping containers.`);
        }
      }
    ]
  },

  // =========================================================================
  // HEALTH, BURNOUT, & MINDSET (Events 1 to 25: Clinical Burnout Cases)
  // =========================================================================
  {
    id: 'mid_dp2_hea_01',
    title: 'The Boardroom Heart Palpitation 🫀',
    description: 'During a grueling twelve-hour quarterly projection board meeting, your chest tightens visibly, accompanied by high palpitations.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const stress = s.stats?.stress;
      return age !== undefined && age >= 26 && age <= 45 && stress !== undefined && stress >= 80;
    },
    choices: [
      {
        choiceText: 'Check into the nearby emergency cardiac clinic immediately.',
        outcomeText: 'Doctors diagnose extreme fatigue-induced panic. They mandate a minimum two-week screen detox. Cost: fifteen hundred dollars.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, stress: -40, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Checked into critical emergency clinic wards following stress-induced palpitations (-$1,500).`);
        }
      },
      {
        choiceText: 'Swallow an extra caffeine tablet and finish editing the forecast models.',
        outcomeText: 'You complete the projections, but collapse in hotel lobbies at 9:00 PM. Your medical health metrics are seriously damaged.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -35, stress: 45, happiness: -20 });
          s.log.push(`Age ${s.characterInfo.age}: Suffered cardiovascular physical collapse after ignoring chest pain signals.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_02',
    title: 'The Blue Slate Eye Strain 👁️',
    description: 'Sixteen-hour daily monitor reviews result in dual vision grids and intense behind-eye neural aches.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Purchase high-end computer blue-light protection glasses.',
        outcomeText: 'Your optical nerves recover cleanly. The amber lenses look slightly silly, but your headaches vanish.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 10, stress: -15, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 250, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Upgraded screen workspaces and eyewear to combat optical fatigue (-$250).`);
        }
      },
      {
        choiceText: 'Incorporate the 20-20-20 visual rest routine hourly.',
        outcomeText: 'You look at garden trees hourly, preserving your vision and focus perfectly without spending a dollar.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, health: 15, stress: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Integrated hourly botanical eyesight relaxations, curing eye strain.`);
        }
      },
      {
        choiceText: 'Ignore the behind-eye neural aches to complete coding folders.',
        outcomeText: 'Your vision quality drops visibly, requiring a expensive high-index prescription lens fitting next spring.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, stress: 20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 600, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Damaged visual focusing muscles by overriding severe behind-eye fatigue headaches (-$600).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_03',
    title: 'The Spine Disc Twist 🦴',
    description: 'You twist awkwardly while picking up a heavy box of copier paper, triggering a burning herniation in your lower lumbar spine.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Retain physical therapists to rebuild your deep abdominal core muscle structures.',
        outcomeText: 'After twelve weeks of stretches, your spine is stable, robust, and painless. Highly smart recovery. Cost: twelve hundred dollars.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 25, stress: -15, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1200, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Rehabilitated spinal disc herniations using physical therapy core training (-$1,200).`);
        }
      },
      {
        choiceText: 'Swallow daily chemical pain inhibitors to suppress the back aches.',
        outcomeText: 'You walk numbly. You bypass therapy bills, but your body undergoes structural imbalances, reducing your wellness.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, stress: 15, happiness: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Substituted daily physical spinal training with generic painkiller drugs.`);
        }
      },
      {
        choiceText: 'Buy an expensive ergonomic medical leather task chair.',
        outcomeText: 'You spend eighteen hundred dollars. The advanced thoracic support frame helps heal the back during long office sits.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, stress: -10, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1800, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Purchased high-end musculoskeletal office chairs to correct posture issues (-$1,800).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_04',
    title: 'The Frozen Shoulder Lock 🦴',
    description: 'You wake up with absolute stiff paralysis in your left rotator cuff, making putting on a wool coat a painful struggle.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 35 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Initiate daily physical resistance band rotations in the garage.',
        outcomeText: 'Your mobility slowly returns over six painful months. You regain full shoulder rotation and superb health.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 20, stress: -10, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Restored frozen shoulder joints using consistent daily resistance bands.`);
        }
      },
      {
        choiceText: 'Get a direct medical corticosteroid joint injection.',
        outcomeText: 'The fluid blocks pain instantly, allowing easy Dressing, though joint tissue remains slightly fragile. Cost: six hundred dollars.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 10, stress: -15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 600, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Received rapid corticosteroid joint injections to defeat frozen shoulders (-$600).`);
        }
      },
      {
        choiceText: 'Avoid all physical movement, holding the arm closed to your waist.',
        outcomeText: 'The joint capsules thicken further, creating a long-term chronic stiff arm and severe posture humps.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -20, looks: -10, happiness: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Suffered chronic shoulder capsule stiffness after ignoring mobility advice.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_05',
    title: 'The Tinnitus Ringing Tone 👂',
    description: 'A constant, tiny, high-frequency electric ringing tone develops in your left eardrum following noisy commuter rail trips.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Invest in active noise-canceling auditory pods for three hundred dollars.',
        outcomeText: 'The pods block roaring train wheels beautifully, saving your remaining hearing cells and easing the ringing.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 10, stress: -15, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 300, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Purchased premium noise-canceling ear pods to combat transit tinnitus (-$300).`);
        }
      },
      {
        choiceText: 'Consult an ENT specialist for custom acoustic habituation training.',
        outcomeText: 'You learn cognitive shielding methods. Your brain screens out the ringing easily. Cost: eight hundred dollars.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: -10, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 800, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Drafted acoustic habituation therapies to manage ear tinnitus (-$800).`);
        }
      },
      {
        choiceText: 'Drown the ringing with loud music feeds in headphones.',
        outcomeText: 'The heavy volume damages your auditory hairs further, turning mild tinnitus into severe permanent hearing loss.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -20, happiness: -10, stress: 20 });
          s.log.push(`Age ${s.characterInfo.age}: Damaged auditory cells by utilizing high headphone volumes to mask tinnitus.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_06',
    title: 'The Boardroom Panic Wave 🌊',
    description: 'As your name is announced to present corporate spreadsheets, your mouth runs completely dry and you feel catastrophic vertigo.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Incorporate box breathing exercises quietly before speaking.',
        outcomeText: 'Your heart slows perfectly. You present the metrics in a warm, calm, commanding tone, securing corporate praise.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: -20, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Mastered presentation stage panic using box breathing techniques.`);
        }
      },
      {
        choiceText: 'Flee the boardroom immediately, citing sudden food illness.',
        outcomeText: 'You secure physical safety in your car, but colleagues find you unreliable, shaking your division standing.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: -10, stress: 15, happiness: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Fled corporate podium presentations due to sudden panic waves.`);
        }
      },
      {
        choiceText: 'Consult clinical psychologists to obtain cognitive therapy homework.',
        outcomeText: 'Outstanding step. You isolate core career imposter fears, achieving durable, long-term confidence. Cost: nine hundred dollars.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, stress: -25, happiness: 20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 900, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Attended psychological cognitive therapy to dismantle boardroom stage-fright (-$900).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_07',
    title: 'The Acid Reflux Warn 🫃',
    description: 'Eating late corporate meals leaves you with burning esophageal acid reflux that keeps you sitting upright all night.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Enforce a strict medical 7:00 PM fasting boundary.',
        outcomeText: 'The reflux vanishes cleanly. Your sleep is incredibly deep, and you wake up with fresh metabolic energy.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 20, stress: -15, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Enforced evening dining limits, fully curing chronic esophageal acid issues.`);
        }
      },
      {
        choiceText: 'Consume chewable antacid chemical blocks daily during midnight work.',
        outcomeText: 'You temporary neutralize the acid, but the underlying irritation remains, creating throat wall issues.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -10, stress: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Relied on chewable chemical antacids to mask poor late-night digestions.`);
        }
      },
      {
        choiceText: 'Elevate your mattress head line by six inches.',
        outcomeText: 'Gravity stops the acid creep. You sleep slightly better, though your neck feels a bit stiff.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 10, stress: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Adjusted mattress elevation configs to block nighttime acid reflux.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_08',
    title: 'The Midlife Sleep Apnea Study 😴',
    description: 'Your partner complains you snore like a diesel engine, waking up choking on carbon dioxide. Doctors propose sleep studies.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 30 && age <= 45 && s.maritalStatus === 'Married';
    },
    choices: [
      {
        choiceText: 'Perform the sleep study and use a daily CPAP mask.',
        outcomeText: 'Sleeping with a plastic hose feels highly robotic, but oxygen levels soar. Your morning brain fatigue vanishes completely! Cost: fifteen hundred dollars.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 25, smarts: 20, stress: -20, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Integrated clinical CPAP sleep ventilation systems, resolving chronic oxygen deficits (-$1,500).`);
        }
      },
      {
        choiceText: 'Decline the CPAP study, choosing to sleep on your stomach.',
        outcomeText: 'You preserve cash, but continue to wake up with dry mouths, high pulse rates, and severe afternoon fatigue.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, smarts: -10, stress: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Declined clinical sleep apnea evaluations, enduring chronic daylight oxygen exhaustion.`);
        }
      },
      {
        choiceText: 'Achieve significant weight loss targets through low-carb schedules.',
        outcomeText: 'Outstanding focus! Losing twenty pounds closes the throat airway collapse naturally, ending the snoring!',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 25, looks: 15, happiness: 20, stress: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Resolved sleep apnea snoring naturally through metabolic weight loss diets.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_09',
    title: 'The Carpal Tunnel Wrist Freeze 💻',
    description: 'Your right wrist begins tingling with electric numbness weekly, making operating mouse controls a painful struggle.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Adopt a vertical ergonomic mouse and wear protective wrist splints.',
        outcomeText: 'The nerve pressure is immediately released. The splints look tech-geeky, but your wrist heals flawlessly.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, stress: -10, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 120, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Transitioned to vertical ergonomic inputs and wrist splints to heal carpal tunnel (-$120).`);
        }
      },
      {
        choiceText: 'Initiate daily typing stretch breaks and swap hands for mouse controls.',
        outcomeText: 'Your left hand becomes incredibly agile. You balance the structural loads, curing the inflammation for free.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, health: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Trained left-hand mouse controls to balance nerve stresses.`);
        }
      },
      {
        choiceText: 'Ignore the tingling, typing through the wrist numbness.',
        outcomeText: 'The raw nerve undergoes permanent scarring, forcing an expensive five-thousand-dollar emergency surgery next spring.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -20, stress: 25 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 5000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Incurred surgical costs after ignoring severe wrist nerve compressions (-$5,000).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_10',
    title: 'The Anemia Collapse 🩸',
    description: 'You collapse during an office lawn picnic, lightheaded. Blood tests reveal dangerous iron and B12 vitamin depletion.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Revise your meal schedules to prioritize iron-rich organ meats or green vegetables.',
        outcomeText: 'Your blood counts recover beautifully. Your rosy skin tone returns, and you feel massive athletic drive.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 20, looks: 15, happiness: 15, stress: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Restored iron and blood reserves through iron-dense organic meal planning.`);
        }
      },
      {
        choiceText: 'Ingest cheap generic iron tablets without food controls.',
        outcomeText: 'The synthetic iron causes severe stomach cramps and nausea, though blood levels slowly crawl upward.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 5, stress: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Ingested low-grade steel iron tablets, suffering gut irritation.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_11',
    title: 'The Dental Abscess Infection 🦷',
    description: 'Your lower back molar begins throbbing with hot, fluid-filled bacterial decay pressure, making eating a brutal trial.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Contract endodontists to perform a root canal treatment for fifteen hundred dollars.',
        outcomeText: 'The infection is fully cleared. They cap the tooth with a clean porcelain shell. You eat steaks in bliss.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 20, stress: -15, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Cleared dental abscess infections using porcelain root canal treatments (-$1,500).`);
        }
      },
      {
        choiceText: 'Instruct the dentist to extract the rotten tooth cleanly for three hundred dollars.',
        outcomeText: 'The pain ends. You are left with a tiny gaps in the rear of your mouth, though it avoids expensive root bills.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: -10, health: 15, stress: -10, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 300, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Extracted rotting back molars to resolve deep dental infections cheaply (-$300).`);
        }
      },
      {
        choiceText: 'Rinse the decay spot with tea tree oils and ignore the dentist.',
        outcomeText: 'The infection enters your jawbone, causing highly swollen cheeks and severe emergency ward fees.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -25, looks: -15, stress: 30, happiness: -20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 4000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Suffered jawbone infections after neglecting major molar abscess decay (-$4,000).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_12',
    title: 'The Hamstring Gym Snap 🏋️',
    description: 'You load three hundred pounds on the hex-bar during a frantic gym session, tearing your mature hamstring fibers.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 30 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Rest the leg completely, applying recovery wraps and light swimming lanes.',
        outcomeText: 'The muscle fiber blends back together over four months. Your flexibility crawls back to excellent metrics.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, stress: -10, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Restored torn hamstring limbs using swimming and compression wrap protocols.`);
        }
      },
      {
        choiceText: 'Siphon cash to pay for dynamic laser tissue therapy.',
        outcomeText: 'Special micro-lasers speed up healing beautifully. You walk without a limp inside three weeks! Cost: fifteen hundred dollars.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 25, stress: -15, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Financed tissue-stimulating laser therapies to fix torn leg muscles (-$1,500).`);
        }
      },
      {
        choiceText: 'Strap a plastic brace on and continue executing heavy squats.',
        outcomeText: 'The muscle snaps completely, necessitating emergency surgery and creating a permanent, painful limp.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -30, looks: -10, stress: 35, happiness: -20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 6000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Severed quadricept or hamstring links by lifting over tears (-$6,000).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_13',
    title: 'The Quiet Isolation 🏔️',
    description: 'The intense career rush leaves you feeling completely empty and detached from childhood friendships.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Attend a localized high-school reunion evening party.',
        outcomeText: 'You drink beers and laugh about vintage student pranks, fully restoring your sense of youthful belonging.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 25, looks: 10, stress: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Attended school reunions to restore long-lost peer circles.`);
        }
      },
      {
        choiceText: 'Incorporate active weekly volunteer shifts at the local shelter.',
        outcomeText: 'Helping feed stray dogs connects you to clean civic values, boosting your spiritual karma.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 35, health: 10, happiness: 20 });
          s.log.push(`Age ${s.characterInfo.age}: Handled mid-life loneliness by dedicating hours to animal sanctuaries.`);
        }
      },
      {
        choiceText: 'Accept the isolated detachment as a basic reality of mature age.',
        outcomeText: 'You read philosophy books alone in your kitchen, feeling peaceful but slightly chilly.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: -5, happiness: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Integrated personal stoicism files to navigate mature social shifts.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_14',
    title: 'The Appalachian Trail Trek 🏔️',
    description: 'A deep urge to escape modern computer monitors prompts you to contemplate a solitary two-week mountain trek.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Buy rugged gear packs and hike sixty miles across the high ridgelines.',
        outcomeText: 'You sleep under glowing stars and bathe in ice-cold creek waters! Chronic stress melts and lungs are purified.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 25, stress: -35, happiness: 30 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 800, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Hiked high mountain ranges to reset screen-fatigued mental systems (-$800).`);
        }
      },
      {
        choiceText: 'Ignore the mountain urge to preserve your precious desk hours.',
        outcomeText: 'You maintain your weekly project logs, but your eyes look incredibly glazed and dry.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -10, smarts: 10, stress: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Declined outdoor treks to protect standard office sprint schedules.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_15',
    title: 'The Silent Sabbatical 🎨',
    description: 'Your tech team completes a massive software launch. You possess the financial reserves to request an unpaid six-week peace break.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45 && s.finances.cashBalance >= 8000;
    },
    choices: [
      {
        choiceText: 'Take the unpaid six-week mental peace break.',
        outcomeText: 'You read French literature, learn watercolor painting, and walk dogs. Your soul is completely restored.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 20, stress: -30, happiness: 25 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 4000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Executed unpaid creative sabbaticals, fully restoring mental health (-$4,000).`);
        }
      },
      {
        choiceText: 'Decline the break, immediately requesting assignment to the next billing sprint.',
        outcomeText: 'Your boss praises your absolute dedication, handing you stock options, though you feel like a machine.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: 25, happiness: -10 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 5000, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Logged immediate back-to-back projects to capture cash incentives (+$5,000).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_16',
    title: 'The Laser Eye Transformation 👁️',
    description: 'A prestigious medical laser center offers complete optical LASIK correction for thirty-five hundred dollars.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Undergo the laser LASIK vision correction surgery.',
        outcomeText: 'The clinical operation takes ten minutes. You wake up with pristine twenty-twenty vision! Outstanding life upgrade.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 25, looks: 15, happiness: 25 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 3500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Corrected optical focus using advanced LASIK laser therapies (-$3,500).`);
        }
      },
      {
        choiceText: 'Decline the medical laser and maintain clean wire frames.',
        outcomeText: 'You stay with reliable glasses, keeping your capital safe and preserving classical academic style.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Kept traditional glass frames, bypassing medical lasers.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_17',
    title: 'The Hair line Retreat 🧑‍🦲',
    description: 'You notice a substantial bare scalp gap in your crown hairs while prepping for passport photos.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 30 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Fly to an Istanbul clinical center for an intensive follicular hair transplant.',
        outcomeText: 'You spend four thousand dollars. The new grafts take beautifully over nine months, yielding thick hair.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 25, happiness: 20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 4000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Financed microscopic hair follicle transplants in foreign clinics (-$4,000).`);
        }
      },
      {
        choiceText: 'Shave your entire head with a razor, embracing brutalist athletic aesthetics.',
        outcomeText: 'A high-contrast change! You look extremely clean-cut, sharp, and confident. Zero grooming overhead!',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 15, happiness: 15, stress: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Shaved remaining head locks to adopt a clean, minimalist profile.`);
        }
      },
      {
        choiceText: 'Worry constantly, purchasing expensive synthetic topical foaming drugs.',
        outcomeText: 'You spend eighty dollars a month. The foam is sticky and irritates your skin with zero new hair.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 15, happiness: -10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Applied poor topical chemical foams, compounding scalp irritation (-$500).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_18',
    title: 'The Metabolic Brake 🫃',
    description: 'You gain ten pounds despite maintaining identical meal sizes, realizing your thirty-something metabolism is slowing.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 32 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Implement a strict intermittent fasting schedule, drinking black coffee.',
        outcomeText: 'Outstanding results. Your fat reserves burn away safely, restoring athletic weight scales.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 20, looks: 15, happiness: 15, stress: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Combated metabolic slowing using intermittent fasting schedules.`);
        }
      },
      {
        choiceText: 'Accept your new soft middle, buying generous pleated linen trousers.',
        outcomeText: 'You wear elegant, loose fabrics. You feel highly relaxed, though your athletic stairs pacing slows.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, looks: -5, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Embraced a soft mature physique using relaxed elegant linen styles.`);
        }
      },
      {
        choiceText: 'Enroll in competitive cross-functional high-intensity fitness clubs.',
        outcomeText: 'You lift heavy sandbags at dawn. You burn the fat but suffer high-stress shoulder strains. Cost: nine hundred dollars.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 10, looks: 15, stress: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 900, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Undertook high-intensity functional cross-fit memberships (-$900).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_19',
    title: 'The Alcohol Limit 🍷',
    description: 'A single glass of white wine at dinner now generates severe grogginess and a pounding headache the next morning.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 28 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Transition to complete absolute sobriety, drinking sparking lime water.',
        outcomeText: 'Your sleep quality soars to historic peaks! Your morning focus is razor-sharp. Beautiful health leap.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 25, smarts: 20, stress: -20, happiness: 20 });
          s.log.push(`Age ${s.characterInfo.age}: Adopted absolute physical sobriety, clearing morning brain fatigue.`);
        }
      },
      {
        choiceText: 'Continue drinking standard cocktails to remain inside professional circles.',
        outcomeText: 'You participate in social toasts, but spend Sundays inside dark rooms with thick ice packs.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, stress: 15, happiness: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Continued social drinking despite severe metabolic hangover signals.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_20',
    title: 'The Caffeine Jolt ☕',
    description: 'Your continuous intake of four daily cold brews triggers severe night sleep barriers and floating cardiac flutters.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Taper caffeine down to a single cup of premium Japanese green tea daily.',
        outcomeText: 'After three days of severe withdrawal headaches, your nerves relax. You sleep like a tranquil baby.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 20, stress: -25, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Tapered caffeine to natural green tea leaves, solving chronic heart flutters.`);
        }
      },
      {
        choiceText: 'Maintain the coffee sprint to hit high coding milestones.',
        outcomeText: 'You score nice project points, but stay wide awake at 3:00 AM, looking extremely gray and dehydrated.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -20, looks: -10, stress: 30 });
          s.log.push(`Age ${s.characterInfo.age}: Maintained high energy caffeine schedules to secure corporate output quotas.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_21',
    title: 'The Zen Meditation Course 🧘‍♂️',
    description: 'An old colleague recommends a silent weekend Vipassana meditation academy to clear structural workplace stress.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Surrender your phone and sit in silence for forty-eight hours.',
        outcomeText: 'You observe your mental loops calmly. Chronic workplace stress vanishes, and you secure immaculate focus. Cost: six hundred dollars.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, smarts: 20, stress: -30, happiness: 25 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 600, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Attended intensive silent meditation retreats to reset neural pathways (-$600).`);
        }
      },
      {
        choiceText: 'Decline to sit, claiming you have too many spreadsheets to review.',
        outcomeText: 'The spreadsheets are completed. Your mind remains a humming, high-tension electrical cage.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 10, stress: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Avoided mindfulness courses to continue processing digital data piles.`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_22',
    title: 'The Cognitive Breakthrough 🧠',
    description: 'A recurring sense of career exhaustion prompts you to consider hiring a clinical therapist to review parent patterns.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Retain a high-end cognitive therapist for eight private sessions.',
        outcomeText: 'An exceptional investment! You dismantle toxic baseline perfectionist patterns, achieving durable happiness. Cost: twelve hundred dollars.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, stress: -30, happiness: 30 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1200, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Retained private cognitive psychologists to deconstruct stress behaviors (-$1,200).`);
        }
      },
      {
        choiceText: 'Buy popular self-help textbooks at local bookstores.',
        outcomeText: 'You read nice chapters before sleeping. It offers decent surface insights while keeping capital safe.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: -5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 40, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Read cognitive psychology literature to analyze executive panic patterns (-$40).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_23',
    title: 'The Frozen Joint Knees 🦴',
    description: 'Your morning runs are accompanied by a hot, sandpaper grinding pain behind your kneecaps, indicating cartilage wear.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 33 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Transition from asphalt running to swimming lanes and low-impact rowing.',
        outcomeText: 'The grinding knee pain vanishes completely. Lungs and joints are perfectly preserved.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 20, stress: -10, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Shifted cardiovascular exercise to zero-impact swimming pools, saving joints.`);
        }
      },
      {
        choiceText: 'Get high-viscosity hyaluronic acid injections into joint spaces.',
        outcomeText: 'The thick fluid lubricates the caps. You run without grinding pain for six months. Cost: fifteen hundred dollars.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, stress: -5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Received joint fluid injections to maintain asphalt running trails (-$1,500).`);
        }
      },
      {
        choiceText: 'Ignore the grinding sandpaper pain and complete a marathon.',
        outcomeText: 'The meniscus tears completely. You undergo emergency surgeries and suffer knee limitations.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -30, looks: -10, stress: 30, happiness: -20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 5500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Blew out mature knee joints by running through severe cartilage tearing warnings (-$5,500).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_24',
    title: 'The Forest Bath Reset 🌲',
    description: 'You feel a strong, quiet urge to spend your upcoming weekend in complete silent forest isolation with zero cell feeds.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Drive to deep redwood sanctuaries and walk in the humid moss silently.',
        outcomeText: 'Your blood pressure drops visibly. You return with clean lungs, a glowing face, and perfect calm.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 25, looks: 15, stress: -30, happiness: 25 });
          s.log.push(`Age ${s.characterInfo.age}: Conducted silent forest baths in redwoods to resets nervous systems.`);
        }
      },
      {
        choiceText: 'Ignore the woods, finishing six commercial data forecasts.',
        outcomeText: 'You score nice financial bonuses, but your head feels like a buzzing neon terminal.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: 20 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 1500, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Overrode natural decompression urges to process municipal data forecasts (+$1,500).`);
        }
      }
    ]
  },
  {
    id: 'mid_dp2_hea_25',
    title: 'The Vitamin D Warning ☀️',
    description: 'Blood labs register a critical Vitamin D level of nine due to years of working inside dimly-lit office tunnels.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 26 && age <= 45;
    },
    choices: [
      {
        choiceText: 'Take high-dose medical supplements and spend twenty minutes in morning sunshine.',
        outcomeText: 'Your immune systems and bone densities recover to perfect levels. Head foggy states vanish completely!',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 25, smarts: 15, stress: -15, happiness: 20 });
          s.log.push(`Age ${s.characterInfo.age}: Resolved severe clinical vitamin D holes using sunny walks and medical drops.`);
        }
      },
      {
        choiceText: 'Ignore the blood report, drinking artificial energy drinks.',
        outcomeText: 'Your joints ache continuously, and you suffer frequent cold infections from low immune defenses.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, stress: 15, happiness: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Neglected serious clinical bone vitamin deficits, suffering frequent winter colds.`);
        }
      }
    ]
  }
];

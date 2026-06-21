import { GameEvent, CharacterState } from '../../types';
import { adjustStats } from '../../utils';

interface MatureScenarioDef {
  id: string;
  title: string;
  description: string;
  conditionChecker?: (state: CharacterState) => boolean;
  choices: {
    text: string;
    outcomeText: string;
    adjustments: {
      happiness?: number;
      health?: number;
      smarts?: number;
      looks?: number;
      stress?: number;
      karma?: number;
      cash?: number;
    };
    logText: string;
  }[];
}

// 1. Mature Gated Career Scenarios (Gated Events)
const MATURE_GATED_EVENTS: MatureScenarioDef[] = [
  {
    id: 'mat_corp_01',
    title: 'Workplace: CEO Retirement Succession Plan 👔',
    description: 'The board demands you select a successor. A brilliant, humble junior vs. your golf buddy who represents deep investor portfolios.',
    conditionChecker: (state) => state.characterInfo?.currentOccupation === 'CEO of Tech Startup',
    choices: [
      {
        text: 'Select the humble, highly competent junior scientist.',
        outcomeText: 'The market applauds your superb meritocratic standards! The junior excels and remains deeply loyal to you.',
        adjustments: { happiness: 20, smarts: 15, karma: 25, stress: -10 },
        logText: 'You chose a brilliant junior engineer to succeed your CEO legacy.'
      },
      {
        text: 'Select your golf buddy to secure post-retirement boardroom deals.',
        outcomeText: 'You secure a $50,000 retirement bonus, but junior directors quit in protest, hurting your moral compass.',
        adjustments: { happiness: 10, cash: 50000, karma: -30, stress: 20 },
        logText: 'You appointed a well-connected golf buddy as CEO successor for private boardroom ties.'
      }
    ]
  },
  {
    id: 'mat_corp_02',
    title: 'Workplace: Landmark Lawsuit Defense ⚖️',
    description: 'A multi-state intellectual property lawsuit goes to final arguments. Your defense will define your corporate legal legacy.',
    conditionChecker: (state) => state.characterInfo?.currentOccupation === 'Corporate Attorney',
    choices: [
      {
        text: 'Spend 80 hours rewriting legal trial motions.',
        outcomeText: 'VICTORY! Your name is etched as a legal genius, but you suffer physical exhaustion and chest pains.',
        adjustments: { happiness: 30, smarts: 20, health: -15, stress: 30 },
        logText: 'You won a historic, landmark intellectual property trial through brutal overwork.'
      },
      {
        text: 'Delegate the courtroom speech to your associate.',
        outcomeText: 'You lose the case. Your firm takes a bruising, but you enjoyed reading books on the beach.',
        adjustments: { happiness: 5, health: 15, looks: 5, stress: -20 },
        logText: 'You delegated critical litigation arguments to junior associates.'
      }
    ]
  },
  {
    id: 'mat_med_01',
    title: 'Workplace: Medical Board Presidency 🎗️',
    description: 'You are nominated for President of the State Cosmetic Board. It requires extensive regulatory speaking.',
    conditionChecker: (state) => state.characterInfo?.currentOccupation === 'Plastic Surgeon',
    choices: [
      {
        text: 'Accept the nomination. Time to lead!',
        outcomeText: 'You won! You shape statewide surgery safety codes, earning stellar prestige.',
        adjustments: { happiness: 25, smarts: 20, stress: 25, karma: 20 },
        logText: 'You were elected President of the State Medical and Cosmetic Board.'
      },
      {
        text: 'Decline. You want to spend time at your ranch.',
        outcomeText: 'You enjoy peaceful horse feeding and simple mountain cabin stays.',
        adjustments: { happiness: 15, health: 15, stress: -20 },
        logText: 'You declined high-prestige medical board positions for personal country stays.'
      }
    ]
  },
  {
    id: 'mat_lab_01',
    title: 'Workplace: Master Plumber Trade Transition 🛠️',
    description: 'An physical back ache makes pipe hauling painful. You have the opportunity to buy out the local repair shop ($20,000) and hire juniors.',
    conditionChecker: (state) => state.characterInfo?.currentOccupation === 'Apprentice Plumber',
    choices: [
      {
        text: 'Pay $20,000 cash to transition into the shop owner.',
        outcomeText: 'You are now the boss! Juniors crawl into wet crawlspaces while you manage spreadsheets in your comfy leather chair.',
        adjustments: { happiness: 30, health: 15, stress: -15, cash: -20000 },
        logText: 'You bought out the plumbing repair shop, transitioning from worker to executive.'
      },
      {
        text: 'Ignore it and keep carrying cast-iron sewers.',
        outcomeText: 'Your bank balance stays high, but your lumbar discs scream in physical agony.',
        adjustments: { happiness: -15, health: -20, stress: 20 },
        logText: 'You chose physical labor exhaustion over trade management transfers.'
      }
    ]
  }
];

// Matrix templates for Mature Adulthood (Ages 45-64)
const MATURE_THEMES = [
  {
    category: "Retirement Portfolio & Legacy",
    nouns: ["private family trust deed", "precious gold bullion chest", "index-linked life annuity", "valuable vintage wine cellar", "diversified dividend-producing REIT"],
    under55: [
      { text: "Allocate a solid, conservative fraction of your wealth to acquire a [Noun].", log: "You conservative-hedged your wealth into a [Noun].", outcome: "Your overall treasury profile rises! You sleep in excellent long-term security.", adjust: { smarts: 15, cash: -1200, stress: -15, happiness: 10 } },
      { text: "Speculate aggressively, staking high values of cash on late-cycle trends in the [Noun].", log: "You speculatively leveraged funds near the [Noun].", outcome: "Severe market turbulence! Your advisors issue tense reports, though your pulse races with exciting adrenaline.", adjust: { cash: -5000, stress: 25, happiness: 15, looks: -5 } },
      { text: "Hire a long-time golf buddy to manage all legal folders regarding the [Noun].", log: "You hired a friendly acquaintance to oversee the [Noun].", outcome: "They overlook three minor clauses, forcing you to pay $2,000 in regulatory penalty stamps.", adjust: { cash: -2000, smarts: -5, stress: 15, karma: -10 } }
    ],
    over55: [
      { text: "Formally liquidate the [Noun], distributing early trust legacies to your children.", log: "You liquidated and shared the [Noun] with descendants.", outcome: "They wept in profound gratitude! Your family relationships are incredibly close, securing your historic name.", adjust: { karma: 30, happiness: 35, stress: -15 } },
      { text: "Encase the [Noun] in high-security offshore legal shells to minimize taxes.", log: "You legally shielded the [Noun] in offshore shells.", outcome: "An elite administrative structure holds your wealth safely. The tax auditors sigh in defeat.", adjust: { smarts: 20, cash: -4000, happiness: 15, stress: -10 } }
    ]
  },
  {
    category: "Empty Nest & Family Reunions",
    nouns: ["family dining oak table", "wedding rehearsal speech draft", "first grandchild's nursery cradle", "family genealogy photo album", "rustic lake house lease"],
    under55: [
      { text: "Fund a luxurious, fully-catered scenic mountain reunion near the [Noun].", log: "You sponsored a magnificent holiday around the [Noun].", outcome: "Wonderful bonding! The children Toast your generous, mature, and supportive parenting style.", adjust: { cash: -2500, happiness: 30, stress: -15, karma: 15 } },
      { text: "Politely demand that everyone pay their own fair share for events near the [Noun].", log: "You enforced financial independence on children near the [Noun].", outcome: "They mutter about your rigid check-books, though it successfully fosters adult self-reliance.", adjust: { smarts: 10, stress: 5, happiness: -5 } },
      { text: "Convert the empty bedrooms near the [Noun] into a massive custom recreation space.", log: "You redecorated empty domestic space around the [Noun].", outcome: "Highly quiet and comfortable! Your home office is a pure, silent sanctuary.", adjust: { cash: -800, happiness: 20, stress: -20 } }
    ],
    over55: [
      { text: "Dedicate massive personal hours caring and babysitting near the [Noun].", log: "You dedicated long hours supporting family around the [Noun].", outcome: "The toddler sleeps happily in your arms! You feel your legacy warming your soul.", adjust: { health: -10, happiness: 35, karma: 25, stress: 15 } },
      { text: "Send premium-quality toys and supplies for the [Noun] while reclaiming your retired silence.", log: "You balance-funded household needs for the [Noun] from a distance.", outcome: "They praise your superb, supportive generosity while you relax peacefully with reading books.", adjust: { cash: -1200, happiness: 20, stress: -20, karma: 15 } }
    ]
  },
  {
    category: "Anti-Aging & Cardiac Defense",
    nouns: ["daily blood pressure cuff", "advanced orthopedic sleep mattress", "prescription cholesterol bottle", "low-impact stationary exercise bike", "organic herbal green tea jar"],
    under55: [
      { text: "Observe a strict, zero-sodium plant menu while training with the [Noun].", log: "You maintained rigorous physiological health around the [Noun].", outcome: "Incredible vitals! Your resting pulse rate falls to elite athletic zones.", adjust: { health: 25, looks: 12, stress: -10, happiness: 15 } },
      { text: "Inhale unapproved anti-aging supplements paired with the [Noun] metrics.", log: "You consumed experimental cellular products for the [Noun].", outcome: "A strange rash breaks out on your throat, causing you to scratch furiously during meetings.", adjust: { health: -15, looks: -10, stress: 15 } },
      { text: "Work intense 80-hour executive weeks, tossing the [Noun] warnings aside.", log: "You ignored warnings of physiological fatigue around the [Noun].", outcome: "A sudden chest discomfort triggers an expensive ambulance route. A grave warning of mortality.", adjust: { health: -30, cash: -3000, stress: 35, happiness: -20 } }
    ],
    over55: [
      { text: "Enroll in an active senior hiking and water aerobics circuit near the [Noun].", log: "You joined active senior wellness classes near the [Noun].", outcome: "Your leg joints feel like oil-slicked gears! You carry pristine posture and glowing stamina.", adjust: { health: 20, looks: 10, stress: -15, happiness: 20 } },
      { text: "Purchase a luxury therapeutic custom infrared sauna compartment for the [Noun].", log: "You acquired luxurious thermal detox systems near the [Noun].", outcome: "Extreme, cozy therapy! Golden light melts decades of spinal tension in peaceful, quiet loops.", adjust: { cash: -4500, health: 15, stress: -25, happiness: 25 } }
    ]
  },
  {
    category: "Corporate Executive Duties",
    nouns: ["prestigious corner office leather chair", "annual professional keynote presentation", "junior trainee's performance evaluation", "confidential corporate boardroom folder", "charity gala speech notes"],
    under55: [
      { text: "Spend long, patient hours mentoring young interns around the [Noun].", log: "You invested patient mentoring hours near the [Noun].", outcome: "They praise your incredible wisdom. Your reputation as an elegant industry leader is rock-solid.", adjust: { smarts: 15, karma: 20, stress: 10, happiness: 15 } },
      { text: "Enforce aggressive, rigid territory controls to lock competitor advancement near the [Noun].", log: "You prioritized fierce corporate turf defense near the [Noun].", outcome: "You secure your rare executive rank, but associates look at you with cold, shivering fear.", adjust: { looks: 5, karma: -30, stress: 20, happiness: 10 } },
      { text: "Delegate all complex details of the [Noun] to pursue mid-day premium golf lessons.", log: "You delegated administrative details of the [Noun] for recreation.", outcome: "You relax under sunny fairways, though colleagues note your slipping focus with quiet whispers.", adjust: { health: 8, stress: -15, smarts: -10 } }
    ],
    over55: [
      { text: "Negotiate a luxurious part-time advisory contract linked to the [Noun].", log: "You secured a low-stress advisory contract with the [Noun].", outcome: "VICTORY! You make fine money while returning home early to enjoy cozy afternoon tea.", adjust: { cash: 12000, stress: -25, happiness: 25, smarts: 15 } },
      { text: "Demand complete administrative obedience and work 14-hour days near the [Noun].", log: "You worked competitive corporate hours near the [Noun].", outcome: "Your bank balances swell, but your physical stamina is totally exhausted, causing minor shivers.", adjust: { cash: 25000, health: -18, stress: 30, happiness: -10 } }
    ]
  },
  {
    category: "Hobby Crafting & Creation",
    nouns: ["brass-trimmed woodcarving workbench", "vintage leather-bound journal", "collector-edition acoustic cello", "professional digital canvas easel", "hand-stitched scenic tapestry loom"],
    under55: [
      { text: "Devote continuous weekend hours to crafting handmade assets with the [Noun].", log: "You crafted exquisite, refined items using the [Noun].", outcome: "Masterpiece production! A local artistic registry displays your design with elite credits.", adjust: { happiness: 30, smarts: 15, looks: 10, stress: -15 } },
      { text: "Buy premium, highly expensive professional gears for the [Noun] but let them sit in dust.", log: "You spent heavily on unutilized accessories for the [Noun].", outcome: "The gorgeous wooden parts look shiny, though they serve purely as expensive garage decoration.", adjust: { cash: -2400, happiness: 5, stress: 5 } },
      { text: "Host a delightful, free weekend tutorial class centered around the [Noun].", log: "You hosted civic amateur tutorials in the workshop using the [Noun].", outcome: "Warm smiles! The community adores your generous spirit and gifts you high-quality cookies.", adjust: { karma: 25, happiness: 25, stress: -10 } }
    ],
    over55: [
      { text: "Construct a professional custom climate-controlled studio for the [Noun].", log: "You built an exquisite soundproof studio for the [Noun].", outcome: "Absolute creative shelter! You escape domestic noise in custom, perfect sonic insulation.", adjust: { cash: -12000, happiness: 35, stress: -20 } },
      { text: "Spend thousands importing original raw teakwood and premium accessories for the [Noun].", log: "You imported fine raw assets to optimize the [Noun].", outcome: "Stellar performance! The raw material smells superb, elevating your creations into heirloom art.", adjust: { cash: -5000, looks: 15, happiness: 20 } }
    ]
  },
  {
    category: "Suburban Estate Maintenance",
    nouns: ["automated lawn sprinkler controller", "rare Japanese maple tree sapling", "backyard stone fire pit terrace", "solar panel roof array", "deluxe bird feeding pole"],
    under55: [
      { text: "Perform the heavy digging and soil work around the [Noun] manually.", log: "You completed intensive manual estate labor around the [Noun].", outcome: "Sweat pours downs, but your core abdominal strength feels legendary! Your estate looks beautiful.", adjust: { health: 18, looks: 10, cash: -150, stress: 10 } },
      { text: "Hire senior licensed landscape professionals to execute designs around the [Noun].", log: "You contracted professional service firms for the [Noun].", outcome: "Flawless, gorgeous result! Neighbors pause to click photos of your lush, high-contrast gardens.", adjust: { cash: -3500, stress: -20, happiness: 15 } },
      { text: "Pour generic gray industrial asphalt slabs over the lawn to eliminate the [Noun] work.", log: "You concrete-covered garden areas to bypass the [Noun] care.", outcome: "Mowing is officially over, but your neighbors groan loudly at the brutalist suburban gray slab.", adjust: { karma: -20, looks: -10, cash: -600, stress: -15 } }
    ],
    over55: [
      { text: "Exhibit your finished garden spaces with the [Noun] in local botanical contests.", log: "You exhibited organic estate achievements featuring the [Noun].", outcome: "You win first-place gold! Real estate guides praise your immaculate, high-value visual taste.", adjust: { looks: 20, happiness: 25, stress: -10 } },
      { text: "Engage in furious, legalistic squabbles with city clerks over the [Noun] boundary limits.", log: "You initiated neighborhood legal disputes regarding the [Noun].", outcome: "A tense stand-off at city halls! You defend your boundaries, but your blood pressure is red.", adjust: { stress: 25, karma: -15, happiness: -15 } }
    ]
  },
  {
    category: "Adventure & Leisure Tours",
    nouns: ["panoramic Mediterranean cruise ticket", "luxurious leather luggage set", "high-altitude mountain hiking pole", "cozy scenic train compartment ride", "private coastal cabin contract"],
    under55: [
      { text: "Take an extensive sabbatical to explore beautiful historic libraries with the [Noun].", log: "You took academic travel sabbaticals using the [Noun].", outcome: "Your minds expand beautifully! You write detailed diaries and feel deeply cultured and quiet.", adjust: { smarts: 25, cash: -3000, stress: -20, happiness: 20 } },
      { text: "Enroll in high-strain, extreme wilderness survival camps holding the [Noun].", log: "You completed extreme wilderness physical camps near the [Noun].", outcome: "You freeze in severe rainstorms and tear your calf muscle climbing granite blocks. Exhilarating but painful.", adjust: { health: -15, smarts: 10, stress: 15, happiness: 15 } },
      { text: "Stay home and study ancient navigation books instead of utilizing the [Noun].", log: "You stayed home to study navigation papers, saving the [Noun].", outcome: "Superb, low-cost wisdom! You spend zero dollars and master the global stars with tea.", adjust: { smarts: 18, stress: -15, happiness: 10 } }
    ],
    over55: [
      { text: "Rent a fabulous private villa on the Italian coast, fully utilizing the [Noun].", log: "You booked fabulous coastal Italian villas featuring the [Noun].", outcome: "Heavenly vibes! You watch azure tides crash under green olive trees, sipping rich wine.", adjust: { cash: -8000, happiness: 35, health: 12, looks: 15, stress: -30 } },
      { text: "Embark on an elite around-the-world cruise using a premium penthouse with the [Noun].", log: "You booked a premium global cruise suite using the [Noun].", outcome: "Absolute royalty treatment! The captain personally feeds you caviar, though your bank balances drop.", adjust: { cash: -15000, happiness: 40, looks: 10, stress: -25 } }
    ]
  },
  {
    category: "Locomotor & Joint Support",
    nouns: ["comforting heated knee wrap", "ergonomic rolling desk chair", "organic ginger health syrup bottle", "highly cushioned walking sneakers", "soothing mineral bath salts"],
    under55: [
      { text: "Switch entire physical routines to gentle, low-impact swimming paired with the [Noun].", log: "You adapted physical routines to gentle swimming with the [Noun].", outcome: "Your spine and joints feel fully decompressed! You stand tall and move like an athlete.", adjust: { health: 22, looks: 12, stress: -15, happiness: 20 } },
      { text: "Force through brutal, heavy physical squats ignoring the [Noun] warnings.", log: "You strained weak knee joints ignoring the [Noun] warnings.", outcome: "A loud POP sounds in your left knee. You tear your cartilage, requiring walking crutches.", adjust: { health: -25, looks: -5, stress: 20, cash: -1500 } },
      { text: "Schedule routine luxury restorative therapeutic massages using the [Noun].", log: "You booked restorative physiological massage routes near the [Noun].", outcome: "Delightful relief! Your muscles feel soft, releasing decades of corporate office tension.", adjust: { cash: -600, health: 15, stress: -25, happiness: 25 } }
    ],
    over55: [
      { text: "Redecorate your entire living space with luxurious orthopedic seating featuring the [Noun].", log: "You furnished your estate with ergonomic cushions near the [Noun].", outcome: "Premium absolute comfort! You watch movies with zero lumbar fatigue, feeling extremely comfy.", adjust: { cash: -3500, health: 12, stress: -20, happiness: 20 } },
      { text: "Sit on cozy heating pads and delegate all heavy laundry lifting and tasks near the [Noun].", log: "You delegated domestic lifting to junior family near the [Noun].", outcome: "You rest your joints in pure, cozy lazy luxury, while the grandkids get a great chore workout.", adjust: { health: 10, stress: -15, happiness: 15, karma: 10 } }
    ]
  },
  {
    category: "Civic & Local Leadership",
    nouns: ["local charity fundraising registry", "neighborhood watch community radio", "town hall ballot proposal", "historic district renovation plan", "municipal library directory"],
    under55: [
      { text: "Volunteer detailed hours to manage senior community programs around the [Noun].", log: "You volunteered organizational leadership for the [Noun].", outcome: "The city honors your superb, generous civic spirit with a public brass medal of appreciation.", adjust: { karma: 25, smarts: 12, stress: 10, happiness: 20 } },
      { text: "Ignore all local district meetings to play complex computer simulation games near the [Noun].", log: "You ignored town meetings to enjoy deep digital PC strategy near the [Noun].", outcome: "You conquer hypothetical empires in cool dark rooms, though local park grounds continue decaying.", adjust: { smarts: 15, karma: -15, stress: -15 } },
      { text: "Coordinate a strict neighborhood safety patrol using the [Noun] network.", log: "You structured local watch patrols using the [Noun].", outcome: "Local crime rates plummet! Parents praise your proactive stewardship of suburban corridors.", adjust: { karma: 20, smarts: 10, stress: 15, happiness: 15 } }
    ],
    over55: [
      { text: "Launch a high-stakes campaign for the local city council seat linked to the [Noun].", log: "You ran campaigns for regional council seats using the [Noun].", outcome: "VICTORY! You won the election! You now write municipal code, wielding superb local influence.", adjust: { smarts: 20, looks: 15, stress: 25, happiness: 25 } },
      { text: "Fund a glorious public wall mural celebrating history near the [Noun] corridor.", log: "You financed historic community art corridor projects near the [Noun].", outcome: "Beautiful watercolor arrays! The entire neighborhood gathers to toast your majestic artistic patronage.", adjust: { cash: -4000, looks: 15, karma: 25, happiness: 25 } }
    ]
  },
  {
    category: "Household Smart Technology",
    nouns: ["hands-free voice command hub", "smart biometric health band", "ultra-high-definition smart television screen", "high-capacity home backup generator", "digital asset vault security key"],
    under55: [
      { text: "Configure a unified cloud security hub integrating your household and the [Noun].", log: "You synchronized smart household tech around the [Noun].", outcome: "Absolute technical safety! You monitor all locks and circuits from your pocket screen with ease.", adjust: { smarts: 18, cash: -600, stress: -12, happiness: 15 } },
      { text: "Ditch modern electronics, tossing the [Noun] in the trash to live like a pioneer.", log: "You abandoned modern household devices, discarding the [Noun].", outcome: "Quiet, romantic candlelit evenings! However, typing documents on old rusty metal typewriters is exhausting.", adjust: { smarts: -5, stress: 15, happiness: 10, health: -5 } },
      { text: "Set up bulletproof encrypted offline hardware backups for the [Noun] details.", log: "You set up offline encrypted archives for the [Noun].", outcome: "Excellent technical shielding! Your records are fully fortified against global modern web hacks.", adjust: { smarts: 20, cash: -300, stress: -10 } }
    ],
    over55: [
      { text: "Equip your entire estate with premium voice-activation panels paired with the [Noun].", log: "You automated your estate via voice controls near the [Noun].", outcome: "You whisper to the drywall, and organic tea is heated. Visitors believe you reside in a spaceship.", adjust: { cash: -2500, happiness: 22, stress: -15 } },
      { text: "Scream in deep suspicious frustration, treating the [Noun] with profound contempt.", log: "You violently rejected smart tech devices near the [Noun].", outcome: "In your heated anger, you accidentally strike your thumb, causing a minor throbbing bruise.", adjust: { health: -5, stress: 20, happiness: -15, smarts: -8 } }
    ]
  }
];

const MATURE_SITUATIONS = [
  { desc: "An unexpected legacy question arises as you contemplate how to allocate the [Noun].", titlePrefix: "Legacy Dilemma over the" },
  { desc: "Your physiological energy takes a sudden dip, forcing you to reconsider your physical connection to the [Noun].", titlePrefix: "Energy Crisis with the" },
  { desc: "Your family holds a serious holiday dinner discussion regarding who will inherit the [Noun] someday.", titlePrefix: "Inheritance Dispute over the" },
  { desc: "A late-career industry development forces you to make a final administrative stand over the [Noun].", titlePrefix: "Late-Career Clash over the" },
  { desc: "Your partner urges you to put down your stressful corporate work and focus on the quiet enjoyment of the [Noun].", titlePrefix: "Retirement Push and the" },
  { desc: "A strict regional suburban guild demands you explain your aesthetic choices regarding the [Noun] at a town hall meeting.", titlePrefix: "Town Hall Debate on the" },
  { desc: "A rare opportunity to acquire or upgrade the [Noun] presents itself, promising exceptional prestige.", titlePrefix: "Prestige Search for the" },
  { desc: "Your demanding late-career duties trigger acute physical exhaustion, prompting a deep, quiet look at the [Noun].", titlePrefix: "Midnight Burnout and the" },
  { desc: "An old lifelong friend calls out of the blue, inviting you onto a nostalgic journey revolving around the [Noun].", titlePrefix: "Nostalgic Voyage around the" },
  { desc: "A sudden financial audit or legal query requires you to account for all ledger records concerning the [Noun].", titlePrefix: "Audit Warning about the" }
];

interface GeneratedMatureScenarioDef {
  id: string;
  title: string;
  description: string;
  minAge: number;
  maxAge: number;
  choices: {
    text: string;
    outcomeText: string;
    adjustments: {
      happiness?: number;
      health?: number;
      smarts?: number;
      looks?: number;
      stress?: number;
      karma?: number;
      cash?: number;
    };
    logText: string;
  }[];
}

const generateAllMatureScenarios = (): GeneratedMatureScenarioDef[] => {
  const result: GeneratedMatureScenarioDef[] = [];
  let generatedCount = 0;

  // 10 themes * 5 nouns * 10 situations = 500 unique permutations!
  for (let t = 0; t < MATURE_THEMES.length; t++) {
    const theme = MATURE_THEMES[t];
    for (let n = 0; n < theme.nouns.length; n++) {
      const noun = theme.nouns[n];
      for (let s = 0; s < MATURE_SITUATIONS.length; s++) {
        const sit = MATURE_SITUATIONS[s];

        const scenarioId = `mature_gen_${t}_n${n}_s${s}`;
        const uppercaseNoun = noun.charAt(0).toUpperCase() + noun.slice(1);
        const title = `${sit.titlePrefix} ${uppercaseNoun} 👓`;
        const description = `${sit.desc.replace(/\[Noun\]/g, noun)} Real mature life requires wisdom and careful stewardship of resources.`;

        // Age division: even indices target 45-54 (under 55), odd indices target 55-64 (over 55)
        const isUnder55 = (generatedCount % 2 === 0);
        const minAge = isUnder55 ? 45 : 55;
        const maxAge = isUnder55 ? 54 : 64;

        // Build choices based on age range mapping
        const choices = theme.under55.map(u => ({
          text: u.text.replace(/\[Noun\]/g, noun),
          outcomeText: u.outcome.replace(/\[Noun\]/g, noun),
          adjustments: u.adjust,
          logText: u.log.replace(/\[Noun\]/g, noun)
        }));

        // Add over-55 choices if appropriate
        if (!isUnder55) {
          theme.over55.forEach(o => {
            choices.push({
              text: o.text.replace(/\[Noun\]/g, noun),
              outcomeText: o.outcome.replace(/\[Noun\]/g, noun),
              adjustments: o.adjust,
              logText: o.log.replace(/\[Noun\]/g, noun)
            });
          });
        }

        result.push({
          id: scenarioId,
          title,
          description,
          minAge,
          maxAge,
          choices
        });

        generatedCount++;
      }
    }
  }

  return result;
};

// Map career gated events
const rawGatedEvents: GameEvent[] = MATURE_GATED_EVENTS.map(evt => {
  return {
    id: evt.id,
    title: evt.title,
    description: evt.description,
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isRightAge = age >= 45 && age <= 64;
      if (!isRightAge) return false;
      if (evt.conditionChecker) {
        return evt.conditionChecker(state);
      }
      return true;
    },
    choices: evt.choices.map(c => ({
      choiceText: c.text,
      outcomeText: c.outcomeText,
      effect: (state: CharacterState) => {
        adjustStats(state, c.adjustments);
        if (c.adjustments.cash) {
          state.finances.cashBalance = Math.max(state.finances.cashBalance + c.adjustments.cash, -500000);
        }
        state.log.push(`Age ${state.characterInfo.age}: ${c.logText}`);
      }
    }))
  };
});

// Map generated events
const generatedScenarios = generateAllMatureScenarios();

const rawGeneratedEvents: GameEvent[] = generatedScenarios.map(evt => {
  return {
    id: evt.id,
    title: evt.title,
    description: evt.description,
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      if (age === undefined) return false;
      return age >= evt.minAge && age <= evt.maxAge;
    },
    choices: evt.choices.map(c => ({
      choiceText: c.text,
      outcomeText: c.outcomeText,
      effect: (state: CharacterState) => {
        adjustStats(state, c.adjustments);
        if (c.adjustments.cash) {
          state.finances.cashBalance = Math.max(state.finances.cashBalance + c.adjustments.cash, -500000);
        }
        state.log.push(`Age ${state.characterInfo.age}: ${c.logText}`);
      }
    }))
  };
});

export const adulthoodMatureEvents: GameEvent[] = [
  ...rawGatedEvents,
  ...rawGeneratedEvents
];

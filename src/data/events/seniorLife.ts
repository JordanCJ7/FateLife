import { GameEvent, CharacterState, NPC, Disease } from '../../types';
import { adjustStats, MALE_FIRST_NAMES, FEMALE_FIRST_NAMES } from '../../utils';

interface SeniorScenarioDef {
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
    customEffect?: (state: CharacterState) => void;
  }[];
}

const HANDCRAFTED_SENIOR_EVENTS: SeniorScenarioDef[] = [
  {
    id: 'senior_retirement_choice',
    title: 'The Golden Handshake 💼',
    description: 'The executive committee sits you down. They slide a box of biscuits and a legal release form over: "It\'s been a majestic run, but perhaps it\'s time to step down, hand the keys to the youth, and enjoy your pension."',
    conditionChecker: (state) => state.characterInfo.age >= 62 && state.characterInfo.currentOccupation !== 'Retired' && state.characterInfo.currentOccupation !== 'None',
    choices: [
      {
        text: 'Sign the papers, accept retirement, and collect your honorary plaque.',
        outcomeText: 'You retire gracefully! They hand you a retirement payout of $50,000 cash. Your daily schedule is suddenly blank.',
        adjustments: { happiness: 30, stress: -30, cash: 50000 },
        customEffect: (state) => {
          state.characterInfo.currentOccupation = 'Retired';
          state.finances.annualSalary = 0;
          state.log.push(`Age ${state.characterInfo.age}: You gracefully retired from the workforce with a golden handshake payout.`);
        }
      },
      {
        text: 'Nonsense! Loudly declare you will work until your lungs collapse.',
        outcomeText: 'You refuse to step down! The department sighs, and ambitious junior managers start leaving cold, passive-aggressive memos in your cubicle.',
        adjustments: { happiness: -10, stress: 35, karma: -10, smarts: 5 }
      }
    ]
  },
  {
    id: 'senior_grandchild_birth',
    title: 'A Bundle of Legacy 👶',
    description: 'You receive an urgent midnight phone call. Your grown child is weeping with ecstatic joy from the delivery suite: "You are a grandparent! Come see them!"',
    conditionChecker: (state) => state.characterInfo.age >= 61 && state.relationships.some(n => n.relationshipType === 'Child' && !n.isDead && n.age >= 18),
    choices: [
      {
        text: 'Rush to the hospital holding a warm, hand-knit baby blanket.',
        outcomeText: 'You cradle the tiny new infant. A beautiful grandchild is added to your family! You feel a profound sense of temporal continuation.',
        adjustments: { happiness: 35, karma: 30, stress: -10 },
        customEffect: (state) => {
          const isBoy = Math.random() < 0.5;
          const list = isBoy ? MALE_FIRST_NAMES : FEMALE_FIRST_NAMES;
          const chosenFirstName = list[Math.floor(Math.random() * list.length)];
          const lastName = state.characterInfo?.lastName || 'Smith';
          
          const newGrandchild: NPC = {
            id: `grandchild-${Math.random()}`,
            name: `${chosenFirstName} ${lastName}`,
            relationshipType: 'Child', // Map to available type but note in log
            relationshipValue: 100,
            generosity: 40 + Math.floor(Math.random() * 30),
            money: 0,
            isDead: false,
            age: 0
          };
          state.relationships.push(newGrandchild);
          state.log.push(`Age ${state.characterInfo.age}: Your family expanded! You welcomed a beautiful grandchild named ${newGrandchild.name} (age 0).`);
        }
      },
      {
        text: 'Congratulate them over the phone and stay asleep.',
        outcomeText: 'Your child is deeply hurt by your clinical detachment, though your sleep registers as uninterrupted.',
        adjustments: { happiness: -5, karma: -20, health: 5 },
        customEffect: (state) => {
          state.relationships.forEach(npc => {
            if (npc.relationshipType === 'Child') {
              npc.relationshipValue = Math.max(0, npc.relationshipValue - 25);
            }
          });
          state.log.push(`Age ${state.characterInfo.age}: You declined visiting the hospital for your newly born grandchild, straining family love.`);
        }
      }
    ]
  },
  {
    id: 'senior_will_testament',
    title: 'The Will & Testament 📜',
    description: 'An expensive notary wearing thin spectacles asks how you wish to direct your accumulated assets and cash pools in your ultimate Will.',
    conditionChecker: (state) => state.characterInfo.age >= 70,
    choices: [
      {
        text: 'Leave everything strictly to your family members and kids.',
        outcomeText: 'Your children are deeply touched by your financial devotion. Warm loyalty bonds form instantly across the family tree.',
        adjustments: { happiness: 20, karma: 20, stress: -10 },
        customEffect: (state) => {
          state.relationships.forEach(npc => {
            if (npc.relationshipType === 'Child' || npc.relationshipType === 'Partner') {
              npc.relationshipValue = Math.min(100, npc.relationshipValue + 20);
            }
          });
          state.log.push(`Age ${state.characterInfo.age}: You formally drafted your Will, leaving your estate to your immediate family.`);
        }
      },
      {
        text: 'Amend the papers to leave your entire estate to the "Happy Paws Cat Sanctuary"!',
        outcomeText: 'You assign all assets to the rescue felines! The notary gasps. You commit an immediate $25,000 trust deposit to validate it. Family members are absolutely shocked.',
        adjustments: { happiness: 25, karma: 50, cash: -25000, stress: 15 },
        customEffect: (state) => {
          state.relationships.forEach(npc => {
            if (npc.relationshipType === 'Child' || npc.relationshipType === 'Partner') {
              npc.relationshipValue = Math.max(0, npc.relationshipValue - 40);
            }
          });
          state.log.push(`Age ${state.characterInfo.age}: You updated your Will, disinheriting your relatives in favor of the local rescue cat sanctuary trust fund (-$25,000).`);
        }
      },
      {
        text: 'Decline to make a Will. Let the government deal with state litigation.',
        outcomeText: 'You walk away from the office. Why plan for a world you aren\'t in? You pocket the notary fee.',
        adjustments: { happiness: -5, karma: -15, smarts: -10 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: You refused to write a Will, creating future probate legal nightmares for your heirs.`);
        }
      }
    ]
  },
  {
    id: 'senior_dance_hip_fracture',
    title: 'The Family Dance-Off 🕺',
    description: 'At a cousin\'s wedding dinner, a vintage rock song erupts from the sound system. Young relatives cheer: "Show us your signature retro dance moves!"',
    choices: [
      {
        text: 'Perform a wild, high-speed back-spin and knee crash combo!',
        outcomeText: 'CRACK! A blinding flash of agony shoots up your thigh. You fractured your hip! You are rushed to emergency surgery, costing you $8,000 in surgical and rehabilitation fees.',
        adjustments: { happiness: -30, health: -35, looks: -15, cash: -8000, stress: 30 },
        customEffect: (state) => {
          const brokenHip: Disease = {
            id: `disease-hip-${Math.random()}`,
            name: 'Broken Hip',
            type: 'Chronic',
            healthDrainPerYear: 8,
            happinessDrainPerYear: 4,
            cureDifficulty: 'Hard'
          };
          state.diseases.push(brokenHip);
          state.log.push(`Age ${state.characterInfo.age}: You broke your hip attempting high-risk dance moves, landing in long-term surgical care.`);
        }
      },
      {
        text: 'Nod your head gracefully, clapping rhythmically from your chair.',
        outcomeText: 'You sip your hot herbal tea safely. Your skeletal structure remains perfectly pristine and unbroken.',
        adjustments: { happiness: 10, health: 5, stress: -10 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: You stayed seated during a wedding dance request, saving your fragile skeletal system.`);
        }
      }
    ]
  },
  {
    id: 'senior_lost_car',
    title: 'The Parking Lot Amnesia 🚗',
    description: 'You emerge from a sprawling superstore carrying two heavy bags of garden soil, but the endless concrete parking lot looks completely foreign. Where on Earth is your financed sedan?',
    choices: [
      {
        text: 'Wander aimlessly for three hours clicking the key fob alarm.',
        outcomeText: 'You eventually locate it inside sector Z of the upper deck! You are drenched in sweat, exhausted, and your knees are incredibly sore.',
        adjustments: { happiness: -15, health: -10, stress: 25 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: You spent hours searching for your parked vehicle in a parking lot, suffering high fatigue.`);
        }
      },
      {
        text: 'Admit defeat and pay a parking attendant $50 to drive you around.',
        outcomeText: 'The attendant spots your car in two minutes. Quick, painless, but your pride is slightly bruised.',
        adjustments: { happiness: 10, cash: -50, smarts: 10, stress: -10 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: You hired a local parking lot escort to locate your car.`);
        }
      }
    ]
  },
  {
    id: 'senior_discount_dispute',
    title: 'The Great Cup of Soup Outrage 🥣',
    description: 'You are ordering a warm, chunky potato soup at the local diner. The receipt lists: $4.99. You realize they didn\'t apply your 10% Senior Discount!',
    choices: [
      {
        text: 'Launch an intensive lecture on municipal inflation and consumer rights.',
        outcomeText: 'You yell at the teenager cashier until they cry, saving exactly 49 cents! You feel a massive surge of petty victory, though your karma takes a hit.',
        adjustments: { happiness: 15, cash: 0.49, karma: -20, stress: 15 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: You made a massive scene at diner registers over a 50-cent senior coupon discrepancy.`);
        }
      },
      {
        text: 'Smile, pay the full price, and tip them some cozy silver dollars.',
        outcomeText: 'The cashier is incredibly grateful. Your heart feels amazingly light and warm. Real class.',
        adjustments: { happiness: 20, karma: 25, cash: -5, stress: -10 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: You showed elegant grace at the registers, waving off senior discount claims.`);
        }
      }
    ]
  },
  {
    id: 'senior_chronic_illness',
    title: 'The Heart Health Scare 🩺',
    description: 'A morning checkup reveals highly elevated, pounding arterial valve metrics. The doctor looks at your chart with gravity: "Your cardiovascular system requires immediate, expensive therapeutic monitoring."',
    choices: [
      {
        text: 'Pay $10,000 for advanced medical therapy packages.',
        outcomeText: 'Your health stabilized nicely! They prescribe complex, regular pills, lowering your future stress but saving your life.',
        adjustments: { happiness: 10, health: 25, cash: -10000, stress: -5 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: You purchased premium cardiac therapeutic packages to stabilize physical health.`);
        }
      },
      {
        text: 'Reject their expensive clinics and try natural elderberries.',
        outcomeText: 'Your blood pressure remains extremely volatile. You develop a Chronic Cardiovascular disease, which drains your life yearly.',
        adjustments: { happiness: -20, health: -30, smarts: -15, stress: 30 },
        customEffect: (state) => {
          const heartDisease: Disease = {
            id: `disease-cardio-${Math.random()}`,
            name: 'Cardiovascular Issues',
            type: 'Chronic',
            healthDrainPerYear: 12,
            happinessDrainPerYear: 5,
            cureDifficulty: 'Incurable'
          };
          state.diseases.push(heartDisease);
          state.log.push(`Age ${state.characterInfo.age}: You bypassed clinical heart monitoring, developing Chronic Cardiovascular Issues.`);
        }
      }
    ]
  },
  {
    id: 'senior_grandson_jail_scam',
    title: 'The Late Night Trapped Scam 📞',
    description: 'Your telephone rings at 2:00 AM. A crackly voice cries: "Grandpa! It\'s me! I am trapped in a foreign jail after a terrible car crash, don\'t tell mom! Please wire $3,000 in electronic gift cards immediately to buy my bail!"',
    choices: [
      {
        text: 'Panic! Rush to the store and gift card buy $3,000 immediately.',
        outcomeText: 'You wired the codes! Weeks later, you realize your actual relatives are safe in their beds. You were hit by a classic phone scam.',
        adjustments: { happiness: -25, smarts: -20, cash: -3000, stress: 35, karma: 5 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: You fell victim to a predatory senior telephone bail scam, losing $3,000.`);
        }
      },
      {
        text: 'Ask the caller to state their middle name and tell them to crawl away.',
        outcomeText: 'The line goes instantly silent! You smile at your razor-sharp cognitive logic and return to a sweet sleep.',
        adjustments: { happiness: 20, smarts: 20, stress: -10, karma: 10 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: You brilliantly dismantled a senior telephone scam with sharp cognitive verification.`);
        }
      }
    ]
  }
];

// Matrix templates for Golden Years (Senior Life, Ages 61+)
const SENIOR_THEMES = [
  {
    category: "Suburban Estate Heritage",
    nouns: ["antique grandfather clock", "secured wall safe combination", "estate deed ledger", "custom cherry-wood lockbox", "family heirloom silver tea set"],
    under75: [
      { text: "Carefully inventory and organize the [Noun] in an archive folder.", log: "You cataloged and appraised the [Noun] carefully.", outcome: "You find a rare certification slip, securing a high-value validation! Your treasury looks clean.", adjust: { smarts: 15, stress: -10, happiness: 10 } },
      { text: "Gift the [Noun] to your closest child or relative immediately.", log: "You gifted the [Noun] to a loved family member.", outcome: "They weep in profound gratitude! Golden family memories and deep ties are locked.", adjust: { karma: 22, happiness: 25, stress: -15 } },
      { text: "Sell the [Noun] at a cheap local garage sale to clear house clutter.", log: "You sold off the [Noun] at a cheap yard sale.", outcome: "Your living area is wonderfully clean and empty, though your heirs mutter about losing historical relics.", adjust: { cash: 150, happiness: 15, stress: -10, karma: -5 } }
    ],
    over75: [
      { text: "Hire an elite historical preservationist to polish the [Noun].", log: "You preserved the [Noun] with professional care.", outcome: "Amazing craft! It glitters under elegant parlor lights, showing rich prestige to all guests.", adjust: { cash: -800, happiness: 20, looks: 10 } },
      { text: "Scream in frustration, kicking the [Noun] repeatedly during a cleaning fit.", log: "You violently attacked the [Noun] in a moment of physical rage.", outcome: "Ouch! You severely stub your toe, causing a heavy throbbing ache that makes walking difficult.", adjust: { health: -10, stress: 25, happiness: -15, smarts: -8 } }
    ]
  },
  {
    category: "Grandchildren & Storytelling",
    nouns: ["vintage wooden rocking cradle", "gilded classic fairy-tale board book", "miniature iron steam train set", "backyard cherry-tree tire swing", "first school tuition saving book"],
    under75: [
      { text: "Spend continuous creative hours reading and playing near the [Noun] with patience.", log: "You dedicated warm, patient time to grandchildren near the [Noun].", outcome: "Their eyes gleam in absolute adoration! You feel a majestic, deep sense of generational continuation.", adjust: { karma: 25, happiness: 30, health: 5, stress: -12 } },
      { text: "Finance high-end educational supplies and premium upgrades for the [Noun].", log: "You financed advanced resources and upgrades for the [Noun].", outcome: "They excel in early tests! Your pride swells, though the bills drain your cash balances.", adjust: { cash: -1500, smarts: 15, happiness: 15 } },
      { text: "Decline to supervise activities, letting your relatives manage the [Noun] instead.", log: "You opted out of baby-sitting details to secure your reading hours.", outcome: "You enjoy perfect, uninterrupted silence with rich herbal tea, but family relations cool down slightly.", adjust: { happiness: 10, stress: -15, karma: -10 } }
    ],
    over75: [
      { text: "Gather the youngsters around the [Noun] to relate authentic historical tales from your youth.", log: "You told captivating historical stories near the [Noun].", outcome: "They listen in breathless silence, committing your wisdom to their hearts. Beautiful legacy.", adjust: { smarts: 18, happiness: 25, karma: 15 } },
      { text: "Struggle with the physical lifting required near the [Noun] and ask for assistance.", log: "You requested family aid to handle weights near the [Noun].", outcome: "Your children rush to assist you with deep tenderness. You feel immensely protected and loved.", adjust: { health: 10, stress: -15, happiness: 20 } }
    ]
  },
  {
    category: "Cardiac & Longevity Defense",
    nouns: ["highly cushioned orthopedic walking shoes", "flashing electronic blood pressure cuff", "smart automated blue pill dispenser", "organic raw herbal ginseng vial", "air-conditioned stationary gym pedal"],
    under75: [
      { text: "Maintain a strict, organic plant menu while practicing with the [Noun].", log: "You practiced pristine cardiovascular health utilizing the [Noun] regularly.", outcome: "The heart specialists are stunned! Your resting pulse rates drop to elite levels of wellness.", adjust: { health: 25, looks: 12, stress: -15, happiness: 15 } },
      { text: "Ditch the boring [Noun] and feast on high-fat salt pork and sweet desserts.", log: "You skipped health tracking and spent days feasting.", outcome: "Absolutely delicious! Your mouth is happy, but you feel heavy, sluggish, and suffer sudden dizzy spells.", adjust: { health: -15, looks: -8, happiness: 18, stress: 10, smarts: -5 } },
      { text: "Schedule routine physical checks and therapy using the [Noun] metrics.", log: "You utilized structured, clinical check-ups near the [Noun].", outcome: "They discover and rectify a minor arterial bottleneck early, securing deep structural longevity.", adjust: { cash: -800, health: 18, smarts: 15, stress: -10 } }
    ],
    over75: [
      { text: "Sit peacefully, enjoying gentle breathing exercises with the [Noun] humming near.", log: "You practiced restorative breathing rhythms with the [Noun].", outcome: "Your vital statistics stabilize beautifully. A pleasant, cloudless warmth settles in your chest.", adjust: { health: 15, stress: -20, happiness: 20 } },
      { text: "Acquire a luxurious infrared thermal saunabox paired with the [Noun].", log: "You bought high-end thermal recovery saunas to support the [Noun].", outcome: "Incredible absolute relief! Years of stubborn arthritis in your wrists dissolve in warm steam loops.", adjust: { cash: -3500, health: 12, happiness: 25, stress: -25 } }
    ]
  },
  {
    category: "Civic Guilds & Neighborhoods",
    nouns: ["shiny plastic gold-star bingo stamper", "local botanical garden pruning shears", "brass-rimmed magnifying reading glasses", "morning mall-walker tournament emblem", "local history library archive folder"],
    under75: [
      { text: "Volunteer long, meticulous hours cataloging files and folders containing the [Noun].", log: "You cataloged local archives and supported civic work with the [Noun].", outcome: "The city leaders award you a beautiful civic medal! Your reputation in the district is pristine.", adjust: { karma: 25, smarts: 15, stress: 10, happiness: 20 } },
      { text: "Host a delightful, warm high-tea gathering centered around the [Noun].", log: "You hosted a warm community tea gathering around the [Noun].", outcome: "Laughter fills the parlor! Neighbors swap delicious gossip and form strong, close alliances.", adjust: { cash: -250, happiness: 25, karma: 15, stress: -10 } },
      { text: "Decline to join, calling the community organizer a pompous bureaucrat near the [Noun].", log: "You publicly denounced community details regarding the [Noun].", outcome: "They write you warning letters, though your stubborn independence remains fully uncompromised.", adjust: { stress: 15, karma: -15, happiness: 10 } }
    ],
    over75: [
      { text: "Campaign aggressively to win the presidency over the [Noun] committee.", log: "You ran campaign operations to command the committee. You won!", outcome: "You are elected President! You enforce elegant standards with supreme, elder authority.", adjust: { looks: 15, smarts: 18, stress: 20, happiness: 25 } },
      { text: "Fund a glorious community watercolor mural depicting the history of the [Noun].", log: "You funded public fine art installations for the [Noun].", outcome: "Stunning colors! The local press terms you a majestic, noble patron of civic beauty.", adjust: { cash: -3000, looks: 12, karma: 25, happiness: 20 } }
    ]
  },
  {
    category: "Hobby Crafting & Creation",
    nouns: ["brass-trimmed woodcarving workbench", "hand-stitched scenic tapestry loom", "collector-edition acoustic classical cello", "professional studio oil-painting easel", "miniature cedar evergreen bonsai tray"],
    under75: [
      { text: "Devote deep, quiet weekend hours to crafting fine details with the [Noun].", log: "You crafted stunning, meticulous designs with the [Noun].", outcome: "Masterpiece production! A regional art guild displays your creative achievement with high credits.", adjust: { happiness: 30, smarts: 18, looks: 10, stress: -15 } },
      { text: "Buy highly expensive professional gears for the [Noun] but let them sit in dust.", log: "You purchased top-tier gear for the [Noun] but ignored it.", outcome: "The polished parts look incredibly pretty, but they gather gray cobwebs in empty closets.", adjust: { cash: -1200, happiness: 5, stress: 5 } },
      { text: "Host a free, delightful amateur tutorial course centered on the [Noun].", log: "You held free community workshops using the [Noun].", outcome: "Grateful smiles! The neighborhood loves your cozy instruction and brings you hot cherry hand-pies.", adjust: { karma: 25, happiness: 25, stress: -10 } }
    ],
    over75: [
      { text: "Build a beautiful custom soundproof greenhouse cabinet for the [Noun].", log: "You built an exquisite studio cabinet for the [Noun].", outcome: "Your private cozy sanctuary! You escape all household noises and worries in deep serenity.", adjust: { cash: -6000, happiness: 35, stress: -20 } },
      { text: "Import original antique supplies from Tokyo to perfect your [Noun] hobby.", log: "You imported authentic components to optimize the [Noun].", outcome: "Unrivaled premium quality! The fragrant woods and fibers elevate your hobby into true heirloom art.", adjust: { cash: -2500, looks: 15, happiness: 20 } }
    ]
  },
  {
    category: "Smart Assist Tech & Warmth",
    nouns: ["ambient soothing white-noise machine", "voice-activated induction tea kettle", "dual-backup heavy thermal generator", "thick memory-foam vibrating recliner", "heated vibration lavender neck wrap"],
    under75: [
      { text: "Configure a clean, unified smart cloud hub to synchronize the [Noun] controls.", log: "You optimized automated homestead controls near the [Noun].", outcome: "Total modern peace! You control drafts, lights, and heat with simple voice rules from your seat.", adjust: { smarts: 18, cash: -400, stress: -15, happiness: 15 } },
      { text: "Smash the complicated [Noun] with a wrench, declaring modern tech is from space.", log: "You violently discarded smart device modules near the [Noun].", outcome: "You return to cold drafty kerosene lantern fires, which feels highly retro, but your eyes strain.", adjust: { smarts: -8, stress: 15, health: -5, happiness: 10 } },
      { text: "Set up bulletproof encrypted offline hardware backups for the [Noun] settings.", log: "You established secure offline backups for the [Noun] system.", outcome: "Flawless tech safety! No global remote server hacks can disturb your climate cozy settings.", adjust: { smarts: 20, cash: -200, stress: -10 } }
    ],
    over75: [
      { text: "Install voice-activated panels across your entire estate to control the [Noun].", log: "You fully voice-automated your estate around the [Noun].", outcome: "You whisper to the dynamic drywall, and cozy blankets are heated. Neighbors think it is magic.", adjust: { cash: -1500, happiness: 22, stress: -15 } },
      { text: "Sit peacefully with cozy heat settings on, letting the [Noun] hum in quiet loops.", log: "You rested in pure, quiet luxury with the [Noun].", outcome: "Your absolute quiet retreat! Your back tension is entirely resolved in warm massage waves.", adjust: { health: 12, stress: -20, happiness: 25 } }
    ]
  },
  {
    category: "Scenic Travel & Journeys",
    nouns: ["panoramic Mediterranean riverboat ticket", "luxury leather luggage monogram set", "sturdy heavy-varnish hiking pole", "cozy scenic train compartment sleeper", "historic seaside cottage lease"],
    under75: [
      { text: "Invest months traveling to beautiful ancient historical archives using the [Noun].", log: "You embarked on quiet historical travel quests using the [Noun].", outcome: "Your mind expands beautifully! You keep detailed watercolor diaries, feeling highly cultured.", adjust: { smarts: 25, cash: -3000, stress: -20, happiness: 20 } },
      { text: "Sign up for high-risk, freezing glacier survival expeditions carrying the [Noun].", log: "You enrolled in extreme physical survival treks holding the [Noun].", outcome: "You fracture your shin in sudden ice cracks. It is thrilling, but you spend $5,000 on casting fees.", adjust: { health: -18, smarts: 10, cash: -5000, stress: 15, happiness: 15 } },
      { text: "Stay cozy at home, memorizing world terrain books instead of utilizing the [Noun].", log: "You stayed warm at home, saving your expenses on the [Noun].", outcome: "Zero cost, high wisdom! You master the global maps sipping fresh lavender tea.", adjust: { smarts: 18, stress: -15, happiness: 12 } }
    ],
    over75: [
      { text: "Rent a luxurious, private shoreline estate in Venice, fully utilizing the [Noun].", log: "You booked private coastal retreats in Italy using the [Noun].", outcome: "Pure paradise! You watch clear azure waves kiss olive trees under warm golden sunsets.", adjust: { cash: -6000, happiness: 35, health: 10, looks: 12, stress: -25 } },
      { text: "Embark on an elite around-the-world penthouse cruise utilizing the [Noun].", log: "You booked a premium global penthouse cruise using the [Noun].", outcome: "Imperial service! The crew serves fresh pastries daily, putting you at the absolute peak of elite comfort.", adjust: { cash: -12000, happiness: 40, looks: 10, stress: -20 } }
    ]
  },
  {
    category: "Companion Care & Domesticity",
    nouns: ["furred senior rescue tabby bowl", "backyard active wild birdfeeder", "robotic quiet tile-cleaner dock", "weatherproof porch rocking chair", "creaky screen door latch"],
    under75: [
      { text: "Meticulously care for and manage the needs of your home near the [Noun] daily.", log: "You handled domestic details around the [Noun] with high discipline.", outcome: "Everything is spotless! Your floors are gleaming, and local robins chirp merrily in your windows.", adjust: { health: 12, looks: 8, cash: -100, stress: -10, happiness: 15 } },
      { text: "Neglect your home maintenance, letting the [Noun] settings gather grease.", log: "You deferred domestic duties around the [Noun] for lazy rest.", outcome: "Dust bunnies unite! You step on a misplaced screw in dark rooms, cutting your heel.", adjust: { health: -10, stress: 15, happiness: -10, smarts: -5 } },
      { text: "Adopt a quiet, elegant rescue companion animal to sit near the [Noun] with you.", log: "You brought home a gentle rescue pet to cuddle near the [Noun].", outcome: "A warm, soft purring heap curls up on your chest. Your loneliness completely vanishes.", adjust: { happiness: 30, karma: 20, cash: -200, stress: -15 } }
    ],
    over75: [
      { text: "Upkeep a spectacular sanctuary of floral arrangements near the [Noun] porch.", log: "You cultivated botanical displays around the [Noun].", outcome: "A garden masterwork! Neighbors slow down their cars to stare, completely in awe of your design taste.", adjust: { looks: 20, happiness: 25, stress: -10 } },
      { text: "Engage in loud, stubborn cane-shaking at delivery scooters passing the [Noun] deck.", log: "You aggressively yelled at street delivery scooters near the [Noun].", outcome: "They laugh and drive off faster, but your chest is highly agitated and your throat feels raspy.", adjust: { stress: 25, karma: -15, happiness: -10 } }
    ]
  },
  {
    category: "Civic Legacy & Memoirs",
    nouns: ["handwritten historical memoir manuscript", "regional heritage preservation ballot draft", "municipal museum founding deed", "post-retirement educational foundation fund", "neighborhood watch volunteer manual"],
    under75: [
      { text: "Dedicate decades of rigorous scholar research to drafting files under the [Noun].", log: "You researched and published files under the [Noun].", outcome: "Your work is bound in fine navy leather! National academic departments cite your research.", adjust: { smarts: 25, cash: -500, stress: 12, happiness: 20 } },
      { text: "Fabricate wild, outrageous stories in your logs regarding the [Noun] to confuse future heirs.", log: "You wrote fictitious tall tales under the [Noun] for historical chaos.", outcome: "You claim your ancestor was a high-priest of ancient Atlantis. Hilarious, but lawyers sigh.", adjust: { happiness: 25, smarts: -10, karma: -15 } },
      { text: "Organize cooperative local archives preserving reports of the [Noun].", log: "You organized citizen heritage archives centered on the [Noun].", outcome: "Young students gather in cozy libraries, thanking you for protecting local district culture.", adjust: { karma: 25, smarts: 15, stress: -10, happiness: 20 } }
    ],
    over75: [
      { text: "Donate a substantial portion of your capital to establish a public [Noun] library wing.", log: "You financially endowed public archive wings for the [Noun].", outcome: "They carve your name in high-contrast solid marble letters at the main gates! Absolute historic status.", adjust: { cash: -15000, looks: 20, karma: 30, happiness: 30 } },
      { text: "Burn your complicated logs around the [Noun] in an evening porch bonfire.", log: "You burned your historical folders on the porch.", outcome: "Smoke enters the living room, causing you to cough. Your records are forever lost to ashes.", adjust: { health: -8, smarts: -12, stress: 15, happiness: -10 } }
    ]
  },
  {
    category: "Restorative Joint Therapies",
    nouns: ["deep thermal massage hydrotank pass", "organic wintergreen muscle plaster roll", "soothing mineral epsom salt tub", "low-impact aquatic aerobics pass", "custom ergonomic support slippers"],
    under75: [
      { text: "Transition your exercise routines to low-impact swimming using the [Noun].", log: "You adapted health exercises to gentle aquatics using the [Noun].", outcome: "Your spinal columns decompress completely! You walk tall with the grace of high-tier wellness.", adjust: { health: 22, looks: 12, stress: -15, happiness: 18 } },
      { text: "Push through demanding heavy-weight gym squatting, ignoring [Noun] warnings.", log: "You strained weak knee joints, bypassing the [Noun] safety limits.", outcome: "Ouch! Your back muscles seize up in acute spasms. You spend the weekend shivering under ice packs.", adjust: { health: -20, looks: -5, stress: 20, cash: -1200 } },
      { text: "Retain a master physical therapeutist to design routines around the [Noun].", log: "You hired customized recovery planners focusing on the [Noun].", outcome: "They correct your spinal imbalances with elite expertise. You feel vibrant and healthy.", adjust: { cash: -800, health: 18, stress: -10, happiness: 15 } }
    ],
    over75: [
      { text: "Install high-end customized orthopedic furniture featuring the [Noun] properties.", log: "You furnished your homestead with custom joint supports matching the [Noun].", outcome: "Absolute majestic cozy warmth! You watch late-night movies in supreme, painless relaxation.", adjust: { cash: -3000, health: 15, stress: -20, happiness: 20 } },
      { text: "Rest on hot heating pads and delegate physical laundry and heavy tasks near the [Noun].", log: "You delegated domestic workloads to juniors near the [Noun].", outcome: "You rest your knee caps in quiet leisure, while your active descendants enjoy a solid chore routine.", adjust: { health: 12, stress: -15, happiness: 15, karma: 10 } }
    ]
  }
];

const SENIOR_SITUATIONS = [
  { desc: "A high-stakes neighborhood emergency disrupts your daily routine involving your [Noun].", titlePrefix: "Crisis of the" },
  { desc: "A serious question of heritage and legacy prompts you to verify how to allocate the [Noun].", titlePrefix: "Legacy Issue with the" },
  { desc: "Your family hosts a tense holiday discussion over who will eventually inherit your cherished [Noun].", titlePrefix: "Inheritance Debate over the" },
  { desc: "An unexpected physical challenge forces you to reconsider how you interact with the [Noun].", titlePrefix: "Late-Life Challenge over the" },
  { desc: "Your trusted private therapist recommends dedicating quiet hours to enjoying the comfort of the [Noun].", titlePrefix: "Peaceful Resolve and the" },
  { desc: "A local historical society official asks you to document the authentic, mature history of the [Noun] for archives.", titlePrefix: "Historic Review of the" },
  { desc: "A highly polished, premium upgrade catalog arrives, presenting stellar options for the [Noun].", titlePrefix: "Comfort Upgrade for the" },
  { desc: "A quiet, sleepless night prompts a deep, emotional evaluation of what the [Noun] represents in your life.", titlePrefix: "Midnight Contemplation on the" },
  { desc: "An old childhood friend shares a vintage postcard, triggering a profound desire to reconnect with the [Noun].", titlePrefix: "Nostalgic Return to the" },
  { desc: "A meticulous regulatory tax or civil assessment requires you to verify all ledger records concerning the [Noun].", titlePrefix: "Treasury Audit on the" }
];

interface GeneratedSeniorScenarioDef {
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

const generateAllSeniorScenarios = (): GeneratedSeniorScenarioDef[] => {
  const result: GeneratedSeniorScenarioDef[] = [];
  let generatedCount = 0;

  // 10 themes * 5 nouns * 10 situations = 500 unique permutations!
  for (let t = 0; t < SENIOR_THEMES.length; t++) {
    const theme = SENIOR_THEMES[t];
    for (let n = 0; n < theme.nouns.length; n++) {
      const noun = theme.nouns[n];
      for (let s = 0; s < SENIOR_SITUATIONS.length; s++) {
        const sit = SENIOR_SITUATIONS[s];

        const scenarioId = `senior_gen_${t}_n${n}_s${s}`;
        const uppercaseNoun = noun.charAt(0).toUpperCase() + noun.slice(1);
        const title = `${sit.titlePrefix} ${uppercaseNoun} 👵`;
        const description = `${sit.desc.replace(/\[Noun\]/g, noun)} Age brings unparalleled elegance and seasoned wisdom.`;

        // Age division: even generated indices target early senior (61-75), odd target late senior (76-120)
        const isUnder75 = (generatedCount % 2 === 0);
        const minAge = isUnder75 ? 61 : 76;
        const maxAge = isUnder75 ? 75 : 120;

        // Build choices based on age range mapping
        const choices = theme.under75.map(u => ({
          text: u.text.replace(/\[Noun\]/g, noun),
          outcomeText: u.outcome.replace(/\[Noun\]/g, noun),
          adjustments: u.adjust,
          logText: u.log.replace(/\[Noun\]/g, noun)
        }));

        // Add over-75 choices if appropriate
        if (!isUnder75) {
          theme.over75.forEach(o => {
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

// Map handcrafted events
const rawHandcraftedEvents: GameEvent[] = HANDCRAFTED_SENIOR_EVENTS.map(evt => {
  return {
    id: evt.id,
    title: evt.title,
    description: evt.description,
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isRightAge = age >= 61;
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
        if (c.customEffect) {
          c.customEffect(state);
        } else {
          const shortTitle = evt.title.replace(/🎒|⚡|🤫|🏫|🧩|🏡|👵|👓|🎓|🏫|⏳|🚲|🔮|✨|❤️|🧠|😊|📊/g, '').trim();
          state.log.push(`Age ${state.characterInfo.age}: You resolved the ${shortTitle} situation.`);
        }
      }
    }))
  };
});

// Map generated events
const generatedScenarios = generateAllSeniorScenarios();

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

export const seniorLifeEvents: GameEvent[] = [
  ...rawHandcraftedEvents,
  ...rawGeneratedEvents
];

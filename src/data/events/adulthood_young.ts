import { GameEvent, CharacterState, Disease } from '../../types';
import { adjustStats } from '../../utils';

interface YoungScenarioDef {
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
    customEffect?: (state: CharacterState) => void;
  }[];
}

// 1. Hand-crafted crucial young adulthood milestones (Ages 18-25)
const YOUNG_HANDCRAFTED: YoungScenarioDef[] = [
  {
    id: 'young_college_decision',
    title: 'The Crossroads of Higher Ed 📚',
    description: 'You stand before the grand wooden doors of the registrar\'s office. The brochures boast state-of-the-art labs and networking clubs, but the tuition bill looms like a dark, thunderous cloud. High-paying potential vs. debt-free freedom.',
    minAge: 18,
    maxAge: 19,
    choices: [
      {
        text: 'Enroll in the elite university with high-interest loans.',
        outcomeText: 'You sign the massive finance forms with a shaking hand. You gain deep analytical smarts, but a cold shadow of student debt settles in your stomach.',
        adjustments: { happiness: 10, smarts: 25, looks: 5, stress: 20, cash: -12000 },
        customEffect: (state) => {
          if (state.education) {
            state.education.currentStage = 'University';
            state.education.highestDegreeEarned = 'Undergraduate Degree';
          }
          state.log.push(`Age ${state.characterInfo.age}: Enrolled in a top-tier private university, incurring substantial debt.`);
        }
      },
      {
        text: 'Go to the local community college and work part-time.',
        outcomeText: 'You spend your nights studying on of-the-mill desks and your days flipping burgers. It is exhausting, but your finances remain perfectly healthy.',
        adjustments: { happiness: -10, health: -5, smarts: 15, stress: 15, cash: -1500 },
        customEffect: (state) => {
          if (state.education) {
            state.education.currentStage = 'University';
            state.education.highestDegreeEarned = 'Undergraduate Degree';
          }
          state.log.push(`Age ${state.characterInfo.age}: Attended community college debt-free while maintaining a local job.`);
        }
      },
      {
        text: 'Skip college entirely and launch a risky tech startup in your garage.',
        outcomeText: 'You burn the midnight oil coding and writing pitches. The stress is dizzying, but you feel like a futuristic renegade.',
        adjustments: { happiness: 20, health: -15, smarts: 20, stress: 30, cash: -2000 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: Skipped higher education to bootstrap a garage tech startup.`);
        }
      },
      {
        text: 'Take a gap year backpacking through scenic mountain forests.',
        outcomeText: 'You sleep in cheap hostels and breathe pure, clean oxygen. Your soul expands, your karma peaks, but you learn absolutely nothing useful for a career.',
        adjustments: { happiness: 35, health: 15, smarts: -5, looks: 10, karma: 15, cash: -3000 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: Embarked on a scenic gap-year backpacking trip to find yourself.`);
        }
      }
    ]
  },
  {
    id: 'young_flat_share',
    title: 'The Flat Share Audition 🏠',
    description: 'You are interviewing for an open bedroom in a shared flat. The current residents look like neo-hippie artists who burn lavender sage and talk continuously about cosmic sound-baths.',
    minAge: 18,
    maxAge: 25,
    choices: [
      {
        text: 'Smile, nod, and pretend you love throat-singing.',
        outcomeText: 'You got the room! It is exceptionally cheap, but the constant aroma of strong patchouli oil and sitar practice spikes your sleep stress.',
        adjustments: { happiness: 15, stress: 15, looks: -5, cash: 1200 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: Moved into a bohemian flat-share, trading quiet nights for cheap rent.`);
        }
      },
      {
        text: 'Insist on rigorous cleaning charts and silent-hour protocols.',
        outcomeText: 'They stare at you as if you are a corporate lawyer and instantly block your number. You have to rent a much costlier single studio instead.',
        adjustments: { happiness: -15, smarts: 10, stress: 5, cash: -1800 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: Got rejected by free-spirited house sharers for being overly strict.`);
        }
      },
      {
        text: 'Bring a premium artisanal vegan treat as a calculated bribe.',
        outcomeText: 'They devour the pastry, weeping with culinary joy. You secure the master bedroom with absolute ease! Dynamic negotiation.',
        adjustments: { happiness: 25, looks: 5, smarts: 15, karma: 8, cash: -50 }
      }
    ]
  },
  {
    id: 'young_first_car',
    title: 'The Used Car Gambler 🚗',
    description: 'A suspicious mechanic named "Honest Stan" is offering a rusty, lemon-yellow hatchback for $1,200. "Engine rattles slightly," Stan mutters, "but it builds character!"',
    minAge: 18,
    maxAge: 22,
    choices: [
      {
        text: 'Pay the cash and drive off with high hopes.',
        outcomeText: 'The car works beautifully for exactly three miles, then explodes in a spectacular cloud of thick blue smoke. Stan refuses your calls.',
        adjustments: { happiness: -20, health: -5, stress: 25, cash: -1200 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: Bought a lemon vehicle from a sketchy mechanic, losing cash immediately.`);
        }
      },
      {
        text: 'Demand a comprehensive third-party inspection before paying.',
        outcomeText: 'The inspection reveals that the brake lines are held together by cheap adhesive tape. You walk away, dodging a massive metal disaster.',
        adjustments: { smarts: 20, stress: -10, karma: 5 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: Intelligently dodged a dangerous used-car trap through safety reviews.`);
        }
      },
      {
        text: 'Negotiate the price down to a hilarious $400 by highlighting defects.',
        outcomeText: 'Using expert, sharp verbal jabs, you wear Stan down. He surrenders the keys for $400. It rattles, but it rolls!',
        adjustments: { happiness: 20, smarts: 15, looks: 5, stress: 10, cash: -400 },
        customEffect: (state) => {
          state.characterInfo.hasLicense = true; // Ensures they have transport
          state.log.push(`Age ${state.characterInfo.age}: Masterfully haggled Stan down to secure a cheap, functioning starter car.`);
        }
      }
    ]
  },
  {
    id: 'young_dating_app',
    title: 'Swipe, Swipe, Match 📱',
    description: 'You downloadable a modern dating app. After polishing your profile with flattering lighting and an interesting bio, you match with a charming local amateur barista.',
    minAge: 19,
    maxAge: 25,
    choices: [
      {
        text: 'Invite them to a highly sophisticated museum exhibition.',
        outcomeText: 'They are deeply fascinated by your artistic commentary. You hold hands near a vintage Renaissance painting. A sweet romance blossoms!',
        adjustments: { happiness: 30, looks: 10, smarts: 15, stress: -15, cash: -60 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: Started seeing a sweet barista who loves highbrow art galleries.`);
        }
      },
      {
        text: 'Send a chaotic, late-night text containing terrible frog memes.',
        outcomeText: 'They reply with "???" and block you instantly. You spend your evening looking at pictures of lilypads in lonely silence.',
        adjustments: { happiness: -10, smarts: -5, looks: -5, stress: 10 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: Ruined a promising online dating match with unhinged amphibian jokes.`);
        }
      },
      {
        text: 'Go to a trendy underground electronic synth-wave nightclub.',
        outcomeText: 'You dance hard under purple neon strobes. The bass vibrates your spine, but you lose your expensive sunglasses and get ringing ears.',
        adjustments: { happiness: 20, health: -10, looks: 12, cash: -120, stress: 15 }
      }
    ]
  },
  {
    id: 'young_job_corporate_hustle',
    title: 'The First Real Interview 👔',
    description: 'You are squeezed into a stiff, itchy suit sitting opposite a panel of unblinking corporate recruiters. "Tell us," the center VP asks, "where do you see yourself in five fiscal cycles?"',
    minAge: 21,
    maxAge: 25,
    choices: [
      {
        text: 'Deliver a flawlessly rehearsed, sycophantic speech about company synergy.',
        outcomeText: 'They love the buzzwords! You secure an entry-level Analyst position earning an impressive $48,000 salary.',
        adjustments: { happiness: 15, looks: 5, smarts: 15, stress: 25 },
        customEffect: (state) => {
          state.characterInfo.currentOccupation = 'Junior Corporate Analyst';
          state.finances.annualSalary = 48000;
          state.log.push(`Age ${state.characterInfo.age}: Passed the corporate panel, securing a full-time office analyst role.`);
        }
      },
      {
        text: 'Answer with raw, unfiltered philosophical honesty about life goals.',
        outcomeText: 'The VP squints and says, "We prefer team players, not poets." You are led out of the building with zero job offers.',
        adjustments: { happiness: -10, smarts: 10, karma: 15, stress: 10 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: Failed a corporate job interview due to excessive candid philosophy.`);
        }
      },
      {
        text: 'Perform a spontaneous, high-energy magic card trick.',
        outcomeText: 'They are completely stunned! The hiring manager laughs and offers you a unique Marketing Associate job at a comfortable $42,000.',
        adjustments: { happiness: 25, looks: 15, karma: 5, stress: -5 },
        customEffect: (state) => {
          state.characterInfo.currentOccupation = 'Creative Marketing Associate';
          state.finances.annualSalary = 42000;
          state.log.push(`Age ${state.characterInfo.age}: Used sleight of hand to charm recruiters into a marketing career.`);
        }
      }
    ]
  }
];

// 2. Programmatic generation matrix for 500 young adulthood scenarios
const YOUNG_THEMES = [
  {
    category: "Career & Tech",
    nouns: ["freelance coding gig", "ai-powered spreadsheet portal", "local coffee roasting manual", "cloud database schema key", "corporate presentation deck"],
    under21: [
      { text: "Pull a coffee-drenched all-nighter to optimize the [Noun].", log: "You ground out details on the [Noun].", outcome: "You worked until sunrise. Your smarts jumped, but you look like a walking zombie.", adjust: { smarts: 15, health: -8, happiness: -5, stress: 18 } },
      { text: "Outsource the [Noun] preparation to your clever friend.", log: "You split the work of your [Noun] project.", outcome: "You paid them half your savings, but got beautiful ratings and high praised status.", adjust: { smarts: -5, cash: -150, karma: -8, happiness: 12 } },
      { text: "Politely demand a detailed training extension for the [Noun].", log: "You negotiated extra time for the [Noun].", outcome: "The supervisor was impressed by your thorough professionalism. Stress avoided!", adjust: { smarts: 10, stress: -10, karma: 10 } }
    ],
    over21: [
      { text: "Automate the entire [Noun] with a clever Python script.", log: "You automated the [Noun] workflow.", outcome: "You finished in six minutes, spending the rest of your shift playing virtual darts.", adjust: { smarts: 20, stress: -15, happiness: 20 } },
      { text: "Bribe the server clerk to approve your [Noun] without inspection.", log: "You took a shortcut with the [Noun].", outcome: "Disaster! They reported you, and you were formal reprimanded. Major stress.", adjust: { karma: -22, stress: 28, happiness: -15 } }
    ]
  },
  {
    category: "Financial Hurdles",
    nouns: ["mysterious tax penalty notice", "predatory local credit card bill", "apartment damage security deposit", "shared restaurant dinner invoice", "overpriced car maintenance bill"],
    under21: [
      { text: "Pay off the [Noun] immediately using emergency piggybank cash.", log: "You paid the [Noun] in full.", outcome: "Your pockets are flat empty, but your structural score rises and stress vanishes.", adjust: { cash: -250, stress: -12, karma: 12, happiness: 5 } },
      { text: "Ignore the [Noun] and mail back a letter claiming you moved to Paris.", log: "You attempt to flee from the [Noun].", outcome: "They found your phone number instantly, piling on late penalties! What a mess.", adjust: { karma: -20, cash: -400, stress: 25, happiness: -10 } },
      { text: "Negotiate a dynamic payment installment plan for the [Noun].", log: "You negotiated the [Noun] payment terms.", outcome: "They agreed! You pay small portions monthly. Financial maturity unlocked.", adjust: { smarts: 15, stress: -8, karma: 5 } }
    ],
    over21: [
      { text: "Hire a sleazy budget accountant to find loopholes in the [Noun].", log: "You exploited legal loopholes on the [Noun].", outcome: "The loophole worked! You saved hundreds, though your conscience feels gray.", adjust: { cash: 350, karma: -15, smarts: 12, stress: 10 } },
      { text: "Drown your worries about the [Noun] at the local sports tavern.", log: "You drank to forget about the [Noun].", outcome: "You had eight heavy stout beers. The [Noun] is still there, and now your head throbs.", adjust: { health: -15, happiness: 10, stress: 20, cash: -80 } }
    ]
  },
  {
    category: "Urban Housing",
    nouns: ["cluttered communal kitchen pantry", "dripping bathroom shower pipe", "unsecured package delivery box", "neighbors loud subwoofer stereo", "creaking metal radiator heater"],
    under21: [
      { text: "Repair the broken [Noun] yourself using a cheap pocket multi-tool.", log: "You attempted a DIY fix on the [Noun].", outcome: "You scraped your palm, but the item is solid! You feel like a proud, handy craftsman.", adjust: { health: -2, smarts: 14, happiness: 10, stress: -5 } },
      { text: "Write an extremely aggressive, capitalized note about the [Noun].", log: "You posted an angry note concerning the [Noun].", outcome: "The neighbors threw the note in the gutter and turned up the volume. Petty failure.", adjust: { happiness: -8, karma: -10, stress: 15 } },
      { text: "Politely discuss the [Noun] in person with baked cookie plates.", log: "You solved a building issue near the [Noun] with sugar.", outcome: "They apologized warmly, turned the device down, and shared a nice chat.", adjust: { happiness: 18, karma: 15, stress: -12 } }
    ],
    over21: [
      { text: "File an official municipal noise complaint about the [Noun].", log: "You brought inspectors in regarding the [Noun].", outcome: "The landlord fined the tenants! Real justice, although the stairs are tense now.", adjust: { smarts: 10, karma: 5, stress: 18 } },
      { text: "Smash the [Noun] with your boots under absolute cover of darkness.", log: "You took covert vigilante action on the [Noun].", outcome: "Total silence restored! But you check over your shoulder every morning.", adjust: { karma: -30, stress: 22, happiness: 15 } }
    ]
  },
  {
    category: "Nights Out",
    nouns: ["shakily poured triple-shot tequila", "glowing neon nightclub dance floor", "greasy 4 AM kebab wrapper", "karaoke machine microphone stick", "pricey VIP table leather booth"],
    under21: [
      { text: "Stick to clean zero-sugar carbonated mineral water near the [Noun].", log: "You stayed non-alcoholic at the [Noun].", outcome: "You are the designated driver! You keep your friends alive and wake up pure.", adjust: { health: 18, stress: -10, karma: 18, looks: 5 } },
      { text: "Sneak a forbidden taste of the [Noun] under a fake identity.", log: "You snuck underage access to the [Noun].", outcome: "The bouncer dragged you out by your collar! You are banned from the block.", adjust: { happiness: -15, looks: -12, stress: 24, karma: -10 } },
      { text: "Challenger the crowd to a dynamic dance contest near the [Noun].", log: "You dance-battled near the [Noun].", outcome: "You nailed a backflip! Complete legends. Everyone is chanting your username.", adjust: { looks: 18, happiness: 25, stress: -5 } }
    ],
    over21: [
      { text: "Buy an expensive round of premium mixtures at the [Noun] area.", log: "You treated the table near the [Noun].", outcome: "Your wallet weeps, but your social status soars as the crew cheers you on.", adjust: { cash: -180, looks: 12, happiness: 20 } },
      { text: "Drink the [Noun] in one giant gulped dare to show dominance.", log: "You chugged the [Noun] in a single breath.", outcome: "You threw up on your clean trousers. You look tragic and your organs hurt.", adjust: { health: -22, looks: -15, happiness: -10, stress: 20, karma: -5 } }
    ]
  },
  {
    category: "Higher Education",
    nouns: ["ancient library dust leather volume", "prestigious biology lab microscope", "group project communication channel", "professor’s office hour feedback sheet", "congested campus coffee queue line"],
    under21: [
      { text: "Pore over the dense [Noun] text with deep investigative hunger.", log: "You studied the [Noun] with absolute precision.", outcome: "You found vital clues. Your intellectual levels surge; you ace the mid-terms.", adjust: { smarts: 18, stress: 10, happiness: 10 } },
      { text: "Write dynamic satirical jokes on the back of the [Noun].", log: "You graffitied comedy onto the [Noun] setup.", outcome: "Classmates find it hilarious, but the academic monitor issues a final warning.", adjust: { happiness: 15, karma: -12, looks: 5, stress: 8 } },
      { text: "Volunteer to manage the [Noun] workload to help struggling classmates.", log: "You supported others with the [Noun] study.", outcome: "You made lifelong study friends and the teacher writes you a glowing reference.", adjust: { karma: 20, smarts: 12, stress: -5, happiness: 15 } }
    ],
    over21: [
      { text: "Pay an online offshore researcher to ghost-author your [Noun] project.", log: "You academic-cheated on the [Noun].", outcome: "The papers pass with flying colors. You feel lazy, but you enjoyed 40 hours of gaming.", adjust: { smarts: -15, cash: -220, karma: -25, stress: -10 } },
      { text: "Argue aggressively with the dean regarding the [Noun] parameters.", log: "You confronted administrators over the [Noun].", outcome: "They cave under your logical arguments, modifying the grading rules for everyone.", adjust: { smarts: 15, stress: 18, happiness: 8 } }
    ]
  },
  {
    category: "Auto Ownership",
    nouns: ["squeaking alternator rubber belt", "smudgey windscreen wiper blade set", "local street-parking parking space", "cracked plastic rearview wing mirror", "scratched fuel tank metal lid"],
    under21: [
      { text: "Buy cheap junk parts and repair the [Noun] in your driveway.", log: "You DIY-retrofitted the [Noun] on your driveway.", outcome: "The bolts fit tightly! You saved immense cash and your machinery is solid.", adjust: { smarts: 15, cash: -50, happiness: 12, stress: -5 } },
      { text: "Drive at high speeds hoping the [Noun] noise somehow fixes itself.", log: "You ignored critical vehicle signs regarding the [Noun].", outcome: "The entire component snaps off on the highway, nearly causing a five-way pileup!", adjust: { health: -15, cash: -600, stress: 30, happiness: -10 } },
      { text: "Consult your experienced uncle for mechanical wisdom on the [Noun].", log: "You sought veteran advice for the [Noun].", outcome: "He teaches you tools, feeds you warm barbecue, and fixes the issue cleanly.", adjust: { happiness: 18, karma: 12, smarts: 10, stress: -12 } }
    ],
    over21: [
      { text: "File an official insurance claim over injuries related to the [Noun].", log: "You filed high-payout insurance claims for the [Noun].", outcome: "The firm pays out $1,400! Cash flow resolved, although the paperwork was brutal.", adjust: { cash: 1400, stress: 15, smarts: 12 } },
      { text: "Upgrade the [Noun] with flashy custom carbon fiber accessories.", log: "You added street racing parts to the [Noun].", outcome: "The car looks insanely aggressive, but you cannot afford basic groceries now.", adjust: { looks: 22, cash: -350, happiness: 15 } }
    ]
  },
  {
    category: "Creative Hobbies",
    nouns: ["unvarnished pine acoustic guitar neck", "half-filled heavy oil paint canvas", "indie-developer computer coding setup", "cheap second-hand pottery spinning wheel", "unlocked podcast microphone stand studio"],
    under21: [
      { text: "Practice clean scales and strokes on the [Noun] for six hours.", log: "You practiced diligently on the [Noun].", outcome: "Your fingers bleed, but your soul sings as you unlock genuine artistic mastery.", adjust: { happiness: 20, looks: 8, smarts: 12, stress: -10 } },
      { text: "Smash the [Noun] on the floor in a dramatic fit of creative block.", log: "You rage-wrecked your artistic [Noun].", outcome: "You instantly regret throwing it. Your room is a complete dump and you feel empty.", adjust: { happiness: -20, health: -5, stress: 18, cash: -120 } },
      { text: "Host an open block party to display your progress with the [Noun].", log: "You showcased the artistic [Noun] to neighbors.", outcome: "Everyone applauds your raw courage! Cute neighbors congratulate you.", adjust: { happiness: 24, looks: 15, karma: 10 } }
    ],
    over21: [
      { text: "Launch a crowdfunding project online for your [Noun] project.", log: "You crowdfunded your [Noun] artistic design.", outcome: "You raised $1,200 from generous internet strangers! You must actually build it now.", adjust: { cash: 1200, stress: 20, smarts: 15 } },
      { text: "Steal beautiful premium supplies for the [Noun] from an art shop.", log: "You shoplifted tools for the [Noun] setup.", outcome: "You escaped without setting off alarms! Your output is exquisite, your soul dark.", adjust: { cash: 80, karma: -30, stress: 15 } }
    ]
  },
  {
    category: "Friendship Dilemmas",
    nouns: ["shared weekend beach house bill", "friend’s wedding invitation ticket", "unreturned retro gaming system console", "secret digital chat screenshot draft", "misplaced car ignition remote key"],
    under21: [
      { text: "Own up to your minor mistake regarding the [Noun] immediately.", log: "You responsibly cleared up the [Noun] dispute.", outcome: "They hug you, telling you that your bonds mean far more than physical plastic.", adjust: { karma: 20, happiness: 15, stress: -15 } },
      { text: "Blame a third mutual friend for stealing or losing the [Noun].", log: "You scapegoated a friend under pressure over the [Noun].", outcome: "Your plot succeeds, but you can barely sleep knowing what an absolute snake you are.", adjust: { karma: -35, happiness: -10, stress: 25 } },
      { text: "Work overtime at the grocery shop to replace the lost [Noun].", log: "You worked shifts to buy back the disputed [Noun].", outcome: "It took ages, but your friendship remains unbreakable. True solid gold character.", adjust: { karma: 25, cash: -180, health: -5, stress: 12, happiness: 10 } }
    ],
    over21: [
      { text: "Buy an apology round of premium stout pints near the [Noun].", log: "You solved a friend dispute over the [Noun] with drinks.", outcome: "Laughter echoes around the bar. All errors are forgiven over ice cold beers.", adjust: { cash: -75, health: -8, happiness: 20, stress: -10 } },
      { text: "Sue your childhood best friend in small claims court over the [Noun].", log: "You filed litigation over the [Noun].", outcome: "You won the trial but lost your friend forever. The courtroom was freezing cold.", adjust: { cash: 400, karma: -40, stress: 30, happiness: -25 } }
    ]
  },
  {
    category: "Travel & Backpacking",
    nouns: ["torn paper hiking trail map", "overstuffed nylon travel backpack", "sketchy local hostel mattress room", "expedition wooden canoe paddle", "battered pocket language translation booklet"],
    under21: [
      { text: "Study and navigate the wild terrain with your [Noun] steadily.", log: "You navigated carefully using the [Noun].", outcome: "You hike like a true survival expert. The views are breathtaking and your legs are iron.", adjust: { health: 18, smarts: 12, stress: -10, happiness: 25 } },
      { text: "Hurl your heavy [Noun] down the canyon in a dramatic tantrum.", log: "You threw a travel tantrum with the [Noun].", outcome: "You are stuck in wet, shivering wilderness without your gear. Absolute clown behavior.", adjust: { health: -15, looks: -8, stress: 28, happiness: -15 } },
      { text: "Trade your unique [Noun] to friendly locals for hot cooked stews.", log: "You bartered travel gear for warm stews.", outcome: "You gain delicious native insights and healthy, glowing spirits.", adjust: { happiness: 18, karma: 12, stress: -8 } }
    ],
    over21: [
      { text: "Smuggle exotic high-value spices inside your [Noun] through airport security.", log: "You did minor border smuggling inside your [Noun].", outcome: "The customs dogs completely ignored you! You sell the spices for a cozy cash packet.", adjust: { cash: 650, karma: -30, stress: 28 } },
      { text: "Drink three pints of strange regional moonshine near the [Noun] area.", log: "You drank raw foreign spirits near the [Noun].", outcome: "You woke up wearing a stranger's hat, lacking any memory of the last twelve hours.", adjust: { health: -18, looks: -10, happiness: 15, stress: 15, cash: -50 } }
    ]
  },
  {
    category: "Lover's Affairs",
    nouns: ["scented custom herbal massage soap", "sparkling silver promise engagement ring", "intimate candlelight restaurant table menu", "handwritten book of experimental romantic sonnets", "matching weekend spa facial mask set"],
    under21: [
      { text: "Gently present the gorgeous [Noun] on bended knee.", log: "You delivered the romantic [Noun] with deep class.", outcome: "They gasp and wrap you in a passionate, tear-filled embrace. Pure romance!", adjust: { happiness: 35, looks: 12, stress: -15, cash: -200 } },
      { text: "Accidentally drop the delicate [Noun] down an open street grate.", log: "You fumbled the romantic [Noun] into public grates.", outcome: "You had to crawl in wet sludge while they stared down in absolute disgust.", adjust: { health: -5, looks: -18, stress: 22, happiness: -15 } },
      { text: "Pledge your pure devotion without needing material objects like the [Noun].", log: "You declared pure spoken love instead of the [Noun].", outcome: "Your elegant poetry completely melts their heart. Truly legendary charm.", adjust: { looks: 15, smarts: 15, happiness: 25, karma: 10 } }
    ],
    over21: [
      { text: "Max out your primary credit card to purchase the gold edition [Noun].", log: "You financed a premium gold [Noun] on credit.", outcome: "Your spouse is dazzling, but bank agents send legal letters to your door.", adjust: { happiness: 30, looks: 10, cash: -1200, stress: 25 } },
      { text: "Re-gift a cheap secondhand version of the [Noun] you found in trash.", log: "You cheap-gifted a trash-salvaged [Noun].", outcome: "They notice the scratches instantly. A heavy, flying porcelain plate barely misses your head.", adjust: { karma: -22, looks: -10, happiness: -20, stress: 18 } }
    ]
  }
];

const YOUNG_SITUATIONS = [
  {
    desc: "You are dealing with an intense situation at your local flat-share involving the [Noun].",
    titlePrefix: "Crisis of the"
  },
  {
    desc: "A major, chaotic post on social media pops up concerning your history with the [Noun].",
    titlePrefix: "Viral Post about the"
  },
  {
    desc: "Your demanding entry-level supervisor requests that you organize the [Noun] instantly.",
    titlePrefix: "Hustle of the"
  },
  {
    desc: "A sketchy stranger at the subway station dares you to handle the [Noun] for fifty cold bucks.",
    titlePrefix: "The Subways Dare of the"
  },
  {
    desc: "Your roommate accuses you of ruining or misplacing the [Noun] that belong to the flat.",
    titlePrefix: "Struggle over the"
  },
  {
    desc: "A group of older bouncers block you from entering the local scene unless you present the [Noun].",
    titlePrefix: "Showdown over the"
  },
  {
    desc: "You discover a high-tech, pristine [Noun] abandoned behind the library stacks.",
    titlePrefix: "Discovery of the"
  },
  {
    desc: "A modern self-help podcast warns young adults about the emotional dangers of the [Noun].",
    titlePrefix: "Podcast Warning about the"
  },
  {
    desc: "Your loving [Parent] calls to have a mature, non-judgmental query about your [Noun].",
    titlePrefix: "Parent Query about the"
  },
  {
    desc: "An aggressive rent collector knocks on your door, pointing directly at your [Noun].",
    titlePrefix: "Rent Challenge over"
  }
];

// Helper to generate 500 unique young adulthood definitions
const generateAllYoungScenarios = (): YoungScenarioDef[] => {
  const result: YoungScenarioDef[] = [...YOUNG_HANDCRAFTED];
  let generatedCount = 0;

  // 10 themes * 5 nouns * 10 situations = 500 unique permutations!
  for (let t = 0; t < YOUNG_THEMES.length; t++) {
    const theme = YOUNG_THEMES[t];
    for (let n = 0; n < theme.nouns.length; n++) {
      const noun = theme.nouns[n];
      for (let s = 0; s < YOUNG_SITUATIONS.length; s++) {
        const sit = YOUNG_SITUATIONS[s];
        
        const scenarioId = `young_gen_${t}_n${n}_s${s}`;
        const uppercaseNoun = noun.charAt(0).toUpperCase() + noun.slice(1);
        const title = `${sit.titlePrefix} ${uppercaseNoun} ⚡`;
        const description = `${sit.desc.replace(/\[Noun\]/g, noun)} The fast-paced urban world moves quickly, and your adult choices will define your early career.`;

        // Age division: even generated indices get ages 18-21, odd get ages 21-25
        const isUnder21 = (generatedCount % 2 === 0);
        const minAge = isUnder21 ? 18 : 21;
        const maxAge = isUnder21 ? 21 : 25;

        // Build choices based on age range mapping
        const choices = theme.under21.map(u => ({
          text: u.text.replace(/\[Noun\]/g, noun),
          outcomeText: u.outcome.replace(/\[Noun\]/g, noun),
          adjustments: u.adjust,
          customEffect: (state: CharacterState) => {
            state.log.push(`Age ${state.characterInfo.age}: ${u.log.replace(/\[Noun\]/g, noun)}`);
          }
        }));

        // Add 21+ choices if appropriate
        if (!isUnder21) {
          theme.over21.forEach(o => {
            choices.push({
              text: o.text.replace(/\[Noun\]/g, noun),
              outcomeText: o.outcome.replace(/\[Noun\]/g, noun),
              adjustments: o.adjust,
              customEffect: (state: CharacterState) => {
                state.log.push(`Age ${state.characterInfo.age}: ${o.log.replace(/\[Noun\]/g, noun)}`);
              }
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

const fullYoungScenarios = generateAllYoungScenarios();

export const adulthoodYoungEvents: GameEvent[] = fullYoungScenarios.map((evt) => {
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
    choices: evt.choices.map((c) => {
      return {
        choiceText: c.text,
        outcomeText: c.outcomeText,
        effect: (state: CharacterState) => {
          // Relational parsing helpers for [Parent] and [Sibling]
          const parent = state.relationships.find(r => r.relationshipType === 'Parent' && !r.isDead);
          const sibling = state.relationships.find(r => r.relationshipType === 'Sibling' && !r.isDead);

          const parentName = parent ? parent.name : 'your parent';
          const siblingName = sibling ? sibling.name : 'your sibling';

          // Commit core mutations safely using multiplier adjustments
          adjustStats(state, c.adjustments);

          // Commit cash alterations if present
          if (c.adjustments.cash) {
            state.finances.cashBalance = Math.max(state.finances.cashBalance + c.adjustments.cash, -100000);
          }

          // Trigger custom additional actions or logs
          if (c.customEffect) {
            c.customEffect(state);
            // Replace relational tokens in latest log line
            if (state.log.length > 0) {
              const lastIdx = state.log.length - 1;
              state.log[lastIdx] = state.log[lastIdx]
                .replace(/\[Parent\]/g, parentName)
                .replace(/\[Sibling\]/g, siblingName);
            }
          } else {
            state.log.push(`Age ${state.characterInfo.age}: Resolved a dynamic young adulthood event involving ${evt.title.split(' ⚡')[0]}.`);
          }
        }
      };
    })
  };
});

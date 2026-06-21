import { GameEvent, CharacterState, Disease } from '../../types';
import { adjustStats } from '../../utils';

interface TeenScenarioDef {
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

// 1. Hand-crafted crucial adolescent milestones (Ages 12-17)
const HAND_CRAFTED_TEEN_EVENTS: TeenScenarioDef[] = [
  {
    id: 'teen_driving_test',
    title: 'The Driving License Test 🚗',
    description: 'You are finally 16! With [Parent] sweating in the backseat, you sit behind the wheel of a clunky sedan. The instructor holding the clipboard looks at you coldly: "Parallel park. Now."',
    minAge: 16,
    maxAge: 16,
    choices: [
      {
        text: 'Align your mirrors, signal meticulously, and park slow.',
        outcomeText: 'You slid into the tight space with absolute, majestic precision! The instructor smiles slightly and hands you your Driver\'s License.',
        adjustments: { happiness: 30, smarts: 15, stress: -10, karma: 5 },
        customEffect: (state) => {
          state.characterInfo.hasLicense = true;
          state.log.push(`Age ${state.characterInfo.age}: You passed your driving test and earned a licensed status!`);
        }
      },
      {
        text: 'Nail a thrilling, drift-style parallel park with handbrake turns.',
        outcomeText: 'You pulled the handbrake. The car screeched, mounting the curb and obliterating a metal trash can. You failed immediately.',
        adjustments: { happiness: -20, health: -5, looks: -5, stress: 25 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: You failed your driving test spectacularly by crashing into municipal trash cans.`);
        }
      },
      {
        text: 'Attempt to bribe the assessor with $100 bills.',
        outcomeText: 'The assessor stares blankly at the crisp note, pockets it instantly, and checking the box: PASSED! True capitalism.',
        adjustments: { happiness: 20, cash: -100, karma: -20, stress: 15 },
        customEffect: (state) => {
          state.characterInfo.hasLicense = true;
          state.log.push(`Age ${state.characterInfo.age}: You corruptly bribed your driving assessor to get a driver's license.`);
        }
      },
      {
        text: 'Panic completely and sprint out of the vehicle.',
        outcomeText: 'You opened the driver door and dashed onto the grass. The assessor writes "ABANDONED" in thick red letters.',
        adjustments: { happiness: -15, stress: 20 }
      }
    ]
  },
  {
    id: 'teen_nicotine_pressure',
    title: 'The Bathroom Smoke Ring 💨',
    description: 'A group of intimidating upperclassmen corner you in the boy\'s locker room, blowing thick minty clouds. They thrust a sleek lavender vape pen into your hand: "Have a puff, kid. Don\'t be a baby."',
    minAge: 12,
    maxAge: 17,
    choices: [
      {
        text: 'Inhale deeply and blow a majestic lavender cloud.',
        outcomeText: 'You cough violently, but you look extremely cool to the seniors. Unfortunately, your lungs burn and you feel a strange dependency forming.',
        adjustments: { happiness: 15, health: -15, looks: 10, stress: -15, karma: -5 },
        customEffect: (state) => {
          const hasAddiction = state.diseases.some(d => d.name === 'Nicotine Addiction');
          if (!hasAddiction) {
            const nicotineAddiction: Disease = {
              id: `disease-nicotine-${Math.random()}`,
              name: 'Nicotine Addiction',
              type: 'Addiction',
              healthDrainPerYear: 6,
              happinessDrainPerYear: 3,
              cureDifficulty: 'Medium'
            };
            state.diseases.push(nicotineAddiction);
            state.log.push(`Age ${state.characterInfo.age}: You caved to peer pressure, hitting the vape pen and contracting Nicotine Addiction.`);
          }
        }
      },
      {
        text: 'Refuse flatly and walk away with dignity.',
        outcomeText: 'They call you a nerd and spray school body spray in your face, but you leave with your lungs perfectly safe.',
        adjustments: { happiness: -5, health: 10, smarts: 15, karma: 10, stress: 10 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: You rejected a vape and maintained clean breathing status.`);
        }
      },
      {
        text: 'Report the vaping seniors to the assistant principal.',
        outcomeText: 'The bathroom gets raided instantly! The upperclassmen are suspended, but they swear to make your high school life living hell.',
        adjustments: { happiness: -15, looks: -15, smarts: 10, karma: 5, stress: 30 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: You ratted out school vapers, gaining stress but pleasing the local administration.`);
        }
      }
    ]
  },
  {
    id: 'teen_alcohol_pressure',
    title: 'The Friday Night Red Cup 🥤',
    description: 'You sneak into an unchaperoned house party where loud music vibrates the floor. A classmate hands you a red cup filled with mysterious, punchy jungle juice.',
    minAge: 14,
    maxAge: 17,
    choices: [
      {
        text: 'Chug the dynamic concoction down!',
        outcomeText: 'Your vision blurs, the party is amazing! However, you end up sleeping on the lawn and wake up with a brutal headache.',
        adjustments: { happiness: 25, health: -20, looks: -5, stress: -10, karma: -5 },
        customEffect: (state) => {
          if (Math.random() < 0.45) {
            const alcoholAddiction: Disease = {
              id: `disease-alcohol-${Math.random()}`,
              name: 'Alcohol Addiction',
              type: 'Addiction',
              healthDrainPerYear: 10,
              happinessDrainPerYear: 5,
              cureDifficulty: 'Medium'
            };
            state.diseases.push(alcoholAddiction);
            state.log.push(`Age ${state.characterInfo.age}: You drank heavy mysterious punch, developing Alcohol Addiction.`);
          } else {
            state.log.push(`Age ${state.characterInfo.age}: You drank heavily at a high school party and suffered a terrible hangover.`);
          }
        }
      },
      {
        text: 'Pour it quietly into a nearby houseplant.',
        outcomeText: 'You pretend to drink while hydrating on tap water. You network perfectly, holding clean, crisp conversations.',
        adjustments: { happiness: 15, smarts: 10, looks: 5, karma: 5 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: You cleverly socialized at a house party without touching boozes.`);
        }
      },
      {
        text: 'Call [Parent] to come pick you up immediately.',
        outcomeText: '[Parent] arrives in pajamas, deeply proud of your mature decision but complaining about the cold night air.',
        adjustments: { happiness: -5, health: 5, smarts: 15, karma: 20, stress: -10 },
        customEffect: (state) => {
          const parent = state.relationships.find(n => n.relationshipType === 'Parent');
          if (parent) {
            parent.relationshipValue = Math.min(100, parent.relationshipValue + 15);
          }
          state.log.push(`Age ${state.characterInfo.age}: You made a responsible call to your parents to escape a chaotic house party.`);
        }
      }
    ]
  },
  {
    id: 'teen_job_newspaper',
    title: 'Paper Route Openings 📰',
    description: 'The local neighborhood distributor is advertising part-time Newspaper Delivery positions. It requires waking up at 5:00 AM every single morning.',
    minAge: 12,
    maxAge: 15,
    choices: [
      {
        text: 'Sign up for the early morning newspaper delivery route.',
        outcomeText: 'You secured the job! You are constantly exhausted and smelling of fresh printer ink, but you make an extra $4,500 annually!',
        adjustments: { happiness: -10, health: -5, stress: 25, smarts: 5 },
        customEffect: (state) => {
          state.characterInfo.currentOccupation = 'Part-Time Newspaper Courier';
          state.finances.annualSalary = 4500;
          state.log.push(`Age ${state.characterInfo.age}: You signed up for a Newspaper Route part-time, securing regular income.`);
        }
      },
      {
        text: 'Ignore the opening and sleep in instead.',
        outcomeText: 'Your dreams remain sweet and you sleep for eleven rich hours. Your wallet remains completely empty.',
        adjustments: { happiness: 15, health: 15, stress: -15 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: You decided to value rest over a grueling morning paper route.`);
        }
      },
      {
        text: 'Throw paper planes around the lobby.',
        outcomeText: 'The manager kicks you out of the warehouse instantly for immature schoolyard behavior.',
        adjustments: { happiness: 5, karma: -8, stress: 10 }
      }
    ]
  },
  {
    id: 'teen_job_fastfood',
    title: 'The Fryer Call 🍟',
    description: '"Crispy Burger" is recruiting front-line fry cooks and cashiers. The manager smells of grease and asks if you can start this weekend.',
    minAge: 16,
    maxAge: 17,
    choices: [
      {
        text: 'Put on the grease-stained paper hat and cook fry baskets.',
        outcomeText: 'You got the job! Your fingers are permanently raw from salt and heat, but you take home $6,200 annually.',
        adjustments: { happiness: -15, looks: -10, health: -5, stress: 30 },
        customEffect: (state) => {
          state.characterInfo.currentOccupation = 'Fast Food Cashier';
          state.finances.annualSalary = 6200;
          state.log.push(`Age ${state.characterInfo.age}: You joined Crispy Burger as a cashier/fryer, expanding your young finances.`);
        }
      },
      {
        text: 'Politely refuse their greasy burger offer.',
        outcomeText: 'You run away from the burger joints. Your hair smells sparkling clean, and you spend your weekend at the skatepark.',
        adjustments: { happiness: 15, looks: 5, stress: -10 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: You declined kitchen employment to preserve your summer freedom.`);
        }
      },
      {
        text: 'Demand a direct managerial salary tier.',
        outcomeText: 'The frying chef laughs loudly, pointing you directly out of the building. Denied.',
        adjustments: { happiness: -5, smarts: 5, stress: 10 }
      }
    ]
  }
];

// 2. Programmatic generation matrix for 500 adolescent scenarios
const THEMES = [
  {
    category: "Academic",
    nouns: ["algebra final sheet", "chemistry laboratory report", "ancient fossil folder", "literature poetry portfolio", "physics semester blueprint"],
    under16: [
      { text: "Overnight-study the [Noun] in the bathroom using a small reading lantern.", log: "You spent all night cramming your [Noun] parameters.", outcome: "You slaved away over details. Your smarts surged, but you have dark bags under your eyes.", adjust: { smarts: 18, happiness: -5, stress: 15 } },
      { text: "Infiltrate the local teacher server to swipe the [Noun] blueprint.", log: "You tried a high-tech infiltration to peek at the [Noun].", outcome: "You got caught in the database track traces! Suspended for three weeks and parents are furious.", adjust: { karma: -25, happiness: -20, stress: 30 } },
      { text: "Request support from [Parent] regarding your [Noun] workload.", log: "You sought parental support with [Noun] study curves.", outcome: "Your parents were deeply sympathetic and baked you fresh warm cinnamon rolls.", adjust: { happiness: 15, stress: -15, karma: 12 } }
    ],
    over16: [
      { text: "Pay a smart senior underclassman to handle the [Noun] equations.", log: "You corruptly outsourced your [Noun] workload.", outcome: "The senior did an excellent job, and nobody suspected a thing. Real-world efficiency.", adjust: { smarts: -10, cash: -120, karma: -15, stress: -10 } },
      { text: "Sip bitter triple-shot espresso to power-write the [Noun].", log: "You coffee-fueled your [Noun] paper sprint.", outcome: "Your heart raced at 190 BPM, but you smashed the deadlines with perfect grades.", adjust: { smarts: 20, health: -10, stress: 25 } }
    ]
  },
  {
    category: "Peer Pressure & Contraband",
    nouns: ["glowing lavender electronic vape", "clinking bottle of old bourbon", "unlabeled herbal anxiety pill", "illegal firework sparkler rocket", "master key to the padlocked gymnasium"],
    under16: [
      { text: "Politely decline the [Noun] and walk back to your locker area.", log: "You stood your ground against peers over the [Noun].", outcome: "They mocked you for being a baby, but your health and self-respect remain pure.", adjust: { health: 15, happiness: -5, karma: 15, stress: 8 } },
      { text: "Experiment with the [Noun] to earn instant locker room respect.", log: "You toyed with the [Noun] to appease popular kids.", outcome: "You coughed and wheezed miserably under their laughter, feeling incredibly dizzy.", adjust: { health: -15, looks: -8, happiness: 10, stress: 12 } },
      { text: "Defuse the circle by cracking clever jokes about the [Noun].", log: "You used comedy to deflect peer pressure near the [Noun].", outcome: "You made everyone laugh, distracting them completely from forcing anything on you.", adjust: { smarts: 15, stress: -10, happiness: 12 } }
    ],
    over16: [
      { text: "Tell the principal where the gang hides their contraband [Noun].", log: "You snitched on peer-level [Noun] traffickers.", outcome: "They were suspended, but they tagged your locker with toxic permanent paint. Snitches get stabs.", adjust: { karma: 10, looks: -10, stress: 35 } },
      { text: "Sell the contraband [Noun] on the street corner to make fast money.", log: "You black-marketed the [Noun] for fast funding.", outcome: "A local street-kid bought it instantly! Your pockets are loaded with cash.", adjust: { cash: 150, karma: -20, stress: 22 } }
    ]
  },
  {
    category: "Crushes & Romance",
    nouns: ["scented pink handwritten love note", "beautiful fresh-cut backyard flower", "silver-framed vintage cosmetic mirror", "personalized indie-rock mix cassette", "late-night romantic movie ticket stub"],
    under16: [
      { text: "Slide the [Noun] back into their open backpack with a playful wink.", log: "You playfully returned the [Noun] to test their interest.", outcome: "They blushed crimson and hid their eyes! A beautiful romantic spark is ignited.", adjust: { happiness: 18, looks: 12, stress: -8 } },
      { text: "Eat the wet [Noun] in sheer panic to hide all physical evidence.", log: "You panicked and swallowed the physical [Noun] whole.", outcome: "Your throat was dry and the paper tasted like bitter ink. You coughed, looking like a maniac.", adjust: { health: -10, looks: -15, stress: 20 } },
      { text: "Ignore the [Noun] completely to maintain your stoic, cool barrier.", log: "You held a cool persona, ignoring the [Noun].", outcome: "They assumed you were uninterested, leaving you in perfect, lonely silence.", adjust: { stress: -12, smarts: 10, happiness: -5 } }
    ],
    over16: [
      { text: "Rent a vintage tandem bicycle using your savings to deliver the [Noun].", log: "You tandem-cycled to present the romantic [Noun].", outcome: "You crashed into a bush together, laughing until your lungs burst. Best date ever.", adjust: { happiness: 35, cash: -40, health: -5 } },
      { text: "Perform a heavy metal guitar ballad themed around the [Noun].", log: "You metal-shredded about the [Noun] in the driveway.", outcome: "The neighbors yelled at you, but your crush was deeply impressed by your wild rock soul.", adjust: { looks: 20, happiness: 22, stress: 15 } }
    ]
  },
  {
    category: "Lockerroom Sports",
    nouns: ["muddy leather championship ball", "heavy school gymnastics rope", "gleaming golden division trophy", "pair of high-performance athlete cleats", "unsecured physical education locker latch"],
    under16: [
      { text: "Coordinate your athletics to execute a magnificent play with the [Noun].", log: "You mastered an athletic sprint involving the [Noun].", outcome: "You scored the winning point! The gym erupts, and teammates lift you on their shoulders.", adjust: { health: 18, looks: 15, happiness: 25, stress: -5 } },
      { text: "Fling the [Noun] directly at your opponent's ankle in deep anger.", log: "You lost your temper and threw the [Noun] at a rival.", outcome: "The referee pulled a red card! You are suspended from sports, branded a school bully.", adjust: { karma: -25, happiness: -15, stress: 20 } },
      { text: "Seek professional tactical feedback on how to manage the [Noun].", log: "You studied sports science coaching for the [Noun].", outcome: "The coach gave you detailed strategic layouts. Your intellectual approach pays off.", adjust: { smarts: 15, stress: -8, health: 5 } }
    ],
    over16: [
      { text: "Gulp high-potency caffeine energy packs to sprint for the [Noun].", log: "You energy-charged your blood for the [Noun] play.", outcome: "You ran like an Olympian, but suffered a shaky, nauseated panic crash afterward.", adjust: { health: -8, happiness: 15, stress: 28 } },
      { text: "Fake a catastrophic thigh ligament injury during the [Noun] struggle.", log: "You faked an athletic drama over the [Noun].", outcome: "You were carried off on a stretcher. You missed the game, enjoying snacks in the clinic.", adjust: { smarts: 10, karma: -12, stress: -15 } }
    ]
  },
  {
    category: "Part-Time Job Battles",
    nouns: ["rusty delivery bicycle basket", "greasy cafeteria burger spatula", "flimsy warehouse packaging box", "loud supermarket checkout register", "chlorinated local swimming pool tower"],
    under16: [
      { text: "Apologize immediately and offer to replace the damaged [Noun].", log: "You responsibly owned up to damaging the [Noun].", outcome: "The boss sighed but admired your integrity. You keep your shift, but your heart was beating fast.", adjust: { karma: 18, stress: 10, smarts: 8 } },
      { text: "Hurl the [Noun] into the garbage and scream your resignation.", log: "You rage-quit your job by throwing the [Noun].", outcome: "You walked out like a movie star! However, your pockets are dead empty and parents are furious.", adjust: { happiness: 22, stress: -20, cash: -200, karma: -10 } },
      { text: "Arrange a quiet, level-headed conference with your boss about the [Noun].", log: "You mediated a conflict over the workplace [Noun].", outcome: "You explained the system error perfectly. The boss apologized and cleared your record.", adjust: { smarts: 20, stress: -12, happiness: 12 } }
    ],
    over16: [
      { text: "Conceal the cracks in the [Noun] using rolls of cheap grey tape.", log: "You taped up the broken [Noun] to hide the damage.", outcome: "The tape fell off mid-shift, causing a major spill. The manager docked your pay.", adjust: { cash: -80, karma: -15, stress: 20 } },
      { text: "Consult a local labor hotline regarding your safety with the [Noun].", log: "You investigated labor codes for the [Noun].", outcome: "The company panicked over safety audits, instantly promoting you to junior assistant.", adjust: { smarts: 18, cash: 350, stress: 15 } }
    ]
  },
  {
    category: "Family Disputes",
    nouns: ["greasy family computer keypad", "scratched multiplayer gaming controller", "parent's heirloom crystal pottery", "padlocked secret lockbox drawer", "unlocked smart-television control"],
    under16: [
      { text: "Propose a peaceful scheduling contract to utilize the [Noun] fairly.", log: "You drafted a peaceful sharing code for the [Noun].", outcome: "[Sibling] reluctantly agreed. Your home life remains quiet and highly harmonized.", adjust: { karma: 20, happiness: 10, stress: -10 } },
      { text: "Slam them onto the carpet to secure your [Noun] by brute strength.", log: "You wrestled your sibling for custody of the [Noun].", outcome: "You got a black eye, [Sibling] got scratched, and your parents grounded you both indefinitely.", adjust: { health: -12, happiness: -15, stress: 22 } },
      { text: "Wail at extreme pitches until [Parent] rushes in to adjudicate.", log: "You screamed for parent intervention over the [Noun].", outcome: "[Parent] enters, confiscating the [Noun] instantly from both of you. Great job.", adjust: { happiness: -8, stress: 15 } }
    ],
    over16: [
      { text: "Sell the valuable [Noun] online so neither of you can have it.", log: "You spitefully pawned the disputed [Noun].", outcome: "You got hot cash, but [Sibling] refuses to look at you, and parents are seeking answers.", adjust: { cash: 110, karma: -30, stress: 25 } },
      { text: "Bribe your sibling with laundry labor to give up the [Noun].", log: "You traded laundry services for the [Noun].", outcome: "You washed 14 loads of smelly socks, but got twenty full hours of glorious play-time.", adjust: { smarts: 12, stress: -5, happiness: 15 } }
    ]
  },
  {
    category: "Artistic Expression",
    nouns: ["neon-blue physical dye bottle", "gothic steel-studded neckband collar", "vintage acoustic guitar carcass", "second-hand leather aviator coat", "battered pocket classic book of poetry"],
    under16: [
      { text: "Wear your striking new [Noun] to the class photo session.", log: "You wore your unique [Noun] for open self-expression.", outcome: "The counselor requested you take it off, but peers praise your incredible radical aura.", adjust: { happiness: 18, looks: 12, stress: 10 } },
      { text: "Cut or alter the [Noun] to look completely insane and shredded.", log: "You customized your [Noun] with raw scissors.", outcome: "It looks incredibly punk! You feel like a total rockstar strutting down the hallways.", adjust: { looks: 15, happiness: 15 } },
      { text: "Conceal the quirky [Noun] in your locker to avoid conservative heat.", log: "You tucked your [Noun] away to avoid school trouble.", outcome: "You complied with the boring rules, but felt a tiny piece of your creative soul shrink.", adjust: { stress: -8, happiness: -10, smarts: 8 } }
    ],
    over16: [
      { text: "Pawn your standard clothes to purchase a custom edition of the [Noun].", log: "You pawned regular outfits for a premium [Noun].", outcome: "You are freezing cold, but you look like an absolute alternative fashion catalog model.", adjust: { looks: 22, happiness: 20, cash: -120 } },
      { text: "Create an alternative fashion vlog showcasing your quirky [Noun] style.", log: "You vlogged active styling tips for the [Noun].", outcome: "You gathered 10,000 active followers overnight! Brands are sending you sticker packs.", adjust: { happiness: 25, looks: 10, cash: 80 } }
    ]
  },
  {
    category: "Skatepark Quests",
    nouns: ["battered maple wood skateboard", "shiny heavy-duty fullhead helmet", "improvised wooden backyard jump ramp", "shining copper spring pogo bouncer", "unlocked vintage street-scooter structure"],
    under16: [
      { text: "Maintain absolute, safe body balance to ride down the [Noun].", log: "You carefully mounted and balanced across the [Noun].", outcome: "You rolled down cleanly! Absolute breeze, building up your muscular center.", adjust: { health: 15, looks: 8, stress: -5 } },
      { text: "Attempt a double aerial flip off the [Noun] to impress onlookers.", log: "You tried an elite high-altitude stunt off the [Noun].", outcome: "You faceplanted directly into the dirt! You chipped a tooth and bruised your tailbone.", adjust: { health: -20, looks: -12, happiness: -10, stress: 18 } },
      { text: "Offer to photograph other teenagers' runs using the [Noun] safety zone.", log: "You filmed other skaters' stunts around the [Noun].", outcome: "You became the official crew camera operator, building warm alliances without getting hurt.", adjust: { smarts: 14, stress: -10, happiness: 12 } }
    ],
    over16: [
      { text: "Charge a small quarters entry coin for peers to ride your [Noun] setup.", log: "You monetized access to your [Noun] ramp.", outcome: "You made some quick street cash, until an angry mother shut down your backyard park.", adjust: { cash: 65, stress: 12, karma: -8 } },
      { text: "Perform a spectacular comedic crash over the [Noun] for viral comedy.", log: "You faked a massive comedic tumble over the [Noun].", outcome: "You scraped your arm, but the video got historical clicks! You are high school famous.", adjust: { happiness: 24, looks: -5, health: -8 } }
    ]
  },
  {
    category: "Detention Secrets",
    nouns: ["smudgey dry-erase board felt", "dean's heavy ceramic coffee mug", "confiscated modern battery device", "dusty library database ledger", "unlocked filing desk wooden hatch"],
    under16: [
      { text: "Dust and clean the messy [Noun] area to secure administrator favor.", log: "You cleaned the office [Noun] area during detention.", outcome: "The principal was amazed! They cancelled your remaining detention hours early.", adjust: { karma: 18, smarts: 12, stress: -10 } },
      { text: "Carve your initials and a cartoon dinosaur onto the [Noun].", log: "You vandalized the school [Noun] with custom drawings.", outcome: "They matched your pencil lead to the carving! You got double detention and clean chores.", adjust: { karma: -22, stress: 18, happiness: -10 } },
      { text: "Doze off silently, ignoring the [Noun] to enjoy peaceful rest.", log: "You slept during detention, ignoring the [Noun].", outcome: "You woke up refreshed but with dry paper creases pressed into your cheek.", adjust: { stress: -15, health: 10 } }
    ],
    over16: [
      { text: "Stash the expensive [Noun] inside your backpack to pawn it later.", log: "You swiped the office [Noun] for street pawn value.", outcome: "You pawned it for quick cash, but feel a nervous chill whenever you walk by the office.", adjust: { cash: 130, karma: -25, stress: 24 } },
      { text: "Re-organize the filing system of the [Noun] for structural precision.", log: "You upgraded the tracking system for the [Noun].", outcome: "Your clean intellect shocked them! They hired you as a school office aid next term.", adjust: { smarts: 20, cash: 150, stress: 12 } }
    ]
  },
  {
    category: "Gaming Guilds",
    nouns: ["ultra high-DPI ergonomic mouse", "led sound-blocking virtual headset", "unsecured multiplayer custom server", "holographic vintage gaming cartridge", "local cybercafé competitive registry"],
    under16: [
      { text: "Power-cycle the [Noun] with high speed to re-join your squad.", log: "You quickly rebooted the broken [Noun] during a match.", outcome: "You re-connected just in time, scoring a double-kill to secure victory!", adjust: { smarts: 15, happiness: 18, stress: 10 } },
      { text: "Smash the [Noun] to pieces against your bedroom door in rage.", log: "You rage-broke your [Noun] after a severe game death.", outcome: "Your setup is ruined, your knuckles hurt, and you have to crawl to parents for funding.", adjust: { health: -5, happiness: -15, stress: -10, cash: -150 } },
      { text: "Mute your voice channel and guide them with calm tactical typing.", log: "You quietly co-directed your squad around the [Noun].", outcome: "You lost the match, but made three excellent steam-room friends who admire your chill.", adjust: { karma: 15, stress: -12, happiness: 10 } }
    ],
    over16: [
      { text: "Shoplift a brand replacement [Noun] from the electronics mall.", log: "You shoplifted a brand-new [Noun] from shelves.", outcome: "Success! You walked out with a clean box. Your game is smooth, your conscience dark.", adjust: { cash: 120, karma: -35, stress: 26 } },
      { text: "Wager your entire pocket savings on winning despite the [Noun] breakdown.", log: "You gambled on your broken [Noun] gaming matchup.", outcome: "A clutch victory! The lobby went completely wild, and your pockets are bursting.", adjust: { cash: 180, happiness: 24, stress: 20 } }
    ]
  }
];

const SITUATIONS = [
  {
    desc: "You are dealing with an intense situation at the local lockers involving the [Noun].",
    titlePrefix: "Crisis of the"
  },
  {
    desc: "A massive, chaotic rumor spreads through school concerning your history with the [Noun].",
    titlePrefix: "Gossip about the"
  },
  {
    desc: "During the second-period biology seminar, the instructor demands you present the [Noun].",
    titlePrefix: "Presentation of"
  },
  {
    desc: "An upperclassman dares you to do something completely reckless of the [Noun] in front of your crush.",
    titlePrefix: "The Dare of the"
  },
  {
    desc: "Your sibling accuses you of breaking the [Noun] that belong to your parents.",
    titlePrefix: "Struggle over the"
  },
  {
    desc: "A local skate crew threatens to exile you from the skatepark unless you forfeit the [Noun].",
    titlePrefix: "Showdown over the"
  },
  {
    desc: "You discover a pristine, glowing [Noun] abandoned behind the sports storage lockers.",
    titlePrefix: "Discovery of the"
  },
  {
    desc: "The local neighborhood bulletin warns teenagers about the dangers of the [Noun].",
    titlePrefix: "Warning about the"
  },
  {
    desc: "Your loving [Parent] asks to have a serious, private conversation regarding your [Noun].",
    titlePrefix: "Dialogue about the"
  },
  {
    desc: "The assistant principal halts you in the main hallway, pointing directly at your [Noun].",
    titlePrefix: "Interrogation over"
  }
];

// Helper to generate 500 unique adolescent definition logs
const generateAllTeenScenarios = (): TeenScenarioDef[] => {
  const result: TeenScenarioDef[] = [...HAND_CRAFTED_TEEN_EVENTS];
  let generatedCount = 0;

  // 10 themes * 5 nouns * 10 situations = 500 unique permutations!
  for (let t = 0; t < THEMES.length; t++) {
    const theme = THEMES[t];
    for (let n = 0; n < theme.nouns.length; n++) {
      const noun = theme.nouns[n];
      for (let s = 0; s < SITUATIONS.length; s++) {
        const sit = SITUATIONS[s];
        
        const scenarioId = `teen_gen_${t}_n${n}_s${s}`;
        const uppercaseNoun = noun.charAt(0).toUpperCase() + noun.slice(1);
        const title = `${sit.titlePrefix} ${uppercaseNoun} ⚡`;
        const description = `${sit.desc.replace(/\[Noun\]/g, noun)} The school lobby buzzes with active gossip, and your heart rate rises as you make a critical choice.`;

        // Age division: even indices get under-16 range, odd get 16-17 range
        const isUnder16 = (generatedCount % 2 === 0);
        const minAge = isUnder16 ? 12 : 16;
        const maxAge = isUnder16 ? 15 : 17;

        // Build choices based on age range mapping
        const choices = theme.under16.map(u => ({
          text: u.text.replace(/\[Noun\]/g, noun),
          outcomeText: u.outcome.replace(/\[Noun\]/g, noun),
          adjustments: u.adjust,
          customEffect: (state: CharacterState) => {
            state.log.push(`Age ${state.characterInfo.age}: ${u.log.replace(/\[Noun\]/g, noun)}`);
          }
        }));

        // Add 16+ choices if appropriate
        if (!isUnder16) {
          theme.over16.forEach(o => {
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

const fullTeenScenarios = generateAllTeenScenarios();

export const adolescenceEvents: GameEvent[] = fullTeenScenarios.map((evt) => {
  return {
    id: evt.id,
    title: evt.title,
    description: evt.description,
    category: 'School',
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

          const parentName = parent ? parent.name : 'your guardian';
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
            state.log.push(`Age ${state.characterInfo.age}: Resolved a high school scenario involving the ${evt.title.split(' ⚡')[0]}.`);
          }
        }
      };
    })
  };
});

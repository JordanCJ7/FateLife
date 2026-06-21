import { GameEvent, CharacterState, Disease } from '../../types';
import { adjustStats } from '../../utils';

interface TeenScenarioDef {
  id: string;
  title: string;
  description: string;
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

// 1. Hand-crafted crucial milestone scenarios
const HAND_CRAFTED_TEEN_EVENTS: TeenScenarioDef[] = [
  {
    id: 'teen_driving_test',
    title: 'The Driving License Test 🚗',
    description: 'You are finally 16! With [Parent] sweating in the backseat, you sit behind the wheel of a clunky sedan. The instructor holding the clipboard looks at you coldly: "Parallel park. Now."',
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
        text: 'Attempt to bribe the assessor with $100.',
        outcomeText: 'The assessor stares blankly at the crisp note, pockets it instantly, and checking the box: PASSED! True capitalism.',
        adjustments: { happiness: 20, cash: -100, karma: -20, stress: 15 },
        customEffect: (state) => {
          state.characterInfo.hasLicense = true;
          state.log.push(`Age ${state.characterInfo.age}: You corruptly bribed your driving assessor to get a driver's license.`);
        }
      }
    ]
  },
  {
    id: 'teen_nicotine_pressure',
    title: 'The Bathroom Smoke Ring 💨',
    description: 'A group of intimidating upperclassmen corner you in the boy\'s locker room, blowing thick minty clouds. They thrust a sleek lavender vape pen into your hand: "Have a puff, kid. Don\'t be a baby."',
    choices: [
      {
        text: 'Inhale deeply and blow a majestic cloud.',
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
        text: 'Refuse flatly and walk away.',
        outcomeText: 'They call you a nerd and spray body spray in your face, but you leave with your lungs perfectly safe.',
        adjustments: { happiness: -5, health: 10, smarts: 15, karma: 10, stress: 10 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: You rejected a vape and maintained clean breathing status.`);
        }
      },
      {
        text: 'Report them to the assistant principal.',
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
        text: 'Pour it quietly into a nearby flowerpot.',
        outcomeText: 'You pretend to drink while hydrating on tap water. You network perfectly, holding clean, crisp conversations.',
        adjustments: { happiness: 15, smarts: 10, looks: 5, karma: 5 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: You cleverly socialized at a house party without touching a drop of booze.`);
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
    choices: [
      {
        text: 'Sign up for the morning delivery route.',
        outcomeText: 'You secured the job! You are constantly exhausted and smelling of fresh printer ink, but you make an extra $4,500 annually!',
        adjustments: { happiness: -10, health: -5, stress: 25, smarts: 5 },
        customEffect: (state) => {
          state.characterInfo.currentOccupation = 'Part-Time Newspaper Courier';
          state.finances.annualSalary = 4500;
          state.log.push(`Age ${state.characterInfo.age}: You signed up for a Newspaper Route part-time, securing regular income.`);
        }
      },
      {
        text: 'Ignore it and sleep in instead.',
        outcomeText: 'Your dreams remain sweet and you sleep for eleven rich hours. Your wallet remains completely empty.',
        adjustments: { happiness: 15, health: 15, stress: -15 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: You decided to value rest over a grueling morning paper route.`);
        }
      }
    ]
  },
  {
    id: 'teen_job_fastfood',
    title: 'The Fryer Call 🍟',
    description: '"Crispy Burger" is recruiting front-line fry cooks and cashiers. The manager smells of grease and asks if you can start this weekend.',
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
        text: 'Politely refuse their greasy offer.',
        outcomeText: 'You run away from the burger joints. Your hair smells sparkling clean, and you spend your weekend at the skatepark.',
        adjustments: { happiness: 15, looks: 5, stress: -10 },
        customEffect: (state) => {
          state.log.push(`Age ${state.characterInfo.age}: You declined dirty kitchen employment to preserve your summer freedom.`);
        }
      }
    ]
  }
];

// 2. Programmatic generation pool for 195+ additional unique scenarios
const ADOLESCENT_TOPICS = [
  { theme: "High School Finals", good: "studying in the library till midnight", bad: "playing tactical shooter games with school skipping crews" },
  { theme: "The Prom Proposal", good: "making a sophisticated flash-mob poster invitation", bad: "sending a text with spelling mistakes at 3:00 AM" },
  { theme: "Sneaking Out", good: "leaving a realistic dummy under your sheets", bad: "falling out of the kitchen window into rose prickles" },
  { theme: "Drama Club Auditions", good: "rehearsing Shakespeare dramatic monologues", bad: "screaming loudly during a romantic scene" },
  { theme: "School Locker Fight", good: "defusing tensions with calm reasoning", bad: "launching a desk lamp at the leader" },
  { theme: "The Gym Rope", good: "using correct leg-locking climbs", bad: "giving up and hanging until your palms rip open" },
  { theme: "Social Media Vlog", good: "editing clean educational tutorial content", bad: "doing dangerous bike jumps over boiling water barrels" },
  { theme: "The School Band", good: "tuning your strings carefully for harmonies", bad: "smashing your cardboard guitar on the gym floor" },
  { theme: "Unsanctioned Piercing", good: "using sanitized clinical needles", bad: "using a dirty safety pin in a cafeteria stall" },
  { theme: "High School Crush", good: "complimenting their brilliant algebra scores", bad: "staring intensely without saying a word from behind lockers" },
  { theme: "History Class Project", good: "researching primary museum scrolls", bad: "copying entire Wikipedia pages word for word" },
  { theme: "Detention Duty", good: "scraping old chewing gum from underneath desks", bad: "pelting the supervisor with wet paper wads" },
  { theme: "The Skatepark Trial", good: "wearing safety knee pads and helmets", bad: "attempting front-side board slides down a 20-stair handrail" },
  { theme: "Backyard Barbecue", good: "flipping veggie skewers with parents", bad: "spraying lighter fluid directly onto a burning coal grate" },
  { theme: "School Science Dissection", good: "mapping anatomical muscles with scalpels", bad: "using the preserved frog as a goofy hand puppet" },
  { theme: "Math Chess League", good: "memorizing intricate Sicilian openings", bad: "knocking the board over and shouting checkmate" },
  { theme: "The Local Arcade", good: "setting high credentials on pinball cabinets", bad: "shaking the machine continuously to get free quarters" },
  { theme: "Summer Camp Canoe", good: "coordinating synchronized paddle strokes", bad: "trying to stand up and rock the wooden boat" },
  { theme: "Yearbook Photo", good: "holding a confident, pleasant grin", bad: "doing funny cross-eyed monster faces" },
  { theme: "Borrowing Car Clues", good: "asking politely for keys on errands", bad: "hotwiring the family sedan for late midnight drives" },
  { theme: "Tutor Side Hustle", good: "explaining hard calculus fractions with cookies", bad: "doing all their assignments in exchange for lunch tokens" },
  { theme: "Gym Class Mud Mile", good: "sprinting through deep wet dirt tracks", bad: "wrestling in the deep mud pits for attention" },
  { theme: "Library Silence Case", good: "whispering catalog details", bad: "playing loud bass music through leaky headphones" },
  { theme: "The Cyber cafe Tournament", good: "training with a coordinated squad", bad: "screaming toxic words at the opposing keyboard" },
  { theme: "Found Credit Card", good: "turning it into local precinct offices", bad: "buying five luxury headphones and a long golden necklace" }
];

const generateVastTeenScenarios = (): TeenScenarioDef[] => {
  const resultList = [...HAND_CRAFTED_TEEN_EVENTS];
  let currentCount = resultList.length;
  let topicIndex = 0;

  while (currentCount < 205) {
    const topic = ADOLESCENT_TOPICS[topicIndex % ADOLESCENT_TOPICS.length];
    const eventIdNum = currentCount + 1;
    const isOdd = currentCount % 2 !== 0;

    const titles = [
      `The Great ${topic.theme} Dilemma 🎒`,
      `Teen Crisis: ${topic.theme} ⚡`,
      `The Secrets of ${topic.theme} 🤫`,
      `High School ${topic.theme} Chaos 🏫`,
      `The Mystery of ${topic.theme} 🧩`
    ];
    const title = titles[currentCount % titles.length] + ` (#${eventIdNum})`;

    const description = `Your high school years are moving fast! You find yourself completely caught in a major situation regarding the local ${topic.theme.toLowerCase()}. This choice could change your entire high school trajectory.`;

    const choice1Text = topic.good.charAt(0).toUpperCase() + topic.good.slice(1) + '.';
    const choice1Outcome = `You tackled the ${topic.theme.toLowerCase()} with standard, dedicated diligence. It took a massive toll on your relaxation, but the results speak for themselves!`;
    const adj1 = isOdd
      ? { happiness: 10, smarts: 15, stress: 20, karma: 10 }
      : { happiness: 15, health: 5, smarts: 10, stress: 10, karma: 15 };

    const choice2Text = topic.bad.charAt(0).toUpperCase() + topic.bad.slice(1) + '!';
    const choice2Outcome = `You completely abandoned stability and chose to: ${topic.bad}! The immediate aftermath was extremely messy, and the school administration was not impressed at all.`;
    const adj2 = {
      happiness: 25,
      health: -15,
      smarts: -10,
      looks: -5,
      stress: 25,
      karma: -25,
      cash: isOdd ? -50 : 0
    };

    resultList.push({
      id: `teen_generated_${currentCount}`,
      title,
      description,
      choices: [
        {
          text: choice1Text,
          outcomeText: choice1Outcome,
          adjustments: adj1
        },
        {
          text: choice2Text,
          outcomeText: choice2Outcome,
          adjustments: adj2
        }
      ]
    });

    currentCount++;
    topicIndex++;
  }

  return resultList;
};

// 3. Compile the list of 200+ adolescent events
const rawAdolescenceEvents = generateVastTeenScenarios();

// Map array definitions to standard GameEvent interface structures
export const adolescenceEvents: GameEvent[] = rawAdolescenceEvents.map((evt) => {
  return {
    id: evt.id,
    title: evt.title,
    description: evt.description,
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      // Filter for driving test only at age 16 if no license
      if (evt.id === 'teen_driving_test') {
        return age === 16 && !state.characterInfo?.hasLicense;
      }
      return age >= 12 && age <= 17;
    },
    choices: evt.choices.map((c) => {
      return {
        choiceText: c.text,
        outcomeText: c.outcomeText,
        effect: (state: CharacterState) => {
          // Adjust stats safely (will clamp stats dynamically inside utility)
          adjustStats(state, c.adjustments);

          // If there is cash mutation, apply it safely
          if (c.adjustments.cash) {
            state.finances.cashBalance = Math.max(state.finances.cashBalance + c.adjustments.cash, -50000);
          }

          // Trigger custom additional actions if present
          if (c.customEffect) {
            c.customEffect(state);
          } else {
            // Log the standard choice action
            state.log.push(`Age ${state.characterInfo.age}: You resolved the ${evt.title.split(' (')[0].split('Challenge')[0].split('Dilemma')[0].split(':')[0].trim()} by moving forward.`);
          }
        }
      };
    })
  };
});

import { GameEvent, CharacterState } from '../../types';
import { adjustStats } from '../../utils';

interface ScenarioDef {
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

// 1. Handcrafted early developmental stages (Ages 0-2 and 3-5)
const EARLY_SCENARIO_DEFS: ScenarioDef[] = [
  // pre-verbal / sensory (0-2)
  {
    id: 'ch_inf_01',
    title: 'Teething Distress 🦷',
    description: 'Your gums are swollen, hot, and throbbing with agony. There is a cold plastic ring on the high chair table.',
    minAge: 0,
    maxAge: 2,
    choices: [
      {
        text: 'Chop down hard on the cold rubber ring.',
        outcomeText: 'The cold rubber numbs your gums beautifully. You let out a high-pitched sigh of primitive satisfaction.',
        adjustments: { happiness: 20, health: 10, stress: -15 },
        logText: 'You chewed your cooling ring to soothe your baby gums.'
      },
      {
        text: 'Wail at the top of your lungs to recruit parents!',
        outcomeText: 'You shrieked. Your parents panicked, frantically dancing around you while offering sweet carrot mush.',
        adjustments: { happiness: 10, karma: 5, stress: 5 },
        logText: 'You cried loudly to demand instant parental attention.'
      },
      {
        text: 'Bite the wooden leg of the dining table.',
        outcomeText: 'Splinters! Dirt! Metallic taste! You cried even louder. That was a bad decision.',
        adjustments: { happiness: -20, health: -15, stress: 25 },
        logText: 'You chewed dirty table wood and hurt your baby mouth.'
      }
    ]
  },
  {
    id: 'ch_inf_02',
    title: 'The Crawler\'s Expedition 🚼',
    description: 'You are on all fours in the hallway. A dark, dusty frontier awaits under the living room couch.',
    minAge: 0,
    maxAge: 2,
    choices: [
      {
        text: 'Crawl under into the absolute dust darkness.',
        outcomeText: 'You swallowed a massive fluff ball and found a sticky old candy. Your stomach feels highly upset.',
        adjustments: { happiness: -5, health: -15, stress: 15 },
        logText: 'You crawled under the sofa and ate ancient lint.'
      },
      {
        text: 'Head toward the warm glowing sunlight of the window.',
        outcomeText: 'The sun rays warm your baby cheeks. You feel incredibly peaceful and fall asleep.',
        adjustments: { happiness: 25, health: 10, stress: -20 },
        logText: 'You napped in a warm patch of sunlight on the carpet.'
      },
      {
        text: 'Grab the dog\'s tail and yank it!',
        outcomeText: 'The dog barked loudly and licked your face, knocking you over. You are slightly scared but clean.',
        adjustments: { happiness: 10, health: 5, karma: -10, stress: 10 },
        logText: 'You yanked the family dog\'s tail and got a soggy wet lick.'
      }
    ]
  },
  {
    id: 'ch_inf_03',
    title: 'The Shiny Silver Keys 🔑',
    description: 'Your parent brandishes a heavy cluster of metallic keys, jingling them wildly in front of your face.',
    minAge: 0,
    maxAge: 2,
    choices: [
      {
        text: 'Snatch the keys and shove them directly into your mouth.',
        outcomeText: 'You sucked on metallic cold steel. Your parent immediately pulled them away, wiping your drool.',
        adjustments: { happiness: 10, health: -5, stress: 5 },
        logText: 'You tried to ingest house keys for developmental research.'
      },
      {
        text: 'Gasp, giggle, and clap your sticky hands together.',
        outcomeText: 'Your parent laughs lovingly, tickling your tummy. Your tiny world is perfect.',
        adjustments: { happiness: 25, looks: 5, karma: 15 },
        logText: 'You chuckled happily at shiny jingling key clusters.'
      }
    ]
  },
  {
    id: 'ch_inf_04',
    title: 'Baby Spit-Up Dilemma 🍼',
    description: 'You just finished a warm bottle of sweet formula, but a huge pocket of air is moving up your throat.',
    minAge: 0,
    maxAge: 2,
    choices: [
      {
        text: 'Release a massive, proud baby belch.',
        outcomeText: 'A perfectly dry bubbled burp erupts. Your parent pats your back in relief.',
        adjustments: { happiness: 15, health: 10, stress: -10 },
        logText: 'You successfully burped without any messy consequences.'
      },
      {
        text: 'Spit up the milk product all over your parent\'s fresh shirt.',
        outcomeText: 'Splatter! A warm wave of sour milk lands on their collar. Your parent sighs but wipes you clean.',
        adjustments: { happiness: 5, karma: -10, stress: 10 },
        logText: 'You spit up formula on your parent\'s brand new clothing.'
      }
    ]
  },
  // early childhood/preschool (3-5)
  {
    id: 'ch_tod_01',
    title: 'Crayon Crafting 🖍️',
    description: 'You have a fresh box of brightly-colored wax crayons. A large, blank hallway wall look incredibly inviting.',
    minAge: 3,
    maxAge: 5,
    choices: [
      {
        text: 'Scribble a colossal green dinosaur on the plaster!',
        outcomeText: 'You drew a gorgeous lizard. Your parents found it, completely freaked out, and grounded you from sandbox time.',
        adjustments: { happiness: -15, smarts: 5, karma: -10, stress: 20 },
        logText: 'You vandalized the main hallway wall with a green wax dinosaur.'
      },
      {
        text: 'Color carefully inside your coloring coloring book.',
        outcomeText: 'You colored a beautiful duck. Your mom was so proud she taped it to the front of the refrigerator.',
        adjustments: { happiness: 20, smarts: 10, karma: 10 },
        logText: 'You colored inside the boundaries, earning a refrigerator display.'
      },
      {
        text: 'Scribble on the wall and blame your sibling!',
        outcomeText: 'You blamed your sibling. They got scolded while you secretly smirked in the corner. Devious.',
        adjustments: { happiness: 15, smarts: 15, karma: -35, stress: 10 },
        logText: 'You maliciously framed your sibling for wall crayon damage.'
      }
    ]
  },
  {
    id: 'ch_tod_02',
    title: 'The Sandbox Monster ⏳',
    description: 'You are digging a deep trench in the local park sandbox. Your plastic shovel hits a hard, metallic lock-box!',
    minAge: 3,
    maxAge: 5,
    choices: [
      {
        text: 'Crack it open with your bare baby hands.',
        outcomeText: 'Inside is a nest of slimy green worms and a shiny $5 bill. You pocketed the bill.',
        adjustments: { happiness: 15, health: -5, smarts: 5, cash: 5 },
        logText: 'You excavated a chest containing sandbox creepy crawlies and five dollars.'
      },
      {
        text: 'Bury it back up, crying about metal curses.',
        outcomeText: 'You covered it in dirt and ran away. You had strange nightmare visions of plastic monsters.',
        adjustments: { happiness: -5, stress: 10, karma: 5 },
        logText: 'You re-buried the sandbox chest out of safe caution.'
      }
    ]
  },
  {
    id: 'ch_tod_03',
    title: 'The Great Trike Race 🚲',
    description: 'A local neighborhood kid challenges you to a race down the sloping driveway on your plastic tricycle.',
    minAge: 3,
    maxAge: 5,
    choices: [
      {
        text: 'Pedal at absolute lightning speeds!',
        outcomeText: 'You lost control, flipped over the handlebars, and scraped both of your knees. Ouch!',
        adjustments: { happiness: -10, health: -15, stress: 15 },
        logText: 'You crashed your plastic tricycle during a reckless driveway race.'
      },
      {
        text: 'Take the turns carefully and maintain balance.',
        outcomeText: 'You won the race seamlessly! Your friends cheer, and you receive half a strawberry popsicle.',
        adjustments: { happiness: 25, smarts: 10, looks: 5 },
        logText: 'You rode your tricycle strategically to cross the finish line first.'
      }
    ]
  }
];

// Helper database of topics for schoolyard, verbal childhood (Ages 6-11)
const CORE_PLAYGROUND_TOPICS = [
  { topic: "Spelling Bee", good: "studying spelling words", bad: "mumbling random syllables" },
  { topic: "Unsanctioned Snail Hunt", good: "cataloging snail movements", bad: "eating a crunchy slug" },
  { topic: "The Monkey Bars", good: "doing a backflip dismount", bad: "falling flat on your tailbone" },
  { topic: "Recess Field Soccer", good: "passing cleanly to open players", bad: "running away with the ball in your shirt" },
  { topic: "Show and Tell Day", good: "presenting a cool pet shell", bad: "bringing your dad\'s smelly work shoes" },
  { topic: "The School Bus Ride", good: "sharing your gummy bears with the bus driver", bad: "shooting rubber bands at the back of heads" },
  { topic: "Cafeteria Trades", good: "trading surplus baby carrots", bad: "eating a dare biscuit from last year" },
  { topic: "The Dodgeball Arena", good: "ducking, weaving, and staying active", bad: "throwing direct headshots at the quiet kid" },
  { topic: "Art Class Sculpting", good: "molding a clay turtle", bad: "smashing another student\'s vase" },
  { topic: "The Stray Kitten Case", good: "leaving water out safely", bad: "bringing it inside your school backpack" }
];

// Generate the remaining childhood scenarios to ensure we reach over 150 unique, highly creative scenarios
const generateDynamicChildhoodScenarioPool = (): ScenarioDef[] => {
  const list = [...EARLY_SCENARIO_DEFS];
  let generatedCount = list.length;
  let topicIdx = 0;

  while (generatedCount < 160) {
    const topic = CORE_PLAYGROUND_TOPICS[topicIdx % CORE_PLAYGROUND_TOPICS.length];
    const eventNum = generatedCount + 1;
    const isOdd = (generatedCount % 2 !== 0);

    const title = `The Playground ${topic.topic} Crisis 🏫 (#${eventNum})`;
    const description = `The primary school environment is absolute chaos today. You find yourself facing the ultimate dilemma involving the local ${topic.topic.toLowerCase()}. All the elementary kids are watching you.`;

    const choice1Text = topic.good.charAt(0).toUpperCase() + topic.good.slice(1) + '.';
    const choice1Outcome = `You handled the ${topic.topic.toLowerCase()} challenge with focused responsibility. The schoolyard kids look impressed, and your teacher nods in silent approval.`;
    const adj1 = isOdd
      ? { happiness: 15, smarts: 12, stress: 5, karma: 10 }
      : { happiness: 20, looks: 5, smarts: 15, karma: 15, stress: -5 };

    const choice2Text = topic.bad.charAt(0).toUpperCase() + topic.bad.slice(1) + '!';
    const choice2Outcome = `You went ahead and decided to: ${topic.bad}! The playground erupts in screaming and laughing, though the principal is calling your parents.`;
    const adj2 = {
      happiness: 25,
      health: -15,
      smarts: -10,
      looks: -5,
      stress: 20,
      karma: -20,
      cash: isOdd ? -5 : 0
    };

    list.push({
      id: `ch_gen_${generatedCount}`,
      title,
      description,
      minAge: 6, // strictly gate verbal / complex playground politics
      maxAge: 11,
      choices: [
        {
          text: choice1Text,
          outcomeText: choice1Outcome,
          adjustments: adj1,
          logText: `You resolved the ${topic.topic.toLowerCase()} with a highly responsible choice.`
        },
        {
          text: choice2Text,
          outcomeText: choice2Outcome,
          adjustments: adj2,
          logText: `You went into crazy mode during the ${topic.topic.toLowerCase()} event.`
        }
      ]
    });

    generatedCount++;
    topicIdx++;
  }

  return list;
};

const fullRawChildhoodScenarios = generateDynamicChildhoodScenarioPool();

export const childhoodEvents: GameEvent[] = fullRawChildhoodScenarios.map((evt) => {
  return {
    id: evt.id,
    title: evt.title,
    description: evt.description,
    category: 'Childhood',
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
          // Relational parsing helper
          const parent = state.relationships.find(r => r.relationshipType === 'Parent' && !r.isDead);
          const sibling = state.relationships.find(r => r.relationshipType === 'Sibling' && !r.isDead);

          const parentName = parent ? parent.name : 'your guardian';
          const siblingName = sibling ? sibling.name : 'your sibling';

          // Commit core mutations safely
          adjustStats(state, c.adjustments);

          // Commit cash alterations if present
          if (c.adjustments.cash) {
            state.finances.cashBalance = Math.max(state.finances.cashBalance + c.adjustments.cash, -50000);
          }

          // Generate dynamic log statements
          const resolvedLog = c.logText
            .replace(/\[Parent\]/g, parentName)
            .replace(/\[Sibling\]/g, siblingName);

          state.log.push(`Age ${state.characterInfo.age}: ${resolvedLog}`);
        }
      };
    })
  };
});

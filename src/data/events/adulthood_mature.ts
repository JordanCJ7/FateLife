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

// 1. Mature Gated Career Scenarios (15 Gated Events)
const MATURE_GATED_EVENTS: MatureScenarioDef[] = [
  {
    id: 'mat_corp_01',
    title: 'Workplace: CEO Retirement Succession Plan 👔',
    description: 'The board demands you select a successor. A brilliant, humble junior vs. your golf buddy who represents deep investor portfolios.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'CEO of Tech Startup',
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
        logText: 'You appointed a well-connected golf buddy as CEO successor for private bonus yields.'
      }
    ]
  },
  {
    id: 'mat_corp_02',
    title: 'Workplace: Landmark Lawsuit Defense ⚖️',
    description: 'A multi-state intellectual property lawsuit goes to final arguments. Your defense will define your corporate legal legacy.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Corporate Attorney',
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
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Plastic Surgeon',
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
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Apprentice Plumber',
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

// Topics for mature adulthood transitions (Ages 46-60)
const MATURE_GENERAL_TOPICS = [
  { theme: "The Mid-Life Muscle Car", good: "restoring a rusty vintage bicycle chassis", bad: "buying a blazing red twin-turbo motorboat using family cash reserves" },
  { theme: "Aging Parent Care", good: "building a comfortable garden cottage extension", bad: "ignoring their phone calls to bypass tedious medical complaints" },
  { theme: "Kid\'s College Tuition", good: "paying their campus bills in full", bad: "coaxing them to join deep deep sea oil rigs" },
  { theme: "The Colonoscopy Check", good: "submitting to standard clinical fiberoptic checks", bad: "insisting eating ginger cookies is an effective substitute" },
  { theme: "Backyard Garden Landscaping", good: "planting clean wild flowers and watering slow lawns", bad: "ordering dynamic cement mixers to build giant concrete statues" },
  { theme: "The Reading Glasses Crisis", good: "buying highly professional spectacles", bad: "squinting heavily at tiny phone menus, getting tension headaches" },
  { theme: "High Blood Pressure Alert", good: "cutting sodium salt levels and doing brisk walks", bad: "fueling midnight stress with heavy double-pattys" },
  { theme: "Reconnection and reunion", good: "hosting warm family dinner gatherings", bad: "bragging about antique collections" },
  { theme: "Retirement Vision", good: "mapping compound charts with advisors", bad: "putting high bets on unstable foreign casino schemes" }
];

const generateMatureAdulthoodPool = (): MatureScenarioDef[] => {
  const resultList = [...MATURE_GATED_EVENTS];
  let count = resultList.length;
  let topicIdx = 0;

  while (count < 100) {
    const topic = MATURE_GENERAL_TOPICS[topicIdx % MATURE_GENERAL_TOPICS.length];
    const eventIdNum = count + 1;
    const isOdd = count % 2 !== 0;

    const title = `Mature Life: ${topic.theme} 👓 (#${eventIdNum})`;
    const description = `With your mature years setting in, priorities shift toward legacy, physiological preservation, and family obligations. You face a core dilemma regarding ${topic.theme.toLowerCase()}. Choice is destiny.`;

    const choice1Text = topic.good.charAt(0).toUpperCase() + topic.good.slice(1) + '.';
    const choice1Outcome = `You handled your ${topic.theme.toLowerCase()} with incredible elegance and patience. You feel like a true tribal elder.`;
    const adj1 = isOdd
      ? { happiness: 15, health: 10, smarts: 15, stress: -15, karma: 15, cash: -500 }
      : { happiness: 10, health: 15, smarts: 10, stress: -20, karma: 20 };

    const choice2Text = topic.bad.charAt(0).toUpperCase() + topic.bad.slice(1) + '!';
    const choice2Outcome = `You chosen: ${topic.bad}! The immediate adrenaline kick was highly entertaining, but your lungs burn and family members are looking at you with extreme concern.`;
    const adj2 = {
      happiness: 25,
      health: -20,
      smarts: -15,
      looks: -10,
      stress: 25,
      karma: -25,
      cash: isOdd ? -3000 : 0
    };

    resultList.push({
      id: `mature_gen_${count}`,
      title,
      description,
      choices: [
        {
          text: choice1Text,
          outcomeText: choice1Outcome,
          adjustments: adj1,
          logText: `You resolved your ${topic.theme.toLowerCase()} using calm, quiet wisdom.`
        },
        {
          text: choice2Text,
          outcomeText: choice2Outcome,
          adjustments: adj2,
          logText: `You acted erratically regarding your ${topic.theme.toLowerCase()}, sparking high mid-life tension.`
        }
      ]
    });

    count++;
    topicIdx++;
  }

  return resultList;
};

const rawMatureEvents = generateMatureAdulthoodPool();

export const adulthoodMatureEvents: GameEvent[] = rawMatureEvents.map((evt) => {
  return {
    id: evt.id,
    title: evt.title,
    description: evt.description,
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isRightAge = age >= 46 && age <= 60;
      if (!isRightAge) return false;

      // Double check career matching predicates
      if (evt.conditionChecker) {
        return evt.conditionChecker(state);
      }
      return true;
    },
    choices: evt.choices.map((c) => {
      return {
        choiceText: c.text,
        outcomeText: c.outcomeText,
        effect: (state: CharacterState) => {
          adjustStats(state, c.adjustments);

          if (c.adjustments.cash) {
            state.finances.cashBalance = Math.max(state.finances.cashBalance + c.adjustments.cash, -500000);
          }

          state.log.push(`Age ${state.characterInfo.age}: ${c.logText}`);
        }
      };
    })
  };
});

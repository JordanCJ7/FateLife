import { GameEvent, CharacterState } from '../../types';
import { adjustStats } from '../../utils';

interface YoungScenarioDef {
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
    logText: string;
  }[];
}

const YOUNG_HANDCRAFTED: YoungScenarioDef[] = [
  {
    id: 'young_flat_share',
    title: 'The Flat Share Audition 🏠',
    description: 'You are interviewing for a cheap room in a shared apartment. The housemates seem like quirky artists who burn sage and play acoustic guitar at 3:00 AM.',
    choices: [
      {
        text: 'Nod, smile, and pretend you love ambient deep throat singing.',
        outcomeText: 'You got the room! It is cheap, but the smell of herbal incense and non-stop sitar practice completely spikes your stress.',
        adjustments: { happiness: 10, stress: 15, cash: 1200 },
        logText: 'You moved into a quirky flat share with acoustic guitar artists.'
      },
      {
        text: 'Insist on strict house rules, silent hours, and clear chore charts.',
        outcomeText: 'They stare at you like you are a corporate spy and slam the door. You have to buy a more expensive studio flat instead.',
        adjustments: { happiness: -15, stress: 10, smarts: 5, cash: -1500 },
        logText: 'You got rejected from a cheap house share for being too uptight.'
      }
    ]
  },
  {
    id: 'young_student_debts',
    title: 'The Student Loan Offer 📜',
    description: 'The bank officer slides a dense 50-page document across the desk: "Sign here for immediate financial relief. Low introductory rates!"',
    choices: [
      {
        text: 'Sign it blindly. Free money today feels amazing!',
        outcomeText: 'You received a quick $10,000 cash injection! However, your interest rates are predatory, and future anxiety looms.',
        adjustments: { happiness: 25, cash: 10000, stress: 20, karma: -5 },
        logText: 'You signed a high-interest student debt agreement for quick liquidity.'
      },
      {
        text: 'Refuse the credit line and work nights at the gas station.',
        outcomeText: 'You stay out of debt, but working 40 hours while studying completely demolishes your looks and energy.',
        adjustments: { happiness: -20, health: -15, looks: -10, smarts: 15 },
        logText: 'You chose to pay tuition out-of-pocket through sleep-depriving night shifts.'
      }
    ]
  }
];

// Topics for procedural young adulthood scenarios (Ages 18-25)
const YOUNG_TOPICS = [
  { theme: "College Lecture Sleep", good: "drinking double espresso shots and dictating notes", bad: "napping on the professor\'s desk podium" },
  { theme: "First Budget Cook", good: "boiling healthy lentil stews", bad: "eating raw instant ramen noodles dry with flavor powder" },
  { theme: "Library Crush", good: "politely asking to borrow their pencil", bad: "staring continuously through the study carrel gap" },
  { theme: "Laundry Crisis", good: "sorting cotton sheets and using low temperatures", bad: "mixing your red hoodie with everyone\'s clean white socks" },
  { theme: "Broke Christmas", good: "crafting custom hand-carved wood spoons", bad: "skipping family reunions entirely to avoid gifting questions" },
  { theme: "Gym Membership", good: "joining the free neighborhood jogging club", bad: "signing a binding 36-month ultra-premium gym lease" },
  { theme: "Garage Band Session", good: "practicing steady bass metronomes", bad: "turning the amplifier volume dial to absolute max" },
  { theme: "First Credit Card", good: "paying off balances in full every cycle", bad: "buying premium imported sneakers on credit" },
  { theme: "Alumni Meetup", good: "shaking hands and passing professional contact cards", bad: "bragging about imaginary crypto portfolios" },
  { theme: "Roommate Dirty Dishes", good: "leaving a friendly, sticky post-it note", bad: "stacking the dirty plates directly onto their bed pillow" }
];

const generateYoungAdulthoodPool = (): YoungScenarioDef[] => {
  const list = [...YOUNG_HANDCRAFTED];
  let count = list.length;
  let topicIdx = 0;

  while (count < 100) {
    const topic = YOUNG_TOPICS[topicIdx % YOUNG_TOPICS.length];
    const eventNum = count + 1;
    const isOdd = count % 2 !== 0;

    const title = `Young Life: ${topic.theme} 🎓 (#${eventNum})`;
    const description = `As a young adult making your first independent choices, you face a critical situation regarding your ${topic.theme.toLowerCase()}. This is the real world now.`;

    const choice1Text = topic.good.charAt(0).toUpperCase() + topic.good.slice(1) + '.';
    const choice1Outcome = `You handled your ${topic.theme.toLowerCase()} smoothly and responsibly. You feel extremely adult-like, even if your wallet is slightly lighter.`;
    const adj1 = isOdd
      ? { happiness: 10, smarts: 15, stress: 10, karma: 10, cash: -100 }
      : { happiness: 15, health: 10, smarts: 10, stress: -5, karma: 15 };

    const choice2Text = topic.bad.charAt(0).toUpperCase() + topic.bad.slice(1) + '!';
    const choice2Outcome = `You decided to: ${topic.bad}! Your peers are laughing, but your general stability took a massive hit. It was extremely messy.`;
    const adj2 = {
      happiness: 25,
      health: -15,
      smarts: -10,
      looks: -5,
      stress: 20,
      karma: -15,
      cash: isOdd ? -300 : 0
    };

    list.push({
      id: `young_gen_${count}`,
      title,
      description,
      choices: [
        {
          text: choice1Text,
          outcomeText: choice1Outcome,
          adjustments: adj1,
          logText: `You resolved your ${topic.theme.toLowerCase()} with a responsible approach.`
        },
        {
          text: choice2Text,
          outcomeText: choice2Outcome,
          adjustments: adj2,
          logText: `You chose a chaotic, risky path for your ${topic.theme.toLowerCase()}.`
        }
      ]
    });

    count++;
    topicIdx++;
  }

  return list;
};

const rawYoungEvents = generateYoungAdulthoodPool();

export const adulthoodYoungEvents: GameEvent[] = rawYoungEvents.map((evt) => {
  return {
    id: evt.id,
    title: evt.title,
    description: evt.description,
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 18 && age <= 25;
    },
    choices: evt.choices.map((c) => {
      return {
        choiceText: c.text,
        outcomeText: c.outcomeText,
        effect: (state: CharacterState) => {
          adjustStats(state, c.adjustments);

          if (c.adjustments.cash) {
            state.finances.cashBalance = Math.max(state.finances.cashBalance + c.adjustments.cash, -100000);
          }

          state.log.push(`Age ${state.characterInfo.age}: ${c.logText}`);
        }
      };
    })
  };
});

import { GameEvent, CharacterState, NPC, Disease } from '../../types';
import { adjustStats, MALE_FIRST_NAMES, FEMALE_FIRST_NAMES, formatCurrency } from '../../utils';

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

const SENIOR_TOPICS = [
  { theme: 'Bingo Hall Combat', good: 'holding your marker stamp cleanly and calling numbers nicely', bad: 'shoving senior chairs over during a critical five-way tie' },
  { theme: 'Memoir Writing Session', good: 'detailing authentic stories of historical local neighborhood libraries', bad: 'making up elaborate stories of your imaginary careers in national espionage' },
  { theme: 'Hearing Aid Dilemma', good: 'buying a high-end medical auditory system with ambient cancellation', bad: 'screaming "WHAT?!" at everyone who speaks to save cash' },
  { theme: 'The Garden Hose Rivalry', good: 'watering your roses inside your authorized property line', bad: 'spraying the neighbor\'s high-end pure-bred cat off your lawn' },
  { theme: 'The Smart Thermostat War', good: 'wearing three layered thick wool sweaters to save boiler gas', bad: 'cranking the boiler house heat to a sweltering 90 degrees Fahrenheit' },
  { theme: 'Bonsai Pruning Mission', good: 'clipping millimeter branches with surgical microscopic tools', bad: 'using giant, rusted hedge shears on a miniature Japanese cedar' },
  { theme: 'The Feeding Pigeons Hobby', good: 'spreading healthy raw sunflower seeds in local park benches', bad: 'dumping three stale whole loaves of moldy white bread on park pathways' },
  { theme: 'Stair-Lift Installation Matter', good: 'hiring licensed engineers to bolt a cozy mechanical seat rail', bad: 'attempting to slide down wooden handrails on a metal cookie sheet' },
  { theme: 'Mall Walking Tournament', good: 'pacing yourself nicely in modern orthopedic sneakers', bad: 'elbowing competitive elders to secure the free energy drink' },
  { theme: 'Antique Buffet Valuation', good: 'appraising historical wood furniture through museum experts', bad: 'painting the valuable 1800s cherry wood cabinet in hot pink neon' },
  { theme: 'Retirement Cruise Boarding', good: 'booking an elegant state room package with quiet reading lounges', bad: 'doing dangerous belly-flops into crowded hot tub zones' },
  { theme: 'Local Library Volunteering', good: 'gently cataloging rare historical fiction maps', bad: 'hiding books under cushions to prevent kids from finding them' },
  { theme: 'Prescription Coordination', good: 'sorting morning pills inside safe daily plastic grids', bad: 'gulping random blue capsules while drinking bitter black coffee' },
  { theme: 'The Porch Chair Patrol', good: 'drinking cold lemonade while greeting passing neighbors', bad: 'shaking your heavy cane at passing delivery scooters' },
  { theme: 'Senior Center Chess Duel', good: 'sacrificing your queen for elegant, logical checkmates', bad: 'knocking the wooden chess table over when your king gets trapped' }
];

const generateVastSeniorPool = (): SeniorScenarioDef[] => {
  const list = [...HANDCRAFTED_SENIOR_EVENTS];
  let currentCount = list.length;
  let topicIndex = 0;

  while (currentCount < 205) {
    const topic = SENIOR_TOPICS[topicIndex % SENIOR_TOPICS.length];
    const eventNum = currentCount + 1;
    const isOdd = currentCount % 2 !== 0;

    const title = `Golden Years: ${topic.theme} 👵 (#${eventNum})`;
    const description = `With your senior years advancing, your daily schedule revolves around comfort, neighborhood affairs, and preserving your health. You face a direct choice regarding the local ${topic.theme.toLowerCase()}.`;

    const choice1Text = topic.good.charAt(0).toUpperCase() + topic.good.slice(1) + '.';
    const choice1Outcome = `You handled the ${topic.theme.toLowerCase()} scenario with beautiful elder grace and wisdom. Neighbors look at you with quiet respect.`;
    const adj1 = isOdd
      ? { happiness: 15, health: 10, stress: -15, karma: 15, cash: -150 }
      : { happiness: 10, smarts: 15, health: 5, stress: -10, karma: 25 };

    const choice2Text = topic.bad.charAt(0).toUpperCase() + topic.bad.slice(1) + '!';
    const choice2Outcome = `You chose: ${topic.bad}! The immediate adrenaline rush reminds you of your college years, but your arthritis is screaming and the community association is writing letters.`;
    const adj2 = {
      happiness: 25,
      health: -20,
      smarts: -15,
      looks: -5,
      stress: 25,
      karma: -25,
      cash: isOdd ? -1000 : 0
    };

    list.push({
      id: `senior_gen_${currentCount}`,
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

  return list;
};

const rawSeniorEvents = generateVastSeniorPool();

export const seniorLifeEvents: GameEvent[] = rawSeniorEvents.map((evt) => {
  return {
    id: evt.id,
    title: evt.title,
    description: evt.description,
    category: 'Adulthood', // map to standard category for compatibility
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isRightAge = age >= 61;
      if (!isRightAge) return false;

      // check custom condition checker
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

          if (c.customEffect) {
            c.customEffect(state);
          } else {
            const shortTitle = evt.title.split(' (')[0].split('👵')[0].trim();
            state.log.push(`Age ${state.characterInfo.age}: You resolved the ${shortTitle} situation.`);
          }
        }
      };
    })
  };
});

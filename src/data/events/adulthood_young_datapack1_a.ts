import { GameEvent, CharacterState } from '../../types';
import { adjustStats } from '../../utils';

export const youngDataPack1AEvents: GameEvent[] = [
  // ==========================================================================
  // SECTION 1: CORPORATE & INTERNSHIP OFFICE POLITICS (ITEMS 1 - 25)
  // ==========================================================================
  {
    id: 'yp1_corp_01',
    title: 'The Stolen Lunchbox 🍱',
    description: 'You find your handcrafted teriyaki salmon bento missing from the breakroom. A senior strategist is eating it at their desk.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Label their computer monitor with bright notes of salmon thievery.',
        outcomeText: 'You plaster their monitor with loud, neon posts. The office snickers while HR schedules a neutral discussion.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 15, looks: -5, karma: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Plastered post-its on a colleague\'s desk over a stolen lunchbox.`);
        }
      },
      {
        choiceText: 'Confront the analyst directly and request a free lunch voucher.',
        outcomeText: 'You stand tall. They apologize profusely and buy you a premium nearby salad to settle the food dispute.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 10, smarts: 10, stress: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Confronted lunch thief calmly, securing a hot meal exchange.`);
        }
      },
      {
        choiceText: 'Retreat quietly to your office cubicle, chewing dry saltine crackers instead.',
        outcomeText: 'You stay safe but starve quietly. Your stomach rumbles and your evening typing speed degrades.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: -15, stress: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Remained silent about your stolen bento, lunching on crusty saltines.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_02',
    title: 'The Uncredited Presentation Slide 📊',
    description: 'Your manager displays your detailed market research slides to the executive board, claiming complete credit for your data work.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Interrupt the executive board meeting to prove your authorship.',
        outcomeText: 'The directors gasp. You prove ownership, but your manager looks ready to assign you midnight chores.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: 25, happiness: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Disrupted a board presentation to claim ownership of slide files.`);
        }
      },
      {
        choiceText: 'Ask the director for a private chat afterwards regarding your contribution.',
        outcomeText: 'They appreciate your quiet professionalism. Your contribution is saved in the board records.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: -5, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Claimed slide credit politely in a private post-meeting sitdown.`);
        }
      },
      {
        choiceText: 'Shrug it off and use the incident as future leverage for promotions.',
        outcomeText: 'You swallow the temporary shame. Your manager owes you internally, though you feel moderately invisible.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: -10, stress: 10, karma: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Let your manager steal slide credits, hoarding the incident for future leverage.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_03',
    title: 'The Coffee Machine Jam ☕',
    description: 'The giant office espresso machine is leaking brown sludge and grinding loudly. Ten tired analysts are waiting behind you.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Dismantle the outer grinders to clean the blocked beans manually.',
        outcomeText: 'You adjust the gears with key codes. Excellent! The crowd cheers as warm espresso pours smoothly.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, looks: 5, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Saved the office coffee routine by repairing a jammed grinder.`);
        }
      },
      {
        choiceText: 'Walk away quickly and pretend the machine was already broken.',
        outcomeText: 'You run down the fire exit stairs. The next person gets splashed with foam, and you remain safe.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -10, karma: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Sneaked away from a self-caused espresso machine jam.`);
        }
      },
      {
        choiceText: 'Buy a round of iced lattes from the bakery down the street.',
        outcomeText: 'You spend sixty dollars. The analysts are thrilled, naming you the coffee champion of the department.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 15, stress: -10, karma: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 60, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Cooled down the office tension with external boutique lattes (-$60).`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_04',
    title: 'The Sneaky Freelance Gig 🤫',
    description: 'During a slow corporate Tuesday, a competitor offers you a small, secret freelance consulting gig for eight hundred dollars.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Complete the freelance files on your employer\'s laptop during lunch.',
        outcomeText: 'You complete the code. You secure the cash, but you jump nervously whenever you hear office footsteps.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 25, karma: -20 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 800, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Handled secret freelance projects using company computers (+$800).`);
        }
      },
      {
        choiceText: 'Do the gig late at night on your personal computer only.',
        outcomeText: 'You finish the slides at 3:00 AM, drinking cold energy drinks. You gather the cash but look exhausted.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -10, stress: 15, happiness: 10 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 800, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Performed moonlight freelance tasks on your personal laptop (+$800).`);
        }
      },
      {
        choiceText: 'Decline the gig to protect your corporate employment contracts.',
        outcomeText: 'You sleep beautifully. Your corporate records remain completely pristine, bypassing security alerts.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, karma: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Rejected competitor consulting requests to preserve employment contracts.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_05',
    title: 'The Mandatory Team Dinner 🍕',
    description: 'The department plans a mandatory karaoke and pizza team-bonding night. You are exhausted and want to sit home in silence.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Attend the dinner, singing loud classic rock songs with the managers.',
        outcomeText: 'Your throat hurts, but the vice-president loves your energy! You gain massive office favor.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 15, stress: 15, looks: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Sang classic rock hits with the managers at mandatory karaoke night.`);
        }
      },
      {
        choiceText: 'Invent a highly believable medical migraine excuse and sleep early.',
        outcomeText: 'You stay home in absolute tranquility. You dodge the terrible voices but miss the promotion discussions.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -20, happiness: 10, smarts: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Invented a severe headache to bypass company team-bonding nights.`);
        }
      },
      {
        choiceText: 'Show up for exactly twenty minutes, then slip out the backdoor.',
        outcomeText: 'The classic "Irish goodbye". You are seen on arrival, then escape home to read your book in absolute peace.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 10, stress: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Commited a stealth exit halfway through the executive dinner.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_06',
    title: 'The Desk Toy Overload 🧸',
    description: 'The employee from the adjacent cubicle covers their shared partition with seventy squeaking, glowing anime plastic toys.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Filing an anonymous noise and distraction notice with HR services.',
        outcomeText: 'HR sweeps the toys away in gray bin boxes. Your desk is quiet, but your coworker glowers at you daily.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -10, karma: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Requested HR removals of a coworker\'s plastic toy array.`);
        }
      },
      {
        choiceText: 'Confront them directly, suggesting a partial plastic toy disarmament.',
        outcomeText: 'They agree to remove the battery-powered ones. You preserve office friendships while reducing high squeaks.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: -5, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Negotiated a toy settlement with your cubicle neighbor.`);
        }
      },
      {
        choiceText: 'Add seventy medieval knight figures on your side to declare war.',
        outcomeText: 'Your cubicle boundary resembles a massive display. Security stops by, telling both of you to clear the desks.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 20, looks: -10, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Declared desk figure wars with knights against plastic anime toys.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_07',
    title: 'The Heavy Rain Umbrella Hunt ☂️',
    description: 'A sudden torrential thunderstorm breaks out at 5:00 PM. The executive umbrella rack is unguarded in the reception hall.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Steal the heavy silk umbrella belonging to the senior branch manager.',
        outcomeText: 'You walk home beautifully dry. The next morning, security watches CCTV logs and reprimands you.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: -5, karma: -25, stress: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Caught taking the branch manager\'s silk umbrella during storms.`);
        }
      },
      {
        choiceText: 'Drench your entire wool suit hiking home in the freezing downpour.',
        outcomeText: 'You catch a bad flu, sneezing all evening, but your career and conscience remain absolutely dry.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, happiness: -10, karma: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Braved heavy rains with zero umbrella protection, catching the flu.`);
        }
      },
      {
        choiceText: 'Settle down in your office chair and write code until the storm clears.',
        outcomeText: 'You complete three extra spreadsheets. Your directors spot your late lantern, writing a glowing review.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: 10, happiness: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Utilized high storms to complete bonus spreadsheet metrics.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_08',
    title: 'The Startup Equity Pitch 🪙',
    description: 'The founders of a hyper-growth tech garage approach you, asking you to swap your steady salary for startup stock options.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Accept the equity, betting your career on their software platform.',
        outcomeText: 'The value fluctuates wildly. Your daily anxiety goes way up, but your industrial mind is highly stimulated.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 25, happiness: -5 });
          s.finances.annualSalary = Math.round(s.finances.annualSalary * 0.4);
          s.log.push(`Age ${s.characterInfo.age}: Swapped standard pay bounds for volatile tech startup stock.`);
        }
      },
      {
        choiceText: 'Reject the offer, retaining stable cash payouts for peace of mind.',
        outcomeText: 'You maintain your comfortable bank deposits, sleeping happily while the startup struggle unfolds elsewhere.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Preserved traditional salary bounds, bypassing tech startup risks.`);
        }
      },
      {
        choiceText: 'Demand a hybrid contract retaining eighty percent salary with minor stocks.',
        outcomeText: 'An elegant deal! The developers agree, protecting your monthly ledger while keeping options open.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: -5, happiness: 15 });
          s.finances.annualSalary = Math.round(s.finances.annualSalary * 0.85);
          s.log.push(`Age ${s.characterInfo.age}: Structured a hybrid salary-equity contract with startup founders.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_09',
    title: 'The Stiff Neck Epidemic 💻',
    description: 'Your cheap corporate chair keeps your posture highly bent. Your neck starts popping whenever you turn to look at coworkers.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Buy an expensive ergonomic carbon-fiber spinal seat using personal funds.',
        outcomeText: 'You spend six hundred dollars. Your spine settles into perfect comfort and your fatigue disappears.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 20, happiness: 15, stress: -15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 600, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Purchased custom carbon spinal seats to correct corporate fatigue (-$600).`);
        }
      },
      {
        choiceText: 'Construct a makeshift standing desk of paper files and printer boxes.',
        outcomeText: 'Your cubicle looks hilarious, but the high platform improves your bone health and prompts curiosity.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 10, looks: -5, smarts: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Hand-built a functional standing desk out of printer paper boxes.`);
        }
      },
      {
        choiceText: 'Ignore the popping and continue slouched over your glowing screen.',
        outcomeText: 'Your shoulders freeze. You develop chronic aches, requiring hot massage packs to function.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -20, happiness: -10, stress: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Suffered serious neck stiffening from slouching over glowing monitors.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_10',
    title: 'The Executive Dress-Code Memo 👔',
    description: 'HR announces a strict new formal policy: zero soft athletic shoes or flannel fabrics allowed on commercial floor blocks.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Acquire premium leather Oxford boots and tailored gray shirts.',
        outcomeText: 'You look extremely sharp. Designers praise your style, though your feet are slightly sore from tight leather.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 25, happiness: 10, stress: 5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 450, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Bought luxury leather Oxfords to hit HR clothing guidelines (-$450).`);
        }
      },
      {
        choiceText: 'Flout the memo, wearing your favorite retro canvas shoes regardless.',
        outcomeText: 'The office manager pulls you aside for warnings. You look highly cool, but critical eyes are watching.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 10, stress: 15, karma: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Ignored dress policies to wear vintage canvas shoes during briefings.`);
        }
      },
      {
        choiceText: 'Politely petition HR to allow casual wear on hot summer Fridays.',
        outcomeText: 'A brilliant administrative victory! They compromise on dry linen shoes, boosting local morale.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: -10, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Successfully championed summer casual Friday revisions with HR.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_11',
    title: 'The Stolen Desk Chair 🪑',
    description: 'You return from a quick morning coffee run to find your favorite high-comfort adjustable mesh chair replaced with a squeaky stool.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Sneak into the marketing department at 6:00 PM to steal it back.',
        outcomeText: 'You roll your favorite seat home in the shadows. Your posture is saved, though you feel highly stealthy.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 15, stress: 10, karma: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Reclaimed your mesh chair through a midnight marketing floor heist.`);
        }
      },
      {
        choiceText: 'Complain with the facilities administrator to secure a fresh chair shipment.',
        outcomeText: 'They draft a shipping order. You are stuck with the squeaky wooden stool for a full week, but remain honest.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -5, stress: 10, karma: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Filed facility requests to swap out a stolen office seat.`);
        }
      },
      {
        choiceText: 'Adopt the squeaky stool as a balance-training exercise in active sitting.',
        outcomeText: 'You balance on the wood, working your core. Your lower back gets strong, though coworkers stare.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, smarts: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Retained the wooden stool to practice dynamic balance sitting.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_12',
    title: 'The Overheard Mergers Gossip 🤫',
    description: 'While inside the executive bathroom, you overhear two directors discussing a secret, major corporate acquisition project.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Invest your personal savings in the target competitor\'s stocks.',
        outcomeText: 'The transaction is highly illegal inside corporate codes. The acquisition succeeds, but you worry about regulatory audits.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: 30, karma: -35 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 5000, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Acted on illegal corporate bathroom gossip to secure stock gains (+$5,000).`);
        }
      },
      {
        choiceText: 'Keep the secret completely locked inside your thoughts.',
        outcomeText: 'You focus on your assignments. Your moral files are perfect and you avoid complex financial trapdoors.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -10, karma: 20 });
          s.log.push(`Age ${s.characterInfo.age}: Kept overheard executive acquisition notes completely secret.`);
        }
      },
      {
        choiceText: 'Whisper the gossip to colleagues over cold drafts at the bar.',
        outcomeText: 'The office rumor mill goes wild! You are the focal point of gossip, but HR initiates investigations.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 10, stress: 20, looks: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Shared bathroom gossip over beers, starting corporate rumors.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_13',
    title: 'The Office Microwave Incident 🐟',
    description: 'A coworker heats a highly aromatic platter of aged cod fish in the breakroom microwave, choking out your floor.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Tack a large custom sign on the microwave banning sea thievery.',
        outcomeText: 'The sign warns against toxic fish preparation. Morale rises, though the culprit looks ashamed.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 10, stress: -5, smarts: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Mounted a funny kitchen warning about heating fish blocks.`);
        }
      },
      {
        choiceText: 'Flee the building and work in the chilly garden park block.',
        outcomeText: 'You sit on a cold benches under lime trees. Your lungs are clear, but your hands are freezing.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -5, stress: -10, happiness: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Rescued your sinuses by working outside in the park lawns.`);
        }
      },
      {
        choiceText: 'Confront them directly with a tin of heavy breath mint candies.',
        outcomeText: 'You present the mints. They laugh nervously and open the windows, cleansing the shared floor air.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 5, karma: 15, stress: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Defused breakroom fish smog with hand-selected throat mints.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_14',
    title: 'The Over-Ambitious Intern 🏃‍♂️',
    description: 'Your summer intern begins working sixteen-hour days, leaving critical reviews of your work in public slack channels.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Assign them eighty binders of manual paper auditing to slow them down.',
        outcomeText: 'They drown in historical files. This halts their digital operations, though they look highly pale.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, karma: -20, smarts: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Sidelined an overzealous intern with retro filing stacks.`);
        }
      },
      {
        choiceText: 'Sit them down for coffee to help structure their ambition safely.',
        outcomeText: 'A wonderful chat. They appreciate your leadership, apologizing for their digital posturing.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 30, stress: -5, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Guided ambitious office interns towards healthy work patterns.`);
        }
      },
      {
        choiceText: 'Work eighteen-hour days to beat them on every single project.',
        outcomeText: 'You stay awake on dangerous caffeine doses. You outperform the intern, but you look highly gray.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -20, stress: 30, happiness: 10, looks: -10, smarts: 10, karma: 0 });
          s.log.push(`Age ${s.characterInfo.age}: Undertook extreme sleepless overtimes to beat ambitious interns.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_15',
    title: 'The Charity Run Challenge 🏃‍♀️',
    description: 'The senior executives request participants for the company-sponsored ten-kilometer mountain trail corporate run.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Train for months and win the entire mountain race with pride.',
        outcomeText: 'You cross the line first! The vice-president is stunned, offering a glorious team promotion.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 25, looks: 15, karma: 20 });
          s.finances.annualSalary = Math.round(s.finances.annualSalary * 1.15);
          s.log.push(`Age ${s.characterInfo.age}: Won the executive mountain run, earning high management favors.`);
        }
      },
      {
        choiceText: 'Sponsor the event with two hundred dollars from your desk.',
        outcomeText: 'You stay warm in your slippers. The team prints your badge on the backers list, avoiding dirty shoes.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 20, stress: -10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 200, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Funded the city corporate run as a financial donor (-$200).`);
        }
      },
      {
        choiceText: 'Decline participation completely to focus on your typing tasks.',
        outcomeText: 'You skip the mountain trails. Executives label you as a distant cubicle worker, but you keep clean knees.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, happiness: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Opted out of company races to keep work logs flowing.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_16',
    title: 'The AI Autopilot Trap 🤖',
    description: 'A coworker suggests processing all your weekly corporate reports through an unauthorized open artificial intelligence parser.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Automate your report stream, spending your extra hours playing golf.',
        outcomeText: 'A bug leaks confidential data streams! Informational security officers initiate immediate reviews.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 30, smarts: -15, looks: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Caught using unauthorized AI parsers on private records.`);
        }
      },
      {
        choiceText: 'Write all reports manually to guarantee pristine absolute accuracy.',
        outcomeText: 'You work long hours typing numbers. The reports are perfect, proving your elite attention to details.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 15, smarts: 20, karma: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Authored all department files manually, securing pure record metrics.`);
        }
      },
      {
        choiceText: 'Design a local secure python script that respects data security.',
        outcomeText: 'You compile a private, legal code. Your workload degrades beautifully while corporate intelligence rises.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, stress: -15, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Built a secure custom macro script to speed up office typing.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_17',
    title: 'The Out-of-Scope Task 🧹',
    description: 'Your director requests you to wash their private luxury sedan before an important client visit, completely outside your contract.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Wash the vehicle meticulously to show ultimate dedication to service.',
        outcomeText: 'You clean the leather rims. The director is thrilled, handing you a nice hundred-dollar tip.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: -5, karma: 15, happiness: 5 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 100, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Washed the branch manager's private sedan for quick tips.`);
        }
      },
      {
        choiceText: 'Refuse flatly and remind them of your actual technical job guidelines.',
        outcomeText: 'The director looks deeply red. He cancels your client seat, though coworkers respect your spine.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 15, smarts: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Refused out-of-scope manual chores requested by executive leaders.`);
        }
      },
      {
        choiceText: 'Hire a high-end mobile valeting service using your director\'s corporate card.',
        outcomeText: 'A brilliant administrative execution! The sedan sparkles, and you keep your focus on technical workflows.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Outsourced executive valeting tasks to professional cleaning crews.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_18',
    title: 'The Birthday Cake Collection 🎂',
    description: 'You are selected to coordinate collections for the office administrator\'s retirement cake. Several partners refuse to donate.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Fund the entire red velvet cake using your personal wallet.',
        outcomeText: 'You spend eighty dollars. The retiring admin is deeply touched, hugging you during the speeches.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 30, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 80, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Personally funded retirement cakes for the chief office administrator (-$80).`);
        }
      },
      {
        choiceText: 'Confront the non-paying managers in public kitchen chats.',
        outcomeText: 'You shame them into paying. The spreadsheet is cleared, but you gain some icy office glances.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 20, looks: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Shamed colleagues into contributing cake donations.`);
        }
      },
      {
        choiceText: 'Purchase a tiny, basic cupcake with a single candle instead.',
        outcomeText: 'A sad, funny sight. The retirement toast looks hilarious, but you saved your budget.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: -5, smarts: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Managed a minimal cupcake replacement for company retirement events.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_19',
    title: 'The Broken AC Crisis 🥵',
    description: 'The industrial air conditioner breaks on a sweltering summer Monday. The floor is ninety-five degrees Fahrenheit.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Work in your swim-trunks, ignoring all traditional office protocols.',
        outcomeText: 'Management is absolutely shocked! You are sent home immediately, which you enjoy in cold pool waters.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: -15, stress: -20, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Sent home after wearing tropical swim trunks to warm summer offices.`);
        }
      },
      {
        choiceText: 'Distribute organic ice cubes and frozen towels to your sweating team.',
        outcomeText: 'You become a local savior! Coworkers drape ice on their foreheads, praising your quick logistics.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 25, happiness: 20 });
          s.log.push(`Age ${s.characterInfo.age}: Handled hot warehouse office conditions by handing out ice towels.`);
        }
      },
      {
        choiceText: 'Bear the heat in your heavy formal wool suit to maintain perfect posture.',
        outcomeText: 'You sweating heavily, ruining your shirt collars and fainting slightly before lunchtime.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, stress: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Suffered minor heat fatigue while maintaining formal dress standards.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_20',
    title: 'The Erroneous CC Email 📧',
    description: 'You accidentally include the entire client distribution list in a highly sarcastic memo criticizing client budgets.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Recall the message instantly and claim a server virus infection.',
        outcomeText: 'A weak excuse, but forty percent of the clients believe your server system glitch explanation.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 10, stress: 20 });
          s.log.push(`Age ${s.characterInfo.age}: Attempted server viral excuses to recall sarcastic client mail.`);
        }
      },
      {
        choiceText: 'Draft an immediate, professional, handwritten apology to the clients.',
        outcomeText: 'Your raw honesty disarms the clients. Your directors respect your courage under extreme crisis.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: -5, karma: 20 });
          s.log.push(`Age ${s.characterInfo.age}: Resolved a major email routing error with professional apologies.`);
        }
      },
      {
        choiceText: 'Pack your desk files and walk out, letting the IT department investigate.',
        outcomeText: 'An absolute disaster. You are let go from the role with bad marks across executive boards.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: -25, stress: 40 });
          s.characterInfo.currentOccupation = 'Unemployed';
          s.finances.annualSalary = 0;
          s.log.push(`Age ${s.characterInfo.age}: Deserted your role under heavy email crises, ending up unemployed.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_21',
    title: 'The Office Gossip Pool 🗣️',
    description: 'A coworker shares a premium gossip folder asserting that the senior accountant is dating a lead competitor executive.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Add your own analytical notes to the shared spreadsheet document.',
        outcomeText: 'The file leaks globally. HR is highly annoyed, tracking your edits directly to your desk.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: -10, stress: 20, karma: -20 });
          s.log.push(`Age ${s.characterInfo.age}: Logged sarcastic remarks inside office rumor spreadsheets.`);
        }
      },
      {
        choiceText: 'Delete the gossip file from the corporate shared server.',
        outcomeText: 'You cleanse the servers. The accountant thanks you in tears, though the gossips call you boring.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 30, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Cleared malicious rumors from shared department networks.`);
        }
      },
      {
        choiceText: 'Mute the thread completely and continue formatting data blocks.',
        outcomeText: 'You avoid the social firestorms, maintaining perfect output while managers write positive cards.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Closed out social rumors to focus on data entry duties.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_22',
    title: 'The VIP Client Mixer 🥂',
    description: 'You are selected to represent your division at an elite rooftop cocktail mixer hosting the state\'s top retail investors.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Charm the main investor with a detailed analysis of local logistics.',
        outcomeText: 'They are deeply impressed! They write a letter to your CEO, securing you an immediate pay rise.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, looks: 10, happiness: 20 });
          s.finances.annualSalary = Math.round(s.finances.annualSalary * 1.12);
          s.log.push(`Age ${s.characterInfo.age}: Secured executive wage increments after impressing retail fund managers.`);
        }
      },
      {
        choiceText: 'Consume six glasses of expensive free cognac and jump in the rooftop pool.',
        outcomeText: 'The splash is legendary! Clients are highly entertained, but security escorts you from the hotel lobby.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -10, looks: -15, happiness: 25, stress: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Escorted by security after consuming elite cognacs and diving in rooftop pools.`);
        }
      },
      {
        choiceText: 'Stand quietly near the buffet, eating tiny smoked salmon crackers.',
        outcomeText: 'A peaceful night of high gourmet dining without social anxiety. You leave with clean folders.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Attended executive mixers quietly, dining on smoked salmon appetizers.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_23',
    title: 'The Secret Office Romance 🤫',
    description: 'A brilliant junior engineer from your direct team starts leaving code annotations containing romantic notes.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Accept their lunch invitation and start a covert dating pattern.',
        outcomeText: 'You hold hands in back alleys. Your heart races, though you stress over corporate HR compliance reviews.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 30, stress: 15, looks: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Entered a covert office romance with a brilliant team programmer.`);
        }
      },
      {
        choiceText: 'Report the romantic comments in code folders to the team lead.',
        outcomeText: 'They are transferred to a distant marketing brand. Your code folders remain dry, but professional ties freeze.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -10, smarts: 15, stress: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Flagged romantic structural code changes with internal managers.`);
        }
      },
      {
        choiceText: 'Politely request them to keep romantic statements off active software code.',
        outcomeText: 'They respect your direct boundaries. You preserve a flawless technical relationship with zero office drama.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: -10, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Maintained structural work channels cleanly by setting romance limits.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_24',
    title: 'The Sudden Server Wipe 💻',
    description: 'During a software update, you accidentally delete the marketing database index files. The backup server is offline.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Spend forty-eight continuous hours reconstructing the databases.',
        outcomeText: 'Your eyes bleed red under fluorescent lights. You restore ninety percent of the files, earning legendary status.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, smarts: 25, stress: 30 });
          s.log.push(`Age ${s.characterInfo.age}: Restored critical deleted index files manually after forty-eight hours of work.`);
        }
      },
      {
        choiceText: 'Blame the database deletion on a power surge inside the local grid.',
        outcomeText: 'Technicians spend weeks searching for system faults. You avoid direct fire, but live in deep paranoia.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -30, stress: 25 });
          s.log.push(`Age ${s.characterInfo.age}: Deflected database errors onto server room electrical surges.`);
        }
      },
      {
        choiceText: 'Confess immediately to the Chief Information Officer and accept steps.',
        outcomeText: 'They appreciate your absolute transparency. Your direct pay is frozen for three months, but you keep your role.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: 20, karma: 30 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Disclosed operational database slips directly to technology officers.`);
        }
      }
    ]
  },
  {
    id: 'yp1_corp_25',
    title: 'The Lucrative Rival Offer 💰',
    description: 'A competitor department reaches out with a job offer that increases your annual pay by thirty percent, but demands immediate signatures.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Accept the contract immediately and clean out your desk folders.',
        outcomeText: 'You jump ship! Your bank deposits balloon beautifully, though your old managers label you as disloyal.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 25, stress: -10, smarts: 10 });
          s.finances.annualSalary = Math.round(s.finances.annualSalary * 1.30);
          s.log.push(`Age ${s.characterInfo.age}: Migrated to marketing rivals for thirty percent pay scales.`);
        }
      },
      {
        choiceText: 'Use the paperwork to negotiate a matching salary at your current desk.',
        outcomeText: 'Your company agrees to match the pay! You keep your familiar desk comfort while boosting monthly income.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 15, happiness: 15 });
          s.finances.annualSalary = Math.round(s.finances.annualSalary * 1.25);
          s.log.push(`Age ${s.characterInfo.age}: Leveraged industry job offers to secure matching salary scales.`);
        }
      },
      {
        choiceText: 'Decline the competitor to preserve long-term team trust.',
        outcomeText: 'Your crew remains beautifully close. You stand strong for corporate trust, though your budget stays identical.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, karma: 20, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Rejected rival recruitment to preserve local team trust.`);
        }
      }
    ]
  },

  // ==========================================================================
  // SECTION 2: HIGHER EDUCATION, STUDENT DEBT & STUDY STRUGGLES (ITEMS 26 - 34)
  // (Remaining 16 events in this category will continue in subsequent files)
  // ==========================================================================
  {
    id: 'yp1_edu_01',
    title: 'The Textbook Cartel Price 📚',
    description: 'Your advanced statistics syllabus demands a custom university workbook priced at an outrageous three hundred and fifty dollars.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Purchase the premium edition directly from the university store.',
        outcomeText: 'Your bank deposits shrink. You secure the shiny pages, but stomach costs are highly restricted.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -10, smarts: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 350, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Purchased advanced statistics textbooks at premium values (-$350).`);
        }
      },
      {
        choiceText: 'Download a shaky, password-protected PDF from a foreign forum.',
        outcomeText: 'Your computer gets four viral pop-up streams, but you secure the academic data blocks for absolute zero cost.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: 15, karma: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Sourced digital textbooks using underground foreign servers.`);
        }
      },
      {
        choiceText: 'Share a single workbook with consecutive study partners.',
        outcomeText: 'You study late in common rooms, splitting pages. Your social circle grows, though scheduling is tough.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 10, happiness: 15, smarts: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Sourced workbook resources collectively via shared peer groups.`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_02',
    title: 'The Student Loan Interest Alert 💸',
    description: 'A formal legal letter alerts you that your student loan accounts are shifting out of grace periods, adding interest indexes.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.fundingType === 'Loan';
    },
    choices: [
      {
        choiceText: 'Squeeze your monthly meals to make an immediate thousand dollar payment.',
        outcomeText: 'You buy dry ramen packages. Your debt baseline drops, reducing long-term financial pressure.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -10, happiness: -15, stress: -10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1000, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Transferred lump-sum payments to student loan agents (-$1,000).`);
        }
      },
      {
        choiceText: 'Apply for academic deferments based on low vocational income.',
        outcomeText: 'The agents approve your file. Interest stays quiet for another year, preserving cash files.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Enrolled in national deferment programs to stall student debts.`);
        }
      },
      {
        choiceText: 'Ignore the notices and buy retro leather holiday jackets.',
        outcomeText: 'You look highly stylish in your leather coat! However, credit bureau logs mark your files with warnings.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 20, stress: 25, karma: -20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 400, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Ignored financial warnings to buy vintage winter fashion.`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_03',
    title: 'The Midnight Caffeine Overload ☕',
    description: 'Your major biology final is in six hours. You are shivering after consuming four energy shots.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Push through the jitters, studying organic formulas in detail.',
        outcomeText: 'You secure top marks on the exam sheet! However, you pass out on the biology lawn afterwards.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -20, smarts: 20, stress: 25 });
          s.education.grades = Math.min(100, s.education.grades + 12);
          s.log.push(`Age ${s.characterInfo.age}: Crammed molecular biologies under high chemical caffeine stacks.`);
        }
      },
      {
        choiceText: 'Sleep immediately on your narrow dorm mattress to recover brain health.',
        outcomeText: 'You sleep beautifully. Your brain is clear, but you forget key cardiac details, earning basic grades.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, stress: -20, smarts: -5 });
          s.education.grades = Math.max(0, s.education.grades - 5);
          s.log.push(`Age ${s.characterInfo.age}: Prioritized deep natural sleep over biology final cramming.`);
        }
      },
      {
        choiceText: 'Take a midnight jog around campus to burn off the energy rushes.',
        outcomeText: 'Your heart rates settle. You return to your books with calm, solid comprehension blocks.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 10, stress: -10, smarts: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Cleared biological caffeine spikes by sprinting academic paths.`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_04',
    title: 'The Arrogant Research Adviser 🏫',
    description: 'Your thesis director reviews your project drafts, detailing your creative theories as absolute childish logic.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Rewrite your thesis files to copy their exact old published ideas.',
        outcomeText: 'They praise your progress. It is highly boring, but you secure safe, easy academic marks.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 10, stress: -10, karma: -5 });
          s.education.grades = Math.min(100, s.education.grades + 8);
          s.log.push(`Age ${s.characterInfo.age}: Aligned academic thesis theories to mirror advisory templates.`);
        }
      },
      {
        choiceText: 'Defend your creative theories in a rigorous mathematical presentation.',
        outcomeText: 'The department is highly impressed by your courage! The adviser is annoyed, but grants your degree.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, happiness: 20, stress: 15 });
          s.education.grades = Math.min(100, s.education.grades + 15);
          s.log.push(`Age ${s.characterInfo.age}: Defended creative thesis metrics in front of university panels.`);
        }
      },
      {
        choiceText: 'Lodge administrative bias reports with the university ombudsman.',
        outcomeText: 'You initiate investigations. This creates massive friction, but you are assigned a friendly director.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 25, happiness: -5, smarts: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Initiated academic reviews regarding biased thesis directors.`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_05',
    title: 'The Gym Scholarship Offer 🏋️‍♂️',
    description: 'The athletic sports department spots your performance in the gym, offering a partial scholarship to join the rowing crew.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const isInUni = s.education?.currentStage === 'University';
      const isHealthy = s.stats?.health >= 65;
      return age !== undefined && age >= 18 && age <= 25 && isInUni && isHealthy;
    },
    choices: [
      {
        choiceText: 'Commit to the rowing crew, waking for morning lake sprints.',
        outcomeText: 'Your shoulders represent absolute iron. You secure four thousand dollars in tuition cuts, though you smell like lake seaweed.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 25, looks: 15, stress: 20 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 4000, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Joined rowing crews, earning tuition credits (-$4k fees avoided).`);
        }
      },
      {
        choiceText: 'Refuse the sport to protect your academic studying focus.',
        outcomeText: 'You choose books. Your grades rise, but you miss out on high athletic networking clubs.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: -15, health: -5 });
          s.education.grades = Math.min(100, s.education.grades + 8);
          s.log.push(`Age ${s.characterInfo.age}: Rejected athletic recruitments to focus on textbook scores.`);
        }
      },
      {
        choiceText: 'Offer to serve as the team statistical analyst to get partial benefits.',
        outcomeText: 'A beautiful administrative play! You code row metrics, securing half the stipend with zero calluses.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 5, happiness: 10 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 1500, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Managed row analytics, earning academic stipends without rowing.`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_06',
    title: 'The Public Speaking Fright 🎤',
    description: 'You must deliver a forty-minute lecture on macroeconomics in front of three hundred students in the main hall.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Speak with absolute confidence, focusing on the back wall lanterns.',
        outcomeText: 'You deliver a masterpiece! The audience applauds loudly, and the professor highlights your name.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, looks: 15, happiness: 25 });
          s.education.grades = Math.min(100, s.education.grades + 10);
          s.log.push(`Age ${s.characterInfo.age}: Conquered public speaking fears during macroeconomics lectures.`);
        }
      },
      {
        choiceText: 'Read directly from your notes in a low, rapid whisper.',
        outcomeText: 'The crowd struggles to listen, coughing frequently, but you finish the slides and escape typing.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -5, looks: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Read macroeconomics presentations in quiet monotone whispers.`);
        }
      },
      {
        choiceText: 'Develop a sudden voice loss and present via pre-recorded software.',
        outcomeText: 'A creative tech workaround! The audience stares blankly, but you avoid immediate stomach panic.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Outmaneuvered public speaking panic with custom audio files.`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_07',
    title: 'The Cafeteria Nutrition Trap 🍕',
    description: 'The campus food court serves only greasy deep-fried potato skins and synthetic cheese slices for late dinners.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Consume the greasy options daily to save technical budget funds.',
        outcomeText: 'You save money, but you develop skin breakouts, lethargic moods, and lose healthy posture.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, looks: -15, happiness: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Fueled research studies with greasy cafeteria food court items.`);
        }
      },
      {
        choiceText: 'Purchase premium organic vegetables and steam them in your dorm room.',
        outcomeText: 'You spend sixty dollars a week. Your skin glows beautifully and you feel highly energetic.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, looks: 10, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 240, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Cooked custom nutrition blocks in your dorm toaster ovens (-$240).`);
        }
      },
      {
        choiceText: 'Dodge dinners completely, using dry whey powders and dynamic fasting.',
        outcomeText: 'You save cash and body fats. Your logical focus is sharp, though you feel incredibly hungry.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 10, health: 5, happiness: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Adopted dramatic intermittent fasting limits to bypass greasy foods.`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_08',
    title: 'The Plagiarism Ring Proposal 🦹',
    description: 'A secret student network offers to write your chemistry files for fifty dollars to guarantee a perfect academic score.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Pay the ring to complete your chemistry folders easily.',
        outcomeText: 'A mechanical algorithm flags your paper as copycat layout. You receive administrative warnings.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -35, stress: 25, happiness: -15 });
          s.education.grades = Math.max(0, s.education.grades - 15);
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 50, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Caught utilizing external plagiarism rings on chemistry files.`);
        }
      },
      {
        choiceText: 'Report the plagiarism ring to the university dean.',
        outcomeText: 'The dean shuts down the ring. They write a major honor note on your transcripts, boosting your grade scores.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 30, smarts: 10, stress: 10 });
          s.education.grades = Math.min(100, s.education.grades + 5);
          s.log.push(`Age ${s.characterInfo.age}: Disclosed illegal campus file writing rings to dean boards.`);
        }
      },
      {
        choiceText: 'Write all chemical equations yourself under your desk lantern.',
        outcomeText: 'You study late. Your equations are clean. You master chemistry logic organically and maintain secure values.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 15, karma: 15 });
          s.education.grades = Math.min(100, s.education.grades + 8);
          s.log.push(`Age ${s.characterInfo.age}: Drafted all science laboratory records yourself to build raw skills.`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_09',
    title: 'The High-Noise Dorm Party 🤫',
    description: 'An adjacent dorm room initiates a massive techno party at midnight, right before your critical civil law final.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Join the party, drinking beer and dancing on plastic tables.',
        outcomeText: 'The party is incredible! You do not pass the law exam, but your social status is legendary.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -10, happiness: 25, looks: 5, stress: 15 });
          s.education.grades = Math.max(0, s.education.grades - 12);
          s.log.push(`Age ${s.characterInfo.age}: Abandonded law study blocks to dance at wild midnight college events.`);
        }
      },
      {
        choiceText: 'Contact university housing officers to shut down the noise immediately.',
        outcomeText: 'The officers disperse the crowd. You study law files in absolute target silence, securing top marks.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: -10, karma: -5 });
          s.education.grades = Math.min(100, s.education.grades + 10);
          s.log.push(`Age ${s.characterInfo.age}: Enforced university quiet-hours via housing administration.`);
        }
      },
      {
        choiceText: 'Study in the bathtub with industrial protective earplugs.',
        outcomeText: 'You read contracts in the empty porcelain tub. A weird compromise, but you pass with stable grades.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Studied complex consumer codes in silent ceramic bathroom zones.`);
        }
      }
    ]
  }
];

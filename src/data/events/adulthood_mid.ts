import { GameEvent, CharacterState } from '../../types';
import { adjustStats } from '../../utils';

interface MidScenarioDef {
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

// 1. Gated Career Scenarios (Exactly 40 scenarios for Mid-Life / Ages 26-45)
const CAREER_GATED_EVENTS: MidScenarioDef[] = [
  // CEO OF TECH STARTUP & CORPORATE ATTORNEY / FINANCIAL ANALYST (Corporate Group) - 15 Scenarios
  {
    id: 'mid_corp_01',
    title: 'Workplace: Corporate Espionage Offer 📂',
    description: 'A shadow broker contacts you on an encrypted messaging platform. They offer inside corporate roadmaps for your core competitor in exchange for a large sum of money.',
    conditionChecker: (state) => ['CEO of Tech Startup', 'Corporate Attorney', 'Financial Analyst'].includes(state.characterInfo.currentOccupation || ''),
    choices: [
      {
        text: 'Pay the broker $15,000 for the leaked blueprints.',
        outcomeText: 'You bought the files! Your market share spikes, but constant paranoia of FBI raids keeps you wide awake at night.',
        adjustments: { happiness: 10, cash: -15000, stress: 35, karma: -40 },
        logText: 'You bought illegal corporate secrets on the dark web.'
      },
      {
        text: 'Report the user to internal compliance.',
        outcomeText: 'Compliance praises your superb ethical standards. You receive a small dry bonus check and deep respect.',
        adjustments: { happiness: 15, karma: 30, cash: 2000, stress: -5 },
        logText: 'You successfully reported a corporate spy, maintaining perfect ethics.'
      }
    ]
  },
  {
    id: 'mid_corp_02',
    title: 'Workplace: Insider Trading Whisper 📈',
    description: 'Your golf buddy whispers that a major pharma stock is getting FDA rejection tomorrow afternoon. You have some spare capital.',
    conditionChecker: (state) => ['CEO of Tech Startup', 'Corporate Attorney', 'Financial Analyst'].includes(state.characterInfo.currentOccupation || ''),
    choices: [
      {
        text: 'Short the pharma stock with $10,000.',
        outcomeText: 'The stock tanked! You made a quick profit of $25,000, but the regulatory oversight committee is launching a probe.',
        adjustments: { happiness: 20, cash: 25000, stress: 30, karma: -35 },
        logText: 'You executed questionable insider trades based on casual golf lounge rumors.'
      },
      {
        text: 'Ignore the rumor and invest in low-cost index funds.',
        outcomeText: 'You stay safe. Your index funds appreciate steadily, and you sleep with absolute peace of mind.',
        adjustments: { happiness: 10, smarts: 15, stress: -10, karma: 10 },
        logText: 'You chose legal index investments over a dangerous insider trading tip.'
      }
    ]
  },
  {
    id: 'mid_corp_03',
    title: 'Workplace: Hostile Takeover Crisis ⚔️',
    description: 'A competitor is buying up floating shares, threatening to eject you from your board position.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'CEO of Tech Startup',
    choices: [
      {
        text: 'Deploy a poison pill diluting shareholder value.',
        outcomeText: 'You stayed on as CEO! But the company\'s reputation is damaged and public investors are furious.',
        adjustments: { happiness: 15, smarts: 20, stress: 25, karma: -15 },
        logText: 'You executed a dilutive poison pill strategy to block a hostile takeover.'
      },
      {
        text: 'Surrender quietly and accept the generous golden parachute.',
        outcomeText: 'You step down. They hand you a stellar exit package of $80,000 cash. Time to rest.',
        adjustments: { happiness: 20, cash: 80000, stress: -30, looks: 5 },
        logText: 'You resigned as CEO during a hostile raid, taking a heavy golden parachute.'
      }
    ]
  },
  {
    id: 'mid_corp_04',
    title: 'Workplace: Patent Infringement Claims 🏛️',
    description: 'A patent troll accuses your firm of stealing slider button code. They demand a settlement.',
    conditionChecker: (state) => ['CEO of Tech Startup', 'Corporate Attorney'].includes(state.characterInfo.currentOccupation || ''),
    choices: [
      {
        text: 'Fight them aggressively in court.',
        outcomeText: 'You won the trial! However, the legal billing spent $30,000 of your personal capital.',
        adjustments: { happiness: 10, cash: -30000, stress: 20, smarts: 15 },
        logText: 'You spent deep funds representing patent positions in public courts.'
      },
      {
        text: 'Pay a quiet settlement out of court.',
        outcomeText: 'They take $5,000 and sign non-disclosure forms. Your stress goes away in five minutes.',
        adjustments: { happiness: 5, cash: -5000, stress: -15 },
        logText: 'You quietly settled patent trolls out of court.'
      }
    ]
  },
  {
    id: 'mid_corp_05',
    title: 'Workplace: Cooking the Books 🧮',
    description: 'The quarterly figures are slightly missing targets. The accounting team suggests some "creative reclassifications".',
    conditionChecker: (state) => ['CEO of Tech Startup', 'Financial Analyst'].includes(state.characterInfo.currentOccupation || ''),
    choices: [
      {
        text: 'Approve the creative accounting overrides.',
        outcomeText: 'The numbers look gorgeous! Share prices rise, but you stay up sweating about tax audits.',
        adjustments: { happiness: 15, stress: 30, karma: -30 },
        logText: 'You authorized creative, illegal accounting adjustments.'
      },
      {
        text: 'Report the real, slightly disappointing metrics.',
        outcomeText: 'Stock drops, but you are praised for transparency and complete professional integrity.',
        adjustments: { happiness: -10, smarts: 15, karma: 25, stress: 5 },
        logText: 'You insisted on reporting exact, real financial numbers.'
      }
    ]
  },
  {
    id: 'mid_corp_06',
    title: 'Workplace: Regulatory Investigation 🕵️‍♂️',
    description: 'An audit team pulls up with briefcases, asking for standard digital communication archives.',
    conditionChecker: (state) => ['CEO of Tech Startup', 'Corporate Attorney', 'Financial Analyst'].includes(state.characterInfo.currentOccupation || ''),
    choices: [
      {
        text: 'Hand over all archives with zero scrubbing.',
        outcomeText: 'They crawl through everything, find zero violations, and leave. Clean but terrifying.',
        adjustments: { happiness: 10, stress: -15, karma: 15 },
        logText: 'You complied with regulatory investigations, emerging safe.'
      },
      {
        text: 'Accidentally delete critical archives to protect clients.',
        outcomeText: 'You are fined $12,000 for non-compliance. Your legal career takes a heavy bruising.',
        adjustments: { happiness: -20, cash: -12000, karma: -25, stress: 30 },
        logText: 'You obstructed audits by losing database records.'
      }
    ]
  },
  {
    id: 'mid_corp_07',
    title: 'Workplace: Hostile Colleague Slurs 💬',
    description: 'A fellow representative is taking public shots at your strategy during executive steering boards.',
    conditionChecker: (state) => ['CEO of Tech Startup', 'Corporate Attorney', 'Financial Analyst'].includes(state.characterInfo.currentOccupation || ''),
    choices: [
      {
        text: 'Confront them with direct performance analytics.',
        outcomeText: 'You systematically dismantled their bad arguments in front of everyone. Absolute dominance.',
        adjustments: { happiness: 25, smarts: 15, stress: -10 },
        logText: 'You professionally routed an office rival using key analytics.'
      },
      {
        text: 'File a formal human resources harassment ticket.',
        outcomeText: 'They are written up, but they now wage passive-aggressive cold wars in the corridors.',
        adjustments: { happiness: 5, karma: 10, stress: 15 },
        logText: 'You requested HR management intervention for office bullying.'
      }
    ]
  },
  {
    id: 'mid_corp_08',
    title: 'Workplace: Tech Stack Upgrade 💻',
    description: 'The engineer team requests $8,000 for a structural cloud scale revamp. The legacy server still runs okay.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'CEO of Tech Startup',
    choices: [
      {
        text: 'Approve the cloud modernization expense.',
        outcomeText: 'System performance doubles, and client satisfaction improves! Your stress decreases.',
        adjustments: { happiness: 15, smarts: 10, stress: -15, cash: -8000 },
        logText: 'You authorized a cloud systems revamp for your startup.'
      },
      {
        text: 'Decline. If it ain\'t broke, don\'t fix it.',
        outcomeText: 'You saved the cash. Three weeks later, a midnight server outage causes panic.',
        adjustments: { happiness: -10, stress: 25 },
        logText: 'You cheaped out on server upgrades, causing downstream outages.'
      }
    ]
  },
  {
    id: 'mid_corp_09',
    title: 'Workplace: Mergers & Acquisitions Lead 🤝',
    description: 'A competitor is proposing to buy 40% of your business operation.',
    conditionChecker: (state) => ['CEO of Tech Startup', 'Corporate Attorney'].includes(state.characterInfo.currentOccupation || ''),
    choices: [
      {
        text: 'Negotiate higher payouts and join forces.',
        outcomeText: 'Capital increases! You take home a handsome private bonus check of $35,000 cash.',
        adjustments: { happiness: 25, cash: 35000, stress: 15 },
        logText: 'You negotiated a key business acquisition for your company.'
      },
      {
        text: 'Decline in favor of independent sovereignty.',
        outcomeText: 'Your independence is secured, although you face intense competition from the group.',
        adjustments: { happiness: 10, stress: 10 },
        logText: 'You declined a major corporate buyout to preserve complete product independence.'
      }
    ]
  },
  {
    id: 'mid_corp_10',
    title: 'Workplace: Public Relations Gaffe 📢',
    description: 'An executive junior representative makes a highly controversial tweet on the corporate handle.',
    conditionChecker: (state) => ['CEO of Tech Startup', 'Corporate Attorney', 'Financial Analyst', 'Social Media Intern'].includes(state.characterInfo.currentOccupation || ''),
    choices: [
      {
        text: 'Issue a formal, sterile public apology letter.',
        outcomeText: 'The internet is bored and moves on. The crisis fades into safety.',
        adjustments: { happiness: 10, stress: -10, smarts: 10 },
        logText: 'You resolved a PR crisis using corporate apology templates.'
      },
      {
        text: 'Double down and troll back on social channels!',
        outcomeText: 'Complete internet warfare! Some people love you, but major sponsors drop out instantly.',
        adjustments: { happiness: 15, karma: -20, looks: -10, stress: 25 },
        logText: 'You engaged in messy social media trolling, alienating sponsors.'
      }
    ]
  },
  {
    id: 'mid_corp_11',
    title: 'Workplace: Recruiting Star Talent 🌟',
    description: 'An industry leading scientist is available to hire, but they demand a high salary bump.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'CEO of Tech Startup',
    choices: [
      {
        text: 'Hire them on a premium executive salary.',
        outcomeText: 'They deploy incredible patents, moving your valuation forward instantly.',
        adjustments: { happiness: 20, smarts: 20, stress: -10 },
        logText: 'You recruited premium engineering talent to skyrocket operations.'
      },
      {
        text: 'Decline and hire a cheap junior intern instead.',
        outcomeText: 'You save money, but the junior intern deletes the production database on their second day.',
        adjustments: { happiness: -20, stress: 30, smarts: -5 },
        logText: 'You preferred inexpensive interns over experienced career hires.'
      }
    ]
  },
  {
    id: 'mid_corp_12',
    title: 'Workplace: Insider Threat Report 🔐',
    description: 'You suspect a close colleague is downloading private company files or intellectual secrets.',
    conditionChecker: (state) => ['CEO of Tech Startup', 'Corporate Attorney', 'Financial Analyst'].includes(state.characterInfo.currentOccupation || ''),
    choices: [
      {
        text: 'Install secret surveillance keylogger software on their station.',
        outcomeText: 'You caught them red-handed! But you feel a bit slimy using monitoring hacks.',
        adjustments: { happiness: 15, smarts: 15, karma: -15, stress: 10 },
        logText: 'You deployed keyloggers secretly to verify corporate leakages.'
      },
      {
        text: 'Invite them to lunch and ask gently if things are okay.',
        outcomeText: 'They break down and confess their financial struggles. You resolve it with safety and grace.',
        adjustments: { happiness: 20, karma: 25, stress: -5 },
        logText: 'You resolved internal employee tension with compassion.'
      }
    ]
  },
  {
    id: 'mid_corp_13',
    title: 'Workplace: Expensing Private Lunches 🍽️',
    description: 'You had a lavish steak dinner with friends. The accountant suggests logging it as a client meeting.',
    conditionChecker: (state) => ['Corporate Attorney', 'Financial Analyst', 'Social Media Intern'].includes(state.characterInfo.currentOccupation || ''),
    choices: [
      {
        text: 'Expense the full meal to corporate accounts.',
        outcomeText: 'Free caviar tasting! The finance team flags it, but lets you off with a warning.',
        adjustments: { happiness: 15, cash: 500, karma: -10, stress: 10 },
        logText: 'You expensed personal catering bills to corporate finance.'
      },
      {
        text: 'Pay for your steak with personal funds.',
        outcomeText: 'It cost you cash, but you maintain pristine records and perfect sleep.',
        adjustments: { happiness: 5, cash: -150, karma: 15 },
        logText: 'You paid personal entertainment bills cleanly.'
      }
    ]
  },
  {
    id: 'mid_corp_14',
    title: 'Workplace: Crucial Contract Negotiation 📝',
    description: 'A multi-million dollar vendor contract requires your signature, but contains complex liability details.',
    conditionChecker: (state) => ['CEO of Tech Startup', 'Corporate Attorney'].includes(state.characterInfo.currentOccupation || ''),
    choices: [
      {
        text: 'Read every line meticulously, marking corrections.',
        outcomeText: 'You caught two predatory clauses that could have ruined the company! Genius work.',
        adjustments: { happiness: 20, smarts: 25, stress: 10 },
        logText: 'You caught legal vulnerabilities in vendor contract negotiations.'
      },
      {
        text: 'Just sign it quickly. We need to close today.',
        outcomeText: 'The vendor locks you in. High ongoing service costs add major pressure.',
        adjustments: { happiness: -10, smarts: -10, stress: 20 },
        logText: 'You signed commercial agreements blindly to bypass tedious legal checks.'
      }
    ]
  },
  {
    id: 'mid_corp_15',
    title: 'Workplace: Board of Directors Clash 🗳️',
    description: 'The board wants you to downsize 10% of the customer support staff to boost quarterly yields.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'CEO of Tech Startup',
    choices: [
      {
        text: 'Refuse. Protect employee livelihoods at all costs.',
        outcomeText: 'The team loves you! The board is cold and declines your annual bonus.',
        adjustments: { happiness: 20, karma: 30, stress: 20 },
        logText: 'You stood up for workforce retention against board cost-cutting.'
      },
      {
        text: 'Agree to the lay-offs to drive company yields higher.',
        outcomeText: 'The margins spike, and your shares appreciate dramatically, making you $18,000 cash.',
        adjustments: { happiness: -15, cash: 18000, karma: -35, stress: 20 },
        logText: 'You executed employee downsizes to maximize company metrics.'
      }
    ]
  },

  // PLASTIC SURGEON & REGISTERED NURSE (Medical Group) - 13 Scenarios
  {
    id: 'mid_med_01',
    title: 'Workplace: High-Stress ER Shift 🏥',
    description: 'Three ambulances arrive at the emergency room simultaneously. You are on hour 14 of your shift.',
    conditionChecker: (state) => ['Plastic Surgeon', 'Registered Nurse'].includes(state.characterInfo.currentOccupation || ''),
    choices: [
      {
        text: 'Gulp a triple espresso and treat the critical patients.',
        outcomeText: 'You worked through the night, saving three lives! Your smarts and karma spike, but you are physically dead.',
        adjustments: { happiness: 20, health: -15, smarts: 15, karma: 30, stress: 30 },
        logText: 'You powered through grueling ER night shifts to save patient lives.'
      },
      {
        text: 'Call a replacement doctor and rest to prevent errors.',
        outcomeText: 'The department head scolds you, but you sleep safely and avoid dangerous exhaustion mistakes.',
        adjustments: { happiness: 10, health: 15, stress: -20 },
        logText: 'You prioritized rest to maintain professional patient safety standards.'
      }
    ]
  },
  {
    id: 'mid_med_02',
    title: 'Workplace: Malpractice Threat ⚖️',
    description: 'An aggressive patient from last month\'s nose job is threatening to sue, alleging their nose is slightly crooked.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Plastic Surgeon',
    choices: [
      {
        text: 'Offer a free revision surgery to keep them calm.',
        outcomeText: 'They agree! The second surgery works nicely. You avoid court, but waste valuable clinic time.',
        adjustments: { happiness: 10, stress: 15, looks: 5, karma: 10 },
        logText: 'You neutralized patient lawsuits by offering complimentary revision procedures.'
      },
      {
        text: 'Refer them to your aggressive defense lawyers.',
        outcomeText: 'The case gets thrown out, but you spend $8,000 on early retainer fees.',
        adjustments: { happiness: -10, cash: -8000, stress: 25 },
        logText: 'You battled medical malpractice threats with aggressive defense counsel.'
      }
    ]
  },
  {
    id: 'mid_med_03',
    title: 'Workplace: Supplier Kickback Whisper 💰',
    description: 'A synthetic implant representative offers a secret 15% recurring reward cash kickback if you use their products.',
    conditionChecker: (state) => ['Plastic Surgeon', 'Registered Nurse'].includes(state.characterInfo.currentOccupation || ''),
    choices: [
      {
        text: 'Accept the kickback arrangement.',
        outcomeText: 'You pocket an extra $12,000 annual cash! Your pockets are happy, but you hope audit teams don\'t notice.',
        adjustments: { happiness: 15, cash: 12000, karma: -35, stress: 20 },
        logText: 'You corruptly accepted pharmaceutical distributor kickback rewards.'
      },
      {
        text: 'Reject the arrangement and report the representative.',
        outcomeText: 'You maintain pristine clinic records. You sleep like a brand new baby.',
        adjustments: { happiness: 10, karma: 30, stress: -5 },
        logText: 'You turned down illicit supplier kickbacks to keep patient integrity high.'
      }
    ]
  },
  {
    id: 'mid_med_04',
    title: 'Workplace: VIP Celebrity Patient 🕶️',
    description: 'A famous star demands an immediate, highly difficult chin-shaping surgery with complete secrecy.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Plastic Surgeon',
    choices: [
      {
        text: 'Operate with absolute clinical caution.',
        outcomeText: 'A perfect result! The star leaves a massive private cash bonus of $20,000 and tells their rich friends.',
        adjustments: { happiness: 30, smarts: 20, cash: 20000, stress: 15 },
        logText: 'You performed elite level plastic adjustments on VIP clientele.'
      },
      {
        text: 'Refuse. The risk of media circus is too high.',
        outcomeText: 'You choose quiet, simple family work. Peace is restored.',
        adjustments: { happiness: 10, stress: -15 },
        logText: 'You declined volatile celebrity files to maintain clinical peace.'
      }
    ]
  },
  {
    id: 'mid_med_05',
    title: 'Workplace: Missing Painkiller Meds 💊',
    description: 'You notice the liquid morphine count in the dispensary is missing three doses from your cohort\'s records.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Registered Nurse',
    choices: [
      {
        text: 'Report the inventory shortage to the surgical board.',
        outcomeText: 'An investigation is launched. Your coworker is caught abusing meds, but they curse your name.',
        adjustments: { happiness: 10, karma: 20, stress: 25 },
        logText: 'You flagged controlled medicine leakage to the medical licensing board.'
      },
      {
        text: 'Quietly cover up the discrepancy to save coworker trouble.',
        outcomeText: 'The audit passes, but you feel extremely dirty facilitating drug theft inside hospital lockers.',
        adjustments: { happiness: -15, stress: 15, karma: -30 },
        logText: 'You falsified medical counts to shield a compromised nursing colleague.'
      }
    ]
  },
  {
    id: 'mid_med_06',
    title: 'Workplace: Advanced Suture Technique 🧵',
    description: 'A complex micro-vascular suture training module opens in Montreal. It requires $2,500.',
    conditionChecker: (state) => ['Plastic Surgeon', 'Registered Nurse'].includes(state.characterInfo.currentOccupation || ''),
    choices: [
      {
        text: 'Self-fund the advanced micro-vascular course.',
        outcomeText: 'You learned amazing cutting-edge techniques! Your professional reputation rises.',
        adjustments: { happiness: 20, smarts: 25, cash: -2500, stress: 10 },
        logText: 'You mastered premium micro-surgical suture tech on self-funded courses.'
      },
      {
        text: 'Skip it. Standard stiches are good enough.',
        outcomeText: 'You saved the cash. Your skills remain average but sufficient.',
        adjustments: { happiness: 5, smarts: -5 },
        logText: 'You skipped surgical advanced training modules.'
      }
    ]
  },
  {
    id: 'mid_med_07',
    title: 'Workplace: Medical Research Breakthrough 🧪',
    description: 'An academic journal requests a peer-reviewed article on your revolutionary breast-shape study.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Plastic Surgeon',
    choices: [
      {
        text: 'Write the comprehensive article across your weekend.',
        outcomeText: 'Your paper is published! You gain massive academic fame and industry credibility.',
        adjustments: { happiness: 25, smarts: 25, health: -5, stress: 20 },
        logText: 'You published landmark research papers on surgical tissue engineering.'
      },
      {
        text: 'Pass the credit to your junior assistant instead.',
        outcomeText: 'The junior is eternally grateful. Your internal karma shines incredibly warm.',
        adjustments: { happiness: 20, karma: 30, stress: -10 },
        logText: 'You generously donated research publication credits to juniors.'
      }
    ]
  },
  {
    id: 'mid_med_08',
    title: 'Workplace: The Overzealous Cosmetic Request 👄',
    description: 'A young patient demands cartoonishly giant lip implants that you know will damage their circulation.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Plastic Surgeon',
    choices: [
      {
        text: 'Refuse the surgery on ethical medical grounds.',
        outcomeText: 'They storm out screaming, but you maintain medical integrity.',
        adjustments: { happiness: 10, karma: 25, stress: -5 },
        logText: 'You ethically turned down dangerous, extreme cosmetic demands.'
      },
      {
        text: 'Take the cash and perform the huge procedures anyway.',
        outcomeText: 'The surgery is high-paying ($8,000 cash), but the postoperative results are terrifying.',
        adjustments: { happiness: -20, cash: 8000, karma: -35, stress: 30 },
        logText: 'You performed high-risk, disfiguring operations for liquid profits.'
      }
    ]
  },
  {
    id: 'mid_med_09',
    title: 'Workplace: Handwashing Enforcement 🧴',
    description: 'You witness a senior surgeon skipping the full 5-minute sterile scrub before scrubbing in.',
    conditionChecker: (state) => ['Plastic Surgeon', 'Registered Nurse'].includes(state.characterInfo.currentOccupation || ''),
    choices: [
      {
        text: 'Loudly hand them sterile scrub sponges.',
        outcomeText: 'They look embarrassed, but comply. Patient infection rates drop to absolute zero.',
        adjustments: { happiness: 15, smarts: 15, karma: 20 },
        logText: 'You actively enforced critical sanitization policies in surgical rooms.'
      },
      {
        text: 'Keep quiet. They are the expert boss.',
        outcomeText: 'The patient gets a minor fever. You carry bad guilt for three weeks.',
        adjustments: { happiness: -15, karma: -20, stress: 15 },
        logText: 'You chose submissive compliance over sanitization controls.'
      }
    ]
  },
  {
    id: 'mid_med_10',
    title: 'Workplace: Understaffed Clinic Strike 🪧',
    description: 'The local nurses association is rallying for strike action over unsafe patient-to-caretaker metrics.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Registered Nurse',
    choices: [
      {
        text: 'Join the strike lines outside the hospital gates.',
        outcomeText: 'You are docked two days pay, but the platform eventually signs better safety packages.',
        adjustments: { happiness: 20, karma: 20, stress: -10, cash: -400 },
        logText: 'You unionized and marched for nursing safety standards.'
      },
      {
        text: 'Cross the picket line and pick up double shifts.',
        outcomeText: 'The administration loves your compliance! You make $1,200 but coworkers ignore you.',
        adjustments: { happiness: -15, cash: 1200, karma: -15, stress: 25 },
        logText: 'You crossed union strike lines, working double cash shifts.'
      }
    ]
  },
  {
    id: 'mid_med_11',
    title: 'Workplace: ER Overdose Case 🚑',
    description: 'An unconscious patient with severe drug toxicity arrives. Their chart is missing key blood notes.',
    conditionChecker: (state) => ['Plastic Surgeon', 'Registered Nurse'].includes(state.characterInfo.currentOccupation || ''),
    choices: [
      {
        text: 'Administer emergency toxicology blockers quickly.',
        outcomeText: 'Your fast diagnostic thinking saved them! Absolute clinical execution.',
        adjustments: { happiness: 25, smarts: 20, karma: 30, stress: 10 },
        logText: 'You effectively diagnosed and reversed critical chemical toxicities.'
      },
      {
        text: 'Wait for lab blood draws to complete to ensure safety.',
        outcomeText: 'Their condition stabilizes safely, though the critical delays elevated stress of the whole ward.',
        adjustments: { happiness: 10, stress: 20 },
        logText: 'You prioritized lab documentation safety over split-second guesses.'
      }
    ]
  },
  {
    id: 'mid_med_12',
    title: 'Workplace: Medical Conference Panel 🎙️',
    description: 'You are invited to lead a panel debate regarding postoperative scar recovery tricks.',
    conditionChecker: (state) => ['Plastic Surgeon', 'Registered Nurse'].includes(state.characterInfo.currentOccupation || ''),
    choices: [
      {
        text: 'Conduct a highly professional presentation.',
        outcomeText: 'You receive standing ovations! Your professional credentials soar.',
        adjustments: { happiness: 25, looks: 10, smarts: 20, stress: 10 },
        logText: 'You presented innovative wound-healing research to international panels.'
      },
      {
        text: 'Decline in favor of relaxing on the hotel pool deck.',
        outcomeText: 'Nice tan! You fully recharge your batteries, ignoring career networking.',
        adjustments: { happiness: 20, health: 15, stress: -20 },
        logText: 'You preferred poolside relaxation over medical presentation schedules.'
      }
    ]
  },
  {
    id: 'mid_med_13',
    title: 'Workplace: Experimental Surgical Instrument ⚙️',
    description: 'A robotics firm asks you to test an unapproved titanium tissue laser suturing device.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Plastic Surgeon',
    choices: [
      {
        text: 'Test it on a simulator dummy first.',
        outcomeText: 'The laser explodes! You saved lives by refusing to use unverified tools on humans.',
        adjustments: { happiness: 15, smarts: 25, karma: 10 },
        logText: 'You prudently simulator-tested experimental laser technology.'
      },
      {
        text: 'Use it on a patient to showcase cutting-edge bravery.',
        outcomeText: 'Minor tissue burns! You avoided catastrophic injury, but received severe executive warnings.',
        adjustments: { happiness: -20, health: -5, karma: -25, stress: 30 },
        logText: 'You utilized uncertified lasers on human patients, risking licenses.'
      }
    ]
  },

  // APPRENTICE PLUMBER & UBER DRIVER (Unskilled/Apprentice Labor) - 12 Scenarios
  {
    id: 'mid_lab_01',
    title: 'Workplace: Pipe Burst Catastrophe 🌊',
    description: 'You are deep in the crawlspace of a heavy apartment complex. A rusted high-pressure pipe bursts, shooting black sewage water.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Apprentice Plumber',
    choices: [
      {
        text: 'Dive onto the pipe and force-clamp the valve.',
        outcomeText: 'You stopped the leak! The manager calls you an absolute hero, though you smell of sewage for days.',
        adjustments: { happiness: 15, health: -10, karma: 20, stress: 25 },
        logText: 'You heroically clamped high-pressure sewage pipes with your bare hands.'
      },
      {
        text: 'Run away to call municipal utility teams.',
        outcomeText: 'The cellar flooded, causing $50,000 in property damage. The boss is furious at your raw instinct.',
        adjustments: { happiness: -20, stress: 30, smarts: -5 },
        logText: 'You panicked during plumbing flooding, letting cellar infrastructure submerge.'
      }
    ]
  },
  {
    id: 'mid_lab_02',
    title: 'Workplace: Late Night Backseat Screamer 🚗',
    description: 'A highly intoxicated passenger is screaming sports chants, kicking your front seat leather.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Uber Driver',
    choices: [
      {
        text: 'Pull over on the freeway side and kick them out.',
        outcomeText: 'They leave. You receive a 1-star review and a brief suspension, but your car is safe.',
        adjustments: { happiness: 5, looks: -5, stress: 15 },
        logText: 'You ejected rowdy, dangerous passengers on highway shoulders.'
      },
      {
        text: 'Turn up the radio and endure the ride softly.',
        outcomeText: 'They leave a sweet $20 cash tip and throw up on your door. Total nightmare.',
        adjustments: { happiness: -15, stress: 25, cash: 20 },
        logText: 'You endured drunken passenger abuse to secure minor tip cash.'
      }
    ]
  },
  {
    id: 'mid_lab_03',
    title: 'Workplace: Hand-Tool Upgrade Dilemma 🔧',
    description: 'The master plumber tells you to upgrade your manual copper tube cutters to a titanium hydraulic set ($1,500).',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Apprentice Plumber',
    choices: [
      {
        text: 'Invest in the premium titanium hydraulic cutters.',
        outcomeText: 'Your cut speeds triple! Work becomes a breeze, and your back pain disappears.',
        adjustments: { happiness: 20, smarts: 15, stress: -15, cash: -1500 },
        logText: 'You self-funded automated hydraulic plumbing cutters.'
      },
      {
        text: 'Hack away using rusted handsaws.',
        outcomeText: 'You save cash, but severe elbow strain and slow job turnarounds frustrate corporate inspectors.',
        adjustments: { happiness: -10, health: -10, stress: 15 },
        logText: 'You refused tool upgrades, leading to physical tendon strains.'
      }
    ]
  },
  {
    id: 'mid_lab_04',
    title: 'Workplace: Surge Pricing Multipliers 📊',
    description: 'A colossal blizzard rolls in. Uber ride rates surge to 4.5x, but roads are packed in slick black ice.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Uber Driver',
    choices: [
      {
        text: 'Drive into the frozen city grid to cash in.',
        outcomeText: 'You made a crazy $1,500 across five back-to-back slides! High risk, glorious returns.',
        adjustments: { happiness: 25, cash: 1500, stress: 35, health: -5 },
        logText: 'You drove dangerous blizzard conditions to exploit surge ride metrics.'
      },
      {
        text: 'Stay parked in a heated cafeteria eating donuts.',
        outcomeText: 'You saved your car from crashes. Your wallet is empty, but your body is warm.',
        adjustments: { happiness: 15, health: 5, stress: -20 },
        logText: 'You sat out dangerous ice road surges to preserve security.'
      }
    ]
  },
  {
    id: 'mid_lab_05',
    title: 'Workplace: Under-the-Counter Repair Job 🛠️',
    description: 'An elderly lady asks you to fix her heater for $400 cash, bypass logging it through the company depot.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Apprentice Plumber',
    choices: [
      {
        text: 'Fix it quietly for immediate cash.',
        outcomeText: 'You pocket the cash! However, the boss starts wondering why your digital repair van logs went dark.',
        adjustments: { happiness: 15, cash: 400, karma: -15, stress: 10 },
        logText: 'You performed illicit, unlogged plumbing repairs for pocket cash.'
      },
      {
        text: 'Log the ticket through standard office channels.',
        outcomeText: 'The office takes most of the yield, but you get official bonuses and perfect safety.',
        adjustments: { happiness: 10, karma: 15, smarts: 5 },
        logText: 'You logged consumer client inquiries according to guidelines.'
      }
    ]
  },
  {
    id: 'mid_lab_06',
    title: 'Workplace: Broken Cell GPS Crisis 📱',
    description: 'Your ride phone falls out of the mount, cracking its screen mid-ride in strange industrial suburbs.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Uber Driver',
    choices: [
      {
        text: 'Navigate using physical street signs and gut brains.',
        outcomeText: 'You got lost, but your passengers loved the retro adventure and left positive stars.',
        adjustments: { happiness: 15, smarts: 15, stress: 10 },
        logText: 'You navigated broken GPS maps using basic road logic.'
      },
      {
        text: 'Pull over and buy an emergency smartphone replacement ($400).',
        outcomeText: 'Your budget is bruised, but business resumes with high technological precision.',
        adjustments: { happiness: 5, cash: -400, stress: -10 },
        logText: 'You replaced broken phone utility rigs immediately.'
      }
    ]
  },
  {
    id: 'mid_lab_07',
    title: 'Workplace: Copper Scrap Bonanza 🛠️',
    description: 'A demolition team leaves $2,000 worth of old copper piping in the parking lot. Nobody seems to be tracking it.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Apprentice Plumber',
    choices: [
      {
        text: 'Load the scrap copper into your van and sell it.',
        outcomeText: 'You made $2,000 in pocket cash! However, you stay up listening for police sirens.',
        adjustments: { happiness: 20, cash: 2000, karma: -35, stress: 15 },
        logText: 'You quietly pocketed unattended job scrap metal for conversion.'
      },
      {
        text: 'Alert the lead site supervisor of the scrap.',
        outcomeText: 'The supervisor appreciates your massive honesty, assigning you to better premium client jobs.',
        adjustments: { happiness: 15, karma: 30, smarts: 10 },
        logText: 'You returned valuable building salvage to site supervisors.'
      }
    ]
  },
  {
    id: 'mid_lab_08',
    title: 'Workplace: Uber Car Detailing Matter ✨',
    description: 'A passenger leaves a thick trail of dog hair and muddy paw prints across your clean back seats.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Uber Driver',
    choices: [
      {
        text: 'Pay $120 for detailed surgical-level sanitization vacuums.',
        outcomeText: 'Your seats sparkle! Passengers leave sweet compliments on your pristine hygiene.',
        adjustments: { happiness: 10, looks: 5, cash: -120 },
        logText: 'You detailed transport cabins after messy canine passengers.'
      },
      {
        text: 'Slap the dirt off with grease towels and keep working.',
        outcomeText: 'Several riders complain, dropping your average star ratings.',
        adjustments: { happiness: -15, stress: 15, looks: -5 },
        logText: 'You ignored seat hair debris, triggering consumer alerts.'
      }
    ]
  },
  {
    id: 'mid_lab_09',
    title: 'Workplace: Apprenticeship Board Exam 📝',
    description: 'The National Plumbing Board is hosting the licensing exam today. It requires days of code reading.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Apprentice Plumber',
    choices: [
      {
        text: 'Study pipe configurations and pressure rates all weekend.',
        outcomeText: 'You passed easily! Your plumbing speed and knowledge are superb.',
        adjustments: { happiness: 25, smarts: 25, health: -5, stress: 15 },
        logText: 'You studied hard and cleared your plumbing credentials.'
      },
      {
        text: 'Skip studying and try to copy code answers.',
        outcomeText: 'You got caught, suspended, and heavily fined $500. A massive embarrassment.',
        adjustments: { happiness: -20, cash: -500, smarts: -10, stress: 30, karma: -20 },
        logText: 'You failed trade exams due to active cheating attempts.'
      }
    ]
  },
  {
    id: 'mid_lab_10',
    title: 'Workplace: Customer Accuses You of Fraud 😡',
    description: 'An angry driver claims you took the "long route" on purpose to spike their distance fares.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Uber Driver',
    choices: [
      {
        text: 'Politely walk them through your real-time mapping history.',
        outcomeText: 'They realize they were completely mistaken, apologize, and leave a sweet refund tip.',
        adjustments: { happiness: 15, smarts: 10, karma: 15 },
        logText: 'You diffused fraud accusations using system data records.'
      },
      {
        text: 'Lose your temper and scream at them to buy their own car.',
        outcomeText: 'They capture your anger on video! The clip goes viral, keeping you suspended for three weeks.',
        adjustments: { happiness: -25, looks: -15, stress: 35, karma: -15 },
        logText: 'You engaged in verbal roadside altercations, which went viral.'
      }
    ]
  },
  {
    id: 'mid_lab_11',
    title: 'Workplace: Hazardous Lead Paint Discovery ⚠️',
    description: 'While drilling plumbing lines in an old boiler room, you notices toxic asbestos boards crumbly near your skull.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Apprentice Plumber',
    choices: [
      {
        text: 'Halt work and demand proper toxic containment gear.',
        outcomeText: 'You saved your lungs! The site is closed for remediation. The client complains but you are safe.',
        adjustments: { happiness: 15, health: 15, stress: 5, karma: 10 },
        logText: 'You halted industrial plumbing work due to toxic asbestos concerns.'
      },
      {
        text: 'Hold your breath and drill through quickly.',
        outcomeText: 'You finished the task, but inhaled dangerous amounts of powdery dry asbestos dust.',
        adjustments: { happiness: -10, health: -30, smarts: -5, stress: 25 },
        logText: 'You bypassed asbestos safety protocols to expedite work speeds.'
      }
    ]
  },
  {
    id: 'mid_lab_12',
    title: 'Workplace: Fuel Efficiency Hack ⛽',
    description: 'A car forum claims putting mysterious engine additives doubles gas mileage, but voids catalytic warranties.',
    conditionChecker: (state) => state.characterInfo.currentOccupation === 'Uber Driver',
    choices: [
      {
        text: 'Skip the internet hacks. Trust standard engineering.',
        outcomeText: 'Your car runs seamlessly with zero mechanical complications.',
        adjustments: { happiness: 10, smarts: 10 },
        logText: 'You rejected sketchy car forum engine additives.'
      },
      {
        text: 'Pour the cheap mysterious formulas into your gasoline reservoir.',
        outcomeText: 'Your engine clogs! You have to spend $1,800 on full carburetor rebuilds.',
        adjustments: { happiness: -20, cash: -1800, health: -5, stress: 20 },
        logText: 'You ruined your vehicular catalytic converters with internet fuel hacks.'
      }
    ]
  }
];

// Topics for general mid-life transitions (Ages 26-45)
const MID_THEMES = [
  {
    category: "Suburban Home Care",
    nouns: ["smart thermostat panel", "leaking garden pool filter", "creaky garage door motor", "wooden tool storage shed", "low-flow showerhead adapter"],
    under35: [
      { text: "Fix the [Noun] yourself using online tutorials and cheap tools.", log: "You DIY-repaired your [Noun] with online videos.", outcome: "You scraped your knuckles, but the repair succeeded completely! You saved clean money.", adjust: { smarts: 15, cash: -120, stress: 10, happiness: 10 } },
      { text: "Hire a licensed master contractor to install a premium replacement for the [Noun].", log: "You hired a professional contractor for the [Noun].", outcome: "Flawless, licensed execution! It drained your cash balance, but your domestic stress vanished.", adjust: { cash: -1200, stress: -25, happiness: 15, looks: 5 } },
      { text: "Ignore the signs of wear on the [Noun], hoping it resolves itself.", log: "You deferred maintenance work on the [Noun].", outcome: "The issue worsened overnight, triggering a minor floor flood. A painful reminder of decay.", adjust: { health: -5, stress: 20, happiness: -15, smarts: -5 } }
    ],
    over35: [
      { text: "Upgrade the [Noun] to a top-tier voice-activated digital system.", log: "You smart-upgraded your home [Noun].", outcome: "Absolute convenience! Guests are green with envy at your glowing domestic automation.", adjust: { cash: -1800, happiness: 20, looks: 10, stress: -15 } },
      { text: "Confront your next-door neighbor, accusing them of disrupting your [Noun].", log: "You blamed the neighbor for issues with the [Noun].", outcome: "They slam their screen door on your face, and the neighborhood alliance calls you a crank.", adjust: { karma: -20, stress: 25, happiness: -10 } }
    ]
  },
  {
    category: "Parenting Challenges",
    nouns: ["smart digital baby monitor", "children’s advanced gaming system", "neighborhood math tutoring schedule", "wooden backyard treehouse beam", "kids' double-deck sports stroller"],
    under35: [
      { text: "Dedicate continuous hours to reading and caring near the [Noun] with patience.", log: "You invested patient time into caring for family near the [Noun].", outcome: "The children squeal with absolute delight, and their growth is exceptionally healthy.", adjust: { karma: 20, happiness: 25, health: -5, stress: 12 } },
      { text: "Bribe a relative or sibling to handle the [Noun] supervision for the evening.", log: "You paid a babysitter to monitor the [Noun] activities.", outcome: "You enjoyed a quiet, relaxing date night! Your wallet is lighter but romance is active.", adjust: { cash: -150, happiness: 20, stress: -20 } },
      { text: "Slip on noise-canceling headphones to drown out arguments over the [Noun].", log: "You masked domestic noise around the [Noun] with audio filters.", outcome: "The immediate stress goes down, but your partner glares at you with terrifying intensity.", adjust: { karma: -15, stress: -10, happiness: 5 } }
    ],
    over35: [
      { text: "Incur heavy academy tutoring expenses for premium advancement near the [Noun].", log: "You financed advanced tutoring modules related to the [Noun].", outcome: "They ace their exams! Your pride soars, although the premium bills are staggering.", adjust: { cash: -3500, smarts: 20, happiness: 15 } },
      { text: "Enroll the children in highly active sports programs featuring the [Noun].", log: "You organized active athletic training using the [Noun].", outcome: "Their physical conditioning surges, and your weekend drives are filled with cheerful bonding.", adjust: { cash: -600, health: 12, happiness: 20, stress: 10 } }
    ]
  },
  {
    category: "Financial Portfolios",
    nouns: ["unstable viral cryptocurrency wallet", "high-interest premium cash deposit", "sketchy local real estate flyer", "vintage classic comic collection", "government-backed series-I bond"],
    under35: [
      { text: "Allocate a small, safe portion of your monthly savings into the [Noun] steadily.", log: "You allocated safe monthly funds into the [Noun].", outcome: "Compound dividends grow slowly but securely. You sleep in absolute financial safety.", adjust: { smarts: 12, cash: -400, stress: -10, happiness: 10 } },
      { text: "Dump your entire liquid emergency savings directly into the [Noun] to double it.", log: "You gambled high stakes of liquid capital into the [Noun].", outcome: "Extreme market swings! Your blood pressure spikes, and your finance app flashes bold warning lines.", adjust: { health: -8, happiness: 15, stress: 30, cash: -3000, karma: -10 } },
      { text: "Sought professional advisory assessments from a certified planner regarding the [Noun].", log: "You hired financial planners to restructure the [Noun].", outcome: "They construct a bulletproof, tax-efficient hedge. You are fully aligned with industry guidelines.", adjust: { smarts: 20, cash: -300, stress: -15 } }
    ],
    over35: [
      { text: "Hedge your long-term retirement assets by adding the [Noun] to your private entity.", log: "You integrated the [Noun] into private family holdings.", outcome: "Your overall wealth rating rises, securing deep status and security for your aging relatives.", adjust: { cash: -8000, smarts: 15, happiness: 20 } },
      { text: "Speculate aggressively on short-term derivative positions based on the [Noun].", log: "You ran aggressive speculative trades on the [Noun].", outcome: "A sudden regulatory announcement wipes out $5,000 cash. Your tax logs look extremely messy.", adjust: { cash: -5000, stress: 25, happiness: -20, karma: -15 } }
    ]
  },
  {
    category: "Fitness & Recovery",
    nouns: ["carbon-foam running shoes", "rusty adjustable dumbbell rack", "premium health tracking smartwatch", "organic vegan protein tub", "adjustable orthopaedic desk chair"],
    under35: [
      { text: "Force yourself to complete demanding daily exercise circuits with your [Noun].", log: "You completed vigorous, strict sweat workouts using the [Noun].", outcome: "Your core stamina doubles! Your muscles are rock-hard, and you turn heads at local beaches.", adjust: { health: 22, looks: 15, stress: -10, happiness: 20 } },
      { text: "Hit the snooze button on your alarm, ignoring the [Noun] in favor of sweet sleep.", log: "You skipped physical exercises and let the [Noun] gather dust.", outcome: "You wake up sluggish and bloated, carrying mild guilt about your physical stagnation.", adjust: { health: -8, looks: -5, stress: -15, happiness: 10 } },
      { text: "Retain a certified personal trainer to design active routines around the [Noun].", log: "You hired certified training guidance centered around the [Noun].", outcome: "They push you to absolute limits! It hurts to laugh, but your muscular symmetry is elite.", adjust: { cash: -800, health: 18, looks: 12, stress: 10 } }
    ],
    over35: [
      { text: "Submit to a complete clinical diagnostic exam focusing on the use of the [Noun].", log: "You ran clinical physical panels and updated the [Noun] metrics.", outcome: "The physician notes positive improvements and gives you a glowing longevity forecast.", adjust: { health: 15, smarts: 15, cash: -400, stress: -15 } },
      { text: "Splurge on an expensive thermal muscle-recovery device paired with the [Noun].", log: "You bought advanced thermal muscle-recovery widgets for the [Noun].", outcome: "Absolute spa luxury! Your back tension is completely dissolved in heated massage loops.", adjust: { cash: -900, happiness: 25, health: 10, stress: -20 } }
    ]
  },
  {
    category: "Office & Corporate Hurdles",
    nouns: ["important quarterly spreadsheet spreadsheet", "high-resolution conference webcam", "confidential annual evaluation draft", "shared lounge coffee machine", "secure company file database"],
    under35: [
      { text: "Work all weekend at your desk, polishing every detail on the [Noun].", log: "You worked intense overtime hours to submit the [Noun].", outcome: "The senior managers are absolutely stunned by your speed. A promotion whisper enters hallways.", adjust: { smarts: 20, stress: 25, health: -12, happiness: 10 } },
      { text: "Delegate all stressful details of the [Noun] to an eager, unpaid young intern.", log: "You shifted tedious [Noun] details onto junior interns.", outcome: "You relax with golf tapes, but the intern accidentally copies a client logo crookedly, creating a minor splash.", adjust: { smarts: -10, karma: -20, stress: 15 } },
      { text: "Ask your department supervisor for clear guidance regarding the [Noun].", log: "You sought direct management counseling on the [Noun].", outcome: "They praise your superb organizational communication and help you smooth out all snags.", adjust: { smarts: 15, stress: -10, happiness: 10 } }
    ],
    over35: [
      { text: "Leverage your industry seniority to ask for a large pay bump linked to the [Noun].", log: "You demanded career salary bumps linked to the [Noun].", outcome: "VICTORY! They sign a $15,000 yearly increase to secure your rare, highly valuable experience.", adjust: { cash: 15000, looks: 10, stress: 15, happiness: 25 } },
      { text: "Quietly crawl alternative recruiter board sites to replace your current [Noun] duties.", log: "You browsed remote executive listings to escape the [Noun].", outcome: "Multiple competitive firms reach out with delicious signing bonuses. Your market value is high.", adjust: { smarts: 15, happiness: 15, stress: 10 } }
    ]
  },
  {
    category: "Neighborhood Guilds",
    nouns: ["strict neighborhood HOA manual", "unpaved sidewalk cement slab", "buzzing overhead streetlamp fuse", "misplaced parcel delivery carton", "wooden driveway boundary fence"],
    under35: [
      { text: "Host a delightful, friendly barbecue for the street centered around the [Noun].", log: "You hosted a friendly barbecue to resolve the [Noun] friction.", outcome: "Laughter is loud! Neighbors praise your wonderful character and agree to help with limits.", adjust: { happiness: 25, karma: 20, cash: -300, stress: -10 } },
      { text: "Ignore all warning notifications and letters concerning the [Noun].", log: "You ignored local neighborhood warnings regarding the [Noun].", outcome: "The HOA issues a heavy $400 fine and your name is printed in absolute disgrace. Drama spikes.", adjust: { cash: -400, stress: 20, happiness: -15, karma: -15 } },
      { text: "Draft a polite, highly constructive email to the district office about the [Noun].", log: "You wrote polite letters to district administrators on the [Noun].", outcome: "A maintenance van rolls up hours later, repairing everything with total precision.", adjust: { smarts: 12, karma: 15, stress: -10 } }
    ],
    over35: [
      { text: "Campaign aggressively to win the local presidency over the [Noun] disputes.", log: "You ran for local presidency to control the [Noun].", outcome: "You won! You are now the neighborhood czar, enforcing strict lawn codes with deep authority.", adjust: { looks: 15, smarts: 15, stress: 25, happiness: 20 } },
      { text: "Install heavy night-vision panoramic security cams to monitor the [Noun].", log: "You installed panoramic security cams to guard the [Noun].", outcome: "You feel fully secured, though delivery drivers avoid your porch, muttering about high paranoia.", adjust: { cash: -880, stress: -15, happiness: 12 } }
    ]
  },
  {
    category: "Marital Commitments",
    nouns: ["gourmet candlelit restaurant reservation", "cozy matching flannel loungewear", "five-star thermal spa ticket", "authentic handwritten family recipe", "matching polished gold wedding band"],
    under35: [
      { text: "Exert absolute creative effort to craft a gorgeous homemade surprise using the [Noun].", log: "You designed elegant home surprises featuring the [Noun].", outcome: "Tears of joy well up in their eyes. Your romantic relationship bond is stronger than titanium steel.", adjust: { happiness: 35, looks: 15, karma: 18, stress: -15 } },
      { text: "Grab some inexpensive, generic grocery flowers in place of the [Noun] last minute.", log: "You cheaped out on anniversary gifts in place of the [Noun].", outcome: "They accept them with a dry, disappointingly cold sigh. A shivering frost enters the bedroom.", adjust: { happiness: -15, looks: -10, stress: 15, cash: -30 } },
      { text: "Schedule a refreshing, high-altitude weekend mountain camping trek with the [Noun].", log: "You arranged refreshing scenic hiking journeys near the [Noun].", outcome: "Sweating under the stars! You reconnect beautifully away from toxic office monitors.", adjust: { health: 15, happiness: 25, stress: -20, cash: -120 } }
    ],
    over35: [
      { text: "Book an elite, private over-water beach villa including the premium [Noun] package.", log: "You booked elite private lagoon resorts featuring the [Noun].", outcome: "Absolute bucket-list heaven! You sip fresh coconut drinks on soft, warm sands, feeling wealthy.", adjust: { cash: -6000, happiness: 35, looks: 15, health: 10, stress: -25 } },
      { text: "Organize a grand public vow renewal event featuring custom designs of the [Noun].", log: "You hosted a formal renewed marriage event highlighting the [Noun].", outcome: "An exquisite ceremony! Family and friends toast your enduring, premium-tier romance.", adjust: { cash: -4000, looks: 20, happiness: 30, stress: -15 } }
    ]
  },
  {
    category: "Automotive Maintenance",
    nouns: ["worn engine transmission belt", "dented family car fender", "monthly expressway toll transponder", "cracked windshield glass pane", "monthly commuter train ticket"],
    under35: [
      { text: "Attempt to repair and mount the [Noun] yourself using online diagrams.", log: "You DIY-fixed vehicular damage to the [Noun].", outcome: "Grease is smeared on your cheeks, but the mechanical parts click cleanly! High accomplishment.", adjust: { smarts: 18, cash: -150, stress: 10 } },
      { text: "Take the vehicle to an official authorized service depot to solve the [Noun].", log: "You utilized authorized mechanical repair depots for the [Noun].", outcome: "They charge a premium rate, but your vehicle is returned clean with perfect guarantees.", adjust: { cash: -950, stress: -20, happiness: 12 } },
      { text: "Transition your commute to green passenger transit to bypass the [Noun] hassle.", log: "You shifted your daily transit to save stress on the [Noun].", outcome: "You walk more, increasing your lung health while getting plenty of cozy reading time in.", adjust: { health: 14, cash: 100, stress: -10, happiness: 15 } }
    ],
    over35: [
      { text: "Trade in your buggy wagon for a premium luxury hybrid featuring a new [Noun].", log: "You bought a high-performance hybrid with premium [Noun] systems.", outcome: "Its leather smells delightful! You glide silently past heavy highways in utter, elite insulation.", adjust: { cash: -24000, looks: 20, happiness: 25, stress: -15 } },
      { text: "Drive aggressively in fast expressway lanes, pushing the [Noun] to maximum limits.", log: "You pushed vehicular limits excessively past the [Noun].", outcome: "You save five minor minutes, but a heavy speed camera snaps your plate, sending a $350 fine.", adjust: { health: -10, stress: 25, cash: -350, karma: -15 } }
    ]
  },
  {
    category: "Creative Pursuits",
    nouns: ["vintage mechanical film camera", "handmade wooden acoustic guitar", "battered carbon fiber trail pole", "local league chess timer", "ultra-wide virtual reality headset"],
    under35: [
      { text: "Invest hundreds of hours practicing advanced techniques using the [Noun].", log: "You practiced creative methods using the [Noun] regularly.", outcome: "Your artistic output is legendary! Critics and friends are deeply moved by your creations.", adjust: { happiness: 25, smarts: 18, looks: 12, stress: -5 } },
      { text: "Stream your experimental performances featuring the [Noun] to worldwide online forums.", log: "You streamed creative performances highlighting the [Noun].", outcome: "Your clips go completely viral, earning hundreds of positive comments from worldwide fans.", adjust: { looks: 15, happiness: 25, stress: 12 } },
      { text: "Join a dedicated local amateur creators guild centered around the [Noun].", log: "You joined a local creators guild centered on the [Noun].", outcome: "You make amazing, loyal artistic friends, sharing hot cocoa and creative inspiration on cold nights.", adjust: { happiness: 20, karma: 15, stress: -15 } }
    ],
    over35: [
      { text: "Construct an exquisite custom soundproof studio in your house for the [Noun].", log: "You built a professional in-house studio for the [Noun].", outcome: "Your private creative retreat! It looks spectacular, shielding you from domestic worries.", adjust: { cash: -12000, happiness: 30, stress: -20 } },
      { text: "Acquire the absolute finest premium accessories available for the [Noun].", log: "You acquired finest professional accessories for the [Noun].", outcome: "Incredible quality! The premium craftsmanship elevates your hobby output into absolute fine art.", adjust: { cash: -4500, looks: 15, happiness: 25 } }
    ]
  },
  {
    category: "Tax & Wealth Defense",
    nouns: ["tedious annual tax assessment", "certified notary contract seal", "unpaid municipal traffic summons", "parental legacy legal folder", "premium family medical policy"],
    under35: [
      { text: "File all required documents related to the [Noun] meticulously before the deadline.", log: "You meticulously processed official papers for the [Noun].", outcome: "Clean, perfect compliance! You sleep like a happy, tax-compliant citizen with zero penalties.", adjust: { smarts: 15, stress: -15, karma: 15 } },
      { text: "Ignore the complicated notifications about the [Noun], hoping they fade away.", log: "You ignored legal notices concerning the [Noun].", outcome: "A heavy, freezing default judgement letter arrives from court. Your credit rating is badly bruised.", adjust: { cash: -1500, karma: -20, stress: 30, happiness: -20 } },
      { text: "Request a free public consultative advisor session on the [Noun].", log: "You consulted public advisory departments regarding the [Noun].", outcome: "You find a rare, little-known clause that legalizes a nice credit. Perfect financial strategy.", adjust: { smarts: 18, cash: 350, stress: -10, happiness: 10 } }
    ],
    over35: [
      { text: "Hire an elite corporate wealth specialist to fully shield your [Noun] interests.", log: "You retained elite wealth counsel for the [Noun] shielding.", outcome: "They structure dynamic private shields that maximize returns securely. Exceptional long-term planning.", adjust: { cash: -2500, smarts: 20, stress: -20, happiness: 15 } },
      { text: "Submit questionable expense write-offs under the [Noun] to cheat state tax codes.", log: "You attempted illegal write-off strategies linked to the [Noun].", outcome: "The audit team catches your sketchy logs instantly. You are hit with severe fines and penalties.", adjust: { cash: -4800, karma: -35, stress: 35, happiness: -25 } }
    ]
  }
];

const MID_SITUATIONS = [
  { desc: "Your daily routine is interrupted by a high-stakes suburban drama involving your [Noun].", titlePrefix: "Crisis of the" },
  { desc: "A highly stressful situation regarding safety and compliance arises from your [Noun].", titlePrefix: "Regulatory Issue with the" },
  { desc: "An unexpected family meeting centers around how your household manages the [Noun].", titlePrefix: "Household Dispute over" },
  { desc: "A sudden late-night emergency prompts you to verify the integrity of the [Noun].", titlePrefix: "Midnight Panic over the" },
  { desc: "Your spouse or long-term partner is extremely frustrated about the status of the [Noun].", titlePrefix: "Marital Struggle with the" },
  { desc: "An opportunistic salesperson offers you a suspicious upgrade related to your [Noun].", titlePrefix: "Upgrade Pitch for the" },
  { desc: "A wealthy executive relative queries you about your future plans with the [Noun].", titlePrefix: "Legacy Query over the" },
  { desc: "Your neighbor initiates a tense neighborhood discussion and points accusingly at your [Noun].", titlePrefix: "Neighbor Stand-off over" },
  { desc: "You receive a strange, certified envelope regarding your ownership of the [Noun].", titlePrefix: "Official Notice about" },
  { desc: "A dynamic health and longevity advisor warns you that your stress is heavily impacted by the [Noun].", titlePrefix: "Health Warning about the" }
];

interface GeneratedMidScenarioDef {
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

const generateAllMidScenarios = (): GeneratedMidScenarioDef[] => {
  const result: GeneratedMidScenarioDef[] = [];
  let generatedCount = 0;

  // 10 themes * 5 nouns * 10 situations = 500 unique permutations!
  for (let t = 0; t < MID_THEMES.length; t++) {
    const theme = MID_THEMES[t];
    for (let n = 0; n < theme.nouns.length; n++) {
      const noun = theme.nouns[n];
      for (let s = 0; s < MID_SITUATIONS.length; s++) {
        const sit = MID_SITUATIONS[s];

        const scenarioId = `mid_gen_${t}_n${n}_s${s}`;
        const uppercaseNoun = noun.charAt(0).toUpperCase() + noun.slice(1);
        const title = `${sit.titlePrefix} ${uppercaseNoun} 🏡`;
        const description = `${sit.desc.replace(/\[Noun\]/g, noun)} Real adulthood is defined by your choices under severe stress.`;

        // Age division: even generated indices get ages 26-34, odd get ages 35-45
        const isUnder35 = (generatedCount % 2 === 0);
        const minAge = isUnder35 ? 26 : 35;
        const maxAge = isUnder35 ? 34 : 45;

        // Build choices based on age range mapping
        const choices = theme.under35.map(u => ({
          text: u.text.replace(/\[Noun\]/g, noun),
          outcomeText: u.outcome.replace(/\[Noun\]/g, noun),
          adjustments: u.adjust,
          logText: u.log.replace(/\[Noun\]/g, noun)
        }));

        // Add 35+ choices if appropriate
        if (!isUnder35) {
          theme.over35.forEach(o => {
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

const rawGatedEvents: GameEvent[] = CAREER_GATED_EVENTS.map(evt => {
  return {
    id: evt.id,
    title: evt.title,
    description: evt.description,
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isRightAge = age >= 26 && age <= 45;
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

const generatedScenarios = generateAllMidScenarios();

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

export const adulthoodMidEvents: GameEvent[] = [
  ...rawGatedEvents,
  ...rawGeneratedEvents
];


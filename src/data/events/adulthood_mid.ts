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
const MID_GENERAL_TOPICS = [
  { theme: "First Mortgage Pitch", good: "building a clean 20% down payment deposit", bad: "leveraging your credit card limits for luxury hot tubs" },
  { theme: "Family Vacation Plan", good: "booking early low-cost local lodges", bad: "renting premium luxury yachts on high interest credit" },
  { theme: "Gym Body Rebuild", good: "eating fresh vegetables and swimming slow laps", bad: "buying dubious chemical muscle growth pills" },
  { theme: "The Neighborhood HOA", good: "painting your fence matching beige limits", bad: "installing a giant fluorescent wind-turbine on your lawn" },
  { theme: "Anniversary Surprise", good: "cooking their favorite handmade soup recipes", bad: "gifting them an automated vacuum dust cleaner" },
  { theme: "Backyard Barbecue Fire", good: "using low coal embers and keeping fire blankets near", bad: "spraying combustible lighter gel onto live charcoal" },
  { theme: "Taxes Management Audit", good: "hiring meticulous registered tax practitioners", bad: "writing down your dog as a dependent relative" },
  { theme: "Retirement Savings Pot", good: "indexing cash funds each month", bad: "sinking your life savings into unstable meme token schemes" },
  { theme: "School Parent-Tech Meeting", good: "volunteering to organize local digital class schedules", bad: "complaining loudly about cafeteria cookie portion limits" },
  { theme: "Neighbor Noise Matter", good: "offering fresh cookies and asking politely for peace", bad: "banging on their brick drywall with bowling pins" },
  { theme: "The Stolen Grill", good: "calling your insurance desk for replacement checks", bad: "running down alleys carrying backyard pool nets" }
];

const generateMidLifePool = (): MidScenarioDef[] => {
  const resultList = [...CAREER_GATED_EVENTS];
  let count = resultList.length;
  let topicIdx = 0;

  while (count < 150) {
    const topic = MID_GENERAL_TOPICS[topicIdx % MID_GENERAL_TOPICS.length];
    const eventIdNum = count + 1;
    const isOdd = count % 2 !== 0;

    const title = `Adulthood: ${topic.theme} 🏡 (#${eventIdNum})`;
    const description = `With your mid-life years progressing, you struggle with stability and security. You face a hard scenario regarding your ${topic.theme.toLowerCase()}. Real adults make real trade-offs.`;

    const choice1Text = topic.good.charAt(0).toUpperCase() + topic.good.slice(1) + '.';
    const choice1Outcome = `You handled your ${topic.theme.toLowerCase()} with incredible skill and patience. You feel completely secure and grounded.`;
    const adj1 = isOdd
      ? { happiness: 15, smarts: 15, stress: -10, karma: 10, cash: -200 }
      : { happiness: 12, health: 10, smarts: 10, stress: -15, karma: 15 };

    const choice2Text = topic.bad.charAt(0).toUpperCase() + topic.bad.slice(1) + '!';
    const choice2Outcome = `You decided to: ${topic.bad}! The immediate adrenaline rush was hilarious, but your life is now highly stressed and complicated.`;
    const adj2 = {
      happiness: 25,
      health: -15,
      smarts: -10,
      looks: -5,
      stress: 25,
      karma: -25,
      cash: isOdd ? -800 : 0
    };

    resultList.push({
      id: `mid_gen_${count}`,
      title,
      description,
      choices: [
        {
          text: choice1Text,
          outcomeText: choice1Outcome,
          adjustments: adj1,
          logText: `You resolved your ${topic.theme.toLowerCase()} with an elegant option.`
        },
        {
          text: choice2Text,
          outcomeText: choice2Outcome,
          adjustments: adj2,
          logText: `You triggered high volatility over your ${topic.theme.toLowerCase()}.`
        }
      ]
    });

    count++;
    topicIdx++;
  }

  return resultList;
};

const rawMidEvents = generateMidLifePool();

export const adulthoodMidEvents: GameEvent[] = rawMidEvents.map((evt) => {
  return {
    id: evt.id,
    title: evt.title,
    description: evt.description,
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isRightAge = age >= 26 && age <= 45;
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
            state.finances.cashBalance = Math.max(state.finances.cashBalance + c.adjustments.cash, -250000);
          }

          state.log.push(`Age ${state.characterInfo.age}: ${c.logText}`);
        }
      };
    })
  };
});

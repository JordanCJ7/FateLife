import { GameEvent, CharacterState } from '../../types';
import { adjustStats } from '../../utils';

export const adulthoodYoungEvents: GameEvent[] = [
  // ==========================================================================
  // UNIVERSITY DILEMMAS & HIGHER EDUCATION (AGES 18-22)
  // ==========================================================================
  {
    id: 'young_major_choice',
    title: 'The Academic Split 🎓',
    description: 'You stand in the marble atrium of the university department building. Your academic adviser taps his ballpoint pen on the mahogany desk: "It is time to declare. Do you want the rigorous logic of structural engineering, or the human soul of creative arts?"',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 19 && state.education.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Choose Computer Science to dedicate your mind to coding complex algorithms.',
        outcomeText: 'You commit your soul to compilers. You build intense machine learning smarts, but the endless labs spike your daily room stress.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: 15, happiness: -5 });
          state.education.currentMajor = 'Computer Science';
          state.log.push(`Age ${state.characterInfo.age}: Declared a major in Computer Science, diving deep into computer systems.`);
        }
      },
      {
        choiceText: 'Enroll in Creative Writing to master the power of pure literary expression.',
        outcomeText: 'You spend your afternoons reading romantic prose and writing experimental essays. Your stress melts, but your friends warn you about job markets.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, looks: 5, happiness: 15, stress: -10 });
          state.education.currentMajor = 'Creative Writing';
          state.log.push(`Age ${state.characterInfo.age}: Declared a major in Creative Writing, prioritizing artistic storytelling.`);
        }
      },
      {
        choiceText: 'Force a double-major in Chemistry and Philosophy to build a highly chaotic lifestyle.',
        outcomeText: 'You study quantum physics formulas followed by existentialist texts. Your brain feels incredibly sharp but completely exhausted.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, happiness: -10, stress: 25 });
          state.education.currentMajor = 'Chemistry & Philosophy';
          state.log.push(`Age ${state.characterInfo.age}: Took on a grueling double major in Chemistry and Philosophy.`);
        }
      },
      {
        choiceText: 'Duck the decision entirely and stay on an Undecided Liberal Arts track.',
        outcomeText: 'You select various general education courses, refusing to box your intellectual potential. Safe, simple, and relaxed.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 5, happiness: 5, stress: -15 });
          state.education.currentMajor = 'Liberal Arts';
          state.log.push(`Age ${state.characterInfo.age}: Remained undecided on a major, choosing general coursework instead.`);
        }
      }
    ]
  },
  {
    id: 'young_exam_cheat',
    title: 'The Golden Code Leak 📑',
    description: 'While searching for an empty workspace in the campus library, you find a printed packet sitting in an open tray. It is next week\'s Advanced Algorithms final exam, complete with the grading rubric and answer bank.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 22 && state.education.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Memorize the academic answers to secure an effortless perfect score.',
        outcomeText: 'You ace the final assignment with a flawless percentage! However, a deep, cold shiver of guilt sits in your stomach.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -25, happiness: 15, stress: -15 });
          state.education.grades = Math.min(100, state.education.grades + 20);
          state.log.push(`Age ${state.characterInfo.age}: Secretly used leaked answer keys to achieve top grades on the final exam.`);
        }
      },
      {
        choiceText: 'Turn the packet in to the department head to report the library leak.',
        outcomeText: 'The department dean praises your academic honesty and sends a global memo resetting the exam. Your grades get a minor honor bump.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, smarts: 10, stress: 10 });
          state.education.grades = Math.min(100, state.education.grades + 5);
          state.log.push(`Age ${state.characterInfo.age}: Handed leaked exam papers to the department head with strict integrity.`);
        }
      },
      {
        choiceText: 'Shred the papers instantly in the corridor recycling bin to preserve academic honor.',
        outcomeText: 'The shredder whirs, eating the evidence. You choose to pass or fail on your own merit alone. No drama, no compromise.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Destroyed a set of leaked exam materials to avoid cheating temptations.`);
        }
      }
    ]
  },
  {
    id: 'young_group_project_slack',
    title: 'The Slackers\' Mutiny 📊',
    description: 'The final presentation for your Economics seminar is tomorrow, worth forty percent of your score. Your three randomly assigned group members have completely stopped responding to group chats and emails.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 22 && state.education.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Brew twin batches of heavy espresso and build the entire presentation deck yourself.',
        outcomeText: 'You burn the midnight oil, generating eighty charts and slide transitions. The teacher gives the group an A, but you are physically shattered.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, health: -10, stress: 25, happiness: -5 });
          state.education.grades = Math.min(100, state.education.grades + 15);
          state.log.push(`Age ${state.characterInfo.age}: Bootstrapped a major Economics team presentation alone due to slacking peers.`);
        }
      },
      {
        choiceText: 'Submit the files with only your name, attaching screenshots of their inactivity to the professor.',
        outcomeText: 'The professor marks your grade as dynamic while failing the other group members. They glare at you on campus, but your effort is validated.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -15, smarts: 10, stress: 15 });
          state.education.grades = Math.min(100, state.education.grades + 10);
          state.log.push(`Age ${state.characterInfo.age}: Reported slacking teammates to the professor with objective screenshots.`);
        }
      },
      {
        choiceText: 'Let the slides fail to teach your group members a lesson in professional accountability.',
        outcomeText: 'Nobody presents. The team is awarded a zero. While they are horrified, your grade takes a major, bruising hit.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 10, happiness: -20, stress: -10 });
          state.education.grades = Math.max(0, state.education.grades - 25);
          state.log.push(`Age ${state.characterInfo.age}: Allowed an economics slide presentation to fail to protest lazy partners.`);
        }
      }
    ]
  },
  {
    id: 'young_frat_haze',
    title: 'The Pledge Trial 🕯️',
    description: 'Under the dim orange lanterns of the frat basement, the captains grin widely. They slide a giant bowl of raw, fiery wasabi paste toward you: "Eat this spoonful in one go, or lose your badge pledge status."',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 20 && state.education.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Swallow the fiery green paste to secure your brotherhood membership.',
        outcomeText: 'Your nose burns with chemical fire, and you tear up instantly. The fraternity roars in approval. You are official, but your organs weep.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -15, looks: 10, happiness: 15, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: Suffered through a brutal wasabi pledging challenge to join a fraternity.`);
        }
      },
      {
        choiceText: 'Refuse with loud, sarcastic laughter and walk out of the fraternity gates forever.',
        outcomeText: 'Host wasabi? No thank you. You turn on your heels, leaving their childish basement behind. You feel incredibly proud and stress-free.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 10, happiness: 5, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: Proudly walked away from fraternity recruitment after rejecting a hazy challenge.`);
        }
      },
      {
        choiceText: 'Transfer a secret fifty-dollar bribe to the captain to escape the frosty challenge.',
        outcomeText: 'You slide a crisp green bill into his back pocket. He chuckles, marking you as passed, but your moral integrity dips slightly.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -20, smarts: 12, stress: 5 });
          state.finances.cashBalance -= 50;
          state.log.push(`Age ${state.characterInfo.age}: Bribed a fraternity organizer with fifty dollars to skip an initiation challenge.`);
        }
      }
    ]
  },

  // ==========================================================================
  // FINANCIAL BOOTSTRAPPING & LANDLORDS (AGES 18-25)
  // ==========================================================================
  {
    id: 'young_loan_notice',
    title: 'The Interest Horizon 💸',
    description: 'You open your email with a sinking heart. Inside is your digital financial aid statement, detailing your thousands in high-interest student loans. The projected compound interest curve rises like a mountain.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Adopt a strict budget of dry instant noodles to send extra cash to the balance.',
        outcomeText: 'You pack your cupboards with budget food. Your cash reserves sink, but you get ahead of the compounding interest devil early.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, happiness: -15, stress: 15 });
          state.finances.cashBalance -= 500;
          state.log.push(`Age ${state.characterInfo.age}: Began aggressively paying down student debt on a highly restricted diet.`);
        }
      },
      {
        choiceText: 'Lock the paper document deep inside your dresser drawer and avoid thinking about it.',
        outcomeText: 'Out of sight, out of mind! You spend your week enjoying local movies, though a dark shadow awaits you in the future.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 10, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Ignored outstanding debt statements to live in temporary comfort.`);
        }
      },
      {
        choiceText: 'Schedule an urgent meeting with a campus financial adviser to negotiate grants.',
        outcomeText: 'The adviser finds a local state-sponsored textbook bursary! You learn valuable real-world finance skills and save some money.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -5 });
          state.finances.cashBalance += 200;
          state.log.push(`Age ${state.characterInfo.age}: Consulted a campus advisor to successfully offset debt with specialized book grants.`);
        }
      }
    ]
  },
  {
    id: 'young_checking_crisis',
    title: 'The Empty Vault Ledger 📉',
    description: 'While attempting to purchase a light commuter bagel, your mobile application sounds a sharp alarm. Your checkings balance shows exactly $4.17, and a fifteen-dollar maintenance charge is scheduled to clear tomorrow morning.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Catalog and sell five prized childhood comic books at the local thrift market.',
        outcomeText: 'A collector eyes your vintage covers, handing you eighty dollars cash. You dodge the bank overdraw, but you miss those colorful stories.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -8, stress: -10 });
          state.finances.cashBalance += 80;
          state.log.push(`Age ${state.characterInfo.age}: Sold five precious childhood comic books to avoid checking fees.`);
        }
      },
      {
        choiceText: 'Appeal to the local branch bank teller with a warm, charming smile for relief.',
        outcomeText: 'You explain your student struggles with honest puppy eyes. The teller laughs and clicks her computer, waiving the charge dynamic.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 12, looks: 10, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Convinced a bank teller to waive an administrative fee using personal charm.`);
        }
      },
      {
        choiceText: 'Ask [Parent] for a small financial loan of seventy-five dollars to cover bills.',
        outcomeText: 'Your parent sighs, sending details of a bank transfer along with a lecture about your spending habits. Your checking balance is saved.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 5, happiness: -10, stress: -5 });
          state.finances.cashBalance += 75;
          const parent = state.relationships.find(r => r.relationshipType === 'Parent');
          if (parent) parent.relationshipValue = Math.max(0, parent.relationshipValue - 5);
          state.log.push(`Age ${state.characterInfo.age}: Requested a quick cash lifeline from [Parent] to keep your bank balance positive.`);
        }
      }
    ]
  },
  {
    id: 'young_landlord_shakedown',
    title: 'The Sticky Sticker Fee 🏢',
    description: 'Your aggressive apartment manager bangs on your door. He points his clipboard directly at your balcony window: "That minor sticker you placed on the glass ruined the weather seal. That is a mandatory $350 restoration charge."',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 19 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Hand over the three hundred and fifty dollars to protect your residential peace.',
        outcomeText: 'You count out the bills. It is a massive bite out of your savings, but you avoid any scary eviction threats.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -15, stress: 10 });
          state.finances.cashBalance -= 350;
          state.log.push(`Age ${state.characterInfo.age}: Paid an unfair window repair charge to avoid confrontations with your landlord.`);
        }
      },
      {
        choiceText: 'Deliver a detailed reading of the official municipal tenant legal protection manual.',
        outcomeText: 'You cite sub-section four of the housing code, explaining that adhesive wear is considered standard apartment utility. The landlord grumbles and drops the fee.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: Successfully defended yourself against a landlords illegal fee using local tenant laws.`);
        }
      },
      {
        choiceText: 'Refuse to pay the fine, threatening to run a public campaign detailing their tactics.',
        outcomeText: 'You tell them you will post video reviews of their maintenance. They scowl, claiming this is not over, but they quickly walk down the stairs.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -10, looks: 5, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Rebuffed a landlord shakedown with public publicity threats.`);
        }
      }
    ]
  },
  {
    id: 'young_flatmate_bills',
    title: 'The Power Grid War 🔌',
    description: 'Your shared flat utility bill has suddenly tripled. Upon inspecting the hallway, you discover your quiet roommate has set up three loud computer systems in their bedroom to farm digital coins.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Insist they pay seventy-five percent of the electrical utility bill immediately.',
        outcomeText: 'After a tense, hour-long kitchen table negotiation, they grumblingly slide you some cash. The flat atmosphere is highly frosty now.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: 15 });
          state.finances.cashBalance -= 40;
          state.log.push(`Age ${state.characterInfo.age}: Confronted your roommate over their high electricity consumption, forcing them to pay.`);
        }
      },
      {
        choiceText: 'Disconnect their bedroom circuit breaker secretly whenever they go to sleep.',
        outcomeText: 'You click the black switches under the stairs in the dark. Their digital farming halts, saving energy, but they keep screaming about constant power outages.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -25, smarts: 15, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: Secretly sabotaged your roommates crypto mining rig by flipping circuit switches.`);
        }
      },
      {
        choiceText: 'Absorb the cost of the utility invoice to avoid destroying roommate harmony.',
        outcomeText: 'You pay the utility firm with a weeping wallet. Roommate peace is preserved, but you are completely broke.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 15, happiness: -10, stress: -10 });
          state.finances.cashBalance -= 180;
          state.log.push(`Age ${state.characterInfo.age}: Paid a huge electricity invoice alone to keep flatmate peace.`);
        }
      }
    ]
  },
  {
    id: 'young_used_car_lemon',
    title: 'The Squeaking Steel Hatch 🚗',
    description: 'An old neighborhood mechanic who introduces himself as "Discount Dan" shows you a rusted yellow hatchback. "The engine has a tiny rattle," Dan whispers, clicking his pliers, "but it builds character. Only $700 cash!"',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 22;
    },
    choices: [
      {
        choiceText: 'Pay the cash immediately to secure your first real motor vehicle.',
        outcomeText: 'The rusty yellow hatch squeaks, but it rolls! You finally have a real license and transportation, even if the engine smokes slightly on hills.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -5, happiness: 15, stress: 15 });
          state.finances.cashBalance -= 700;
          state.characterInfo.hasLicense = true;
          state.log.push(`Age ${state.characterInfo.age}: Purchased a heavily rusted starter commuter hatchback from a discount garage.`);
        }
      },
      {
        choiceText: 'Hire a professional technician to run a full diagnostic mechanical check.',
        outcomeText: 'The inspection diagnostic reveals the brake fluid lines are held together by cheap adhesive tape. You politely decline and Dan glares at you.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -10 });
          state.finances.cashBalance -= 80;
          state.log.push(`Age ${state.characterInfo.age}: Paid eighty dollars for a safety inspection, identifying a dangerous used-car trap.`);
        }
      },
      {
        choiceText: 'Tell Discount Dan his rusted car belongs in a museum and take the train.',
        outcomeText: 'You walk away, boarding the local commuter bus with your cash reserves perfectly intact. No lemon disasters for you.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: Rejected a sketchy used-car sale to maintain public transit habits.`);
        }
      }
    ]
  },

  // ==========================================================================
  // INTENSE CORPORATE ENTRY & INTERNSHIPS (AGES 20-25)
  // ==========================================================================
  {
    id: 'young_intense_panel_interview',
    title: 'The Glass Cage Review 👔',
    description: 'You sit behind a massive, polished glass table while three unblinking corporate directors review your credentials. "We reviewed your background," the VP hums. "Explain why you should be chosen over ninety other applicants."',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 21 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Deliver a fast, energetic speech filled with modern corporate synergy buzzwords.',
        outcomeText: 'They eat up the jargon! The board offers you an entry-level Analyst position earning $45,000. Your suit is stiff, but you are official.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, looks: 10, stress: 20 });
          state.characterInfo.currentOccupation = 'Junior Corporate Analyst';
          state.finances.annualSalary = 45000;
          state.log.push(`Age ${state.characterInfo.age}: Secured an entry-level analyst position after a buzzword-heavy business interview.`);
        }
      },
      {
        choiceText: 'Offer a humble, raw philosophical discussion on your dedication to practical craft.',
        outcomeText: 'The panel is slightly taken aback but admires your candor. They hire you as a Project Assistant at $38,000. Less pay, but better respect.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 15, smarts: 12, stress: 10 });
          state.characterInfo.currentOccupation = 'Project Support Specialist';
          state.finances.annualSalary = 38000;
          state.log.push(`Age ${state.characterInfo.age}: Secured a project support role through sincere candidate interviews.`);
        }
      },
      {
        choiceText: 'Highlight your previous tech-focused side projects with high technical detail.',
        outcomeText: 'Your coding portfolio completely dazzles the technical director! He pulls strings to place you in as a Technical Associate at a comfortable $52,000.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: 15 });
          state.characterInfo.currentOccupation = 'Technical Associate';
          state.finances.annualSalary = 52000;
          state.log.push(`Age ${state.characterInfo.age}: Placed directly into a core technology role using your specialized portfolios.`);
        }
      },
      {
        choiceText: 'Freeze up entirely under pressure, stammering an incoherent loop about your hobbies.',
        outcomeText: 'The recruiters look at each other awkwardly. "We will be in touch," they lie. You walk home in lonely, burning humiliation.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -20, looks: -10, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Froze under pressure during a critical office interview, getting rejected.`);
        }
      }
    ]
  },
  {
    id: 'young_passive_manager',
    title: 'The Invisible Intern 📂',
    description: 'You notice your immediate supervisor has been leaving your name off key email chains for client briefings, despite you being the main research author for their data decks.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 21 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Book a brief, professional meeting in their office to ask about the omitted invites.',
        outcomeText: 'You present details of your author credits. Your manager blushes, blaming a calendar glitch, and updates your permissions. Integrity paid off.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 14, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Assertively secured calendar invites to key briefings after speaking with your manager.`);
        }
      },
      {
        choiceText: 'Present them with an artisanal gourmet pastry during the morning coffee run.',
        outcomeText: 'They devour the buttery croissant, weeping with corporate joy. They suddenly remember to introduce you to the regional CEO. Strategic sugar.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 10, karma: 10, stress: -5 });
          state.finances.cashBalance -= 15;
          state.log.push(`Age ${state.characterInfo.age}: Charmed a cold office supervisor using a premium breakfast bribe.`);
        }
      },
      {
        choiceText: 'Report the calendar exclusions to human resources with dated, printed screenshots.',
        outcomeText: 'Human resources runs an inquiry. Your supervisor is reprimanded but now glares at you like they want to end your career. Extremely tense hallways.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -15, smarts: 12, stress: 25 });
          state.log.push(`Age ${state.characterInfo.age}: Lodged formal complaints against your manager with HR over project erasure.`);
        }
      }
    ]
  },
  {
    id: 'young_presentation_error',
    title: 'The Whisker Slide 💻',
    description: 'You are presenting your department\'s quarterly fiscal review. When you click to the next high-definition slide, a giant picture of a cross-eyed kitten wearing a paper helmet appears on the panel board screen.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 21 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Incorporate the funny kitten slide into your pitch as a metaphor for creative business flexibility.',
        outcomeText: 'The room erupts into heavy laughter! The vice president grins: "Fabulous recovery. You have real charisma." You save your project.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, looks: 18, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Recovered from a slideshow disaster in front of the board with charming humor.`);
        }
      },
      {
        choiceText: 'Blush a deep crimson red, shut the laptop immediately, and stammer an apology.',
        outcomeText: 'You fumble with the laptop, closing the cover. The silent boardroom is freezing. They write you down as highly unpolished.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -15, looks: -12, stress: 25 });
          state.log.push(`Age ${state.characterInfo.age}: Panicked during a slideshow presentation error, suffering major professional embarrassment.`);
        }
      },
      {
        choiceText: 'Apologize quickly, explaining that the junior team intern must have corrupted the files.',
        outcomeText: 'You point fingers to protect yourself. While your supervisor accepts the excuse, the intern weeps in the bathroom. You feel terribly cold.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -25, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Deflected blame onto a young office intern to escape slipup consequences.`);
        }
      }
    ]
  },
  {
    id: 'young_internship_grind',
    title: 'The Envelope Empire ✉️',
    description: 'Your summer corporate internship has degenerated into an endless assembly line of stuffing blue research flyers into fifty official white envelopes for nine hours a day.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 20 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Pack the envelopes with professional speed to prove your reliable work ethic.',
        outcomeText: 'You complete five thousand packets with beautiful folds. Your fingers have papercuts, but the division managers write you down as reliable.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Ground out tedious envelope-stuffing internship tasks with silent diligence.`);
        }
      },
      {
        choiceText: 'Write funny little custom haiku poems inside ten of the random envelopes.',
        outcomeText: 'A client receives a poem about spreadsheets and posts it online! The company gains cute viral loops. Sassy creativity wins.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -10, looks: 5, happiness: 20 });
          state.log.push(`Age ${state.characterInfo.age}: Slipped funny custom haiku messages inside professional outbound mailings.`);
        }
      },
      {
        choiceText: 'Ask the managing partner for twenty minutes to present your actual research notes.',
        outcomeText: 'The partner is impressed by your raw courage. They pull you off the mail desk, assigning you to shadow a real research case trial.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: 10, looks: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Successfully requested real analytical work, escaping basic office chores.`);
        }
      }
    ]
  },
  {
    id: 'young_career_pivot',
    title: 'The Radish Call 🚜',
    description: 'Your entry-level desk routine is completely draining your spirit. A high school classmate calls you in excitement: "We are expanding our organic apple orchards in the hills. We need a partner of gold."',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 22 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Pack your files and leave the city to harvest green apples under the warm sun.',
        outcomeText: 'You resign from your stiff suit. You spend your days lifting heavy crates and breathing clean mountain wind. Your health soars, although cash drops.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 25, happiness: 20, stress: -20 });
          state.characterInfo.currentOccupation = 'Organic Orchard Specialist';
          state.finances.annualSalary = 18000;
          state.log.push(`Age ${state.characterInfo.age}: Resigned from corporate jobs to pursue agricultural orchard farming.`);
        }
      },
      {
        choiceText: 'Decline the agricultural offer, opting to grow a small basil garden on your kitchen sill.',
        outcomeText: 'You choose urban stability. You water your single green herb pot daily, finding simple, tiny moments of nature in the concrete grid.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 8, happiness: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Maintained your professional occupation while starting local kitchen garden hobbies.`);
        }
      },
      {
        choiceText: 'Work your urban day job while spending night hours building a creative design agency.',
        outcomeText: 'You work sixteen hours a day, coding client sites until dawn. Your checking account looks very healthy, but you have dark bags under your eyes.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, looks: 5, stress: 30 });
          state.finances.cashBalance += 500;
          state.log.push(`Age ${state.characterInfo.age}: Bootstrapped an indie web agency in your night hours alongside a day job.`);
        }
      }
    ]
  },
  {
    id: 'young_startup_gamble',
    title: 'The Shark Deal 🦈',
    description: 'A wealthy venture capitalist in a custom silk blazer absolutely loves your prototype dating app. He offers you a fifty thousand dollar funding package, but demands eighty-five percent ownership of your codebase and logo.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 21 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Sign his term sheet, thrilled to see your app logo on street billboards.',
        outcomeText: 'Your bank balance swells massive! However, you discover you have zero vote on your own company board. You are a passenger in your own company.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: 20 });
          state.finances.cashBalance += 50000;
          state.log.push(`Age ${state.characterInfo.age}: Sold the majority of your startup intellectual rights for fifty thousand dollars.`);
        }
      },
      {
        choiceText: 'Reject his offer to bootstrap your software alone in late-night hobby hours.',
        outcomeText: 'You walk away from his money to protect your independent design. The road is slow and flat, but you own every single byte of code.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 22, happiness: 12, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Refused check offers from an aggressive venture capital fund to protect software ownership.`);
        }
      },
      {
        choiceText: 'Propose a counter-deal of thirty percent equity in exchange for a smaller check.',
        outcomeText: 'He respects your business backbone! He agrees to thirty thousand for thirty percent ownership. You secure real capital with minimal sellout.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, looks: 12, stress: 10 });
          state.finances.cashBalance += 30000;
          state.log.push(`Age ${state.characterInfo.age}: Masterfully negotiated a balanced funding seed round for your app.`);
        }
      }
    ]
  },

  // ==========================================================================
  // MODERN ROMANCE & SOCIAL ADVENTURES (AGES 18-25)
  // ==========================================================================
  {
    id: 'young_blind_date_disaster',
    title: 'The Dirt Conversation 🍽️',
    description: 'Your campus flatmate set you up on a blind lunch date. For forty minutes, your date has been showing you raw geological dirt samples on their phone, explaining the complex layers of mountain clay.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Nod with enthusiastic interest, asking detailed questions about deep soil clay.',
        outcomeText: 'Your polite patience melts their heart! They write a warm message to your flatmate praising your amazing listening ears. Karma peaks.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 15, smarts: 10, looks: 5, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Sat through a highly geological blind date, learning details about soil classification.`);
        }
      },
      {
        choiceText: 'Duck into the corridor restroom to send a code word text to your sibling.',
        outcomeText: 'You send the emergency warning signal. Ten minutes later, your phone rings with a fake family crisis call. You exit the restaurant in a hurry.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 12, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Fabricated an emergency crisis call to escape a geological blind date.`);
        }
      },
      {
        choiceText: 'Deliver a blunt apology about an early curfew, pay your table portion, and leave.',
        outcomeText: 'You tell them you have homework due at midnight. You pay for your bagel and walk out. Their face is frozen, but you saved your sunny afternoon.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 5, looks: -5, stress: -10 });
          state.finances.cashBalance -= 18;
          state.log.push(`Age ${state.characterInfo.age}: Explicitly cut a painful blind-date short to salvage your weekend time.`);
        }
      }
    ]
  },
  {
    id: 'young_dating_app_safety',
    title: 'The Shadow Match 📱',
    description: 'You match with a mysterious dating profile containing a blurry, aesthetic forest photo. The description biography is blank except for a coordinates indicator pointing to a dark steel bridge downtown.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Block the coordinates-based profile instantly to guarantee your safety.',
        outcomeText: 'You click block, deleting the shadow profile. No mysterious forest traps for you. Your safety levels remain perfectly secure.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: Safely blocked an unverified coordinate-matching profile on mobile apps.`);
        }
      },
      {
        choiceText: 'Send them a message proposing to meet inside a bright, busy gelato parlor.',
        outcomeText: 'They reply with "Gelato sounds lovely." You meet near public cameras, sharing classic chocolate cups. They turn out to be a sweet, shy artist.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, looks: 8, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Negotiated a safe, public meeting layout with a private dating match.`);
        }
      },
      {
        choiceText: 'Walk to the downtown steel bridge at midnight to see if anyone is there.',
        outcomeText: 'You stand under the freezing wind. Nobody is there except three wild raccoons who chew on your shoelaces. Your head is cold and you get sick.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -20, happiness: -15, stress: 30 });
          state.log.push(`Age ${state.characterInfo.age}: Traveled to unverified bridge coordinates at midnight, catching a cold.`);
        }
      }
    ]
  },
  {
    id: 'young_music_festival_mud',
    title: 'The Swamp Stage 🎸',
    description: 'Heavy summer rainstorms have turned your weekend music festival into a deep, squelching marsh of dark mud. The canvas tents are leaking, but the headlining indie band is about to walk out.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Dive directly into the giant muck pit to dance under the speakers.',
        outcomeText: 'You slide flat on your chest in the slush! You cover your coat in pitch-black mud, but the crowd cheers your absolute raw festival spirit.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, looks: 15, happiness: 30, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: Celebrated an indie concert by diving headlong into deep marsh-stage mud.`);
        }
      },
      {
        choiceText: 'Lock yourself inside your travel tent to read a classic novel in peace.',
        outcomeText: 'You zip the nylon window shut. Listening to the distant acoustic guitar bass while reading by lantern light is cozy and dry.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 12, happiness: 10, stress: -12 });
          state.log.push(`Age ${state.characterInfo.age}: Stayed dry reading novels inside your tent to escape a rainy concert storm.`);
        }
      },
      {
        choiceText: 'Check out of the festival grounds and book a clean local motel bedroom online.',
        outcomeText: 'You pack your soggy backpack and escape. A hot shower and a king-sized mattress restore your humanity. Expensive, but exquisite.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 10, happiness: 15, stress: -15 });
          state.finances.cashBalance -= 140;
          state.log.push(`Age ${state.characterInfo.age}: Left a soggy music campground early to sleep in a warm municipal motel.`);
        }
      }
    ]
  },
  {
    id: 'young_viral_shame',
    title: 'The Slip of Campus 🍌',
    description: 'A clip of you slipping on frozen ice steps and losing your binder is posted to a local video form. Within hours, it accumulates forty thousand views under the trending tag "Noodle Leg."',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Embrace the joke by launching a comical account titled "Noodle Leg Champion."',
        outcomeText: 'You post satirical videos of yourself sliding into groceries and class. You gain twelve thousand followers overnight. Digital marketing master!',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 14, happiness: 20, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: Converted a viral slip footage slipup into a popular comedy social handle.`);
        }
      },
      {
        choiceText: 'File formal digital takedown requests to erase the video footage.',
        outcomeText: 'You send heated forms to the platform operators. The video is finally removed, but the stressful search-engine paperwork took weeks.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 12, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Filed legal platform reviews to wipe embarrassing viral footage from local directories.`);
        }
      },
      {
        choiceText: 'Turn off your mobile phone completely and ignore the digital forums.',
        outcomeText: 'You lock your screen in a drawer. Out in the real world, nobody actually stops you. The digital gossip blows over in three days.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 5, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Power-cycled your mobile devices to shield your mental focus from digital gossip.`);
        }
      }
    ]
  },

  // ==========================================================================
  // RELATIONSHIPS & SIBLING CRISES (AGES 18-25)
  // ==========================================================================
  {
    id: 'young_family_holiday_interrogation',
    title: 'The Holiday Inquisition 🦃',
    description: 'At the crowded dinner table, [Parent] stops carving the roast turkey to stare down at you: "So, when are you going to stop staying inside coding and bring a nice partner home to meet us?"',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const hasParent = state.relationships.some(r => r.relationshipType === 'Parent' && !r.isDead);
      return age !== undefined && age >= 18 && age <= 25 && hasParent;
    },
    choices: [
      {
        choiceText: 'Explain your complex romantic philosophy with highly animated, humorous gestures.',
        outcomeText: 'The table roars at your self-deprecating jokes. Even your parent chuckles, passing you the sweet potato tray with an analytical grin.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 12, happiness: 15, stress: 5 });
          const parent = state.relationships.find(r => r.relationshipType === 'Parent' && !r.isDead);
          if (parent) parent.relationshipValue = Math.min(100, parent.relationshipValue + 10);
          state.log.push(`Age ${state.characterInfo.age}: Defused family pressure regarding romance by explaining your dating philosophies with humor.`);
        }
      },
      {
        choiceText: 'Hand them a printed folder detailing your five-year corporate career roadmap.',
        outcomeText: 'Your parent reads your projected income milestones. They blink, adjusting their spectacles: "Well, at least someone around here is tracking their finances."',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, stress: 10 });
          const parent = state.relationships.find(r => r.relationshipType === 'Parent' && !r.isDead);
          if (parent) parent.relationshipValue = Math.min(100, parent.relationshipValue + 5);
          state.log.push(`Age ${state.characterInfo.age}: Satisfied parental goals by showing them your detailed career roadmap binders.`);
        }
      },
      {
        choiceText: 'Excuse yourself quietly to wash thirty greasy holiday dishes in the kitchen.',
        outcomeText: 'You stand inside the warm steam, scraping cranberry stains off porcelain plates. You avoid the family interrogation completely, earning chore karma.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 15, stress: -10 });
          const parent = state.relationships.find(r => r.relationshipType === 'Parent' && !r.isDead);
          if (parent) parent.relationshipValue = Math.min(100, parent.relationshipValue + 15);
          state.log.push(`Age ${state.characterInfo.age}: Cleaned the family dinner dishes to quietly escape a heavy romance grilling.`);
        }
      }
    ]
  },
  {
    id: 'young_romance_partner_argument',
    title: 'The Swedish Maze Dispute 🇸🇪',
    description: 'You and [Partner] are standing under the freezing light tubes of the massive Swedish furniture warehouse. You are locked in an intense fight over which modular wooden desk fits your shared space.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const hasPartner = state.relationships.some(r => r.relationshipType === 'Partner' && !r.isDead);
      return age !== undefined && age >= 18 && age <= 25 && hasPartner;
    },
    choices: [
      {
        choiceText: 'Yield the furniture debate completely, praising their superior design tastes.',
        outcomeText: 'They smile warmly, wrapping you in a cozy, Swedish-meatball fueled hug. Partner harmony is completely restored.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 5, happiness: 15, stress: -10 });
          const partner = state.relationships.find(r => r.relationshipType === 'Partner' && !r.isDead);
          if (partner) partner.relationshipValue = Math.min(100, partner.relationshipValue + 20);
          state.log.push(`Age ${state.characterInfo.age}: Yielded an intense IKEA design fight, restoring harmony with [Partner].`);
        }
      },
      {
        choiceText: 'Propose buying a smaller, high-quality oak side table as a balanced compromise.',
        outcomeText: 'Your logical wood compromise fits the measurements perfectly. You both exit the warehouse holding hands with box packages loaded.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 14, happiness: 10, stress: 5 });
          const partner = state.relationships.find(r => r.relationshipType === 'Partner' && !r.isDead);
          if (partner) partner.relationshipValue = Math.min(100, partner.relationshipValue + 10);
          state.log.push(`Age ${state.characterInfo.age}: Negotiated flat measurements compromises on a side table to preserve [Partner] peace.`);
        }
      },
      {
        choiceText: 'Walk away through the exits, leaving them alone near the storage drawers.',
        outcomeText: 'You march out to the parking zone. They catch a slow bus home two hours later. A heavy, frozen wall of silence settles over the flat.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -15, happiness: -15, stress: 20 });
          const partner = state.relationships.find(r => r.relationshipType === 'Partner' && !r.isDead);
          if (partner) partner.relationshipValue = Math.max(0, partner.relationshipValue - 30);
          state.log.push(`Age ${state.characterInfo.age}: Abandoned [Partner] inside a furniture store over a minor desk disagreement.`);
        }
      }
    ]
  },
  {
    id: 'young_sibling_roommate',
    title: 'The Sibling Migration 🧳',
    description: 'Your sibling [Sibling] arrives at your tiny college dormitory room carrying two heavy, bulging suitcases. "My local lease fell through," they groan. "Can I crash on your floor for three weeks?"',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const hasSibling = state.relationships.some(r => r.relationshipType === 'Sibling' && !r.isDead);
      return age !== undefined && age >= 18 && age <= 25 && hasSibling;
    },
    choices: [
      {
        choiceText: 'Welcome them gladly, giving them your comfortable bed and sleeping on the carpet.',
        outcomeText: 'They thank you with a massive hug, treating you to local sushi rolls. Sibling bonds are forged in flat gold steel.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 22, happiness: 18, stress: 10 });
          const sib = state.relationships.find(r => r.relationshipType === 'Sibling' && !r.isDead);
          if (sib) sib.relationshipValue = Math.min(100, sib.relationshipValue + 25);
          state.log.push(`Age ${state.characterInfo.age}: Offered your comfortable college bed to [Sibling] during housing troubles.`);
        }
      },
      {
        choiceText: 'Draft a written set of strict survival rules concerning cleaning and quiet hours.',
        outcomeText: 'They agree to sweep daily and wash their cookware instantly. Sibling chaos is successfully managed through logical system contracts.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 14, stress: 5 });
          const sib = state.relationships.find(r => r.relationshipType === 'Sibling' && !r.isDead);
          if (sib) sib.relationshipValue = Math.min(100, sib.relationshipValue + 10);
          state.log.push(`Age ${state.characterInfo.age}: Structured a formal flatmate agreement to safely host [Sibling] in your dorm.`);
        }
      },
      {
        choiceText: 'Refuse to host them, pointing them directly toward a nearby guest hostel.',
        outcomeText: 'You tell them your single dorm size has strict housing limits. They pack their canvas bags, telling you that your selfishness is shocking.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -20, happiness: -10, stress: -5 });
          const sib = state.relationships.find(r => r.relationshipType === 'Sibling' && !r.isDead);
          if (sib) sib.relationshipValue = Math.max(0, sib.relationshipValue - 35);
          state.log.push(`Age ${state.characterInfo.age}: Turned away [Sibling] from your tiny dormitory unit due to space restrictions.`);
        }
      }
    ]
  },

  // ==========================================================================
  // AGE-GATED & GENERAL LIFE DILEMMAS (AGES 18-25)
  // Differentiating under-21 restrictions vs. over-21 scenarios
  // ==========================================================================
  {
    id: 'young_nightclub_bouncer',
    title: 'The Velvet Gate 🚪',
    description: 'Your older classmate friends want to enter a high-end 21+ electronic music lounge downtown. Your friend hands you a modified security card containing another student\'s face: "Just present this and look cool."',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age < 21;
    },
    choices: [
      {
        choiceText: 'Hand the modified security card to the towering bouncer with a calm, steady gaze.',
        outcomeText: 'The bouncer shines a blue light on the plastic, frowns, and rips the fake card in half: "Get lost before I call municipal patrol." Intense humiliation.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -15, looks: -10, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: Attempted to enter a 21+ lounge with bad fake identification, getting rejected.`);
        }
      },
      {
        choiceText: 'Decline the plan, heading to a nearby 24-hour illuminated waffle diner instead.',
        outcomeText: 'You stay safe, enjoying a plate of buttered syrup waffles and warm tea with your integrity perfectly secure. No security friction.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 5, happiness: 10, stress: -15 });
          state.finances.cashBalance -= 12;
          state.log.push(`Age ${state.characterInfo.age}: Avoided fake ID clubbing pranks, choosing a late-night waffle diner instead.`);
        }
      },
      {
        choiceText: 'Slide a crisp fifty-dollar bill under the bouncer\'s clipboard with a quick wink.',
        outcomeText: 'He slides the clip down, tucking the green bill back, and unhooks the velvet rope: "Make sure you stay inside the shadows." Bribery succeeds.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -20, smarts: 12, stress: 15 });
          state.finances.cashBalance -= 50;
          state.log.push(`Age ${state.characterInfo.age}: Used cash bribes to sneak into a restricted 21+ block.`);
        }
      }
    ]
  },
  {
    id: 'young_car_rental_fee',
    title: 'The Highway Surcharge 🗺️',
    description: 'You stand at the airport car rental counter to pick up your booking. The clerk pauses, inspecting your ID: "Ah, you are under twenty-five. There is a mandatory forty-five dollar per day youth surcharge."',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 20 && age <= 24;
    },
    choices: [
      {
        choiceText: 'Pay the steep young-driver surcharge so your coastal road trip can proceed.',
        outcomeText: 'You sign the updated paperwork. Your vacation moves forward, but your holiday budget takes a painful, bruising bite.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, stress: 10 });
          state.finances.cashBalance -= 180;
          state.log.push(`Age ${state.characterInfo.age}: Paid high youth driver surcharges to secure a coastal highway rental vehicle.`);
        }
      },
      {
        choiceText: 'Cancel the car booking and purchase a cheaper rural passenger train voucher.',
        outcomeText: 'You travel in style, drinking coffee while viewing green fields through large glass windows. Relaxing, scenic, and debt-free.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 10, stress: -15 });
          state.finances.cashBalance -= 60;
          state.log.push(`Age ${state.characterInfo.age}: Swapped an expensive highway vehicle rental for a clean regional train route.`);
        }
      },
      {
        choiceText: 'Argue with the supervisor about age discrimination laws until they call security.',
        outcomeText: 'You shout about youth rights at the desk. The supervisor refuses to listen, requesting that you leave the queuing area immediately. Your looks decline.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -10, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: Argued loudly at the terminal counter over minor youth driving rules.`);
        }
      }
    ]
  },
  {
    id: 'young_networking_mixer',
    title: 'The Purple Splash 🍷',
    description: 'At a crowded tech networking mixer, a billionaire tech investor accidentally bumps his hand, spilling deep purple Pinot Noir directly onto your custom pastel trousers.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 21 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Smile warmly and laugh it off, offering him a paper towel from your coat.',
        outcomeText: 'He admires your calm composure. He hands you his personal office business card: "Send me your tech resume tomorrow." True professional luck.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 18, looks: 12, happiness: 15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Formed solid connections with an executive after laughing off a wine stain.`);
        }
      },
      {
        choiceText: 'Scowl with intense frustration, demanding they purchase you a replacement designer suit.',
        outcomeText: '"Do you know what this suit cost?" you bark. The investor looks horrified, walking away in absolute disgust. Your networking reputation is ruined.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -15, looks: -10, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Demanded replacement suit costs from an executive over a minor wine spill, getting ignored.`);
        }
      },
      {
        choiceText: 'Retrieve your portfolio pamphlets and leave the lounge to walk home.',
        outcomeText: 'You leave the loud office crowd behind, heading home to soak your linen in soapy water in quiet peace. Simple and stress-free.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Left a networking hall quietly to wash your trousers at home.`);
        }
      }
    ]
  },
  {
    id: 'young_gym_ego',
    title: 'The Spotter Challenge 🏋️',
    description: 'A muscular gym member with a neon GoPro band waves you over. He points to three hundred pounds loaded onto the heavy weight bench: "Can you spot my chest, pal? I\'m streaming my personal weight record."',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Spot him with absolute mechanical focus, ready to lift if his wrists cave.',
        outcomeText: 'He grumbles through a massive rep, safely racking the metal. He claps your back, thanking you on his camera feed. Warm gym karma.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 15, health: 12, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Spoted a fitness lifting record, earning warm praise on camera.`);
        }
      },
      {
        choiceText: 'Challenge him to a high-form competition to prove your athletic range.',
        outcomeText: 'You load a smaller bar, executing thirty clean reps with perfect athletic posture. Your looks jump, but your biceps are intensely sore.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, looks: 12, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Challenged a fitness streaming influencer to raw form lifting trials.`);
        }
      },
      {
        choiceText: 'Excuse yourself politely, climbing onto an unoccupied elliptical trainer.',
        outcomeText: 'No filming dramas for you. You put in forty minutes of pure, quiet cardiac work under your headphones. Solid health maintenance.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 10, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Declined filming spotter requests, sticking to safe cardio routines.`);
        }
      }
    ]
  },
  {
    id: 'young_hobby_crypto_scam',
    title: 'The Astro Coin Pitch 🚀',
    description: 'A neighborhood classmate from school sends you an energetic direct message: "Listen to me, AstroDoge is launching at midnight. We are going straight to the moon. Send me twelve hundred dollars cash to secure priority tokens now."',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Purchase the unregistered digital keys hoping for a fast retirement fortune.',
        outcomeText: 'The AstroDoge administrators turn off their server three hours later, taking all checking deposits. Your cash is completely erased. Cruel lesson.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: -15, happiness: 10, stress: 15 });
          state.finances.cashBalance -= 1200;
          state.log.push(`Age ${state.characterInfo.age}: Lost twelve hundred dollars to an online AstroDoge coin rugpull scam.`);
        }
      },
      {
        choiceText: 'Send them a detailed warning explaining the mathematics of pyramid schemes.',
        outcomeText: 'They reply with angry letters claiming you have zero financial vision, but you feel proud to have researched the economics.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 15, smarts: 18, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Warned a former classmate about the regulatory and risk realities of meme assets.`);
        }
      },
      {
        choiceText: 'Decline his offer politely and keep your savings in a traditional checking account.',
        outcomeText: 'You close the messaging application. Your finances remain perfectly safe and stable. No high-risk gambles for your career.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -12 });
          state.log.push(`Age ${state.characterInfo.age}: Declined high-risk digital asset solicitations, preserving your bank reserves.`);
        }
      }
    ]
  },
  {
    id: 'young_study_abroad',
    title: 'The Parisian Breeze ✈️',
    description: 'Your college department accepts your application for a research term in Paris. However, packing your suitcases will delay your regular undergraduate graduation by six months.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 23 && state.education.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Board the flight for Paris to study classic art history in French museums.',
        outcomeText: 'You spend your afternoons eating warm croissants under the Eiffel Tower. Your looks and happiness peak, although it costs real money.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 10, smarts: 14, happiness: 24, stress: -15 });
          state.finances.cashBalance -= 1500;
          state.log.push(`Age ${state.characterInfo.age}: Traveled to France for an academic term, expanding your cultural horizons.`);
        }
      },
      {
        choiceText: 'Stay at your local campus to graduate on time and secure a corporate income.',
        outcomeText: 'You refuse the traveling detour. You grind through regular lectures, preparing to enter the local resume job pipeline early.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 5, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Chose to stay on local campus paths to secure an on-time graduation.`);
        }
      },
      {
        choiceText: 'Secure a complex virtual internship to coordinate remote credits from your bed.',
        outcomeText: 'You attend virtual meetings at 3 AM to match Paris time zones. Your grades remain stellar, but your sleep patterns are highly chaotic.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: Coordinated virtual international classes remote to build both credits and grades.`);
        }
      }
    ]
  },
  {
    id: 'young_marathon_challenge',
    title: 'The Forty Mile Summit 🏃',
    description: 'The college endurance committee invites you to complete a grueling forty-mile trail run across a jagged mountain pass during the upcoming spring recess.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Train vigorously for three months, rising at dawn to build physical lung capacity.',
        outcomeText: 'You run through wind, snow, and rain. On race day, you fly over the summit like an Olympian! Your health and looks peak.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 25, looks: 12, happiness: 18, stress: 12 });
          state.log.push(`Age ${state.characterInfo.age}: Successfully completed a grueling forty-mile mountain trail marathon after intense training.`);
        }
      },
      {
        choiceText: 'Enter the race with zero preparation, relying on young raw athletic pride.',
        outcomeText: 'You collapse at mile eleven with extreme muscle locks and severe breathing distress. The medical cart brings you home in embarrassment.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -15, looks: -5, happiness: -10, stress: 22 });
          state.log.push(`Age ${state.characterInfo.age}: Attempted a mountain trail marathon without preparation, requiring medical rescue.`);
        }
      },
      {
        choiceText: 'Volunteer to distribute fresh water flasks to racers at the thirty-mile medical station.',
        outcomeText: 'You hand cold water cups to exhausted runners. Their sweaty, appreciative smiles fill you with deep warmth. Karma peaks.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 18, smarts: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Volunteered at a mountain marathon checkpoint, supporting exhausted athletes.`);
        }
      }
    ]
  },
  {
    id: 'young_hackathon_grind',
    title: 'The Midnight Hackathon 💻',
    description: 'A global computer science club organizes a 48-hour continuous coding hackathon in the university engineering lobby. The main prize is a pristine holographic monitor and bragging rights.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 24 && state.education.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Write code nonstop for forty-eight hours, drinking liquid caffeine fuels.',
        outcomeText: 'You build a flawless smart-contract system that wins first place! Your smarts jump, but your eyes are heavily bloodshot.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, health: -12, happiness: 18, stress: 20 });
          state.finances.cashBalance += 500;
          state.log.push(`Age ${state.characterInfo.age}: Won first place at a campus hackathon after a sleepless 48-hour sprint.`);
        }
      },
      {
        choiceText: 'Form a highly structured team, delegating tasks and taking shifts to sleep.',
        outcomeText: 'Your team works with beautiful, calm synergy, finishing a solid runner-up. You make amazing engineering friends with minimal stress.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, karma: 12, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Led a collaborative team at a university hackathon, building deep peer network links.`);
        }
      },
      {
        choiceText: 'Sell delicious fresh espresso coffee cups to the exhausted developers.',
        outcomeText: 'While everyone else codes, you run a busy corridor coffee stand. You earn three hundred dollars cash. Financial entrepreneur!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 8, happiness: 15, stress: 5 });
          state.finances.cashBalance += 300;
          state.log.push(`Age ${state.characterInfo.age}: Ran a lucrative coffee sales booth at a 48-hour student developer meetup.`);
        }
      }
    ]
  },
  {
    id: 'young_cluttered_kitchen',
    title: 'The Communal Sink Terror 🍽️',
    description: 'An enormous mountain of greasy pots, decaying cabbage leaves, and crusty pasta bowls has completely blocked the kitchen sink at your local shared apartment.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Scrub the entire dish mountain alone using industrial steel soap pads.',
        outcomeText: 'You scrub for two painful hours, restoring the porcelain sink to mirror perfection. Your flatmates stare in deep, appreciative silence. High karma.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 20, happiness: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Cleansed a mountain of communal flat dishes alone to restore apartment health.`);
        }
      },
      {
        choiceText: 'Assemble your roommate flatmates for an urgent kitchen meeting to assign cleaning rotations.',
        outcomeText: 'Using your best organizational speaking voice, you draft a colorful rotating refrigerator chore calendar. Structured apartment systems!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 14, stress: 10, looks: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Structured a formal dish-cleaning chore rotation calendar with roommates.`);
        }
      },
      {
        choiceText: 'Pack your single coffee mug and escape to eat burgers at a local diner.',
        outcomeText: 'No scrubbing battles for you. You enjoy a hot crispy burger while your roommates argue in their messy kitchen. Simple off-site relief.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 12, stress: -15 });
          state.finances.cashBalance -= 15;
          state.log.push(`Age ${state.characterInfo.age}: Evaded apartment cleaning chores by dining at local hamburger taverns.`);
        }
      }
    ]
  },
  {
    id: 'young_unsecured_package',
    title: 'The Lobby Delivery Box 📦',
    description: 'While walking through your residential apartment foyer, you spot an unsealed cardboard box containing a beautiful pair of designer leather sneakers. The shipping label is partially torn.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Pocket the designer shoes, hoping nobody noticed your hallway steps.',
        outcomeText: 'They fit your feet with flawless comfort! Your looks jump, but you check the foyer corner cameras in constant fear for weeks.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -35, looks: 15, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: Shoplifted an unsealed shipping carton from the building lobby.`);
        }
      },
      {
        choiceText: 'Deliver the box to the front management office to help find the correct owner.',
        outcomeText: 'The desk monitor praises your high integrity and traces the label code to a grateful tenant who leaves you a nice organic fruit basket.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 22, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Returned a lost lobby parcel to apartment management with strict honesty.`);
        }
      },
      {
        choiceText: 'Ignore the shipping carton completely, stepping over it to climb the stairs.',
        outcomeText: 'You maintain absolute neutral focus. No actions, no files, no complications. The cardboard carton is someone else\'s issue.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Stepped around ambiguous foyer packages to avoid residential issues.`);
        }
      }
    ]
  },
  {
    id: 'young_subwoofer_fury',
    title: 'The Midnight Subwoofer 🔊',
    description: 'It is 2 AM before your key computer systems exam. The tenant downstairs has set up an enormous surround subwoofer, making your floorboards vibrate to electronic bass.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Confront the tenant downstairs face-to-face, knocking firmly on their door.',
        outcomeText: 'A young developer answers wearing glowing headphones. He apologizes sheepishly and turns the dials down. Silence restored!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 12, stress: -15, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Confronted your neighbor direct over aggressive night subwoofer vibration.`);
        }
      },
      {
        choiceText: 'File a formal municipal housing code complaint using your phone portal.',
        outcomeText: 'You submit a noise alert form. A building supervisor fines the flat three hundred dollars, although hallways are highly icy now.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Logged administrative noise complaints against downstairs tenants.`);
        }
      },
      {
        choiceText: 'Insert rubber earplugs and sleep on your bathroom floor carpet.',
        outcomeText: 'Waking up on tile with a stiff neck is highly uncomfortable, but your ears are safe. You scrape through your quiz with average grades.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -8, happiness: -15, stress: 10 });
          state.education.grades = Math.max(0, state.education.grades - 5);
          state.log.push(`Age ${state.characterInfo.age}: Slept on the bathroom floor with rubber plugs to escape apartment noise.`);
        }
      }
    ]
  },
  {
    id: 'young_used_guitar',
    title: 'The Pine Acoustic Guitar 🎸',
    description: 'A local thrift storefront is offering a gorgeous, hand-carved pine acoustic guitar for two hundred dollars cash. The wood grain is exquisite and the pegs are vintage brass.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Buy the acoustic guitar and practice classic scales in your bedroom for six hours.',
        outcomeText: 'Your fingertips develop hard calluses, but you unlock incredible musical expression! You feel your poetic soul expand.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 14, looks: 8, happiness: 22, stress: -12 });
          state.finances.cashBalance -= 200;
          state.log.push(`Age ${state.characterInfo.age}: Purchased a vintage pine acoustic guitar to master musical scales.`);
        }
      },
      {
        choiceText: 'Decline the instrument purchase to keep your savings balance perfectly secure.',
        outcomeText: 'You walk past the windows. While you have zero guitars to play, your savings account is completely stable. Practical life.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Retained your cash balance by passing up vintage instrument opportunities.`);
        }
      },
      {
        choiceText: 'Smash the storefront display guitar in a sudden moment of creative frustration.',
        outcomeText: 'You push the guitar stand over and it cracks on the concrete! The owner screams, calling the police. You are fined five hundred dollars.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -40, health: -5, happiness: -25, stress: 30 });
          state.finances.cashBalance -= 500;
          state.log.push(`Age ${state.characterInfo.age}: Sentenced to civil fines after vandalizing a storefront guitar display.`);
        }
      }
    ]
  }
];

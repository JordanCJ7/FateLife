import { GameEvent, CharacterState } from '../../types';
import { adjustStats } from '../../utils';

export const youngDataPack1BEvents: GameEvent[] = [
  // ==========================================================================
  // SECTION 2 (CONTINUED): EDUCATION & STUDY STRUGGLES (ITEMS 35 - 50)
  // ==========================================================================
  {
    id: 'yp1_edu_10',
    title: 'The Overdue Library Fee 📚',
    description: 'You receive a formal warning that your account has accumulated sixty dollars in library late fees over an index catalog book.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Pay the library fee immediately to clear your student registration account.',
        outcomeText: 'Your account is cleared. You eat smaller sandwiches this week but keep full research access.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -10, karma: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 60, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Settled sixty dollars in late registration book fees.`);
        }
      },
      {
        choiceText: 'Return the book anonymously to the night drop box in hopes of system updates.',
        outcomeText: 'The scanner registers the return, but the fine remains stubornly logged. They block your exam logins.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 20, smarts: -5, karma: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Dropped off late books in night boxes to dodge administrative fees.`);
        }
      },
      {
        choiceText: 'Write a long, poetic apology letter to the chief librarian.',
        outcomeText: 'They read your flowery words, laughing warmly. They reduce the logged fee to ten dollars as a one-time favor.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, looks: 10, stress: -5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 10, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Charmed library directors into waiving account fines over books.`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_11',
    title: 'The Stolen Lecture Notebook 📒',
    description: 'Someone takes your detailed handbook containing all final organic chemistry lecture annotations from the common room.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Reconstruct your notations using library materials and deep focus.',
        outcomeText: 'You study for twenty continuous hours. Your brain cells feel exhausted, but you master the science indexes.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -10, smarts: 20, stress: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Manually re-wrote lost laboratory journals from reference manuals.`);
        }
      },
      {
        choiceText: 'Offer to buy duplicate lecture copies from high-grade peers for forty bucks.',
        outcomeText: 'You secure pristine photocopies. The annotations are beautifully colored, saving your syllabus marks.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -10, smarts: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 40, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Purchased high-grade photocopied chemistry annotations (-$40).`);
        }
      },
      {
        choiceText: 'Lament your loss and rely on memory during the science exam.',
        outcomeText: 'You fail to remember critical reagents. Your grades take a severe beating at the department tables.',
        effect: (s: CharacterState) => {
          adjustStats(s, { intelligence: -10, stress: 20, happiness: -15, smarts: -5 } as any);
          s.education.grades = Math.max(0, s.education.grades - 15);
          s.log.push(`Age ${s.characterInfo.age}: Trusted simple chemical memory during exams, suffering bad grades.`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_12',
    title: 'The Crowded Dorm Laundry 🧼',
    description: 'A student leaves their wet wool garments inside the dorm laundry machine for three continuous hours.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Dump their wet clothes on the dusty laundry floor blocks with zero warnings.',
        outcomeText: 'You run your dryer, but a tense corridor screaming dispute erupts when they find their wet socks.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 20, karma: -20 });
          s.log.push(`Age ${s.characterInfo.age}: Threw a neighbor\'s laundry on the floor to secure washing dryers.`);
        }
      },
      {
        choiceText: 'Place their garments neatly on top of the clean folding counter.',
        outcomeText: 'A perfectly civil resolution. You get your washing done while keeping dorm circles peaceful.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 15, stress: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Moved unattended wash loads safely to dry counters.`);
        }
      },
      {
        choiceText: 'Carry your wet loads home and dry them over your room study lamps.',
        outcomeText: 'Your room smells like swampy moisture, and your damp bed sheets feel slightly cold all evening.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -5, stress: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Dried damp clothes on room floor lamps, inviting air moisture.`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_13',
    title: 'The Technical Lab Explosion 🧪',
    description: 'During a chemistry lab, your teammate pours the wrong sulfuric compounds, starting a spitting fire.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Smother the chemistry flames instantly with the heavy fire blanketing.',
        outcomeText: 'You extinguish the fire! The lab professor praises your rapid safety reflexes globally.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, health: 10, karma: 25 });
          s.education.grades = Math.min(100, s.education.grades + 8);
          s.log.push(`Age ${s.characterInfo.age}: Extinguished sudden chemistry laboratory fires, preventing destruction.`);
        }
      },
      {
        choiceText: 'Flee the laboratory instantly, screaming loud alarm warnings.',
        outcomeText: 'The sprinkler systems go off, drenching eighty notebooks. You are safe, but chemistry records are ruined.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 15, looks: -5, happiness: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Fled chemical laboratory smoke alarms, soaking all records.`);
        }
      },
      {
        choiceText: 'Record the smoking compound reactions on your digital camera.',
        outcomeText: 'Your video goes incredibly viral on student channels! You gain social fame, but the dean warns you.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 15, karma: -10, happiness: 20 });
          s.log.push(`Age ${s.characterInfo.age}: Filmed a smoking laboratory fire block for digital social networks.`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_14',
    title: 'The Thesis Topic Dispute 📝',
    description: 'Your seminar director rejects your chosen human rights topic, demanding you analyze dry database histories instead.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Comply with their wishes and write about historical trade tariffs.',
        outcomeText: 'An incredibly boring paper, but they approve your drafts and secure a solid graduate score.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 10, stress: -5 });
          s.education.grades = Math.min(100, s.education.grades + 8);
          s.log.push(`Age ${s.characterInfo.age}: Wrote boring trade tariff thesis pages to secure adviser checks.`);
        }
      },
      {
        choiceText: 'Appeal the decision to the sociology department board panel.',
        outcomeText: 'The panel reviews your files, authorizing your creative human rights papers. Excellent!',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 15, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Overruled thesis advisory limits by appealing to department boards.`);
        }
      },
      {
        choiceText: 'Abandon your university degree program entirely to join a global theater squad.',
        outcomeText: 'You shred your transcripts and hop on a touring caravan! You are highly broke but feel alive.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 15, stress: -30, happiness: 30 });
          s.education.currentStage = 'Dropped Out';
          s.log.push(`Age ${s.characterInfo.age}: Dropped out of academic courses to tour with performance artists.`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_15',
    title: 'The Academic Journal Target 📑',
    description: 'You are invited to co-author an prestigious research script on advanced logic, but it demands eighty hours of data entry.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Devote your entire spring holidays to compile the binary records.',
        outcomeText: 'The script gets printed inside a famous logical journal! Your intellectual index sky-rockets.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, health: -10, stress: 20 });
          s.education.grades = Math.min(100, s.education.grades + 15);
          s.log.push(`Age ${s.characterInfo.age}: Published a co-authored academic research script on logical systems.`);
        }
      },
      {
        choiceText: 'Decline the co-authorship to spend your holiday hours on beach vacations.',
        outcomeText: 'You return with an incredible golden tan, though your academic directory lacks prestige.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 15, stress: -25, happiness: 20 });
          s.log.push(`Age ${s.characterInfo.age}: Declined research invites to enjoy a sunny coastal spring holiday.`);
        }
      },
      {
        choiceText: 'Delegate the data compilation to younger freshman classmates.',
        outcomeText: 'You split the author credits, but save your spring schedules completely. A cunning career maneuver.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: -5, karma: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Delegated research typing tasks to freshman academic underlings.`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_16',
    title: 'The Trade School Alternative 🛠️',
    description: 'A local industrial guild opens applications for high-paying apprenticeships in master aviation pipefitting.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage !== 'Dropped Out';
    },
    choices: [
      {
        choiceText: 'Enroll in the aviation pipefitting trade school immediately.',
        outcomeText: 'You master advanced hydraulic tools. You drop out of college but secure immediate trade hiring.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, smarts: 15, stress: -10 });
          s.education.currentStage = 'Dropped Out';
          s.characterInfo.currentOccupation = 'Aviation Apprentice';
          s.finances.annualSalary = 48000;
          s.log.push(`Age ${s.characterInfo.age}: Enrolled in aviation pipefitting guilds, securing high apprentice wages.`);
        }
      },
      {
        choiceText: 'Decline the trade program to continue pursuing your general liberal arts degrees.',
        outcomeText: 'You stick to your literature books, typing essays about medieval poetry and hoping for jobs.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 10, stress: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Stuck to university humanities paths, ignoring vocational offers.`);
        }
      },
      {
        choiceText: 'Attend weekend evening welding seminars to build dynamic hobby crafts.',
        outcomeText: 'You learn to fuse iron plates! Your hands develop rough calluses, but you make amazing metal sculptures.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 10, smarts: 10, stress: -5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 300, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Completed auxiliary weekend industrial welding seminars (-$300).`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_17',
    title: 'The Exam Location Shuffle 🏫',
    description: 'An administrative email shuffles next week\'s history final room to a distant campus block, five miles away.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Run the entire distance on foot to ensure zero arrival delays.',
        outcomeText: 'You arrive sweating heavily but secure your desk, acing the history essay before cooling down.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, stress: 15, looks: -5 });
          s.education.grades = Math.min(100, s.education.grades + 8);
          s.log.push(`Age ${s.characterInfo.age}: Sprinted across campus boundaries to catch relocated finals.`);
        }
      },
      {
        choiceText: 'Rent an expensive city electric bicycle to ride in comfort.',
        outcomeText: 'You ride the electric speeder flawlessly, parking near the hall gates with minutes to spare.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 10, stress: -10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 25, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Borrowed city electric bicycle assets to reach remote exams.`);
        }
      },
      {
        choiceText: 'Submit formal appeals complaining about short transition notice periods.',
        outcomeText: 'The registry allows you to take the exam online, completely skipping the freezing trek.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Negotiated virtual test setups after schedule system errors.`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_18',
    title: 'The Work-Study Dilemma 💼',
    description: 'The campus bookstore offers a fifteen-hour-per-week work-study cashier shift, but it clashes with your exam study blocks.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Accept the cashier shift to secure three hundred dollars monthly.',
        outcomeText: 'You earn nice cash, but your chemistry final grade slips to barely passing scores.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 25, happiness: 10 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 300, 20000000);
          s.education.grades = Math.max(0, s.education.grades - 10);
          s.log.push(`Age ${s.characterInfo.age}: Completed bookstore work-study cashier shifts, trading grades for pay.`);
        }
      },
      {
        choiceText: 'Reject the cashier assignment to protect your 4.0 grade score.',
        outcomeText: 'Your test results are pristine, but you live off thin oatmeal packets for three weeks.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: -10, happiness: -5 });
          s.education.grades = Math.min(100, s.education.grades + 8);
          s.log.push(`Age ${s.characterInfo.age}: Opted out of bookstore work shifts to secure study hours.`);
        }
      },
      {
        choiceText: 'Manage the database backend files remotely on your own hours.',
        outcomeText: 'A fantastic compromise! You code bookstore index listings in bed, securing cash and safe grades.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 5, happiness: 15 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 250, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Audited library stock databases remotely to preserve study balances.`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_19',
    title: 'The Ruined Lab Notebook 💧',
    description: 'Your water container leaks inside your canvas pack, soaking your semester-long biology lab drawings into blue mush.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Dry the mush meticulously with your roommate\'s hair dryer.',
        outcomeText: 'The pages dry wavy and smelled like singed cardboard, but the grades remains legible.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 15, smarts: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Dried dripping laboratory journals with hair dryers.`);
        }
      },
      {
        choiceText: 'Spend forty-eight continuous hours copy-drawing all cells again.',
        outcomeText: 'Your fingers ache, but your new drawings look pristine, earning high-grade lab credits.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, looks: -5, smarts: 20, stress: 25 });
          s.education.grades = Math.min(100, s.education.grades + 10);
          s.log.push(`Age ${s.characterInfo.age}: Re-sketched biological cell charts after a major water bottle leak.`);
        }
      },
      {
        choiceText: 'Lodge excuses asserting that your dog chewed the notebook grids.',
        outcomeText: 'The professor stares in complete disbelief. They assign you a zero score on the wet sections.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -20, happiness: -15 });
          s.education.grades = Math.max(0, s.education.grades - 12);
          s.log.push(`Age ${s.characterInfo.age}: Attempted canine excuse stories for wet chemistry journals.`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_20',
    title: 'The Honorary Society Invite 📜',
    description: 'The golden dean list circle invites you to enroll in their permanent honors catalog registry, demanding a hundred-dollar fee.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const isSmart = s.stats?.smarts >= 70;
      return age !== undefined && age >= 18 && age <= 25 && isSmart && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Pay the enrollment fee to secure elite résumé lines.',
        outcomeText: 'Your name is logged in gold ink. Recruiting agents send you pleasant notes immediately.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 15, smarts: 15, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 100, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Joined the golden registry honors list of university students (-$100).`);
        }
      },
      {
        choiceText: 'Decline the invitation and spend the cash on premium coffee runs.',
        outcomeText: 'You enjoy twenty delicious caramel drinks. You bypass the honors index but stay happily fed.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 15, stress: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Bypassed honors club enrollment to buy artisanal coffee drinks.`);
        }
      },
      {
        choiceText: 'Offer to design the society\'s marketing newsletter to waive the fee.',
        outcomeText: 'They accept your graphic design proposal! You secure entry without parting with cash.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, looks: 10, stress: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Designed honorary society journals to bypass admission costs.`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_21',
    title: 'The Cold Reading Room Draft 🥶',
    description: 'The radiator inside the historical archives malfunctions during winter finals. The desks are freezing.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Study wrapped in three sleeping bags, ignoring student laughter.',
        outcomeText: 'You look like a giant blue caterpillar, but you memorize thirty historical dynasties in absolute comfort.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, looks: -10, stress: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Studied inside deep thermal bags to beat historical library drafts.`);
        }
      },
      {
        choiceText: 'Migrate to the humid campus greenhouse to study near tropical palms.',
        outcomeText: 'The air is beautifully warm and smells like wet hibiscus, improving your mood and grades.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, happiness: 15, smarts: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Relocated research routines to tropical botany greenhouses.`);
        }
      },
      {
        choiceText: 'Complain loudly with the physical operations building office.',
        outcomeText: 'They send a maintenance engineer to fix the pipe. You save the day, but lose three hours of study.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 20, stress: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Reported physical boiler leaks to maintenance department offices.`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_22',
    title: 'The Broken Calculator Disaster 🧮',
    description: 'Ten minutes before your advanced physics final exam, your screen on your graphing calculator goes completely dead.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Solve all long calculus equations manually using basic scratch paper.',
        outcomeText: 'You work with incredible analytical speed. You finish slightly late, but your pure math skills are validated.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 30, health: -10, stress: 30 });
          s.education.grades = Math.min(100, s.education.grades + 10);
          s.log.push(`Age ${s.characterInfo.age}: Completed advanced quantum calculus exams manually after electronics fried.`);
        }
      },
      {
        choiceText: 'Negotiate a quick loaner unit with the department secretary.',
        outcomeText: 'The secretary has a dusty spare. You calibrate the interface quickly and complete the exam smoothly.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Borrowed operational graphing calculators from faculty offices.`);
        }
      },
      {
        choiceText: 'Borrow your peer\'s solar spare in exchange for a fifty-dollar promise.',
        outcomeText: 'You secure the hardware, but your pocket is fifty bucks lighter. Your physics grade remains high.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 10, smarts: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 50, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Purchased secondary graphing solar units on short credit terms (-$50).`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_23',
    title: 'The Over-Booked Seminar Class 📑',
    description: 'You are wait-listed for the critical constitutional law seminar. The professor requires a high essay proposal to join.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Write a brilliant thirty-page legal analysis over two sleepless nights.',
        outcomeText: 'The law professor is stunned, admitting you instantly and declaring you a rising legal star.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, health: -15, stress: 25 });
          s.log.push(`Age ${s.characterInfo.age}: Drafted a thirty-page constitutional brief to secure waitlist spots.`);
        }
      },
      {
        choiceText: 'Settle for an easy online history class that demands zero entry checks.',
        outcomeText: 'The online lectures are dull but effortless, letting you sleep late but degrading your legal training.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -20, happiness: 10, smarts: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Swapped dense legal courses for general online history programs.`);
        }
      },
      {
        choiceText: 'Beg the professor daily at their office hours until they enroll you.',
        outcomeText: 'They break down under your persistent complaints. They register you, muttering about your stubborn code.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 15, smarts: 10, looks: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Secured legal course enrollment via persistent office petitions.`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_24',
    title: 'The Broken Study Lamp Lamp 💡',
    description: 'The wiring inside your favorite study lantern throws off yellow sparks and burns out during key final study trials.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Repair the lamp copper wires manually using insulation duct tapes.',
        outcomeText: 'The lamp glows bright again! You feel highly handy, though technical safety officials glower.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: 10, karma: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Fixed desk lamp wiring manually to preserve study lighting.`);
        }
      },
      {
        choiceText: 'Study in the blue glowing light of your smartphone screens only.',
        outcomeText: 'Your eyes strain heavily, resulting in bad headaches and dry tear ducts by late morning.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, looks: -10, stress: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Suffered eye fatigue by reading textbooks in smartphone glow.`);
        }
      },
      {
        choiceText: 'Purchase a premium daylight led lamp tube from boutique shops.',
        outcomeText: 'You spend eighty dollars. Your room is beautifully bright, protecting your eyes and focus levels.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, looks: 5, stress: -10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 80, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Bought luxury daylight led desk lanterns to protect eyes (-$80).`);
        }
      }
    ]
  },
  {
    id: 'yp1_edu_25',
    title: 'The Graduation Gown Fitting 🎓',
    description: 'It is time to order your formal graduation robe and silk mortarboard. The premium silk set costs two hundred dollars.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 21 && age <= 25 && s.education?.currentStage === 'University';
    },
    choices: [
      {
        choiceText: 'Buy the deluxe silk academic wear set with golden tassels.',
        outcomeText: 'You look incredibly majestic inside the class portrait blocks! Your family beams with pride.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 20, happiness: 25 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 200, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Acquired premium silk ceremonial graduation wardrobes (-$200).`);
        }
      },
      {
        choiceText: 'Rent a scratchy polyester recycled replacement robe for fifty dollars.',
        outcomeText: 'The cloth smells slightly of laundry detergents, but you dodge major costs and complete the ceremony.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 10, looks: -5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 50, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Rented basic polyester gowns for graduation events.`);
        }
      },
      {
        choiceText: 'Borrow your tall sibling\'s oversize vintage graduation robes.',
        outcomeText: 'The hem drags on the muddy bricks, and the shoulders look massive, but you attend for absolute zero cost.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, looks: -15, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Wore legacy family graduation gowns during diploma handovers.`);
        }
      }
    ]
  },

  // ==========================================================================
  // SECTION 3: ROMANCE, DATING APPS & FLAT-SHARE ROOMMATE DISPUTES (ITEMS 51 - 67)
  // ==========================================================================
  {
    id: 'yp1_rom_01',
    title: 'The Dating App Bio Optimization 📱',
    description: 'A professional dating coach offers to rewrite your online profiles to secure eighty percent higher click metrics.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.maritalStatus === 'Single';
    },
    choices: [
      {
        choiceText: 'Pay the matching advisor one hundred and fifty dollars to rebuild your bio.',
        outcomeText: 'They draft amazing bios and polish your photos. Your phone rattles non-stop with fresh messages!',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 20, happiness: 15, stress: 5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 150, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Optimized online dating profiles with professional matching advisors (-$150).`);
        }
      },
      {
        choiceText: 'Write a highly sarcastic bio about your obsession with dry toast coding.',
        outcomeText: 'Fewer people message you, but the ones who do share your quirky humor in absolute depth.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, looks: -10, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Penned sarcastic bio listings about algorithms to test dating matches.`);
        }
      },
      {
        choiceText: 'Decline digital dating entirely and seek connections in public libraries.',
        outcomeText: 'You cruise book aisles. You lock eyes with a poetry reader, exchanging telephone details.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 10, stress: -15, karma: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Shuned digital dating pools, choosing physical bookshop interactions.`);
        }
      }
    ]
  },
  {
    id: 'yp1_rom_02',
    title: 'The Stolen Milk Carton Warning 🥛',
    description: 'Your expensive oat milk bottle is constantly drunk by your flatmate [Partner] (or dry roommates).',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Secure your milk bottle with a heavy numeric padlock system.',
        outcomeText: 'Your roommate looks highly insulted, but your liquid remains completely protected.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: 10, karma: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Padlocked refrigerator milk cartons to block roommate theft.`);
        }
      },
      {
        choiceText: 'Pour red botanical coloring dye in the milk bottle to scare them.',
        outcomeText: 'They pour a glass of pink liquid and scream, but they stop touching your groceries forever.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -20, happiness: 20, stress: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Set colored milk dye traps to catch vegetable milk thieves.`);
        }
      },
      {
        choiceText: 'Buy a mini-fridge for your room study area using personal funds.',
        outcomeText: 'You spend two hundred dollars. Your food items are warm and safe in your bedroom domain.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -20, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 200, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Purchased personal bedroom mini-refrigerators to end roommate disputes (-$200).`);
        }
      }
    ]
  }
];

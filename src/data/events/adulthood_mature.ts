import { GameEvent, CharacterState } from '../../types';
import { adjustStats } from '../../utils';

export const adulthoodMatureEvents: GameEvent[] = [
  // =========================================================================
  // SUB-TIER 1: EARLY MATURE ADULTHOOD (Ages 46–53)
  // Focusing on empty-nest adjustments, peak asset protection, mid-life hobbies,
  // late-stage partner dynamics, and body alerts.
  // =========================================================================
  {
    id: 'mat_empty_nest_01',
    title: 'The Silent Hallway 🕊️',
    description: 'The front door clicks shut. Your youngest child [Child] has packed their last dynamic storage box and exited the driveway for university. The silence in the hallway is heavy and unexpected.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const hasLivingChild = state.relationships.some(r => r.relationshipType === 'Child' && !r.isDead);
      return age >= 46 && age <= 53 && hasLivingChild;
    },
    choices: [
      {
        choiceText: 'Spend ten thousand dollars to transform their bedroom into a professional micro-artisan workspace.',
        outcomeText: 'You load the empty room with woodcarving and textile tools. You miss their laughter, but focus your energy on tactile crafting.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, stress: -15, smarts: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 10000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Transformed [Child]\'s empty bedroom into an artisan woodworking workshop.`);
        }
      },
      {
        choiceText: 'Call them nightly to offer persistent parental guidance and ask about their meal preparation schedules.',
        outcomeText: 'They sound slightly exasperated by your continuous check-ins, but appreciate the deep emotional anchor you provide.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 10, stress: 10 });
          const child = state.relationships.find(r => r.relationshipType === 'Child' && !r.isDead);
          if (child) child.relationshipValue = Math.min(100, child.relationshipValue + 15);
          state.log.push(`Age ${state.characterInfo.age}: Established high-frequency communication patterns to guide [Child] in college.`);
        }
      },
      {
        choiceText: 'Plan an elaborate domestic redesign with your partner to celebrate your newfound marital freedom.',
        outcomeText: 'You and [Partner] spend weekends picking fresh carpets and painting the study. The structural change brings you beautifully closer.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, stress: -10 });
          const partner = state.relationships.find(r => r.relationshipType === 'Partner' && !r.isDead);
          if (partner) partner.relationshipValue = Math.min(100, partner.relationshipValue + 20);
          state.log.push(`Age ${state.characterInfo.age}: Redecorated the family home with [Partner] to toast your empty nest.`);
        }
      }
    ]
  },
  {
    id: 'mat_convertible_01',
    title: 'The Crimson Arrow 🏎️',
    description: 'A pristine vintage crimson convertible sit on the local dealership lot. The window sticker is bright and expensive, but the chrome details smell of open highways and forgotten youth.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53 && state.finances.cashBalance >= 35000;
    },
    choices: [
      {
        choiceText: 'Purchase the vehicle with thirty-five thousand dollars cash, refusing to settle for suburban boredom.',
        outcomeText: 'The dealer grins as you drive off. The engine purrs beautifully, and you feel the direct rush of sixty miles an hour.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 25, looks: 15, stress: -15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 35000, -500000);
          state.assets.push({
            id: `asset_crimson_${Date.now()}`,
            name: 'Crimson Convertible',
            type: 'vehicle',
            purchasePrice: 35000,
            currentValue: 32000,
            annualUpkeep: 1500,
            isFinanced: false,
            loanDetails: null,
            category: 'Exotic',
            condition: 100
          });
          state.log.push(`Age ${state.characterInfo.age}: Acquired a high-performance Crimson Convertible to challenge suburban routine.`);
        }
      },
      {
        choiceText: 'Walk away and allocate those specific funds directly to blue-chip dividend index trusts.',
        outcomeText: 'A sober, flawless decision. You enjoy no coastal wind, but your financial projections show serene long-term stability.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: -10, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Disciplined your impulses, directing automotive capital toward dividend growth files.`);
        }
      },
      {
        choiceText: 'Rent the sports car for a single weekend trip down the coast to satisfy your driving curiosity.',
        outcomeText: 'You burn two hundred dollars on gas and rental fees, returning the keys on Monday with your mid-life itch completely scratched.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 400, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Rented a luxury sports convertible for a short scenic coastal loop.`);
        }
      }
    ]
  },
  {
    id: 'mat_reunion_01',
    title: 'The 30-Year High School Reunion 🎓',
    description: 'An invitation to your 30-year high school reunion arrives with a glossy, embossed paper layout. Old classmates are gathering to showcase their family units, executive ranks, and hairline drifts.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Arrive in an exquisite designer suit, making sure everyone hears details of your career conquests.',
        outcomeText: 'You hold court near the punch bowl. Several old peers look envious of your status, though you feel slightly shallow.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, looks: 10, karma: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 800, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Flaunted economic assets and fine tailoring at your 30-year high school reunion.`);
        }
      },
      {
        choiceText: 'Attend quietly in modest apparel, focusing strictly on Rekindling ancient, honest friendships.',
        outcomeText: 'You spend hours talking with old friends under soft school gym lighting. You discover deep mutual memories that feel genuine.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, stress: -15, karma: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Reconnected warmly with childhood companions at the high school reunion.`);
        }
      },
      {
        choiceText: 'Skip the gathering entirely, preferring to read a novel alone with a hot cup of black tea.',
        outcomeText: 'The school group chats buzz with photos you never see. You enjoy a silent, perfectly peaceful evening at home.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -20, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Declined your high school reunion to guard your personal quietude.`);
        }
      }
    ]
  },
  {
    id: 'mat_hobbies_woodworking',
    title: 'The Antique Walnut Joinery 🪚',
    description: 'The raw, organic textures of native oak and black walnut inspire you. You feel a sudden, passionate urge to master the ancient craft of manual furniture joinery.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Purchase a massive cast-iron workbench and a suite of premium Japanese hand planes for five thousand dollars.',
        outcomeText: 'Your garage smells beautifully of sweet cedar. After weeks of scraping, you produce a solid walnut table that is heirloom quality.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 25, smarts: 15, stress: -20 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 5000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Hand-crafted a solid heirloom walnut dining table in your new woodshop.`);
        }
      },
      {
        choiceText: 'Buy cheap construction scrap pallets and basic hardware tools to build a rustic doghouse.',
        outcomeText: 'You get three painful splinters but successfully construct a shaky shelter. It is rustic and functional, cost-effective.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -5, happiness: 10, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 100, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Built a functional rustic pet kennel from reclaimed shipping pallets.`);
        }
      },
      {
        choiceText: 'Enroll in a local craft master circle, sharing tool sets and learning historic dovetail secrets.',
        outcomeText: 'You build outstanding neighborhood bonds while perfecting your cutting techniques. You earn high community praise.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 15, karma: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Enrolled in a local artisan woodworking apprenticeship.`);
        }
      }
    ]
  },
  {
    id: 'mat_hobbies_wine_cellar',
    title: 'The Vintage Ferment 🍷',
    description: 'You decide to establish an experimental micro-winery in your dry basement, aiming to ferment raw, high-altitude mountain grape harvests.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Import temperature-controlled oak fermenters and premium grape tons for four thousand dollars.',
        outcomeText: 'Your garage looks like an elite vineyard lab. A year later, your home vintage is rich, balanced, and complex.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 30, smarts: 12, stress: -15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 4000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Fermented a superb micro-batch Cabernet Sauvignon in your basement cellars.`);
        }
      },
      {
        choiceText: 'Ferment cheap concord store juices using water jugs and baker yeast inside your closet.',
        outcomeText: 'The mixture smells intensely like stale vinegar. The resulting liquid is highly alcoholic but physically painful to swallow.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -15, happiness: -5, smarts: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 150, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Brewed carbonated table juice home-alcohol with catastrophic, battery-acid flavor.`);
        }
      },
      {
        choiceText: 'Join a suburban wine-pressing cooperative to split equipment costs and enjoy joint Tastings.',
        outcomeText: 'A delightful experience! You spend pleasant autumn afternoons pressing grapes with neighbors, building warm alliances.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, stress: -10, karma: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Joined cooperative suburban grape pressing workshops.`);
        }
      }
    ]
  },
  {
    id: 'mat_career_plateau',
    title: 'The Permanent Horizon 💼',
    description: 'A director twenty years younger than you is named VP of operations. You suddenly realize your trajectory at the company has hit its absolute permanent ceiling.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isEmployed = state.characterInfo.currentOccupation !== 'Unemployed' && state.characterInfo.currentOccupation !== 'Retired';
      return age >= 46 && age <= 53 && isEmployed;
    },
    choices: [
      {
        choiceText: 'Accept your position gracefully, redirecting your mental energy entirely into personal crafts and home projects.',
        outcomeText: 'You stop stressing over board slides. Your career stays slow, but your emotional life flourishes.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -30, happiness: 20, health: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Redirected mental energies away from executive ladders into family and crafts.`);
        }
      },
      {
        choiceText: 'Work intense eighty-hour weeks to challenge the board and prove your indispensability.',
        outcomeText: 'Your analytics are flawless, but you collapse on your couch with high blood pressure and an aching neck.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 30, health: -20, smarts: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Fought career plateaus with exhausting, high-intensity overtime routines.`);
        }
      },
      {
        choiceText: 'Quiet-quit immediately, doing only the minimum tasks needed to keep collecting your heavy salary checks.',
        outcomeText: 'You Spend hours playing browser chess and leaving on time. Nobody notices your slow output, and you enjoy free lunches.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -25, happiness: 10, karma: -15 });
          state.log.push(`Age ${state.characterInfo.age}: Commenced quiet-quitting office duties to reclaim personal hours.`);
        }
      }
    ]
  },
  {
    id: 'mat_lumbago_01',
    title: 'The Garden Defiance 🌿',
    description: 'You bend over at a sharp angle to haul a hundred-pound sack of wet organic compost, ignoring warm stretch suggestions.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Admit defeat instantly, lying on firm kitchen floorboards to rest with deep ice packs.',
        outcomeText: 'You look ridiculous on the linoleum, but your spine slowly decompresses without permanent structural damage.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -5, stress: -5, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Rested a strained back immediately, avoiding lumbar deterioration.`);
        }
      },
      {
        choiceText: 'Push through the pain to wheel the compost bags across the yard to show you are still in prime condition.',
        outcomeText: 'A sickening pop rings in your lower back. You collapse in the grass and have to be carried inside by neighbors.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -25, stress: 25, happiness: -20, looks: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Strained lumbar spine discs through stubborn gardening pride, suffering acute injury.`);
        }
      },
      {
        choiceText: 'Book immediate private clinical dry-needling and spinal rehabilitation to rebuild core stability.',
        outcomeText: 'The physical therapist is tough, but they correct your posture and strengthen your core muscles.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -10, smarts: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Restored spinal core biomechanics with premium physical therapy (-$1,500).`);
        }
      }
    ]
  },
  {
    id: 'mat_ageism_exclusion',
    title: 'The Sidelined Invite 📧',
    description: 'You note that you are being left off invitation lists for important early strategic brainstorming emails, which are now dominated by junior managers.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isEmployed = state.characterInfo.currentOccupation !== 'Unemployed' && state.characterInfo.currentOccupation !== 'Retired';
      return age >= 46 && age <= 53 && isEmployed;
    },
    choices: [
      {
        choiceText: 'Document the patterns and file a formal compliance memo with Human Resources regarding age bias.',
        outcomeText: 'The legal department panics. They mandate new inclusion rules, and you are quietly re-invited to core meetings.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 20, smarts: 10, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Logged formal legal protests regarding structural age exclusion at the firm.`);
        }
      },
      {
        choiceText: 'Schedule a peaceful coffee session with the lead junior manager to share strategic advisory aid.',
        outcomeText: 'You help them avoid a massive database integration pitfall. They realize your wisdom is an absolute cheat-code.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, smarts: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Mentored key junior directors to preserve strategic boardroom equity.`);
        }
      },
      {
        choiceText: 'Ignore the emails entirely, leaving the office early on Fridays to spend time hiking.',
        outcomeText: 'You enjoy gorgeous sunny trails. Let the youngsters burn their weekends troubleshooting the code.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -25, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Embraced strategic meetings exclusion, utilizing hours for personal health.`);
        }
      }
    ]
  },
  {
    id: 'mat_parent_assisted_living',
    title: 'The Parent Assisted Move 👵',
    description: 'Your aging parent [Parent] suffers a series of dizzy spells. Their medical charts indicate they should no longer reside in isolated rural independence.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const hasLivingParent = state.relationships.some(r => r.relationshipType === 'Parent' && !r.isDead);
      return age >= 46 && age <= 53 && hasLivingParent;
    },
    choices: [
      {
        choiceText: 'Finance an exquisite private cottage inside an elite assisted living estate for fifteen thousand dollars.',
        outcomeText: '[Parent] settles into a gorgeous suite with continuous nursing care and beautiful gardens. Your cash balance is heavily depleted.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, stress: -20, karma: 25 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 15000, -500000);
          const parent = state.relationships.find(r => r.relationshipType === 'Parent' && !r.isDead);
          if (parent) parent.relationshipValue = Math.min(100, parent.relationshipValue + 30);
          state.log.push(`Age ${state.characterInfo.age}: Sponsored premium professional assisted living care facilities for [Parent] (-$15,000).`);
        }
      },
      {
        choiceText: 'Invite [Parent] to reside permanently in your guest bedroom, taking on direct caregiving duties.',
        outcomeText: 'You cook every meal and manage their drug charts. It is physically exhausting, but your family bond is unbreakable.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, stress: 30, happiness: 15, karma: 35 });
          const parent = state.relationships.find(r => r.relationshipType === 'Parent' && !r.isDead);
          if (parent) parent.relationshipValue = 100;
          state.log.push(`Age ${state.characterInfo.age}: Welcomed [Parent] into your residential house to handle direct daily care.`);
        }
      },
      {
        choiceText: 'Hire a part-time visiting home-health nurse coordinator to check their vital metrics weekly.',
        outcomeText: 'You preserve their independent home structure. The solution is balanced, though you worry during stormy nights.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 15, smarts: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 3500, -500000);
          const parent = state.relationships.find(r => r.relationshipType === 'Parent' && !r.isDead);
          if (parent) parent.relationshipValue = Math.min(100, parent.relationshipValue + 10);
          state.log.push(`Age ${state.characterInfo.age}: Hired visiting geriatric nurses to support [Parent] in their independent house.`);
        }
      }
    ]
  },
  {
    id: 'mat_bifocals_01',
    title: 'The Shrinking Font 👓',
    description: 'You find yourself holding reading materials at complete arm\'s length to read small letters. It is time to face the optometrist.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Purchase premium double-glazed progressive designer lenses for eight hundred dollars.',
        outcomeText: 'You look highly intellectual! You read menus in dim restaurants instantly with zero squinting.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, looks: 5, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 800, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Bought premium progressive lenses to correct mature vision decay.`);
        }
      },
      {
        choiceText: 'Buy cheap five-dollar magnifying readers from a nearby drugstore rack, leaving pairs in different rooms.',
        outcomeText: 'You keep losing them, and the plasticky frames slide off your nose, but your budget remains untouched.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 5, looks: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 20, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Deployed cheap drugstore reading magnifying glasses across the house.`);
        }
      },
      {
        choiceText: 'Decline any medical visual aids, claiming you can read perfectly by adjusting ambient lighting.',
        outcomeText: 'You squint furiously at simple text blocks, suffering massive headaches and bumping your knees on footstools.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, stress: 15, happiness: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Stubbornly refused reading glasses, causing persistent optical headaches.`);
        }
      }
    ]
  },
  {
    id: 'mat_re_eval_partner',
    title: 'The Silent Dinners 🕯️',
    description: 'With the household quiet and empty, you and [Partner] sit across from each other. You realize the daily conversations have become mechanical.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isMarried = state.maritalStatus === 'Married';
      const isPartnerAlive = state.relationships.some(r => r.relationshipType === 'Partner' && !r.isDead);
      return age >= 46 && age <= 53 && isMarried && isPartnerAlive;
    },
    choices: [
      {
        choiceText: 'Initiate intensive domestic marriage counseling to rebuild your emotional foundations.',
        outcomeText: 'The process is raw and difficult, sharing tears over old friction, but you rebuild authentic, warm love.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 15, happiness: 20 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 3000, -500000);
          const partner = state.relationships.find(r => r.relationshipType === 'Partner' && !r.isDead);
          if (partner) partner.relationshipValue = Math.min(100, partner.relationshipValue + 30);
          state.log.push(`Age ${state.characterInfo.age}: Completed structured couple therapy with [Partner] to heal marital distance.`);
        }
      },
      {
        choiceText: 'Plan a completely self-guided backpack journey with [Partner] across Europe to recreate initial dating memories.',
        outcomeText: 'You laugh over missed train platforms and drink inexpensive wine on historic stairs. The physical thrill of dating returns!',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 30, stress: -20, health: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 7000, -500000);
          const partner = state.relationships.find(r => r.relationshipType === 'Partner' && !r.isDead);
          if (partner) partner.relationshipValue = Math.min(100, partner.relationshipValue + 25);
          state.log.push(`Age ${state.characterInfo.age}: Backpacked historic foreign ruins with [Partner], rekindling first love.`);
        }
      },
      {
        choiceText: 'Settle into a comfortable, independent roommate arrangement, respecting each other\'s physical separation.',
        outcomeText: 'You sleep in separate beds and focus on your individual hobbies. There are no fights, but the hearth is cold.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -10, happiness: -5 });
          const partner = state.relationships.find(r => r.relationshipType === 'Partner' && !r.isDead);
          if (partner) partner.relationshipValue = Math.max(20, partner.relationshipValue - 15);
          state.log.push(`Age ${state.characterInfo.age}: Settled into polite, emotionally separate roommate habits with [Partner].`);
        }
      }
    ]
  },
  {
    id: 'mat_exec_succession',
    title: 'The Succession Shadow 👑',
    description: 'You hold an elite, highly paid senior role. The board begins to issue discreet suggestions regarding who you will mentor as an executive successor.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isSeniorJob = ['CEO of Tech Startup', 'CEO', 'Corporate CEO', 'Executive', 'President', 'Managing Director', 'Corporate Attorney', 'Senior Developer'].includes(state.characterInfo.currentOccupation || '');
      return age >= 46 && age <= 53 && isSeniorJob;
    },
    choices: [
      {
        choiceText: 'Select a brilliant, humble young associate and dedicate hours to mentoring them.',
        outcomeText: 'They learn your strategic philosophies. Your reputation as an elegant, supportive titan of the industry is secured.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, smarts: 15, stress: 10, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Hand-crafted an orderly executive mentorship strategy to groom your successor.`);
        }
      },
      {
        choiceText: 'Consolidate crucial files and client relations to ensure nobody can replace you for another decade.',
        outcomeText: 'You preserve your powerful grip, but junior colleagues look at you with cold, silent dread.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 30, happiness: 10, karma: -30 });
          state.log.push(`Age ${state.characterInfo.age}: Fortified your senior rank aggressively, sidelining all potential successors.`);
        }
      },
      {
        choiceText: 'Resign unexpectedly to establish a highly exclusive boutique consulting office on your own terms.',
        outcomeText: 'You walk away on top! Clients follow you immediately, and your hours are suddenly perfectly flexible.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, stress: -20, smarts: 10 });
          state.finances.annualSalary = Math.round(state.finances.annualSalary * 0.85);
          state.log.push(`Age ${state.characterInfo.age}: Stepped down gracefully to construct a boutique private advisory office.`);
        }
      }
    ]
  },
  {
    id: 'mat_cardio_flutters',
    title: 'The Cardiac Alert 🩺',
    description: 'During a Routine diagnostic assessment, your physician flags a critical rise in arterial blood pressure levels, demanding lifestyle changes.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Transition immediately to a strict dietary regimen containing zero processed foods and zero red meats.',
        outcomeText: 'You consume organic greens and raw berries. Your physical arteries clear, and your physical vitals look exceptional.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 25, looks: 10, stress: -10, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Adopted a clean wellness dietary regimen of raw greens to heal cardiovascular health.`);
        }
      },
      {
        choiceText: 'Obtain clinical prescription anti-hypertensives, continuing to consume heavy steaks and coffee.',
        outcomeText: 'The drugs chemically manage your blood pressure, but you feel slightly fatigued and your stomach aches.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 5, stress: 5, happiness: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 400, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Managed arterial cardiovascular warnings using daily chemical prescriptions.`);
        }
      },
      {
        choiceText: 'Dismiss the numbers as stress-induced anomalies, refusing to change your robust eating routines.',
        outcomeText: 'You feel a scary, persistent tightness in your chest during stairs, carrying an invisible cardiovascular risk.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -25, stress: 20, happiness: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Stubbornly dismissed cardiovascular medical diagnostics, carrying heavy risk.`);
        }
      }
    ]
  },

  // =========================================================================
  // SUB-TIER 2: LATE MATURE ADULTHOOD (Ages 54–60)
  // Focusing on early retirement plans, chronic health management, legacy decisions,
  // grandparenthood, asset preservation, and cellular changes.
  // =========================================================================
  {
    id: 'mat_early_retirement',
    title: 'The Horizon Blueprint 🏖️',
    description: 'A wealth planner presents an extensive forecast of your cash balances, indicating that you could technically retire now.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isEmployed = state.characterInfo.currentOccupation !== 'Unemployed' && state.characterInfo.currentOccupation !== 'Retired';
      return age >= 54 && age <= 60 && isEmployed;
    },
    choices: [
      {
        choiceText: 'Initiate immediate retirement sequences to dedicate your life to travel, family, and silent studies.',
        outcomeText: 'The office coordinates a warm final lunch. You walk out into the bright afternoon sun, completely free.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -40, happiness: 30, health: 15 });
          state.characterInfo.currentOccupation = 'Retired';
          state.finances.annualSalary = Math.round(state.finances.annualSalary * 0.4); // Pension or investment yield
          state.log.push(`Age ${state.characterInfo.age}: Officially retired early from corporate fields to embrace personal studies.`);
        }
      },
      {
        choiceText: 'Decline early retirement, persisting in your senior role to maximize peak financial assets.',
        outcomeText: 'Your banking balances bulge magnificently, but you sigh deeply during cold corporate morning stand-ups.',
        effect: (state: CharacterState) => {
          state.finances.cashBalance += 30000;
          adjustStats(state, { stress: 20, health: -10, happiness: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Chose to accumulate extra capital by deferring retirement structures.`);
        }
      },
      {
        choiceText: 'Transition into a low-volume part-time independent advisory structure for three hours a week.',
        outcomeText: 'An exquisite balance! You retain intellectual engagement and an hourly fee while enjoying sleepy mornings.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -20, happiness: 20, smarts: 10 });
          state.finances.annualSalary = Math.round(state.finances.annualSalary * 0.55);
          state.log.push(`Age ${state.characterInfo.age}: Restructured career role into a flexible, low-stress executive advisory track.`);
        }
      }
    ]
  },
  {
    id: 'mat_cradle_grandchild',
    title: 'The Grandchild Call 🍼',
    description: 'Your child [Child] calls you in tears of profound fatigue and joy: they have just welcomed a newborn baby. You are physically a grandparent.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const hasLivingChild = state.relationships.some(r => r.relationshipType === 'Child' && !r.isDead);
      return age >= 54 && age <= 60 && hasLivingChild;
    },
    choices: [
      {
        choiceText: 'Allocate ten thousand dollars in cash directly into a high-yield trust for the baby\'s future education.',
        outcomeText: 'Your child [Child] is deeply touched by your incredible strategic support. Your family is tighter than steel.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, karma: 30 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 10000, -500000);
          const child = state.relationships.find(r => r.relationshipType === 'Child' && !r.isDead);
          if (child) child.relationshipValue = Math.min(100, child.relationshipValue + 30);
          state.log.push(`Age ${state.characterInfo.age}: Seeded a $10,000 collegiate trust for your new grandchild.`);
        }
      },
      {
        choiceText: 'Fly out immediately to complete nocturnal baby duty and run household household operations.',
        outcomeText: 'You change dozens of diaper complexes and brew bottles in dim lighting. You are physically spent, but your core registry fills with love.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -15, stress: 15, happiness: 35, karma: 35 });
          const child = state.relationships.find(r => r.relationshipType === 'Child' && !r.isDead);
          if (child) child.relationshipValue = 100;
          state.log.push(`Age ${state.characterInfo.age}: Traveled immediately to support [Child]\'s exhausting baby care duties.`);
        }
      },
      {
        choiceText: 'Send a luxurious velvet stroller package with warm written blessings from a comfortable distance.',
        outcomeText: 'They appreciate the premium gear, and you preserve your perfectly silent, un-interrupted afternoon study schedules.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1200, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Funded luxury nursery apparatus for grandchild from a peaceful domestic distance.`);
        }
      }
    ]
  },
  {
    id: 'mat_will_drafting_legacy',
    title: 'The Ink and Legacy 📜',
    description: 'A sharp, frosty winter night reminds you of your absolute mortality. You sit down with a legal counselor to formalize your legal will and digital assets.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Allocate your future wealth strictly to your direct biological descendants, ensuring bloodline integrity.',
        outcomeText: 'Your trust structures are airtight. Your children approve of your protective stewardship of the family legacy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 10, stress: -10 });
          const child = state.relationships.find(r => r.relationshipType === 'Child' && !r.isDead);
          if (child) child.relationshipValue = Math.min(100, child.relationshipValue + 15);
          state.log.push(`Age ${state.characterInfo.age}: Executed a strict biological inheritance trust to safeguard estate assets.`);
        }
      },
      {
        choiceText: 'Designate fifty percent of your wealth to verified environmental and global medical research funds.',
        outcomeText: 'The legal team files your philanthropic deeds. You carry a warm, glowing sense of cosmic purpose, helping humanity.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 40, happiness: 25, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Structured your will to disburse half of your legacy assets to medical research foundations.`);
        }
      },
      {
        choiceText: 'Incorporate complex educational milestone gates before any heirs can access trust funds.',
        outcomeText: 'Your counselor smiles at your meticulous design. Your future heirs must secure scientific credentials or run companies before touching cash.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Drafted rigorous academic milestone clauses into your family trust paperwork.`);
        }
      }
    ]
  },
  {
    id: 'mat_joint_stiffness',
    title: 'The Damp Morning Creak 🦴',
    description: 'A cold, high-humidity rainstorm sets in, and you wake with a dull, aching heat in both your kneecaps and index knuckles.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Commence a daily schedule of advanced turmeric supplements and low-impact warm-water swimming.',
        outcomeText: 'The clinical pool therapy works magic! Your bone frames feel wonderfully oiled and loose.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 20, looks: 5, stress: -10, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 350, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Healed early cartilage friction via low-impact dynamic swimming schedules.`);
        }
      },
      {
        choiceText: 'Swallow maximal doses of cheap over-the-counter anti-inflammatories, refusing to adapt your physical patterns.',
        outcomeText: 'The aching pain fades, but the chemicals burn your stomach linings, causing frequent burning digestive alerts.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, stress: 5, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Suppressed joint aches with high-frequency anti-inflammatories, damaging digestive wellness.`);
        }
      },
      {
        choiceText: 'Install a high-end luxury infrared sauna cabin in your master bathroom to melt bone tension.',
        outcomeText: 'Absolute heaven! The dry thermal warmth penetrates deep into your joints, melting years of corporate skeletal stress.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -25, happiness: 25, looks: 8 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 6000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Acquired a premium home infrared sauna to relieve physical stiffness (-$6,000).`);
        }
      }
    ]
  },
  {
    id: 'mat_insomnia_anxiety',
    title: 'The 3:15 AM Vigil 🌑',
    description: 'You wake with clockwork precision in the dead silence of three in the morning, your mind spinning with passive anxiety regarding the speed of time.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Establish a strict electronic sanctuary, banishing all screens from your bedroom and drinking chamomile tea.',
        outcomeText: 'The dark silence slowly heals your patterns. You drift into deep, un-interrupted sleep cycles, waking refreshed.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 20, stress: -20, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Shielded your bedroom from all modern electronic noise to restore deep sleep patterns.`);
        }
      },
      {
        choiceText: 'Instruct a clinical practitioner to prescribe high-strength sedative sleep aids.',
        outcomeText: 'You black out instantly upon head touching pillow. However, you wake carrying a thick, chemical grogginess that persists until noon.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, smarts: -10, stress: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 300, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Relied on heavy chemical sleep aids to suppress midnight anxieties.`);
        }
      },
      {
        choiceText: 'Accept the mid-night wakefulness, sitting by a candle to read classical Stoic philosophy.',
        outcomeText: 'Marcus Aurelius provides deep comfort to your mature mind. You gain serene mental strength in the quiet hours.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, stress: -15, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Utilized midnight watch hours to study classical Stoic philosophy.`);
        }
      }
    ]
  },
  {
    id: 'mat_ancestral_archive',
    title: 'The Bloodline Chronicles 📑',
    description: 'A box of highly fragile, faded sepia photograph folders arrives from an aunt. You feel a sudden, deep pull to chart your family\'s historical genealogy.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Pay two thousand dollars for international record digital scans and advanced genomic heritage kits.',
        outcomeText: 'You trace your bloodline back to an ancient carpentry guild in rural Bavaria. The completed chart is a magnificent work of history.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 15, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 2000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Chartered your complete ancestral genealogy tree back through European guilds.`);
        }
      },
      {
        choiceText: 'Interview your oldest living relatives, recording their voices and archiving their personal memories on tape.',
        outcomeText: 'Their shaky voices recount details of historic city fires and childhood songs. You preserve a priceless legacy of human memory.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, happiness: 25, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: Digitally voice-archived the oral histories of elder family relatives.`);
        }
      },
      {
        choiceText: 'Let the dusty past rest, discarding the moldy folders to focus entirely on tomorrow.',
        outcomeText: 'You drop the box into physical trash chutes. The ancient names fade into final oblivion, but you save storage space.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -20, smarts: -5, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Cleared old family photographic catalogs to keep homestead space empty.`);
        }
      }
    ]
  },
  {
    id: 'mat_antarctic_cruise',
    title: 'The Frozen Fjord Cruise 🚢',
    description: 'An elite maritime tourism association mails you an invitation for a highly exclusive, thirty-day voyage to the dramatic blue glaciers of Antarctica.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60 && state.finances.cashBalance >= 15000;
    },
    choices: [
      {
        choiceText: 'Purchase the premium cabin package for fifteen thousand dollars, packing your finest woolen gear.',
        outcomeText: 'You sip hot coffee on the wooden deck while ancient indigo icebergs drift past. It is a majestic, jaw-dropping voyage of contemplation.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 35, stress: -30, smarts: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 15000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed a luxury maritime expedition to the blue glaciers of Antarctica.`);
        }
      },
      {
        choiceText: 'Skip the expensive tour to invest those funds in low-yield municipal treasury bonds.',
        outcomeText: 'You avoid any sea-sickness risks. Your ledger balance grows slowly, though you sigh when looking at winter postcards.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 12, stress: -5 });
          state.finances.cashBalance += 1000;
          state.log.push(`Age ${state.characterInfo.age}: Deffered leisure cruises, buying safe municipal tax-free bond sheets instead.`);
        }
      },
      {
        choiceText: 'Plan an independent, self-guided cold-weather hiking loop through raw Alaskan national parks.',
        outcomeText: 'You carry a heavy canvas backpack and camp on raw mountain soils. It is demanding, but your physical cardio thrives.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 25, happiness: 20, stress: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 3000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed a self-sufficient wilderness mountain backpack trek in Alaska.`);
        }
      }
    ]
  },
  {
    id: 'mat_rebuild_classic_engine',
    title: 'The Iron Rebuild 🚙',
    description: 'Your older vehicle\'s mechanical cylinder heads begin to leak black oil. Passing municipal clean-air compliance demands a full engine block tear-down.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const ownsVehicle = state.assets.some(a => a.type === 'vehicle');
      return age >= 54 && age <= 60 && ownsVehicle;
    },
    choices: [
      {
        choiceText: 'Pay four thousand dollars to have an authorized vintage dealership rebuild the aluminum chambers.',
        outcomeText: 'The car runs with an elegant, silent hum, perfectly compliant. You save time, though the fee was steep.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -15, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 4000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Paid vintage mechanical shops to execute a full engine compartment rebuild.`);
        }
      },
      {
        choiceText: 'Gift the car to a local vocational trade school training program, buying a silent electric vehicle.',
        outcomeText: 'The teenagers are thrilled to get hands-on training. You transition to silent, modern electric transit and enjoy massive tax credits.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, stress: -10, smarts: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 15000, -500000); // Cost of EV purchase
          state.assets = state.assets.filter(a => a.type !== 'vehicle');
          state.assets.push({
            id: `asset_ev_${Date.now()}`,
            name: 'Electric Commuter',
            type: 'vehicle',
            purchasePrice: 20000,
            currentValue: 18000,
            annualUpkeep: 400,
            isFinanced: false,
            loanDetails: null,
            category: 'Commuter',
            condition: 100
          });
          state.log.push(`Age ${state.characterInfo.age}: Donated old auto to trade schools, transitioning to electric commuter vehicle.`);
        }
      },
      {
        choiceText: 'Tear down the massive fuel system blocks yourself in your garage using physical shop manual books.',
        outcomeText: 'You spend four weekends covered in jet-black grease. Ultimately, you calibrate the pistons perfectly! Your pride is astronomical.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, smarts: 25, happiness: 25, stress: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 800, -500000); // Tooling cost
          state.log.push(`Age ${state.characterInfo.age}: Completed manual mechanics engine restoration in your home workshop.`);
        }
      }
    ]
  },
  {
    id: 'mat_heritage_play_save',
    title: 'The Playground Battle 🏛️',
    description: 'An aggressive developer group submits a bid to demolish the historic neighborhood playground where your children played, aiming to erect concrete commercial blocks.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Mobilize a neighborhood historic preservation society, presenting legal land deeds at city hall.',
        outcomeText: 'A spectacular civic victory! The municipal chamber declares the park a legal heritage landscape. Neighbors toast you with warm cider.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: 15, karma: 30, happiness: 25 });
          state.log.push(`Age ${state.characterInfo.age}: Spearheaded municipal landmark preservation to protect the community playground.`);
        }
      },
      {
        choiceText: 'Decline to intervene, accepting that urban core density must progress to resolve housing shortages.',
        outcomeText: 'You watch the old wooden slides get crushed by heavy excavators. The new modern tower blocks rise rapidly.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: -10, karma: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Remained passive during municipal redevelopment audits, letting old parks close.`);
        }
      },
      {
        choiceText: 'Sponsor a five-thousand-dollar political campaign to elect a council candidate who advocates for green zones.',
        outcomeText: 'Your backed candidate wins! They halt regional commercial rezoning. The playground is saved by financial leverage.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -10, karma: 20, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 5000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Financed civic election files to guarantee regional green zone parameters.`);
        }
      }
    ]
  },
  {
    id: 'mat_silver_anniversary',
    title: 'The Silver Thread 💍',
    description: 'You and [Partner] arrive at your Silver 25th Wedding Anniversary. The milestone is a beautiful testament to a quarter-century of joint negotiation.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isMarried = state.maritalStatus === 'Married';
      const isPartnerAlive = state.relationships.some(r => r.relationshipType === 'Partner' && !r.isDead);
      return age >= 54 && age <= 60 && isMarried && isPartnerAlive;
    },
    choices: [
      {
        choiceText: 'Host a grand, formal dinner gala for fifty close friends to publicly renew your marital vows.',
        outcomeText: 'You Toast under glittering chandeliers. The family weeps at your beautiful legacy of love, though the event drain cash.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 35, looks: 12, stress: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 6000, -500000);
          const partner = state.relationships.find(r => r.relationshipType === 'Partner' && !r.isDead);
          if (partner) partner.relationshipValue = 100;
          state.log.push(`Age ${state.characterInfo.age}: Hosted a grand celebration to renew your wedding vows after 25 years.`);
        }
      },
      {
        choiceText: 'Plan an off-grid mountain cabin retreat with zero electronics to walk and read in peace.',
        outcomeText: 'You spend days chopping dry cedar wood, cooking basic meals on stoves, and sharing quiet, deep thoughts. Perfectly healing.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -30, happiness: 25 });
          const partner = state.relationships.find(r => r.relationshipType === 'Partner' && !r.isDead);
          if (partner) partner.relationshipValue = 100;
          state.log.push(`Age ${state.characterInfo.age}: Celebrated wedding silver milestone inside an electronic-free mountain sanctuary.`);
        }
      },
      {
        choiceText: 'Give them a premium, custom-engraved piece of physical platinum jewelry costing five thousand dollars.',
        outcomeText: 'Their eyes widen as they unlock the velvet package. The metal carries beautiful coordinate markings of your wedding spot.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 15, happiness: 20 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 5000, -500000);
          state.assets.push({
            id: `asset_platinum_${Date.now()}`,
            name: 'Platinum Coordinate Ring',
            type: 'other',
            purchasePrice: 5000,
            currentValue: 4500,
            annualUpkeep: 0,
            isFinanced: false,
            loanDetails: null,
            subtype: 'Ring',
            condition: 100
          });
          const partner = state.relationships.find(r => r.relationshipType === 'Partner' && !r.isDead);
          if (partner) partner.relationshipValue = Math.min(100, partner.relationshipValue + 15);
          state.log.push(`Age ${state.characterInfo.age}: Gifted [Partner] custom coordinate platinum jewelry for your Silver anniversary.`);
        }
      }
    ]
  },
  {
    id: 'mat_biological_menopause',
    title: 'The Hormonal Solstice 🍂',
    description: 'The body shifts. You encounter regular patterns of extreme midnight warmth, metabolic slowdown, and general physiological exhaustion as your body traverses its natural hormonal transition.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Adopt a holistic endocrinology regimen of natural mineral supplements, cold showers, and weight lifting.',
        outcomeText: 'Your body builds fresh, firm muscle mass! The hot flashes subside, and you carry magnificent stamina.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 20, looks: 8, stress: -15, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Balanced mature hormone shifts using systematic weight training and organic diets.`);
        }
      },
      {
        choiceText: 'Enroll in advanced clinical hormone replacement therapy (HRT) under top specialist care.',
        outcomeText: 'Your sleep cycle stabilizes almost immediately and your mind feels razor-sharp, with minor medical maintenance fees.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -10, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1200, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Balanced the mature physical transition using specialist-supervised hormone therapy (-$1,200).`);
        }
      },
      {
        choiceText: 'Accept the shifts with zero intervention, managing the periodic exhaustion by sleeping long afternoon hours.',
        outcomeText: 'You nap frequently, which slows down your creative output, but you save money and live peacefully are your own speed.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 5, stress: -10, smarts: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Accepted structural and metabolic shifts as natural patterns of maturity.`);
        }
      }
    ]
  },
  {
    id: 'mat_mentor_struggling_associate',
    title: 'The Socratic Shadow 🎓',
    description: 'A quiet, struggling junior colleague approaches you in the breakroom. They are overwhelmed by the firm\'s demanding workflows and ask if you would act as their formal career mentor.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isEmployed = state.characterInfo.currentOccupation !== 'Unemployed' && state.characterInfo.currentOccupation !== 'Retired';
      return age >= 54 && age <= 60 && isEmployed;
    },
    choices: [
      {
        choiceText: 'Dedicate two hours weekly of patient strategic mentorship, teaching them how to navigate high-stakes files.',
        outcomeText: 'A year later, they excel brilliantly, publically thanking you during the firm\'s annual review gala.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, smarts: 15, stress: 5, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Dedicated weekly office hours to mentor and protect a vulnerable junior peer.`);
        }
      },
      {
        choiceText: 'Decline their requests, explaining that your current executive slate of work consumes your entire schedule.',
        outcomeText: 'They nod sadly and walk away. They are demoted six months later, though your own weekly workload remains uncluttered.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -20, stress: -10, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Prioritized private boardroom hours over junior staff developmental assistance.`);
        }
      },
      {
        choiceText: 'Gift them an expensive copy of your favorite corporate leadership manual, offering general hands-off advice.',
        outcomeText: 'They read the book and appreciate the gesture, though they struggle to translate the textbook words to actual systems.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 40, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Provided static leadership books and brief career pointers to a struggling coworker.`);
        }
      }
    ]
  },
  {
    id: 'mat_regulatory_ledger_audit',
    title: 'The Ledger Inquisition 📋',
    description: 'The municipal tax department flags your historic real estate asset valuations. They issue a formal notice demanding a complete forensic ledger audit of your portfolio.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const hasAssets = state.assets.length > 0;
      return age >= 54 && age <= 60 && hasAssets;
    },
    choices: [
      {
        choiceText: 'Hire an elite private tax attorney to represent your asset folders for three thousand dollars cash.',
        outcomeText: 'Your attorney files immaculate legal countermotions. The audit closes within weeks, confirming your perfect record.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -20, smarts: 10, happiness: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 3000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Employed elite legal counsel to resolve municipal tax ledger audits (-$3,000).`);
        }
      },
      {
        choiceText: 'Compile the endless shoeboxes of physical receipts yourself, spending sixty hours auditing files.',
        outcomeText: 'A grueling, mind-numbing effort of tracking numbers. You find every single dollar, though you suffer terrible eye strain.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, smarts: 20, stress: 25 });
          state.log.push(`Age ${state.characterInfo.age}: Executed tedious, self-guided forensic tax audit files to guard wealth assets.`);
        }
      },
      {
        choiceText: 'Bribe a junior regulatory auditor with a luxurious five-hundred-dollar rare wine crate.',
        outcomeText: 'The junior auditor accepts the crate with a quiet wink. Your audit is deleted, but you always look over your shoulder.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -40, stress: 30, smarts: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Manipulated regulatory audit staff using high-end black-market gifts.`);
        }
      }
    ]
  },
  {
    id: 'mat_short_term_memory_slip',
    title: 'The Staring Cabinets 🧠',
    description: 'You march into the kitchen with complete determination, only to freeze there staring at the wooden cabinets, completely unable to remember what you wanted.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Start a daily routine of brain-training puzzles, wild berry diets, and detailed memory logs.',
        outcomeText: 'The mental exercises are fun! You start recalling complex card decks and phone records with razor-sharp speed.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, health: 12, stress: -5, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Combated cognitive aging with daily neurochemical brain puzzles and berry diets.`);
        }
      },
      {
        choiceText: 'Shrug it off as basic mechanical age wear-and-tear, refusing to let memory paranoia dictate your day.',
        outcomeText: 'You walk back to the couch. Ten minutes later, you remember you wanted a glass of water. Natural and peaceful.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -15, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Ignored minor memory lapses, choosing to accept organic mental patterns.`);
        }
      },
      {
        choiceText: 'Consult an expensive private neurologist to execute comprehensive neurocognitive baseline scans.',
        outcomeText: 'The clinical result shows perfect baseline values for your age. You enjoy immense peace of mind, despite the high clinical fee.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -25, smarts: 10, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 2500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Confirmed neural structural baseline health using advanced medical MRI scans (-$2,500).`);
        }
      }
    ]
  },
  {
    id: 'mat_reunion_reminisce_fire',
    title: 'The Fireside Nostalgia 🔥',
    description: 'A lifelong childhood friend calls out of the blue. They want to rent a small lake house cabin for a weekend of fishing and nostalgic beers.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Book the trip immediately, spending the weekend laughing about your old teenage school yard pranks.',
        outcomeText: 'You sit under stunning starry skies by wood fires. You feel a massive emotional recharge, realizing true friendship transcends time.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 30, stress: -25, karma: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Reunited with a childhood companion for a restorative fireside retreat.`);
        }
      },
      {
        choiceText: 'Decline, explaining that your current asset portfolios and estate operations require your full presence.',
        outcomeText: 'Your friend sounds slightly disappointed but wishes you well. You spend the weekend reviewing spreadsheets.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: 10, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Prioritized weekend financial reviews over childhood friend reunions.`);
        }
      },
      {
        choiceText: 'Invite them to visit your grand estate instead to show off your high wealth and collection portfolios.',
        outcomeText: 'They admire your high-end dining set and clean lawns, but the conversation feels slightly stiff and competitive.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 10, stress: 5, happiness: 5, karma: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Hosted a childhood friend to showcase your mature financial achievements.`);
        }
      }
    ]
  },
  // =========================================================================
  // DATA PACK 4: 25 EARLY MATURE EVENTS (AGES 46-53)
  // =========================================================================
  {
    id: 'dp4_mat_46_53_01',
    title: 'The Oak Slab Challenge 🪵',
    description: 'You find a stunning, rough-sawn solid English Oak wood slab at a local sawmill. It is perfect for a handcrafted dining table, but it requires hours of hard planar carving.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Purchase the wood slab and spend nights hand-planing the grain.',
        outcomeText: 'Your shoulder joints burn, but the satin-smooth finish is magnificent. You build a jaw-dropping heirloom piece.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, stress: -15, smarts: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 800, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Hand-crafted an English Oak dining table as a therapeutic hobby.`);
        }
      },
      {
        choiceText: 'Hire a professional woodworker to finish the table for you.',
        outcomeText: 'They return a perfectly flat table. It lacks your personal touch, but it is highly functional and saves your joints.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 10, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 2500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Commissioned an artisan woodworking table using outsourcing routes.`);
        }
      },
      {
        choiceText: 'Decline the purchase to keep your garage space clear of sawdust.',
        outcomeText: 'You avoid muscle soreness and conserve your cash reserves for other domestic needs.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Opted to bypass complex lumber crafting projects.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_02',
    title: 'The Copper Pot Sizzle 🍳',
    description: 'You spot a beautiful set of heavy French copper pots in an antique window, boasting incredible thermal distribution.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Invest in the expensive French copper set to master traditional braising.',
        outcomeText: 'The pots require regular polishing, but your red wine beef stews reach an absolute three-star Michelin restaurant grade.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, health: 10, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1200, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Upgraded kitchen hardware to artisan copper sets to advance culinary skills.`);
        }
      },
      {
        choiceText: 'Ignore the window display to stick with your current scratched non-stick skillets.',
        outcomeText: 'You save your money, though you occasionally get frustrated when eggs stick stubbornly to the pan.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Maintained baseline kitchen equipment to optimize liquid budgets.`);
        }
      },
      {
        choiceText: 'Take a weekend cooking class to see if expensive pans are truly required.',
        outcomeText: 'The chef teaches you professional heat control methods. You learn that technique is often more vital than metal.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 12 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 300, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed weekend culinary courses on pan heat mechanics.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_03',
    title: 'The Sourdough Starter Crisis 🍞',
    description: 'Your prized wild-yeast sourdough starter, active for three generations, begins smelling heavily of sour paint thinner.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Feed the starter meticulously twice a day with high-quality organic rye flour.',
        outcomeText: 'The wild flora recovers beautifully, releasing wonderful aromas of fresh apples. Your weekend loaves are spectacular.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, stress: -10, smarts: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Restored failing heirloom wild sourdough cultures through rigid rye feedings.`);
        }
      },
      {
        choiceText: 'Discard the batch entirely and buy dry commercial yeast packets.',
        outcomeText: 'Your baking process becomes highly predictable, but you miss the complex tang of natural slow fermentation.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -5, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Standardized household baking systems using commercial yeast.`);
        }
      },
      {
        choiceText: 'Ask an online baking forum to analyze your starter chemistry.',
        outcomeText: 'Enthusiasts diagnostic spreadsheets advise you to lower ambient moisture levels. The advice works like magic!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Solved fermentation chemical issues via digital community forums.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_04',
    title: 'The Backyard Apiary 🐝',
    description: 'A local beekeeping association offers a complete starter hive bundle, promising fresh spring honey in your backyard gardens.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Establish the beehive cluster near your apple trees to promote local pollination.',
        outcomeText: 'You get stung twice during honey extractions, but you harvest ten jars of rich, golden honey that neighbors crave.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 22, health: 12, stress: -12 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Set up backyard hives, harvesting organic seasonal honey.`);
        }
      },
      {
        choiceText: 'Decline the honey project to avoid medical allergy risks from stings.',
        outcomeText: 'You keep your gardens peaceful, bypassing any stinging emergencies or neighborhood safety debates.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5, karma: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Declined residential beekeeping to prioritize suburban safety.`);
        }
      },
      {
        choiceText: 'Attend beekeeping lectures without setting up active hives.',
        outcomeText: 'You build superb entomological knowledge, understanding the vital roles of insects without any hive cleanup duties.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Completed regional apiary science workshops.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_05',
    title: 'The Dorm Room Departure 📦',
    description: 'The family driveway feels incredibly quiet. Your youngest child is loading their final plastic laundry crates for college.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const hasLivingChild = state.relationships?.some(r => r.relationshipType === 'Child' && !r.isDead);
      return age >= 46 && age <= 53 && hasLivingChild;
    },
    choices: [
      {
        choiceText: 'Sponsor their college dorm gear upgrade with two thousand cash dollars.',
        outcomeText: 'They hug you with deep gratitude. Their desk setup is pristine, and they start their first term in comfort.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 2000, -500000);
          const child = state.relationships.find(r => r.relationshipType === 'Child' && !r.isDead);
          if (child) child.relationshipValue = Math.min(100, child.relationshipValue + 15);
          state.log.push(`Age ${state.characterInfo.age}: Funded dorm room setups for children entering university campuses.`);
        }
      },
      {
        choiceText: 'Write a long personal journal entry to process your complex emotional transitions.',
        outcomeText: 'The quiet reflection is highly restorative, helping you embrace this new epoch of personal independence.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 12, stress: -15, smarts: 8 });
          state.log.push(`Age ${state.characterInfo.age}: Processed empty nest adjustments via reflective daily journaling.`);
        }
      },
      {
        choiceText: 'Suggest they manage all moving fees independently to build maturity.',
        outcomeText: 'They struggle with heavy trunks, but feel a strong surge of young pride handling their own college logistics.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Encouraged children to handle university logistics independently.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_06',
    title: 'The Gold Coin Cache 🪙',
    description: 'A reputable precious metals broker offers certified one-ounce gold bullion bars at current wholesale spot prices.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53 && state.finances.cashBalance >= 10000;
    },
    choices: [
      {
        choiceText: 'Allocate ten thousand dollars cash to purchase physical gold bullion bars.',
        outcomeText: 'The solid weight of gold feels incredibly reassuring in your hands. You tuck the bars safely inside a secure bank box.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -12 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 10000, -500000);
          state.assets.push({
            id: `asset_gold_${Date.now()}`,
            name: 'Gold Bullion Bars',
            type: 'other',
            purchasePrice: 10000,
            currentValue: 10000,
            annualUpkeep: 50,
            isFinanced: false,
            loanDetails: null,
            condition: 100
          });
          state.log.push(`Age ${state.characterInfo.age}: Swapped cash reserves for physical gold bullion assets.`);
        }
      },
      {
        choiceText: 'Keep your capital in liquid savings accounts to retain flexible buying power.',
        outcomeText: 'You avoid transport hassles and broker markups, maintaining absolute fluidity for sudden business emergencies.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Preserved liquid currency over physical gold reserves.`);
        }
      },
      {
        choiceText: 'Invest the funds in broad equity indices instead of heavy metal.',
        outcomeText: 'The equity markets fluctuate, but your long-term compound projections are highly positive.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20 });
          state.log.push(`Age ${state.characterInfo.age}: Directed cash surpluses into broad stock index structures.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_07',
    title: 'The Masterclass Knife Set 🔪',
    description: 'You meet a traveling blacksmith selling hand-forged Japanese Damascus kitchen knives. Each layer of steel ripples like running river water.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Purchase the bespoke Japanese cutlery set to refine your carving precision.',
        outcomeText: 'They slice through fresh raw salmon like butter! Food prep becomes an absolute aesthetic pleasure every single evening.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, looks: 5, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 900, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Acquired hand-forged Japanese Damascus steel cutlery for gourmet food prep.`);
        }
      },
      {
        choiceText: 'Refuse the purchase, sharpening your old stainless steel knives with cheap oil stones.',
        outcomeText: 'Your old blades work decently well, though they bruise delicate basil leaves and ripe tomatoes occasionally.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Maintained existing steel cutlery through manual oil stone sharpening.`);
        }
      },
      {
        choiceText: 'Attend a blade care seminar to understand proper whetstone sharpening methods.',
        outcomeText: 'You learn how to hold precise fifteen-degree angles, turning cheap metal blades into razor-sharp cutting tools!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Learned professional Japanese whetstone sharpening techniques.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_08',
    title: 'The Forgotten Acoustic Guitar 🎸',
    description: 'You find your old high school acoustic guitar in a dusty corner. Its wooden neck is slightly warped and the steel strings are heavily rusted.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Take the guitar to a local master luthier for professional neck straightening.',
        outcomeText: 'The wood is restored, oiled, and fitted with premium bronze strings. The sweet chords resonate warmly through your living room.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, stress: -15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 350, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Restored a vintage acoustic guitar to revive childhood fingerpicking skills.`);
        }
      },
      {
        choiceText: 'Donate the instrument to a high school music program to clear storage.',
        outcomeText: 'A young student receives the instrument with bright eyes. Your heart swells with pure, warm philanthropic happiness.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Donated an old acoustic guitar to community youth bands.`);
        }
      },
      {
        choiceText: 'Attempt to string and tune the guitar yourself using pliers.',
        outcomeText: 'Ping! A tight steel string snaps violently, giving you a painful scratch on your thumb. You abandon the repair.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -5, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Suffered minor lacerations attempting manual string repairs.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_09',
    title: 'The Stained Glass Spark 💎',
    description: 'A local community center advertises a class on copper-foil stained glass artistry, teaching the methods of classic cathedral windows.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Enroll in the glassmaking course and build a colorful geometric window panel.',
        outcomeText: 'You learn to cut glass sheets and handle hot lead irons safely. The sun glows beautifully through your custom glass panel.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, smarts: 12, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 250, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed certified copper-foil stained glass artisan workshops.`);
        }
      },
      {
        choiceText: 'Decline the course to avoid inhalation risks from hot soldering fumes.',
        outcomeText: 'You avoid the lead exposure hazards, spending your weekends reading books safely on your sofa.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 5, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Avoided hot glass soldering activities to protect respiratory health.`);
        }
      },
      {
        choiceText: 'Purchase a pre-made stained glass piece from a gallery to support local artists.',
        outcomeText: 'The stunning window decor brightens your breakfast nook, and the gallery owner thanks you warmly for your purchase.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 12, looks: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 600, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Acquired premium local stained glass panels to style your dining quarters.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_10',
    title: 'The Real Estate Leverage 🏬',
    description: 'An old commercial storage unit complex near the highway is offered for sale. The masonry needs mortar, but the rental cashflows are solid.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53 && state.finances.cashBalance >= 40000;
    },
    choices: [
      {
        choiceText: 'Acquire the storage unit block with forty thousand dollars down payment.',
        outcomeText: 'You coordinate leases and repair rusty roll-up doors. The monthly tenant rents provide a fantastic passive cashflow!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 40000, -500000);
          state.assets.push({
            id: `asset_storage_${Date.now()}`,
            name: 'Highway Storage Units',
            type: 'real_estate',
            purchasePrice: 120000,
            currentValue: 120000,
            annualUpkeep: 4000,
            isFinanced: true,
            loanDetails: {
              principalRemaining: 80000,
              annualPayment: 6000,
              yearsRemaining: 15
            },
            subtype: 'Modern Condo',
            condition: 80
          });
          state.log.push(`Age ${state.characterInfo.age}: Expanded private portfolios with commercial storage unit structures.`);
        }
      },
      {
        choiceText: 'Decline the real estate offer to keep your administrative duties low.',
        outcomeText: 'You avoid the late-night tenant complaints and plumbing leaks, keeping your weekends entirely peaceful.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -15, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Avoided commercial real estate tasks to preserve leisure hours.`);
        }
      },
      {
        choiceText: 'Invest the cash into liquid real estate investment trusts on stock portals.',
        outcomeText: 'You receive monthly digital cash distributions with absolutely zero property management hassles.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Swapped real estate opportunities for liquid property equity trust units.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_11',
    title: 'The Bonsai Pruning shears ✂️',
    description: 'You receive a delicate fifty-year-old Japanese Juniper Bonsai tree. Its complex branching requires a steady hand and slow strategic trimming.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Prune the Bonsai branches daily with high artistic focus.',
        outcomeText: 'The quiet clipping sessions act as a wonderful form of meditation. Your mind feels sharp and remarkably clear.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, stress: -18, smarts: 8 });
          state.log.push(`Age ${state.characterInfo.age}: Maintained ancient juniper bonsai specimens as a meditative retreat.`);
        }
      },
      {
        choiceText: 'Place the tree in your garden and let nature grow it wild.',
        outcomeText: 'The branches lose their sculpted style, reverting to an ordinary messy shrub, but it stays perfectly healthy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 5, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Allowed stylized bonsai plants to transition back to organic growth.`);
        }
      },
      {
        choiceText: 'Hire a botanical expert to execute the seasonal styling.',
        outcomeText: 'The expert sculpts a stunning miniature pine landscape, though you miss out on the personal creative bond.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 150, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Outsourced specialized bonsai tree shaping to master botanists.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_12',
    title: 'The Truffle Hunting Trek 🍄',
    description: 'A professional gatherer invites you to join a wilderness trek in the damp oak woods to locate highly prized black summer truffles.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Join the wilderness trek and learn to identify correct soil fungal indicators.',
        outcomeText: 'You hike miles through mud and find three rich black truffles under ancient oak roots. Your evening pasta tastes divine.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, happiness: 18, smarts: 12 });
          state.log.push(`Age ${state.characterInfo.age}: Successfully forged woodland truffle trails, locating gourmet food sources.`);
        }
      },
      {
        choiceText: 'Purchase black truffle oils from a luxury grocery store instead.',
        outcomeText: 'You enjoy the rich, musky scent without getting your boots muddy, though your wallet takes a small hit.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 80, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Acquired imported truffle condiments from premium groceries.`);
        }
      },
      {
        choiceText: 'Decline the trek to protect your ankles from hidden forest roots.',
        outcomeText: 'You stay safe in your armchair, avoiding twisted joints or contact with toxic poison ivy patches.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 5, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Avoided damp forest hikes to maintain physical joint safety.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_13',
    title: 'The Umbrella Trust Strategy ☂️',
    description: 'Your wealth counselor advises you to secure a high-limit personal umbrella liability policy to protect your assets from civil lawsuits.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Purchase the premium two-million-dollar umbrella insurance plan.',
        outcomeText: 'You pay the annual premium. Knowing your property and investments are completely shielded brings incredible peace of mind.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -15, happiness: 8 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 400, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Secured high-limit umbrella liability coverage to insulate private assets.`);
        }
      },
      {
        choiceText: 'Reject the coverage, trusting in your safe driving and low-profile lifestyles.',
        outcomeText: 'You save the annual cash fee, though you feel a slight pang of anxiety whenever people visit your property.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Self-insured asset liabilities to eliminate recurring premium fees.`);
        }
      },
      {
        choiceText: 'Register your primary home under a specialized asset protection trust.',
        outcomeText: 'Your lawyers draft solid paperwork. It is a slow, expensive process, but it builds an impenetrable legal fortress.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Reconfigured real estate titles under specialized asset trusts.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_14',
    title: 'The Leathercraft Stamping 👜',
    description: 'You spot a vintage set of heavy steel leather stamps and carving tools at a flea market, sparking an urge to build classic cardholders.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Acquire the leather tools and start carving custom vegetable-tanned wallets.',
        outcomeText: 'The warm scent of natural tanned leather fills your room. Your hand-stitched leather pieces are extremely robust and handsome.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, stress: -12, looks: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 250, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Practiced traditional leathercraft stamping, creating custom travel cases.`);
        }
      },
      {
        choiceText: 'Decline the tools, preferring to buy mass-produced luxury designer wallets online.',
        outcomeText: 'You receive a shiny brand-name wallet. It is incredibly sleek, though it lacks any unique personal character.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 12 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 400, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Acquired factory-branded designer leathergoods.`);
        }
      },
      {
        choiceText: 'Watch tutorial videos on leather dyeing without buying the physical gear.',
        outcomeText: 'You find the artisan dye processes highly satisfying to watch, building good theoretical knowledge of tanning chemistry.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 12 });
          state.log.push(`Age ${state.characterInfo.age}: Studied online documentation on traditional cowhide pigment treatments.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_15',
    title: 'The Espresso Machine Upgrade ☕',
    description: 'An elegant, chrome-plated Italian dual-boiler espresso machine goes on sale, offering precise PID temperature controls.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Purchase the chrome espresso machine to master complex extraction pressures.',
        outcomeText: 'You dial in your grinds to exactly nine bars of pressure. Your morning espresso shots boast thick, velvety hazelnut crema.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, stress: -10, smarts: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Set up a dual-boiler Italian espresso bar to refine daily caffeine extractions.`);
        }
      },
      {
        choiceText: 'Stick with your reliable, cheap plastic drip coffeemaker to avoid vanity splurges.',
        outcomeText: 'Your dark roast tastes bitter and flat, but you keep your counter space clean and avoid hefty power bills.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Retained basic drip coffee machines to preserve simple routines.`);
        }
      },
      {
        choiceText: 'Visit local independent espresso cafes to enjoy premium roasts.',
        outcomeText: 'You chat with skilled baristas and enjoy lovely, complex single-origin lattes without any equipment cleanup duties.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 12, looks: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 150, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Frequented independent artisan coffee bars to explore rare beans.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_16',
    title: 'The College Care Package 🎁',
    description: 'You feel a strong wave of parental nostalgia, wanting to send your child away at college a wonderful taste of home.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const hasLivingChild = state.relationships?.some(r => r.relationshipType === 'Child' && !r.isDead);
      return age >= 46 && age <= 53 && hasLivingChild;
    },
    choices: [
      {
        choiceText: 'Bake three dozen gourmet chocolate pecan cookies and mail them overnight.',
        outcomeText: 'Your child shares them with their roommates, becoming incredibly popular! They call you with massive, happy smiles.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, stress: -12, karma: 15 });
          const child = state.relationships.find(r => r.relationshipType === 'Child' && !r.isDead);
          if (child) child.relationshipValue = Math.min(100, child.relationshipValue + 15);
          state.log.push(`Age ${state.characterInfo.age}: Prepared and shipped homemade artisan baked goods to children at university.`);
        }
      },
      {
        choiceText: 'Transfer three hundred cash dollars directly to their debit card for groceries.',
        outcomeText: 'They appreciate the liquid support, immediately buying healthy fresh produce and paying off textbook fees.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 12, karma: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 300, -500000);
          const child = state.relationships.find(r => r.relationshipType === 'Child' && !r.isDead);
          if (child) child.relationshipValue = Math.min(100, child.relationshipValue + 10);
          state.log.push(`Age ${state.characterInfo.age}: Sent financial food stipends to assist children on university campuses.`);
        }
      },
      {
        choiceText: 'Send them a list of motivational digital reading articles to focus their studies.',
        outcomeText: 'They reply with a quick thumbs-up emoji. They are highly busy but appreciate your steady intellectual guidance.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Provided educational mentorship reading materials to children.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_17',
    title: 'The Art Advisory Consultation 🖼️',
    description: 'An independent fine art advisor invites you to a private gallery, showcasing original, hand-painted landscape oil canvases.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53 && state.finances.cashBalance >= 8000;
    },
    choices: [
      {
        choiceText: 'Acquire a stunning focal landscape canvas for six thousand cash dollars.',
        outcomeText: 'The rich oil textures completely transform your living room. Guests marvel at the depth and beautiful colors of the painting.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, looks: 10, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 6000, -500000);
          state.assets.push({
            id: `asset_art_${Date.now()}`,
            name: 'Fine Oil Landscape',
            type: 'other',
            purchasePrice: 6000,
            currentValue: 62000,
            annualUpkeep: 100,
            isFinanced: false,
            loanDetails: null,
            condition: 100
          });
          state.log.push(`Age ${state.characterInfo.age}: Collected original oil landscape canvases to enhance estate interiors.`);
        }
      },
      {
        choiceText: 'Decline the canvas purchase to avoid illiquid art asset lockups.',
        outcomeText: 'You preserve your liquid capital, avoiding the high gallery markup commissions and security fees.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Declined fine art gallery offers to maintain financial liquidity.`);
        }
      },
      {
        choiceText: 'Buy inexpensive printed poster replicas of famous classic art pieces online.',
        outcomeText: 'You spend ten dollars for a clean print. It looks pleasant in a simple frame, though it lacks physical brushstroke texture.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 50, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Decorated residential walls with high-resolution poster prints.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_18',
    title: 'The Hydroponic Herbs 🌿',
    description: 'An innovative indoor vertical farming kit is released, offering clean automated water pumps and bright spectrum LED arrays.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Install the vertical hydroponic rack in your kitchen pantry.',
        outcomeText: 'Your kitchen smells amazingly of fresh, crisp genovese basil and spicy cilantro all winter long. Your salads are incredibly vibrant.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, happiness: 15, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 400, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Integrated indoor automated hydroponic farming grids to grow organic herbs.`);
        }
      },
      {
        choiceText: 'Decline the automated farming rig to avoid complex electrical wiring.',
        outcomeText: 'You buy plastic grocery store herb clamshells, avoiding any pump buzzing sounds in your kitchen closets.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Opted to purchase standard retail grocery herbs.`);
        }
      },
      {
        choiceText: 'Plant standard seeds in clay window boxes with potting soil.',
        outcomeText: 'It is a messy, simple process. A few sprouts emerge, although you have to clean up potting dirt spills regularly.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 10, health: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Cultivated dirt-based kitchen herb crops on sunny window sills.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_19',
    title: 'The Private Vault Selection 🔐',
    description: 'Your financial security manager suggests installing a heavy, fireproof concrete-anchored vault inside your basement crawlspace.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Install the heavy fireproof floor vault and secure your core deeds.',
        outcomeText: 'The thick steel locking bolts close with a wonderful, heavy click. Your vital paper logs are insulated from any disaster.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -15, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1800, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Mounted a concrete-anchored fireproof steel vault inside the estate basement.`);
        }
      },
      {
        choiceText: 'Rent a small safe deposit box at your local commercial bank branch.',
        outcomeText: 'You pay a small annual lease. The vault is highly secure, though you have to drive across town during bank hours to view papers.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 100, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Leased a secure safe deposit box at local commercial bank vaults.`);
        }
      },
      {
        choiceText: 'Store your documents inside a cheap cardboard drawer organizer.',
        outcomeText: 'You save money, though you occasionally worry about coffee spills or plumbing pipe leaks damaging your paper files.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 12 });
          state.log.push(`Age ${state.characterInfo.age}: Stored critical asset records in basic paper filing trays.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_20',
    title: 'The Clay Throwing Wheel 🏺',
    description: 'A local pottery cooperative offers a high-torque electric clay wheel and backyard electric kiln combo on discount.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Establish the pottery wheel setup in your garage workspace.',
        outcomeText: 'Your hands are constantly coated in cool grey slip, but shaping beautiful clay vases is a deeply satisfying creative outlet.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, stress: -15, smarts: 8 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1100, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Created a private ceramics studio to mold custom pottery vases.`);
        }
      },
      {
        choiceText: 'Avoid the messy hobby to keep your garage floors perfectly clean.',
        outcomeText: 'You avoid clay stains and dusty kiln cleanup, keeping your garage clean for parking your vehicle.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Declined ceramics crafting equipment to prioritize tidy garage spaces.`);
        }
      },
      {
        choiceText: 'Attend a weekend clay workshop to mold a single coffee mug.',
        outcomeText: 'The firing takes a week. You receive a lumpy, hand-glazed blue mug that sits proudly on your office shelf.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 12, smarts: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 150, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Crafted a customized glazed coffee mug in local community clay workshops.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_21',
    title: 'The Wine Cellar Inventory 🍷',
    description: 'You purchase an old cedar-lined wine cabinet, realizing you need to carefully select bottles to lay down for aging.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Acquire case allocations of vintage French Bordeaux wines for cellaring.',
        outcomeText: 'You meticulously log the vintage charts, temperature levels, and aging windows. Your cellar value climbs slowly over time.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 15, looks: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 2500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Curated an aging collection of premium Bordeaux wines in cedar cellars.`);
        }
      },
      {
        choiceText: 'Purchase affordable table wines to enjoy with casual dinners.',
        outcomeText: 'The table red tastes delicious with your pasta, and you enjoy simple dining without complex storage rules.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 10, health: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 150, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Selected budget-friendly table wines for daily dining enjoyment.`);
        }
      },
      {
        choiceText: 'Avoid alcohol completely to optimize your cardiovascular health.',
        outcomeText: 'Your energy levels spike, your blood pressure drops, and you wake up feeling incredibly crisp and alert every morning.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 25, stress: -10, happiness: 12 });
          state.log.push(`Age ${state.characterInfo.age}: Committed to absolute sobriety, maximizing systemic cardiovascular metrics.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_22',
    title: 'The Empty Nest Travels ✈️',
    description: 'With no active school drop-offs or youth soccer matches, you and your partner find your autumn calendar completely empty.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const hasPartner = state.relationships?.some(r => r.relationshipType === 'Partner' && !r.isDead);
      const isFree = !state.relationships?.some(r => r.relationshipType === 'Child' && r.age < 18 && !r.isDead);
      return age >= 46 && age <= 53 && hasPartner && isFree;
    },
    choices: [
      {
        choiceText: 'Book a month-long historical railway journey across central Europe.',
        outcomeText: 'You and [Partner] sip espresso in Viennese cafes, viewing gorgeous alpine horizons. The romance is beautifully revived.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 25, stress: -20, smarts: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 8000, -500000);
          const partner = state.relationships.find(r => r.relationshipType === 'Partner' && !r.isDead);
          if (partner) partner.relationshipValue = Math.min(100, partner.relationshipValue + 20);
          state.log.push(`Age ${state.characterInfo.age}: Toured European rail systems with [Partner] to celebrate newfound schedule freedom.`);
        }
      },
      {
        choiceText: 'Stay at home and initiate a deep cleaning of the attic storage rooms.',
        outcomeText: 'You discard old broken vacuums and donate winter coats, clearing physical space and finding deep organizational peace.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -12, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Decluttered the family attic to optimize living quarters layout.`);
        }
      },
      {
        choiceText: 'Rent a quiet lakehouse cabin for a weekend fishing trip.',
        outcomeText: 'You enjoy peaceful morning mists and quiet canoeing loops, catching three large trout for a fireside dinner.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 12, happiness: 15, stress: -15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 600, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Camped at mountain lake cabins for a relaxing weekend of angling.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_23',
    title: 'The Corporate Life Insurance 📄',
    description: 'Your insurance provider offers a high-value convertible term policy restructure, boosting payouts while freezing premiums.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Accept the restructure to lock in secure survivor payouts.',
        outcomeText: 'You lock in excellent rates before your age category pushes premiums higher, securing absolute protection for heirs.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -12, karma: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 350, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Restructured high-value term life insurance policies to lock in flat premiums.`);
        }
      },
      {
        choiceText: 'Decline the policy upgrade, relying on your personal investment holdings.',
        outcomeText: 'You save the premium cash. Your stock portfolios are massive enough to act as your primary self-insurance fund.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Rejected extra insurance, maintaining a self-insured asset strategy.`);
        }
      },
      {
        choiceText: 'Consult an independent fiduciary planner to analyze options.',
        outcomeText: 'The fee is tiny, but the fiduciary highlights hidden insurance clauses, steering you away from bad high-commission products.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: -8 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 250, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Consulted fiduciary planners regarding life insurance optimization.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_24',
    title: 'The Backyard Pizza Dome 🍕',
    description: 'You find a blueprint for an authentic wood-fired Neapolitan brick pizza oven. Building it requires laying heavy firebricks and concrete mix.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Build the brick pizza oven yourself in your garden lot.',
        outcomeText: 'Your lower back is incredibly sore, but the dome is gorgeous. You blister gourmet sourdough pizzas in exactly sixty seconds!',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 22, health: 8, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Constructed an authentic brick wood-fired pizza oven in the backyard.`);
        }
      },
      {
        choiceText: 'Buy a portable stainless steel gas oven instead.',
        outcomeText: 'You hook it up instantly. It is highly efficient and quick to clean, though it lacks the classic stone look.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 400, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Installed portable stainless steel gas-fired pizza ovens.`);
        }
      },
      {
        choiceText: 'Avoid the oven installation to maintain your pristine grass lawns.',
        outcomeText: 'You preserve your clean backyard layout, ordering restaurant delivery whenever pizza cravings emerge.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Declined outdoor brick oven constructions to preserve turf lawns.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_46_53_25',
    title: 'The Silverware Restoration 🥄',
    description: 'You inherit a large, tarnished chest of solid sterling silver dining silverware that has been black for thirty years.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 46 && age <= 53;
    },
    choices: [
      {
        choiceText: 'Spend the weekend meticulously polishing the silver with cotton cloths.',
        outcomeText: 'Your thumbs are dark and stained, but the gorgeous utensils shine like liquid mirrors. They look spectacular on dinner tables.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, looks: 5, stress: -8 });
          state.log.push(`Age ${state.characterInfo.age}: Hand-polished inherited family sterling silverware to restore bright luster.`);
        }
      },
      {
        choiceText: 'Take the silver chest to a jeweler for professional ultrasonic cleaning.',
        outcomeText: 'They return the set in pristine, immaculate condition. It is a painless process, although the chemical fees are substantial.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 300, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Commissioned jeweler workshops to clean silverware sets ultrasonically.`);
        }
      },
      {
        choiceText: 'Store the tarnished chest in the attic to deal with another decade.',
        outcomeText: 'You avoid the cleanup task, keeping the metal hidden away while you focus on current hobbies.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Deferred silverware polishing, storing inherited assets in attics.`);
        }
      }
    ]
  },

  // =========================================================================
  // DATA PACK 4: 25 LATE MATURE EVENTS (AGES 54-60)
  // =========================================================================
  {
    id: 'dp4_mat_54_60_01',
    title: 'The Joint Crunch Warning 🦴',
    description: 'You wake up on a freezing winter morning to a dry, grinding crunching sensation inside your left knee as you walk down the stairs.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Schedule a physical therapist consultation to build knee joint stability.',
        outcomeText: 'The specialist designs target hamstring exercises. Your gait recovers beautifully, and the morning grinding ceases entirely.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 18, stress: -10, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 250, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Addressed early knee joint wear using target physical therapy programs.`);
        }
      },
      {
        choiceText: 'Ignore the stiffness and continue running on concrete pavements.',
        outcomeText: 'The grinding escalates into a sharp throbbing ache. You are forced to abandon running for three painful months.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -15, stress: 15, happiness: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Ignored orthotic grinding warnings, aggravating knee joint cartilage decay.`);
        }
      },
      {
        choiceText: 'Invest in premium cushioned walking shoes to absorb street impacts.',
        outcomeText: 'The massive foam soles look slightly bulky, but they protect your joints beautifully, allowing pleasant walking routines.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 12, looks: -5, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 180, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Swapped standard shoes for orthotic cushioned soles to damp joint impacts.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_02',
    title: 'The Executive Grey Ceiling 🏢',
    description: 'Your company appoints a dynamic thirty-five-year-old CEO who hints that long-tenured corporate directors lack modern tech agility.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isEmployed = state.characterInfo?.currentOccupation !== 'Unemployed' && state.characterInfo?.currentOccupation !== 'Retired' && state.characterInfo?.currentOccupation !== 'None';
      return age >= 54 && age <= 60 && isEmployed;
    },
    choices: [
      {
        choiceText: 'Enroll in an intensive executive data and machine learning bootcamp.',
        outcomeText: 'You study hard at night, mastering modern technological terms. The CEO is incredibly impressed by your active adaptability!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, stress: 15, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Challenged corporate ageism by mastering modern data sciences.`);
        }
      },
      {
        choiceText: 'Maintain your traditional business methods, relying on your vast network assets.',
        outcomeText: 'You stand firm. Junior managers appreciate your steady wisdom, but you find yourself excluded from key technology boards.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 12, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Retained traditional operational styles amid corporate technological shifts.`);
        }
      },
      {
        choiceText: 'Negotiate a comfortable retirement exit package to leave on your own terms.',
        outcomeText: 'You secure twelve months of salary and retire in absolute dignity, walking away from the executive race with style.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 22, stress: -25, looks: 10 });
          state.finances.cashBalance = Math.min(state.finances.cashBalance + state.finances.annualSalary, 20000000);
          state.characterInfo.currentOccupation = 'Retired';
          state.finances.annualSalary = 0;
          state.log.push(`Age ${state.characterInfo.age}: Retired voluntarily with executive severance packages.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_03',
    title: 'The Early Retirement Balance ⚖️',
    description: 'Your financial dashboard reports that early retirement is fully viable, but it will restrict your yearly discretionary spending limits.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isEmployed = state.characterInfo?.currentOccupation !== 'Unemployed' && state.characterInfo?.currentOccupation !== 'Retired' && state.characterInfo?.currentOccupation !== 'None';
      return age >= 54 && age <= 60 && isEmployed && state.finances.cashBalance >= 150000;
    },
    choices: [
      {
        choiceText: 'Retire immediately to claim absolute sovereignty over your remaining time.',
        outcomeText: 'You hand in your office keys. The newfound calendar freedom is incredibly beautiful, even if you dine out less frequently.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 30, stress: -30, health: 15 });
          state.characterInfo.currentOccupation = 'Retired';
          state.finances.annualSalary = 0;
          state.log.push(`Age ${state.characterInfo.age}: Elected to retire early to prioritize physical health over corporate growth.`);
        }
      },
      {
        choiceText: 'Work five additional years to maximize your corporate cash reserves.',
        outcomeText: 'You stay at your desk. The stress remains heavy, but your final financial runway becomes completely bulletproof.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 20, happiness: -5, smarts: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Chose to extend employment years to maximize wealth reserves.`);
        }
      },
      {
        choiceText: 'Request a transition to four-day workweeks at a twenty percent salary cut.',
        outcomeText: 'A wonderful compromise! You enjoy long three-day weekends while keeping a strong stream of W2 income.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, stress: -15, health: 8 });
          state.finances.annualSalary = Math.round(state.finances.annualSalary * 0.8);
          state.log.push(`Age ${state.characterInfo.age}: Transformed active work hours to four-day cycles to ease into retirement.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_04',
    title: 'The Family Estate Division 📜',
    description: 'You sit down with an estate attorney to draft your official will blueprint, deciding how to allocate your assets among heirs.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Allocate your assets in perfectly equal portions to prevent sibling rivalries.',
        outcomeText: 'The straightforward structure is pristine and clear. Your heirs appreciate your absolute, transparent fairness.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, stress: -15, happiness: 12 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Drafted an egalitarian will to divide estate assets equally among children.`);
        }
      },
      {
        choiceText: 'Assign larger shares to the heirs who have active financial struggles.',
        outcomeText: 'The decision supports needy heirs, though it sparks quiet, tense arguments during family holiday gatherings.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 15, stress: 10, happiness: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Structured will payouts prioritizing needy family members.`);
        }
      },
      {
        choiceText: 'Leave a significant percentage to an environmental charity to leave a global legacy.',
        outcomeText: 'The legal trust is secured. Your family is slightly surprised, but they respect your noble philanthropic vision.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, happiness: 15, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 800, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Structured will clauses dedicating capital to conservation organizations.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_05',
    title: 'The Glucosamine Challenge 💊',
    description: 'An old running companion recommends taking high-potency daily Glucosamine and Chondroitin tablets to lubricate fading joints.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Take the joint supplements daily and monitor physical performance.',
        outcomeText: 'After three weeks, you feel a remarkable ease in your morning walks. The staircase grinding fades to a faint clicking.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, happiness: 10, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 120, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Integrated daily Glucosamine therapy to improve knee joint health.`);
        }
      },
      {
        choiceText: 'Reject systemic pills, preferring to apply cold ice packs after walking.',
        outcomeText: 'The cold brings brief temporary relief, but fails to stop the underlying articular cartilage wear.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 5, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Used ice pack treatments for physical joint inflammation.`);
        }
      },
      {
        choiceText: 'Consult a rheumatology specialist for custom clinical scans.',
        outcomeText: 'The high-resolution X-rays confirm standard age-related wear. You receive precise advice on knee cartilage preservation.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, health: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 400, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed joint diagnostic scans under specialist direction.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_06',
    title: 'The Succession Plan Meeting 👥',
    description: 'Your department board requests that you nominate and actively mentor a young associate to absorb your executive duties over the next year.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isEmployed = state.characterInfo?.currentOccupation !== 'Unemployed' && state.characterInfo?.currentOccupation !== 'Retired' && state.characterInfo?.currentOccupation !== 'None';
      return age >= 54 && age <= 60 && isEmployed;
    },
    choices: [
      {
        choiceText: 'Mentor the young candidate generously, transferring all your strategic secrets.',
        outcomeText: 'They absorb your knowledge rapidly, showing immense professional respect. You establish a brilliant legacy transition.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, smarts: 15, happiness: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Mentored departmental successors to ensure organizational continuity.`);
        }
      },
      {
        choiceText: 'Withhold key strategic contacts to protect your personal executive value.',
        outcomeText: 'The associate struggles to coordinate meetings. You retain control of your desk, but board members grow slightly cold.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 15, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Guarded professional client list details from corporate successors.`);
        }
      },
      {
        choiceText: 'Propose an external consultancy hire to bypass internal office friction.',
        outcomeText: 'An expensive strategy that keeps your hands clean, though it delays the department transition timelines.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Advocated third-party consultancy hires to manage corporate transitions.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_07',
    title: 'The Roth IRA Conversion 💰',
    description: 'Your wealth advisor highlights an opportunity to convert your traditional retirement accounts into tax-free Roth IRA vehicles.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60 && state.finances.cashBalance >= 15000;
    },
    choices: [
      {
        choiceText: 'Execute the Roth IRA conversion, paying the tax fees immediately.',
        outcomeText: 'Paying tax now cuts into your current cash, but your retirement payouts are completely insulated from any future tax raises.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 22, stress: -5, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 15000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed strategic Roth IRA tax conversions to insulate retirement growth.`);
        }
      },
      {
        choiceText: 'Keep your funds in traditional accounts to avoid immediate tax payments.',
        outcomeText: 'You preserve your active cash balance, though you face large deferred tax liabilities upon eventual retirement distributions.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Retained standard tax-deferred retirement accounts.`);
        }
      },
      {
        choiceText: 'Split the allocation equally between traditional and Roth formats.',
        outcomeText: 'A balanced portfolio compromise that minimizes your tax risk while keeping liquid cash reserves healthy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 7500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Diversified retirement accounts using partial tax-free conversions.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_08',
    title: 'The Heirloom Jewelry Splitting 💍',
    description: 'Your sisters approach you regarding how to divide your mother’s vintage gold earrings and antique sapphire jewelry items.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Give the premium jewelry items to your sisters to preserve absolute sibling peace.',
        outcomeText: 'They are deeply touched by your incredible generosity. Sibling relationships are locked at pristine levels.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, happiness: 20, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: Surrendered heirloom jewelry assets to siblings to cement family harmony.`);
        }
      },
      {
        choiceText: 'Hire an estate appraiser to value and split the jewelry with absolute mathematical precision.',
        outcomeText: 'The legal division is perfectly fair. The atmosphere feels slightly transactional, but you secure your correct values.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 300, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Appraised inherited jewelry to ensure precise asset division.`);
        }
      },
      {
        choiceText: 'Propose selling the items at auction and donating the cash to hospital shelters.',
        outcomeText: 'It is a bold proposal. Your sisters are slightly puzzled, but they eventually agree to support the local shelter.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, happiness: 12 });
          state.log.push(`Age ${state.characterInfo.age}: Auctioned inherited jewelry to fund public hospital wings.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_09',
    title: 'The Ergonomic Office Overhaul 🪑',
    description: 'Your long office hours begin taking a heavy toll, leaving your lower lumbar region feeling incredibly stiff at sunset.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Invest in a high-end, clinically certified ergonomic office chair.',
        outcomeText: 'The mesh chair has incredible posture supports. Your posture aligns perfectly, and the back dull stiffness disappears.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 18, stress: -15, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1200, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Installed clinical ergonomic seating to resolve chronic office back strains.`);
        }
      },
      {
        choiceText: 'Install a motorized height-adjustable active standing desk.',
        outcomeText: 'You stand for half the day, improving your blood circulation and leg strength remarkably during long zoom meetings.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 600, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Upgraded work desk to motorized active stand platforms.`);
        }
      },
      {
        choiceText: 'Ignore the stiffness, taking quick breaks on your couch instead.',
        outcomeText: 'The couch is cozy, but returning to your cheap chair triggers the lower back aches again within minutes.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -5, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Managed office fatigue with basic rest intervals.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_10',
    title: 'The Greybeard Advisory Board 🎓',
    description: 'A growing local business startup offers you a non-executive seat on their strategic advisory board, requesting three hours of monthly mentoring.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Accept the advisory seat, guiding the young founders on corporate scaling.',
        outcomeText: 'The founders hang on your every word! The role is highly prestigious, boosting your social looks and smarts.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, looks: 12, happiness: 18, stress: -5 });
          state.finances.cashBalance = Math.min(state.finances.cashBalance + 5000, 20000000);
          state.log.push(`Age ${state.characterInfo.age}: Joined early-stage corporate advisory boards, earning strategic fees.`);
        }
      },
      {
        choiceText: 'Decline the board seat to protect your remaining weekend leisure hours.',
        outcomeText: 'You preserve your peaceful weekends, bypassing any corporate zoom reviews or startup scaling debates.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -12, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Declined external board invites to prioritize leisure hours.`);
        }
      },
      {
        choiceText: 'Suggest they hire a full-time operations agency instead.',
        outcomeText: 'They follow your recommendation. You stay out of the loop while giving them correct structural direction.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Provided brief operational agency recommendations to startups.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_11',
    title: 'The Social Security Timing 🗃️',
    description: 'You receive your official pension projection booklet, outlining the vast financial difference between claiming early or waiting for age seventy.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Draft a precise, multi-year model to optimize your future claims.',
        outcomeText: 'You calculate tax thresholds and life expectancy curves, building an incredibly robust, logical pension roadmap.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 22, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Modeled strategic retirement pension milestones to maximize yields.`);
        }
      },
      {
        choiceText: 'Commit to claiming as early as possible to enjoy funds during active health.',
        outcomeText: 'You secure guaranteed early liquidity, though you accept a permanent reduction in your maximum potential monthly payouts.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Opted to secure early retirement disbursements.`);
        }
      },
      {
        choiceText: 'Plan to delay claims to seventy to lock in maximum monthly security checks.',
        outcomeText: 'You will have to work or draw down personal savings first, but the guaranteed high payout will shield your senior life.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Deferred pension drawdowns to lock in maximum senior monthly yields.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_12',
    title: 'The Family Trust Redrafting ✍️',
    description: 'Your wealth counselor highlights the value of placing your primary residential home under a revocable living trust to avoid probate court.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const ownsRealEstate = state.assets?.some(a => a.type === 'real_estate');
      return age >= 54 && age <= 60 && ownsRealEstate;
    },
    choices: [
      {
        choiceText: 'Retain an estate lawyer to establish the Revocable Living Trust.',
        outcomeText: 'The legal paperwork costs three thousand cash, but your property will transfer seamlessly to heirs without probate delays.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: -15, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 3000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Created revocable living trust structures for family real estate insulation.`);
        }
      },
      {
        choiceText: 'Decline the trust setup, keeping the deed in your personal name.',
        outcomeText: 'You avoid the upfront legal expenses, though your heirs will eventually face standard slow probate processes.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Chose to retain property under basic individual titles.`);
        }
      },
      {
        choiceText: 'Use a cheap online template to draft a basic transfer-on-death form.',
        outcomeText: 'It is a fast, cheap fix. It offers basic coverage, though it lacks the bulletproof protection of a professional trust.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 12, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 150, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Executed basic transfer-on-death deeds using digital templates.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_13',
    title: 'The Knee Support Splint 🦵',
    description: 'Your morning tennis league matches are getting slightly uncomfortable due to a dull throbbing ache in your knee joints.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Acquire high-grade medical compression knee sleeves to stabilize the joint.',
        outcomeText: 'The elastic support works wonderfully! You move across the court with excellent confidence and zero post-match swelling.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, happiness: 12, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 100, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Secured medical-grade compression braces to stabilize knee ligaments.`);
        }
      },
      {
        choiceText: 'Switch from tennis to low-impact swimming routines.',
        outcomeText: 'The water supports your body weight perfectly. Your joints feel completely strain-free while your core strength spikes.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 20, stress: -12, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Transitioned to low-impact swimming workouts to protect articular cartilage.`);
        }
      },
      {
        choiceText: 'Continue playing tennis without any joint protection.',
        outcomeText: 'You push through the stiffness, but a sharp twinge in the third set forces you to limp off the clay court in pain.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -15, stress: 15, happiness: -8 });
          state.log.push(`Age ${state.characterInfo.age}: Strained knee cartilage by playing impact sports without brace protection.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_14',
    title: 'The Consulting Agency Leap 🚀',
    description: 'You realize your long corporate tenure allows you to transition into highly profitable private consulting, escaping W2 schedules.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isEmployed = state.characterInfo?.currentOccupation !== 'Unemployed' && state.characterInfo?.currentOccupation !== 'Retired' && state.characterInfo?.currentOccupation !== 'None';
      return age >= 54 && age <= 60 && isEmployed;
    },
    choices: [
      {
        choiceText: 'Launch an independent senior consulting firm, bidding for advisory contracts.',
        outcomeText: 'You secure three major client retainers! You make your own hours, double your effective income, and drop office drama.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 25, smarts: 20, stress: -15 });
          state.finances.annualSalary = Math.round(state.finances.annualSalary * 1.5);
          state.characterInfo.currentOccupation = 'Senior Consultant';
          state.log.push(`Age ${state.characterInfo.age}: Launched an independent advisory firm, securing corporate contracts.`);
        }
      },
      {
        choiceText: 'Remain in your secure corporate W2 position to maintain medical benefits.',
        outcomeText: 'You retain your familiar office desk. The routine is highly predictable, though you feel slightly constrained.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Retained stable corporate employment to secure medical benefits.`);
        }
      },
      {
        choiceText: 'Refuse all corporate duties, choosing immediate full retirement.',
        outcomeText: 'You step away completely. The quiet mornings are wonderful, though your regular active salary ceases.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 22, stress: -25 });
          state.characterInfo.currentOccupation = 'Retired';
          state.finances.annualSalary = 0;
          state.log.push(`Age ${state.characterInfo.age}: Retired from active operations, walking away from corporate life.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_15',
    title: 'The Retirement Runway Audit 🔍',
    description: 'You sit down with a detailed spreadsheet to execute an audit of your total liquid holdings and dividend projection curves.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Calculate your historical inflation adjusted spending to secure precise capital targets.',
        outcomeText: 'The audit confirms your asset base can support comfortable living for decades. You feel an immense wave of relief.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 22, stress: -18, happiness: 12 });
          state.log.push(`Age ${state.characterInfo.age}: Completed comprehensive cashflow audits, securing long-term retirement forecasts.`);
        }
      },
      {
        choiceText: 'Ignore detailed math, trusting that your current cash balances will suffice.',
        outcomeText: 'You avoid boring spreadsheet tasks, though you feel a persistent small worry about potential market recessions.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 8 });
          state.log.push(`Age ${state.characterInfo.age}: Deployed passive monitoring of asset balances without complex models.`);
        }
      },
      {
        choiceText: 'Consult an expensive certified retirement planner for advice.',
        outcomeText: 'The planner reviews your ledger. They charge a hefty fee but confirm your math is absolutely solid.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 800, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Commissioned fiduciary audits of personal retirement assets.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_16',
    title: 'The Vacation Cabin Deed 🌲',
    description: 'A cozy, remote mountain cabin surrounded by fragrant tall pines is listed for sale at an attractive price.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60 && state.finances.cashBalance >= 35000;
    },
    choices: [
      {
        choiceText: 'Purchase the pine cabin as your eventual peaceful senior retirement outpost.',
        outcomeText: 'The quiet wood scent and lovely mountain vistas are incredible. You spend weekends hiking away from city noise.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 25, health: 12, stress: -20 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 35000, -500000);
          state.assets.push({
            id: `asset_cabin_${Date.now()}`,
            name: 'Pine Mountain Cabin',
            type: 'real_estate',
            purchasePrice: 95000,
            currentValue: 95000,
            annualUpkeep: 1200,
            isFinanced: true,
            loanDetails: {
              principalRemaining: 60000,
              annualPayment: 4800,
              yearsRemaining: 15
            },
            subtype: 'Ranch',
            condition: 90
          });
          state.log.push(`Age ${state.characterInfo.age}: Acquired a mountain pine vacation retreat to prepare for retirement.`);
        }
      },
      {
        choiceText: 'Decline the purchase to keep your real estate liability simple.',
        outcomeText: 'You avoid the mountain roof maintenance and insect problems, reserving cash pools for stock indexes.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Declined secondary property acquisitions to preserve liquidity.`);
        }
      },
      {
        choiceText: 'Rent a mountain cabin for a single autumn week.',
        outcomeText: 'You enjoy beautiful yellow leaves and wood fires for seven days, returning home with your rustic cravings fully satisfied.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1200, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Rented a wilderness cabin for a relaxing seasonal retreat.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_17',
    title: 'The Hot Springs Therapy ♨️',
    description: 'A wellness resort in the volcanic hills offers thermal sulfur baths, promising deep relief for joint stiff cartilages.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Spend a long weekend soaking in the natural volcanic sulfur springs.',
        outcomeText: 'The warm, mineral-rich steam works wonders. Your joints feel remarkably loose, and your sleep is deeply restful.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 20, stress: -20, happiness: 18 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 800, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Soaked in thermal volcanic mineral springs to ease joint fatigue.`);
        }
      },
      {
        choiceText: 'Purchase affordable magnesium bath salts to use in your home tub.',
        outcomeText: 'It is a pleasant, inexpensive ritual, though it lacks the deep immersive warmth of natural thermal spring waters.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 8, stress: -8 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 30, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Applied magnesium salt home bath therapies.`);
        }
      },
      {
        choiceText: 'Decline the thermal treatment, maintaining standard showers.',
        outcomeText: 'You avoid the resort fee, though your knee stiffness remains slightly annoying on cold rainy mornings.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Declined thermal resort treatments, keeping to typical daily routine.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_18',
    title: 'The Digital Re-Skilling Bootcamp 💻',
    description: 'A university offers a senior-focused digital bootcamp covering cloud computing systems and modern AI workflows.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Enroll in the technical bootcamp to master cloud databases and algorithms.',
        outcomeText: 'You study hard alongside younger students, building amazing cognitive neural connections. Your tech agility is incredible!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, stress: 15, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1200, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed university bootcamps on cloud database engineering.`);
        }
      },
      {
        choiceText: 'Avoid complex coding, focusing on your existing expert skills.',
        outcomeText: 'You save your energy, though you feel slightly out of depth when younger associates discuss software structures.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Retained traditional professional skillsets, bypassing technical training.`);
        }
      },
      {
        choiceText: 'Hire a tech tutor to teach you basic smartphone security methods.',
        outcomeText: 'You learn to configure bulletproof password systems, shielding your digital bank credentials from any malicious hacking.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -8 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 300, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed private tutoring on digital credential protection.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_19',
    title: 'The Downsizing Consultation 📦',
    description: 'You realize your five-bedroom suburban house holds massive empty rooms since the children left, requiring endless heating costs.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const ownsSuburbanHouse = state.assets?.some(a => a.name.includes('Suburban House') || a.subtype === 'Suburban House');
      return age >= 54 && age <= 60 && ownsSuburbanHouse;
    },
    choices: [
      {
        choiceText: 'Sell the large suburban house and buy an elegant, central condo.',
        outcomeText: 'You liquidate massive equity, depositing over a hundred thousand dollars cash! Your housing chores vanish instantly.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, stress: -20, smarts: 15 });
          state.finances.cashBalance = Math.min(state.finances.cashBalance + 120000, 20000000);
          const houseIndex = state.assets.findIndex(a => a.name.includes('Suburban House') || a.subtype === 'Suburban House');
          if (houseIndex > -1) state.assets.splice(houseIndex, 1);
          state.assets.push({
            id: `asset_condo_${Date.now()}`,
            name: 'Central Modern Condo',
            type: 'real_estate',
            purchasePrice: 180000,
            currentValue: 180000,
            annualUpkeep: 2400,
            isFinanced: false,
            loanDetails: null,
            subtype: 'Modern Condo',
            condition: 100
          });
          state.log.push(`Age ${state.characterInfo.age}: Downsized real estate holdings, trading suburban houses for central condos.`);
        }
      },
      {
        choiceText: 'Retain the large family house to host large holiday gatherings.',
        outcomeText: 'You spend weekends vacuuming empty bedrooms and mowing massive lawns, but the family memories inside are precious.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Maintained large legacy residential properties to anchor family events.`);
        }
      },
      {
        choiceText: 'Rent out two empty bedrooms to local college students.',
        outcomeText: 'The tenant rents boost your monthly income, though you have to tolerate loud late-night gaming music in your corridors.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 15 });
          state.finances.cashBalance = Math.min(state.finances.cashBalance + 8000, 20000000);
          state.log.push(`Age ${state.characterInfo.age}: Generated rental income by leasing empty suburban residential bedrooms.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_20',
    title: 'The Silent Heir Allocation 🤫',
    description: 'You want to distribute part of your high-yield stock portfolio to your heirs now to minimize future inheritance tax friction.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const hasLivingChild = state.relationships?.some(r => r.relationshipType === 'Child' && !r.isDead);
      return age >= 54 && age <= 60 && hasLivingChild && state.finances.cashBalance >= 30000;
    },
    choices: [
      {
        choiceText: 'Transfer thirty thousand cash dollars to your children immediately.',
        outcomeText: 'They use the capital to pay down mortgage interest and fund education. Family bonds climb to pristine heights.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, happiness: 22, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 30000, -500000);
          const child = state.relationships.find(r => r.relationshipType === 'Child' && !r.isDead);
          if (child) child.relationshipValue = Math.min(100, child.relationshipValue + 20);
          state.log.push(`Age ${state.characterInfo.age}: Executed early tax-free capital gifts to assist family descendants.`);
        }
      },
      {
        choiceText: 'Maintain absolute control of your assets until your eventual death.',
        outcomeText: 'Your capital remains securely compounding in your accounts, though your heirs struggle with high home loan rates.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Retained core assets under close personal control.`);
        }
      },
      {
        choiceText: 'Invest the funds in a locked family education trust fund.',
        outcomeText: 'The trust is structured to fund future grandchildren’s tuition, building an amazing intellectual legacy across generations.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, smarts: 18, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 20000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Established multi-generational educational trust funds for future descendants.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_21',
    title: 'The Anti-Inflammatory Diet 🥗',
    description: 'Your physician notes that your biological health indicators are slipping, suggesting you swap red meats for fresh organic vegetables.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Adopt a rigid Mediterranean diet, dropping processed sugars entirely.',
        outcomeText: 'You eat fresh wild salmon, green avocados, and organic olive oil. Your energy surges, and joint soreness drops remarkably!',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 25, looks: 10, stress: -15, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 400, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Adopted structured anti-inflammatory diets to optimize biological health metrics.`);
        }
      },
      {
        choiceText: 'Ignore the dietary warnings and continue eating greasy steaks.',
        outcomeText: 'The food tastes incredibly delicious, but you feel heavy and sluggish, and your blood cholesterol levels climb steadily.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -18, looks: -5, stress: 10, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Retained high-sodium meat diets, compromising cardiovascular health.`);
        }
      },
      {
        choiceText: 'Take basic vitamin pills while maintaining your usual eating habits.',
        outcomeText: 'A simple middle ground. You get a slight energy boost, though the underlying joint inflammatory markers persist.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 8 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 100, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Integrated daily multivitamin supplements to support systemic metabolism.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_22',
    title: 'The Advisory Transition Offer 🤝',
    description: 'Your long-time business board offers to shift your active executive role to a part-time advisory seat with half the salary.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isEmployed = state.characterInfo?.currentOccupation !== 'Unemployed' && state.characterInfo?.currentOccupation !== 'Retired' && state.characterInfo?.currentOccupation !== 'None';
      return age >= 54 && age <= 60 && isEmployed;
    },
    choices: [
      {
        choiceText: 'Accept the strategic advisory role to reclaim your free weekdays.',
        outcomeText: 'You sleep late and skip corporate performance reviews, while continuing to receive a comfortable stream of salary!',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 22, stress: -25, health: 12 });
          state.finances.annualSalary = Math.round(state.finances.annualSalary * 0.5);
          state.characterInfo.currentOccupation = 'Strategic Advisor';
          state.log.push(`Age ${state.characterInfo.age}: Transitioned to part-time strategic corporate advisory roles.`);
        }
      },
      {
        choiceText: 'Reject the transition, fighting to keep your full-time executive seat.',
        outcomeText: 'You protect your high annual salary, though you continue working sixty-hour weeks under intense pressure.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 20, happiness: -10, health: -8 });
          state.log.push(`Age ${state.characterInfo.age}: Retained full-time corporate executive controls, absorbing high workloads.`);
        }
      },
      {
        choiceText: 'Resign immediately to pursue independent freelance consulting projects.',
        outcomeText: 'You step away. You bid on high-yield short-term contracts, enjoying complete professional autonomy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 15, stress: -10 });
          state.characterInfo.currentOccupation = 'Freelance Consultant';
          state.log.push(`Age ${state.characterInfo.age}: Left executive offices to build freelance advisory contracts.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_23',
    title: 'The High-Yield Annuity Pitch 📉',
    description: 'A wealth broker pitches a fixed index annuity, promising guaranteed five percent payouts to shield your wealth from bear markets.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60 && state.finances.cashBalance >= 20000;
    },
    choices: [
      {
        choiceText: 'Invest twenty thousand dollars cash into the fixed annuity structure.',
        outcomeText: 'You secure absolute downside protection. The steady cash flows arrive like clockwork, though the broker fee is heavy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -15, happiness: 8 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 20000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Allocated investment funds to high-safety fixed annuity vehicles.`);
        }
      },
      {
        choiceText: 'Decline the annuity and keep your holdings in high-yielding stock options.',
        outcomeText: 'You retain your high upside gains, though you remain exposed to sudden geopolitical market shocks.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Maintained active stock strategies, rejecting fixed income packages.`);
        }
      },
      {
        choiceText: 'Consult an independent fiduciary planner to cross-check annuity fees.',
        outcomeText: 'The fiduciary highlights massive hidden broker commissions. You avoid a bad contract, keeping your cash safe.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 300, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Audited high-commission annuity products via fiduciary channels.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_24',
    title: 'The Family Heirloom Conflict ⚔️',
    description: 'Your siblings begin aggressively arguing over who gets to inherit your grandfather’s pristine vintage brass writing desk.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Renounce your claim to the desk to defuse the family bickering.',
        outcomeText: 'Your peaceful sibling relations are beautifully preserved, and your grandfather would be proud of your maturity.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, stress: -15, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Surrendered claims on vintage family writing desks to resolve sibling arguments.`);
        }
      },
      {
        choiceText: 'Propose rotating the desk to a different sibling’s home every single year.',
        outcomeText: 'The siblings laugh at the quirky compromise and agree! You establish a wonderful, unique annual moving tradition.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 5, happiness: 18, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Brokered annual rotating possession agreements for family assets.`);
        }
      },
      {
        choiceText: 'Hire an arbitrator to enforce legally binding estate rules.',
        outcomeText: 'The arbitrator resolves the issue with cold papers. Sibling relations grow formal, but the division is solid.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 400, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Employed legal arbitrators to settle internal family property disputes.`);
        }
      }
    ]
  },
  {
    id: 'dp4_mat_54_60_25',
    title: 'The Low-Impact Yoga Retreat 🧘',
    description: 'A beautiful wellness retreat in the forest foothills offers a week of therapeutic yin yoga and muscle stretching classes.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 54 && age <= 60;
    },
    choices: [
      {
        choiceText: 'Attend the forest yoga camp to master deep physical alignment.',
        outcomeText: 'You spend seven days stretching on warm cork mats under pine trees. Your joints feel amazingly fluid and flexible!',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 25, stress: -20, happiness: 20 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1100, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed certified therapeutic yoga camps in national forest reserves.`);
        }
      },
      {
        choiceText: 'Decline the camp, opting to stretch on your living room carpets.',
        outcomeText: 'You avoid the registration fees. Your self-guided stretches are decent, though you miss specialized coaching.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 8, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Practiced self-guided home physical stretching exercises.`);
        }
      },
      {
        choiceText: 'Ignore stretching entirely, focusing your free hours on video games.',
        outcomeText: 'You enjoy the immersive gaming worlds, though your neck muscles feel incredibly stiff after three hours of play.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, stress: 5, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Prioritized passive digital gaming over joint recovery routines.`);
        }
      }
    ]
  }
];


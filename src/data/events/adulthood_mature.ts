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
  }
];

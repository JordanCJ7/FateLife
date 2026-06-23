import { GameEvent, CharacterState, Disease } from '../../types';
import { adjustStats } from '../../utils';

export const seniorLifeEvents: GameEvent[] = [
  // =========================================================================
  // SUB-TIER 1: EARLY SENIOR (Ages 61–75)
  // Focusing on retirement package decisions, estate transfers, active hobbies,
  // health alerts, family interlinks, and cognitive checks.
  // =========================================================================
  {
    id: 'sn_retirement_package_exit',
    title: 'The Golden Handshake 💼',
    description: 'Your long-time employer offers a massive, voluntary early retirement severance package with full health coverage extension. It is a tempting exit, but it means leaving your current desk behind forever.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isEmployed = state.characterInfo?.currentOccupation !== 'Unemployed' && state.characterInfo?.currentOccupation !== 'Retired' && state.characterInfo?.currentOccupation !== 'None';
      return age >= 61 && age <= 75 && isEmployed;
    },
    choices: [
      {
        choiceText: 'Accept the package immediately to secure fifty thousand dollars cash and walk away.',
        outcomeText: 'You sign the papers gracefully during a tears-and-donuts ceremony. You receive a massive cash transfer, and your schedule is beautifully clear.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 30, stress: -30, smarts: 5 });
          state.finances.cashBalance = Math.min(state.finances.cashBalance + 50000, 20000000);
          state.characterInfo.currentOccupation = 'Retired';
          state.finances.annualSalary = 0;
          state.log.push(`Age ${state.characterInfo.age}: Retired gracefully from active employment with a premium severance payout.`);
        }
      },
      {
        choiceText: 'Refuse the package to continue working your senior hours and maximize annual salary.',
        outcomeText: 'You tear up the release form! The board is slightly annoyed, and ambitious junior executive managers start leaving dry memos on your desk.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -10, stress: 25, health: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Refused corporate severance, choosing to cling power-fully to your senior management desk.`);
        }
      },
      {
        choiceText: 'Negotiate a part-time strategic advisory role to retain a lower active salary with half the stress.',
        outcomeText: 'A brilliant compromise! You preserve half of your executive inflow while sleeping late and offering strategic wisdom to junior founders.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, stress: -15, smarts: 15 });
          state.finances.annualSalary = Math.round(state.finances.annualSalary * 0.5);
          state.log.push(`Age ${state.characterInfo.age}: Negotiated transition from active desk into low-stress strategic advisory council.`);
        }
      }
    ]
  },
  {
    id: 'sn_pension_market_squeeze',
    title: 'The Pension Squeeze 📉',
    description: 'Your private pension fund announces a sudden restructuring due to unexpected market adjustments, threatening to degrade your projected monthly retirement yield by twenty percent.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Challenge the pension board legally with professional representation to protect your yield value.',
        outcomeText: 'The legal squad charges you five thousand dollars up front. They win a partial injunction, restoring your financial projection files.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 25, smarts: 15, happiness: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 5000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Mounted a complex civil legal battle against pension board managers (-$5,000).`);
        }
      },
      {
        choiceText: 'Accept the lower yield and cut your monthly domestic expenditure budget accordingly.',
        outcomeText: 'You adjust your ledger. You spend less on rare wines and dining out, finding comfort in quiet evenings at home.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -10, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Accepted structural pension reductions, optimizing household expenditures.`);
        }
      },
      {
        choiceText: 'Direct your active cash pools into high-dividend exchange traded funds to bridge the retirement gap.',
        outcomeText: 'You execute systematic stock acquisitions. The dividends begin flowing, successfully cushioning your passive wealth.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: 10, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 15000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Reconfigured private investments into dividend trusts to bridge pension caps.`);
        }
      }
    ]
  },
  {
    id: 'sn_estate_deed_transfer',
    title: 'The Family Real Estate Split 🏡',
    description: 'Your child [Child] approaches you over Sunday roasted potatoes, suggesting you transfer ownership of your primary residential house deed to them now to bypass future estate inheritance taxes.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const hasChild = state.relationships.some(r => r.relationshipType === 'Child' && !r.isDead);
      const ownsProp = state.assets.some(a => a.type === 'real_estate');
      return age >= 61 && age <= 75 && hasChild && ownsProp;
    },
    choices: [
      {
        choiceText: 'Grant the home deed immediately, trusting their warm gratitude and financial honor.',
        outcomeText: 'They embrace you in absolute tears of joy! Your child [Child] is forever secured, though you are technically a tenant in your own house.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 25, karma: 30, stress: 10 });
          const child = state.relationships.find(r => r.relationshipType === 'Child' && !r.isDead);
          if (child) child.relationshipValue = 100;
          state.log.push(`Age ${state.characterInfo.age}: Transferred family real estate deeds to [Child]\'s name to beat estate taxes.`);
        }
      },
      {
        choiceText: 'Maintain strict personal title ownership and tell them death will handle transitions.',
        outcomeText: 'The climate in the dining room turns extremely chilly. They pack up their plates quickly, muttering about legal complications.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5, happiness: -10, smarts: 15 });
          const child = state.relationships.find(r => r.relationshipType === 'Child' && !r.isDead);
          if (child) child.relationshipValue = Math.max(0, child.relationshipValue - 25);
          state.log.push(`Age ${state.characterInfo.age}: Guarded real estate title deeds stubbornly, creating tense relative friction.`);
        }
      },
      {
        choiceText: 'Draft a meticulous, multi-tiered trust framework that protects your life tenancy keys.',
        outcomeText: 'Your counselor configures an airtight structure. You preserve absolute tenancy rights while planning a soft generational transition.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, stress: -10, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 3000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Drafted professional family trust files to balance inheritance taxes (-$3,000).`);
        }
      }
    ]
  },
  {
    id: 'sn_aegean_voyage_cruise',
    title: 'The Mediterranean Sun 🚢',
    description: 'The warm azure waves of the Aegean Sea beckon. An invitation arrives for a fully catered, premium cruise touring ancient ruins and sun-drenched coastal olive groves.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75 && state.finances.cashBalance >= 12000;
    },
    choices: [
      {
        choiceText: 'Book the grand admiral class suite to dive headfirst into coastal history.',
        outcomeText: 'You spend pleasant weeks sipping strong coffee, watching classical islands drift past, and walking ancient marble steps. Your health flourishes.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 35, health: 20, stress: -25, looks: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 12000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Travelled on an elite grand admiral cruise across Greece and Rome (-$12,000).`);
        }
      },
      {
        choiceText: 'Select a modest interior cabin to enjoy the maritime air while preserving cash.',
        outcomeText: 'The cabin is slightly claustrophobic, but the dining hall pastries are identically delicious and you enjoy the open deck breezes.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, health: 10, stress: -15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 4000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Booked an affordable sea cabin across Mediterranean harbors.`);
        }
      },
      {
        choiceText: 'Stay home to read old historical books under a comfortable linen floor-lamp.',
        outcomeText: 'You brew a cup of fresh chamomile and study old histories. Total silence, zero suitcases, zero expense.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -10, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Opted out of maritime cruises, finding peace in ancient library files.`);
        }
      }
    ]
  },
  {
    id: 'sn_micro_lessons_child',
    title: 'The Legacy Scholars ✏️',
    description: 'Your child [Child] is struggling to balance their professional hours and asks if you can take over the academic tutoring and daily care of your young grandchild.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const hasChild = state.relationships.some(r => r.relationshipType === 'Child' && !r.isDead);
      return age >= 61 && age <= 75 && hasChild;
    },
    choices: [
      {
        choiceText: 'Establish a daily home academy of science and reading to build their cognitive foundations.',
        outcomeText: 'You teach them basic algebra and hand-writing. You feel physically tired by dinner, but your heart overflows with generational pride.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 30, health: -5, stress: 15, karma: 30 });
          const child = state.relationships.find(r => r.relationshipType === 'Child' && !r.isDead);
          if (child) child.relationshipValue = Math.min(100, child.relationshipValue + 20);
          state.log.push(`Age ${state.characterInfo.age}: Directed daily personal home tutorials to cultivate a grandchild\'s mind.`);
        }
      },
      {
        choiceText: 'Finance a premium private preschool tutor using your personal cash pools.',
        outcomeText: 'They excel under professional guidance, and your child [Child] thanks you endlessly for relieving their daycare bills.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, stress: -10, karma: 20 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 4000, -500000);
          const child = state.relationships.find(r => r.relationshipType === 'Child' && !r.isDead);
          if (child) child.relationshipValue = Math.min(100, child.relationshipValue + 15);
          state.log.push(`Age ${state.characterInfo.age}: Sponsored professional early-learning educators for family descendants.`);
        }
      },
      {
        choiceText: 'Decline the request to safeguard your quiet afternoon classical music hours.',
        outcomeText: 'You close your study door. They struggle to find nurseries, and you sense some disappointed family distance, but your music sounds flawless.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -20, happiness: 10, karma: -15 });
          const child = state.relationships.find(r => r.relationshipType === 'Child' && !r.isDead);
          if (child) child.relationshipValue = Math.max(0, child.relationshipValue - 20);
          state.log.push(`Age ${state.characterInfo.age}: Declined baby-sitting demands, protecting your personal study silence.`);
        }
      }
    ]
  },
  {
    id: 'sn_garden_war_marrow',
    title: 'The Giant Heirloom Contest 🍅',
    description: 'The annual neighborhood garden fair is three months away. Your arrogant neighbor displays a flawless, massive heirloom marrow, challenging your local gardening crown.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Import premium organic high-nitrogen soils and spend hours treating your prize specimen.',
        outcomeText: 'You spend mornings talking softly to your marrow. At the county scale, yours registers heavier! You claim the blue ribbon of local gardening.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 25, stress: 5, looks: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Won the local county gardening crown for an elite giant heirloom marrow.`);
        }
      },
      {
        choiceText: 'Sabotage their garden beds in the dark of night with salt and weed killer.',
        outcomeText: 'A dark, shameful deed. Their marrow withers, and you win by default, but you lie awake listening to sirens, feeling paranoid.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -35, stress: 30, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Executed midnight garden sabotage against structural neighborhood rivals.`);
        }
      },
      {
        choiceText: 'Congratulate them warmly and present them with a hand-woven wicker harvesting basket.',
        outcomeText: 'They look absolutely stunned by your sportsmanship! You spend an elegant afternoon eating melon and trading planting secrets.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, stress: -15, happiness: 20 });
          state.log.push(`Age ${state.characterInfo.age}: Built beautiful suburban diplomacy, honoring your neighbor\'s giant crop.`);
        }
      }
    ]
  },
  {
    id: 'sn_arthritis_cartilage_knee',
    title: 'The Creaking Knee 🦴',
    description: 'A sharp, persistent throbbing heat flares in your right knee joint after a routine morning walk. The local clinic warns that your cartilage density is degrading.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Adopt a rigorous joint wellness regime of turmeric oil and warm water swimming.',
        outcomeText: 'The pool buoyancy feels magnificent! Your knee cartilage recovers slow, crucial lubrication, delaying physical decay.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 20, stress: -15, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 600, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Cured early joint friction with low-impact hydro-swimming models.`);
        }
      },
      {
        choiceText: 'Consume strong chemical anti-inflammatories daily to mask the joint pain.',
        outcomeText: 'The knee pain fades chemically, but the heavy daily pills irritate your stomach, causing frequent burning reflux alerts.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, stress: 5, happiness: -5, looks: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Masked physical cartilage joint decay using persistent chemical anti-inflammatories.`);
        }
      },
      {
        choiceText: 'Ignore the warning and continue your intense concrete hiking routes.',
        outcomeText: 'An absolute disaster. You feel a sickening grind in the joint, requiring you to buy a heavy carbon-fiber cane.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -25, stress: 25, happiness: -20 });
          state.log.push(`Age ${state.characterInfo.age}: Stubbornly strained knee elements, suffering accelerated skeletal wear.`);
        }
      }
    ]
  },
  {
    id: 'sn_fifty_year_reunion',
    title: 'The Golden Reunion 🎓',
    description: 'An elegant, gold-embossed invitation lands in your mailbox: your high school class is gathering for its historic 50th graduation anniversary reunion.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Attend wearing a tailored vintage tuxedo to showcase your enduring good looks.',
        outcomeText: 'You walk in with perfect poise. Old friends gasps at how well you have aged! You spend the night in pleasant conversation.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 25, looks: 15, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Displayed fine tailoring and aged elegance at your 50th class reunion (-$1,000).`);
        }
      },
      {
        choiceText: 'Join quietly in casual apparel to share genuine, heartwarming memories with old classmates.',
        outcomeText: 'You sit near old childhood companions, whispering of school pranks and fallen friends. The shared memories are deeply grounding.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, karma: 25, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: Reconnected warmly with aging high school comrades to honor common memories.`);
        }
      },
      {
        choiceText: 'Ignore the event entirely, preferring the pristine silence of your private study.',
        outcomeText: 'You spend a serene winter evening reading, completely detached from the social parade of retired doctors and bankers.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -20, smarts: 10, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Declined your golden class reunion, enjoying private personal reading.`);
        }
      }
    ]
  },
  {
    id: 'sn_startup_advisory_call',
    title: 'The Advisory Call 🏢',
    description: 'A thriving local technology startup approaches you, requesting your veteran industry experience to serve on their independent advisory board.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const possessesSmarts = (state.stats?.smarts ?? 50) >= 60;
      return age >= 61 && age <= 75 && possessesSmarts;
    },
    choices: [
      {
        choiceText: 'Accept the board directorship to collect a tidy stipend while mentoring the junior founders.',
        outcomeText: 'They hang on your every word regarding supply-chain structures. You secure fifteen thousand dollars and keep your mind beautifully sharp.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: 15, happiness: 15 });
          state.finances.cashBalance = Math.min(state.finances.cashBalance + 15000, 20000000);
          state.log.push(`Age ${state.characterInfo.age}: Appointed to commercial advisory board, mentoring junior executive teams.`);
        }
      },
      {
        choiceText: 'Offer free, pro-bono guidance twice a month as a civic gesture of goodwill.',
        outcomeText: 'The young directors are deeply touched by your generosity. They name a conference room after you, and your reputation is magnificent.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, happiness: 25, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Donated strategic industry expertise pro-bono to local startups.`);
        }
      },
      {
        choiceText: 'Decline the corporate invitation to focus purely on your raw woodworking crafts.',
        outcomeText: 'You decline. Let the youngsters burn their midnight oil debugging code blocks; you have walnut cabinets to construct.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -25, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Rejected strategic startup board roles to preserve craft freedom.`);
        }
      }
    ]
  },
  {
    id: 'sn_woodwork_timber_joinery',
    title: 'The Walnut Joiner 🪚',
    description: 'A master carpenter opens an exclusive, high-end woodworking seminar focusing on the ancient, complex art of manual Japanese timber joint construction.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Purchase a heavy cast-iron workbench and a drawer of premium spring-steel planes.',
        outcomeText: 'Your garage smells wonderfully of sweet shavings. After weeks of scraping, you produce a flawless heirloom dovetail joint.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 30, smarts: 20, stress: -20 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 4000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Constructed premium maple woodworks using clinical manual planes (-$4,000).`);
        }
      },
      {
        choiceText: 'Practice on cheap pine building pallets with basic hardware catalog hand tools.',
        outcomeText: 'The wood splits constantly, and you secure several painful splinters, but you manage to construct a functional bird feeder.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -5, smarts: 10, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 200, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Built rustic garden carpentry using reclaimed pine pallets.`);
        }
      },
      {
        choiceText: 'Attend as a quiet spectator to analyze structural blueprints without physical labor.',
        outcomeText: 'You spend pleasant afternoons drinking coffee and analyzing complex architectural drawings, protecting your physical joints.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -15, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 300, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Attended timber joinery lectures to master structural engineering.`);
        }
      }
    ]
  },
  {
    id: 'sn_partner_golden_voyage',
    title: 'The Golden Voyage 🕯️',
    description: 'You and your partner [Partner] are approaching a massive matrimonial milestone. The household is quiet, and the calendar demands a legendary celebration.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isMarried = state.maritalStatus === 'Married';
      const hasPartner = state.relationships.some(r => r.relationshipType === 'Partner' && !r.isDead);
      return age >= 61 && age <= 75 && isMarried && hasPartner;
    },
    choices: [
      {
        choiceText: 'Fly first-class to Paris for a fortnight of fine dining and luxury gallery tours.',
        outcomeText: 'You toast over champagne in a historic bistro. Your partner [Partner] glows with deep, restored love. Absolute gold.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 35, stress: -25, health: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 15000, -500000);
          const partner = state.relationships.find(r => r.relationshipType === 'Partner' && !r.isDead);
          if (partner) partner.relationshipValue = 100;
          state.log.push(`Age ${state.characterInfo.age}: Celebrated wedding milestones with a first-class holiday in Paris (-$15,000).`);
        }
      },
      {
        choiceText: 'Take a nostalgic car drive to the small coastal beach cottage where you first kissed.',
        outcomeText: 'You walk on windswept, cold sands holding hands. It feels exactly like five decades ago, laughing over old photos.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 25, stress: -15, health: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 800, -500000);
          const partner = state.relationships.find(r => r.relationshipType === 'Partner' && !r.isDead);
          if (partner) partner.relationshipValue = Math.min(100, partner.relationshipValue + 20);
          state.log.push(`Age ${state.characterInfo.age}: Visited memory coastal shorelines with [Partner] to honor first vows.`);
        }
      },
      {
        choiceText: 'Celebrate cozy at home with a beautifully cooked wild mushroom pasta and old jazz records.',
        outcomeText: 'You light candles on your dining table. A simple, perfectly peaceful and loving evening in your comfortable slippers.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -20, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 100, -500000);
          const partner = state.relationships.find(r => r.relationshipType === 'Partner' && !r.isDead);
          if (partner) partner.relationshipValue = Math.min(100, partner.relationshipValue + 10);
          state.log.push(`Age ${state.characterInfo.age}: Enjoyed romantic home-cooked pasta and fine vintage melodies with [Partner].`);
        }
      }
    ]
  },
  {
    id: 'sn_hearing_loss_muffled',
    title: 'The Muffled Symphony 🎵',
    description: 'During family dinners, you find yourself nodding and smiling blankly as voices merge into a generic, low hum. The birds outside sound strangely silent.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Purchase state-of-the-art, miniature bluetooth digital hearing instruments.',
        outcomeText: 'The technician adjusts the frequencies. Suddenly, you can hear the soft rustle of pine tree needles and grandchildren whispering! Clear joy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 25, smarts: 15, stress: -15, looks: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 5000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Acquired clinical digital hearing systems to correct optical muffling (-$5,000).`);
        }
      },
      {
        choiceText: 'Deploy cheap plastic ear trumpets and ask everyone to speak louder.',
        outcomeText: 'They yell their greetings, making you look highly archaic. Relatives look exhausted after a five-minute discussion.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -10, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Deployed cheap external auditory trumpets, straining domestic conversations.`);
        }
      },
      {
        choiceText: 'Embrace the silent tranquility, refusing any clinical hearing correction.',
        outcomeText: 'You retreat into absolute organic isolation. Voices melt into clouds. Your stress drops, but you miss essential health warnings.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, smarts: -10, stress: -20, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Stubbornly accepted hearing degradation, retreating into isolated silence.`);
        }
      }
    ]
  },
  {
    id: 'sn_civic_hall_mural',
    title: 'The Town Square Mural 🎨',
    description: 'The civic hall is seeking a primary financial patron to commission a beautiful, large-scale public fresco celebrating the historical pioneers of your county.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Sponsor the entire artist collective with ten thousand dollars to secure historical naming.',
        outcomeText: 'They paint a gorgeous, masterwork historical landscape. Your family name is carved in brass on the lower plaque for centuries.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 40, happiness: 30, looks: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 10000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Funded the city square historic watercolor fresco as a lead civic patron (-$10,000).`);
        }
      },
      {
        choiceText: 'Volunteer your personal weekends to mix paints and help wash brushes on the scaffolding.',
        outcomeText: 'Your knees ache from the boards, but you trade delightful jokes with young local painters, earning civic affection.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, health: -5, happiness: 20 });
          state.log.push(`Age ${state.characterInfo.age}: Assisted regional fine art murals manually, building deep civic bonds.`);
        }
      },
      {
        choiceText: 'Organize a neighborhood donation drive to split the cost across fifty households.',
        outcomeText: 'A massive logistical victory! You coordinate spreadsheets and coffee meetings, raising the funds while preserving your cash checkbook.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: 15, karma: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Led community collection drives to sponsor the town history mural.`);
        }
      }
    ]
  },

  // =========================================================================
  // SUB-TIER 2: LATE SENIOR (Ages 76–120)
  // Focusing on mobility challenges, outsmarting telemarketing/digital scams,
  // estate liquidation, severe health decay modeling, and pacemakers.
  // =========================================================================
  {
    id: 'sn_phone_voucher_scam',
    title: 'The Midnight Emergency Call 📞',
    description: 'The telephone rings at 2:00 AM. A crackly voice cries: "Grandpa! I am trapped in a cold local jail after a major vehicle accident! Wire three thousand dollars in digital vouchers right now!"',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Verify their identity by demanding their middle name and hang up immediately.',
        outcomeText: 'The line goes instantly silent! You smile at your razor-sharp cognitive faculties and return to sweet, refreshing sleep.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, happiness: 20, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Brilliantly thwarted a predatory geriatric telephone scam using precise cognitive queries.`);
        }
      },
      {
        choiceText: 'Panic and rush to the twenty-four-hour convenience market to wire the funds.',
        outcomeText: 'You wire the code strings. Weeks later, you discover your actual descendants were safe in bed. You feel sick, realizing you were scammed.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: -20, stress: 40, happiness: -30 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 3000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Fell victim to a predatory midnight telephone emergency scam, losing $3,000.`);
        }
      },
      {
        choiceText: 'Contact your child [Child] immediately to check their actual location.',
        outcomeText: 'Your child answers sleepily, confirming the youngsters are safe. You call the local sheriff to report the phishing number, securing peace.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: 10, karma: 15 });
          const child = state.relationships.find(r => r.relationshipType === 'Child' && !r.isDead);
          if (child) child.relationshipValue = Math.min(100, child.relationshipValue + 10);
          state.log.push(`Age ${state.characterInfo.age}: Intercepted a financial phone scam by coordinating directly with [Child].`);
        }
      }
    ]
  },
  {
    id: 'sn_wedding_hip_conga',
    title: 'The Wedding Conga 🕺',
    description: 'At your grandchild\'s wedding reception, a rapid brass conga line sweeps past your round banquet table. Young cousins scream: "Jump in, Grandpa!"',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Jump into the conga line with high-speed, dramatic foot-stomps!',
        outcomeText: 'CRACK! A blinding flash of agony shoots up your thigh. You fractured your femur! You spend $8,000 on ambulance bills and emerge with a permanent physical limp.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -35, happiness: -30, looks: -15, stress: 30 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 8000, -500000);
          
          // Introduce broken hip disease
          const brokenHip: Disease = {
            id: `disease_hip_${Date.now()}`,
            name: 'Fractured Hip Bone',
            type: 'Chronic',
            healthDrainPerYear: 8,
            happinessDrainPerYear: 5,
            cureDifficulty: 'Hard'
          };
          state.diseases = state.diseases || [];
          state.diseases.push(brokenHip);
          state.log.push(`Age ${state.characterInfo.age}: Suffered a catastrophic hip fracture trying to dance at a wedding reception (-$8,000).`);
        }
      },
      {
        choiceText: 'Wave them past with an elegant toast of your champagne flute from safety.',
        outcomeText: 'You smile warmly and toast the marriage from your heavy, padded armchair. Your skeletal density remains perfectly pristine.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 10, stress: -15, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Stayed safely seated during high-risk wedding conga lines, protecting your skeleton.`);
        }
      },
      {
        choiceText: 'Sponsor a round of vintage brandy for the entire wedding party to celebrate.',
        outcomeText: 'The bartender serves double snifters. The entire dance floor toasts your name! Warm smiles and glorious corporate family ties.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, happiness: 25, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1200, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Funded luxury wedding toast spirits for descendants from a comfortable chair (-$1,200).`);
        }
      }
    ]
  },
  {
    id: 'sn_asset_scramble_downsize',
    title: 'The Asset Liquidation 📑',
    description: 'The physical chores and upkeep of your large suburban properties have grown too exhausting for your late-life mobility. Your financial planner recommends liquidating all estate deeds.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const ownsProp = state.assets.some(a => a.type === 'real_estate');
      return age >= 76 && age <= 120 && ownsProp;
    },
    choices: [
      {
        choiceText: 'Liquidate all luxury estates to move into a simple, high-security modern condo tower.',
        outcomeText: 'The sale goes beautifully. Your bank deposits swell by one hundred and fifty thousand dollars, and you enjoy a spotless, zero-maintenance luxury flat.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -30, health: 15, happiness: 20 });
          state.finances.cashBalance = Math.min(state.finances.cashBalance + 150000, 20000000);
          // Keep static representation of downsized condo
          state.assets = state.assets.filter(a => a.type !== 'real_estate');
          state.log.push(`Age ${state.characterInfo.age}: Liquidated complex real estate assets, swapping chores for high-security condo living.`);
        }
      },
      {
        choiceText: 'Cling stubbornly to your ancestral acreage, letting the garden overgrow with weeds.',
        outcomeText: 'Fences rot, and roof shingles pull loose during autumn storm blocks. You sit in cold Drafty rooms, ignoring the building code letters.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 25, health: -15, looks: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Stubbornly refused to relocate, letting family acreage lapse into rustic decay.`);
        }
      },
      {
        choiceText: 'Flee to a cozy seaside cottage rental under a lifetime lease structure.',
        outcomeText: 'You sell off the old files and sign a simple coastal lease. You spend afternoons watching seagulls and listening to foghorns in complete peace.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -25, health: 10, happiness: 25 });
          state.finances.cashBalance = Math.min(state.finances.cashBalance + 80000, 20000000);
          state.assets = state.assets.filter(a => a.type !== 'real_estate');
          state.log.push(`Age ${state.characterInfo.age}: Exchanged property concerns for a lifetime coastal lease cottage.`);
        }
      }
    ]
  },
  {
    id: 'sn_cat_sanctuary_will_amend',
    title: 'The Feline Legacy 🐈',
    description: 'You review your ultimate Will. An unexpected newspaper article about an endangered local feline sanctuary inspires you to adjust your life capital allocation.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const hasChild = state.relationships.some(r => r.relationshipType === 'Child' && !r.isDead);
      return age >= 76 && age <= 120 && hasChild;
    },
    choices: [
      {
        choiceText: 'Amend the Will to leave ninety percent of your wealth to the Cat Sanctuary.',
        outcomeText: 'Your child [Child] is completely outraged and files early litigation scripts! Your karma glows brightly, but family reunions are canceled.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 45, happiness: 20, stress: 15 });
          const child = state.relationships.find(r => r.relationshipType === 'Child' && !r.isDead);
          if (child) child.relationshipValue = 0;
          state.log.push(`Age ${state.characterInfo.age}: Adjusted Will files to award family capital strictly to local rescue cat leagues.`);
        }
      },
      {
        choiceText: 'Keep the assets strictly bounded to your biological descendants.',
        outcomeText: 'Your child [Child] breathes a massive sigh of relief. Your grandchildren are financially secure, though the rescue shelter must struggle.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -15, happiness: 10 });
          const child = state.relationships.find(r => r.relationshipType === 'Child' && !r.isDead);
          if (child) child.relationshipValue = Math.min(100, child.relationshipValue + 15);
          state.log.push(`Age ${state.characterInfo.age}: Confirmed direct biological family descendants as the absolute sole heirs of your estate.`);
        }
      },
      {
        choiceText: 'Allocate a modest one thousand dollar immediate donation to buy cat food.',
        outcomeText: 'You send a tidy check. The shelter buys dynamic automatic feeders, and your descendants preserve their expected future inheritance intact.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, happiness: 15, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Handed supportive donations to cat shelters without cutting legacy allocations.`);
        }
      }
    ]
  },
  {
    id: 'sn_stairs_dangerous_slip',
    title: 'The Steep Descent 🪜',
    description: 'The handrail on the steep basement stairs feels cold and slightly loose, and you are carrying a heavy, awkward basket of damp laundry.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Step down slowly and carefully, verifying every footing with absolute focus.',
        outcomeText: 'Your calves tremble slightly, but you navigate the stairs without incident, setting the wash down carefully.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 5, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Navigated narrow basement steps slowly to bypass catastrophic slips.`);
        }
      },
      {
        choiceText: 'Tumble down headfirst after losing balance with the laundry basket.',
        outcomeText: 'CRASH! You bounce off physical brick drywall, shattering your knee cap. You spend weeks in traction, costing four thousand dollars.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -40, happiness: -25, looks: -10, stress: 35 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 4000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Lost footing on cellars staircase, fracturing joints in a serious fall (-$4,000).`);
        }
      },
      {
        choiceText: 'Call for a family member or professional house-aide to carry the load.',
        outcomeText: 'They run downstairs instantly to carry the basket. You sit in your kitchen, enjoying warm mint tea without physical stress.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -20, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Delegated household lifting tasks to younger partners, preserving cellular strength.`);
        }
      }
    ]
  },
  {
    id: 'sn_museum_collection_plaque',
    title: 'The Historic Archive Guild 🏛️',
    description: 'The municipal museum asks if you would donate your lifetime collection of rare historic files, journals, and antique memorabilia to their permanent collection.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Donate the entire collection immediately, securing a bronze plaque at the front doors.',
        outcomeText: 'Curators handle your binders with gloves. Your archives are protected for century blocks! You walk through the gallery in high prestige.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 35, looks: 10, happiness: 25 });
          state.log.push(`Age ${state.characterInfo.age}: Gifted family antiques to municipal museums, immortalizing your county legacy.`);
        }
      },
      {
        choiceText: 'Sell the archive logs to private dealers for twelve thousand dollars in hard cash.',
        outcomeText: 'An anonymous buyer whisks your diaries away in a black briefcase. You receive a pleasant cash bundle, though the history is hidden from the public.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: -10, karma: -15, happiness: 10 });
          state.finances.cashBalance = Math.min(state.finances.cashBalance + 12000, 20000000);
          state.log.push(`Age ${state.characterInfo.age}: Auctioned off private historic files to anonymous antique collectors.`);
        }
      },
      {
        choiceText: 'Burn the papers in a smoky barrel behind your garage to leave zero trace.',
        outcomeText: 'The smoke drifts over neighboring lawns. As the ashes settle, you feel a dark, brutalistic victory: no one will examine your private scripts.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -5, karma: -25, happiness: 10, smarts: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Burned life journals in a backyard barrel to keep secrets forever hidden.`);
        }
      }
    ]
  },
  {
    id: 'sn_telehealth_robot_tablet',
    title: 'The Virtual Physician 🤖',
    description: 'Your clinic introduces a highly complex, voice-activated smart telehealth terminal to monitor your daily heart and oxygen metrics.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Install the system, learning the technical interface with patient focus.',
        outcomeText: 'You conquer the tablet calibrations! The system reports oxygen details directly to surgeons, catching small cardiac errors early.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, health: 25, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: Mastered electronic telehealth hubs to analyze cellular heart rhythms.`);
        }
      },
      {
        choiceText: 'Scream at the robotic screen, telling the terminal to call a real human doctor.',
        outcomeText: 'The computerized system displays a bland, circular rotating arrow. You raise your arterial pressure significantly while slamming the casing.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 25, happiness: -15, health: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Rejected automatic digital health tablet interfaces, suffering high stress.`);
        }
      },
      {
        choiceText: 'Ignore the technology entirely, relying on cozy ginger teas and luck.',
        outcomeText: 'You pack the machine inside dark closets. You sleep peaceful hours, though your doctors cannot spot internal arterial decay.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -20, smarts: -10, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: Sidelined electronic medical telemetry, continuing with traditional habits.`);
        }
      }
    ]
  },
  {
    id: 'sn_heart_surgical_pacemaker',
    title: 'The Mechanical Rhythm 🩺',
    description: 'Your private cardiologist reports that your heart rhythm is drifting. They strongly recommend surgical implantation of a modern digital pacemaker.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Proceed with the surgery, investing fifteen thousand dollars in advanced mechanics.',
        outcomeText: 'You wake up in sterile rooms with a tiny titanium watch ticking beneath your collarbone. Your energy spikes beautifully, rejuvenating your cells.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 35, stress: -20, happiness: 15, looks: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 15000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Implanted clinical titanium pacemaker elements to protect cardiac health (-$15,000).`);
        }
      },
      {
        choiceText: 'Reject the invasive metal wires, declaring your natural heart will beat at its own tempo.',
        outcomeText: 'You refuse the surgery. You suffer frequent dizzy spells while standing up, carrying severe cardiovascular risk.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -35, stress: 30, happiness: -20 });
          state.log.push(`Age ${state.characterInfo.age}: Refused pacemaker surgery, suffering chronic cardiac weakness and fatigue.`);
        }
      },
      {
        choiceText: 'Obtain heavy chemical heart regulators, accepting the daily nausea side-effects.',
        outcomeText: 'The pharmacy delivers a jar of orange tablets. They manage the rhythm, but you fight daily stomach cramps and headache spells.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 5, stress: 15, happiness: -15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 2000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Placed cardiac wellness under high-dosage chemical pill scripts (-$2,000).`);
        }
      }
    ]
  },
  {
    id: 'sn_nursing_home_selection_tier',
    title: 'The Silver Manor 🏡',
    description: 'Managing the heavy daily chores of your homestead has become too physically exhausting. It is time to select a senior residential tier.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Buy into an elite, private five-star retirement estate for forty thousand dollars.',
        outcomeText: 'An absolute paradise! Fine organic chefs prepare your dinners, nurses balance your vitals daily, and you play lawn chess in manicured gardens.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 30, stress: -35, happiness: 30 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 40000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Settled into five-star retirement suites with continuous geriatric therapy (-$40,000).`);
        }
      },
      {
        choiceText: 'Move into a standard state-funded medical nursing wing with basic care.',
        outcomeText: 'The walls smell of boiled cabbage and chlorine, but you have a warm, safe bed and nurses check your pressure once a day.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 10, stress: -10, happiness: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 2000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: relocated to standard medical nursing wards to handle late-life decay.`);
        }
      },
      {
        choiceText: 'Fight to stay in your drafty home, ignoring the leaking pipes and cold drafts.',
        outcomeText: 'You shiver under heavy blankets as plumbing elements freeze. It is extremely independent, but physically risky and freezing cold.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -30, stress: 30, happiness: -15 });
          state.log.push(`Age ${state.characterInfo.age}: Refused senior housing assistance, clinging to a freezing, solitary home.`);
        }
      }
    ]
  },
  {
    id: 'sn_flanders_espionage_stories',
    title: 'The Hero of Flanders 🎖️',
    description: 'Your grandchildren sit around your vibrating leather chair. They ask: "Grandpa, did you really single-handedly capture an enemy outpost?"',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Tell a legendary, highly exaggerated tale of double-agent espionage in Berlin.',
        outcomeText: 'You paint cinematic scenes of dark alleys and flashing sirens! Their eyes bug out in absolute astonishment. You feel like a king.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 25, karma: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Entertained grandchildren with extravagant, fictitious espionage memoirs.`);
        }
      },
      {
        choiceText: 'Relate a quiet, deeply honest story about the real, boring kitchen tasks you did.',
        outcomeText: 'You recount washing iron soup kettles in freezing wind. They listen with warmth and tender amusement, respecting your true history.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, happiness: 20, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: Shared humble, genuine historical military memories with family juniors.`);
        }
      },
      {
        choiceText: 'Decline to talk, staring silently into the crackling firewood with a heavy sigh.',
        outcomeText: 'They look slightly intimidated by your cold, brooding silence, quietly slipping out of the parlor room.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 15, happiness: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Retreated into silent, haunting contemplation of youth memories.`);
        }
      }
    ]
  },
  {
    id: 'sn_stray_tabby_porch_scratch',
    title: 'The Stray Tabby 🐈',
    description: 'A wild, dirty stray tomcat with a torn ear enters your backyard porch, eyeing your bowl of warm soup with intense hunger.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Pour a saucer of fresh milk and feed him chunks of savory roast beef.',
        outcomeText: 'He swallows the beef in seconds, letting out a heavy, gravelly purr that warms your cold porch beautifully.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, happiness: 20, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Shared roasted beef dishes with a historic stray cat on the porch.`);
        }
      },
      {
        choiceText: 'Corner the beast to inspect his infected ear, ignoring his loud, defensive low-growls.',
        outcomeText: 'SLASH! The wild claw slices open your fragile skin layers. You spend fifteen hundred dollars in clinical fees to stop a serious infection.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -20, stress: 25, happiness: -15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Suffered severe animal scratch wounds while cornering a stray cat (-$1,500).`);
        }
      },
      {
        choiceText: 'Shoo him off the porch with a firm shake of your hickory walking stick.',
        outcomeText: 'The tomcat arches his back, letting out a sharp hiss before bounding over your garden fence into the shadows.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 5, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Warned off stray backyard predators with a firm hickory walking cane.`);
        }
      }
    ]
  },
  {
    id: 'sn_lavender_oxygen_bar',
    title: 'The Pure Atmosphere 🌬️',
    description: 'A new luxury elder wellness lounge opens downtown, offering dry oxygen therapies scented with pure eucalyptus and lavender oils.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Book a premium ten-session oxygen-tank inhalation package.',
        outcomeText: 'You lean back in leather recliners while pure gas clears your lungs. Your cells feel amazingly light and energetic.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 25, stress: -20, happiness: 20, looks: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1200, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed elite lavender oxygen bar therapies to refresh cellular density (-$1,200).`);
        }
      },
      {
        choiceText: 'Inhale cold winter air on your back porch for sixty seconds in your thermal robe.',
        outcomeText: 'Freezing, frosty air shocks your bronchi, making you shiver. Cost-effective, though your fingers feel like ice.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -5, stress: -5, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Inhaled freezing backyard morning air barefoot in a woolen robe.`);
        }
      },
      {
        choiceText: 'Scoff at the oxygen bar, claiming the city air has plenty of sulfur to build character.',
        outcomeText: 'You walk past coughing. You save your money bills, but your oxygen metrics remain slightly dull.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, smarts: -5, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Rejected urban oxygen therapies with deep, stubborn civic outrage.`);
        }
      }
    ]
  },
  {
    id: 'sn_apnea_sleep_snort',
    title: 'The Midnight Snort 💤',
    description: 'You wake up gasping for air in the absolute pitch black, your chest thumping. Your partner [Partner] complains that your snoring sounds like a diesel engine.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const hasPartner = state.relationships.some(r => r.relationshipType === 'Partner' && !r.isDead);
      return age >= 76 && age <= 120 && hasPartner;
    },
    choices: [
      {
        choiceText: 'Acquire a medical CPAP machine to pump pressurized oxygen into your airway.',
        outcomeText: 'You look like an astronaut in the bed blocks, but you breathe smoothly. Your partner [Partner] gets flawless, deep sleep, and you wake refreshed.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 25, stress: -20, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 3000, -500000);
          const partner = state.relationships.find(r => r.relationshipType === 'Partner' && !r.isDead);
          if (partner) partner.relationshipValue = Math.min(100, partner.relationshipValue + 15);
          state.log.push(`Age ${state.characterInfo.age}: Set up pressurized CPAP bedside respiration machines to resolve sleep apnea (-$3,000).`);
        }
      },
      {
        choiceText: 'Sew a heavy tennis ball to the back of your pajamas to force side-sleeping.',
        outcomeText: 'Ouch! Every time you roll over, the tennis ball grinds into your spine, forcing you back to your shoulder. Crude, painful speed, but cheap.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 5, looks: -5, stress: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 20, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Deployed structural tennis-ball pajama rigs to enforce lateral sleep postures.`);
        }
      },
      {
        choiceText: 'Refuse any clinical devices, claiming snoring is a proud symbol of deep sleep.',
        outcomeText: 'Your partner [Partner] takes their blankets and sleep-walks to the cold guest room sofa, leaving a thick, silent frost in the morning parlor.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -15, stress: 20, happiness: -15 });
          const partner = state.relationships.find(r => r.relationshipType === 'Partner' && !r.isDead);
          if (partner) partner.relationshipValue = Math.max(0, partner.relationshipValue - 25);
          state.log.push(`Age ${state.characterInfo.age}: Stubbornly refused sleep respirators, displacing domestic peace with [Partner].`);
        }
      }
    ]
  }
];

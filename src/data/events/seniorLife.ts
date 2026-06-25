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
  },

  // =========================================================================
  // DATA PACK 4: 25 EARLY SENIOR EVENTS (AGES 61-75)
  // =========================================================================
  {
    id: 'dp4_sn_61_75_01',
    title: 'The Woodcarving Workbench 🪵',
    description: 'You set up a solid oak carpentry workbench in your garage, laying out custom steel chisels and fragrant blocks of raw walnut wood.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Set up a hand-tool workshop in your garage with high-end steel chisels.',
        outcomeText: 'You spend pleasant afternoons carving small wooden birds and bowls. The pine-shaving scent brings immense, quiet mental peace.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, stress: -15, health: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 450, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Established a woodcarving garage workshop using premium steel chisels.`);
        }
      },
      {
        choiceText: 'Enroll in an advanced timber relief-carving class at the community college.',
        outcomeText: 'You learn sophisticated traditional timber joinery methods under an expert carpenter, building wonderful social friendships.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 15, stress: -8 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 250, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Enrolled in professional college carpentry classes to master timber joins.`);
        }
      },
      {
        choiceText: 'Decline the complex craft, reserving your garage space for classic parking.',
        outcomeText: 'You keep the garage floors completely clean, bypassing potential splinter wounds and dust cleanups.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Opted to keep garage workshop spaces clean and clear.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_02',
    title: 'The Educational Trust Fund 📜',
    description: 'You sit down with an estate planning attorney to discuss setting up an official educational savings trust for your young grandchildren.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Deposit ten thousand dollars into a dedicated educational trust for the youngsters.',
        outcomeText: 'The tax-advantaged account is sealed. Your family is deeply touched by your amazing support for their future schooling.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, happiness: 25, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 10000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Deposited ten thousand dollars into tax-advantaged educational trust accounts.`);
        }
      },
      {
        choiceText: 'Purchase long-term government bonds to gift manually during high school graduation.',
        outcomeText: 'You lock in secure interest rates, preserving the capital while keeping full personal custody of the bonds.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 5000, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Acquired strategic treasury bonds to fund grandchild schoolings.`);
        }
      },
      {
        choiceText: 'Decline any pre-allocated financing, letting the youngsters earn their own path.',
        outcomeText: 'You preserve your liquid cash pools for potential senior medical emergencies, maintaining absolute financial independence.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Retained liquid reserves, allowing heirs to navigate schooling costs independently.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_03',
    title: 'The Mediterranean Cruise 🚢',
    description: 'An elegant brochure details a luxury spring cruise sailing through historic coastal routes in Italy, Greece, and Croatia.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Book a premium veranda cabin on a boutique cruise through the Adriatic sea.',
        outcomeText: 'You enjoy spectacular blue waves, historical ruins, and magnificent seafood dining rooms in pristine luxury.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 30, stress: -25, health: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 6500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Booked an elite Mediterranean veranda cruise through historic ports.`);
        }
      },
      {
        choiceText: 'Plan a self-guided train journey across coastal fishing villages to save funds.',
        outcomeText: 'The trains are slightly bumpy and loud, but walking through ancient stone alleyways feels incredibly authentic.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, happiness: 18, health: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 3200, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed self-guided coastal train excursions in Southern Europe.`);
        }
      },
      {
        choiceText: 'Stay home to enjoy the peaceful silence of your summer backyard garden.',
        outcomeText: 'You sip iced lemon tea under your oak tree, keeping your savings completely intact and avoiding travel fatigue.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -15, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Declined overseas travel to enjoy peaceful domestic garden summer seasons.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_04',
    title: 'The Backyard Beehives 🐝',
    description: 'A local ecology group offers to help you install two active cedar beehives near your backyard lavender patch.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Install two active cedar beehives near the lavender patch to harvest organic honey.',
        outcomeText: 'The bees pollinate your garden beautifully, and you bottle jars of sweet, golden wildflower honey to share.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 22, stress: -10, health: 8 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 350, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Installed organic honeybee hives to produce sweet garden honey.`);
        }
      },
      {
        choiceText: 'Hire an experienced local apiarist to manage a small educational demonstration hive.',
        outcomeText: 'The professional handles the delicate swarms, teaching you honeybee colony dynamics with zero sting risk.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Contracted specialist apiarists to maintain safety-gated garden hives.`);
        }
      },
      {
        choiceText: 'Decline the stinging insects to protect neighbors from potential backyard swarms.',
        outcomeText: 'You avoid any zoning disputes or medical emergencies, keeping your back lawn simple and completely risk-free.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Declined residential apiculture projects to prevent neighborhood issues.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_05',
    title: 'The Senior Softball League ⚾',
    description: 'The community park board organizes a co-ed Senior Softball League for players aged sixty and above.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Join the regional senior league as a starting center-fielder to rebuild stamina.',
        outcomeText: 'You catch fly balls under beautiful sunny skies, boosting your cardiac health and forming great dugout bonds.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 22, happiness: 20, stress: -12, looks: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 120, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Joined local senior baseball leagues to rebuild active physical stamina.`);
        }
      },
      {
        choiceText: 'Volunteer as a team dugout coach to guide tactics without running on grass.',
        outcomeText: 'You organize batting order sheets and cheer on teammates, enjoying competitive team sports with zero risk of pulling leg muscles.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 15, stress: -8 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 50, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Coached regional senior sports teams to support athletic peers.`);
        }
      },
      {
        choiceText: 'Decline the competitive sport to focus on low-impact morning walking routines.',
        outcomeText: 'You complete pleasant daily loops around the peaceful lake park, protecting your knee joints from intense running strains.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 12, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: Maintained structured flat walking routines over impact athletics.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_06',
    title: 'The Older Dog Adoption 🐕',
    description: 'The regional animal rescue advertises a gentle, eight-year-old golden retriever whose senior owner has moved into a care facility.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Adopt the sweet, eight-year-old golden retriever from the animal shelter.',
        outcomeText: 'The gentle dog rests his chin on your knee as you read. Walking him daily brings wonderful routine and deep emotional warmth.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, happiness: 25, health: 10, stress: -20 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 300, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Adopted a mature golden retriever to share calm household companionship.`);
        }
      },
      {
        choiceText: 'Foster temporary puppies to assist the local rescue system without long commitments.',
        outcomeText: 'The energetic puppies chew your slippers but bring immense laughter and playfulness into your hallways.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 20, happiness: 18, stress: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 150, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Volunteered as an animal shelter pet foster guardian.`);
        }
      },
      {
        choiceText: 'Decline pet ownership to maintain absolute spontaneous travel flexibility.',
        outcomeText: 'You avoid vet bills and daily cleanup duties, keeping your schedule perfectly free for last-minute hotel stays.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Declined animal ownership to retain complete travel flexibility.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_07',
    title: 'The Backyard Greenhouse 🏡',
    description: 'You consider constructing a cedar-framed greenhouse in your garden to nurture winter orchids, herbs, and tropical starter seeds.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Erect a spacious cedar-framed greenhouse equipped with automated glass vents.',
        outcomeText: 'The warm, humid glass sanctuary is magnificent! You nurture gorgeous, bright tropical orchids and crisp winter salad greens.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 24, stress: -18, health: 8 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 4200, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Installed custom cedar-framed greenhouse structures with automatic ventilation.`);
        }
      },
      {
        choiceText: 'Assemble cheap plastic tiered planting shelves on the south brick patio wall.',
        outcomeText: 'The simple green plastic cover traps humidity decently. It is a cost-effective way to protect spring tomato seeds.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 12, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 180, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Erected basic plastic plant shelter shelving on the garden patio.`);
        }
      },
      {
        choiceText: 'Decline the gardening infrastructure, keeping the lawn completely clear.',
        outcomeText: 'You enjoy your simple grassy yard, bypassing building permits, seasonal cleanings, and winter heating bills.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Declined greenhouse construction to keep yard chores simple.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_08',
    title: 'The Estate Jewelry Registry 💍',
    description: 'You find your mother’s velvet boxes containing antique diamond rings and sapphire brooches in your bedroom cabinet.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Hire a certified gemologist to catalog and value your antique family rings.',
        outcomeText: 'The official appraiser details deep cuts and historical stamps. You secure precise values for your future estate records.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 400, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Commissioned appraisal audits of inherited vintage family gem pieces.`);
        }
      },
      {
        choiceText: 'Distribute the precious jewels to family members now as personal living gifts.',
        outcomeText: 'You hand the emerald brooches directly to younger relatives. Their sparkling eyes and tight hugs are incredibly beautiful.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, happiness: 25, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: Gifted family jewelry heirlooms directly to heirs during lifetime celebrations.`);
        }
      },
      {
        choiceText: 'Store the velvet boxes securely in a high-security bank safety vault.',
        outcomeText: 'You lock the items away in safe deposit boxes, avoiding potential house burglary worries entirely.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -12 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 80, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Secured family jewelry inside high-security commercial bank vaults.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_09',
    title: 'The Memoir Writing Seminar 📝',
    description: 'The local public library hosts a structured ten-week workshop focusing on writing personal memoirs and family histories.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Enroll in a weekly creative writing seminar to draft your childhood memories.',
        outcomeText: 'You write out vivid stories of old summer camps and historic family kitchens, finding deep personal peace.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, happiness: 18, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 150, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed ten-week creative writing courses to draft family memoirs.`);
        }
      },
      {
        choiceText: 'Purchase a luxury classic fountain pen to write private diaries at night.',
        outcomeText: 'The ink flows elegantly onto high-grade paper sheets. Writing alone with classical music is a magnificent ritual.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, stress: -12 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 180, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Acquired professional fountain pens to maintain private nightly journals.`);
        }
      },
      {
        choiceText: 'Decline the creative writing clubs, preferring to live fully in the present.',
        outcomeText: 'You save your energy for physical activities, avoiding long hours of sitting at desks staring at paper blocks.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 8 });
          state.log.push(`Age ${state.characterInfo.age}: Avoided sedentary writing programs, focusing on physical outdoor walks.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_10',
    title: 'The Automated Home Safety Upgrade 🛡️',
    description: 'Your insurance agent suggests updating your home safety systems to include modern sensors and digital touchpad entryways.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Install modern motion-triggered floor lights and smart water shut-off monitors.',
        outcomeText: 'The automatic floor path lights illuminate dark hallways instantly. You feel extremely secure against late-night stumbles.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -18, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Installed smart motion-activated safety lighting and water-leak sensors.`);
        }
      },
      {
        choiceText: 'Replace standard door locks with digital keyless touchpad access handles.',
        outcomeText: 'No more fumbling with heavy keys in the freezing rain! You tap simple number codes to access your warm parlor.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 12, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 450, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Upgraded domestic deadbolts to computerized touchscreen locksets.`);
        }
      },
      {
        choiceText: 'Retain the original classic brass deadbolts to avoid computerized home glitches.',
        outcomeText: 'You save your money pools, relying on your trusty physical key chains that never suffer from flat battery cells.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Kept traditional mechanical locks, avoiding smart home digital systems.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_11',
    title: 'The Vintage Record Sort 🎵',
    description: 'You discover five massive dust-covered crates of vintage jazz, blues, and symphony vinyl records in your basement rafters.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Categorize your massive vinyl record collection into alphabetical display boxes.',
        outcomeText: 'You clean the vintage plastic grooves, enjoying magnificent old horn recordings. It is an amazing journey through your youth.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 22, smarts: 10, stress: -12 });
          state.log.push(`Age ${state.characterInfo.age}: Alphabetized legacy vinyl record crates, reviving classic audio memories.`);
        }
      },
      {
        choiceText: 'Donate the entire record chest to the public library archives for digital transfer.',
        outcomeText: 'The librarians are absolutely ecstatic! They log your rare items into the public catalog, preservation-sealed forever.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, happiness: 18, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Donated rare historical audio albums to municipal library archives.`);
        }
      },
      {
        choiceText: 'Sell the premium vintage records to a collector shop for cash.',
        outcomeText: 'The specialized audio dealer tests the vinyls on heavy players, paying you a solid stack of pristine hundred-dollar bills.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 12 });
          state.finances.cashBalance = Math.min(state.finances.cashBalance + 850, 20000000);
          state.log.push(`Age ${state.characterInfo.age}: Liquidated vintage music record collections to specialty collectors.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_12',
    title: 'The Water Aerobics Morning 🏊',
    description: 'The local athletic club offers an early morning low-impact water resistance class inside their heated indoor salt pool.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Join the daily water resistance class to preserve hip joint flexibility.',
        outcomeText: 'The warm saltwater supports your joints perfectly while you stretch. Your lower back tightness disappears within two weeks.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 22, happiness: 15, stress: -15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 140, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Engaged in daily aquatic resistance classes to preserve joint mobility.`);
        }
      },
      {
        choiceText: 'Inhale fresh steam in the dry sauna chamber after short swimming laps.',
        outcomeText: 'The intense, dry pine-scented heat opens your lungs, allowing magnificent sweat intervals and deep physical recovery.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 18, stress: -20, looks: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 80, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed thermal sauna and swimming protocols for lung optimization.`);
        }
      },
      {
        choiceText: 'Decline the public pool sessions to avoid cold locker room floors.',
        outcomeText: 'You avoid any drafty locker rooms, preferring to perform basic yoga sequences on clean rugs at home.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Substituted public aquatic exercises with dry home yoga routines.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_13',
    title: 'The Museum Docent Volunteer 🏛️',
    description: 'The municipal archaeological museum seeks retired professionals to volunteer as educational guides for ancient history exhibitions.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Volunteer as a weekly museum guide explaining ancient bronze age artifacts.',
        outcomeText: 'You study historic reference books deeply, sharing amazing tales of Mycenaean pottery with fascinated groups of school kids.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 24, karma: 20, happiness: 18, stress: -8 });
          state.log.push(`Age ${state.characterInfo.age}: Volunteered as municipal docents, explaining bronze age histories.`);
        }
      },
      {
        choiceText: 'Attend quarterly private historical lectures as a premium supporting member.',
        outcomeText: 'You enjoy excellent organic wines while elite professors explain ancient texts. A very elegant, civilized hobby.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 12 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 400, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Attended exclusive historical lecture circuits as museum patrons.`);
        }
      },
      {
        choiceText: 'Decline the public speaking roles, preferring quiet self-guided exhibits.',
        outcomeText: 'You walk past glass cases silently on rainy weekdays, enjoying beautiful relics without dealing with public crowds.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Enjoyed quiet, solitary weekly explorations of museum galleries.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_14',
    title: 'The Apple Tree Graft 🍏',
    description: 'You want to experiment with orchard grafting, attaching delicate sweet Honeycrisp apple branches to a wild orchard rootstock.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Graft delicate sweet honeycrisp apple branches onto sturdy wild rootstocks.',
        outcomeText: 'You bind the wood joints meticulously with organic wax. Within three seasons, the wild tree yields sweet, crisp dessert fruit!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 22, happiness: 20, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 80, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed successful tree branch grafts to produce hybrid garden apples.`);
        }
      },
      {
        choiceText: 'Purchase a mature fruit-bearing tree from the local nursery for instant harvest.',
        outcomeText: 'The landscaping crew digs a massive hole and plants a mature tree. It is instant gratification, although highly expensive.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 950, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Commissioned mature orchard nursery installations in backyard lawns.`);
        }
      },
      {
        choiceText: 'Mow the lawn around the old wild apple trees without attempting any grafts.',
        outcomeText: 'You avoid the delicate wood surgery, keeping your lawn duties simple and maintaining your standard grassy borders.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Maintained basic lawn spaces without experimental arboriculture.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_15',
    title: 'The Sourdough Starter Cultivation 🍞',
    description: 'A culinary friend gifts you a century-old strain of wild liquid sourdough starter, prompting you to bake traditional bread.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Nurture an organic wild yeast starter in glass jars to bake sourdough bread.',
        outcomeText: 'You feed the bubbling flour paste daily. Your kitchen is filled with the magnificent, hot aroma of crusty artisan loaves.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 22, stress: -12, health: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 60, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Cultivated historical sourdough ferments to bake artisan crusty bread.`);
        }
      },
      {
        choiceText: 'Buy pre-made artisanal loaves from the local bakery shop to save time.',
        outcomeText: 'You enjoy wonderful, fresh-baked olive and walnut breads on demand without maintaining sticky paste jars in your fridge.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 12 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 90, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Supported organic baking shops to enjoy daily artisanal bread.`);
        }
      },
      {
        choiceText: 'Avoid heavy gluten products, adopting a simple clean oatmeal morning diet.',
        outcomeText: 'You skip the wheat completely, maintaining stable blood sugar and enjoying light, energetic mornings.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Adhered to clean, wheat-free morning nutrition protocols.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_16',
    title: 'The Bonsai Wiring Studio 🪴',
    description: 'An old gardening associate invites you to a weekend seminar on traditional Japanese Bonsai styling and branch wiring.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Wire a delicate dwarf juniper bonsai tree to shape custom cascading branches.',
        outcomeText: 'You bend the wood branches with copper coils, shaping a tiny, magnificent wind-swept forest masterpiece.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, stress: -18, smarts: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 120, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Wired miniature Japanese juniper trees to learn classic Bonsai shapes.`);
        }
      },
      {
        choiceText: 'Attend a professional botanical workshop to study traditional Japanese penjing methods.',
        outcomeText: 'You analyze miniature mountain slate landscapes and delicate moss balances under expert master directions.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 12 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 250, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed university workshops on traditional East Asian plant aesthetics.`);
        }
      },
      {
        choiceText: 'Decline the slow wood crafts, focusing on fast-growing vegetable planter boxes.',
        outcomeText: 'You plant crisp organic sugar snap peas and radishes, harvesting edible, crunchy snacks in just thirty days.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 12, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Cultivated crisp fast-growing salad veggies in porch planter boxes.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_17',
    title: 'The Senior Yoga Retreat 🧘',
    description: 'A scenic wellness institute in the valley advertises a week-long mindfulness and deep stretching retreat for senior physical mobility.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Book a week-long mindfulness and deep stretching retreat in the coastal hills.',
        outcomeText: 'You practice calm breathing and alignment while looking out at misty valley hills. Your hips feel incredibly loose and warm.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 24, stress: -25, happiness: 20, looks: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1800, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed week-long mountain yoga and mindfulness retreats.`);
        }
      },
      {
        choiceText: 'Purchase a premium extra-thick foam mat to practice simple stretches at home.',
        outcomeText: 'You complete gentle daily back extensions on your carpet, avoiding travel costs while maintaining reliable joint health.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 80, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Integrated structured morning alignment stretches into daily household routines.`);
        }
      },
      {
        choiceText: 'Decline the organized athletics to preserve your weekends for relaxing hobbies.',
        outcomeText: 'You read thick spy novels on your plush recliner, enjoying absolute stillness and zero muscle soreness.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -12 });
          state.log.push(`Age ${state.characterInfo.age}: Prioritized sedentary reading and home relaxation over physical stretching.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_18',
    title: 'The Stained Glass Window Studio 🎨',
    description: 'A local craft cooperative offers an intensive weekend course on cutting stained glass sheets and soldering lead borders.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Construct custom colored leaded glass windows for your porch entryway.',
        outcomeText: 'You solder gorgeous ruby and cobalt glass blocks. When the morning sun shines through, it casts beautiful liquid colors.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 22, stress: -15, looks: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 380, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Crafted magnificent ruby stained glass panels for porch entryway frames.`);
        }
      },
      {
        choiceText: 'Commission a local artisan to design a custom glass window insert panel.',
        outcomeText: 'The designer builds an elegant, flawless glass insert. It is perfectly smooth and brings beautiful luxury aesthetics.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, looks: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1200, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Installed custom artisan stained-glass windows in master bedroom panes.`);
        }
      },
      {
        choiceText: 'Decline the sharp glass crafts, choosing safe oil canvas painting projects.',
        outcomeText: 'You paint beautiful, safe ocean waves on clean linen canvases, avoiding any risk of glass splinters or lead fumes.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, stress: -8 });
          state.log.push(`Age ${state.characterInfo.age}: Practiced calm acrylic oil canvas painting in the sunroom.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_19',
    title: 'The Grandchild Chess Mentor ♔',
    description: 'Your nine-year-old grandchild shows an interest in strategic board games, eyeing your antique hand-carved wooden chess set.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Teach your grandchild classic chess defenses and strategic endgame pawn structures.',
        outcomeText: 'They learn the Sicilian Defense and conquer their school tournament! The shared intellectual pride is magnificent.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, smarts: 18, happiness: 22, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Mentored grandchildren in advanced chess openings, bonding over tournaments.`);
        }
      },
      {
        choiceText: 'Gift them a digital chess computer game to practice tactics independently.',
        outcomeText: 'They spend hours playing against algorithmic levels, learning rapid puzzles on screens without scattering physical wooden pieces.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, happiness: 12 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 80, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Provided computerized chess educational tools to junior family scholars.`);
        }
      },
      {
        choiceText: 'Play basic casual checker games to keep matches relaxing and stress-free.',
        outcomeText: 'You jump black and red chips on clean cardboard grids, laughing loudly over cookies with zero stressful planning.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: Played simple, laughter-filled checker matches with junior relatives.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_20',
    title: 'The Shared Community Plot 🍅',
    description: 'The neighborhood community garden organizers seek an active lead to oversee their organic summer vegetable plots.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Volunteer to manage the organic tomato irrigation grids at the public garden.',
        outcomeText: 'You coordinate soil compost schedules and teach teenagers planting skills, yielding enormous baskets of ripe heirloom beefsteaks.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, health: 15, happiness: 20, stress: -8 });
          state.log.push(`Age ${state.characterInfo.age}: Managed municipal organic garden irrigation pipelines and harvest schedules.`);
        }
      },
      {
        choiceText: 'Donate premium bone meal and compost bags to assist the community project.',
        outcomeText: 'The project thrives using your quality soil bags, naming you on their wooden appreciation placard near the front gates.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 20, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 250, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Funded organic community garden expansion plots.`);
        }
      },
      {
        choiceText: 'Grow basic kitchen herbs in small ceramic pots on your kitchen windowsill.',
        outcomeText: 'You scissor sweet, fragrant organic basil and rosemary for your evening soups, keeping your garden chores minimal.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 12, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Maintained clean windowsill herb gardens to spice home soups.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_21',
    title: 'The Vintage Chassis Restoration 🏎️',
    description: 'A local mechanic friend tells you about a rusted, classic 1968 muscle car chassis sitting abandoned inside a barn.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Acquire a rusted 1968 classic sports car chassis to rebuild over three years.',
        outcomeText: 'You spend weekends clean-polishing chrome gears and rebuilding cylinder blocks, feeling an immense, powerful mechanical surge.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 25, stress: -10, smarts: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 8500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Commenced a multi-year restoration of classic 1968 sports car chassis.`);
        }
      },
      {
        choiceText: 'Hire a professional mechanic to tune up your modern daily driver sedan.',
        outcomeText: 'They replace the transmission fluids and cabin filters, making your trusty grocery-getter run like pristine silk.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -12 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 600, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Commissioned full fluid tune-ups of standard suburban vehicles.`);
        }
      },
      {
        choiceText: 'Retain your standard transportation methods without investing in high-end projects.',
        outcomeText: 'You preserve your capital reserves, driving your reliable, simple daily car without any mechanical worries.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Declined complex automotive hobby restorations to protect capital.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_22',
    title: 'The Birdwatching Expedition 🦉',
    description: 'The local state park organizes a seasonal birdwatching expedition, inviting members to log rare nesting nocturnal owls.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Invest in high-performance binoculars to catalog rare nesting forest owls.',
        outcomeText: 'You spot a nesting family of rare Great Horned Owls under the moonlight, logging their patterns with extreme excitement.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 18, health: 5, stress: -12 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 450, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Acquired precision optics to catalog rare nesting owls in state parks.`);
        }
      },
      {
        choiceText: 'Mount three wood cedar bird feeders around your backyard patio eaves.',
        outcomeText: 'Dozens of vibrant wild goldfinches and cardinals flutter outside your window daily, providing beautiful music.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 90, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Installed cedar backyard bird sanctuaries, attracting goldfinches.`);
        }
      },
      {
        choiceText: 'Observe local pigeons at the city park during pleasant afternoon rests.',
        outcomeText: 'You toss simple cracker crumbs on stone benches, enjoying sunny fresh air loops for zero financial cost.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 10, health: 8 });
          state.log.push(`Age ${state.characterInfo.age}: Enjoyed simple park-bench walks, observing urban waterfowl.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_23',
    title: 'The Mayan Ruins Journey 🏛️',
    description: 'A university travel group advertises an educational trek exploring deep stone temples and ancient calendars in Guatemala.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Book an educational lecture tour exploring deep stone temples in Guatemala.',
        outcomeText: 'You climb historic limestone steps while expert archaeologists explain ancient calendars. A deeply moving, powerful trek.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, happiness: 22, health: 8, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 4500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed university expeditions through deep Mayan archaeological ruins.`);
        }
      },
      {
        choiceText: 'Watch high-definition archaeological documentaries from your living room armchair.',
        outcomeText: 'You enjoy spectacular drone views of remote jungles on your large screen, sipping coffee with zero bug-bite risk.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 12 });
          state.log.push(`Age ${state.characterInfo.age}: Studied Central American archaeology through streaming documentaries.`);
        }
      },
      {
        choiceText: 'Decline the hot jungle travels to avoid tropical mosquito exposures.',
        outcomeText: 'You preserve your comfortable daily routine, keeping your financial reserves secure and avoiding long airport delays.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Opted to bypass equatorial travel to protect physical health.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_24',
    title: 'The Terracotta Clay Wheel 🏺',
    description: 'An independent pottery studio downtown offers retired students access to their electric clay spinning wheels and firing kilns.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Shape moist terracotta clay on an electric spinning wheel to bake custom pots.',
        outcomeText: 'You hand-shape elegant rustic clay vases and heavy coffee mugs, baking them with beautiful earthy brown glazes.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, stress: -15, looks: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 160, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Shaped custom terracotta dinnerware on electric pottery wheels.`);
        }
      },
      {
        choiceText: 'Purchase beautiful hand-fired ceramic planters from the street market.',
        outcomeText: 'You acquire magnificent, flawless flower planters to showcase your tulips, enjoying gorgeous pottery with zero messy hands.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 12, looks: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 280, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Purchased hand-made ceramic plant pots from local street markets.`);
        }
      },
      {
        choiceText: 'Decline the muddy pottery arts, keeping your fingers clean and dry.',
        outcomeText: 'You avoid the drying clay dust, keeping your clothes pristine and focusing on clean reading hobbies.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Avoided muddy pottery crafts to preserve indoor cleanliness.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_61_75_25',
    title: 'The Culinary Archive Scan 📂',
    description: 'You find your grandmother’s handwritten, flour-stained culinary notebooks containing century-old recipes.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 61 && age <= 75;
    },
    choices: [
      {
        choiceText: 'Scan three generations of handwritten family recipes into clear digital files.',
        outcomeText: 'You edit clear PDF files of family cinnamon rolls and holiday beef roasts, emailing them to overjoyed young relatives.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, smarts: 15, happiness: 18, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Digitized multi-generational family culinary recipe archives.`);
        }
      },
      {
        choiceText: 'Assemble a physical scrapbook containing the old grease-stained recipe cards.',
        outcomeText: 'You tape the old cards onto thick cardstock, building a beautiful physical heritage book for the living room table.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, stress: -8 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 70, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Compiled physical antique recipe scrapbooks to display on coffee tables.`);
        }
      },
      {
        choiceText: 'Store the old culinary journals in kitchen drawers without editing them.',
        outcomeText: 'You keep the books safe in dry cupboards, protecting the fragile fading inks from any daily kitchen spills.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Retained delicate ancestral recipe booklets in dry kitchen drawers.`);
        }
      }
    ]
  },

  // =========================================================================
  // DATA PACK 4: 25 LATE SENIOR EVENTS (AGES 76-120)
  // =========================================================================
  {
    id: 'dp4_sn_76_120_01',
    title: 'The Robocall Protection Shield 🛡️',
    description: 'You receive three automated phone calls in a single afternoon from a synthetic robotic voice claiming your social security number is suspended.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Install an automated artificial intelligence call-filter on your home phone line.',
        outcomeText: 'The modern blocking service screens all incoming calls instantly, sending fraudulent robotic rings directly to silent trash bins.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: -15, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 80, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Installed automated cloud robocall screening blockers to protect home phones.`);
        }
      },
      {
        choiceText: 'Confront the suspicious telemarketers directly with loud, angry whistle blasts.',
        outcomeText: 'You blow a steel safety whistle into the microphone receiver, triggering frantic hang-ups and giving you a chaotic giggle.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Deployed sharp acoustic deterrents against malicious telemarketers.`);
        }
      },
      {
        choiceText: 'Ignore all unknown telephone numbers, letting everything transfer to voicemail.',
        outcomeText: 'You leave your phone sitting on silent ringers, bypassing any potential wire frauds and maintaining serene home silence.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -12 });
          state.log.push(`Age ${state.characterInfo.age}: Retained silent call policies, letting unknown rings route to voicemail.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_02',
    title: 'The Hallway Brass Handrails 🪵',
    description: 'The stairs in your two-story hallway are beginning to feel steep and slightly slippery during late-night bathroom walks.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Retain a licensed carpenter to install sturdy, double-sided oak handrails.',
        outcomeText: 'They bolt heavy, solid oak rails directly into the structural wall studs. You navigate the wooden steps with perfect grip security.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 22, stress: -18, happiness: 12 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1200, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Commissioned professional double-sided wood handrails across stairwell runs.`);
        }
      },
      {
        choiceText: 'Mount cheap metal adhesive grip tape along the steep hallway floor boards.',
        outcomeText: 'The sandpaper-textured tape offers decent traction for your slippers, though it looks rather ugly and ruins the wood glaze.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 12, looks: -5, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 60, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Applied high-traction safety tape along the hallway flooring boards.`);
        }
      },
      {
        choiceText: 'Navigate the stairs slowly using wall picture frames as temporary balance markers.',
        outcomeText: 'Ouch! A heavy oil painting frame pulls loose from the plaster, tumbling down the stairs while you wobble wildly.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -15, stress: 15, happiness: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Risked physical balance by relying on weak wall fixtures for stair support.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_03',
    title: 'The Wheat Penny Cashout 🪙',
    description: 'You find three heavy, dust-covered ceramic cookie jars filled with old copper wheat pennies you saved since the fifties.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Sell your heavy jars of historical copper wheat pennies to coin dealers.',
        outcomeText: 'The numismatist catalogs rare double-die dates, paying you a surprisingly hefty wad of cash for your old pennies.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 15 });
          state.finances.cashBalance = Math.min(state.finances.cashBalance + 420, 20000000);
          state.log.push(`Age ${state.characterInfo.age}: Liquidated vintage copper penny hoards at specialty coin registries.`);
        }
      },
      {
        choiceText: 'Gift the vintage copper coin collection to a grandchild to spark history studies.',
        outcomeText: 'The youngster dumps the pennies across the rug, eagerly searching for old dates with a magnifying glass. Priceless family warmth.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, happiness: 22, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Handed heirloom copper penny collections to grandchildren as educational gifts.`);
        }
      },
      {
        choiceText: 'Keep the heavy coin jars in your bedroom closet as rustic shelf weights.',
        outcomeText: 'You leave the heavy ceramic jars on the closet shelf, preserving your nostalgic penny collection untouched.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Retained heavy copper coin jars on deep closet shelves.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_04',
    title: 'The Cataract Laser Solution 👁️',
    description: 'Your ophthalmologist notes that your cataracts have thickened, casting a fuzzy, yellowed haze over all fine print text.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Schedule the recommended quick laser lens replacement surgery under local drops.',
        outcomeText: 'The painless, ten-minute clinic procedure swaps your cloudy lenses for pristine polymer cups. The world is suddenly blindingly bright and crisp!',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 25, happiness: 20, stress: -15, looks: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 1800, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed successful bilateral cataract laser lens replacements (-$1,800).`);
        }
      },
      {
        choiceText: 'Purchase ultra-strong reading glasses from the pharmacy shop to delay operations.',
        outcomeText: 'The thick, heavy glass frames magnify fine print decently, though they do nothing to clear the general cloudy haze.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 5, looks: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 45, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Purchased high-diopter pharmacy reading glasses to bypass surgery.`);
        }
      },
      {
        choiceText: 'Accept the cloudy vision, restricting your evening driving to familiar nearby roads.',
        outcomeText: 'You drive extremely slowly under streetlights, squinting hard through windshield halos and feeling quite tense.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, stress: 15, happiness: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Avoided cataract treatments, accepting sunset visual restrictions.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_05',
    title: 'The Hearing Implant Tuning 👂',
    description: 'You find yourself constantly asking relatives to repeat their sentences, filtering words through a muffled underwater static.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Consult an audiologist to calibrate your digital inner ear canal implants.',
        outcomeText: 'The specialist uses wireless programs to isolate vocal pitches. You hear birds tweeting and wind rustling with perfect clarity.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, health: 20, happiness: 18, stress: -15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 850, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed clinical audio calibration on digital inner ear implants.`);
        }
      },
      {
        choiceText: 'Increase the basic volume buttons on your cheap analog sound amplifiers.',
        outcomeText: 'SQUEAL! A high-pitched feedback whistle shocks your ears, amplifying loud room background noises but leaving voices fuzzy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 5, stress: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 90, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Used basic over-the-counter analog hearing boosters.`);
        }
      },
      {
        choiceText: 'Embrace the quiet world, enjoying the peaceful silence of your home library.',
        outcomeText: 'You read your books in serene, absolute stillness, completely immune to any noisy neighborhood construction or leaf blowers.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -15, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Opted to live in comfortable silence, bypassing hearing assistance.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_06',
    title: 'The Sidewalk Winter Glaze ❄️',
    description: 'A sudden freezing rain shower leaves your concrete patio steps coated in a solid, invisible layer of black ice.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Scatter generous handfuls of organic rock salt across the icy porch pavement.',
        outcomeText: 'The salt crackles loudly as it melts the slippery ice, carving a perfectly safe dry path down to your mailbox.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -12, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 30, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Melted porch ice coatings using organic rock salt formulas.`);
        }
      },
      {
        choiceText: 'Hire a neighbor youth to shovel and salt your walkway stairs daily.',
        outcomeText: 'A wonderful neighborhood arrangement! The energetic teenager keeps your path pristine while you enjoy hot coffee inside.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 15, happiness: 15, stress: -15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 150, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Contracted neighborhood juniors to shovel and salt winter stairs.`);
        }
      },
      {
        choiceText: 'Stay inside your warm heated parlor, waiting for natural sunshine to melt the frost.',
        outcomeText: 'You cozy up in your fleece thermal robe, letting your mailbox sit empty and keeping your body perfectly warm and safe.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Remained comfortably indoors during hazardous black-ice weather.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_07',
    title: 'The Walker Selection Grid 🚶‍♂️',
    description: 'Your physical therapist suggests using a lightweight four-wheeled rolling walker to protect your hip bones during outdoor trips.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Acquire a high-end carbon-fiber rolling walker equipped with disc brakes.',
        outcomeText: 'The ultra-light, sleek black rolling seat moves like silk! You glide through grocery aisles and parks with zero balance fear.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 22, happiness: 18, stress: -15, looks: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 650, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Purchased high-end carbon-fiber rolling walkers with safety brakes.`);
        }
      },
      {
        choiceText: 'Purchase a basic aluminum folding walker from the local medical shop.',
        outcomeText: 'The metal frame is slightly clunky, but it is extremely reliable and folds cleanly into car trunks for trips.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 140, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Secured budget-friendly folding aluminum medical walker frames.`);
        }
      },
      {
        choiceText: 'Utilize your trusty hand-carved wood cane, rejecting wheeled safety walking devices.',
        outcomeText: 'You stand tall with your hickory cane, but your legs feel incredibly tired and wobbly after just ten minutes of walking.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -8, stress: 10, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Stubbornly clung to traditional walking sticks, overtaxing fading hip joints.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_08',
    title: 'The Brain Boost Advertisement 🧠',
    description: 'A glossy internet ad features herbal brain pills, promising to restore youthful cognitive agility and memory focus in seven days.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Consult your medical doctor regarding verified clinical memory protection drugs.',
        outcomeText: 'The physician outlines legitimate cardiovascular exercises and writes a clean, FDA-approved prescription to keep you sharp.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 24, health: 18, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 120, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Consulted professional physicians to secure clinically verified cognitive support.`);
        }
      },
      {
        choiceText: 'Purchase organic ginkgo biloba extract capsules from internet health stores.',
        outcomeText: 'The bitter pills cost eighty dollars, but they give you a mild stomach ache with absolutely zero noticeable memory benefits.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -5, happiness: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 80, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Purchased experimental internet herbal memory capsules.`);
        }
      },
      {
        choiceText: 'Maintain a clean daily routine of crossword puzzles and whole food meals.',
        outcomeText: 'You solve daily complex word puzzles and eat fresh avocados and salmon, training your brain cells for zero cost.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, health: 12, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Maintained structured daily crossword cognitive drills and clean diet.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_09',
    title: 'The Sweepstakes Registry Mailer ✉️',
    description: 'You receive an official envelope decorated with gold stars claiming you have won a five million dollar sweeping jackpot.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Shred the suspicious sweepstakes envelope immediately to prevent scam registry listings.',
        outcomeText: 'You feed the paper directly into your heavy cross-cut shredder machine, destroying the malicious solicitation instantly.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: -10, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Shredded fraudulent lottery mailers to prevent corporate database tracking.`);
        }
      },
      {
        choiceText: 'Call the claims office to inquire about tax verification processing steps.',
        outcomeText: 'The smooth salesman requests a five hundred dollar "processing check." You realize it is a complete trap and hang up in disgust.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 15, happiness: -8 });
          state.log.push(`Age ${state.characterInfo.age}: Navigated tense telephone call exchanges with jackpot telemarketing scammers.`);
        }
      },
      {
        choiceText: 'File an official consumer protection fraud report with regional authorities.',
        outcomeText: 'The regional postal inspector thanks you warmly for filing the mail fraud report, logging the scam database details.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, smarts: 15, happiness: 12 });
          state.log.push(`Age ${state.characterInfo.age}: Filed official postal fraud reports to combat predatory elder sweeps.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_10',
    title: 'The Gout Joint Warning 🦶',
    description: 'You wake in the middle of the night to an excruciating, throbbing red-hot burn in your right big toe joint.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Eliminate red meat and carbonated sweet sodas from your weekly grocery list.',
        outcomeText: 'The dietary change cuts off excess uric acid production. Within four days, the toe swelling retreats completely.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 18, stress: -10, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Eliminated high-purine meats from diet to resolve gout flareups.`);
        }
      },
      {
        choiceText: 'Ingest prescription anti-inflammatory medication to clear the uric acid buildup.',
        outcomeText: 'The clinical pills work rapidly, cooling the painful bone fire and allowing pleasant walking movements again.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 110, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Administered pharmaceutical therapies to suppress gout joint fires.`);
        }
      },
      {
        choiceText: 'Apply warm herbal compress wraps to your throbbing big toe joint.',
        outcomeText: 'The warm steam brings a tiny bit of comfort, but fails to stop the intense underlying crystal deposit grinding.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -5, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Applied simple herbal wraps to manage acute gout foot aches.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_11',
    title: 'The Tub Adhesive Suction 🛁',
    description: 'Your shower porcelain gets slippery when wet, creating a safety hazard when stepping over the high basin lip.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Install heavy medical-grade steel suction grab bars on the shower tiles.',
        outcomeText: 'The massive suction handles lock onto the wall like solid bedrock. You step in and out of the hot water with massive grip safety.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 22, stress: -18, happiness: 12 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 150, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Installed clinical-grade suction grab bars on shower tile walls.`);
        }
      },
      {
        choiceText: 'Place a cheap rubber anti-slip mat on the porcelain bathtub bottom.',
        outcomeText: 'The textured suction cups keep your feet decently anchored, though the rubber smells strongly of chemical industrial plastics.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 12, stress: -8 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 25, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Placed anti-slip rubber suction mats inside bathroom shower basins.`);
        }
      },
      {
        choiceText: 'Step into the shower slowly, balancing carefully on the cold porcelain rim.',
        outcomeText: 'Whoa! Your foot slips on soap film, sending you crashing onto your hip. You spend thousands in emergency clinic fees.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -25, stress: 20, happiness: -15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 3500, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Suffered painful bathroom falls while stepping onto un-matted wet porcelain.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_12',
    title: 'The Silver Coin Conversion 🪙',
    description: 'You own five hundred historical silver dimes and quarters that are slowly turning black inside an old leather flight bag.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Convert your collection of pre-1964 silver quarters into solid certified gold bars.',
        outcomeText: 'You trade the black junk coins for a gorgeous, heavy three-ounce assay carded gold bar. A beautiful, dense wealth token.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, happiness: 15, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 150, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Swapped bulky junk silver coin hoards for certified heavy gold bullion.`);
        }
      },
      {
        choiceText: 'Donate the vintage silver coins to a local historical preservation museum.',
        outcomeText: 'The museum curator registers your donation with great honor, placing the silver coins in a clean velvet gallery display.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, happiness: 18 });
          state.log.push(`Age ${state.characterInfo.age}: Donated collection of historical silver coinage to county heritage museums.`);
        }
      },
      {
        choiceText: 'Keep the silver coins in canvas bank sacks hidden beneath your floorboards.',
        outcomeText: 'You leave the heavy bags of coinage buried deep under the wood panels, knowing your secret reserves are secure.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Maintained concealed silver coin stockpiles under master floorboards.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_13',
    title: 'The Compression Sock Routine 🧦',
    description: 'Your legs feel puffy and heavy after sunset, making standard socks leave deep, itchy red grooves in your skin.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Wear tight, medical-grade compression stockings daily to improve vein health.',
        outcomeText: 'They are a major physical struggle to squeeze onto your calves, but they prevent swelling and keep your gait energetic.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 22, stress: -10, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 80, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Integrated clinical compression hosiery to maximize lower limb circulation.`);
        }
      },
      {
        choiceText: 'Elevate your legs on three firm down pillows during afternoon reading hours.',
        outcomeText: 'You kick back on your favorite chaise with your feet raised high. Extremely comfortable, relieving pressure naturally.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -15, happiness: 12 });
          state.log.push(`Age ${state.characterInfo.age}: Adopted passive leg elevation protocols during daily resting periods.`);
        }
      },
      {
        choiceText: 'Decline the tight hosiery, preferring loose cotton socks to maximize comfort.',
        outcomeText: 'You avoid the tight hosiery struggle, though your feet feel quite swollen and achy when walking to the kitchen.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -8, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Refused compression stockings, experiencing typical senior ankle swelling.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_14',
    title: 'The Digital Blood Pressure Calibrator 🩺',
    description: 'Your physician requests that you track your morning blood pressure values to adjust your cardiovascular prescription.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Calibrate an automated wireless wrist cuff to log cardiovascular metrics.',
        outcomeText: 'The smart cuff inflates smoothly, logging precise values directly to your phone. It is a painless, brilliant tracking routine.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, health: 18, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 120, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Configured wireless smart cuffs to log daily systolic blood pressure.`);
        }
      },
      {
        choiceText: 'Visit the community fire station clinic weekly for free blood pressure checks.',
        outcomeText: 'The friendly paramedic wraps the cloth cuff, checking your heart while sharing jokes. A lovely social weekly ritual.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 15, health: 15, happiness: 15, stress: -8 });
          state.log.push(`Age ${state.characterInfo.age}: Visited local firehouse stations for manual cardiovascular checks.`);
        }
      },
      {
        choiceText: 'Monitor your body manually, relying on resting pulse counts at the wrist.',
        outcomeText: 'You count heart thuds under your thumb. Free and simple, though it fails to detect silent blood pressure spikes.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -5, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Deployed basic manual wrist-pulse counts for heart tracking.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_15',
    title: 'The Living Will Blueprint 📜',
    description: 'An estate attorney suggests documenting formal health directives to prevent chaotic family arguments in hospital halls.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Draft formal healthcare proxy documents designating medical power of attorney.',
        outcomeText: 'The legal trust files are signed and sealed. You feel an immense wave of relief knowing your choices are secure.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 22, stress: -20, happiness: 12 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 450, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Registered formal healthcare proxies and living wills with legal counsel.`);
        }
      },
      {
        choiceText: 'Discuss your end-of-life treatment preferences informally during a family dinner.',
        outcomeText: 'The dinner table gets slightly quiet and somber, though your relatives listen closely and respect your deep choices.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 20, stress: -8, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Outlined personal healthcare preferences to family members over dinner.`);
        }
      },
      {
        choiceText: 'Decline the clinical legal preparations, leaving the choices to state default codes.',
        outcomeText: 'You avoid the heavy legal discussions, keeping your mind focused on happy hobbies and pleasant sunny walks.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Bypassed estate legal planning to focus on day-to-day hobbies.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_16',
    title: 'The Illuminated Reading Lens 🔍',
    description: 'The fine ink lines in your vintage hardcover encyclopedia books are becoming very blurry and hard to read at sunset.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Invest in a high-tech LED illuminated dome magnifier to read fine print books.',
        outcomeText: 'The solid glass dome glides across pages, lighting and blowing up the ancient script beautifully. Reading is painless again.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 15, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 75, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Acquired illuminated glass dome magnifiers to read classical literature.`);
        }
      },
      {
        choiceText: 'Download digital audiobook editions to listen to classic novels on headphones.',
        outcomeText: 'A deep, rich voice recounts spectacular spy stories inside your ears while you rest in your favorite armchair. Delightful.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 12, stress: -12 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 40, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Transitioned to high-definition digital audiobooks for literary consumption.`);
        }
      },
      {
        choiceText: 'Restrict your reading list to large-print newspapers and magazines.',
        outcomeText: 'You skim simple, large columns, saving your visual energy though missing out on your complex classic library novels.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: -5, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Restricted personal reading material to large-print daily digests.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_17',
    title: 'The Senior Driver Reflex Test 🚗',
    description: 'The local licensing department invites drivers over seventy-five to complete a voluntary driving safety assessment.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      const isRetired = state.characterInfo?.currentOccupation === 'Retired';
      return age >= 76 && age <= 120 && isRetired;
    },
    choices: [
      {
        choiceText: 'Complete a voluntary senior driver safety assessment with professional instructors.',
        outcomeText: 'You score beautifully on reflex reaction speeds! The instructor praises your safety focus, certifying your license.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 22, happiness: 18, stress: -12, looks: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 120, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed certified senior driver safety assessments to secure licensing.`);
        }
      },
      {
        choiceText: 'Transition to regional public transit lines and private taxi systems.',
        outcomeText: 'You sell your old sedan for clean cash, utilizing buses and taxis. Bypassing fuel, repair, and insurance bills is spectacular.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 12, happiness: 15, stress: -20 });
          state.finances.cashBalance = Math.min(state.finances.cashBalance + 4500, 20000000);
          state.log.push(`Age ${state.characterInfo.age}: Retired voluntarily from driving, liquidating private vehicles for cash.`);
        }
      },
      {
        choiceText: 'Maintain your traditional driving style, avoiding busy multi-lane highway routes.',
        outcomeText: 'You drive extremely slowly on quiet side streets, though you feel quite anxious whenever garbage trucks block intersections.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 15, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Avoided highway routes, keeping driving patterns strictly to slow side-streets.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_18',
    title: 'The Heated Thermal Wrap 🧣',
    description: 'The drafty winter wind creeps through your sunroom windows, making your shoulders shiver while you read.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Acquire a fleece thermal wrap equipped with automated heat shut-off timers.',
        outcomeText: 'The soft heated blanket wraps you in an extremely cozy, deep warmth. You read your books in divine, comfortable bliss.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 18, stress: -18, happiness: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 90, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Purchased motorized heated fleece blankets with automatic safety shut-offs.`);
        }
      },
      {
        choiceText: 'Drape thick wool knit blankets over your shoulders during cold parlor evenings.',
        outcomeText: 'The rustic knitted cover feels heavy and quite warm, warming your body naturally for zero electrical utility fees.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 12, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Drapped thick wool knit quilts to offset drafts in the parlor.`);
        }
      },
      {
        choiceText: 'Turn up the central home heating system, accepting higher utility gas bills.',
        outcomeText: 'The furnace roars all day, warming the entire house, though your digital gas bill spikes to painful heights.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 350, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Increased central gas thermostat settings during winter chills.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_19',
    title: 'The Brittle Bone Calcium Drops 🦴',
    description: 'Your bone density scan reveals minor mineral thinning, warning that a simple trip could cause serious hip bone cracks.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Incorporate liquid calcium drops with vitamin D into your morning tea.',
        outcomeText: 'The tasteless drop supplement supports your skeletal structure, protecting your bone frames from fragile senior wear.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 22, stress: -12, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 60, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Integrated daily pharmaceutical calcium drops to optimize bone density.`);
        }
      },
      {
        choiceText: 'Request a bone density scan from your primary orthopedic physician.',
        outcomeText: 'The high-resolution scan provides detailed skeleton maps, allowing your doctor to prescribe targeted bone-hardening therapies.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, health: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 380, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed comprehensive orthopedic bone-density diagnostics.`);
        }
      },
      {
        choiceText: 'Maintain your standard diet, letting nature manage your bone structure.',
        outcomeText: 'You bypass any supplement schedules, though you feel a small persistent worry when stepping over uneven lawns.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -8, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Avoided orthopedic supplements, relying on baseline diet.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_20',
    title: 'The Grandfather Clock Pendulum 🕰️',
    description: 'The massive mahogany pendulum clock in your parlor has slowed down, its brass weights resting heavily at the bottom cabinet.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Oil and wind the heavy brass gears of your vintage oak grandfather clock.',
        outcomeText: 'You wind the heavy key, cleaning the brass teeth. The deep, rhythmic tick-tock fills your home hallway with lovely music.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Hand-wound and oiled the gears of the parlor grandfather clock.`);
        }
      },
      {
        choiceText: 'Hire a professional horologist to replace the mechanical gear pins.',
        outcomeText: 'The expert cleans the pendulum gears with fine precision brushes, restoring the majestic Westminster chimes flawlessly.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 12 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 350, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Commissioned professional horologists to restore vintage grandfather clocks.`);
        }
      },
      {
        choiceText: 'Let the heavy weights rest at the bottom, keeping the brass clock silent.',
        outcomeText: 'The clock remains frozen at twelve. It stands as a beautiful, silent furniture sculpture in your quiet corridor.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Kept the family parlor grandfather clock unwound and silent.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_21',
    title: 'The Shingles Booster Decision 💉',
    description: 'A health warning note at the pharmacy suggests that seniors over seventy schedule booster shots to prevent severe skin rashes.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Schedule the advanced two-dose shingles vaccine at the local medical clinic.',
        outcomeText: 'Your arm aches slightly for a single afternoon, but you are completely shielded from excruciating nerve rashes.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 22, stress: -15, happiness: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 140, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Completed certified shingles immunization protocols at the local clinic.`);
        }
      },
      {
        choiceText: 'Apply topical oatmeal skin lotions on itchy arm skin on dry winter days.',
        outcomeText: 'The soothing cream relieves temporary dry skin surface flakes, though it does nothing to build deep nerve virus defenses.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 5, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 25, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Treated winter skin dryness with simple oatmeal cosmetic lotions.`);
        }
      },
      {
        choiceText: 'Avoid clinical vaccine boosters, relying on your personal immune history.',
        outcomeText: 'You avoid the clinic visit, though you feel a small persistent worry when reading about viral nerve pain.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Bypassed recommended shingles vaccines, trusting baseline health.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_22',
    title: 'The Monochrome Portrait Scrapbook 📸',
    description: 'You find a dust-covered shoebox in your closet holding rare black-and-white family portraits from the nineteen-forties.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Mount rare black-and-white family photographs in an acid-free archival book.',
        outcomeText: 'You label every vintage face with white ink, securing gorgeous ancestral histories for future generations.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 22, stress: -12, looks: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 60, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Mounted vintage monochrome ancestor portrait cards inside archival albums.`);
        }
      },
      {
        choiceText: 'Scan the fragile paper pictures into digital folders for family distribution.',
        outcomeText: 'The sharp digital copies preserve fading smiles beautifully, creating wonderful email attachments for all your heirs.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, smarts: 15, happiness: 18, stress: -8 });
          state.log.push(`Age ${state.characterInfo.age}: Scanned fragile vintage family photo boards to cloud database vaults.`);
        }
      },
      {
        choiceText: 'Store the old shoe box of photo cards in your bedroom closet untouched.',
        outcomeText: 'You leave the box tucked away in dark closet corners, protecting the old paper photos from any bright sun fade.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Kept antique family photos inside cardboard boxes in the closet.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_23',
    title: 'The Motorized Garden Cart 🚜',
    description: 'Walking across your massive backyard vegetable orchard is becoming quite exhausting for your fading knee joints.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Acquire a comfortable electric-powered mobility scooter for garden inspections.',
        outcomeText: 'BEEP BEEP! You zoom down garden paths in your green motorized cart, checking on your rose beds with immense fun and zero knee strain.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 22, happiness: 25, stress: -18, looks: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 2400, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Purchased electric mobility carts to navigate garden orchards (-$2,400).`);
        }
      },
      {
        choiceText: 'Navigate the greenhouse paths on a sturdy three-point rolling support walker.',
        outcomeText: 'The wheeled frame supports your weight decently, allowing you to harvest tomatoes slowly with good stability.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 180, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Navigated orchard rows using sturdy three-point rolling support walkers.`);
        }
      },
      {
        choiceText: 'Sit peacefully on your back porch swing, observing the garden from a distance.',
        outcomeText: 'You enjoy beautiful garden blooms and sweet singing birds from your comfortable porch swing, keeping your limbs resting.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -15, happiness: 12 });
          state.log.push(`Age ${state.characterInfo.age}: Enjoyed garden scenery comfortably from backyard porch swings.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_24',
    title: 'The Auto Warranty Robocall 📞',
    description: 'You receive repetitive automated voice calls about an extended warranty on a sedan vehicle you sold twenty years ago.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'File a formal complaint on the federal Do Not Call registry database.',
        outcomeText: 'You submit the telemarketer ID numbers to the official registry, taking a proud civic stand against annoying phone spam.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 20, smarts: 15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Registered telemarket numbers on national consumer block lists.`);
        }
      },
      {
        choiceText: 'Inquire about the fake warranty coverage limits to amuse yourself.',
        outcomeText: 'You waste fifteen minutes of the scammer\'s time detailing imaginary spaceships, laughing loudly as they get intensely frustrated.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Wasted telemarketer time by detailing fictional vehicle collections.`);
        }
      },
      {
        choiceText: 'Block the suspicious caller ID on your smartphone options instantly.',
        outcomeText: 'You tap the red ban option, instantly silencing any future rings from their automated dialing warehouse.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Blocked suspicious telemarketer callers using smartphone settings.`);
        }
      }
    ]
  },
  {
    id: 'dp4_sn_76_120_25',
    title: 'The Centenarian Interview Request 🎤',
    description: 'A reporter from the county news office contacts you to request an interview celebrating your incredible lifelong longevity.',
    category: 'Adulthood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age >= 76 && age <= 120;
    },
    choices: [
      {
        choiceText: 'Agree to the local news interview, attribute your age to daily garlic and walks.',
        outcomeText: 'You dress in your finest clothes. The published article is magnificent, making you a proud local legend overnight!',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 25, looks: 12, smarts: 15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Completed county news interviews on secrets to centenarian longevity.`);
        }
      },
      {
        choiceText: 'Invite the news reporter to an elegant parlor dinner to share true histories.',
        outcomeText: 'You serve fine hot tea and cookies, detailing amazing historical tales of your youth in a deeply moving evening.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, happiness: 20, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 80, -500000);
          state.log.push(`Age ${state.characterInfo.age}: Hosted local journalists for tea, sharing authentic historical life experiences.`);
        }
      },
      {
        choiceText: 'Refuse the publicity call, preferring absolute quiet in your backyard rose garden.',
        outcomeText: 'You politely decline the camera crews, choosing to preserve your peaceful, quiet afternoons under the rose trellis.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -15, happiness: 12 });
          state.log.push(`Age ${state.characterInfo.age}: Preserved absolute household privacy, declining public news profiles.`);
        }
      }
    ]
  }
];



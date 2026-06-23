import { GameEvent, CharacterState } from '../../types';
import { adjustStats } from '../../utils';

export const youngDataPack1CEvents: GameEvent[] = [
  // ==========================================================================
  // SECTION 3 (CONTINUED): ROMANCE ROOMMATE DISPUTES (ITEMS 59 - 66)
  // ==========================================================================
  {
    id: 'yp1_rom_03',
    title: 'The Dirty Dish Tower 🍽️',
    description: 'A monument of greasy saucepans and dried egg plates has stood inside the shared bathroom or kitchen for ten days.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Wash the entire pile yourself to restore perfect hygiene balances.',
        outcomeText: 'You clean the grease. The kitchen sparkles, but you feel highly taken advantage of.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 25, happiness: -10, stress: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Cleaned up roommate\'s cooking grease towers manually.`);
        }
      },
      {
        choiceText: 'Stack the dirty saucepans inside the culprit roommate\'s mattress sheets.',
        outcomeText: 'A massive shouting match erupts, though they wash their plates in deep fury within minutes.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 25, karma: -25, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Placed greasy pots inside roommate beds to enforce wash schedules.`);
        }
      },
      {
        choiceText: 'Purchase a pack of paper compostable plates to use exclusively.',
        outcomeText: 'You ignore the moldy pans, dining on thin cardboard circles. Lazy but peaceful.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -10, happiness: 5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 30, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Swapped to cardboard kitchen plates to sidestep dirty pan fights (-$30).`);
        }
      }
    ]
  },
  {
    id: 'yp1_rom_04',
    title: 'The Speed Dating Mixer ⏰',
    description: 'You attend a local cocktail lounge hosting a speed-dating sprint night: ninety seconds per interaction.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.maritalStatus === 'Single';
    },
    choices: [
      {
        choiceText: 'Deliver a rapid-fire showcase of your career ambition metrics.',
        outcomeText: 'Some write down "too intense," but two highly ambitious consulting partners exchange keys.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, looks: 10, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: pitcheed professional career metrics at micro dating mixers.`);
        }
      },
      {
        choiceText: 'Listen calmly and make gentle humor about the revolving chair sounds.',
        outcomeText: 'They find your silence highly attractive! You obtain five matches in your notebook.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 20, happiness: 20 });
          s.log.push(`Age ${s.characterInfo.age}: Won dating matches via observational humor at local mixers.`);
        }
      },
      {
        choiceText: 'Flee the rotating tables to drink cocktails near the exits.',
        outcomeText: 'You avoid dating pressure, logging no contact numbers but enjoying artisanal gin flavors.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 45, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Deserted dating mixers to enjoy botanical bar recipes (-$45).`);
        }
      }
    ]
  },
  {
    id: 'yp1_rom_05',
    title: 'The Sub-Let Roommate Audition 🏢',
    description: 'Your large flat seeks a third roommate. A quirky performance artist auditions, bringing a pet iguana.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Accept the artist and the iguana to build creative house energy.',
        outcomeText: 'They paint murals in the corridor and feed the lizard crickets. It is loud but highly fun.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 25, looks: 5, stress: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Welcomed performance artists and iguanas into flat sublets.`);
        }
      },
      {
        choiceText: 'Reject the nomination, prioritizing clean gray-carpet engineers.',
        outcomeText: 'The flat is quiet, tidy, and sterile, but you talk about spreadsheets during breakfasts.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: -15, happiness: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Selected silent tech analysts for housing vacancies.`);
        }
      },
      {
        choiceText: 'Demand a double rent deposit to cover potential reptile scratches.',
        outcomeText: 'They accept, depositing massive cash. Your housing ledger is beautiful and protected.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, happiness: 10 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 600, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Leveraged sublease deposits during art roommate screenings (+$600).`);
        }
      }
    ]
  },
  {
    id: 'yp1_rom_06',
    title: 'The Uninvited House Guest 🛋️',
    description: 'Your roommate\'s loud cousin sleeps on your shared corduroy couch, eating cereal and refusing to leave.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Demand they pay fifty dollars cash for every single night.',
        outcomeText: 'They pack their dirty rucksack and vanish immediately into the city streets. Victory!',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: -15, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Exilled uninvited sofa surfers by enforcing nightly boarding fees.`);
        }
      },
      {
        choiceText: 'Suffer the intrusion, stepping over their sleeping bag every morning.',
        outcomeText: 'You look highly tired. The flat smells like stale cornflakes, and your stress levels spike.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -10, happiness: -15, stress: 20 });
          s.log.push(`Age ${s.characterInfo.age}: Tolerated couch-riding relatives in shared city dwellings.`);
        }
      },
      {
        choiceText: 'Hide the router cords and cancel the house internet connections.',
        outcomeText: 'With zero digital networks, they grow highly bored and wander out of the flat.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 10, karma: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Disabled home routers to clear uninvited internet spongers.`);
        }
      }
    ]
  },
  {
    id: 'yp1_rom_07',
    title: 'The Double Date Trap 🍷',
    description: 'Your close work peer invites you to a fancy double-date dinner at an expensive molecular gastronomy bar.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Attend the dinner, consuming liquid nitrogen foams with smiles.',
        outcomeText: 'You spend two hundred and fifty dollars. The social connections are premium, but your card hurts.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 15, happiness: 20, stress: -5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 250, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Dining on nitrogen foams at expensive molecular double dates (-$250).`);
        }
      },
      {
        choiceText: 'Excuse yourself, citing severe research project deadlines.',
        outcomeText: 'Your bank deposits remain safe. You eat basic noodles in complete calm.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -10, happiness: 5 });
          s.log.push(`Age ${s.characterInfo.age}: Bypassed expensive gastronomy invitations to read books.`);
        }
      },
      {
        choiceText: 'Suggest meeting in a casual dumpling joint instead.',
        outcomeText: 'The team goes! You spend twenty bucks, eating massive hot chili pork balls in beautiful chatter.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 15, looks: 5, happiness: 20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 20, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Relocated heavy dates to budget dumpling locations (-$20).`);
        }
      }
    ]
  },
  {
    id: 'yp1_rom_08',
    title: 'The Heating Bill Escalation 🥶',
    description: 'Your roommate turns the winter furnace to eighty degrees, creating a massive six hundred dollar electric bill.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Pay your direct half of the bill to keep household structures peaceful.',
        outcomeText: 'You pay three hundred dollars. Your bank deposits suffer, but house vibes remain secure.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -5, karma: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 300, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Settled half of winter electrical furnace fees (-$300).`);
        }
      },
      {
        choiceText: 'Refuse to pay for their heat, insisting they cover seventy percent.',
        outcomeText: 'A freezing, highly tense legal argument breaks out. They pay under protest and stop speaking over coffee.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 25, happiness: -15, looks: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Demanded roommates pay the lion\'s share of heating bills.`);
        }
      },
      {
        choiceText: 'Establish strict solar heating and sweater policies in writing.',
        outcomeText: 'You drafting thermal energy rules. Roommates buy big wool socks, lowering the house consumption.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: -10, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Outlined warm wool clothing rules to prevent energy spikes.`);
        }
      }
    ]
  },
  {
    id: 'yp1_rom_09',
    title: 'The Partner\'s Cat Alllegation 🐈',
    description: 'A romantic partner brings their highly sneeze-inducing long-haired cat to sleep on your bed pillows.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25 && s.maritalStatus === 'Dating';
    },
    choices: [
      {
        choiceText: 'Accept the allergy sneezing to keep your companion happy.',
        outcomeText: 'Your eyes swell red and watery all morning, though they praise your sweet animal support.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, looks: -15, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Endured heavy feline breathing allergies to preserve dating ties.`);
        }
      },
      {
        choiceText: 'Insist the long-haired cat sleeps strictly on the kitchen tile panels.',
        outcomeText: 'Your partner looks highly insulted, claiming you lack empathy, but your lungs stay clear.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 15, looks: 5, karma: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Banished your partner\'s fluffy cat from bedroom domains.`);
        }
      },
      {
        choiceText: 'Purchase advanced anti-allergen air filter cylinders.',
        outcomeText: 'You spend one hundred dollars. The advanced filters scrub the cat fur, restoring healthy airways.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, smarts: 15, happiness: 20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 100, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Bought modern air filters to eliminate feline breathing blocks (-$100).`);
        }
      }
    ]
  },
  {
    id: 'yp1_rom_10',
    title: 'The Shared Washer Rust Dye 👕',
    description: 'The internal plumbing inside your shared flat washer stains five of your favorite white shirts brown.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Throw out the stained shirts and buy basic plain t-shirts.',
        outcomeText: 'You spend eighty bucks. Your style is highly plain, but you bypass complex scrub tasks.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: -10, happiness: -5, stress: 5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 80, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Replaced rusted white shirts with basic cotton models (-$80).`);
        }
      },
      {
        choiceText: 'Soak the cotton folders in premium chemical rust removers.',
        outcomeText: 'You scrub for three hours, wearing heavy rubber gloves. The stains dissolve beautifully!',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 15, smarts: 15, stress: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Dissolved wash machine rust spots with specific acids.`);
        }
      },
      {
        choiceText: 'Adopt the rusted shirts as a chaotic industrial fashion expression.',
        outcomeText: 'You wear the brown oxide paint spots. Hipsters call your style "extremely avant-garde"!',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 10, happiness: 15, stress: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Styled iron oxide laundry stains as high city fashion statements.`);
        }
      }
    ]
  },

  // ==========================================================================
  // SECTION 4: RANDOM URBAN LIFE, VEHICLE MAINTENANCE & NIGHTLIFE (ITEMS 67 - 100)
  // ==========================================================================
  {
    id: 'yp1_urb_01',
    title: 'The Faulty Auto Alternator 🚗',
    description: 'Your commuter carriage engine hums with a high-pitched squeal. The mechanics report a dying battery charging unit.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const possessesVehicle = s.assets?.some(a => a.type === 'vehicle');
      return age !== undefined && age >= 18 && age <= 25 && possessesVehicle;
    },
    choices: [
      {
        choiceText: 'Replace the alternator with brand new factory parts.',
        outcomeText: 'You spend four hundred and fifty dollars. The engine runs in silky absolute silence.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 5, stress: -15, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 450, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Authorized professional alternator installation inside commuter vehicles (-$450).`);
        }
      },
      {
        choiceText: 'Dismantle the generator yourself using rusty wrench sets.',
        outcomeText: 'Your hands are covered in black axle oil, but you complete the rebuild, boosting mechanical smarts.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, looks: -5, health: 5, stress: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Self-repaired commuter engine alternator systems.`);
        }
      },
      {
        choiceText: 'Ignore the hum until the electronics die on the interstate.',
        outcomeText: 'The car engine stalls at midnight under black skies. You pay expensive tow-truck fees.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -10, happiness: -15, stress: 25 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 250, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Suffered highway breakdowns after ignoring alternator squeals (-$250).`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_02',
    title: 'The Missing Subway Ticket 🎫',
    description: 'You stand before the steel subway barrier slots, but your paid multi-ride transport card has slipped out.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Jump the metal subway bar instantly, running down the tracks.',
        outcomeText: 'A transit officer captures you, handing out an immediate eighty dollar municipal fine.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -20, looks: -5, stress: 20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 80, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Fined for hopping metal transit bar slots (-$80).`);
        }
      },
      {
        choiceText: 'Purchase a fresh single-ride transport card using pocket coins.',
        outcomeText: 'You spend five dollars, arriving slightly late to your desk but maintaining pure legal records.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 10, karma: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 5, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Bought new transit codes after losing original cards.`);
        }
      },
      {
        choiceText: 'Walk the full four miles home, enjoying the sunset red clouds.',
        outcomeText: 'Your hips are slightly sore, but you breathe fresh air and discover a cool street bakery.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, looks: 5, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Completed foot treks across urban boulevards after transit failures.`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_03',
    title: 'The Nightclub Dress Reject 🚫',
    description: 'The beefy bouncer at the elite club door blocks you, stating your athletic canvas shoes violate rules.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 21 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Pay the door host fifty dollars as a discrete personal tip.',
        outcomeText: 'They pull back the velvet cord, nodding you into the glowing laser levels of the lounge.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 15, happiness: 20, stress: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 50, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Secured nightclub entries via hand-selected door tips (-$50).`);
        }
      },
      {
        choiceText: 'Go back home to swap into leather driving loafers.',
        outcomeText: 'You return looking highly elegant. The bouncer smiles, waving you in without hurdles.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 25, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Returned to clubs dressed in premium leather slip-ons.`);
        }
      },
      {
        choiceText: 'Settle down in a cozy vintage pub across the lane instead.',
        outcomeText: 'You sit near warm logs, drinking cheap dark beers and eating roasted salted peanuts in peace.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -20, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 15, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Swapped loud club lines for cozy hearthside pub corners.`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_04',
    title: 'The Stray Cat Rescue 🐈',
    description: 'You spot a thin, wet ginger kitten shivering behind the recycling bins in the brick alleyway.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Adopt the kitten, purchasing milk bowls and wool toy balls.',
        outcomeText: 'The kitten purrs loudly near your neck. Your home stress vanishes, and you feel deeply happy.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 30, stress: -15, karma: 35 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 120, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Adopted a stray wet alleyway ginger kitten, saving a life (-$120).`);
        }
      },
      {
        choiceText: 'Deliver the animal to the local veterinary medicine shelter blocks.',
        outcomeText: 'The shelter nurses praise your civic values. They place the kitten in clean warm nests.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 25, stress: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Transported lost stray kittens to medical veterinary shelters.`);
        }
      },
      {
        choiceText: 'Ignore the kitten and walk home to wash your hands.',
        outcomeText: 'You stay clinical and clean. Your carpets are secure, though you feel minor heart guilt.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: -15, happiness: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Ignored stray street animals to maintain clinical carpet hygiene.`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_05',
    title: 'The Lost Bank Card 💳',
    description: 'You drop your primary checking account debit card while shopping in the busy flea market stalls.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Lock your accounts immediately using your mobile phone application.',
        outcomeText: 'You freeze transaction paths! Excellent. Zero fraudulent card swipes are processed.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Disabled banking cards instantly following field slips.`);
        }
      },
      {
        choiceText: 'Search the flea market grass floors for three long hours.',
        outcomeText: 'You wander around the dust. You do not discover the plastic, and your hair looks highly messy.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -10, stress: 15, looks: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Inspected dirt paths searching for dropped banking cards.`);
        }
      },
      {
        choiceText: 'Ignore the loss, hoping honest finders drop it in the mail.',
        outcomeText: 'Someone swipes four hundred dollars of premium electronics before you block key accounts.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: -15, stress: 25, karma: -10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 400, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Suffered commercial card frauds after delaying locks (-$400).`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_06',
    title: 'The Squealing Alternator Belt 🚗',
    description: 'Your commuter carriage engine hums with a high-pitched belt noise during rainy morning trips.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const possessesVehicle = s.assets?.some(a => a.type === 'vehicle');
      return age !== undefined && age >= 18 && age <= 25 && possessesVehicle;
    },
    choices: [
      {
        choiceText: 'Spray chemical slip belt-conditioner on the spinning rubber.',
        outcomeText: 'A cheap, rapid fix! The squeal instantly silent, though mechanics warn it is temporary.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: -10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 15, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Applied quick chemical belt sprays to quiet car engine hums.`);
        }
      },
      {
        choiceText: 'Swap the worn belt inside your driveway using pliers and gloves.',
        outcomeText: 'You skin your knuckles on warm steel, but you install fresh rubber, boosting machinery skills.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, health: 5, looks: -5, stress: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Replaced rubber fan belts manually inside your home structures.`);
        }
      },
      {
        choiceText: 'Drive with the high squealing pitch, playing music extremely loud.',
        outcomeText: 'The belt snaps at eighty miles per hour! Your engine halts instantly, ruining the aluminum valves.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, stress: 30, happiness: -15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 800, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Blew out car engine valves after neglecting simple belt friction (-$800).`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_07',
    title: 'The Vintage Armchair Find 💺',
    description: 'You discover a beautiful, mid-century Danish oiled oak armchair sitting on the curb with a "FREE" tag linked.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Lug the heavy timber armchair home on your shoulders.',
        outcomeText: 'Your rear neck muscles are incredibly stiff, but you furnish your living room with elite Danish craft.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -5, looks: 15, happiness: 20 });
          s.log.push(`Age ${s.characterInfo.age}: Salvaged high-end mid-century timber armchairs from neighborhood curbs.`);
        }
      },
      {
        choiceText: 'Hire a cargo motorcycle delivery rider to transport the seat.',
        outcomeText: 'You spend forty dollars. The chair arrives clean, dry, and undamaged at your lounge room rug.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -10, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 40, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Hired courier deliveries to ship street Danish furniture finds (-$40).`);
        }
      },
      {
        choiceText: 'Ignore the chair, fearing bugs and carpet infestations.',
        outcomeText: 'You walk home clean. Your carpets are safe from eggs, though you gaze sadly at empty lounge corners.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Passed on curb furniture treasures to protect floor carpets.`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_08',
    title: 'The Street Skateboard Spill 🛹',
    description: 'A bumpy concrete grid hurls you from your wooden skateboard while carving down the park hills.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Roll onto your shoulder padding to minimize the bone hits.',
        outcomeText: 'A textbook safe roll. You skin your elbows slightly, but your solid bones remain perfect.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -5, stress: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Practiced protective rolling falls during skateboard accidents.`);
        }
      },
      {
        choiceText: 'Suffer complete impact, scraping your knees on raw gray stones.',
        outcomeText: 'You bleeding heavily. You require twelve stitches at the nearby urgent care clinic.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -20, looks: -10, happiness: -10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 150, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Admitted to clinics for knee scrapes after skateboarding crashes (-$150).`);
        }
      },
      {
        choiceText: 'Abandon skating, selling your skate board to kids for fifty bucks.',
        outcomeText: 'You cash in. You stick to walking on safe flat shoes, avoiding future fractures.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 10, stress: -15, happiness: 5 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 50, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Sold skateboard setups to clear danger assets (+$50).`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_09',
    title: 'The Flea Market Painting 🎨',
    description: 'You spot a moody, unlabeled oil canvas of stormy harbor waters at an old junk sale for thirty dollars.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Buy the harbor oil painting to hang over your desk.',
        outcomeText: 'Your room feels highly intellectual. You spend days admiring the dark brush details.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 10, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 30, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Decorated walls with oil paintings sourced from junk stalls (-$30).`);
        }
      },
      {
        choiceText: 'Have a professional valuer analyze the artist signatures.',
        outcomeText: 'A massive discovery! It is a minor piece by a late maritime master, worth two thousand dollars.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, happiness: 20 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 2000, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Unlocked rare maritime art values inside flea market purchases (+$2,000).`);
        }
      },
      {
        choiceText: 'Bargain aggressive rates, securing the painting for ten bucks.',
        outcomeText: 'The dealer grumbles but accepts your cash. You walk home with cheap, beautiful room assets.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 10, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Haggled art sellers, buying harbor canvases for minor cash (-$10).`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_10',
    title: 'The Over-Packed Gym Floor 🏋️‍♂️',
    description: 'The barbell racks inside your local gym are crowded with twenty flexing bodybuilders filming video streams.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Work out with heavy concrete bricks inside your garden.',
        outcomeText: 'A raw, brutalist workout. You lift stone columns, building solid bone density in quiet peace.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 20, looks: 10, stress: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Lifted garden masonry files to avoid crowded fitness rooms.`);
        }
      },
      {
        choiceText: 'Enter the barbell queue, requesting sets between video cuts.',
        outcomeText: 'You wait frequently. The workout takes three hours, leaving you cold and annoyed at lenses.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: 15, happiness: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Waited in long barbell queues on crowded commercial floors.`);
        }
      },
      {
        choiceText: 'Perform bodyweight calisthenics on high park climbing bars.',
        outcomeText: 'You execute amazing gymnastic pull-ups under open blue horizons, looking extremely fit.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 25, looks: 20, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Mastered park calisthenics bars under warm sunlights.`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_11',
    title: 'The Sputtering Car Radiator 💨',
    description: 'Your commuter carriage engine temperature rises rapidly, coughing white liquid vapor from the grills.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const possessesVehicle = s.assets?.some(a => a.type === 'vehicle');
      return age !== undefined && age >= 18 && age <= 25 && possessesVehicle;
    },
    choices: [
      {
        choiceText: 'Pour clean mountain waters in the heated coolant reservoir.',
        outcomeText: 'The steam pressure drops. You bypass immediate risks, driving home slowly under low speed scales.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Quenched radiator boiling with pure mountain water reservoirs.`);
        }
      },
      {
        choiceText: 'Replace the fractured aluminum radiator at authorized centers.',
        outcomeText: 'You spend five hundred dollars. The mechanics secure durable hoses, keeping engine charts clean.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 5, stress: -15, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 500, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Fitted professional aluminum radiators inside car cooling lines (-$500).`);
        }
      },
      {
        choiceText: 'Continue accelerating, hoping winter winds cool the block.',
        outcomeText: 'The entire steel motor cylinder head melts from intense heat friction, totaling your car asset value.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -10, stress: 30, happiness: -20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 1200, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Melted motor cylinder heads after driving with boiled coolants (-$1,200).`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_12',
    title: 'The Street Concert Ticket 🎟️',
    description: 'A shady street seller offers two front-row passes to a sold-out electronic music concert for eighty dollars.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Buy the passes, hopping past the main queue checks.',
        outcomeText: 'The codes are absolute fakes! Security turns you away in deep embarrassment under streetlights.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: -10, stress: 20, karma: -15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 80, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Caught holding counterfeit counterfeit concert tickets (-$80).`);
        }
      },
      {
        choiceText: 'Decline the purchase, choosing to hear the hum from the park lawn.',
        outcomeText: 'You sit on soft grass under moonbeams, hearing clear bass notes for zero cost.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Heard public music concerts sitting in city park lawns.`);
        }
      },
      {
        choiceText: 'Inquire about formal box office late-release openings.',
        outcomeText: 'You secure genuine tickets from the official counter for sixty dollars. The concert is highly legendary!',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 15, happiness: 25 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 60, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Acquired official box-office late release concert passes (-$60).`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_13',
    title: 'The Blocked Sump Pump 🌊',
    description: 'A heavy flash storm floods your basement flat floor blocks with three inches of cold mud sewage.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Bale out the sewage manually using simple kitchen buckets.',
        outcomeText: 'Your back hurts and your skin breaks out, but you salvage eighty percent of your furniture.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, looks: -5, stress: 25 });
          s.log.push(`Age ${s.characterInfo.age}: Balleted basement mud torrents using manual plastic buckets.`);
        }
      },
      {
        choiceText: 'Hire professional industrial water-sweeper contractors.',
        outcomeText: 'You spend four hundred dollars. The pumps dry your concrete floors in thirty minutes flat.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 400, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Restored flooded basement grids with sanitizing crews (-$400).`);
        }
      },
      {
        choiceText: 'Settle in hotel suites and let the property managers handle cleanups.',
        outcomeText: 'You sleep beautifully between clean cotton sheets, bypassing mud drama completely.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 20, stress: -20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 150, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Checked into city hotel rooms during basement fluid flooding (-$150).`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_14',
    title: 'The Street Bicycle Race 🚲',
    description: 'Your neighborhood initiates a fast, amateur winter evening bicycle racing sprint through historical alleys.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Race on your vintage single-speed steel touring bicycle.',
        outcomeText: 'You sprint furiously, finishing in fourth place. Your thighs burn, but local riders cheer.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 20, looks: 10, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Finished fourth in regional alleyway cycling races.`);
        }
      },
      {
        choiceText: 'Rent high-end carbon-fiber racing cycle gears.',
        outcomeText: 'You spend eighty bucks but win first place! The organizers present a sweet silver cup trophy.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, looks: 15, happiness: 25 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 80, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Championed the winter alley motorcycle bicycle race series (-$80).`);
        }
      },
      {
        choiceText: 'Serve as the final line stopwatch official manager.',
        outcomeText: 'You drink warm cider, keeping accurate log metrics and chatting with beautiful spectators.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: -15, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Acted as professional stopwatch Marshall during village bike match days.`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_15',
    title: 'The Stray Dog Chase 🐕',
    description: 'During a midnight run, a giant collarless guard dog chases you from an industrial yard portal.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Sprint at your maximum lung capacity to jump the chain-link gates.',
        outcomeText: 'You leap over the steel wire spikes! Your shins are gashed but you escape the barking teeth.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -5, looks: -5, stress: 25 });
          s.log.push(`Age ${s.characterInfo.age}: Escaped stray guard dogs by jumping chain link borders.`);
        }
      },
      {
        choiceText: 'Stand tall, shouting harsh command codes at the dog.',
        outcomeText: 'The animal pauses, confused by your technical volume. It retreats slowly, saving your ankles.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: 15, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Defused attacking street dogs using firm command pitches.`);
        }
      },
      {
        choiceText: 'Throw your organic steak sandwich to distract the predator.',
        outcomeText: 'The dog happily chews the beef. You walk away calmly, though your dinner is lost.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 20, stress: -10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 15, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Sacrificed steak sandwiches to negotiate escapes from guard dogs (-$15).`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_16',
    title: 'The Broken Key Fob 🔑',
    description: 'Your complex vehicle electronic lock fob cracks on concrete, refusing to transmit start commands.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const possessesVehicle = s.assets?.some(a => a.type === 'vehicle');
      return age !== undefined && age >= 18 && age <= 25 && possessesVehicle;
    },
    choices: [
      {
        choiceText: 'Repay factory locksmiths two hundred dollars for digital programming.',
        outcomeText: 'You receive sleek fresh fobs. The signal acts beautifully, but your budget decreases.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -10, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 200, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Programmed vehicle entry transponders via official dealership locksmiths (-$200).`);
        }
      },
      {
        choiceText: 'Open the fob and bridge the copper board using foil wrappers.',
        outcomeText: 'A high tech hack! Your engine turns over on foil bridges. Rednecks laud your electronics wisdom.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, looks: -5, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Hot-wired broken key fobs using confectionery foil wrappers.`);
        }
      },
      {
        choiceText: 'Travel by local urban buses for an entire technical week.',
        outcomeText: 'You read books during routes. You save money while your vehicle sits in garage silence.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Swapped vehicle transport for municipal transit lines for a full week.`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_17',
    title: 'The Antique Bookshop Discovery 📚',
    description: 'You discover a dusty, hand-bound ledger of ancient local navigation maps from 1820 at an estate clearing sale.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Buy the vintage leather map ledger for forty dollars.',
        outcomeText: 'The ancient paper smells like aged tea. You place it on your research table, feeling highly scholarly.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, looks: 15, happiness: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 40, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Sourced hand-bound vintage maritime map ledgers (-$40).`);
        }
      },
      {
        choiceText: 'Donate the maps to the state historic museum collection.',
        outcomeText: 'The museum directors are deeply grateful! They name a display partition after you, boosting local fame.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 30, looks: 20, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Donated historical maritime maps to civic museums, gaining community fame.`);
        }
      },
      {
        choiceText: 'Resell the map ledger to online vintage auctions immediately.',
        outcomeText: 'You manage a rapid trade! A collector bids three hundred dollars, clearing nice profit paths.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, happiness: 10 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 300, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Traded collectible map books on digital auction frameworks (+$300).`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_18',
    title: 'The Loose Spark Plug Engine 🚗',
    description: 'Your commuter carriage engine shudders violently on uphills. Your smart scan tools show firing leaks inside cylinder three.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const possessesVehicle = s.assets?.some(a => a.type === 'vehicle');
      return age !== undefined && age >= 18 && age <= 25 && possessesVehicle;
    },
    choices: [
      {
        choiceText: 'Tighten the spark plug inside your driveway with socket wrench extension pipes.',
        outcomeText: 'With ten minutes of grease work, your cylinder fires smoothly again. The engine shudder is gone.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, happiness: 10, stress: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Re-calibrated vehicle combustion spark plugs in home driveways.`);
        }
      },
      {
        choiceText: 'Pay elite performance garages to replace all ignition coil cables.',
        outcomeText: 'They replace everything, charging three hundred and fifty dollars. Overkill, but highly durable.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 5, stress: -15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 350, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Procured complete performance ignition coil upgrades (-$350).`);
        }
      },
      {
        choiceText: 'Continue driving with the firing leak, ignoring the warning lights.',
        outcomeText: 'Raw fuel leaks into the ceramic catalytic converter, melting the precious metal grids completely.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -10, stress: 25, happiness: -15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 900, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Suffered catalyst exhaust melt downs following spark neglect (-$900).`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_19',
    title: 'The Chilly Lake Jump 🌊',
    description: 'Your friends challenge you to hop off the stone bridge into sixty-degree mountain lake waters at sunrise.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Leap off the bridge into the bracing cold water.',
        outcomeText: 'An icy, physical electric shock! You climb out gasping, feeling incredibly alive, with a healthy skin glow.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 20, looks: 15, happiness: 25 });
          s.log.push(`Age ${s.characterInfo.age}: Jumped off granite bridges into freezing mountain sunrise lake waters.`);
        }
      },
      {
        choiceText: 'Stay dry on the wood boards, holding dry towels for the crew.',
        outcomeText: 'You avoid the cough, sipping warm coffee while others shiver on the rock banks.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Kept dry and warm on lake bridges, acting as towel crew.`);
        }
      },
      {
        choiceText: 'Challenge the group to a race across the warm shoreline sand paths.',
        outcomeText: 'You bypass the freezing plunge while burning nice calories on the beach banks.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, looks: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Scheduled shore runs instead of diving in cold lake depths.`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_20',
    title: 'The Stray Kitten Encounter 🐈',
    description: 'A tiny, dirty black kitten with bright amber eyes sits meowing loudly near your cellar steps.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Adopt the black kitten, naming it Obsidian and buying scratching posts.',
        outcomeText: 'Obsidian sleeps on your laptop keyboard. Your blood pressure drops and your flat feels incredibly homey.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 10, happiness: 30, stress: -20, karma: 25 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 100, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Adopted clean stray black kittens, naming them Obsidian (-$100).`);
        }
      },
      {
        choiceText: 'Provide a tiny plate of biological cream milk and let it wander.',
        outcomeText: 'The kitten drinks happily and disappears back into the gardens, looking strong.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 5, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Fed alleyway black kittens with organic cream products.`);
        }
      },
      {
        choiceText: 'Shoo the cat away to preserve garden flower beds.',
        outcomeText: 'The kitten runs off into the shadows. Your flowers remain perfect, but you feel slightly cold.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 5, karma: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Exiled stray neighborhood kittens to protect garden borders.`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_21',
    title: 'The Antique Chest Ransom 📦',
    description: 'An old lady auctions a locked, key-less iron maritime strongbox at a local estate sale for seventy dollars.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Buy the key-less maritime strongbox, cracking it with a crowbar.',
        outcomeText: 'The lock pops with a screech! Inside, you discover silver pocket watches worth four hundred dollars.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, happiness: 20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 70, -500000);
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 400, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Opened classic estate maritime boxes, mining silver pocket watches (-$70 cost).`);
        }
      },
      {
        choiceText: 'Decline the strongbox and focus on buying vintage wooden kitchen spoons.',
        outcomeText: 'You purchase two gorgeous hand-carved maple mixing spoons for five bucks, cooking beautiful soups.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 10, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 5, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Procured hand-cut maple kitchen tools to cook vegetable soups.`);
        }
      },
      {
        choiceText: 'Hire security locksmiths to crack the strongbox gears without damage.',
        outcomeText: 'The master locksmith cracks the brass, revealing a collection of Victorian lace, worth sixty bucks.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: -5 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 50, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Cracked Victorian estate chests using professional locksmith skills (-$50).`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_22',
    title: 'The Squeaking Brake Pads 🚗',
    description: 'Your commuter carriage brakes hum with a metallic grinding scrape during downhill mountain roads.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const possessesVehicle = s.assets?.some(a => a.type === 'vehicle');
      return age !== undefined && age >= 18 && age <= 25 && possessesVehicle;
    },
    choices: [
      {
        choiceText: 'Replace the grinding ceramic brake discs in authorized service shops.',
        outcomeText: 'You spend three hundred and fifty dollars. Your brakes stop with silent, incredible bite security.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, stress: -20, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 350, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Swapped worn ceramic vehicle brake pads at professional garages (-$350).`);
        }
      },
      {
        choiceText: 'Swap the brake discs manually using hydraulic jacks in your alley.',
        outcomeText: 'You spend hours aligning steel clips. Your hands are black with grease, but the stopping power is restored.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, looks: -5, health: 5, stress: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Rebuilt commuter brake assemblies in driveway garage runs.`);
        }
      },
      {
        choiceText: 'Neglect the squeak, continuing to drive on highway routes.',
        outcomeText: 'The caliper slides seize, welding the brake pads to the steel wheel hubs at high highway speeds.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -20, stress: 30, happiness: -20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 850, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Experienced major highway caliper crashes after ignoring basic metal grinds (-$850).`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_23',
    title: 'The Rooftop Garden Initiative 🌿',
    description: 'Your flat block offers access to the raw concrete roof. Neighbors request volunteers to build a vegetable garden project.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Carry fifty bags of organic soil up the fire stairs.',
        outcomeText: 'Your shoulders represent hard brick. The rooftop is covered in tomatoes, and you earn premium community praise.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 20, looks: 10, karma: 30, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Carried soil bags to construct community rooftop gardens.`);
        }
      },
      {
        choiceText: 'Donate eighty dollars to fund localized smart drip watering tubes.',
        outcomeText: 'The irrigation works beautifully. Your lettuce rows grow without daily manual water chores.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: -10, karma: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 80, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Funded drip-watering lines for community vegetable gardens (-$80).`);
        }
      },
      {
        choiceText: 'Decline participation completely to read books on your couch.',
        outcomeText: 'You rest elegantly in your bedroom. Neighbors label you as highly distant, but your fingers stay clean.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Opted out of rooftop agricultural efforts to protect resting slots.`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_24',
    title: 'The Midnight Apartment Lockout 🔑',
    description: 'You return from a late study session at 2:00 AM only to realize you left your brass apartment keys inside your bedroom dresser.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Hire an emergency 24-hour locksmith for two hundred dollars.',
        outcomeText: 'The locksmith drills the cylinder open in ten seconds. It is incredibly expensive, but you sleep in your own bed.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -10, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 200, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Paid emergency midnight locksmith services to open door locks (-$200).`);
        }
      },
      {
        choiceText: 'Climb the rusty fire escape ladder to crawl through the living room window.',
        outcomeText: 'You scale the brick walls under moonlight. You scrape your waist but successfully slip inside the flat.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, looks: -5, smarts: 15, happiness: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Scaled historic brick facades to navigate back through open windows.`);
        }
      },
      {
        choiceText: 'Sleep on the landing hallway floor wrapped in your study wool coat.',
        outcomeText: 'You wake up at dawn with a freezing neck and extremely stiff bone joints, but you preserved forty dollars.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -20, happiness: -15, stress: 25 });
          s.log.push(`Age ${s.characterInfo.age}: Slept on cold concrete corridor steps following key lockouts.`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_25',
    title: 'The Vintage Vinyl Score 📻',
    description: 'A dusty box of seventy analog record vinyls sits inside a garage clearances vault. The owner wants forty dollars for the collection.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Purchase the record box, sorting the artists under your desk lanes.',
        outcomeText: 'You discover three highly rare 1970 jazz editions. Your bedroom is filled with beautiful acoustic vinyl tracks.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 10, happiness: 25, smarts: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 40, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Sourced rare analog music vinyls from local estate garage clearances (-$40).`);
        }
      },
      {
        choiceText: 'Resell the vinyl collection instantly to vintage city boutiques.',
        outcomeText: 'A local music buyer inspects your find, handing you one hundred and eighty dollars in clean bills.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 180, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Flipped estate music records to vintage music merchants (+$180).`);
        }
      },
      {
        choiceText: 'Decline the pile and buy simple digital tracks instead.',
        outcomeText: 'You listen to songs in headphones. Your floors stay beautifully clear, bypassing old box storage dust.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -10 });
          s.log.push(`Age ${s.characterInfo.age}: Ignored analog vinyl collections to keep floors perfectly clean.`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_26',
    title: 'The Broken Silencer Clatter 🚗',
    description: 'Your commuter carriage exhaust pipe breaks its rubber bracket, scraping metallic clatters on the pavement.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const possessesVehicle = s.assets?.some(a => a.type === 'vehicle');
      return age !== undefined && age >= 18 && age <= 25 && possessesVehicle;
    },
    choices: [
      {
        choiceText: 'Bind the exhaust pipe securely using a metal wire hanger.',
        outcomeText: 'A brilliant driveway fix! The pipe floats safely above asphalt lanes, bypassing repair costs completely.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, stress: -10, happiness: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Anchored rattling car exhaust pipes using simple wire hangers.`);
        }
      },
      {
        choiceText: 'Purchase a new stainless-steel exhaust line at service centers.',
        outcomeText: 'You spend three hundred dollars. Your car is incredibly quiet and conforms beautifully to emissions guides.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 5, stress: -15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 300, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Replaced rusty exhaust pipes with thick stainless steel units (-$300).`);
        }
      },
      {
        choiceText: 'Let the exhaust pipe scrape the stones until it snaps.',
        outcomeText: 'The entire catalytic muffler line detaches at sixty miles per hour, destroying your tire walls with sparks.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -15, stress: 30, happiness: -15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 750, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Ruined exhaust catalyst lines after ignoring simple metal scraping clatters (-$750).`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_27',
    title: 'The VIP Nightclub Lounge Pass 🥂',
    description: 'A slick commercial sponsor offers you exclusive back-stage passes to the city electronic music dome for a hundred dollars.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 21 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Acquire the VIP pass and enter the velvet lounge.',
        outcomeText: 'You drink champagne with famous music artists! You gain massive city prestige and a glowing mood.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 20, happiness: 30, stress: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 100, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Entered premium music lounges using back-stage passes (-$100).`);
        }
      },
      {
        choiceText: 'Refuse the ticket, prioritizing your early morning desk metrics.',
        outcomeText: 'You stay beautifully sober. Your analytical databases are perfect, though you feel slight social exclusion.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, stress: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Declined loud midnight lounge circles to preserve early desk metrics.`);
        }
      },
      {
        choiceText: 'Inquire about getting in free as a photographer assistant.',
        outcomeText: 'They hand you a camera card! You capture dance photographs, securing the exclusive room without cost.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, looks: 10, happiness: 20 });
          s.log.push(`Age ${s.characterInfo.age}: Accessed backstage lounge areas as a freelance dancer photographer.`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_28',
    title: 'The Royal Parrot Rescue 🦜',
    description: 'A pristine, expensive blue hybrid Macaw parrot resides on your terrace. It sings retro television commercial tunes.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Adopt the Macaw, housing it inside a giant wire terrace cage.',
        outcomeText: 'The parrot copies your phone dial alarms. It is incredibly noisy, but you laugh daily at its vocabulary.',
        effect: (s: CharacterState) => {
          adjustStats(s, { happiness: 30, stress: -10, karma: 15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 150, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Housed a talking blue Macaw on your terrace (-$150 cages).`);
        }
      },
      {
        choiceText: 'Search for its original wealthy owners across local directories.',
        outcomeText: 'You track down its crying owner! They reward you with a nice cash bonus of five hundred dollars.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 35, happiness: 15 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 500, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Restored lost valuable Macaw parrots to their original owners (+$500).`);
        }
      },
      {
        choiceText: 'Release it to fly among the garden lime trees.',
        outcomeText: 'The bird flies majestic into blue horizons. You keep clean balcony floors with zero bird seed.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 10, stress: -5 });
          s.log.push(`Age ${s.characterInfo.age}: Released terrace stray parrots back into natural botanical paths.`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_29',
    title: 'The Heirloom Watch Discovery ⌚',
    description: 'You find a mechanical, steel luxury watch inside a pile of kitchen gadgets at an estate cleanout. The seller wants ten dollars.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Procure the mechanical steel watch and polish the glass manually.',
        outcomeText: 'It is a luxury vintage model! You wear it on your wrist daily, looking extraordinarily sharp and professional.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 25, happiness: 20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 10, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Acquired vintage heirloom watches from garden estate junk sales (-$10).`);
        }
      },
      {
        choiceText: 'Flip the mechanical luxury timepiece on antique digital portals.',
        outcomeText: 'An antique horologist buys the steel case, registering a clean instant wire of eight hundred dollars.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 800, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Flipped vintage luxury timepieces on digital collector networks (+$800).`);
        }
      },
      {
        choiceText: 'Ignore the metal pile to focus on buying clean towels.',
        outcomeText: 'You walk away with high-quality linens, leaving mechanical mysteries for other browsers.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 10 });
          s.log.push(`Age ${s.characterInfo.age}: Bypassed vintage watches to acquire home linens.`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_30',
    title: 'The Flat Suburban Road Tire 🚗',
    description: 'A sharp building iron nail punctures your commuter tire during a sweltering highway commute.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      const possessesVehicle = s.assets?.some(a => a.type === 'vehicle');
      return age !== undefined && age >= 18 && age <= 25 && possessesVehicle;
    },
    choices: [
      {
        choiceText: 'Swap the flat tire yourself with the compact emergency spare.',
        outcomeText: 'You operate the steel jack flawlessly in ninety-degree heat. Your arms are covered in dust, but you arrive safely.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20, health: 10, stress: 15 });
          s.log.push(`Age ${s.characterInfo.age}: Replaced flat highway tires yourself using simple road tools.`);
        }
      },
      {
        choiceText: 'Hire professional roadside assistance for one hundred dollars.',
        outcomeText: 'You sit inside chilled AC lounges while road technicians install the rubber beautifully.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 100, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Hired municipal road mechanics to swap flat tires (-$100).`);
        }
      },
      {
        choiceText: 'Drive slowly on the steel rim to reach the nearest center.',
        outcomeText: 'The grinding sparks damage the aluminum brake lines, creating a massive six hundred dollar system bill.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: -10, stress: 30, happiness: -15 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 600, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Shredded vehicular magnesium rims by running on flat tires (-$600).`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_31',
    title: 'The Civic Food Pantry Volunteer 🥫',
    description: 'The regional community charity requests physical volunteers to sort sixty boxes of emergency grain packages.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Strap on your durable work gloves and sort the boxes.',
        outcomeText: 'You lift heavy cans of corn for five hours. Your back is highly sore, but your soul registers pure glowing karma.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, karma: 35, happiness: 20 });
          s.log.push(`Age ${s.characterInfo.age}: Volunteered physically to pack emergency rations at regional pantries.`);
        }
      },
      {
        choiceText: 'Write a fifty-dollar financial donation check to the fund.',
        outcomeText: 'The director prints your name on the backers board. You remain dry and clean on your study chair.',
        effect: (s: CharacterState) => {
          adjustStats(s, { karma: 25, stress: -10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 50, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Backed regional food pantry efforts with quick bank donations (-$50).`);
        }
      },
      {
        choiceText: 'Dodge the outreach request to finish playing digital golf.',
        outcomeText: 'You score nice artificial greens in full relaxation, though your spiritual scorecard is empty.',
        effect: (s: CharacterState) => {
          adjustStats(s, { stress: -15, karma: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Bypassed charitable drives to complete digital sport gaming sessions.`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_32',
    title: 'The Perseids Meteor Midnight 🌌',
    description: 'Astronomers report the cosmic Perseids meteor shower is shining at maximum bright visibility at 3:00 AM.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Climb onto the roof with a hot vacuum flask of black tea.',
        outcomeText: 'You count forty-five burning streak meteors cut across cold velvet space! Your stress melts entirely.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 10, happiness: 30, stress: -25 });
          s.log.push(`Age ${s.characterInfo.age}: Observed midnight meteor showers from building roof concrete grids.`);
        }
      },
      {
        choiceText: 'Sleep deeply inside your soft bed sheet lanes.',
        outcomeText: 'You rest beautifully, waking with zero fatigue and full physical focus for morning tasks.',
        effect: (s: CharacterState) => {
          adjustStats(s, { health: 15, stress: -15 });
          s.log.push(`Age ${s.characterInfo.age}: Prioritized natural dark sleep during cosmic astronomical event days.`);
        }
      },
      {
        choiceText: 'Host a late astronomy rooftop party with matching beers.',
        outcomeText: 'You spend sixty bucks. Your friends toast under falling sparks, creating legendary youth memories.',
        effect: (s: CharacterState) => {
          adjustStats(s, { looks: 10, happiness: 25 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 60, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Hosted cosmic rooftop gathering during annual meteor showers (-$60).`);
        }
      }
    ]
  },
  {
    id: 'yp1_urb_33',
    title: 'The Antique Brass Coin Purchase 🪙',
    description: 'An old coin merchant labels a heavy, green-oxidized ancient Roman coin for fifty dollars inside the market stalls.',
    category: 'Adulthood',
    condition: (s: CharacterState) => {
      const age = s.characterInfo?.age;
      return age !== undefined && age >= 18 && age <= 25;
    },
    choices: [
      {
        choiceText: 'Buy the oxidized Roman brass coin and analyze the caesar names.',
        outcomeText: 'Your studies show it is a genuine Trajan sestertius from 115 AD! It sitting in your palm, highly prestigious.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 25, looks: 15, happiness: 20 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 50, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Collected ancient Roman bronze sesterces from local coin dealers (-$50).`);
        }
      },
      {
        choiceText: 'Flip the coin to museum numismatics collectors.',
        outcomeText: 'A state curator appraises the brass, writing an immediate check of six hundred dollars for museum cases.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 20 });
          s.finances.cashBalance = Math.min(s.finances.cashBalance + 600, 20000000);
          s.log.push(`Age ${s.characterInfo.age}: Sold rare numismatic bronze Roman coins to authorized estate curators (+$600).`);
        }
      },
      {
        choiceText: 'Bargain aggressively to secure the brass coin for twenty bucks.',
        outcomeText: 'The dealer yields to your economic logic. You walk home with incredibly cheap ancient historical assets.',
        effect: (s: CharacterState) => {
          adjustStats(s, { smarts: 15, happiness: 10 });
          s.finances.cashBalance = Math.max(s.finances.cashBalance - 20, -500000);
          s.log.push(`Age ${s.characterInfo.age}: Haggled flea dealers, securing Roman metals for low dollar values (-$20).`);
        }
      }
    ]
  }
];


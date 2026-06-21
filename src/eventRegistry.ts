/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameEvent } from './types';
import { adjustStats, formatCurrency } from './utils';

export const EVENT_REGISTRY: GameEvent[] = [
  // --- CHILDHOOD EVENTS (Ages 0-11) ---
  {
    id: 'vaccination_day',
    title: 'Vaccination Day 💉',
    description: 'Your dad takes you to the pediatrician for your toddler booster shots. The giant needle is gleaming in the cold hospital light.',
    category: 'Childhood',
    condition: (state) => state.characterInfo?.age >= 1 && state.characterInfo?.age <= 4,
    choices: [
      {
        choiceText: 'Bite the doctor\'s leg hard!',
        outcomeText: 'You chomped down on the pediatrician\'s shin. Chaos ensued, causing your dad to turn red from embarrassment.',
        effect: (state) => {
          adjustStats(state, { happiness: 10, health: 5, karma: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You bit the doctor during your vaccination. Your karma took a hit!`);
        }
      },
      {
        choiceText: 'Cry your heart out 😭',
        outcomeText: 'You squealed like a tea kettle. The nurse felt bad and gave you two cherry-flavored stickers.',
        effect: (state) => {
          adjustStats(state, { happiness: -5, health: 10, looks: -2 });
          state.log.push(`Age ${state.characterInfo.age}: You wept loudly at the hospital but received double stickers.`);
        }
      },
      {
        choiceText: 'Stay brave and demand a sweet lollipop 🍭',
        outcomeText: 'You didn\'t flinch! The doctor praised your legendary bravery and gave you a massive blue raspberry lollipop.',
        effect: (state) => {
          adjustStats(state, { happiness: 25, smarts: 5, karma: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You stood tall, braving the doctor’s shot like a hero, earning a lollipop.`);
        }
      }
    ]
  },
  {
    id: 'dirty_toy',
    title: 'A Forbidden Snack 🧸',
    description: 'You found a muddy, plastic dinosaur in the playground. It has some questionable green moss growing on its tail.',
    category: 'Childhood',
    condition: (state) => state.characterInfo?.age >= 2 && state.characterInfo?.age <= 5,
    choices: [
      {
        choiceText: 'Suck on its tail to ingest beneficial bacteria.',
        outcomeText: 'Yuk! You instantly got food poisoning. You threw up all over your favorite cartoon character shirt.',
        effect: (state) => {
          adjustStats(state, { happiness: -20, health: -30, smarts: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You ate dirt off a plastic dino. You developed a nasty stomach bug.`);
        }
      },
      {
        choiceText: 'Hand it over to your mom as a precious relic.',
        outcomeText: 'Your mom thanked you, sanitized it, and congratulated you for not putting dirty things in your mouth!',
        effect: (state) => {
          adjustStats(state, { happiness: 10, smarts: 10, karma: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You responsibly gifted a dirty toy to your mother.`);
        }
      },
      {
        choiceText: 'Throw it directly at the barking dog nearby!',
        outcomeText: 'Direct hit! The dog ran off whimpering, but your dad grounded you for hostile playground behavior.',
        effect: (state) => {
          adjustStats(state, { happiness: 15, karma: -20 });
          state.log.push(`Age ${state.characterInfo.age}: You hurled a toy at a local dog. Mischief was high.`);
        }
      }
    ]
  },
  {
    id: 'first_word_choice',
    title: 'The Golden Word 🗣️',
    description: 'Your parents are leaning over your crib blockading you with cellphones, coaxing you to say your very first words.',
    category: 'Childhood',
    condition: (state) => state.characterInfo?.age === 1,
    choices: [
      {
        choiceText: 'Say "Dada" or "Mama"',
        outcomeText: 'Your parents burst into tears of pure joy, instantly buying you a premium musical baby mobile!',
        effect: (state) => {
          adjustStats(state, { happiness: 15, smarts: 5, karma: 10 });
          state.log.push('Age 1: You said your very first word: "Mama". Your parents rejoiced!');
        }
      },
      {
        choiceText: 'Say "Money 💵"',
        outcomeText: 'Your father paused, deeply concerned but strangely proud of your entrepreneurial spirit.',
        effect: (state) => {
          adjustStats(state, { happiness: 10, smarts: 15 });
          state.finances.cashBalance += 50; // A tiny cash boost!
          state.log.push('Age 1: Your first word was "Money". You were gifted a baby-wallet containing a $50 bill.');
        }
      },
      {
        choiceText: 'Blow a giant spit bubble instead',
        outcomeText: 'The spit bubble popped on your nose. Everyone laughed warmly at your silly antics.',
        effect: (state) => {
          adjustStats(state, { looks: 5, happiness: 5 });
          state.log.push('Age 1: You blew a masterpiece spit bubble. Truly historical.');
        }
      }
    ]
  },
  {
    id: 'chickenpox_outbreak',
    title: 'The Red Spot Outbreak 🔴',
    description: 'You woke up with a high fever and dozens of terribly itchy red spots on your chest. You have caught the Chickenpox!',
    category: 'Childhood',
    condition: (state) => state.characterInfo?.age >= 3 && state.characterInfo?.age <= 7,
    choices: [
      {
        choiceText: 'Scratch the spots relentlessly!',
        outcomeText: 'You scratched them open. You felt temporary relief, but it left permanent tiny scars on your cheeks.',
        effect: (state) => {
          adjustStats(state, { happiness: -5, health: -15, looks: -12 });
          state.log.push(`Age ${state.characterInfo.age}: You scratched your Chickenpox spots, resulting in light scarring.`);
        }
      },
      {
        choiceText: 'Cooperate with mom as she applies calamine lotion.',
        outcomeText: 'The pink lotion is cold and smells funny, but it completely soothes the burning itch. You recover quickly.',
        effect: (state) => {
          adjustStats(state, { happiness: 10, health: 15, karma: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Your mother applied soothing calamine lotion and you weathered the chickenpox smoothly.`);
        }
      },
      {
        choiceText: 'Scream and rebel against oatmeal baths.',
        outcomeText: 'You threw a massive tantrum, splashing sticky oatmeal water all over the bathroom. Your parents are exhausted.',
        effect: (state) => {
          adjustStats(state, { happiness: -15, health: -5, karma: -10 });
          // Deduct relations with parents slightly
          state.relationships.forEach(npc => {
            if (npc.relationshipType === 'Parent') npc.relationshipValue = Math.max(0, npc.relationshipValue - 8);
          });
          state.log.push(`Age ${state.characterInfo.age}: You threw an oatmeal bath tantrum. Your parents were deeply frustrated.`);
        }
      }
    ]
  },
  {
    id: 'stolen_crayon',
    title: 'The Golden Crayon ✏️',
    description: 'During kindergarten free-play, you spot the highly coveted, ultra-rare sparkly Golden Crayon sitting unattended on Timmy\'s desk.',
    category: 'Childhood',
    condition: (state) => state.characterInfo?.age >= 4 && state.characterInfo?.age <= 6,
    choices: [
      {
        choiceText: 'Pocket it secretly and lie if questioned.',
        outcomeText: 'You drew the most beautiful glowing space rocket with it. Timmy cried, but you got away with artistic theft.',
        effect: (state) => {
          adjustStats(state, { happiness: 20, smarts: 5, karma: -20 });
          state.log.push(`Age ${state.characterInfo.age}: You pilfered Timmy\'s Golden Crayon to draw rockets. Guilty luxury.`);
        }
      },
      {
        choiceText: 'Leave it there and use a regular yellow crayon.',
        outcomeText: 'Your simple yellow crayon drawing is humble but tidy. Your conscience is clean and peaceful.',
        effect: (state) => {
          adjustStats(state, { karma: 15, smarts: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You resisted temptation and drew with standard crayons.`);
        }
      },
      {
        choiceText: 'Trade your half-eaten chocolate chip cookie for it.',
        outcomeText: 'Timmy enthusiastically accepted! You did a clean trade and got the golden crayon fair and square.',
        effect: (state) => {
          adjustStats(state, { happiness: 15, karma: 10, looks: -2 }); // cookie gone!
          state.log.push(`Age ${state.characterInfo.age}: You traded a cookie for the school\'s legendary Golden Crayon.`);
        }
      }
    ]
  },
  {
    id: 'flu_fever',
    title: 'Winter Shivers 🤒',
    description: 'A brutal winter flu is sweeping through school. You wake up with chattering teeth, a runny nose, and a 102°F fever.',
    category: 'Childhood',
    condition: (state) => state.characterInfo?.age >= 6 && state.characterInfo?.age <= 10,
    choices: [
      {
        choiceText: 'Stay in bed wrapped up, sipping hot chicken soup 🍲',
        outcomeText: 'You rested and watched cartoons all day. The soup soothes your throat, and your temperature returns to normal.',
        effect: (state) => {
          adjustStats(state, { health: 25, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You recovered quickly from a seasonal flu by staying in bed with warm broth.`);
        }
      },
      {
        choiceText: 'Sneak outside to play with neighborhood kids in the snow anyway.',
        outcomeText: 'You had a blast for an hour, but collapsed coughing. Your flu turned into a severe chest congestion!',
        effect: (state) => {
          adjustStats(state, { health: -30, happiness: -10, smarts: -15 });
          const fluD = {
            id: `disease-flu-${Math.random()}`,
            name: 'Severe Bronchitis',
            type: 'Chronic' as const,
            healthDrainPerYear: 8,
            happinessDrainPerYear: 8,
            cureDifficulty: 'Easy' as const
          };
          state.diseases.push(fluD);
          state.log.push(`Age ${state.characterInfo.age}: You played in the snow with a fever and developed Severe Bronchitis!`);
        }
      }
    ]
  },
  {
    id: 'parent_argument',
    title: 'Echoes in the Hallway 🚪',
    description: 'You wake up at midnight to hear your parents arguing loudly in the kitchen about financial bills and dirty dishes.',
    category: 'Childhood',
    condition: (state) => state.characterInfo?.age >= 7 && state.characterInfo?.age <= 11 && state.relationships.filter(r => r.relationshipType === 'Parent' && !r.isDead).length >= 2,
    choices: [
      {
        choiceText: 'Ignorantly play on your retro gaming handheld console under the blankets 🎮',
        outcomeText: 'You beat a level of pocket monsters! The digital bleeps drowned out the yelling, keeping your mood stable.',
        effect: (state) => {
          adjustStats(state, { happiness: 5, smarts: 2, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You tuned out family arguments by playing handheld video games.`);
        }
      },
      {
        choiceText: 'Creep downstairs and tearfully ask them to stop.',
        outcomeText: 'They immediately stopped, looking incredibly remorseful. They hugged you together and promised to keep things calm.',
        effect: (state) => {
          adjustStats(state, { happiness: -10, karma: 20 });
          state.relationships.forEach(npc => {
            if (npc.relationshipType === 'Parent') npc.relationshipValue = Math.min(100, npc.relationshipValue + 15);
          });
          state.log.push(`Age ${state.characterInfo.age}: You tearfully asked your arguing parents to stop. They deeply reconciled.`);
        }
      },
      {
        choiceText: 'Sneak into the pantry and stress-eat chocolate syrup.',
        outcomeText: 'You drank raw syrup from the bottle. You felt an immediate sugar rush, but woke up with a heavy tummy ache.',
        effect: (state) => {
          adjustStats(state, { happiness: 10, health: -10, looks: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You stress-ate chocolate syrup to cope with parental arguments.`);
        }
      }
    ]
  },
  {
    id: 'dog_stray_encounter',
    title: 'The Mossy Backyard Visitor 🐕',
    description: 'A scruffy, ownerless Golden Retriever with a torn ear enters your backyard, sniffing around nervously.',
    category: 'Childhood',
    condition: (state) => state.characterInfo?.age >= 5 && state.characterInfo?.age <= 9,
    choices: [
      {
        choiceText: 'Try to pet it and pull its fluffy tail.',
        outcomeText: 'The startled dog barked and nipped your arm! You had to get three stitches and an emergency tetanus booster.',
        effect: (state) => {
          adjustStats(state, { health: -20, happiness: -15, looks: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You tried to grab a scruffy stray dog and got bitten!`);
        }
      },
      {
        choiceText: 'Bring it some leftover hotdogs from the fridge.',
        outcomeText: 'The dog happily gobbled the meat and licked your hand warmly. Your dad helped locate its owner, who rewarded you!',
        effect: (state) => {
          adjustStats(state, { happiness: 20, karma: 15 });
          state.finances.cashBalance += 50;
          state.log.push(`Age ${state.characterInfo.age}: You fed a lost dog. The owner was found and gifted you $50.`);
        }
      },
      {
        choiceText: 'Hurl pinecones at it to keep it away from the garden.',
        outcomeText: 'You chased it off with direct throws! The dog ran away whimpering. You protected the organic daisies, but felt cold.',
        effect: (state) => {
          adjustStats(state, { karma: -20, smarts: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You threw sharp pinecones at a scruffy lost dog to drive it away.`);
        }
      }
    ]
  },
  {
    id: 'swallowed_coin',
    title: 'The Shiny Quarter Dilemma 🪙',
    description: 'You were balance-holding a shiny silver 25-cent coin on your tongue to showcase a cool magic trick, and accidentally swallowed it.',
    category: 'Childhood',
    condition: (state) => state.characterInfo?.age >= 4 && state.characterInfo?.age <= 7,
    choices: [
      {
        choiceText: 'Panickingly tell your parents right away.',
        outcomeText: 'They rushed you to the hospital! The doctor took an X-ray, laughed, and prescribed plenty of fiber to let it pass naturally.',
        effect: (state) => {
          adjustStats(state, { happiness: -10, health: 10, smarts: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You swallowed a quarter but got timely medical confirmation.`);
        }
      },
      {
        choiceText: 'Keep it a secret to avoid getting grounded.',
        outcomeText: 'Fortunately, it passed safely without blockage. You retrieved it from the toilet and felt like a modern treasure hunter.',
        effect: (state) => {
          adjustStats(state, { happiness: 15, karma: -10, smarts: -15 });
          state.finances.cashBalance += 0.25; // 25 cents cash back!
          state.log.push(`Age ${state.characterInfo.age}: You swallowed a coin and kept it secret, recovering 25 cents.`);
        }
      }
    ]
  },
  {
    id: 'birthday_party_fiasco',
    title: 'The Ultimate Party Fiasco 🎈',
    description: 'It is your 9th birthday party. All your classmates are watching as the hired clown accidentally trips and crashes into your birthday cake.',
    category: 'Childhood',
    condition: (state) => state.characterInfo?.age === 9,
    choices: [
      {
        choiceText: 'Burst out laughing and start a giant cake fight!',
        outcomeText: 'You grabbed a handful of vanilla frosting and hurled it at your best friend. The entire class joined in. It was legendary!',
        effect: (state) => {
          adjustStats(state, { happiness: 40, looks: -5, karma: 10 });
          state.log.push('Age 9: Your birthday cake got crushed, but you turned it into a stellar cake fight!');
        }
      },
      {
        choiceText: 'Scream, run to your room, and lock the door 😭',
        outcomeText: 'You sobbed in your pillows. The party was ruined, and your classmates went home early, feeling awkward.',
        effect: (state) => {
          adjustStats(state, { happiness: -30, looks: -2 });
          state.log.push('Age 9: You locked yourself in your room during your birthday party after a cake disaster.');
        }
      }
    ]
  },

  // --- ADOLESCENCE EVENTS (Ages 12-17) ---
  {
    id: 'school_bully_encounter',
    title: 'Playground Extortionist 🎒',
    description: 'A tough classmate named Tyler corners you in the hallway, aggressively demanding your lunch money.',
    category: 'School',
    condition: (state) => state.characterInfo?.age >= 7 && state.characterInfo?.age <= 13,
    choices: [
      {
        choiceText: 'Execute an epic roundhouse kick in defense!',
        outcomeText: 'You swung blind! Let\'s see what happens...',
        effect: (state) => {
          const rand = Math.random();
          if (rand > 0.4) {
            adjustStats(state, { happiness: 30, health: -5, karma: -5 });
            state.log.push(`Age ${state.characterInfo.age}: You knocked out Tyler with a roundhouse kick! Playground street-cred soared.`);
          } else {
            adjustStats(state, { happiness: -20, health: -25, looks: -10 });
            state.log.push(`Age ${state.characterInfo.age}: You tried to kick Tyler but slipped and took a black eye. Highly embarrassing.`);
          }
        }
      },
      {
        choiceText: 'Calmly report Tyler to the homeroom teacher.',
        outcomeText: 'The teacher suspended Tyler! Unfortunately, some classmates called you a teacher\'s pet.',
        effect: (state) => {
          adjustStats(state, { happiness: 5, smarts: 15, karma: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You reported Tyler the bully. You handled it with civility, but lost some cool factor.`);
        }
      },
      {
        choiceText: 'Give him the money to avoid hostilities.',
        outcomeText: 'You forfeited $10. Tyler winked and promised to rob you again tomorrow.',
        effect: (state) => {
          state.finances.cashBalance = Math.max(0, state.finances.cashBalance - 10);
          adjustStats(state, { happiness: -25, karma: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You surrendered your lunch cash to a school extortionist.`);
        }
      }
    ]
  },
  {
    id: 'driving_test_event',
    title: 'The Great Driving Exam 🚗',
    description: 'You are eligible to earn your official driver\'s license. The examiner, an incredibly grumpy old officer, steps into your sedan.',
    category: 'School',
    condition: (state) => state.characterInfo?.age >= 16 && state.characterInfo?.age <= 17 && !state.characterInfo?.hasLicense,
    choices: [
      {
        choiceText: 'Perform a flawless parallel park and follow speed limits.',
        outcomeText: 'You took it seriously! Higher smarts increases your safety clearance...',
        effect: (state) => {
          const passChance = 0.4 + (state.stats.smarts / 200); // Higher smarts = higher chance
          if (Math.random() < passChance) {
            state.characterInfo.hasLicense = true;
            adjustStats(state, { happiness: 25, smarts: 5 });
            state.log.push(`Age ${state.characterInfo.age}: You passed your driving test cleanly on the first try! Safety first.`);
          } else {
            adjustStats(state, { happiness: -15, looks: -2 });
            state.log.push(`Age ${state.characterInfo.age}: You failed your driving test because you struck a cardboard cone.`);
          }
        }
      },
      {
        choiceText: 'Slyly slide a crisp $100 bill into the center console spacer.',
        outcomeText: 'A high-risk diplomatic offer! Will the examiner accept your bribe?',
        effect: (state) => {
          if (state.finances.cashBalance < 100) {
            adjustStats(state, { happiness: -10 });
            state.log.push(`Age ${state.characterInfo.age}: You tried to bribe the driver, but you didn\'t even have $100 saved!`);
            return;
          }
          state.finances.cashBalance -= 100;
          const roll = Math.random();
          if (roll > 0.5) {
            state.characterInfo.hasLicense = true;
            adjustStats(state, { happiness: 20, karma: -35 });
            state.log.push(`Age ${state.characterInfo.age}: You successfully bribed the driving instructor for a quick license pass.`);
          } else {
            adjustStats(state, { happiness: -30, karma: -40, health: -10 });
            state.log.push(`Age ${state.characterInfo.age}: Bribe rejected! The instructor filed a formal misdemeanor police charge.`);
          }
        }
      }
    ]
  },
  {
    id: 'first_crush_note',
    title: 'A Delicate Love Note 💌',
    description: 'You have a massive crush on Jesse, the captain of the debate team. You\'ve spent three hours drafting a letter.',
    category: 'School',
    condition: (state) => state.characterInfo?.age >= 12 && state.characterInfo?.age <= 16,
    choices: [
      {
        choiceText: 'Slip it into Jesse\'s school locker during class break.',
        outcomeText: 'A bold, romantic strike! Better looks increase your mutual validation odds...',
        effect: (state) => {
          const success = Math.random() + (state.stats.looks / 300) > 0.5;
          if (success) {
            adjustStats(state, { happiness: 35, looks: 5 });
            state.log.push(`Age ${state.characterInfo.age}: Jesse received your note and asked you out! Teenage romance is alive.`);
          } else {
            adjustStats(state, { happiness: -20, smarts: -2 });
            state.log.push(`Age ${state.characterInfo.age}: Jesse posted your love note on social media. Your heart was shattered.`);
          }
        }
      },
      {
        choiceText: 'Burn the note and ignore your burning heart.',
        outcomeText: 'You safely avoided social risk but died a little bit inside.',
        effect: (state) => {
          adjustStats(state, { happiness: -10, smarts: 5, karma: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You suppressed your affection and burned your secret crush letter.`);
        }
      }
    ]
  },
  {
    id: 'high_school_drama_rumor',
    title: 'The Whispering Hallways 🗣️',
    description: 'A completely fake and defamatory rumor about you cheating on your science midterms has gone viral on school chat groups.',
    category: 'School',
    condition: (state) => state.characterInfo?.age >= 13 && state.characterInfo?.age <= 17,
    choices: [
      {
        choiceText: 'Counter-attack by spreading an even wilder rumor about the orchestrator.',
        outcomeText: 'You threw online mud! People forgot about your scientific cheating, but your overall karma plummeted.',
        effect: (state) => {
          adjustStats(state, { happiness: 10, karma: -30, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You combated school rumors by spreading nasty gossip, tanking your karma.`);
        }
      },
      {
        choiceText: 'Confront the rumors with a factual, mature scientific breakdown.',
        outcomeText: 'Your detailed presentation convinced the smart students, raising your respect and academic focus.',
        effect: (state) => {
          adjustStats(state, { smarts: 15, happiness: 10, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You dismantled high school midterms rumors with elegant clarity.`);
        }
      },
      {
        choiceText: 'Shrug it off and focus entirely on your school grades.',
        outcomeText: 'By completely ignoring it, the haters got bored. Your grades soared while maintaining perfect maturity.',
        effect: (state) => {
          adjustStats(state, { smarts: 10, karma: 15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You ignored the class drama and focused tightly on your coursework.`);
        }
      }
    ]
  },
  {
    id: 'part_time_cashier',
    title: 'Part-Time Wallet Filler? 🍔',
    description: 'A local burger franchise "McDonut" is hiring part-time high school cashiers for $3,600 a year, but it takes 15 hours a week of study time.',
    category: 'School',
    condition: (state) => state.characterInfo?.age >= 14 && state.characterInfo?.age <= 17,
    choices: [
      {
        choiceText: 'Take the job! Fill up your physical wallet. ($3,600 bonus, decreases smarts slightly)',
        outcomeText: 'You flip patties and serve fries. Your feet ache, but you are officially earning a regular income!',
        effect: (state) => {
          state.finances.cashBalance += 3600;
          adjustStats(state, { smarts: -8, happiness: 5, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: Worked a grueling part-time shift at McDonut, boosting cash reserve.`);
        }
      },
      {
        choiceText: 'Reject work and focus on securing college scholarships.',
        outcomeText: 'You spend free hours reading textbooks. Your grades look highly competitive, but you are flat broke.',
        effect: (state) => {
          adjustStats(state, { smarts: 20, happiness: -5, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Rejected part-time fryer labor to maximize academic prospects.`);
        }
      }
    ]
  },
  {
    id: 'vape_peer_pressure',
    title: 'The Back Alley Vapor Offer 💨',
    description: 'A group of older kids corners you behind the gym, waving a glowing, mango-scented electronic vape in your face. "Take a rip, don\'t be a baby."',
    category: 'School',
    condition: (state) => state.characterInfo?.age >= 12 && state.characterInfo?.age <= 17,
    choices: [
      {
        choiceText: 'Accept the mango cloud and inhale deeply!',
        outcomeText: 'You coughed like crazy, but the older kids patted your back. 25% chance of developing a lasting addiction...',
        effect: (state) => {
          adjustStats(state, { happiness: 15, looks: -5, health: -10 });
          const addictionRoll = Math.random();
          if (addictionRoll < 0.25) {
            state.diseases.push({
              id: `disease-nicotine-${Math.random()}`,
              name: 'Nicotine Addiction',
              type: 'Addiction',
              healthDrainPerYear: 6,
              happinessDrainPerYear: 5,
              cureDifficulty: 'Medium'
            });
            state.log.push(`Age ${state.characterInfo.age}: [ADDICTIONS] You developed a physical Nicotine Addiction!`);
          } else {
            state.log.push(`Age ${state.characterInfo.age}: You tried vaping. You avoided physical dependency but damaged your lungs.`);
          }
        }
      },
      {
        choiceText: 'Boldly say "No" and leave the alley.',
        outcomeText: 'They laughed and called you names, but you walk away with intact lungs and highly fortified iron resolve.',
        effect: (state) => {
          adjustStats(state, { health: 10, smarts: 10, karma: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You proudly declined vaping peer pressure. Sturdy lungs maintained!`);
        }
      },
      {
        choiceText: 'Explain the heavy chemical dangers of diacetyl in vape juices.',
        outcomeText: 'They threw a juice container at you and ran off. You were labelled a legendary science nerd, but details survived.',
        effect: (state) => {
          adjustStats(state, { smarts: 20, karma: 5, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You lectured peer-pressurers on diacetyl chemicals.`);
        }
      }
    ]
  },
  {
    id: 'fake_id_quest',
    title: 'Forgery Quest 🆔',
    description: 'Your high school peers are planning a legendary college nightclub run. A digital forgery expert offers a counterfeit ID card for $300 cash.',
    category: 'School',
    condition: (state) => state.characterInfo?.age >= 15 && state.characterInfo?.age <= 17 && state.finances.cashBalance >= 300,
    choices: [
      {
        choiceText: 'Buy the fake ID! (-$300, risk of criminal record)',
        outcomeText: 'The printed card looks passable, but contains a typo "Bardon Miller." Let\'s see if you get busted...',
        effect: (state) => {
          state.finances.cashBalance -= 300;
          const arrestRoll = Math.random();
          if (arrestRoll < 0.3) {
            state.criminalRecord.push('Minor Forgery (Counterfeit Identity)');
            adjustStats(state, { happiness: -30, karma: -25, stress: 25 });
            state.log.push(`Age ${state.characterInfo.age}: [ARRESTED] Cops raided your ID drop! You were arrested for forgery and acquired a criminal record!`);
          } else {
            adjustStats(state, { happiness: 25, looks: 5 });
            state.log.push(`Age ${state.characterInfo.age}: Bought a fake ID card successfully. You snuck into college lounges undetected.`);
          }
        }
      },
      {
        choiceText: 'Pass on the forgery offer and stay home.',
        outcomeText: 'You spent the evening eating homemade pizza and studying biology. Cozy and secure.',
        effect: (state) => {
          adjustStats(state, { smarts: 10, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Declined to pursue a fraudulent fake ID card.`);
        }
      }
    ]
  },
  {
    id: 'school_prank_fiasco',
    title: 'Bubble Swimming Pool 🫧',
    description: 'A devious crowd proposes dumping three sacks of industrial detergent slurry into the school indoor swimming pool tonight.',
    category: 'School',
    condition: (state) => state.characterInfo?.age >= 14 && state.characterInfo?.age <= 17,
    choices: [
      {
        choiceText: 'Lead the prank! (High risk or legendary status)',
        outcomeText: 'You dumped the sacks! The entire pool building turned into a 15-foot high bubble bath. Will school cameras identify you?',
        effect: (state) => {
          const caught = Math.random() > 0.4;
          if (caught) {
            adjustStats(state, { happiness: -35, karma: -15, stress: 30 });
            // Drop grades heavily
            if (state.education) {
              state.education.grades = Math.max(0, state.education.grades - 20);
            }
            state.log.push(`Age ${state.characterInfo.age}: [SUSPENDED] School cameras caught you dumping soap! You were suspended, degrading your grades.`);
          } else {
            adjustStats(state, { happiness: 45, karma: -10, looks: 15 });
            state.log.push(`Age ${state.characterInfo.age}: The bubble prank succeeded! You became an overnight school legend, escaping detection.`);
          }
        }
      },
      {
        choiceText: 'Decline to participate in vandalism.',
        outcomeText: 'You played it completely safe. The pool was ruined for three weeks, but your record is crystal clean.',
        effect: (state) => {
          adjustStats(state, { karma: 20 });
          state.log.push(`Age ${state.characterInfo.age}: You walked away from the high school pool detergent prank.`);
        }
      }
    ]
  },

  // --- EARLY ADULTHOOD EVENTS (Ages 18-30) ---
  {
    id: 'university_decision_event',
    title: 'Enrolling in College? 🎓',
    description: 'You just graduated from high school. Reputable colleges are offering a four-year bachelor program, costing $40,000 in student loans.',
    category: 'Adulthood',
    condition: (state) => state.characterInfo?.age === 18,
    choices: [
      {
        choiceText: 'Enroll in University (Increases future prospects, but adds $40k debt)',
        outcomeText: 'Welcome to student dorms! Your smarts and debt grew instantly.',
        effect: (state) => {
          state.finances.annualDebt += 3000; // annual debt payment
          adjustStats(state, { smarts: 35, happiness: 10 });
          state.characterInfo.currentOccupation = 'Student';
          if (state.education) {
            state.education.currentStage = 'University';
            state.education.yearsRemaining = 4;
            state.education.currentMajor = 'General Studies';
          }
          state.log.push('Age 18: You enrolled in University to pursue higher learning, taking on tuition loans.');
        }
      },
      {
        choiceText: 'Apply for regular full-time jobs right away',
        outcomeText: 'You hit the blue-collar job market to stack coins immediately.',
        effect: (state) => {
          adjustStats(state, { smarts: -5, happiness: 5 });
          state.log.push('Age 18: You skipped college to enter the real-world workforce immediately.');
        }
      },
      {
        choiceText: 'Spend your small savings backpacking through Europe 🎒',
        outcomeText: 'You spent $3,000 in hostels, expanding your mind and meeting wonderful backpackers.',
        effect: (state) => {
          state.finances.cashBalance = Math.max(0, state.finances.cashBalance - 3000);
          adjustStats(state, { happiness: 40, health: 5, smarts: 15, looks: 5 });
          state.log.push('Age 18: You took a wild gap year wandering the streets of Paris and Berlin.');
        }
      }
    ]
  },
  {
    id: 'sports_car_sale',
    title: 'Midlife Metal Beast 🏎️',
    description: 'A glowing, cherry-red classic V8 convertible sports car is glistening at the local dealership. You are sorely tempted.',
    category: 'Adulthood',
    condition: (state) => state.characterInfo?.age >= 25 && state.characterInfo?.age <= 60 && state.finances.cashBalance >= 20000,
    choices: [
      {
        choiceText: 'Purchase the V8 Beast! (-$18,000 cash, -$1,800 annual upkeep)',
        outcomeText: 'The roaring engine makes you feel like an absolute champion! Your smiles are vast.',
        effect: (state) => {
          state.finances.cashBalance -= 18000;
          const carId = Math.random().toString(36).substr(2, 9);
          state.assets.push({
            id: carId,
            name: 'Cherry Red V8 Roadster',
            type: 'vehicle',
            purchasePrice: 18000,
            currentValue: 18000,
            annualUpkeep: 1800,
            isFinanced: false,
            loanDetails: null,
          });
          adjustStats(state, { happiness: 40, looks: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You bought a classic red V8 Roadster! Speeding down winding highways feels epic.`);
        }
      },
      {
        choiceText: 'Ignore vanity and leave your savings in index funds',
        outcomeText: 'You chose financial maturity. Your future bank account thanks you.',
        effect: (state) => {
          adjustStats(state, { happiness: -5, smarts: 10, karma: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You resisted buying the flashy sports convertible.`);
        }
      }
    ]
  },
  {
    id: 'lottery_fever',
    title: 'Lotto Fever! 🎫',
    description: 'The mega-lotto jackpot has breached $10,000,000! Convenience stores have lines winding around the block.',
    category: 'Special',
    condition: (state) => state.characterInfo?.age >= 18 && state.finances.cashBalance >= 20,
    choices: [
      {
        choiceText: 'Purchase 5 Quick-Pick Tickets (-$10)',
        outcomeText: 'Let\'s run the probability engine. Success odds are extremely slim...',
        effect: (state) => {
          state.finances.cashBalance -= 10;
          const rolls = Math.random();
          if (rolls < 0.005) { // 0.5% chance to win huge
            const winnings = 5000000;
            state.finances.cashBalance += winnings;
            adjustStats(state, { happiness: 50, smarts: 5 });
            state.log.push(`Age ${state.characterInfo.age}: CRITICAL WIN! You matched all numbers on your jackpot card, winning ${formatCurrency(winnings)}!!`);
          } else if (rolls < 0.15) { // 15% chance to win small
            const winnings = 250;
            state.finances.cashBalance += winnings;
            adjustStats(state, { happiness: 15 });
            state.log.push(`Age ${state.characterInfo.age}: You won a minor lotto tier payout of ${formatCurrency(winnings)}!`);
          } else {
            adjustStats(state, { happiness: -5 });
            state.log.push(`Age ${state.characterInfo.age}: You bought a handful of lottery tickets but won absolutely nothing.`);
          }
        }
      },
      {
        choiceText: 'Walk away. The lottery is a tax on bad math.',
        outcomeText: 'Your high IQ prevents you from gambling on microscopic percentages.',
        effect: (state) => {
          adjustStats(state, { smarts: 8 });
          state.log.push(`Age ${state.characterInfo.age}: You walked past the lottery kiosk feeling smugly intelligent.`);
        }
      }
    ]
  },
  {
    id: 'co-worker_sabotage',
    title: 'Workplace Sabotage 📑',
    description: 'Your colleague Greg left his master design document unlocked. Your boss is looking to promote someone tomorrow.',
    category: 'Adulthood',
    condition: (state) => state.characterInfo?.age >= 21 && state.characterInfo?.currentOccupation !== 'Unemployed' && state.characterInfo?.currentOccupation !== 'Student' && state.characterInfo?.currentOccupation !== 'Baby' && !state.characterInfo?.currentOccupation?.includes('Student') && !state.characterInfo?.currentOccupation?.includes('Prisoner'),
    choices: [
      {
        choiceText: 'Erase Greg\'s name, write your name, and submit!',
        outcomeText: 'An incredibly cutthroat maneuver. Calculating corporate catch parameters...',
        effect: (state) => {
          const caught = Math.random() > 0.6;
          if (caught) {
            state.characterInfo.currentOccupation = 'Unemployed';
            state.finances.annualSalary = 0;
            adjustStats(state, { happiness: -40, karma: -45, looks: -5 });
            state.log.push(`Age ${state.characterInfo.age}: Caught committing fraud! You were fired from your job and blacklisted.`);
          } else {
            state.finances.annualSalary = Math.round(state.finances.annualSalary * 1.5);
            adjustStats(state, { happiness: 25, karma: -50, smarts: 5 });
            state.log.push(`Age ${state.characterInfo.age}: You stole Greg\'s proposal successfully and secured a massive raise!`);
          }
        }
      },
      {
        choiceText: 'Help Greg fix structural typos and share the credit.',
        outcomeText: 'You teamed up. Greg is deeply appreciative of your legendary solidarity.',
        effect: (state) => {
          state.finances.annualSalary = Math.round(state.finances.annualSalary * 1.15);
          adjustStats(state, { happiness: 15, karma: 35, smarts: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You collaborated with Greg. The boss promoted you both for incredible team spirit!`);
        }
      }
    ]
  },
  {
    id: 'casino_night_blackjack',
    title: 'Casino Night 🃏',
    description: 'A glossy brick casino has opened down the street. The bright neon lights are inviting you to the slot machines and Blackjack.',
    category: 'Special',
    condition: (state) => state.characterInfo?.age >= 18 && state.finances.cashBalance >= 2000,
    choices: [
      {
        choiceText: 'Put $2,000 on Blackjack!',
        outcomeText: 'The dealer flips an Ace. You hold a hard 16. Let\'s see the cards...',
        effect: (state) => {
          state.finances.cashBalance -= 2000;
          const playerWins = Math.random() > 0.52; // House edge slightly favors house
          if (playerWins) {
            state.finances.cashBalance += 4000;
            adjustStats(state, { happiness: 30, health: -2 });
            state.log.push(`Age ${state.characterInfo.age}: You hit a double-down on Blackjack, netting $4,000 in tax-free chips!`);
          } else {
            adjustStats(state, { happiness: -20, health: -5 });
            state.log.push(`Age ${state.characterInfo.age}: You lost $2,000 in a heavy hand of casino Blackjack.`);
          }

          if (!state.diseases) {
            state.diseases = [];
          }
          const possessesGamblingAddic = state.diseases.some(d => d.name === 'Gambling Addiction');
          if (!possessesGamblingAddic && Math.random() < 0.15) {
            state.diseases.push({
              id: `disease-addiction-gambling-${Math.random()}`,
              name: 'Gambling Addiction',
              type: 'Addiction',
              healthDrainPerYear: 5,
              happinessDrainPerYear: 10,
              cureDifficulty: 'Hard'
            });
            state.log.push(`Age ${state.characterInfo.age}: [ADDICTIONS] The rush of high-stakes play has triggered a Gambling Addiction!`);
          }
        }
      },
      {
        choiceText: 'Order a ginger ale and watch from a safe distance.',
        outcomeText: 'You enjoyed the free dynamic atmosphere without wasting a single penny.',
        effect: (state) => {
          adjustStats(state, { happiness: 5, smarts: 5, karma: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You attended the casino but resisted placing risky wagers.`);
        }
      }
    ]
  },
  {
    id: 'condo_purchase_deal',
    title: 'Modern Highrise Condo 🏢',
    description: 'An elegant 2-bedroom metropolitan apartment with skyline views is listed at a discount due to a liquidation sale.',
    category: 'Adulthood',
    condition: (state) => state.characterInfo?.age >= 23 && state.finances.cashBalance >= 60000,
    choices: [
      {
        choiceText: 'Buy the Condo! (-$50,000 Cash, -$2,200 annual Upkeep Agency fees)',
        outcomeText: 'You sign the deeds and step onto your private balcony! Your self-esteem is off the charts.',
        effect: (state) => {
          state.finances.cashBalance -= 50000;
          const condoId = Math.random().toString(36).substr(2, 9);
          state.assets.push({
            id: condoId,
            name: 'Metropolitan Highrise Condo',
            type: 'real_estate',
            purchasePrice: 50000,
            currentValue: 75000, // Instant equity value!
            annualUpkeep: 2200,
            isFinanced: false,
            loanDetails: null,
          });
          adjustStats(state, { happiness: 30, smarts: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You bought an urban Highrise Condo. Having real estate makes you feel incredibly mature.`);
        }
      },
      {
        choiceText: 'Keep renting and save your physical cash.',
        outcomeText: 'You decide to wait. The real estate market might bubble anyway.',
        effect: (state) => {
          adjustStats(state, { smarts: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You opted to skip the condo purchase and stay flexible.`);
        }
      }
    ]
  },
  {
    id: 'cryptocurrency_scam',
    title: 'The Crypto Craze 🪙',
    description: 'A childhood friend texts you, foaming at the mouth about an explosive coin: "ElonShibaMars". It claims to guarantee 100x gains.',
    category: 'Adulthood',
    condition: (state) => state.characterInfo?.age >= 18 && state.finances.cashBalance >= 5000,
    choices: [
      {
        choiceText: 'Invest $4,000 into ElonShibaMars!',
        outcomeText: 'You bought the peaks! Calculating the volatility outcome...',
        effect: (state) => {
          state.finances.cashBalance -= 4000;
          const roll = Math.random();
          if (roll > 0.85) { // 15% chance to strike luck
            const outcomeSum = 16000;
            state.finances.cashBalance += outcomeSum;
            adjustStats(state, { happiness: 45, smarts: -10 });
            state.log.push(`Age ${state.characterInfo.age}: Insane luck! ElonShibaMars rocketed, giving you ${formatCurrency(outcomeSum)} before rug pulling.`);
          } else {
            adjustStats(state, { happiness: -30, smarts: -5 });
            state.log.push(`Age ${state.characterInfo.age}: The founders deleted their social accounts. Your $4,000 was rug-pulled to zero.`);
          }
        }
      },
      {
        choiceText: 'Explain the concept of tulip mania and block their number.',
        outcomeText: 'You avoid the bubble and teach them a harsh lesson in classical economics.',
        effect: (state) => {
          adjustStats(state, { smarts: 15, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You rejected a cryptocurrency pitch and saved your funds.`);
        }
      }
    ]
  },
  {
    id: 'university_stress_burnout',
    title: 'Midterm Burnout ☕',
    description: 'Midterm exam week is here! You are staring at four thick volumes of Advanced Statistics, feeling incredibly fatigued.',
    category: 'Adulthood',
    condition: (state) => state.characterInfo?.age >= 18 && state.characterInfo?.age <= 24 && state.characterInfo?.currentOccupation === 'Student',
    choices: [
      {
        choiceText: 'Abuse caffeine tablets and stay awake for 72 hours straight!',
        outcomeText: 'You score an outstanding A+ on the tests! However, your chest is chattering and your face is breaking out.',
        effect: (state) => {
          adjustStats(state, { health: -15, stress: 35, happiness: 5 });
          if (state.education) {
            state.education.grades = Math.min(100, (state.education.grades || 0) + 12);
          }
          state.log.push(`Age ${state.characterInfo.age}: You pulled a 72-hour study bender on caffeine pills, boosting grades but spiking stress.`);
        }
      },
      {
        choiceText: 'Study a balanced 6 hours a day and sleep well.',
        outcomeText: 'Your score is solid B+ and you woke up feeling fully rested and mentally healthy.',
        effect: (state) => {
          adjustStats(state, { health: 10, stress: -15, smarts: 5 });
          if (state.education) {
            state.education.grades = Math.min(100, (state.education.grades || 0) + 4);
          }
          state.log.push(`Age ${state.characterInfo.age}: Handled midterm preparations with stable rest and routine.`);
        }
      },
      {
        choiceText: 'Pay an undergraduate nerd $500 to sneak you cheat sheets.',
        outcomeText: 'Let\'s run the test security audit check...',
        effect: (state) => {
          if (state.finances.cashBalance < 500) {
            adjustStats(state, { stress: 10 });
            state.log.push(`Age ${state.characterInfo.age}: You couldn\'t afford to hire a test cheat.`);
            return;
          }
          state.finances.cashBalance -= 500;
          const caught = Math.random() < 0.25;
          if (caught) {
            adjustStats(state, { happiness: -40, karma: -30, stress: 30 });
            if (state.education) {
              state.education.grades = Math.max(0, state.education.grades - 30);
            }
            state.log.push(`Age ${state.characterInfo.age}: [DISCIPLINARY] Caught using cheat sheets! You were given a zero and suspended.`);
          } else {
            adjustStats(state, { happiness: 20, karma: -20 });
            if (state.education) {
              state.education.grades = Math.min(100, (state.education.grades || 0) + 15);
            }
            state.log.push(`Age ${state.characterInfo.age}: Snuck cheat sheets onto statistics midterm successfully.`);
          }
        }
      }
    ]
  },
  {
    id: 'toxic_boss_demands',
    title: 'The Weekend Memo 📧',
    description: 'Your tyrannical division head, Mr. Stone, sends a midnight mail: "Mandatory voluntary weekend audits. Be at your desks Saturday 7 AM or re-evaluate your alignment with our mission."',
    category: 'Adulthood',
    condition: (state) => state.characterInfo?.age >= 21 && state.characterInfo?.currentOccupation !== 'Unemployed' && state.characterInfo?.currentOccupation !== 'Student' && state.characterInfo?.currentOccupation !== 'Baby' && !state.characterInfo?.currentOccupation?.includes('Prisoner'),
    choices: [
      {
        choiceText: 'Show up, grin, and work 14 hours on Saturday.',
        outcomeText: 'Mr. Stone winks and puts you on his promo track, but your weekend is destroyed. Your high stress limits your brain.',
        effect: (state) => {
          adjustStats(state, { stress: 30, health: -8, happiness: -15 });
          state.finances.annualSalary = Math.round(state.finances.annualSalary * 1.12);
          state.log.push(`Age ${state.characterInfo.age}: Swallowed your workplace pride to work extreme weekend hours, earning a 12% raise.`);
        }
      },
      {
        choiceText: 'Decline and send a polite note about pre-existing family boundaries.',
        outcomeText: 'Stone calls you "low motivation" in corporate syncs, but you enjoy beautiful sunny walks with friends.',
        effect: (state) => {
          adjustStats(state, { stress: -15, happiness: 15, karma: 10 });
          state.log.push(`Age ${state.characterInfo.age}: Stood your ground regarding overtime boundaries. Mental health protected.`);
        }
      },
      {
        choiceText: 'Submit a dramatic resignation letter right away!',
        outcomeText: 'You pack your desktop decor into a cardboard box and march out. Clean freedom, but you are officially Unemployed.',
        effect: (state) => {
          state.characterInfo.currentOccupation = 'Unemployed';
          state.finances.annualSalary = 0;
          adjustStats(state, { stress: -30, happiness: 20 });
          state.log.push(`Age ${state.characterInfo.age}: Resigned from corporate toxic job to secure personal sovereignty!`);
        }
      }
    ]
  },
  {
    id: 'partner_wedding_proposal',
    title: 'A Ring of Fire? 💍',
    description: 'You have been dating your partner for three years. Deep down, they are sending extreme hints about wedding vows and marriage bells.',
    category: 'Adulthood',
    condition: (state) => state.characterInfo?.age >= 18 && state.maritalStatus === 'Dating' && state.relationships.some(npc => npc.relationshipType === 'Partner' && !npc.isDead),
    choices: [
      {
        choiceText: 'Buy a luxury sparkler diamond ring (-$6,000 cash) and propose on one knee!',
        outcomeText: 'They broke into joyful tears, screaming "YES!" and hugging you tight. You are officially engaged!',
        effect: (state) => {
          state.finances.cashBalance = Math.max(0, state.finances.cashBalance - 6000);
          adjustStats(state, { happiness: 45, looks: 5 });
          state.maritalStatus = 'Married';
          state.log.push(`Age ${state.characterInfo.age}: [MARRIAGE] You proposed with a luxury diamond and successfully married your partner!`);
        }
      },
      {
        choiceText: 'Propose with a simple handmade copper wire coil.',
        outcomeText: 'They paused, looking highly disappointed. "Is this a gag joke?" 50% chance they dump you right here...',
        effect: (state) => {
          const broken = Math.random() < 0.5;
          if (broken) {
            state.maritalStatus = 'Single';
            // Remove Partner npc
            state.relationships = state.relationships.filter(npc => npc.relationshipType !== 'Partner');
            adjustStats(state, { happiness: -40, looks: -5 });
            state.log.push(`Age ${state.characterInfo.age}: [BROKEN UP] Your cheap copper proposal was rejected, leading to a catastrophic breakup.`);
          } else {
            adjustStats(state, { happiness: 15, karma: 15 });
            state.log.push(`Age ${state.characterInfo.age}: They accepted your modest handmade proposal, laughing at your eccentric nature.`);
          }
        }
      },
      {
        choiceText: 'Tell them you are dedicated to your bachelor status forever.',
        outcomeText: 'They sighed, packed their things, and told you to find someone else. Solid freedom, but deep silence.',
        effect: (state) => {
          state.maritalStatus = 'Single';
          state.relationships = state.relationships.filter(npc => npc.relationshipType !== 'Partner');
          adjustStats(state, { happiness: -15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You announced perpetual bachelor beliefs, prompting your partner to leave.`);
        }
      }
    ]
  },
  {
    id: 'roommate_milk_ bandit',
    title: 'Fridge Espionage 🥛',
    description: 'Your high-stress roommate Dave has repeatedly consumed your premium, double-filtered organic whole milk, leaving empty jugs in the shared fridge.',
    category: 'Adulthood',
    condition: (state) => state.characterInfo?.age >= 18 && state.characterInfo?.age <= 25 && state.finances.cashBalance >= 50,
    choices: [
      {
        choiceText: 'Post an aggressive, color-coded sticky warning on the fridge handle.',
        outcomeText: 'Dave read the note, chuckled, and drank your apple cider instead. Mild stress levels recorded.',
        effect: (state) => {
          adjustStats(state, { stress: 5, smarts: -2 });
          state.log.push(`Age ${state.characterInfo.age}: Left a hostile note on the fridge. dave bypassed it cleanly.`);
        }
      },
      {
        choiceText: 'Slyly syringe a dozen drops of fiery Carolina Reaper pepper sauce into the carton.',
        outcomeText: 'Vengeance! Dave drank it at 3 AM and woke up the landing with frantic screaming. He never touched your cartons again!',
        effect: (state) => {
          adjustStats(state, { happiness: 30, karma: -35, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Trapped your shared milk with Carolina Reaper extract. Cruel, but highly effective.`);
        }
      },
      {
        choiceText: 'Spend $150 to install a premium combination padlock fridge locker cage.',
        outcomeText: 'Dave called you an absolute paranoid nerd, but your bottles are physically locked away forever.',
        effect: (state) => {
          state.finances.cashBalance -= 150;
          adjustStats(state, { smarts: 10, stress: -20 });
          state.log.push(`Age ${state.characterInfo.age}: Safely locked away your grocery supplies inside a combination cage.`);
        }
      }
    ]
  },
  {
    id: 'side_hustle_course',
    title: 'Dropshipping Guru 📈',
    description: 'A Lamborghini-owning influencer with heavy gold chains offers a $1,200 "E-Commerce Masterclass" promising $10k recurring passive cash.',
    category: 'Adulthood',
    condition: (state) => state.characterInfo?.age >= 19 && state.characterInfo?.age <= 29 && state.finances.cashBalance >= 1200,
    choices: [
      {
        choiceText: 'Buy the course and work 16 hours a day building websites (-$1,200 cash)',
        outcomeText: 'Let\'s run the statistical hustle check...',
        effect: (state) => {
          state.finances.cashBalance -= 1,200;
          const successfulHustle = Math.random() < 0.20; // 20% success rate
          if (successfulHustle) {
            const loot = Math.floor(Math.random() * 25000) + 15000;
            state.finances.cashBalance += loot;
            adjustStats(state, { happiness: 35, smarts: 15, stress: 30 });
            state.log.push(`Age ${state.characterInfo.age}: Your e-com side hustle exploded! You netted a spectacular ${formatCurrency(loot)} in sales!`);
          } else {
            adjustStats(state, { happiness: -25, stress: 20 });
            state.log.push(`Age ${state.characterInfo.age}: You worked endless nights but made 0 sales. The e-com course was a absolute waste.`);
          }
        }
      },
      {
        choiceText: 'Politely close the browser and invest that cash in standard indexes.',
        outcomeText: 'Your long-term financial sobriety prevails over rapid lamborghini dreams.',
        effect: (state) => {
          adjustStats(state, { smarts: 12 });
          state.log.push(`Age ${state.characterInfo.age}: Ignored flashy digital Guru ads to stick to balanced savings.`);
        }
      }
    ]
  },

  // --- LATER LIFE EVENTS (Ages 31+) ---
  {
    id: 'health_crisis_scare',
    title: 'Persistent Chest Pains 🩺',
    description: 'For three weeks, you have experienced a tight ache in your chest. A specialized private clinic offers full-body scan scans for $2,500.',
    category: 'Adulthood',
    condition: (state) => state.characterInfo?.age >= 45,
    choices: [
      {
        choiceText: 'Pay the $2,500 for a thorough medical checkup.',
        outcomeText: 'The scan caught early-stage cardiovascular blockages and cured it!',
        effect: (state) => {
          state.finances.cashBalance = Math.max(0, state.finances.cashBalance - 2500);
          adjustStats(state, { health: 40, happiness: 10, smarts: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You paid for a premium diagnostic chest scan. It successfully cleared a hidden blockage!`);
        }
      },
      {
        choiceText: 'Ignore the ache and drink some warm green tea instead.',
        outcomeText: 'Calculating cardiovascular strain...',
        effect: (state) => {
          adjustStats(state, { health: -35, happiness: -15, smarts: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You ignored major cardiovascular warning signs. Your arteries took severe hits.`);
        }
      }
    ]
  },
  {
    id: 'midlife_yogi',
    title: 'Midlife Spiritual Calling 🧘‍♂️',
    description: 'You feel a deep, nagging void in your daily routine. A holistic yoga retreat in Costa Rica is offering a 1-month immersion for $3,500.',
    category: 'Adulthood',
    condition: (state) => state.characterInfo?.age >= 35 && state.finances.cashBalance >= 3500,
    choices: [
      {
        choiceText: 'Pack your mats and head to the jungle! (-$3,500)',
        outcomeText: 'You spent a month eating papaya, meditating, and aligning your spinal columns.',
        effect: (state) => {
          state.finances.cashBalance -= 3500;
          adjustStats(state, { happiness: 40, health: 20, karma: 30 });
          state.log.push(`Age ${state.characterInfo.age}: You completed a holistic Costa Rican yoga retreat, unlocking profound inner peace.`);
        }
      },
      {
        choiceText: 'Buy some coffee and keep working.',
        outcomeText: 'The daily grind is relentless, but the work pile decreases.',
        effect: (state) => {
          adjustStats(state, { happiness: -5, health: -5, smarts: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You passed on spiritual healing to stick to your office cubicle.`);
        }
      }
    ]
  },
  {
    id: 'midlife_crisis_neck_tattoo',
    title: 'Sovereign Neck Ink 🐉',
    description: 'You catch yourself staring in the mirror, mourning your youthful years. In an impulsive daze, you walk into a hardcore tattoo parlor.',
    category: 'Adulthood',
    condition: (state) => state.characterInfo?.age >= 40 && state.characterInfo?.age <= 55 && state.finances.cashBalance >= 1500,
    choices: [
      {
        choiceText: 'Get a giant breathing dragon tattooed on your neck! (-$1,200 cash)',
        outcomeText: 'Painful! But the ink looks savage. Teens back away on buses, but high-end bank recruiters might look concerned.',
        effect: (state) => {
          state.finances.cashBalance -= 1200;
          adjustStats(state, { looks: 15, happiness: 30, smarts: -10, karma: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Got an impulsive giant dragon neck tattoo. Highly dramatic visual identity change.`);
        }
      },
      {
        choiceText: 'Sigh and purchase a sensible orthotic lumbar desk chair instead.',
        outcomeText: 'Your spine releases a sigh of pure ergonomic relief. You look highly responsible.',
        effect: (state) => {
          state.finances.cashBalance -= 300;
          adjustStats(state, { health: 15, smarts: 10, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: Transited mid-life crisis by investing in ergonomic lumbar support.`);
        }
      }
    ]
  },
  {
    id: 'retirement_planning_consultant',
    title: 'The Graying Horizon 👴',
    description: 'The national pension board prompts you: "Are you prepared to solidify your estate wills and transition to full retirement next decade?"',
    category: 'Adulthood',
    condition: (state) => state.characterInfo?.age >= 60 && state.characterInfo?.age <= 65 && state.characterInfo?.currentOccupation !== 'Unemployed' && state.characterInfo?.currentOccupation !== 'Retired',
    choices: [
      {
        choiceText: 'Retire immediately! Spend days golfing and painting hulls.',
        outcomeText: 'Your career salary is set to zero, but you receive a state pension check of $12,000 annually. Freedom!',
        effect: (state) => {
          state.characterInfo.currentOccupation = 'Retired';
          state.finances.annualSalary = 0;
          state.finances.cashBalance += 10000; // Immediate retirement package bonus
          adjustStats(state, { stress: -40, happiness: 30, health: 10 });
          state.log.push(`Age ${state.characterInfo.age}: [RETIRED] You officially completed your career and entered a peaceful retirement phase!`);
        }
      },
      {
        choiceText: 'Reject retirement, work until you collapse!',
        outcomeText: 'You clutch your coffee mug tight. The corporate machine grind continues, maintaining high salary inflows.',
        effect: (state) => {
          adjustStats(state, { stress: 25, health: -15, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Refused retirement, choosing to grind in the offices into old age.`);
        }
      }
    ]
  },
  {
    id: 'grandchild_arrival',
    title: 'A New Generation 👶',
    description: 'Your child rings your doorbell, placing a tiny, soft bundle into your arms: "Meet your brand new grandchild, little Alex!"',
    category: 'Adulthood',
    condition: (state) => state.characterInfo?.age >= 52 && state.relationships.some(npc => npc.relationshipType === 'Child' && !npc.isDead),
    choices: [
      {
        choiceText: 'Establish a $10,000 collegiate trust fund right away! (-$10,000 cash)',
        outcomeText: 'Your family is speechless at your magnificent generosity. Your karma matches celestial values!',
        effect: (state) => {
          state.finances.cashBalance = Math.max(0, state.finances.cashBalance - 10000);
          adjustStats(state, { happiness: 40, karma: 40 });
          state.log.push(`Age ${state.characterInfo.age}: Gifted a $10,000 trust fund to your newborn grandchild Alex.`);
        }
      },
      {
        choiceText: 'Squeeze their tiny hands and bounce them on your knee.',
        outcomeText: 'They spit up lightly on your cardigan, but laugh with toothless glee. Absolute bliss.',
        effect: (state) => {
          adjustStats(state, { happiness: 30, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: Spent a glowing afternoon babysitting your grandchild Alex.`);
        }
      }
    ]
  },
  {
    id: 'stoves_left_burning',
    title: 'The Burning Blue Smell 🔥',
    description: 'You return from a three-hour market walk to discover your kitchen stove was left burning on high, turning your frying pan into a charred lump.',
    category: 'Adulthood',
    condition: (state) => state.characterInfo?.age >= 70,
    choices: [
      {
        choiceText: 'Install a smart auto-shutoff security system (-$800 cash)',
        outcomeText: 'An incredibly clever technological shield. You sleeps peacefully knowing detectors will block errors.',
        effect: (state) => {
          state.finances.cashBalance = Math.max(0, state.finances.cashBalance - 800);
          adjustStats(state, { smarts: 15, stress: -20 });
          state.log.push(`Age ${state.characterInfo.age}: Installed smart stove safety shutoff machinery to combat senior lapses.`);
        }
      },
      {
        choiceText: 'Chalk it up to standard tiredness and eat cold sandwiches.',
        outcomeText: 'You saved cash, but you are constantly checking handles, raising senior anxiety.',
        effect: (state) => {
          adjustStats(state, { stress: 15, smarts: -5 });
          state.log.push(`Age ${state.characterInfo.age}: Ignored cooker security warning, opting for manual checking.`);
        }
      }
    ]
  },
  {
    id: 'legacy_charity_will',
    title: 'The Final Will 📜',
    description: 'A notary visits your house: "We need to solidify your final legally binding Will. Who shall inherit your life achievements?"',
    category: 'Adulthood',
    condition: (state) => state.characterInfo?.age >= 75 && state.finances.cashBalance >= 50000,
    choices: [
      {
        choiceText: 'Pledge half your assets to the Global Stray Dog Sanctuary.',
        outcomeText: 'Excellent! Your name will be engraved on the lobby brass plaque. Extreme cosmic karma earned.',
        effect: (state) => {
          const donationAmount = Math.round(state.finances.cashBalance * 0.5);
          state.finances.cashBalance -= donationAmount;
          adjustStats(state, { karma: 50, happiness: 45 });
          state.log.push(`Age ${state.characterInfo.age}: Bequeathed half your cache (${formatCurrency(donationAmount)}) to the Stray Dog Shelter in your legal will.`);
        }
      },
      {
        choiceText: 'Stash it all in a titanium metal chest buried in the garden.',
        outcomeText: 'You drawn a secret map on parchment. The family thinks you are losing your marbles, but you laugh slyly.',
        effect: (state) => {
          adjustStats(state, { smarts: 5, happiness: 15, karma: -15 });
          state.log.push(`Age ${state.characterInfo.age}: Concealed your cash hoard in an unmarked metal safe underneath the oak tree.`);
        }
      }
    ]
  }
];

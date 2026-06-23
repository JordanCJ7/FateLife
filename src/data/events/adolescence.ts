import { GameEvent, CharacterState } from '../../types';
import { adjustStats } from '../../utils';

export const adolescenceEvents: GameEvent[] = [
  // ==========================================================================
  // JUNIOR ADOLESCENCE (AGES 12-15) - Requires 3-4 distinct choices
  // ==========================================================================
  {
    id: 'teen_gym_rope',
    title: 'The Gym Class Summit 🧗',
    description: 'During a grueling gym session, the instructor points at a dusty, frayed hemp cargo rope dangling from the steel rafters: "Your turn. Touch the yellow rafters or fail."',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 13;
    },
    choices: [
      {
        choiceText: 'Climb with pure muscular power, ignoring the painful hemp burn of your hands.',
        outcomeText: 'You slide upward centimeter by centimeter. Your muscles scream, but your palms touch the cold yellow metal! The gym class cheers!',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, happiness: 20, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You conquered the gym class cargo rope climb, building intense muscular resilience.`);
        }
      },
      {
        choiceText: 'Fake a sudden, excruciating leg muscle cramp on the first knot.',
        outcomeText: 'You squeak in mock agony, collapsing gently onto the blue foam floor pads. The coach sighs and points you toward the nurse, but you escape the climb.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, happiness: 5, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You faked a muscle strain to avoid climbing the rafters.`);
        }
      },
      {
        choiceText: 'Refuse flatly, stating that your parents did not sign a high-altitude waiver.',
        outcomeText: 'The athletic instructor glares, marks a red "C-" on his gray sheet, and assigns you to wash thirty smelly plastic dodgeballs. Your class status dips.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -10, stress: 15 });
          state.education.grades = Math.max(0, state.education.grades - 15);
          state.log.push(`Age ${state.characterInfo.age}: You refused to climb the ropes on legal grounds, receiving administrative warnings.`);
        }
      }
    ]
  },
  {
    id: 'teen_locker_vandal',
    title: 'The Locker Room Aerosol 🎨',
    description: 'You open your locker after math class and find an active aerosol spray-paint can sitting on top of your history binder. A group of rowdy hallway pranksters are whispering around the corner.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 13;
    },
    choices: [
      {
        choiceText: 'Spray a massive, neon-blue cartoon dinosaur directly across your lockers steel backing.',
        outcomeText: 'It looks incredibly cool under the fluorescent bulbs! Unfortunately, the dean walks in. Your locker is photographed, and you get suspended for a week.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -20, happiness: 10, stress: 25 });
          state.education.grades = Math.max(0, state.education.grades - 25);
          state.log.push(`Age ${state.characterInfo.age}: You painted a colorful neon dinosaur inside your locker, receiving severe detention punishment.`);
        }
      },
      {
        choiceText: 'Slip the paint can quietly into the locker of your smug classroom rival.',
        outcomeText: 'You execute the swap with perfect, silent execution. Ten minutes later, the vice principal raids his locker, and you watch him walk down the hall with burning red cheeks.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -35, smarts: 18, happiness: 15, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You framed your hallway rival for locker room vandalism.`);
        }
      },
      {
        choiceText: 'Hand the aerosol container directly to the monitor at the front lobby desk.',
        outcomeText: 'The monitor praises your integrity, locking the can in a metal cabinet. The hallway trolls glare at you with burning resentment.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, stress: 10, looks: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You responsibly reported locker room contraband to school staff.`);
        }
      }
    ]
  },
  {
    id: 'teen_crush_note',
    title: 'The Scented Parchment ✉️',
    description: 'You slide into your desk for history class and find a tightly folded piece of bright pink paper. Inside is a handwritten cursive poem with a glaring spelling error: "Your my world."',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 13;
    },
    choices: [
      {
        choiceText: 'Write a warm, anonymous reply to slide back during recess.',
        outcomeText: 'Your heart beats incredibly fast as you deliver the note. For the rest of the afternoon, you share happy, shy glances with a cute artist down the row.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 22, stress: -5, looks: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You exchanged anonymous cursive love notes, sparking an early romance.`);
        }
      },
      {
        choiceText: 'Correct the spelling error with a bright red pen and leave it on the desk.',
        outcomeText: 'You write "YOU\'RE*" in bold letters. A quiet kid down the row spots the red correction, grabs the note with watery eyes, and runs out of the room. You feel like an absolute monster.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -30, smarts: 12, happiness: -15, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You corrected the spelling errors of a shy crushes love note.`);
        }
      },
      {
        choiceText: 'Shred the note instantly, acting like you never saw it.',
        outcomeText: 'You rip the fibers and toss them in the recycling. No drama, no complications, but your afternoon feels slightly dry and lonely.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -5, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You recycled an anonymous romantic note to stay focused on school.`);
        }
      }
    ]
  },
  {
    id: 'teen_bus_backseat',
    title: 'The Bus Backseat Arena 🚌',
    description: 'On the noisy route home, three rowdy high school juniors sitting in the backseat start launching wet spitballs from plastic straws directly at your ears.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 14;
    },
    choices: [
      {
        choiceText: 'Turn around and launch a savage verbal counter-attack, mocking their bad hair styling.',
        outcomeText: 'The entire bus erupts in wild laughter! The juniors blush crimson, pack up their straws, and stare out the windows in defeat. You are a legendary street orator.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 15, happiness: 22, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You defended your sanity on the school bus with witty verbal barbs.`);
        }
      },
      {
        choiceText: 'Scramble forward to sit next to the scary, silent bus driver.',
        outcomeText: 'The spitballs stop flying, but your classmates giggle as you sit in the front row like a timid kindergarten student. Your reputation drops slightly.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -12, happiness: -5, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You retreated to the front of the bus to escape rowdy older kids.`);
        }
      },
      {
        choiceText: 'Roll up your own notebook paper, fabricating high-velocity defensive paper ammunition.',
        outcomeText: 'A full-scale, multi-row bus war begins! Paper flies everywhere. It is chaotic and highly fun, until the driver slams the brakes and assigns lunch detentions.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, health: 8, stress: 15 });
          state.education.grades = Math.max(0, state.education.grades - 10);
          state.log.push(`Age ${state.characterInfo.age}: You participated in a legendary school bus paper war.`);
        }
      }
    ]
  },
  {
    id: 'teen_science_fair_fail',
    title: 'The Science Fair Cloud 🧪',
    description: 'You are setting up your elaborate dry-ice sublimation display in the gymnasium when your companion accidentally trips over the hose, causing dense white carbonic fog to leak rapidly into the air vents.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 13 && age <= 13;
    },
    choices: [
      {
        choiceText: 'Utilize your chemistry notes to neutralize the carbon vapor immediately.',
        outcomeText: 'You quickly grab the baking soda and container, halting the fog trail before it escapes. The science judge nods silently in deep academic appreciation.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 22, happiness: 15, stress: 5 });
          state.education.grades = Math.min(100, state.education.grades + 15);
          state.log.push(`Age ${state.characterInfo.age}: You cleanly managed a chemical display leak with swift science maneuvers.`);
        }
      },
      {
        choiceText: 'Run through the fog screaming about a toxic alien biological attack.',
        outcomeText: 'Your panicked shrieking triggers a full-scale gymnasium stampede! Eighty children rush out the doors, the fire alarms ring, and three fire trucks arrive. Your parents are incredibly ashamed.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, karma: -25, looks: -15, stress: 30 });
          state.education.grades = Math.max(0, state.education.grades - 30);
          state.log.push(`Age ${state.characterInfo.age}: You caused a massive school panicked evacuation by pretending a fog leak was alien biological gas.`);
        }
      },
      {
        choiceText: 'Quietly blend into the crowd, pretending to be as confused as everyone else.',
        outcomeText: 'You stand in the yard chatting. The source of the leak is never traced to your table, but your plaster display gets thrown into the school bin. Zero-risk, zero-reward.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: -15 });
          state.education.grades = Math.max(0, state.education.grades - 5);
          state.log.push(`Age ${state.characterInfo.age}: You let your science project be discarded to escape identification for a gas leak.`);
        }
      }
    ]
  },
  {
    id: 'teen_math_class_snooze',
    title: 'The Geometry Snooze 📐',
    description: 'While the teacher drones on about non-Euclidean angles, your heavy eyelids close. You drift into a deep sleep, waking up with severe drool covering your math paper.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 13;
    },
    choices: [
      {
        choiceText: 'Flip your page immediately, wiping the drool onto your sleeve with speed.',
        outcomeText: 'You recover with ninja reflexes. The teacher looks suspect, but doesn\'t call you out. Your arm is slightly damp, but your pride is saved.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, happiness: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You saved face in math class after a heavy drooling slumber.`);
        }
      },
      {
        choiceText: 'State proudly that you were meditating on complex spatial layouts.',
        outcomeText: 'The class lets out a giant, loud roar of laughter. The teacher chuckles and assigns you to write 500 words on the life of Euclid.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 12, stress: 15 });
          state.education.grades = Math.max(0, state.education.grades - 10);
          state.log.push(`Age ${state.characterInfo.age}: You attempted to frame math class sleeping as spatial meditation.`);
        }
      },
      {
        choiceText: 'Blame the kid next to you for spilling their cherry soda on your desk.',
        outcomeText: 'You point fingers in panic. The teacher is highly skeptical, the kid glares at you like they want to fight, and your reputation for integrity collapses.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -30, looks: -10, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: You framed a desk neighbor for your own classroom drool spots.`);
        }
      }
    ]
  },
  {
    id: 'teen_parental_grounding',
    title: 'The Curfew Breach 🎆',
    description: 'You snuck out of your bedroom window to watch the summer harbor fireworks with your friends. When you slip back inside, you find your parent sitting in the dark kitchen rocking chair.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 13 && age <= 14;
    },
    choices: [
      {
        choiceText: 'Deliver an honest, heartfelt apology, agreeing to hand over your gaming console.',
        outcomeText: 'Your parent sighs deeply, her anger melting upon seeing your sincere expression. She cancels your console, but hugs you tight, glad you are safe.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 10, karma: 22, stress: -5 });
          const parent = state.relationships.find(r => r.relationshipType === 'Parent');
          if (parent) parent.relationshipValue = Math.min(100, parent.relationshipValue + 15);
          state.log.push(`Age ${state.characterInfo.age}: You owned up to a curfew breach, rebuilding parental trust with honesty.`);
        }
      },
      {
        choiceText: 'Claim you were out late hunting for a legendary lost neighborhood puppy.',
        outcomeText: 'Your parent stares at you with absolute, complete skepticism. They check the neighbor group-chat, confirm no dogs are missing, and double your grounding sentences.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -20, smarts: -5, happiness: -15, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: You fabricated puppy rescue fables to dodge curfew grounding.`);
        }
      },
      {
        choiceText: 'Launch a dramatic teenage tantrum about personal liberty and jail house conditions.',
        outcomeText: 'You shriek about basic human rights and slam your bedroom door. Your parents are incredibly exhausted, locking your phone in their safe cabinet for a month.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -20, looks: -10, stress: 25 });
          const parent = state.relationships.find(r => r.relationshipType === 'Parent');
          if (parent) parent.relationshipValue = Math.max(0, parent.relationshipValue - 20);
          state.log.push(`Age ${state.characterInfo.age}: You threw a wild teenage tantrum over basic grounding penalties.`);
        }
      },
      {
        choiceText: 'Offer to handle all kitchen trash chores for the next thirty days.',
        outcomeText: 'You negotiate a trade. Your parents agree, letting you keep your phone in exchange for hauling heavy trash bags in the rain.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 10, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You traded manual kitchen labor to dodge teenage grounding.`);
        }
      }
    ]
  },
  {
    id: 'teen_hair_mishap',
    title: 'The Muddy Sink Dye 💇',
    description: 'You purchase a sketchy bottle of "Electric Neon Orange" hair dye from the dollar store. After scrubbing it in the bathroom sink, you look in the mirror to find your hair has turned a weird, moldy green swamp color.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 13;
    },
    choices: [
      {
        choiceText: 'Wear a tight black beanie constantly, even in the shower, to hide your head.',
        outcomeText: 'You sweat miserably in class, looking like a suspicious jewel thief. It flies under the radar for a month, but your scalp catches a hot, itchy dry rash.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -15, health: -8, happiness: -10, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You wore beanies continuously to conceal a hair dye disaster.`);
        }
      },
      {
        choiceText: 'Own the bizarre green aesthetic, naming it "Swamp Punk Rebel".',
        outcomeText: 'You walk down the terminal hall with absolute head-held confidence. The local skateboarding crowd loves your wild courage, adopting your look! Peak teenager triumph.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 18, happiness: 22, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You turned a hair dye mishap into a popular new school subculture.`);
        }
      },
      {
        choiceText: 'Shave your entire head completely smooth down to the scalp.',
        outcomeText: 'Buzz! Your mother gasps in horror upon entering the kitchen, but your hair can regrow and your look is remarkably clean, if slightly cold.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 10, happiness: 12, health: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You shaved your head bare after a swamp hair dye catastrophe.`);
        }
      }
    ]
  },
  {
    id: 'teen_garage_band_practice',
    title: 'The Base Cabinet Rumbles 🎸',
    description: 'Your garage rock band is attempting to cover high-tempo heavy metal tracks. Your friend plays the bass amplifier so loud that your mothers fine porcelain cabinet upstairs begins sliding side-to-side.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 13 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Power up the vocal levels to absolute max, ignoring the house tremors.',
        outcomeText: 'CRASH! A historic porcelain teapot hits the kitchen hardwood, shattering completely. Your mother runs down the stairs with immediate fury, canceling your band forever.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -15, karma: -20, stress: 25 });
          state.log.push(`Age ${state.characterInfo.age}: You shattered antique heirlooms due to extreme garage band sound levels.`);
        }
      },
      {
        choiceText: 'Convince the band to transition into an alternative acoustical folk circle.',
        outcomeText: 'You slide the amps off, unpacking acoustic wooden guitars. Your mother walks in with a smiling face, delivering a warm tray of honey tea. Beautiful soundscapes.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, karma: 15, smarts: 12, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You transitioned your garage band into acoustic folk to coordinate with household peace.`);
        }
      },
      {
        choiceText: 'Strap dense sleeping pillows across the walls to dampen the sound waves.',
        outcomeText: 'You use industrial tape to pin pillows across the concrete. Your acoustics improve slightly, keeping the house calm while you shred!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You engineered makeshift soundproof pillow padding for rock practice.`);
        }
      },
      {
        choiceText: 'Pawn your school lunchbox to purchase some high-quality earplugs for neighborhood safety.',
        outcomeText: 'The band members wear earplugs, playing with high velocity while keeping outside sounds slightly safer. Your ears appreciate the silence.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 12, happiness: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You invested lunch savings into tactical ear protection for musical practice.`);
        }
      }
    ]
  },

  // ==========================================================================
  // MID ADOLESCENCE (AGES 14-15) - Requires 3-4 distinct choices
  // ==========================================================================
  {
    id: 'teen_locker_mixup',
    title: 'The Blueprint Locker 🔑',
    description: 'You rush down the hallway, jamming your key into a locker, only to realize you opened the adjacent storage unit. Inside is a detailed, marker-drawn blueprint mapping the school ventilation ducts toward the deans private snack cabinet.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 14 && age <= 14;
    },
    choices: [
      {
        choiceText: 'Study the layout to launch a midnight tactical snack-cabinet heist.',
        outcomeText: 'You slip through the ceiling ductwork like an elite agent! You escape with five giant packages of gourmet chocolates, sharing them with classmates. You are legendary.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, looks: 15, karma: -20, happiness: 25, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You orchestrated a daring school ductwork snack cabinet heist.`);
        }
      },
      {
        choiceText: 'Tuck the blueprint folder quietly inside the deans mailbox with warning tags.',
        outcomeText: 'You return custody of the files. The dean is amazed, locking the vent grates and offering you three weeks of free cafeteria lunch vouchers.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, happiness: 15, stress: -10 });
          state.education.grades = Math.min(100, state.education.grades + 20);
          state.log.push(`Age ${state.characterInfo.age}: You curbed a schoolyard heist, earning dining hall rewards.`);
        }
      },
      {
        choiceText: 'Shove your own books inside and ignore the dangerous layout papers.',
        outcomeText: 'You slam the door shut. No complications, no drama, but you spend your afternoon wondering what those imports tasted like.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You chose to ignore schoolyard conspiracy files to preserve quiet academic records.`);
        }
      }
    ]
  },
  {
    id: 'teen_auditorium_skit',
    title: 'The Monologue Void 🎭',
    description: 'You walk onto the illuminated wooden theater stage for the school drama tryouts. The hot yellow spots blind you, and suddenly, your memory goes completely blank on your monologue lines.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 14 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Improvise a dramatic, high-energy monologue about a medieval guard dying from bad cheese.',
        outcomeText: 'The drama teachers look bewildered, then erupt into ecstatic clapping! They praise your brilliant improvisational genius, casting you as the lead comedic relief!',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 18, smarts: 20, happiness: 22, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You saved theater auditions with a wild, cheese-themed improvisational performance.`);
        }
      },
      {
        choiceText: 'Simulate a severe coughing fit, sprinting immediately back toward the locker rooms.',
        outcomeText: 'You gasp for moisture and run off, avoiding the awkward silence but earning a solid "C-" in theater presentation. Your cheeks are burning.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -12, happiness: -10, stress: 15 });
          state.education.grades = Math.max(0, state.education.grades - 10);
          state.log.push(`Age ${state.characterInfo.age}: You fled stage auditions under a feigned medical panic fit.`);
        }
      },
      {
        choiceText: 'Pull out your cheat script and read the lines with steady composure.',
        outcomeText: 'You pull the creased paper from your pocket. It is slightly unpolished, but you deliver the narrative with quiet, solid stability. You secure a modest background guard role.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -5 });
          state.education.grades = Math.min(100, state.education.grades + 10);
          state.log.push(`Age ${state.characterInfo.age}: You safely completed theater auditions using backup reference cards.`);
        }
      },
      {
        choiceText: 'Do a silent interpretative tap dance to express character confusion.',
        outcomeText: 'The stage stands in dead, freezing silence as you hop around. The director sighs and points you off stage. Shockingly awkward.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -15, happiness: -12, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: You did an awkward silent dance when your stage lines faded.`);
        }
      }
    ]
  },
  {
    id: 'teen_social_clique',
    title: 'The Cafeteria Invitation 🍔',
    description: 'As you search for a seat in the bustling cafeteria with your tray of hot mashed potato bowls, the senior elite athletics table beckons you over. You realize they only want your expensive dessert cake.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 14 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Hand over your cake to buy a seat next to the quarterback.',
        outcomeText: 'They devour your cake in seconds. You sit there star-struck, but they ignore you for the rest of lunch. You feel empty, toothless, and extremely hungry.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 5, happiness: -10, health: -10, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You traded your gourmet lunch dessert to secure a brief slot at the popular school table.`);
        }
      },
      {
        choiceText: 'Sit with the quiet technology wizards, offering to share your cake slice.',
        outcomeText: 'The programmers welcome you with high excitement! They split the pastry cleanly, showing you how to bypass school firewall networks. An authentic, genuine friendship group is created.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 22, smarts: 20, happiness: 24, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You joined the campus programmers, building deep communal friendships.`);
        }
      },
      {
        choiceText: 'Eat the entire cake slice in one giant, massive bite while looking them straight in the eyes.',
        outcomeText: 'SQUISH! Frosting covers your nose. The popular athletes stare in absolute, frozen shock. They respect your confidence, though your stomach feels dangerously bloated.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 15, happiness: 15, health: -5, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You asserted eating dominance in the cafeteria over the popular athletes.`);
        }
      }
    ]
  },
  {
    id: 'teen_skipping_curriculum',
    title: 'The Schoolgate Donut Escape 🍩',
    description: 'You slide through the loose school gate chain during geometry study hour to purchase sweet jelly donuts from across the highway. Suddenly, the deans olive-green sedan pulls directly into the bakery parking lot.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 14 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Dive face-first inside the heavy yellow cardboard recycling bin.',
        outcomeText: 'You slide between clean cardboard pieces. The dean walks by, chewing a scone, and doesn\'t notice your dangling sneakers. You escape, though you smell of old damp flour.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, looks: -10, happiness: 12, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You concealed yourself inside bakery cardboard containers to escape the deans patrol path.`);
        }
      },
      {
        choiceText: 'Walk straight up to his car door and offer him a warm, fresh jelly donut.',
        outcomeText: 'Shock! The deans stern eyes melt. He sighs, takes the sweet cherry donut, and tells you to run back within four minutes or face suspension. Masterful diplomacy!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 22, looks: 15, karma: 10, happiness: 20, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You bribed the campus dean with warm pastries to escape skipping penalties.`);
        }
      },
      {
        choiceText: 'Sprint blindly across the highway traffic to evade his sight.',
        outcomeText: 'A delivery truck blares its horn, screeching within inches of your leg! You scramble over the school fence, weeping in raw terror. Extremely dangerous and foolish.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -25, happiness: -15, stress: 30 });
          state.education.grades = Math.max(0, state.education.grades - 10);
          state.log.push(`Age ${state.characterInfo.age}: You risked highway hazards to dodge skipping identification.`);
        }
      }
    ]
  },
  {
    id: 'teen_arcade_championship',
    title: 'The Cyber Claw Clash 👾',
    description: 'A colossal crowd of screaming teenagers circles the vintage cabinet. The cyber claw game holds a pristine, golden robotic wristwatch. The local arcade champion glares at you with his coins ready.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 14 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Decline his game, study the physics claw latency patterns, and calculate the gear slip.',
        outcomeText: 'You track seven plays, recognizing that the claw force drops on odd turns. You input coins on the eighth turn and drop the crane... YES! You grasp the wrist watch clean!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, happiness: 22, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You used engineering deduction to claim a golden watch tournament prize.`);
        }
      },
      {
        choiceText: 'Gulp a dynamic cherry soda and slam the buttons with extreme force.',
        outcomeText: 'The mechanical crane slips, dropping your toys. The arcade champion laughs, mocking your sloppy coordination. Your cheeks are burning.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -8, stress: 12, looks: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You failed an arcade contest in front of high school circles.`);
        }
      },
      {
        choiceText: 'Offer to split your coins so you can collaborate to claim the toys together.',
        outcomeText: 'He respects your cooperative logic! Together you swap turns, secure three rare plush toy animals, and divide the treasure fairly. A warm ally is born.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 22, happiness: 18, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You formed a neighborhood gaming alliance over arcade challenges.`);
        }
      }
    ]
  },
  {
    id: 'teen_bad_grade_forge',
    title: 'The Signature Dilemma 📝',
    description: 'You received a devastating, massive "D-" on your physics semester report. The paperwork requires a parental ink signature by tomorrow morning, but your parent is already highly stressed.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 14 && age <= 14;
    },
    choices: [
      {
        choiceText: 'Trace your parents signature carefully against the bright window panes.',
        outcomeText: 'You slide the template back. The teacher stamps it, completely unaware of your forgery. You survive, but your guilt weighs incredibly heavy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -35, smarts: 18, happiness: 10, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: You forged parental signatures to hide a failing school grade folder.`);
        }
      },
      {
        choiceText: 'Present the bad grade with complete honesty while making them a hot tea cup.',
        outcomeText: 'Your mother looks tired, weeping slightly. She doesn\'t scream, but sits with you to schedule daily math study tracks. Sincere family bonds are locked.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, smarts: 15, happiness: 12, stress: -10 });
          state.education.grades = Math.min(100, state.education.grades + 15);
          const parent = state.relationships.find(r => r.relationshipType === 'Parent');
          if (parent) parent.relationshipValue = Math.min(100, parent.relationshipValue + 15);
          state.log.push(`Age ${state.characterInfo.age}: You honestly presented poor school marks, securing parent-aided study tracks.`);
        }
      },
      {
        choiceText: 'Hide the physics paper folder deep beneath your dirty laundry pile.',
        outcomeText: 'Three weeks pass in peaceful silence. Suddenly, the teacher calls your mother directly during work hours. You are grounded for two entire months. Disastrous.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -15, happiness: -20, stress: 28 });
          state.education.grades = Math.max(0, state.education.grades - 20);
          state.log.push(`Age ${state.characterInfo.age}: You concealed failing grades from parents, triggering severe family crises.`);
        }
      },
      {
        choiceText: 'Bribe your older sibling with your pocket cash to sign as parent.',
        outcomeText: 'Your sibling scribbles a goofy signature in exchange for some money. The teacher notices the handwriting immediately, hauling you both to the deans room.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -20, happiness: -15, stress: 25 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 25, -100000);
          state.education.grades = Math.max(0, state.education.grades - 15);
          state.log.push(`Age ${state.characterInfo.age}: You bribed your sibling to forge grades, causing double suspensions.`);
        }
      }
    ]
  },
  {
    id: 'teen_stray_cat_closet',
    title: 'The Closet Feline 🐈',
    description: 'You find a skinny, pregnant calico cat shivering behind the garden shed. You secret her inside your bedroom closet, but your father is highly allergic to cat dander.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 14 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Keep her warm, cleaning her paws and smuggling tuna slices down.',
        outcomeText: 'She lets out cozy, deep purrs. Two days later, she delivers five tiny, beautiful calico kittens inside your wool sweaters! Your heart completely melts.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 25, karma: 20, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You fostered a pregnant stray cat in your closet, welcoming adorable kittens.`);
        }
      },
      {
        choiceText: 'Present her to your parents immediately, pleading for a family medical trial.',
        outcomeText: 'Your father sneezes instantly, his eyes swelling shut. However, they agree to house her in the warm garden greenhouse, providing veterinary care.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 22, happiness: 15, health: 5, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You integrated a stray cat into the backyard greenhouse to accommodate allergies.`);
        }
      },
      {
        choiceText: 'Shoo the feline back into the cold forest paths to avoid trouble.',
        outcomeText: 'The cat whines, hopping down your porch. You look after her, feeling a deep, quiet sting of regret.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -10, karma: -15, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You ignored a shivering stray feline to evade household arguments.`);
        }
      }
    ]
  },
  {
    id: 'teen_gymnasium_dodgeball',
    title: 'The Red Ball Crucible 🥎',
    description: 'The physical education teacher whistles. The dividing gym net drops. On the opposite wood floor are forty athletic athletes holding heavy red dodgeballs.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 14 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Sprint directly to the front center divider line to seize primary ammo.',
        outcomeText: 'You slide on your knees, snagging two balls! You launch them with massive force, eliminating the varsity champion instantly! The gym hall screams!',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 18, looks: 15, happiness: 22, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You mastered a risky front-line sprint in gym class dodgeball.`);
        }
      },
      {
        choiceText: 'Cower behind the tallest kid in class, using him as a defensive shield.',
        outcomeText: 'You crouch in absolute terror. The big kid takes a heavy ball directly to the nose. He glares back with tears in his swollen eyes, promising revenge.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -30, looks: -10, happiness: -5, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You cowardly utilized classmate bodies as dodgeball shields, losing playground status.`);
        }
      },
      {
        choiceText: 'Step out of bounds immediately, accepting an elegant zero score.',
        outcomeText: 'You touch the sideline mesh, walking to the wooden benches to study your biology binder. You stay perfectly safe, but your peers call you a chicken.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, looks: -8, happiness: 5, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You opted out of gym dodgeball tournaments to focus on biology tracks.`);
        }
      }
    ]
  },
  {
    id: 'teen_secret_diary_found',
    title: 'The Diary Leak 📖',
    description: 'You stroll into the living room and find your younger sibling reading your private journal out loud to their neighborhood friends, mocking your emotional descriptions of your school crush.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 14 && age <= 14;
    },
    choices: [
      {
        choiceText: 'Snatch the diary and launch a dramatic chase across the backyard garden lawn.',
        outcomeText: 'You tackle them into the damp clover grass, retrieving your book. You are both muddy and laundry-soaked, but your precious secrets are safely locked away.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 10, happiness: 12, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You physically wrestled your sibling to salvage private diary files.`);
        }
      },
      {
        choiceText: 'Sit down calmly and explain how violation of sibling trust feels deeply painful.',
        outcomeText: 'Your mature, quiet dialogue catches them completely off guard. The neighborhood kids look ashamed and leave, and your sibling apologizes with quiet tears.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, smarts: 18, happiness: 15, stress: -10 });
          state.relationships.forEach(npc => {
            if (npc.relationshipType === 'Sibling') npc.relationshipValue = Math.min(100, npc.relationshipValue + 15);
          });
          state.log.push(`Age ${state.characterInfo.age}: You resolved a sibling diary leak using high emotional maturity.`);
        }
      },
      {
        choiceText: 'Scream at extreme decibels, locking yourself in the master bathroom.',
        outcomeText: 'You shriek, sobbing in the tub. Your parent rushes home, issuing a heavy grounding sentence to your sibling, but your afternoon is completely ruined.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -15, stress: 25 });
          state.log.push(`Age ${state.characterInfo.age}: You locked yourself in the bathroom following extreme diary exposure.`);
        }
      }
    ]
  },

  // ==========================================================================
  // SENIOR ADOLESCENCE (AGES 16-17) - Requires 4-6 distinct choices
  // ==========================================================================
  {
    id: 'teen_driving_license_exam',
    title: 'The License Crucible 🚗',
    description: 'You sit inside the clunky municipal training sedan. The stone-faced assessor flips his clipboard pages with freezing indifference: "Accelerate down the incline and execute a parallel park in space three. Now."',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 16;
    },
    choices: [
      {
        choiceText: 'Align your side mirrors, engage the turn indicators, and park with crawling precision.',
        outcomeText: 'You slide into the narrow concrete space with absolute, centimeter-perfect physics! The assessor grunts, checking the "PASSED" box. You have your License!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 30, stress: -15 });
          state.characterInfo.hasLicense = true;
          state.log.push(`Age ${state.characterInfo.age}: You passed your municipal driving license exams on your first try.`);
        }
      },
      {
        choiceText: 'Attempt a high-speed drift parking maneuver to impress the school kids outside.',
        outcomeText: 'You pull the handbrake. The rubber tires scream! The car spins completely sideways, mounting the curb and flattening a fire hydrant. Failed immediately.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, happiness: -20, looks: -12, stress: 30 });
          state.log.push(`Age ${state.characterInfo.age}: You failed your driving test spectacularly by drifting onto municipal sidewalks.`);
        }
      },
      {
        choiceText: 'Slip a crisp hundred-dollar bill between the assessor sheets.',
        outcomeText: 'The analyst pauses, staring at your face. He pockets the cash silently, signs the sheet, and tells you to drive directly back to the terminal. You pass with dark karma.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -35, happiness: 22, stress: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 100, -100000);
          state.characterInfo.hasLicense = true;
          state.log.push(`Age ${state.characterInfo.age}: You corruptly bribed your driving assessor to secure a license.`);
        }
      },
      {
        choiceText: 'Panic, throw the keys into his lap, and sprint out of the vehicle.',
        outcomeText: 'You shriek, opening the door and sprinting onto the bakery lawn. The instructor registers a giant red "ABANDONED" across your permanent dossier files.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -15, looks: -15, stress: 22 });
          state.log.push(`Age ${state.characterInfo.age}: You abandoned your active driving test in a wave of teenage panic.`);
        }
      },
      {
        choiceText: 'Ask your sibling sitting in the back to whisper parallel direction steps.',
        outcomeText: 'The assessor hears the whispering immediately! He halts the exam, penalizing you both for cheating. A complete disaster.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -15, happiness: -10, stress: 18 });
          state.log.push(`Age ${state.characterInfo.age}: You got caught cheating on your vehicle exam using sibling whispers.`);
        }
      }
    ]
  },
  {
    id: 'teen_first_jalopy',
    title: 'The Rusty Hatchback 🚙',
    description: 'You saved small pennies from your chore works. An elderly neighbor offers to sell you his 1994 cream-colored hatchback. It backfires loudly, smelling of burnt pine oil, but it runs.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 16;
    },
    choices: [
      {
        choiceText: 'Purchase the vehicle to obtain the complete liberation of open asphalt roads.',
        outcomeText: 'The keys are in your hand! You cruise around with the windows rolled down, listening to alternative rock. You are the king of the high school lanes!',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 35, looks: 15, stress: -20 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 800, -100000);
          state.assets.push({
            id: `veh-${Math.random()}`,
            name: '1994 Rusty Cream Hatchback',
            type: 'vehicle',
            purchasePrice: 800,
            currentValue: 800,
            annualUpkeep: 150,
            isFinanced: false,
            loanDetails: null,
            condition: 35
          });
          state.log.push(`Age ${state.characterInfo.age}: You bought a loud, backfiring 1994 hatchback.`);
        }
      },
      {
        choiceText: 'Pass on the rusty box, continuing to ride your bicycle.',
        outcomeText: 'You save your hard-earned cash. Your legs are muscular from cycling, but you get slightly wet whenever the summer rain storms hit.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, happiness: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You declined purchasing clunky hatchbacks to save your custom cash balance.`);
        }
      },
      {
        choiceText: 'Bargain with him intensely, offering to handle his lawn chores for extra car discounts.',
        outcomeText: 'You negotiate masterfully! You secure the keys for only $400 cash, plus twelve weekends of mowing his backyard pastures. Financial genius!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 22, happiness: 30, stress: 10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 400, -100000);
          state.assets.push({
            id: `veh-${Math.random()}`,
            name: '1994 Rusty Cream Hatchback',
            type: 'vehicle',
            purchasePrice: 800,
            currentValue: 800,
            annualUpkeep: 150,
            isFinanced: false,
            loanDetails: null,
            condition: 35
          });
          state.log.push(`Age ${state.characterInfo.age}: You bartered lawn chores to secure a steep discount on your hatchback.`);
        }
      },
      {
        choiceText: 'Suggest your parent purchase half of the vehicle as an advanced family transport.',
        outcomeText: 'Your parent agrees, providing $400 support! Together you buy the car, but you must drive your annoying sibling to elementary school every single morning.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 22, stress: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 400, -100000);
          state.assets.push({
            id: `veh-${Math.random()}`,
            name: '1994 Rusty Cream Hatchback',
            type: 'vehicle',
            purchasePrice: 800,
            currentValue: 800,
            annualUpkeep: 150,
            isFinanced: false,
            loanDetails: null,
            condition: 35
          });
          const parent = state.relationships.find(r => r.relationshipType === 'Parent');
          if (parent) parent.relationshipValue = Math.min(100, parent.relationshipValue + 10);
          state.log.push(`Age ${state.characterInfo.age}: You co-purchased a first vehicle with parent funds in exchange for sibling transport.`);
        }
      },
      {
        choiceText: 'Attempt to hotwire his vehicle at night to test your engineering skills.',
        outcomeText: 'A car horn blares! The neighbors turn on their porch lights, catching you red-handed. The police escort you back to your crying parents in cuffs.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -45, happiness: -25, stress: 35 });
          state.log.push(`Age ${state.characterInfo.age}: You got caught trying to hotwire a neighbors automobile, receiving heavy records.`);
        }
      }
    ]
  },
  {
    id: 'teen_sat_scores',
    title: 'The Score Envelopes 📨',
    description: 'The white cardboard college entrance test envelope arrives. Inside are your critical digital score parameters that decide your future academic career tracks.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 17 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Open the seals immediately, facing your academic fate head-on.',
        outcomeText: 'You score in the top 98th percentile! Your parent bursts into tears of pure pride, and local colleges start sending glossy pamphlets!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 30, happiness: 35, stress: -20 });
          state.education.grades = Math.min(100, state.education.grades + 30);
          state.log.push(`Age ${state.characterInfo.age}: You scored exceptionally high on your college entrance testing.`);
        }
      },
      {
        choiceText: 'Slyly digital-alter the PDF file on your computer screen before displaying it to parents.',
        outcomeText: 'You edit mediocre scores into a brilliant "1580". Your family celebrates with a high-end sushi dinner, but your chest feels constantly crushed by the lie.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -40, smarts: 18, happiness: 15, stress: 25 });
          state.log.push(`Age ${state.characterInfo.age}: You digital-forged score PDFs to convince parents of college eligibility.`);
        }
      },
      {
        choiceText: 'Burn the envelope in the backyard fire pits, claiming it got lost by the postal trucks.',
        outcomeText: 'The paper curls in the heat. Your parent is suspicious, but you avoid immediate academic scrutiny for a few weeks.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -15, happiness: -5, stress: 15 });
          state.education.grades = Math.max(0, state.education.grades - 15);
          state.log.push(`Age ${state.characterInfo.age}: You cremated your testing notification files, claiming postal transit losses.`);
        }
      },
      {
        choiceText: 'Request an official, paid test-rescoring manual analysis.',
        outcomeText: 'You pay $55 for manual analysis. They find a double-marked bubble error, boosting your physical marks by 40 points! Smart move.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, happiness: 22, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 55, -100000);
          state.log.push(`Age ${state.characterInfo.age}: You disputed your mechanical grading, successfully gaining scores.`);
        }
      }
    ]
  },
  {
    id: 'teen_prom_proposal',
    title: 'The Cardboard Canva 🎨',
    description: 'The high school spring dance is weeks away. You stand in the driveway holding a massive cardboard sign reading: "Do you wanna rock prom together?" inside hand-painted neon guitars.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 17 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Present the poster directly to your cute art-row classmate in front of the lockers.',
        outcomeText: 'The entire locker row goes silent, then erupts! She blushes crimson, laughs, and gives you a warm hug: "YES!" You are couples royalty!',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 15, happiness: 35, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You completed a legendary campus prom proposal, securing a beautiful partner.`);
        }
      },
      {
        choiceText: 'Deliver the sign stealthily onto their chemistry desk to evade public scrutiny.',
        outcomeText: 'They find the poster. They accept with a happy, shy text message. Less dramatic, but your nerves are preserved and your partnership is locked.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 20, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You quietly delivered your prom proposal to avoid school crowd heat.`);
        }
      },
      {
        choiceText: 'Ask your older sister to rewrite the signs text to look cooler.',
        outcomeText: 'Your sister covers the poster with stylish glitter paint and elegant typography. Your crush is amazed by your handiwork, saying yes in seconds.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 20, happiness: 25, stress: -12 });
          state.relationships.forEach(npc => {
            if (npc.relationshipType === 'Sibling') npc.relationshipValue = Math.min(100, npc.relationshipValue + 10);
          });
          state.log.push(`Age ${state.characterInfo.age}: You utilized family design help to craft a beautiful prom invitation.`);
        }
      },
      {
        choiceText: 'Annihilate the poster in the garage, declaring the prom is a corporate capitalist trap.',
        outcomeText: 'You mock the dance trends, sitting home in a black shirt reading beat poetry. You feel incredibly edgy, though slightly lonely as the limos drive by.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -5, happiness: -10, stress: -10, smarts: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You boycotted the high school prom, spending the night reading philosophy.`);
        }
      },
      {
        choiceText: 'Propose to two different classmates simultaneously to guarantee a yes.',
        outcomeText: 'They compare notes down in the locker room. Both of them find your play incredibly cheap, throwing wet potato bowls at your shirt in the cafeteria. Blacklisted.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -45, looks: -20, happiness: -25, stress: 35 });
          state.log.push(`Age ${state.characterInfo.age}: You double-proposed to school partners, receiving severe campus rejection.`);
        }
      }
    ]
  },
  {
    id: 'teen_cafeteria_vlog',
    title: 'The Mystery Custard Vlog 📱',
    description: 'You start a humorous social media account posting short videos of the school cafeteria custard shaking like gelatinous chemical sludge. The clip begins circulating rapidly.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Produce weekly funny episodes, filming the sloppy burger meat flips.',
        outcomeText: 'You rocket to municipal famous status! You gather 50,000 active teenage followers overnight. Local brands send you cool street hoodies.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 22, happiness: 35, stress: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance + 120, -100000);
          state.log.push(`Age ${state.characterInfo.age}: You launched a popular comedy channel presenting humorous high school lunch expos.`);
        }
      },
      {
        choiceText: 'Delete the account instantly after receiving a cold email from the vice principal.',
        outcomeText: 'You comply with the administrator requests. Your records are pristine, but your peer crew call you a total sell-out.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -8, stress: -15 });
          state.education.grades = Math.min(100, state.education.grades + 15);
          state.log.push(`Age ${state.characterInfo.age}: You terminated a comedy vlog to appease nervous physical curators.`);
        }
      },
      {
        choiceText: 'Organize a peaceful student boycott of the kitchen lunch lines.',
        outcomeText: 'Eighty percent of the campus packs brown lunch sacks. The school board is forced to cancel their chemical meat contracts, upgrading to real organic products!',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, smarts: 20, happiness: 25 });
          state.education.grades = Math.min(100, state.education.grades + 10);
          state.log.push(`Age ${state.characterInfo.age}: You organized food reform boycotts, forcing upgrading of high school menu sheets.`);
        }
      },
      {
        choiceText: 'Sneak inside the kitchen at night to film the packaging boxes labels.',
        outcomeText: 'The alarms blare! You are caught crawling beneath the dish racks by the night guard. Expelled from school with immediate legal warnings.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -20, happiness: -30, stress: 35 });
          state.education.grades = Math.max(0, state.education.grades - 50);
          state.log.push(`Age ${state.characterInfo.age}: You committed illegal entry into cafeteria warehouses, receiving extreme school expulsions.`);
        }
      }
    ]
  },
  {
    id: 'teen_parttime_frycook',
    title: 'The Friday Deep-Fryer 🍟',
    description: 'You are working shifts at Crispy Burger. In the middle of a massive Friday night rush, the customer lines are stretching out the lobby door, and the fryer oil is screaming at 350 degrees.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Manage the frying vats with steady stamina, serving perfectly salted potatoes.',
        outcomeText: 'You sweat raw grease, but you manage the entire rush cleanly! The manager is highly impressed, upgrading your wage to $400 monthly!',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -10, health: -5, stress: 25 });
          state.characterInfo.currentOccupation = 'Crispy Burger Fry Cook';
          state.finances.annualSalary = 4800;
          state.log.push(`Age ${state.characterInfo.age}: You mastered fryers, securing regular part-time wages.`);
        }
      },
      {
        choiceText: 'Hurl your grease-soaked paper crown inside the oil and walk out.',
        outcomeText: '"I OUT!" You scream, strutting into the summer night air like a total movie star. Your freedom is gorgeous, though your wallet is completely dead.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 30, stress: -25 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 200, -100000);
          state.characterInfo.currentOccupation = 'Unemployed';
          state.finances.annualSalary = 0;
          state.log.push(`Age ${state.characterInfo.age}: You rage-quit fast food kitchen duties, prioritizing mental freedom.`);
        }
      },
      {
        choiceText: 'Trade schedules with a lazy coworker behind the digital cash register.',
        outcomeText: 'You avoid the hot grease, chatting relaxed with customers behind the digital register. A much friendlier shift, keeping your hands clean.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 10, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance + 40, -100000);
          state.log.push(`Age ${state.characterInfo.age}: You bartered fryer positions for cleaner front register shifts.`);
        }
      },
      {
        choiceText: 'Quietly slip seven free burger patties to your hungry high school classmates.',
        outcomeText: 'They praise you like a god! Unfortunately, the manager audits the inventory, docking the retail burger value directly from your monthly checks.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 10, looks: 15, stress: 15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 40, -100000);
          state.log.push(`Age ${state.characterInfo.age}: You illicitly gifted food stock to peers, receiving financial deduct warnings.`);
        }
      }
    ]
  },
  {
    id: 'teen_lifeguard_duty',
    title: 'The Public Pool Watch 🏊',
    description: 'You are employed as a lifeguard at the local municipal pool under a blazing summer sun. A group of wild toddlers are running around the slick wet tiles ignoring warnings.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Blow your metal whistle at absolute piercing volumes, mandating they walk.',
        outcomeText: 'TWEEEEET! The kids freeze in absolute terror, stepping slowly. The manager nods, pleased by your authoritative, safe pool surveillance.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 10, stress: 10 });
          state.characterInfo.currentOccupation = 'Municipal Pool Lifeguard';
          state.finances.annualSalary = 5400;
          state.log.push(`Age ${state.characterInfo.age}: You maintained swimming pool safety with extreme whistle authority.`);
        }
      },
      {
        choiceText: 'Dive in to perform a stylish, muscular freestyle backstroke demonstration.',
        outcomeText: 'You look like an absolute Olympic champion under the sun! The teens cheer, though the manager yells at you for leaving your safety tower untended.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 22, health: 12, happiness: 18, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You displayed elite athletic backstroke routines at your lifeguard post.`);
        }
      },
      {
        choiceText: 'Dose off inside your comfortable high-climb wooden chair behind dark lenses.',
        outcomeText: 'You get a beautiful, warm face bronze. Unfortunately, a kid slips on the drain, and you wake up to parents screaming in your face.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -35, looks: 10, happiness: -15, stress: 25 });
          state.log.push(`Age ${state.characterInfo.age}: You fell asleep on lifeguard watch, receiving severe neglect claims.`);
        }
      },
      {
        choiceText: 'Apply high-potency sunscreen to your nose, sketching cartoon shapes.',
        outcomeText: 'The toddlers find your funny white nose paint incredibly hilarious. They stay calm and interact peacefully with your safety limits. Quiet triumph.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 22, happiness: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You utilized comedy sunscreen nose paint to pacify rowdy children at the pool.`);
        }
      },
      {
        choiceText: 'Hurl water balloons at the senior swimming class lanes.',
        outcomeText: 'Splash! You scoring direct hits. The seniors complain, and the city parks board terminates your beach security credentials instantly.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -20, happiness: 12, stress: 20 });
          state.characterInfo.currentOccupation = 'Unemployed';
          state.finances.annualSalary = 0;
          state.log.push(`Age ${state.characterInfo.age}: You got fired from municipal lifeguard duties for hurling water balloons at seniors.`);
        }
      }
    ]
  },
  {
    id: 'teen_school_paper_expose',
    title: 'The Pudding Scandal 🍮',
    description: 'While sorting recycling boxes for school service hours, you discover shipping slips showing the cafeteria is serving "Grade D Expired Chocolate Custard". You hold clean evidence under your fingers.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Draft a massive, front-page exposé article for the high school newspaper.',
        outcomeText: 'Your headline: "THE EXPIRED TOXIC SLUDGE IN OUR POTS!" The school board is stunned. The custard is canceled, and you earn a regional youth journalism medal!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, happiness: 25, stress: 15 });
          state.education.grades = Math.min(100, state.education.grades + 20);
          state.log.push(`Age ${state.characterInfo.age}: You exposed expired kitchen imports, winning journalism honors.`);
        }
      },
      {
        choiceText: 'Blackmail the head cafeteria cook to receive free gourmet cookies daily.',
        outcomeText: 'He glares with deep hatred, but slips you a giant warm cinnamon tray every single morning. Your sugar levels are loaded, but your karma darkens.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -45, happiness: 22, health: -10, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You corruptly blackmailed food cooks to secure free treats.`);
        }
      },
      {
        choiceText: 'Ignore the slips, throwing them deep inside the shredding drums.',
        outcomeText: 'You avoid the kitchen school politics, sticking to quiet studies. The status remains calm, but you continue to pack your own sandwiches.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -10, smarts: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You discarded files to remain outside administrative disputes.`);
        }
      },
      {
        choiceText: 'Draft a comic booklet about the chocolate goblin who steals chocolate pots.',
        outcomeText: 'The booklet is incredibly funny and sells out for 50 cents a copy! You make pocket change while amusing the classrooms.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 20 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance + 35, -100000);
          state.log.push(`Age ${state.characterInfo.age}: You turned structural cafeteria controversies into a funny custom cartoon zine.`);
        }
      }
    ]
  },
  {
    id: 'teen_first_heartbreak',
    title: 'The Five-Word Text 💔',
    description: 'You drop your books in shock. Your partner of six months sends you a chilling, cold text message: "I think we should stop." Your stomach collapses.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Write a dignified, brief reply: "Understood. Wish you the best."',
        outcomeText: 'Your heart breaks, but you preserve absolute maturity and quiet dignity. Weeks pass, and your emotional centers heal with deep pride in your composure.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 22, happiness: -10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You navigated your first high school breakup with outstanding quiet dignity.`);
        }
      },
      {
        choiceText: 'Post forty sad acoustic guitar breakup cover lines on your video feed.',
        outcomeText: 'You look incredibly dramatic. Some classmates pity you, but others laugh quietly at your intensely public displays. Very cringey.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -15, happiness: -15, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: You shared breakup video covers, losing campus face.`);
        }
      },
      {
        choiceText: 'Slam your smartphone against the floor, shattering the glass screen.',
        outcomeText: 'You release raw fury! The device is completely ruined, your knuckles are sore, and your parent refuses to fund a replacement screen.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -5, happiness: -20, stress: 25 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 150, -100000);
          state.log.push(`Age ${state.characterInfo.age}: You smashed your digital handset in a wave of romantic heartbreak.`);
        }
      },
      {
        choiceText: 'Pack your athletic gear and run ten miles around the school track.',
        outcomeText: 'You run until your lungs burn and your thighs feel like melting wood. The raw physical exhaustion burns out your sorrow, leaving you sleep-ready.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, happiness: -5, stress: -20 });
          state.log.push(`Age ${state.characterInfo.age}: You utilized intense running to purge teenager heartbreak.`);
        }
      }
    ]
  },
  {
    id: 'teen_camping_escape',
    title: 'The Mountain Pine Sleep 🌲',
    description: 'Your close friends plan an unchaperoned summer camping trip inside the dark, misty mountain pines. It is technically forbidden without signed parent clearance sheets.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Escape through your window at midnight to join the mountain trail.',
        outcomeText: 'Magnificent! You roast marshmallows under the bright canopy stars, sharing beautiful secrets around a warm fire. An unforgettable lifetime memory.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 35, looks: 10, stress: -25, karma: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You snuck off to participate in a wild unchaperoned pine mountain camping escape.`);
        }
      },
      {
        choiceText: 'Secure an official signed permission form with honest family discussion.',
        outcomeText: 'Your parent is hesitant but respects your mature approach. They sign the sheets and lend you a premium wool thermal tent! Safe and glorious.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, happiness: 30, stress: -15 });
          const parent = state.relationships.find(r => r.relationshipType === 'Parent');
          if (parent) parent.relationshipValue = Math.min(100, parent.relationshipValue + 15);
          state.log.push(`Age ${state.characterInfo.age}: You secured parental clearance for forest hiking trips via honest discussion.`);
        }
      },
      {
        choiceText: 'Inform your friends parent about the lack of safety guides at the creek.',
        outcomeText: 'The trip gets canceled instantly! Your friends are incredibly angry, refusing to sit with you in class for a semester.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 15, looks: -20, happiness: -15, stress: 30 });
          state.log.push(`Age ${state.characterInfo.age}: You reported a forest trek to parents, destroying school social bonds.`);
        }
      },
      {
        choiceText: 'Flog off high-potency bug lights from your fathers garage stock to the crew.',
        outcomeText: 'You sell them three lanterns for $60. They are perfectly protected from mosquitoes, and your pockets are loaded with crisp cash.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 15, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance + 60, -100000);
          state.log.push(`Age ${state.characterInfo.age}: You sold lanterns for your friends camping supplies.`);
        }
      },
      {
        choiceText: 'Reject the trip, spending the weekend researching forestry codes.',
        outcomeText: 'You read detailed papers on wilderness ecology. Your scientific intelligence scales, but your weekend is quiet and solitary.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 22, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You spent forest weekends analyzing woodland flora guides.`);
        }
      }
    ]
  },
  {
    id: 'teen_library_job_peace',
    title: 'The Silent Library Aide 📚',
    description: 'You are employed sorting antique books in the cold, silent municipal library archives under a head archivist who shushes anyone breathing audibly.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Sort the historical manuscripts meticulously using the Dewey Decimal system.',
        outcomeText: 'You work in absolute, meditative focus. Your mind expands as you browse ancient cartography pages, and you make an extra $350 monthly!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, happiness: 15, stress: -20 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance + 350, -100000);
          state.characterInfo.currentOccupation = 'Library Archive Assistant';
          state.finances.annualSalary = 4200;
          state.log.push(`Age ${state.characterInfo.age}: You secured an library sorting position, boosting your cognitive smarts.`);
        }
      },
      {
        choiceText: 'Read forbidden graphic novels in the quiet storage lanes.',
        outcomeText: 'You spend four hours reading epic science-fiction sagas behind a historical encyclopedic stack. Delighted, but your sorting quotas are missed.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 20, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You slacked off in library archives to read classic graphic novels.`);
        }
      },
      {
        choiceText: 'Rearrange the poetry shelves to display your own custom written zines.',
        outcomeText: 'Some scholars buy your booklets! The head librarian is annoyed by the clutter, but admires your artistic focus.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 15, happiness: 18, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance + 30, -100000);
          state.log.push(`Age ${state.characterInfo.age}: You distributed homemade poetry zines across library shelves.`);
        }
      },
      {
        choiceText: 'Accidentally topple an entire 12-foot stack of historical newspapers.',
        outcomeText: 'KABOOM! Paper sheets rain down across the floor. The librarian shushes you with such high frequency you think her lungs will burst.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -5, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: You collapsed a massive archive pile, triggering librarian fury.`);
        }
      }
    ]
  },
  {
    id: 'teen_college_essay',
    title: 'The Narrative Blank 💻',
    description: 'You sit staring at your blinking digital cursor. You need to write a profound 500-word essay for your university admissions application detailing "Your biggest life obstacle and growth".',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 17 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Draft a sincere, raw memoir regarding your genuine struggles with self-doubt.',
        outcomeText: 'The words flow like a mountain river! The admissions panel is deeply moved, sending you advanced fast-track acceptance documents for next term!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, happiness: 35, stress: 10 });
          state.education.grades = Math.min(100, state.education.grades + 30);
          state.log.push(`Age ${state.characterInfo.age}: You penned an outstanding, deeply moving college personal identity essay.`);
        }
      },
      {
        choiceText: 'Pay an online writer $60 to fabricate a tragic mountaineering rescue fable.',
        outcomeText: 'The essay reads beautifully but sounds slightly hollow. You pass the initial screens, but spend your nights fearing a plagiarism audit.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -35, smarts: 10, happiness: 15, stress: 20 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 60, -100000);
          state.log.push(`Age ${state.characterInfo.age}: You purchased an admissions essay online, risking severe plagiarism scans.`);
        }
      },
      {
        choiceText: 'Write a humorous, sarcastic critique of the university admissions system itself.',
        outcomeText: 'A bold gamble! The dean of arts loves your rebellious satirical courage, throwing down an active scholarship offer! Peak creative triumph.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 22, smarts: 25, happiness: 30, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You drafted a bold satirical critique of admissions testing, winning academic awards.`);
        }
      },
      {
        choiceText: 'Delay writing to play video game matches with your guild.',
        outcomeText: 'You achieve Diamond ranking in your matchmaker arena! Unfortunately, you miss the registration deadline by six minutes. Your parent is devastated.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: -10, happiness: 10, stress: 30 });
          state.education.grades = Math.max(0, state.education.grades - 40);
          state.log.push(`Age ${state.characterInfo.age}: You missed university application deadlines due to competitive video gaming runs.`);
        }
      }
    ]
  },
  {
    id: 'teen_sneaking_houseparty',
    title: 'The Midnight Stairs 🤫',
    description: 'You creep up the carpeted hallway stairs shoeless, returning at 2:00 AM from a loud concert. Suddenly, your foot steps on the creakiest wooden plank in the house.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Freeze mid-air, remaining balanced on one foot for six silent minutes.',
        outcomeText: 'The house stands silently. Your parent groans in his sleep upstairs, rolls over, and goes back to snoring. You slide into bed, safe!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 15, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You successfully escaped hallway detection with elite stealth balance.`);
        }
      },
      {
        choiceText: 'Claim loudly that you heard a burglar sniffing the front kitchen door.',
        outcomeText: 'Your parent leaps out of bed, grabbing a wooden rolling pin in panic! He checks the lock, praises your vigilance, and tells you to sleep. High-risk lies!',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -30, smarts: 15, happiness: 10, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: You fabricated home invasion reports to conceal your late hours.`);
        }
      },
      {
        choiceText: 'Let out a loud meow, pretending to be the sleepy orange cat.',
        outcomeText: 'Your father calls down: "We don\'t own a cat!" He flips the hall lights, catches you in your concert shirt, and grounds you for two weeks.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -12, happiness: -10, stress: 15 });
          const parent = state.relationships.find(r => r.relationshipType === 'Parent');
          if (parent) parent.relationshipValue = Math.max(0, parent.relationshipValue - 15);
          state.log.push(`Age ${state.characterInfo.age}: You got caught sneaking in after a terrible feline impression.`);
        }
      },
      {
        choiceText: 'Confess your late hours honestly, presenting your parent with a fresh gas bakery donut.',
        outcomeText: 'He looks at the warm chocolate pastry. He takes a bite, sighs, and points you to your bed. Sincere records save the day.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 22, happiness: 12, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You honestly owned up to late hours, pacifying parents with fresh morning treats.`);
        }
      },
      {
        choiceText: 'Sprint up the remaining steps like an olympic runner.',
        outcomeText: 'Thud-thud-thud! You crash into your room. Your parents wake up immediately, storming your room in deep anger. Disaster.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -15, stress: 25 });
          state.log.push(`Age ${state.characterInfo.age}: You caused household panic by stampeding up the steps late.`);
        }
      }
    ]
  },
  {
    id: 'teen_peer_drink_pressure',
    title: 'The Basement Red Cup 🥤',
    description: 'You stand inside a dim, unchaperoned basement party. Several high school lacrosse seniors circle around you, handing you a red plastic cup filled with bubbling golden liquids: "Chug it down, kid. Don\'t be a baby."',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Chug the brew down under their cheering!',
        outcomeText: 'Your vision spins, the party feels amazing! However, you wake up in the morning on wet grass with a brutal, throbbing headache.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 22, health: -20, looks: -5, stress: -10, karma: -5 });
          if (Math.random() < 0.4) {
            const hasAddict = state.diseases.some(d => d.name === 'Alcohol Addiction');
            if (!hasAddict) {
              state.diseases.push({
                id: `dis-alc-${Math.random()}`,
                name: 'Alcohol Addiction',
                type: 'Addiction',
                healthDrainPerYear: 10,
                happinessDrainPerYear: 5,
                cureDifficulty: 'Medium'
              });
              state.log.push(`Age ${state.characterInfo.age}: You caved to peer pressure, contracting an active Alcohol Addiction.`);
            }
          } else {
            state.log.push(`Age ${state.characterInfo.age}: You drank heavily at a high school party, suffering a terrible hangover.`);
          }
        }
      },
      {
        choiceText: 'Pour the cup quietly into a massive decorative fern behind the couch.',
        outcomeText: 'You hydrate on tap water while chatting relaxed in the kitchen. You network beautifully, keeping your mind perfectly sharp.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, looks: 10, happiness: 15, karma: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You cleverly negotiated a basement house party without touching boozes.`);
        }
      },
      {
        choiceText: 'Call your parent to pick you up immediately, ignoring the teen jeers.',
        outcomeText: 'Your parent arrives in pajamas, deeply proud of your mature courage. Sincere family bonds are locked.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, happiness: 10, stress: -10 });
          const parent = state.relationships.find(r => r.relationshipType === 'Parent');
          if (parent) parent.relationshipValue = Math.min(100, parent.relationshipValue + 15);
          state.log.push(`Age ${state.characterInfo.age}: You made a mature parental request to escape late-night basement hazards.`);
        }
      },
      {
        choiceText: 'Decline with a dry sarcastic joke about the quality of their cheap brew.',
        outcomeText: 'They laugh, calling you a picky snob, but they respect your confidence and move on to other targets. Lungs and mind saved.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, looks: 15, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You deflected basement drink peer pressure with sharp-witted sarcasm.`);
        }
      }
    ]
  },
  // =========================================================================
  // DATA PACK 3: 25 JUNIOR TEEN DYNAMICS EVOLUTION CARDS (AGES 12-15)
  // =========================================================================
  {
    id: 'dp3_ad_12_15_01',
    title: 'The Gym Orientation Maze 🏫',
    description: 'During middle school orientation, you find yourself lost inside the vast, cold corridors of the third-floor athletic wing while looking for your math classroom.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Ask a tall, busy-looking teacher helper for map directions.',
        outcomeText: 'They kindly smile, giving you a customized school map and pointing out a fast shortcut that lands you in math class with minutes to spare.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 10, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You navigated school corridors successfully by requesting guidance from administrative helpers.`);
        }
      },
      {
        choiceText: 'Stalk a crowd of older students to see if they lead to classrooms.',
        outcomeText: 'You accidentally follow them into the private varsity locker rooms, getting extremely embarrassed when a coach yells at you to get out.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -10, stress: 15, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You followed wrong student crowds during orientation, getting trapped in athletic wings.`);
        }
      },
      {
        choiceText: 'Sit on a storage bin, studying your orientation catalog very carefully.',
        outcomeText: 'You map out the floor sectors logically. You determine the stairs layout yourself, building superb spatial confidence!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You solved complex school floor plans independently by decoding catalog schematics.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_02',
    title: 'The Dental Adjuster 🦷',
    description: 'The orthodontist tightens your dental braces, leaving your entire jaw throbbing, aching, and feeling extremely sore right before lunch.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Request a bowl of ice-cold fruit yogurt from the cafeteria staff.',
        outcomeText: 'The freezing yogurt numbs your aching gums instantly, helping you survive the hard school day in comfort.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 12, happiness: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You managed braces orthodontic soreness using cold dietary substances.`);
        }
      },
      {
        choiceText: 'Chew a hard, crunchy apple to break the wire tension.',
        outcomeText: 'Ouch! A metal bracket snaps off your back tooth with a sharp pop! You spend three hours at the emergency dental clinic.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -15, stress: 20, happiness: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You damaged orthodontic hardware by chewing hard fruits, requiring clinical repairs.`);
        }
      },
      {
        choiceText: 'Bear the pain silently while focusing on your social studies tasks.',
        outcomeText: 'You show remarkable grit, although the pounding jaw headache slightly hampers your focus.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, health: 5, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You maintained class focus despite high dental pain levels.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_03',
    title: 'The Comic Creators 🎨',
    description: 'You and three classmates decide to form a clandestine club dedicated to drawing sci-fi comics in your basement.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Draft an elaborate alien backstory universe with multiple solar systems.',
        outcomeText: 'The crew is inspired! Your sci-fi galaxy comic becomes an absolute hit among middle school fantasy layers.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, happiness: 18, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You established secret comic clubs, designing intricate fictional galaxy systems.`);
        }
      },
      {
        choiceText: 'Design custom club identity cards using black felt markers.',
        outcomeText: 'You look incredibly stylish when flashing the badges during lunch. Excellent social bonding work!',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 12, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You crafted stylish membership cards for private adolescent creative clans.`);
        }
      },
      {
        choiceText: 'Invest all your pocket savings to purchase high-quality gel ink lines.',
        outcomeText: 'The glossy inks look incredible on the panels, although your cash reserves are temporarily clean.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 15, 0);
          state.log.push(`Age ${state.characterInfo.age}: You funded private comic projects by purchasing premium graphic arts materials.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_04',
    title: 'The Bowl Cut Tragedy 💇',
    description: 'Your older sister offers to trim your shaggy hair to save family funds, but she accidentally slips, leaving you with a jagged bowl cut.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Wear a bright orange winter beanie to cover your scalp.',
        outcomeText: 'It is warm and stylish, although classmates puzzle why you keep a thick woolen cap on during indoor history lessons.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 5, happiness: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You concealed bad sibling haircuts under thermal beanies during classes.`);
        }
      },
      {
        choiceText: 'Embrace the weird asymmetric cut, calling it retro punk fashion.',
        outcomeText: 'Your bold confidence completely disarms any joke makers! Two artsy kids even copy your haircut style.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 15, happiness: 20, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You turned family haircut mistakes into retro punk statements, building personal confidence.`);
        }
      },
      {
        choiceText: 'Weep in your closet and refuse to go to school on Monday.',
        outcomeText: 'Your parent forces you to board the yellow bus anyway. You spend the day hiding behind your textbooks, feel intense shame.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -15, stress: 25, happiness: -12 });
          state.log.push(`Age ${state.characterInfo.age}: You chose social withdrawal after minor hairstyle accidents.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_05',
    title: 'The Allowance Audit 🪙',
    description: 'Your parents grant you a weekly allowance of ten dollars, but declare you must present a ledger proving how you allocate funds.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Save every penny inside a physical steel coin bank.',
        outcomeText: 'Your piggy bank grows extremely heavy! Your parents are so proud of your thrift they match your savings with a bonus!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, karma: 15, happiness: 12 });
          state.finances.cashBalance = Math.min(state.finances.cashBalance + 20, 2000000);
          state.log.push(`Age ${state.characterInfo.age}: You practiced absolute capital savings discipline, earning parental interest matches.`);
        }
      },
      {
        choiceText: 'Splat the funds immediately on sugary cherry soda pops.',
        outcomeText: 'You enjoy severe sugar rushes with buddies on the sidewalk, but present an completely blank ledger to disappointed parents.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, health: -8, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You spent micro-budgets on carbonated fruit snacks, failing savings audits.`);
        }
      },
      {
        choiceText: 'Invest in a second-hand math calculator at garage sales.',
        outcomeText: 'Outstanding moves! You accelerate your algebra calculation speeds, earning high academic praises.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, stress: -5 });
          if (state.education) state.education.grades = Math.min(100, state.education.grades + 5);
          state.log.push(`Age ${state.characterInfo.age}: You allocated micro-cash toward used geometry calculations, boosting school standing.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_06',
    title: 'The Cafeteria Frontier 🍔',
    description: 'You walk into the roaring, high-pressure cafeteria on the first day of high school, holding a hot plastic tray.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Sit with the quiet chess kids who are analyzing a game board.',
        outcomeText: 'They welcome you warmly! You eat peacefully while analyzing complex king defenses, securing quiet buddies.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 15, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You allied with quiet mathematical chess packs during cafeteria sitting migrations.`);
        }
      },
      {
        choiceText: 'Clamber onto the loud central bench where the varsity kids sit.',
        outcomeText: 'They stare at you like you are a foreign insect, making a sharp joke about your socks. Your status takes a small hit.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -10, stress: 15, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You attempted bold sit-ins with elite athletic clubs, facing brief social hurdles.`);
        }
      },
      {
        choiceText: 'Eat your lunch sandwich sitting on the quiet hallway bench.',
        outcomeText: 'You enjoy total silence, keeping your system perfectly balanced away from any schoolyard noise.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 10, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You selected peaceful hallway isolation for carbohydrate consumption.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_07',
    title: 'The Class Photo Hazard 📸',
    description: 'Right before the official grade class photograph is shot, a massive green leafy fiber of spinach gets wedged between your front braces wire.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Slickly remove the fiber using a wood toothpick in the bathroom mirror.',
        outcomeText: 'Clean extraction! You sprint back to position and flash a brilliant, silver-filled smile that looks highly polished.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 20, happiness: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You averted orthodontic selfie disasters using rapid bathroom mirror sweeps.`);
        }
      },
      {
        choiceText: 'Smirk with your lips tightly closed to hide your teeth panels.',
        outcomeText: 'You look slightly suspicious and serious in the photo, but you prevent any green debris from being preserved forever.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 5, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You closed mouth borders during official photos to shield hardware dental foods.`);
        }
      },
      {
        choiceText: 'Smile widely, ignoring the greens entirely.',
        outcomeText: 'Oh dear! The high-intensity flash captures the bright green spinach leaf perfectly. The photo booklet circulates for years.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -15, happiness: -8, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You immortalized lunch spinach chunks in official high school directories.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_08',
    title: 'The Hooded Blueprint 🧥',
    description: 'Your private basement scifi club wants to design custom hooded sweatshirts to declare their gang autonomy to the schoolyard.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Hand-paint a neon geometric falcon emblem across the backing.',
        outcomeText: 'It looks incredibly artistic! Everyone in your group wears them with deep pride, forming a super creative fortress.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, looks: 15, happiness: 20, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You engineered handcrafted geometric club hoodies, establishing block prestige.`);
        }
      },
      {
        choiceText: 'Abandon the project to preserve your high school dress code files.',
        outcomeText: 'You play it perfectly safe, bypassing any possible administrator debates over gang uniforms.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 10, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You canceled private group fabric orders to maintain full school dress compliance.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_09',
    title: 'The Wool Cap Cover 🧢',
    description: 'Staring at your sister\'s jagged hair clipper lines in the bathroom mirror, you hear your school bus horn honking outside.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Sprint out the door wearing a flat grey baseball cap.',
        outcomeText: 'The hall monitor demands you strip the cap off. You explain the hair surgery situation, and she lets you off with warnings.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You negotiated cap codes with school hallway authorities to cover jagged scalps.`);
        }
      },
      {
        choiceText: 'Sprint into class bare-headed, laughing at your own bald patches.',
        outcomeText: 'You own the disaster so hard that your classmates laugh with you, completely bypassing any malicious teasing sessions!',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 10, happiness: 22, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You neutralized bad clipper lines by displaying them humorous to classmates.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_10',
    title: 'The Garage Wheels 🚲',
    description: 'A rusty, high-frame touring bicycle sits at a neighborhood garage sale for fifteen cash dollars. Your feet long for speed.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Invest fifteen cash dollars to purchase and refurbish the bike frame.',
        outcomeText: 'You clean the sprockets, apply blue grease, and polish the steel! You possess an extremely fast machine that takes you anywhere.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 20, smarts: 15, happiness: 18, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 15, 0);
          state.log.push(`Age ${state.characterInfo.age}: You purchased and restored vintage touring bicycles, boosting physical stamina.`);
        }
      },
      {
        choiceText: 'Decline the transaction, reserving cash for candy stores.',
        outcomeText: 'You keep your liquid cash balances high, but remain dependent on school buses for local commutes.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You conserved liquid micro-currency, bypassing used hardware sales.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_11',
    title: 'The Chemical Beak Spill 🧪',
    description: 'During a junior chemistry laboratory, your partner clumsily knocks a glass beaker of purple ammonia onto your desk papers.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Neutralize the spill immediately using a box of dry baking soda.',
        outcomeText: 'Fizz! The gas releases, and the table is perfectly clean before teachers notice! Total scientific crisis resolution!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, happiness: 15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You neutralized chemistry laboratory spills using chemical base compounds.`);
        }
      },
      {
        choiceText: 'Scream and leap backward away from the fumes.',
        outcomeText: 'You escape stains, although your partner is forced to clean up the table alone under deep teacher glares.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -15, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You evacuated chemistry desks during standard acid spills, leaving partners behind.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_12',
    title: 'The Oak Woods Campfire 🪵',
    description: 'Your private comic club slips out to the oak woods behind the subdivision, lighting a tiny, warm camp fire near the creek.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Douse the campfire completely with buckets of cool creek water.',
        outcomeText: 'Sssss! The coals turn to cold charcoal mud. You safeguard the woods from forestry fire dangers perfectly.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, smarts: 18, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You enforced forest safety protocols, dousing minor backyard campfires.`);
        }
      },
      {
        choiceText: 'Roast sweet vanilla marshmallows while discussing galactic lore.',
        outcomeText: 'It is a magical evening! The stars shine, and your club bonds become incredibly strong, although forestry rules are bypassed.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 22, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You bonded around midnight creek campfires, planning galactic character story arcs.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_13',
    title: 'The Green Bangs Incident 💇',
    description: 'Using a cheap drugstore bottle of neon green hair gel, you tint your bangs right before a family banquet.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Wash your hair five times with strong kitchen hand soap.',
        outcomeText: 'The green fades to a strange moldy yellow tone, but it looks mostly clean of any chemical brightness. Scalp saved.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 5, health: -5, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You washed out chemical hair dyes using dish soap sheets before family dinners.`);
        }
      },
      {
        choiceText: 'Walk into the formal banquet hall displaying the neon green hair proudly.',
        outcomeText: 'Your grandparents gasp! Your uncle laughs and calls you a green grasshead, but you style the cosmic shade beautifully.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 12, happiness: 18, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You debuted neon green hair modifications during formal family events.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_14',
    title: 'The Desk Whisperers 💬',
    description: 'Your study partner whispers a spicy rumor about your desk neighbor having an active crush on you.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Confront your desk neighbor honestly, laughing about the rumor.',
        outcomeText: 'They blush red but smile, thanking you for your mature honesty. You form an awesome, stress-free classroom friendship!',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 15, happiness: 20, stress: -12 });
          state.log.push(`Age ${state.characterInfo.age}: You settled classroom crushes rumors through direct, transparent communications.`);
        }
      },
      {
        choiceText: 'Spread a secondary rumors about your partner to divert attention.',
        outcomeText: 'A massive schoolyard gossip web ignites! The counselor calls everyone into her room, warning you about cyber-bullying logs.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -25, stress: 20, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You generated defensive social gossip, resulting in schoolyard counseling logs.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_15',
    title: 'The Rubber Band Crack 🦷',
    description: 'During your official junior speech contest on stage, your orthodontists double neon rubber bands snap with a loud crack, hitting your tongue.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Swallow the band fragments slickly and continue speaking.',
        outcomeText: 'You survive the speech beautifully! The crowd praises your intense, uninterrupted stage delivery, awarding you top honors.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, happiness: 20, stress: 10 });
          if (state.education) state.education.grades = Math.min(100, state.education.grades + 8);
          state.log.push(`Age ${state.characterInfo.age}: You executed speech presentations flawlessly despite internal dental band snaps.`);
        }
      },
      {
        choiceText: 'Stop, extract the broken neon bands, and laugh at the mechanical failure.',
        outcomeText: 'The entire audience laughs along with your lighthearted joke! You lose minor oratorical points but emerge as a total crowd favorite.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 15, happiness: 18, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You defused public orthodontic snaps with stage humor, gaining peer popularity.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_16',
    title: 'The Digital Console Savings 🎮',
    description: 'Your favorite video game console drops in price to exactly forty cash dollars at the local thrift shop.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Invest forty cash dollars to purchase the game system.',
        outcomeText: 'You plug the console into the basement screen, exploring endless cosmic fantasy virtual maps alongside your team!',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 25, stress: -15 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 40, 0);
          state.log.push(`Age ${state.characterInfo.age}: You funded home video game systems, lowering your study focus stress.`);
        }
      },
      {
        choiceText: 'Decline the buy, keeping your cash for potential college bounds.',
        outcomeText: 'Your self-control is incredibly mature! Your cash reserves are perfectly healthy while friends game.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You bypassed non-essential gaming hardware purchases to secure savings.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_17',
    title: 'The Gym Spray Blast 💨',
    description: 'A rowdy varsity locker crowd is spray-blasting super concentrated cherry deodorant aerosols near your gym shelf.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Evacuate the locker space, changing in hallway bathroom stalls.',
        outcomeText: 'You avoid the toxic, chemical cherry clouds! Your lungs are perfectly clean for the afternoon running tests.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, smarts: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You avoided aerosol-heavy locker room clouds, protecting respiratory health.`);
        }
      },
      {
        choiceText: 'Confront them about the suffocating chemical smells.',
        outcomeText: 'They snicker, spraying a small burst near your backpack. You face minor peer friction but feel brave.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -5, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You confronted locker room sprayers over chemical deodorant plumes.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_18',
    title: 'The Talent solo Cracker 🎹',
    description: 'During your middle school keyboard solo, your finger slips on a flat key, producing a massive, jarring squeak over the hall speakers.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Continue playing with high dramatic focus, improvising a jazz chord.',
        outcomeText: 'Brilliant recovery! The audience believes the discord was a complex modern jazz experiment, cheering your genius.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, looks: 15, happiness: 18, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You salvaged musical stage errors using prompt jazz improvisation maneuvers.`);
        }
      },
      {
        choiceText: 'Stop playing and run off stage in absolute tears.',
        outcomeText: 'You hide in the band room, but your parent cuddles you, assuring you that every great maestro slips up occasionally.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -12, stress: 20, happiness: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You suffered acute stage anxiety after keyboard finger slips.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_19',
    title: 'The Branch Club Turf 🌲',
    description: 'Another gang of kids claims the cedar clearing near your comic clubs creek campfire site.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Invite them to join your club, merging comic story lines.',
        outcomeText: 'An outstanding alliance! Your joint club becomes a massive neighborhood alliance, designing incredible space hero posters.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, happiness: 22, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You brokered woodland club mergers with rival adolescent groups.`);
        }
      },
      {
        choiceText: 'Challenge their leader to an intense water balloon duello.',
        outcomeText: 'Splash! You douse him cleanly from twenty feet! They concede the cedar lot while laughing at the fun battle.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 15, health: 12, happiness: 18 });
          state.log.push(`Age ${state.characterInfo.age}: You settled woodland territorial claims using classic water balloon projectile battles.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_20',
    title: 'The Flea Shampoo Error 🐕',
    description: 'You accidentally wash your hair using your dog\'s medicated anti-flea shampoo during a sleepy morning shower.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Apply rich vanilla conditioners to cover the tar smell.',
        outcomeText: 'Your hair smells slightly like sweet vanilla medicine, but it looks incredibly glossy and clean of any bugs.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 8, happiness: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You resolved canine shampoo errors using high-grade cosmetic conditioners.`);
        }
      },
      {
        choiceText: 'Go to school smelling strongly of chemical dog tar.',
        outcomeText: 'Classmates wrinkle their noses, asking if you spent the weekend working at veterinarian shelters. Minor embarrassment.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -12, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You attended class assemblies smelling of medicated dog flea shampoo.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_21',
    title: 'The Locked Lock 🔐',
    description: 'You stand before your metal locker, completely blanking out on your three-digit physical combination before math quizzes.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Close your eyes and let your muscle memory spin the dial.',
        outcomeText: 'Click-click-pop! Your fingers recall the rhythm flawlessly! You grab your geometry notes and run to class.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 15, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You unlocked blocked vault doors using subconscious finger muscle memory.`);
        }
      },
      {
        choiceText: 'Sprint to the main office requesting master locker prints.',
        outcomeText: 'You get the combo code sheets but arrive ten minutes late for your geometry math quiz, taking small scores.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: -5, stress: 12 });
          if (state.education) state.education.grades = Math.max(0, state.education.grades - 3);
          state.log.push(`Age ${state.characterInfo.age}: You requested administrative code copies after blanking locker digit systems.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_22',
    title: 'The Pizza Swap 🍕',
    description: 'Your tray holds a soggy cafeteria square pizza slice, while the top math scholar is looking for clean apples to study.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Trade your greasy square pizza for their crisp fresh apples.',
        outcomeText: 'You enjoy healthy, refreshing natural fibers that fuel your brain loops, while they satisfy junk cravings.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, smarts: 15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You swapped cafeteria square pizzas for academic vitamin apples.`);
        }
      },
      {
        choiceText: 'Devour the greasy square pizza slice, loving the starch calories.',
        outcomeText: 'It tastes like glorious fatty cheese, but leaves you feeling extremely drowsy and tired during afternoon grammar exercises.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, health: -8, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You consumed high-starch square cafeteria pizzas, suffering afternoon brain slumps.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_23',
    title: 'The Plaque Indicator 🦷',
    description: 'Your dentist hands you a pair of glowing pink chew-tablets designed to highlight tooth areas you forgot to brush.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Chew the tablet and execute a massive, surgical brushing sweep.',
        outcomeText: 'Your teeth are brilliantly white! The dentist is in complete awe, declaring your gum lines pristine.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 18, looks: 12, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You used chemical plaque indicators to achieve surgical tooth brushing metrics.`);
        }
      },
      {
        choiceText: 'Toss the dye tablet in the clinic waste trash box.',
        outcomeText: 'You avoid pink stains on your lips, but miss key indicators for flossing targets.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: -5, health: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You skipped dental dye indicators, maintaining average tooth metrics.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_24',
    title: 'The Comic Recruits 📣',
    description: 'Your private comic club wants to recruit the schoolyard\'s lead graphic artist, but they demand a formal initiation trial first.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Demonstrate your advanced galactic storyline outlines to sway them.',
        outcomeText: 'They are completely mesmerized by your science fiction lore! They join immediately, sketching beautiful pages!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, looks: 10, happiness: 18 });
          state.log.push(`Age ${state.characterInfo.age}: You recruited elite school illustrators using advanced plot pitches.`);
        }
      },
      {
        choiceText: 'Refuse to host initiation trials, maintaining flat group equality.',
        outcomeText: 'They join a rival gaming community instead, but your club preserves its close-knit, friendly basement bonds.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 20, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You rejected membership initiation tests, protecting team egalitarian values.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_12_15_25',
    title: 'The Used Console Repair 🛠️',
    description: 'The used video game console you bought from class thrift stalls begins flashing red blinking light errors.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 12 && age <= 15;
    },
    choices: [
      {
        choiceText: 'Open the console casing and replace the dusty thermal paste.',
        outcomeText: 'Success! The red failure light fades, and the cooling fans blow silently! You feel like a master computer engineer!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, happiness: 20, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You repaired gaming systems manually by applying fresh thermal components.`);
        }
      },
      {
        choiceText: 'Kick the plastic console shell and throw it in trash bin files.',
        outcomeText: 'Crash! You break the logic board completely, losing your gaming system and your pocket cash savings.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: -10, happiness: -12, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You destroyed failing micro-systems during brief anger spikes.`);
        }
      }
    ]
  },

  // =========================================================================
  // DATA PACK 3: 25 HIGH SCHOOL & INDEPENDENT THRESHOLDS (AGES 16-17)
  // =========================================================================
  {
    id: 'dp3_ad_16_17_01',
    title: 'The English Cafe Crack ☕',
    description: 'During a very long, quiet English reading session, you feel your eyelids drooping. In your pocket is a giant, cheap cold energy drink.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Crack the aluminum tab under your desk very slowly to drink.',
        outcomeText: 'KH-SSSH! The loud click echoes. The instructor glances over, but you slide the can behind your bag, absorbing focus caffeine.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, stress: -10, happiness: 12 });
          if (state.education) state.education.grades = Math.min(100, state.education.grades + 2);
          state.log.push(`Age ${state.characterInfo.age}: You sneaked chilled caffeine energy fluids in English lectures to fuel reading focus.`);
        }
      },
      {
        choiceText: 'Ask for water fountain permits to splash cold water on your eyes.',
        outcomeText: 'You hydrate peacefully, avoiding any school desk rule breaks while staying perfectly alert.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, smarts: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You utilized water hall permits to clear exhaustion fatigue.`);
        }
      },
      {
        choiceText: 'Rest your head on the wooden table for a brief five-minute nap.',
        outcomeText: 'The teacher taps your shoulder with a heavy dictionary, giving you zero scores for the daily reading sheet.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: -10, stress: 15, happiness: -5 });
          if (state.education) state.education.grades = Math.max(0, state.education.grades - 5);
          state.log.push(`Age ${state.characterInfo.age}: You fell asleep on desks during English sessions, losing class credits.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_02',
    title: 'The Counter Conflict Cracker 💬',
    description: 'While chatting at the local soda counter, your crush declares they think you both are "just wonderful platonic study partners."',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Accept the boundary gracefully and purchase their lemon soda.',
        outcomeText: 'Your mature calm is incredibly attractive! Sincere friendly connections are locked, and your self-esteem remains perfectly healthy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, smarts: 15, happiness: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You processed platonic relationship boundaries with high maturity and grace.`);
        }
      },
      {
        choiceText: 'Recite a dramatic romantic poem to sway their feelings.',
        outcomeText: 'They look slightly uncomfortable, finish their soda rapidly, and remember they have urgent math homework to finish. Harsh silence.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -10, stress: 15, happiness: -8 });
          state.log.push(`Age ${state.characterInfo.age}: You attempted over-dramatic romantic speech pitches, creating cozy hurdles.`);
        }
      },
      {
        choiceText: 'Shrug it off and ask if their friends are seeking dates.',
        outcomeText: 'They laugh at your bold cheekiness! The tension melts immediately, preserving nice soda counter chats.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 12, smarts: 10, happiness: 12 });
          state.log.push(`Age ${state.characterInfo.age}: You diverted romantic counters using rapid cheek humor.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_03',
    title: 'The Grocery Tomato Duel 🍅',
    description: 'During your part-time grocery shift, an angry shopper shakes a plastic bag of slightly soft tomatoes directly in your face: "Refund me!"',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Apologize and swap the tomatoes for crisp organic ones.',
        outcomeText: 'The shopper calms down instantly, praising your wonderful customer service. Your manager awards you a star worker badge!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, karma: 20, happiness: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You defused hostile retail confrontations by exchanging produce bags.`);
        }
      },
      {
        choiceText: 'Advise them that soft tomatoes are perfect for pasta sauces.',
        outcomeText: 'They scream for the grocery boss. You get a hot corporate lecture on client satisfaction boundaries.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: -5, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You argued culinary details with grocery shoppers, getting boss warning notes.`);
        }
      },
      {
        choiceText: 'Call the customer service supervisor to process refunds.',
        outcomeText: 'You hand the problem to corporate desks. You stay perfectly calm while structural protocols handle complaints.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You referred grocery floor disputes to supervisor authorities.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_04',
    title: 'The Vintage Graduation Selection 👔',
    description: 'You explore a vintage thrift shop looking for formal clothing styles to wear for your senior graduation dinner ball.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Purchase a classic, perfectly tailored charcoal wool suit.',
        outcomeText: 'You look incredibly handsome and mature! The tailoring is crisp, making you an absolute highlight of the formal photos.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 25, happiness: 20, stress: -10 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 35, 0);
          state.log.push(`Age ${state.characterInfo.age}: You acquired vintage tailored wool suits for senior graduation programs.`);
        }
      },
      {
        choiceText: 'Select a bright pink suit velvet jacket with giant buttons.',
        outcomeText: 'It is a wild, hilarious statement! Classmates crowd around to capture photos of your vintage styling courage!',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 12, happiness: 22, stress: 5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 25, 0);
          state.log.push(`Age ${state.characterInfo.age}: You styled neon velvet jackets for formal graduation events.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_05',
    title: 'The Study Hall Jitters 🥤',
    description: 'You consume two high-potency cheap energy drinks back-to-back before study hall quizzes, and your hands begin shaking intensely.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Execute deep breathing exercises to lower your heart rate.',
        outcomeText: 'Your pulse settles. Your mind clears, allowing you to pass your math quiz sheets in perfect comfort.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 12, smarts: 18, stress: -15 });
          if (state.education) state.education.grades = Math.min(100, state.education.grades + 3);
          state.log.push(`Age ${state.characterInfo.age}: You utilized breathing focus to settle double caffeine jitters.`);
        }
      },
      {
        choiceText: 'Slam a cold liter bottle of water to dilute the caffeine.',
        outcomeText: 'You run to the restroom four times, but wash away the shakes successfully, saving your body stamina lines.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You diluted metabolic stimulant spikes using heavy hydration protocols.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_06',
    title: 'The Quill Verses 📖',
    description: 'You decide to write a hand-inked poetry card expressing classic romantic appreciation for your study friend.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Weave subtle, clever wordplay references about your shared biology folder.',
        outcomeText: 'They read it, blush happily, and tuck the card inside the cover of their diary. Deep romantic sparks form!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, looks: 12, happiness: 22, stress: -12 });
          state.log.push(`Age ${state.characterInfo.age}: You composed clever wordplay verses, lighting romantic sparks with study friends.`);
        }
      },
      {
        choiceText: 'Copy cheesy generic candy slogans onto the parchment.',
        outcomeText: 'They think the card is a gag joke, chuckling at the cheesy text while keeping things in safe friend territories.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 5, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You shared humorous generic candy card lines, preserving friendly boundaries.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_07',
    title: 'The Register Gap 💵',
    description: 'During your cash register shift, your electronic ledger reports a ten-dollar shortage at closing hour.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Add ten cash dollars of your own funds to balance the tray.',
        outcomeText: 'The spreadsheet matches perfectly. Your manager praises your perfect financial audit cleanliness, booking your shift bonus.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 20, smarts: 12, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 10, 0);
          state.log.push(`Age ${state.characterInfo.age}: You balanced cash register tray shortages using personal funds ($-10).`);
        }
      },
      {
        choiceText: 'Report the discrepancy honestly to your grocery manager.',
        outcomeText: 'They thank you for your integrity. They show you how processing bugs caused the error, restoring our cash sheet.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, smarts: 20, happiness: 12 });
          state.log.push(`Age ${state.characterInfo.age}: You declared retail register shortages honestly, resolving tracking software glitches.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_08',
    title: 'The Yearbook Quote Battle 📖',
    description: 'The senior yearbook panel alerts you that your chosen funny quote contains characters violating publication layouts.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Substitute a classic, elegant quote from historical works.',
        outcomeText: 'A stellar choice! When the yearbook circulates, teachers and classmates praise your cultured intellect.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, looks: 15, happiness: 18 });
          state.log.push(`Age ${state.characterInfo.age}: You selected elegant historical quotes for senior publication directories.`);
        }
      },
      {
        choiceText: 'Withdraw our profile details completely in silent protest.',
        outcomeText: 'Your photo printed with a blank white box, making you look slightly distant from school communities.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -5, stress: 10, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You retracted profile pictures from high school yearbooks over quote layout bans.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_09',
    title: 'The schoolbag Cold drinks 🎒',
    description: 'You stock your schoolbag with cold soda cans purchased cheaply, launching a micro-beverage store inside study hall rails.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Sell chilled cans to tired students during biology classes.',
        outcomeText: 'You rake in thirty dollars cash! Your classmates love the accessible soda bottles, and you feel like a merchant giant.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, happiness: 18 });
          state.finances.cashBalance = Math.min(state.finances.cashBalance + 30, 2000000);
          state.log.push(`Age ${state.characterInfo.age}: You ran private hallway soda registers, capturing cash profits (+$30).`);
        }
      },
      {
        choiceText: 'Shut down the beverage shelf to prevent counselor detentions.',
        outcomeText: 'You focus on biology study sheets instead, earning an A grade while maintaining clean discipline records.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 20, stress: -15 });
          if (state.education) state.education.grades = Math.min(100, state.education.grades + 5);
          state.log.push(`Age ${state.characterInfo.age}: You prioritized biology research, bypassing hallway retail ventures.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_10',
    title: 'The Tagging Controversy 📱',
    description: 'Your study friend uploads a silly photo of you sleeping on your math sheet, tagging your profile in the school networks.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Untag your profile quietly and send them a funny text.',
        outcomeText: 'They understand your comfort boundary immediately, replace the photo with a stylish picture, and text you giggles.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, looks: 10, happiness: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You filtered school network portrait tags with subtle tact.`);
        }
      },
      {
        choiceText: 'Launch an active media crusade to spam their walls.',
        outcomeText: 'The school network ignites with noisy comments. Sincere friendships take a hit amidst the public flame war.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -20, looks: -5, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You engaged in loud online profile matches, straining study friendships.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_11',
    title: 'The Shoe Floor Cascade 🥾',
    description: 'During your holiday shift at the shoe store, you knock over a massive pillar of forty leather boot cartons.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Organize the boot cartons back into perfect size categories.',
        outcomeText: 'Your tidy stack looks cleaner than it did before the fall! Your warehouse manager is deeply impressed by your stellar work ethic.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, health: 15, happiness: 15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You salvaged shoe warehouse collapses, cataloging stocks with precision.`);
        }
      },
      {
        choiceText: 'Nudge the pile under a bench corner out of sight.',
        outcomeText: 'An elderly client trips over the loose boxes, causing a massive store scene. You get suspended for three shifts.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -15, stress: 20, happiness: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You concealed inventory accidents, leading to store floor client safety hazards.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_12',
    title: 'The Group Picture Setup 📸',
    description: 'Your high school senior class plans a formal sunset group shoot on the bay, but the photographer is late.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Use your optical tri-pod and smartphone timer to capture the shot.',
        outcomeText: 'Outstanding results! You coordinate eighty students flawlessly, capturing a gorgeous golden hour photo that crowns yearbooks.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, looks: 15, happiness: 22, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You organized large-scale student assemblies to photograph golden graduation portraits.`);
        }
      },
      {
        choiceText: 'Sit on the dock boards, throwing smooth pebbles into the lake.',
        outcomeText: 'You relax beautifully, letting others stress about schedules while enjoying peaceful tide movements.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 12, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You enjoyed quiet beach moments, bypassing formal scheduled school shoots.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_13',
    title: 'The Concrete Tire Scrap 🚗',
    description: 'During your official driver license exam, you scrape the front tire sidewall slightly against a concrete parking curb.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Inhale structural breaths and complete your lane merges.',
        outcomeText: 'Perfect recovery! The evaluator smiles at your composed composure, marking a minor curb penalty but issuing your real license!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, happiness: 25, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You secured your vehicle driver license despite minor curb collision penalties.`);
        }
      },
      {
        choiceText: 'Yell at the test examiner that the parking curb was too high.',
        outcomeText: 'They instantly fail your sheet, ordering you to retake driver clinics next spring. Total emotional collision!',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -10, stress: 25, happiness: -12 });
          state.log.push(`Age ${state.characterInfo.age}: You failed vehicle licensing exams due to disputes with road evaluators.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_14',
    title: 'The Digital Portal Clash 💻',
    description: 'You sit before your computer terminal, repeatedly refreshing the admissions portal to see if you secured scholar standing.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Shut the laptop and play soccer with siblings on the lawn.',
        outcomeText: 'Your panic drains away! You sweat, build family bonds, and find a gorgeous email of acceptance in the evening.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 18, happiness: 20, stress: -20 });
          const sib = state.relationships.find(r => r.relationshipType === 'Sibling');
          if (sib) sib.relationshipValue = Math.min(100, sib.relationshipValue + 12);
          state.log.push(`Age ${state.characterInfo.age}: You decoupled from admission anxieties using vigorous athletic work with siblings.`);
        }
      },
      {
        choiceText: 'Stare at the glowing pixel loading loops for four solid hours.',
        outcomeText: 'The system reports active maintenance. You end up with raw, burning eyes, a headache, and zero new info.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You suffered severe screen fatigue and anxiety tracking institutional portal states.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_15',
    title: 'The Sharpener Spark ✏️',
    description: 'While walking to the school library pencil sharpener, you and your favorite study partner reach for the crank handle simultaneously.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Bow politely, holding the sharpener machine frame stable for them.',
        outcomeText: 'They thank you with a sweet, glowing smile! You walk back to desks sharing headphones, enjoying warm romance vibes.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 15, happiness: 22, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You sparked romantic interest during library pencil sharpening routines.`);
        }
      },
      {
        choiceText: 'Yank the copper handle first to sharpen your coal slate.',
        outcomeText: 'You look highly aggressive. They sigh, waiting for your dust, and remain distant for the remainder of spelling hours.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -5, karma: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You prioritized pencil maintenance over basic social manners, cooling classmate vibes.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_16',
    title: 'The Ice Cream Slide 🍦',
    description: 'Your part-time scoop job holds an extremely long rush lane. You lose grip of a triple-scoop chocolate cone, dropping it on your shirt.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Laugh and replace the client\'s cone with massive chocolate scoops.',
        outcomeText: 'The customer tips you five dollars! Your lighthearted humor makes you the star worker of the afternoon lines.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 12, happiness: 18, stress: -8 });
          state.finances.cashBalance = Math.min(state.finances.cashBalance + 5, 2000000);
          state.log.push(`Age ${state.characterInfo.age}: You handled retail dessert slips with stellar customer humor (+$5).`);
        }
      },
      {
        choiceText: 'Scowlingly clean your uniform, ignoring client requests to hurry.',
        outcomeText: 'The patrons write angry reviews. Your store captain warns you about customer service speed standards.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -5, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You prioritized clothing hygiene over active client queues during ice cream slips.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_17',
    title: 'The Formal Splurge 👞',
    description: 'Your bank balance holds a few precious dollars when you spot a flawless pair of leather formal loafers for graduation dinner.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Spend fifty cash dollars to secure the leather loafers.',
        outcomeText: 'You look incredibly sharp on the dinner dancefloor! You receive endless style compliments from everyone in your grade.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 25, happiness: 18, stress: -5 });
          state.finances.cashBalance = Math.max(state.finances.cashBalance - 50, 0);
          state.log.push(`Age ${state.characterInfo.age}: You purchased premium leather formal loafers to anchor graduation styles.`);
        }
      },
      {
        choiceText: 'Wear your ancient canvas dirt sneakers, conserving cash.',
        outcomeText: 'Some classmates mock your choice of footwear with suits, but your bank cash balances remain robust.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -10, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You opted for canvas sneakers on graduation dancefloors to conserve savings.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_18',
    title: 'The Double Caffeine Boom ⚡',
    description: 'During a very dense high school double study block, you gulp down some energy drinks, and your pulse feels like a race car.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Sprint three vigorous loops of the outdoor fence track.',
        outcomeText: 'The intense cardio cleanses the caffeine spike cleanly! You return to study desks feeling super sharp and oxygenated.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 20, smarts: 15, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You metabolized acute caffeine surges through intense outdoor intervals.`);
        }
      },
      {
        choiceText: 'Gulp down a sweet chocolate bar to counter the shakes.',
        outcomeText: 'Oh dear! Double sugar spike! Your hands shake so hard you drop your spelling pen, getting Counselor warning tags.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -15, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: You compounded metabolic caffeine rushes using rapid sugar snacks.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_19',
    title: 'The Cinema Dilemma 🍿',
    description: 'Your romantic friend wants to view a slow romantic story, while your core backyard buddies are booking a rapid action thriller.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Accompany your partner to the slow romance story.',
        outcomeText: 'You hold hands under golden screen sweeps, whispering sweet inside jokes that make your romance grow very secure.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 12, happiness: 22, stress: -12, karma: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You prioritized romantic cinema choices, establishing deep emotional bonds.`);
        }
      },
      {
        choiceText: 'Join your backyard buddies for the action thriller.',
        outcomeText: 'You enjoy extreme virtual crashes, spilling popcorn buckets with the crew! High teenage bonding points!',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 5, happiness: 18, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You joined school backyard buddies for high-energy action films.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_20',
    title: 'The Hardware Change Clash 🧰',
    description: 'During your retail shift at the hardware depot, a contractor insists you handed him the incorrect copper coin changer.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Recalculate the decimal ledger values transparently on the counter.',
        outcomeText: 'Your mathematics are completely perfect! The client apologizes for his oversight and tips you for your patience.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 22, looks: 10, happiness: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You validated retail decimal audits, neutralizing contractor changer arguments.`);
        }
      },
      {
        choiceText: 'Yell back at the client for questioning your basic spelling math.',
        outcomeText: 'Your captain intervenes, writing up formal warning tickets. Sincere workplace logs take a major hit.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -20, stress: 20, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You entered verbal disputes with depot contractors over tiny coin change.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_21',
    title: 'The Orator Audition 📣',
    description: 'The graduation steering committee seeks a senior speaker to deliver the farewell address before five thousand spectators.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Deliver a moving, beautifully rehearsed speech about student resilience.',
        outcomeText: 'Superb! The jury is moved to tears, assigning you the lead valedictorian honor! Your parents are incredibly proud!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 30, looks: 20, happiness: 25, stress: 10 });
          if (state.education) state.education.grades = Math.min(100, state.education.grades + 12);
          state.log.push(`Age ${state.characterInfo.age}: You captured senior valedictorian honors after delivering touching farewell pilot readings.`);
        }
      },
      {
        choiceText: 'Host a comedy stand-up audition mocking the school cafeteria square pizzas.',
        outcomeText: 'The students roar! The dean thinks it is slightly too edgy for ceremonies, assigning you alternative ushering roles.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 15, happiness: 18 });
          state.log.push(`Age ${state.characterInfo.age}: You performed comedic cafeteria roasts during graduation orator trials.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_22',
    title: 'The Energy Drink Spill ☕',
    description: 'While sneaking a chilled energy drink inside computer labs, you spill a cold pool of sticky liquid onto your keyboard keys.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Disconnect the keyboard immediately and clean the panels with sanitizer taps.',
        outcomeText: 'Brilliant repair! The keys work perfectly, and you save the machine before administrators notice. IT expert!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, happiness: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You salvaged laboratory computer keyboards from sticky beverage spills.`);
        }
      },
      {
        choiceText: 'Wipe the surface messy with your sleeve and walk away quietly.',
        outcomeText: 'The sticky keyboard key shorts out next morning, and lab camera footprints trace the disaster back to your desk. Heavy detention!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: -10, karma: -20, stress: 18 });
          if (state.education) state.education.grades = Math.max(0, state.education.grades - 5);
          state.log.push(`Age ${state.characterInfo.age}: You neglected computer laboratory spills, getting identified by camera footages.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_23',
    title: 'The Playlist Partition 🎵',
    description: 'Your favorite romantic friend rejects your custom space-drone metal music playlist, calling the tracks "jarring noise." ',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Ask them to share their favorite acoustic guitar tracks instead.',
        outcomeText: 'You listen to sweet acoustic guitars together on the grass, discovering gorgeous new melodies! Sweet romantic bonds!',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 10, happiness: 20, stress: -15, karma: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You harmonized romantic differences by welcoming partner music preferences.`);
        }
      },
      {
        choiceText: 'Criticize their simple pop music tastes with harsh snobbish humor.',
        outcomeText: 'A chilly mood settles. They put their earbuds on, leaving your ride home completely silent and highly tense.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -10, stress: 15, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You criticized partner pop music, creating social distance.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_24',
    title: 'The Retail Rush 🧳',
    description: 'Your retail depot shifts face a massive holiday queue of sixty frustrated shoppers looking for brass fire pit matches.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Process payments with extreme physical efficiency, scanning codes smoothly.',
        outcomeText: 'You clear sixty clients in perfect time! Your supervisor grants you a ten percent raise for master speed under pressure!',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, smarts: 20, happiness: 18, stress: 5 });
          state.finances.cashBalance = Math.min(state.finances.cashBalance + 25, 2000000);
          state.log.push(`Age ${state.characterInfo.age}: You processed heavy retail queues during festive rushes, earning raises (+$25).`);
        }
      },
      {
        choiceText: 'Fake a restroom break to wait out the massive client rush.',
        outcomeText: 'Other clerks suffer the load, and your manager notes your absence on the ledger sheet. Shift credits slip away.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You bypassed busy checkout lines during peak shifts, straining supervisor trust.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ad_16_17_25',
    title: 'The Farewell Canvas 🎒',
    description: 'On the final day of high school, your entire grade is signing each other\'s canvas backpacks with colorful permanent markers.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 16 && age <= 17;
    },
    choices: [
      {
        choiceText: 'Sign forty backpacks with personalized, encouraging memories.',
        outcomeText: 'Every student hugs you with deep, warm appreciation! Your canvas bag is filled with gorgeous, lifelong friend markers!',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 20, happiness: 25, stress: -20, karma: 30 });
          state.log.push(`Age ${state.characterInfo.age}: You concluded high school years by distributing personalized, encouraging notes down canvas backpacks.`);
        }
      },
      {
        choiceText: 'Pack your binders quietly and leave school gates immediately.',
        outcomeText: 'You escape the messy hallway crowds, although you miss out on final golden-hour class memories.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You departed high school buildings quietly without participating in collective backpack signings.`);
        }
      }
    ]
  }
];


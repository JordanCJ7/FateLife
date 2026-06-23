import { GameEvent, CharacterState } from '../../types';
import { adjustStats } from '../../utils';

export const childhoodEvents: GameEvent[] = [
  // --------------------------------------------------------------------------
  // BRACKET 1: INFANTS & BABIES (AGES 0-2)
  // --------------------------------------------------------------------------
  {
    id: 'ch_inf_teething',
    title: 'Teething Distress 🦷',
    description: 'Your back gums feel swollen and extremely sore. Stretched out on your highchair tray is a cool, liquid-filled blue rubber ring.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 2;
    },
    choices: [
      {
        choiceText: 'Gnash your sore gums against the cold rubber ring to soothe the swelling.',
        outcomeText: 'Ahhh! The icy temperature immediately numbs the hot pressure in your mouth. You babble happily.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, health: 10, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You found complete relief from your swollen teething gums using a cold rubber ring.`);
        }
      },
      {
        choiceText: 'Reject the ring and attempt to bite down aggressively on your own chubby right heel.',
        outcomeText: 'You twist yourself into an awkward infant pretzel but end up falling sideways, bumping your forehead on the wooden tray.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -10, health: -8, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You toppled over while trying to chew on your own foot.`);
        }
      },
      {
        choiceText: 'Scream at the top of your lungs to demand extra spoonfuls of cold apple puree.',
        outcomeText: 'Your mother hears the high-pitched distress signal and rushes in, singing a soft nursery tune while feeding you sweet, cold fruit spoonfuls.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, karma: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You vocalized loudly to receive comfort and cool pureed fruit from your mother.`);
        }
      }
    ]
  },
  {
    id: 'ch_inf_housekeys',
    title: 'The Glistening Clatter 🔑',
    description: 'Your parent unclips a heavy ring of brass housekeys, dropping them onto the carpet. They sparkle under the bright hallway light, whispering delicious metallic sounds.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 2;
    },
    choices: [
      {
        choiceText: 'Seize the heavy brass ring and shake it violently to make a loud kitchen concert.',
        outcomeText: 'CHING-CHING! You create a magnificent percussive rhythm. Your motor skills improve as you celebrate the wonderful clanging noise.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 12, smarts: 15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You improved your manual dexterity by shaking a ring of heavy brass housekeys.`);
        }
      },
      {
        choiceText: 'Squeeze the cold metal keys between your baby knuckles to test their sharpness.',
        outcomeText: 'Ouch! The jagged metal teeth scratch your sensitive palms. You drop the keys, letting out a sharp, wet cough of regret.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -8, health: -5, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You slightly pinched your fingers while experimenting with housekeys.`);
        }
      },
      {
        choiceText: 'Yank your parents trousers, pointing at the keys to ask what doors they open.',
        outcomeText: 'Your parent chuckles, picking you up and showing you how key cylinders click inside the main front lock. Fascinating!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 10, karma: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You investigated locking mechanisms with your parents help.`);
        }
      }
    ]
  },
  {
    id: 'ch_inf_cattail',
    title: 'The Fuzzy Tabby 🐱',
    description: 'The sleepy orange family cat is taking a warm afternoon nap near your playmat. Her thick, velvet tail is twitching back and forth in a tempting, slow-motion rhythm.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 2;
    },
    choices: [
      {
        choiceText: 'Deliver a swift, strong baby pull of absolute curiosity on the fuzzy tail.',
        outcomeText: 'MEOOW! The startled tabby turns around, hisses, and swipes her front paws. You get a tiny scratch on your wrist and cry in shock.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -12, health: -10, karma: -15, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: You learned a painful lesson about pet boundaries after yanking the family cats tail.`);
        }
      },
      {
        choiceText: 'Crawly squeakily over to bury your sticky face into the cats warm, purring flank.',
        outcomeText: 'The tabby lets out a deep, soothing rumble. She licks your forehead with a scratchy sand-paper tongue, warming your heart.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, karma: 15, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You bonded warmly with the family cat by nestling in her fur.`);
        }
      },
      {
        choiceText: 'Blow a soapy wet bubble of spit to get the sleeping felines attention.',
        outcomeText: 'The cat opens one sleepy green eye, registers your drool bubble with supreme feline indifference, and goes back to sleep.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 5, smarts: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You blew spit bubbles to communicate with the sleepy house cat.`);
        }
      }
    ]
  },
  {
    id: 'ch_inf_candy_shell',
    title: 'The Sparkling Foil wrapper 🍬',
    description: 'Resting on the hallway runner is a discarded, crinkly crimson candy wrapper. It shimmers beneath the ceiling lamp, rustling with every micro-draft.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 2;
    },
    choices: [
      {
        choiceText: 'Crawl over to examine the pretty cherry reflection under the lights.',
        outcomeText: 'You study the shining facets. Your visual awareness grows as you track the red dots bouncing on your fingers.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 12, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You studied light refractions on a piece of shiny discarded foil.`);
        }
      },
      {
        choiceText: 'Stuff the entire crinkly wrapper down your throat before anyone spots you.',
        outcomeText: 'Oh no! The plastic edge sticks in your windpipe. You choke and gag frantically. Fortunately, your parent dives in and sweeps your throat.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -15, happiness: -15, smarts: -10, stress: 25 });
          state.log.push(`Age ${state.characterInfo.age}: You suffered a severe choking scare after attempting to swallow plastic debris.`);
        }
      },
      {
        choiceText: 'Slap the crinkle-paper against the floor planks to test its noisiness.',
        outcomeText: 'CRACKLE! CRUNCH! You love the high-frequency plastic sounds. It keeps you happily occupied for a solid thirty minutes.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 12, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You amused yourself by crushing a crinkly paper sheet.`);
        }
      }
    ]
  },
  {
    id: 'ch_inf_mirror',
    title: 'The Dual Twin 🪞',
    description: 'You crawl around the master closet and stumble directly into a low-hanging vanity mirror. A sticky-nosed baby with identical pajamas is staring straight back.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 2;
    },
    choices: [
      {
        choiceText: 'Lean forward to press your sticky wet lips directly against the cool glass twin.',
        outcomeText: 'SQUISH! Cold glass meets your nose. Your parent giggles warmly while wiping the baby-grease from the mirror surface.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You explored your reflection by giving the closet mirror a wet kiss.`);
        }
      },
      {
        choiceText: 'Growl deeply and smack the duplicate face to assert baby dominance.',
        outcomeText: 'THUD! Your palm smacks the hard mirror. It hurts slightly, and the double baby seems completely unphased by your display of raw power.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -5, looks: -5, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You challenged your own reflection to a physical wrestling tournament.`);
        }
      },
      {
        choiceText: 'Peek carefully behind the mahogany wood frame to find where they are hiding.',
        outcomeText: 'You peer behind the backboard and find... nothing! Just empty dust bunnies. This mysterious visual portal expands your cognitive logic.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You puzzled over the dimensional paradoxes of household mirrors.`);
        }
      }
    ]
  },
  {
    id: 'ch_inf_shower_splatter',
    title: 'The Bathroom Puddle 🚿',
    description: 'During your parents morning wash, some warm, bubbly bathwater escapes over the ceramic tub rim, creating a slick puddle on the colorful floor tiles.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 2;
    },
    choices: [
      {
        choiceText: 'Slap your chubby hands into the puddle to launch soapy droplets everywhere.',
        outcomeText: 'SPLASH! Bubbly water sprays the walls and your chest. You giggle incessantly, delighted by the liquid physics.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, physical: 5, stress: -10 } as any); // fallback mapping
          state.log.push(`Age ${state.characterInfo.age}: You splashed happily in bathroom water puddles.`);
        }
      },
      {
        choiceText: 'Chew on the edge of the damp bathmat, savoring old foot-soap memories.',
        outcomeText: 'Blech! The damp fibers taste of bitter eucalyptus shampoo. You spit repeatedly, your tongue feeling fuzzy and dry.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -8, happiness: -10, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You sucked on a wet bath carpet, tasting soapy chemicals.`);
        }
      },
      {
        choiceText: 'Slide your stomach across the slick floor tiles like a tiny penguin.',
        outcomeText: 'Whoosh! You slide a full foot! It feels incredibly liberating, though your belly gets slightly cold from the water.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 12, health: 8 });
          state.log.push(`Age ${state.characterInfo.age}: You practiced sliding exercises across the wet bathroom floor.`);
        }
      }
    ]
  },
  {
    id: 'ch_inf_tissue_box',
    title: 'The Tissue Harvest 🤧',
    description: 'A brand new box of soft white tissues sits unsupervised on the lowest shelf of the nightstand. A single puffy corner is peeking out, begging to be pulled.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 2;
    },
    choices: [
      {
        choiceText: 'Pull the tissues out one by one in rapid succession, stacking soft paper mountains.',
        outcomeText: 'ZIP! WHOOSH! You extract fifty tissues in seconds! The bedroom is now a gorgeous white wonderland. Your parent walks in and gasps in defeat.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, stress: -15, smarts: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You emptied a complete tissue container to construct a fluffy paper fortress.`);
        }
      },
      {
        choiceText: 'Shred the paper fibers into microscopic snow-flecks to scatter around.',
        outcomeText: 'You tear the wood pulp with your tiny claws. Paper dust gets into your nose, triggering a dramatic cascade of tiny infant sneezes.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 8, health: -5, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You tore tissues into small confetti, triggering a sneeze fit.`);
        }
      },
      {
        choiceText: 'Force the entire empty cardboard box onto your head to play dark peek-a-boo.',
        outcomeText: 'Everything is dark! You wander around blind until your head hits the wood leg of the dresser. You whimper in the darkness.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -8, health: -5, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You got your head wedged in a cardboard box temporarily.`);
        }
      }
    ]
  },
  {
    id: 'ch_inf_caterpillar',
    title: 'The Fuzzy Crawler 🐛',
    description: 'While you are resting on a wool lawn blanket, a plump green caterpillar wriggles slowly onto the fabric, looping its accordion back with quiet purpose.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 2;
    },
    choices: [
      {
        choiceText: 'Trace its tiny velvet rings with an exceptionally gentle baby fingertip.',
        outcomeText: 'The little creature stops, curling into a tight green wheel before unfolding. You learn to handle fragile life with care.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 20, smarts: 15, happiness: 10, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You showed marvelous, gentle curiosity toward a garden caterpillar.`);
        }
      },
      {
        choiceText: 'Grab the juicy green tube and try to push it inside your left ear.',
        outcomeText: 'The insect tickles your ear canal, causing you to shriek with immediate terror. You roll off the blanket onto the muddy garden gravel.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -15, health: -5, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: You panicked after attempting to insert a live caterpillar into your ear.`);
        }
      },
      {
        choiceText: 'Stare intensely at its multiple golden circular feet, letting out happy bubbles.',
        outcomeText: 'You analyze its sequential movement patterns. Your budding visual cognitive cells are firing rapidly.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, happiness: 12 });
          state.log.push(`Age ${state.characterInfo.age}: You spent an hour studying insect locomotion under the sun.`);
        }
      }
    ]
  },
  {
    id: 'ch_inf_doorstopper',
    title: 'The Springy Stopper 🌀',
    description: 'Tucked beneath the baseboards behind the guest bedroom door is a coiled brass spring stopper. It sits quietly, begging for some infant attention.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 2;
    },
    choices: [
      {
        choiceText: 'Flick the coiled metal base with your index finger of power.',
        outcomeText: 'BZZZZTWANGGG! The stopper vibrates at supersonic speed, filling the hallway with glorious mechanical hums. You are utterly enchanted!',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, smarts: 12, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You discovered the magical, vibrating properties of brass coiled door stoppers.`);
        }
      },
      {
        choiceText: 'Try to pry off the black rubber tip with your baby teeth.',
        outcomeText: 'You chew hard on the rubber, but get a mouth full of dry black powder and ancient hallway dust remnants. Blech!',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -8, health: -8, stress: 12 });
          state.log.push(`Age ${state.characterInfo.age}: You nibbled clean door-stop rubber, suffering a dusty throat.`);
        }
      },
      {
        choiceText: 'Yank the metal spiral until it bends out of shape, breaking the spring.',
        outcomeText: 'With sudden baby strength, you warp the copper coil. It hangs limp and silent, destroyed. Your dad looks at the ruined doorstop with confusion.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 10, smarts: 5, karma: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You vandalized the guest bedroom baseboards by bending a metal stopper.`);
        }
      }
    ]
  },
  {
    id: 'ch_inf_grand_pearls',
    title: 'The Glistening Pearls 📿',
    description: 'Your grandmother sweeps you up in her arms to kiss your forehead, and her glistening white pearl necklace dangles right in front of your wide eyes.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 2;
    },
    choices: [
      {
        choiceText: 'Lash out and yank the iridescent strand with your full baby weight.',
        outcomeText: 'POP! The delicate silk cord snaps, sending a hundred white pearls raining across the wooden dresser. Your grandma gasps, scrambling to catch them.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 12, stress: 15, karma: -20 });
          state.log.push(`Age ${state.characterInfo.age}: You snapped your grandmothers pearl necklace in a fit of grabby excitement.`);
        }
      },
      {
        choiceText: 'Open your mouth and try to lick the nearest shimmering white orb.',
        outcomeText: 'The pearl tastes cold, smooth, and slightly metallic. Your grandma gently lifts your chin, whispering soft sweet scoldings.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 8, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You taste-tested historic family heirloom jewelry.`);
        }
      },
      {
        choiceText: 'Pat her scratchy gray wool cardigan while laughing hysterically.',
        outcomeText: 'Your soft patting melts her heart. She squeezes you tight, telling you that you are her favorite bundle of joy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 22, karma: 20, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You shared a beautiful, loving embrace with your grandmother.`);
        }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // BRACKET 2: TODDLERS (AGES 3-5)
  // --------------------------------------------------------------------------
  {
    id: 'ch_tod_blocks',
    title: 'Skyscraper of Blocks 🧱',
    description: 'You spend three hours on the living room rug building a shaky, wobbly fortress of wooden building Blocks. It now reaches all the way to your chest!',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 3 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Place one last wobbly cylindrical block directly on the highest pointed spire.',
        outcomeText: 'Steady... steady... YES! The final block locks in perfectly! You dance in tight circles, thrilled by your engineering achievement.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You successfully assembled a massive wobbly wooden skyscraper balance.`);
        }
      },
      {
        choiceText: 'Deliver a powerful, screaming karate chop to send the entire wooden tower crashing down.',
        outcomeText: 'CRASH! CLATTER! Blocks rain down everywhere. One heavy blue block bounces directly onto your big toe, making you scream with pain.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -8, health: -10, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You bruised your toe after smashing your own architectural block tower.`);
        }
      },
      {
        choiceText: 'Swallow a tiny green triangular block to see if it makes your tummy green.',
        outcomeText: 'GULP! The block gets caught in your throat. You wheeze, your face turning purple. Your parent rushes over, administering a rapid finger sweep to extract it.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -20, happiness: -15, smarts: -15, stress: 30 });
          state.log.push(`Age ${state.characterInfo.age}: You suffered a life-threatening choking hazard after swallowing a wooden toy.`);
        }
      }
    ]
  },
  {
    id: 'ch_tod_blanket_cape',
    title: 'The Crimson Airspace 🦸',
    description: 'You find a bright crimson picnic blanket in the laundry bin. Disregarding safety regulations, you tie it tightly around your neck like an elite hero cape.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 3 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Sprint at top speed down the stairs, trying to achieve launch lift-off.',
        outcomeText: 'You trip over the long tail, tumbling down the bottom step. Your knees are bruised, and your magnificent career as an aviator is temporarily grounded.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -12, happiness: -10, stress: 18 });
          state.log.push(`Age ${state.characterInfo.age}: You tripped over your homemade blanket cape while running.`);
        }
      },
      {
        choiceText: 'Dive gracefully from the arm of the living room sofa onto a pile of throw pillows.',
        outcomeText: 'Success! You sail through the air, landing perfectly in the soft cotton mounds. You feel absolutely invincible!',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, looks: 10, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You performed a stunning sofa superhero jump, landing safely.`);
        }
      },
      {
        choiceText: 'Offer the cape to your sibling, designating them as your official sidekick.',
        outcomeText: 'Your sibling is thrilled! Together, you march around the kitchen beating plastic pots like drums. Cooperative family bonds are locked.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 22, happiness: 20, stress: -15 });
          state.relationships.forEach(npc => {
            if (npc.relationshipType === 'Sibling') {
              npc.relationshipValue = Math.min(100, npc.relationshipValue + 15);
            }
          });
          state.log.push(`Age ${state.characterInfo.age}: You shared your scarlet cape to play cooperative hero games with your sibling.`);
        }
      }
    ]
  },
  {
    id: 'ch_tod_sandbox',
    title: 'The Sandbox Tunnel ⏳',
    description: 'Under the burning midday sun at the local park, you discover a plastic yellow shovel resting in the warm, dry Sandbox.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 3 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Dig a highly complex subterranean trench network for lead toy cars.',
        outcomeText: 'You engineer a masterpiece! Other children gather to roll their plastic cars through your custom tunnels. Your spatial planning grows.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, happiness: 15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You designed an impressive sand tunnel system at the community park sandbox.`);
        }
      },
      {
        choiceText: 'Throw a huge handful of dry sand directly into the wind to simulate a sandstorm.',
        outcomeText: 'The breeze blows the grit straight back into your own eyes! You scream in agony, rubbing your scratchy, burning eyelids as tears stream down.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, happiness: -15, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: You got heavy sandbox sand in your eyes after tossing it against the wind.`);
        }
      },
      {
        choiceText: 'Sample a small wooden spoonful of the damp brown sand to see if it taste like biscuit bark.',
        outcomeText: 'Blech! Gritty, crunchy, and incredibly bitter. You cough repeatedly, spitting out wet brown grains for an hour. Your mouth feels ruined.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -8, smarts: -10, happiness: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You ate a handful of dirty sandbox sand, suffering severe sensory regret.`);
        }
      }
    ]
  },
  {
    id: 'ch_tod_bubbles',
    title: 'The Bubble Storm 🧼',
    description: 'Your older sibling dips a plastic wand into soapy water, launching a massive swarm of beautiful, shimmering bubbles across the green grass.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 3 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Slam your palms together to pop as many bubbles as physically possible.',
        outcomeText: 'You pop thirty bubbles. Soap suds get on your skin, and you feel incredibly energetic and light.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 12, health: 10, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You laughed and popped sparkling soap bubbles across the garden lawn.`);
        }
      },
      {
        choiceText: 'Chase a massive bubble blindly, ignoring the wet garden hose lying on the turf.',
        outcomeText: 'TRIP! You stumble over the hose, landing face-first in a puddle of muddy soil. Your knees are scraped and your shirt is ruined.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, happiness: -10, looks: -8, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You took a slide into a mud puddle while chasing garden bubbles.`);
        }
      },
      {
        choiceText: 'Sit quietly to study how the colors swirl on the bubble surfaces before popping.',
        outcomeText: 'You notice patterns of indigo, green, and gold rotating. This hypnotic exercise brings profound mental relaxation and sharpens your observational skill.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, stress: -20, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You studied iridescent color cycles on liquid soap bubbles.`);
        }
      }
    ]
  },
  {
    id: 'ch_tod_fingerpaint',
    title: 'Finger-Paint Extravaganza 🎨',
    description: 'Your preschool teacher sets down giant jars of cold, gooey blue and yellow finger-paints, pinning a large sheet of thick paper onto the desk.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 3 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Swirl your entire hand through the paints to sketch an oceanic hurricane.',
        outcomeText: 'You mix blue and yellow to make a beautiful, deep green forest-ocean. The teacher hangs your masterpiece on the main board!',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, smarts: 15, looks: 8, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You drafted a gorgeous green finger-paint mural at head school.`);
        }
      },
      {
        choiceText: 'Scribble green spiral trails across the clean cream-colored classroom wallpaper.',
        outcomeText: 'The school assistant gasps! You are put in the time-out corner for fifteen minutes, and your parent is called to clean up the mess.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 10, karma: -20, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You vandalized the preschool wallpaper with green finger-paint markings.`);
        }
      },
      {
        choiceText: 'Paint your own cheeks and chin to transform into a fearsome jungle goblin.',
        outcomeText: 'Roar! The other toddlers scream in amusement, chasing you around. You are the absolute star of the playground!',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 22, looks: -5, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You painted your own face like a wild goblin, entertaining the playroom.`);
        }
      }
    ]
  },
  {
    id: 'ch_tod_carton',
    title: 'The Kitchen Citadel 📦',
    description: 'A colossal cardboard shipping box from a new kitchen refrigerator is resting in the center of the living room floor.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 3 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Use a green marker to sketch a drawbridge and defensive stone bricks.',
        outcomeText: 'You create a magnificent, highly functional fortress. Your tactical spatial awareness leaps as you defend your crown.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, happiness: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You turned a commercial shipping box into a beautiful customized castle fortress.`);
        }
      },
      {
        choiceText: 'Climb onto the flimsy, high top cardboard flaps to claim the high ground.',
        outcomeText: 'CRUMBLE! The thin paper collapses beneath your feet. You fall straight through, scrape your belly on the tape, and tumble onto the rug.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, happiness: -10, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You suffered a minor tumble when your cardboard fortress roof caved in.`);
        }
      },
      {
        choiceText: 'Squeeze inside the dark, cozy bottom corner with your softest plush dinosaur.',
        outcomeText: 'How cozy! Protected from the noisy household, you drift into a deep, peaceful baby nap, resolving all stress.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, health: 12, stress: -25 });
          state.log.push(`Age ${state.characterInfo.age}: You took a warm, cozy nap inside a quiet cardboard crawl space.`);
        }
      }
    ]
  },
  {
    id: 'ch_tod_dandelion',
    title: 'The Wishing Puff 🌼',
    description: 'Growing near the driveway is a perfect, snow-white, fluffy sphere of dandelion seed puff, swaying gently in the breeze.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 3 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Take a giant breath and blow the white parachutes across the garden to make wishes.',
        outcomeText: 'Whoosh! A hundred tiny flyers dance in the wind. You make a bold wish to become a legendary astronaut, feeling deeply happy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, karma: 10, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You dispersed dandelion seeds to make wishes under the afternoon sun.`);
        }
      },
      {
        choiceText: 'Rub the sticky yellow-green stem sap directly onto your nose to paint yourself.',
        outcomeText: 'The sap turns into a sticky, staining brown slime that refuses to wash off, and your skin breaks out in an itchy, warm red rash.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -15, health: -10, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You suffered an allergic facial reaction after rubbing raw plant sap on your skin.`);
        }
      },
      {
        choiceText: 'Stuff the entire fluffy cotton head into your mouth to see if it taste like sweet yeast.',
        outcomeText: 'Gag! The fuzzy seed stalks stick to your tongue and throat. You cough violently, crying from the bitter, dry leaves.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -8, smarts: -10, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You tried to chew on raw garden weeds, tasting bitter fibers.`);
        }
      }
    ]
  },
  {
    id: 'ch_tod_tricycle',
    title: 'The Trike Expressway 🚲',
    description: 'Your shiny red three-wheeled tricycle is parked at the top of the concrete driveway, which slopes steeply toward the sidewalk.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 3 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Pedal at maximum leg power, aiming your wheels straight down the driveway center.',
        outcomeText: 'Wheee! You roll with incredible velocity! You steer cleanly onto the flat, grassy garden, laughing at the absolute thrill.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, health: 12, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You mastered a thrilling tricycle downhill run in the driveway.`);
        }
      },
      {
        choiceText: 'Prop your feet up onto the handlebars to coast down with no hands.',
        outcomeText: 'The front wheel wobbles instantly. Your tricycle tips over, launching you onto the gravel. You scrape your elbows and cry loudly.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -15, looks: -5, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: You suffered a painful bike crash while attempting a hands-free stunt.`);
        }
      },
      {
        choiceText: 'Practice steering slowly along the bright chalk lane lines you colored earlier.',
        outcomeText: 'You carefully negotiate the chalk curves, developing fine-grained motor balance and precision.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, health: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You practiced precision coordination steering on sidewalk chalk paths.`);
        }
      }
    ]
  },
  {
    id: 'ch_tod_goldfish',
    title: 'The Lazy Gilded Swimming 🐠',
    description: 'The family golden goldfish is gliding in silent circles inside its sparkling round glass bowl on the low hallway sideboard.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 3 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Tap your sticky nose against the cool glass, singing a bubbly gurgling fish song.',
        outcomeText: 'The fish swims close to your face, looking curious. A sweet moment of early species-empathy and quiet contemplation.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 10, karma: 15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You sang bubbly songs to the family goldfish, building early animal ties.`);
        }
      },
      {
        choiceText: 'Feed the fish a generous handful of cold garden soil to give him vitamin plants.',
        outcomeText: 'The sparkling water turns into a muddy brown soup. The fish gasps. Your parents yell in anger, rushing to perform an emergency water salvage.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -8, karma: -20, smarts: -15, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You accidentally polluted the family goldfish bowl with garden mud.`);
        }
      },
      {
        choiceText: 'Try to scoop the orange swimmer out using your hollow green dinosaur friend.',
        outcomeText: 'SPLASH! You slip, bumping your arm. Half the fishbowl water spills onto your parents expensive mahogany floor planks.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -10, health: -5, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You spilt fishbowl water across the floor while trying to play with the fish.`);
        }
      }
    ]
  },
  {
    id: 'ch_tod_sprinkler',
    title: 'The Lawn Rainbows 💦',
    description: 'Your mother sets up the automatic oscillating garden sprinkler. High-pressure fans of icy water spin in arcs, sparkling like rainbows.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 3 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Sprint straight through the cold water arcs, screaming with wild toddler joy.',
        outcomeText: 'The cold spray takes your breath away! You run back and forth for an hour, your skin tingling with complete vitality.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 22, health: 15, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You spent a thrilling afternoon running through lawn sprinklers.`);
        }
      },
      {
        choiceText: 'Sit flat on the wet soil, trying to plug the spinning water jets with your big toe.',
        outcomeText: 'The water builds up pressure, then releases a massive blast directly inside your left ear canal, causing a severe ache.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -10, happiness: -10, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You blocked a high-pressure water nozzle, suffering ear discomfort.`);
        }
      },
      {
        choiceText: 'Relax under the shade of the porch, licking a cold red cherry popsicle.',
        outcomeText: 'Sweet, cold, and relaxing. You watch the butterflies dance on the damp grass in complete serenity.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, health: 10, stress: -20 });
          state.log.push(`Age ${state.characterInfo.age}: You relaxed in the garden shade enjoying a fruit popsicle.`);
        }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // BRACKET 3: SCHOOL CHILDREN (AGES 6-11)
  // --------------------------------------------------------------------------
  {
    id: 'ch_sch_dodgeball',
    title: 'Recess Dodgeball Arena 🥎',
    description: 'During morning recess, a dusty, heavy red rubber ball flying at supersonic speeds hums straight toward your chest. The eyes of seventy children are glued to you.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Attempt a spectacular, mid-air leaping catch to instantly eliminate the throwing champion.',
        outcomeText: 'THWACK! You catch the ball clean against your ribs! The yard erupts into wild, high-pitched cheering. You are the absolute king of recess.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 25, smarts: 10, looks: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You completed a legendary recess dodgeball catch, earning massive popularity.`);
        }
      },
      {
        choiceText: 'Duck behind the quiet kid standing next to you, utilizing them as a physical human shield.',
        outcomeText: 'POW! The ball smacks the poor bystander in the neck. You survive, but the other children hiss and point fingers at your cowardly play. Karma takes a heavy plunge.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 5, karma: -35, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You sacrificed a classmate as a shield during recess dodgeball.`);
        }
      },
      {
        choiceText: 'Sidestep calmly, letting the ball fly past into the empty parking lot chain fence.',
        outcomeText: 'You avoid the sting completely, letting the school drama bypass you. A sensible, low-risk survival strategy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -15, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You avoided schoolyard conflicts by stepping aside.`);
        }
      }
    ]
  },
  {
    id: 'ch_sch_spelling',
    title: 'Auditorium Spelling Bee 🏫',
    description: 'You stand on stage under burning hot halogen stage lights. The stone-faced principal leans into the microphone and pronounces your word: "CONSCIENTIOUS".',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Request the linguistic origin, definition, and use in a sentence to buy critical thinking time.',
        outcomeText: 'You utilize the clues to map the syllabic structures. "C-O-N-S-C-I-E-N-T-I-O-U-S!" The judge rings the gold bell! You win the municipal spelling plaque!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, happiness: 20, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You won the school district Spelling Bee with brilliant analytical skills.`);
        }
      },
      {
        choiceText: 'Scream letters rapidly, guessing the silent consonants with raw, high-speed gut intuition.',
        outcomeText: '"C-O-N-S-H-E-N-T..." BUZZER sound! Incorrect. The audience groans, and you walk off stage with burning, red-hot red cheeks of embarrassment.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -10, smarts: -5, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: You cracked under auditorium pressure during the Spelling Bee.`);
        }
      },
      {
        choiceText: 'Simulate a sudden, severe stomach virus to escape the auditorium stage immediately.',
        outcomeText: 'You double over, groaning dramatically. Your parent rushes to carry you to the nurse, bypassing the spelling test but costing you your pride.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 5, looks: -10, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You faked an illness to dodge public performance testing.`);
        }
      }
    ]
  },
  {
    id: 'ch_sch_lunchbox',
    title: 'The Cafeteria Trade-Off 🥪',
    description: 'An older fifth-grader pulls a shimmering, golden holographic dragon card from his pocket. He points at your fresh, thick, homemade turkey-and-cranberry sandwich.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Swap your complete lunchbox (sandwich, cheese sticks, juice) for the holographic trading card.',
        outcomeText: 'You pocket the dragon! The card is beautiful, though your stomach rumbles loudly for the rest of the school afternoon. No pain, no gain.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, smarts: -5, health: -10, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You traded your entire gourmet lunchbox for a holographic monster card.`);
        }
      },
      {
        choiceText: 'Convince him that your bruised organic apple is a rare, imported sweet Japanese ruby apple.',
        outcomeText: 'He falls for your masterful sales pitch, trading the dragon card for just the apple! You enjoy your full sandwich while staring at your new treasure.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 22, looks: 10, happiness: 20, karma: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You utilized persuasive street negotiation to acquire a valuable trading card.`);
        }
      },
      {
        choiceText: 'Keep your lunchbox, explaining that cards cannot fill a growling stomach.',
        outcomeText: 'You chew your sandwich happily, savoring the delicious turkey. Your body feels fully energized for physical education class later.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, happiness: 12, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You prioritized nutritional energy over schoolyard card collector trends.`);
        }
      }
    ]
  },
  {
    id: 'ch_sch_volcano',
    title: 'The Volcanic Catalyst 🌋',
    description: 'It is Science Exhibition day. Your plaster volcanic model is primed with baking soda, but you have a bottle of industrial-strength acid catalyst in your pocket.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Measure the school-approved standard vinegar mixture to secure a beautiful, controlled red foam.',
        outcomeText: 'The red froth flows majestically down the papier-mache mountain. The judges clap, awarding you the Silver Ribbon for structural realism.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 15, karma: 12, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You earned a municipal science fair ribbon with a balanced chemical display.`);
        }
      },
      {
        choiceText: 'Pour the entire bottle of industrial acid to trigger a gargantuan, spectacular blast.',
        outcomeText: 'KABOOM! Carbonic foam erupts violently, staining the classroom ceiling tiles and melting your adjacent teammates plastic dinosaur models. The principal is furious!',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 22, health: -10, smarts: -12, karma: -20, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: You triggered an unauthorized classroom explosion, angering school authorities.`);
        }
      },
      {
        choiceText: 'Forget the chemical foaming, focusing instead on writing detailed prehistoric dinosaur research placards.',
        outcomeText: 'The examiners are highly impressed by your academic focus. Your grades rise, laying strong foundations for future science pursuits.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You drafted detailed dinosaur placards to secure academic merit.`);
        }
      }
    ]
  },
  {
    id: 'ch_sch_treehouse',
    title: 'The Oak Fortification 🏡',
    description: 'You and your friends have completed a rustic wood fort inside the old backyard oak tree. A bossy kid from the next street is climbing up the ladder rungs.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Mandate that he recite your complex 50-word secret pirate passphrase to gain clearance.',
        outcomeText: 'He struggles to remember it, gets frustrated, and walks away. Your treehouse circle celebrates a great diplomatic victory.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You defended backyard treehouse territory using complex passwords.`);
        }
      },
      {
        choiceText: 'Present him with a sweet welcome, sharing your hidden cookie tin.',
        outcomeText: 'His tough exterior melts immediately! He turns out to be a brilliant designer, helping you reinforce the roof with solid plywood boards. A loyal friendship is born.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, happiness: 20, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You forged a great neighborhood alliance by welcoming a new friend to the treehouse.`);
        }
      },
      {
        choiceText: 'Pour a large bucket of cold, muddy garden water directly onto his head as defense.',
        outcomeText: 'SPLASH! He falls off the bottom rung, landing in the mud. He runs off weeping, and his angry parents arrive to file formal complaints.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 10, karma: -30, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: You splashed an unwanted visitor with mud water, triggering suburban arguments.`);
        }
      }
    ]
  },
  {
    id: 'ch_sch_bike_ramp',
    title: 'The Plywood Launchpad 🛹',
    description: 'The neighborhood kids constructed a shaky, creaky scrap plywood ramp resting on a single hollow cinder block at the end of the cul-de-sac.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Pedal your direct-drive bicycle at absolute speed, launching yourself over the block.',
        outcomeText: 'You fly! For one beautiful second, you achieve pure orbit. You land hard, but maintain perfect balance to coast down the lane. Pure glory!',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 25, looks: 12, health: 8, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You survived a high-speed bicycle jump over a sketchy plywood ramp.`);
        }
      },
      {
        choiceText: 'Decline the stunt, offering to record precise jump distances as the official scorekeeper.',
        outcomeText: 'The other children respect your analytical dedication. You keep things safe while analyzing trajectory mathematics.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, happiness: 10, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You acted as the official safety scorekeeper for playground bicycle stunts.`);
        }
      },
      {
        choiceText: 'Attempt to slide down the ramp while standing backwards on your skateboard with closed eyes.',
        outcomeText: 'CRASH! The board slips sideways immediately. You take a heavy, face-first slide into the hard gravel, splitting your lip and grazing your forehead.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -20, looks: -15, stress: 25 });
          state.log.push(`Age ${state.characterInfo.age}: You suffered severe abrasions after trying a backward skateboard blind jump.`);
        }
      }
    ]
  },
  {
    id: 'ch_sch_stray_puppy',
    title: 'The Muddy Explorer 🐶',
    description: 'While walking home from the local library, a scruffy, mud-splattered stray puppy with deep golden-brown eyes begins following you, whining softly.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Coax him into your backyard, secretly feeding him half of your parents expensive dinner steak.',
        outcomeText: 'He devours the meat with ecstatic tail wags! You spend a gorgeous afternoon washing him. Your parents are upset about the meat, but melt upon seeing his adorable face.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 25, karma: 20, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You took in a stray garden puppy, offering him comfort and high-end beef.`);
        }
      },
      {
        choiceText: 'Bring the puppy to the school crossing guard, who contacts the municipal rescue shelter.',
        outcomeText: 'The guard scans his tag, reuniting the little explorer with a weeping family down the street. You receive a warm letter of gratitude.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, smarts: 15, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You reunited a lost neighborhood puppy with his owners, boosting your karma.`);
        }
      },
      {
        choiceText: 'Scream and sprint home at top speed, fearing the scruffy creature might be a wild werewolf.',
        outcomeText: 'You run until your chest burns, slamming the heavy front door behind you. The puppy looks through the glass, confused, before trotting off.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -5, health: 10, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You fled a harmless stray puppy in a fit of wild werewolf panic.`);
        }
      }
    ]
  },
  {
    id: 'ch_sch_library_dare',
    title: 'The Quiet Archive Dare 📚',
    description: 'Your rowdy school friends dare you to scream "BANANA MUFFINS!" at the absolute top of your lungs inside the silent municipal public archives.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Bellow the phrase with absolute vocal intensity, accepting the legendary school status.',
        outcomeText: '"BANANA MUFFINS!!!" The high ceiling echoes your voice. Ten elderly scholars leap in alarm. The librarian banishes you indefinitely, but your peers treat you like a conqueror.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 22, looks: 15, smarts: -10, karma: -15, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You yelled loud phrases in public library archives to complete schoolyard dares.`);
        }
      },
      {
        choiceText: 'Politely reject the dare, continuing to finish your science-fiction graphic novel in the corner.',
        outcomeText: 'You enjoy a beautiful, quiet story hour. Your friends call you a chicken, but your focus remains intact.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, stress: -15, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You bypassed a disruptive reading-room dare to finish your studies.`);
        }
      },
      {
        choiceText: 'Lean close to a ventilation floor grate, whispering the words so only the cockroaches hear.',
        outcomeText: 'You complete the challenge with classic stealth, satisfying the kids without making the librarian angry. Masterful intelligence!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, happiness: 15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You completed a library dare stealthily using a floor ventilation shaft.`);
        }
      }
    ]
  },
  {
    id: 'ch_sch_paper_plane',
    title: 'Study Hall Aerodynamics ✈️',
    description: 'Inside the quiet spelling study hall, you fold a sleek, sharp aerodynamic glider using a sheet of heavy neon-green construction paper.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Slyly launch the glider toward the active ceiling fan to watch it loop.',
        outcomeText: 'The fan spins! The plane loops beautifully through three circular tracks, landing perfectly on the teachers desk. The class erupts!',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, looks: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You flew a beautifully balanced neon paper glider in study hall.`);
        }
      },
      {
        choiceText: 'Aim the sharp pointed tip directly at the sleeping classroom teacher.',
        outcomeText: 'THWACK! The plane hits her forehead. She wakes up instantly with high rage, issuing you a week of lunch-hour detention sentences.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: -8, karma: -25, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: You received schoolyard detention for throwing paper objects at your teacher.`);
        }
      },
      {
        choiceText: 'Keep the plane tucked inside your binder to launch outside during playground recess.',
        outcomeText: 'You test the wings on the grass. A sudden draft catches the neon paper, carrying it high over the school fence into the blue sky. Beautiful.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, smarts: 12, health: 10, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You tested glider aerodynamic physics on the open schoolyard lawn.`);
        }
      }
    ]
  },
  {
    id: 'ch_sch_slip_slide',
    title: 'The Backyard Slideway 🧼',
    description: 'The backyard holds a long yellow plastic runway slick with laundry soup suds and high-pressure hose water. Sibling rivalry is heating up.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Glide smoothly through the thick soap suds on your belly.',
        outcomeText: 'Wheee! You slide thirty feet, splashing suds across the garden! You feel clean, fast, and intensely refreshed.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, health: 12, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You enjoyed a delightful slide down the soapy garden runway.`);
        }
      },
      {
        choiceText: 'Tackle your sibling while flying forward into the foam pile.',
        outcomeText: 'KABOOM! You both roll into the wet lawn grass, laughing our lungs out. Your sibling is slightly muddy but loves the active wrestling.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, stress: -10 });
          state.relationships.forEach(npc => {
            if (npc.relationshipType === 'Sibling') {
              npc.relationshipValue = Math.min(100, npc.relationshipValue + 15);
            }
          });
          state.log.push(`Age ${state.characterInfo.age}: You wrestled your sibling in soft, soapy grass foam.`);
        }
      },
      {
        choiceText: 'Splatter small splash drops from standard lawn onto the observers.',
        outcomeText: 'You flick soapy droplets onto your family from a safe distance, receiving soft giggles and a dry towel wrapper.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 10, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You flicked water droplets onto observers from the lawn.`);
        }
      }
    ]
  },
  // =========================================================================
  // DATA PACK 3: 25 INFANT & TODDLER EVOLUTION CARDS (AGES 0-5)
  // =========================================================================
  {
    id: 'dp3_ch_0_5_01',
    title: 'The Closet Shadow 👻',
    description: 'A tall, shifting shadow takes form behind your wooden closet door as the bedroom lights go out. Your heartbeat pulses against your tiny ribs.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Focus your eyes until your brain recognize your hanging blue overalls.',
        outcomeText: 'The scary giant turns back into harmless soft cotton denim. You close your eyes and sleep like a champion.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 10, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You overcame closet shadows by identifying harmless hanging denim overalls.`);
        }
      },
      {
        choiceText: 'Wail of terror until your father rushes in to inspect the closet locks.',
        outcomeText: 'Your dad patrols the entire room, checking behind coats and giving you a warm protective hug.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 12, stress: -5 });
          const rel = state.relationships.find(r => r.relationshipType === 'Parent');
          if (rel) rel.relationshipValue = Math.min(100, rel.relationshipValue + 5);
          state.log.push(`Age ${state.characterInfo.age}: You summoned parent reassurance to sweep away bedroom dark monsters.`);
        }
      },
      {
        choiceText: 'Inhale standard quiet baby breaths and hide under your heavy thermal quilt.',
        outcomeText: 'You sweat beneath the warm wool sheets, but the security cover protects your mind from any worries.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, health: 5, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You shielded yourself from monster worries under a thick safety blanket.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_02',
    title: 'The Blocks Duello 🧱',
    description: 'Your younger brother grabs the crown piece of your tall blue plastic tower, causing six colorful walls to tumble onto the playmat carpet.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Hand him half of the rectangular red blocks and build a massive joint fort.',
        outcomeText: 'You laugh together, stacking blocks with absolute teamwork and strengthening your family bond.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, karma: 15, stress: -10 });
          const sib = state.relationships.find(r => r.relationshipType === 'Sibling');
          if (sib) sib.relationshipValue = Math.min(100, sib.relationshipValue + 15);
          state.log.push(`Age ${state.characterInfo.age}: You resolved plastic block wars by designing a joint castle blueprint with your brother.`);
        }
      },
      {
        choiceText: 'Lop off his soft plush toy ears with your remaining balance boards.',
        outcomeText: 'Your mother separates the duel, confiscating all blocks and leaving you to stare at a blank wall corner in disgrace.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -15, stress: 15, happiness: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You received playmat time-outs after knocking plastic arches over sibling toys.`);
        }
      },
      {
        choiceText: 'Grasp the green baseboard tightly and slide all pieces out of reach.',
        outcomeText: 'You preserve your precious building project but create a noisy sibling weep session that alarms the household.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 5, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You hoarded primary building blocks during typical playroom sibling squabbles.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_03',
    title: 'The Yellow Tube Slide 🛝',
    description: 'You climb to the top of the hot plastic spiral tube slide. Scent of sun-baked grass rises, and the dark vertical tunnel looks extremely long.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Launch yourself forward with absolute bravery, sliding around the curves.',
        outcomeText: 'Wheee! You fly through the spiral track like a tiny missile, landing on the soft bark woodchips under parental cheers.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 25, health: 12, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You conquered the high playground spiral slide with absolute physical courage.`);
        }
      },
      {
        choiceText: 'Climb backward down the metal ladder rungs very carefully.',
        outcomeText: 'Other children groan at the bottleneck, but you protect your physical limbs from any fast collisions.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You chose systemic safety, declining high-altitude slide descents.`);
        }
      },
      {
        choiceText: 'Scream for your mother to carry you down from the green metal platform.',
        outcomeText: 'She lifts you down into a comforting cuddle, although several neighborhood toddlers snicker from the grass.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -5, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You requested maternal airlifts to escape scary park ladders.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_04',
    title: 'The Scarlet Crayon Feast 🖍️',
    description: 'A brand new, smooth scarlet paraffin wax crayon rolls onto your desk. It smells subtly of sweet honey and artificial wax coatings.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Bite the tip off cleanly, savoring the rich waxy texture.',
        outcomeText: 'Bah! It is incredibly bland and sticky, coating your front teeth in deep red flakes that require parental tooth brushing.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: -10, health: -5, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You ate scarlet wax crayons out of raw sensory curiosity, getting sticky red teeth.`);
        }
      },
      {
        choiceText: 'Use the crayon to draw a massive smiling sun on your coloring notebook.',
        outcomeText: 'Your kindergarten supervisor displays your bright artwork on the main bulletin board. High creative prestige!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 15, looks: 8 });
          state.log.push(`Age ${state.characterInfo.age}: You illustrated a superb solar sky canvas using red wax crayons.`);
        }
      },
      {
        choiceText: 'Hand the scarlet crayon to a neighboring toddler who is crying.',
        outcomeText: 'They smile, quiet down instantly, and share their plastic puzzle blocks with you. A wonderful civic pact.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, happiness: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You shared valuable craft crayons to settle neighbor toddler tears.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_05',
    title: 'The Babble Concert 🗣️',
    description: 'Your family and several neighbors are seated around the dinner table when you discover the power of your own vocal resonance.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Belt out a high-pitched melodic chant of nonsensical babbles.',
        outcomeText: 'The entire table stops and bursts into warm laughter, praising your raw charisma and wonderful lung power.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 15, happiness: 20, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You entertained family gatherings using loud vocal babble performances.`);
        }
      },
      {
        choiceText: 'Point at the hot potato bowl, pronouncing the word "Pud-ta-to" correctly.',
        outcomeText: 'Your parents drop their silver spoons in total awe. Your intelligence is declared peak-tier child development.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, happiness: 12 });
          state.log.push(`Age ${state.characterInfo.age}: You pronounced advanced culinary nouns down at the family table.`);
        }
      },
      {
        choiceText: 'Stay perfectly silent, munching on soft bread rolls in your highchair.',
        outcomeText: 'You avoid any dinner table attention, focusing purely on chewing starch while feeling extremely cozy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 10, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You maintained meal tranquility through silent carbohydrate consumption.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_06',
    title: 'Under the Mattress 🛌',
    description: 'You hear a hollow, low-frequency scratching vibration coming from directly under your mattress during a heavy summer rainstorm.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Hang your head over the side of the bed to confront the scratching sound.',
        outcomeText: 'You spot your lost mechanical toy clockwork car shifting in the floor ventilation breeze. You recover it happily!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, happiness: 15, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You isolated mattress scratching sounds, reclaiming lost classic toys.`);
        }
      },
      {
        choiceText: 'Burrow deeper into your feather pillows and squeeze your eyes closed.',
        outcomeText: 'You block out the acoustic vibes and drift into a deep sleep, although your stress levels spike slightly.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 8, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You ignored minor nocturnal floor vibrations to secure sleep patterns.`);
        }
      },
      {
        choiceText: 'Scream for your parents to carry out an immediate dust bunny sweeps.',
        outcomeText: 'They vacuum under the headboard, assuring you that the floor tunnels are perfectly clear of any beasts.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You initiated parental room sweeps to eliminate carpet dust monsters.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_07',
    title: 'The Plush Custody Clash 🧸',
    description: 'A neighborhood child grabs the fuzzy left leg of your favorite vintage plush teddy bear, pulling it with intense greed.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Execute a strong, steady pull to secure the bear flank.',
        outcomeText: 'Pop! The velvet leg seam rips slightly, but you capture your precious buddy. You feel protective but worried about sewing.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You defended your personal plush bear in playground tug-of-war disputes.`);
        }
      },
      {
        choiceText: 'Let go of the limb, offering them a plastic dump truck instead.',
        outcomeText: 'They happily drop the teddy to play with the yellow wheels. You protect the bears integrity and earn massive peace.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, smarts: 15, happiness: 12 });
          state.log.push(`Age ${state.characterInfo.age}: You defused toy tugging clashes by trading secondary plastic vehicle units.`);
        }
      },
      {
        choiceText: 'Call the playground supervisors to handle the dispute.',
        outcomeText: 'The nursery monitors intervene, mandating taking five-minute sandbox turns with the toy bears.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You summoned playground authorities to settle custody over dolls.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_08',
    title: 'The Mud Castle Excavation 🏰',
    description: 'A massive, fresh mud puddle sits near your backyard fence. In the center is a perfect stick that would make a wonderful castle flag.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Wade directly through the clay slurry to claim the wooden stick.',
        outcomeText: 'Squish! Mud coats your yellow socks and knees, but you mount the flag on your sand mound! You feel intensely proud.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 20, health: 10, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You marched through deep garden mud pools to claim castle stick flags.`);
        }
      },
      {
        choiceText: 'Construct a bridge of dry garden bricks to step over the liquid.',
        outcomeText: 'A brilliant engineering move! You keep your shoes perfectly dry while matching the flag pieces together.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, happiness: 12, looks: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You mapped micro-brick bridges to cross yard mud puddles safely.`);
        }
      },
      {
        choiceText: 'Stand on the grass and throw pinecones at the stick flagpole.',
        outcomeText: 'You spend an hour tossing pinecones, improving your throwing arm but failing to dislodge the stick.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 12, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You tested ballistics by throwing yard pinecones at stick flags.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_09',
    title: 'The Clay Conundrum 🟤',
    description: 'While building under a oak tree, you find a dollop of soft clay earth. It looks exactly like chocolate fudge pudding.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Munch down on the rich brown mud to test the dessert theory.',
        outcomeText: 'Pha! It tastes like bitter worms, sand grit, and decayed roots. You spit it out frantically, rinse your mouth, and learn a core lesson.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: -15, health: -10, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You tasted raw garden soil, learning that mud cannot replace chocolate desserts.`);
        }
      },
      {
        choiceText: 'Shape the damp dirt into a tiny collection of mud muffins.',
        outcomeText: 'You bake them in the sun, creating a wonderful display of rustic kitchenwares. Highly creative play!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You sculpted sun-baked garden soil muffins under oak trees.`);
        }
      },
      {
        choiceText: 'Toss the dirt ball away and sanitize your baby palms.',
        outcomeText: 'You retreat from the soil, keeping your hands clean of any backyard bacteria fields.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You avoided backyard mud hazards, prioritizing personal hand hygiene.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_10',
    title: 'The Shampoo Crown 👑',
    description: 'During your evening tub session, your parent builds a high, glistening crown of white baby-soap bubbles atop your head.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Splash the tub waters and roar like a mighty bath king.',
        outcomeText: 'You create dynamic tidal waves in the washroom, soaking your parent, but you look absolutely magnificent.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, looks: 12, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You celebrated bath time using shampoo bubble crowns and wave splashes.`);
        }
      },
      {
        choiceText: 'Wipe all the white bubble crowns off to prevent eye contact burns.',
        outcomeText: 'You play it perfectly safe. No suds get inside your eyes, avoiding any tingling soap emergencies.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, health: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You protected your visual field from standard soapy bath stingers.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_11',
    title: 'The Great Golden Retreiver 🐕',
    description: 'A massive, friendly golden retriever walks up to your baby stroller on the sidewalk, panting loudly with a wet pink tongue.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Extend your hands to pat the dogs thick, soft golden forehead.',
        outcomeText: 'The big retriever nuzzles your baby fingers, letting out a soft sigh. You form a deep, lasting love for canine animals.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 22, karma: 15, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You formed deep canine connections after petting physical golden dogs.`);
        }
      },
      {
        choiceText: 'Pull your fingers back inside your coat sleeves to shelter from slobber.',
        outcomeText: 'The dog sniffs the cold synthetic fabric of your jacket, waddles away, and leaves you dry and perfectly secure.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You kept your infant hands clean of puppy slobber pathways.`);
        }
      },
      {
        choiceText: 'Vocalize high shrieks to request stroller speed retreats.',
        outcomeText: 'Your parent wheels the carriage away immediately, leaving you slightly shaken but distant from the beast.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You retreated stroller positions to avoid big neighborhood dogs.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_12',
    title: 'The Thunder Rumbles ⚡',
    description: 'A sudden, bright flash of lightning illuminates your baby room, followed by a vibrating rumble of summer thunder.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Count the seconds until the next rumble, studying scientific weather patterns.',
        outcomeText: 'You calculate that the storm is three miles away! Your fear vanishes, replaced by a brilliant focus on physics.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, stress: -15, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You utilized mathematical sound-counting to defeat juvenile thunder fears.`);
        }
      },
      {
        choiceText: 'Scream loudly and slide under your matching security wool sheet.',
        outcomeText: 'You cuddle your teddy bear. Sucking your thumb calms your nerves, though the roaring sky remains loud.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 5, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You sought thumb-sucking protection from heavy rolling rainstorms.`);
        }
      },
      {
        choiceText: 'Crawl into your parents bedroom corner to share their pillow tracks.',
        outcomeText: 'Your mother lifts you into their warm mattress fold, providing absolute security and comforting rain whispers.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You found shelter in your parents bedroom during lightning storms.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_13',
    title: 'The Emerald Speedster 🏎️',
    description: 'Your cousin is holding an incredibly slick, shiny green diecast metal race car with real rolling rubber wheels.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Trade him your plastic yellow helicopter toy to play with the car.',
        outcomeText: 'A wonderful market negotiation! He loves the spinning helicopter blades, and you roll the metal car across carpets.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, happiness: 15, karma: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You organized toy trades with cousins, swapping yellow helicopters for race cars.`);
        }
      },
      {
        choiceText: 'Snatch the metal race car and sprint to the garden sandbox.',
        outcomeText: 'Your cousin bursts into tears, notifying the family elders. You get a hot lecture on fair sharing ethics.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -20, stress: 15, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You grabbed family racing cars without seeking permission first.`);
        }
      },
      {
        choiceText: 'Roll your wooden train logs nearby, ignoring the shiny green car.',
        outcomeText: 'You focus on building simple wooden timber bridges, avoiding any cousin conflicts entirely.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You bypassed cousin toy competition by chewing on stable wooden logs.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_14',
    title: 'The Tall Rubber Swing 🎡',
    description: 'Your parent grabs the black rubber seat of the park swing, lifting you into position and asking: "Ready for high sky swings?"',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Kick your feet in high-flying motions, requesting maximum altitude.',
        outcomeText: 'You fly so high you can see over the neighborhood cedar trees! The wind cools your nose, and you laugh in deep joy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 25, health: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You achieved extreme park swing altitude by kicking your toddler legs.`);
        }
      },
      {
        choiceText: 'Cling tightly to the cold iron chains and demand gentle baby swings.',
        outcomeText: 'You glide back and forth like a slow grandfather clock, perfect, smooth, and extremely relaxing.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 10, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You requested safe, low-altitude swing paces on playground fields.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_15',
    title: 'The Yellow Bitter Chew 🌼',
    description: 'A fluffy, bright yellow dandelion flower grows in the green grass lawn. It looks exactly like delicious, sugary honeycomb cake.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Pluck the bright flower stem and chew down on the yellow petals.',
        outcomeText: 'Gah! The milky stem juice is incredibly bitter and leaves a brown stain on your cheeks that smells of lawn sap.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: -15, health: -5, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You ate raw yellow dandelions, discovering that lawn weed sap tastes bitter.`);
        }
      },
      {
        choiceText: 'Present the bright dandelion to your mother as a sweet dining bouquet.',
        outcomeText: 'She puts the tiny weed in a glass of water on the kitchen window, praising your beautiful, loving heart!',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, happiness: 18, looks: 8 });
          state.log.push(`Age ${state.characterInfo.age}: You harvested beautiful meadow dandelions for kitchen table decor.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_16',
    title: 'The Coffee Table Cruise 🚶',
    description: 'You pull your body up against the slippery wood frame of the coffee table, balancing on your own chubby ankles.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Release the wood table edge and walk three major independent steps.',
        outcomeText: 'Thud! You fall safely onto your diaper padding, but you executed three real steps! Your parents scream in video recording joy!',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 25, smarts: 15, happiness: 20 });
          state.log.push(`Age ${state.characterInfo.age}: You reached key toddler milestones by walking three steps unassisted.`);
        }
      },
      {
        choiceText: 'Slide your hands along the smooth wood, cruising laterally around table cups.',
        outcomeText: 'You navigate the furniture track perfectly, avoiding any painful head bumps while training your calf muscles.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, smarts: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You trained muscular lateral steps around wooden living room shelves.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_17',
    title: 'The Shiny Twin Mirror 🪞',
    description: 'You waddle into the master bathroom and see an incredibly familiar child staring back at you from a giant glass panel.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Press your nose directly against the glass to kiss the twin child.',
        outcomeText: 'Squeak! Your nose smudges cold mist onto the mirror. The other kid kisses back! You laugh at the hilarious puzzle.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 10, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You examined physical mirrored twin reflections with loving curiosity.`);
        }
      },
      {
        choiceText: 'Slam your hand against the glass surface, shouting in raw confusion.',
        outcomeText: 'The glass clangs, and your parent rushes in to explain how light rays bounce off polished silver backings.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You investigated optometric bounce physics with bathroom mirrors.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_18',
    title: 'The Cart Kid Jackpot 🛒',
    description: 'Sitting in the red plastic child harness of the grocery shopping cart, you pass a shelf of glistening candy boxes.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Reach out to grab a bright purple box of sweet berry rolls.',
        outcomeText: 'Success! Your fingers snatch the box into the cart! Your parent chuckles and agrees to buy the rolls for dinner desserts.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, smarts: 12 });
          state.log.push(`Age ${state.characterInfo.age}: You expanded shopping cart caches by grabbing purple berry boxes.`);
        }
      },
      {
        choiceText: 'Scream at the grocery shelves until adjacent shoppers stare.',
        outcomeText: 'Your parent feels highly embarrassed, rushing through checkout lanes and ignoring your sugar requests.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -15, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You triggered public shopping cart scenes over candy boxes.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_19',
    title: 'The Giraffe Shadow 🦒',
    description: 'Your yellow bedroom nightlight projects a massive, long-necked wild animal shadow across your wallpaper panels.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Wiggle your fingers in front of the lens to make shadow birds fly.',
        outcomeText: 'You block the lamp light, creating flying hand birds that play with the wall giraffe! Fear turns into art.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, happiness: 15, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You constructed optical hand-shadow creatures to defeat evening worries.`);
        }
      },
      {
        choiceText: 'Cry out till your parent shifts the giraffe lamp out of the room.',
        outcomeText: 'They unplug the lamp, leaving the room fully dark and peaceful for your deep toddler sleep cycles.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You requested nightlight relocation to maintain dark sleeping conditions.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_20',
    title: 'The Box Kingdom 📦',
    description: 'A massive brown refrigerator cardboard box sits on the back porch lawn. It contains endless potential for custom territories.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Use your child safety crayons to sketch windows and brick arches on the box.',
        outcomeText: 'You build a beautiful cardboard castle! You cuddle inside with your favorite pillow, enjoying personal territory.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 20, stress: -12 });
          state.log.push(`Age ${state.characterInfo.age}: You engineered customized cardboard carton palaces on the back lawn.`);
        }
      },
      {
        choiceText: 'Stomp on the cardboard domes until the paper flatlines.',
        outcomeText: 'Crash! You squash the entire box, exhausting your physical energy but destroying your neighborhood fort.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 12, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You flattened yard shipping boxes during energetic play times.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_21',
    title: 'The Cedar Plank Balance 🪵',
    description: 'Your parent lays a long, flat cedar timber board across the garden lawn, challenging you to walk across.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Walk the tiny wooden path keeping your hands outstretched like wings.',
        outcomeText: 'Success! You walk from end to end without stepping onto the grass, building superb balance control!',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 20, smarts: 12, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You polished basic balance skills walking on garden timber logs.`);
        }
      },
      {
        choiceText: 'Slide across the wood board on your tummy like a tiny seal.',
        outcomeText: 'You slide slowly, getting green chlorophyll grass stains on your shirt but laughing the entire afternoon.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, looks: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You cruised on cedar garden boards like a belly seal.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_22',
    title: 'The Shiny Copper Penny 🪙',
    description: 'A glowing, shiny copper coin sits on the dusty park sidewalk, catching the high noon solar rays.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Pop the shiny copper coin in your mouth to taste the metal.',
        outcomeText: 'Yuck! Cold iron tang coats your tongue before your parent franticly sweeps it out with their pinky. High coughs!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: -15, health: -10, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You shoved dusty street copper coins in your mouth, causing parental panic.`);
        }
      },
      {
        choiceText: 'Hand the copper penny to your father to store in their brown leather wallet.',
        outcomeText: 'He praises your honesty, giving you a delicious cherry hard candy as a beautiful savings bonus.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, smarts: 15, happiness: 12 });
          state.log.push(`Age ${state.characterInfo.age}: You deposited lost street pennies with parents, earning candy rewards.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_23',
    title: 'The Kitchen Canvas 🎨',
    description: 'You discover a fresh wooden drawer containing seven permanent green markers. The kitchen drywall looks empty.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Draw a massive collection of green trees and dinosaurs on the plaster wall.',
        outcomeText: 'Your mural is extremely large! Your parents gasps in sudden shock, spending three hours scrubbing drywall under detours.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, karma: -15, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You illustrated massive green forest murals directly on master kitchen drywall sheets.`);
        }
      },
      {
        choiceText: 'Carry the green markers to your coloring binder, drawing on approved sheets.',
        outcomeText: 'You draw a magnificent crocodile. Your parent is incredibly happy and frames the paper on the fridge!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You produced excellent marker sketches on paper sheets, earning fridge framing.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_24',
    title: 'The Bedroom Hideaway 🙈',
    description: 'During a noisy family weekend hide-and-seek match, you locate a deep velvet curtain flap in the study.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Squeeze quietly behind the velvet fold, holding our breath.',
        outcomeText: 'You hide for twenty minutes! The seekers walk past four times, giggling at your incredible physical stealth.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, happiness: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You secured peak hide-and-seek points behind study room curtains.`);
        }
      },
      {
        choiceText: 'Giggle loudly and jump out to scare your grandfather.',
        outcomeText: 'Boo! Granddad leaps in mock alarm, throwing his papers into the air while you both roar in sheer joy.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 18, looks: 8 });
          state.log.push(`Age ${state.characterInfo.age}: You popped out of drapery folds to entertain elderly family members.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_0_5_25',
    title: 'The Buzzer Hair Trick 💇',
    description: 'You sit in a tall booster chair at the barbershop. A master stylist turns on a silver clipper that hums.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 0 && age <= 5;
    },
    choices: [
      {
        choiceText: 'Sit perfectly still, listening to the soothing mechanical hum.',
        outcomeText: 'The metal trimmer tickles your neck. You get a pristine, extremely sharp haircut that makes you look spectacular.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: 20, stress: -10, happiness: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You completed barbershop visits peacefully, earning clean scalp stylings.`);
        }
      },
      {
        choiceText: 'Wriggle your shoulders and weep over the tickling clippers.',
        outcomeText: 'The barber slips, cutting a tiny bare patches behind your left ear, leaving you looking slightly asymmetric.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -12, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You wriggled in barbershop chairs, resulting in uneven hair lines.`);
        }
      }
    ]
  },

  // =========================================================================
  // DATA PACK 3: 25 PRIMARY SCHOOL & SOCIAL POLITICS CARDS (AGES 6-11)
  // =========================================================================
  {
    id: 'dp3_ch_6_11_01',
    title: 'The Homework Excuse 📝',
    description: 'You walk into spelling class realize you completely forgot your science worksheet. The teacher is moving down rows calling names.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Own up to the error honestly and request a late makeup slip.',
        outcomeText: 'Teacher sighs, appreciates your mature honesty, and grants a one-day extension with a tiny five percent grade penalty.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 25, smarts: 15, stress: -5 });
          state.education.grades = Math.max(0, state.education.grades - 2);
          state.log.push(`Age ${state.characterInfo.age}: You admitted forgotten school assignments transparently, receiving extensions.`);
        }
      },
      {
        choiceText: 'Weave a wild story about a sudden attic windstorm blowing the worksheet away.',
        outcomeText: 'The entire classroom giggles. The educator stares in deep disbelief, assigning you to after-school chalkboard cleanup.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: -10, karma: -15, stress: 15 });
          state.education.grades = Math.max(0, state.education.grades - 5);
          state.log.push(`Age ${state.characterInfo.age}: You fabricated weather stories to cover homework failures, earning detention chores.`);
        }
      },
      {
        choiceText: 'Scribble quick answers on a blank sheet under your desk right now.',
        outcomeText: 'Your pencil flies! You complete seventy percent of the questions before your desk is checked. Fast-paced survival calculations!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: 20, happiness: 10 });
          state.education.grades = Math.min(100, state.education.grades + 3);
          state.log.push(`Age ${state.characterInfo.age}: You scrambled spelling answers under desks to survive surprise homework checks.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_02',
    title: 'The Pine Tree Canopy 🌲',
    description: 'Your neighborhood gang decides to construct a double-decker wooden treehouse in the branches of a giant pine tree behind the empty lot.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Lash the support planks securely using heavy climbing hemp ropes.',
        outcomeText: 'The platform holds five children safely! You build an incredible, robust woodland citadel that is the talk of the block.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, health: 15, happiness: 18, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You engineered secure rope supports for backyard pine treehouses.`);
        }
      },
      {
        choiceText: 'Nail rusted scrap metal sheets onto the roof to make storm guards.',
        outcomeText: 'You scratch your thumb slightly on rusty nails. Your parent forces a rapid tetanus inspection, but the roof sheds water beautifully.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -8, happiness: 12, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You installed metal roof shields for neighborhood branch forts.`);
        }
      },
      {
        choiceText: 'Declare yourself the sovereign commander of the tree cabin.',
        outcomeText: 'The neighborhood kids get deeply annoyed, mutiny against your reign, and refuse to let you climb the rope stair.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -15, looks: -10, happiness: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You faced neighborhood branch fort boycotts after declared yourself sovereign ruler.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_03',
    title: 'The Shiny Card Swap 🃏',
    description: 'During a hot playground recess, a third-grader displays a glistening, holographic scarlet dragon card from the trending card game.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Exchange five of your basic cardboard fighter cards to secure the dragon.',
        outcomeText: 'A stellar transaction! The holographic foil catches the sun. You possess the coolest collection on the playground!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 22, looks: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You traded basic cardboard fighters to secure legendary holo-dragon cards.`);
        }
      },
      {
        choiceText: 'Warn them that trading foil cards during recess is banned by the principal.',
        outcomeText: 'You look like a classroom hall monitor. They pack their binder up, calling you a teacher\'s pet, though school rules are enforced.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 15, looks: -12, smarts: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You cited administrative pocket card trade bans to recess players.`);
        }
      },
      {
        choiceText: 'Toss your glistening silver sparkle card into the offer ring.',
        outcomeText: 'You trade shiny for shiny! A highly fair deal that keeps playground relationships perfectly stable.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, karma: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You executed glistening coin cards swaps, building playground trade alliances.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_04',
    title: 'The Haunted Doorbell 🔔',
    description: 'Your neighborhood friends issue a massive double-dare: you must jog up the creaky wooden steps of the scary grey house.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Sprint up the steps, press the brass bell button, and walk back slowly.',
        outcomeText: 'The bell echoes! An elderly lady opens the door, smiles, and hands you research bookmarks. You prove the house is safe and earn legendary respect!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, looks: 15, happiness: 25, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You completed neighborhood dares at old gates, debunking rumors of scary houses.`);
        }
      },
      {
        choiceText: 'Reject the dare flatly, mocking their silly superstitions.',
        outcomeText: 'Your status takes a hit, but you bypass any heart palpitations of dark hallways, preserving your peace.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, looks: -10, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You bypassed superstitious residential dares to protect personal nervous systems.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_05',
    title: 'The Citrus Splash 🥤',
    description: 'A tall glass of sticky orange juice topples across your spelling list homework page, dissolving the ink loops.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Dry the page using a hair dryer and write clean answers over the citrus stains.',
        outcomeText: 'The spelling list is extremely crisp and smells like fresh oranges! Your teacher rolls her eyes but awards full grades.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: 10, happiness: 12 });
          state.education.grades = Math.min(100, state.education.grades + 5);
          state.log.push(`Age ${state.characterInfo.age}: You salvaged wet orange juice spelling homework using home hair dryers.`);
        }
      },
      {
        choiceText: 'Weep on the kitchen floor until your mother copies the paper over.',
        outcomeText: 'She recopies the spelling words. Your homework is perfectly clean, but your parent looks extremely tired.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -10, stress: -5, happiness: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You requested parent labor to recopy juice-stained school projects.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_06',
    title: 'The Splintered Planks 🧱',
    description: 'While hauling ancient cedar deck planks for your tree house fort, a long splinter drives into your left index finger.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Sterilize a pair of steel tweezers and extract the splinter cleanly.',
        outcomeText: 'Puff! You slide the wood fiber out without any pain. You apply iodine and feel like a professional surgeon!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, health: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You executed micro-tweezers extractions of wood cedar splinters.`);
        }
      },
      {
        choiceText: 'Ignore the splinter, continuing to stack heavy timber boards.',
        outcomeText: 'Your finger swells with fluid-filled bacterial heat, necessitating a doctor trip next Thursday. Costly error!',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -15, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You neglected cedar skin splinters, incurring medical cleanings.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_07',
    title: 'The recite Duel 📖',
    description: 'The school library organizes a weekly contest: the student who recites the most digits of Pi gets a massive caramel box.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Memorize forty digits using cognitive visual association codes.',
        outcomeText: 'You stand before the library board and recite numbers flawlessly! You clear the caramel box, boosting academic prestige!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, happiness: 20, looks: 10 });
          state.education.grades = Math.min(100, state.education.grades + 8);
          state.log.push(`Age ${state.characterInfo.age}: You conquered school mathematics memory lists, earning sweet boxes of caramels.`);
        }
      },
      {
        choiceText: 'Eat your lunch sandwich, skipping the competitive spelling digits.',
        outcomeText: 'You enjoy a quiet, stress-free recess chat on the yard grass, ignoring mathematical records.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 12, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You skipped math memory contests to satisfy lunchtime physical stamina.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_08',
    title: 'The Muddy Gorge Jump 🕳️',
    description: 'A deep, mud-filled construction trench cuts across your footpath. Sibling rivalry fires up as they challenge you to clear the gap.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Launch yourself forward from a steady running start.',
        outcomeText: 'Perfect jump! You leap across the four-foot trench safely, landing on grass while your brother stares in shock.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 18, happiness: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You executed high athletic spring leaps to clear mud drainage trenches.`);
        }
      },
      {
        choiceText: 'Slide into the trench depth, wading through the brown sludge.',
        outcomeText: 'You slip, coating your clothing in black construction slurry that makes you look like a muddy swamp creature.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -15, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You miscalculated leap spans, sliding into mud drain gutters.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_09',
    title: 'Recess Sandwich barter 🥪',
    description: 'You open your recess tray and find a thermos of warm asparagus soup. Your classmate is holding a giant milk chocolate bar.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Propose a comprehensive soup-for-chocolate barter agreement.',
        outcomeText: 'They need warm liquids to soothe their sore throat! You trade perfectly, satisfying your high chocolate cravings.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You brokered complex lunchroom trades, swapping green soups for milk chocolates.`);
        }
      },
      {
        choiceText: 'Eat your vegetable soup, keeping your athletic diet pristine.',
        outcomeText: 'Your body absorbs excellent vitamins, giving you superb endurance during subsequent kickball sessions.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: 15, smarts: 10, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You opted for healthy lunchtime vegetable fiber, boosting playground athletics.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_10',
    title: 'The Ancient Fossil 🦖',
    description: 'During a school trip to the geological museum, you spot a key, uncatalogued fossil pebble sitting on top of the trash bin.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Hand the uncatalogued fossil pebble to the lead museum curator.',
        outcomeText: 'They analyze the pebble, identifying a genuine trilobite shell! They write your name on the exhibit display board!',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, smarts: 25, happiness: 20 });
          state.log.push(`Age ${state.characterInfo.age}: You discovered rare prehistorical trilobite fossils, earning museum credits.`);
        }
      },
      {
        choiceText: 'Slip the ancient flat rock inside your pocket as a lucky charm.',
        outcomeText: 'The fossil rock matches your collection beautifully, though you feel minor visual guilt whenever teachers check folders.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, karma: -15, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You pocketed rare museum geode samples to expand private collections.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_11',
    title: 'The Spelling Bee Showdown 📖',
    description: 'You are down to the final three contestants in the district spelling bee. The moderator points at you: "Spell conscience."',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Recall the silent letters using structural spelling block memory.',
        outcomeText: '"C-O-N-S-C-I-E-N-C-E." Correct! The audience erupts into thunderous cheers, and you receive the shiny brass medal!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 30, looks: 15, happiness: 25 });
          state.education.grades = Math.min(100, state.education.grades + 10);
          state.log.push(`Age ${state.characterInfo.age}: You won the district spelling bee, earning medals and high grades.`);
        }
      },
      {
        choiceText: 'Fumbly guess the pronunciation, leaving out the silent letters.',
        outcomeText: '"C-O-N-S-H-U-N-S." Buzzer sound! You exit the podium with standard bronze standing, still proud of your performance.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 12, stress: 10 });
          state.log.push(`Age ${state.characterInfo.age}: You finished third in spelling contests after silent letters confusion.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_12',
    title: 'The Gravel Slope Race 🚲',
    description: 'Your classmate points custom dirt bicycle tires down a steep, gravel-covered neighborhood slope: "Last one down buys soft ice cream!"',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Navigate the dirt slope slowly, feathering your rear brake pad.',
        outcomeText: 'You arrive last but in perfect safety. You spend pocket funds on cool custard cups while avoiding lacerated skin.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, health: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You balanced brake safety on dirt bike racing hills, avoiding bone breaks.`);
        }
      },
      {
        choiceText: 'Release the brake pads completely and fly down the center track.',
        outcomeText: 'A massive gravel slide! You crash on the final rock, getting severe scrapes on your shins and bending your steering forks.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -20, looks: -10, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You suffered bicycle wrecks down gravel slides due to high speeds.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_13',
    title: 'The Lost-and-Found Cache 🎒',
    description: 'Your favorite school lunchbox contains green dinosaurs vanished last Tuesday. It might be inside the metal school vault.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Search the lost-and-found vault, digging past smelly wool mittens.',
        outcomeText: 'You find your matching green dinosaur thermos! You also discover a warm, unclaimed blue school fleece sweater that fits perfectly.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 15, happiness: 15, looks: 8 });
          state.log.push(`Age ${state.characterInfo.age}: You processed lost school closets, recovering dinosaur items and outerwear.`);
        }
      },
      {
        choiceText: 'Ignore the metal bin, requesting a new lunchbox from parents.',
        outcomeText: 'They buy you a boring grey box, grumbling about your lack of organizational maturity.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -5, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You requested secondary parent funding after losing dining boxes.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_14',
    title: 'The Forest Fort Password 🚪',
    description: 'Your branch treehouse fort is fully complete. Now, the gang wants to design custom security rules for entry.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Design a secret handshake combo involving finger snaps and taps.',
        outcomeText: 'The kids love the elaborate handshake. It builds intense team cohesion and keeps non-members out of the logs.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 15, stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You engineered elaborate tactile passwords for block treehouse clubs.`);
        }
      },
      {
        choiceText: 'Demand all entries purchase entry using copper toy coins.',
        outcomeText: 'The kids get angry at your capitalistic constraints, creating a breakaway fort on the opposite side of the lot.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: -15, looks: -5, happiness: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You faced breakaway neighborhood factions over sandbox entry tolls.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_15',
    title: 'The Rare Foil Clash 🐉',
    description: 'During a desk recess swap, your classmate accuses you of using plastic card sleeves to hide card backing scuffs.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Remove the plastic sleeve transparently, proving the clean backing.',
        outcomeText: 'The fibers are perfect! Your classmate apologizes, and the trade transaction completes with zero remaining static.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, karma: 18, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You resolved card trade disputes by demonstrating clean, scuff-free paper backings.`);
        }
      },
      {
        choiceText: 'Snatch your card album and refuse to trade with them ever again.',
        outcomeText: 'You preserve your cards, but create minor playground rumors about your business authenticity.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: 10, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You canceled card swappers after accusations of scuffed deck backings.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_16',
    title: 'The Meadow Leaf Bite 🍃',
    description: 'A neighborhood child offers a crisp, dark green leaf from a wild plant: "Eat this sour weed or you are disqualified from our team!"',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Reject the test flatly, advising that wild nightshade is toxic.',
        outcomeText: 'They laugh, but your intellectual authority is locked. You save our stomach systems from wild herbal toxins.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, health: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You cited bio-toxin botanical profiles to avoid toxic backyard dares.`);
        }
      },
      {
        choiceText: 'Chew the green leaf to protect your playground status.',
        outcomeText: 'Yuck! It turns out to be real bitter sourwood, causing intense vomiting spells and a rush to the school nurse.',
        effect: (state: CharacterState) => {
          adjustStats(state, { health: -25, happiness: -12, stress: 20 });
          state.log.push(`Age ${state.characterInfo.age}: You caved to weed-chewing playground dares, suffering stomach poisonings.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_17',
    title: 'The Canine Notebook Chew 🐶',
    description: 'Your giant family hound literally tears the spine folders off your spelling homework notebook during breakfast.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Present the slobbered, tooth-marked binder directly to the teacher.',
        outcomeText: 'The chewing marks are extremely authentic! She laughs at the literal scenario and reprints clean papers for you.',
        effect: (state: CharacterState) => {
          adjustStats(state, { happiness: 15, stress: -5 });
          state.education.grades = Math.min(100, state.education.grades + 2);
          state.log.push(`Age ${state.characterInfo.age}: You demonstrated literal chew-damaged class binders to teachers, getting reprints.`);
        }
      },
      {
        choiceText: 'Stay up late copying the lists onto clean paper backing sheets.',
        outcomeText: 'You yawn frequently, but your homework is flawless and your work ethic is highly praised.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, health: -5, stress: 12 });
          state.log.push(`Age ${state.characterInfo.age}: You copied dog-bitten homework cards onto clean folders overnight.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_18',
    title: 'The Volcano Eruption 🌋',
    description: 'During the school science exposition, your red dye baking soda volcano holds a clogged nozzle that pressure vents.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Clear the chimney aperture cleanly using a wooden toothpick.',
        outcomeText: 'Fshhh! The red chemical foam vents perfectly, creating a magnificent streams that secures second-place badges!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, looks: 12, happiness: 18 });
          state.education.grades = Math.min(100, state.education.grades + 5);
          state.log.push(`Age ${state.characterInfo.age}: You salvaged science fair volcanoes using nozzle calibrations.`);
        }
      },
      {
        choiceText: 'Squeeze the plastic base bottle hard to force the foam out.',
        outcomeText: 'Pop! The structural tube explodes, showering your face and spelling binder in red chemical dye stains.',
        effect: (state: CharacterState) => {
          adjustStats(state, { looks: -12, health: -5, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You explosion-vented scientific volcano models on yourself during projects.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_19',
    title: 'The Floor Domino Chain 🧱',
    description: 'Recess is locked inside due to a massive thunderstorm. The spelling carpet holds five thousand plastic colored tiles.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Design a snake domino line stretching around the teacher\'s table.',
        outcomeText: 'You construct a flawless track! When poked, all blocks tumble in cascading loops. The class erupts into applause!',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 18, happiness: 20, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You engineered massive indoor cascading plastic domino lines.`);
        }
      },
      {
        choiceText: 'Flick domino blocks at other desks to start a miniature battle.',
        outcomeText: 'The supervisor bans you from playroom carpets, assigning you to write spelling words fifty times.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: -5, karma: -15, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You triggered domino block throwing battles, getting spelling copy tasks.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_20',
    title: 'The Neighbor Hound Dare 🐕',
    description: 'The neighborhood kids double-dare you to tap the heavy metal collar of the aggressive hound dog next door.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Decline the challenge, declaring safety boundaries on territorial animals.',
        outcomeText: 'They call you soft, but you protect your fingers from severe dog biting scars. Incredibly intelligence stance.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, health: 15, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You declined dog-collar physical dares to preserve bodily integrity.`);
        }
      },
      {
        choiceText: 'Reach slowly over the chain link fence with a long wooden stick.',
        outcomeText: 'The big dog snaps its jaws, breaking the wood in half! You leap back in horror, realizing how close you were.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, stress: 25, health: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You tested aggressive territorial guard dogs using yard sticks.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_21',
    title: 'The Handshake Pact 🤝',
    description: 'You and your schoolyard best friend decide to craft an elaborate seven-step tactile secret handshake.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Train the complex finger taps and forearm touches until flawless.',
        outcomeText: 'You launch the secret handshake during morning assemblies. It builds extreme, deep schoolyard friendship and security.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 12, happiness: 18, stress: -8 });
          state.log.push(`Age ${state.characterInfo.age}: You forged secret tactile handshakes to cement peer trust.`);
        }
      },
      {
        choiceText: 'Propose simple polite high-fives instead to save energy.',
        outcomeText: 'Simple, quick, and traditional. You keep your greetings low-maintenance while staying perfectly friendly.',
        effect: (state: CharacterState) => {
          adjustStats(state, { stress: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You chosen classic standard high-fives for schoolyard greetings.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_22',
    title: 'The Green Backdrop Five 💵',
    description: 'Under the plastic schoolyard slider, you spot a dry, crisp green five-dollar bill tucked inside the wood chips.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Hand the five-dollar bill to the recess supervisor.',
        outcomeText: 'They praise your incredible honesty over the speaking system, awarding you a golden citizenship star medal.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 35, looks: 10, happiness: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You deposited lost playground bills with administrators, earning civic stars.`);
        }
      },
      {
        choiceText: 'Slip the five-dollar bill inside your sock to buy ice cream later.',
        outcomeText: 'Outstanding financial cash boost! You feast on cherry ice treats, though minor ethical guilt remains.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 10, happiness: 18, karma: -15 });
          state.finances.cashBalance = Math.min(state.finances.cashBalance + 5, 20000000);
          state.log.push(`Age ${state.characterInfo.age}: You salvaged lost playground grocery coins to finance sugar runs (+$5).`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_23',
    title: 'The cheating Conspiracy 🧾',
    description: 'During spelling reviews, your desk neighbor leans over to copy spelling loops directly from your notebook page.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Block the papers view using our heavy cardboard science binder.',
        outcomeText: 'You prevent any academic piracy safely! Your neighbor grumpily spelling on their own, protecting your grading curve.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 20, stress: 5 });
          state.education.grades = Math.min(100, state.education.grades + 3);
          state.log.push(`Age ${state.characterInfo.age}: You defended spelling records against hallway copy pirates.`);
        }
      },
      {
        choiceText: 'Whisper spelling corrections to them to foster classroom team work.',
        outcomeText: 'The hallway supervisor intercepts the whispers, warning you both about unauthorized communications.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 10, stress: 15 });
          state.log.push(`Age ${state.characterInfo.age}: You received warnings for whispering spelling clues during reviews.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_24',
    title: 'The Token Clan Barriers 🪵',
    description: 'Your branch treehouse club requires members to hold custom wooden tokens carved from cedar mulch bark.',
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Carve five wooden tokens to hand to new neighborhood kids.',
        outcomeText: 'You expand the treehouse club cleanly! A wonderful, inclusive move that earns massive neighborhood praise.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 30, happiness: 20, stress: -10 });
          state.log.push(`Age ${state.characterInfo.age}: You fostered block inclusion by distributing neighborhood wooden fort tokens.`);
        }
      },
      {
        choiceText: 'Restrict entry to the wooden fort to keep non-members away.',
        outcomeText: 'You preserve elite club borders, though other kids write mean chalk messages on the driveway base.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 5, stress: 10, happiness: -5 });
          state.log.push(`Age ${state.characterInfo.age}: You enforced strict entrance controls on block branch cabin structures.`);
        }
      }
    ]
  },
  {
    id: 'dp3_ch_6_11_25',
    title: 'The Recess Card Trade Ban 🚫',
    description: 'The school principal declares all plastic-sleeved card swapping sessions banned on park lawns due to trading arguments.',
    category: 'School',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      return age !== undefined && age >= 6 && age <= 11;
    },
    choices: [
      {
        choiceText: 'Host secret basement trade events at your house on Saturdays.',
        outcomeText: 'A brilliant administrative detour! Five kids attend, swapping cards in perfect comfort on the basement carpet.',
        effect: (state: CharacterState) => {
          adjustStats(state, { smarts: 25, happiness: 20, stress: 5 });
          state.log.push(`Age ${state.characterInfo.age}: You organized secret home paper card clubs to circumvent school bans.`);
        }
      },
      {
        choiceText: 'Surrender the cards cleanly, locking our albums in backpacks.',
        outcomeText: 'You comply with institutional laws perfectly, avoiding any counselor list reprimands.',
        effect: (state: CharacterState) => {
          adjustStats(state, { karma: 20, stress: -15 });
          state.log.push(`Age ${state.characterInfo.age}: You obeyed principal bans on card trading games.`);
        }
      }
    ]
  }
];


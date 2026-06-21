import { GameEvent, CharacterState } from '../../types';
import { adjustStats } from '../../utils';

interface RawChoice {
  choiceText: string;
  outcomeText: string;
  adjustments: {
    happiness?: number;
    health?: number;
    smarts?: number;
    looks?: number;
    stress?: number;
    karma?: number;
    cash?: number;
  };
  logText: string;
}

interface RawScenario {
  id: string;
  title: string;
  description: string;
  minAge: number;
  maxAge: number;
  choices: RawChoice[];
}

// --------------------------------------------------------------------------
// BRACKET 1: BABIES & INFANTS (AGES 0-2) - Pre-verbal and Sensory discoveries
// --------------------------------------------------------------------------

const infantItems = [
  { name: "teething rubber ring", type: "soother", emoji: "🦷", detail: "cold and calming for swollen gums" },
  { name: "shiny silver housekeys", type: "metallic", emoji: "🔑", detail: "glistening and jingling with loud mechanical clatter" },
  { name: "fuzzy orange cat tail", type: "animal", emoji: "🐱", detail: "twitching back and forth in tempting rhythm" },
  { name: "crinkly candy foil wrapper", type: "trash", emoji: "🍬", detail: "sparkling and rustling loudly with every breeze" },
  { name: "cold air flow floor vent", type: "home", emoji: "💨", detail: "vibrating with constant cool, humming air currents" },
  { name: "potted indoor fern leaves", type: "plant", emoji: "🌿", detail: "low-hanging and rustling softly above the floorboards" },
  { name: "squeaky yellow rubber duck", type: "toy", emoji: "🦆", detail: "bobbing actively in warm, bubbly water currents" },
  { name: "unlocked glowing smartphone", type: "tech", emoji: "📱", detail: "radiating bright colors and animated menu items near your hand" },
  { name: "soggy cardboard tissue box", type: "paper", emoji: "🤧", detail: "stuffed with tempting, pullable white paper clouds" },
  { name: "fuzzy green caterpillar", type: "crawler", emoji: "🐛", detail: "wriggling slowly across a moist garden leaf" },
  { name: "dripping copper shower head", type: "water", emoji: "🚿", detail: "splattering cool, refreshing droplets onto the tiles" },
  { name: "bowl of sweet mashed potatoes", type: "food", emoji: "🥔", detail: "warm, yellow, and incredibly squishy in highchair bowl" },
  { name: "metallic dog food bowl", type: "pet", emoji: "🐶", detail: "smelling strongly of fish and filled with brown dry stars" },
  { name: "heavy glass patio door", type: "glass", emoji: "🚪", detail: "allowing cool morning light to stream across the floor" },
  { name: "soft sheepskin hallway rug", type: "rug", emoji: "🐑", detail: "extremely thick, warm, and inviting for sleepy rollers" },
  { name: "knitted wool baby bootie", type: "clothes", emoji: "🧦", detail: "dangling loosely from your chubby left heel" },
  { name: "plastic kitchen measuring spoons", type: "utensil", emoji: "🥄", detail: "clanging loudly on a silver metal ring" },
  { name: "chubby baby image mirror", type: "mirror", emoji: "🪞", detail: "showing a mysterious, sticky-nosed twin who mimics you" },
  { name: "dripping kitchen ice cube", type: "cold", emoji: "🧊", detail: "sliding rapidly across the slippery tile floor" },
  { name: "prickly blue winter blanket", type: "fabric", emoji: "🧣", detail: "wrapped snugly around your tiny, squirming toes" },
  { name: "whirling ceiling fan helper", type: "fan", emoji: "🎈", detail: "spinning around and around in the high ceiling space" },
  { name: "uncle's thick prickly beard", type: "person", emoji: "🧔", detail: "scratchy, smelling of pine, and leaning down close" },
  { name: "sturdy board book of cows", type: "book", emoji: "📖", detail: "thick, colorful, and smelling of fresh cardboard" },
  { name: "dangling star-shaped mobile", type: "mobile", emoji: "⭐", detail: "hanging just out of reach, glowing under cozy lights" },
  { name: "dirty yellow yard tennis ball", type: "ball", emoji: "🎾", detail: "muddy and smelling of wet garden soil" },
  { name: "grandma's shiny pearl necklace", type: "jewelry", emoji: "📿", detail: "glistening white, inviting a strong baby yank" },
  { name: "humming automatic vacuum machine", type: "vacuum", emoji: "🧹", detail: "roaring with rumbling motors and spinning brushes" },
  { name: "spilt warm milk drop puddle", type: "bottle", emoji: "🍼", detail: "forming a sweet white lake on the dark floorboards" },
  { name: "soft velvety bedroom slipper", type: "shoe", emoji: "🥿", detail: "smelling faintly of lavender and dust bunnies" },
  { name: "bright red backyard poppy", type: "flower", emoji: "🌺", detail: "glowing in the sunshine, nodding gently in the breeze" },
  { name: "dropped wooden kitchen spatula", type: "wood", emoji: "🪵", detail: "smooth, flat, and tasting slightly of honey batter" },
  { name: "squishy ripe banana slice", type: "banana", emoji: "🍌", detail: "sweet-smelling, yellow, and incredibly messy" },
  { name: "leather dad-purse wallet", type: "wallet", emoji: "💼", detail: "stuffed with paper notes and smelling of rich leather" },
  { name: "shiny brass door stopper", type: "spring", emoji: "🌀", detail: "coiled copper spring that twangs when flicked" },
  { name: "warm lavender baby lotion", type: "cream", emoji: "🧴", detail: "sweetly scented, slippery white paste on your arms" }
];

const infantPlaces = [
  { name: "on the soft living room carpet", context: "at home" },
  { name: "in your cozy wooden highchair", context: "during mealtime" },
  { name: "on the wet garden grass", context: "outside" },
  { name: "on [Parent]'s double bed", context: "in a safe zone" },
  { name: "by the kitchen tile threshold", context: "on the frontier" }
];

// --------------------------------------------------------------------------
// BRACKET 2: TODDLERS (AGES 3-5) - Kindergarten, primitive play, physical skills
// --------------------------------------------------------------------------

const toddlerItems = [
  { name: "wooden building Blocks", emoji: "🧱", action: "topple a block tower", fail: "fell onto the blocks" },
  { name: "play sand ditch", emoji: "⏳", action: "dig a sandbox tunnel", fail: "got sandbox sand in your eyes" },
  { name: "shiny ladybug crawler", emoji: "🐞", action: "track the little red beetle", fail: "got startled and cried" },
  { name: "smudgey blue finger-paints", emoji: "🎨", action: "create a finger-paint masterpiece", fail: "smeared paint on your carpet" },
  { name: "giant carton cardboard fort", emoji: "📦", action: "defend the castle fortress", fail: "the box collapsed on your head" },
  { name: "fluffy stuffed dinosaur", emoji: "🦖", action: "stage a plush dino battle", fail: "lost the favorite toy in the hedge" },
  { name: "dandelion puff seeds", emoji: "🌼", action: "blow dandelion parachute seeds", fail: "inhaled the seeds and gagged" },
  { name: "bubble blower wand", emoji: "🧼", action: "chase floating shiny soap bubbles", fail: "slipped headfirst on soapy water" },
  { name: "velcro straps sneakers", emoji: "👟", action: "practice closing shoes safely", fail: "tied your fingers in the straps" },
  { name: "wet garden rain puddle", emoji: "🌧️", action: "leap directly into the muddy pool", fail: "soaked your clean playground pants" },
  { name: "ants on red driveway bricks", emoji: "🐜", action: "study the ant colony march", fail: "got stung on your big knuckle" },
  { name: "shining green sticker sheet", emoji: "⭐", action: "decorate your forehead proudly", fail: "stuck it irrevocably to the sofa leather" },
  { name: "plush teddy bear partner", emoji: "🧸", action: "host a quiet living room tea party", fail: "spilt cold chamomile tea all over the rug" },
  { name: "neighborhood trike pathway", emoji: "🚲", action: "pedal at high speeds down the drive", fail: "crashed into the recycling bins" },
  { name: "plastic play kitchen stove", emoji: "🍳", action: "bake high-class sandbox mud pies", fail: "swallowed real cold sand batter" },
  { name: "prickly white garden fence", emoji: "🚧", action: "climb the bottom wooden rung", fail: "scraped your shin on the splinters" },
  { name: "glowing bedroom stars", emoji: "🌟", action: "point out glowing constellations", fail: "fell backward off your toddler bed" },
  { name: "shiny round red marble", emoji: "🔮", action: "roll it down the plastic slider", fail: "it rolled into a dusty heater vent" },
  { name: "fragrant fresh strawberry", emoji: "🍓", action: "nibble the sweet organic berry", fail: "squeezed it to mush inside your pocket" },
  { name: "crinkled paper helicopter", emoji: "🛸", action: "drop it from the top steps", fail: "took a tumble down the steps" },
  { name: "magnetic letter Board", emoji: "🔤", action: "arrange the letters like word blocks", fail: "swallowed the small magnetic letter P" },
  { name: "sweet grape juice container", emoji: "🥤", action: "squeeze the box to drink rapidly", fail: "it exploded sticky juice across your face" },
  { name: "wild red blanket cape", emoji: "🦸", action: "fly around simulating superhero rescues", fail: "tripped over the cape onto the rug" },
  { name: "family pet golden goldfish", emoji: "🐠", action: "gaze at its sparkling golden scales", fail: "spilt half the fishbowl water on the desk" },
  { name: "aromatic pinecone cluster", emoji: "🌲", action: "collect pinecones in a blue bucket", fail: "prickly spikes hurt your thumbs" },
  { name: "colorful wooden bead maze", emoji: "🧩", action: "slide beads along the steel loops", fail: "pinched your finger in the slide tracks" },
  { name: "clanging metal pots lids", emoji: "🥁", action: "drum a heavy marching beat", fail: "dropped a heavy steel lid on your toe" },
  { name: "creeping backyard garden squirrel", emoji: "🐿️", action: "toss peanut shells to the visitor", fail: "it hissed and ran up the oak bark" },
  { name: "backyard organic tomato vine", emoji: "🍅", action: "pick the roundest red prize", fail: "ate a bitter, green unripe tomato" },
  { name: "plaster sidewalk design chalk", emoji: "🖍️", action: "sketch a bright sidewalk rainbow", fail: "scraped your fingernails on the stones" },
  { name: "backyard water sprayer hose", emoji: "💦", action: "catch water drops in your mouth", fail: "got high-pressure water inside your ear" },
  { name: "cozy velvet cartoon pajamas", emoji: "🦁", action: "slide along the hardwood hallway", fail: "slid straight into the hall closet door" },
  { name: "shiny golden leaf collection", emoji: "🍁", action: "press red leaves inside a big book", fail: "tore your favorite book page" },
  { name: "white plastic sandbox shovel", emoji: "🥄", action: "dig deep for lost dinosaur gold", fail: "discovered a nests of squishey worms" },
  { name: "grandpa's gardening spray can", emoji: "🚿", action: "spritz water on local roses", fail: "sprayed yourself straight in the eyes" },
  { name: "wooden rocking horse seat", emoji: "🐴", action: "gallop forward in imaginary fields", fail: "tipped backward onto the laundry pile" },
  { name: "colorful bead windbell", emoji: "🔔", action: "tickle the glass beads for sounds", fail: "shattered a tiny glass hanger rod" },
  { name: "sweet ripe peach segment", emoji: "🍑", action: "enjoy the dripping sweet syrup", fail: "got sticky grease all over your hair" },
  { name: "shiny metal nickel coin", emoji: "🪙", action: "slide the coin across the kitchen", fail: "it disappeared under the heavy fridge" },
  { name: "grandma's giant garden pumpkin", emoji: "🎃", action: "pat the massive smooth orange gourd", fail: "scratched your hand on the prickly stem" },
  { name: "soft green lawn grass", emoji: "🌱", action: "roll down the sloping garden knoll", fail: "got itchy grass stains inside your ears" },
  { name: "classroom carpet circle spot", emoji: "⭕", action: "sit patiently during story time", fail: "fell asleep and drooled on the carpet" },
  { name: "sweet marshmallow pillow chew", emoji: "🍡", action: "savor the soft sweet treat", fail: "stuck it to your clean collar shirt" },
  { name: "shiny glass bead window", emoji: "💎", action: "gaze at refracted rainbow light", fail: "smudged greasy handprints on clear glass" },
  { name: "plush soft green turtle", emoji: "🐢", action: "nestle it under your warm chin", fail: "dropped the turtle in the driveway mud" },
  { name: "classroom wooden toy puzzle", emoji: "🧩", action: "fit the wooden animals in slots", fail: "pinched your skin in the empty spaces" },
  { name: "backyard garden butterfly bush", emoji: "🦋", action: "watch a monarch flap orange wings", fail: "tripped over the sprinkler head" },
  { name: "dripping vanilla waffle cone", emoji: "🍦", action: "lick the melting dessert cream", fail: "entire vanilla scoop fell onto the dirt" },
  { name: "cozy sheep wool stocking", emoji: "🧦", action: "slide around like a hockey skater", fail: "slipped and got a purple bumper knee" },
  { name: "red toy fire truck siren", emoji: "🚨", action: "roll it across the woodfloor", fail: "the loud mechanical buzzer hurt your ears" }
];

const toddlerPlaces = [
  { name: "at the local playground", park: "park" },
  { name: "in the kindergarten room", park: "school" },
  { name: "under the dining room table", park: "home" },
  { name: "in the sunny backyard", park: "outdoors" },
  { name: "at your grandparent's cabin", park: "cabin" }
];

// --------------------------------------------------------------------------
// BRACKET 3: SCHOOL CHILDREN (AGES 6-11) - Primary school, social politics, local events
// --------------------------------------------------------------------------

const schoolItems = [
  { name: "Spelling Bee Champion Word", emoji: "🏫", action: "study spelling matrices to memorize definitions", rogue: "mumble random syllables confidently", calm: "ask the teacher to clarify pronunciation" },
  { name: "Recess Dodgeball Arena", emoji: "🥎", action: "duck, weave, and target empty spaces", rogue: "throw direct headshots at the quiet kid", calm: "stand in the back and hide behind barriers" },
  { name: "Cafeteria Lunch Box Trade", emoji: "🥪", action: "negotiate an organic apple trade", rogue: "swap your sandwich for a dare snack", calm: "eat your home cooked lunch in peace" },
  { name: "Classroom Paper Plane Folding", emoji: "✈️", action: "sculpt an aerodynamic dart glider", rogue: "throw a wet paper comet at the board", calm: "read a library book about aviation" },
  { name: "Science Fair Volcano Formula", emoji: "🌋", action: "measure baking soda ratios accurately", rogue: "pour excessive chemicals to cause a blast", calm: "paint the papier-mache mountain side" },
  { name: "Library Silence Dare", emoji: "📚", action: "whisper funny jokes under your breath", rogue: "screech a battle cry near the study desk", calm: "read picture books silently in a beanbag" },
  { name: "Garden Garter Snake Hunt", emoji: "🐍", action: "examine its green stripes respectfully", rogue: "stuff the writhing reptile in your pack", calm: "let it slide safely into the thick clover" },
  { name: "School Play Dragon Auditions", emoji: "🐲", action: "practice roaring in a deep fantasy voice", rogue: "rip the cardboard wing props in a rage", calm: "audition for a quiet backstage stagehand" },
  { name: "Backyard Wood Fort Defense", emoji: "🏰", action: "reinforce the mud walls with planks", rogue: "hurl heavy twigs at neighboring chargers", calm: "retreat inside to sip sweet hot cocoa" },
  { name: "Stray Puppy Rescue Team", emoji: "🐶", action: "coax the visitor with cold hotdog bits", rogue: "chase it down the muddy drainage creek", calm: "call the local shelter to report its tag" },
  { name: "Gym Class Climbing Rope", emoji: "🧗", action: "clamber high using foot-wrap stability", rogue: "slide down rapidly to burn your palms", calm: "practice soft hops on the floor mats" },
  { name: "Bicycle Without Training Wheels", emoji: "🚲", action: "balance carefully down the sidewalk", rogue: "sprint down the driveway with no helmet", calm: "ask [Parent] to hold the leather saddle" },
  { name: "Neighborhood Iced Lemonade Stand", emoji: "🍋", action: "mix sweet fresh lemon sugar water", rogue: "sell dirty sand-infused water for dimes", calm: "drink the lemonade yourself in shade" },
  { name: "School Bus Back-Row Debate", emoji: "🚌", action: "debate the coolest superhero abilities", rogue: "hurl gummy bears at the driver's hair", calm: "listen to portable music in your corner" },
  { name: "Accidental Garage Window Break", emoji: "🪟", action: "confess your error to [Parent] instantly", rogue: "blame the neighbor's roaming orange cat", calm: "sweep the sharp glass fragments safely" },
  { name: "Homework Grape Juice Stain", emoji: "🍇", action: "dry the wet sheets with a clean towel", rogue: "forge a dog bite story for the teacher", calm: "re-write the equations on fresh paper" },
  { name: "Midnight Flashlight Reading", emoji: "🔦", action: "read thick fantasy adventure novels", rogue: "play noisy hand-held electronic games", calm: "doze off sweet with the lamp switched off" },
  { name: "Backyard Puddle Hop Challenge", emoji: "🌧️", action: "leap clean over the widest water canal", rogue: "splash mud all over your sibling's face", calm: "wade carefully through the outer edges" },
  { name: "Campfire Marshmallow Toasting", emoji: "🔥", action: "roast a beautiful, slow golden crust", rogue: "set the stick on fire to scare siblings", calm: "eat raw white puffy cubes from the bag" },
  { name: "Woven Green Dandelion Crown", emoji: "👑", action: "plait grass and yellow blooms with care", rogue: "toss the heavy weeds inside your pack", calm: "present the crown to your loving [Parent]" },
  { name: "Suburban Ice Cream Chase", emoji: "🍦", action: "sprint with coins to catch the truck", rogue: "ride your bike directly in front of it", calm: "savor a simple cold frozen ice pop" },
  { name: "Unsanctioned Snail Race", emoji: "🐌", action: "track slow progress across the cement", rogue: "crunch down on a garden slug for a dare", calm: "place they safely back under green leaves" },
  { name: "Classroom Clock Countdown", emoji: "⏰", action: "write notes outlining homework goals", rogue: "pack your backpack five minutes early", calm: "watch the red second hand sweep lazily" },
  { name: "Butterfly Recess Rescue", emoji: "🦋", action: "offer sugar droplets to wounded wings", rogue: "trap it inside a glass baby food jar", calm: "watch it flutter high into the clouds" },
  { name: "Backyard Treehouse Club", emoji: "🏡", action: "design a clean secret entry password", rogue: "banish your younger sibling in the rain", calm: "hang cozy cartoon drawings on the wood" },
  { name: "Backyard Soap Slip and Slide", emoji: "💦", action: "glide smoothly across wet yellow plastic", rogue: "do a reckless standing surf dive run", calm: "watch from the dry garden bench seat" },
  { name: "Classroom Drawing Contest", emoji: "🎨", action: "sketch a detailed futuristic starport", rogue: "graffiti funny faces on peer's project", calm: "color a relaxing tropical island sun" },
  { name: "Wild Playground Swing Jumping", emoji: "🎪", action: "leap at the absolute highest swing peak", rogue: "flip backwards to land on your collarbone", calm: "slow the swing with your sneaker heels" },
  { name: "Schoolyard Tic-Tac-Toe", emoji: "❌", action: "employ grid tactics for a swift win", rogue: "kick the dusty board grid in frustration", calm: "let your best friend win the round" },
  { name: "Giant Backyard Snowman", emoji: "☃️", action: "roll wet slush into symmetrical spheres", rogue: "pelt your passing sibling with ice balls", calm: "give him your old winter woolen scarf" },
  { name: "Classroom Pet Hamster Escape", emoji: "🐹", action: "gently lay sunflower seeds to coax it", rogue: "capture it under a heavy wire waste bin", calm: "alert the playground monitor of its run" },
  { name: "Recess Soccer Penalty Kick", emoji: "⚽", action: "aim a curve shot into the low corner", rogue: "trip the advancing goalkeeper with force", calm: "pass the ball to an eager teammate" },
  { name: "Backyard Insect Catching", emoji: "🦗", action: "classify insect colors with magnifying glass", rogue: "shake a jar filled with angry beetles", calm: "let the ladybugs walk across your thumb" },
  { name: "School Bus Condensation Writing", emoji: "🎑", action: "draw beautiful mountain vistas on glass", rogue: "scribble a naughty caricature of the principal", calm: "wipe the glass clean with a soft mitten" },
  { name: "Sidewalk Fossil Hunt", emoji: "🦴", action: "scrape limestone shards to find shells", rogue: "chuck sharp gravel at the stop sign post", calm: "store smooth gray pebbles in your pocket" },
  { name: "Keyboard Typing Lesson", emoji: "⌨️", action: "practice touch-typing with proper fingers", rogue: "mash all keycaps at once to trigger crash", calm: "type a quick paragraph about cozy puppies" },
  { name: "Bouncing Pogo Stick Duel", emoji: "🕴️", action: "hop rhythmically while tracking balances", rogue: "jump off the high porch onto concrete", calm: "count your consecutive bounces patiently" },
  { name: "Neighborhood Hide and Seek", emoji: "🙈", action: "crawl inside the thick lilac bush", rogue: "lock yourself inside the old garden shed", calm: "count to sixty slowly with closed eyes" },
  { name: "Parent's Closet Costume Day", emoji: "🎭", action: "wear dad's soft tie with a clean jacket", rogue: "smudge lipstick all over your cheeks", calm: "try on the oldest winter fur hat" },
  { name: "Lost Library Book Panic", emoji: "📖", action: "search behind couch cushions carefully", rogue: "accuse your sibling of losing the novel", calm: "tell [Parent] of your lost book debt" },
  { name: "School Field Trip Museum", emoji: "🏛️", action: "study the ancient pharaoh sarcophagus", rogue: "poke the historical bones on display", calm: "buy a small mineral crystal at the shop" },
  { name: "Garden Strawberry Sampling", emoji: "🍓", action: "pick the ripest dark red berry", rogue: "hurl unripe green berries at the fence", calm: "wash the sweet berry under garden spigots" },
  { name: "Suburban Bicycle Ramp", emoji: "🛹", action: "glide off the wooden ramp smoothly", rogue: "attempt a dangerous back-row wheelie jump", calm: "ride your bike slowly around the ramp" },
  { name: "First Pocket Money Budget", emoji: "🪙", action: "save half your allowance in a piggy-bank", rogue: "buy a gross amount of extremely sour candy", calm: "purchase a cute green plastic frog toy" },
  { name: "Art Class Ceramic Vase", emoji: "🏺", action: "mold smooth symmetrical clay walls", rogue: "squish your neighbor's wet clay teapot", calm: "carve a simple smiley face on the side" },
  { name: "Suburban Tree Climbing Spot", emoji: "🌳", action: "climb to the lowest thick oak limb", rogue: "dangle by your heels on a thin sprout", calm: "watch the birds from the bottom branch" },
  { name: "Gym Class Hurdle Arena", emoji: "🏃", action: "bound cleanly with rhythmic strides", rogue: "kick the plastic hurdle over on purpose", calm: "jog carefully around the track lane lines" },
  { name: "Late Night Firefly Jar", emoji: "🫙", action: "collect glowing insects to watch them", rogue: "shake the jar to simulate lightning storms", calm: "release them gently back into the dark" },
  { name: "Backyard Soap Slip and Slide Foam", emoji: "🧼", action: "glide smoothly through soap suds", rogue: "tackle your sibling while flying forward", calm: "splatter small splash drops from standard lawn" },
  { name: "Classroom Card Trading", emoji: "🃏", action: "trade equal rank holographic monster units", rogue: "scam a younger kid's legendary silver card", calm: "organize your cards in neat plastic sleeves" },
  { name: "Summer Raincoat Puddle Dance", emoji: "☔", action: "spin around holding your umbrella", rogue: "splash water on passing pedestrian's pants", calm: "listen to the rain drum on your head hood" },
  { name: "Schoolyard Marble Game Circle", emoji: "🔮", action: "flick the steel shooter marble nicely", rogue: "steal the game bag after losing a round", calm: "cheer on your classmate's lucky strike" },
  { name: "Wet Lawn Grass Sledding", emoji: "🛷", action: "slide on a damp cardboard panel sheet", rogue: "sled down the stony embankment slope", calm: "sit on the cardboard on flat green grass" },
  { name: "Classroom Science Jar Grubs", emoji: "🐛", action: "examine beetle larvae with tweezers", rogue: "crush the grub to scare your workspace peer", calm: "sketch its segments on your graph workbook" },
  { name: "Hanging Star Closet Mobile", emoji: "⭐", action: "hang shiny foil stars on dark strings", rogue: "rip the star cords to make a sparkler", calm: "gaze at the twinkling glows on the wall" },
  { name: "Suburban Bike Spokes foil", emoji: "🚲", action: "wrap shiny foil wraps on wheel spokes", rogue: "stick a heavy wooden branch in the wheels", calm: "admire the metallic circles in the light" },
  { name: "School Bus Condensation Art", emoji: "🪟", action: "sketch beautiful garden scenes in steam", rogue: "smudge oil from hair to ruin the window", calm: "watch the rain drops zip across clear pane" },
  { name: "Backyard Snail Shelter Home", emoji: "🐚", action: "build a mossy stone fort for crawlers", rogue: "step on the shell to test its resistance", calm: "lay wet dandelion leaves for their feed" },
  { name: "Classroom Papier-Mache Mask", emoji: "🎭", action: "paste smooth white paper strips neat", rogue: "hurl wet paste glue ball at classroom desk", calm: "paint the dry mask in a deep navy hue" },
  { name: "Neighborhood Hide and Seek Box", emoji: "📦", action: "hide inside a hollow wooden compost bin", rogue: "scare the seeker by throwing rocks to noise", calm: "hide behind [Parent]'s tall hedge row" }
];

const schoolPlaces = [
  { name: "during morning school recess", when: "morning" },
  { name: "on the noisy bus ride", when: "commute" },
  { name: "at the local neighborhood cul-de-sac", when: "homehood" },
  { name: "behind the primary school library", when: "recess" },
  { name: "in the general science classroom", when: "class" }
];

// --------------------------------------------------------------------------
// SCENARIO POOL BUILDER & RESOLUTION RUNTIME
// --------------------------------------------------------------------------

const generateUltimateChildhoodScenarios = (): RawScenario[] => {
  const pool: RawScenario[] = [];

  // 1. GENERATE BRACKET 1: INFANTS (AGES 0-2) -> 35 items * 3 variations = 105 scenarios
  for (let i = 0; i < infantItems.length; i++) {
    const item = infantItems[i];
    for (let v = 0; v < 3; v++) {
      const place = infantPlaces[(i + v) % infantPlaces.length];
      const scenarioId = `ch_inf_${i}_v${v}`;
      
      let title = "";
      if (v === 0) title = `Baby's Quest: ${item.name} ${item.emoji}`;
      else if (v === 1) title = `Sensory Wonder: ${item.name} ${item.emoji}`;
      else title = `The ${item.name} Mystery ${item.emoji}`;

      const description = `While playing ${place.name}, you encounter a ${item.name}. It is ${item.detail}. Your developing sensory systems urge you to take immediate action.`;

      const choices: RawChoice[] = [
        {
          choiceText: `Examine the ${item.name} with your curious baby fingers in detail.`,
          outcomeText: `You slowly patted and stroked the ${item.name}. Its unique physical texture feels highly intriguing, rewarding your quiet curiosity with developmental growth.`,
          adjustments: { happiness: 12, smarts: 15, stress: -5 },
          logText: `You examined the ${item.name} using your fine motor touch skills.`
        },
        {
          choiceText: `Shove the ${item.name} straight into your mouth to taste it.`,
          outcomeText: `Yuck! The ${item.name} tastes incredibly strange. You begin to gag slightly in panic, prompting [Parent] to quickly clear your mouth and wipe your drools.`,
          adjustments: { happiness: -8, health: -10, stress: 15 },
          logText: `You stuffed the ${item.name} in your baby mouth for chewing experiments.`
        },
        {
          choiceText: `Wail frantically at [Parent] to request immediate help with it.`,
          outcomeText: `You let out a loud, high-pitched shriek. [Parent] rushed over with complete worry, wrapping you in a warm hug and comforting your heart.`,
          adjustments: { happiness: 15, karma: 10, stress: -12 },
          logText: `You vocalized loudly to call [Parent] over regarding the ${item.name}.`
        }
      ];

      pool.push({
        id: scenarioId,
        title,
        description,
        minAge: 0,
        maxAge: 2,
        choices
      });
    }
  }

  // 2. GENERATE BRACKET 2: TODDLERS (AGES 3-5) -> 50 items * 3 variations = 150 scenarios
  for (let i = 0; i < toddlerItems.length; i++) {
    const item = toddlerItems[i];
    for (let v = 0; v < 3; v++) {
      const place = toddlerPlaces[(i + v) % toddlerPlaces.length];
      const scenarioId = `ch_tod_${i}_v${v}`;

      let title = "";
      if (v === 0) title = `Toddler Adventure: ${item.name} ${item.emoji}`;
      else if (v === 1) title = `Kindergarten Day: ${item.name} ${item.emoji}`;
      else title = `Playtime Quest: ${item.name} ${item.emoji}`;

      const description = `You are playing ${place.name} when you gain focus of the ${item.name}. [Parent]'s warning voice rings in the back of your thoughts, but your active imagination is racing.`;

      const choices: RawChoice[] = [
        {
          choiceText: `Coordinate your physical motor skills to gracefully ${item.action}.`,
          outcomeText: `Success! You accomplished it perfectly with gorgeous toddler focus. Your physical limits expand, leaving you exceptionally proud of yourself.`,
          adjustments: { happiness: 16, smarts: 12, health: 10, stress: -5 },
          logText: `You carefully practiced coordination to ${item.action}.`
        },
        {
          choiceText: `Go completely wild and smash the ${item.name} with physical excitement.`,
          outcomeText: `A storm of messy energy! However, in the chaotic flurry, you unfortunately ${item.fail}! Spills, bruises, and loud wailing follow as [Parent] rushes over with clean band-aids.`,
          adjustments: { happiness: -10, health: -15, stress: 20 },
          logText: `You went wild with the ${item.name}, but unfortunately ${item.fail}.`
        },
        {
          choiceText: `Present the ${item.name} directly to [Parent] as a lovely peace offering.`,
          outcomeText: `How sweet and pure! [Parent]'s eyes light up with joy. They swoop down to kiss your cheek and treat you to a delicious cold popsicle slice.`,
          adjustments: { happiness: 22, karma: 15, stress: -10 },
          logText: `You brought the ${item.name} to [Parent] as a sweet childhood gift.`
        }
      ];

      pool.push({
        id: scenarioId,
        title,
        description,
        minAge: 3,
        maxAge: 5,
        choices
      });
    }
  }

  // 3. GENERATE BRACKET 3: SCHOOL CHILDREN (AGES 6-11) -> 60 items * 3 variations = 180 scenarios
  for (let i = 0; i < schoolItems.length; i++) {
    const item = schoolItems[i];
    for (let v = 0; v < 3; v++) {
      const place = schoolPlaces[(i + v) % schoolPlaces.length];
      const scenarioId = `ch_sch_${i}_v${v}`;

      let title = "";
      if (v === 0) title = `Classroom Challenge: ${item.name} ${item.emoji}`;
      else if (v === 1) title = `Playground Drama: ${item.name} ${item.emoji}`;
      else title = `Neighborhood Tales: ${item.name} ${item.emoji}`;

      const description = `You face a highly active scenario involving the ${item.name} ${place.name}. The curious eyes of your fellow schoolmates are glued to your next move.`;

      const choices: RawChoice[] = [
        {
          choiceText: `Take the mature and structured route: ${item.action}.`,
          outcomeText: `Your disciplined, highly focus-driven effort yields outstanding results. Your primary schoolmates look greatly impressed, and your teacher awards you a gold star for merit.`,
          adjustments: { happiness: 15, smarts: 18, stress: 8, karma: 12 },
          logText: `You acted with strategic intelligence to ${item.action}.`
        },
        {
          choiceText: `Choose the rogue, chaotic path: ${item.rogue}!`,
          outcomeText: `Absolute hilarious chaos! The entire primary schoolyard erupts into wild high-pitched laughter. However, the principal is highly unamused and gives [Parent] an irritated phone call.`,
          adjustments: { happiness: 20, health: -12, smarts: -15, stress: 18, karma: -20 },
          logText: `You initiated a high-energy schoolyard stunt: you chose to ${item.rogue}.`
        },
        {
          choiceText: `Seek the quiet, stress-relieving option: ${item.calm}.`,
          outcomeText: `You step out of the school spotlight, taking a refreshing deep breath. While the surrounding school drama blows over, you enjoy quiet serenity and perfect peace of mind.`,
          adjustments: { happiness: 12, stress: -20, health: 10, karma: 15 },
          logText: `You sought direct emotional peace and decided to ${item.calm}.`
        }
      ];

      pool.push({
        id: scenarioId,
        title,
        description,
        minAge: 6,
        maxAge: 11,
        choices
      });
    }
  }

  return pool;
};

const fullRawChildhoodScenarios = generateUltimateChildhoodScenarios();

export const childhoodEvents: GameEvent[] = fullRawChildhoodScenarios.map((evt) => {
  return {
    id: evt.id,
    title: evt.title,
    description: evt.description,
    category: 'Childhood',
    condition: (state: CharacterState) => {
      const age = state.characterInfo?.age;
      if (age === undefined) return false;
      return age >= evt.minAge && age <= evt.maxAge;
    },
    choices: evt.choices.map((c) => {
      return {
        choiceText: c.choiceText,
        outcomeText: c.outcomeText,
        effect: (state: CharacterState) => {
          // Relational parsing helper
          const parent = state.relationships.find(r => r.relationshipType === 'Parent' && !r.isDead);
          const sibling = state.relationships.find(r => r.relationshipType === 'Sibling' && !r.isDead);

          const parentName = parent ? parent.name : 'your guardian';
          const siblingName = sibling ? sibling.name : 'your sibling';

          // Commit core mutations safely using multiplier adjustments
          adjustStats(state, c.adjustments);

          // Commit cash alterations if present
          if (c.adjustments.cash) {
            state.finances.cashBalance = Math.max(state.finances.cashBalance + c.adjustments.cash, -500000);
          }

          // Generate dynamic log statements with relationship mapping
          const resolvedLog = c.logText
            .replace(/\[Parent\]/g, parentName)
            .replace(/\[Sibling\]/g, siblingName);

          state.log.push(`Age ${state.characterInfo.age}: ${resolvedLog}`);
        }
      };
    })
  };
});

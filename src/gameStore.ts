/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { create } from 'zustand';
import { CharacterState, GameEvent, Asset, CharacterInfo, Stats, Finances, NPC, Education, Disease, Pet, Weapon, JobListing, MarketPet, PropertyListing, VehicleListing } from './types';
import { masterEventRegistry as EVENT_REGISTRY } from './data/events/index';
import { clamp, adjustStats, COUNTRIES, MALE_FIRST_NAMES, FEMALE_FIRST_NAMES, LAST_NAMES, formatCurrency, OCCUPATIONS, COUNTRY_DETAILS, generateJobListings, generateVehicleListings, generateRealEstateListings, generatePetListings } from './utils';

const DISEASES_POOL: Omit<Disease, 'id'>[] = [
  { name: 'Common Cold', type: 'Infectious', healthDrainPerYear: 5, happinessDrainPerYear: 4, cureDifficulty: 'Easy' },
  { name: 'Flu', type: 'Infectious', healthDrainPerYear: 10, happinessDrainPerYear: 8, cureDifficulty: 'Easy' },
  { name: 'Food Poisoning', type: 'Infectious', healthDrainPerYear: 8, happinessDrainPerYear: 6, cureDifficulty: 'Easy' },
  { name: 'Pneumonia', type: 'Infectious', healthDrainPerYear: 20, happinessDrainPerYear: 12, cureDifficulty: 'Medium' },
  { name: 'Clinical Depression', type: 'Mental', healthDrainPerYear: 6, happinessDrainPerYear: 20, cureDifficulty: 'Medium' },
  { name: 'Clinical Anxiety', type: 'Mental', healthDrainPerYear: 5, happinessDrainPerYear: 15, cureDifficulty: 'Medium' },
  { name: 'High Blood Pressure', type: 'Chronic', healthDrainPerYear: 8, happinessDrainPerYear: 4, cureDifficulty: 'Easy' },
  { name: 'Stomach Ulcers', type: 'Chronic', healthDrainPerYear: 10, happinessDrainPerYear: 8, cureDifficulty: 'Medium' },
  { name: 'Type 2 Diabetes', type: 'Chronic', healthDrainPerYear: 12, happinessDrainPerYear: 6, cureDifficulty: 'Hard' },
  { name: 'Arthritis', type: 'Chronic', healthDrainPerYear: 8, happinessDrainPerYear: 8, cureDifficulty: 'Medium' },
  { name: 'Heart Disease', type: 'Chronic', healthDrainPerYear: 20, happinessDrainPerYear: 10, cureDifficulty: 'Hard' },
  { name: 'Alzheimer\'s', type: 'Chronic', healthDrainPerYear: 25, happinessDrainPerYear: 20, cureDifficulty: 'Incurable' }
];

function spawnRandomDisease(age: number): Disease {
  let pool = DISEASES_POOL.filter(d => {
    if (d.name === "Alzheimer's" && age < 65) return false;
    if (d.name === "Heart Disease" && age < 45) return false;
    return true;
  });
  const picked = pool[Math.floor(Math.random() * pool.length)];
  return {
    ...picked,
    id: `disease-${picked.name.toLowerCase().replace(/\s+/g, '-')}-${Math.random()}`
  };
}

interface HighScore {
  name: string;
  age: number;
  netWorth: number;
  occupation: string;
  country: string;
  causeOfDeath: string;
}

interface GameStoreState {
  characterInfo: CharacterInfo | null;
  stats: Stats | null;
  finances: Finances | null;
  assets: Asset[];
  relationships: NPC[];
  pets: Pet[];
  weapons: Weapon[];
  maritalStatus: 'Single' | 'Dating' | 'Married';
  datingProspects: NPC[];
  education: Education | null;
  criminalRecord: string[];
  prisonSentence: { remainingYears: number, securityLevel: 'Minimum' | 'Medium' | 'Maximum' } | null;
  courtTrial: { crimeType: 'shoplift' | 'grand_theft_auto' | 'bank_robbery' | 'shoplift_candy' | 'vandalize_walls' | 'pickpocket_classmates'; charges: string; sentenceOffer: number } | null;
  diseases: Disease[];
  log: string[];
  currentEvent: GameEvent | null;
  activeEventQueue: GameEvent[];
  lastChoiceOutcome: {
    eventTitle: string;
    choiceText: string;
    outcomeText: string;
    statDeltas?: {
      happiness: number;
      health: number;
      smarts: number;
      looks: number;
      karma: number;
      stress: number;
    };
  } | null;
  highScores: HighScore[];
  seenEventIds: string[];
  annualActionsPerformed: string[];
  geneticBaselines: { smartsBaseline: number; looksBaseline: number; healthBaseline: number } | null;
  consistencyStreaks: { gymStreak: number; libraryStreak: number } | null;
  availableJobs: JobListing[];
  availablePets: MarketPet[];
  availableRealEstate: PropertyListing[];
  availableVehicles: VehicleListing[];

  // Game Engine Actions
  initializeCharacter: () => void;
  ageUp: () => void;
  executeChoice: (eventId: string, choiceIndex: number) => void;
  clearLastChoiceOutcome: () => void;
  buyAsset: (asset: Asset, purchaseMethod?: 'cash' | 'finance') => { success: boolean; msg: string };
  sellAsset: (assetId: string) => void;
  applyForJob: (title: string, salary: number) => void;
  resignJob: () => void;
  playLottery: () => void;
  visitCasino: (wager: number) => { won: boolean; amount: number; msg: string };
  triggerSpecialEvent: (event: GameEvent) => void;
  restartGame: () => void;
  interactWithNPC: (npcId: string, actionType: 'spend_time' | 'conversation' | 'ask_for_money') => void;
  
  // Romance & Family Board Actions
  findDatingProspects: () => void;
  askOutProspect: (prospectId: string) => { success: boolean; msg: string };
  proposeToPartner: (partnerId: string, ringCost: number) => { success: boolean; msg: string; requiresPrenupDecision: boolean };
  handlePrenupDecision: (partnerId: string, signPrenup: boolean) => { success: boolean; msg: string };
  haveAChild: (partnerId: string) => { success: boolean; msg: string };
  breakUpOrDivorce: (partnerId: string) => void;

  // Education Actions
  studyHarder: () => void;
  applyToUniversity: (major: string, funding: 'Scholarship' | 'Parents' | 'Loan') => { success: boolean; msg: string };
  applyToGraduateSchool: (schoolType: 'Law' | 'Medical' | 'Business', funding: 'Scholarship' | 'Parents' | 'Loan') => { success: boolean; msg: string };

  // Crime, Prison, & Justice Systems
  commitCrime: (type: 'shoplift' | 'grand_theft_auto' | 'bank_robbery' | 'shoplift_candy' | 'vandalize_walls' | 'pickpocket_classmates') => void;
  resolveTrial: (defenseType: 'public' | 'attorney') => { acquitted: boolean; sentence: number; msg: string };
  cryInCell: () => void;
  startPrisonRiot: () => { success: boolean; msg: string };
  escapePrison: () => { success: boolean; msg: string };

  // Medical & Rehab System Actions
  visitDoctor: (doctorType: 'Medical' | 'Psychiatrist' | 'Alternative', diseaseId: string) => { success: boolean; msg: string };
  gotoRehab: () => { success: boolean; msg: string };

  // Advanced Expansion: Pets, Luxury Assets, Black Market & Capital Criminology Actions
  adoptPet: (source: 'shelter' | 'breeder' | 'exotic', species: string, breed: string, cost: number, craziness?: number, arrestProbability?: number, listingId?: string) => { success: boolean; msg: string };
  interactWithPet: (petId: string, action: 'quality_time' | 'treat' | 'vet' | 'train') => void;
  buyWeapon: (weapon: Weapon, cost: number) => { success: boolean; msg: string };
  discardWeapon: (weaponId: string) => void;
  buyFromStreetChemist: (substanceName: string, cost: number) => { success: boolean; msg: string };
  buyExoticPet: (species: string, breed: string, cost: number) => { success: boolean; msg: string };
  murderSomeone: (targetId: string, method: string, weaponId?: string) => { success: boolean; msg: string };
  hireHitman: (targetId: string) => { success: boolean; msg: string };
}

const STORAGE_KEY = 'bitlife_replica_high_scores';

function loadHighScores(): HighScore[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function saveHighScore(score: HighScore) {
  try {
    const scores = loadHighScores();
    scores.push(score);
    scores.sort((a, b) => b.netWorth - a.netWorth); // Sort by net worth descending
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores.slice(0, 10))); // Only keep top 10
  } catch (e) {
    // Fail-safe
  }
}

function validateEventChoices(evt: GameEvent): GameEvent {
  let choices = [...evt.choices];
  if (choices.length > 4) {
    choices = choices.slice(0, 4);
  }
  while (choices.length < 3) {
    choices.push({
      choiceText: "Take a moment to collect your thoughts and move forward.",
      outcomeText: "You take a deep breath, ground yourself, and step into the next chapter of your life.",
      effect: (state: CharacterState) => {
        adjustStats(state, { happiness: 5, stress: -5 });
        state.log.push(`Age ${state.characterInfo?.age || ''}: You paused briefly to reflect and collect your thoughts.`);
      }
    });
  }
  return {
    ...evt,
    choices
  };
}

function formatEventWithRelationships(evt: GameEvent, relationships: NPC[], age: number): GameEvent {
  const parent = relationships.find(r => r.relationshipType === 'Parent' && !r.isDead);
  const sibling = relationships.find(r => r.relationshipType === 'Sibling' && !r.isDead);
  const partner = relationships.find(r => r.relationshipType === 'Partner' && !r.isDead);
  const child = relationships.find(r => r.relationshipType === 'Child' && !r.isDead);

  const parentName = parent ? parent.name : 'your parent';
  const siblingName = sibling ? sibling.name : 'your sibling';
  const partnerName = partner ? partner.name : 'your partner';
  const childName = child ? child.name : 'your child';

  const replacePlaceholders = (text: string): string => {
    return text
      .replace(/\[Parent\]/g, parentName)
      .replace(/\[Sibling\]/g, siblingName)
      .replace(/\[Partner\]/g, partnerName)
      .replace(/\[Child\]/g, childName);
  };

  const initialChoices = evt.choices.map(c => ({
    choiceText: replacePlaceholders(c.choiceText || (c as any).text || ''),
    outcomeText: replacePlaceholders(c.outcomeText || ''),
    effect: c.effect || ((state: CharacterState) => {
      if ((c as any).adjustments) {
        adjustStats(state, (c as any).adjustments);
        if ((c as any).adjustments.cash) {
          state.finances.cashBalance = Math.max(state.finances.cashBalance + (c as any).adjustments.cash, -500000);
        }
      }
      if ((c as any).logText) {
        state.log.push(`Age ${state.characterInfo.age}: ${replacePlaceholders((c as any).logText)}`);
      }
    })
  }));

  const enhancedChoices = [...initialChoices];

  if (age >= 16) {
    const targetLength = Math.min(4, Math.max(enhancedChoices.length, Math.floor(Math.random() * 2) + 3)); // exactly 3 or 4
    if (enhancedChoices.length < targetLength) {
      // Determine category
      const txt = (evt.title + ' ' + evt.description + ' ' + (evt.id || '')).toLowerCase();
      let cat: 'School' | 'Workplace' | 'PersonalLife' | 'Random' = 'Random';
      if (evt.category === 'School' || txt.includes('school') || txt.includes('university') || txt.includes('class') || txt.includes('teacher') || txt.includes('grade') || txt.includes('exam')) {
        cat = 'School';
      } else if (txt.includes('work') || txt.includes('boss') || txt.includes('job') || txt.includes('career') || txt.includes('office') || txt.includes('corporate') || txt.includes('employee') || txt.includes('salary') || txt.includes('co-worker') || txt.includes('manager') || txt.includes('promotion') || txt.includes('retirement') || txt.includes('resign') || txt.includes('pension')) {
        cat = 'Workplace';
      } else if (txt.includes('parent') || txt.includes('sibling') || txt.includes('partner') || txt.includes('family') || txt.includes('child') || txt.includes('dating') || txt.includes('relationship') || txt.includes('friend') || txt.includes('wife') || txt.includes('husband') || txt.includes('marriage')) {
        cat = 'PersonalLife';
      }

      const schoolPool = [
        {
          choiceText: 'Study overnight at the local diner under caffeine stimulation.',
          outcomeText: 'You drank endless filter coffee and spent 12 hours straight preparing. Your head hurts, but you feel prepared!',
          effect: (state: CharacterState) => {
            adjustStats(state, { smarts: 15, stress: 15, happiness: -5 });
            state.log.push(`Age ${state.characterInfo.age}: You studied overnight at a local diner.`);
          }
        },
        {
          choiceText: 'Consult a wise senior classmate for advice on navigating this.',
          outcomeText: 'They shared a secret study shortcut to bypass the stress. Your head cleared immediately!',
          effect: (state: CharacterState) => {
            adjustStats(state, { stress: -15, happiness: 10, smarts: 5 });
            state.log.push(`Age ${state.characterInfo.age}: You consulted a wise senior student for guidance.`);
          }
        },
        {
          choiceText: 'Blow off steam by organizing a rowdy block party in your dorm wing.',
          outcomeText: 'The music boomed and everyone had an amazing night. Your popularity soared, though you slept through alarm clocks!',
          effect: (state: CharacterState) => {
            adjustStats(state, { happiness: 20, stress: -20, looks: 5, health: -5 });
            state.log.push(`Age ${state.characterInfo.age}: You blew off academic steam by hosting a massive wing party.`);
          }
        }
      ];

      const workplacePool = [
        {
          choiceText: 'Schedule an emergency 1-on-1 review with your direct manager.',
          outcomeText: 'Your boss deeply respected your proactive attitude but warned you to stay focused. You gained useful guidance!',
          effect: (state: CharacterState) => {
            adjustStats(state, { smarts: 10, stress: 5, happiness: 5 });
            state.log.push(`Age ${state.characterInfo.age}: You proactively scheduled a 1-on-1 review with your boss.`);
          }
        },
        {
          choiceText: 'Spread mild gossip in the tea breakroom to gauge co-worker sentiment.',
          outcomeText: 'Your peers shared some hilarious banter. You feel highly locked-in with the corporate web!',
          effect: (state: CharacterState) => {
            adjustStats(state, { happiness: 15, karma: -10, stress: -5 });
            state.log.push(`Age ${state.characterInfo.age}: You gossiped in the breakroom to read the corporate temperature.`);
          }
        },
        {
          choiceText: 'Lock your office door, turn off the fluorescent lights, and take a 30-minute nap.',
          outcomeText: 'You dozed off perfectly on your ergonomic chair. You woke up feeling completely energized and refreshed!',
          effect: (state: CharacterState) => {
            adjustStats(state, { health: 10, stress: -15, happiness: 10 });
            state.log.push(`Age ${state.characterInfo.age}: You took a refreshing desk power nap at work.`);
          }
        }
      ];

      const personalPool = [
        {
          choiceText: 'Plan an elaborate surprise candlelit home-cooked dinner for everyone involved.',
          outcomeText: 'You served a delicious three-course lasagna! Warm laughter and fuzzy feelings resolved all immediate friction.',
          effect: (state: CharacterState) => {
            adjustStats(state, { happiness: 20, karma: 15, stress: -10 });
            state.log.push(`Age ${state.characterInfo.age}: You served a surprise lasagna dinner to resolve personal friction.`);
          }
        },
        {
          choiceText: 'Post an anonymous, slightly exaggerated venting thread on a popular advice forum.',
          outcomeText: 'Hundreds of internet strangers gave you contradicting advice, but getting it off your chest felt amazing!',
          effect: (state: CharacterState) => {
            adjustStats(state, { stress: -15, happiness: 10 });
            state.log.push(`Age ${state.characterInfo.age}: You posted an anonymous advice forum venting thread.`);
          }
        },
        {
          choiceText: 'Draft a long, heartfelt handwritten letter spelling out your feelings.',
          outcomeText: 'Putting your honest thoughts down on paper cleared the air gracefully. Everyone appreciated your maturity!',
          effect: (state: CharacterState) => {
            adjustStats(state, { happiness: 15, karma: 10, smarts: 5 });
            state.log.push(`Age ${state.characterInfo.age}: You resolved personal matters gracefully with a handwritten letter.`);
          }
        }
      ];

      const randomPool = [
        {
          choiceText: 'Spend the afternoon meditating on a wooden bench overlooking a peaceful lily pond.',
          outcomeText: 'Quiet rhythmic breathing helped you find absolute inner peace and clarity.',
          effect: (state: CharacterState) => {
            adjustStats(state, { happiness: 15, stress: -20, health: 10 });
            state.log.push(`Age ${state.characterInfo.age}: You spent a peaceful afternoon meditating by a lily pond.`);
          }
        },
        {
          choiceText: 'Blast high-energy driving tunes and do a warm 10k run down the misty city trails.',
          outcomeText: 'The runner\'s high completely overrides your existential distress. Your lungs are burning with life!',
          effect: (state: CharacterState) => {
            adjustStats(state, { health: 15, happiness: 10, stress: -15 });
            state.log.push(`Age ${state.characterInfo.age}: You went on a scenic 10k run to restore mental clarity.`);
          }
        },
        {
          choiceText: 'Buy a tub of premium double-fudge ice cream and binge reality television shows.',
          outcomeText: 'The fudge is deliciously sweet, and watching other people\'s drama makes your challenges feel small.',
          effect: (state: CharacterState) => {
            adjustStats(state, { happiness: 15, looks: -5, stress: -10 });
            state.finances.cashBalance = Math.max(state.finances.cashBalance - 15, -500000);
            state.log.push(`Age ${state.characterInfo.age}: You indulged in double-fudge ice cream and reality TV.`);
          }
        }
      ];

      let selectedPool = randomPool;
      if (cat === 'School') selectedPool = schoolPool;
      else if (cat === 'Workplace') selectedPool = workplacePool;
      else if (cat === 'PersonalLife') selectedPool = personalPool;

      // Shuffle selectedPool to avoid always adding choices in the same order
      const shuffledPool = [...selectedPool].sort(() => Math.random() - 0.5);

      for (const choice of shuffledPool) {
        if (enhancedChoices.length >= targetLength) break;
        // Avoid duplicate text of any existing choice
        if (!enhancedChoices.some(ec => ec.choiceText.toLowerCase() === choice.choiceText.toLowerCase())) {
          enhancedChoices.push(choice);
        }
      }

      // If still not enough, add from the random pool as a backup
      if (enhancedChoices.length < targetLength) {
        const backupPool = [...randomPool].sort(() => Math.random() - 0.5);
        for (const choice of backupPool) {
          if (enhancedChoices.length >= targetLength) break;
          if (!enhancedChoices.some(ec => ec.choiceText.toLowerCase() === choice.choiceText.toLowerCase())) {
            enhancedChoices.push(choice);
          }
        }
      }
    }
  }

  return validateEventChoices({
    ...evt,
    description: replacePlaceholders(evt.description),
    choices: enhancedChoices
  });
}

export const useGameStore = create<GameStoreState>((set, get) => ({
  characterInfo: null,
  stats: null,
  finances: null,
  assets: [],
  relationships: [],
  pets: [],
  weapons: [],
  maritalStatus: 'Single',
  datingProspects: [],
  education: null,
  criminalRecord: [],
  prisonSentence: null,
  courtTrial: null,
  diseases: [],
  log: [],
  currentEvent: null,
  activeEventQueue: [],
  lastChoiceOutcome: null,
  highScores: loadHighScores(),
  seenEventIds: [],
  annualActionsPerformed: [],
  geneticBaselines: null,
  consistencyStreaks: null,
  availableJobs: [],
  availablePets: [],
  availableRealEstate: [],
  availableVehicles: [],

  initializeCharacter: () => {
    const gender = Math.random() > 0.5 ? 'Male' : 'Female';
    const firstNames = gender === 'Male' ? MALE_FIRST_NAMES : FEMALE_FIRST_NAMES;
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];

    const stats: Stats = {
      happiness: Math.floor(Math.random() * 40) + 50, // 50 to 90
      health: Math.floor(Math.random() * 40) + 50,    // 50 to 90
      smarts: Math.floor(Math.random() * 50) + 30,    // 30 to 80
      looks: Math.floor(Math.random() * 50) + 30,     // 30 to 80
      karma: Math.floor(Math.random() * 30) + 50,     // 50 to 80
      stress: 0,
    };

    const finances: Finances = {
      cashBalance: 0,
      annualSalary: 0,
      annualDebt: 0,
    };

    const info: CharacterInfo = {
      firstName,
      lastName,
      age: 0,
      gender,
      country,
      hasLicense: false,
      isDead: false,
      currentOccupation: 'Baby',
    };

    const initialEducation: Education = {
      currentStage: 'None',
      currentMajor: null,
      highestDegreeEarned: 'None',
      grades: 0,
    };

    const numParents = Math.random() > 0.5 ? 2 : 1;
    const numSiblings = Math.floor(Math.random() * 4); // 0 to 3
    const rels: NPC[] = [];

    const getRandomName = (g: 'Male' | 'Female') => {
      const names = g === 'Male' ? MALE_FIRST_NAMES : FEMALE_FIRST_NAMES;
      return names[Math.floor(Math.random() * names.length)];
    };

    const motherAge = Math.floor(Math.random() * 15) + 22; // 22 to 36
    const fatherAge = Math.floor(Math.random() * 15) + 24; // 24 to 38

    if (numParents === 2) {
      rels.push({
        id: `npc-mother-${Math.random()}`,
        name: `${getRandomName('Female')} ${lastName}`,
        relationshipType: 'Parent',
        relationshipValue: Math.floor(Math.random() * 30) + 60, // 60 to 90
        generosity: Math.floor(Math.random() * 80) + 15,
        money: Math.floor(Math.random() * 80000) + 20000,
        isDead: false,
        age: motherAge,
      });
      rels.push({
        id: `npc-father-${Math.random()}`,
        name: `${getRandomName('Male')} ${lastName}`,
        relationshipType: 'Parent',
        relationshipValue: Math.floor(Math.random() * 30) + 60, // 60 to 90
        generosity: Math.floor(Math.random() * 80) + 15,
        money: Math.floor(Math.random() * 80000) + 20000,
        isDead: false,
        age: fatherAge,
      });
    } else {
      const pGender = Math.random() > 0.5 ? 'Male' : 'Female';
      const pAge = pGender === 'Male' ? fatherAge : motherAge;
      rels.push({
        id: `npc-singleparent-${Math.random()}`,
        name: `${getRandomName(pGender)} ${lastName}`,
        relationshipType: 'Parent',
        relationshipValue: Math.floor(Math.random() * 30) + 60, // 60 to 90
        generosity: Math.floor(Math.random() * 80) + 15,
        money: Math.floor(Math.random() * 80000) + 20000,
        isDead: false,
        age: pAge,
      });
    }

    for (let i = 0; i < numSiblings; i++) {
      const sibGender = Math.random() > 0.5 ? 'Male' : 'Female';
      const sibAge = Math.floor(Math.random() * 10) + 2; // 2 to 11 years older
      rels.push({
        id: `npc-sibling-${i}-${Math.random()}`,
        name: `${getRandomName(sibGender)} ${lastName}`,
        relationshipType: 'Sibling',
        relationshipValue: Math.floor(Math.random() * 40) + 50, // 50 to 90
        generosity: Math.floor(Math.random() * 60) + 20,
        money: Math.floor(Math.random() * 200) + 10,
        isDead: false,
        age: sibAge,
      });
    }

    const geneticBaselines = {
      smartsBaseline: Math.floor(Math.random() * 101),
      looksBaseline: Math.floor(Math.random() * 101),
      healthBaseline: Math.floor(Math.random() * 101),
    };

    const consistencyStreaks = {
      gymStreak: 0,
      libraryStreak: 0,
    };

    set({
      characterInfo: info,
      stats,
      finances,
      assets: [],
      relationships: rels,
      pets: [],
      weapons: [],
      maritalStatus: 'Single',
      datingProspects: [],
      education: initialEducation,
      criminalRecord: [],
      prisonSentence: null,
      courtTrial: null,
      diseases: [],
      log: [
        `You were born a baby ${gender.toLowerCase()} in ${country}.`,
        `Your name is ${firstName} ${lastName}.`,
      ],
      currentEvent: null,
      activeEventQueue: [],
      lastChoiceOutcome: null,
      seenEventIds: [],
      annualActionsPerformed: [],
      geneticBaselines,
      consistencyStreaks,
      availableJobs: [],
      availablePets: [],
      availableRealEstate: [],
      availableVehicles: [],
    });
  },

  ageUp: () => {
    const { characterInfo, stats, finances, assets, relationships, pets = [], weapons = [], log, education, prisonSentence, criminalRecord, diseases = [], consistencyStreaks, geneticBaselines } = get();
    if (!characterInfo || characterInfo.isDead) return;

    const nextAge = characterInfo.age + 1;
    const nextInfo = { ...characterInfo, age: nextAge };
    const nextFinances = { ...finances! };
    const nextStats = { ...stats! };
    const nextLog = [...log];
    const nextRecord = [...(criminalRecord || [])];
    const nextDiseases = [...diseases];
    const nextPets = pets.map(p => ({ ...p }));
    const nextWeapons = weapons.map(w => ({ ...w }));

    // Tracking Consistency Streaks
    let nextGymStreak = consistencyStreaks ? consistencyStreaks.gymStreak : 0;
    let nextLibraryStreak = consistencyStreaks ? consistencyStreaks.libraryStreak : 0;

    const annualActions = get().annualActionsPerformed || [];
    if (annualActions.includes('visit_gym')) {
      nextGymStreak += 1;
    } else {
      nextGymStreak = 0;
    }

    if (annualActions.includes('study_harder')) {
      nextLibraryStreak += 1;
    } else {
      nextLibraryStreak = 0;
    }

    const nextStreaks = {
      gymStreak: nextGymStreak,
      libraryStreak: nextLibraryStreak
    };

    // 1. Spawning / Contracting Diseases
    // Random Health Events Check (8% base chance, multiplied by 2.5x for low health baseline characters < 40)
    let diseaseChance = 0.08;
    if (geneticBaselines && geneticBaselines.healthBaseline < 40) {
      diseaseChance *= 2.5;
    }

    let childhoodInterventionEvent: GameEvent | null = null;

    if (Math.random() < diseaseChance) {
      const newD = spawnRandomDisease(nextAge);
      if (!nextDiseases.some(d => d.name === newD.name)) {
        if (nextAge < 18) {
          childhoodInterventionEvent = {
            id: `childhood-med-intervention-${newD.name.toLowerCase().replace(/\s+/g, '-')}-${Math.random()}`,
            title: `Childhood Illness`,
            description: `Your [Parent] noticed you running a severe fever and vomiting from ${newD.name}. They immediately rushed you to the local clinic.`,
            category: 'Special',
            condition: () => true,
            choices: [
              {
                choiceText: 'Cooperate and take your medicine quietly',
                outcomeText: '',
                effect(this: any, state) {
                  const roll = Math.random();
                  const isCured = roll < 0.70;
                  const parent = state.relationships.find(r => r.relationshipType === 'Parent' && !r.isDead);
                  const parentName = parent ? parent.name : 'parent';
                  adjustStats(state, { karma: 10 });
                  state.relationships.forEach(npc => {
                    if (npc.relationshipType === 'Parent') {
                      npc.relationshipValue = Math.min(100, npc.relationshipValue + 5);
                    }
                  });
                  if (isCured) {
                    state.log.push(`Age ${state.characterInfo.age}: You cooperatively took your medicine, successfully curing ${newD.name}.`);
                    this.outcomeText = `You cooperated with the doctor and calmly swallowed the bitter medicine. Luckily, your immune system responded beautifully and you were cured of ${newD.name}! Your ${parentName} is proud of your maturity.`;
                  } else {
                    if (!state.diseases.some(d => d.name === newD.name)) {
                      state.diseases.push(newD);
                    }
                    state.log.push(`Age ${state.characterInfo.age}: You cooperatively took your medicine, but it failed to cure ${newD.name}.`);
                    this.outcomeText = `You took your medicine like a brave child, but unfortunately, the clinical treatment failed to clear ${newD.name} out of your system. It will now begin affecting your baseline health.`;
                  }
                }
              },
              {
                choiceText: 'Scream, cry, and refuse the needle',
                outcomeText: '',
                effect(this: any, state) {
                  const roll = Math.random();
                  const isCured = roll < 0.30;
                  const parent = state.relationships.find(r => r.relationshipType === 'Parent' && !r.isDead);
                  const parentName = parent ? parent.name : 'parent';
                  adjustStats(state, { happiness: -10 });
                  state.relationships.forEach(npc => {
                    if (npc.relationshipType === 'Parent') {
                      npc.relationshipValue = Math.max(0, npc.relationshipValue - 5);
                    }
                  });
                  if (isCured) {
                    state.log.push(`Age ${state.characterInfo.age}: You resisted treatment with screaming and tantrums, but the medical session cured ${newD.name} anyway.`);
                    this.outcomeText = `You threw an absolute tantrum, crying and screaming in the examination room. Despite the chaos, the clinical staff managed to administer the therapy, and miraculously, ${newD.name} was cured! But your ${parentName} was incredibly exhausted by your behavior.`;
                  } else {
                    if (!state.diseases.some(d => d.name === newD.name)) {
                      state.diseases.push(newD);
                    }
                    state.log.push(`Age ${state.characterInfo.age}: You refused treatment and threw a fit. Your ${newD.name} was not cured.`);
                    this.outcomeText = `You kicked, wriggled, and cried so hard that the treatment session was cut short. Regrettably, ${newD.name} was not cured and remains in your active ailments. Your ${parentName} looks deeply disappointed.`;
                  }
                }
              },
              {
                choiceText: "Bite the doctor's hand",
                outcomeText: '',
                effect(this: any, state) {
                  const roll = Math.random();
                  const isCured = roll < 0.10;
                  const parent = state.relationships.find(r => r.relationshipType === 'Parent' && !r.isDead);
                  const parentName = parent ? parent.name : 'parents';
                  adjustStats(state, { karma: -20, stress: 15 });
                  if (isCured) {
                    state.log.push(`Age ${state.characterInfo.age}: You bit the doctor's hand in severe panic! Amazingly, the quick shot cured ${newD.name}.`);
                    state.log.push(`Age ${state.characterInfo.age}: [INCIDENT] The pediatric clinic blacklisted you for pediatric combativeness.`);
                    this.outcomeText = `Ouch! In a sudden panic, you sunk your teeth into the pediatrician's hand! They shrieked in pain. In the scramble, they managed to vaccinate you and you were cured of ${newD.name}, but you triggered a clinic incident and got blacklisted! Your ${parentName} is absolutely mortified.`;
                  } else {
                    if (!state.diseases.some(d => d.name === newD.name)) {
                      state.diseases.push(newD);
                    }
                    state.log.push(`Age ${state.characterInfo.age}: You bit the doctor's hand in severe panic. The treatment failed and ${newD.name} remains.`);
                    state.log.push(`Age ${state.characterInfo.age}: [INCIDENT] The pediatric clinic blacklisted you for pediatric combativeness.`);
                    this.outcomeText = `Ouch! You bit the doctor's hand! Amid the shrieks and chaos, the doctor refused to continue. Not only did you fail to get cured of ${newD.name}, but the clinic blacklisted your family! Your ${parentName} is absolutely mortified.`;
                  }
                }
              }
            ]
          };
        } else {
          nextDiseases.push(newD);
          nextLog.push(`Age ${nextAge}: [DIAGNOSIS] You have been diagnosed with ${newD.name}. Type: ${newD.type}. Treatment is recommended.`);
        }
      }
    }

    // Stress-Induced Illness (40% chance if stress is extreme > 80)
    if (nextStats.stress > 80 && Math.random() < 0.40) {
      const stressIllnesses = [
        { name: 'Clinical Anxiety', type: 'Mental' as const, healthDrainPerYear: 5, happinessDrainPerYear: 15, cureDifficulty: 'Medium' as const },
        { name: 'Stomach Ulcers', type: 'Chronic' as const, healthDrainPerYear: 10, happinessDrainPerYear: 8, cureDifficulty: 'Medium' as const },
        { name: 'Clinical Depression', type: 'Mental' as const, healthDrainPerYear: 6, happinessDrainPerYear: 20, cureDifficulty: 'Medium' as const }
      ];
      const pickedStressD = stressIllnesses[Math.floor(Math.random() * stressIllnesses.length)];
      if (!nextDiseases.some(d => d.name === pickedStressD.name)) {
        const id = `disease-stress-${pickedStressD.name.toLowerCase().replace(/\s+/g, '-')}-${Math.random()}`;
        nextDiseases.push({ ...pickedStressD, id });
        nextLog.push(`Age ${nextAge}: [STRESS] Due to extremely high work or academic stress, you have developed ${pickedStressD.name}!`);
      }
    }

    // 2. Sum up total health & happiness drains across all conditions
    let totalHealthDrain = 0;
    let totalHappinessDrain = 0;
    nextDiseases.forEach(d => {
      totalHealthDrain += d.healthDrainPerYear;
      totalHappinessDrain += d.happinessDrainPerYear;
    });

    const hasAddiction = nextDiseases.some(d => d.name === 'Substance Addiction');
    if (hasAddiction) {
      totalHealthDrain += 15;
      totalHappinessDrain += 15;
    }

    if (nextDiseases.length > 0 || hasAddiction) {
      nextStats.health = clamp(nextStats.health - totalHealthDrain, 0, 100);
      nextStats.happiness = clamp(nextStats.happiness - totalHappinessDrain, 0, 100);
      const diseaseNames = nextDiseases.map(d => d.name).join(', ');
      const extraAddMsg = hasAddiction ? ' (including -15% from Substance Addiction)' : '';
      nextLog.push(`Age ${nextAge}: Active conditions (${diseaseNames || 'Substance Addiction'}) caused you health loss (-${Math.round(totalHealthDrain)}%) and happiness loss (-${Math.round(totalHappinessDrain)}%)${extraAddMsg}.`);
    }

    if (prisonSentence !== null) {
      // INTERCEPTED INCARCERATION LOOP
      const nextRemaining = prisonSentence.remainingYears - 1;
      let released = false;
      let nextSentenceState = null;
      let occupation = 'Prisoner';

      // Drop happiness and health passively
      nextStats.happiness = clamp(nextStats.happiness - (Math.floor(Math.random() * 8) + 8), 0, 100); // passive decrease
      nextStats.health = clamp(nextStats.health - (Math.floor(Math.random() * 5) + 5), 0, 100); // passive decrease
      nextStats.stress = clamp(nextStats.stress + 5, 0, 100);

      const prisonEvents = [
        "An inmate named Skull threatened you in the yard.",
        "You traded a chocolate bar for some decent security protection.",
        "A prison guard harassed you for no reason during inspection.",
        "You caught a severe cold from the damp floor of your cell.",
        "The prison food had a suspicious smell today, but you ate it anyway.",
        "You spent the day working out in the prison yard and gained some respect.",
        "You read a contraband book in your cell at night.",
        "An inmate challenged you to a fight; you managed to avoid it.",
        "The cells were freezing cold tonight. You barely slept."
      ];
      const randomEvent = prisonEvents[Math.floor(Math.random() * prisonEvents.length)];

      if (nextRemaining <= 0) {
        released = true;
        occupation = 'Unemployed';
        nextLog.push(`Age ${nextAge}: [RELEASED] You have completed your sentence and are officially released from prison!`);
      } else {
        nextSentenceState = {
          ...prisonSentence,
          remainingYears: nextRemaining
        };
        nextLog.push(`Age ${nextAge}: Serving sentence in prison (${nextRemaining} year(s) remaining). ${randomEvent}`);
      }

      // Check mortality in prison
      if (nextStats.health <= 0) {
        nextInfo.isDead = true;
        nextInfo.deathReason = 'Died in prison';
        nextLog.push(`Age ${nextAge}: You died in prison due to severe health deprivation and harsh conditions.`);

        // Calculate Net Worth: Cash + Asset Value - Outstanding Loan Principals
        const assetEquity = assets.reduce((sum, a) => sum + a.currentValue, 0);
        const outstandingLoans = assets.reduce((sum, a) => sum + (a.isFinanced && a.loanDetails ? a.loanDetails.principalRemaining : 0), 0);
        const totalNetWorth = nextFinances.cashBalance + assetEquity - outstandingLoans;

        // Save to High Scores
        const newScore = {
          name: `${nextInfo.firstName} ${nextInfo.lastName}`,
          age: nextAge,
          netWorth: totalNetWorth,
          occupation: 'Prisoner' as const,
          country: nextInfo.country,
          causeOfDeath: 'Died in prison',
        };
        saveHighScore(newScore);

        set({
          characterInfo: nextInfo,
          stats: nextStats,
          finances: nextFinances,
          prisonSentence: nextSentenceState,
          diseases: nextDiseases,
          log: nextLog,
          highScores: loadHighScores(),
          currentEvent: null,
        });
        return;
      }

      set({
        characterInfo: {
          ...nextInfo,
          currentOccupation: occupation
        },
        stats: nextStats,
        finances: nextFinances,
        prisonSentence: nextSentenceState,
        diseases: nextDiseases,
        log: nextLog,
        currentEvent: null,
      });

      return;
    }

    // 1. Advance age
    const nextAssets = assets.map(a => {
      // Asset values undergo standard market drift
      // Real estate appreciates slightly, vehicles depreciate
      const drift = a.type === 'real_estate' 
        ? 1.02 + Math.random() * 0.03 // +2% to +5%
        : 0.90 + Math.random() * 0.05; // -10% to -5%
      return {
        ...a,
        currentValue: Math.round(a.currentValue * drift),
      };
    });

    let occupation = nextInfo.currentOccupation;
    const nextEducation: Education = education ? { ...education } : {
      currentStage: 'None',
      currentMajor: null,
      highestDegreeEarned: 'None',
      grades: 0,
    };

    // Automated childhood education stages
    if (nextAge === 5) {
      nextEducation.currentStage = 'Primary School';
      nextEducation.grades = 70; // baseline start
      occupation = 'Primary School Student';
      nextLog.push('Age 5: You started Primary School! Welcome to your first day of class.');
    } else if (nextAge === 11) {
      nextEducation.currentStage = 'Middle School';
      occupation = 'Middle School Student';
      nextLog.push('Age 11: You transitioned to Middle School! Homework and assignments are piling up.');
    } else if (nextAge === 14) {
      nextEducation.currentStage = 'High School';
      occupation = 'High School Student';
      nextLog.push('Age 14: You entered High School! College plans and social status start to matter.');
    } else if (nextAge === 18 && nextEducation.currentStage === 'High School') {
      nextEducation.highestDegreeEarned = 'High School Diploma';
      nextEducation.currentStage = 'None';
      occupation = 'Unemployed';
      nextLog.push('Age 18: You graduated from High School and earned your High School Diploma! A world of higher education or jobs awaits.');
    }

    // University or Graduate School countdown/progression
    if (nextEducation.currentStage === 'University' || nextEducation.currentStage === 'Graduate School') {
      if (nextEducation.yearsRemaining !== undefined && nextEducation.yearsRemaining > 0) {
        nextEducation.yearsRemaining -= 1;

        if (nextEducation.yearsRemaining === 0) {
          if (nextEducation.currentStage === 'University') {
            nextEducation.highestDegreeEarned = 'Undergraduate Degree';
            nextEducation.currentStage = 'None';
            const graduatedMajor = nextEducation.currentMajor;
            nextEducation.currentMajor = null;
            nextEducation.fundingType = null;
            occupation = 'Unemployed';
            nextFinances.annualSalary = 0;
            // Clear student loans or preserve them as standard
            nextLog.push(`Age ${nextAge}: Congratulations! You graduated from University with an Undergraduate Degree in ${graduatedMajor}!`);
          } else if (nextEducation.currentStage === 'Graduate School') {
            const pathType = nextEducation.currentMajor;
            if (pathType === 'Law') {
              nextEducation.highestDegreeEarned = 'Law Degree';
            } else if (pathType === 'Medical') {
              nextEducation.highestDegreeEarned = 'Medical Degree';
            } else if (pathType === 'Business') {
              nextEducation.highestDegreeEarned = 'MBA';
            }
            nextEducation.currentStage = 'None';
            nextEducation.currentMajor = null;
            nextEducation.fundingType = null;
            occupation = 'Unemployed';
            nextFinances.annualSalary = 0;
            nextLog.push(`Age ${nextAge}: Amazing! You completed your postgraduate track and successfully earned your ${nextEducation.highestDegreeEarned}!`);
          }
        } else {
          nextLog.push(`Age ${nextAge}: You completed another year of ${nextEducation.currentStage}. Only ${nextEducation.yearsRemaining} year(s) remaining!`);
        }
      }
    }

    // Every year the character is in school, modulate their grades stat based on a function of smarts + variance
    const isInSchool = ['Primary School', 'Middle School', 'High School', 'University', 'Graduate School'].includes(nextEducation.currentStage);
    if (isInSchool) {
      const currentGrades = nextEducation.grades || 70;
      const smartsFactor = nextStats.smarts;
      const variance = Math.floor(Math.random() * 11) - 5; // -5 to +5
      // Merge: Grades converge slightly towards smarts with some positive/negative drift
      const modulatedGrades = Math.floor(currentGrades * 0.82 + smartsFactor * 0.18 + variance);
      nextEducation.grades = clamp(modulatedGrades, 0, 100);
    }

    nextInfo.currentOccupation = occupation;

    // relationships drift and aging
    const nextRelationships = (relationships || []).map(npc => {
      if (npc.isDead) return npc;
      const nextNpcAge = npc.age + 1;
      let nextNpcDead = false;

      // drift is -3 to +3
      const drift = Math.floor(Math.random() * 7) - 3;
      const relationshipValue = clamp(npc.relationshipValue + drift);

      // death check if 85+
      if (nextNpcAge >= 85) {
        const deathProb = 0.05 + (nextNpcAge - 85) * 0.03;
        if (Math.random() < deathProb) {
          nextNpcDead = true;
          nextLog.push(`Age ${nextAge}: Your ${npc.relationshipType.toLowerCase()}, ${npc.name} (age ${nextNpcAge}), has passed away of old age.`);
          
          if (npc.relationshipType === 'Parent' && npc.money > 0) {
            const countryConfig = COUNTRY_DETAILS[nextInfo.country] || COUNTRY_DETAILS['United States'];
            const estateTax = countryConfig?.estateTaxRate ?? 0.10;
            const inheritedRaw = npc.money;
            const inheritanceTaxPaid = Math.round(inheritedRaw * estateTax);
            const inheritedNet = inheritedRaw - inheritanceTaxPaid;
            nextFinances.cashBalance += inheritedNet;
            nextLog.push(`Age ${nextAge}: [WILL & TESTAMENT] You inherited your deceased parent's estate! Inherited cash: ${formatCurrency(inheritedRaw)} leading to estate/death taxes of -${formatCurrency(inheritanceTaxPaid)} (${Math.round(estateTax * 100)}% rate). Net cash received: +${formatCurrency(inheritedNet)}.`);
          }
        }
      }

      return {
        ...npc,
        age: nextNpcAge,
        relationshipValue,
        isDead: nextNpcDead,
      };
    });

    // 2. Financial calculation logic
    const countryConfig = COUNTRY_DETAILS[nextInfo.country] || COUNTRY_DETAILS['United States'];
    const taxRate = countryConfig?.incomeTaxRate ?? 0.18;

    let earned = nextFinances.annualSalary;
    let upkeepTotal = nextAssets.reduce((sum, a) => sum + a.annualUpkeep, 0);
    let debtPaid = nextFinances.annualDebt;
    let taxes = Math.round(earned * taxRate);

    const livingChildrenUnder18 = nextRelationships.filter(n => n.relationshipType === 'Child' && !n.isDead && n.age < 18);
    const childUpkeepPerChild = 1000;
    const totalChildUpkeep = livingChildrenUnder18.length * childUpkeepPerChild;

    let netFinancialFlow = earned - upkeepTotal - debtPaid - taxes - totalChildUpkeep;
    nextFinances.cashBalance += netFinancialFlow;

    // Amortize active asset loans
    let totalAssetLoanPayments = 0;
    const finalAssetsAfterAmortization: Asset[] = [];

    for (const uAsset of nextAssets) {
      if (uAsset.isFinanced && uAsset.loanDetails) {
        const payment = uAsset.loanDetails.annualPayment;
        
        // Foreclosure check: If paying this causes cashBalance to drop below $0.
        if (nextFinances.cashBalance - payment < 0) {
          nextStats.happiness = clamp(nextStats.happiness - 30);
          nextLog.push(`Age ${nextAge}: [FORECLOSURE] The bank repossessed your ${uAsset.name} due to non-payment of your loan.`);
          // Seized by bank, so it is removed, and payment is not deducted
        } else {
          // Deduct from cash balance
          nextFinances.cashBalance -= payment;
          totalAssetLoanPayments += payment;

          const updatedYears = uAsset.loanDetails.yearsRemaining - 1;
          const updatedPrincipal = Math.max(0, uAsset.loanDetails.principalRemaining - payment);

          if (updatedYears <= 0) {
            finalAssetsAfterAmortization.push({
              ...uAsset,
              isFinanced: false,
              loanDetails: null,
            });
            nextLog.push(`Age ${nextAge}: [CONGRATULATIONS] You have fully paid off your loan for ${uAsset.name}!`);
          } else {
            finalAssetsAfterAmortization.push({
              ...uAsset,
              loanDetails: {
                principalRemaining: updatedPrincipal,
                annualPayment: payment,
                yearsRemaining: updatedYears,
              },
            });
          }
        }
      } else {
        finalAssetsAfterAmortization.push(uAsset);
      }
    }

    // Replace nextAssets contents
    nextAssets.length = 0;
    nextAssets.push(...finalAssetsAfterAmortization);

    // Generate financial logs if school is passed
    if (nextAge >= 14 && (earned > 0 || upkeepTotal > 0 || debtPaid > 0 || totalChildUpkeep > 0 || totalAssetLoanPayments > 0)) {
      let finMessage = `Age ${nextAge}: Financial Summary — `;
      if (earned > 0) finMessage += `Earned salary: ${formatCurrency(earned)} (Taxes: -${formatCurrency(taxes)}). `;
      if (upkeepTotal > 0) finMessage += `Asset Maintenance: -${formatCurrency(upkeepTotal)}. `;
      if (debtPaid > 0) finMessage += `Loan payments: -${formatCurrency(debtPaid)}. `;
      if (totalAssetLoanPayments > 0) finMessage += `Mortgage/Car loans paid: -${formatCurrency(totalAssetLoanPayments)}. `;
      if (totalChildUpkeep > 0) finMessage += `Child Upkeep (x${livingChildrenUnder18.length}): -${formatCurrency(totalChildUpkeep)}. `;
      
      const netTotal = netFinancialFlow - totalAssetLoanPayments;
      finMessage += `Net: ${netTotal >= 0 ? '+' : ''}${formatCurrency(netTotal)}`;
      nextLog.push(finMessage);
    }

    // Stress from debt or poor stats
    if (nextFinances.cashBalance < 0) {
      nextStats.happiness = clamp(nextStats.happiness - 8);
      if (nextAge % 3 === 0) {
        nextLog.push(`Age ${nextAge}: You are in deep financial debt (${formatCurrency(nextFinances.cashBalance)}). The anxiety limits your happiness.`);
      }
    }

    // Passive health deterioration or gains (including custom Elder Stat Decay for ages 60+)
    if (nextAge > 50 && nextAge < 60) {
      // Gradual natural aging health decay
      const decay = Math.floor((nextAge - 50) / 10) + 1;
      nextStats.health = clamp(nextStats.health - decay, 0, 100);
    } else if (nextAge >= 60) {
      const genBaselines = get().geneticBaselines;
      
      let healthTierValue = 1.0;
      let looksTierValue = 1.0;

      if (genBaselines) {
        if (genBaselines.healthBaseline < 40) {
          healthTierValue = 1.5;
        } else if (genBaselines.healthBaseline > 75) {
          healthTierValue = 0.5;
        }

        if (genBaselines.looksBaseline < 40) {
          looksTierValue = 1.5;
        } else if (genBaselines.looksBaseline > 75) {
          looksTierValue = 0.5;
        }
      }
      
      if (nextAge <= 75) {
        // Flat -1.5% multiplied by their genetic vulnerability tier
        const healthLoss = 1.5 * healthTierValue;
        const looksLoss = 1.5 * looksTierValue;
        nextStats.health = clamp(nextStats.health - healthLoss, 0, 100);
        nextStats.looks = clamp(nextStats.looks - looksLoss, 0, 100);
        nextLog.push(`Age ${nextAge}: Elder aging takes a toll. Health (-${Math.round(healthLoss)}%) and Looks (-${Math.round(looksLoss)}%) decayed.`);
      } else {
        // Deep geriatric decay: -3.5% compounded annually
        const oldHealth = nextStats.health;
        const oldLooks = nextStats.looks;
        nextStats.health = clamp(nextStats.health * (1.0 - 0.035), 0, 100);
        nextStats.looks = clamp(nextStats.looks * (1.0 - 0.035), 0, 100);
        const healthLoss = oldHealth - nextStats.health;
        const looksLoss = oldLooks - nextStats.looks;
        nextLog.push(`Age ${nextAge}: Deep geriatric decay compounds. Health decayed (-${Math.round(healthLoss)}%) and Looks decayed (-${Math.round(looksLoss)}%).`);
      }
    }

    // --- ADVANCED EXPANSION: ANNUAL ASSET VALUE DRIFT BY QUALITY/CONDITION ---
    nextAssets.forEach(a => {
      if (a.condition === undefined) {
        a.condition = 100;
      }
      if (a.type === 'real_estate') {
        const conditionFactor = a.condition / 100;
        const appreciationRate = (Math.random() * 0.05 + 0.01) * (0.4 + 0.6 * conditionFactor);
        a.currentValue = Math.round(a.currentValue * (1 + appreciationRate));
        a.condition = clamp(a.condition - (Math.floor(Math.random() * 3) + 1), 0, 100);
      } else if (a.type === 'vehicle') {
        const conditionFactor = a.condition / 100;
        const depreciationRate = (Math.random() * 0.07 + 0.05) * (1.8 - 0.8 * conditionFactor);
        a.currentValue = Math.round(a.currentValue * (1 - depreciationRate));
        a.condition = clamp(a.condition - (Math.floor(Math.random() * 5) + 3), 0, 100);
      }
    });

    // --- ADVANCED EXPANSION: ANNUAL PET AGING & CRAZINESS EVENTS ---
    const finalPets: Pet[] = [];
    nextPets.forEach(p => {
      p.age += 1;
      p.health = clamp(p.health + Math.floor(Math.random() * 15) - 8, 0, 100);
      p.happiness = clamp(p.happiness + Math.floor(Math.random() * 15) - 8, 0, 100);

      let lifeExpectancy = 15;
      if (['Cat', 'Exotic Cat', 'Tiger', 'Panther'].includes(p.species)) lifeExpectancy = 18;
      else if (['Llama', 'Cobras', 'Snake'].includes(p.species)) lifeExpectancy = 20;
      else if (['Horse'].includes(p.species)) lifeExpectancy = 25;
      else if (['Monkey', 'Exotic Monkey'].includes(p.species)) lifeExpectancy = 30;

      let petDies = p.health <= 0;
      if (!petDies && p.age > lifeExpectancy - 3) {
        petDies = Math.random() < 0.25 || p.age >= lifeExpectancy;
      }

      if (petDies) {
        nextLog.push(`Age ${nextAge}: [PET LOSS] Your beloved pet ${p.name} (${p.breed} ${p.species}) passed away at age ${p.age}. You are heartbroken.`);
        nextStats.happiness = clamp(nextStats.happiness - 15, 0, 100);
      } else {
        if (p.craziness > 75 && Math.random() < 0.35) {
          const actionRoll = Math.random();
          if (actionRoll < 0.33 && nextRelationships.filter(r => !r.isDead).length > 0) {
            const aliveNPCs = nextRelationships.filter(r => !r.isDead);
            const targetNPC = aliveNPCs[Math.floor(Math.random() * aliveNPCs.length)];
            targetNPC.relationshipValue = clamp(targetNPC.relationshipValue - 15, 0, 100);
            nextLog.push(`Age ${nextAge}: [PET INCIDENT] Your crazy pet ${p.name} (${p.breed} ${p.species}) has savagely bitten your ${targetNPC.relationshipType.toLowerCase()}, ${targetNPC.name}! Your domestic peace is ruined.`);
            nextStats.happiness = clamp(nextStats.happiness - 8, 0, 100);
          } else if (actionRoll < 0.66) {
            nextLog.push(`Age ${nextAge}: [PET ESCALATION] Your crazy pet ${p.name} (${p.breed}) broke free and ran away permanently! You feel terribly guilty.`);
            nextStats.happiness = clamp(nextStats.happiness - 12, 0, 100);
            return;
          } else if (nextAssets.length > 0) {
            const targetAsset = nextAssets[Math.floor(Math.random() * nextAssets.length)];
            targetAsset.condition = clamp((targetAsset.condition ?? 100) - 25, 0, 100);
            targetAsset.currentValue = Math.round(targetAsset.currentValue * 0.88);
            nextLog.push(`Age ${nextAge}: [PET VANDALISM] Your crazy pet ${p.name} completely shredded your ${targetAsset.name}! The asset's condition and market value dropped.`);
            nextStats.happiness = clamp(nextStats.happiness - 6, 0, 100);
          } else {
            nextLog.push(`Age ${nextAge}: [PET RAMPAGE] Your crazy pet ${p.name} tore around your home, destroying wallpaper and creating a huge mess.`);
            nextStats.happiness = clamp(nextStats.happiness - 5, 0, 100);
          }
        }
        finalPets.push(p);
      }
    });

    // --- STEP-BY-STEP PASSIVE STRESS LOOP ENHANCEMENT ---
    const currentOccupationStr = nextInfo.currentOccupation || 'None';
    const hasTrauma = nextDiseases.length > 0 || nextStats.happiness < 30 || nextStats.health < 30;
    
    let stressDiff = 0;
    if (nextAge <= 13) {
      if (hasTrauma) {
        stressDiff = -5; // limited natural recovery with childhood diseases/strain
        nextLog.push(`Age ${nextAge}: playground strains and childhood struggles limited your stress recovery.`);
      } else {
        stressDiff = -15; // standard child natural recovery
      }
    } else {
      // Age 14+ is adult life
      const highStressJobs = ['Brain Surgeon', 'CEO', 'Corporate CEO', 'Executive', 'Investment Banker', 'Attorney', 'Surgeon', 'Managing Director', 'Chief Executive Officer', 'President'];
      const midStressJobs = ['Manager', 'Senior Developer', 'Software Engineer', 'Physician', 'Architect'];
      
      const isHighStressJob = highStressJobs.some(job => currentOccupationStr.includes(job));
      const isMidStressJob = midStressJobs.some(job => currentOccupationStr.includes(job));
      const isUnemployed = !currentOccupationStr || currentOccupationStr === 'None' || currentOccupationStr === 'Unemployed' || currentOccupationStr === 'Student';
      
      let baseRelief = -5; // standard adult recovery
      if (isUnemployed) {
        baseRelief = -15;
      } else if (currentOccupationStr.toLowerCase().includes('part-time')) {
        baseRelief = -12;
      }
      
      let penalty = 0;
      if (isHighStressJob) {
        penalty += 15; // brain surgeon / CEO surcharge (+15% stress)
      } else if (isMidStressJob) {
        penalty += 5; // mid workload surcharge (+5% stress)
      }
      
      const mortgagesCount = nextAssets.filter(a => a.type === 'real_estate' && a.isFinanced).length;
      if (mortgagesCount > 0) {
        penalty += mortgagesCount * 4; // multiple mortgage payments compound stress
      }
      
      stressDiff = baseRelief + penalty;
      
      if (stressDiff > 0) {
        nextLog.push(`Age ${nextAge}: The demanding pressure of being a ${currentOccupationStr}${mortgagesCount > 0 ? ` while managing ${mortgagesCount} outstanding mortgages` : ''} applied a passive stress penalty (+${stressDiff}% stress).`);
      } else if (stressDiff < -5) {
        nextLog.push(`Age ${nextAge}: The low workload of your chosen path yielded peaceful, natural stress relief (${stressDiff}% stress).`);
      }
    }
    
    nextStats.stress = clamp(nextStats.stress + stressDiff, 0, 100);
    
    // Heart attack risk for critical, unmanaged stress levels >= 95%
    if (nextStats.stress >= 95 && nextAge >= 30) {
      if (Math.random() < 0.20) {
        nextStats.health = clamp(nextStats.health - 45, 0, 100);
        nextStats.happiness = clamp(nextStats.happiness - 35, 0, 100);
        nextLog.push(`Age ${nextAge}: [CRITICAL SURGE] Your body fails under persistent, unmanaged extreme stress (95%+). You suffered a massive midnight heart attack! Your health collapsed by 45%.`);
      }
    }

    // 3. Mortality Calculation
    let checkDeath = false;
    let deathReason = '';

    if (nextStats.health <= 0) {
      checkDeath = true;
      deathReason = 'Acute severe health breakdown';
    } else if (nextAge > 70) {
      // Compounding probability of mortality
      const deathProbability = (nextAge - 70) * 0.022 + (1.0 - nextStats.health / 100) * 0.1;
      if (Math.random() < deathProbability) {
        checkDeath = true;
        const oldAgeCauses = [
          'Natural causes',
          'Slipped on a wet bathroom tile',
          'Coronary arrest',
          'Sudden peaceful sleep',
          'Congestive heart disappointment'
        ];
        deathReason = oldAgeCauses[Math.floor(Math.random() * oldAgeCauses.length)];
      }
    }

    if (checkDeath || nextAge >= 115) {
      if (nextAge >= 115) deathReason = 'Extremely rare ancient age';
      nextInfo.isDead = true;
      nextInfo.deathReason = deathReason;
      nextLog.push(`Age ${nextAge}: You passed away. Cause of death: ${deathReason}.`);

      // Calculate Net Worth: Cash + Asset Value - Outstanding Loan Principals
      const assetEquity = nextAssets.reduce((sum, a) => sum + a.currentValue, 0);
      const outstandingLoans = nextAssets.reduce((sum, a) => sum + (a.isFinanced && a.loanDetails ? a.loanDetails.principalRemaining : 0), 0);
      const totalNetWorth = nextFinances.cashBalance + assetEquity - outstandingLoans;

      // Save to High Scores
      const newScore: HighScore = {
        name: `${nextInfo.firstName} ${nextInfo.lastName}`,
        age: nextAge,
        netWorth: totalNetWorth,
        occupation: nextInfo.currentOccupation,
        country: nextInfo.country,
        causeOfDeath: deathReason,
      };
      saveHighScore(newScore);

      set({
        characterInfo: nextInfo,
        stats: nextStats,
        finances: nextFinances,
        assets: nextAssets,
        relationships: nextRelationships,
        diseases: nextDiseases,
        log: nextLog,
        highScores: loadHighScores(),
        currentEvent: null,
      });
      return;
    }

    // 4. Picking random eligible life event
    const stateCopy: CharacterState = {
      characterInfo: nextInfo,
      stats: nextStats,
      finances: nextFinances,
      assets: nextAssets,
      relationships: nextRelationships,
      pets: get().pets || [],
      weapons: get().weapons || [],
      maritalStatus: get().maritalStatus,
      education: nextEducation,
      criminalRecord: nextRecord,
      prisonSentence: null,
      diseases: nextDiseases,
      log: nextLog,
      availableJobs: get().availableJobs || [],
      availablePets: get().availablePets || [],
      availableRealEstate: get().availableRealEstate || [],
      availableVehicles: get().availableVehicles || [],
    };

    const parseCategory = (evt: GameEvent) => {
      const txt = (evt.title + ' ' + evt.description + ' ' + (evt.id || '')).toLowerCase();
      if (evt.category === 'School' || txt.includes('school') || txt.includes('university') || txt.includes('class') || txt.includes('teacher') || txt.includes('grade') || txt.includes('exam')) {
        return 'School';
      }
      if (txt.includes('work') || txt.includes('boss') || txt.includes('job') || txt.includes('career') || txt.includes('office') || txt.includes('corporate') || txt.includes('employee') || txt.includes('salary') || txt.includes('co-worker') || txt.includes('manager') || txt.includes('promotion') || txt.includes('retirement') || txt.includes('resign') || txt.includes('pension')) {
        return 'Workplace';
      }
      if (txt.includes('parent') || txt.includes('sibling') || txt.includes('partner') || txt.includes('family') || txt.includes('child') || txt.includes('dating') || txt.includes('relationship') || txt.includes('friend') || txt.includes('wife') || txt.includes('husband') || txt.includes('marriage') || txt.includes('grandchild') || txt.includes('grandmother') || txt.includes('grandfather') || txt.includes('grandparent')) {
        return 'PersonalLife';
      }
      return 'Random';
    };

    const seenEventIds = [...(get().seenEventIds || [])];
    const eligibleEvents = EVENT_REGISTRY.filter(evt => evt.condition(stateCopy) && (!evt.id || !seenEventIds.includes(evt.id)));

    // Distribute into appropriate modules
    const schoolEventsPool = eligibleEvents.filter(e => parseCategory(e) === 'School');
    const workplaceEventsPool = eligibleEvents.filter(e => parseCategory(e) === 'Workplace');
    const personalEventsPool = eligibleEvents.filter(e => parseCategory(e) === 'PersonalLife');
    const randomEventsPool = eligibleEvents.filter(e => parseCategory(e) === 'Random');
    const childhoodEventsPool = eligibleEvents.filter(e => e.category === 'Childhood');

    const queuedEvents: GameEvent[] = [];
    const queueAndMarkSeen = (evt: GameEvent) => {
      queuedEvents.push(evt);
      if (evt.id && !seenEventIds.includes(evt.id)) {
        seenEventIds.push(evt.id);
      }
    };

    const shuffleArray = <T>(arr: T[]): T[] => {
      return [...arr].sort(() => Math.random() - 0.5);
    };

    // Helper to generate a generic sensory childhood event if we run short
    const makeToddlerEvent = (age: number, prefix: string): GameEvent => {
      const parentName = nextRelationships.find(n => n.relationshipType === 'Parent')?.name || 'Your mother';
      return {
        id: `toddler_gen_${age}_${prefix}_${Math.random()}`,
        title: `Baby Development: Sensory Stage 🍼 (${prefix})`,
        description: `At age ${age}, your baby brain processes new colors and acoustic sounds. ${parentName} holds up a dynamic, vibrating squeaky ball.`,
        category: 'Childhood',
        condition: () => true,
        choices: [
          {
            choiceText: 'Grab it and chew happily to test the rubber texture.',
            outcomeText: 'You chew the squeaky ball. Your gums feel highly relieved and you smile with newborn joy.',
            effect: (state) => {
              adjustStats(state, { happiness: 15, health: 5 });
              state.log.push(`Age ${state.characterInfo.age}: You happily chewed a squeaky rubber ball.`);
            }
          },
          {
            choiceText: 'Kick it away with baby strength and focus on crawling on the carpet.',
            outcomeText: 'You throw your legs out, launching the ball across the floor! You enjoy watching the trajectory.',
            effect: (state) => {
              adjustStats(state, { happiness: 10, stress: -5 });
              state.log.push(`Age ${state.characterInfo.age}: You threw a sensory toy to explore newborn gravity physics.`);
            }
          },
          {
            choiceText: 'Look intensely at the primary colors to figure out how it works.',
            outcomeText: 'You focus your vision on the bright neon shapes, speeding up hand-eye coordination.',
            effect: (state) => {
              adjustStats(state, { smarts: 15, stress: 5 });
              state.log.push(`Age ${state.characterInfo.age}: You deeply studied the primary colors of a toy, sparking neural connections.`);
            }
          },
          {
            choiceText: 'Drift into a sweet, peaceful baby nap right on the spot.',
            outcomeText: 'You slow your breathing, close your heavy eyes, and take a warm baby nap.',
            effect: (state) => {
              adjustStats(state, { health: 15, happiness: 10, stress: -15 });
              state.log.push(`Age ${state.characterInfo.age}: You drifted into a deep infant nap.`);
            }
          }
        ]
      };
    };

    // Helper to generate simple fallback event for teens/adults if we run short on pool
    const makeFallbackEvent = (age: number): GameEvent => {
      const adjective = ['unexpected', 'interesting', 'routine', 'surprising', 'casual'][Math.floor(Math.random() * 5)];
      const focus = ['perspective', 'routine', 'environment', 'interaction', 'growth'][Math.floor(Math.random() * 5)];
      return {
        id: `gen_fallback_${age}_${Math.random()}`,
        title: `Life Reflection: Day by Day 🌅`,
        description: `At age ${age}, you encounter an ${adjective} turn of events that causes you to reflect on your daily ${focus}.`,
        category: age < 18 ? 'School' : 'Adulthood',
        condition: () => true,
        choices: [
          {
            choiceText: "Take a moment to collect your thoughts and move forward.",
            outcomeText: "You take a deep breath, ground yourself, and step into the next chapter of your life.",
            effect: (state) => {
              adjustStats(state, { happiness: 10, stress: -10 });
              state.log.push(`Age ${state.characterInfo.age}: You paused to gather your mental focus.`);
            }
          },
          {
            choiceText: "Invest extra energy into busy physical and social activities.",
            outcomeText: "You spend your days staying highly active, leaving little room for worry or regret.",
            effect: (state) => {
              adjustStats(state, { health: 10, looks: 5, happiness: 5 });
              state.log.push(`Age ${state.characterInfo.age}: You kept exceptionally active to boost your lifestyle.`);
            }
          },
          {
            choiceText: "Focus deeply on quiet readings and self-improvement books.",
            outcomeText: "You spend silent evenings exploring literature, sharpening your mind.",
            effect: (state) => {
              adjustStats(state, { smarts: 15, stress: 5 });
              state.log.push(`Age ${state.characterInfo.age}: You spent extra time focused on academic and intellectual growth.`);
            }
          }
        ]
      };
    };

    let targetCount = 1;
    if (nextAge < 16) {
      targetCount = Math.floor(Math.random() * 2) + 1; // 1 to 2
    } else {
      targetCount = Math.floor(Math.random() * 3) + 4; // 4 to 6
    }

    const currentTurnIds = new Set<string>();

    const tryAddFromPool = (pool: GameEvent[]) => {
      for (const evt of pool) {
        if (queuedEvents.length >= targetCount) break;
        if (evt.id && (seenEventIds.includes(evt.id) || currentTurnIds.has(evt.id))) continue;
        queueAndMarkSeen(evt);
        if (evt.id) currentTurnIds.add(evt.id);
        break; // Only pick one per category round to keep variety high
      }
    };

    if (nextAge <= 5) {
      // Toddler stage loop
      let poolChildhood = shuffleArray(childhoodEventsPool);
      while (queuedEvents.length < targetCount) {
        const remainingChildhood = poolChildhood.filter(e => !e.id || (!seenEventIds.includes(e.id) && !currentTurnIds.has(e.id)));
        if (remainingChildhood.length > 0) {
          const evt = remainingChildhood[0];
          queueAndMarkSeen(evt);
          if (evt.id) currentTurnIds.add(evt.id);
        } else {
          const fallback = makeToddlerEvent(nextAge, queuedEvents.length === 0 ? 'Sensory' : 'Curiosity');
          queueAndMarkSeen(fallback);
          if (fallback.id) currentTurnIds.add(fallback.id);
        }
      }
    } else {
      // Refined round-robin picking to ensure highly diverse category mix
      let poolSchool = shuffleArray(schoolEventsPool);
      let poolWorkplace = shuffleArray(workplaceEventsPool);
      let poolPersonal = shuffleArray(personalEventsPool);
      let poolRandom = shuffleArray(randomEventsPool);

      // 1. Personal Round
      tryAddFromPool(poolPersonal);

      // 2. School Round if enrolled
      const enrolledStages = ['Primary School', 'Middle School', 'High School', 'University', 'Graduate School'];
      const enrolled = nextEducation && enrolledStages.includes(nextEducation.currentStage);
      if (enrolled) {
        tryAddFromPool(poolSchool);
      }

      // 3. Workplace Round if employed
      const occupation = nextInfo.currentOccupation;
      const employed = occupation && !['None', 'Retired', 'Primary School Student', 'Middle School Student', 'High School Student', 'University Student', 'Graduate Student'].includes(occupation);
      if (employed) {
        tryAddFromPool(poolWorkplace);
      }

      // 4. Random Round
      tryAddFromPool(poolRandom);

      // 5. Backfill from remaining general pool of any category to meet the target count exactly (like 4-6 cards for 16+)
      let allRemaining = eligibleEvents.filter(evt => !evt.id || (!seenEventIds.includes(evt.id) && !currentTurnIds.has(evt.id)));
      allRemaining = shuffleArray(allRemaining);

      for (const evt of allRemaining) {
        if (queuedEvents.length >= targetCount) break;
        queueAndMarkSeen(evt);
        if (evt.id) currentTurnIds.add(evt.id);
      }

      // 6. If we still don't have enough events due to high registry fatigue, generate fallback cards
      while (queuedEvents.length < targetCount) {
        const fallback = makeFallbackEvent(nextAge);
        queueAndMarkSeen(fallback);
        if (fallback.id) currentTurnIds.add(fallback.id);
      }
    }

    // Force strict length boundary on queued events to exactly targetCount
    if (queuedEvents.length > targetCount) {
      queuedEvents.length = targetCount;
    }

    // Format all queued events with NPCs and ensure 3-4 choices are strictly validated
    let finalQueued = queuedEvents.map(evt => {
      const formatted = formatEventWithRelationships(evt, nextRelationships, nextAge);
      return validateEventChoices(formatted);
    });

    if (childhoodInterventionEvent) {
      const formattedChildhood = formatEventWithRelationships(childhoodInterventionEvent, nextRelationships, nextAge);
      finalQueued.unshift(validateEventChoices(formattedChildhood));
    }

    // Overriding / Prepending addiction craves scenario (40% probability)
    const activeAddictionDiseases = nextDiseases.filter(d => d.type === 'Addiction');
    if (activeAddictionDiseases.length > 0 && Math.random() < 0.40) {
      const addictionName = activeAddictionDiseases[0].name;
      const addictionEvent: GameEvent = {
        id: `addiction-craving-${addictionName.toLowerCase().replace(/\s+/g, '-')}-${Math.random()}`,
        title: `Addiction Craving: ${addictionName} 🧬`,
        description: `Your active ${addictionName} is causing you powerful, visceral cravings. How will you respond and cope?`,
        category: 'Special',
        condition: () => true,
        choices: [
          {
            choiceText: `Feed the addiction (Costs -$1,500, +15% Happiness, -5% Health).`,
            outcomeText: `You gave in to your intense cravings. It cost you $1,500, but the temporary relief is massive.`,
            effect: (state) => {
              state.finances.cashBalance = Math.max(state.finances.cashBalance - 1500, -500000);
              adjustStats(state, { happiness: 15, health: -5 });
              state.log.push(`Age ${state.characterInfo.age}: You fed your ${addictionName} craving (-$1,500, +15 Happiness, -5 Health).`);
            }
          },
          {
            choiceText: `Resist the urge (Extreme struggle, -30% Happiness, +5% Health).`,
            outcomeText: `You power through with sheer willpower. You feel absolutely miserable, but your health is better.`,
            effect: (state) => {
              adjustStats(state, { happiness: -30, health: 5 });
              state.log.push(`Age ${state.characterInfo.age}: You resisted feeding your ${addictionName} with intense discipline.`);
            }
          },
          {
            choiceText: 'Check into a local support and mental mindfulness group instead.',
            outcomeText: 'You spent the evening learning support strategies with peers. Your mind feels centered.',
            effect: (state) => {
              adjustStats(state, { happiness: 10, stress: -15, smarts: 5 });
              state.log.push(`Age ${state.characterInfo.age}: You checked into group therapy circles to handle ${addictionName}.`);
            }
          },
          {
            choiceText: 'Focus on heavy cardio exercise until your legs collapse.',
            outcomeText: 'You ran until your lungs were burning. The exhaustive high completely drowned out the cravings!',
            effect: (state) => {
              adjustStats(state, { health: 8, happiness: 5, stress: -10 });
              state.log.push(`Age ${state.characterInfo.age}: You did hard physical workouts to override ${addictionName} urges.`);
            }
          }
        ]
      };
      finalQueued.unshift(validateEventChoices(addictionEvent));
    }

    let current = null;
    const finalQueueToStore = [...finalQueued];
    const nextSeenEventIds = [...seenEventIds];
    if (childhoodInterventionEvent && childhoodInterventionEvent.id && !nextSeenEventIds.includes(childhoodInterventionEvent.id)) {
      nextSeenEventIds.push(childhoodInterventionEvent.id);
    }
    if (finalQueueToStore.length > 0) {
      current = finalQueueToStore.shift()!;
      if (current.id && !nextSeenEventIds.includes(current.id)) {
        nextSeenEventIds.push(current.id);
      }
    }

    const yearlyJobs = nextAge >= 16 ? generateJobListings(nextEducation) : [];
    const yearlyPets = nextAge >= 15 ? generatePetListings() : [];
    const yearlyRealEstate = nextAge >= 18 ? generateRealEstateListings(nextFinances.cashBalance, nextFinances.annualSalary) : [];
    const yearlyVehicles = nextAge >= 18 ? generateVehicleListings(nextFinances.cashBalance, nextFinances.annualSalary) : [];

    set({
      characterInfo: nextInfo,
      stats: nextStats,
      finances: nextFinances,
      assets: nextAssets,
      relationships: nextRelationships,
      pets: finalPets,
      weapons: nextWeapons,
      datingProspects: [],
      education: nextEducation,
      diseases: nextDiseases,
      log: nextLog,
      currentEvent: current,
      activeEventQueue: finalQueueToStore,
      lastChoiceOutcome: null,
      annualActionsPerformed: [],
      seenEventIds: nextSeenEventIds,
      consistencyStreaks: nextStreaks,
      availableJobs: yearlyJobs,
      availablePets: yearlyPets,
      availableRealEstate: yearlyRealEstate,
      availableVehicles: yearlyVehicles,
    });
  },

  executeChoice: (eventId: string, choiceIndex: number) => {
    const { characterInfo, stats, finances, assets, relationships, pets = [], weapons = [], log, currentEvent, education, diseases = [] } = get();
    if (!characterInfo || !currentEvent || currentEvent.id !== eventId) return;

    const choice = currentEvent.choices[choiceIndex];
    if (!choice) return;

    const originalStats = { ...stats! };

    // Clone current state variables safely for mutation in the effect
    const draftInfo = { ...characterInfo };
    const draftStats = { ...stats! };
    const draftFinances = { ...finances! };
    const draftAssets = [...assets];
    const draftRelationships = [...relationships];
    const draftPets = pets.map(p => ({ ...p }));
    const draftWeapons = weapons.map(w => ({ ...w }));
    const draftLog = [...log];
    const draftEducation: Education = education ? { ...education } : {
      currentStage: 'None',
      currentMajor: null,
      highestDegreeEarned: 'None',
      grades: 0,
    };

    const draftState: CharacterState = {
      characterInfo: draftInfo,
      stats: draftStats,
      finances: draftFinances,
      assets: draftAssets,
      relationships: draftRelationships,
      maritalStatus: get().maritalStatus,
      education: draftEducation,
      criminalRecord: get().criminalRecord || [],
      prisonSentence: get().prisonSentence || null,
      diseases: [...diseases],
      log: draftLog,
      pets: draftPets,
      weapons: draftWeapons,
      availableJobs: get().availableJobs || [],
      availablePets: get().availablePets || [],
      availableRealEstate: get().availableRealEstate || [],
      availableVehicles: get().availableVehicles || [],
    };

    // Run the deterministic/weighted effect outcome
    choice.effect(draftState);

    // Apply strict bounds to stats
    draftState.stats.happiness = clamp(draftState.stats.happiness);
    draftState.stats.health = clamp(draftState.stats.health);
    draftState.stats.smarts = clamp(draftState.stats.smarts);
    draftState.stats.looks = clamp(draftState.stats.looks);
    draftState.stats.karma = clamp(draftState.stats.karma);
    draftState.stats.stress = clamp(draftState.stats.stress);

    const checkStats = draftState.stats;
    const statDeltas = {
      happiness: checkStats.happiness - originalStats.happiness,
      health: checkStats.health - originalStats.health,
      smarts: checkStats.smarts - originalStats.smarts,
      looks: checkStats.looks - originalStats.looks,
      karma: checkStats.karma - originalStats.karma,
      stress: checkStats.stress - originalStats.stress,
    };

    // Check if the effect caused immediate death
    let finalInfo = { ...draftState.characterInfo };
    if (draftState.stats.health <= 0 && !finalInfo.isDead) {
      finalInfo.isDead = true;
      finalInfo.deathReason = 'Sudden shock and health failure';
      draftState.log.push(`Age ${finalInfo.age}: You suffered severe systemic shock and passed away.`);
      
      const assetEquity = draftState.assets.reduce((sum, a) => sum + a.currentValue, 0);
      const outstandingLoans = draftState.assets.reduce((sum, a) => sum + (a.isFinanced && a.loanDetails ? a.loanDetails.principalRemaining : 0), 0);
      const totalNetWorth = draftState.finances.cashBalance + assetEquity - outstandingLoans;
      
      saveHighScore({
        name: `${finalInfo.firstName} ${finalInfo.lastName}`,
        age: finalInfo.age,
        netWorth: totalNetWorth,
        occupation: finalInfo.currentOccupation,
        country: finalInfo.country,
        causeOfDeath: finalInfo.deathReason ?? 'Sudden shock and health failure',
      });
    }

    set({
      characterInfo: finalInfo,
      stats: draftState.stats,
      finances: draftState.finances,
      assets: draftState.assets,
      relationships: draftState.relationships,
      pets: draftState.pets || [],
      weapons: draftState.weapons || [],
      education: draftState.education,
      diseases: draftState.diseases || [],
      log: draftState.log,
      currentEvent: null,
      highScores: loadHighScores(),
      lastChoiceOutcome: {
        eventTitle: currentEvent.title,
        choiceText: choice.choiceText,
        outcomeText: choice.outcomeText,
        statDeltas,
      },
    });
  },

  clearLastChoiceOutcome: () => {
    const { activeEventQueue, characterInfo } = get();
    if (characterInfo?.isDead) {
      set({
        lastChoiceOutcome: null,
        currentEvent: null,
        activeEventQueue: []
      });
      return;
    }

    if (activeEventQueue && activeEventQueue.length > 0) {
      const nextQueue = [...activeEventQueue];
      const nextEvent = nextQueue.shift()!;
      const nextSeenEventIds = [...(get().seenEventIds || [])];
      if (nextEvent.id) {
        nextSeenEventIds.push(nextEvent.id);
      }
      set({
        lastChoiceOutcome: null,
        currentEvent: nextEvent,
        activeEventQueue: nextQueue,
        seenEventIds: nextSeenEventIds,
      });
    } else {
      set({
        lastChoiceOutcome: null,
        currentEvent: null,
        activeEventQueue: []
      });
    }
  },

  buyAsset: (asset: Asset, purchaseMethod: 'cash' | 'finance' = 'cash') => {
    const { finances, assets, log, characterInfo } = get();
    if (!finances || !characterInfo || characterInfo.isDead) {
      return { success: false, msg: 'No active character' };
    }

    if (purchaseMethod === 'finance') {
      const term = asset.type === 'real_estate' ? 20 : 10;
      const annualPayment = asset.purchasePrice / term;

      // Approval check
      const maxAllowedPayment = finances.annualSalary * 0.40;
      if (annualPayment > maxAllowedPayment) {
        return { success: false, msg: 'The bank refused your mortgage application' };
      }

      // Cash balance check for 10% down payment
      const downPayment = asset.purchasePrice * 0.10;
      if (finances.cashBalance < downPayment) {
        return { success: false, msg: `The bank approved your loan, but you don't have enough cash for the 10% down payment (${formatCurrency(downPayment)}).` };
      }

      const newAsset: Asset = {
        ...asset,
        isFinanced: true,
        loanDetails: {
          principalRemaining: asset.purchasePrice - downPayment,
          annualPayment: annualPayment,
          yearsRemaining: term,
        },
      };

      set({
        finances: {
          ...finances,
          cashBalance: finances.cashBalance - downPayment,
        },
        assets: [...assets, newAsset],
        log: [...log, `Age ${characterInfo.age}: You purchased a ${asset.name} with a ${term}-year loan (Down Payment: ${formatCurrency(downPayment)}, Annual Payment: ${formatCurrency(annualPayment)}).`],
        availableRealEstate: (get().availableRealEstate || []).filter(p => p.name !== asset.name),
        availableVehicles: (get().availableVehicles || []).filter(v => v.name !== asset.name)
      });

      return { success: true, msg: `Successfully purchased ${asset.name} with a loan!` };
    } else {
      // Cash purchase
      if (finances.cashBalance < asset.purchasePrice) {
        return { success: false, msg: `Insufficient cash! You need ${formatCurrency(asset.purchasePrice)}.` };
      }

      const newAsset: Asset = {
        ...asset,
        isFinanced: false,
        loanDetails: null,
      };

      set({
        finances: {
          ...finances,
          cashBalance: finances.cashBalance - asset.purchasePrice,
        },
        assets: [...assets, newAsset],
        log: [...log, `Age ${characterInfo.age}: You purchased a ${asset.name} for cash: ${formatCurrency(asset.purchasePrice)}.`],
        availableRealEstate: (get().availableRealEstate || []).filter(p => p.name !== asset.name),
        availableVehicles: (get().availableVehicles || []).filter(v => v.name !== asset.name)
      });

      return { success: true, msg: `Successfully purchased ${asset.name} for cash!` };
    }
  },

  sellAsset: (assetId: string) => {
    const { finances, assets, log, characterInfo } = get();
    if (!finances || !characterInfo || characterInfo.isDead) return;

    const asset = assets.find(a => a.id === assetId);
    if (!asset) return;

    const principalRemaining = asset.isFinanced && asset.loanDetails ? asset.loanDetails.principalRemaining : 0;
    const netProceeds = asset.currentValue - principalRemaining;

    set({
      finances: {
        ...finances,
        cashBalance: finances.cashBalance + netProceeds,
      },
      assets: assets.filter(a => a.id !== assetId),
      log: [...log, `Age ${characterInfo.age}: You sold your ${asset.name} for a net of ${formatCurrency(netProceeds)} (Value: ${formatCurrency(asset.currentValue)}${asset.isFinanced ? `, Paid off loan: ${formatCurrency(principalRemaining)}` : ''}).`],
    });
  },

  applyForJob: (title: string, salary: number) => {
    const { finances, characterInfo, log, education } = get();
    if (!finances || !characterInfo || characterInfo.isDead) return;

    // Validate educational prerequisites
    const occ = OCCUPATIONS.find(o => o.title === title);
    if (occ && occ.requiredDegree && occ.requiredDegree !== 'None') {
      const highestEarned = education?.highestDegreeEarned || 'None';
      const degreesRank = ['None', 'High School Diploma', 'Undergraduate Degree', 'Law Degree', 'Medical Degree', 'MBA'];
      const earnedRankIdx = degreesRank.indexOf(highestEarned);
      const reqRankIdx = degreesRank.indexOf(occ.requiredDegree);

      // Higher or equal degrees satisfy baseline degree requirements
      const meetsDegreeLevel = (occ.requiredDegree === 'Undergraduate Degree' && ['Undergraduate Degree', 'Law Degree', 'Medical Degree', 'MBA'].includes(highestEarned)) ||
        (reqRankIdx <= earnedRankIdx);

      if (!meetsDegreeLevel) {
        return; // safeguard block
      }
    }

    set({
      characterInfo: {
        ...characterInfo,
        currentOccupation: title,
      },
      finances: {
        ...finances,
        annualSalary: salary,
      },
      log: [...log, `Age ${characterInfo.age}: You were hired as a ${title}, earning an annual salary of ${formatCurrency(salary)}!`],
      availableJobs: (get().availableJobs || []).filter(j => j.title !== title),
    });
  },

  resignJob: () => {
    const { finances, characterInfo, log } = get();
    if (!finances || !characterInfo || characterInfo.isDead) return;

    const previousOccupation = characterInfo.currentOccupation;

    set({
      characterInfo: {
        ...characterInfo,
        currentOccupation: 'Unemployed',
      },
      finances: {
        ...finances,
        annualSalary: 0,
      },
      log: [...log, `Age ${characterInfo.age}: You resigned from your job as a ${previousOccupation}. You are now unemployed.`],
    });
  },

  playLottery: () => {
    const { finances, characterInfo, log, stats } = get();
    if (!finances || !characterInfo || characterInfo.isDead || finances.cashBalance < 5) return;

    const cost = 5;
    const wins = Math.random() < 0.01; // 1% chance
    const prize = 150000;

    let nextCash = finances.cashBalance - cost;
    let nextHappiness = stats!.happiness;
    const nextLog = [...log];

    if (wins) {
      nextCash += prize;
      nextHappiness = clamp(nextHappiness + 50);
      nextLog.push(`Age ${characterInfo.age}: LUCK STRIKES! You won a sweepstake lotto prize of ${formatCurrency(prize)}!`);
    } else {
      nextHappiness = clamp(nextHappiness - 2);
      nextLog.push(`Age ${characterInfo.age}: You bought a raw lotto slip for ${formatCurrency(cost)} but did not win anything.`);
    }

    set({
      finances: {
        ...finances,
        cashBalance: nextCash,
      },
      stats: {
        ...stats!,
        happiness: nextHappiness,
      },
      log: nextLog,
    });
  },

  visitCasino: (wager: number) => {
    const { finances, characterInfo, log, stats, diseases = [] } = get();
    if (!finances || !characterInfo || characterInfo.isDead || finances.cashBalance < wager) {
      return { won: false, amount: 0, msg: 'Invalid transaction' };
    }

    const won = Math.random() > 0.52; // Slightly house favor
    const payout = wager;
    const nextLog = [...log];
    const nextDiseases = [...diseases];

    let nextCash = finances.cashBalance;
    let nextHappiness = stats!.happiness;
    let msg = '';

    if (won) {
      nextCash += payout;
      nextHappiness = clamp(nextHappiness + 15);
      msg = `You beat the dealer! You won ${formatCurrency(payout)}!`;
      nextLog.push(`Age ${characterInfo.age}: Casino win! You wagered ${formatCurrency(wager)} on Blackjack and won.`);
    } else {
      nextCash -= wager;
      nextHappiness = clamp(nextHappiness - 15);
      msg = `The house wins. You lost your ${formatCurrency(wager)} wager.`;
      nextLog.push(`Age ${characterInfo.age}: Casino loss. You wagered ${formatCurrency(wager)} on Blackjack and lost.`);
    }

    const possessesGamblingAddic = nextDiseases.some(d => d.name === 'Gambling Addiction');
    if (!possessesGamblingAddic && Math.random() < 0.15) {
      nextDiseases.push({
        id: `disease-addiction-gambling-${Math.random()}`,
        name: 'Gambling Addiction',
        type: 'Addiction',
        healthDrainPerYear: 5,
        happinessDrainPerYear: 10,
        cureDifficulty: 'Hard',
      });
      nextLog.push(`Age ${characterInfo.age}: [ADDICTIONS] Due to your recurring casino visits, you have developed a Gambling Addiction!`);
    }

    set({
      finances: {
        ...finances,
        cashBalance: nextCash,
      },
      stats: {
        ...stats!,
        happiness: nextHappiness,
      },
      diseases: nextDiseases,
      log: nextLog,
    });

    return { won, amount: payout, msg };
  },

  adoptPet: (source: 'shelter' | 'breeder' | 'exotic', species: string, breed: string, cost: number, craziness?: number, arrestProbability?: number, listingId?: string) => {
    const { finances, characterInfo, pets = [], log, stats } = get();
    if (!finances || !characterInfo || characterInfo.isDead) {
      return { success: false, msg: 'Character must be alive' };
    }
    if (finances.cashBalance < cost) {
      return { success: false, msg: `You don't have enough cash. Cost: ${formatCurrency(cost)}` };
    }

    // Parent permission / age lock requirement: age < 15 check for breed or exotic
    if (source !== 'shelter' && characterInfo.age < 15) {
      return { success: false, msg: 'Certified breeders and exotic animal purchases require an age of 15+.' };
    }

    // Arrest Probability Vector for exotic smuggler purchases
    if (source === 'exotic' && arrestProbability && Math.random() < arrestProbability) {
      const nextLog = [...log];
      nextLog.push(`Age ${characterInfo.age}: [CUSTOMS ARREST] Wardens and border officers intercepted your package containing the illegal smuggled ${breed}!`);
      const nextRecord = [...(get().criminalRecord || [])];
      nextRecord.push(`Exotic Wildlife Smuggling (${breed})`);
      const trial: any = {
        crimeType: 'grand_theft_auto',
        charges: `Smuggling Protected Endangered ${breed} (${species})`,
        sentenceOffer: 2 + Math.floor(Math.random() * 5) // 2 to 6 years
      };
      set({
        log: nextLog,
        criminalRecord: nextRecord,
        courtTrial: trial,
        availablePets: (get().availablePets || []).filter(p => p.id !== listingId)
      });
      return { success: false, msg: `BUSTED! Customs police intercepted your exotic smuggling ring and arrested you for high-grade wildlife trafficking!` };
    }

    const petNames = ['Buddy', 'Luna', 'Max', 'Bella', 'Charlie', 'Molly', 'Rocky', 'Coco', 'Daisy', 'Bailey', 'Oliver', 'Simba', 'Milo', 'Nala', 'Leo', 'Ginger', 'Shadow', 'Lucky', 'Cookie', 'Rusty', 'Fiona', 'Ziggy', 'Waffles', 'Peanut', 'Khan', 'Rajah', 'Baloo', 'Kong', 'Caesar', 'Bagheera', 'Striker'];
    const petName = petNames[Math.floor(Math.random() * petNames.length)];
    const finalCraziness = craziness !== undefined ? craziness : Math.floor(Math.random() * 101);
    
    const newPet: Pet = {
      id: `pet-${Math.random()}`,
      name: petName,
      species,
      breed,
      closeness: Math.floor(Math.random() * 30) + 50,
      health: Math.floor(Math.random() * 31) + 65,
      happiness: Math.floor(Math.random() * 31) + 65,
      craziness: finalCraziness,
      age: source === 'exotic' ? 1 + Math.floor(Math.random() * 3) : 0
    };

    const nextLog = [...log];
    if (source === 'exotic') {
      nextLog.push(`Age ${characterInfo.age}: [BLACK MARKET] You illegally smuggled a wild ${breed} (${species}) for ${formatCurrency(cost)}.`);
    } else {
      nextLog.push(`Age ${characterInfo.age}: You adopted ${newPet.name} the ${breed} (${species}) from standard ${source === 'shelter' ? 'shelter' : 'premium breeders'} for ${formatCurrency(cost)}.`);
    }
    
    set({
      finances: {
        ...finances,
        cashBalance: finances.cashBalance - cost,
      },
      pets: [...pets, newPet],
      log: nextLog,
      stats: {
        ...stats!,
        happiness: clamp(stats!.happiness + 10, 0, 100),
      },
      availablePets: (get().availablePets || []).filter(p => p.id !== listingId)
    });

    return { success: true, msg: source === 'exotic' ? `Successfully smuggled: ${newPet.name} the wild ${breed} is now your secret backyard pet!` : `Congratulations! You adopted ${newPet.name} the ${breed}!` };
  },

  interactWithPet: (petId: string, action: 'quality_time' | 'treat' | 'vet' | 'train') => {
    const { pets = [], finances, stats, log, characterInfo } = get();
    if (!characterInfo || characterInfo.isDead) return;

    const petIndex = pets.findIndex(p => p.id === petId);
    if (petIndex === -1) return;

    const pet = pets[petIndex];
    const nextPets = [...pets];
    const nextLog = [...log];
    const nextFinances = { ...finances! };
    const nextStats = { ...stats! };

    if (action === 'quality_time') {
      pet.happiness = clamp(pet.happiness + Math.floor(Math.random() * 11) + 10, 0, 100);
      pet.closeness = clamp(pet.closeness + Math.floor(Math.random() * 6) + 10, 0, 100);
      nextStats.happiness = clamp(nextStats.happiness + 5, 0, 100);
      nextLog.push(`Age ${characterInfo.age}: You spent quality time playing with ${pet.name}. They loved it!`);
    } else if (action === 'treat') {
      if (nextFinances.cashBalance < 20) return;
      nextFinances.cashBalance -= 20;
      pet.happiness = clamp(pet.happiness + Math.floor(Math.random() * 11) + 15, 0, 100);
      pet.closeness = clamp(pet.closeness + Math.floor(Math.random() * 7) + 12, 0, 100);
      pet.health = clamp(pet.health + 5, 0, 100);
      nextStats.happiness = clamp(nextStats.happiness + 6, 0, 100);
      nextLog.push(`Age ${characterInfo.age}: You gave ${pet.name} a delicious premium pet treat (-$20).`);
    } else if (action === 'vet') {
      if (nextFinances.cashBalance < 250) return;
      nextFinances.cashBalance -= 250;
      pet.health = clamp(pet.health + Math.floor(Math.random() * 21) + 25, 0, 100);
      pet.happiness = clamp(pet.happiness + Math.floor(Math.random() * 6) + 5, 0, 100);
      nextLog.push(`Age ${characterInfo.age}: You took ${pet.name} to the veterinary clinic for a full medical check-up (-$250).`);
    } else if (action === 'train') {
      pet.craziness = clamp(pet.craziness - (Math.floor(Math.random() * 16) + 10), 0, 100);
      pet.closeness = clamp(pet.closeness + 5, 0, 100);
      nextLog.push(`Age ${characterInfo.age}: You disciplined and trained ${pet.name}. Craziness level reduced!`);
    }

    nextPets[petIndex] = { ...pet };

    set({
      pets: nextPets,
      finances: nextFinances,
      stats: nextStats,
      log: nextLog,
    });
  },

  buyWeapon: (weapon: Weapon, cost: number) => {
    const { finances, characterInfo, weapons = [], log } = get();
    if (!finances || !characterInfo || characterInfo.isDead) {
      return { success: false, msg: 'Character must be alive' };
    }
    if (finances.cashBalance < cost) {
      return { success: false, msg: `You don't have enough cash to purchase this weapon (costs ${formatCurrency(cost)}).` };
    }
    const nextLog = [...log];
    nextLog.push(`Age ${characterInfo.age}: [BLACK MARKET] You secretly purchased a ${weapon.name} for ${formatCurrency(cost)}.`);
    
    set({
      finances: {
        ...finances,
        cashBalance: finances.cashBalance - cost,
      },
      weapons: [...weapons, weapon],
      log: nextLog
    });
    return { success: true, msg: `You successfully bought the ${weapon.name}!` };
  },

  discardWeapon: (weaponId: string) => {
    const { weapons = [], log, characterInfo } = get();
    if (!characterInfo) return;
    const wp = weapons.find(w => w.id === weaponId);
    if (!wp) return;
    const nextLog = [...log];
    nextLog.push(`Age ${characterInfo.age}: You threw away your ${wp.name} to discard the incriminating evidence.`);
    set({
      weapons: weapons.filter(w => w.id !== weaponId),
      log: nextLog
    });
  },

  buyFromStreetChemist: (substanceName: string, cost: number) => {
    const { finances, characterInfo, stats, diseases = [], log } = get();
    if (!finances || !characterInfo || characterInfo.isDead) {
      return { success: false, msg: 'Character must be alive' };
    }
    if (finances.cashBalance < cost) {
      return { success: false, msg: 'You do not have enough cash to purchase this substance.' };
    }
    const nextLog = [...log];
    const nextDiseases = [...diseases];
    const nextFinances = { ...finances, cashBalance: finances.cashBalance - cost };
    const nextStats = { ...stats! };

    nextStats.happiness = clamp(nextStats.happiness + 20, 0, 100);
    nextStats.health = clamp(nextStats.health - 10, 0, 100);
    nextStats.smarts = clamp(nextStats.smarts - 5, 0, 100);

    nextLog.push(`Age ${characterInfo.age}: [BLACK MARKET] You purchased and consumed ${substanceName} from a shady street chemist for ${formatCurrency(cost)}.`);

    let addictionMsg = '';
    const addictionRoll = Math.random() < 0.35;
    const hasAddiction = nextDiseases.some(d => d.name === 'Substance Addiction');
    if (addictionRoll && !hasAddiction) {
      const newD: Disease = {
        id: `disease-addiction-${Math.random()}`,
        name: 'Substance Addiction',
        type: 'Addiction',
        healthDrainPerYear: 15,
        happinessDrainPerYear: 15,
        cureDifficulty: 'Hard',
      };
      nextDiseases.push(newD);
      nextLog.push(`Age ${characterInfo.age}: [ADDICTIONS] WARNING! You have developed a serious Substance Addiction from consuming ${substanceName}! This will cause major yearly health and happiness drains!`);
      addictionMsg = ' You instantly developed a Substance Addiction!';
    }

    set({
      finances: nextFinances,
      stats: nextStats,
      diseases: nextDiseases,
      log: nextLog
    });

    return { success: true, msg: `You consumed ${substanceName}, experiencing a massive euphoric rush but leaving you feeling physically toxic.${addictionMsg}` };
  },

  buyExoticPet: (species: string, breed: string, cost: number) => {
    const { finances, characterInfo, pets = [], log, stats } = get();
    if (!finances || !characterInfo || characterInfo.isDead) {
      return { success: false, msg: 'Character must be alive' };
    }
    if (finances.cashBalance < cost) {
      return { success: false, msg: `You don't have enough cash to smuggle this exotic pet. Cost: ${formatCurrency(cost)}` };
    }
    const petNames = ['Khan', 'Rajah', 'Baloo', 'Kong', 'Caesar', 'Bagheera', 'Striker', 'Bella', 'Duke', 'Fang', 'Ghost', 'Rocky'];
    const petName = petNames[Math.floor(Math.random() * petNames.length)];
    const newPet: Pet = {
      id: `pet-exotic-${Math.random()}`,
      name: petName,
      species,
      breed,
      closeness: Math.floor(Math.random() * 20) + 30,
      health: Math.floor(Math.random() * 30) + 70,
      happiness: Math.floor(Math.random() * 20) + 40,
      craziness: Math.floor(Math.random() * 41) + 60,
      age: 1 + Math.floor(Math.random() * 3)
    };
    const nextLog = [...log];
    nextLog.push(`Age ${characterInfo.age}: [BLACK MARKET] You illegally smuggled a wild ${breed} (${species}) from a wildlife trafficker for ${formatCurrency(cost)}.`);
    
    set({
      finances: {
        ...finances,
        cashBalance: finances.cashBalance - cost,
      },
      pets: [...pets, newPet],
      log: nextLog,
      stats: {
        ...stats!,
        happiness: clamp(stats!.happiness + 5, 0, 100),
      }
    });
    return { success: true, msg: `Successfully smuggled: ${newPet.name} the ${breed} is now your pet! Be careful, its wild craziness rating is ${newPet.craziness}%!` };
  },

  murderSomeone: (targetId: string, method: string, weaponId?: string) => {
    const { relationships, weapons = [], log, characterInfo, stats, finances } = get();
    if (!characterInfo || characterInfo.isDead) {
      return { success: false, msg: 'Character must be alive' };
    }
    const targetNPC = relationships.find(r => r.id === targetId);
    const targetName = targetNPC ? targetNPC.name : 'a complete stranger';
    const nextRelationships = [...relationships];
    const nextLog = [...log];
    const nextStats = { ...stats! };
    const nextRecord = [...(get().criminalRecord || [])];
    
    let lethality = 0;
    let weaponName = 'manual bare hands';
    if (weaponId) {
      const wp = weapons.find(w => w.id === weaponId);
      if (wp) {
        lethality = wp.lethality;
        weaponName = wp.name;
      }
    }

    const successChance = 0.40 + (lethality / 200);
    const successfulAssassination = Math.random() < successChance;

    if (successfulAssassination) {
      nextLog.push(`Age ${characterInfo.age}: [MURDER] You successfully assassinated your target, ${targetName}, using ${weaponName}!`);
      nextStats.karma = clamp(nextStats.karma - 60, 0, 100);
      nextStats.happiness = clamp(nextStats.happiness - 15, 0, 100);
      nextStats.stress = clamp(nextStats.stress + 35, 0, 100);
      
      if (targetNPC) {
        const iden = nextRelationships.findIndex(r => r.id === targetId);
        if (iden !== -1) {
          nextRelationships[iden] = {
            ...targetNPC,
            isDead: true,
            relationshipValue: 0
          };
        }
      }

      const investigateRoll = Math.random() < 0.45;
      if (investigateRoll) {
        nextLog.push(`Age ${characterInfo.age}: [POLICE FORENSICS] Forensic detectives traced the crime scene back to you! You have been arrested for Murder!`);
        nextRecord.push(`Murder (${targetName})`);
        const trial: any = {
          crimeType: 'bank_robbery',
          charges: `Capital Murder of ${targetName}`,
          sentenceOffer: 25 + Math.floor(Math.random() * 26)
        };
        set({
          relationships: nextRelationships,
          log: nextLog,
          stats: nextStats,
          criminalRecord: nextRecord,
          courtTrial: trial
        });
        return { success: true, msg: `The assassination succeeded, but the Police connected the forensic dots! You are under arrest for Capital Murder!` };
      } else {
        set({
          relationships: nextRelationships,
          log: nextLog,
          stats: nextStats
        });
        return { success: true, msg: `You successfully committed the murder cleanly. You feel a heavy chill of guilt and paranoia, but there is no police on your tail yet.` };
      }
    } else {
      nextLog.push(`Age ${characterInfo.age}: [FAILED MURDER] Your attempt to murder ${targetName} using ${weaponName} was a complete failure!`);
      const targetRetaliates = Math.random() < 0.60;
      if (targetRetaliates) {
        nextStats.health = clamp(nextStats.health - 40, 0, 100);
        nextStats.happiness = clamp(nextStats.happiness - 20, 0, 100);
        nextLog.push(`Age ${characterInfo.age}: [MUTILATION] The target defended themselves ferociously and left you severely beaten! Your health has plummeted.`);
        set({
          stats: nextStats,
          log: nextLog
        });
        return { success: false, msg: `Murder botched! The target retaliated and beat you to a pulp! (-40% Health)` };
      } else {
        nextLog.push(`Age ${characterInfo.age}: [POLICE INTERCEPTION] You were caught red-handed in the act of attempting to murder ${targetName}!`);
        nextRecord.push(`Attempted Murder (${targetName})`);
        const trial: any = {
          crimeType: 'bank_robbery',
          charges: `Attempted Capital Murder of ${targetName}`,
          sentenceOffer: 12 + Math.floor(Math.random() * 14)
        };
        set({
          log: nextLog,
          criminalRecord: nextRecord,
          courtTrial: trial
        });
        return { success: false, msg: `Murder botched! You were immediately arrested at the scene of the crime for Attempted Murder!` };
      }
    }
  },

  hireHitman: (targetId: string) => {
    const { relationships, log, characterInfo, stats, finances } = get();
    if (!characterInfo || characterInfo.isDead) {
      return { success: false, msg: 'Character must be alive' };
    }
    const targetNPC = relationships.find(r => r.id === targetId);
    const targetName = targetNPC ? targetNPC.name : 'your target';
    const nextRelationships = [...relationships];
    const nextLog = [...log];
    const nextStats = { ...stats! };
    const nextRecord = [...(get().criminalRecord || [])];

    const fee = 5000 + Math.floor(Math.random() * 20000);
    if (finances!.cashBalance < fee) {
      return { success: false, msg: `The hitman demands ${formatCurrency(fee)} but you only possess ${formatCurrency(finances!.cashBalance)}.` };
    }

    const nextFinances = { ...finances!, cashBalance: finances!.cashBalance - fee };
    const roll = Math.random();

    if (roll < 0.60) {
      nextLog.push(`Age ${characterInfo.age}: [HITMAN CONTRACT] You contracted a professional hitman for ${formatCurrency(fee)}. They successfully executed ${targetName} without a trace!`);
      if (targetNPC) {
        const iden = nextRelationships.findIndex(r => r.id === targetId);
        if (iden !== -1) {
          nextRelationships[iden] = {
            ...targetNPC,
            isDead: true,
            relationshipValue: 0
          };
        }
      }
      nextStats.karma = clamp(nextStats.karma - 30, 0, 100);
      set({
        finances: nextFinances,
        relationships: nextRelationships,
        log: nextLog,
        stats: nextStats
      });
      return { success: true, msg: `The hitman pulled off the job perfectly! ${targetName} has been assassinated.` };
    } else if (roll < 0.80) {
      nextLog.push(`Age ${characterInfo.age}: [HITMAN EXHAUSTION] You paid a hitman ${formatCurrency(fee)} to assassinate ${targetName}, but the scammer blocked your number and ran off with your cash!`);
      nextStats.happiness = clamp(nextStats.happiness - 15, 0, 100);
      set({
        finances: nextFinances,
        log: nextLog,
        stats: nextStats
      });
      return { success: false, msg: `The hitman completely scammed you! They took your ${formatCurrency(fee)} and vanished into thin air.` };
    } else {
      nextLog.push(`Age ${characterInfo.age}: [STING OPERATION] Oh no! The hitman you tried to contract with ${formatCurrency(fee)} turned out to be an undercover police captain! You were hauled away in handcuffs.`);
      nextRecord.push(`Conspiracy to Commit Murder`);
      const trial: any = {
        crimeType: 'bank_robbery',
        charges: `Conspiracy to Commit Murder on ${targetName}`,
        sentenceOffer: 15 + Math.floor(Math.random() * 16)
      };
      set({
        finances: nextFinances,
        log: nextLog,
        criminalRecord: nextRecord,
        courtTrial: trial
      });
      return { success: false, msg: `Sting operation! Your contract killer was an Undercover Cop! You've been arrested and charged with Conspiracy to Commit Murder.` };
    }
  },

  triggerSpecialEvent: (event: GameEvent) => {
    set({ currentEvent: event });
  },

  interactWithNPC: (npcId: string, actionType: 'spend_time' | 'conversation' | 'ask_for_money') => {
    const { characterInfo, stats, finances, relationships, log, annualActionsPerformed } = get();
    if (!characterInfo || characterInfo.isDead) return;

    const npcIndex = relationships.findIndex(n => n.id === npcId);
    if (npcIndex === -1 || relationships[npcIndex].isDead) return;

    const npc = relationships[npcIndex];
    const age = characterInfo.age;
    const nextRelationships = [...relationships];
    const nextStats = { ...stats! };
    const nextFinances = { ...finances! };
    const nextLog = [...log];
    const nextActions = [...(annualActionsPerformed || [])];

    if (actionType === 'spend_time') {
      const boost = Math.floor(Math.random() * 11) + 5; // +5 to +15
      const newRelation = clamp(npc.relationshipValue + boost);
      nextRelationships[npcIndex] = {
        ...npc,
        relationshipValue: newRelation,
      };
      
      const activities = [
        `played video games together`,
        `went to the movies`,
        `shared a nice meal`,
        `went for a walk in the park`,
        `reminisced about old childhood memories`
      ];
      const activity = activities[Math.floor(Math.random() * activities.length)];
      nextLog.push(`Age ${age}: You and your ${npc.relationshipType.toLowerCase()}, ${npc.name}, ${activity}. Relationship increased!`);
      
      // Spend time spend_time: micro-action (+5 is currentValue * 1.005 or equivalent +0.5%)
      nextStats.happiness = clamp(nextStats.happiness * (1 + (0.5 / 100)), 0, 100);
      nextActions.push(`interact_npc_${npcId}_spend_time`);

    } else if (actionType === 'conversation') {
      const goesWell = Math.random() > 0.5;
      if (goesWell) {
        const boost = Math.floor(Math.random() * 8) + 5; // +5 to +12
        const happinessBoost = Math.floor(Math.random() * 6) + 5; // +5 to +10
        nextRelationships[npcIndex] = {
          ...npc,
          relationshipValue: clamp(npc.relationshipValue + boost),
        };
        // Micro-action (val * 0.1% percentage-based compounding shift)
        const changePercentage = happinessBoost * 0.1;
        nextStats.happiness = clamp(nextStats.happiness * (1 + (changePercentage / 100)), 0, 100);
        nextLog.push(`Age ${age}: You had a wonderful conversation with your ${npc.relationshipType.toLowerCase()} ${npc.name} about future plans.`);
      } else {
        const drop = Math.floor(Math.random() * 11) + 5; // -5 to -15
        const happinessDrop = Math.floor(Math.random() * 6) + 5; // -5 to -10
        nextRelationships[npcIndex] = {
          ...npc,
          relationshipValue: clamp(npc.relationshipValue - drop),
        };
        // Micro-action conversation failure (negative val * 0.1% percentage-based compounding shift)
        const changePercentage = -happinessDrop * 0.1;
        nextStats.happiness = clamp(nextStats.happiness * (1 + (changePercentage / 100)), 0, 100);
        nextLog.push(`Age ${age}: You and your ${npc.relationshipType.toLowerCase()} ${npc.name} got into an argument over something silly.`);
      }
      nextActions.push(`interact_npc_${npcId}_conversation`);

    } else if (actionType === 'ask_for_money') {
      const successChance = (npc.generosity * 0.6) + (npc.relationshipValue * 0.4);
      const isSuccess = (Math.random() * 100) < successChance && npc.money > 0;

      if (isSuccess) {
        let amount = 0;
        if (age < 12) {
          amount = Math.floor(Math.random() * 41) + 10; // $10 to $50
        } else if (age < 18) {
          amount = Math.floor(Math.random() * 131) + 20; // $20 to $150
        } else {
          amount = Math.floor(Math.random() * 401) + 100; // $100 to $500
        }
        
        amount = Math.min(amount, Math.floor(npc.money));
        if (amount < 1) amount = 1;

        nextFinances.cashBalance += amount;
        nextRelationships[npcIndex] = {
          ...npc,
          money: Math.max(0, npc.money - amount),
          relationshipValue: clamp(npc.relationshipValue - 2),
        };
        nextStats.happiness = clamp(nextStats.happiness + 5);
        nextLog.push(`Age ${age}: You asked your ${npc.relationshipType.toLowerCase()} ${npc.name} for money. They generously gave you ${formatCurrency(amount)}.`);
      } else {
        nextRelationships[npcIndex] = {
          ...npc,
          relationshipValue: clamp(npc.relationshipValue - 10),
        };
        nextStats.happiness = clamp(nextStats.happiness - 5);
        nextLog.push(`Age ${age}: You asked your ${npc.relationshipType.toLowerCase()} ${npc.name} for some money, but they refused to give you any.`);
      }
    }

    set({
      relationships: nextRelationships,
      stats: nextStats,
      finances: nextFinances,
      log: nextLog,
      annualActionsPerformed: nextActions,
    });
  },

  findDatingProspects: () => {
    const { characterInfo } = get();
    if (!characterInfo || characterInfo.age < 16) return;

    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const prospects: NPC[] = [];

    // Always generate exactly 3 prospects of age +/- 3 years (min 16)
    for (let i = 0; i < 3; i++) {
      const gender = Math.random() > 0.5 ? 'Male' : 'Female';
      const names = gender === 'Male' ? MALE_FIRST_NAMES : FEMALE_FIRST_NAMES;
      const firstName = names[Math.floor(Math.random() * names.length)];
      
      const ageDiff = Math.floor(Math.random() * 7) - 3; // -3 to +3
      const targetAge = Math.max(16, characterInfo.age + ageDiff);
      
      prospects.push({
        id: `prospect-${i}-${Math.random()}`,
        name: `${firstName} ${lastName}`,
        relationshipType: 'Partner',
        relationshipValue: Math.floor(Math.random() * 30) + 40, // 40-70 baseline
        generosity: Math.floor(Math.random() * 80) + 15, // 15-95
        money: Math.floor(Math.random() * 100000) + 500, // 500 to 100,000+
        looks: Math.floor(Math.random() * 80) + 20, // 20-100
        smarts: Math.floor(Math.random() * 80) + 20, // 20-100
        isDead: false,
        age: targetAge,
      });
    }

    set({ datingProspects: prospects });
  },

  askOutProspect: (prospectId: string) => {
    const { characterInfo, stats, relationships, datingProspects, log } = get();
    if (!characterInfo || !stats) return { success: false, msg: 'No active character' };

    const prospect = datingProspects.find(p => p.id === prospectId);
    if (!prospect) return { success: false, msg: 'Prospect not found' };

    // Appeal computation - Depends on looks, smarts, and random factor
    const playerAppeal = (stats.looks * 0.5) + (stats.smarts * 0.3) + 20;
    const prospectDemand = ((prospect.looks || 50) * 0.4) + ((prospect.smarts || 50) * 0.2);
    const randomFactor = Math.floor(Math.random() * 30);
    const score = playerAppeal - prospectDemand + randomFactor;

    if (score >= 25) {
      const newPartner: NPC = {
        ...prospect,
        relationshipValue: Math.floor(Math.random() * 31) + 50, // 50 to 80 closeness
      };

      const nextRelationships = [...relationships, newPartner];
      const nextLog = [...log, `Age ${characterInfo.age}: You asked out ${prospect.name} to be your partner, and they said YES!`];

      set({
        relationships: nextRelationships,
        maritalStatus: 'Dating',
        datingProspects: [],
        log: nextLog,
      });

      return { success: true, msg: `Success! ${prospect.name} is now your partner.` };
    } else {
      const nextLog = [...log, `Age ${characterInfo.age}: You asked out ${prospect.name} to be your partner, but they said no.`];
      set({ log: nextLog });
      return { success: false, msg: `Rejected! ${prospect.name} doesn't think you are compatible. Try building up your stats first!` };
    }
  },

  proposeToPartner: (partnerId: string, ringCost: number) => {
    const { characterInfo, finances, relationships, log } = get();
    if (!characterInfo || !finances) return { success: false, msg: 'No active character', requiresPrenupDecision: false };

    const npcIndex = relationships.findIndex(n => n.id === partnerId && n.relationshipType === 'Partner' && !n.isDead);
    if (npcIndex === -1) return { success: false, msg: 'Partner not found', requiresPrenupDecision: false };

    const partner = relationships[npcIndex];

    if (finances.cashBalance < ringCost) {
      return { success: false, msg: `You don't have enough cache to buy this ring (${formatCurrency(ringCost)}).`, requiresPrenupDecision: false };
    }

    if (partner.relationshipValue >= 70) {
      const nextFinances = { ...finances, cashBalance: finances.cashBalance - ringCost };
      const nextRelationships = [...relationships];
      nextRelationships[npcIndex] = {
        ...partner,
        isFiancee: true,
        relationshipValue: Math.min(100, partner.relationshipValue + 10),
      };

      const ringMsg = ringCost > 0 ? ` with an elegant ring costing ${formatCurrency(ringCost)}` : ` without any ring`;
      const nextLog = [...log, `Age ${characterInfo.age}: You proposed to your partner ${partner.name}${ringMsg}. They happily accepted your proposal!`];

      set({
        finances: nextFinances,
        relationships: nextRelationships,
        log: nextLog,
      });

      return { success: true, msg: `Accepted! They are now your fiancée.`, requiresPrenupDecision: true };
    } else {
      const nextRelationships = [...relationships];
      nextRelationships[npcIndex] = {
        ...partner,
        relationshipValue: clamp(partner.relationshipValue - 15),
      };

      const nextLog = [...log, `Age ${characterInfo.age}: You proposed to your partner ${partner.name}, but they rejected you.`];
      set({
        relationships: nextRelationships,
        log: nextLog,
      });

      return { success: false, msg: `Rejected! Your partner doesn't feel ready yet. Make sure closeness is > 70% before proposing!`, requiresPrenupDecision: false };
    }
  },

  handlePrenupDecision: (partnerId: string, signPrenup: boolean) => {
    const { characterInfo, finances, relationships, log } = get();
    if (!characterInfo || !finances) return { success: false, msg: 'No active character' };

    const npcIndex = relationships.findIndex(n => n.id === partnerId && n.relationshipType === 'Partner' && !n.isDead);
    if (npcIndex === -1) return { success: false, msg: 'Partner not found' };

    const partner = relationships[npcIndex];
    const nextRelationships = [...relationships];
    const nextFinances = { ...finances };
    let nextLog = [...log];

    if (signPrenup) {
      nextRelationships[npcIndex] = {
        ...partner,
        isFiancee: false,
        hasPrenup: true,
      };
      
      nextLog.push(`Age ${characterInfo.age}: You and ${partner.name} signed a pre-nuptial agreement and got married!`);
      
      set({
        relationships: nextRelationships,
        maritalStatus: 'Married',
        log: nextLog,
      });

      return { success: true, msg: `You signed the prenuptial agreement and got married! Your assets are fully insulated.` };
    } else {
      const partnerCaution = (partner.money > 50000 ? 55 : 20) - (partner.generosity * 0.4);
      const randomValue = Math.random() * 100;

      if (randomValue < partnerCaution) {
        const finalRels = relationships.filter(n => n.id !== partnerId);
        nextLog.push(`Age ${characterInfo.age}: ${partner.name} called off the wedding and broke up with you because you refused to sign a pre-nup!`);
        
        set({
          relationships: finalRels,
          maritalStatus: 'Single',
          log: nextLog,
        });

        return { success: false, msg: `Wedding called off! ${partner.name} Refused to marry without a prenuptial agreement and broke up.` };
      } else {
        const dowry = Math.floor(partner.money * 0.4);
        nextFinances.cashBalance += dowry;

        nextRelationships[npcIndex] = {
          ...partner,
          isFiancee: false,
          hasPrenup: false,
          money: Math.max(0, partner.money - dowry),
        };

        nextLog.push(`Age ${characterInfo.age}: You got married to ${partner.name} without a prenuptial agreement. You compiled accounts and received ${formatCurrency(dowry)}!`);

        set({
          relationships: nextRelationships,
          maritalStatus: 'Married',
          finances: nextFinances,
          log: nextLog,
        });

        return { success: true, msg: `Married! You married ${partner.name} without a prenuptial agreement. You combined books and received ${formatCurrency(dowry)}.` };
      }
    }
  },

  haveAChild: (partnerId: string) => {
    const { characterInfo, stats, relationships, log } = get();
    if (!characterInfo || !stats) return { success: false, msg: 'No active character' };

    if (characterInfo.age < 18 || characterInfo.age > 50) {
      return { success: false, msg: 'You are outside the standard fertile biological window (18-50) to have children.' };
    }

    const partner = relationships.find(n => n.id === partnerId && !n.isDead && n.relationshipType === 'Partner');
    if (!partner) return { success: false, msg: 'Partner not found' };

    if (Math.random() < 0.60) {
      const childGender = Math.random() > 0.5 ? 'Male' : 'Female';
      const names = childGender === 'Male' ? MALE_FIRST_NAMES : FEMALE_FIRST_NAMES;
      const childName = `${names[Math.floor(Math.random() * names.length)]} ${characterInfo.lastName}`;

      const newChild: NPC = {
        id: `child-${Math.random()}`,
        name: childName,
        relationshipType: 'Child',
        relationshipValue: 100,
        generosity: Math.floor(Math.random() * 60) + 30,
        money: 0,
        isDead: false,
        age: 0,
      };

      const nextRelationships = [...relationships, newChild];
      const nextLog = [...log, `Age ${characterInfo.age}: You and your partner ${partner.name} welcomed a gorgeous baby ${childGender.toLowerCase()}: ${childName}!`];

      set({
        relationships: nextRelationships,
        log: nextLog,
      });

      return { success: true, msg: `Congratulations! A child is born: ${childName}.` };
    } else {
      const nextLog = [...log, `Age ${characterInfo.age}: You and your partner ${partner.name} tried to conceive a baby, but without success.`];
      set({ log: nextLog });
      return { success: false, msg: `Conception attempt failed. Try again next year!` };
    }
  },

  breakUpOrDivorce: (partnerId: string) => {
    const { characterInfo, finances, relationships, maritalStatus, log } = get();
    if (!characterInfo || !finances) return;

    const partner = relationships.find(n => n.id === partnerId && !n.isDead && n.relationshipType === 'Partner');
    if (!partner) return;

    const nextRelationships = relationships.filter(n => n.id !== partnerId);
    let nextFinances = { ...finances };
    let nextLog = [...log];

    if (maritalStatus === 'Married') {
      if (partner.hasPrenup) {
        nextLog.push(`Age ${characterInfo.age}: You and your spouse ${partner.name} have divorced. Because a pre-nup was active, your cash remains secure.`);
      } else {
        const splitAmount = Math.max(0, Math.floor(finances.cashBalance * 0.5));
        nextFinances.cashBalance = Math.max(0, finances.cashBalance - splitAmount);
        nextLog.push(`Age ${characterInfo.age}: You and your spouse ${partner.name} have divorced. Lacking a pre-nup, your cash was split in half (-${formatCurrency(splitAmount)}).`);
      }
    } else {
      nextLog.push(`Age ${characterInfo.age}: You and your partner ${partner.name} broke up.`);
    }

    set({
      relationships: nextRelationships,
      maritalStatus: 'Single',
      finances: nextFinances,
      log: nextLog,
    });
  },

  studyHarder: () => {
    const { characterInfo, education, stats, log, annualActionsPerformed, geneticBaselines, consistencyStreaks } = get();
    if (!characterInfo || characterInfo.isDead || !education || !stats) return;

    const validStages = ['Primary School', 'Middle School', 'High School', 'University', 'Graduate School'];
    if (!validStages.includes(education.currentStage)) return;

    // Smarts genetic baseline multiplier
    let multiplier = 1.0;
    if (geneticBaselines) {
      if (geneticBaselines.smartsBaseline > 75) {
        multiplier *= 1.5;
      } else if (geneticBaselines.smartsBaseline < 40) {
        multiplier *= 0.5;
      }
    }

    // Consistency Study Streak Efficiency Multiplier
    const streak = consistencyStreaks ? consistencyStreaks.libraryStreak : 0;
    if (streak > 0) {
      const streakMultiplier = 1.0 + (Math.min(5, streak) * 0.1);
      multiplier *= streakMultiplier;
    }

    let gradesGained = Math.floor(Math.random() * 6) + 5; // +5 to +10 grades
    gradesGained = Math.round(gradesGained * multiplier);

    const newGrades = clamp(education.grades + gradesGained, 0, 100);
    const newStress = clamp(stats.stress + 5, 0, 100);

    const nextActions = [...(annualActionsPerformed || [])];
    nextActions.push('study_harder');

    const streakMsg = streak > 0 ? ` (Streak efficiency bonus: +${(Math.min(5, streak) * 10).toFixed(0)}%)` : '';
    set({
      education: {
        ...education,
        grades: newGrades,
      },
      stats: {
        ...stats,
        stress: newStress,
      },
      log: [...log, `Age ${characterInfo.age}: You study harder in classes. Grades gained: +${gradesGained}${streakMsg}.`],
      annualActionsPerformed: nextActions,
    });
  },

  applyToUniversity: (major: string, funding: 'Scholarship' | 'Parents' | 'Loan') => {
    const { characterInfo, education, stats, finances, relationships, log } = get();
    if (!characterInfo || characterInfo.isDead || !education || !stats || !finances) {
      return { success: false, msg: 'Internal game state error.' };
    }

    if (education.highestDegreeEarned !== 'High School Diploma') {
      return { success: false, msg: 'University admission requires a High School Diploma!' };
    }

    if (education.currentStage !== 'None') {
      return { success: false, msg: `You are currently already active as a student in ${education.currentStage}.` };
    }

    if (stats.smarts < 45) {
      return { success: false, msg: `Your application to study ${major} was rejected! The Admissions Board requires at least 45% Smarts (you have ${Math.round(stats.smarts)}%).` };
    }

    let funded = false;
    let feedback = '';
    let annualLoanDebt = 0;

    if (funding === 'Scholarship') {
      if (education.grades > 85) {
        funded = true;
        feedback = 'Congratulations! Your stellar academic record earned you a fully funded scholarship!';
      } else {
        return { success: false, msg: `Scholarship application rejected. The university requires grades > 85% (you have ${Math.round(education.grades)}%).` };
      }
    } else if (funding === 'Parents') {
      const parentSucceeds = relationships.some(
        npc => npc.relationshipType === 'Parent' && !npc.isDead && npc.generosity > 50 && npc.money > 45000
      );
      if (parentSucceeds) {
        funded = true;
        feedback = 'Your generous parents agreed to support your education and paid your flat tuition in full!';
      } else {
        return { success: false, msg: 'Your parents refused to pay for university. Either they lack financial depth, or they think you should be self-reliant.' };
      }
    } else if (funding === 'Loan') {
      funded = true;
      annualLoanDebt = 3500;
      feedback = 'You approved a commercial student loan agreement. Annual loan service debt of $3,500 is added.';
    }

    if (funded) {
      set({
        education: {
          ...education,
          currentStage: 'University',
          currentMajor: major,
          yearsRemaining: 4,
          fundingType: funding,
        },
        finances: {
          ...finances,
          annualDebt: finances.annualDebt + annualLoanDebt,
        },
        characterInfo: {
          ...characterInfo,
          currentOccupation: `University Student (${major})`,
        },
        log: [...log, `Age ${characterInfo.age}: You enrolled at University studying ${major}! ${feedback}`],
      });
      return { success: true, msg: `Welcome to University! You are now studying ${major}.` };
    }

    return { success: false, msg: 'Securing university enrollment failed.' };
  },

  applyToGraduateSchool: (schoolType: 'Law' | 'Medical' | 'Business', funding: 'Scholarship' | 'Parents' | 'Loan') => {
    const { characterInfo, education, stats, finances, relationships, log } = get();
    if (!characterInfo || characterInfo.isDead || !education || !stats || !finances) {
      return { success: false, msg: 'Internal game state error.' };
    }

    if (education.highestDegreeEarned !== 'Undergraduate Degree') {
      return { success: false, msg: 'Applying to Graduate School strictly requires an Undergraduate Degree.' };
    }

    if (education.currentStage !== 'None') {
      return { success: false, msg: 'You are already enrolled inside an active academic course.' };
    }

    if (schoolType === 'Law') {
      const isIdealMajor = education.currentMajor === 'Political Science' || education.currentMajor === 'English';
      const requiredSmarts = isIdealMajor ? 65 : 80;
      if (stats.smarts <= requiredSmarts) {
        return { 
          success: false, 
          msg: `Law School rejected your application! ${isIdealMajor ? '(Ideal Major Boost)' : ''} Requires smarts > ${requiredSmarts}% (you have ${Math.round(stats.smarts)}%).` 
        };
      }
    } else if (schoolType === 'Medical') {
      if (education.currentMajor !== 'Biology') {
        return { success: false, msg: 'Medical School application was rejected! It strictly requires an Undergraduate in Biology.' };
      }
      if (stats.smarts <= 75) {
        return { 
          success: false, 
          msg: `Medical School rejected you! It requires smarts > 75% (you have ${Math.round(stats.smarts)}%).` 
        };
      }
    } else if (schoolType === 'Business') {
      const isIdealMajor = education.currentMajor === 'Finance';
      const requiredSmarts = isIdealMajor ? 55 : 70;
      if (stats.smarts <= requiredSmarts) {
        return { 
          success: false, 
          msg: `Business School rejected your application! ${isIdealMajor ? '(Ideal Major Boost)' : ''} Requires smarts > ${requiredSmarts}% (you have ${Math.round(stats.smarts)}%).` 
        };
      }
    }

    let funded = false;
    let feedback = '';
    let annualLoanDebt = 0;
    const years = schoolType === 'Law' ? 3 : schoolType === 'Medical' ? 4 : 2;

    if (funding === 'Scholarship') {
      if (education.grades > 85) {
        funded = true;
        feedback = `Awesome! Your outstanding Undergraduate performance (grades: ${Math.round(education.grades)}%) earned you a full Postgraduate Scholarship!`;
      } else {
        return { success: false, msg: `Postgraduate scholarship denied! Graduate schools require high academic average (>85% grades, you have ${Math.round(education.grades)}%).` };
      }
    } else if (funding === 'Parents') {
      const parentSucceeds = relationships.some(
        npc => npc.relationshipType === 'Parent' && !npc.isDead && npc.generosity > 55 && npc.money > 60000
      );
      if (parentSucceeds) {
        funded = true;
        feedback = 'Your parents have generously agreed to finance your postgraduate studies in full!';
      } else {
        return { success: false, msg: 'Postgraduate tuition fee request denied by your parents! They lack either the generosity or deep savings required.' };
      }
    } else if (funding === 'Loan') {
      funded = true;
      annualLoanDebt = 5000;
      feedback = 'You took out commercial Graduate Loans. An annual debt payment of $5,000 has been configured.';
    }

    if (funded) {
      set({
        education: {
          ...education,
          currentStage: 'Graduate School',
          currentMajor: schoolType,
          yearsRemaining: years,
          fundingType: funding,
        },
        finances: {
          ...finances,
          annualDebt: finances.annualDebt + annualLoanDebt,
        },
        characterInfo: {
          ...characterInfo,
          currentOccupation: `Graduate Student (${schoolType} School)`,
        },
        log: [...log, `Age ${characterInfo.age}: You enrolled into postgraduate ${schoolType} School! ${feedback}`],
      });
      return { success: true, msg: `Welcome to ${schoolType} School!` };
    }

    return { success: false, msg: 'Failed to secure funding for postgraduate enrollment.' };
  },

  commitCrime: (type: 'shoplift' | 'grand_theft_auto' | 'bank_robbery' | 'shoplift_candy' | 'vandalize_walls' | 'pickpocket_classmates') => {
    const { characterInfo, stats, finances, assets, log } = get();
    if (!characterInfo || characterInfo.isDead) return;

    let crimeEvent: GameEvent;

    if (type === 'shoplift_candy') {
      crimeEvent = {
        id: 'crime_shoplift_candy',
        title: 'Shoplifting Candy 🍬',
        description: 'You are inside a corner grocery store, eyeing a premium king-sized strawberry chocolate bar. The grocer is busy sorting newspapers, but a large security mirror hangs directly above the aisle.',
        category: 'Special',
        condition: () => true,
        choices: [
          {
            choiceText: 'Slip it into your backpack quietly (Easy/Low Risk).',
            outcomeText: 'You stealthily slip the bar into your bag while pretending to tie your shoelaces. You get away scot-free and eat the candy!',
            effect: (state) => {
              const successProb = clamp(0.85 + (state.stats.smarts - 50) * 0.002 + (state.stats.health - 50) * 0.001, 0.10, 0.98);
              if (Math.random() < successProb) {
                state.finances.cashBalance += 5;
                adjustStats(state, { happiness: 15, stress: -10, karma: -15 });
                state.log.push(`Age ${state.characterInfo.age}: You shoplifted a king-sized chocolate bar from the corner store.`);
              } else {
                state.courtTrial = {
                  crimeType: 'shoplift_candy',
                  charges: 'Juvenile Petty Candy Larceny & Shoplifting',
                  sentenceOffer: 1
                };
                state.log.push(`Age ${state.characterInfo.age}: You were caught shoplifting candy! The grocer locked the doors and called the juvenile police.`);
              }
            }
          },
          {
            choiceText: 'Slide it up your fleece sleeve while coughing (Medium Risk).',
            outcomeText: 'You time your cough perfectly and slide the bar up your sleeve. Success!',
            effect: (state) => {
              const successProb = clamp(0.65 + (state.stats.smarts - 50) * 0.003 + (state.stats.health - 50) * 0.001, 0.10, 0.95);
              if (Math.random() < successProb) {
                state.finances.cashBalance += 10;
                adjustStats(state, { happiness: 20, looks: 5, karma: -20 });
                state.log.push(`Age ${state.characterInfo.age}: You slickly shoplifted candy using your fleece sleeve.`);
              } else {
                state.courtTrial = {
                  crimeType: 'shoplift_candy',
                  charges: 'Juvenile Petty Candy Larceny & Shoplifting',
                  sentenceOffer: 1
                };
                state.log.push(`Age ${state.characterInfo.age}: Your sleeve slipped, the chocolate bar clattered on the tiles, and you were caught!`);
              }
            }
          },
          {
            choiceText: 'Knock over a pile of baked bean cans as a distraction, then grab it (Severe Risk).',
            outcomeText: 'The cans crash loudly, drawing the cashier\'s panic. You swipe the chocolate bar in the chaos!',
            effect: (state) => {
              const successProb = clamp(0.40 + (state.stats.smarts - 50) * 0.001 + (state.stats.health - 50) * 0.003, 0.05, 0.90);
              if (Math.random() < successProb) {
                state.finances.cashBalance += 15;
                adjustStats(state, { happiness: 25, stress: 30, karma: -30 });
                state.log.push(`Age ${state.characterInfo.age}: You pulled off a chaotic candy grab-and-dash under the cover of falling cans.`);
              } else {
                state.courtTrial = {
                  crimeType: 'shoplift_candy',
                  charges: 'Juvenile Petty Candy Larceny & Shoplifting',
                  sentenceOffer: 1
                };
                state.log.push(`Age ${state.characterInfo.age}: You tripped over the tumbling bean cans, and the cashier held you down easily until sheriff deputies arrived.`);
              }
            }
          },
          {
            choiceText: 'Change your mind. Ask the clerk nicely for a small free sample (Safe Option).',
            outcomeText: 'The clerk smiles warmly at your manners and hands you a mini lollipop. Life is sweet!',
            effect: (state) => {
              adjustStats(state, { happiness: 10, karma: 25, smarts: 5 });
              state.log.push(`Age ${state.characterInfo.age}: You decided against shoplifting candy, choosing a polite request instead.`);
            }
          }
        ]
      };
    } else if (type === 'vandalize_walls') {
      crimeEvent = {
        id: 'crime_vandalize_walls',
        title: 'Vandalizing School Walls 🎨',
        description: 'You sneak onto the school campus grounds at midnight with a pressurized can of neon spray paint. The brick facade is clean and tempting, but a night guard\'s heavy footsteps echo in the corridor.',
        category: 'Special',
        condition: () => true,
        choices: [
          {
            choiceText: 'Spray-paint a tiny signature tag behind the dense garden bushes (Low Risk).',
            outcomeText: 'You crawl behind the bushes and spray a quick signature. The dark shadows hide you perfectly.',
            effect: (state) => {
              const successProb = clamp(0.85 + (state.stats.smarts - 50) * 0.002, 0.15, 0.98);
              if (Math.random() < successProb) {
                adjustStats(state, { happiness: 15, stress: 10, karma: -10 });
                state.log.push(`Age ${state.characterInfo.age}: You spray-painted school bushes stealthily at midnight.`);
              } else {
                state.courtTrial = {
                  crimeType: 'vandalize_walls',
                  charges: 'Juvenile Vandalism & Trespassing',
                  sentenceOffer: 2
                };
                state.log.push(`Age ${state.characterInfo.age}: A flashlight beam caught you mid-spray! You were caught and arrested.`);
              }
            }
          },
          {
            choiceText: 'Paint a massive comical caricature of the school principal (Medium Risk).',
            outcomeText: 'You paint a massive principal with giant cartoon ears. High school pupils will talk about this for weeks!',
            effect: (state) => {
              const successProb = clamp(0.65 + (state.stats.smarts - 50) * 0.003, 0.10, 0.95);
              if (Math.random() < successProb) {
                adjustStats(state, { happiness: 25, looks: 5, karma: -20, stress: 15 });
                state.log.push(`Age ${state.characterInfo.age}: You spray-painted a legendary caricature of the principal on the school facade.`);
              } else {
                state.courtTrial = {
                  crimeType: 'vandalize_walls',
                  charges: 'Juvenile Vandalism & Trespassing',
                  sentenceOffer: 2
                };
                state.log.push(`Age ${state.characterInfo.age}: The night guard spotted your spray outline and cornered you before you could escape.`);
              }
            }
          },
          {
            choiceText: 'Attempt a giant, multi-color 3D mural across the front glass doors (High Risk).',
            outcomeText: 'You pull off a stunning graffiti mural. The front glass looks incredibly vibrant, a monument of teenage rebellion!',
            effect: (state) => {
              const successProb = clamp(0.40 + (state.stats.smarts - 50) * 0.001 + (state.stats.health - 50) * 0.002, 0.05, 0.90);
              if (Math.random() < successProb) {
                adjustStats(state, { happiness: 35, smarts: 15, karma: -30, stress: 30 });
                state.log.push(`Age ${state.characterInfo.age}: You spray-painted a massive 3D street mural across the school glass doors.`);
              } else {
                state.courtTrial = {
                  crimeType: 'vandalize_walls',
                  charges: 'Juvenile Vandalism & Trespassing',
                  sentenceOffer: 2
                };
                state.log.push(`Age ${state.characterInfo.age}: The security alarms tripped, catching you holding two red spray cans. Busted!`);
              }
            }
          },
          {
            choiceText: 'Change your mind. Spray-paint your own wooden notebook binder instead (Safe Option).',
            outcomeText: 'You design a highly artistic binder safely in your bedroom. No heat, full comfort.',
            effect: (state) => {
              adjustStats(state, { happiness: 10, smarts: 8, karma: 15 });
              state.log.push(`Age ${state.characterInfo.age}: You painted your own binder safely, avoiding vandalism laws.`);
            }
          }
        ]
      };
    } else if (type === 'pickpocket_classmates') {
      crimeEvent = {
        id: 'crime_pickpocket_classmates',
        title: 'Classroom Pickpocketing 🎒',
        description: 'During gym class recess, you notice an expensive smartphone and a crisp $20 bill sitting exposed on top of an unlocked metal locker.',
        category: 'Special',
        condition: () => true,
        choices: [
          {
            choiceText: 'Slide the cash into your sock while pretend stretching (Low Risk).',
            outcomeText: 'You slide the twenty into your gym sock cleanly. Nobody saw, and you have cash for lunch!',
            effect: (state) => {
              const successProb = clamp(0.85 + (state.stats.smarts - 50) * 0.003, 0.15, 0.98);
              if (Math.random() < successProb) {
                state.finances.cashBalance += 20;
                adjustStats(state, { happiness: 15, karma: -15, stress: 5 });
                state.log.push(`Age ${state.characterInfo.age}: You pickpocketed $20 from a teammate's locker during gym class.`);
              } else {
                state.courtTrial = {
                  crimeType: 'pickpocket_classmates',
                  charges: 'Juvenile Petty Larceny & Pilfering',
                  sentenceOffer: 2
                };
                state.log.push(`Age ${state.characterInfo.age}: Your classmate walked in mid-stretch and caught your hand inside their locker!`);
              }
            }
          },
          {
            choiceText: 'Take both phone and cash, then hide them in the laundry bin to retrieve later (Medium Risk).',
            outcomeText: 'You successfully relocate the loot to the bin. A perfect heist!',
            effect: (state) => {
              const successProb = clamp(0.65 + (state.stats.smarts - 50) * 0.004, 0.10, 0.95);
              if (Math.random() < successProb) {
                state.finances.cashBalance += 100;
                adjustStats(state, { happiness: 25, smarts: 10, karma: -25 });
                state.log.push(`Age ${state.characterInfo.age}: You successfully stole a peer's phone and cash, converting it for $100 cash.`);
              } else {
                state.courtTrial = {
                  crimeType: 'pickpocket_classmates',
                  charges: 'Juvenile Petty Larceny & Pilfering',
                  sentenceOffer: 2
                };
                state.log.push(`Age ${state.characterInfo.age}: The locker room security monitor spotted you digging in the bin and alerted school staff.`);
              }
            }
          },
          {
            choiceText: 'Boldly snatch the phone, sprint out, and trade it to a street bully (High Risk).',
            outcomeText: 'The trade secures you a heavy bag of cash and high reputational points among juvenile ruffians.',
            effect: (state) => {
              const successProb = clamp(0.45 + (state.stats.smarts - 50) * 0.002 + (state.stats.health - 50) * 0.002, 0.05, 0.90);
              if (Math.random() < successProb) {
                state.finances.cashBalance += 250;
                adjustStats(state, { happiness: 35, karma: -35, stress: 25 });
                state.log.push(`Age ${state.characterInfo.age}: You boldly swiped a classmate's smartphone, fencing it to local street gangs.`);
              } else {
                state.courtTrial = {
                  crimeType: 'pickpocket_classmates',
                  charges: 'Juvenile Petty Larceny & Pilfering',
                  sentenceOffer: 2
                };
                state.log.push(`Age ${state.characterInfo.age}: A gym teacher intercepted you sprinting near exit doors with the stolen phone. Arrested!`);
              }
            }
          },
          {
            choiceText: 'Secure the items and turn them in to the locker room lost-and-found (Safe Option).',
            outcomeText: 'The school principal commends your absolute integrity. High moral honors!',
            effect: (state) => {
              adjustStats(state, { karma: 30, happiness: 10, smarts: 5 });
              state.log.push(`Age ${state.characterInfo.age}: You secured an unsecured locker room phone, safeguarding classmate assets.`);
            }
          }
        ]
      };
    } else if (type === 'shoplift') {
      crimeEvent = {
        id: 'crime_shoplift_adult',
        title: 'Shoplifting Boutique Store 🕶️',
        description: 'You are inside a luxurious metropolitan designer boutique. A pair of custom gold-plated sunglasses worth $500 is sitting on a velvet display, with an active security camera blinking above.',
        category: 'Special',
        condition: () => true,
        choices: [
          {
            choiceText: 'Distract the assistant by requesting a rare size from the back room (Low Risk).',
            outcomeText: 'As soon as the clerk walks away, you slickly pocket the sunglasses. You sell them to a buyer for $150 black market cash!',
            effect: (state) => {
              const successProb = clamp(0.80 + (state.stats.smarts - 50) * 0.002, 0.15, 0.98);
              if (Math.random() < successProb) {
                state.finances.cashBalance += 150;
                adjustStats(state, { happiness: 15, karma: -15, stress: 5 });
                state.log.push(`Age ${state.characterInfo.age}: You shoplifted designer sunglasses by employing clerk deflection tactics.`);
              } else {
                state.courtTrial = {
                  crimeType: 'shoplift',
                  charges: 'Petty Larceny & Boutique Shoplifting',
                  sentenceOffer: 1
                };
                state.log.push(`Age ${state.characterInfo.age}: The assistant saw you slip the glasses in their makeup mirror and locked down the doors until police arrived.`);
              }
            }
          },
          {
            choiceText: 'Stuff them down your winter coat and pretend to read a fashion catalogue (Medium Risk).',
            outcomeText: 'You glide past sensory alarms cleanly and slip down the metropolitan alleys. The glasses fetch $300 at a pawn broker!',
            effect: (state) => {
              const successProb = clamp(0.60 + (state.stats.smarts - 50) * 0.003, 0.10, 0.95);
              if (Math.random() < successProb) {
                state.finances.cashBalance += 300;
                adjustStats(state, { happiness: 20, looks: 5, karma: -20 });
                state.log.push(`Age ${state.characterInfo.age}: You shoplifted sunglasses by hiding them inside your winter coat.`);
              } else {
                state.courtTrial = {
                  crimeType: 'shoplift',
                  charges: 'Petty Larceny & Boutique Shoplifting',
                  sentenceOffer: 1
                };
                state.log.push(`Age ${state.characterInfo.age}: The door sensing gates buzzed loudly as you crossed. Security held you down until patrol police arrived.`);
              }
            }
          },
          {
            choiceText: 'Put them on, look in the mirror, snap your fingers, and sprint out (High Risk).',
            outcomeText: 'You burst into a high-speed dash! The security guard slips on wet tiles. You escaped and keep the designer sunglasses!',
            effect: (state) => {
              const successProb = clamp(0.40 + (state.stats.smarts - 50) * 0.001 + (state.stats.health - 50) * 0.004, 0.05, 0.90);
              if (Math.random() < successProb) {
                state.finances.cashBalance += 500;
                adjustStats(state, { happiness: 30, looks: 15, stress: 25, karma: -30 });
                state.log.push(`Age ${state.characterInfo.age}: You successfully executed a bold dash-and-grab boutique heist, securing $500 glasses.`);
              } else {
                state.courtTrial = {
                  crimeType: 'shoplift',
                  charges: 'Petty Larceny & Boutique Shoplifting',
                  sentenceOffer: 1
                };
                state.log.push(`Age ${state.characterInfo.age}: You ran face-first into an automatic rotating door, knocking yourself out cold. Arrested!`);
              }
            }
          },
          {
            choiceText: 'Change your mind. Decide a criminal lifestyle is beneath you (Safe Option).',
            outcomeText: 'You walk outside empty-handed, but empty of stress and guilt too. Cozy, honorable.',
            effect: (state) => {
              adjustStats(state, { happiness: 10, karma: 20, stress: -10 });
              state.log.push(`Age ${state.characterInfo.age}: You declined shoplifting boutique goods, staying honorable.`);
            }
          }
        ]
      };
    } else if (type === 'grand_theft_auto') {
      crimeEvent = {
        id: 'crime_gta',
        title: 'Grand Theft Auto 🚗',
        description: 'A gorgeous cherry-red performance sedan is idling outside a convenience shop, key fob sitting in the console while the owner is inside buying paper cups.',
        category: 'Special',
        condition: () => true,
        choices: [
          {
            choiceText: 'Slide into the leather seat, bypass security controls, and lock the doors (Low/Medium Risk).',
            outcomeText: 'You floor the gas! The owner screams in the rearview mirror as you vanish into traffic. You sell it to chop shops for $6,000 cash!',
            effect: (state) => {
              const successProb = clamp(0.70 + (state.stats.smarts - 50) * 0.003, 0.15, 0.98);
              if (Math.random() < successProb) {
                state.finances.cashBalance += 6000;
                adjustStats(state, { happiness: 20, karma: -20, stress: 15 });
                state.log.push(`Age ${state.characterInfo.age}: You auto-heisted an idling sedan outside a local store, banking $6,000.`);
              } else {
                state.courtTrial = {
                  crimeType: 'grand_theft_auto',
                  charges: 'Grand Larceny & Grand Theft Auto',
                  sentenceOffer: 5
                };
                state.log.push(`Age ${state.characterInfo.age}: The automatic engine immobilizer kicked in, trapping you inside the vehicle until police arrived.`);
              }
            }
          },
          {
            choiceText: 'Hotwire ignition systems inside a secluded residential driveway (Medium Risk).',
            outcomeText: 'Using wire shears and sharp bypass decoders, you successfully hack the ignition, stealing the sedan valued at $10,000 as an asset!',
            effect: (state) => {
              const successProb = clamp(0.55 + (state.stats.smarts - 50) * 0.004, 0.10, 0.95);
              if (Math.random() < successProb) {
                const newCar: Asset = {
                  id: `asset-crime-${Math.random()}`,
                  name: `Stolen Chevy Sports Sedan`,
                  type: 'vehicle',
                  purchasePrice: 0,
                  currentValue: 10000,
                  annualUpkeep: 300,
                  isFinanced: false,
                  loanDetails: null,
                };
                state.assets.push(newCar);
                adjustStats(state, { happiness: 25, smarts: 10, karma: -25 });
                state.log.push(`Age ${state.characterInfo.age}: You hotwired a premium sedan in a quiet driveway, registering it into your personal vehicle assets.`);
              } else {
                state.courtTrial = {
                  crimeType: 'grand_theft_auto',
                  charges: 'Grand Larceny & Grand Theft Auto',
                  sentenceOffer: 5
                };
                state.log.push(`Age ${state.characterInfo.age}: A neighborhood watch member spotted your wire cutter glow and held you at shovel-point until law forces arrived.`);
              }
            }
          },
          {
            choiceText: 'Dress as a luxury valet parking host and request the car keys (High Risk).',
            outcomeText: 'The owner hands you the keys with a generous tip! You drive it straight to black-market shipping containers for a massive $12,000 payout!',
            effect: (state) => {
              const successProb = clamp(0.40 + (state.stats.smarts - 50) * 0.005, 0.05, 0.90);
              if (Math.random() < successProb) {
                state.finances.cashBalance += 12000;
                adjustStats(state, { happiness: 35, looks: 5, karma: -35, stress: 25 });
                state.log.push(`Age ${state.characterInfo.age}: You ran a valet scam to steal a luxury sports sedan ($12,000 cash value).`);
              } else {
                state.courtTrial = {
                  crimeType: 'grand_theft_auto',
                  charges: 'Grand Larceny & Grand Theft Auto',
                  sentenceOffer: 5
                };
                state.log.push(`Age ${state.characterInfo.age}: The actual valet captain appeared and demanded your credentials. You were arrested.`);
              }
            }
          },
          {
            choiceText: 'Decline. Walk away and ride the municipal city subway transit (Safe Option).',
            outcomeText: 'You arrive at your destination safely, with a perfectly clean legal record. Beautiful peace of mind.',
            effect: (state) => {
              adjustStats(state, { happiness: 10, karma: 15, stress: -10 });
              state.log.push(`Age ${state.characterInfo.age}: You chose to take city transit, avoiding automobile theft temptations.`);
            }
          }
        ]
      };
    } else {
      // bank_robbery
      crimeEvent = {
        id: 'crime_bank_robbery',
        title: 'Heisting Bank Vault 🏦',
        description: 'You pull on a full-face balaclava ski mask, check your replica tactical sidearm, and stand outside the metropolitan national gold depository.',
        category: 'Special',
        condition: () => true,
        choices: [
          {
            choiceText: 'Quietly slip a threatening note to the teller requesting standard checkout cash (Medium Risk).',
            outcomeText: 'The teller is shivering and slips $50,000 cash under the bulletproof glass. You walk out calmly and disappear into the crowd!',
            effect: (state) => {
              const successProb = clamp(0.30 + (state.stats.smarts - 50) * 0.002, 0.05, 0.80);
              if (Math.random() < successProb) {
                state.finances.cashBalance += 50000;
                adjustStats(state, { happiness: 30, stress: 30, karma: -40 });
                state.log.push(`Age ${state.characterInfo.age}: You executed a notes-teller bank robbery heist and got away with $50,000 cash.`);
              } else {
                state.courtTrial = {
                  crimeType: 'bank_robbery',
                  charges: 'Armed Robbery & Bank Heist',
                  sentenceOffer: 15
                };
                state.log.push(`Age ${state.characterInfo.age}: The teller pressed the silent desk floor button, and SWAT barricades locked you inside the foyer. Captured!`);
              }
            }
          },
          {
            choiceText: 'Storm the entrance, aim at the lobby ceiling, and command everyone to freeze (High Risk).',
            outcomeText: 'Absolute terror! Security guards surrender and you ransack the registers, fleeing with $100,000 cash in heavy bags!',
            effect: (state) => {
              const successProb = clamp(0.20 + (state.stats.smarts - 50) * 0.001 + (state.stats.health - 50) * 0.002, 0.05, 0.70);
              if (Math.random() < successProb) {
                state.finances.cashBalance += 100000;
                adjustStats(state, { happiness: 40, stress: 45, karma: -50 });
                state.log.push(`Age ${state.characterInfo.age}: You stormed a bank with weapon displays, escaping with $100,000 cash.`);
              } else {
                state.courtTrial = {
                  crimeType: 'bank_robbery',
                  charges: 'Armed Robbery & Bank Heist',
                  sentenceOffer: 15
                };
                state.log.push(`Age ${state.characterInfo.age}: An off-duty tactical commander tackled you from behind mid-screaming, neutralizing you. Arrested!`);
              }
            }
          },
          {
            choiceText: 'Scale service ventilations at midnight, cutting security lines with a laser cutter (Extreme Risk).',
            outcomeText: 'You slide down into the bullion vault, fill your mechanical crates, and bypass silent sensors. You fence the raw bars for a massive $200,000 payout!',
            effect: (state) => {
              const successProb = clamp(0.12 + (state.stats.smarts - 50) * 0.004, 0.02, 0.60);
              if (Math.random() < successProb) {
                state.finances.cashBalance += 200000;
                adjustStats(state, { happiness: 50, smarts: 20, stress: 50, karma: -60 });
                state.log.push(`Age ${state.characterInfo.age}: You did a futuristic ventilation bank bullion robbery, netting $200,000.`);
              } else {
                state.courtTrial = {
                  crimeType: 'bank_robbery',
                  charges: 'Armed Robbery & Bank Heist',
                  sentenceOffer: 15
                };
                state.log.push(`Age ${state.characterInfo.age}: Motion alarm laser fields triggered in sector 4. Tear gas filled the shaft, and you were extracted by the FBI.`);
              }
            }
          },
          {
            choiceText: 'Throw the replica gun in the garbage and make standard ATM withdrawals instead (Safe Option).',
            outcomeText: 'You breathe a massive sigh of relief, buy a fresh hot coffee, and keep your hands clean. Beautiful choice.',
            effect: (state) => {
              adjustStats(state, { karma: 30, happiness: 10, stress: -20 });
              state.log.push(`Age ${state.characterInfo.age}: You withdrew normal cash at the bank, throwing away heist mock weapons.`);
            }
          }
        ]
      };
    }

    set({ currentEvent: crimeEvent });
  },

  resolveTrial: (defenseType: 'public' | 'attorney') => {
    const { characterInfo, stats, finances, courtTrial, log, criminalRecord } = get();
    if (!characterInfo || !stats || !finances || !courtTrial) {
      return { acquitted: false, sentence: 0, msg: 'No trial in progress.' };
    }

    let cost = 0;
    let acquittalChance = 0.20; // 20%
    if (defenseType === 'attorney') {
      if (courtTrial.crimeType === 'shoplift') cost = 10000;
      else if (courtTrial.crimeType === 'grand_theft_auto') cost = 25000;
      else if (courtTrial.crimeType === 'bank_robbery') cost = 50000;

      if (finances.cashBalance < cost) {
        return { acquitted: false, sentence: 0, msg: `You don't have enough cash to pay the attorney's retainer of $${cost}!` };
      }
      acquittalChance = 0.75; // 75%
    }

    const nextFinances = { ...finances };
    nextFinances.cashBalance -= cost;

    const rolled = Math.random();
    const acquitted = rolled <= acquittalChance;
    let msg = '';
    let nextPrisonSentence = null;
    let nextOccupation = characterInfo.currentOccupation;
    const nextRecord = [...(criminalRecord || [])];
    const nextStats = { ...stats };

    if (acquitted) {
      msg = `Acquitted! Your defense lawyer successfully argued your case. All charges have been dismissed!`;
      set({
        courtTrial: null,
        finances: nextFinances,
        log: [...log, `Age ${characterInfo.age}: Found NOT GUILTY in court trial for ${courtTrial.charges}. Costs: $${cost}.`],
      });
    } else {
      let securityLevel: 'Minimum' | 'Medium' | 'Maximum' = 'Minimum';
      if (courtTrial.crimeType === 'grand_theft_auto') securityLevel = 'Medium';
      else if (courtTrial.crimeType === 'bank_robbery') securityLevel = 'Maximum';

      nextPrisonSentence = {
        remainingYears: courtTrial.sentenceOffer,
        securityLevel,
      };

      // Fired from job
      nextOccupation = 'Prisoner';
      nextFinances.annualSalary = 0;

      nextRecord.push(`${courtTrial.charges} (${courtTrial.sentenceOffer} years, ${securityLevel} Sec)`);
      nextStats.happiness = clamp(nextStats.happiness - 30, 0, 100);
      nextStats.stress = clamp(nextStats.stress + 30, 0, 100);

      msg = `Guilty! The court sentenced you to ${courtTrial.sentenceOffer} years in ${securityLevel} Security Prison.`;
      
      set({
        courtTrial: null,
        prisonSentence: nextPrisonSentence,
        criminalRecord: nextRecord,
        finances: nextFinances,
        stats: nextStats,
        characterInfo: {
          ...characterInfo,
          currentOccupation: nextOccupation,
        },
        log: [...log, `Age ${characterInfo.age}: Found GUILTY of "${courtTrial.charges}". Sentenced to ${courtTrial.sentenceOffer} years in ${securityLevel} Security Prison.`],
      });
    }

    return { acquitted, sentence: acquitted ? 0 : courtTrial.sentenceOffer, msg };
  },

  cryInCell: () => {
    const { characterInfo, stats, prisonSentence, log } = get();
    if (!characterInfo || !stats || !prisonSentence || characterInfo.isDead) return;

    set({
      stats: {
        ...stats,
        happiness: clamp(stats.happiness - 5, 0, 100),
        karma: clamp(stats.karma + 10, 0, 100),
      },
      log: [...log, `Age ${characterInfo.age}: You cried in your cell. It drops your happiness by -5 but raises your karma by +10.`],
    });
  },

  startPrisonRiot: () => {
    const { characterInfo, stats, prisonSentence, log } = get();
    if (!characterInfo || !stats || !prisonSentence || characterInfo.isDead) {
      return { success: false, msg: 'Inactive state.' };
    }

    const success = Math.random() < 0.3;
    if (success) {
      set({
        stats: {
          ...stats,
          happiness: clamp(stats.happiness + 20, 0, 100),
          health: clamp(stats.health - 5, 0, 100),
        },
        log: [...log, `Age ${characterInfo.age}: You successfully led a prison yard riot! Your respect among inmates rose (+20 Happiness).`],
      });
      return { success: true, msg: 'Riot succeeded! Your reputation and yard clout shot through the roof (+20 Happiness).' };
    } else {
      const nextRemaining = prisonSentence.remainingYears + 2;
      set({
        stats: {
          ...stats,
          health: clamp(stats.health - 30, 0, 100),
          happiness: clamp(stats.happiness - 15, 0, 100),
        },
        prisonSentence: {
          ...prisonSentence,
          remainingYears: nextRemaining,
        },
        log: [...log, `Age ${characterInfo.age}: You started a prison riot but were brutally flattened by the riot squad guards (-30 Health, +2 years added for misconduct).`],
      });
      return {
        success: false,
        msg: `Riot failed! The riot squad beat you severely, and the correctional director tacked on another +2 years to your sentence.`,
      };
    }
  },

  escapePrison: () => {
    const { characterInfo, stats, prisonSentence, log } = get();
    if (!characterInfo || !stats || !prisonSentence || characterInfo.isDead) {
      return { success: false, msg: 'Inactive state.' };
    }

    const smartsMod = (stats.smarts - 50) * 0.003; // -15% to +15%
    const finalChance = clamp(0.3 + smartsMod, 0.1, 0.6);

    const success = Math.random() < finalChance;
    if (success) {
      set({
        prisonSentence: null,
        characterInfo: {
          ...characterInfo,
          currentOccupation: 'Fugitive (On the run)',
        },
        stats: {
          ...stats,
          happiness: clamp(stats.happiness + 30, 0, 100),
          stress: clamp(stats.stress + 35, 0, 100),
        },
        log: [...log, `Age ${characterInfo.age}: You escaped from prison! You are now a Fugitive running from state bounty hunters.`],
      });
      return { success: true, msg: 'Incredible success! You snuck through the laundry chute, scaled the razor wire, and escaped!' };
    } else {
      const nextRemaining = prisonSentence.remainingYears + 5;
      set({
        stats: {
          ...stats,
          health: clamp(stats.health - 40, 0, 100),
          happiness: clamp(stats.happiness - 20, 0, 100),
        },
        prisonSentence: {
          ...prisonSentence,
          remainingYears: nextRemaining,
        },
        log: [...log, `Age ${characterInfo.age}: Attempted prison escape failed in yard patrol area! Guards mauled you (-40 Health, +5 years added for escape attempt).`],
      });
      return {
        success: false,
        msg: `Catch fail! You were mauled by guard dogs in the perimeter zone. The judge slapped a massive +5 year penalty onto your stretch.`,
      };
    }
  },

  visitDoctor: (doctorType: 'Medical' | 'Psychiatrist' | 'Alternative', diseaseId: string) => {
    const { characterInfo, finances, stats, log, diseases = [] } = get();
    if (!characterInfo || !finances || !stats || characterInfo.isDead) {
      return { success: false, msg: 'No active character' };
    }

    const targetDisease = diseases.find(d => d.id === diseaseId);
    if (!targetDisease) {
      return { success: false, msg: 'That condition is not active' };
    }

    // Determine cost
    const cost = doctorType === 'Medical' ? 100 : doctorType === 'Psychiatrist' ? 250 : 500;
    if (finances.cashBalance < cost) {
      return { success: false, msg: `You need ${formatCurrency(cost)} to visit this doctor.` };
    }

    const nextFinances = { ...finances, cashBalance: finances.cashBalance - cost };
    const nextLog = [...log];
    const nextDiseases = [...diseases];
    const nextStats = { ...stats };

    // Alternative Doctor flat 20% on non-Addiction conditions
    if (doctorType === 'Alternative') {
      if (targetDisease.type === 'Addiction') {
        return { success: false, msg: 'Alternative medicine cannot cure addictive behaviors.' };
      }
      const success = Math.random() < 0.20;
      if (success) {
        set({
          finances: nextFinances,
          diseases: nextDiseases.filter(d => d.id !== diseaseId),
          stats: {
            ...nextStats,
            health: clamp(nextStats.health + 10, 0, 100),
            happiness: clamp(nextStats.happiness + 15, 0, 100)
          },
          log: [...nextLog, `Age ${characterInfo.age}: Your Alternative Healer successfully cured your ${targetDisease.name}! (+10 Health, +15 Happiness)`]
        });
        return { success: true, msg: `Success! The alternative healer's energy clearing successfully cured your ${targetDisease.name}!` };
      } else {
        set({
          finances: nextFinances,
          stats: {
            ...nextStats,
            happiness: clamp(nextStats.happiness - 5, 0, 100)
          },
          log: [...nextLog, `Age ${characterInfo.age}: You visited an Alternative Healer for ${targetDisease.name}, but the therapy was ineffective.`]
        });
        return { success: false, msg: `The alternative therapy was unsuccessful and your ${targetDisease.name} persists.` };
      }
    }

    // Psychiatrist targets Mental illnesses
    if (doctorType === 'Psychiatrist') {
      if (targetDisease.type !== 'Mental') {
        return { success: false, msg: 'Psychiatrists only treat clinical Mental illnesses.' };
      }
      // Success rates: Easy: 80%, Medium: 50%, Hard: 20%, Incurable: 0%
      let rate = 0;
      if (targetDisease.cureDifficulty === 'Easy') rate = 0.80;
      else if (targetDisease.cureDifficulty === 'Medium') rate = 0.50;
      else if (targetDisease.cureDifficulty === 'Hard') rate = 0.20;

      const success = Math.random() < rate;
      if (success) {
        set({
          finances: nextFinances,
          diseases: nextDiseases.filter(d => d.id !== diseaseId),
          stats: {
            ...nextStats,
            health: clamp(nextStats.health + 5, 0, 100),
            happiness: clamp(nextStats.happiness + 20, 0, 100)
          },
          log: [...nextLog, `Age ${characterInfo.age}: Your Psychiatrist cured your ${targetDisease.name} with cognitive therapy! (+20 Happiness, +5 Health)`]
        });
        return { success: true, msg: `Success! Your clinical psychiatrist successfully cured your ${targetDisease.name}!` };
      } else {
        set({
          finances: nextFinances,
          stats: {
            ...nextStats,
            happiness: clamp(nextStats.happiness - 10, 0, 100)
          },
          log: [...nextLog, `Age ${characterInfo.age}: You had a psychiatry session for ${targetDisease.name}, but did not make a breakthrough.`]
        });
        return { success: false, msg: `Your session was ineffective, and your ${targetDisease.name} remains.` };
      }
    }

    // Medical Doctor targets Infectious & Chronic
    if (doctorType === 'Medical') {
      if (targetDisease.type === 'Mental') {
        return { success: false, msg: 'Medical doctors advise seeing a Psychiatrist for mental illnesses.' };
      }
      if (targetDisease.type === 'Addiction') {
        return { success: false, msg: 'Medical doctors recommend checking into a specialized Rehab Center to treat addictions.' };
      }

      // Success rates: Easy: 90%, Medium: 60%, Hard: 30%, Incurable: 0%
      let rate = 0;
      if (targetDisease.cureDifficulty === 'Easy') rate = 0.90;
      else if (targetDisease.cureDifficulty === 'Medium') rate = 0.60;
      else if (targetDisease.cureDifficulty === 'Hard') rate = 0.30;

      const success = Math.random() < rate;
      if (success) {
        set({
          finances: nextFinances,
          diseases: nextDiseases.filter(d => d.id !== diseaseId),
          stats: {
            ...nextStats,
            health: clamp(nextStats.health + 15, 0, 100),
            happiness: clamp(nextStats.happiness + 10, 0, 100)
          },
          log: [...nextLog, `Age ${characterInfo.age}: Dr. Sterling successfully cured your ${targetDisease.name}! (+15 Health, +10 Happiness)`]
        });
        return { success: true, msg: `Success! Dr. Sterling successfully diagnosed and cured your ${targetDisease.name}!` };
      } else {
        set({
          finances: nextFinances,
          stats: {
            ...nextStats,
            health: clamp(nextStats.health - 5, 0, 100)
          },
          log: [...nextLog, `Age ${characterInfo.age}: You visited Dr. Sterling for ${targetDisease.name} but the prescription was ineffective.`]
        });
        return { success: false, msg: `The treatment failed. Your ${targetDisease.name} persists.` };
      }
    }

    return { success: false, msg: 'Unsupported clinician' };
  },

  gotoRehab: () => {
    const { characterInfo, finances, stats, log, diseases = [] } = get();
    if (!characterInfo || !finances || !stats || characterInfo.isDead) {
      return { success: false, msg: 'No active character' };
    }

    const addiction = diseases.find(d => d.type === 'Addiction');
    if (!addiction) {
      return { success: false, msg: 'You do not have any active addictions to treat!' };
    }

    const cost = 5000;
    if (finances.cashBalance < cost) {
      return { success: false, msg: `Rehab is highly specialized. It costs ${formatCurrency(cost)} to admit yourself.` };
    }

    const nextFinances = { ...finances, cashBalance: finances.cashBalance - cost };
    const nextLog = [...log];
    const nextStats = { ...stats };
    const nextDiseases = [...diseases];

    const success = Math.random() < 0.65;
    if (success) {
      // Remove all active addictions
      const filteredDiseases = nextDiseases.filter(d => d.type !== 'Addiction');
      set({
        finances: nextFinances,
        diseases: filteredDiseases,
        stats: {
          ...nextStats,
          health: clamp(nextStats.health + 20, 0, 100),
          happiness: clamp(nextStats.happiness + 20, 0, 100),
          stress: clamp(nextStats.stress - 30, 0, 100)
        },
        log: [...nextLog, `Age ${characterInfo.age}: You successfully completed 30 days of clean living in Rehab. You are sober! (+20 Health, +20 Happiness)`]
      });
      return { success: true, msg: 'Success! You successfully graduated from Rehab and cleared all substance and gamified addictions.' };
    } else {
      set({
        finances: nextFinances,
        stats: {
          ...nextStats,
          happiness: clamp(nextStats.happiness - 15, 0, 100),
          stress: clamp(nextStats.stress + 10, 0, 100)
        },
        log: [...nextLog, `Age ${characterInfo.age}: You completed rehab but unfortunately relapsed within weeks.`]
      });
      return { success: false, msg: 'Relapse! Despite your best efforts, you relapsed shortly after discharge. Your addictions persist.' };
    }
  },

  restartGame: () => {
    get().initializeCharacter();
  },
}));

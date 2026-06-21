/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CharacterInfo {
  firstName: string;
  lastName: string;
  age: number;
  gender: 'Male' | 'Female';
  country: string;
  hasLicense: boolean;
  isDead: boolean;
  deathReason?: string;
  currentOccupation: string;
}

export interface Stats {
  happiness: number;
  health: number;
  smarts: number;
  looks: number;
  karma: number;
  stress: number; // 0-100 tracking Academic or Work pressure
}

export interface Education {
  currentStage: 'None' | 'Primary School' | 'Middle School' | 'High School' | 'University' | 'Graduate School' | 'Dropped Out';
  currentMajor: string | null;
  highestDegreeEarned: 'None' | 'High School Diploma' | 'Undergraduate Degree' | 'Law Degree' | 'Medical Degree' | 'MBA';
  grades: number; // 0-100
  yearsRemaining?: number;
  fundingType?: 'Scholarship' | 'Parents' | 'Loan' | null;
}

export interface Finances {
  cashBalance: number;
  annualSalary: number;
  annualDebt: number;
}

export interface Asset {
  id: string;
  name: string;
  type: 'vehicle' | 'real_estate' | 'other';
  purchasePrice: number;
  currentValue: number;
  annualUpkeep: number;
  isFinanced: boolean;
  loanDetails: {
    principalRemaining: number;
    annualPayment: number;
    yearsRemaining: number;
  } | null;
  subtype?: 'Trailer' | 'Suburban House' | 'Ranch' | 'Modern Condo' | 'Haunted Mansion' | 'Ring' | 'Earrings' | 'Handbag' | 'Watch';
  category?: 'Commuter' | 'SUV' | 'Sports' | 'Exotic' | 'Jewelry';
  condition?: number; // 0-100% controls annual value drift or general wear/tear
  address?: string;
  carat?: number;
  isFake?: boolean;
}

export interface NPC {
  id: string;
  name: string;
  relationshipType: 'Parent' | 'Sibling' | 'Partner' | 'Child';
  relationshipValue: number; // 0-100
  generosity: number; // 0-100
  money: number; // 0-100
  isDead: boolean;
  age: number;
  looks?: number; // 0-100 for partners
  smarts?: number; // 0-100 for partners
  isFiancee?: boolean; // For tracking engagement status
  hasPrenup?: boolean; // For prenup tracking per partner
}

export interface Disease {
  id: string;
  name: string;
  type: 'Infectious' | 'Mental' | 'Chronic' | 'Addiction';
  healthDrainPerYear: number;
  happinessDrainPerYear: number;
  cureDifficulty: 'Easy' | 'Medium' | 'Hard' | 'Incurable';
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  closeness: number;
  health: number;
  happiness: number;
  craziness: number;
  age: number;
}

export interface Weapon {
  id: string;
  name: string;
  lethality: number; // 0-100%
  isIllegal: boolean;
}

export interface JobListing {
  title: string;
  salary: number;
  minSmarts: number;
  minHealth: number;
  requiredDegree?: 'None' | 'High School Diploma' | 'Undergraduate Degree' | 'Law Degree' | 'Medical Degree' | 'MBA';
  requiredMajor?: string;
  degreeDescription?: string;
}

export interface MarketPet {
  id: string;
  breed: string;
  species: string;
  cost: number;
  source: 'shelter' | 'breeder' | 'exotic';
  condition?: number; // represents health percentage
  craziness: number;
  arrestProbability?: number; // for exotic smuggler entries
}

export interface PropertyListing {
  id: string;
  name: string;
  purchasePrice: number;
  annualUpkeep: number;
  subtype: 'Trailer' | 'Suburban House' | 'Ranch' | 'Modern Condo' | 'Haunted Mansion';
  address: string;
  condition: number;
}

export interface VehicleListing {
  id: string;
  name: string;
  purchasePrice: number;
  annualUpkeep: number;
  category: 'Commuter' | 'SUV' | 'Sports' | 'Exotic';
  condition: number;
}

export interface CharacterState {
  characterInfo: CharacterInfo;
  stats: Stats;
  finances: Finances;
  assets: Asset[];
  relationships: NPC[];
  pets: Pet[];
  weapons: Weapon[];
  maritalStatus: 'Single' | 'Dating' | 'Married';
  education: Education;
  criminalRecord: string[];
  prisonSentence: { remainingYears: number, securityLevel: 'Minimum' | 'Medium' | 'Maximum' } | null;
  diseases: Disease[];
  courtTrial?: {
    crimeType: 'shoplift' | 'grand_theft_auto' | 'bank_robbery' | 'shoplift_candy' | 'vandalize_walls' | 'pickpocket_classmates';
    charges: string;
    sentenceOffer: number;
  } | null;
  log: string[];
  annualActionsPerformed?: string[];
  seenEventIds?: string[];
  geneticBaselines?: {
    smartsBaseline: number;
    looksBaseline: number;
    healthBaseline: number;
  };
  consistencyStreaks?: {
    gymStreak: number;
    libraryStreak: number;
  };
  availableJobs: JobListing[];
  availablePets: MarketPet[];
  availableRealEstate: PropertyListing[];
  availableVehicles: VehicleListing[];
}

export interface Choice {
  choiceText: string;
  outcomeText: string;
  effect: (state: CharacterState) => void;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  category: 'Childhood' | 'School' | 'Adulthood' | 'Special';
  condition: (state: CharacterState) => boolean;
  choices: Choice[];
}

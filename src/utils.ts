/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CharacterState } from './types';

export function clamp(value: number, min: number = 0, max: number = 100): number {
  return Math.min(Math.max(value, min), max);
}

export function getPercentageMultiplier(val: number): number {
  if (val > 0) {
    if (val <= 10) {
      return 1.0 + (val * 0.001); // Micro-actions, e.g., val = 5 => +0.5% shift
    } else if (val <= 25) {
      return 1.0 + (val * 0.004); // Major actions, e.g., val = 15 => +6.0% shift (+3% to +8%)
    } else {
      return 3.5; // Life-altering positive events, e.g., winning lottery => +250% shift
    }
  } else if (val < 0) {
    if (val >= -10) {
      return 1.0 + (val * 0.001); // Micro-actions, e.g., val = -10 => -1.0% shift
    } else if (val >= -25) {
      return 1.0 + (val * 0.004); // Major actions, e.g., val = -15 => -6.0% shift (-3% to -8%)
    } else {
      return 0.35; // Life-altering negative events, e.g., prison/terminal illness => -65% shift (-50% to -80%)
    }
  }
  return 1.0;
}

export function adjustStats(
  state: CharacterState,
  adjustments: {
    happiness?: number;
    health?: number;
    smarts?: number;
    looks?: number;
    karma?: number;
    stress?: number;
  }
) {
  const keys: Array<'happiness' | 'health' | 'smarts' | 'looks' | 'karma' | 'stress'> = [
    'happiness', 'health', 'smarts', 'looks', 'karma', 'stress'
  ];

  keys.forEach(key => {
    const adjVal = adjustments[key];
    if (adjVal !== undefined && adjVal !== 0) {
      const currentVal = state.stats[key];
      const mult = getPercentageMultiplier(adjVal);
      let finalMult = mult;
      if (key === 'looks' && adjVal > 0) {
        if (state.geneticBaselines && state.geneticBaselines.looksBaseline < 40) {
          if (mult > 1.0) {
            finalMult = 1.0 + (mult - 1.0) * 0.4; // suppressed by 60%
          }
        }
      }
      const changePercentage = (finalMult - 1) * 100;
      const newValue = currentVal * (1 + (changePercentage / 100));
      console.log(`Stat: ${key} | Old: ${currentVal} | Change: ${changePercentage}% | Calculated New Float: ${newValue}`);
      state.stats[key] = Math.max(0, Math.min(100, newValue));
    }
  });
}

export function formatCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
  return amount >= 0 ? formatter.format(amount) : `-${formatter.format(Math.abs(amount))}`;
}

export interface CountryDetail {
  name: string;
  incomeTaxRate: number; // e.g., 0.18, 0.35, 0.00
  estateTaxRate: number; // e.g., 0.10, 0.40, 0.00
  healthcareBonus: number; // e.g., +5 health drift, -5 health drift
  startingHappinessBonus: number; // e.g., +10
  description: string;
}

export const COUNTRY_DETAILS: Record<string, CountryDetail> = {
  'United States': { name: 'United States', incomeTaxRate: 0.22, estateTaxRate: 0.12, healthcareBonus: 0, startingHappinessBonus: 5, description: 'High career income potential, but moderate healthcare & middle-tier taxes.' },
  'United Kingdom': { name: 'United Kingdom', incomeTaxRate: 0.25, estateTaxRate: 0.15, healthcareBonus: 3, startingHappinessBonus: 2, description: 'Historic scenery and strong public healthcare. Moderate income tax.' },
  'Canada': { name: 'Canada', incomeTaxRate: 0.24, estateTaxRate: 0.00, healthcareBonus: 4, startingHappinessBonus: 8, description: 'Very high happiness, magnificent public health services, and $0 estate tax.' },
  'Australia': { name: 'Australia', incomeTaxRate: 0.23, estateTaxRate: 0.00, healthcareBonus: 3, startingHappinessBonus: 7, description: 'Sun, beaches, great quality of life, and penalty-free inheritance.' },
  'Germany': { name: 'Germany', incomeTaxRate: 0.28, estateTaxRate: 0.15, healthcareBonus: 5, startingHappinessBonus: 1, description: 'Sovereign financial system, exceptional work-life balance, and strong social netting.' },
  'Japan': { name: 'Japan', incomeTaxRate: 0.30, estateTaxRate: 0.45, healthcareBonus: 8, startingHappinessBonus: -2, description: 'Exceptional average life expectancy (+8 Health bonus), but 45% inheritance taxes.' },
  'Brazil': { name: 'Brazil', incomeTaxRate: 0.18, estateTaxRate: 0.08, healthcareBonus: -2, startingHappinessBonus: 10, description: 'Unmatched cultural vibrance and happy temperaments. Moderate tax rates.' },
  'South Africa': { name: 'South Africa', incomeTaxRate: 0.20, estateTaxRate: 0.10, healthcareBonus: -4, startingHappinessBonus: 4, description: 'Diverse demographics, beautiful landscapes, and a fast-paced economy.' },
  'Sweden': { name: 'Sweden', incomeTaxRate: 0.38, estateTaxRate: 0.00, healthcareBonus: 6, startingHappinessBonus: 9, description: 'Highest income tax bracket (38%) but exceptional standard of living and no inheritance tax.' },
  'South Korea': { name: 'South Korea', incomeTaxRate: 0.26, estateTaxRate: 0.40, healthcareBonus: 5, startingHappinessBonus: -4, description: 'Cutting-edge tech, ultra-competitive educational system, and steep estate tax.' },
  'India': { name: 'India', incomeTaxRate: 0.15, estateTaxRate: 0.00, healthcareBonus: -3, startingHappinessBonus: 6, description: 'Rapidly expanding market, diverse cultures, low tax rates, and no inheritance taxes.' },
  'France': { name: 'France', incomeTaxRate: 0.30, estateTaxRate: 0.20, healthcareBonus: 4, startingHappinessBonus: 3, description: 'Superior cuisine, state healthcare support, high focus on cultural arts.' },
  'Monaco': { name: 'Monaco', incomeTaxRate: 0.00, estateTaxRate: 0.00, healthcareBonus: 7, startingHappinessBonus: 12, description: 'Glorious Mediterranean tax haven. 0% income tax, 0% inheritance, and luxury living.' },
  'Bahamas': { name: 'Bahamas', incomeTaxRate: 0.00, estateTaxRate: 0.00, healthcareBonus: 1, startingHappinessBonus: 10, description: 'Caribbean tropical paradise. Absolute tax-free haven with magnificent weather.' },
  'Switzerland': { name: 'Switzerland', incomeTaxRate: 0.12, estateTaxRate: 0.05, healthcareBonus: 7, startingHappinessBonus: 11, description: 'Highly stable economy, immaculate health systems, low income tax, and high luxury.' }
};

export const COUNTRIES = Object.keys(COUNTRY_DETAILS);

export const MALE_FIRST_NAMES = [
  'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph',
  'Thomas', 'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark',
  'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua', 'Kevin', 'Brian', 'Edward',
  'Liam', 'Noah', 'Oliver', 'Elijah', 'Benjamin', 'Lucas', 'Henry', 'Alexander',
  'Mason', 'Ethan', 'Jacob', 'Logan', 'Jackson', 'Levi', 'Sebastian', 'Mateo',
  'Jack', 'Owen', 'Theodore', 'Aiden', 'Kenji', 'Sanjay', 'Anders', 'Yusuf',
  'Jean', 'Hans', 'Alejandro', 'Dmitry', 'Min-ho', 'Gilles', 'Mateo', 'Zayn'
];

export const FEMALE_FIRST_NAMES = [
  'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan',
  'Jessica', 'Sarah', 'Karen', 'Lisa', 'Nancy', 'Betty', 'Sandra', 'Margaret',
  'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle', 'Carol', 'Amanda', 'Dorothy',
  'Olivia', 'Emma', 'Charlotte', 'Amelia', 'Ava', 'Sophia', 'Isabella', 'Mia',
  'Evelyn', 'Harper', 'Luna', 'Camila', 'Gianna', 'Eleanor', 'Ella', 'Abigail',
  'Sofia', 'Avery', 'Scarlett', 'Aria', 'Penelope', 'Chloe', 'Sakura', 'Aanya',
  'Astrid', 'Fatima', 'Chantal', 'Anke', 'Gabriela', 'Elena', 'Ji-won', 'Clara'
];

export const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
  'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
  'Sato', 'Tanaka', 'Patel', 'Sharma', 'Johansson', 'Müller', 'Dubois', 'Silva',
  'Kim', 'Park', 'Kowalski', 'Novak', 'Rossi', 'Bianchi', 'O\'Connor', 'Murphy'
];

export interface Occupation {
  title: string;
  salary: number;
  minSmarts: number;
  minHealth: number;
  requiredDegree?: 'None' | 'High School Diploma' | 'Undergraduate Degree' | 'Law Degree' | 'Medical Degree' | 'MBA';
  requiredMajor?: string;
  degreeDescription?: string;
}

export const OCCUPATIONS: Occupation[] = [
  { 
    title: 'Apprentice Plumber', 
    salary: 28000, 
    minSmarts: 20, 
    minHealth: 50, 
    requiredDegree: 'High School Diploma',
    degreeDescription: 'High School Diploma (or lower)'
  },
  { 
    title: 'Uber Driver', 
    salary: 32000, 
    minSmarts: 10, 
    minHealth: 40,
    requiredDegree: 'High School Diploma',
    degreeDescription: 'High School Diploma (or lower)'
  },
  { 
    title: 'Social Media Intern', 
    salary: 35000, 
    minSmarts: 40, 
    minHealth: 30,
    requiredDegree: 'High School Diploma',
    degreeDescription: 'High School Diploma'
  },
  { 
    title: 'Junior Software Engineer', 
    salary: 75000, 
    minSmarts: 70, 
    minHealth: 30,
    requiredDegree: 'Undergraduate Degree',
    requiredMajor: 'Computer Science',
    degreeDescription: 'Undergraduate in Computer Science'
  },
  { 
    title: 'Financial Analyst', 
    salary: 82000, 
    minSmarts: 65, 
    minHealth: 35,
    requiredDegree: 'Undergraduate Degree',
    requiredMajor: 'Finance',
    degreeDescription: 'Undergraduate Degree in Finance or MBA'
  },
  { 
    title: 'High School Teacher', 
    salary: 52000, 
    minSmarts: 55, 
    minHealth: 40,
    requiredDegree: 'Undergraduate Degree',
    degreeDescription: 'Any Undergraduate Degree'
  },
  { 
    title: 'Graphic Designer', 
    salary: 48000, 
    minSmarts: 50, 
    minHealth: 30,
    requiredDegree: 'High School Diploma',
    degreeDescription: 'High School Diploma'
  },
  { 
    title: 'Executive Chef', 
    salary: 65000, 
    minSmarts: 45, 
    minHealth: 60,
    requiredDegree: 'High School Diploma',
    degreeDescription: 'High School Diploma'
  },
  { 
    title: 'Registered Nurse', 
    salary: 72000, 
    minSmarts: 60, 
    minHealth: 55,
    requiredDegree: 'Undergraduate Degree',
    requiredMajor: 'Biology',
    degreeDescription: 'Undergraduate in Biology (Pre-Med track)'
  },
  { 
    title: 'Plastic Surgeon', 
    salary: 280000, 
    minSmarts: 85, 
    minHealth: 60,
    requiredDegree: 'Medical Degree',
    degreeDescription: 'Medical Degree'
  },
  { 
    title: 'Corporate Attorney', 
    salary: 195000, 
    minSmarts: 80, 
    minHealth: 40,
    requiredDegree: 'Law Degree',
    degreeDescription: 'Law Degree'
  },
  { 
    title: 'CEO of Tech Startup', 
    salary: 450050, 
    minSmarts: 85, 
    minHealth: 45,
    requiredDegree: 'MBA',
    degreeDescription: 'MBA or Undergraduate in Finance'
  },
];

// Context-aware listing generators templates

const VEHICLE_TEMPLATES = [
  { name: 'Toyota Corolla', category: 'Commuter' as const, basePrice: 12000, baseUpkeep: 600 },
  { name: 'Honda Civic', category: 'Commuter' as const, basePrice: 14000, baseUpkeep: 650 },
  { name: 'Ford F-150', category: 'SUV' as const, basePrice: 28000, baseUpkeep: 1500 },
  { name: 'Jeep Grand Cherokee', category: 'SUV' as const, basePrice: 35000, baseUpkeep: 1800 },
  { name: 'Mazda MX-5 Miata', category: 'Sports' as const, basePrice: 32000, baseUpkeep: 2000 },
  { name: 'Subaru WRX STI', category: 'Sports' as const, basePrice: 38000, baseUpkeep: 2400 },
  { name: 'Porsche 911 Turbo', category: 'Exotic' as const, basePrice: 160000, baseUpkeep: 8000 },
  { name: 'Ferrari SF90 Stradale', category: 'Exotic' as const, basePrice: 510000, baseUpkeep: 22000 },
  { name: 'Lamborghini Aventador', category: 'Exotic' as const, basePrice: 420000, baseUpkeep: 18000 },
  { name: 'Rusty Chevrolet Beater', category: 'Commuter' as const, basePrice: 1500, baseUpkeep: 200 },
  { name: 'Dodge Ram Pick-up', category: 'SUV' as const, basePrice: 24000, baseUpkeep: 1300 },
  { name: 'Tesla Model S Plaid', category: 'Exotic' as const, basePrice: 95000, baseUpkeep: 3500 }
];

const PROPERTY_TEMPLATES = [
  { name: 'Suburban Starter Studio', subtype: 'Modern Condo' as const, basePrice: 55000, baseUpkeep: 1200 },
  { name: 'Trailer Park Double-Wide', subtype: 'Trailer' as const, basePrice: 18000, baseUpkeep: 800 },
  { name: 'Retro Lakeside Townhouse', subtype: 'Modern Condo' as const, basePrice: 110000, baseUpkeep: 2450 },
  { name: 'Lakeside Family Townhouse', subtype: 'Modern Condo' as const, basePrice: 185000, baseUpkeep: 3400 },
  { name: 'Suburban Craftsman House', subtype: 'Suburban House' as const, basePrice: 240000, baseUpkeep: 4200 },
  { name: 'Contemporary Beachside Villa', subtype: 'Ranch' as const, basePrice: 750000, baseUpkeep: 12000 },
  { name: 'High-Rise Luxury Penthouse', subtype: 'Modern Condo' as const, basePrice: 420000, baseUpkeep: 7200 },
  { name: 'Historic Mountain Ranch', subtype: 'Ranch' as const, basePrice: 850000, baseUpkeep: 14000 },
  { name: 'Gothic Sovereign Castle', subtype: 'Haunted Mansion' as const, basePrice: 3200000, baseUpkeep: 55000 },
  { name: 'Spooky Abandoned Estate', subtype: 'Haunted Mansion' as const, basePrice: 1250000, baseUpkeep: 30000 }
];

const ADDRESS_STREETS = [
  'Elm Wood Lane', 'Whispering Pines Way', 'Sapphire Rise', 'Old Pioneer Trail', 'Sovereign Keep',
  'Cedar Hollow', 'Ocean Crest Blvd', 'Maplewood Court', 'Summit Ridge Road', 'Orchard Terrace'
];

const SHELTER_PETS = [
  { breed: 'Mutt', species: 'Dog', minCost: 50, maxCost: 150 },
  { breed: 'Alley Cat', species: 'Cat', minCost: 30, maxCost: 100 },
  { breed: 'Dutch Rabbit', species: 'Rabbit', minCost: 20, maxCost: 60 },
  { breed: 'Stray Terrier', species: 'Dog', minCost: 80, maxCost: 200 },
  { breed: 'Siamese Cross', species: 'Cat', minCost: 100, maxCost: 250 },
  { breed: 'Guinea Pig', species: 'Rodent', minCost: 15, maxCost: 40 },
  { breed: 'Common Hamster', species: 'Rodent', minCost: 10, maxCost: 30 }
];

const BREEDER_PETS = [
  { breed: 'Siamese Cat', species: 'Cat', minCost: 800, maxCost: 1200 },
  { breed: 'Golden Retriever', species: 'Dog', minCost: 1200, maxCost: 2000 },
  { breed: 'German Shepherd', species: 'Dog', minCost: 1500, maxCost: 2500 },
  { breed: 'Persian Cat', species: 'Cat', minCost: 1000, maxCost: 1800 },
  { breed: 'Arabian Stallion', species: 'Horse', minCost: 3500, maxCost: 6000 },
  { breed: 'French Bulldog', species: 'Dog', minCost: 2000, maxCost: 3500 }
];

const EXOTIC_PETS = [
  { breed: 'Bengal Tiger Cub', species: 'Tiger', minCost: 12000, maxCost: 25000, arrestProb: 0.25 },
  { breed: 'Spotted Cheetah', species: 'Cheetah', minCost: 15000, maxCost: 30000, arrestProb: 0.30 },
  { breed: 'Silverback Gorilla', species: 'Gorilla', minCost: 25000, maxCost: 50000, arrestProb: 0.35 },
  { breed: 'Capuchin Monkey', species: 'Monkey', minCost: 8000, maxCost: 15000, arrestProb: 0.15 },
  { breed: 'King Cobra', species: 'Snake', minCost: 4000, maxCost: 9000, arrestProb: 0.20 },
  { breed: 'Komodo Dragon', species: 'Lizard', minCost: 10000, maxCost: 20000, arrestProb: 0.25 }
];

// Generators

import { JobListing, MarketPet, PropertyListing, VehicleListing } from './types';

export function generateJobListings(
  education: { highestDegreeEarned: string } | null
): JobListing[] {
  const hasHighDegree = education && ['Law Degree', 'Medical Degree', 'MBA'].includes(education.highestDegreeEarned);

  let filtered = OCCUPATIONS.filter(job => {
    if (hasHighDegree) {
      if (['Apprentice Plumber', 'Uber Driver', 'Social Media Intern'].includes(job.title)) {
        return false;
      }
    }
    return true;
  });

  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 6).map(job => ({
    ...job,
    salary: Math.round(job.salary * (0.9 + Math.random() * 0.2))
  }));
}

export function generateVehicleListings(cashBalance: number, annualSalary: number): VehicleListing[] {
  let templates = [...VEHICLE_TEMPLATES];
  
  const isLowTier = cashBalance < 15000 && annualSalary < 40000;
  const isHighTier = cashBalance >= 80000 || annualSalary >= 100000;

  if (isLowTier) {
    templates = templates.filter(t => t.basePrice < 40000 && t.category !== 'Exotic');
  } else if (isHighTier) {
    templates = templates.filter(t => t.basePrice >= 20000);
  } else {
    templates = templates.filter(t => t.basePrice < 150000);
  }

  const shuffled = templates.sort(() => 0.5 - Math.random()).slice(0, 4);

  return shuffled.map((temp) => {
    const condition = Math.floor(Math.random() * 81) + 20; // 20% to 100%
    const conditionFactor = 0.5 + (condition / 100) * 0.5;
    const finalPrice = Math.round(temp.basePrice * conditionFactor);
    const finalUpkeep = Math.round(temp.baseUpkeep * (1.2 - (condition / 100) * 0.4));

    return {
      id: `vehicle-listing-${Math.random()}`,
      name: `${condition < 50 ? 'Used' : 'Certified'} ${temp.name}`,
      purchasePrice: finalPrice,
      annualUpkeep: finalUpkeep,
      category: temp.category,
      condition
    };
  });
}

export function generateRealEstateListings(cashBalance: number, annualSalary: number): PropertyListing[] {
  let templates = [...PROPERTY_TEMPLATES];

  const isLowTier = cashBalance < 35000 && annualSalary < 45000;
  const isHighTier = cashBalance >= 150000 || annualSalary >= 150000;

  if (isLowTier) {
    templates = templates.filter(t => t.basePrice < 120000);
  } else if (isHighTier) {
    templates = templates.filter(t => t.basePrice >= 200000);
  } else {
    templates = templates.filter(t => t.basePrice >= 50000 && t.basePrice < 1000000);
  }

  const shuffled = templates.sort(() => 0.5 - Math.random()).slice(0, 4);

  return shuffled.map((temp) => {
    const condition = Math.floor(Math.random() * 71) + 30; // 30% to 100%
    const conditionFactor = 0.6 + (condition / 100) * 0.4;
    const finalPrice = Math.round(temp.basePrice * conditionFactor);
    const finalUpkeep = Math.round(temp.baseUpkeep * (1.1 - (condition / 100) * 0.2));

    const streetNum = Math.floor(Math.random() * 300) + 1;
    const streetName = ADDRESS_STREETS[Math.floor(Math.random() * ADDRESS_STREETS.length)];
    const address = `${streetNum} ${streetName}`;

    return {
      id: `estate-listing-${Math.random()}`,
      name: temp.name,
      purchasePrice: finalPrice,
      annualUpkeep: finalUpkeep,
      subtype: temp.subtype,
      address,
      condition
    };
  });
}

export function generatePetListings(): MarketPet[] {
  const listings: MarketPet[] = [];

  const shelterShuffled = [...SHELTER_PETS].sort(() => 0.5 - Math.random()).slice(0, 4);
  shelterShuffled.forEach((p, idx) => {
    listings.push({
      id: `pet-shelter-${idx}-${Math.random()}`,
      breed: p.breed,
      species: p.species,
      cost: Math.floor(Math.random() * (p.maxCost - p.minCost + 1)) + p.minCost,
      source: 'shelter',
      condition: Math.floor(Math.random() * 51) + 40,
      craziness: Math.floor(Math.random() * 81)
    });
  });

  const breederShuffled = [...BREEDER_PETS].sort(() => 0.5 - Math.random()).slice(0, 3);
  breederShuffled.forEach((p, idx) => {
    listings.push({
      id: `pet-breeder-${idx}-${Math.random()}`,
      breed: p.breed,
      species: p.species,
      cost: Math.floor(Math.random() * (p.maxCost - p.minCost + 1)) + p.minCost,
      source: 'breeder',
      condition: Math.floor(Math.random() * 11) + 90,
      craziness: Math.floor(Math.random() * 41)
    });
  });

  const exoticShuffled = [...EXOTIC_PETS].sort(() => 0.5 - Math.random()).slice(0, 3);
  exoticShuffled.forEach((p, idx) => {
    listings.push({
      id: `pet-exotic-${idx}-${Math.random()}`,
      breed: p.breed,
      species: p.species,
      cost: Math.floor(Math.random() * (p.maxCost - p.minCost + 1)) + p.minCost,
      source: 'exotic',
      condition: Math.floor(Math.random() * 41) + 60,
      craziness: Math.floor(Math.random() * 41) + 60,
      arrestProbability: p.arrestProb
    });
  });

  return listings;
}

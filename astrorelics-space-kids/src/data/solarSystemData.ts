export interface PlanetData {
  id: string;
  name: string;
  tagline: string;
  type: 'Sun' | 'Terrestrial Planet' | 'Gas Giant' | 'Moon';
  orbitRadius: number;
  orbitPeriod: number; // seconds for complete cycle in visual simulation
  size: number; // visual radius
  color: string;
  glowColor: string;
  surfaceTextureType: 'sun' | 'rock' | 'earth' | 'moon' | 'mars' | 'jupiter' | 'saturn';
  hasRings?: boolean;
  ringsRadius?: number;
  funFact: string;
  distanceFromSun: string;
  dayLength: string;
  yearLength: string;
  machineCount: number;
  hoverPrompt?: string;
}

export const SOLAR_PLANETS: PlanetData[] = [
  {
    id: "sun",
    name: "Sun",
    tagline: "Our Blazing Star",
    type: "Sun",
    orbitRadius: 0,
    orbitPeriod: 0,
    size: 52,
    color: "#FBBF24",
    glowColor: "rgba(251, 191, 36, 0.8)",
    surfaceTextureType: "sun",
    funFact: "The Sun is so huge you could pack 1.3 million Earths inside it! It provides light and warmth for our entire solar system.",
    distanceFromSun: "0 km (Center)",
    dayLength: "27 Earth days",
    yearLength: "230 million years",
    machineCount: 4,
    hoverPrompt: "The heart of our solar system!"
  },
  {
    id: "mercury",
    name: "Mercury",
    tagline: "The Swift Messenger",
    type: "Terrestrial Planet",
    orbitRadius: 85,
    orbitPeriod: 22,
    size: 9,
    color: "#94A3B8",
    glowColor: "rgba(148, 163, 184, 0.4)",
    surfaceTextureType: "rock",
    funFact: "During the day it is hot enough to melt lead (+430°C), but at night it drops to -180°C because there is no atmosphere!",
    distanceFromSun: "58 million km",
    dayLength: "59 Earth days",
    yearLength: "88 Earth days",
    machineCount: 2,
    hoverPrompt: "Closest planet to the Sun!"
  },
  {
    id: "venus",
    name: "Venus",
    tagline: "The Greenhouse Oven",
    type: "Terrestrial Planet",
    orbitRadius: 125,
    orbitPeriod: 35,
    size: 15,
    color: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.4)",
    surfaceTextureType: "rock",
    funFact: "Venus spins backward compared to most other planets, and its thick clouds rain sulfuric acid!",
    distanceFromSun: "108 million km",
    dayLength: "243 Earth days",
    yearLength: "225 Earth days",
    machineCount: 8,
    hoverPrompt: "Hottest planet in the solar system!"
  },
  {
    id: "earth",
    name: "Earth & Moon",
    tagline: "Our Blue Home Planet",
    type: "Terrestrial Planet",
    orbitRadius: 175,
    orbitPeriod: 48,
    size: 18,
    color: "#3B82F6",
    glowColor: "rgba(59, 130, 246, 0.6)",
    surfaceTextureType: "earth",
    funFact: "The only known planet in the universe with liquid oceans, breathable oxygen, and life!",
    distanceFromSun: "149.6 million km",
    dayLength: "24 hours",
    yearLength: "365.25 days",
    machineCount: 3000,
    hoverPrompt: "Where all these space journeys started!"
  },
  {
    id: "moon",
    name: "The Moon",
    tagline: "Earth's Constant Companion",
    type: "Moon",
    orbitRadius: 198,
    orbitPeriod: 12,
    size: 6,
    color: "#E2E8F0",
    glowColor: "rgba(226, 232, 240, 0.5)",
    surfaceTextureType: "moon",
    funFact: "Footprints left by Apollo astronauts will stay on the Moon for millions of years because there is no wind or rain to blow them away!",
    distanceFromSun: "149.6 million km",
    dayLength: "27.3 Earth days",
    yearLength: "27.3 Earth days",
    machineCount: 70,
    hoverPrompt: "Site of Apollo 11's historic landing!"
  },
  {
    id: "mars",
    name: "Mars",
    tagline: "The Red Planet",
    type: "Terrestrial Planet",
    orbitRadius: 250,
    orbitPeriod: 68,
    size: 16,
    color: "#EF4444",
    glowColor: "rgba(239, 68, 68, 0.8)",
    surfaceTextureType: "mars",
    funFact: "Mars has Olympus Mons, the largest volcano in the entire solar system — three times taller than Mount Everest!",
    distanceFromSun: "228 million km",
    dayLength: "24 hours 39 minutes",
    yearLength: "687 Earth days",
    machineCount: 16,
    hoverPrompt: "Psst... want to explore? 5 spacecraft stories waiting!"
  },
  {
    id: "jupiter",
    name: "Jupiter",
    tagline: "The King of Planets",
    type: "Gas Giant",
    orbitRadius: 330,
    orbitPeriod: 110,
    size: 32,
    color: "#FB923C",
    glowColor: "rgba(251, 146, 60, 0.5)",
    surfaceTextureType: "jupiter",
    funFact: "Jupiter's famous Great Red Spot is a giant spinning hurricane bigger than the entire Earth that has been raging for hundreds of years!",
    distanceFromSun: "778 million km",
    dayLength: "9.9 hours",
    yearLength: "12 Earth years",
    machineCount: 9,
    hoverPrompt: "Visited by Voyager 1 and Voyager 2!"
  },
  {
    id: "saturn",
    name: "Saturn",
    tagline: "The Jewel of the Solar System",
    type: "Gas Giant",
    orbitRadius: 405,
    orbitPeriod: 160,
    size: 26,
    color: "#FDE047",
    glowColor: "rgba(253, 224, 71, 0.5)",
    surfaceTextureType: "saturn",
    hasRings: true,
    ringsRadius: 46,
    funFact: "Saturn's dazzling rings are made of billions of pieces of ice and rock, ranging in size from tiny dust grains to house-sized boulders!",
    distanceFromSun: "1.4 billion km",
    dayLength: "10.7 hours",
    yearLength: "29.5 Earth years",
    machineCount: 4,
    hoverPrompt: "Stunning icy rings!"
  }
];

export interface NasaMissionBadge {
  id: string;
  name: string; // Inspiring cute name
  subtitle: string;
  motto: string;
  spacecraftId?: string;
  category: 'story' | 'quiz' | 'activity' | 'mastery';
  patchShape: 'circle' | 'shield' | 'chevron' | 'hexagon' | 'oval';
  borderStyle: 'gold-thread' | 'silver-thread' | 'cyan-glow' | 'ruby-edge';
  accentColor: string;
  bgGradient: string;
  iconName: string;
  loreDescription: string;
  appreciationMessage: string;
  howToUnlock: string;
  xpReward: number;
}

export const NASA_MISSION_BADGES: NasaMissionBadge[] = [
  {
    id: "badge-opportunity-marathoner",
    name: "The Little Marathoner",
    subtitle: "Opportunity Mars Hero",
    motto: "Endurance & Heart Across the Red Sands",
    spacecraftId: "opportunity",
    category: "story",
    patchShape: "shield",
    borderStyle: "gold-thread",
    accentColor: "#F59E0B",
    bgGradient: "from-amber-950 via-red-950 to-space-void",
    iconName: "Flame",
    loreDescription: "Awarded for completing Opportunity's 14-year, 45-kilometer epic odyssey across Martian craters. You never gave up when the dust blew!",
    appreciationMessage: "Outstanding exploration, Space Explorer! Like Opportunity, you proved that small steps and curiosity can conquer an entire alien world.",
    howToUnlock: "Complete all 11 scenes of the Opportunity Story Experience.",
    xpReward: 350
  },
  {
    id: "badge-apollo-moonwalker",
    name: "First Moonwalker Friend",
    subtitle: "Apollo 11 Tranquility Base",
    motto: "We Came in Peace for All Humankind",
    spacecraftId: "apollo-11-lm",
    category: "story",
    patchShape: "circle",
    borderStyle: "silver-thread",
    accentColor: "#E2E8F0",
    bgGradient: "from-slate-900 via-indigo-950 to-space-void",
    iconName: "Moon",
    loreDescription: "Commemorates the Eagle Lunar Module descent stage resting in the Sea of Tranquility where humanity first stepped onto another celestial body.",
    appreciationMessage: "You walked in the footsteps of heroes! You honor the gentle monument left on the Moon for all humankind to look up and smile at.",
    howToUnlock: "Explore the Apollo 11 Lunar Module and inspect its gold foil landing gear.",
    xpReward: 250
  },
  {
    id: "badge-voyager-interstellar",
    name: "Interstellar Dreamer",
    subtitle: "Voyager 1 Ambassador",
    motto: "Sailing Beyond the Sun into the Stars",
    spacecraftId: "voyager-1",
    category: "story",
    patchShape: "oval",
    borderStyle: "cyan-glow",
    accentColor: "#00F0FF",
    bgGradient: "from-cyan-950 via-blue-950 to-space-void",
    iconName: "Radio",
    loreDescription: "Carries the Golden Record into the silent vastness beyond the heliosphere. Voyager 1 is humankind's farthest ambassador.",
    appreciationMessage: "Your dreams are truly without borders! You carry Earth's music and friendship to the distant stars like Voyager 1.",
    howToUnlock: "Investigate Voyager 1 in the Solar System fleet.",
    xpReward: 300
  },
  {
    id: "badge-voyager2-grandtour",
    name: "Twin Horizon Scout",
    subtitle: "Voyager 2 Grand Tour",
    motto: "The Four-Giant Planetary Pilgrim",
    spacecraftId: "voyager-2",
    category: "story",
    patchShape: "hexagon",
    borderStyle: "cyan-glow",
    accentColor: "#38BDF8",
    bgGradient: "from-sky-950 via-teal-950 to-space-void",
    iconName: "Compass",
    loreDescription: "The only spacecraft to visit all four giant outer planets: Jupiter, Saturn, Uranus, and Neptune!",
    appreciationMessage: "Fearless adventurer! Your eagerness to see worlds no one had ever imagined makes you a true cosmic scout.",
    howToUnlock: "Inspect Voyager 2's magnetometer boom and 12-year grand tour.",
    xpReward: 250
  },
  {
    id: "badge-viking-pioneer",
    name: "Red Planet Pioneer",
    subtitle: "Viking 1 Lander",
    motto: "First Eye to Open on Martian Chryse Planitia",
    spacecraftId: "viking-1",
    category: "story",
    patchShape: "shield",
    borderStyle: "ruby-edge",
    accentColor: "#EF4444",
    bgGradient: "from-rose-950 via-orange-950 to-space-void",
    iconName: "Camera",
    loreDescription: "Honors the 1976 robotic pioneer that sent back the first crystal-clear color photographs of Martian rust and red skies.",
    appreciationMessage: "Pioneer of wonders! You opened your eyes to the unknown and unlocked the very first secret of the Red Planet.",
    howToUnlock: "Explore the Viking 1 lander and soil scoop arm.",
    xpReward: 250
  },
  {
    id: "badge-cassini-ringdancer",
    name: "Lord of the Rings",
    subtitle: "Cassini-Huygens Saturn Explorer",
    motto: "Dancing Through the Icy Rings of Saturn",
    spacecraftId: "cassini",
    category: "story",
    patchShape: "circle",
    borderStyle: "gold-thread",
    accentColor: "#FBBF24",
    bgGradient: "from-amber-950 via-yellow-950 to-space-void",
    iconName: "Sparkles",
    loreDescription: "Danced through Saturn's rings for 13 glorious years, tasted water geysers on moon Enceladus, and dropped Huygens onto methane lakes.",
    appreciationMessage: "Majestic Explorer! You have the graceful curiosity of Cassini, dancing across icy worlds and protecting pristine moons.",
    howToUnlock: "Discover Cassini's grand finale plunge into Saturn's golden clouds.",
    xpReward: 300
  },
  {
    id: "badge-spirit-braveheart",
    name: "Brave Spirit Warrior",
    subtitle: "Spirit Rover at Gusev Crater",
    motto: "Turning Obstacles into Triumphs",
    spacecraftId: "spirit",
    category: "story",
    patchShape: "chevron",
    borderStyle: "gold-thread",
    accentColor: "#FB923C",
    bgGradient: "from-orange-950 via-amber-950 to-space-void",
    iconName: "Heart",
    loreDescription: "When Spirit's front wheel jammed, she drove backwards, dragging her wheel to scrape open pure white silica — proving hot springs on ancient Mars!",
    appreciationMessage: "Unstoppable courage! You showed that what looks like a stuck wheel can become your greatest scientific discovery!",
    howToUnlock: "Examine Spirit's heroic reverse-driving journey.",
    xpReward: 250
  },
  {
    id: "badge-curiosity-climber",
    name: "Curious Mountain Detective",
    subtitle: "Curiosity Rover on Mount Sharp",
    motto: "Zapping Martian Rocks with Science and Laser Eyes",
    spacecraftId: "curiosity",
    category: "story",
    patchShape: "hexagon",
    borderStyle: "cyan-glow",
    accentColor: "#A855F7",
    bgGradient: "from-purple-950 via-slate-900 to-space-void",
    iconName: "Search",
    loreDescription: "Climbing Mount Sharp inside Gale Crater, zapping rocks with the ChemCam laser and singing Happy Birthday to herself across space.",
    appreciationMessage: "Inquisitive Genius! Your thirst for knowledge climbs mountains higher than the clouds. Never stop asking 'Why?'!",
    howToUnlock: "Inspect Curiosity's laser spectrometer and wheel tracks.",
    xpReward: 250
  },
  {
    id: "badge-perseverance-aviator",
    name: "Sky Hopper & Seeker",
    subtitle: "Perseverance & Ingenuity Duo",
    motto: "First Wings in Alien Air",
    spacecraftId: "perseverance",
    category: "story",
    patchShape: "chevron",
    borderStyle: "ruby-edge",
    accentColor: "#F43F5E",
    bgGradient: "from-rose-950 via-sky-950 to-space-void",
    iconName: "Wind",
    loreDescription: "Honors the dynamic team searching for ancient microbial fossils and making 72 historic powered flights in the thin Martian sky.",
    appreciationMessage: "High-flying visionary! Like Ingenuity, you dare to spread your wings where others thought flight was impossible.",
    howToUnlock: "Explore the Perseverance Rover and Ingenuity Helicopter.",
    xpReward: 300
  },
  {
    id: "badge-quiz-master-sleuth",
    name: "Master Cosmic Sleuth",
    subtitle: "Cosmic Detective Quiz Champion",
    motto: "Every Secret of the Solar System Unveiled",
    category: "quiz",
    patchShape: "circle",
    borderStyle: "gold-thread",
    accentColor: "#F59E0B",
    bgGradient: "from-amber-950 via-purple-950 to-space-void",
    iconName: "Trophy",
    loreDescription: "Conquered the Cosmic Detective Quiz with top honors! Possesses deep knowledge of robotic archaeology and planetary science.",
    appreciationMessage: "A true NASA Chief Scientist in the making! Your brain shines brighter than a supernova!",
    howToUnlock: "Score high on the Cosmic Detective Space Quiz.",
    xpReward: 300
  },
  {
    id: "badge-quiz-cadet-inquirer",
    name: "Star Cadet Inquirer",
    subtitle: "Space Quiz Investigator",
    motto: "Curiosity is the Fuel of the Cosmos",
    category: "quiz",
    patchShape: "shield",
    borderStyle: "silver-thread",
    accentColor: "#818CF8",
    bgGradient: "from-indigo-950 via-slate-900 to-space-void",
    iconName: "HelpCircle",
    loreDescription: "Awarded for participating in the Space Science Investigation challenge.",
    appreciationMessage: "Great questioning spirit, cadet! Every great astronaut began by wondering how the universe works.",
    howToUnlock: "Complete a full round of the Cosmic Detective Quiz.",
    xpReward: 200
  },
  {
    id: "badge-galactic-artist",
    name: "Galactic Master Artist",
    subtitle: "Spacecraft Restoration Studio",
    motto: "Bringing Historic Machines Alive in Color",
    category: "activity",
    patchShape: "oval",
    borderStyle: "ruby-edge",
    accentColor: "#EC4899",
    bgGradient: "from-pink-950 via-purple-950 to-space-void",
    iconName: "Palette",
    loreDescription: "Awarded for custom coloring and restoring historical spacecraft blueprints with personal artistic flair.",
    appreciationMessage: "Spectacular creativity! You brought warmth and beauty to the cold cosmos with your colors.",
    howToUnlock: "Color and save any spacecraft artwork in the Coloring Book Studio.",
    xpReward: 200
  },
  {
    id: "badge-starship-architect",
    name: "Starship Architect",
    subtitle: "Spacecraft Workshop",
    motto: "Building Tomorrow's Explorers Today",
    category: "activity",
    patchShape: "hexagon",
    borderStyle: "cyan-glow",
    accentColor: "#06B6D4",
    bgGradient: "from-cyan-950 via-emerald-950 to-space-void",
    iconName: "Wrench",
    loreDescription: "Constructed a custom interstellar explorer with specialized scientific instruments, power modules, and propulsion.",
    appreciationMessage: "Engineering Prodigy! The next flagship rocket to Europa or Titan might just be designed by YOU!",
    howToUnlock: "Assemble and launch a custom spacecraft in the Build Workshop.",
    xpReward: 200
  },
  {
    id: "badge-solar-power-genius",
    name: "Solar Ray Master",
    subtitle: "Clean Energy Scientist",
    motto: "Harnessing the Light of 100 Million Miles",
    category: "activity",
    patchShape: "circle",
    borderStyle: "gold-thread",
    accentColor: "#FDE047",
    bgGradient: "from-yellow-950 via-amber-950 to-space-void",
    iconName: "Sun",
    loreDescription: "Mastered the science of photovoltaic semiconductor cells and how dust storms affect solar energy collection on Mars.",
    appreciationMessage: "Brilliant solar thinker! You understand the clean cosmic power that keeps our brave rovers rolling.",
    howToUnlock: "Complete the Photovoltaic Solar Power interactive explainer.",
    xpReward: 200
  }
];

export function getBadgeById(id: string): NasaMissionBadge | undefined {
  return NASA_MISSION_BADGES.find((b) => b.id === id);
}

export function getBadgesByCategory(category: NasaMissionBadge['category']): NasaMissionBadge[] {
  return NASA_MISSION_BADGES.filter((b) => b.category === category);
}

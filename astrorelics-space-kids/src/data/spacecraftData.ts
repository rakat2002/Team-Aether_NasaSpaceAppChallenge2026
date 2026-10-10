export interface SpacecraftPart {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface SpacecraftInfo {
  id: string;
  name: string;
  subtitle: string;
  type: 'Rover' | 'Lander' | 'Interstellar Probe' | 'Orbiter & Lander' | 'Lunar Module';
  destination: string;
  currentStatus: string;
  launchDate: string;
  activePeriod: string;
  distanceFromEarth: string;
  speed: string;
  powerSource: string;
  whatIsIt: string;
  whereDidItGo: string;
  whatDidItDo: string;
  funFact: string;
  whyItMatters: string;
  badgeLabel: string;
  isHero?: boolean;
  colorTheme: {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
  };
  orbit: {
    planetTarget: 'moon' | 'mars' | 'jupiter' | 'saturn' | 'interstellar';
    distanceFromCenter: number; // visual orbit radius
    angleOffset: number;
    orbitSpeed: number;
  };
  parts: SpacecraftPart[];
  quizQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const SPACECRAFT_LIST: SpacecraftInfo[] = [
  {
    id: "opportunity",
    name: "Opportunity",
    subtitle: "The Marathon Rover",
    type: "Rover",
    destination: "Mars (Meridiani Planum)",
    currentStatus: "Resting peacefully in Perseverance Valley on Mars",
    launchDate: "July 7, 2003",
    activePeriod: "2004 – 2018 (14 years, 138 days!)",
    distanceFromEarth: "Approx. 225 million km",
    speed: "0.18 km/h max (slow and steady!)",
    powerSource: "Solar Wings (Photovoltaic Cells)",
    whatIsIt: "A 6-wheeled robotic geologist with camera eyes, a robotic arm, and solar wing panels.",
    whereDidItGo: "Meridiani Planum, Eagle Crater, Victoria Crater, and Endeavour Crater on Mars.",
    whatDidItDo: "Searched for ancient water, drove over 45 kilometers (more than an Olympic marathon!), and sent back 217,000 photos.",
    funFact: "Planned to survive for only 90 days, but kept rolling for nearly 15 YEARS until a gigantic Martian dust storm blocked the Sun!",
    whyItMatters: "Proved that liquid water once flowed across Mars, meaning Mars could have supported microscopic life billions of years ago!",
    badgeLabel: "HERO MISSION",
    isHero: true,
    colorTheme: {
      primary: "#F59E0B",
      secondary: "#EF4444",
      accent: "#00F0FF",
      glow: "rgba(245, 158, 11, 0.6)"
    },
    orbit: {
      planetTarget: "mars",
      distanceFromCenter: 245,
      angleOffset: 0.8,
      orbitSpeed: 0.0006
    },
    parts: [
      {
        id: "solar_wings",
        name: "Solar Wings",
        description: "1.3 square meters of multi-junction photovoltaic cells that convert Martian sunlight into pure electric power.",
        iconName: "Sun"
      },
      {
        id: "pancam_mast",
        name: "Pancam & Navcam Eyes",
        description: "Perched 1.5 meters high like a neck, these twin stereo cameras give scientists on Earth 3D color vision of Mars.",
        iconName: "Eye"
      },
      {
        id: "rocker_bogie",
        name: "Rocker-Bogie 6-Wheel Drive",
        description: "Each wheel has its own motor! The rocker-bogie suspension climbs rocks bigger than the wheel without tipping over.",
        iconName: "Compass"
      },
      {
        id: "robotic_arm",
        name: "Instrument Deployment Arm",
        description: "A flexible robotic arm with a rock drill, microscope, and spectrometer to sniff rock chemistry up close.",
        iconName: "Hand"
      },
      {
        id: "high_gain_antenna",
        name: "High-Gain Radio Dish",
        description: "Points directly at Earth or orbiting satellites to beam discoveries across 200+ million kilometers of space.",
        iconName: "Radio"
      }
    ],
    quizQuestion: {
      question: "How long was Opportunity originally designed to last on Mars?",
      options: ["90 Martian Days (Sols)", "1 Year", "10 Years", "Forever"],
      correctIndex: 0,
      explanation: "NASA only expected Opportunity to survive for 90 days, but it kept going for over 5,000 days!"
    }
  },
  {
    id: "spirit",
    name: "Spirit",
    subtitle: "Opportunity's Twin Sister",
    type: "Rover",
    destination: "Mars (Gusev Crater)",
    currentStatus: "Resting at Home Plate inside Gusev Crater, Mars",
    launchDate: "June 10, 2003",
    activePeriod: "2004 – 2010 (6 years, 2 months)",
    distanceFromEarth: "Approx. 225 million km",
    speed: "0.18 km/h max",
    powerSource: "Solar Wings",
    whatIsIt: "The identical twin sister rover to Opportunity, launched just 3 weeks earlier.",
    whereDidItGo: "Gusev Crater, Columbia Hills, and the volcanic plateau known as Home Plate.",
    whatDidItDo: "Climbed the Columbia Hills and accidentally discovered pure silica (evidence of ancient hot springs!) when one of its wheels got stuck and dug a trench in the soil.",
    funFact: "Spirit's stuck right front wheel turned into an accidental scientific tool that made one of the biggest discoveries of the mission!",
    whyItMatters: "Showed that Mars once had active hot springs and volcanic steam vents, just like Yellowstone National Park on Earth!",
    badgeLabel: "TWIN SISTER",
    colorTheme: {
      primary: "#EC4899",
      secondary: "#F43F5E",
      accent: "#FDE047",
      glow: "rgba(236, 72, 153, 0.5)"
    },
    orbit: {
      planetTarget: "mars",
      distanceFromCenter: 260,
      angleOffset: 2.1,
      orbitSpeed: 0.00062
    },
    parts: [
      {
        id: "stuck_wheel",
        name: "Heroic Stuck Wheel",
        description: "Even when one wheel stopped turning, Spirit drove backward dragging it, churning up sparkling white silica!",
        iconName: "Wrench"
      },
      {
        id: "spirit_solar",
        name: "Dusty Solar Panels",
        description: "Martian 'dust devils' (tiny tornadoes) regularly swept Spirit's panels clean, giving her fresh energy blasts!",
        iconName: "Sun"
      }
    ],
    quizQuestion: {
      question: "What saved Spirit and Opportunity's solar panels when they got dusty?",
      options: ["Martian dust devils cleaned them", "Rain washed them", "Astronauts visited", "Windshields wipers"],
      correctIndex: 0,
      explanation: "Swirling Martian mini-tornadoes called dust devils blew dust off the panels, boosting their power back up!"
    }
  },
  {
    id: "voyager-1",
    name: "Voyager 1",
    subtitle: "The Farthest Human Machine",
    type: "Interstellar Probe",
    destination: "Interstellar Space (Beyond the Solar System)",
    currentStatus: "Cruising at 61,000 km/h in the space between the stars",
    launchDate: "September 5, 1977",
    activePeriod: "1977 – Present (Still sending signals!)",
    distanceFromEarth: "Over 24 BILLION kilometers (160+ AU)",
    speed: "Approx. 61,000 km/h (17 km per second!)",
    powerSource: "Radioisotope Thermoelectric Generator (Nuclear heat)",
    whatIsIt: "A 722-kilogram robotic spacecraft with a huge 3.7-meter white dish antenna.",
    whereDidItGo: "Flew by Jupiter (1979) and Saturn (1980), then flew upward out of the plane of the planets into deep interstellar space.",
    whatDidItDo: "Discovered active volcanoes on Jupiter's moon Io, intricate ring structures at Saturn, and became the FIRST human craft to cross into interstellar space.",
    funFact: "It carries the famous 12-inch gold-plated copper Golden Record with greetings in 55 human languages, animal sounds, whale songs, and music by Bach and Chuck Berry!",
    whyItMatters: "It is the farthest object ever created by humanity, carrying a message in a bottle for any cosmic travelers who might find it.",
    badgeLabel: "INTERSTELLAR PIONEER",
    colorTheme: {
      primary: "#06B6D4",
      secondary: "#3B82F6",
      accent: "#EAB308",
      glow: "rgba(6, 182, 212, 0.6)"
    },
    orbit: {
      planetTarget: "interstellar",
      distanceFromCenter: 440,
      angleOffset: 5.4,
      orbitSpeed: 0.00018
    },
    parts: [
      {
        id: "golden_record",
        name: "The Golden Record",
        description: "A phonograph record containing sounds and pictures of Earth, with playing instructions engraved on the cover.",
        iconName: "Disc"
      },
      {
        id: "high_gain_dish",
        name: "3.7m Antenna Dish",
        description: "Its giant antenna must point precisely back at Earth so its tiny 20-watt radio signal can be heard.",
        iconName: "Radio"
      },
      {
        id: "rtg_power",
        name: "RTG Nuclear Battery",
        description: "Sunlight is far too dim beyond Jupiter, so decaying plutonium pellets produce heat that transforms into steady electricity.",
        iconName: "Zap"
      }
    ],
    quizQuestion: {
      question: "What special treasure does Voyager 1 carry on its side?",
      options: ["A Golden Record with sounds of Earth", "A Mars rock", "A computer game", "A telescope"],
      correctIndex: 0,
      explanation: "The Golden Record contains music, animal calls, whale sounds, laughter, and greetings in 55 languages!"
    }
  },
  {
    id: "voyager-2",
    name: "Voyager 2",
    subtitle: "The Grand Tour Explorer",
    type: "Interstellar Probe",
    destination: "Interstellar Space (Outer Heliosphere)",
    currentStatus: "Sailing outward into interstellar space",
    launchDate: "August 20, 1977",
    activePeriod: "1977 – Present (Still communicating!)",
    distanceFromEarth: "Over 20 BILLION kilometers",
    speed: "Approx. 55,000 km/h",
    powerSource: "Nuclear RTG Battery",
    whatIsIt: "The only spacecraft to ever visit all four giant outer planets of our Solar System.",
    whereDidItGo: "Jupiter, Saturn, Uranus, and Neptune (The Grand Tour).",
    whatDidItDo: "Discovered 16 new moons, rings around Neptune, geysers of liquid nitrogen on Triton, and magnetic fields at Uranus.",
    funFact: "Launched TWO WEEKS BEFORE Voyager 1, but took a scenic route so it could visit Uranus and Neptune!",
    whyItMatters: "Almost everything we know about Uranus and Neptune's blue atmosphere came from Voyager 2's historic flybys.",
    badgeLabel: "GRAND TOUR",
    colorTheme: {
      primary: "#8B5CF6",
      secondary: "#6366F1",
      accent: "#38BDF8",
      glow: "rgba(139, 92, 246, 0.5)"
    },
    orbit: {
      planetTarget: "interstellar",
      distanceFromCenter: 410,
      angleOffset: 3.8,
      orbitSpeed: 0.00022
    },
    parts: [
      {
        id: "magnetometer_boom",
        name: "13-Meter Magnetometer Boom",
        description: "A long folding fiberglass boom that held magnetic sensors far away from the electrical body of the probe.",
        iconName: "Activity"
      }
    ],
    quizQuestion: {
      question: "Which icy blue planet was visited ONLY by Voyager 2?",
      options: ["Neptune", "Mars", "Venus", "Mercury"],
      correctIndex: 0,
      explanation: "Voyager 2 is the ONLY spacecraft in human history to have flown past Neptune and Uranus!"
    }
  },
  {
    id: "apollo-11-lm",
    name: "Apollo 11 Lunar Module",
    subtitle: "The Eagle has Landed",
    type: "Lunar Module",
    destination: "The Moon (Sea of Tranquility)",
    currentStatus: "The Descent Stage remains at Tranquility Base on the Moon forever",
    launchDate: "July 16, 1969",
    activePeriod: "Landed July 20, 1969",
    distanceFromEarth: "384,400 km",
    speed: "Landed at 3 km/h gently on Moon dust",
    powerSource: "Silver-Zinc Chemical Batteries",
    whatIsIt: "The two-stage spacecraft that carried Neil Armstrong and Buzz Aldrin to the surface of the Moon.",
    whereDidItGo: "Mare Tranquillitatis (Sea of Tranquility), Moon.",
    whatDidItDo: "Accomplished the first human landing on another celestial world on July 20, 1969.",
    funFact: "Its lower gold foil descent stage still stands on the Moon with a plaque that reads: 'Here men from the planet Earth first set foot upon the Moon, July 1969 A.D. We came in peace for all mankind.'",
    whyItMatters: "Proved that humanity can leave Earth, walk on another world, and safely return home.",
    badgeLabel: "FIRST MOON LANDING",
    colorTheme: {
      primary: "#FBBF24",
      secondary: "#E2E8F0",
      accent: "#38BDF8",
      glow: "rgba(251, 191, 36, 0.6)"
    },
    orbit: {
      planetTarget: "moon",
      distanceFromCenter: 155,
      angleOffset: 0.3,
      orbitSpeed: 0.0012
    },
    parts: [
      {
        id: "gold_mylar",
        name: "Gold Foil Mylar Blankets",
        description: "Super-thin reflective golden thermal blankets protected the crew from 120°C heat and -130°C lunar night cold.",
        iconName: "Shield"
      },
      {
        id: "landing_gear",
        name: "Four Footpads with Contact Probes",
        description: "1.7-meter long wires hung below the round dish pads so a blue cockpit light flashed the moment the pads touched dust.",
        iconName: "Anchor"
      }
    ],
    quizQuestion: {
      question: "What were Neil Armstrong's famous first words when stepping onto the Moon?",
      options: [
        "That's one small step for man, one giant leap for mankind",
        "We are here!",
        "Houston, we made it!",
        "Look at all this cheese!"
      ],
      correctIndex: 0,
      explanation: "Neil Armstrong spoke those iconic words as his boot made the first human footprint on the Moon."
    }
  },
  {
    id: "viking-1",
    name: "Viking 1",
    subtitle: "First Successful Mars Lander",
    type: "Orbiter & Lander",
    destination: "Mars (Chryse Planitia)",
    currentStatus: "Resting in the golden dust of Chryse Planitia, Mars",
    launchDate: "August 20, 1975",
    activePeriod: "1976 – 1982 (Over 6 years)",
    distanceFromEarth: "Approx. 225 million km",
    speed: "Stationary on the ground",
    powerSource: "SNAP-19 RTG Nuclear Generators",
    whatIsIt: "The first spacecraft to successfully touch down on Mars and operate for years.",
    whereDidItGo: "Chryse Planitia ('Plains of Gold') on Mars.",
    whatDidItDo: "Took the very first color photographs from the surface of Mars and scooped Martian soil into mini biology laboratories.",
    funFact: "Before Viking 1, nobody knew what color the Martian sky was! The first pictures showed a pale pinkish-salmon sky tinted by suspended dust particles.",
    whyItMatters: "Proved that automated robotic landers could survive the brutal descent through the thin Martian atmosphere.",
    badgeLabel: "MARS PIONEER",
    colorTheme: {
      primary: "#F97316",
      secondary: "#DC2626",
      accent: "#FDE047",
      glow: "rgba(249, 115, 22, 0.5)"
    },
    orbit: {
      planetTarget: "mars",
      distanceFromCenter: 275,
      angleOffset: 4.2,
      orbitSpeed: 0.00058
    },
    parts: [
      {
        id: "soil_scoop",
        name: "Extendable Soil Sampler",
        description: "A 3-meter mechanical boom scooped Martian dirt and dropped it through a sieve into internal ovens to bake and analyze.",
        iconName: "Layers"
      }
    ],
    quizQuestion: {
      question: "What color is the sky during daytime on Mars?",
      options: ["Butterscotch / Salmon Pink", "Bright Green", "Deep Navy Blue", "Rainbow colored"],
      correctIndex: 0,
      explanation: "Fine iron-rich rust dust suspended in the thin Martian air scatters red light, giving the sky a warm butterscotch or pinkish tint!"
    }
  },
  {
    id: "curiosity",
    name: "Curiosity",
    subtitle: "The Nuclear Monster Rover",
    type: "Rover",
    destination: "Mars (Gale Crater)",
    currentStatus: "Currently rolling and drilling up Mount Sharp on Mars!",
    launchDate: "November 26, 2011",
    activePeriod: "2012 – Present (Over 12 years and counting!)",
    distanceFromEarth: "Approx. 225 million km",
    speed: "0.15 km/h",
    powerSource: "Multi-Mission RTG (Nuclear Battery)",
    whatIsIt: "A giant SUV-sized rover weighing nearly 1 ton, armed with a rock-vaporizing laser.",
    whereDidItGo: "Gale Crater and the foothills of Mount Sharp on Mars.",
    whatDidItDo: "Discovered an ancient freshwater lake bed that contained carbon, hydrogen, oxygen, and all building blocks required for life.",
    funFact: "Its ChemCam laser shoots rocks with thousands of pulses, turning tiny spots into glowing plasma so cameras can read what elements are inside!",
    whyItMatters: "Conclusively proved that ancient Mars was once a habitable planet where microbes could have thrived.",
    badgeLabel: "ACTIVE ON MARS",
    colorTheme: {
      primary: "#10B981",
      secondary: "#059669",
      accent: "#34D399",
      glow: "rgba(16, 185, 129, 0.5)"
    },
    orbit: {
      planetTarget: "mars",
      distanceFromCenter: 230,
      angleOffset: 5.1,
      orbitSpeed: 0.00055
    },
    parts: [
      {
        id: "chemcam_laser",
        name: "ChemCam Laser Eye",
        description: "Zaps rocks up to 7 meters away with infrared laser bursts to detect their chemical makeup in seconds.",
        iconName: "Zap"
      }
    ],
    quizQuestion: {
      question: "How did Curiosity land on Mars without airbags?",
      options: [
        "A rocket-powered Sky Crane lowered it on cables",
        "A giant trampoline",
        "Parachute only",
        "A water landing"
      ],
      correctIndex: 0,
      explanation: "A rocket backpack called the Sky Crane hovered above the surface and lowered Curiosity gently down on nylon ropes!"
    }
  },
  {
    id: "perseverance",
    name: "Perseverance & Ingenuity",
    subtitle: "The Sample Hunter & Mars Helicopter",
    type: "Rover",
    destination: "Mars (Jezero Crater)",
    currentStatus: "Currently caching rock cores in Jezero Crater!",
    launchDate: "July 30, 2020",
    activePeriod: "2021 – Present (Active mission)",
    distanceFromEarth: "Approx. 225 million km",
    speed: "0.16 km/h",
    powerSource: "Nuclear MMRTG + Solar on Helicopter",
    whatIsIt: "NASA's most advanced rover yet, carrying test tube sample drills and the famous Ingenuity mini-helicopter.",
    whereDidItGo: "Jezero Crater, an ancient river delta that once held a deep lake.",
    whatDidItDo: "Collects and seals rock samples in sterile titanium tubes for future return to Earth, and demonstrated the first powered aircraft flight on another planet!",
    funFact: "Ingenuity, the tiny 1.8-kg helicopter that hitched a ride on Percy's belly, completed 72 powered flights in Mars's razor-thin air!",
    whyItMatters: "Its collected rock samples will be brought back to Earth by a future mission to search for definitive fossilized alien microbes.",
    badgeLabel: "SAMPLE RETURN",
    colorTheme: {
      primary: "#38BDF8",
      secondary: "#6366F1",
      accent: "#F43F5E",
      glow: "rgba(56, 189, 248, 0.5)"
    },
    orbit: {
      planetTarget: "mars",
      distanceFromCenter: 215,
      angleOffset: 1.4,
      orbitSpeed: 0.00052
    },
    parts: [
      {
        id: "ingenuity_copter",
        name: "Ingenuity Mars Helicopter",
        description: "Dual carbon-fiber blades spinning at 2,400 RPM allowed this drone to scout paths ahead of the rover.",
        iconName: "Feather"
      },
      {
        id: "moxie_oxygen",
        name: "MOXIE Oxygen Generator",
        description: "Breathed in Mars's carbon dioxide air and manufactured breathable oxygen, just like a tree!",
        iconName: "Wind"
      }
    ],
    quizQuestion: {
      question: "What historic milestone did the tiny helicopter Ingenuity achieve?",
      options: [
        "First powered flight on another planet",
        "Fastest space vehicle",
        "Dug the deepest hole",
        "Found green aliens"
      ],
      correctIndex: 0,
      explanation: "Ingenuity made history on April 19, 2021, proving human-built aircraft could fly in the ultra-thin air of Mars!"
    }
  }
];

export function getSpacecraftById(id: string): SpacecraftInfo | undefined {
  return SPACECRAFT_LIST.find((s) => s.id === id);
}

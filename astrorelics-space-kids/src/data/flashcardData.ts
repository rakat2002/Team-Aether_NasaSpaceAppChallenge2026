export interface SpacecraftFlashcard {
  id: string;
  spacecraftId: string;
  name: string;
  missionName: string;
  destination: string;
  operationalDates: string;
  statusBadge: string;
  heroImage: string;
  themeColor: string;
  // Story Summary (Birth -> Mission -> Twilight)
  storySummary: {
    birth: string;
    mission: string;
    goodbye: string;
  };
  keyDiscovery: string;
  scientificFact: string;
  whyLeftBehind: string;
  inspirationalTakeaway: string;
  stats: {
    label: string;
    value: string;
  }[];
  associatedBadgeId: string;
}

export const SPACECRAFT_FLASHCARDS: SpacecraftFlashcard[] = [
  {
    id: "fc-opportunity",
    spacecraftId: "opportunity",
    name: "Opportunity Rover (Oppy)",
    missionName: "Mars Exploration Rover B",
    destination: "Mars — Meridiani Planum & Perseverance Valley",
    operationalDates: "2004 – 2018 (5,111 Martian Sols / nearly 15 years)",
    statusBadge: "Resting Peacefully in Perseverance Valley",
    heroImage: "https://images-assets.nasa.gov/image/PIA04856/PIA04856~medium.jpg",
    themeColor: "#F59E0B",
    storySummary: {
      birth: "Engineers at NASA JPL designed Opportunity with six aluminum wheels and fold-out solar wings, hoping she could survive 90 days in the freezing Martian desert.",
      mission: "Opportunity touched down in an airbag bounce, rolling across giant craters, climbing steep sand dunes, and completing an Olympic marathon (45 km) while finding ancient water blueberries.",
      goodbye: "In June 2018, a planet-wide dust storm blanketed Mars, blocking all sunlight. Her solar wings lost power, and her final transmission touched hearts worldwide."
    },
    keyDiscovery: "Discovered spherical hematite 'blueberries' and sulfate salts, giving absolute chemical proof that vast oceans or lakes of warm, drinkable water once flowed across Mars!",
    scientificFact: "Opportunity drove 45.16 kilometers (28.06 miles), holding the all-time off-world driving record for any vehicle across human history!",
    whyLeftBehind: "Mars is over 200 million km away. Opportunity completed her duty heroically and now stands as an eternal monument to human perseverance.",
    inspirationalTakeaway: "Never give up when the road gets rocky! Like Opportunity, keep rolling forward and let curiosity be your guide.",
    stats: [
      { label: "Planned Life", value: "90 Days" },
      { label: "Actual Life", value: "5,111 Sols (14+ Yrs)" },
      { label: "Total Distance", value: "45.16 km (28 mi)" },
      { label: "Photos Beamed", value: "217,000+" }
    ],
    associatedBadgeId: "badge-opportunity-marathoner"
  },
  {
    id: "fc-apollo11",
    spacecraftId: "apollo-11-lm",
    name: "Apollo 11 Lunar Module (Eagle)",
    missionName: "Apollo 11 First Lunar Landing",
    destination: "The Moon — Sea of Tranquility (0.67° N, 23.47° E)",
    operationalDates: "July 20 – 21, 1969",
    statusBadge: "Historic Monument on the Lunar Surface",
    heroImage: "https://images-assets.nasa.gov/image/as11-40-5903/as11-40-5903~medium.jpg",
    themeColor: "#E2E8F0",
    storySummary: {
      birth: "Built by hand with lightweight titanium, aluminum, and shiny gold Kapton foil blankets, designed specifically for a powered descent to the airless Moon.",
      mission: "Piloted with pinpoint precision by Neil Armstrong over boulder fields until he reported: 'Tranquility Base here. The Eagle has landed.' Neil and Buzz spent 21 hours exploring.",
      goodbye: "To fly back to orbit, only the top cabin stage lifted off. The heavy descent stage with its landing gear and commemorative plaque stayed on the Moon forever."
    },
    keyDiscovery: "Returned 21.5 kg of pristine lunar rock and regolith samples, confirming the Moon's volcanic history and ancient collision origin.",
    scientificFact: "Because the Moon has no atmosphere, wind, or rain, the footprints of Neil Armstrong and the Eagle's landing footpads will remain undisturbed for millions of years!",
    whyLeftBehind: "The descent stage served as the launch pad to fire the astronauts back up into space. It bears a stainless steel plaque: 'We came in peace for all mankind.'",
    inspirationalTakeaway: "One small step taken with courage can become a giant leap for the entire world.",
    stats: [
      { label: "Touchdown Date", value: "July 20, 1969" },
      { label: "Surface Stay", value: "21h 36m" },
      { label: "Moon Rocks", value: "21.5 kg (47.5 lbs)" },
      { label: "Crew Members", value: "Armstrong & Aldrin" }
    ],
    associatedBadgeId: "badge-apollo-moonwalker"
  },
  {
    id: "fc-voyager1",
    spacecraftId: "voyager-1",
    name: "Voyager 1 Deep Space Probe",
    missionName: "Voyager Interstellar Mission",
    destination: "Interstellar Space (Past the Heliosphere)",
    operationalDates: "September 5, 1977 – Present (47+ years!)",
    statusBadge: "Cruising Interstellar Space (~24 Billion km away)",
    heroImage: "https://images-assets.nasa.gov/image/PIA22566/PIA22566~medium.jpg",
    themeColor: "#00F0FF",
    storySummary: {
      birth: "Equipped with a 3.7-meter dish antenna and powered by a nuclear RTG battery, Voyager 1 launched to tour Jupiter and Saturn.",
      mission: "Discovered active sulfur volcanoes on Jupiter's moon Io, mysterious spokes in Saturn's rings, and took the famous 'Pale Blue Dot' photo showing Earth as a speck of dust in a sunbeam.",
      goodbye: "In August 2012, Voyager 1 broke through the solar bubble into true interstellar space. She will drift among the stars for billions of years carrying the Golden Record."
    },
    keyDiscovery: "First human artifact to cross the heliopause and enter interstellar space, measuring cosmic rays and magnetic fields from outside our solar system.",
    scientificFact: "Radio signals traveling at the speed of light take more than 22.5 hours to travel from Earth to Voyager 1!",
    whyLeftBehind: "Voyager 1 travels so fast (over 61,000 km/h) that the Sun's gravity can never pull her back. She was born to be our eternal cosmic ambassador.",
    inspirationalTakeaway: "You are part of a wonderful universe. Keep dreaming big — your spirit can travel farther than the stars.",
    stats: [
      { label: "Launch Date", value: "Sept 5, 1977" },
      { label: "Distance from Earth", value: "24.3+ Billion km" },
      { label: "Cruising Speed", value: "61,200 km/h" },
      { label: "Special Artifact", value: "The Golden Record" }
    ],
    associatedBadgeId: "badge-voyager-interstellar"
  },
  {
    id: "fc-viking1",
    spacecraftId: "viking-1",
    name: "Viking 1 Lander",
    missionName: "Viking Mars Program",
    destination: "Mars — Chryse Planitia ('Plain of Gold')",
    operationalDates: "July 20, 1976 – November 11, 1982 (2,238 Sols)",
    statusBadge: "Resting on Chryse Planitia, Mars",
    heroImage: "https://images-assets.nasa.gov/image/PIA00563/PIA00563~medium.jpg",
    themeColor: "#EF4444",
    storySummary: {
      birth: "Conceived during the bicentennial year of 1976 to achieve the very first successful soft landing on Mars and search for signs of Martian biology.",
      mission: "Landed safely on Chryse Planitia and beamed back humanity's first crisp panoramic color view of the Martian surface, showing salmon-pink skies and rusted iron rocks.",
      goodbye: "Operated for 6 years before an accidental ground command in 1982 altered its antenna pointing software, ending communications."
    },
    keyDiscovery: "Analyzed the Martian atmosphere and soil chemistry directly for the first time, identifying high iron oxide (rust) content and argon/nitrogen ratios.",
    scientificFact: "Viking 1's extendable robotic arm dug trenches in Martian dirt and dropped samples into miniature on-board biology ovens!",
    whyLeftBehind: "It was a stationary lander with no return rocket. It remains preserved in the dry Martian air exactly where it made history.",
    inspirationalTakeaway: "Be brave enough to open your eyes to new frontiers. The unknown is just waiting to become a discovery.",
    stats: [
      { label: "Landing Date", value: "July 20, 1976" },
      { label: "Sols Active", value: "2,238 Martian Days" },
      { label: "First Photo", value: "July 20, 1976" },
      { label: "Site", value: "Plain of Gold" }
    ],
    associatedBadgeId: "badge-viking-pioneer"
  },
  {
    id: "fc-cassini",
    spacecraftId: "cassini",
    name: "Cassini-Huygens Orbiter",
    missionName: "Cassini Saturn Mission",
    destination: "Saturn System & Titan",
    operationalDates: "October 15, 1997 – September 15, 2017 (20 Years)",
    statusBadge: "Vaporized in Saturn's Atmosphere (Mission Grand Finale)",
    heroImage: "https://images-assets.nasa.gov/image/PIA14937/PIA14937~medium.jpg",
    themeColor: "#FBBF24",
    storySummary: {
      birth: "A giant four-ton flagship spacecraft engineered by NASA, ESA, and ASI to unlock the mystery of Saturn's ring system and fascinating moons.",
      mission: "Dropped the Huygens probe onto Titan's methane rivers, flew through erupting water plumes on moon Enceladus, and wove between Saturn and its rings 22 times.",
      goodbye: "Running out of fuel in 2017, NASA guided Cassini to plunge directly into Saturn's atmosphere to ensure pristine ocean worlds like Enceladus remained sterile."
    },
    keyDiscovery: "Discovered a warm global liquid ocean beneath Enceladus's icy crust with hydrothermal vents, making it a prime candidate for extraterrestrial life.",
    scientificFact: "Cassini traveled nearly 8 billion kilometers and sent back 453,000 photos of Saturn's glowing gold and cream cloud tops!",
    whyLeftBehind: "Cassini gave her life in a blazing meteor streak across Saturn's clouds so that future missions could search for life on her pristine moons.",
    inspirationalTakeaway: "True heroes protect the future. Curiosity must always be paired with care and respect for other worlds.",
    stats: [
      { label: "Mission Duration", value: "20 Years" },
      { label: "Photos Taken", value: "453,000+" },
      { label: "Ring Crossings", value: "22 Grand Dives" },
      { label: "Moons Discovered", value: "6 New Moons" }
    ],
    associatedBadgeId: "badge-cassini-ringdancer"
  },
  {
    id: "fc-spirit",
    spacecraftId: "spirit",
    name: "Spirit Rover (MER-A)",
    missionName: "Mars Exploration Rover A",
    destination: "Mars — Gusev Crater",
    operationalDates: "January 4, 2004 – March 22, 2010 (2,210 Sols)",
    statusBadge: "Resting on Troy at Home Plate, Mars",
    heroImage: "https://images-assets.nasa.gov/image/PIA05208/PIA05208~medium.jpg",
    themeColor: "#FB923C",
    storySummary: {
      birth: "Twin sister to Opportunity, Spirit landed inside rugged Gusev Crater, an ancient impact basin believed to have once held a lake.",
      mission: "Spirit climbed the Columbia Hills, drove over 7.7 kilometers, and when her front-right wheel jammed in 2006, she drove in reverse, dragging the wheel like a plow.",
      goodbye: "The dragged wheel accidentally carved open soil rich in 90% pure silica — proof of ancient volcanic steam vents! In 2010, she became trapped in soft sand as winter set in."
    },
    keyDiscovery: "Discovered hydrothermal silica deposits, showing that Mars once had boiling hot springs where microbial life could have thrived.",
    scientificFact: "Spirit survived 25 times longer than NASA originally planned, braving steep 30-degree mountain slopes!",
    whyLeftBehind: "Spirit rests peacefully on the western side of Home Plate plateau, facing the Martian sunrise.",
    inspirationalTakeaway: "Even when things go wrong and you have a 'stuck wheel', you can turn difficulties into your greatest breakthrough!",
    stats: [
      { label: "Planned Life", value: "90 Sols" },
      { label: "Actual Life", value: "2,210 Sols" },
      { label: "Distance", value: "7.73 km" },
      { label: "Photos", value: "128,000+" }
    ],
    associatedBadgeId: "badge-spirit-braveheart"
  },
  {
    id: "fc-perseverance",
    spacecraftId: "perseverance",
    name: "Perseverance & Ingenuity",
    missionName: "Mars 2020 Mission",
    destination: "Mars — Jezero Crater Ancient River Delta",
    operationalDates: "February 18, 2021 – Active",
    statusBadge: "Actively Exploring Jezero Crater",
    heroImage: "https://images-assets.nasa.gov/image/PIA24422/PIA24422~medium.jpg",
    themeColor: "#F43F5E",
    storySummary: {
      birth: "The most advanced robotic explorer ever built, packing a rock-coring drill, high-definition microphones, and a robotic helicopter buddy named Ingenuity.",
      mission: "Hunting for fossilized biosignatures in ancient lake mud, caching sealed titanium sample tubes on the surface, and producing breathable oxygen with MOXIE.",
      goodbye: "Perseverance is still actively rolling today! Ingenuity flew 72 missions before retiring as the first historic aircraft on another world."
    },
    keyDiscovery: "Verified ancient lake delta sediments packed with organic carbon molecules and proved that powered controlled flight is possible in Mars's thin atmosphere.",
    scientificFact: "Ingenuity was only designed for 5 test flights, but flew 72 times across 17 kilometers of Martian air!",
    whyLeftBehind: "Ingenuity rests proudly at 'Valinor Hills' as humanity's Wright Brothers moment on another planet.",
    inspirationalTakeaway: "Teamwork makes the impossible possible. When rovers and copters work together, whole new skies open up.",
    stats: [
      { label: "Landing Date", value: "Feb 18, 2021" },
      { label: "Ingenuity Flights", value: "72 Flights" },
      { label: "Samples Cached", value: "25+ Tubes" },
      { label: "Oxygen Made", value: "MOXIE Success" }
    ],
    associatedBadgeId: "badge-perseverance-aviator"
  },
  {
    id: "fc-curiosity",
    spacecraftId: "curiosity",
    name: "Curiosity Rover",
    missionName: "Mars Science Laboratory",
    destination: "Mars — Gale Crater & Mount Sharp",
    operationalDates: "August 6, 2012 – Active (12+ Years)",
    statusBadge: "Actively Climbing Mount Sharp",
    heroImage: "https://images-assets.nasa.gov/image/PIA19920/PIA19920~medium.jpg",
    themeColor: "#A855F7",
    storySummary: {
      birth: "The size of an SUV, Curiosity was lowered to the surface of Mars by a revolutionary rocket-powered 'sky crane'.",
      mission: "Zapped thousands of rocks with ChemCam laser, measured ancient mudstone layers of Mount Sharp, and found essential building blocks of life: carbon, hydrogen, oxygen, and nitrogen.",
      goodbye: "Powered by a nuclear RTG battery that lasts for decades, Curiosity continues climbing higher up Mount Sharp, reading Mars's history like the pages of a book."
    },
    keyDiscovery: "Confirmed that Gale Crater was once an ancient freshwater lake with chemical conditions that could have supported living microbes.",
    scientificFact: "On her first anniversary on Mars, Curiosity programmed her soil vibration motor to play the tones of 'Happy Birthday' to herself on the silent Martian plains!",
    whyLeftBehind: "Curiosity is still working hard! She will remain on Mount Sharp as a permanent landmark of human scientific inquiry.",
    inspirationalTakeaway: "Stay curious! The universe reveals its deepest secrets to those who look closely and never stop exploring.",
    stats: [
      { label: "Landing Date", value: "August 6, 2012" },
      { label: "Power Source", value: "Nuclear RTG" },
      { label: "Laser Zaps", value: "1,000,000+" },
      { label: "Elevation Climbed", value: "800+ Meters" }
    ],
    associatedBadgeId: "badge-curiosity-climber"
  }
];

export function getFlashcardBySpacecraftId(spacecraftId: string): SpacecraftFlashcard | undefined {
  return SPACECRAFT_FLASHCARDS.find((fc) => fc.spacecraftId === spacecraftId);
}

export function getFlashcardById(id: string): SpacecraftFlashcard | undefined {
  return SPACECRAFT_FLASHCARDS.find((fc) => fc.id === id);
}

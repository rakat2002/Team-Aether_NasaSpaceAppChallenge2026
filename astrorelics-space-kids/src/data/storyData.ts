export interface StoryScene {
  id: number;
  chapter: string;
  title: string;
  subtitle: string;
  storyText: string[];
  funFact: {
    title: string;
    fact: string;
    icon: string;
  };
  nasaQuery: string;
  microInteractionType:
    | 'trajectory_connect'
    | 'drag_spacecraft'
    | 'airbag_landing'
    | 'surface_parallax'
    | 'rock_detective'
    | 'sol_slider'
    | 'counter_burst'
    | 'marathon_driver'
    | 'dust_storm'
    | 'signal_listen'
    | 'tribute_badge';
  interactivePrompt: string;
  badgeReward?: string;
}

export const STORY_SCENES: StoryScene[] = [
  {
    id: 1,
    chapter: "CHAPTER 1",
    title: "CAN WE REALLY DO THIS?",
    subtitle: "A giant dream born in human minds",
    storyText: [
      "Imagine standing on Earth on a warm summer night, looking up at a tiny red dot in the sky.",
      "Scientists had an audacious dream: What if we built a little robotic explorer, loaded it inside a rocket, and shot it across 480 million kilometers of empty space?",
      "Meet Opportunity. Weighing about as much as a panda bear, this brave little machine was built to roll across an alien world!"
    ],
    funFact: {
      title: "Did You Know?",
      fact: "Mars and Earth are like race cars on two different tracks. We can only launch spacecraft to Mars once every 26 months when the planets line up!",
      icon: "Sparkles"
    },
    nasaQuery: "Opportunity rover Mars",
    microInteractionType: "trajectory_connect",
    interactivePrompt: "Tap the button below to connect the launch trajectory from Earth to Mars!",
    badgeReward: "Space Cadet"
  },
  {
    id: 2,
    chapter: "CHAPTER 2",
    title: "THE BIG JOURNEY 🚀",
    subtitle: "Sailing through the silent cosmic sea",
    storyText: [
      "3... 2... 1... LIFT OFF! A fiery Delta II rocket pushed Opportunity high above Earth's clouds and into the cold darkness of space.",
      "For seven months, Opportunity sailed through the solar system with no engine running — just drifting along the curved gravity path of the Sun.",
      "Inside its protective cruise shell, the little rover slept quietly while stars twinkled outside."
    ],
    funFact: {
      title: "Speed Demon!",
      fact: "Opportunity was traveling at over 19,000 km/h (12,000 mph)! That is fast enough to fly from New York to London in about 15 minutes!",
      icon: "Rocket"
    },
    nasaQuery: "Mars rover launch",
    microInteractionType: "drag_spacecraft",
    interactivePrompt: "Drag the little cruise capsule along the orbital highway toward Mars!",
    badgeReward: "Cosmic Navigator"
  },
  {
    id: 3,
    chapter: "CHAPTER 3",
    title: "HOLD ON! 😳",
    subtitle: "The Six Minutes of Terror",
    storyText: [
      "Reaching Mars was only half the battle. Opportunity slammed into Mars's atmosphere traveling 40 times faster than a bullet!",
      "A supersonic parachute blossomed in the thin air to slow it down. Then, giant puffy airbags inflated all around the lander like a giant beach ball cocoon!",
      "BOING! BOING! BOING! Opportunity hit the Martian ground and bounced nearly 4 stories high, tumbling 26 times across the sand before rolling to a stop inside a crater!"
    ],
    funFact: {
      title: "Hole-in-One!",
      fact: "Opportunity bounced right into a tiny 22-meter crater called Eagle Crater. Scientists called it 'an interplanetary hole-in-one'!",
      icon: "ShieldAlert"
    },
    nasaQuery: "Mars rover landing airbags",
    microInteractionType: "airbag_landing",
    interactivePrompt: "Tap the parachute and airbags to bounce safely onto the red Martian soil!",
    badgeReward: "Daredevil Lander"
  },
  {
    id: 4,
    chapter: "CHAPTER 4",
    title: "WELCOME TO MARS 🔴",
    subtitle: "Unfolding wings on an alien world",
    storyText: [
      "The airbags deflated. The triangular petals unfolded like a metal flower. Opportunity woke up, stretched its camera mast high, and took its very first look.",
      "The sky was butterscotch pink. Red rust dust stretched to the horizon in every direction.",
      "Opportunity rolled off its landing pallet and pressed its six metal wheels into Martian soil for the very first time. Humans were officially exploring Meridiani Planum!"
    ],
    funFact: {
      title: "Secret Code in the Wheels!",
      fact: "The pattern in Opportunity's wheel cleats spelled 'JPL' in Morse code (.--- .--. .-..), stamping NASA's Jet Propulsion Laboratory into the Martian dirt with every turn!",
      icon: "Eye"
    },
    nasaQuery: "Opportunity rover Mars surface",
    microInteractionType: "surface_parallax",
    interactivePrompt: "Move your mouse across the scene to create dust ripples and leave rover tire tracks!",
    badgeReward: "First Contact"
  },
  {
    id: 5,
    chapter: "CHAPTER 5",
    title: "DETECTIVE OPPORTUNITY 🔎",
    subtitle: "Solving a 4-billion-year-old mystery",
    storyText: [
      "Right where Opportunity landed, scientists spotted something bizarre: tiny round dark spheres scattered everywhere across the rock outcrops, looking like blueberries in a muffin!",
      "Opportunity swung its robotic arm down with a microscopic lens and a rock-abrasion grinder.",
      "The verdict? These 'blueberries' were hematite balls that could ONLY grow inside soaking wet mud! Long ago, this frozen desert was covered in liquid water!"
    ],
    funFact: {
      title: "Water on Mars!",
      fact: "This was the first time in human history anyone proved that ancient Mars had lakes or groundwater where microscopic living creatures could have lived!",
      icon: "Droplets"
    },
    nasaQuery: "Opportunity rover rocks Mars",
    microInteractionType: "rock_detective",
    interactivePrompt: "Look through Opportunity's microscope lens and choose what made these mysterious spheres!",
    badgeReward: "Martian Geologist"
  },
  {
    id: 6,
    chapter: "CHAPTER 6",
    title: "90 DAYS ⏱️",
    subtitle: "The warranty expires... but the mission doesn't!",
    storyText: [
      "Opportunity's original mission was planned for only 90 Martian days (called 'sols'). NASA engineers thought Martian dust would coat the solar panels and choke the battery.",
      "Day 30 arrived: working perfectly. Day 60: still healthy! Day 90: the primary mission was officially complete!",
      "NASA told the rover drivers: 'Keep going as long as the wheels turn!' Little did anyone dream how far this robot would go."
    ],
    funFact: {
      title: "Martian Sols",
      fact: "A day on Mars is called a 'sol'. It lasts 24 hours, 39 minutes, and 35 seconds — just a little longer than an Earth day!",
      icon: "Clock"
    },
    nasaQuery: "Opportunity rover mission",
    microInteractionType: "sol_slider",
    interactivePrompt: "Drag the Sol Slider from Day 1 to Day 90 to see Opportunity finish its primary warranty!",
    badgeReward: "Mission Specialist"
  },
  {
    id: 7,
    chapter: "CHAPTER 7",
    title: "WAIT... IT'S STILL GOING?! 🤯",
    subtitle: "The little robot that refused to quit",
    storyText: [
      "Years flew by. 1 year... 3 years... 5 years! Whenever dust accumulated on the solar panels, friendly Martian wind devils would swirl by and sweep the solar panels squeaky clean!",
      "Opportunity climbed giant crater rims, dug through sand traps, survived freezing Martian winters, and kept sending thousands of breathtaking 360-degree panoramas.",
      "Scientists who started the mission as young college students had kids and gray hair, but Opportunity was still rolling!"
    ],
    funFact: {
      title: "5,000+ Sols!",
      fact: "Opportunity lasted over 55 TIMES longer than its warranty! That is like buying a pair of sneakers expected to last 3 months, and wearing them for 14 years!",
      icon: "Zap"
    },
    nasaQuery: "Opportunity Mars rover panorama",
    microInteractionType: "counter_burst",
    interactivePrompt: "Click the Power Blast button to watch the Sol counter explode past 5,000 days!",
    badgeReward: "Endurance Champion"
  },
  {
    id: 8,
    chapter: "CHAPTER 8",
    title: "THE MARTIAN MARATHON 🏃‍♀️",
    subtitle: "Farther than any human marathon on another world",
    storyText: [
      "A full Olympic marathon on Earth is 42.195 kilometers (26.2 miles). Nobody ever expected a solar-powered golf-cart-sized rover on another planet to drive that far.",
      "On March 24, 2015, Opportunity crossed the official marathon line in 'Marathon Valley' along the rim of the immense Endeavour Crater!",
      "It became the first wheeled vehicle in human history to complete a marathon on another planetary body."
    ],
    funFact: {
      title: "Olympic Record!",
      fact: "Opportunity's top speed was only about 0.18 km/h. To finish a marathon, it took over 11 years of slow, careful rolling!",
      icon: "Award"
    },
    nasaQuery: "Opportunity rover Mars journey",
    microInteractionType: "marathon_driver",
    interactivePrompt: "Guide Opportunity across the crater rim to claim the off-world Marathon Golden Medal!",
    badgeReward: "Marathon Champion"
  },
  {
    id: 9,
    chapter: "CHAPTER 9",
    title: "THE SKY TURNS DARK 🌪️",
    subtitle: "The great dust storm of 2018",
    storyText: [
      "In June 2018, tiny reddish dust plumes in the south rapidly merged into a planet-encircling monster storm.",
      "Dust blew 60 kilometers high into the Martian stratosphere. At midday, the sky turned pitch black as midnight. The sun was reduced to a dim pinprick.",
      "Without sunlight, Opportunity's solar panels could not generate power to warm its computer brains. The battery power began to drop."
    ],
    funFact: {
      title: "Global Dust Storms",
      fact: "Mars experiences storms so vast they swallow the entire planet at once! You can watch Mars's entire surface disappear behind red dust clouds through a telescope from Earth.",
      icon: "CloudRain"
    },
    nasaQuery: "Mars dust storm Opportunity",
    microInteractionType: "dust_storm",
    interactivePrompt: "Watch the storm brew and observe how solar energy drops as dust blankets the sky.",
    badgeReward: "Storm Witness"
  },
  {
    id: 10,
    chapter: "CHAPTER 10",
    title: "HELLO...? 📡",
    subtitle: "Listening across 200 million kilometers",
    storyText: [
      "On Earth, the Deep Space Network pointed giant 70-meter antenna dishes toward Mars.",
      "'Opportunity, this is Earth. Can you hear us?' Radio waves beamed across the silence at the speed of light.",
      "Engineers beamed over a thousand wake-up songs and recovery commands across the dark. But inside Perseverance Valley, the valiant rover was fast asleep. The radio stayed quiet."
    ],
    funFact: {
      title: "Cosmic Whispers",
      fact: "It took 14 minutes for a radio signal from Earth to reach Opportunity, and another 14 minutes for any reply to travel back!",
      icon: "Radio"
    },
    nasaQuery: "Mars Earth communication",
    microInteractionType: "signal_listen",
    interactivePrompt: "Tap the transmission antenna to send a gentle radio wave beacon across deep space.",
    badgeReward: "Deep Space Listener"
  },
  {
    id: 11,
    chapter: "CHAPTER 11",
    title: "GOODBYE, OPPORTUNITY ❤️",
    subtitle: "Abandoned... but NEVER forgotten",
    storyText: [
      "Opportunity was a tiny machine made of metal, silicon, and glass... sitting on a vast red world millions of kilometers from the humans who created it.",
      "For almost 15 years, it gave humanity eyes on Mars. It proved that water once ran, that robotic pioneers can brave harsh alien worlds, and that curiosity knows no limits.",
      "Today, Opportunity rests peacefully under the pink Martian sky, waiting for the first human footprints to arrive. Thank you, Opportunity."
    ],
    funFact: {
      title: "A Monument on Mars",
      fact: "One day, when human astronauts land on Mars, they will visit Perseverance Valley, wipe the dust off Opportunity's solar wings, and place it in a Martian museum!",
      icon: "Heart"
    },
    nasaQuery: "Opportunity final mission Mars",
    microInteractionType: "tribute_badge",
    interactivePrompt: "Sign your name into the Junior Astronaut Registry and earn your Mission Wings!",
    badgeReward: "Master Martian Explorer"
  }
];

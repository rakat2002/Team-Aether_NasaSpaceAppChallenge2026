# 🚀 Astrorelics: Space Kids (NASA Space Apps Challenge 2026)

> **"NASA's missions may end, but their stories don't."**[cite: 2]  
> **"Abandoned... but NEVER forgotten!"**[cite: 1, 2]  
> An interactive learning platform that turns the history of NASA’s robotic spacecraft, rovers, landers, satellites, and scientific instruments into engaging, story-driven missions for students[cite: 1, 2].

---

## 🌌 Overview & Challenge Context

Across NASA's exploratory history, rovers, orbiters, and landers have traveled deep into interplanetary space, landing on the Moon and Mars—often without a return journey[cite: 2]. When these missions end, their equipment remains behind as silent time capsules of human achievement[cite: 2]. Without context, students see only inanimate metal in archival photos[cite: 2].

**Astrorelics** addresses this gap by making space archaeology accessible and memorable[cite: 1, 2]. Through first-person robotic narratives, interactive telemetry widgets, structured quizzes, and creative builders, students discover why each machine was launched, what it accomplished, the challenges it overcame, and the legacy it left behind[cite: 1, 2].

Developed for the **NASA International Space Apps Challenge 2026** under the theme: **"Abandoned but not Forgotten."**[cite: 1]

---

## ✨ Features

- 🏠 **Unified Home Dashboard:**  
  A centralized launcher with immediate navigation to all app sections: **Solar System Map**, **Stories**, **Flashcards**, **Badges**, **Quiz**, **Color Studio**, and **Workshop**[cite: 1, 2]. Students can return to Home from any active module[cite: 1].

- 🪐 **Interactive Live Solar System Map:**  
  A visual orbital overview tracking NASA hardware locations across the solar system (including Opportunity, Spirit, Voyager 1 & 2, Apollo 11 Lunar Module Descent Stage, Viking 1, Curiosity, and Perseverance & Ingenuity)[cite: 1, 2]. Clicking any rover or probe opens its dedicated Story Mode[cite: 1, 2].

- 📖 **Mission Stories (First-Person Robotic Narratives):**  
  Rich, chapter-by-chapter operational journeys narrated from the perspective of the rovers and spacecraft themselves[cite: 1, 2]. Dialogue flows across pages to cover the full mission lifespan—from launch through interplanetary transit to touchdown and mission milestones (such as Opportunity's 42.195 km "Martian Marathon")[cite: 1, 2]. Finishing a story awards an exclusive mission badge[cite: 1, 2].

- 🛰️ **Authentic NASA Imagery & Visualizations:**  
  Real high-resolution mission imagery from NASA is embedded across stories, flashcards, and orbital views, grounding abstract history in concrete planetary photography[cite: 1, 2].

- 💡 **Fun Facts & Interactive Telemetry:**  
  Visual aids break down complex science:
  - *Descent Sequence Control:* Step-by-step staging of parachutes, retrorockets, and airbags[cite: 1, 2].
  - *Martian Sand Canvas:* Interactive rover driving with wheel-tread Morse code reveals[cite: 1, 2].
  - *Spectrometry Detective:* Mössbauer spectrometer data analysis for hematite "blueberries" proving ancient Martian water[cite: 1, 2].
  - *Dust Storm & Solar Tracker:* Live wattage drop gauges during catastrophic Martian storms[cite: 1, 2].
  - *Deep Space Network (DSN) Transceiver:* Signal beams across hundreds of millions of kilometers[cite: 1, 2].

- 🗂️ **Dual-Mode Summary Flashcards:**  
  Quick-review flip cards offering two distinct viewing modes via a single toggle button[cite: 1, 2]:
  - **Telemetry Mode:** Key technical specs, launch dates, distances, power systems, and bulleted notes[cite: 1, 2].
  - **Summary Mode:** A concise historical digest of the entire mission narrative[cite: 1, 2].

- 💭 **Cosmic Brainstorming Challenges:**  
  Thought-provoking prompt questions following each story that challenge students to reflect and hypothesize beyond presented facts[cite: 1, 2].

- 🧠 **Cosmic Detective Quizzes:**  
  Knowledge-check quizzes following every completed mission[cite: 1, 2]. Features instant scoring, detailed explanations for every answer, and badge rewards upon completion[cite: 1, 2].

- 🏅 **NASA Space Badge Collection:**  
  A digital flight-jacket patch system displaying earned badges, cumulative Explorer XP, and locked upcoming badges to motivate continuous exploration[cite: 1, 2].

- 🎨 **Space Coloring Studio:**  
  A digital art canvas loaded with spacecraft line-art templates[cite: 1, 2]. Features custom palettes, smooth pens, neon glow brushes, star stamps, an eraser, and badge unlock achievements upon completion[cite: 1, 2].

- 🛠️ **Spacecraft Workshop Minigame:**  
  A modular engineering builder where students mix and match chassis types, mobility systems (such as rocker-bogie wheels or lunar footpads), power sources (solar wings vs. RTG nuclear batteries), sensor masts, and science payloads[cite: 1, 2].

- 📤 **Artwork & Craft Sharing:**  
  Export and share options enabling students to download or show off their custom spacecraft builds and finished paintings with friends[cite: 1, 2].

---

## 🛰️ NASA Data & APIs Used

The application utilizes open datasets, imagery indexes, and archival models from NASA:

| Resource / API | Endpoint / Reference | Application Usage |
| :--- | :--- | :--- |
| **NASA Image and Video Library API** | `https://images-api.nasa.gov` | Real high-resolution mission imagery, rover photos, and chapter galleries. |
| **Mars Rover Photos API** | `https://api.nasa.gov/mars-photos` | Surface captures, mast feeds, and telemetry references from Mars rovers. |
| **NASA 3D Resources** | `github.com/nasa/NASA-3D-Resources` | Blueprint assets and geometric models for the spacecraft workshop. |
| **NSSDCA Lunar Artifacts Catalog** | `nssdc.gsfc.nasa.gov/planetary/lunar` | Reference data for hardware and descent stages resting on the lunar surface. |
| **Astronomy Picture of the Day (APOD)** | `https://api.nasa.gov/planetary/apod` | Daily celestial captures and space background visuals. |

---

## 👥 Team Aether

Created by **Team Aether** from **BRAC University, Dhaka, Bangladesh** for the **NASA International Space Apps Challenge 2026**[cite: 2]:
- **S. M. Nafeu Al Sikder** – Team Leader & Research Lead[cite: 2]
- **Rakat E Jannat Raka** – Lead UI Developer[cite: 2]
- **Hossain Tasnim Rumki** – UI Developer & Content Coordinator[cite: 2]
- **Saleh Ahmed Kha** – UI Developer, Video Producer & Narrator[cite: 2]
- **Fardin Zaman** – UI / Frontend Developer[cite: 2]
- **Tanisha Manha Mahamud** – Challenge & Concept Coordinator[cite: 2]

---

## 🛠️ Tech Stack

- **Frontend:** Modern Web Framework (React / Next.js / Vite / Tailwind CSS / HTML5 Canvas API)
- **Data & Media:** NASA Open APIs & Local Structured JSON Cache (ensures reliable, offline-safe judging evaluation)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- Git

### Installation & Run

1. Clone the repository:
   ```bash
   git clone [https://github.com/rakat2002/Team-Aether_NasaSpaceAppChallenge2026.git](https://github.com/rakat2002/Team-Aether_NasaSpaceAppChallenge2026.git)
   cd Team-Aether_NasaSpaceAppChallenge2026

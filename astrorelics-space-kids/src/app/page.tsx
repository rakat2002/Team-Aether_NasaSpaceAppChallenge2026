"use client";

import React, { useState } from "react";
import { StarfieldCanvas } from "@/components/ui/StarfieldCanvas";
import { Header } from "@/components/ui/Header";
import { WelcomeScreen } from "@/components/welcome/WelcomeScreen";
import { SolarSystemView } from "@/components/solar-system/SolarSystemView";
import { StoryExperience } from "@/components/story/StoryExperience";
import { WarpLaunchTransition } from "@/components/transitions/WarpLaunchTransition";
import { CinematicMarsTransition } from "@/components/transitions/CinematicMarsTransition";
import { SpacecraftDetailModal } from "@/components/ui/SpacecraftDetailModal";
import { SolarPowerExplainerModal } from "@/components/ui/SolarPowerExplainerModal";
import { FleetDrawerModal } from "@/components/ui/FleetDrawerModal";
import { CosmicQuizModal } from "@/components/activities/CosmicQuizModal";
import { ColoringBookModal } from "@/components/activities/ColoringBookModal";
import { BuildSpaceshipModal } from "@/components/activities/BuildSpaceshipModal";
import { BadgeCelebrationModal } from "@/components/badges/BadgeCelebrationModal";
import { BadgeBoardModal } from "@/components/badges/BadgeBoardModal";
import { StoryFlashcardModal } from "@/components/flashcards/StoryFlashcardModal";
import { FlashcardArchiveModal } from "@/components/flashcards/FlashcardArchiveModal";
import { SpacecraftInfo, getSpacecraftById } from "@/data/spacecraftData";
import { NasaMissionBadge, getBadgeById } from "@/data/badgeData";

export default function HomePage() {
  const [currentView, setCurrentView] = useState<"welcome" | "solar" | "story">("welcome");
  const [isWarpLaunching, setIsWarpLaunching] = useState(false);
  const [isMarsCinematic, setIsMarsCinematic] = useState(false);

  // Modals state
  const [selectedSpacecraft, setSelectedSpacecraft] = useState<SpacecraftInfo | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSolarExplainerOpen, setIsSolarExplainerOpen] = useState(false);
  const [isFleetDrawerOpen, setIsFleetDrawerOpen] = useState(false);

  // Activity Modals state
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isColoringOpen, setIsColoringOpen] = useState(false);
  const [isBuildSpaceshipOpen, setIsBuildSpaceshipOpen] = useState(false);

  // NASA Patches & Flashcards state (Merged from Astrorelics)
  const [isBadgesBoardOpen, setIsBadgesBoardOpen] = useState(false);
  const [isFlashcardsArchiveOpen, setIsFlashcardsArchiveOpen] = useState(false);
  const [celebrationBadge, setCelebrationBadge] = useState<NasaMissionBadge | null>(null);
  const [activeFlashcardSpacecraftId, setActiveFlashcardSpacecraftId] = useState<string | null>(null);

  // Handle starting journey from Welcome Page
  const handleStartJourney = () => {
    setIsWarpLaunching(true);
  };

  const handleWarpComplete = () => {
    setIsWarpLaunching(false);
    setCurrentView("solar");
  };

  // Handle Opportunity click from Solar System or Modals -> triggers Cinematic Journey to Mars
  const handleLaunchOpportunityToMars = () => {
    setIsDetailModalOpen(false);
    setIsMarsCinematic(true);
  };

  const handleMarsCinematicComplete = () => {
    setIsMarsCinematic(false);
    setCurrentView("story");
  };

  // Spacecraft Selection Handler
  const handleSelectSpacecraft = (craft: SpacecraftInfo) => {
    setSelectedSpacecraft(craft);
    setIsDetailModalOpen(true);
  };

  const handleSelectSpacecraftById = (id: string) => {
    const craft = getSpacecraftById(id);
    if (craft) {
      handleSelectSpacecraft(craft);
    }
  };

  const handleShowBadgeCelebration = (badgeId: string) => {
    const badge = getBadgeById(badgeId);
    if (badge) {
      setCelebrationBadge(badge);
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-space-void text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* 60fps Starfield Canvas Background */}
      <StarfieldCanvas
        warpSpeed={isWarpLaunching}
        interactive={currentView !== "story"}
      />

      {/* Main Persistent Header with Activity Buttons */}
      <Header
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenFleet={() => setIsFleetDrawerOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenColoringBook={() => setIsColoringOpen(true)}
        onOpenBuildSpaceship={() => setIsBuildSpaceshipOpen(true)}
        onOpenBadges={() => setIsBadgesBoardOpen(true)}
        onOpenFlashcards={() => setIsFlashcardsArchiveOpen(true)}
      />

      {/* VIEW 1: WELCOME SCREEN */}
      {currentView === "welcome" && (
        <WelcomeScreen
          onStartJourney={handleStartJourney}
          onOpenSpacecraft={handleSelectSpacecraftById}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenColoringBook={() => setIsColoringOpen(true)}
          onOpenBuildSpaceship={() => setIsBuildSpaceshipOpen(true)}
          onOpenBadges={() => setIsBadgesBoardOpen(true)}
          onOpenFlashcards={() => setIsFlashcardsArchiveOpen(true)}
        />
      )}

      {/* VIEW 2: SOLAR SYSTEM EXPLORATION */}
      {currentView === "solar" && (
        <SolarSystemView
          onSelectSpacecraft={handleSelectSpacecraft}
          onLaunchOpportunity={handleLaunchOpportunityToMars}
          onOpenSolarPowerExplainer={() => setIsSolarExplainerOpen(true)}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenColoringBook={() => setIsColoringOpen(true)}
          onOpenBuildSpaceship={() => setIsBuildSpaceshipOpen(true)}
          onOpenBadges={() => setIsBadgesBoardOpen(true)}
          onOpenFlashcards={() => setIsFlashcardsArchiveOpen(true)}
        />
      )}

      {/* VIEW 3: OPPORTUNITY STORY EXPERIENCE */}
      {currentView === "story" && (
        <StoryExperience
          onReturnToSolarSystem={() => setCurrentView("solar")}
          onSelectOtherSpacecraft={() => setIsFleetDrawerOpen(true)}
          onOpenFlashcard={(id) => setActiveFlashcardSpacecraftId(id)}
          onOpenBadgeCelebration={handleShowBadgeCelebration}
        />
      )}

      {/* ================= TRANSITIONS ================= */}
      {/* 1. Warp Blast-Off Transition (Welcome -> Solar System) */}
      <WarpLaunchTransition
        isActive={isWarpLaunching}
        onComplete={handleWarpComplete}
      />

      {/* 2. Cinematic Journey to Mars (Solar System -> Story) */}
      <CinematicMarsTransition
        isActive={isMarsCinematic}
        onComplete={handleMarsCinematicComplete}
      />

      {/* ================= INTERACTIVE MODALS ================= */}
      {/* Spacecraft Mission Card & Quiz Modal */}
      <SpacecraftDetailModal
        spacecraft={selectedSpacecraft}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onLaunchOpportunityStory={handleLaunchOpportunityToMars}
        onOpenFlashcard={(id) => setActiveFlashcardSpacecraftId(id)}
      />

      {/* Photovoltaic Solar Power Science Explainer Modal */}
      <SolarPowerExplainerModal
        isOpen={isSolarExplainerOpen}
        onClose={() => setIsSolarExplainerOpen(false)}
      />

      {/* Full Fleet Drawer Modal */}
      <FleetDrawerModal
        isOpen={isFleetDrawerOpen}
        onClose={() => setIsFleetDrawerOpen(false)}
        onSelectSpacecraft={handleSelectSpacecraft}
      />

      {/* 1. Cosmic Detective Space Quiz Modal */}
      <CosmicQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAwardBadge={handleShowBadgeCelebration}
      />

      {/* 2. Space Coloring Book Studio Modal */}
      <ColoringBookModal
        isOpen={isColoringOpen}
        onClose={() => setIsColoringOpen(false)}
        onBadgeAwarded={handleShowBadgeCelebration}
      />

      {/* 3. Build-Your-Own-Spaceship Workshop Modal */}
      <BuildSpaceshipModal
        isOpen={isBuildSpaceshipOpen}
        onClose={() => setIsBuildSpaceshipOpen(false)}
      />

      {/* 4. Official NASA Mission Patches Board Modal */}
      <BadgeBoardModal
        isOpen={isBadgesBoardOpen}
        onClose={() => setIsBadgesBoardOpen(false)}
        onNavigateToSpacecraft={(craftId) => {
          handleSelectSpacecraftById(craftId);
        }}
      />

      {/* 5. Cosmic Story Summary Flashcard Modal (Single Spacecraft after story) */}
      <StoryFlashcardModal
        spacecraftId={activeFlashcardSpacecraftId || "opportunity"}
        isOpen={activeFlashcardSpacecraftId !== null}
        onClose={() => setActiveFlashcardSpacecraftId(null)}
        onClaimBadge={() => {
          setActiveFlashcardSpacecraftId(null);
          handleShowBadgeCelebration("badge-opportunity-marathoner");
        }}
      />

      {/* 6. Cosmic Flashcards Archive Modal (Repository of all cards) */}
      <FlashcardArchiveModal
        isOpen={isFlashcardsArchiveOpen}
        onClose={() => setIsFlashcardsArchiveOpen(false)}
        onSelectSpacecraft={(craftId) => {
          setIsFlashcardsArchiveOpen(false);
          handleSelectSpacecraftById(craftId);
        }}
      />

      {/* 7. Celebratory Badge Award Modal */}
      <BadgeCelebrationModal
        badge={celebrationBadge}
        isOpen={celebrationBadge !== null}
        onClose={() => setCelebrationBadge(null)}
        onOpenBadgeBoard={() => {
          setCelebrationBadge(null);
          setIsBadgesBoardOpen(true);
        }}
      />
    </main>
  );
}

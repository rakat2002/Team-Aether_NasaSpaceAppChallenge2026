"use client";

import React from "react";
import { OpportunityModel } from "./OpportunityModel";
import { SpiritModel } from "./SpiritModel";
import { Apollo11Model } from "./Apollo11Model";
import { Voyager1Model } from "./Voyager1Model";
import { Voyager2Model } from "./Voyager2Model";
import { Viking1Model } from "./Viking1Model";
import { CuriosityModel } from "./CuriosityModel";
import { PerseveranceModel } from "./PerseveranceModel";

interface SpacecraftRendererProps {
  id: string;
  size?: number;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
  onPartClick?: (partId: string, partName: string, description: string) => void;
  onSolarPowerClick?: () => void;
}

export const SpacecraftRenderer: React.FC<SpacecraftRendererProps> = ({
  id,
  size = 180,
  interactive = true,
  className = "",
  onClick,
  onPartClick,
  onSolarPowerClick,
}) => {
  switch (id) {
    case "opportunity":
      return (
        <OpportunityModel
          size={size}
          interactive={interactive}
          className={className}
          onPartClick={onPartClick}
          onSolarPowerClick={onSolarPowerClick}
        />
      );
    case "spirit":
      return <SpiritModel size={size} className={className} onClick={onClick} />;
    case "apollo-11-lm":
      return <Apollo11Model size={size} className={className} onClick={onClick} />;
    case "voyager-1":
      return <Voyager1Model size={size} className={className} onClick={onClick} />;
    case "voyager-2":
      return <Voyager2Model size={size} className={className} onClick={onClick} />;
    case "viking-1":
      return <Viking1Model size={size} className={className} onClick={onClick} />;
    case "curiosity":
      return <CuriosityModel size={size} className={className} onClick={onClick} />;
    case "perseverance":
      return <PerseveranceModel size={size} className={className} onClick={onClick} />;
    default:
      return <OpportunityModel size={size} className={className} onClick={onClick} />;
  }
};

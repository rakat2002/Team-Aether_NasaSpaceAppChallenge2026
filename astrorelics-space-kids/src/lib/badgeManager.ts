"use client";

import { NASA_MISSION_BADGES, NasaMissionBadge, getBadgeById } from "@/data/badgeData";
import { soundEngine } from "./audio";

const STORAGE_KEY = "astrorelics_unlocked_badges";
const XP_STORAGE_KEY = "astrorelics_total_xp";

export interface EarnedBadgeRecord {
  badgeId: string;
  unlockedAt: string; // ISO string
}

class BadgeManager {
  private earnedBadges: Map<string, string> = new Map(); // badgeId -> ISO date
  private totalXP: number = 0;
  private listeners: Set<() => void> = new Set();

  constructor() {
    if (typeof window !== "undefined") {
      this.loadFromStorage();
    }
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: EarnedBadgeRecord[] = JSON.parse(stored);
        parsed.forEach((item) => {
          this.earnedBadges.set(item.badgeId, item.unlockedAt);
        });
      }

      const xpStored = localStorage.getItem(XP_STORAGE_KEY);
      if (xpStored) {
        this.totalXP = parseInt(xpStored, 10) || 0;
      }
    } catch (e) {
      console.error("Failed to load badge records from storage:", e);
    }
  }

  private saveToStorage() {
    try {
      const records: EarnedBadgeRecord[] = Array.from(this.earnedBadges.entries()).map(
        ([badgeId, unlockedAt]) => ({ badgeId, unlockedAt })
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      localStorage.setItem(XP_STORAGE_KEY, this.totalXP.toString());
    } catch (e) {
      console.error("Failed to save badge records to storage:", e);
    }
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  public isUnlocked(badgeId: string): boolean {
    return this.earnedBadges.has(badgeId);
  }

  public getEarnedDate(badgeId: string): string | null {
    return this.earnedBadges.get(badgeId) || null;
  }

  public getEarnedBadgeCount(): number {
    return this.earnedBadges.size;
  }

  public getTotalBadges(): number {
    return NASA_MISSION_BADGES.length;
  }

  public getTotalXP(): number {
    return this.totalXP;
  }

  public unlockBadge(badgeId: string): { isNewlyUnlocked: boolean; badge?: NasaMissionBadge } {
    const badge = getBadgeById(badgeId);
    if (!badge) return { isNewlyUnlocked: false };

    if (!this.earnedBadges.has(badgeId)) {
      this.earnedBadges.set(badgeId, new Date().toISOString());
      this.totalXP += badge.xpReward;
      this.saveToStorage();
      soundEngine.playSuccess();
      return { isNewlyUnlocked: true, badge };
    }

    return { isNewlyUnlocked: false, badge };
  }

  public addXP(amount: number) {
    this.totalXP += amount;
    this.saveToStorage();
  }

  public getAllEarnedBadges(): { badge: NasaMissionBadge; unlockedAt: string }[] {
    const results: { badge: NasaMissionBadge; unlockedAt: string }[] = [];
    this.earnedBadges.forEach((unlockedAt, badgeId) => {
      const b = getBadgeById(badgeId);
      if (b) results.push({ badge: b, unlockedAt });
    });
    return results;
  }
}

export const badgeManager = new BadgeManager();

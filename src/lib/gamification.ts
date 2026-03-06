/**
 * Core Gamification Logic for VARGA Math
 */

export interface MissionResult {
    xpEarned: number;
    levelUp: boolean;
    newBadge?: string;
}

export function calculateXp(
    correctness: number, // 0 to 1
    difficulty: number,  // 1 to 5
    timeSpentSecs: number
): number {
    const baseSpeedBonus = Math.max(0, 100 - timeSpentSecs / 10);
    const xp = (correctness * 100) * difficulty + baseSpeedBonus;
    return Math.round(xp);
}

export function checkLevelUp(currentXp: number, currentLevel: number): boolean {
    const xpRequired = currentLevel * 1000;
    return currentXp >= xpRequired;
}

export const BADGES = {
    SPATIAL_VIRTUOSO: {
        id: "spatial_virtuoso",
        name: "Spatial Virtuoso",
        description: "Completed 3 geometry labs with 100% accuracy.",
    },
    FAST_LEARNER: {
        id: "fast_learner",
        name: "Fast Learner",
        description: "Completed a mission in under 60 seconds.",
    },
};

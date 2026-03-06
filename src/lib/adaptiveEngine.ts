/**
 * Adaptive Sequencing Engine
 * Based on VARK profiles and performance.
 */

import { IVarkProfile } from "@/models/User";

export type Modality = "visual" | "auditory" | "reading" | "kinesthetic";

export function getRecommendedModality(
    profile: IVarkProfile,
    conceptHistory?: any // Performance history for this concept
): Modality {
    // Simple algorithm: choose the modality with the highest weight
    // In Phase 2+, this would use Thompson Sampling / Multi-Armed Bandit

    const weights: Record<Modality, number> = {
        visual: profile.visual,
        auditory: profile.auditory,
        reading: profile.reading,
        kinesthetic: profile.kinesthetic,
    };

    let recommended: Modality = "visual";
    let maxWeight = -1;

    for (const [modality, weight] of Object.entries(weights)) {
        if (weight > maxWeight) {
            maxWeight = weight;
            recommended = modality as Modality;
        }
    }

    return recommended;
}

import { deltaE } from "color-delta-e";

import type Team from "../types/team";
import type NearestColor from "../types/nearestColor";

export default function nearestColorsTeams(
  primaryInputHex: string,
  secondaryInputHex: string,
  baseColors: Team[],
): NearestColor[] {
  const distances: NearestColor[] = [];

  baseColors.forEach(({ colors }, i) => {
    const primaryDistance = deltaE(primaryInputHex, colors.primary);
    const secondaryDistance = deltaE(secondaryInputHex, colors.secondary);

    distances.push({ distance: primaryDistance + secondaryDistance, index: i });
  });

  return distances.sort((a, b) => a.distance - b.distance);
}

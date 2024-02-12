import React from "react";

import { convertRange, proximityColor } from "../lib/distanceBadge";

import styles from "./distanceBadge.module.css";

const ACCEPTABLE_DISTANCE = 50;

const DistanceBadge = ({ distance }: { distance: number }) => {
  const adjustedDistance = convertRange(
    distance,
    [0, ACCEPTABLE_DISTANCE],
    [0, 1],
  );
  return (
    <span
      className={styles.distanceBadge}
      style={{
        backgroundColor: proximityColor(adjustedDistance),
      }}
    >
      {distance.toFixed(2)}
    </span>
  );
};

export default DistanceBadge;

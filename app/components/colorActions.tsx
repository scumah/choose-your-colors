import React from "react";
import {
  FaExchangeAlt,
  FaBullseye,
  FaRegQuestionCircle,
  FaRegTimesCircle,
} from "react-icons/fa";

import styles from "./colorActions.module.css";

import { TeamWithDistance } from "../types/team";

const ColorActions = ({
  data,
  primaryColor,
  secondaryColor,
  setPrimaryColor,
  setSecondaryColor,
  setClosestTeams,
  updateColors,
}: {
  data: TeamWithDistance[];
  primaryColor: string | null;
  secondaryColor: string | null;
  setPrimaryColor: (arg: string | null) => void;
  setSecondaryColor: (arg: string | null) => void;
  setClosestTeams: (arg: []) => void;
  updateColors: (arg1: string | null, arg2: string | null) => void;
}) => {
  const getRandomTeamColors = () => {
    const randomTeam = data[Math.floor(Math.random() * data.length)];
    setPrimaryColor(randomTeam.colors.primary);
    setSecondaryColor(randomTeam.colors.secondary);
  };

  const randomizeColors = () => {
    const rPrimaryColor = Math.floor(Math.random() * 16777215).toString(16);
    const rSecondaryColor = Math.floor(Math.random() * 16777215).toString(16);
    setPrimaryColor(`#${rPrimaryColor}`);
    setSecondaryColor(`#${rSecondaryColor}`);
  };

  const resetColors = () => {
    setPrimaryColor(null);
    setSecondaryColor(null);
    setClosestTeams([]);
  };

  return (
    <div className={styles.buttonsWrapper}>
      <button
        title="Swap colors"
        className={`${styles.actionButton} ${styles.swapButton}`}
        onClick={() => updateColors(secondaryColor, primaryColor)}
      >
        <FaExchangeAlt />
      </button>
      <button
        title="Set random team colors"
        className={styles.actionButton}
        onClick={getRandomTeamColors}
      >
        <FaBullseye />
      </button>
      <button
        title="Set random colors"
        className={styles.actionButton}
        onClick={randomizeColors}
      >
        <FaRegQuestionCircle />
      </button>
      <button
        title="Reset colors"
        className={styles.actionButton}
        onClick={resetColors}
      >
        <FaRegTimesCircle />
      </button>
    </div>
  );
};

export default ColorActions;

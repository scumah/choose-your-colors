import React from "react";
import Image from "next/image";

import styles from "./team.module.css";

import sportIcon from "../lib/sportIcon";
import DistanceBadge from "./distanceBadge";

import { TeamWithDistance } from "../types/team";

const Team = ({
  team,
  setTeamColors,
}: {
  team: TeamWithDistance;
  setTeamColors: Function;
}) => {
  return (
    <div className={styles.teamWrapper}>
      <div className={styles.badgeContainer}>
        <Image
          src={`https://api.sofascore.app/api/v1/team/${team.id}/image`}
          width={53}
          height={53}
          alt={`${team.name} logo`}
        />
      </div>

      <h2 className={styles.teamName} title={team.name}>
        {team.name}
      </h2>

      <div className={styles.infoContainer}>
        <Image
          src={`https://flagcdn.com/${team.country.code.toLowerCase()}.svg`}
          width={20}
          height={15}
          alt={`${team.country.name} flag`}
        />
        {team.country.name}
        {sportIcon(team.sport)}
      </div>

      <div className={styles.distanceContainer}>
        <DistanceBadge distance={team.distance} />
      </div>

      <div className={styles.colorsContainer}>
        <button
          title="Set team colors"
          onClick={() =>
            setTeamColors(team.colors.primary, team.colors.secondary)
          }
          className={styles.teamColorsButton}
        >
          <span
            style={{ backgroundColor: team.colors.primary }}
            className={styles.teamColor}
          ></span>
          <span
            style={{ backgroundColor: team.colors.secondary }}
            className={styles.teamColor}
          ></span>
        </button>
      </div>
    </div>
  );
};

export default Team;

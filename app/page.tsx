"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { useQueryState } from "nuqs";
import {
  FaExchangeAlt,
  FaRegQuestionCircle,
  FaBullseye,
  FaRegTimesCircle,
} from "react-icons/fa";

import PopoverPicker from "./components/popover-picker";
import InitialLoader from "./components/initialLoader";
import Team from "./components/team";
import styles from "./page.module.css";
import layoutStyles from "./layout.module.css";

import nearestColorsTeams from "./lib/nearestColorsTeams";
import useDebounce from "./hooks/useDebounce";

import { TeamWithDistance } from "./types/team";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [primaryColor, setPrimaryColor] = useQueryState("primary", {
    defaultValue: "",
  });
  const [secondaryColor, setSecondaryColor] = useQueryState("secondary", {
    defaultValue: "",
  });
  const debouncedPrimaryColor = useDebounce<string>(primaryColor, 100);
  const debouncedSecondaryColor = useDebounce<string>(secondaryColor, 100);

  const [closestTeams, setClosestTeams] = useState<TeamWithDistance[]>([]);

  const { data, error, isLoading } = useSWR("/teams.json", fetcher);

  useEffect(() => {
    if (debouncedPrimaryColor && debouncedSecondaryColor && data) {
      setClosestTeams(
        nearestColorsTeams(
          debouncedPrimaryColor,
          debouncedSecondaryColor,
          data,
        ).map((nearTeam) => ({
          ...data[nearTeam.index],
          distance: nearTeam.distance,
        })),
      );
    }
  }, [debouncedPrimaryColor, debouncedSecondaryColor, data]);

  const updateColors = (newPrimaryColor: string, newSecondaryColor: string) => {
    setPrimaryColor(newPrimaryColor);
    setSecondaryColor(newSecondaryColor);
  };

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

  if (error) return <p>Error fetching teams data</p>;

  return (
    <main className={layoutStyles.main}>
      <InitialLoader isLoading={isLoading} />
      <p className={styles.explanation}>
        Pick two colors, any two colors you love, and we&apos;ll show you sports
        teams that rock similar shades. It&apos;s that easy!
      </p>

      <div className={styles.pickersWrapper}>
        <PopoverPicker color={primaryColor} onChange={setPrimaryColor} />
        <div className={styles.buttonsWrapper}>
          <button
            title="Swap colors"
            className={styles.actionButton}
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
        <PopoverPicker color={secondaryColor} onChange={setSecondaryColor} />
      </div>

      <div className="result">
        {closestTeams.map((team: TeamWithDistance) => (
          <Team
            key={`${team.name}-${team.sport}`}
            team={team}
            setTeamColors={updateColors}
          />
        ))}
      </div>
    </main>
  );
}

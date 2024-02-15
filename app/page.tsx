"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { useQueryState } from "nuqs";

import { FaExclamationCircle } from "react-icons/fa";

import PopoverPicker from "./components/popoverPicker";
import InitialLoader from "./components/initialLoader";
import Team from "./components/team";
import ColorActions from "./components/colorActions";

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
  const [resultLength, setResultLength] = useState<number>(5);

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
  }, [debouncedPrimaryColor, debouncedSecondaryColor, data, resultLength]);

  const updateColors = (
    newPrimaryColor: string | null,
    newSecondaryColor: string | null,
  ) => {
    setPrimaryColor(newPrimaryColor);
    setSecondaryColor(newSecondaryColor);
  };

  if (error) {
    return (
      <p className={`${layoutStyles.main} ${styles.fetchError}`}>
        <FaExclamationCircle />
        I&apos;m afraid there was an error fetching teams data. You can try
        again, but I&apos;m sorry to say it probably wont work either. I&apos;ll
        look into it soon though.
      </p>
    );
  }

  return (
    <main className={layoutStyles.main}>
      <InitialLoader isLoading={isLoading} />
      <p className={styles.explanation}>
        Pick two colors, any two colors you love, and we&apos;ll show you sports
        teams that rock similar shades. It&apos;s that easy!
      </p>
      <div className={styles.pickersWrapper}>
        <PopoverPicker color={primaryColor} onChange={setPrimaryColor} />
        <ColorActions
          data={data}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          setPrimaryColor={setPrimaryColor}
          setSecondaryColor={setSecondaryColor}
          setClosestTeams={setClosestTeams}
          updateColors={updateColors}
        />
        <PopoverPicker color={secondaryColor} onChange={setSecondaryColor} />
      </div>
      <div className={styles.resultsLengthSliderWrapper}>
        <input
          className={styles.resultsLengthSlider}
          type="range"
          min="1"
          max="20"
          value={resultLength}
          onChange={(e) => setResultLength(+e.target.value)}
          step="1"
        ></input>
        <span>Show {resultLength} teams</span>
      </div>
      {closestTeams.slice(0, resultLength).map((team: TeamWithDistance) => (
        <Team
          key={`${team.name}-${team.sport}`}
          team={team}
          setTeamColors={updateColors}
        />
      ))}
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { useQueryState } from "nuqs";

import Header from "./components/header";
import Footer from "./components/footer";
import PopoverPicker from "./components/popoverPicker";
import InitialLoader from "./components/initialLoader";
import Team from "./components/team";
import ColorActions from "./components/colorActions";
import ThemeToggler from "./components/themeToggler";

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

  const updateColors = (
    newPrimaryColor: string | null,
    newSecondaryColor: string | null,
  ) => {
    setPrimaryColor(newPrimaryColor);
    setSecondaryColor(newSecondaryColor);
  };

  if (error) {
    return <p className={styles.mainWrapper}>Error fetching teams data</p>;
  }

  return (
    <div className={styles.mainWrapper}>
      <Header />
      <main className={layoutStyles.main}>
        <InitialLoader isLoading={isLoading} />
        <p className={styles.explanation}>
          Pick two colors, any two colors you love, and we&apos;ll show you
          sports teams that rock similar shades. It&apos;s that easy!
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
      <Footer>
        <ThemeToggler />
      </Footer>
    </div>
  );
}

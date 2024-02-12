import nearestColorsTeams from "../nearestColorsTeams";
import type Team from "../../types/team";

describe("nearestColorsTeams", () => {
  const teams: Team[] = [
    {
      id: 1,
      name: "Team 1",
      colors: { primary: "#FFFFFF", secondary: "#000000", text: "#ffffff" },
      sport: "Football",
      country: { code: "ES", name: "Spain" },
    },
    {
      id: 2,
      name: "Team 2",
      colors: { primary: "#000000", secondary: "#FFFFFF", text: "#ffffff" },
      sport: "Football",
      country: { code: "CR", name: "Costa Rica" },
    },
  ];

  it("returns the team with the closest colors", () => {
    const result = nearestColorsTeams("#FEFEFE", "#010101", teams);
    expect(result[0].index).toBe(0);
  });

  it("returns the second team if its colors are closer", () => {
    const result = nearestColorsTeams("#010101", "#FEFEFE", teams);
    expect(result[0].index).toBe(1);
  });

  it("returns the first team if the input colors are equally distant from both teams", () => {
    const result = nearestColorsTeams("#808080", "#808080", teams);
    expect(result[0].index).toBe(0);
  });
});

import { proximityColor, convertRange } from "../distanceBadge";

describe("convertRange", () => {
  it("converts a value from one range to another", () => {
    const result = convertRange(50, [0, 100], [0, 1]);
    expect(result).toBe(0.5);
  });
});

describe("proximityColor", () => {
  it("returns the correct color when distance is 0", () => {
    const result = proximityColor(0);
    expect(result).toEqual("hsl(120,100%,35%)");
  });

  it("returns the correct color when distance is 1", () => {
    const result = proximityColor(1);
    expect(result).toEqual("hsl(0,100%,35%)");
  });

  it("returns the correct color when distance is .5", () => {
    const result = proximityColor(0.5);
    expect(result).toEqual("hsl(60,100%,35%)");
  });
});

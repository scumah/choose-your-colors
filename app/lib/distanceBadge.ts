type Range = [number, number];

export function convertRange(value: number, r1: Range, r2: Range) {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
}

export function proximityColor(distance: number): string {
  const hue = (1 - distance) * 120;
  return `hsl(${hue},100%,35%)`;
}

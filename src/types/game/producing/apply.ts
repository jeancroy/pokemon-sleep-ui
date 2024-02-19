export const applyMultiplierTargets = [
  'frequency',
  'qty',
  'strength',
] as const;

export type ApplyMultiplierTarget = typeof applyMultiplierTargets[number];

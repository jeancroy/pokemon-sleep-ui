export const strengthMultiplierType = [
  'berry',
  'cooking',
  'skill',
] as const;

export type StrengthMultiplierType = typeof strengthMultiplierType[number];

export type StrengthMultiplier = {[type in StrengthMultiplierType]: number};

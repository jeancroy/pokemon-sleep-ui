export const extraTastyTiming = [
  'weekday',
  'weekend',
] as const;

export type ExtraTastyTiming = typeof extraTastyTiming[number];

export type ExtraTastyInfoUnit = {
  rate: number,
  multiplier: number,
};

export type ExtraTastyByMealAlgorithmInfo = {
  sizeOfState: number,
};

export type ExtraTastyInfo = {
  byMeal: ExtraTastyInfoUnit[],
  overall: ExtraTastyInfoUnit,
  byMealAlgorithmInfo: ExtraTastyByMealAlgorithmInfo[],
};

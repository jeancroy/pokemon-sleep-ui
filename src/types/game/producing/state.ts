export const producingState = [
  'awake',
  'sleep1',
  'sleep2',
] as const;

export type ProducingState = typeof producingState[number];

export const producingStateWithPack = [
  'awake',
  'sleep1Vacant',
  'sleep1Filled',
  'sleep2Vacant',
  'sleep2Filled',
] as const;

export type ProducingStateWithPack = typeof producingStateWithPack[number];

export const producingStateCalculated = [
  ...producingStateWithPack,
  'equivalent',
  'unfilledOnly',
] as const;

export type ProducingStateCalculated = typeof producingStateCalculated[number];

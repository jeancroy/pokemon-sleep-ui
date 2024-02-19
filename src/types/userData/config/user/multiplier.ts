import {StrengthMultiplierType} from '@/types/game/bonus/strength';


export const userStrengthMultiplierApplyBehavior = [
  'default',
  'custom',
] as const;

export type UserStrengthMultiplierApplyBehavior = typeof userStrengthMultiplierApplyBehavior[number];

export type UserStrengthMultiplierConfigEntry = {
  behavior: UserStrengthMultiplierApplyBehavior,
  value: number,
};

export type UserStrengthMultiplierConfig = {
  [type in StrengthMultiplierType]: UserStrengthMultiplierConfigEntry
};

export type UserMultiplierConfig = {
  strength: UserStrengthMultiplierConfig,
};

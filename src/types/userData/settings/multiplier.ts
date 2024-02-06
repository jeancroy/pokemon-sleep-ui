import {StrengthMultiplierType} from '@/types/game/bonus/strength';


export const userStrengthMultiplierApplyBehavior = [
  'default',
  'custom',
] as const;

export type UserStrengthMultiplierApplyBehavior = typeof userStrengthMultiplierApplyBehavior[number];

export type UserStrengthMultiplierSettingsEntry = {
  behavior: UserStrengthMultiplierApplyBehavior,
  value: number,
};

export type UserStrengthMultiplierSettings = {
  [type in StrengthMultiplierType]: UserStrengthMultiplierSettingsEntry
};

export type UserMultiplierSettings = {
  strength: UserStrengthMultiplierSettings,
};

import {StrengthMultiplierType} from '@/types/game/bonus/strength';
import {EventStrengthMultiplierData} from '@/types/game/event/strengthMultiplier';


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

export type UserMultiplierSettingsRequiredData = {
  eventStrengthMultiplierData: EventStrengthMultiplierData,
};

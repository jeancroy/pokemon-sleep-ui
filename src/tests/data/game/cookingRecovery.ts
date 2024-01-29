import {StaminaCookingRecoveryData} from '@/types/game/stamina/recovery';


export const testCookingRecoveryData: StaminaCookingRecoveryData[] = [
  {
    staminaRange: {start: 0, end: 21},
    recovery: 5,
    internalId: 1,
  },
  {
    staminaRange: {start: 21, end: 41},
    recovery: 4,
    internalId: 2,
  },
  {
    staminaRange: {start: 41, end: 61},
    recovery: 3,
    internalId: 3,
  },
  {
    staminaRange: {start: 61, end: 81},
    recovery: 2,
    internalId: 4,
  },
  {
    staminaRange: {start: 81, end: 100},
    recovery: 1,
    internalId: 5,
  },
];

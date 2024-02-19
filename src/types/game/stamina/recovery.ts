import {Interval} from '@/types/compute';
import {UserCookingMeal} from '@/types/userData/settings/cooking/common';


export type StaminaRecovery = {
  timing: number,
  getBaseAmount: (staminaBeforeRecovery?: number) => number,
  ignoreRecoveryRate: boolean,
};

export type StaminaRecoveryRateConfig = {
  general: number,
  sleep: number,
};

export type StaminaCookingRecoveryConfig = {[mealOfDay in UserCookingMeal]: number};

export type StaminaCookingRecoveryData = {
  internalId: number,
  staminaRange: Interval,
  recovery: number,
};

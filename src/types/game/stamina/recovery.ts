import {Interval} from '@/types/compute';
import {CookingMeal} from '@/types/userData/config/cooking/meal';


export type StaminaRecovery = {
  timing: number,
  getBaseAmount: (staminaBeforeRecovery?: number) => number,
  ignoreRecoveryRate: boolean,
};

export type StaminaRecoveryRateConfig = {
  general: number,
  sleep: number,
};

export type StaminaCookingRecoveryConfig = {[mealOfDay in CookingMeal]: number};

export type StaminaCookingRecoveryData = {
  internalId: number,
  staminaRange: Interval,
  recovery: number,
};

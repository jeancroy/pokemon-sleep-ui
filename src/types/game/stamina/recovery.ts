import {UserCookingMeal} from '@/types/userData/cooking';


export type StaminaRecovery = {
  timing: number,
  getAmount: (staminaBeforeRecovery?: number) => number,
};

export type StaminaRecoveryRateConfig = {
  general: number,
  sleep: number,
};

export type StaminaCookingRecoveryConfig = {[mealOfDay in UserCookingMeal]: number};

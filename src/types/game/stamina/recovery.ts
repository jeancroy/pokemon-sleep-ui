import {UserCookingMeal} from '@/types/userData/cooking';


export type StaminaRecovery = {
  timing: number,
  amount: number,
};

export type StaminaRecoveryRateConfig = {
  general: number,
  sleep: number,
};

export type StaminaCookingRecoveryConfig = {[mealOfDay in UserCookingMeal]: number};

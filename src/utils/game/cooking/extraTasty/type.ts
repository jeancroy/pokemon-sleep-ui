import {CookingMeal} from '@/types/userData/config/cooking/meal';


export type ExtraTastyBranch = {
  extraTastyPercentFromSkill: number,
  probability: number,
};

export type ExtraTastyLookup = Map<number, ExtraTastyBranch>;

export type ExtraTastyLookupOptions = {
  lookupStepSize: number,
};

export type ExtraTastySkillBoostPercentByMeal = {[meal in CookingMeal]: number};

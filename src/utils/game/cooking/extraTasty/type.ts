import {CookingMeal} from '@/types/userData/config/cooking/meal';


export type ExtraTastyBranch = {
  extraTastyPercentFromSkill: number,
  probability: number,
};

export type ExtraTastyLookup = Map<ExtraTastyBranch['extraTastyPercentFromSkill'], ExtraTastyBranch>;

export type ExtraTastySkillBoostPercentByMeal = {[meal in CookingMeal]: number};

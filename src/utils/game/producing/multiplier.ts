import {helpingBonusEffectPerStack} from '@/const/game/production/const';
import {EffectiveBonus} from '@/types/game/bonus/main';
import {StrengthMultiplierType} from '@/types/game/bonus/strength';
import {getAverage} from '@/utils/number/average';


type GetStrengthMultiplierOpts = {
  bonus: EffectiveBonus,
  strengthMultiplierType: StrengthMultiplierType,
};

export const getStrengthMultiplier = ({bonus, strengthMultiplierType}: GetStrengthMultiplierOpts): number => {
  const {overallMultiplier, strengthMultiplier} = bonus;

  // Map bonus is handled differently in different production type
  // - Berry: Math.ceil(unit strength * map bonus)
  // - Ingredient: unit strength * map bonus
  // - Skill: Math.ceil(unit strength * map bonus)
  // >>> This might not be up-to-date, check the actual implementation
  return overallMultiplier * strengthMultiplier[strengthMultiplierType];
};

export const getHelpingBonusMultiplier = (stacks: number) => {
  return helpingBonusEffectPerStack * stacks;
};

export const getHelpingBonusSimpleMultiplier = (maxMemberCount: number) => {
  const gains: number[] = [...Array(maxMemberCount).keys()]
    .map((i) => (1 - getHelpingBonusMultiplier(i)) / (1 - getHelpingBonusMultiplier(i + 1)) - 1);

  return 1 + getAverage(gains) * maxMemberCount;
};

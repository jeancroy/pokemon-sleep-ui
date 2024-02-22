import {ProduceSplit} from '@/types/game/producing/split';
import {MainSkillInstantHelpEffect} from '@/utils/game/mainSkill/bySkill/help/type';
import {ProductionForMainSkillCalc} from '@/utils/game/mainSkill/bySkill/type';


type GetMainSkillInstantHelpEffectOpts = {
  produceSplit: ProduceSplit,
  totalExtraHelps: number,
  targetCount: number,
  production: ProductionForMainSkillCalc,
};

export const getMainSkillInstantHelpEffect = ({
  produceSplit,
  totalExtraHelps,
  targetCount,
  production,
}: GetMainSkillInstantHelpEffectOpts): MainSkillInstantHelpEffect | null => {
  const helpCount = totalExtraHelps / targetCount;
  const {berry, ingredient} = production;

  const berryMultiplier = helpCount * produceSplit.berry;
  const ingredientMultiplier = helpCount * produceSplit.ingredient;

  return {
    helpCount,
    production: {
      berry: {
        period: 'daily',
        id: berry.id,
        qty: berry.value.qtyPerHelp * berryMultiplier,
        strength: berry.value.strengthPerHelp * berryMultiplier,
      },
      ingredient: ingredient.map(({id, value}) => ({
        period: 'daily',
        id,
        qty: value.qtyPerHelp * ingredientMultiplier,
        strength: value.strengthPerHelp * ingredientMultiplier,
      })),
    },
  };
};

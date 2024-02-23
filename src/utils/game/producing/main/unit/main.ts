import {PokemonProductionFirstPass} from '@/types/game/producing/rate/main';
import {getBerryProductionBase} from '@/utils/game/producing/branch/berry/base';
import {getBerryProductionFinal} from '@/utils/game/producing/branch/berry/final';
import {getIngredientProductionBaseList} from '@/utils/game/producing/branch/ingredient/base/main';
import {getIngredientProductionFinalList} from '@/utils/game/producing/branch/ingredient/final/main';
import {getMainSkillProduction} from '@/utils/game/producing/branch/mainSkill/direct/base';
import {getMainSkillProductionFinal} from '@/utils/game/producing/branch/mainSkill/direct/final';
import {getFullPackStats} from '@/utils/game/producing/inventory/fullPack/main';
import {getPokemonProductionIntermediateParams} from '@/utils/game/producing/main/unit/params';
import {GetPokemonProductionUnitOpts} from '@/utils/game/producing/main/unit/type';
import {getExpectedQtyPerHelp} from '@/utils/game/producing/qtyPerHelp';
import {getFinalizedProduction} from '@/utils/game/producing/reducer/finalize/main';
import {getProducingStateSplit} from '@/utils/game/producing/split';
import {ToFinalProductionOfDropCommonOpts} from '@/utils/game/producing/toFinal/type';


export const getPokemonProductionFirstPass = (opts: GetPokemonProductionUnitOpts): PokemonProductionFirstPass => {
  const {calculatedUserConfig} = opts;
  const {bonus} = calculatedUserConfig;
  const {sleepSessionInfo, intervalsDuringSleep} = bonus.stamina;

  const params = getPokemonProductionIntermediateParams(opts);
  const {
    isFullPack,
    period,
    frequency,
    carryLimitInfo,
    produceSplit,
    skillTrigger,
    activeSkillEffect,
  } = params;

  // Calculate base rates of berry and ingredient
  // > Base rate assumes all helps are giving the same drop type in the given `period`
  const berryBase = getBerryProductionBase({
    baseFrequency: frequency,
    ...opts,
  });
  const ingredientBaseList = getIngredientProductionBaseList({
    baseFrequency: frequency,
    ...opts,
  });
  const skillBase = getMainSkillProduction({
    baseFrequency: frequency,
    skillTrigger,
    activeSkillEffect,
    ...opts,
  });

  // Calculate inventory-related stats
  const fullPackStats = getFullPackStats({
    intervalsDuringSleep,
    isFullPack,
    carryLimit: carryLimitInfo.final,
    qtyPerHelp: getExpectedQtyPerHelp({
      rate: {berry: berryBase, ingredient: ingredientBaseList},
      produceSplit,
    }),
    frequency,
  });
  const producingStateSplit = getProducingStateSplit({
    sleepSessionInfo,
    fullPackStats,
  });

  // Calculate final rates of berry and ingredient
  // > Final rate assumes all helps are giving the same drop type in the given `period`,
  //    Stats like quantity, strength are the production in each state throughout the given period.
  //    For example, a quantity of 60 from `awake` means the Pokémon produces 60 items when it's awake.
  // > For ingredients, `qty` returned for each ingredient is already divides by possible ingredient drop.
  //    In other words, if the ingredient production from A of ABX is 80 assuming all ingredient spawns are A,
  //    the result will be 40 instead of 80.
  const finalCommonOpts: ToFinalProductionOfDropCommonOpts = {
    fullPackStats,
    calculatedUserConfig,
    sleepSessionInfo,
    skillTrigger,
  };
  const berryFinal = getBerryProductionFinal({
    base: berryBase,
    ...finalCommonOpts,
  });
  const ingredientFinalList = getIngredientProductionFinalList({
    baseList: ingredientBaseList,
    ...finalCommonOpts,
  });
  const skillFinal = getMainSkillProductionFinal({
    base: skillBase,
    ...finalCommonOpts,
  });

  return {
    params,
    noSkillTriggerPercent: {
      // Expected skill count is exactly the probability of having 1 skill during sleep
      primary: 1 - skillFinal.sleep1Vacant.qty,
      secondary: sleepSessionInfo.session.secondary ? 1 - skillFinal.sleep2Vacant.qty : null,
    },
    fullPackStats,
    producingStateSplit,
    baseRates: {
      berry: berryBase,
      ingredient: ingredientBaseList,
      skill: skillBase,
    },
    berry: getFinalizedProduction({
      period,
      rate: {
        base: berryBase,
        final: berryFinal,
      },
      produceSplitRate: produceSplit.berry,
      producingStateSplit,
    }),
    ingredient: Object.fromEntries(ingredientFinalList.map((final, idx) => [
      final.id,
      getFinalizedProduction({
        period,
        rate: {
          base: ingredientBaseList[idx],
          final,
        },
        produceSplitRate: produceSplit.ingredient,
        producingStateSplit,
      }),
    ])),
    skill: getFinalizedProduction({
      period,
      rate: {
        base: skillBase,
        final: skillFinal,
      },
      produceSplitRate: produceSplit.skill,
      producingStateSplit,
    }),
  };
};

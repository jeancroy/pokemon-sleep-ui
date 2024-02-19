import {PokemonProducingRate} from '@/types/game/producing/rate';
import {getMainSkillLevel} from '@/utils/game/mainSkill/level';
import {getBerryProducingRateBase} from '@/utils/game/producing/branch/berry/base';
import {getBerryProducingRateFinal} from '@/utils/game/producing/branch/berry/final';
import {getIngredientProducingRateBaseList} from '@/utils/game/producing/branch/ingredient/base/main';
import {getIngredientProducingRateFinalList} from '@/utils/game/producing/branch/ingredient/final/main';
import {getMainSkillProducingRateBase} from '@/utils/game/producing/branch/mainSkill/base';
import {getMainSkillProducingRateFinal} from '@/utils/game/producing/branch/mainSkill/final';
import {getFullPackStats} from '@/utils/game/producing/inventory/fullPack/main';
import {getPokemonProducingRateParams} from '@/utils/game/producing/main/base/params';
import {GetPokemonProducingRateBaseOpts} from '@/utils/game/producing/main/base/type';
import {getExpectedQtyPerHelp} from '@/utils/game/producing/qtyPerHelp';
import {getFinalizedProducingRate} from '@/utils/game/producing/reducer/finalize/main';
import {getProducingStateSplit} from '@/utils/game/producing/split';
import {ToFinalProducingRateOfDropCommonOpts} from '@/utils/game/producing/toFinal/type';


export const getPokemonProducingRateBase = (opts: GetPokemonProducingRateBaseOpts): PokemonProducingRate => {
  const {
    calculatedSettings,
    seeds,
    evolutionCount,
  } = opts;
  const {bonus} = calculatedSettings;
  const {sleepSessionInfo, intervalsDuringSleep} = bonus.stamina;

  const {
    isFullPack,
    period,
    frequency,
    subSkillBonus,
    carryLimitInfo,
    produceSplit,
    skillRatePercent,
  } = getPokemonProducingRateParams(opts);

  // Calculate base rates of berry and ingredient
  // > Base rate assumes all helps are giving the same drop type in the given `period`
  const berryBase = getBerryProducingRateBase({
    baseFrequency: frequency,
    ...opts,
  });
  const ingredientBaseList = getIngredientProducingRateBaseList({
    baseFrequency: frequency,
    ...opts,
  });
  const mainSkillBase = getMainSkillProducingRateBase({
    baseFrequency: frequency,
    skillLevel: getMainSkillLevel({
      seedsUsed: seeds.gold,
      evolutionCount,
      subSkillBonus,
    }),
    skillRatePercent,
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
  const finalCommonOpts: ToFinalProducingRateOfDropCommonOpts = {
    fullPackStats,
    calculatedSettings,
    sleepSessionInfo,
  };
  const berryFinal = getBerryProducingRateFinal({
    base: berryBase,
    ...finalCommonOpts,
  });
  const ingredientFinalList = getIngredientProducingRateFinalList({
    baseList: ingredientBaseList,
    ...finalCommonOpts,
  });
  const skillFinal = getMainSkillProducingRateFinal({
    base: mainSkillBase,
    ...finalCommonOpts,
  });

  return {
    period,
    fullPackStats,
    producingStateSplit,
    produceSplit,
    carryLimitInfo,
    skillRatePercent,
    berry: getFinalizedProducingRate({
      period,
      rate: berryFinal,
      produceSplitRate: produceSplit.berry,
      producingStateSplit,
    }),
    ingredient: Object.fromEntries(Object.values(ingredientFinalList).map((rate) => [
      rate.id,
      getFinalizedProducingRate({
        period,
        rate,
        produceSplitRate: produceSplit.ingredient,
        producingStateSplit,
      }),
    ])),
    skill: getFinalizedProducingRate({
      period,
      rate: skillFinal,
      produceSplitRate: produceSplit.skill,
      producingStateSplit,
    }),
  };
};


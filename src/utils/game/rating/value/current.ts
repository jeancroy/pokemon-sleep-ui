import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {getRatingBasisValue} from '@/utils/game/rating/basis';
import {GetRatingValueOfSimulationOpts} from '@/utils/game/rating/type';
import {getRatingProducingRateCalcBehavior} from '@/utils/game/rating/utils';
import {getRatingValueCommon} from '@/utils/game/rating/value/common';


export const getRatingValueOfCurrent = (opts: GetRatingValueOfSimulationOpts) => {
  const {
    basis,
    level,
    subSkill,
    nature,
  } = opts;

  const {
    singleParams,
    calculatedCookingConfig,
    targetMeals,
  } = getRatingValueCommon({
    baseOpts: opts,
    level,
    subSkill,
    nature,
  });

  return getRatingBasisValue({
    ...opts,
    rate: getPokemonProducingRateSingle({
      ...opts,
      ...singleParams,
      calculatedCookingConfig,
      calcBehavior: getRatingProducingRateCalcBehavior(basis),
    }).atStage.final,
    targetMeals,
  });
};

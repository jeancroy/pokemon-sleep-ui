import {RatingCombination} from '@/types/game/pokemon/rating/result';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/entry/single';
import {getRatingBasisValue} from '@/utils/game/rating/basis';
import {GetRatingValueOfSimulationOpts} from '@/utils/game/rating/type';
import {getRatingProducingRateCalcBehavior} from '@/utils/game/rating/utils';
import {getRatingValueCommon} from '@/utils/game/rating/value/common';


type GetRatingValueSingleOpts = Omit<
  GetRatingValueOfSimulationOpts,
  'ingredients' | 'subSkill' | 'nature'
> & {
  combination: RatingCombination,
};

export const getRatingValueOfPossibility = ({combination, ...opts}: GetRatingValueSingleOpts) => {
  const {level, basis} = opts;
  const {nature, subSkill, ingredients} = combination;

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
      ingredients,
      calculatedCookingConfig,
      calcBehavior: getRatingProducingRateCalcBehavior(basis),
    }).atStage.final,
    targetMeals,
  });
};

import {RatingCombination} from '@/types/game/pokemon/rating/result';
import {getPokemonProductionSingle} from '@/utils/game/producing/main/entry/single';
import {getRatingBasisValue} from '@/utils/game/rating/basis';
import {GetRatingValueOfSimulationOpts} from '@/utils/game/rating/type';
import {getRatingProductionCalcBehavior} from '@/utils/game/rating/utils';
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
    individual,
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
    rate: getPokemonProductionSingle({
      ...opts,
      individual,
      ingredients,
      calculatedCookingConfig,
      calcBehavior: getRatingProductionCalcBehavior(basis),
    }).atStage.final,
    targetMeals,
  });
};

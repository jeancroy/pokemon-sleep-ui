import {RatingWeightedStatsBasis} from '@/types/game/pokemon/rating/config';
import {RatingResultOfCategoryAtLevel} from '@/types/game/pokemon/rating/result';


type GetRatingWeightedStatsDataPointOpts = {
  resultOfCategory: RatingResultOfCategoryAtLevel,
  basis: RatingWeightedStatsBasis,
};

export const getRatingWeightedStatsFromResult = ({
  resultOfCategory,
  basis,
}: GetRatingWeightedStatsDataPointOpts): number => {
  const {percentage, percentile, baseDiffPercent} = resultOfCategory;

  if (basis === 'percentage') {
    return percentage;
  }

  if (basis === 'percentile') {
    return percentile;
  }

  if (basis === 'relativeStrength') {
    return baseDiffPercent;
  }

  throw new Error(`Unhandled weighted rating stats basis: [${basis satisfies never}`);
};

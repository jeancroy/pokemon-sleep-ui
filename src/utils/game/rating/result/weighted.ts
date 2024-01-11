import {RatingSummaryCommonProps} from '@/components/shared/pokemon/rating/type';
import {
  RatingWeightedStats,
  ratingWeightedStatsBasis,
  RatingWeightedStatsBasis,
} from '@/types/game/pokemon/rating/config';
import {RatingResultOfCategoryAtLevel} from '@/types/game/pokemon/rating/result';
import {getWeightedAverage, WeightedAverageDataPoint} from '@/utils/number/average';
import {isNotNullish} from '@/utils/type';


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

export const getRatingWeightedStats = ({
  activeKeyLevels,
  resultMap,
  config,
}: RatingSummaryCommonProps): RatingWeightedStats => {
  const {weight, category} = config;

  return Object.fromEntries(ratingWeightedStatsBasis.map((basis) => [
    basis,
    getWeightedAverage(activeKeyLevels.map((level): WeightedAverageDataPoint | null => {
      const resultOfLevel = resultMap[level];
      const weightOfLevel = weight[level];

      if (!resultOfLevel || !weightOfLevel) {
        return null;
      }

      return {
        num: getRatingWeightedStatsFromResult({
          resultOfCategory: resultOfLevel.result[category],
          basis,
        }),
        weight: weightOfLevel,
      };
    }).filter(isNotNullish)),
  ])) as RatingWeightedStats;
};

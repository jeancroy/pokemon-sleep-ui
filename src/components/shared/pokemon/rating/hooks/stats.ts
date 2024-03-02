import {RatingSummaryCommonProps} from '@/components/shared/pokemon/rating/type';
import {usePokemonKeyLevelConverter} from '@/hooks/pokemon/keyLevel/convert';
import {useSortedPokemonKeyLevels} from '@/hooks/pokemon/keyLevel/sorted';
import {RatingWeightedStats, ratingWeightedStatsBasis} from '@/types/game/pokemon/rating/config';
import {getRatingWeightedStatsFromResult} from '@/utils/game/rating/result/weighted';
import {getWeightedAverage, WeightedAverageDataPoint} from '@/utils/number/average';
import {isNotNullish} from '@/utils/type';


export const useRatingWeightedStats = ({
  resultMap,
  config,
}: RatingSummaryCommonProps): RatingWeightedStats => {
  const sortedPokemonKeyLevels = useSortedPokemonKeyLevels();
  const convertPokemonKeyLevel = usePokemonKeyLevelConverter();

  const {weight, category} = config;

  return Object.fromEntries(ratingWeightedStatsBasis.map((basis) => [
    basis,
    getWeightedAverage(sortedPokemonKeyLevels.map((level): WeightedAverageDataPoint | null => {
      const resultOfLevel = resultMap[convertPokemonKeyLevel(level)];
      const weightOfLevel = weight[level];

      if (!resultOfLevel || !weightOfLevel) {
        return null;
      }

      const weightedStats = getRatingWeightedStatsFromResult({
        resultOfCategory: resultOfLevel.result[category],
        basis,
      });

      // `NaN` for `weightedStats` means result not ready / unavailable, therefore skip weighting it
      if (isNaN(weightedStats)) {
        return null;
      }

      return {num: weightedStats, weight: weightOfLevel};
    }).filter(isNotNullish)),
  ])) as RatingWeightedStats;
};

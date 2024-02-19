import {productionMultiplierByPeriod} from '@/const/game/production/multiplier';
import {isProducingStateVacant} from '@/const/game/production/state';
import {ProducingRateOfDrop, ProducingValueByCalculatedStates} from '@/types/game/producing/rate';
import {producingStateWithPack} from '@/types/game/producing/state';
import {toSum} from '@/utils/array';
import {GetFinalizedProducingRateCommonOpts} from '@/utils/game/producing/reducer/finalize/type';
import {extractProducingValueForFinalization} from '@/utils/game/producing/reducer/finalize/utils';
import {KeysOfType} from '@/utils/type';


type GetFinalizedProducingRateSingleStatsOpts = GetFinalizedProducingRateCommonOpts & {
  key: KeysOfType<ProducingRateOfDrop, number>,
};

export const getFinalizedProducingRateSingleStats = ({
  period,
  rate,
  produceSplitRate,
  key,
}: GetFinalizedProducingRateSingleStatsOpts): ProducingValueByCalculatedStates => {
  const {base, final} = rate;

  const periodMultiplier = productionMultiplierByPeriod[period];

  // Stats are already the production in the given period under the certain state,
  // so no need to multiply by `sleepStateSplit.*`
  const multiplier = periodMultiplier * produceSplitRate;

  const unfilledOnly = toSum(
    producingStateWithPack
      .filter((state) => isProducingStateVacant[state])
      .map((state) => final[state][key]),
  ) * multiplier;
  const equivalent = unfilledOnly + toSum(
    producingStateWithPack
      .filter((state) => !isProducingStateVacant[state])
      .map((state) => final[state][key]),
  ) * multiplier;

  return {
    ...extractProducingValueForFinalization({rateFinal: final, key, multiplier}),
    base: base[key] * multiplier,
    equivalent,
    unfilledOnly,
  };
};

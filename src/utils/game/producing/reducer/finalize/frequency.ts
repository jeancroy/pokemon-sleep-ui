import {isProducingStateVacant} from '@/const/game/production/state';
import {ProducingValueByCalculatedStates} from '@/types/game/producing/rate';
import {producingStateWithPack} from '@/types/game/producing/state';
import {toSum} from '@/utils/array';
import {GetFinalizedProducingRateCommonOpts} from '@/utils/game/producing/reducer/finalize/type';
import {extractProducingValueForFinalization} from '@/utils/game/producing/reducer/finalize/utils';


type GetFinalizedProducingFrequencyOpts = Omit<GetFinalizedProducingRateCommonOpts, 'period'>;

export const getFinalizedProducingFrequency = ({
  rate,
  producingStateSplit,
  produceSplitRate,
}: GetFinalizedProducingFrequencyOpts): ProducingValueByCalculatedStates => {
  const unfilledOnlyDivisor = toSum(
    producingStateWithPack
      .filter((state) => isProducingStateVacant[state])
      .map((state) => producingStateSplit[state] / rate[state].frequency),
  ) * produceSplitRate;
  const filledDivisor = toSum(
    producingStateWithPack
      .filter((state) => !isProducingStateVacant[state])
      .map((state) => producingStateSplit[state] / rate[state].frequency),
  ) * produceSplitRate;

  return {
    ...extractProducingValueForFinalization({
      rate,
      key: 'frequency',
      multiplier: 1 / produceSplitRate,
    }),
    equivalent: 1 / (unfilledOnlyDivisor + filledDivisor),
    unfilledOnly: 1 / unfilledOnlyDivisor,
  };
};

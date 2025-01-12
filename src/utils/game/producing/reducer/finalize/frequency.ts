import {isProducingStateVacant} from '@/const/game/production/state';
import {ProductionValueByCalculatedStates} from '@/types/game/producing/rate/base';
import {producingStateWithPack} from '@/types/game/producing/state';
import {toSum} from '@/utils/array';
import {GetFinalizedProductionCommonOpts} from '@/utils/game/producing/reducer/finalize/type';
import {extractProducingValueForFinalization} from '@/utils/game/producing/reducer/finalize/utils';


type GetFinalizedProducingFrequencyOpts = Omit<GetFinalizedProductionCommonOpts, 'period'>;

export const getFinalizedProducingFrequency = ({
  rate,
  producingStateSplit,
  produceSplitRate,
}: GetFinalizedProducingFrequencyOpts): ProductionValueByCalculatedStates => {
  const {base, final} = rate;

  const unfilledOnlyDivisor = toSum(
    producingStateWithPack
      .filter((state) => isProducingStateVacant[state])
      .map((state) => producingStateSplit[state] / final[state].frequency),
  ) * produceSplitRate;
  const filledDivisor = toSum(
    producingStateWithPack
      .filter((state) => !isProducingStateVacant[state])
      .map((state) => producingStateSplit[state] / final[state].frequency),
  ) * produceSplitRate;

  return {
    ...extractProducingValueForFinalization({
      rateFinal: final,
      key: 'frequency',
      multiplier: 1 / produceSplitRate,
    }),
    base: base.frequency / produceSplitRate,
    equivalent: 1 / (unfilledOnlyDivisor + filledDivisor),
    unfilledOnly: 1 / unfilledOnlyDivisor,
  };
};

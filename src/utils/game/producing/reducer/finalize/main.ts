import {ProducingRateByCalculatedStates} from '@/types/game/producing/rate/base';
import {getFinalizedProducingFrequency} from '@/utils/game/producing/reducer/finalize/frequency';
import {getFinalizedProducingRateSingleStats} from '@/utils/game/producing/reducer/finalize/singleStats';
import {GetFinalizedProducingRateCommonOpts} from '@/utils/game/producing/reducer/finalize/type';


export const getFinalizedProducingRate = (
  opts: GetFinalizedProducingRateCommonOpts,
): ProducingRateByCalculatedStates => {
  const {period, rate} = opts;
  const {id} = rate.base;

  return {
    id,
    period,
    frequency: getFinalizedProducingFrequency(opts),
    qty: getFinalizedProducingRateSingleStats({key: 'qty', ...opts}),
    strength: getFinalizedProducingRateSingleStats({key: 'strength', ...opts}),
  };
};

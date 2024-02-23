import {ProductionByCalculatedStates} from '@/types/game/producing/rate/base';
import {getFinalizedProducingFrequency} from '@/utils/game/producing/reducer/finalize/frequency';
import {getFinalizedProductionSingleStats} from '@/utils/game/producing/reducer/finalize/singleStats';
import {GetFinalizedProductionCommonOpts} from '@/utils/game/producing/reducer/finalize/type';


export const getFinalizedProduction = (
  opts: GetFinalizedProductionCommonOpts,
): ProductionByCalculatedStates => {
  const {period, rate} = opts;
  const {id} = rate.base;

  return {
    id,
    period,
    frequency: getFinalizedProducingFrequency(opts),
    qty: getFinalizedProductionSingleStats({key: 'qty', ...opts}),
    strength: getFinalizedProductionSingleStats({key: 'strength', ...opts}),
  };
};

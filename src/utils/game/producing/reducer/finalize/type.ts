import {ProductionPeriod} from '@/types/game/producing/display';
import {ProducingRateOfDropByStateWithPack} from '@/types/game/producing/rate';
import {ProducingStateSplit} from '@/types/game/producing/split';


export type GetFinalizedProducingRateCommonOpts = {
  period: ProductionPeriod,
  rate: ProducingRateOfDropByStateWithPack,
  producingStateSplit: ProducingStateSplit,
  produceSplitRate: number,
};

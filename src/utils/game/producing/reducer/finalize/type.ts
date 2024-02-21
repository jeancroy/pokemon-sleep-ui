import {ProductionPeriod} from '@/types/game/producing/display';
import {ProducingRateOfDrop, ProducingRateOfDropByStateWithPack} from '@/types/game/producing/rate/base';
import {ProducingStateSplit} from '@/types/game/producing/split';


export type GetFinalizedProducingRateCommonOpts = {
  period: ProductionPeriod,
  rate: {
    base: ProducingRateOfDrop,
    final: ProducingRateOfDropByStateWithPack,
  },
  producingStateSplit: ProducingStateSplit,
  produceSplitRate: number,
};

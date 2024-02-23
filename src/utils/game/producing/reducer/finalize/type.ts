import {ProductionPeriod} from '@/types/game/producing/display';
import {ProductionOfDrop, ProductionOfDropByStateWithPack} from '@/types/game/producing/rate/base';
import {ProducingStateSplit} from '@/types/game/producing/split';


export type GetFinalizedProductionCommonOpts = {
  period: ProductionPeriod,
  rate: {
    base: ProductionOfDrop,
    final: ProductionOfDropByStateWithPack,
  },
  producingStateSplit: ProducingStateSplit,
  produceSplitRate: number,
};

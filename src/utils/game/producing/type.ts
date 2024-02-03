import {ProduceType} from '@/types/game/producing/common';
import {ProductionPeriod} from '@/types/game/producing/display';
import {ProducingRateOfItemOfSessions} from '@/types/game/producing/rate';
import {ProducingSleepStateSplit} from '@/types/game/producing/split';
import {SnorlaxFavorite} from '@/types/game/snorlax';


export type GetItemRateOfSessionCommonOpts = {
  period: ProductionPeriod,
  rate: ProducingRateOfItemOfSessions,
  produceType: ProduceType,
};

export type GetSpecificItemRateOfSessionCommonOpts = GetItemRateOfSessionCommonOpts & {
  produceItemSplit: number,
  sleepStateSplit: ProducingSleepStateSplit,
};

export type GetProducingRateSharedOpts = {
  snorlaxFavorite: SnorlaxFavorite,
  period?: ProductionPeriod,
  calcBehavior?: GetProducingRateBehavior,
};

export type GetProducingRateBehavior = {
  asSingle?: boolean,
};

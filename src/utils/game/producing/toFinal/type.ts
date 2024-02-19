import {FullPackStats} from '@/types/game/producing/inventory';
import {ProducingRateOfDrop} from '@/types/game/producing/rate';
import {ProduceType} from '@/types/game/producing/type';
import {SleepSessionInfo} from '@/types/game/sleep';
import {CalculatedUserConfig} from '@/types/userData/config/user/main';


export type ToFinalProducingRateForSleepCommonOpts = {
  base: ProducingRateOfDrop,
  produceType: ProduceType,
};

export type ToFinalProducingRateOfDropCommonOpts = {
  fullPackStats: FullPackStats,
  calculatedUserConfig: CalculatedUserConfig,
  sleepSessionInfo: SleepSessionInfo,
};

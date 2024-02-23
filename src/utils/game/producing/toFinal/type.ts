import {FullPackStats} from '@/types/game/producing/inventory';
import {ProductionOfDrop} from '@/types/game/producing/rate/base';
import {ProduceType} from '@/types/game/producing/type';
import {SleepSessionInfo} from '@/types/game/sleep';
import {CalculatedUserConfig} from '@/types/userData/config/user/main';


export type ToFinalProductionForSleepCommonOpts = {
  base: ProductionOfDrop,
  produceType: ProduceType,
};

export type ToFinalProductionOfDropCommonOpts = {
  fullPackStats: FullPackStats,
  calculatedUserConfig: CalculatedUserConfig,
  sleepSessionInfo: SleepSessionInfo,
};

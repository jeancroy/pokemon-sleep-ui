import {FullPackStats} from '@/types/game/producing/inventory';
import {ProducingRateOfDrop} from '@/types/game/producing/rate';
import {ProduceType} from '@/types/game/producing/type';
import {SleepSessionInfo} from '@/types/game/sleep';
import {CalculatedUserSettings} from '@/types/userData/settings/transformed';


export type ToFinalProducingRateForSleepCommonOpts = {
  base: ProducingRateOfDrop,
  produceType: ProduceType,
};

export type ToFinalProducingRateOfDropCommonOpts = {
  fullPackStats: FullPackStats,
  calculatedSettings: CalculatedUserSettings,
  sleepSessionInfo: SleepSessionInfo,
};

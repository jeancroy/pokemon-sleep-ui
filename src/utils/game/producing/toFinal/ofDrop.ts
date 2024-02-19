import {ProducingRateOfDropByStateWithPack} from '@/types/game/producing/rate';
import {toFinalProducingRateForAwake} from '@/utils/game/producing/toFinal/forAwake';
import {toFinalProducingRateForSleep} from '@/utils/game/producing/toFinal/forSleep';
import {
  ToFinalProducingRateForSleepCommonOpts,
  ToFinalProducingRateOfDropCommonOpts,
} from '@/utils/game/producing/toFinal/type';


type ToFinalProducingRateOfDropOpts = ToFinalProducingRateOfDropCommonOpts & ToFinalProducingRateForSleepCommonOpts;

export const toFinalProducingRateOfDrop = ({
  fullPackStats,
  calculatedUserConfig,
  sleepSessionInfo,
  ...opts
}: ToFinalProducingRateOfDropOpts): ProducingRateOfDropByStateWithPack => {
  const {base} = opts;
  const {bonus} = calculatedUserConfig;

  const primary = toFinalProducingRateForSleep({
    fullPackStatsOfSleep: fullPackStats.bySleep.primary,
    sleepDuration: sleepSessionInfo.session.primary.duration.actual,
    ...opts,
  });
  const secondary = toFinalProducingRateForSleep({
    fullPackStatsOfSleep: fullPackStats.bySleep.secondary,
    sleepDuration: sleepSessionInfo.session.secondary?.duration.actual,
    ...opts,
  });

  return {
    id: base.id,
    sleep1Vacant: primary.vacant,
    sleep1Filled: primary.filled,
    sleep2Vacant: secondary.vacant,
    sleep2Filled: secondary.filled,
    awake: toFinalProducingRateForAwake({
      base,
      bonus,
      sleepSessionInfo,
    }),
  };
};

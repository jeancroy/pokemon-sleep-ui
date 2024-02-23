import {ProductionOfDrop, ProductionOfDropByStateWithPack} from '@/types/game/producing/rate/base';
import {ProduceType} from '@/types/game/producing/type';
import {toFinalProductionForAwake} from '@/utils/game/producing/toFinal/forAwake';
import {toFinalProductionForSleep} from '@/utils/game/producing/toFinal/forSleep/main';
import {ToFinalProductionOfDropCommonOpts} from '@/utils/game/producing/toFinal/type';


type ToFinalProductionOfDropOpts = ToFinalProductionOfDropCommonOpts & {
  base: ProductionOfDrop,
  produceType: ProduceType,
};

export const toFinalProductionOfDrop = ({
  fullPackStats,
  calculatedUserConfig,
  sleepSessionInfo,
  ...opts
}: ToFinalProductionOfDropOpts): ProductionOfDropByStateWithPack => {
  const {base} = opts;
  const {bonus} = calculatedUserConfig;

  const primary = toFinalProductionForSleep({
    fullPackStatsOfSleep: fullPackStats.bySleep.primary,
    sleepDuration: sleepSessionInfo.session.primary.duration.actual,
    ...opts,
  });
  const secondary = toFinalProductionForSleep({
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
    awake: toFinalProductionForAwake({
      base,
      bonus,
      sleepSessionInfo,
    }),
  };
};

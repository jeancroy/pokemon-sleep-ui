import {ProductionOfDropInSleep} from '@/types/game/producing/rate/base';
import {toFinalProductionForSleepOnFullPack} from '@/utils/game/producing/toFinal/forSleep/onFull';
import {ToFinalProductionForSleepCommonOpts} from '@/utils/game/producing/toFinal/forSleep/type';
import {toFinalProductionFromBase} from '@/utils/game/producing/toFinal/utils';


export const toFinalProductionForSleepOfRegular = ({
  base,
  produceType,
  fullPackStatsOfSleep,
  sleepDuration,
}: ToFinalProductionForSleepCommonOpts): ProductionOfDropInSleep => {
  if (!fullPackStatsOfSleep || !sleepDuration) {
    return toFinalProductionForSleepOnFullPack(base);
  }

  const {helpCount, duration} = fullPackStatsOfSleep;
  const {qtyPerHelp, strengthPerHelp, triggerRate} = base;

  const qtyPerBaseHelp = qtyPerHelp * triggerRate;
  const strengthPerBaseHelp = strengthPerHelp * triggerRate;

  return {
    vacant: toFinalProductionFromBase({
      base,
      override: {
        qty: qtyPerBaseHelp * helpCount.vacant,
        strength: strengthPerBaseHelp * helpCount.vacant,
        frequency: helpCount.vacant ? duration.vacant / helpCount.vacant / triggerRate : Infinity,
      },
    }),
    filled: produceType !== 'berry' ?
      toFinalProductionFromBase({base, isFullPack: true}) :
      toFinalProductionFromBase({
        base,
        override: {
          qty: qtyPerBaseHelp * helpCount.filled,
          strength: strengthPerBaseHelp * helpCount.filled,
          // if `helpCount.filled` is falsy (0), force return `Infinity`
          // otherwise, `helpCount.filled` and `duration.filled` will be both 0, and `0/0 = NaN`
          frequency: helpCount.filled ? duration.filled / helpCount.filled / triggerRate : Infinity,
        },
      }),
  };
};

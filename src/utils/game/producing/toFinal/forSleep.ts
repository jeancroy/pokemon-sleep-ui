import {FullPackStatsOfSleep} from '@/types/game/producing/inventory';
import {ProducingRateOfDrop, ProducingRateOfDropInSleep} from '@/types/game/producing/rate/base';
import {ProduceType} from '@/types/game/producing/type';
import {toFinalProducingRateFromBase} from '@/utils/game/producing/toFinal/utils';
import {Nullable} from '@/utils/type';


type ToFinalProducingRateForSleepOpts = {
  base: ProducingRateOfDrop,
  produceType: ProduceType,
  fullPackStatsOfSleep: FullPackStatsOfSleep | null,
  sleepDuration: Nullable<number>,
};

export const toFinalProducingRateForSleep = ({
  base,
  produceType,
  fullPackStatsOfSleep,
  sleepDuration,
}: ToFinalProducingRateForSleepOpts): ProducingRateOfDropInSleep => {
  if (!fullPackStatsOfSleep || !sleepDuration) {
    return {
      vacant: toFinalProducingRateFromBase({
        base,
        isFullPack: true,
      }),
      filled: toFinalProducingRateFromBase({
        base,
        isFullPack: true,
      }),
    };
  }

  const {helpCount, duration} = fullPackStatsOfSleep;
  const {qtyPerHelp, strengthPerHelp, triggerRate} = base;

  const qtyPerBaseHelp = qtyPerHelp * triggerRate;
  const strengthPerBaseHelp = strengthPerHelp * triggerRate;

  const maxQty = produceType === 'skill' ? 1 : Infinity;

  return {
    vacant: toFinalProducingRateFromBase({
      base,
      override: {
        qty: Math.min(qtyPerBaseHelp * helpCount.vacant, maxQty),
        strength: Math.min(strengthPerBaseHelp * helpCount.vacant, maxQty * strengthPerHelp),
        frequency: Math.max(
          // if `helpCount.vacant` is falsy (0), force return `Infinity`
          // otherwise, `helpCount.vacant` and `duration.vacant` will be both 0, and `0/0 = NaN`
          helpCount.vacant ? duration.vacant / helpCount.vacant / triggerRate : Infinity,
          sleepDuration / maxQty,
        ),
      },
    }),
    filled: produceType !== 'berry' ?
      toFinalProducingRateFromBase({base, isFullPack: true}) :
      toFinalProducingRateFromBase({
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

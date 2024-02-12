import {durationOfDay} from '@/const/common';
import {EfficiencyInterval} from '@/types/game/stamina/efficiency';


type GetSecondsToFullPackInSleepOpts = {
  staminaIntervals: EfficiencyInterval[] | null,
  // This daily base quantity should NOT include efficiency multiplier
  dailyBaseQty: number,
  carryLimit: number,
};

export const getSecondsToFullPackInSleep = ({
  staminaIntervals,
  dailyBaseQty,
  carryLimit,
}: GetSecondsToFullPackInSleepOpts): number | null => {
  if (!staminaIntervals) {
    return null;
  }

  let secsPassed = 0;
  let spaceLeft = carryLimit;

  for (const {efficiency, duration} of staminaIntervals) {
    const maxQuantityInInterval = dailyBaseQty * (duration / durationOfDay) * efficiency;

    if (spaceLeft - maxQuantityInInterval <= 0) {
      secsPassed += spaceLeft / maxQuantityInInterval * duration;
      return secsPassed;
    }

    secsPassed += duration;
    spaceLeft -= maxQuantityInInterval;
  }

  return null;
};

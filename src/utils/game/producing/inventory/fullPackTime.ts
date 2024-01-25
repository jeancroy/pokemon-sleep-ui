import {durationOfDay} from '@/const/common';
import {EfficiencyInterval} from '@/types/game/stamina/efficiency';


type GetSecondsToFullPackInSleepOpts = {
  staminaIntervals: EfficiencyInterval[] | null,
  // This daily count should NOT include efficiency multiplier
  dailyCount: number,
  carryLimit: number,
};

export const getSecondsToFullPackInSleep = ({
  staminaIntervals,
  dailyCount,
  carryLimit,
}: GetSecondsToFullPackInSleepOpts): number | null => {
  if (!staminaIntervals) {
    return null;
  }

  let secsPassed = 0;
  let spaceLeft = carryLimit;

  for (const {efficiency, duration} of staminaIntervals) {
    const maxQuantityInInterval = dailyCount * (duration / durationOfDay) * efficiency;

    if (spaceLeft - maxQuantityInInterval <= 0) {
      secsPassed += spaceLeft / maxQuantityInInterval * duration;
      return secsPassed;
    }

    secsPassed += duration;
    spaceLeft -= maxQuantityInInterval;
  }

  return null;
};

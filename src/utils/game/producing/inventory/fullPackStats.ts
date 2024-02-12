import {FullPackStats} from '@/types/game/producing/carryLimit';
import {SleepSessions} from '@/types/game/sleep';
import {EfficiencyInterval} from '@/types/game/stamina/efficiency';
import {getSecondsToFullPackInSleep} from '@/utils/game/producing/inventory/fullPackTime';


type GetFullPackStatsOpts = {
  dailyBaseQty: number,
  carryLimit: number,
  intervalsDuringSleep: SleepSessions<EfficiencyInterval[]>,
  isFullPack: boolean,
};

export const getFullPackStats = ({
  dailyBaseQty,
  carryLimit,
  intervalsDuringSleep,
  isFullPack,
}: GetFullPackStatsOpts): FullPackStats => {
  if (isFullPack) {
    return {
      secondsToFull: {
        primary: 0,
        secondary: intervalsDuringSleep.secondary ? 0 : null,
      },
    };
  }

  return {
    secondsToFull: {
      primary: getSecondsToFullPackInSleep({
        staminaIntervals: intervalsDuringSleep.primary,
        dailyBaseQty,
        carryLimit,
      }),
      secondary: getSecondsToFullPackInSleep({
        staminaIntervals: intervalsDuringSleep.secondary,
        dailyBaseQty,
        carryLimit,
      }),
    },
  };
};

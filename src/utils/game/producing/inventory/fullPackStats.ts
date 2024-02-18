import {FullPackStats} from '@/types/game/producing/carryLimit';
import {SleepSessionData} from '@/types/game/sleep';
import {EfficiencyInterval} from '@/types/game/stamina/efficiency';
import {fullPackStatsOfSleepAtFilled} from '@/utils/game/producing/inventory/const';
import {getFullPackStatsOfSleep} from '@/utils/game/producing/inventory/fullPackStatsOfSleep';
import {GetFullPackStatsCommonOpts} from '@/utils/game/producing/inventory/type';


type GetFullPackStatsOpts = GetFullPackStatsCommonOpts & {
  intervalsDuringSleep: SleepSessionData<EfficiencyInterval[]>,
  isFullPack: boolean,
};

export const getFullPackStats = ({
  intervalsDuringSleep,
  isFullPack,
  ...opts
}: GetFullPackStatsOpts): FullPackStats => {
  if (isFullPack) {
    return {
      bySleep: {
        primary: fullPackStatsOfSleepAtFilled,
        secondary: intervalsDuringSleep.secondary ? fullPackStatsOfSleepAtFilled : null,
      },
    };
  }

  return {
    bySleep: {
      primary: getFullPackStatsOfSleep({
        staminaIntervals: intervalsDuringSleep.primary,
        ...opts,
      }),
      secondary: getFullPackStatsOfSleep({
        staminaIntervals: intervalsDuringSleep.secondary,
        ...opts,
      }),
    },
  };
};

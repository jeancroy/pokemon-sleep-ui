import {FullPackStats} from '@/types/game/producing/inventory';
import {EfficiencyIntervalsBySleepSession} from '@/types/game/stamina/efficiency';
import {getFullPackStatsOfSleep} from '@/utils/game/producing/inventory/fullPack/ofSleep';
import {GetFullPackStatsCommonOpts} from '@/utils/game/producing/inventory/type';


type GetFullPackStatsOpts = GetFullPackStatsCommonOpts & {
  intervalsDuringSleep: EfficiencyIntervalsBySleepSession,
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
        primary: getFullPackStatsOfSleep({
          staminaIntervals: intervalsDuringSleep.primary,
          ...opts,
          // Override `carryLimit` to 0 for all-time full pack
          carryLimit: 0,
        }),
        secondary: getFullPackStatsOfSleep({
          staminaIntervals: intervalsDuringSleep.secondary,
          ...opts,
          // Override `carryLimit` to 0 for all-time full pack
          carryLimit: 0,
        }),
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

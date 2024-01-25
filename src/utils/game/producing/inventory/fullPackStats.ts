import {FullPackStats} from '@/types/game/producing/carryLimit';
import {SleepDurationInfo} from '@/types/game/sleep';
import {toSum} from '@/utils/array';
import {getSecondsToFullPackInSleep} from '@/utils/game/producing/inventory/fullPackTime';


type GetFullPackStatsOpts = {
  dailyCount: number,
  carryLimit: number,
  sleepDurationInfo: SleepDurationInfo,
  isFullPack: boolean,
};

export const getFullPackStats = ({
  dailyCount,
  carryLimit,
  sleepDurationInfo,
  isFullPack,
}: GetFullPackStatsOpts): FullPackStats => {
  if (isFullPack) {
    return {
      secondsToFull: 0,
      ratio: 1,
    };
  }

  const secondsToFull = getSecondsToFullPackInSleep({dailyCount, carryLimit});
  const fullPackDuration = toSum(
    sleepDurationInfo.durations.map((duration) => Math.max(duration - secondsToFull, 0)),
  );

  return {
    secondsToFull,
    ratio: fullPackDuration / sleepDurationInfo.total,
  };
};

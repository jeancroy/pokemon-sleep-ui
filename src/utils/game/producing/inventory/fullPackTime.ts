import {durationOfDay} from '@/const/common';


type GetSecondsToFullPackInSleepOpts = {
  dailyCount: number,
  carryLimit: number,
};

export const getSecondsToFullPackInSleep = ({
  dailyCount,
  carryLimit,
}: GetSecondsToFullPackInSleepOpts): number => {
  return carryLimit / dailyCount * durationOfDay;
};

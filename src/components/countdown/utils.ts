
import {CountdownData, CountdownExpiryData} from '@/components/countdown/type';
import {durationOfDay} from '@/const/common';
import {TimePeriodInDate, TimePeriodPosition} from '@/types/game/timePeriod';
import {getTimePeriodPosition} from '@/utils/timePeriod';


export const getCountdownExpiryData = (timePeriodInDate: TimePeriodInDate): CountdownExpiryData | null => {
  const {start, end, close} = timePeriodInDate;
  const timePeriodPosition = getTimePeriodPosition(timePeriodInDate);
  const durationSecs = (end.getTime() - start.getTime()) / 1000;

  if (timePeriodPosition === 'future') {
    // Upcoming
    return {expiry: start, timePeriodPosition, durationSecs};
  }

  if (timePeriodPosition === 'current') {
    // Current
    return {expiry: end, timePeriodPosition, durationSecs};
  }

  if (close && timePeriodPosition === 'ended') {
    // Closing
    return {expiry: close, timePeriodPosition, durationSecs};
  }

  return null;
};

const isCountdownExpiringSoon = (secsLeft: number) => secsLeft < durationOfDay;

type GetCurrentCountdownDataOpts = {
  timePeriodPosition: TimePeriodPosition,
  secsLeft: number,
};

export const getCurrentCountdownData = ({
  timePeriodPosition,
  secsLeft,
}: GetCurrentCountdownDataOpts): CountdownData | null => {
  if (timePeriodPosition === 'future') {
    // Upcoming
    return {
      state: isCountdownExpiringSoon(secsLeft) ? 'openingSoon' : 'toOpen',
    };
  }

  if (timePeriodPosition === 'current') {
    // Current
    return {
      state: isCountdownExpiringSoon(secsLeft) ? 'endingSoon' : 'open',
    };
  }

  if (timePeriodPosition === 'ended') {
    // Closing
    return {
      state: isCountdownExpiringSoon(secsLeft) ? 'closingSoon' : 'ended',
    };
  }

  return null;
};

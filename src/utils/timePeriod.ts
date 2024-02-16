import {TimePeriod, TimePeriodInDate, TimePeriodPosition} from '@/types/game/timePeriod';
import {getDateFromEpochSecAtLocal} from '@/utils/date';


export const toTimePeriodInDate = ({startEpoch, endEpoch, closeEpoch}: TimePeriod): TimePeriodInDate => {
  return {
    start: getDateFromEpochSecAtLocal(startEpoch),
    end: getDateFromEpochSecAtLocal(endEpoch),
    close: closeEpoch ? getDateFromEpochSecAtLocal(closeEpoch) : null,
  };
};

export const getTimePeriodPosition = ({start, end, close}: TimePeriodInDate): TimePeriodPosition => {
  const now = new Date();

  if (start > now) {
    return 'future';
  }

  if (now >= start && now < end) {
    return 'current';
  }

  if (close && now >= end && now < close) {
    return 'ended';
  }

  return 'closed';
};
